#!/bin/bash

# Alternative deployment using EC2 User Data
echo "🔄 Creating new deployment without SSH..."

# Create deployment via AWS CLI (if available)
echo "Creating new EC2 user data script..."

cat << 'EOF' > user-data-deploy.sh
#!/bin/bash
yum update -y
yum install -y docker git
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Clone and deploy
cd /home/ec2-user
git clone https://github.com/Udari2002/Library_new.git
cd Library_new

# Set environment variables
export DOCKER_USER=mowkiee

# Start the application
docker-compose -f docker-compose.prod.yml up -d

echo "✅ Library App deployed successfully!"
EOF

echo "📋 User data script created: user-data-deploy.sh"
echo "🔧 This can be used to redeploy the EC2 instance with the app pre-installed"