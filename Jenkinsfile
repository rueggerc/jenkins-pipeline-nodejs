pipeline {
    agent any
    environment {
        POSTGRES_HOST = 'localhost'
        POSTGRES_USER = 'chris'
        POSTGRES_FOO = "foo"
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
                    docker.image('rueggerc/postgres-it:1.4').withRun('-u root -e "POSTGRES_USER=testuser" -e "POSTGRES_PASSWORD=testpwd" -e "POSTGRES_DB=itdb" -p 5432:5432') {c ->
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
                        sh 'npm run test'
                        sh 'chmod +x build/build.sh && npm run shell-stuff'
                        // sh 'npm run sonar-scanner'
                      }
                    }

                    // List Things
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
                    // Webhook must be setup in Sonar!
                    waitForQualityGate abortPipeline: true
                    // script {
                    //     def qg = waitForQualityGate()
                    //     if (qg.status != 'OK') {
                    //       error "Pipeline aborted due to quality gate failure: ${qg.status}"
                    //     }
                    // }
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
