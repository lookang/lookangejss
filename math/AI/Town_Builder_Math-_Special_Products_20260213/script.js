// ============================================
// GLOBAL STATE AND CONFIGURATION
// ============================================

let currentQuestion = 0;
let score = 0;
let questions = [];
let currentAnswer = null;
let tableComplete = false;

// MODIFIED: Building definitions with diverse shapes (wide/short, tall/thin, circle, oval, trapezium, dome, etc.)
const buildings = [
    { name: 'Library', type: 'dome', color: '#8e44ad', width: 45, height: 40 },
    { name: 'Shopping Mall', type: 'wide-short', color: '#e74c3c', width: 55, height: 35 },
    { name: 'Amusement Park', type: 'circle', color: '#f39c12', width: 40, height: 40 },
    { name: 'School', type: 'tall-thin', color: '#3498db', width: 30, height: 60 },
    { name: 'Swimming Pool', type: 'oval', color: '#1abc9c', width: 50, height: 30 },
    { name: 'Hotel', type: 'tall-thin', color: '#e67e22', width: 35, height: 55 },
    { name: 'Park', type: 'trapezium', color: '#27ae60', width: 45, height: 35 },
    { name: 'Playground', type: 'wide-short', color: '#f1c40f', width: 50, height: 30 },
    { name: 'Food Court', type: 'circle', color: '#e84393', width: 38, height: 38 },
    { name: 'Mega Mall', type: 'dome', color: '#d63031', width: 50, height: 50 }
];

// FIXED: Building positions - updated to avoid overlapping with trees and houses
// Avoiding areas: trees at (80,130), (170,140), (380,135), (520,130), (90,320), (400,310)
// Avoiding houses at (150,300), (500,80), (250,100)
// Quadrants: Top-left (0-290, 0-190), Top-right (310-600, 0-190), Bottom-left (0-290, 210-400), Bottom-right (310-600, 210-400)
const buildingPositions = [
    { x: 420, y: 50 },     // Top right - away from house at (500,80)
    { x: 25, y: 260 },     // Bottom left - away from tree at (90,320)
    { x: 530, y: 120 },    // Top right - away from tree at (520,130)
    { x: 180, y: 280 },    // Bottom left - away from house at (150,300)
    { x: 40, y: 30 },      // Top left - clear area
    { x: 470, y: 250 },    // Bottom right - away from tree at (400,310)
    { x: 330, y: 60 },     // Top right - clear area
    { x: 200, y: 25 },     // Top left - away from tree at (170,140) and house at (250,100)
    { x: 350, y: 270 },    // Bottom right - clear area
    { x: 540, y: 300 }     // Bottom right - clear area
];

// ============================================
// INITIAL TOWN ELEMENTS (TREES AND HOUSES)
// ============================================

// ADDED: Function to create initial town with trees and houses
function createInitialTown() {
    const container = document.getElementById('initialTown');
    
    // Add some trees
    const treePositions = [
        { x: 80, y: 130 }, { x: 170, y: 140 }, { x: 380, y: 135 },
        { x: 520, y: 130 }, { x: 90, y: 320 }, { x: 400, y: 310 }
    ];
    
    treePositions.forEach(pos => {
        const tree = createTree(pos.x, pos.y);
        container.appendChild(tree);
    });
    
    // Add some small houses
    const housePositions = [
        { x: 150, y: 300, color: '#ffb74d' },
        { x: 500, y: 80, color: '#81c784' },
        { x: 250, y: 100, color: '#64b5f6' }
    ];
    
    housePositions.forEach(pos => {
        const house = createSmallHouse(pos.x, pos.y, pos.color);
        container.appendChild(house);
    });
}

// ADDED: Function to create a tree SVG element
function createTree(x, y) {
    const g = document.createElementNS('vendor/external_0.txt', 'g');
    
    // Tree trunk
    const trunk = document.createElementNS('vendor/external_0.txt', 'rect');
    trunk.setAttribute('x', x);
    trunk.setAttribute('y', y);
    trunk.setAttribute('width', 8);
    trunk.setAttribute('height', 20);
    trunk.setAttribute('fill', '#8d6e63');
    
    // Tree foliage (circle)
    const foliage = document.createElementNS('vendor/external_0.txt', 'circle');
    foliage.setAttribute('cx', x + 4);
    foliage.setAttribute('cy', y - 5);
    foliage.setAttribute('r', 12);
    foliage.setAttribute('fill', '#4caf50');
    
    g.appendChild(trunk);
    g.appendChild(foliage);
    
    return g;
}

