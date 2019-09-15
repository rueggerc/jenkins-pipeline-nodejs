pipeline {
    agent any
    environment {
        JOB_NAME = "Build Jenkins Pipeline for NodeJS"
    }
    stages {
        stage ('Build Master Branch') {
            when { 
                branch 'master'
            }
            steps {
                echo "Building from master Branch"
                sh 'npm install'
                sh 'npm run test'
            }
        }
        stage ('Build Feature Branch') {
            when { 
                not { 
                  branch 'master'
                }
            }
            steps {
                echo 'Building non-master branch'
                sh 'pwd'
                sh 'npm install'
            }
        }
        stage ('Test') {
            steps {
                script {
                    docker.image('rueggerc/postgres-it:1.4').withRun('-e "POSTGRES_USER=testuser" -e "POSTGRES_PASSWORD=testpwd" -e "POSTGRES_DB=itdb" -p 5432:5432') {c ->
                      docker.image("rueggerc/postgres-it:1.4").inside("--link ${c.id}:dbhost") {
                        sh '''
                        psql --version
                        RETRIES=5
                        export PGPASSWORD=testpwd 
                        until psql -h dbhost -U testuser -c "select 1" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
                        echo "Waiting for postgres server, $((RETRIES-=1)) remaining attempts..."
                        sleep 1
                        done
                        '''
                        // sh 'npm run pipeline-test'
                        echo "RUN TESTS"
                        sh 'npm run tests-in-pipeline'
                        sh 'chmod +x build/build.sh && npm run shell-stuff'
                      }
                    }

                    // List Files in workspace
                    echo "LIST EVERYTHING AFTER TESTS BEGIN"
                    sh 'chmod +x build/build.sh && npm run shell-stuff'
                    echo "LIST EVERYTHING AFTER TESTS END"
                   
                }
                
            }
        }
        stage ('SonarQube Scan Stage') {
            when { 
                not { 
                  branch 'master'
                }
            }
            steps {
                withSonarQubeEnv('kube-sonar-server') {
                    sh 'npm run sonar-scanner'
                }
            }
        }
        stage ('SonarQube Quality Gate Stage') {
            when { 
                not { 
                  branch 'master'
                }
            }
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    // Note: Webhook to Jenkins must be setup in Sonar!
                    waitForQualityGate abortPipeline: true
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
