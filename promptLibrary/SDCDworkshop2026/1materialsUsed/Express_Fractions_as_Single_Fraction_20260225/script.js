// ===================================
// GLOBAL VARIABLES AND STATE
// ===================================

// Check if running standalone (new tab) or in iframe
if (window.self === window.top) {
    document.body.classList.add('standalone');
}

// Problem state
let currentProblem = null;
let currentStepIndex = 0;
let startTime = Date.now();
let actionCount = 0;

// ADDED: Resizable solution section state
let isResizing = false;
let resizeStartY = 0;
let resizeStartHeight = 0;

// Seeded random number generator for reproducible problems
class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }
    
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
    
    nextInt(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
}

let rng = new SeededRandom(Date.now());

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Calculate GCD (Greatest Common Divisor)
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Calculate LCM (Least Common Multiple)
function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

// Simplify a fraction
function simplifyFraction(num, den) {
    if (den === 0) return { numerator: num, denominator: 1 };
    
    const divisor = gcd(num, den);
    let simplifiedNum = num / divisor;
    let simplifiedDen = den / divisor;
    
    // Keep denominator positive
    if (simplifiedDen < 0) {
        simplifiedNum = -simplifiedNum;
        simplifiedDen = -simplifiedDen;
    }
    
    return { numerator: simplifiedNum, denominator: simplifiedDen };
}

// Format fraction for display
function formatFraction(num, den) {
    if (den === 1) return `${num}`;
    return `${num}/${den}`;
}

// ===================================
// PROBLEM GENERATION
// ===================================

function generateProblem() {
    const problemTypes = ['addition', 'subtraction', 'multiplication', 'division'];
    const type = problemTypes[rng.nextInt(0, 3)];
    
    // Generate two fractions with different denominators
    const num1 = rng.nextInt(1, 9);
    const den1 = rng.nextInt(2, 8);
    const num2 = rng.nextInt(1, 9);
    const den2 = rng.nextInt(2, 8);
    
    // Ensure denominators are different for addition/subtraction
    let finalDen2 = den2;
    if ((type === 'addition' || type === 'subtraction') && den1 === den2) {
        finalDen2 = den2 === 2 ? 3 : den2 - 1;
    }
    
    const problem = {
        type: type,
        fraction1: { numerator: num1, denominator: den1 },
        fraction2: { numerator: num2, denominator: finalDen2 },
        steps: []
    };
    
    // Generate steps based on operation type
    if (type === 'addition' || type === 'subtraction') {
        generateAddSubSteps(problem);
    } else if (type === 'multiplication') {
        generateMultiplySteps(problem);
    } else {
        generateDivideSteps(problem);
    }
    
    return problem;
}

