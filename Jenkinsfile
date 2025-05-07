pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('sonarqube-secret')
  }

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
