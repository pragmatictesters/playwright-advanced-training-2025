/**
 * Playwright Training Demo App - JavaScript
 * All interactions organized by component
 */

// ============================================
// Global State
// ============================================
let currentUser = null;
let currentPage = 1;
let currentSort = { column: null, ascending: true };

// Sample data for table
const tableData = [
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
    { name: 'Charlie Brown', email: 'charlie@example.com', role: 'Manager', status: 'Inactive' },
    { name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'Active' },
    { name: 'Eve Wilson', email: 'eve@example.com', role: 'Admin', status: 'Active' },
    { name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'Inactive' },
    { name: 'Grace Lee', email: 'grace@example.com', role: 'Manager', status: 'Active' },
    { name: 'Henry Davis', email: 'henry@example.com', role: 'User', status: 'Active' },
];

// Search suggestions data
const searchData = [
    'Playwright', 'Automation', 'Testing', 'Selenium', 'Cypress',
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C#',
    'Web Development', 'API Testing', 'E2E Testing', 'Unit Testing'
];

// ============================================
// Navigation & Section Management
// ============================================
function initNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.section');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSection = tab.dataset.section;
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active section
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// ============================================
// Basic Inputs Section
// ============================================
function initBasicInputs() {
    const textInput = document.getElementById('text-input');
    const primaryBtn = document.getElementById('primary-btn');
    const secondaryBtn = document.getElementById('secondary-btn');
    const resultBox = document.getElementById('basics-result');

    primaryBtn.addEventListener('click', () => {
        const value = textInput.value || 'No text entered';
        resultBox.textContent = `Primary button clicked! Text input value: "${value}"`;
    });

    secondaryBtn.addEventListener('click', () => {
        resultBox.textContent = 'Secondary button clicked!';
    });
}

