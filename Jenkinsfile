node() {
    stage "Checkout"

    checkout scm

    stage "Docker Build & Push"

    sh "docker build -t graviteeio/website:latest --pull=true ."
    sh "docker push graviteeio/website:latest"
}
