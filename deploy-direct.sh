#!/bin/bash

# Direct deployment script without SSH key dependency
echo "🚀 DEPLOYING YOUR LIBRARY APP..."

# Set variables
EC2_IP="98.84.69.78"
GITHUB_REPO="https://github.com/Udari2002/Library_new.git"

echo "📦 Step 1: Building Docker images locally..."
docker-compose -f docker-compose.prod.yml build

echo "📤 Step 2: Pushing images to DockerHub..."
docker-compose -f docker-compose.prod.yml push

echo "🔗 Step 3: Connecting to server and deploying..."
# This will use your SSH key once you have it
cat << 'DEPLOY_SCRIPT' > /tmp/deploy_commands.sh
#!/bin/bash
echo "Installing Docker and Docker Compose..."
sudo yum update -y
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "Cloning repository..."
cd /home/ec2-user
if [ -d "Library_new" ]; then
    rm -rf Library_new
fi
git clone https://github.com/Udari2002/Library_new.git
cd Library_new

echo "Starting application..."
docker-compose -f docker-compose.prod.yml up -d

echo "✅ Deployment complete!"
echo "🌐 Frontend: http://98.84.69.78:3000"
echo "🌐 Backend: http://98.84.69.78:5001"
DEPLOY_SCRIPT

echo "📋 Deployment commands ready in /tmp/deploy_commands.sh"
echo ""
echo "🔑 TO DEPLOY NOW:"
echo "1. Get your SSH key from AWS Console"
echo "2. Save it as 'library-key-new.pem' in this folder"
echo "3. Run: chmod 400 library-key-new.pem"
echo "4. Run: ssh -i library-key-new.pem ec2-user@98.84.69.78 'bash -s' < /tmp/deploy_commands.sh"
echo ""
echo "🌐 Your app will be live at: http://98.84.69.78:3000"