// Generate steps for addition/subtraction
function generateAddSubSteps(problem) {
    const { fraction1, fraction2, type } = problem;
    const operation = type === 'addition' ? '+' : '−';
    const operationWord = type === 'addition' ? 'add' : 'subtract';
    
    // Step 1: Find LCM of denominators
    const commonDen = lcm(fraction1.denominator, fraction2.denominator);
    problem.steps.push({
        title: 'Step 1: Find the Least Common Multiple (LCM) of denominators',
        math: `LCM(${fraction1.denominator}, ${fraction2.denominator}) = ${commonDen}`,
        explanation: `We need a common denominator to ${operationWord} fractions.`,
        why: `Fractions can only be added or subtracted when they have the same denominator. The LCM gives us the smallest common denominator, making calculations easier.`
    });
    
    // Step 2: Convert first fraction
    const mult1 = commonDen / fraction1.denominator;
    const newNum1 = fraction1.numerator * mult1;
    problem.steps.push({
        title: 'Step 2: Convert first fraction to equivalent fraction',
        math: `${formatFraction(fraction1.numerator, fraction1.denominator)} = ${formatFraction(fraction1.numerator, fraction1.denominator)} × ${formatFraction(mult1, mult1)} = ${formatFraction(newNum1, commonDen)}`,
        explanation: `Multiply numerator and denominator by ${mult1} to get denominator ${commonDen}.`,
        why: `Multiplying both numerator and denominator by the same number keeps the fraction's value the same (equivalent fraction).`
    });
    
    // Step 3: Convert second fraction
    const mult2 = commonDen / fraction2.denominator;
    const newNum2 = fraction2.numerator * mult2;
    problem.steps.push({
        title: 'Step 3: Convert second fraction to equivalent fraction',
        math: `${formatFraction(fraction2.numerator, fraction2.denominator)} = ${formatFraction(fraction2.numerator, fraction2.denominator)} × ${formatFraction(mult2, mult2)} = ${formatFraction(newNum2, commonDen)}`,
        explanation: `Multiply numerator and denominator by ${mult2} to get denominator ${commonDen}.`,
        why: `Both fractions now have the same denominator, so we can perform the operation.`
    });
    
    // Step 4: Perform operation
    const resultNum = type === 'addition' ? newNum1 + newNum2 : newNum1 - newNum2;
    problem.steps.push({
        title: `Step 4: ${type === 'addition' ? 'Add' : 'Subtract'} the numerators`,
        math: `${formatFraction(newNum1, commonDen)} ${operation} ${formatFraction(newNum2, commonDen)} = ${formatFraction(resultNum, commonDen)}`,
        explanation: `${type === 'addition' ? 'Add' : 'Subtract'} the numerators: ${newNum1} ${operation} ${newNum2} = ${resultNum}. Keep the denominator ${commonDen}.`,
        why: `When fractions have the same denominator, we only ${operationWord} the numerators. The denominator stays the same.`
    });
    
    // Step 5: Simplify
    const simplified = simplifyFraction(resultNum, commonDen);
    if (simplified.numerator !== resultNum || simplified.denominator !== commonDen) {
        problem.steps.push({
            title: 'Step 5: Simplify the fraction',
            math: `${formatFraction(resultNum, commonDen)} = ${formatFraction(simplified.numerator, simplified.denominator)}`,
            explanation: `Divide both numerator and denominator by their GCD: ${gcd(resultNum, commonDen)}.`,
            why: `Simplifying gives us the fraction in its lowest terms, making it easier to understand.`
        });
    } else {
        problem.steps.push({
            title: 'Step 5: Check if simplification is needed',
            math: `${formatFraction(resultNum, commonDen)} is already in simplest form`,
            explanation: `The numerator and denominator have no common factors other than 1.`,
            why: `A fraction is in simplest form when the GCD of numerator and denominator is 1.`
        });
    }
    
    problem.answer = simplified;
}

// Generate steps for multiplication
function generateMultiplySteps(problem) {
    const { fraction1, fraction2 } = problem;
    
    // Step 1: Multiply numerators and denominators
    const resultNum = fraction1.numerator * fraction2.numerator;
    const resultDen = fraction1.denominator * fraction2.denominator;
    problem.steps.push({
        title: 'Step 1: Multiply numerators and denominators',
        math: `${formatFraction(fraction1.numerator, fraction1.denominator)} × ${formatFraction(fraction2.numerator, fraction2.denominator)} = ${formatFraction(resultNum, resultDen)}`,
        explanation: `Multiply numerators: ${fraction1.numerator} × ${fraction2.numerator} = ${resultNum}. Multiply denominators: ${fraction1.denominator} × ${fraction2.denominator} = ${resultDen}.`,
        why: `When multiplying fractions, we multiply straight across: numerator × numerator and denominator × denominator.`
    });
    
    // Step 2: Simplify
    const simplified = simplifyFraction(resultNum, resultDen);
    if (simplified.numerator !== resultNum || simplified.denominator !== resultDen) {
        problem.steps.push({
            title: 'Step 2: Simplify the fraction',
            math: `${formatFraction(resultNum, resultDen)} = ${formatFraction(simplified.numerator, simplified.denominator)}`,
            explanation: `Divide both numerator and denominator by their GCD: ${gcd(resultNum, resultDen)}.`,
            why: `Simplifying gives us the fraction in its lowest terms.`
        });
    } else {
        problem.steps.push({
            title: 'Step 2: Check if simplification is needed',
            math: `${formatFraction(resultNum, resultDen)} is already in simplest form`,
            explanation: `The numerator and denominator have no common factors other than 1.`,
            why: `A fraction is in simplest form when the GCD is 1.`
        });
    }
    
    problem.answer = simplified;
}

