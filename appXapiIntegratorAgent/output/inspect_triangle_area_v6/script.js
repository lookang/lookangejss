// ===== GLOBAL VARIABLES =====
let canvas, ctx;
let baseValue = 10;
let heightValue = 8;
let currentLevel = 1;
let currentProblem = {};
let attemptCount = 0;
let hintShown = false;
let startTime = Date.now();
let actionLog = [];
let quizLog = [];
let problemCount = 0;

// MODIFICATION: Added mode tracking variables
let currentMode = 'exploration'; // 'exploration' or 'quiz'
const MAX_QUESTIONS = 10;

// Screen recording variables
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Check if running in fullscreen mode
    if (window.self === window.top) {
        document.body.classList.add('fullscreen');
    }
    
    // Initialize canvas
    canvas = document.getElementById('triangleCanvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    
    // MODIFICATION: Initialize in exploration mode
    initializeExplorationMode();
    
    // Event listeners for sliders
    document.getElementById('baseSlider').addEventListener('input', handleBaseChange);
    document.getElementById('heightSlider').addEventListener('input', handleHeightChange);
    
    // Touch support for sliders
    document.getElementById('baseSlider').addEventListener('touchmove', handleBaseChange);
    document.getElementById('heightSlider').addEventListener('touchmove', handleHeightChange);
    
    // Event listeners for buttons
    document.getElementById('submitBtn').addEventListener('click', handleSubmit);
    document.getElementById('nextBtn').addEventListener('click', handleNext);
    document.getElementById('resetBtn').addEventListener('click', handleReset);
    document.getElementById('showHintBtn').addEventListener('click', handleShowHint);
    
    // MODIFICATION: Mode selector event listeners
    document.getElementById('explorationModeBtn').addEventListener('click', switchToExplorationMode);
    document.getElementById('quizModeBtn').addEventListener('click', switchToQuizMode);
    
    // Help tooltip
    document.getElementById('helpIcon').addEventListener('click', showHelp);
    document.getElementById('closeTooltip').addEventListener('click', hideHelp);
    
    // Analytics toggle
    document.getElementById('analyticsToggle').addEventListener('click', toggleAnalytics);
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Clear logs
    document.getElementById('clearActionsBtn').addEventListener('click', clearActionLog);
    document.getElementById('clearQuizBtn').addEventListener('click', clearQuizLog);
    
    // Recording controls
    document.getElementById('startRecordBtn').addEventListener('click', startRecording);
    document.getElementById('stopRecordBtn').addEventListener('click', stopRecording);
    document.getElementById('downloadRecordBtn').addEventListener('click', downloadRecording);
    
    // Window resize handler
    window.addEventListener('resize', resizeCanvas);
    
    // Initial draw
    drawTriangle();
    updateCalculation();
    
    // Log initial state
    logAction('🎬', 'Interactive started', 'Exploration Mode');
});

// ===== MODIFICATION: MODE SWITCHING FUNCTIONS =====
function switchToExplorationMode() {
    currentMode = 'exploration';
    
    // Update UI
    document.getElementById('explorationModeBtn').classList.add('active');
    document.getElementById('quizModeBtn').classList.remove('active');
    
    // Enable sliders
    document.getElementById('baseControl').classList.remove('locked');
    document.getElementById('heightControl').classList.remove('locked');
    
    // Initialize exploration mode
    initializeExplorationMode();
    
    logAction('🔍', 'Mode switched', 'Exploration Mode activated');
}

function switchToQuizMode() {
    currentMode = 'quiz';
    
    // Update UI
    document.getElementById('quizModeBtn').classList.add('active');
    document.getElementById('explorationModeBtn').classList.remove('active');
    
    // Lock sliders
    document.getElementById('baseControl').classList.add('locked');
    document.getElementById('heightControl').classList.add('locked');
    
    // Reset quiz progress
    problemCount = 0;
    
    // Generate first quiz problem
    generateQuizProblem();
    
    logAction('📝', 'Mode switched', 'Quiz Mode activated');
}

