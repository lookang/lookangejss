// ============================================================================
// EXPRESS FRACTIONS AS SINGLE FRACTION - INTERACTIVE LEARNING TOOL
// ============================================================================
// This interactive helps Secondary 1-2 students learn to combine fractions
// with different denominators into a single simplified fraction.
// Features: Visual models, step-by-step solutions, hints, and analytics
// ============================================================================

// Global state management
const state = {
    currentProblem: null,
    startTime: 0,
    problemsAttempted: 0,
    correctAnswers: 0,
    inputDevice: 'unknown',
    touchStartTime: 0,
    lastTouchElement: null
};

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    detectInputDevice();
    setupEventListeners();
    generateNewProblem();
    showHeaderTooltip();
});

// Initialize application
function initializeApp() {
    state.startTime = Date.now();
    logAction('🚀 Interactive started', 'Application initialized');
}

// Show header tooltip briefly on load
function showHeaderTooltip() {
    const tooltip = document.getElementById('headerTooltip');
    tooltip.classList.add('visible');
    setTimeout(() => {
        tooltip.classList.remove('visible');
    }, 3000);
}

// ============================================================================
// INPUT DEVICE DETECTION
// ============================================================================

function detectInputDevice() {
    const deviceSpan = document.getElementById('inputDevice');
    
    // Check for touch support
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check for mouse support
    const hasMouse = matchMedia('(pointer: fine)').matches;
    
    // Determine device type
    if (hasTouch && !hasMouse) {
        state.inputDevice = 'Touch (Capacitive/IR)';
    } else if (hasTouch && hasMouse) {
        state.inputDevice = 'Hybrid (Touch + Mouse)';
    } else {
        state.inputDevice = 'Mouse';
    }
    
    deviceSpan.textContent = state.inputDevice;
    logAction('📱 Device detected', `Input method: ${state.inputDevice}`);
}

// ============================================================================
// EVENT LISTENERS SETUP
// ============================================================================

function setupEventListeners() {
    // Button event listeners with touch support
    addTouchButton('newProblemBtn', generateNewProblem);
    addTouchButton('showHintBtn', showHint);
    addTouchButton('showStepsBtn', showSteps);
    addTouchButton('checkAnswerBtn', checkAnswer);
    addTouchButton('closeHintBtn', closeHint);
    addTouchButton('closeStepsBtn', closeSteps);
    addTouchButton('closeTooltip', () => {
        document.getElementById('headerTooltip').classList.remove('visible');
    });
    addTouchButton('toggleAnalytics', toggleAnalytics);
    addTouchButton('clearLogBtn', clearLog);
    
    // Difficulty change
    document.getElementById('difficultyLevel').addEventListener('change', (e) => {
        logAction('⚙️ Difficulty changed', `New difficulty: ${e.target.value}`);
        generateNewProblem();
    });
    
    // Input field changes
    document.getElementById('numeratorInput').addEventListener('input', (e) => {
        logAction('✏️ Input changed', `Numerator: ${e.target.value}`);
    });
    
    document.getElementById('denominatorInput').addEventListener('input', (e) => {
        logAction('✏️ Input changed', `Denominator: ${e.target.value}`);
    });
    
    // Show tooltip on container hover/touch
    const container = document.getElementById('mainContainer');
    let tooltipTimeout;
    
    container.addEventListener('mouseenter', () => {
        tooltipTimeout = setTimeout(() => {
            document.getElementById('headerTooltip').classList.add('visible');
        }, 500);
    });
    
    container.addEventListener('mouseleave', () => {
        clearTimeout(tooltipTimeout);
    });
    
    // Touch outside to close panels
    document.addEventListener('click', (e) => {
        const hintPanel = document.getElementById('hintPanel');
        const stepsPanel = document.getElementById('stepsPanel');
        
        if (!hintPanel.contains(e.target) && !document.getElementById('showHintBtn').contains(e.target)) {
            hintPanel.classList.add('hidden');
        }
        
        if (!stepsPanel.contains(e.target) && !document.getElementById('showStepsBtn').contains(e.target)) {
            stepsPanel.classList.add('hidden');
        }
    });
}