// Generate steps for division
function generateDivideSteps(problem) {
    const { fraction1, fraction2 } = problem;
    
    // Step 1: Reciprocal of second fraction
    problem.steps.push({
        title: 'Step 1: Find the reciprocal of the second fraction',
        math: `Reciprocal of ${formatFraction(fraction2.numerator, fraction2.denominator)} is ${formatFraction(fraction2.denominator, fraction2.numerator)}`,
        explanation: `Flip the second fraction (swap numerator and denominator).`,
        why: `Dividing by a fraction is the same as multiplying by its reciprocal.`
    });
    
    // Step 2: Multiply by reciprocal
    const resultNum = fraction1.numerator * fraction2.denominator;
    const resultDen = fraction1.denominator * fraction2.numerator;
    problem.steps.push({
        title: 'Step 2: Multiply by the reciprocal',
        math: `${formatFraction(fraction1.numerator, fraction1.denominator)} × ${formatFraction(fraction2.denominator, fraction2.numerator)} = ${formatFraction(resultNum, resultDen)}`,
        explanation: `Multiply numerators: ${fraction1.numerator} × ${fraction2.denominator} = ${resultNum}. Multiply denominators: ${fraction1.denominator} × ${fraction2.numerator} = ${resultDen}.`,
        why: `Division becomes multiplication when we use the reciprocal.`
    });
    
    // Step 3: Simplify
    const simplified = simplifyFraction(resultNum, resultDen);
    if (simplified.numerator !== resultNum || simplified.denominator !== resultDen) {
        problem.steps.push({
            title: 'Step 3: Simplify the fraction',
            math: `${formatFraction(resultNum, resultDen)} = ${formatFraction(simplified.numerator, simplified.denominator)}`,
            explanation: `Divide both numerator and denominator by their GCD: ${gcd(resultNum, resultDen)}.`,
            why: `Simplifying gives us the fraction in its lowest terms.`
        });
    } else {
        problem.steps.push({
            title: 'Step 3: Check if simplification is needed',
            math: `${formatFraction(resultNum, resultDen)} is already in simplest form`,
            explanation: `The numerator and denominator have no common factors other than 1.`,
            why: `A fraction is in simplest form when the GCD is 1.`
        });
    }
    
    problem.answer = simplified;
}

// ===================================
// VISUAL REPRESENTATION (Canvas)
// ===================================

function drawVisualRepresentation() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!currentProblem) return;
    
    const { fraction1, fraction2, type } = currentProblem;
    
    if (type === 'multiplication') {
        // Draw multiplication as overlapping rectangles (area model)
        drawMultiplicationAreaModel(ctx, fraction1, fraction2);
    } else if (type === 'addition' || type === 'subtraction') {
        // Draw addition/subtraction as side-by-side bar models
        drawAddSubBarModel(ctx, fraction1, fraction2, type);
    } else {
        // Draw division
        drawDivisionModel(ctx, fraction1, fraction2);
    }
    
    // Draw result if steps revealed
    if (currentStepIndex >= currentProblem.steps.length) {
        const answer = currentProblem.answer;
        ctx.fillStyle = '#495057';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('=', 280, 140);
        
        // Draw answer bar
        drawImproperFractionBar(ctx, 330, 120, 200, 50, answer.numerator, answer.denominator, '#28a745');
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(formatFraction(answer.numerator, answer.denominator), 430, 180);
    }
}

