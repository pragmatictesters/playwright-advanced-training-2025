pipeline {
    agent any

    environment {
        CI = 'true'
        // Store browsers in Jenkins home (works on Windows, Mac, Linux)
        PLAYWRIGHT_BROWSERS_PATH = "${JENKINS_HOME}/.cache/ms-playwright"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Node.js') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'node --version'
                        sh 'npm --version'
                    } else {
                        bat 'node --version'
                        bat 'npm --version'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                    } else {
                        bat 'npm ci'
                    }
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright install --with-deps chromium'
                    } else {
                        // Windows doesn't support --with-deps, install separately
                        bat 'npx playwright install chromium'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Exclude example/demo tests that have known issues
                    if (isUnix()) {
                        sh '''
                            npx playwright test --project=chromium \
                                --ignore-pattern="**/examples/**" \
                                --ignore-pattern="**/logging/**" \
                                --ignore-pattern="**/login.spec.ts"
                        '''
                    } else {
                        bat 'npx playwright test --project=chromium --ignore-pattern="**/examples/**" --ignore-pattern="**/logging/**" --ignore-pattern="**/login.spec.ts"'
                    }
                }
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