// ============================================================================
// TOUCH-OPTIMIZED BUTTON HANDLER
// ============================================================================

function addTouchButton(elementId, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let touchStartTime = 0;
    let touchMoved = false;
    
    // Touch events
    element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchStartTime = Date.now();
        touchMoved = false;
        element.setAttribute('data-touch-active', 'true');
    }, { passive: false });
    
    element.addEventListener('touchmove', () => {
        touchMoved = true;
    });
    
    element.addEventListener('touchend', (e) => {
        e.preventDefault();
        element.removeAttribute('data-touch-active');
        
        const touchDuration = Date.now() - touchStartTime;
        
        // Debounce for IR touch (50ms minimum)
        if (!touchMoved && touchDuration > 50 && touchDuration < 1000) {
            setTimeout(() => callback(), 10);
        }
    }, { passive: false });
    
    // Mouse events (for desktop)
    element.addEventListener('click', (e) => {
        if (!('ontouchstart' in window)) {
            callback();
        }
    });
}

// ============================================================================
// PROBLEM GENERATION
// ============================================================================

function generateNewProblem() {
    const difficulty = document.getElementById('difficultyLevel').value;
    
    // Clear previous inputs and feedback
    document.getElementById('numeratorInput').value = '';
    document.getElementById('denominatorInput').value = '';
    document.getElementById('feedbackMessage').textContent = '';
    document.getElementById('feedbackMessage').className = 'feedback-message';
    
    // Hide panels
    document.getElementById('hintPanel').classList.add('hidden');
    document.getElementById('stepsPanel').classList.add('hidden');
    
    // Generate problem based on difficulty
    let problem;
    if (difficulty === 'easy') {
        problem = generateEasyProblem();
    } else if (difficulty === 'medium') {
        problem = generateMediumProblem();
    } else {
        problem = generateHardProblem();
    }
    
    state.currentProblem = problem;
    
    // Display problem
    displayProblem(problem);
    
    // Draw visual representation
    drawVisualRepresentation(problem);
    
    logAction('📝 New problem generated', `${problem.display} (Difficulty: ${difficulty})`);
}

// Generate easy problem (simple addition/subtraction)
function generateEasyProblem() {
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    // Simple denominators (2-6)
    const denom1 = Math.floor(Math.random() * 5) + 2;
    const denom2 = Math.floor(Math.random() * 5) + 2;
    
    // Numerators smaller than denominators
    const num1 = Math.floor(Math.random() * (denom1 - 1)) + 1;
    const num2 = Math.floor(Math.random() * (denom2 - 1)) + 1;
    
    return createProblem(num1, denom1, num2, denom2, operation);
}

// Generate medium problem (mixed operations, larger numbers)
function generateMediumProblem() {
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    // Medium denominators (3-12)
    const denom1 = Math.floor(Math.random() * 10) + 3;
    const denom2 = Math.floor(Math.random() * 10) + 3;
    
    const num1 = Math.floor(Math.random() * denom1) + 1;
    const num2 = Math.floor(Math.random() * denom2) + 1;
    
    return createProblem(num1, denom1, num2, denom2, operation);
}

// Generate hard problem (complex fractions)
function generateHardProblem() {
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    // Larger denominators (5-20)
    const denom1 = Math.floor(Math.random() * 16) + 5;
    const denom2 = Math.floor(Math.random() * 16) + 5;
    
    const num1 = Math.floor(Math.random() * denom1) + 1;
    const num2 = Math.floor(Math.random() * denom2) + 1;
    
    return createProblem(num1, denom1, num2, denom2, operation);
}