function drawMultiplicationAreaModel(ctx, fraction1, fraction2) {
    // Draw a rectangle divided to show multiplication as area
    const rectX = 150;
    const rectY = 30;
    const rectWidth = 300;
    const rectHeight = 180;
    
    // Calculate shaded dimensions
    const shadedWidth = (rectWidth * fraction1.numerator) / fraction1.denominator;
    const shadedHeight = (rectHeight * fraction2.numerator) / fraction2.denominator;
    
    // Draw the full rectangle outline
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 3;
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
    
    // Draw vertical divisions for first fraction (width)
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    for (let i = 1; i < fraction1.denominator; i++) {
        const x = rectX + (rectWidth * i) / fraction1.denominator;
        ctx.beginPath();
        ctx.moveTo(x, rectY);
        ctx.lineTo(x, rectY + rectHeight);
        ctx.stroke();
    }
    
    // Draw horizontal divisions for second fraction (height)
    ctx.strokeStyle = '#764ba2';
    ctx.lineWidth = 2;
    for (let i = 1; i < fraction2.denominator; i++) {
        const y = rectY + (rectHeight * i) / fraction2.denominator;
        ctx.beginPath();
        ctx.moveTo(rectX, y);
        ctx.lineTo(rectX + rectWidth, y);
        ctx.stroke();
    }
    
    // Shade the horizontal strip (first fraction - width)
    ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
    ctx.fillRect(rectX, rectY, shadedWidth, rectHeight);
    
    // Shade the vertical strip (second fraction - height)
    ctx.fillStyle = 'rgba(118, 75, 162, 0.3)';
    ctx.fillRect(rectX, rectY, rectWidth, shadedHeight);
    
    // Shade the overlapping area (product) with stronger color
    ctx.fillStyle = 'rgba(40, 167, 69, 0.7)';
    ctx.fillRect(rectX, rectY, shadedWidth, shadedHeight);
    
    // Add labels
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    
    // Label for first fraction (width)
    ctx.fillText(`${formatFraction(fraction1.numerator, fraction1.denominator)} of width`, rectX + shadedWidth / 2, rectY - 10);
    
    // Label for second fraction (height)
    ctx.save();
    ctx.translate(rectX - 20, rectY + shadedHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${formatFraction(fraction2.numerator, fraction2.denominator)} of height`, 0, 0);
    ctx.restore();
    
    // Label for product (overlapping area)
    ctx.fillStyle = '#155724';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Product', rectX + shadedWidth / 2, rectY + shadedHeight / 2);
    
    // Draw operation symbol
    ctx.fillStyle = '#495057';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${formatFraction(fraction1.numerator, fraction1.denominator)} × ${formatFraction(fraction2.numerator, fraction2.denominator)}`, rectX, rectY + rectHeight + 25);
}

// Function for addition/subtraction bar model
function drawAddSubBarModel(ctx, fraction1, fraction2, type) {
    // Draw first fraction as bar model
    drawImproperFractionBar(ctx, 50, 30, 200, 50, fraction1.numerator, fraction1.denominator, '#667eea');
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(formatFraction(fraction1.numerator, fraction1.denominator), 150, 100);
    
    // Draw operation symbol
    const symbols = { addition: '+', subtraction: '−' };
    ctx.fillStyle = '#495057';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(symbols[type], 280, 60);
    
    // Draw second fraction as bar model
    drawImproperFractionBar(ctx, 330, 30, 200, 50, fraction2.numerator, fraction2.denominator, '#764ba2');
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(formatFraction(fraction2.numerator, fraction2.denominator), 430, 100);
}

// Function for division model
function drawDivisionModel(ctx, fraction1, fraction2) {
    // Draw first fraction as bar model
    drawImproperFractionBar(ctx, 50, 30, 200, 50, fraction1.numerator, fraction1.denominator, '#667eea');
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(formatFraction(fraction1.numerator, fraction1.denominator), 150, 100);
    
    // Draw operation symbol
    ctx.fillStyle = '#495057';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('÷', 280, 60);
    
    // Draw second fraction as bar model
    drawImproperFractionBar(ctx, 330, 30, 200, 50, fraction2.numerator, fraction2.denominator, '#764ba2');
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(formatFraction(fraction2.numerator, fraction2.denominator), 430, 100);
}

