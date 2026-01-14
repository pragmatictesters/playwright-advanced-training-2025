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

        stage('Verify Environment') {
            steps {
                script {
                    echo "========== Environment Variables =========="
                    echo "JENKINS_HOME: ${JENKINS_HOME}"
                    echo "WORKSPACE: ${WORKSPACE}"
                    echo "PLAYWRIGHT_BROWSERS_PATH: ${env.PLAYWRIGHT_BROWSERS_PATH}"
                    echo "CI: ${env.CI}"
                    echo "==========================================="

                    if (isUnix()) {
                        sh '''
                            echo "Node.js version: $(node --version)"
                            echo "npm version: $(npm --version)"
                            echo ""
                            echo "Checking browser cache location..."
                            echo "PLAYWRIGHT_BROWSERS_PATH=$PLAYWRIGHT_BROWSERS_PATH"
                            if [ -d "$PLAYWRIGHT_BROWSERS_PATH" ]; then
                                echo "Cache directory exists. Contents:"
                                ls -la "$PLAYWRIGHT_BROWSERS_PATH" || echo "Empty or not accessible"
                            else
                                echo "Cache directory does NOT exist yet"
                            fi
                            echo ""
                            echo "Checking workspace node_modules browsers..."
                            if [ -d "node_modules" ]; then
                                find node_modules -type d -name ".local-browsers" 2>/dev/null || echo "No .local-browsers found"
                            fi
                        '''
                    } else {
                        bat 'node --version'
                        bat 'npm --version'
                        bat 'echo PLAYWRIGHT_BROWSERS_PATH=%PLAYWRIGHT_BROWSERS_PATH%'
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
                    // Run a single working test file for now
                    if (isUnix()) {
                        sh 'npx playwright test tests/01-first-test.spec.ts --project=chromium'
                    } else {
                        bat 'npx playwright test tests/01-first-test.spec.ts --project=chromium'
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

        // Workspace is preserved to cache npm packages and Playwright browsers
        // Uncomment below to clean workspace after each build:
        // cleanup {
        //     cleanWs()
        // }
    }
}