// ADDED: Function to create a small house SVG element
function createSmallHouse(x, y, color) {
    const g = document.createElementNS('vendor/external_0.txt', 'g');
    
    // House body
    const body = document.createElementNS('vendor/external_0.txt', 'rect');
    body.setAttribute('x', x);
    body.setAttribute('y', y);
    body.setAttribute('width', 25);
    body.setAttribute('height', 25);
    body.setAttribute('fill', color);
    body.setAttribute('stroke', '#333');
    body.setAttribute('stroke-width', '1');
    
    // Roof
    const roof = document.createElementNS('vendor/external_0.txt', 'polygon');
    roof.setAttribute('points', `${x + 12.5},${y - 10} ${x},${y} ${x + 25},${y}`);
    roof.setAttribute('fill', '#d32f2f');
    roof.setAttribute('stroke', '#333');
    roof.setAttribute('stroke-width', '1');
    
    // Window
    const window1 = document.createElementNS('vendor/external_0.txt', 'rect');
    window1.setAttribute('x', x + 5);
    window1.setAttribute('y', y + 5);
    window1.setAttribute('width', 6);
    window1.setAttribute('height', 6);
    window1.setAttribute('fill', '#fff9c4');
    window1.setAttribute('stroke', '#333');
    window1.setAttribute('stroke-width', '0.5');
    
    // Door
    const door = document.createElementNS('vendor/external_0.txt', 'rect');
    door.setAttribute('x', x + 15);
    door.setAttribute('y', y + 15);
    door.setAttribute('width', 6);
    door.setAttribute('height', 10);
    door.setAttribute('fill', '#8d6e63');
    door.setAttribute('stroke', '#333');
    door.setAttribute('stroke-width', '0.5');
    
    g.appendChild(body);
    g.appendChild(roof);
    g.appendChild(window1);
    g.appendChild(door);
    
    return g;
}

// ============================================
// QUESTION GENERATION
// ============================================

function generateQuestions() {
    questions = [];
    const variables = ['x', 'y', 'p', 't', 'n', 'm'];
    const types = ['diff_squares', 'plus_squared', 'minus_squared'];
    
    // Ensure balanced distribution: at least 3 of each type
    const distribution = [
        'diff_squares', 'diff_squares', 'diff_squares',
        'plus_squared', 'plus_squared', 'plus_squared',
        'minus_squared', 'minus_squared', 'minus_squared',
        types[Math.floor(Math.random() * types.length)] // 10th question random
    ];
    
    // Shuffle distribution
    for (let i = distribution.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [distribution[i], distribution[j]] = [distribution[j], distribution[i]];
    }
    
    for (let i = 0; i < 10; i++) {
        const type = distribution[i];
        const variable = variables[Math.floor(Math.random() * variables.length)];
        const a = Math.floor(Math.random() * 9) + 1; // 1-9
        const b = Math.floor(Math.random() * 9) + 1; // 1-9
        
        questions.push(generateQuestion(type, variable, a, b));
    }
}

function generateQuestion(type, variable, a, b) {
    let question = {};
    question.type = type;
    question.variable = variable;
    
    // Randomize order (number first or variable first)
    const varFirst = Math.random() > 0.5;
    
    if (type === 'diff_squares') {
        // (a + bx)(a - bx) or (bx + a)(bx - a)
        const term1 = varFirst ? `${b === 1 ? '' : b}${variable}` : `${a}`;
        const term2 = varFirst ? `${a}` : `${b === 1 ? '' : b}${variable}`;
        
        question.expression = `(${term1} + ${term2})(${term1} − ${term2})`;
        // Store bracket terms without + sign for internal comparison
        question.bracket1 = [term1, term2];
        question.bracket2 = [term1, term2];
        // FIXED: Store expected user input WITH + sign for positive second terms (Questions 6-10)
        question.bracket1Display = [term1, `+${term2}`];
        question.bracket2Display = [term1, `-${term2}`];
        
        // Answer: a² - b²x² or b²x² - a² (but we'll normalize)
        if (varFirst) {
            question.answer = `${b * b === 1 ? '' : b * b}${variable}^2 - ${a * a}`;
        } else {
            question.answer = `${a * a} - ${b * b === 1 ? '' : b * b}${variable}^2`;
        }
        
        // FIXED: Products for table - corrected to match multiplication frame structure
        // Table structure: h1 and h2 are top row (first bracket), h3 and h4 are left column (second bracket)
        // p1 = h1 * h3, p2 = h2 * h3, p3 = h1 * h4, p4 = h2 * h4
        question.products = [
            multiplyTerms(term1, term1),        // p1: h1 * h3 (term1 * term1)
            multiplyTerms(term2, term1),        // p2: h2 * h3 (term2 * term1)
            multiplyTerms(term1, `-${term2}`),  // p3: h1 * h4 (term1 * -term2)
            multiplyTerms(term2, `-${term2}`)   // p4: h2 * h4 (term2 * -term2)
        ];
        
    } else if (type === 'plus_squared') {
        // (a + bx)² or (bx + a)²
        const term1 = varFirst ? `${b === 1 ? '' : b}${variable}` : `${a}`;
        const term2 = varFirst ? `${a}` : `${b === 1 ? '' : b}${variable}`;
        
        question.expression = `(${term1} + ${term2})²`;
        // Store bracket terms without + sign for internal comparison
        question.bracket1 = [term1, term2];
        question.bracket2 = [term1, term2];
        // FIXED: Store expected user input WITH + sign for positive second terms (Questions 6-10)
        question.bracket1Display = [term1, `+${term2}`];
        question.bracket2Display = [term1, `+${term2}`];
        
        // Answer: a² + 2abx + b²x² or b²x² + 2abx + a²
        if (varFirst) {
            question.answer = `${b * b === 1 ? '' : b * b}${variable}^2 + ${2 * a * b === 1 ? '' : 2 * a * b}${variable} + ${a * a}`;
        } else {
            question.answer = `${a * a} + ${2 * a * b === 1 ? '' : 2 * a * b}${variable} + ${b * b === 1 ? '' : b * b}${variable}^2`;
        }
        
        // FIXED: Products for table - corrected to match multiplication frame structure
        // p1 = h1 * h3, p2 = h2 * h3, p3 = h1 * h4, p4 = h2 * h4
        question.products = [
            multiplyTerms(term1, term1),  // p1: h1 * h3 (term1 * term1)
            multiplyTerms(term2, term1),  // p2: h2 * h3 (term2 * term1)
            multiplyTerms(term1, term2),  // p3: h1 * h4 (term1 * term2)
            multiplyTerms(term2, term2)   // p4: h2 * h4 (term2 * term2)
        ];
        
    } else { // minus_squared
        // (a - bx)² or (bx - a)²
        const term1 = varFirst ? `${b === 1 ? '' : b}${variable}` : `${a}`;
        const term2 = varFirst ? `${a}` : `${b === 1 ? '' : b}${variable}`;
        
        question.expression = `(${term1} − ${term2})²`;
        // Store bracket terms without sign for internal comparison
        question.bracket1 = [term1, term2];
        question.bracket2 = [term1, term2];
        // FIXED: Store expected user input WITH - sign for second terms (Questions 6-10)
        question.bracket1Display = [term1, `-${term2}`];
        question.bracket2Display = [term1, `-${term2}`];
        
        // Answer: a² - 2abx + b²x² or b²x² - 2abx + a²
        if (varFirst) {
            question.answer = `${b * b === 1 ? '' : b * b}${variable}^2 - ${2 * a * b === 1 ? '' : 2 * a * b}${variable} + ${a * a}`;
        } else {
            question.answer = `${a * a} - ${2 * a * b === 1 ? '' : 2 * a * b}${variable} + ${b * b === 1 ? '' : b * b}${variable}^2`;
        }
        
        // FIXED: Products for table - corrected for (term1 - term2)²
        // For (m - 2)², the table should be:
        // h1=m, h2=-2 (top row), h3=m, h4=-2 (left column)
        // p1 = m * m = m², p2 = -2 * m = -2m, p3 = m * -2 = -2m, p4 = -2 * -2 = 4
        question.products = [
            multiplyTerms(term1, term1),        // p1: h1 * h3 (term1 * term1)
            multiplyTerms(`-${term2}`, term1),  // p2: h2 * h3 (-term2 * term1)
            multiplyTerms(term1, `-${term2}`),  // p3: h1 * h4 (term1 * -term2)
            multiplyTerms(`-${term2}`, `-${term2}`)   // p4: h2 * h4 (-term2 * -term2)
        ];
    }
    
    return question;
}