// Function to draw improper fractions (greater than 1) with multiple bars
function drawImproperFractionBar(ctx, x, y, width, height, numerator, denominator, color) {
    const absNumerator = Math.abs(numerator);
    
    // If fraction is less than or equal to 1, draw single bar
    if (absNumerator <= denominator) {
        drawFractionBar(ctx, x, y, width, height, numerator, denominator, color);
        return;
    }
    
    // For improper fractions (greater than 1), draw multiple bars
    const wholeUnits = Math.floor(absNumerator / denominator);
    const remainder = absNumerator % denominator;
    
    // Calculate how many bars we can fit
    const totalBars = remainder > 0 ? wholeUnits + 1 : wholeUnits;
    const barHeight = height;
    const barSpacing = 8;
    
    // Draw whole unit bars (completely filled)
    for (let i = 0; i < wholeUnits; i++) {
        const barY = y + i * (barHeight + barSpacing);
        drawFractionBar(ctx, x, barY, width, barHeight, denominator, denominator, color);
    }
    
    // Draw partial bar if there's a remainder
    if (remainder > 0) {
        const barY = y + wholeUnits * (barHeight + barSpacing);
        drawFractionBar(ctx, x, barY, width, barHeight, remainder, denominator, color);
    }
}

// Draw a fraction bar model (original function, kept for single bars)
function drawFractionBar(ctx, x, y, width, height, numerator, denominator, color) {
    // Draw outline
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // Calculate segment width
    const segmentWidth = width / denominator;
    
    // Draw segments
    for (let i = 0; i < denominator; i++) {
        const segmentX = x + i * segmentWidth;
        
        // Fill shaded segments
        if (i < Math.abs(numerator)) {
            ctx.fillStyle = color;
            ctx.fillRect(segmentX + 1, y + 1, segmentWidth - 2, height - 2);
        }
        
        // Draw segment dividers
        if (i > 0) {
            ctx.strokeStyle = '#2c3e50';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(segmentX, y);
            ctx.lineTo(segmentX, y + height);
            ctx.stroke();
        }
    }
}

// ===================================
// UI RENDERING
// ===================================

function displayProblem() {
    const problemDisplay = document.getElementById('problemDisplay');
    const { fraction1, fraction2, type } = currentProblem;
    
    const symbols = { addition: '+', subtraction: '−', multiplication: '×', division: '÷' };
    const symbol = symbols[type];
    
    problemDisplay.innerHTML = `${formatFraction(fraction1.numerator, fraction1.denominator)} ${symbol} ${formatFraction(fraction2.numerator, fraction2.denominator)} = ?`;
    
    drawVisualRepresentation();
}

function renderSteps() {
    const stepsContainer = document.getElementById('stepsContainer');
    stepsContainer.innerHTML = '';
    
    currentProblem.steps.forEach((step, index) => {
        const stepItem = document.createElement('div');
        stepItem.className = 'step-item';
        
        if (index < currentStepIndex) {
            stepItem.classList.add('revealed');
        } else if (index === currentStepIndex) {
            stepItem.classList.add('current');
        }
        
        stepItem.innerHTML = `
            <div class="step-header" data-index="${index}">
                <span class="step-title">${step.title}</span>
                <span class="step-icon">${index < currentStepIndex ? '✓' : index === currentStepIndex ? '▶' : '○'}</span>
            </div>
            <div class="step-content ${index <= currentStepIndex ? 'visible' : ''}">
                <div class="step-math">${step.math}</div>
                <div class="step-explanation">${step.explanation}</div>
                <button class="why-button" data-index="${index}">Why?</button>
                <div class="why-content" id="why-${index}">${step.why}</div>
            </div>
        `;
        
        stepsContainer.appendChild(stepItem);
    });
    
    // Add event listeners for step headers
    document.querySelectorAll('.step-header').forEach(header => {
        header.addEventListener('click', toggleStepContent);
    });
    
    // Add event listeners for why buttons
    document.querySelectorAll('.why-button').forEach(button => {
        button.addEventListener('click', toggleWhyContent);
    });
}

