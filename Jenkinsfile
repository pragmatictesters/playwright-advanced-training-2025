pipeline {
    agent any

    environment {
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = '0'
        // Use Homebrew Node.js path (adjust if needed)
        PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Node.js') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test --project=chromium'
            }
        }
    }

    post {
        always {
            script {
                if (fileExists('playwright-report/index.html')) {
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Report'
                    ])
                }
            }
        }

        failure {
            echo '❌ Tests failed! Check the Playwright Report for details.'
        }

        success {
            echo '✅ All tests passed!'
        }

        cleanup {
            cleanWs()
        }
    }
}

