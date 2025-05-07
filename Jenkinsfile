pipeline {
    agent any

    tools {
        nodejs 'NodeJS'  // Name of the Node.js installation in Jenkins
    }

    environment {
        SONAR_SCANNER_HOME = tool 'SonarQube Scanner'  // Name of the SonarQube Scanner tool in Jenkins
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
                withSonarQubeEnv('SonarQube') { // Must match the name configured in Jenkins
                    sh '''
                        sonar-scanner \
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