// FIXED: Multiply two terms algebraically - handles negative signs correctly
function multiplyTerms(term1, term2) {
    // Parse terms
    const t1 = parseTerm(term1);
    const t2 = parseTerm(term2);
    
    const coeff = t1.coeff * t2.coeff;
    const power = t1.power + t2.power;
    
    if (power === 0) {
        return `${coeff}`;
    } else if (power === 1) {
        const coeffStr = coeff === 1 ? '' : coeff === -1 ? '-' : coeff;
        return `${coeffStr}${t1.variable || t2.variable}`;
    } else {
        const coeffStr = coeff === 1 ? '' : coeff === -1 ? '-' : coeff;
        return `${coeffStr}${t1.variable || t2.variable}^${power}`;
    }
}

function parseTerm(term) {
    term = term.trim();
    let coeff = 1;
    let variable = '';
    let power = 0;
    
    // Check for variable
    const varMatch = term.match(/[a-z]/);
    if (varMatch) {
        variable = varMatch[0];
        const parts = term.split(variable);
        
        // Get coefficient
        if (parts[0] === '' || parts[0] === '+') {
            coeff = 1;
        } else if (parts[0] === '-') {
            coeff = -1;
        } else {
            coeff = parseFloat(parts[0]);
        }
        
        // Get power
        if (parts[1] && parts[1].includes('^')) {
            power = parseInt(parts[1].split('^')[1]);
        } else {
            power = 1;
        }
    } else {
        coeff = parseFloat(term);
        power = 0;
    }
    
    return { coeff, variable, power };
}

// ============================================
// INPUT NORMALIZATION
// ============================================

// FIXED: Enhanced normalization function to handle sign simplification
function normalizeInput(input) {
    let normalized = input.trim();
    
    // Remove all spaces
    normalized = normalized.replace(/\s+/g, '');
    
    // Convert unicode superscripts to ^
    normalized = normalized.replace(/²/g, '^2');
    normalized = normalized.replace(/³/g, '^3');
    
    // FIXED: Simplify sign pairs (--→+, +-→-, -+→-, ++→+)
    // Repeat until no more changes (handles multiple consecutive signs)
    let prevNormalized = '';
    while (prevNormalized !== normalized) {
        prevNormalized = normalized;
        normalized = normalized.replace(/--/g, '+');
        normalized = normalized.replace(/\+-/g, '-');
        normalized = normalized.replace(/-\+/g, '-');
        normalized = normalized.replace(/\+\+/g, '+');
    }
    
    return normalized;
}

