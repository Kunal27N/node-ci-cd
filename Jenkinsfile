pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('sonarqube-secret')
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/your-username/your-repo.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Code Quality Check') {
      steps {
        withSonarQubeEnv('YourSonarQubeServer') {
          sh 'sonar-scanner -Dsonar.login=$SONAR_TOKEN'
        }
      }
    }

    stage('Build') {
      steps {
        sh 'npm run start & sleep 5'
        sh 'curl -f http://localhost:3000 || exit 1'
      }
    }
  }
}
