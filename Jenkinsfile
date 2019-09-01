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
                            psql --version
                            RETRIES=5
                            until psql -h localhost -U chris -c "select 1" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
                            echo "Waiting for postgres server, $((RETRIES-=1)) remaining attempts..."
                            sleep 1
                            done
                            '''
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