// Compare two algebraic expressions
function compareExpressions(expr1, expr2) {
    const norm1 = normalizeInput(expr1);
    const norm2 = normalizeInput(expr2);
    
    // Parse both expressions into terms
    const terms1 = parseExpression(norm1);
    const terms2 = parseExpression(norm2);
    
    // Compare term by term
    if (terms1.length !== terms2.length) return false;
    
    for (let term of terms1) {
        const match = terms2.find(t => t.variable === term.variable && t.power === term.power);
        if (!match || match.coeff !== term.coeff) return false;
    }
    
    return true;
}

function parseExpression(expr) {
    const terms = [];
    let current = '';
    
    for (let i = 0; i < expr.length; i++) {
        const char = expr[i];
        
        if ((char === '+' || char === '-') && i > 0) {
            if (current) terms.push(parseTerm(current));
            current = char === '-' ? '-' : '';
        } else {
            current += char;
        }
    }
    
    if (current) terms.push(parseTerm(current));
    
    return terms;
}

// ============================================
// UI INITIALIZATION
// ============================================

function init() {
    // Check if in iframe
    if (window.self !== window.top) {
        document.body.classList.add('in-iframe');
    } else {
        document.body.classList.add('standalone');
    }
    
    // ADDED: Create initial town with trees and houses
    createInitialTown();
    
    generateQuestions();
    loadQuestion();
    
    // Event listeners
    document.getElementById('btnCheck').addEventListener('click', checkFinalAnswer);
    document.getElementById('btnReset').addEventListener('click', resetTable);
    document.getElementById('btnNext').addEventListener('click', nextQuestion);
    document.getElementById('btnPower').addEventListener('click', insertPower);
    document.getElementById('btnRetry').addEventListener('click', retry);
    document.getElementById('btnClose').addEventListener('click', closeModal);
    
    // Table input listeners
    const headerInputs = document.querySelectorAll('.header-input');
    const productInputs = document.querySelectorAll('.product-input');
    
    headerInputs.forEach(input => {
        input.addEventListener('input', () => checkTableInputs());
    });
    
    productInputs.forEach(input => {
        input.addEventListener('input', () => checkTableInputs());
    });
    
    // Answer input listener
    document.getElementById('answerInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !document.getElementById('btnCheck').disabled) {
            checkFinalAnswer();
        }
    });
}

// ============================================
// QUESTION LOADING
// ============================================

function loadQuestion() {
    const q = questions[currentQuestion];
    
    // Update question display
    document.getElementById('questionHeader').textContent = `Question ${currentQuestion + 1}/10`;
    document.getElementById('questionText').textContent = `Expand and simplify: ${q.expression}`;
    
    // Reset table
    resetTable();
    
    // Setup table based on scaffolding
    const isScaffolded = currentQuestion < 5;
    
    const h1 = document.getElementById('h1');
    const h2 = document.getElementById('h2');
    const h3 = document.getElementById('h3');
    const h4 = document.getElementById('h4');
    
    if (isScaffolded) {
        // Pre-fill and lock headers with display values (including + sign)
        h1.value = q.bracket1Display[0];
        h2.value = q.bracket1Display[1];
        h3.value = q.bracket2Display[0];
        h4.value = q.bracket2Display[1];
        
        h1.disabled = true;
        h2.disabled = true;
        h3.disabled = true;
        h4.disabled = true;
        
        h1.classList.add('correct');
        h2.classList.add('correct');
        h3.classList.add('correct');
        h4.classList.add('correct');
    } else {
        // Enable all inputs
        h1.disabled = false;
        h2.disabled = false;
        h3.disabled = false;
        h4.disabled = false;
    }
    
    // Reset feedback
    document.getElementById('feedbackMessage').textContent = '';
    document.getElementById('feedbackMessage').className = 'feedback-message';
    document.getElementById('tableMessage').textContent = '';
    
    // Reset answer input
    document.getElementById('answerInput').value = '';
    document.getElementById('answerInput').disabled = true;
    document.getElementById('btnCheck').disabled = true;
    document.getElementById('btnPower').disabled = true;
    document.getElementById('btnNext').style.display = 'none';
    
    tableComplete = false;
}

// ============================================
// TABLE VALIDATION (FIXED FOR QUESTIONS 6-10 TO REQUIRE + SIGN)
// ============================================

