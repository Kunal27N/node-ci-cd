pipeline {
  agent any

  tools {
    nodejs "NodeJS"  // This should be configured under Jenkins Global Tools
  }

  environment {
    SONARQUBE = "SonarQube" // Set the name of your SonarQube instance
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/Kunal27N/node-ci-cd.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh 'sonar-scanner \
            -Dsonar.projectKey=node-ci-cd \
            -Dsonar.sources=. \
            -Dsonar.host.url=$SONAR_HOST_URL \
            -Dsonar.login=$SONAR_AUTH_TOKEN'
        }
      }
    }
  }
}
