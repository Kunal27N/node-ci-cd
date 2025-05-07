pipeline {
    agent any
    
    tools {nodejs "NodeJs"}

    stages {
        stage('Clone sources') {
            steps {
                git branch: 'main', url: 'https://github.com/Kunal27N/node-ci-cd.git'
            }
        }
    
        stage('SonarQube analysis') {
            environment {
                SCANNER_HOME = tool 'SonarQubeScanner';    
            }
            
            steps {
                
                withSonarQubeEnv('SonarQube') {
                    sh "${SCANNER_HOME}/bin/sonar-scanner"
                }
            }
        }
    }
}
