pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Must match the name in Jenkins -> Global Tool Configuration
    }

    environment {
        SCANNER_HOME = tool 'SonarQube Scanner' // Must match tool name under Jenkins > Global Tool Configuration
        SONAR_TOKEN = credentials('sonarqube-secret') // Secret text credential in Jenkins for auth
    }

    stages {
        stage('Clone sources') {
            steps {
                git branch: 'main', url: 'https://github.com/Kunal27N/node-ci-cd.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('SonarQube') { // Name must match SonarQube server config in Jenkins
                    sh '''
                        ${SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }
    }
}
