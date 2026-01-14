pipeline {
    agent any

    environment {
        CI = 'true'
        // Store browsers outside workspace so they persist after cleanWs()
        PLAYWRIGHT_BROWSERS_PATH = '/Users/janesh/.cache/ms-playwright'
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
                // Exclude example/demo tests that have known issues
                sh '''
                    npx playwright test --project=chromium \
                        --ignore-pattern="**/examples/**" \
                        --ignore-pattern="**/logging/**" \
                        --ignore-pattern="**/login.spec.ts"
                '''
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