function checkTableInputs() {
    const q = questions[currentQuestion];
    const isScaffolded = currentQuestion < 5;
    
    const h1 = document.getElementById('h1');
    const h2 = document.getElementById('h2');
    const h3 = document.getElementById('h3');
    const h4 = document.getElementById('h4');
    
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    const p3 = document.getElementById('p3');
    const p4 = document.getElementById('p4');
    
    let headersCorrect = true;
    let productsCorrect = true;
    
    // Check headers (only for unscaffolded - Questions 6-10)
    if (!isScaffolded) {
        // MODIFIED: Check for multiple terms in one box - BUT allow single + or - sign at the start
        const headers = [h1.value, h2.value, h3.value, h4.value];
        for (let header of headers) {
            const trimmed = header.trim();
            // Count operators (+ or -) but exclude the first character if it's a sign
            const contentAfterFirstChar = trimmed.substring(1);
            const hasMultipleTerms = contentAfterFirstChar.includes('+') || contentAfterFirstChar.includes('-');
            
            if (hasMultipleTerms) {
                document.getElementById('tableMessage').textContent = 
                    'One term per box. Example: x in one box, −4 in the other.';
                headersCorrect = false;
                return;
            }
        }
        
        // MODIFIED: Enhanced validation for Questions 6-10 - REQUIRE + sign for positive terms
        // Normalize user input for comparison
        const h1ValueNorm = normalizeInput(h1.value);
        const h2ValueNorm = normalizeInput(h2.value);
        const h3ValueNorm = normalizeInput(h3.value);
        const h4ValueNorm = normalizeInput(h4.value);
        
        // Expected values from bracket displays
        const h1Expected = q.bracket1Display[0];
        const h2Expected = q.bracket1Display[1];
        const h3Expected = q.bracket2Display[0];
        const h4Expected = q.bracket2Display[1];
        
        document.getElementById('tableMessage').textContent = '';
        
        // MODIFIED: For h2 and h4, check if they have explicit sign when needed
        // For positive terms (starting with +), REQUIRE the + sign
        // For negative terms (starting with -), require the - sign
        const h2Trimmed = h2.value.trim();
        const h4Trimmed = h4.value.trim();
        
        // MODIFIED: Validate headers - for h1 and h3 (first terms), normalize both sides
        const h1Correct = h1ValueNorm === normalizeInput(h1Expected);
        const h3Correct = h3ValueNorm === normalizeInput(h3Expected);
        
        // MODIFIED: For h2 and h4 (second terms), REQUIRE explicit sign (+ or -)
        let h2Correct = false;
        let h4Correct = false;
        
        // For h2 validation - REQUIRE the sign to be present
        if (h2Expected.startsWith('+')) {
            // MUST have + sign at the start
            h2Correct = h2Trimmed.startsWith('+') && h2ValueNorm === normalizeInput(h2Expected);
        } else if (h2Expected.startsWith('-')) {
            // MUST have - sign at the start
            h2Correct = h2Trimmed.startsWith('-') && h2ValueNorm === normalizeInput(h2Expected);
        } else {
            // No sign expected (shouldn't happen for questions 6-10 second terms)
            h2Correct = h2ValueNorm === normalizeInput(h2Expected);
        }
        
        // For h4 validation - REQUIRE the sign to be present
        if (h4Expected.startsWith('+')) {
            // MUST have + sign at the start
            h4Correct = h4Trimmed.startsWith('+') && h4ValueNorm === normalizeInput(h4Expected);
        } else if (h4Expected.startsWith('-')) {
            // MUST have - sign at the start
            h4Correct = h4Trimmed.startsWith('-') && h4ValueNorm === normalizeInput(h4Expected);
        } else {
            // No sign expected (shouldn't happen for questions 6-10 second terms)
            h4Correct = h4ValueNorm === normalizeInput(h4Expected);
        }
        
        h1.className = 'header-input ' + (h1.value && (h1Correct ? 'correct' : 'incorrect'));
        h2.className = 'header-input ' + (h2.value && (h2Correct ? 'correct' : 'incorrect'));
        h3.className = 'header-input ' + (h3.value && (h3Correct ? 'correct' : 'incorrect'));
        h4.className = 'header-input ' + (h4.value && (h4Correct ? 'correct' : 'incorrect'));
        
        headersCorrect = h1Correct && h2Correct && h3Correct && h4Correct;
        
        // Disable products until headers are correct
        if (!headersCorrect) {
            p1.disabled = true;
            p2.disabled = true;
            p3.disabled = true;
            p4.disabled = true;
            return;
        } else {
            p1.disabled = false;
            p2.disabled = false;
            p3.disabled = false;
            p4.disabled = false;
        }
    }
    
    // FIXED: Check products with correct mapping
    // p1 = h1 * h3, p2 = h2 * h3, p3 = h1 * h4, p4 = h2 * h4
    const p1Correct = compareExpressions(p1.value, q.products[0]);
    const p2Correct = compareExpressions(p2.value, q.products[1]);
    const p3Correct = compareExpressions(p3.value, q.products[2]);
    const p4Correct = compareExpressions(p4.value, q.products[3]);
    
    p1.className = 'product-input ' + (p1.value && (p1Correct ? 'correct' : 'incorrect'));
    p2.className = 'product-input ' + (p2.value && (p2Correct ? 'correct' : 'incorrect'));
    p3.className = 'product-input ' + (p3.value && (p3Correct ? 'correct' : 'incorrect'));
    p4.className = 'product-input ' + (p4.value && (p4Correct ? 'correct' : 'incorrect'));
    
    productsCorrect = p1Correct && p2Correct && p3Correct && p4Correct;
    
    // ADDED: Verify that products sum equals final answer algebraically
    if (productsCorrect) {
        // Combine all products and verify they equal the final answer
        const allProducts = [p1.value, p2.value, p3.value, p4.value];
        const combinedExpression = allProducts.join('+');
        
        // This verification ensures the table cells add up to the correct final answer
        if (!compareExpressions(combinedExpression, q.answer)) {
            console.warn('Products do not sum to final answer - this should not happen with correct logic');
        }
    }
    
    // Enable final answer if table complete
    if (headersCorrect && productsCorrect) {
        tableComplete = true;
        document.getElementById('answerInput').disabled = false;
        document.getElementById('btnCheck').disabled = false;
        document.getElementById('btnPower').disabled = false;
        document.getElementById('answerInput').focus();
    }
}