function toggleStepContent(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    const stepItem = e.currentTarget.parentElement;
    const content = stepItem.querySelector('.step-content');
    
    content.classList.toggle('visible');
    
    logAction(`Toggled step ${index + 1} content`);
}

function toggleWhyContent(e) {
    e.stopPropagation();
    const index = parseInt(e.currentTarget.dataset.index);
    const whyContent = document.getElementById(`why-${index}`);
    
    whyContent.classList.toggle('visible');
    
    logAction(`Viewed "Why?" explanation for step ${index + 1}`);
}

// ===================================
// RESIZABLE SOLUTION SECTION - ADDED
// ===================================

// ADDED: Toggle expand/collapse solution section
function toggleSolutionExpand() {
    const solutionSection = document.getElementById('solutionSection');
    const expandBtn = document.getElementById('expandBtn');
    
    if (solutionSection.classList.contains('collapsed')) {
        solutionSection.classList.remove('collapsed');
        expandBtn.textContent = '⬍';
        logAction('Expanded solution section');
    } else if (solutionSection.classList.contains('expanded')) {
        solutionSection.classList.remove('expanded');
        expandBtn.textContent = '⬍';
        logAction('Reset solution section size');
    } else {
        solutionSection.classList.add('expanded');
        expandBtn.textContent = '⬌';
        logAction('Maximized solution section');
    }
}

// ADDED: Open fullscreen view of solution steps
function openFullscreen() {
    const fullscreenOverlay = document.getElementById('fullscreenOverlay');
    const fullscreenSteps = document.getElementById('fullscreenSteps');
    const stepsContainer = document.getElementById('stepsContainer');
    
    // Clone steps to fullscreen container
    fullscreenSteps.innerHTML = stepsContainer.innerHTML;
    
    // Show fullscreen overlay
    fullscreenOverlay.classList.add('active');
    
    // Re-attach event listeners for cloned elements
    fullscreenSteps.querySelectorAll('.step-header').forEach(header => {
        header.addEventListener('click', toggleStepContent);
    });
    
    fullscreenSteps.querySelectorAll('.why-button').forEach(button => {
        button.addEventListener('click', toggleWhyContent);
    });
    
    logAction('Opened fullscreen solution view');
}

// ADDED: Close fullscreen view
function closeFullscreen() {
    const fullscreenOverlay = document.getElementById('fullscreenOverlay');
    fullscreenOverlay.classList.remove('active');
    
    logAction('Closed fullscreen solution view');
}

// ADDED: Start resizing solution section
function startResize(e) {
    isResizing = true;
    resizeStartY = e.clientY || e.touches[0].clientY;
    const solutionSection = document.getElementById('solutionSection');
    resizeStartHeight = solutionSection.offsetHeight;
    
    // Prevent text selection during resize
    document.body.style.userSelect = 'none';
    
    logAction('Started resizing solution section');
}

// ADDED: Handle resize movement
function handleResize(e) {
    if (!isResizing) return;
    
    const currentY = e.clientY || e.touches[0].clientY;
    const deltaY = currentY - resizeStartY;
    const newHeight = resizeStartHeight + deltaY;
    
    const solutionSection = document.getElementById('solutionSection');
    
    // Set min and max height constraints
    const minHeight = 150;
    const maxHeight = 800;
    
    if (newHeight >= minHeight && newHeight <= maxHeight) {
        solutionSection.style.maxHeight = newHeight + 'px';
        // Remove any expand/collapse classes when manually resizing
        solutionSection.classList.remove('collapsed', 'expanded');
    }
}

// ADDED: Stop resizing
function stopResize() {
    if (isResizing) {
        isResizing = false;
        document.body.style.userSelect = '';
        logAction('Finished resizing solution section');
    }
}

// ===================================
// USER INTERACTIONS
// ===================================