// Create problem object with solution
function createProblem(num1, denom1, num2, denom2, operation) {
    // Calculate LCM of denominators
    const lcm = calculateLCM(denom1, denom2);
    
    // Convert to equivalent fractions
    const newNum1 = num1 * (lcm / denom1);
    const newNum2 = num2 * (lcm / denom2);
    
    // Perform operation
    let resultNum;
    if (operation === '+') {
        resultNum = newNum1 + newNum2;
    } else {
        resultNum = newNum1 - newNum2;
    }
    
    // Simplify result
    const gcd = calculateGCD(Math.abs(resultNum), lcm);
    const simplifiedNum = resultNum / gcd;
    const simplifiedDenom = lcm / gcd;
    
    return {
        num1,
        denom1,
        num2,
        denom2,
        operation,
        lcm,
        newNum1,
        newNum2,
        resultNum,
        resultDenom: lcm,
        simplifiedNum,
        simplifiedDenom,
        display: `${num1}/${denom1} ${operation} ${num2}/${denom2}`
    };
}

// ============================================================================
// MATHEMATICAL UTILITIES
// ============================================================================

// Calculate Greatest Common Divisor
function calculateGCD(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Calculate Least Common Multiple
function calculateLCM(a, b) {
    return Math.abs(a * b) / calculateGCD(a, b);
}

// ============================================================================
// DISPLAY FUNCTIONS
// ============================================================================

function displayProblem(problem) {
    const problemText = document.getElementById('problemText');
    problemText.innerHTML = `
        <span style="font-size: 28px;">
            <sup>${problem.num1}</sup>/<sub>${problem.denom1}</sub>
            ${problem.operation}
            <sup>${problem.num2}</sup>/<sub>${problem.denom2}</sub>
        </span>
    `;
}

// ============================================================================
// VISUAL REPRESENTATION (Canvas Drawing)
// ============================================================================

function drawVisualRepresentation(problem) {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw fraction bars
    const barWidth = 160;
    const barHeight = 40;
    const startX = 20;
    const startY = 30;
    
    // First fraction
    drawFractionBar(ctx, startX, startY, barWidth, barHeight, problem.num1, problem.denom1, '#667eea');
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${problem.num1}/${problem.denom1}`, startX + barWidth / 2, startY + barHeight + 20);
    
    // Operation symbol
    ctx.fillStyle = '#764ba2';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(problem.operation, startX + barWidth + 30, startY + barHeight / 2 + 8);
    
    // Second fraction
    const secondX = startX + barWidth + 60;
    drawFractionBar(ctx, secondX, startY, barWidth, barHeight, problem.num2, problem.denom2, '#764ba2');
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`${problem.num2}/${problem.denom2}`, secondX + barWidth / 2, startY + barHeight + 20);
    
    // Result (if answer is checked)
    const feedback = document.getElementById('feedbackMessage');
    if (feedback.classList.contains('correct')) {
        const resultY = startY + 90;
        ctx.fillStyle = '#333';
        ctx.font = 'bold 18px Arial';
        ctx.fillText('=', canvas.width / 2, resultY - 20);
        
        drawFractionBar(ctx, canvas.width / 2 - barWidth / 2, resultY, barWidth, barHeight, 
            problem.simplifiedNum, problem.simplifiedDenom, '#28a745');
        ctx.fillStyle = '#28a745';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(`${problem.simplifiedNum}/${problem.simplifiedDenom}`, 
            canvas.width / 2, resultY + barHeight + 20);
    }
}

// Draw a single fraction bar
function drawFractionBar(ctx, x, y, width, height, numerator, denominator, color) {
    const segmentWidth = width / denominator;
    
    // Draw all segments
    for (let i = 0; i < denominator; i++) {
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + i * segmentWidth, y, segmentWidth, height);
        
        // Fill numerator segments
        if (i < numerator) {
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.6;
            ctx.fillRect(x + i * segmentWidth + 1, y + 1, segmentWidth - 2, height - 2);
            ctx.globalAlpha = 1.0;
        }
    }
}

// ============================================================================
// HINT SYSTEM
// ============================================================================

function showHint() {
    const hintPanel = document.getElementById('hintPanel');
    const hintContent = document.getElementById('hintContent');
    const problem = state.currentProblem;
    
    const hints = [
        `💡 <strong>Step 1:</strong> Find the Least Common Multiple (LCM) of the denominators ${problem.denom1} and ${problem.denom2}.`,
        `💡 <strong>Step 2:</strong> The LCM is ${problem.lcm}. Convert both fractions to have this common denominator.`,
        `💡 <strong>Step 3:</strong> ${problem.num1}/${problem.denom1} = ${problem.newNum1}/${problem.lcm} and ${problem.num2}/${problem.denom2} = ${problem.newNum2}/${problem.lcm}`,
        `💡 <strong>Step 4:</strong> Now ${problem.operation === '+' ? 'add' : 'subtract'} the numerators: ${problem.newNum1} ${problem.operation} ${problem.newNum2} = ${problem.resultNum}`,
        `💡 <strong>Step 5:</strong> Simplify ${problem.resultNum}/${problem.lcm} by dividing both by their GCD.`
    ];
    
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    hintContent.innerHTML = randomHint;
    
    hintPanel.classList.remove('hidden');
    logAction('💡 Hint requested', 'Student viewed hint');
}

function closeHint() {
    document.getElementById('hintPanel').classList.add('hidden');
    logAction('❌ Hint closed', 'Student closed hint panel');
}

// ============================================================================
// STEP-BY-STEP SOLUTION
// ============================================================================

function showSteps() {
    const stepsPanel = document.getElementById('stepsPanel');
    const stepsContent = document.getElementById('stepsContent');
    const problem = state.currentProblem;
    
    const gcd = calculateGCD(Math.abs(problem.resultNum), problem.lcm);
    
    const stepsHTML = `
        <div class="step-item">
            <span class="step-number">Step 1:</span> Find the LCM of ${problem.denom1} and ${problem.denom2}
            <br><strong>LCM = ${problem.lcm}</strong>
            <br><em>Why? We need a common denominator to add/subtract fractions.</em>
        </div>
        <div class="step-item">
            <span class="step-number">Step 2:</span> Convert fractions to equivalent fractions with denominator ${problem.lcm}
            <br>${problem.num1}/${problem.denom1} = ${problem.num1} × ${problem.lcm / problem.denom1}/${problem.denom1} × ${problem.lcm / problem.denom1} = <strong>${problem.newNum1}/${problem.lcm}</strong>
            <br>${problem.num2}/${problem.denom2} = ${problem.num2} × ${problem.lcm / problem.denom2}/${problem.denom2} × ${problem.lcm / problem.denom2} = <strong>${problem.newNum2}/${problem.lcm}</strong>
        </div>
        <div class="step-item">
            <span class="step-number">Step 3:</span> ${problem.operation === '+' ? 'Add' : 'Subtract'} the numerators
            <br>${problem.newNum1}/${problem.lcm} ${problem.operation} ${problem.newNum2}/${problem.lcm} = <strong>${problem.resultNum}/${problem.lcm}</strong>
            <br><em>Why? When denominators are the same, we only ${problem.operation === '+' ? 'add' : 'subtract'} numerators.</em>
        </div>
        <div class="step-item">
            <span class="step-number">Step 4:</span> Simplify the fraction
            <br>GCD of ${Math.abs(problem.resultNum)} and ${problem.lcm} is ${gcd}
            <br>${problem.resultNum}/${problem.lcm} = ${problem.resultNum}÷${gcd}/${problem.lcm}÷${gcd} = <strong>${problem.simplifiedNum}/${problem.simplifiedDenom}</strong>
        </div>
        <div class="step-item" style="background: #d4edda; border: 2px solid #28a745;">
            <span class="step-number">Final Answer:</span> <strong style="font-size: 18px; color: #28a745;">${problem.simplifiedNum}/${problem.simplifiedDenom}</strong>
        </div>
    `;
    
    stepsContent.innerHTML = stepsHTML;
    stepsPanel.classList.remove('hidden');
    logAction('📝 Steps requested', 'Student viewed step-by-step solution');
}

function closeSteps() {
    document.getElementById('stepsPanel').classList.add('hidden');
    logAction('❌ Steps closed', 'Student closed steps panel');
}

// ============================================================================
// ANSWER CHECKING
// ============================================================================

function checkAnswer() {
    const numeratorInput = document.getElementById('numeratorInput');
    const denominatorInput = document.getElementById('denominatorInput');
    const feedbackMessage = document.getElementById('feedbackMessage');
    
    const userNum = parseInt(numeratorInput.value);
    const userDenom = parseInt(denominatorInput.value);
    
    // Validate input
    if (isNaN(userNum) || isNaN(userDenom) || userDenom === 0) {
        feedbackMessage.textContent = '⚠️ Please enter valid numbers. Denominator cannot be zero!';
        feedbackMessage.className = 'feedback-message incorrect';
        logAction('⚠️ Invalid input', `User entered: ${numeratorInput.value}/${denominatorInput.value}`);
        return;
    }
    
    const problem = state.currentProblem;
    
    // Check if answer is equivalent (may not be simplified)
    const userSimplified = simplifyFraction(userNum, userDenom);
    const correctSimplified = { num: problem.simplifiedNum, denom: problem.simplifiedDenom };
    
    const isCorrect = userSimplified.num === correctSimplified.num && 
                      userSimplified.denom === correctSimplified.denom;
    
    state.problemsAttempted++;
    
    if (isCorrect) {
        state.correctAnswers++;
        feedbackMessage.textContent = '✅ Correct! Well done!';
        feedbackMessage.className = 'feedback-message correct';
        logAction('✅ Correct answer', `${userNum}/${userDenom} = ${problem.simplifiedNum}/${problem.simplifiedDenom}`, true);
        
        // Redraw with result
        drawVisualRepresentation(problem);
    } else {
        feedbackMessage.textContent = `❌ Not quite. The correct answer is ${problem.simplifiedNum}/${problem.simplifiedDenom}. Try another problem!`;
        feedbackMessage.className = 'feedback-message incorrect';
        logAction('❌ Incorrect answer', `User: ${userNum}/${userDenom}, Correct: ${problem.simplifiedNum}/${problem.simplifiedDenom}`, false);
    }
    
    updateAnalytics();
}

// Simplify a fraction
function simplifyFraction(num, denom) {
    const gcd = calculateGCD(Math.abs(num), Math.abs(denom));
    return {
        num: num / gcd,
        denom: denom / gcd
    };
}

// ============================================================================
// ANALYTICS FUNCTIONS
// ============================================================================

function updateAnalytics() {
    document.getElementById('problemsAttempted').textContent = state.problemsAttempted;
    document.getElementById('correctAnswers').textContent = state.correctAnswers;
    
    const accuracy = state.problemsAttempted > 0 
        ? Math.round((state.correctAnswers / state.problemsAttempted) * 100) 
        : 0;
    document.getElementById('accuracy').textContent = accuracy + '%';
}

function toggleAnalytics() {
    const content = document.getElementById('analyticsContent');
    const button = document.getElementById('toggleAnalytics');
    
    content.classList.toggle('collapsed');
    button.textContent = content.classList.contains('collapsed') ? '+' : '−';
    
    logAction('📊 Analytics toggled', content.classList.contains('collapsed') ? 'Collapsed' : 'Expanded');
}

function clearLog() {
    const actionLog = document.getElementById('actionLog');
    actionLog.innerHTML = '';
    logAction('🗑️ Log cleared', 'Action log was cleared by user');
}

function logAction(action, details, isCorrect = null) {
    const actionLog = document.getElementById('actionLog');
    const timestamp = ((Date.now() - state.startTime) / 1000).toFixed(1);
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    if (isCorrect === true) {
        logEntry.classList.add('log-correct');
    } else if (isCorrect === false) {
        logEntry.classList.add('log-incorrect');
    }
    
    logEntry.innerHTML = `
        <div class="log-time">t=${timestamp}s</div>
        <div class="log-action"><strong>${action}</strong>: ${details}</div>
    `;
    
    actionLog.insertBefore(logEntry, actionLog.firstChild);
    
    // Limit log to 50 entries
    while (actionLog.children.length > 50) {
        actionLog.removeChild(actionLog.lastChild);
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Detect if running in iframe or standalone
if (window.self === window.top) {
    document.body.classList.add('standalone');
}

// Prevent default touch behaviors that interfere with custom touch handling
document.addEventListener('touchmove', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
        e.preventDefault();
    }
}, { passive: false });

// ============================================================================
// END OF SCRIPT
// ============================================================================