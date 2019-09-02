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
                    docker.image('rueggerc/postgres-it:1.0').withRun('-e "POSTGRES_HOST=127.0.0.1" -e "POSTGRES_USER=chris" -e "POSTGRES_PASSWORD=dakota" -e "POSTGRES_DB=rueggerllc" -p "5432:5432"') {c ->
                        docker.image('rueggerc/postgres-it:1.0').inside("--link ${c.id}:db") {
                            sh '''
                            sleep 30
                            hostname
                            PGPASSWORD=dakota psql -h db -U chris --dbname=rueggerllc -c "select * from dht22_readings"
                            '''
                            // Run Integration Tests
                            sh 'npm run test'
                        }
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