function checkAnswer() {
    const numInput = document.getElementById('numeratorInput');
    const denInput = document.getElementById('denominatorInput');
    const feedback = document.getElementById('feedback');
    
    const userNum = parseInt(numInput.value);
    const userDen = parseInt(denInput.value);
    
    if (isNaN(userNum) || isNaN(userDen)) {
        showFeedback('Please enter both numerator and denominator.', 'warning');
        logAction('Attempted to check answer with incomplete input');
        return;
    }
    
    if (userDen === 0) {
        showFeedback('Denominator cannot be zero!', 'error');
        logAction('Attempted to check answer with zero denominator');
        return;
    }
    
    // Simplify user's answer
    const userSimplified = simplifyFraction(userNum, userDen);
    const correctAnswer = currentProblem.answer;
    
    // Common mistake detection
    if (currentProblem.type === 'addition' || currentProblem.type === 'subtraction') {
        // Check if user added/subtracted denominators
        const wrongDen = currentProblem.fraction1.denominator + currentProblem.fraction2.denominator;
        if (userDen === wrongDen) {
            showFeedback('❌ Common mistake: Don\'t add the denominators! You need to find a common denominator first.', 'error');
            logAction(`Incorrect answer: ${userNum}/${userDen} (added denominators)`);
            return;
        }
    }
    
    // Check if answer is correct
    if (userSimplified.numerator === correctAnswer.numerator && 
        userSimplified.denominator === correctAnswer.denominator) {
        showFeedback(`✓ Correct! The answer is ${formatFraction(correctAnswer.numerator, correctAnswer.denominator)}`, 'success');
        logAction(`Correct answer: ${userNum}/${userDen}`);
        
        // Reveal all steps
        currentStepIndex = currentProblem.steps.length;
        renderSteps();
        drawVisualRepresentation();
    } else {
        showFeedback(`✗ Not quite. Try again or click "Show Next Step" for help.`, 'error');
        logAction(`Incorrect answer: ${userNum}/${userDen} (correct: ${correctAnswer.numerator}/${correctAnswer.denominator})`);
    }
}

function showNextStep() {
    if (currentStepIndex < currentProblem.steps.length) {
        currentStepIndex++;
        renderSteps();
        drawVisualRepresentation();
        
        logAction(`Revealed step ${currentStepIndex}`);
        
        if (currentStepIndex === currentProblem.steps.length) {
            showFeedback(`All steps revealed! Answer: ${formatFraction(currentProblem.answer.numerator, currentProblem.answer.denominator)}`, 'success');
        }
    } else {
        showFeedback('All steps already revealed!', 'warning');
    }
}

function resetSteps() {
    currentStepIndex = 0;
    renderSteps();
    drawVisualRepresentation();
    
    document.getElementById('numeratorInput').value = '';
    document.getElementById('denominatorInput').value = '';
    document.getElementById('feedback').classList.remove('visible');
    
    logAction('Reset all steps');
}

