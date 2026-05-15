// Global variables for tracking and state management
let analytics = {
    problemsAttempted: 0,
    operationsUsed: { '+': 0, '-': 0, '*': 0, '/': 0 },
    startTime: Date.now(),
    stepsViewed: 0
};

let currentFractions = {
    num1: 1, den1: 2,
    num2: 1, den2: 3,
    operation: '+'
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateDisplay();
    startAnalyticsTimer();
});

/**
 * Initialize the application with default values and setup
 */
function initializeApp() {
    console.log('Initializing Express Fractions as Single Fraction Interactive');
    
    // Set initial values
    document.getElementById('num1').value = 1;
    document.getElementById('den1').value = 2;
    document.getElementById('num2').value = 1;
    document.getElementById('den2').value = 3;
    document.getElementById('operation').value = '+';
    
    // Draw initial fraction visualizations
    drawFractionCircle('circle1', 1, 2, '#3498db');
    drawFractionCircle('circle2', 1, 3, '#e74c3c');
    calculateAndDisplay();
}

/**
 * Set up all event listeners for user interactions
 */
function setupEventListeners() {
    // Input field listeners
    ['num1', 'den1', 'num2', 'den2'].forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('input', handleInputChange);
        element.addEventListener('focus', () => element.select());
    });
    
    // Operation selector listener
    document.getElementById('operation').addEventListener('change', handleOperationChange);
    
    // Button listeners
    document.getElementById('calculateBtn').addEventListener('click', handleCalculate);
    document.getElementById('resetBtn').addEventListener('click', handleReset);
    document.getElementById('randomBtn').addEventListener('click', handleRandomExample);
    
    // Show steps toggle
    document.getElementById('showSteps').addEventListener('change', handleStepsToggle);
    
    // Canvas hover effects
    ['circle1', 'circle2', 'resultCircle'].forEach(id => {
        const canvas = document.getElementById(id);
        canvas.addEventListener('mouseenter', () => canvas.classList.add('pulse'));
        canvas.addEventListener('mouseleave', () => canvas.classList.remove('pulse'));
    });
}

/**
 * Handle input field changes and update display
 */
function handleInputChange(event) {
    const value = parseInt(event.target.value) || 0;
    const id = event.target.id;
    
    // Validate denominator (cannot be zero)
    if ((id === 'den1' || id === 'den2') && value === 0) {
        event.target.value = 1;
        showTooltip(event.target, 'Denominator cannot be zero!');
        return;
    }
    
    // Validate numerator to ensure fraction is <= 1 (for positive fractions)
    if ((id === 'num1' || id === 'num2') && value > 0) {
        const denId = id === 'num1' ? 'den1' : 'den2';
        const denominator = parseInt(document.getElementById(denId).value) || 1;
        if (value > denominator) {
            event.target.value = denominator;
            showTooltip(event.target, 'Fraction must be ≤ 1. Numerator cannot exceed denominator.');
            return;
        }
    }
    
    // Update current fractions
    if (id === 'num1') currentFractions.num1 = parseInt(event.target.value) || 0;
    else if (id === 'den1') {
        currentFractions.den1 = value;
        // Check if numerator needs adjustment
        const num1 = parseInt(document.getElementById('num1').value) || 0;
        if (num1 > 0 && num1 > value) {
            document.getElementById('num1').value = value;
            currentFractions.num1 = value;
            showTooltip(document.getElementById('num1'), 'Adjusted numerator to maintain fraction ≤ 1');
        }
    }
    else if (id === 'num2') currentFractions.num2 = parseInt(event.target.value) || 0;
    else if (id === 'den2') {
        currentFractions.den2 = value;
        // Check if numerator needs adjustment
        const num2 = parseInt(document.getElementById('num2').value) || 0;
        if (num2 > 0 && num2 > value) {
            document.getElementById('num2').value = value;
            currentFractions.num2 = value;
            showTooltip(document.getElementById('num2'), 'Adjusted numerator to maintain fraction ≤ 1');
        }
    }
    
    updateDisplay();
}

/**
 * Handle operation selection change
 */