function initializeExplorationMode() {
    // Set default values
    baseValue = 10;
    heightValue = 8;
    
    document.getElementById('baseSlider').value = baseValue;
    document.getElementById('heightSlider').value = heightValue;
    document.getElementById('baseValue').textContent = baseValue;
    document.getElementById('heightValue').textContent = heightValue;
    
    // Update problem text for exploration mode
    document.getElementById('problemText').textContent = 
        'Exploration Mode: Adjust the sliders to change the triangle dimensions, then calculate and check the area yourself!';
    
    // Clear input and feedback
    document.getElementById('areaInput').value = '';
    document.getElementById('feedbackSection').classList.add('hidden');
    document.getElementById('hintSection').classList.add('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('submitBtn').disabled = false;
    
    // Reset attempt tracking
    attemptCount = 0;
    hintShown = false;
    
    // Store current problem for exploration mode
    currentProblem = {
        base: baseValue,
        height: heightValue,
        correctArea: (baseValue * heightValue / 2).toFixed(1),
        useGrid: false
    };
    
    drawTriangle();
    updateCalculation();
}

// ===== CANVAS MANAGEMENT =====
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth - 20;
    canvas.height = container.clientHeight - 120; // Leave space for formula box
    drawTriangle();
}

// ===== MODIFICATION: QUIZ PROBLEM GENERATION =====
function generateQuizProblem() {
    // Check if maximum questions reached
    if (problemCount >= MAX_QUESTIONS) {
        showCompletionMessage();
        return;
    }
    
    problemCount++;
    
    // Progressive difficulty based on problem number
    let minVal, maxVal, step;
    
    // Questions 1-2: Simple format (no grid)
    if (problemCount <= 2) {
        minVal = 4;
        maxVal = 12;
        step = 1;
        currentProblem.useGrid = false;
    } 
    // Question 3+: Grid-based counting
    else {
        minVal = 3 + Math.floor((problemCount - 3) / 2);
        maxVal = 10 + Math.floor((problemCount - 3) / 2);
        step = 1;
        currentProblem.useGrid = true;
    }
    
    // Generate random base and height
    const seed = Date.now() + problemCount;
    const randomBase = minVal + Math.floor((seed * 9301 + 49297) % 233280 / 233280 * (maxVal - minVal + 1));
    const randomHeight = minVal + Math.floor((seed * 7919 + 31337) % 233280 / 233280 * (maxVal - minVal + 1));
    
    currentProblem.base = randomBase;
    currentProblem.height = randomHeight;
    currentProblem.correctArea = (randomBase * randomHeight / 2).toFixed(1);
    
    // MODIFICATION: Set sliders to problem values (they will be locked in quiz mode)
    document.getElementById('baseSlider').value = currentProblem.base;
    document.getElementById('heightSlider').value = currentProblem.height;
    baseValue = currentProblem.base;
    heightValue = currentProblem.height;
    
    // Update displays
    document.getElementById('baseValue').textContent = baseValue;
    document.getElementById('heightValue').textContent = heightValue;
    
    // Update problem text
    let problemText = `Quiz Problem ${problemCount}/${MAX_QUESTIONS}: `;
    if (currentProblem.useGrid) {
        problemText += `Count the grid squares to find the base and height, then calculate the area of the triangle.`;
    } else {
        problemText += `Find the area of a triangle with base ${currentProblem.base} units and height ${currentProblem.height} units.`;
    }
    document.getElementById('problemText').textContent = problemText;
    
    // Reset attempt tracking
    attemptCount = 0;
    hintShown = false;
    
    // Clear input and feedback
    document.getElementById('areaInput').value = '';
    document.getElementById('feedbackSection').classList.add('hidden');
    document.getElementById('hintSection').classList.add('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('submitBtn').disabled = false;
    
    // Redraw
    drawTriangle();
    updateCalculation();
    
    logAction('📝', 'New quiz problem generated', problemText);
}

// MODIFICATION: Completion message function
function showCompletionMessage() {
    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackText = document.getElementById('feedbackText');
    
    feedbackSection.className = 'feedback-box correct';
    feedbackText.innerHTML = `🎉 <strong>Congratulations!</strong> You've completed all ${MAX_QUESTIONS} questions!<br><br>Great job learning about triangle areas!`;
    feedbackSection.classList.remove('hidden');
    
    // Disable buttons
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('showHintBtn').disabled = true;
    
    logAction('🏆', 'Quiz completed', `All ${MAX_QUESTIONS} questions answered`);
}

// ===== MODIFICATION: SLIDER HANDLERS - Update current problem in exploration mode =====
function handleBaseChange(e) {
    baseValue = parseFloat(e.target.value);
    document.getElementById('baseValue').textContent = baseValue;
    
    // MODIFICATION: Update current problem if in exploration mode
    if (currentMode === 'exploration') {
        currentProblem.base = baseValue;
        currentProblem.correctArea = (baseValue * heightValue / 2).toFixed(1);
    }
    
    drawTriangle();
    updateCalculation();
    logAction('🎚️', 'Base slider adjusted', `Base = ${baseValue} units`);
}

function handleHeightChange(e) {
    heightValue = parseFloat(e.target.value);
    document.getElementById('heightValue').textContent = heightValue;
    
    // MODIFICATION: Update current problem if in exploration mode
    if (currentMode === 'exploration') {
        currentProblem.height = heightValue;
        currentProblem.correctArea = (baseValue * heightValue / 2).toFixed(1);
    }
    
    drawTriangle();
    updateCalculation();
    logAction('🎚️', 'Height slider adjusted', `Height = ${heightValue} units`);
}

// ===== DRAWING FUNCTION =====
function drawTriangle() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid for questions 3 and higher in quiz mode, or if specified
    if (currentProblem.useGrid && currentMode === 'quiz') {
        drawTriangleWithGrid();
    } else {
        drawTriangleSimple();
    }
}

