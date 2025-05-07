pipeline {
  agent any

  tools {
    nodejs "NodeJS" 
  }

  environment {
    SONARQUBE = "SonarQube"
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
        withSonarQubeEnv("${SONARQUBE}") {
          sh '''
            sonar-scanner \
              -Dsonar.projectKey=node-ci-cd \
              -Dsonar.sources=. \
              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
          '''
        }
      }
    }
  }
}
