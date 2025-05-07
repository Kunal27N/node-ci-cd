pipeline {
    agent any

    tools {
        nodejs 'NodeJS'          // Name of Node.js installation in Jenkins
        sonarScanner 'SonarScanner' // Name of SonarScanner installation in Jenkins
    }

    environment {
        // SonarQube token and URL are injected by withSonarQubeEnv
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

        stage('Run Tests with Coverage') {
            steps {
                sh 'npm test -- --coverage'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') { // 'SonarQube' must match the Jenkins config name
                    sh '''
                        ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=node-ci-cd \
                        -Dsonar.sources=. \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed.'
        }
        success {
            echo 'Pipeline succeeded.'
        }
    }
}