// MODIFICATION: Grid drawing function
function drawTriangleWithGrid() {
    const padding = 40;
    const gridSize = 25; // Size of each grid square
    
    // Calculate grid dimensions based on current base and height
    const gridWidth = baseValue * gridSize;
    const gridHeight = heightValue * gridSize;
    
    // Center the grid
    const startX = (canvas.width - gridWidth) / 2;
    const startY = (canvas.height - gridHeight) / 2 + gridHeight;
    
    // Draw grid
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let i = 0; i <= baseValue; i++) {
        ctx.beginPath();
        ctx.moveTo(startX + i * gridSize, startY);
        ctx.lineTo(startX + i * gridSize, startY - gridHeight);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let i = 0; i <= heightValue; i++) {
        ctx.beginPath();
        ctx.moveTo(startX, startY - i * gridSize);
        ctx.lineTo(startX + gridWidth, startY - i * gridSize);
        ctx.stroke();
    }
    
    // Draw triangle on grid
    const p1 = { x: startX, y: startY }; // Bottom left
    const p2 = { x: startX + gridWidth, y: startY }; // Bottom right
    const p3 = { x: startX + gridWidth / 2, y: startY - gridHeight }; // Top
    
    // Fill triangle
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0.4)');
    gradient.addColorStop(1, 'rgba(118, 75, 162, 0.6)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Stroke triangle
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw height line
    ctx.beginPath();
    ctx.moveTo(p3.x, p3.y);
    ctx.lineTo(p3.x, startY);
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw right angle indicator
    const squareSize = 10;
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 1;
    ctx.strokeRect(p3.x - squareSize/2, startY - squareSize, squareSize, squareSize);
    
    // Labels
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    
    // Base label with question mark
    ctx.fillText(`Base = ? units`, (p1.x + p2.x) / 2, startY + 25);
    
    // Height label with question mark
    ctx.save();
    ctx.translate(p3.x - 20, (p3.y + startY) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`Height = ? units`, 0, 0);
    ctx.restore();
    
    // Grid unit labels
    ctx.font = '11px Arial';
    ctx.fillStyle = '#666';
    
    // Label some grid units on base
    for (let i = 0; i <= baseValue; i += Math.ceil(baseValue / 5)) {
        ctx.fillText(i, startX + i * gridSize, startY + 15);
    }
    
    // Label some grid units on height
    for (let i = 0; i <= heightValue; i += Math.ceil(heightValue / 5)) {
        ctx.fillText(i, startX - 15, startY - i * gridSize + 5);
    }
}