function handleOperationChange(event) {
    currentFractions.operation = event.target.value;
    document.getElementById('opSymbol').textContent = event.target.value === '*' ? '×' : 
                                                     event.target.value === '/' ? '÷' : 
                                                     event.target.value;
    updateDisplay();
}

/**
 * Handle calculate button click
 */
function handleCalculate() {
    analytics.problemsAttempted++;
    analytics.operationsUsed[currentFractions.operation]++;
    
    // Add highlight animation to result
    document.getElementById('resultCircle').classList.add('highlight');
    setTimeout(() => {
        document.getElementById('resultCircle').classList.remove('highlight');
    }, 600);
    
    calculateAndDisplay();
    updateAnalytics();
}

/**
 * Handle reset button click
 */
function handleReset() {
    document.getElementById('num1').value = 1;
    document.getElementById('den1').value = 2;
    document.getElementById('num2').value = 1;
    document.getElementById('den2').value = 3;
    document.getElementById('operation').value = '+';
    
    currentFractions = { num1: 1, den1: 2, num2: 1, den2: 3, operation: '+' };
    
    initializeApp();
    showTooltip(document.getElementById('resetBtn'), 'Reset to default values');
}

/**
 * Handle random example generation - Modified to ensure fractions ≤ 1
 */
function handleRandomExample() {
    const operations = ['+', '-', '*', '/'];
    const randomOp = operations[Math.floor(Math.random() * operations.length)];
    
    // Generate fractions that are ≤ 1
    const den1 = Math.floor(Math.random() * 10) + 2; // 2-11
    const num1 = Math.floor(Math.random() * den1) + 1; // 1 to den1 (ensuring ≤ 1)
    const den2 = Math.floor(Math.random() * 10) + 2; // 2-11
    const num2 = Math.floor(Math.random() * den2) + 1; // 1 to den2 (ensuring ≤ 1)
    
    document.getElementById('num1').value = num1;
    document.getElementById('den1').value = den1;
    document.getElementById('num2').value = num2;
    document.getElementById('den2').value = den2;
    document.getElementById('operation').value = randomOp;
    
    currentFractions = { num1, den1, num2, den2, operation: randomOp };
    
    updateDisplay();
    showTooltip(document.getElementById('randomBtn'), 'Generated random example with fractions ≤ 1');
}

/**
 * Handle show steps toggle
 */
function handleStepsToggle(event) {
    const stepsContainer = document.getElementById('stepsContainer');
    if (event.target.checked) {
        stepsContainer.style.display = 'block';
        analytics.stepsViewed++;
    } else {
        stepsContainer.style.display = 'none';
    }
    updateAnalytics();
}

/**
 * Update all visual displays based on current fraction values
 */
function updateDisplay() {
    // Update fraction displays
    document.getElementById('display1').textContent = `${currentFractions.num1}/${currentFractions.den1}`;
    document.getElementById('display2').textContent = `${currentFractions.num2}/${currentFractions.den2}`;
    
    // Update operation symbol
    const opSymbol = currentFractions.operation === '*' ? '×' : 
                     currentFractions.operation === '/' ? '÷' : 
                     currentFractions.operation;
    document.getElementById('opSymbol').textContent = opSymbol;
    
    // Redraw fraction circles
    drawFractionCircle('circle1', currentFractions.num1, currentFractions.den1, '#3498db');
    drawFractionCircle('circle2', currentFractions.num2, currentFractions.den2, '#e74c3c');
    
    // Calculate and display result
    calculateAndDisplay();
}

/**
 * Calculate the result and update display with working steps
 */
function calculateAndDisplay() {
    const { num1, den1, num2, den2, operation } = currentFractions;
    let resultNum, resultDen, steps = [];
    
    switch (operation) {
        case '+':
            steps = calculateAddition(num1, den1, num2, den2);
            break;
        case '-':
            steps = calculateSubtraction(num1, den1, num2, den2);
            break;
        case '*':
            steps = calculateMultiplication(num1, den1, num2, den2);
            break;
        case '/':
            steps = calculateDivision(num1, den1, num2, den2);
            break;
    }
    
    resultNum = steps.result.num;
    resultDen = steps.result.den;
    
    // Simplify the result
    const gcd = findGCD(Math.abs(resultNum), Math.abs(resultDen));
    const simplifiedNum = resultNum / gcd;
    const simplifiedDen = resultDen / gcd;
    
    // Update result display
    document.getElementById('resultDisplay').textContent = `${simplifiedNum}/${simplifiedDen}`;
    
    // Draw result circle - Modified to handle fractions > 1
    drawFractionCircle('resultCircle', simplifiedNum, simplifiedDen, '#27ae60');
    
    // Update working steps
    updateWorkingSteps(steps.steps, simplifiedNum, simplifiedDen, resultNum, resultDen);
}

