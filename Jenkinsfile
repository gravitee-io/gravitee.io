node() {
    try {
        sh "rm -rf *"

        stage("Checkout") {
            checkout scm
        }

        stage("Jekyll Build") {
            sh "docker build -t gravitee.io/jekyll -f Dockerfile-build ."
            sh "docker run --rm -v '${env.WORKSPACE}:/src' gravitee.io/jekyll build"
        }

        stage("Docker Build & Push") {
            sh "docker build -t graviteeio/website:latest --pull=true ."
            sh "docker push graviteeio/website:latest"
        }

        stage("Restart website container") {
            sh "docker stop website"
            sh "docker rm website"
            sh "docker run -d -l \"traefik.frontend.rule=Host:gravitee.io\" --name website graviteeio/website:latest"
        }

        stage("Clean") {
            sh "docker run --rm -v '${env.WORKSPACE}:/src' gravitee.io/jekyll clean"
        }
    } catch (e) {
        currentBuild.result = "FAILED"
        sh "git log --format=short -n1 HEAD > GIT_LOG"
        def git_log = readFile encoding: 'UTF-8', file: 'GIT_LOG'

        slackSend (
                color: '#FF0000',
                message: ":poop: ${env.JOB_NAME} " +
                        "<${env.BUILD_URL}console|[#${env.BUILD_NUMBER}]>\n\r" +
                        "```${git_log}```")
        throw e
    }
}
