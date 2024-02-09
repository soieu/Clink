pipeline {
    agent any

    tools {
        // Install the Maven version configured as "M3" and add it to the path.
        maven "maven"
        dockerTool 'Docker'
    }
    
    environment {
        
        APPLICATION_PROPERTIES_PATH = "file:/var/jenkins_home/property/application.properties"
        
        DOCKERHUB = credentials("dockerhub")
        GITHUB_REPO='https://github.com/zosam-mosam/clink_server.git'
        DOCKER_REPO="hyeyoungcho97/clink-spring"
    }


    stages {
        stage('Git Clone'){
            steps{
                // Get some code from a GitHub repository
                git credentialsId: 'github', 
                    branch: 'main',
                    url: "$GITHUB_REPO"
            }
        }
        stage('Build Maven') {
            steps {
                // Move to the directory containing pom.xml
                dir('clink/') {
                    // Run Maven on a Unix agent.
                    sh "mvn -Dmaven.test.failure.ignore=true clean package -Dspring.config.location=${APPLICATION_PROPERTIES_PATH}"
                }
            }
        }
        stage ('Build Docker Image'){
            steps{
                script{
                    // Docker 이미지 빌드
                    sh 'docker build -t hello_spring .'
                }
            }
        }
        stage('Upload to DockerHUB') {
            steps {
                echo "upload"
                
                sh 'docker login -u $DOCKERHUB_USR -p $DOCKERHUB_PSW'
                sh 'docker tag hello_spring $DOCKER_REPO'
                sh 'docker push $DOCKER_REPO'
                sh 'docker logout'
            }
        }
        stage('SSH transfer') {
            steps([$class: 'BapSshPromotionPublisherPlugin']) {
                sshPublisher(
                    continueOnError: false, failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: "spring",
                            verbose: true,
                            transfers: [
                                sshTransfer(execCommand: "docker pull $DOCKER_REPO"),
                                sshTransfer(execCommand: "docker ps -aq --filter 'name=hello_world_server' | xargs -r docker stop"),
                                sshTransfer(execCommand: "docker ps -aq --filter 'name=hello_world_server' | xargs -r docker rm"),
                                sshTransfer(execCommand: "docker run -d --name hello_world_server -v /home/ubuntu/property:/var/property -p 8000:8000 $DOCKER_REPO")
                                
                                // sshTransfer(sourceFiles: "helm/**",)           
                            ]
                        )
                    ]
                )
            }
        }
    }
    post {
        always {
            cleanWs() // Clean up the workspace
        }
    }
}