// ============================================
// FINAL ANSWER CHECKING
// ============================================

function checkFinalAnswer() {
    const userAnswer = document.getElementById('answerInput').value;
    const q = questions[currentQuestion];
    
    if (!userAnswer.trim()) {
        showFeedback('Please enter your answer.', false);
        return;
    }
    
    if (compareExpressions(userAnswer, q.answer)) {
        // Correct!
        score++;
        updateProgress();
        showFeedback('🎉 Excellent! Your answer is correct!', true);
        buildTownStructure(currentQuestion);
        
        // Enable next button
        document.getElementById('btnNext').style.display = 'inline-block';
        document.getElementById('btnCheck').disabled = true;
        document.getElementById('answerInput').disabled = true;
        
        // Check if final question
        if (currentQuestion === 9) {
            setTimeout(() => {
                showCelebration();
            }, 1500);
        }
    } else {
        showFeedback('Not quite right. Check your simplification and try again.', false);
    }
}

function showFeedback(message, isCorrect) {
    const feedback = document.getElementById('feedbackMessage');
    feedback.textContent = message;
    feedback.className = 'feedback-message ' + (isCorrect ? 'correct' : 'incorrect');
}

// ============================================
// PROGRESS AND NAVIGATION
// ============================================

function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    const percentage = (score / 10) * 100;
    progressBar.style.setProperty('--progress', `${percentage}%`);
    progressBar.querySelector('::after') || (progressBar.style.width = `${percentage}%`);
    
    // Update progress bar width via CSS variable workaround
    document.documentElement.style.setProperty('--progress-width', `${percentage}%`);
    
    progressText.textContent = `Score: ${score} / 10`;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < 10) {
        loadQuestion();
    }
}

function resetTable() {
    const inputs = document.querySelectorAll('.header-input, .product-input');
    inputs.forEach(input => {
        if (!input.disabled || currentQuestion >= 5) {
            input.value = '';
            input.className = input.classList.contains('header-input') ? 'header-input' : 'product-input';
        }
    });
    
    document.getElementById('tableMessage').textContent = '';
    tableComplete = false;
}

function insertPower() {
    const input = document.getElementById('answerInput');
    const pos = input.selectionStart;
    const val = input.value;
    
    input.value = val.substring(0, pos) + '^2' + val.substring(pos);
    input.focus();
    input.setSelectionRange(pos + 2, pos + 2);
}

// ============================================
// TOWN BUILDING - MODIFIED WITH DIVERSE SHAPES
// ============================================

function buildTownStructure(index) {
    const building = buildings[index];
    const pos = buildingPositions[index];
    const container = document.getElementById('buildingContainer');
    
    // Create building group
    const g = document.createElementNS('vendor/external_0.txt', 'g');
    g.setAttribute('class', 'building-animate');
    
    // MODIFIED: Create different building shapes based on type
    switch(building.type) {
        case 'dome':
            createDomeBuilding(g, pos, building);
            break;
        case 'wide-short':
            createWideShortBuilding(g, pos, building);
            break;
        case 'circle':
            createCircleBuilding(g, pos, building);
            break;
        case 'tall-thin':
            createTallThinBuilding(g, pos, building);
            break;
        case 'oval':
            createOvalBuilding(g, pos, building);
            break;
        case 'trapezium':
            createTrapeziumBuilding(g, pos, building);
            break;
        default:
            createDomeBuilding(g, pos, building);
    }
    
    // Label
    const text = document.createElementNS('vendor/external_0.txt', 'text');
    text.setAttribute('x', pos.x + building.width / 2);
    text.setAttribute('y', pos.y + building.height + 15);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '10');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('fill', '#333');
    text.textContent = building.name;
    g.appendChild(text);
    
    container.appendChild(g);
    
    // Sparkle effect
    createSparkle(pos.x + building.width / 2, pos.y + building.height / 2);
}

// ADDED: Function to create dome-shaped building
function createDomeBuilding(g, pos, building) {
    // Rectangular base
    const base = document.createElementNS('vendor/external_0.txt', 'rect');
    base.setAttribute('x', pos.x);
    base.setAttribute('y', pos.y + building.height * 0.4);
    base.setAttribute('width', building.width);
    base.setAttribute('height', building.height * 0.6);
    base.setAttribute('fill', building.color);
    base.setAttribute('stroke', '#333');
    base.setAttribute('stroke-width', '2');
    
    // Dome top
    const dome = document.createElementNS('vendor/external_0.txt', 'ellipse');
    dome.setAttribute('cx', pos.x + building.width / 2);
    dome.setAttribute('cy', pos.y + building.height * 0.4);
    dome.setAttribute('rx', building.width / 2);
    dome.setAttribute('ry', building.height * 0.4);
    dome.setAttribute('fill', building.color);
    dome.setAttribute('stroke', '#333');
    dome.setAttribute('stroke-width', '2');
    
    // Windows
    for (let i = 0; i < 3; i++) {
        const win = document.createElementNS('vendor/external_0.txt', 'rect');
        win.setAttribute('x', pos.x + 8 + i * 12);
        win.setAttribute('y', pos.y + building.height * 0.5);
        win.setAttribute('width', 8);
        win.setAttribute('height', 8);
        win.setAttribute('fill', '#fff9c4');
        win.setAttribute('stroke', '#333');
        win.setAttribute('stroke-width', '1');
        g.appendChild(win);
    }
    
    g.appendChild(dome);
    g.appendChild(base);
}

