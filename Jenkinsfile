pipeline {
  agent any

  tools {
  nodejs 'NodeJS'
  sonarQubeScanner 'SonarQube Scanner'  
}
  environment {
    SONAR_TOKEN = credentials('sonarqube-secret')
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
        withSonarQubeEnv('SonarQube') {
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