/**
 * Calculate addition of two fractions
 */
function calculateAddition(num1, den1, num2, den2) {
    const lcm = findLCM(den1, den2);
    const newNum1 = num1 * (lcm / den1);
    const newNum2 = num2 * (lcm / den2);
    const resultNum = newNum1 + newNum2;
    
    return {
        result: { num: resultNum, den: lcm },
        steps: [
            `Step 1: Find LCM of denominators ${den1} and ${den2} = ${lcm}`,
            `Step 2: Convert fractions: ${num1}/${den1} = ${newNum1}/${lcm}, ${num2}/${den2} = ${newNum2}/${lcm}`,
            `Step 3: Add numerators: ${newNum1} + ${newNum2} = ${resultNum}`,
            `Step 4: Result: ${resultNum}/${lcm}`
        ]
    };
}

/**
 * Calculate subtraction of two fractions
 */
function calculateSubtraction(num1, den1, num2, den2) {
    const lcm = findLCM(den1, den2);
    const newNum1 = num1 * (lcm / den1);
    const newNum2 = num2 * (lcm / den2);
    const resultNum = newNum1 - newNum2;
    
    return {
        result: { num: resultNum, den: lcm },
        steps: [
            `Step 1: Find LCM of denominators ${den1} and ${den2} = ${lcm}`,
            `Step 2: Convert fractions: ${num1}/${den1} = ${newNum1}/${lcm}, ${num2}/${den2} = ${newNum2}/${lcm}`,
            `Step 3: Subtract numerators: ${newNum1} - ${newNum2} = ${resultNum}`,
            `Step 4: Result: ${resultNum}/${lcm}`
        ]
    };
}

/**
 * Calculate multiplication of two fractions
 */
function calculateMultiplication(num1, den1, num2, den2) {
    const resultNum = num1 * num2;
    const resultDen = den1 * den2;
    
    return {
        result: { num: resultNum, den: resultDen },
        steps: [
            `Step 1: Multiply numerators: ${num1} × ${num2} = ${resultNum}`,
            `Step 2: Multiply denominators: ${den1} × ${den2} = ${resultDen}`,
            `Step 3: Result: ${resultNum}/${resultDen}`,
            `Step 4: Simplify if possible`
        ]
    };
}

/**
 * Calculate division of two fractions
 */
function calculateDivision(num1, den1, num2, den2) {
    const resultNum = num1 * den2;
    const resultDen = den1 * num2;
    
    return {
        result: { num: resultNum, den: resultDen },
        steps: [
            `Step 1: Flip the second fraction: ${num2}/${den2} becomes ${den2}/${num2}`,
            `Step 2: Multiply: ${num1}/${den1} × ${den2}/${num2}`,
            `Step 3: Multiply numerators and denominators: ${resultNum}/${resultDen}`,
            `Step 4: Simplify if possible`
        ]
    };
}

/**
 * Update the working steps display
 */
function updateWorkingSteps(steps, simplifiedNum, simplifiedDen, originalNum, originalDen) {
    const stepsContent = document.getElementById('stepsContent');
    stepsContent.innerHTML = '';
    
    steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        stepDiv.textContent = step;
        stepDiv.addEventListener('mouseenter', () => stepDiv.classList.add('highlight'));
        stepDiv.addEventListener('mouseleave', () => stepDiv.classList.remove('highlight'));
        stepsContent.appendChild(stepDiv);
    });
    
    // Add simplification step if needed
    if (originalNum !== simplifiedNum || originalDen !== simplifiedDen) {
        const gcd = findGCD(Math.abs(originalNum), Math.abs(originalDen));
        const simplifyStep = document.createElement('div');
        simplifyStep.className = 'step';
        simplifyStep.textContent = `Step 5: Simplify by dividing by GCD(${Math.abs(originalNum)}, ${Math.abs(originalDen)}) = ${gcd}: ${simplifiedNum}/${simplifiedDen}`;
        simplifyStep.style.backgroundColor = '#d4edda';
        simplifyStep.style.borderLeftColor = '#28a745';
        stepsContent.appendChild(simplifyStep);
    }
}

