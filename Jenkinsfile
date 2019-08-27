pipeline {
    agent any
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
                sh 'npm run test'
                // sh 'npm config ls'
            }
        }
        stage ('Test') {
            steps {
                echo 'Running test stage...'
            }
        }
        stage ('Deploy') {
            steps {
                echo 'Running deploy stage...'
            }
        }
    }
}