pipeline {
    agent any
    environment {
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
                script {
                    docker.image('rueggerc/postgres-it:1.0').withRun('-e "POSTGRES_USER=chris" -e "POSTGRES_PASSWORD=dakota" -e "POSTGRES_DB=rueggerllc" -p 5432:5432') {c ->
                        docker.image('rueggerc/postgres-it:1.0').inside("--link ${c.id}:db") {
                            sh '''
                            sleep 10
                            PGPASSWORD=dakota psql -U chris --dbname=rueggerllc -c "select * from dht22_readings"
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