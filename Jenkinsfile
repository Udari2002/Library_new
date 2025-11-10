pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'mowkiee'
  }

  stages {
    stage('Checkout') {
      steps {
         git branch: 'main', url: 'https://github.com/Udari2002/Library_new.git'
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker build -t ${DOCKERHUB_USER}/library-backend:latest ./backend'
        sh 'docker build -t ${DOCKERHUB_USER}/library-frontend:latest ./frontend'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh 'docker push ${DOCKERHUB_USER}/library-backend:latest'
          sh 'docker push ${DOCKERHUB_USER}/library-frontend:latest'
        }
      }
    }

    stage('Deploy (Local Compose)') {
      steps {
        sh 'docker compose down || true'
        sh 'docker compose pull'
        sh 'docker compose up -d'
      }
    }
  }

  post {
    always { echo '✅ CI/CD pipeline completed.' }
  }
}
