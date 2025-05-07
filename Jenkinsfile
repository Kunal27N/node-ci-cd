pipeline {
  agent any

  tools {
    nodejs 'NodeJS'  // Make sure this is defined in Jenkins under Global Tool Configuration
  }

  environment {
    SONAR_TOKEN = credentials('sonarqube-secret')  // Must be a secret text in Jenkins
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', credentialsId: 'github-creds', url: 'https://github.com/Kunal27N/node-ci-cd.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Code Quality Check') {
      steps {
        withSonarQubeEnv('SonarQube') { // Name must match Jenkins global configuration
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