// ============================================
// Form Controls Section
// ============================================
function initFormControls() {
    // Dropdown
    const dropdown = document.getElementById('dropdown');
    const formsResult = document.getElementById('forms-result');

    dropdown.addEventListener('change', (e) => {
        formsResult.textContent = `Selected: ${e.target.value}`;
    });

    // Radio buttons
    const radios = document.querySelectorAll('input[name="radio"]');
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            formsResult.textContent = `Radio selected: ${e.target.value}`;
        });
    });

    // Checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"][id^="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checked = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            formsResult.textContent = `Checked: ${checked.join(', ') || 'None'}`;
        });
    });

    // Toggle switch
    const toggleSwitch = document.getElementById('toggle-switch');
    const toggleStatus = document.getElementById('toggle-status');

    toggleSwitch.addEventListener('change', (e) => {
        toggleStatus.textContent = e.target.checked ? 'ON' : 'OFF';
        toggleStatus.style.color = e.target.checked ? '#27ae60' : '#e74c3c';
    });

    // Range slider
    const rangeSlider = document.getElementById('range-slider');
    const sliderValue = document.getElementById('slider-value');

    rangeSlider.addEventListener('input', (e) => {
        sliderValue.textContent = e.target.value;
    });

    // File upload
    const fileUpload = document.getElementById('file-upload');
    const fileInfo = document.getElementById('file-info');

    fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileInfo.textContent = `File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        }
    });
}

// ============================================
// Dynamic Data Section
// ============================================
function initDynamicData() {
    initSearch();
    initTable();
    initPagination();
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('suggestions');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length === 0) {
            suggestions.classList.remove('show');
            suggestions.innerHTML = '';
            return;
        }

        const filtered = searchData.filter(item => 
            item.toLowerCase().includes(query)
        );

        if (filtered.length > 0) {
            suggestions.innerHTML = filtered
                .map(item => `<li data-testid="suggestion-item">${item}</li>`)
                .join('');
            suggestions.classList.add('show');

            // Add click handlers to suggestions
            suggestions.querySelectorAll('li').forEach(li => {
                li.addEventListener('click', () => {
                    searchInput.value = li.textContent;
                    suggestions.classList.remove('show');
                });
            });
        } else {
            suggestions.classList.remove('show');
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.classList.remove('show');
        }
    });
}

function initTable() {
    const tableBody = document.getElementById('table-body');
    const headers = document.querySelectorAll('th[data-sort]');

    // Render table
    function renderTable(data) {
        tableBody.innerHTML = data.map(row => `
            <tr>
                <td>${row.name}</td>
                <td>${row.email}</td>
                <td>${row.role}</td>
                <td><span class="status-badge ${row.status.toLowerCase()}">${row.status}</span></td>
            </tr>
        `).join('');
    }

    // Initial render
    renderTable(getPageData());

    // Sort functionality
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.sort;

            if (currentSort.column === column) {
                currentSort.ascending = !currentSort.ascending;
            } else {
                currentSort.column = column;
                currentSort.ascending = true;
            }

            // Sort data
            tableData.sort((a, b) => {
                const aVal = a[column].toLowerCase();
                const bVal = b[column].toLowerCase();

                if (aVal < bVal) return currentSort.ascending ? -1 : 1;
                if (aVal > bVal) return currentSort.ascending ? 1 : -1;
                return 0;
            });

            // Update sort icons
            headers.forEach(h => {
                const icon = h.querySelector('.sort-icon');
                if (h === header) {
                    icon.textContent = currentSort.ascending ? '↑' : '↓';
                } else {
                    icon.textContent = '↕';
                }
            });

            renderTable(getPageData());
        });
    });
}

function getPageData() {
    const itemsPerPage = 5;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return tableData.slice(start, end);
}

function initPagination() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const totalPages = Math.ceil(tableData.length / 5);

    function updatePagination() {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;

        // Re-render table
        const tableBody = document.getElementById('table-body');
        const data = getPageData();
        tableBody.innerHTML = data.map(row => `
            <tr>
                <td>${row.name}</td>
                <td>${row.email}</td>
                <td>${row.role}</td>
                <td>${row.status}</td>
            </tr>
        `).join('');
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    updatePagination();
}

// ============================================
// Interactive Components Section
// ============================================
function initInteractive() {
    initModal();
    initTooltip();
    initToast();
    initTabs();
    initAccordion();
    initDragDrop();
}

function initModal() {
    const modal = document.getElementById('modal');
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.querySelector('.close');
    const confirmBtn = document.querySelector('[data-testid="modal-confirm"]');

    openBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    confirmBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        showToast('Modal confirmed!');
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

function initTooltip() {
    const tooltipBtn = document.getElementById('show-tooltip-btn');
    const tooltip = document.getElementById('tooltip');

    tooltipBtn.addEventListener('mouseenter', (e) => {
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - 40) + 'px';
        tooltip.classList.add('show');
    });

    tooltipBtn.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
    });
}

function initToast() {
    const toastBtn = document.getElementById('show-toast-btn');

    toastBtn.addEventListener('click', () => {
        showToast('This is a toast notification!');
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active tab pane
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function initDragDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const dropZone = document.getElementById('drop-zone');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            draggable.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', draggable.innerHTML);
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');

        const dragging = document.querySelector('.dragging');
        if (dragging) {
            dropZone.appendChild(dragging);
        }
    });
}

// ============================================
// Async Behavior Section
// ============================================
function initAsyncBehavior() {
    initDelayedContent();
    initProgressBar();
    initDelayedButton();
    initMockAPI();
}

function initDelayedContent() {
    const btn = document.getElementById('delayed-content-btn');
    const content = document.getElementById('delayed-content');

    btn.addEventListener('click', () => {
        content.textContent = 'Loading...';
        content.style.color = '#999';

        setTimeout(() => {
            content.textContent = 'Content loaded after 2 seconds! ✓';
            content.style.color = '#27ae60';
        }, 2000);
    });
}

function initProgressBar() {
    const btn = document.getElementById('progress-btn');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    btn.addEventListener('click', () => {
        let progress = 0;
        btn.disabled = true;

        const interval = setInterval(() => {
            progress += 10;
            progressFill.style.width = progress + '%';
            progressText.textContent = progress + '%';

            if (progress >= 100) {
                clearInterval(interval);
                btn.disabled = false;
                setTimeout(() => {
                    progressFill.style.width = '0%';
                    progressText.textContent = '0%';
                }, 1000);
            }
        }, 300);
    });
}

function initDelayedButton() {
    const btn = document.getElementById('enable-after-delay-btn');

    setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Button Enabled!';
        btn.classList.add('btn-primary');
    }, 3000);
}

function initMockAPI() {
    const successBtn = document.getElementById('api-success-btn');
    const errorBtn = document.getElementById('api-error-btn');
    const result = document.getElementById('api-result');

    successBtn.addEventListener('click', () => {
        result.textContent = 'Loading...';
        result.style.borderColor = '#999';

        setTimeout(() => {
            result.textContent = '✓ API Success: Data retrieved successfully!';
            result.style.borderColor = '#27ae60';
            result.style.color = '#27ae60';
        }, 1500);
    });

    errorBtn.addEventListener('click', () => {
        result.textContent = 'Loading...';
        result.style.borderColor = '#999';

        setTimeout(() => {
            result.textContent = '✗ API Error: Failed to fetch data (404)';
            result.style.borderColor = '#e74c3c';
            result.style.color = '#e74c3c';
        }, 1500);
    });
}

// ============================================
// Advanced Elements Section
// ============================================
function initAdvanced() {
    initIframe();
    initShadowDOM();
    initCanvas();
}

function initIframe() {
    // Wait for iframe to load
    const iframe = document.getElementById('demo-iframe');

    iframe.addEventListener('load', () => {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const iframeBtn = iframeDoc.getElementById('iframe-btn');
            const iframeResult = iframeDoc.getElementById('iframe-result');

            if (iframeBtn) {
                iframeBtn.addEventListener('click', () => {
                    iframeResult.textContent = 'Button inside iframe clicked!';
                    iframeResult.style.color = '#27ae60';
                });
            }
        } catch (e) {
            console.log('Cannot access iframe content:', e);
        }
    });
}

function initShadowDOM() {
    const host = document.getElementById('shadow-host');
    const shadowRoot = host.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
        <style>
            .shadow-content {
                padding: 20px;
                background: white;
                border-radius: 6px;
            }
            .shadow-button {
                padding: 10px 20px;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 1rem;
            }
            .shadow-button:hover {
                background: #5568d3;
            }
            .shadow-result {
                margin-top: 10px;
                color: #27ae60;
                font-weight: 500;
            }
        </style>
        <div class="shadow-content">
            <h4>Shadow DOM Component</h4>
            <p>This content is inside Shadow DOM</p>
            <button class="shadow-button" id="shadow-btn" data-testid="shadow-button">Click Shadow Button</button>
            <div class="shadow-result" id="shadow-result"></div>
        </div>
    `;

    const shadowBtn = shadowRoot.getElementById('shadow-btn');
    const shadowResult = shadowRoot.getElementById('shadow-result');

    shadowBtn.addEventListener('click', () => {
        shadowResult.textContent = 'Shadow DOM button clicked!';
    });
}

