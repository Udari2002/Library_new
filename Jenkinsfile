pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
         git branch: 'main', url: 'https://github.com/Udari2002/Library_new.git'
      }
    }

    stage('Docker diagnostics') {
      steps {
        sh 'echo "--- docker --version ---"; docker --version || true'
        sh 'echo "--- docker info ---"; docker info || true'
        withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo "--- attempting docker login (masked) ---"'
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin || true'
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'docker build -t ${DOCKER_USER}/library-backend:latest ./backend'
          sh 'docker build -t ${DOCKER_USER}/library-frontend:latest ./frontend'
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh 'docker push ${DOCKER_USER}/library-backend:latest'
          sh 'docker push ${DOCKER_USER}/library-frontend:latest'
        }
      }
    }

    stage('Provision Infrastructure (Terraform)') {
      steps {
        script {
          sh 'cd terraform && terraform init'
          sh 'cd terraform && terraform plan -var-file="terraform.tfvars"'
          sh 'cd terraform && terraform apply -var-file="terraform.tfvars" -auto-approve'
          
          // Get the EC2 public IP from Terraform output
          def ec2_ip = sh(script: 'cd terraform && terraform output -raw instance_public_ip', returnStdout: true).trim()
          
          // Update Ansible inventory with the actual EC2 IP
          sh "sed -i 's/REPLACE_WITH_EC2_IP/${ec2_ip}/g' ansible/inventory.ini"
          
          echo "✅ Infrastructure provisioned. EC2 IP: ${ec2_ip}"
        }
      }
    }

    stage('Deploy to AWS (Ansible)') {
      steps {
        script {
           sh 'ansible --version || echo "Ansible not found. Please install Ansible."'
        }
        withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          // Wait for EC2 instance to be fully ready
          sh 'sleep 60'
          // Execute the Ansible playbook for AWS deployment
          sh 'ansible-playbook -i ansible/inventory.ini ansible/deploy.yml --ssh-common-args="-o StrictHostKeyChecking=no"'
        }
      }
    }
  }

  post {
    always { echo '✅ CI/CD pipeline completed.' }
  }
}
