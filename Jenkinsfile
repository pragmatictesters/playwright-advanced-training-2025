pipeline {
    agent any

    tools {
        nodejs 'NodeJS'  // Configure this name in Jenkins: Manage Jenkins → Tools → NodeJS
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = '0'  // Use default browser path
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
            // Archive Playwright HTML report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])

            // Archive test results if using JUnit reporter
            junit(
                testResults: 'test-results/*.xml',
                allowEmptyResults: true
            )

            // Clean workspace
            cleanWs()
        }

        failure {
            echo '❌ Tests failed! Check the Playwright Report for details.'
        }

        success {
            echo '✅ All tests passed!'
        }
    }
}

