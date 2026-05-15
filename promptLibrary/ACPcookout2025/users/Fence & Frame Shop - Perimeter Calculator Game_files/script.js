// Game state management
let gameState = {
    coins: 100,
    satisfaction: 85,
    completedOrders: 0,
    currentOrder: null,
    difficulty: 'easy',
    orders: []
};

// Customer data with diverse representation
const customers = [
    { name: "Mrs. Chen", avatar: "👩🏻", projects: ["garden", "artwork", "playground"] },
    { name: "Mr. Ahmed", avatar: "👨🏽", projects: ["fence", "frame", "border"] },
    { name: "Ms. Rodriguez", avatar: "👩🏽", projects: ["garden", "artwork", "fence"] },
    { name: "Mr. Johnson", avatar: "👨🏿", projects: ["playground", "frame", "garden"] },
    { name: "Mrs. Kim", avatar: "👩🏻", projects: ["artwork", "border", "fence"] },
    { name: "Mr. Patel", avatar: "👨🏽", projects: ["fence", "garden", "playground"] }
];

// Project templates for different shapes and contexts
const projectTemplates = {
    rectangle: [
        { type: "Garden Fencing", description: "Fence around rectangular vegetable garden", reward: 25 },
        { type: "Picture Frame", description: "Frame for rectangular family photo", reward: 20 },
        { type: "Playground Border", description: "Border around rectangular play area", reward: 30 }
    ],
    square: [
        { type: "Sandbox Border", description: "Border around square sandbox", reward: 15 },
        { type: "Square Frame", description: "Frame for square artwork", reward: 18 },
        { type: "Garden Plot", description: "Fence around square herb garden", reward: 22 }
    ],
    triangle: [
        { type: "Triangle Art Frame", description: "Frame for triangular art piece", reward: 28 },
        { type: "Garden Corner", description: "Fence for triangular garden corner", reward: 25 },
        { type: "Decorative Border", description: "Border for triangular flower bed", reward: 24 }
    ]
};

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
    generateOrders();
});

/**
 * Initialize the game state and UI elements
 */
function initializeGame() {
    updateUI();
    console.log('Game initialized successfully');
}

/**
 * Set up all event listeners for interactive elements
 */
function setupEventListeners() {
    // Calculator button
    document.getElementById('calculatorBtn').addEventListener('click', openCalculator);
    
    // Formula helper button
    document.getElementById('formulaBtn').addEventListener('click', openFormulaHelper);
    
    // Hint button
    document.getElementById('hintBtn').addEventListener('click', showHint);
    
    // Difficulty selector
    document.getElementById('difficulty').addEventListener('change', function(e) {
        gameState.difficulty = e.target.value;
        generateOrders();
        console.log('Difficulty changed to:', gameState.difficulty);
    });
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // Feedback modal close button
    document.getElementById('feedbackClose').addEventListener('click', closeFeedbackModal);
    
    console.log('Event listeners set up successfully');
}

/**
 * Generate random customer orders based on difficulty level
 */
function generateOrders() {
    gameState.orders = [];
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';
    
    // Generate 4-6 orders
    const numOrders = Math.floor(Math.random() * 3) + 4;
    
    for (let i = 0; i < numOrders; i++) {
        const order = generateRandomOrder();
        gameState.orders.push(order);
        
        const orderElement = createOrderElement(order, i);
        ordersList.appendChild(orderElement);
    }
    
    console.log('Generated', numOrders, 'orders for difficulty:', gameState.difficulty);
}

/**
 * Generate a single random order based on current difficulty
 */