/**
 * Draw fraction visualization on canvas - Modified to handle fractions > 1 and show complete circles
 */
function drawFractionCircle(canvasId, numerator, denominator, color) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 45;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#dee2e6';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw fraction representation
    if (denominator > 0) {
        const absNumerator = Math.abs(numerator);
        const absDenominator = Math.abs(denominator);
        
        // Calculate how many complete circles and remaining fraction
        const wholeCircles = Math.floor(absNumerator / absDenominator);
        const remainingNumerator = absNumerator % absDenominator;
        
        // If we have a complete circle (fraction >= 1), fill the entire circle
        if (wholeCircles >= 1) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = numerator >= 0 ? color : '#ff6b6b';
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Add indicator for multiple circles if > 1
            if (wholeCircles > 1) {
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(`×${wholeCircles}`, centerX, centerY - radius + 5);
            }
        } else {
            // Draw partial circle for fractions < 1
            const anglePerSection = (2 * Math.PI) / absDenominator;
            const filledSections = remainingNumerator;
            
            // Draw sections
            for (let i = 0; i < absDenominator; i++) {
                const startAngle = i * anglePerSection - Math.PI / 2;
                const endAngle = (i + 1) * anglePerSection - Math.PI / 2;
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx.closePath();
                
                if (i < filledSections) {
                    ctx.fillStyle = numerator >= 0 ? color : '#ff6b6b';
                    ctx.fill();
                }
                
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
        
        // Add remaining fraction if there's a partial circle after whole circles
        if (wholeCircles >= 1 && remainingNumerator > 0) {
            // Draw a small indicator for the remaining fraction
            ctx.fillStyle = '#333';
            ctx.font = 'bold 8px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(`+${remainingNumerator}/${absDenominator}`, centerX, centerY + radius - 5);
        }
        
        // Add fraction text in center
        ctx.fillStyle = wholeCircles >= 1 ? '#fff' : '#333';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Position text differently for complete circles
        const textY = wholeCircles >= 1 && remainingNumerator > 0 ? centerY - 10 : centerY;
        ctx.fillText(`${numerator}/${denominator}`, centerX, textY);
    }
}

/**
 * Find Greatest Common Divisor using Euclidean algorithm
 */
function findGCD(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

/**
 * Find Least Common Multiple
 */
function findLCM(a, b) {
    return Math.abs(a * b) / findGCD(a, b);
}

/**
 * Show tooltip with message
 */
function showTooltip(element, message) {
    const tooltip = document.getElementById('tooltip');
    const rect = element.getBoundingClientRect();
    
    tooltip.textContent = message;
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    tooltip.classList.add('show');
    
    setTimeout(() => {
        tooltip.classList.remove('show');
    }, 2000);
}

/**
 * Update analytics display
 */
function updateAnalytics() {
    document.getElementById('problemsAttempted').textContent = analytics.problemsAttempted;
    
    const opsText = `Add: ${analytics.operationsUsed['+']} | Sub: ${analytics.operationsUsed['-']} | Mul: ${analytics.operationsUsed['*']} | Div: ${analytics.operationsUsed['/']}`;
    document.getElementById('operationsUsed').textContent = opsText;
    
    document.getElementById('stepsViewed').textContent = analytics.stepsViewed;
}

/**
 * Start analytics timer for tracking time spent
 */
function startAnalyticsTimer() {
    setInterval(() => {
        const timeSpent = Math.floor((Date.now() - analytics.startTime) / 1000);
        const minutes = Math.floor(timeSpent / 60);
        const seconds = timeSpent % 60;
        document.getElementById('timeSpent').textContent = `${minutes}m ${seconds}s`;
    }, 1000);
}

// Console log for debugging
console.log('Express Fractions as Single Fraction Interactive loaded successfully');