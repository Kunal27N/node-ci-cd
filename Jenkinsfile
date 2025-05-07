pipeline {
  agent any

  tools {
    nodejs 'NodeJS' // Ensure this is defined under Global Tool Configuration
  }

  environment {
    SONAR_TOKEN = credentials('sonarqube-secret') // Jenkins Secret Text credentials
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', credentialsId: 'github-creds', url: 'https://github.com/Kunal27N/node-ci-cd.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci' // More reliable for CI/CD than `npm install`
      }
    }

    stage('Code Quality Check') {
      environment {
        SCANNER_HOME = tool 'SonarQube Scanner' // Make sure this tool is configured in Jenkins
      }
      steps {
        withSonarQubeEnv('SonarQube') {
          sh '''$SCANNER_HOME/bin/sonar-scanner \
            -Dsonar.login=$SONAR_TOKEN'''
        }
      }
    }

    stage('Build & Smoke Test') {
      steps {
        sh 'nohup npm start & sleep 5' // `nohup` ensures backgrounding works in Jenkins shell
        sh 'curl -f http://localhost:3000 || exit 1'
      }
    }
  }
}
