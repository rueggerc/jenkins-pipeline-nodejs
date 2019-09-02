pipeline {
    agent any
    environment {
        POSTGRES_HOST = 'localhost'
        POSTGRES_USER = 'chris'
        POSTGRES_PASSWORD = 'dakota'
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
                echo 'Startup Docker Container'
                sh 'docker version'
                script {
                    docker.image('rueggerc/postgres-it:1.0').withRun('-e "POSTGRES_USER=chris" -e "POSTGRES_PASSWORD=dakota" -e "POSTGRES_DB=rueggerllc" -p 5432:5432') {c ->
                        env.DB_HOST = hostname
                        sh 'npm run test'
                    }
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