// Original drawing function for simple triangles
function drawTriangleSimple() {
    // Calculate scale to fit triangle in canvas
    const padding = 60;
    const maxBase = 20;
    const maxHeight = 20;
    const scaleX = (canvas.width - 2 * padding) / maxBase;
    const scaleY = (canvas.height - 2 * padding) / maxHeight;
    const scale = Math.min(scaleX, scaleY);
    
    // Calculate triangle points
    const baseLength = baseValue * scale;
    const triangleHeight = heightValue * scale;
    
    const startX = (canvas.width - baseLength) / 2;
    const startY = canvas.height - padding;
    
    const p1 = { x: startX, y: startY }; // Bottom left
    const p2 = { x: startX + baseLength, y: startY }; // Bottom right
    const p3 = { x: startX + baseLength / 2, y: startY - triangleHeight }; // Top
    
    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    
    // Fill with gradient
    const gradient = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
    gradient.addColorStop(1, 'rgba(118, 75, 162, 0.5)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Stroke
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw height line (perpendicular from top to base)
    ctx.beginPath();
    ctx.moveTo(p3.x, p3.y);
    ctx.lineTo(p3.x, startY);
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw right angle indicator
    const squareSize = 10;
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 1;
    ctx.strokeRect(p3.x - squareSize/2, startY - squareSize, squareSize, squareSize);
    
    // Labels
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    
    // Base label
    ctx.fillText(`Base = ${baseValue} units`, (p1.x + p2.x) / 2, startY + 30);
    
    // Height label
    ctx.save();
    ctx.translate(p3.x - 25, (p3.y + startY) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`Height = ${heightValue} units`, 0, 0);
    ctx.restore();
    
    // Vertices labels
    ctx.font = '14px Arial';
    ctx.fillStyle = '#667eea';
    ctx.fillText('A', p1.x - 15, p1.y + 5);
    ctx.fillText('B', p2.x + 15, p2.y + 5);
    ctx.fillText('C', p3.x, p3.y - 15);
}

// ===== CALCULATION DISPLAY =====
function updateCalculation() {
    const area = (baseValue * heightValue / 2).toFixed(1);
    const calculation = `= ½ × ${baseValue} × ${heightValue} = ${area} square units`;
    document.getElementById('calculationSteps').textContent = calculation;
}

// ===== HINT SYSTEM =====
function handleShowHint() {
    hintShown = true;
    const hintSection = document.getElementById('hintSection');
    const hintText = document.getElementById('hintText');
    
    let hint = '';
    
    // MODIFICATION: Different hints for exploration vs quiz mode
    if (currentMode === 'exploration') {
        if (attemptCount === 0) {
            hint = `Remember: Area of triangle = ½ × base × height. Your current base is ${baseValue} units and height is ${heightValue} units.`;
        } else if (attemptCount === 1) {
            hint = `Calculate: ½ × ${baseValue} × ${heightValue} = ?`;
        } else {
            const step1 = baseValue * heightValue;
            hint = `Step by step: ${baseValue} × ${heightValue} = ${step1}, then ${step1} ÷ 2 = ${currentProblem.correctArea}`;
        }
    } else {
        // Quiz mode hints
        if (currentProblem.useGrid) {
            if (attemptCount === 0) {
                hint = `Count the number of grid squares along the base and height. Each square represents 1 unit.`;
            } else if (attemptCount === 1) {
                hint = `The base is ${currentProblem.base} units and the height is ${currentProblem.height} units. Now use the formula: Area = ½ × base × height`;
            } else {
                const step1 = currentProblem.base * currentProblem.height;
                hint = `Step by step: ${currentProblem.base} × ${currentProblem.height} = ${step1}, then ${step1} ÷ 2 = ${currentProblem.correctArea}`;
            }
        } else {
            if (attemptCount === 0) {
                hint = `Remember: Area of triangle = ½ × base × height. The base is ${currentProblem.base} units and height is ${currentProblem.height} units.`;
            } else if (attemptCount === 1) {
                hint = `Calculate: ½ × ${currentProblem.base} × ${currentProblem.height} = ?`;
            } else {
                const step1 = currentProblem.base * currentProblem.height;
                hint = `Step by step: ${currentProblem.base} × ${currentProblem.height} = ${step1}, then ${step1} ÷ 2 = ${currentProblem.correctArea}`;
            }
        }
    }
    
    hintText.textContent = hint;
    hintSection.classList.remove('hidden');
    
    logAction('💡', 'Hint requested', hint);
}

// ===== MODIFICATION: SUBMIT HANDLER - Check against current problem values =====
function handleSubmit() {
    attemptCount++;
    
    const userAnswer = parseFloat(document.getElementById('areaInput').value);
    const correctAnswer = parseFloat(currentProblem.correctArea);
    
    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackText = document.getElementById('feedbackText');
    
    // Validation
    if (isNaN(userAnswer)) {
        feedbackSection.className = 'feedback-box incorrect';
        feedbackText.textContent = '⚠️ Please enter a valid number for the area.';
        feedbackSection.classList.remove('hidden');
        logAction('⚠️', 'Invalid input', 'User entered non-numeric value');
        return;
    }
    
    // Check answer (allow small tolerance for rounding)
    const tolerance = 0.2;
    const isCorrect = Math.abs(userAnswer - correctAnswer) < tolerance;
    
    if (isCorrect) {
        feedbackSection.className = 'feedback-box correct';
        
        // MODIFICATION: Different feedback for exploration vs quiz mode
        if (currentMode === 'exploration') {
            feedbackText.innerHTML = `✅ <strong>Correct!</strong> The area is ${correctAnswer} square units.<br><em>Why?</em> Because Area = ½ × ${currentProblem.base} × ${currentProblem.height} = ${correctAnswer}<br><br>Try adjusting the sliders to explore different triangles!`;
            document.getElementById('submitBtn').disabled = false; // Allow re-checking in exploration mode
        } else {
            // Quiz mode feedback
            feedbackText.innerHTML = `✅ <strong>Correct!</strong> The area is ${correctAnswer} square units.<br><em>Why?</em> Because Area = ½ × ${currentProblem.base} × ${currentProblem.height} = ${correctAnswer}`;
            document.getElementById('submitBtn').disabled = true;
            
            // Only show next button if not at max questions
            if (problemCount < MAX_QUESTIONS) {
                document.getElementById('nextBtn').classList.remove('hidden');
            } else {
                feedbackText.innerHTML += `<br><br>🎉 <strong>Quiz Complete!</strong> You've finished all ${MAX_QUESTIONS} questions!`;
            }
            
            // Level progression
            if (problemCount % 3 === 0 && currentLevel < 3) {
                currentLevel++;
                document.getElementById('levelBadge').textContent = `Level ${currentLevel}`;
                feedbackText.innerHTML += `<br><br>🎉 <strong>Level Up!</strong> You've advanced to Level ${currentLevel}!`;
                logAction('🎉', 'Level up', `Advanced to Level ${currentLevel}`);
            }
        }
        
        logQuizResult(
            currentMode === 'quiz' ? problemCount : 'Exploration',
            `Find area: base=${currentProblem.base}, height=${currentProblem.height}`,
            userAnswer,
            correctAnswer,
            true,
            attemptCount
        );
    } else {
        feedbackSection.className = 'feedback-box incorrect';
        
        // Provide specific feedback based on common errors
        let feedback = `❌ <strong>Not quite right.</strong> You answered ${userAnswer}, but the correct answer is ${correctAnswer} square units.`;
        
        // Check for common mistakes
        if (Math.abs(userAnswer - (currentProblem.base * currentProblem.height)) < tolerance) {
            feedback += `<br><em>Common mistake:</em> Did you forget to divide by 2? Remember: Area = ½ × base × height`;
        } else if (Math.abs(userAnswer - (currentProblem.base + currentProblem.height)) < tolerance) {
            feedback += `<br><em>Common mistake:</em> You added base and height. Remember to multiply them and divide by 2!`;
        } else {
            feedback += `<br><em>Hint:</em> Use the formula: Area = ½ × base × height`;
        }
        
        feedbackText.innerHTML = feedback;
        
        logQuizResult(
            currentMode === 'quiz' ? problemCount : 'Exploration',
            `Find area: base=${currentProblem.base}, height=${currentProblem.height}`,
            userAnswer,
            correctAnswer,
            false,
            attemptCount
        );
    }
    
    feedbackSection.classList.remove('hidden');
    logAction('📤', 'Answer submitted', `User answer: ${userAnswer}, Correct: ${correctAnswer}, Result: ${isCorrect ? 'Correct' : 'Incorrect'}, Mode: ${currentMode}`);
}

// ===== MODIFICATION: NEXT PROBLEM HANDLER - Only for quiz mode =====
function handleNext() {
    if (currentMode === 'quiz') {
        generateQuizProblem();
        logAction('⏭️', 'Next problem requested', 'Moving to next quiz problem');
    }
}

// ===== MODIFICATION: RESET HANDLER - Different behavior for each mode =====
function handleReset() {
    if (currentMode === 'exploration') {
        // In exploration mode, reset to default values
        baseValue = 10;
        heightValue = 8;
        document.getElementById('baseSlider').value = baseValue;
        document.getElementById('heightSlider').value = heightValue;
        
        currentProblem.base = baseValue;
        currentProblem.height = heightValue;
        currentProblem.correctArea = (baseValue * heightValue / 2).toFixed(1);
    } else {
        // In quiz mode, reset to current problem values
        document.getElementById('baseSlider').value = currentProblem.base;
        document.getElementById('heightSlider').value = currentProblem.height;
        baseValue = currentProblem.base;
        heightValue = currentProblem.height;
    }
    
    document.getElementById('baseValue').textContent = baseValue;
    document.getElementById('heightValue').textContent = heightValue;
    document.getElementById('areaInput').value = '';
    
    document.getElementById('feedbackSection').classList.add('hidden');
    document.getElementById('hintSection').classList.add('hidden');
    
    drawTriangle();
    updateCalculation();
    
    logAction('🔄', 'Reset clicked', `Values reset - Mode: ${currentMode}`);
}

// ===== HELP TOOLTIP =====
function showHelp() {
    document.getElementById('helpTooltip').classList.remove('hidden');
    logAction('ℹ️', 'Help opened', 'User viewed help information');
}

function hideHelp() {
    document.getElementById('helpTooltip').classList.add('hidden');
}

// ===== ANALYTICS FUNCTIONS =====
function toggleAnalytics() {
    const panel = document.getElementById('analyticsPanel');
    panel.classList.toggle('collapsed');
    logAction('📊', 'Analytics toggled', panel.classList.contains('collapsed') ? 'Collapsed' : 'Expanded');
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');
}

function logAction(icon, action, details) {
    const timestamp = ((Date.now() - startTime) / 1000).toFixed(1);
    const entry = {
        time: timestamp,
        icon: icon,
        action: action,
        details: details
    };
    
    actionLog.push(entry);
    
    // Update display
    const logContainer = document.getElementById('actionLog');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="log-time">t=${timestamp}s</span>
        <span class="log-action">${icon} ${action}: ${details}</span>
    `;
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

function logQuizResult(questionNum, question, userAnswer, correctAnswer, isCorrect, attempt) {
    const entry = {
        question: questionNum,
        questionText: question,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
        attempt: attempt
    };
    
    quizLog.push(entry);
    
    // Update display
    const logContainer = document.getElementById('quizLog');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    const resultClass = isCorrect ? 'log-correct' : 'log-incorrect';
    const resultIcon = isCorrect ? '✅' : '❌';
    
    logEntry.innerHTML = `
        <div style="width: 100%;">
            <div><strong>Q${questionNum}:</strong> ${question}</div>
            <div>Student answer: <span class="${resultClass}">${userAnswer}</span></div>
            <div>Correct answer: ${correctAnswer}</div>
            <div class="${resultClass}">${resultIcon} ${isCorrect ? 'Correct' : 'Wrong'} (Attempt ${attempt})</div>
        </div>
    `;
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

function clearActionLog() {
    actionLog = [];
    document.getElementById('actionLog').innerHTML = '';
    startTime = Date.now();
    logAction('🗑️', 'Action log cleared', 'Log reset');
}

function clearQuizLog() {
    quizLog = [];
    document.getElementById('quizLog').innerHTML = '';
    logAction('🗑️', 'Quiz log cleared', 'Quiz results reset');
}

// ===== SCREEN RECORDING FUNCTIONS =====
async function startRecording() {
    try {
        // Request screen capture
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: 'screen' },
            audio: false
        });
        
        // Create MediaRecorder
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9'
        });
        
        recordedChunks = [];
        
        mediaRecorder.ondataavailable = function(event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = function() {
            stream.getTracks().forEach(track => track.stop());
            document.getElementById('stopRecordBtn').classList.add('hidden');
            document.getElementById('downloadRecordBtn').classList.remove('hidden');
            document.getElementById('recordingStatus').textContent = '';
            isRecording = false;
        };
        
        mediaRecorder.start();
        isRecording = true;
        
        // Update UI
        document.getElementById('startRecordBtn').classList.add('hidden');
        document.getElementById('stopRecordBtn').classList.remove('hidden');
        document.getElementById('recordingStatus').textContent = '● Recording...';
        
        logAction('🎥', 'Recording started', 'Screen recording in progress');
        
    } catch (error) {
        alert('Screen recording failed. Please ensure you granted permission to record your screen.');
        console.error('Recording error:', error);
    }
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        logAction('⏹️', 'Recording stopped', 'Recording saved');
    }
}

function downloadRecording() {
    if (recordedChunks.length === 0) {
        alert('No recording available to download.');
        return;
    }
    
    // Create blob from recorded chunks
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `triangle-area-recording-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    // Reset UI
    document.getElementById('downloadRecordBtn').classList.add('hidden');
    document.getElementById('startRecordBtn').classList.remove('hidden');
    recordedChunks = [];
    
    logAction('⬇️', 'Recording downloaded', 'WebM file saved');
}