function initCanvas() {
    const canvas = document.getElementById('demo-canvas');
    const ctx = canvas.getContext('2d');

    // Draw a simple shape
    ctx.fillStyle = '#667eea';
    ctx.fillRect(20, 20, 100, 80);

    ctx.fillStyle = '#764ba2';
    ctx.beginPath();
    ctx.arc(200, 60, 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#27ae60';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, 120);
    ctx.lineTo(280, 120);
    ctx.stroke();

    // Add text
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.fillText('Canvas Element', 90, 140);
}

// ============================================
// Authentication Section
// ============================================
function initAuth() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const loginForm = document.getElementById('login-form');
    const dashboard = document.getElementById('dashboard');
    const userInfo = document.getElementById('user-info');
    const dashboardUser = document.getElementById('dashboard-user');

    loginBtn.addEventListener('click', () => {
        const user = username.value.trim();
        const pass = password.value.trim();

        // Simple validation
        if (user === 'demo' && pass === 'password123') {
            currentUser = user;
            loginError.textContent = '';
            loginForm.style.display = 'none';
            dashboard.style.display = 'block';
            userInfo.textContent = `Logged in as: ${user}`;
            dashboardUser.textContent = user;
            logoutBtn.style.display = 'inline-block';
            showToast('Login successful!');
        } else {
            loginError.textContent = 'Invalid username or password';
        }
    });

    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        loginForm.style.display = 'block';
        dashboard.style.display = 'none';
        userInfo.textContent = 'Not logged in';
        logoutBtn.style.display = 'none';
        username.value = '';
        password.value = '';
        loginError.textContent = '';
        showToast('Logged out successfully');
    });

    // Allow Enter key to submit
    password.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
}

// ============================================
// JavaScript Popups Section
// ============================================
let randomAlertTimeout = null;

function initPopups() {
    initAlertDialog();
    initConfirmDialog();
    initPromptDialog();
    initRandomAlert();
    initSequencePopups();
    initPopupOnLoad();
}

function initAlertDialog() {
    const btn = document.getElementById('alert-btn');
    const result = document.getElementById('alert-result');

    btn.addEventListener('click', () => {
        alert('This is a simple alert dialog!');
        result.textContent = '✓ Alert was acknowledged';
        result.style.borderColor = '#27ae60';
        result.style.color = '#27ae60';
    });
}