// ADDED: Function to create wide-short building
function createWideShortBuilding(g, pos, building) {
    // Main body
    const body = document.createElementNS('vendor/external_0.txt', 'rect');
    body.setAttribute('x', pos.x);
    body.setAttribute('y', pos.y);
    body.setAttribute('width', building.width);
    body.setAttribute('height', building.height);
    body.setAttribute('fill', building.color);
    body.setAttribute('stroke', '#333');
    body.setAttribute('stroke-width', '2');
    body.setAttribute('rx', '3');
    
    // Flat roof
    const roof = document.createElementNS('vendor/external_0.txt', 'rect');
    roof.setAttribute('x', pos.x - 3);
    roof.setAttribute('y', pos.y - 5);
    roof.setAttribute('width', building.width + 6);
    roof.setAttribute('height', 5);
    roof.setAttribute('fill', '#555');
    roof.setAttribute('stroke', '#333');
    roof.setAttribute('stroke-width', '1');
    
    // Multiple windows
    for (let i = 0; i < 4; i++) {
        const win = document.createElementNS('vendor/external_0.txt', 'rect');
        win.setAttribute('x', pos.x + 8 + i * 11);
        win.setAttribute('y', pos.y + 10);
        win.setAttribute('width', 7);
        win.setAttribute('height', 7);
        win.setAttribute('fill', '#fff9c4');
        win.setAttribute('stroke', '#333');
        win.setAttribute('stroke-width', '1');
        g.appendChild(win);
    }
    
    // Door
    const door = document.createElementNS('vendor/external_0.txt', 'rect');
    door.setAttribute('x', pos.x + building.width / 2 - 5);
    door.setAttribute('y', pos.y + building.height - 12);
    door.setAttribute('width', 10);
    door.setAttribute('height', 12);
    door.setAttribute('fill', '#8d6e63');
    door.setAttribute('stroke', '#333');
    door.setAttribute('stroke-width', '1');
    
    g.appendChild(roof);
    g.appendChild(body);
    g.appendChild(door);
}

// ADDED: Function to create circular building
function createCircleBuilding(g, pos, building) {
    const radius = building.width / 2;
    
    // Main circular body
    const circle = document.createElementNS('vendor/external_0.txt', 'circle');
    circle.setAttribute('cx', pos.x + radius);
    circle.setAttribute('cy', pos.y + radius);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', building.color);
    circle.setAttribute('stroke', '#333');
    circle.setAttribute('stroke-width', '2');
    
    // Conical roof
    const roof = document.createElementNS('vendor/external_0.txt', 'polygon');
    const roofPoints = `${pos.x + radius},${pos.y - 15} ${pos.x},${pos.y + radius * 0.3} ${pos.x + building.width},${pos.y + radius * 0.3}`;
    roof.setAttribute('points', roofPoints);
    roof.setAttribute('fill', '#e74c3c');
    roof.setAttribute('stroke', '#333');
    roof.setAttribute('stroke-width', '2');
    
    // Circular windows
    for (let i = 0; i < 3; i++) {
        const angle = (i * 120 - 90) * Math.PI / 180;
        const winX = pos.x + radius + Math.cos(angle) * radius * 0.5;
        const winY = pos.y + radius + Math.sin(angle) * radius * 0.5;
        
        const win = document.createElementNS('vendor/external_0.txt', 'circle');
        win.setAttribute('cx', winX);
        win.setAttribute('cy', winY);
        win.setAttribute('r', 4);
        win.setAttribute('fill', '#fff9c4');
        win.setAttribute('stroke', '#333');
        win.setAttribute('stroke-width', '1');
        g.appendChild(win);
    }
    
    g.appendChild(roof);
    g.appendChild(circle);
}

// ADDED: Function to create tall-thin building
function createTallThinBuilding(g, pos, building) {
    // Main body
    const body = document.createElementNS('vendor/external_0.txt', 'rect');
    body.setAttribute('x', pos.x);
    body.setAttribute('y', pos.y);
    body.setAttribute('width', building.width);
    body.setAttribute('height', building.height);
    body.setAttribute('fill', building.color);
    body.setAttribute('stroke', '#333');
    body.setAttribute('stroke-width', '2');
    
    // Pointed roof
    const roof = document.createElementNS('vendor/external_0.txt', 'polygon');
    const roofPoints = `${pos.x + building.width / 2},${pos.y - 12} ${pos.x},${pos.y} ${pos.x + building.width},${pos.y}`;
    roof.setAttribute('points', roofPoints);
    roof.setAttribute('fill', '#c62828');
    roof.setAttribute('stroke', '#333');
    roof.setAttribute('stroke-width', '2');
    
    // Stacked windows
    for (let i = 0; i < 5; i++) {
        const win = document.createElementNS('vendor/external_0.txt', 'rect');
        win.setAttribute('x', pos.x + building.width / 2 - 4);
        win.setAttribute('y', pos.y + 8 + i * 10);
        win.setAttribute('width', 8);
        win.setAttribute('height', 6);
        win.setAttribute('fill', '#fff9c4');
        win.setAttribute('stroke', '#333');
        win.setAttribute('stroke-width', '1');
        g.appendChild(win);
    }
    
    g.appendChild(roof);
    g.appendChild(body);
}

