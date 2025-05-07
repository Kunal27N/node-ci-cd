pipeline {
    agent any

    environment {
        SONAR_HOST_URL = 'http://sonarqube:9000' // Set SonarQube server URL
        SONAR_AUTH_TOKEN = 'sqp_251ca3581c199e1c8c8f0a3ff6130aee07069f50' // Set SonarQube authentication token
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Kunal27N/node-ci-cd.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                withNodejs('NodeJS') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                withNodejs('NodeJS') {
                    sh 'npm test'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("SonarQube") {
                    sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=node-ci-cd \
                        -Dsonar.sources=. \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                        -Dsonar.host.url=$SONAR_HOST_URL \
                        -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }
    }
}