function generateRandomOrder() {
    const shapes = ['rectangle', 'square', 'triangle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const template = projectTemplates[shape][Math.floor(Math.random() * projectTemplates[shape].length)];
    
    let dimensions = {};
    
    // Generate dimensions based on difficulty level
    switch (gameState.difficulty) {
        case 'easy':
            dimensions = generateEasyDimensions(shape);
            break;
        case 'medium':
            dimensions = generateMediumDimensions(shape);
            break;
        case 'hard':
            dimensions = generateHardDimensions(shape);
            break;
    }
    
    return {
        id: Date.now() + Math.random(),
        customer: customer,
        shape: shape,
        template: template,
        dimensions: dimensions,
        completed: false
    };
}

/**
 * Generate easy dimensions (whole numbers 1-20)
 */
function generateEasyDimensions(shape) {
    switch (shape) {
        case 'rectangle':
            return {
                length: Math.floor(Math.random() * 15) + 5,
                width: Math.floor(Math.random() * 10) + 3
            };
        case 'square':
            return {
                side: Math.floor(Math.random() * 12) + 4
            };
        case 'triangle':
            return {
                side1: Math.floor(Math.random() * 8) + 5,
                side2: Math.floor(Math.random() * 8) + 5,
                side3: Math.floor(Math.random() * 8) + 5
            };
    }
}

/**
 * Generate medium dimensions (decimals to 1 decimal place)
 */
function generateMediumDimensions(shape) {
    switch (shape) {
        case 'rectangle':
            return {
                length: Math.round((Math.random() * 15 + 5) * 10) / 10,
                width: Math.round((Math.random() * 10 + 3) * 10) / 10
            };
        case 'square':
            return {
                side: Math.round((Math.random() * 12 + 4) * 10) / 10
            };
        case 'triangle':
            return {
                side1: Math.round((Math.random() * 8 + 5) * 10) / 10,
                side2: Math.round((Math.random() * 8 + 5) * 10) / 10,
                side3: Math.round((Math.random() * 8 + 5) * 10) / 10
            };
    }
}

/**
 * Generate hard dimensions (mixed whole numbers and decimals, larger ranges)
 */
function generateHardDimensions(shape) {
    const useDecimal = Math.random() > 0.5;
    const multiplier = useDecimal ? 10 : 1;
    const divisor = useDecimal ? 10 : 1;
    
    switch (shape) {
        case 'rectangle':
            return {
                length: Math.round((Math.random() * 25 + 5) * multiplier) / divisor,
                width: Math.round((Math.random() * 15 + 3) * multiplier) / divisor
            };
        case 'square':
            return {
                side: Math.round((Math.random() * 20 + 4) * multiplier) / divisor
            };
        case 'triangle':
            return {
                side1: Math.round((Math.random() * 15 + 5) * multiplier) / divisor,
                side2: Math.round((Math.random() * 15 + 5) * multiplier) / divisor,
                side3: Math.round((Math.random() * 15 + 5) * multiplier) / divisor
            };
    }
}

/**
 * Create DOM element for an order card
 */
function createOrderElement(order, index) {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'order-card';
    orderDiv.onclick = () => selectOrder(index);
    
    // Format dimensions text
    let dimensionsText = '';
    switch (order.shape) {
        case 'rectangle':
            dimensionsText = `${order.dimensions.length}m × ${order.dimensions.width}m`;
            break;
        case 'square':
            dimensionsText = `${order.dimensions.side}m × ${order.dimensions.side}m`;
            break;
        case 'triangle':
            dimensionsText = `${order.dimensions.side1}m, ${order.dimensions.side2}m, ${order.dimensions.side3}m`;
            break;
    }
    
    orderDiv.innerHTML = `
        <div class="customer-info">
            <div class="customer-avatar">${order.customer.avatar}</div>
            <div class="customer-name">${order.customer.name}</div>
        </div>
        <div class="project-type">${order.template.type}</div>
        <div class="shape-preview ${order.shape}"></div>
        <div class="dimensions">${dimensionsText}</div>
        <div class="reward">💰 ${order.template.reward} coins</div>
    `;
    
    return orderDiv;
}

/**
 * Select and display an order in the work area
 */
function selectOrder(index) {
    // Remove active class from all orders
    document.querySelectorAll('.order-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected order
    document.querySelectorAll('.order-card')[index].classList.add('active');
    
    gameState.currentOrder = gameState.orders[index];
    displayWorkspace(gameState.currentOrder);
    
    console.log('Selected order:', gameState.currentOrder);
}

/**
 * Display the workspace for the selected order
 */
function displayWorkspace(order) {
    const workArea = document.getElementById('workArea');
    
    workArea.innerHTML = `
        <div class="project-workspace">
            <div class="project-header">
                <div class="project-title">${order.customer.name}'s ${order.template.type}</div>
                <div class="project-description">${order.template.description}</div>
            </div>
            
            <div class="shape-workspace">
                <div class="shape-display ${order.shape}" id="shapeDisplay">
                    ${createShapeHTML(order)}
                </div>
                <div class="measuring-tape" id="measuringTape"></div>
            </div>
            
            <div class="calculation-area">
                <div class="calculation-input">
                    <label>Perimeter:</label>
                    <input type="number" id="perimeterInput" placeholder="Enter perimeter in meters" step="0.1">
                    <span>meters</span>
                </div>
            </div>
            
            <div class="submit-area">
                <button class="btn-primary" onclick="submitAnswer()">Submit Quote</button>
                <button class="btn-secondary" onclick="showWorkings()">Show My Work</button>
            </div>
        </div>
    `;
    
    // Add measuring tape interaction
    setupMeasuringTape();
}

/**
 * Create HTML for different shapes with dimension labels
 */
function createShapeHTML(order) {
    const dims = order.dimensions;
    
    switch (order.shape) {
        case 'rectangle':
            return `
                <div style="width: 120px; height: 80px; position: relative;">
                    <div class="dimension-label" style="top: -20px; left: 50%; transform: translateX(-50%);">${dims.length}m</div>
                    <div class="dimension-label" style="right: -30px; top: 50%; transform: translateY(-50%);">${dims.width}m</div>
                </div>
            `;
        case 'square':
            return `
                <div style="width: 100px; height: 100px; position: relative;">
                    <div class="dimension-label" style="top: -20px; left: 50%; transform: translateX(-50%);">${dims.side}m</div>
                    <div class="dimension-label" style="right: -25px; top: 50%; transform: translateY(-50%);">${dims.side}m</div>
                </div>
            `;
        case 'triangle':
            return `
                <div style="position: relative; width: 120px; height: 100px;">
                    <div class="dimension-label" style="bottom: -20px; left: 20px;">${dims.side1}m</div>
                    <div class="dimension-label" style="bottom: -20px; right: 20px;">${dims.side2}m</div>
                    <div class="dimension-label" style="top: 20px; right: -30px;">${dims.side3}m</div>
                </div>
            `;
    }
}

/**
 * Set up measuring tape interaction for visual feedback
 */
function setupMeasuringTape() {
    const shapeDisplay = document.getElementById('shapeDisplay');
    const measuringTape = document.getElementById('measuringTape');
    
    if (shapeDisplay && measuringTape) {
        shapeDisplay.addEventListener('mouseenter', function() {
            measuringTape.classList.add('active');
            // Position measuring tape around the shape perimeter
            const rect = shapeDisplay.getBoundingClientRect();
            measuringTape.style.left = (rect.left - 5) + 'px';
            measuringTape.style.top = (rect.top - 5) + 'px';
            measuringTape.style.width = (rect.width + 10) + 'px';
            measuringTape.style.height = (rect.height + 10) + 'px';
        });
        
        shapeDisplay.addEventListener('mouseleave', function() {
            measuringTape.classList.remove('active');
        });
    }
}

/**
 * Submit the student's answer and provide feedback
 */
function submitAnswer() {
    const perimeterInput = document.getElementById('perimeterInput');
    const studentAnswer = parseFloat(perimeterInput.value);
    
    if (isNaN(studentAnswer) || studentAnswer <= 0) {
        showFeedback('Please enter a valid perimeter measurement!', 'error');
        return;
    }
    
    const correctAnswer = calculateCorrectPerimeter(gameState.currentOrder);
    const tolerance = correctAnswer * 0.05; // 5% tolerance
    
    const isCorrect = Math.abs(studentAnswer - correctAnswer) <= tolerance;
    
    if (isCorrect) {
        handleCorrectAnswer(correctAnswer);
    } else {
        handleIncorrectAnswer(correctAnswer, studentAnswer);
    }
}

/**
 * Calculate the correct perimeter for the current order
 */
function calculateCorrectPerimeter(order) {
    const dims = order.dimensions;
    
    switch (order.shape) {
        case 'rectangle':
            return 2 * (dims.length + dims.width);
        case 'square':
            return 4 * dims.side;
        case 'triangle':
            return dims.side1 + dims.side2 + dims.side3;
        default:
            return 0;
    }
}

/**
 * Handle correct answer submission
 */
function handleCorrectAnswer(correctAnswer) {
    const reward = gameState.currentOrder.template.reward;
    gameState.coins += reward;
    gameState.completedOrders++;
    gameState.satisfaction = Math.min(100, gameState.satisfaction + 5);
    
    // Mark order as completed
    gameState.currentOrder.completed = true;
    
    showFeedback(`
        <div class="feedback-success">
            <h3>🎉 Excellent Work!</h3>
            <p>You calculated the perimeter correctly: ${correctAnswer}m</p>
            <p>You earned ${reward} coins!</p>
            <p>${gameState.currentOrder.customer.name} is very happy with your quote!</p>
        </div>
    `, 'success');
    
    updateUI();
    console.log('Correct answer! Coins:', gameState.coins, 'Satisfaction:', gameState.satisfaction);
}

/**
 * Handle incorrect answer submission
 */
function handleIncorrectAnswer(correctAnswer, studentAnswer) {
    gameState.satisfaction = Math.max(0, gameState.satisfaction - 3);
    
    showFeedback(`
        <div class="feedback-error">
            <h3>❌ Not Quite Right</h3>
            <p>Your answer: ${studentAnswer}m</p>
            <p>Correct answer: ${correctAnswer}m</p>
            <p>Try again! Remember to check your formula and calculations.</p>
            <p>${gameState.currentOrder.customer.name} needs an accurate quote.</p>
        </div>
    `, 'error');
    
    updateUI();
    console.log('Incorrect answer. Correct:', correctAnswer, 'Student:', studentAnswer);
}

/**
 * Show working/calculation steps for current problem
 */
function showWorkings() {
    if (!gameState.currentOrder) return;
    
    const order = gameState.currentOrder;
    const dims = order.dimensions;
    let workingSteps = '';
    
    switch (order.shape) {
        case 'rectangle':
            workingSteps = `
                <h4>Rectangle Perimeter Calculation:</h4>
                <p>Formula: P = 2 × (length + width)</p>
                <p>P = 2 × (${dims.length} + ${dims.width})</p>
                <p>P = 2 × ${dims.length + dims.width}</p>
                <p>P = ${2 * (dims.length + dims.width)} meters</p>
            `;
            break;
        case 'square':
            workingSteps = `
                <h4>Square Perimeter Calculation:</h4>
                <p>Formula: P = 4 × side</p>
                <p>P = 4 × ${dims.side}</p>
                <p>P = ${4 * dims.side} meters</p>
            `;
            break;
        case 'triangle':
            workingSteps = `
                <h4>Triangle Perimeter Calculation:</h4>
                <p>Formula: P = side₁ + side₂ + side₃</p>
                <p>P = ${dims.side1} + ${dims.side2} + ${dims.side3}</p>
                <p>P = ${dims.side1 + dims.side2 + dims.side3} meters</p>
            `;
            break;
    }
    
    showFeedback(`
        <div class="working-steps">
            <h3>💡 Step-by-Step Solution</h3>
            ${workingSteps}
            <p><em>Now try calculating it yourself!</em></p>
        </div>
    `, 'info');
}

/**
 * Show hint for the current problem
 */
function showHint() {
    if (!gameState.currentOrder) {
        showFeedback('Select a customer order first to get a hint!', 'info');
        return;
    }
    
    const order = gameState.currentOrder;
    let hint = '';
    
    switch (order.shape) {
        case 'rectangle':
            hint = `
                <h4>💡 Hint for Rectangle</h4>
                <p>A rectangle has 4 sides: 2 long sides and 2 short sides.</p>
                <p>Add up all the sides: length + width + length + width</p>
                <p>Or use the formula: P = 2 × (length + width)</p>
            `;
            break;
        case 'square':
            hint = `
                <h4>💡 Hint for Square</h4>
                <p>A square has 4 equal sides.</p>
                <p>Add the same side length 4 times.</p>
                <p>Or use the formula: P = 4 × side</p>
            `;
            break;
        case 'triangle':
            hint = `
                <h4>💡 Hint for Triangle</h4>
                <p>A triangle has 3 sides.</p>
                <p>Add all three side lengths together.</p>
                <p>Formula: P = side₁ + side₂ + side₃</p>
            `;
            break;
    }
    
    showFeedback(hint, 'info');
}

/**
 * Open calculator modal
 */
function openCalculator() {
    document.getElementById('calculatorModal').style.display = 'block';
    document.getElementById('calcDisplay').value = '';
    console.log('Calculator opened');
}

/**
 * Open formula helper modal
 */
function openFormulaHelper() {
    document.getElementById('formulaModal').style.display = 'block';
    console.log('Formula helper opened');
}

/**
 * Close all modals
 */
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

/**
 * Close feedback modal and generate new orders if all completed
 */
function closeFeedbackModal() {
    document.getElementById('feedbackModal').style.display = 'none';
    
    // Check if all orders are completed
    const allCompleted = gameState.orders.every(order => order.completed);
    if (allCompleted) {
        setTimeout(() => {
            generateOrders();
            document.getElementById('workArea').innerHTML = `
                <div class="welcome-message">
                    <h3>🎉 All Orders Completed!</h3>
                    <p>Great work! New customers are waiting.</p>
                    <p>Select a new order to continue.</p>
                </div>
            `;
        }, 1000);
    }
}

/**
 * Show feedback modal with message
 */
function showFeedback(message, type) {
    const feedbackContent = document.getElementById('feedbackContent');
    feedbackContent.innerHTML = message;
    feedbackContent.className = `feedback-${type}`;
    document.getElementById('feedbackModal').style.display = 'block';
}

/**
 * Update UI elements with current game state
 */
function updateUI() {
    document.getElementById('coinCount').textContent = gameState.coins;
    document.getElementById('satisfactionLevel').style.width = gameState.satisfaction + '%';
    document.getElementById('satisfactionText').textContent = gameState.satisfaction + '%';
    document.getElementById('completedCount').textContent = gameState.completedOrders;
    
    // Update satisfaction bar color
    const satisfactionFill = document.getElementById('satisfactionLevel');
    if (gameState.satisfaction >= 80) {
        satisfactionFill.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
    } else if (gameState.satisfaction >= 60) {
        satisfactionFill.style.background = 'linear-gradient(90deg, #FF9800, #FFC107)';
    } else {
        satisfactionFill.style.background = 'linear-gradient(90deg, #f44336, #FF5722)';
    }
}

// Calculator Functions
let calcDisplay = '';

/**
 * Append value to calculator display
 */
function appendToCalc(value) {
    calcDisplay += value;
    document.getElementById('calcDisplay').value = calcDisplay;
}

/**
 * Clear calculator display
 */
function clearCalc() {
    calcDisplay = '';
    document.getElementById('calcDisplay').value = calcDisplay;
}

/**
 * Delete last character from calculator
 */
function deleteLast() {
    calcDisplay = calcDisplay.slice(0, -1);
    document.getElementById('calcDisplay').value = calcDisplay;
}

/**
 * Calculate result and display
 */
function calculate() {
    try {
        // Replace × with * for evaluation
        const expression = calcDisplay.replace(/×/g, '*');
        const result = eval(expression);
        calcDisplay = result.toString();
        document.getElementById('calcDisplay').value = calcDisplay;
    } catch (error) {
        calcDisplay = 'Error';
        document.getElementById('calcDisplay').value = calcDisplay;
        setTimeout(() => {
            clearCalc();
        }, 1500);
    }
}

// Tooltip Functions
/**
 * Show tooltip on hover
 */
function showTooltip(event, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = text;
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY - 30 + 'px';
    tooltip.classList.add('show');
}

/**
 * Hide tooltip
 */
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// Accessibility and keyboard support
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Submit answer with Enter key when input is focused
    if (e.key === 'Enter' && document.activeElement.id === 'perimeterInput') {
        submitAnswer();
    }
});

console.log('Fence & Frame Shop game loaded successfully!');