// ADDED: Function to create oval building
function createOvalBuilding(g, pos, building) {
    // Oval body
    const oval = document.createElementNS('vendor/external_0.txt', 'ellipse');
    oval.setAttribute('cx', pos.x + building.width / 2);
    oval.setAttribute('cy', pos.y + building.height / 2);
    oval.setAttribute('rx', building.width / 2);
    oval.setAttribute('ry', building.height / 2);
    oval.setAttribute('fill', building.color);
    oval.setAttribute('stroke', '#333');
    oval.setAttribute('stroke-width', '2');
    
    // Curved roof accent
    const roofArc = document.createElementNS('vendor/external_0.txt', 'path');
    roofArc.setAttribute('d', `M ${pos.x} ${pos.y + building.height / 2} Q ${pos.x + building.width / 2} ${pos.y - 5} ${pos.x + building.width} ${pos.y + building.height / 2}`);
    roofArc.setAttribute('fill', 'none');
    roofArc.setAttribute('stroke', '#555');
    roofArc.setAttribute('stroke-width', '3');
    
    // Windows arranged in oval pattern
    for (let i = 0; i < 4; i++) {
        const win = document.createElementNS('vendor/external_0.txt', 'rect');
        win.setAttribute('x', pos.x + 10 + i * 10);
        win.setAttribute('y', pos.y + building.height / 2 - 3);
        win.setAttribute('width', 6);
        win.setAttribute('height', 6);
        win.setAttribute('fill', '#fff9c4');
        win.setAttribute('stroke', '#333');
        win.setAttribute('stroke-width', '1');
        g.appendChild(win);
    }
    
    g.appendChild(oval);
    g.appendChild(roofArc);
}

// ADDED: Function to create trapezium building
function createTrapeziumBuilding(g, pos, building) {
    // Trapezium body
    const trapezium = document.createElementNS('vendor/external_0.txt', 'polygon');
    const topWidth = building.width * 0.7;
    const offset = (building.width - topWidth) / 2;
    const points = `${pos.x + offset},${pos.y} ${pos.x + offset + topWidth},${pos.y} ${pos.x + building.width},${pos.y + building.height} ${pos.x},${pos.y + building.height}`;
    trapezium.setAttribute('points', points);
    trapezium.setAttribute('fill', building.color);
    trapezium.setAttribute('stroke', '#333');
    trapezium.setAttribute('stroke-width', '2');
    
    // Flat top
    const top = document.createElementNS('vendor/external_0.txt', 'rect');
    top.setAttribute('x', pos.x + offset - 2);
    top.setAttribute('y', pos.y - 3);
    top.setAttribute('width', topWidth + 4);
    top.setAttribute('height', 3);
    top.setAttribute('fill', '#424242');
    top.setAttribute('stroke', '#333');
    top.setAttribute('stroke-width', '1');
    
    // Windows
    for (let i = 0; i < 3; i++) {
        const win = document.createElementNS('vendor/external_0.txt', 'rect');
        win.setAttribute('x', pos.x + 10 + i * 11);
        win.setAttribute('y', pos.y + building.height / 2);
        win.setAttribute('width', 7);
        win.setAttribute('height', 7);
        win.setAttribute('fill', '#fff9c4');
        win.setAttribute('stroke', '#333');
        win.setAttribute('stroke-width', '1');
        g.appendChild(win);
    }
    
    g.appendChild(trapezium);
    g.appendChild(top);
}

function createSparkle(x, y) {
    const container = document.getElementById('buildingContainer');
    
    for (let i = 0; i < 5; i++) {
        const star = document.createElementNS('vendor/external_0.txt', 'circle');
        star.setAttribute('cx', x + (Math.random() - 0.5) * 30);
        star.setAttribute('cy', y + (Math.random() - 0.5) * 30);
        star.setAttribute('r', 3);
        star.setAttribute('fill', '#ffd700');
        star.style.animation = 'sparkle 0.6s ease-out';
        
        container.appendChild(star);
        
        setTimeout(() => {
            container.removeChild(star);
        }, 600);
    }
}

// ============================================
// CELEBRATION MODAL
// ============================================

function showCelebration() {
    const modal = document.getElementById('celebrationModal');
    modal.classList.add('show');
    
    // Create confetti
    const confettiContainer = document.getElementById('confettiContainer');
    confettiContainer.innerHTML = '';
    
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confettiContainer.appendChild(confetti);
    }
}

function closeModal() {
    document.getElementById('celebrationModal').classList.remove('show');
}

function retry() {
    // Reset everything
    currentQuestion = 0;
    score = 0;
    generateQuestions();
    
    // Clear town buildings (but keep initial town elements)
    document.getElementById('buildingContainer').innerHTML = '';
    
    // Update progress
    updateProgress();
    
    // Close modal and load first question
    closeModal();
    loadQuestion();
}

// ============================================
// INITIALIZE ON LOAD
// ============================================

window.addEventListener('DOMContentLoaded', init);

// CSS variable workaround for progress bar
const style = document.createElement('style');
style.textContent = `
    .progress-bar::after {
        width: var(--progress-width, 0%) !important;
    }
`;
document.head.appendChild(style);