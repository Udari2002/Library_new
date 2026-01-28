#!/bin/bash
echo "🚀 Starting Library Management App deployment..."

# Install Docker and Docker Compose if not present
sudo yum update -y
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create app directory
sudo mkdir -p /opt/library_app
cd /opt/library_app

# Create docker-compose file with health checks
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  mongo:
    image: mongo:6
    restart: always
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongo mongo:27017/library_new --quiet
      interval: 30s
      timeout: 10s
      retries: 3

  backend:
    image: mowkiee/library-backend:latest
    restart: always
    environment:
      - MONGO_URI=mongodb://mongo:27017/library_new
      - PORT=5001
      - NODE_ENV=production
      - JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
    ports:
      - "5001:5001"
    depends_on:
      - mongo
    healthcheck:
      test: curl -f http://localhost:5001/ || exit 1
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    image: mowkiee/library-frontend:latest
    restart: always
    environment:
      - VITE_API_BASE=http://98.84.69.78:5001/api
    ports:
      - "3000:80"
    depends_on:
      - backend
    healthcheck:
      test: curl -f http://localhost:80/ || exit 1
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  mongo-data:
EOF

# Pull latest images and start services
sudo docker-compose pull
sudo docker-compose down --remove-orphans
sudo docker-compose up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 30

# Setup monitoring cron job
sudo crontab -l 2>/dev/null | grep -v monitor.sh > /tmp/cron_backup
echo "*/5 * * * * /home/ec2-user/monitor.sh" >> /tmp/cron_backup
sudo crontab /tmp/cron_backup

echo "✅ Deployment complete!"
echo "🌐 Frontend: http://98.84.69.78:3000"
echo "🔌 Backend: http://98.84.69.78:5001"
echo "🗄️  MongoDB: Running on port 27017"
echo "📊 Health monitoring: Every 5 minutes"

# Show status
sudo docker-compose ps
echo ""
echo "🔍 Testing connectivity..."
curl -s http://localhost:3000 > /dev/null && echo "✅ Frontend responding" || echo "❌ Frontend not responding"
curl -s http://localhost:5001 > /dev/null && echo "✅ Backend responding" || echo "❌ Backend not responding"