function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback visible ${type}`;
}

function generateNewProblem() {
    currentProblem = generateProblem();
    currentStepIndex = 0;
    
    displayProblem();
    renderSteps();
    
    document.getElementById('numeratorInput').value = '';
    document.getElementById('denominatorInput').value = '';
    document.getElementById('feedback').classList.remove('visible');
    
    logAction(`Generated new problem: ${formatFraction(currentProblem.fraction1.numerator, currentProblem.fraction1.denominator)} ${currentProblem.type} ${formatFraction(currentProblem.fraction2.numerator, currentProblem.fraction2.denominator)}`);
}

// ===================================
// ANALYTICS LOGGING
// ===================================

function logAction(description) {
    actionCount++;
    const timestamp = ((Date.now() - startTime) / 1000).toFixed(1);
    
    const logContainer = document.getElementById('logContainer');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    const symbols = {
        'Generated': '🎲',
        'Revealed': '👁️',
        'Correct': '✓',
        'Incorrect': '✗',
        'Reset': '↺',
        'Toggled': '🔄',
        'Viewed': '💡',
        'Attempted': '⚠️',
        'Expanded': '⬌', // ADDED
        'Opened': '⛶', // ADDED
        'Closed': '✕', // ADDED
        'Started': '↕', // ADDED
        'Finished': '↕' // ADDED
    };
    
    let symbol = '•';
    for (let key in symbols) {
        if (description.includes(key)) {
            symbol = symbols[key];
            break;
        }
    }
    
    logEntry.innerHTML = `
        <span class="log-timestamp">t=${timestamp}s</span>
        <span class="log-action">${symbol} ${description}</span>
    `;
    
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Update count
    document.getElementById('logCount').textContent = `Actions: ${actionCount}`;
}

function clearLog() {
    document.getElementById('logContainer').innerHTML = '';
    actionCount = 0;
    startTime = Date.now();
    document.getElementById('logCount').textContent = 'Actions: 0';
    
    logAction('Log cleared');
}

function toggleAnalytics() {
    const panel = document.getElementById('analyticsPanel');
    panel.classList.toggle('collapsed');
    
    const toggleBtn = document.getElementById('toggleAnalytics');
    toggleBtn.textContent = panel.classList.contains('collapsed') ? '▲' : '▼';
    
    const state = panel.classList.contains('collapsed') ? 'closed' : 'opened';
    logAction(`Analytics panel ${state}`);
}

// ===================================
// EVENT LISTENERS
// ===================================

document.getElementById('generateBtn').addEventListener('click', generateNewProblem);
document.getElementById('checkBtn').addEventListener('click', checkAnswer);
document.getElementById('hintBtn').addEventListener('click', showNextStep);
document.getElementById('resetBtn').addEventListener('click', resetSteps);
document.getElementById('clearLogBtn').addEventListener('click', clearLog);
document.getElementById('analyticsHeader').addEventListener('click', toggleAnalytics);

// ADDED: Event listeners for resizable solution section
document.getElementById('expandBtn').addEventListener('click', toggleSolutionExpand);
document.getElementById('fullscreenBtn').addEventListener('click', openFullscreen);
document.getElementById('closeFullscreenBtn').addEventListener('click', closeFullscreen);

// ADDED: Resize handle event listeners
const resizeHandle = document.getElementById('resizeHandle');
resizeHandle.addEventListener('mousedown', startResize);
resizeHandle.addEventListener('touchstart', startResize);

document.addEventListener('mousemove', handleResize);
document.addEventListener('touchmove', handleResize);

document.addEventListener('mouseup', stopResize);
document.addEventListener('touchend', stopResize);

// ADDED: Close fullscreen on overlay click
document.getElementById('fullscreenOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'fullscreenOverlay') {
        closeFullscreen();
    }
});

// ADDED: Close fullscreen on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const fullscreenOverlay = document.getElementById('fullscreenOverlay');
        if (fullscreenOverlay.classList.contains('active')) {
            closeFullscreen();
        }
    }
});

// Touch support for mobile
document.getElementById('generateBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    generateNewProblem();
});

document.getElementById('checkBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    checkAnswer();
});

document.getElementById('hintBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    showNextStep();
});

document.getElementById('resetBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    resetSteps();
});

// Enter key to check answer
document.getElementById('numeratorInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});

document.getElementById('denominatorInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});

// ===================================
// INITIALIZATION
// ===================================

// Generate initial problem on load
window.addEventListener('load', () => {
    generateNewProblem();
    logAction('Interactive loaded');
});

// Tooltip for info icon
document.getElementById('infoIcon').addEventListener('mouseenter', function() {
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 8px;
        font-size: 18px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    tooltip.textContent = 'Express Fractions as Single Fraction';
    document.body.appendChild(tooltip);
});

document.getElementById('infoIcon').addEventListener('mouseleave', function() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) tooltip.remove();
});

// Touch support for tooltip
document.getElementById('infoIcon').addEventListener('touchstart', function(e) {
    e.preventDefault();
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 8px;
        font-size: 18px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    tooltip.textContent = 'Express Fractions as Single Fraction';
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) tooltip.remove();
    }, 2000);
});