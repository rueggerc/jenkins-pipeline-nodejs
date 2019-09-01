pipeline {
    agent any
    environment {
        POSTGRES_USER = 'chris'
        POSTGRES_PASSWORD= 'dakota'
        POSTGRES_DB = 'rueggerllc'
    }
    stages {
        stage ('Build: Master') {
            when { 
                branch 'master'
            }
            steps {
                echo "Building from master Branch"
                sh 'npm install'
                sh 'npm run test'
            }
        }
        stage ('Build: Dev') {
            when { 
                not { 
                  branch 'master'
                }
            }
            steps {
                echo 'Building non-master branch'
                sh 'pwd'
                sh 'npm install'
                
                // sh 'npm config ls'
            }
        }
        stage ('Test') {
            steps {
                script {
                    docker.image('rueggerc/postgres-it:1.0').withRun('-e "POSTGRES_USER=${env.POSTGRES_USER}" -e "POSTGRES_PASSWORD=${env.POSTGRES_PASSWORD}" -e "POSTGRES_DB=${env.POSTGRES_DB}"') {c ->
                    }
                    sh 'npm run test'
                }
            }
        }
        stage ('Deploy') {
            steps {
                echo 'Running deploy stage...'
            }
        }
    }
}