function initConfirmDialog() {
    const btn = document.getElementById('confirm-btn');
    const result = document.getElementById('confirm-result');

    btn.addEventListener('click', () => {
        const userChoice = confirm('Do you want to proceed?');

        if (userChoice) {
            result.textContent = '✓ User clicked OK';
            result.style.borderColor = '#27ae60';
            result.style.color = '#27ae60';
        } else {
            result.textContent = '✗ User clicked Cancel';
            result.style.borderColor = '#e74c3c';
            result.style.color = '#e74c3c';
        }
    });
}

function initPromptDialog() {
    const btn = document.getElementById('prompt-btn');
    const result = document.getElementById('prompt-result');

    btn.addEventListener('click', () => {
        const userInput = prompt('Please enter your name:');

        if (userInput === null) {
            result.textContent = '✗ User cancelled the prompt';
            result.style.borderColor = '#e74c3c';
            result.style.color = '#e74c3c';
        } else if (userInput.trim() === '') {
            result.textContent = '⚠ User entered empty text';
            result.style.borderColor = '#f39c12';
            result.style.color = '#f39c12';
        } else {
            result.textContent = `✓ User entered: "${userInput}"`;
            result.style.borderColor = '#27ae60';
            result.style.color = '#27ae60';
        }
    });
}

function initRandomAlert() {
    const btn = document.getElementById('random-alert-btn');
    const cancelBtn = document.getElementById('cancel-random-btn');
    const result = document.getElementById('random-alert-result');
    const countdownText = document.getElementById('countdown-text');

    btn.addEventListener('click', () => {
        // Random delay between 5-20 seconds
        const delay = Math.floor(Math.random() * 15000) + 5000; // 5000-20000ms
        const startTime = Date.now();
        const endTime = startTime + delay;

        btn.disabled = true;
        cancelBtn.style.display = 'inline-block';
        result.style.borderColor = '#3b82f6';

        // Update countdown
        const countdownInterval = setInterval(() => {
            const remaining = Math.ceil((endTime - Date.now()) / 1000);
            if (remaining > 0) {
                countdownText.textContent = `⏱ Alert will appear in ${remaining} seconds...`;
            } else {
                clearInterval(countdownInterval);
            }
        }, 100);

        randomAlertTimeout = setTimeout(() => {
            clearInterval(countdownInterval);
            alert('Random delayed alert appeared!');
            countdownText.textContent = '✓ Alert was shown and acknowledged';
            result.style.borderColor = '#27ae60';
            btn.disabled = false;
            cancelBtn.style.display = 'none';
        }, delay);
    });

    cancelBtn.addEventListener('click', () => {
        if (randomAlertTimeout) {
            clearTimeout(randomAlertTimeout);
            randomAlertTimeout = null;
        }
        countdownText.textContent = '✗ Random alert was cancelled';
        result.style.borderColor = '#e74c3c';
        btn.disabled = false;
        cancelBtn.style.display = 'none';
    });
}

function initSequencePopups() {
    const btn = document.getElementById('sequence-btn');
    const result = document.getElementById('sequence-result');

    btn.addEventListener('click', async () => {
        result.textContent = 'Starting sequence...';
        result.style.borderColor = '#3b82f6';
        result.style.color = '#3b82f6';

        // Step 1: Alert
        setTimeout(() => {
            alert('Step 1: This is an alert');

            // Step 2: Confirm
            setTimeout(() => {
                const confirmed = confirm('Step 2: Do you want to continue?');

                // Step 3: Prompt
                setTimeout(() => {
                    const name = prompt('Step 3: Enter your name:');

                    // Show results
                    result.textContent = `✓ Sequence completed!\nConfirm: ${confirmed ? 'OK' : 'Cancel'}\nName: ${name || '(cancelled)'}`;
                    result.style.borderColor = '#27ae60';
                    result.style.color = '#27ae60';
                }, 500);
            }, 500);
        }, 500);
    });
}

function initPopupOnLoad() {
    const checkbox = document.getElementById('popup-on-load');
    const popupsSection = document.getElementById('popups');

    // Check if we should show popup when section becomes active
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (popupsSection.classList.contains('active') && checkbox.checked) {
                    setTimeout(() => {
                        alert('Welcome to the JavaScript Popups section!');
                    }, 500);
                }
            }
        });
    });

    observer.observe(popupsSection, { attributes: true });
}

// ============================================
// Initialize All Components
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initBasicInputs();
    initFormControls();
    initDynamicData();
    initInteractive();
    initPopups();
    initAsyncBehavior();
    initAdvanced();
    initAuth();

    console.log('🎭 Playwright Training Demo App initialized!');
    console.log('💼 Pragmatic Test Labs - Professional Playwright Training');
});



