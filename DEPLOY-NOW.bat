@echo off
echo 🚀 DEPLOYING YOUR LIBRARY APP NOW...

REM Check if SSH key exists
if not exist "library-key-new.pem" (
    echo ❌ ERROR: SSH key not found!
    echo 📋 Please download library-key-new.pem from AWS Console
    echo 💡 AWS Console → EC2 → Key Pairs → library-app-key-new → Download
    pause
    exit /b 1
)

echo ✅ SSH key found! Deploying...

wsl -e bash -c "cd /mnt/c/Users/DELL/Desktop/projects/libray_new && chmod 400 library-key-new.pem && ssh -i library-key-new.pem -o StrictHostKeyChecking=no ec2-user@98.84.69.78 'bash -s' < /tmp/deploy_commands.sh"

echo 🎉 DEPLOYMENT COMPLETE!
echo 🌐 Your app is live at: http://98.84.69.78:3000
echo 📚 Test your library system now!

pause