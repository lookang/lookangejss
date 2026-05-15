// Function to start the game timer
function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    timerInterval = setInterval(() => {
        timeLeft--;
        const timerDisplay = document.getElementById('timer');
        if (timerDisplay) {
            timerDisplay.textContent = `Time: ${timeLeft}s`;
        } else {
            console.error("Element with ID 'timer' not found.");
            clearInterval(timerInterval); // Stop timer if display is missing
            return;
        }

        if (timeLeft <= 0) {
            // Check if endGame is defined before calling
            if (typeof endGame === 'function') {
                endGame();
            } else {
                console.error('endGame function not found, cannot end game.');
                clearInterval(timerInterval); // Stop timer if endGame is missing
            }
        }
    }, 1000);
}

// Global variable for timer interval to be accessible by startGame and startTimer
let timerInterval = null;
// Global game state variables that might be needed by functions outside DOMContentLoaded
let score = 0;
let currentStreak = 0;
let highestStreak = 0;
let timeLeft = 90;
let currentDifficultyLevel = 1;
let gameHistory = [];
let selectedIons = {};
let currentCompound = null;
let mcqTriesLeft = 2;
let currentMCQOptionsArray = [];

// Function definition added from related script to resolve ReferenceError
// This needs access to global state variables and functions defined later in DOMContentLoaded
function startGame() {
    score = 0;
    currentStreak = 0;
    highestStreak = 0;
    timeLeft = 90;
    currentDifficultyLevel = 1;
    gameHistory = [];
    selectedIons = {}; // Reset selected ions

    // Ensure DOM elements are accessible before updating them
    const scoreDisplay = document.getElementById('score');
    const streakDisplay = document.getElementById('streak');
    const difficultyLevelDisplay = document.getElementById('difficulty-level');
    const timerDisplay = document.getElementById('timer');
    const gameSummary = document.getElementById('game-summary');
    const mcqArea = document.getElementById('mcq-area');
    const level20CompleteScreen = document.getElementById('level-20-complete-screen');
    const gameArea = document.getElementById('game-area');

    if (scoreDisplay) scoreDisplay.textContent = `Score: ${score}`;
    if (streakDisplay) streakDisplay.textContent = `Streak: ${currentStreak}`;
    if (difficultyLevelDisplay) difficultyLevelDisplay.textContent = `Level: ${currentDifficultyLevel}`;
    if (timerDisplay) timerDisplay.textContent = `Time: ${timeLeft}s`;

    if (gameSummary) gameSummary.classList.add('hidden');
    if (mcqArea) mcqArea.classList.add('hidden');
    if (level20CompleteScreen) level20CompleteScreen.classList.add('hidden'); // Hide level 20 screen on restart
    if (gameArea) gameArea.classList.remove('hidden');

    // Check if functions exist before calling (they should after DOMContentLoaded)
    if (typeof populateIonGrid === 'function') {
        populateIonGrid();
    } else {
        console.error("populateIonGrid function not defined yet in startGame");
    }
    if (typeof startTimer === 'function') {
        startTimer();
    } else {
        console.error("startTimer function not defined yet in startGame");
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score');
    const streakDisplay = document.getElementById('streak');
    const difficultyLevelDisplay = document.getElementById('difficulty-level');
    const ionGrid = document.getElementById('ion-grid');
    // Corrected IDs for selection display
    const cationSelectionDisplay = document.getElementById('cation-selection');
    const anionSelectionDisplay = document.getElementById('anion-selection');
    const selectedIonsContainer = document.getElementById('selected-ions'); // Container for both
    const submitCompoundButton = document.getElementById('submit-compound-button');
    const gameArea = document.getElementById('game-area');
    const mcqArea = document.getElementById('mcq-area');
    const formedCompoundDisplay = document.getElementById('formed-compound-display');
    const mcqQuestion = document.getElementById('mcq-question');
    const mcqOptions = document.getElementById('mcq-options');
    const feedbackArea = document.getElementById('feedback-area');
    const triesLeftDisplay = document.getElementById('tries-left');
    const gameSummary = document.getElementById('game-summary');
    const finalScoreDisplay = document.getElementById('final-score');
    const highestStreakDisplay = document.getElementById('highest-streak');
    const summaryList = document.getElementById('summary-list');
    const restartButton = document.getElementById('restart-button');
    const levelDownButton = document.getElementById('level-down-button');
    const levelUpButton = document.getElementById('level-up-button');
    const level20CompleteScreen = document.getElementById('level-20-complete-screen');
    const finalScoreL20Display = document.getElementById('final-score-l20');
    const highestStreakL20Display = document.getElementById('highest-streak-l20');
    const restartButtonL20 = document.getElementById('restart-button-l20');

    // --- Audio Elements ---
    const clickSound = new Audio('sounds/click.wav');
    const correctSound = new Audio('sounds/correct.wav');
    const incorrectSound = new Audio('sounds/incorrect.wav');

    // --- Game State (defined globally, but can be accessed here) ---
    const maxLevel = 20; // Final max level
    const CORRECT_ANSWERS_TO_LEVEL_UP = 3; // Progress level every 3 correct answers in a row

    // --- Chemistry Data ---
    const allIons = {
        // Fixed OS Cations (Group I, II, III)
        'Li+': { symbol: 'Li', name: 'Lithium', charge: 1, type: 'cation', variableOS: false, isPolyatomic: false },
        'Na+': { symbol: 'Na', name: 'Sodium', charge: 1, type: 'cation', variableOS: false, isPolyatomic: false },
        'K+': { symbol: 'K', name: 'Potassium', charge: 1, type: 'cation', variableOS: false, isPolyatomic: false },
        'Ag+': { symbol: 'Ag', name: 'Silver', charge: 1, type: 'cation', variableOS: false, isPolyatomic: false },
        'Be2+': { symbol: 'Be', name: 'Beryllium', charge: 2, type: 'cation', variableOS: false, isPolyatomic: false },
        'Mg2+': { symbol: 'Mg', name: 'Magnesium', charge: 2, type: 'cation', variableOS: false, isPolyatomic: false },
        'Ca2+': { symbol: 'Ca', name: 'Calcium', charge: 2, type: 'cation', variableOS: false, isPolyatomic: false },
        'Sr2+': { symbol: 'Sr', name: 'Strontium', charge: 2, type: 'cation', variableOS: false, isPolyatomic: false },
        'Ba2+': { symbol: 'Ba', name: 'Barium', charge: 2, type: 'cation', variableOS: false, isPolyatomic: false },
        'Zn2+': { symbol: 'Zn', name: 'Zinc', charge: 2, type: 'cation', variableOS: false, isPolyatomic: false },
        'Al3+': { symbol: 'Al', name: 'Aluminum', charge: 3, type: 'cation', variableOS: false, isPolyatomic: false },
        // Common Variable OS Cations (TM)
        'Cu+': { symbol: 'Cu', name: 'Copper(I)', charge: 1, type: 'cation', variableOS: true, romanNumeral: 'I', isPolyatomic: false },
        'Cu2+': { symbol: 'Cu', name: 'Copper(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false },
        'Fe2+': { symbol: 'Fe', name: 'Iron(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false },
        'Ni2+': { symbol: 'Ni', name: 'Nickel(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false },
        'Pb2+': { symbol: 'Pb', name: 'Lead(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false },
        'Fe3+': { symbol: 'Fe', name: 'Iron(III)', charge: 3, type: 'cation', variableOS: true, romanNumeral: 'III', isPolyatomic: false },
        'Ti4+': { symbol: 'Ti', name: 'Titanium(IV)', charge: 4, type: 'cation', variableOS: true, romanNumeral: 'IV', isPolyatomic: false },
        'Pb4+': { symbol: 'Pb', name: 'Lead(IV)', charge: 4, type: 'cation', variableOS: true, romanNumeral: 'IV', isPolyatomic: false },
        // Less Common Variable OS Cations (TM*)
        'Mn2+': { symbol: 'Mn', name: 'Manganese(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false },
        'Co2+': { symbol: 'Co', name: 'Cobalt(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false },
        'Pt2+': { symbol: 'Pt', name: 'Platinum(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false },
        'Hg2+': { symbol: 'Hg', name: 'Mercury(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false },
        'Sn2+': { symbol: 'Sn', name: 'Tin(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false },
        'V3+': { symbol: 'V', name: 'Vanadium(III)', charge: 3, type: 'cation', variableOS: true, romanNumeral: 'III', isPolyatomic: false },
        'Cr3+': { symbol: 'Cr', name: 'Chromium(III)', charge: 3, type: 'cation', variableOS: true, romanNumeral: 'III', isPolyatomic: false },
        'Co3+': { symbol: 'Co', name: 'Cobalt(III)', charge: 3, type: 'cation', variableOS: true, romanNumeral: 'III', isPolyatomic: false },
        'Mn4+': { symbol: 'Mn', name: 'Manganese(IV)', charge: 4, type: 'cation', variableOS: true, romanNumeral: 'IV', isPolyatomic: false },
        'Pt4+': { symbol: 'Pt', name: 'Platinum(IV)', charge: 4, type: 'cation', variableOS: true, romanNumeral: 'IV', isPolyatomic: false },
        'Sn4+': { symbol: 'Sn', name: 'Tin(IV)', charge: 4, type: 'cation', variableOS: true, romanNumeral: 'IV', isPolyatomic: false },
        // Polyatomic Cation
        'NH4+': { symbol: 'NH₄', name: 'Ammonium', charge: 1, type: 'cation', variableOS: false, isPolyatomic: true },
        // Monatomic Anions (Group VII, VI, V)
        'F-': { symbol: 'F', name: 'Fluoride', charge: -1, type: 'anion', isPolyatomic: false },
        'Cl-': { symbol: 'Cl', name: 'Chloride', charge: -1, type: 'anion', isPolyatomic: false },
        'Br-': { symbol: 'Br', name: 'Bromide', charge: -1, type: 'anion', isPolyatomic: false },
        'I-': { symbol: 'I', name: 'Iodide', charge: -1, type: 'anion', isPolyatomic: false },
        'O2-': { symbol: 'O', name: 'Oxide', charge: -2, type: 'anion', isPolyatomic: false },
        'S2-': { symbol: 'S', name: 'Sulfide', charge: -2, type: 'anion', isPolyatomic: false },
        'N3-': { symbol: 'N', name: 'Nitride', charge: -3, type: 'anion', isPolyatomic: false },
        'P3-': { symbol: 'P', name: 'Phosphide', charge: -3, type: 'anion', isPolyatomic: false },
        // Common Polyatomic Anions (CP)
        'OH-': { symbol: 'OH', name: 'Hydroxide', charge: -1, type: 'anion', isPolyatomic: true },
        'NO3-': { symbol: 'NO₃', name: 'Nitrate', charge: -1, type: 'anion', isPolyatomic: true },
        'CO3^2-': { symbol: 'CO₃', name: 'Carbonate', charge: -2, type: 'anion', isPolyatomic: true },
        'SO4^2-': { symbol: 'SO₄', name: 'Sulfate', charge: -2, type: 'anion', isPolyatomic: true },
        'PO4^3-': { symbol: 'PO₄', name: 'Phosphate', charge: -3, type: 'anion', isPolyatomic: true },
         // Less Common Polyatomic Anions (CP*)
        'CN-': { symbol: 'CN', name: 'Cyanide', charge: -1, type: 'anion', isPolyatomic: true },
        'SCN-': { symbol: 'SCN', name: 'Thiocyanate', charge: -1, type: 'anion', isPolyatomic: true },
        'NO2-': { symbol: 'NO₂', name: 'Nitrite', charge: -1, type: 'anion', isPolyatomic: true },
        'BrO3-': { symbol: 'BrO₃', name: 'Bromate', charge: -1, type: 'anion', isPolyatomic: true },
        'ClO3-': { symbol: 'ClO₃', name: 'Chlorate', charge: -1, type: 'anion', isPolyatomic: true },
        'IO3-': { symbol: 'IO₃', name: 'Iodate', charge: -1, type: 'anion', isPolyatomic: true },
        'CrO4^2-': { symbol: 'CrO₄', name: 'Chromate', charge: -2, type: 'anion', isPolyatomic: true },
        'Cr2O7^2-': { symbol: 'Cr₂O₇', name: 'Dichromate', charge: -2, type: 'anion', isPolyatomic: true },
        'SO3^2-': { symbol: 'SO₃', name: 'Sulfite', charge: -2, type: 'anion', isPolyatomic: true },
        'S2O3^2-': { symbol: 'S₂O₃', name: 'Thiosulfate', charge: -2, type: 'anion', isPolyatomic: true },
    };

    const levelDefinitions = {
        1: { cations: ['Li+', 'Na+', 'K+', 'Ag+'], anions: ['F-', 'Cl-', 'Br-', 'I-'] },
        2: { cations: ['Li+', 'Na+', 'K+', 'Ag+', 'Be2+', 'Mg2+', 'Ca2+', 'Sr2+', 'Ba2+', 'Zn2+'], anions: ['F-', 'Cl-', 'Br-', 'I-', 'O2-', 'S2-'] },
        3: { cations: ['Be2+', 'Mg2+', 'Ca2+', 'Sr2+', 'Ba2+', 'Zn2+'], anions: ['N3-', 'P3-', 'F-', 'Cl-', 'Br-', 'I-'] },
        4: { cations: ['Be2+', 'Mg2+', 'Ca2+', 'Sr2+', 'Ba2+', 'Zn2+', 'Al3+'], anions: ['N3-', 'P3-', 'O2-', 'S2-'] },
        5: { cations: ['Cu+', 'Cu2+', 'Fe2+', 'Ni2+', 'Pb2+'], anions: ['F-', 'Cl-', 'Br-', 'I-'] },
        6: { cations: ['Cu2+', 'Fe2+', 'Ni2+', 'Pb2+', 'Fe3+'], anions: ['O2-', 'S2-', 'F-', 'Cl-', 'Br-', 'I-'] },
        7: { cations: ['Fe3+', 'Ti4+', 'Pb4+'], anions: ['N3-', 'P3-', 'O2-', 'S2-', 'F-', 'Cl-', 'Br-', 'I-'] },
        8: { cations: ['NH4+'], anions: ['N3-', 'P3-', 'O2-', 'S2-', 'F-', 'Cl-', 'Br-', 'I-'] },
        9: { cations: ['Be2+', 'Mg2+', 'Ca2+', 'Sr2+', 'Ba2+', 'Zn2+'], anions: ['CO3^2-', 'SO4^2-'] },
        10: { cations: ['Li+', 'Na+', 'K+', 'Ag+', 'Be2+', 'Mg2+', 'Ca2+', 'Sr2+', 'Ba2+', 'Zn2+'], anions: ['OH-', 'NO3-', 'CO3^2-', 'SO4^2-'] },
        11: { cations: ['Be2+', 'Mg2+', 'Ca2+', 'Sr2+', 'Ba2+', 'Zn2+', 'NH4+'], anions: ['OH-', 'NO3-', 'CO3^2-', 'SO4^2-'] },
        12: { cations: ['Cu2+', 'Fe2+', 'Ni2+', 'Pb2+', 'Fe3+'], anions: ['OH-', 'NO3-', 'CO3^2-', 'SO4^2-'] },
        13: { cations: ['Li+', 'Na+', 'K+', 'Ag+', 'Be2+', 'Mg2+', 'Ca2+', 'Sr2+', 'Ba2+', 'Zn2+', 'Al3+'], anions: ['OH-', 'NO3-', 'CO3^2-', 'SO4^2-', 'PO4^3-'] },
        14: { cations: ['Cu+', 'Cu2+', 'Fe2+', 'Ni2+', 'Pb2+', 'Fe3+', 'Ti4+', 'Pb4+', 'NH4+'], anions: ['OH-', 'NO3-', 'CO3^2-', 'SO4^2-', 'PO4^3-'] },
        15: { cations: ['Cu+', 'Cu2+', 'Fe2+', 'Ni2+', 'Pb2+', 'Fe3+', 'Ti4+', 'Pb4+', 'NH4+'], anions: ['N3-', 'P3-', 'O2-', 'S2-', 'F-', 'Cl-', 'Br-', 'I-', 'OH-', 'NO3-', 'CO3^2-', 'SO4^2-', 'PO4^3-'] },
        16: { cations: ['Mn2+', 'Co2+', 'Pt2+', 'Hg2+', 'Sn2+'], anions: ['N3-', 'P3-', 'O2-', 'S2-', 'F-', 'Cl-', 'Br-', 'I-'] },
        17: { cations: ['Mn2+', 'Co2+', 'Pt2+', 'Hg2+', 'Sn2+', 'V3+', 'Cr3+', 'Co3+', 'Mn4+', 'Pt4+', 'Sn4+'], anions: ['N3-', 'P3-', 'O2-', 'S2-', 'F-', 'Cl-', 'Br-', 'I-', 'OH-', 'NO3-', 'CO3^2-', 'SO4^2-', 'PO4^3-'] },
        18: { cations: ['Li+', 'Na+', 'K+', 'Ag+'], anions: ['CN-', 'SCN-', 'NO2-', 'BrO3-', 'ClO3-', 'IO3-'] },
        19: { cations: ['Li+', 'Na+', 'K+', 'Ag+', 'Be2+', 'Mg2+', 'Ca2+', 'Sr2+', 'Ba2+', 'Zn2+', 'Al3+'], anions: ['CN-', 'SCN-', 'NO2-', 'BrO3-', 'ClO3-', 'IO3-', 'CrO4^2-', 'Cr2O7^2-', 'SO3^2-', 'S2O3^2-'] },
        20: { cations: ['Cu+', 'Cu2+', 'Fe2+', 'Ni2+', 'Pb2+', 'Fe3+', 'Ti4+', 'Pb4+', 'NH4+'], anions: ['CN-', 'SCN-', 'NO2-', 'BrO3-', 'ClO3-', 'IO3-', 'CrO4^2-', 'Cr2O7^2-', 'SO3^2-', 'S2O3^2-'] },
    };

    // --- Helper Functions ---
    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

    // Function to get the ions for the current difficulty level (ADDED)
    function getIonsForLevel(level) {
        const levelData = levelDefinitions[level];
        if (!levelData) {
            console.error(`Level ${level} definition not found.`);
            return { cations: [], anions: [] };
        }

        const cations = levelData.cations
            .map(key => allIons[key])
            .filter(ion => ion); // Filter out undefined if key doesn't exist
        const anions = levelData.anions
            .map(key => allIons[key])
            .filter(ion => ion); // Filter out undefined if key doesn't exist

        if (cations.length !== levelData.cations.length || anions.length !== levelData.anions.length) {
             console.warn(`Some ion keys for level ${level} were not found in allIons.`);
        }

        return { cations, anions };
    }

    // --- Game Logic Functions ---

    // Helper function to calculate total charge from selected ions
    function calculateTotalCharge() {
        let totalPositiveCharge = 0;
        let totalNegativeCharge = 0;
        for (const ionId in selectedIons) {
            const ion = allIons[ionId];
            if (!ion) {
                console.warn(`Ion data missing for ${ionId} during charge calculation.`);
                continue;
            }
            const count = selectedIons[ionId];
            if (ion.type === 'cation') {
                totalPositiveCharge += ion.charge * count;
            } else if (ion.type === 'anion') {
                totalNegativeCharge += ion.charge * count;
            }
        }
        return { positive: totalPositiveCharge, negative: totalNegativeCharge };
    }

    // Update the state of the submit button based on selection and charge balance
    function updateSubmitButtonState() {
        const charges = calculateTotalCharge();
        // Check if there's at least one cation AND one anion selected with count > 0
        const hasCation = Object.keys(selectedIons).some(id => allIons[id]?.type === 'cation' && selectedIons[id] > 0);
        const hasAnion = Object.keys(selectedIons).some(id => allIons[id]?.type === 'anion' && selectedIons[id] > 0);
        const isBalanced = charges.positive + charges.negative === 0;
        const hasSelection = Object.keys(selectedIons).some(id => selectedIons[id] > 0); // Check if any ion has count > 0

        // Enable only if at least one cation, one anion are selected AND charges are balanced
        submitCompoundButton.disabled = !(hasCation && hasAnion && isBalanced && hasSelection);
    }

    // Function to format ion display (symbol + charge)
    function getIonDisplay(ion) {
        if (!ion || typeof ion.charge === 'undefined') return 'Error';
        let chargeDisplay = '';
        if (ion.charge > 0) {
            chargeDisplay = ion.charge === 1 ? '+' : `${ion.charge}+`;
        } else if (ion.charge < 0) {
            chargeDisplay = ion.charge === -1 ? '⁻' : `${Math.abs(ion.charge)}⁻`;
        }
        // Handle subscripts in polyatomic symbols using Unicode or <sub>
        const symbolHTML = ion.symbol
            .replace(/(\d+)/g, '<sub>$1</sub>') // General subscript handling for numbers
            // Specific replacements for common polyatomic ions for better rendering
            .replace('NH<sub>4</sub>', 'NH₄')
            .replace('NO<sub>3</sub>', 'NO₃')
            .replace('CO<sub>3</sub>', 'CO₃')
            .replace('SO<sub>4</sub>', 'SO₄')
            .replace('PO<sub>4</sub>', 'PO₄')
            .replace('BrO<sub>3</sub>', 'BrO₃')
            .replace('ClO<sub>3</sub>', 'ClO₃')
            .replace('IO<sub>3</sub>', 'IO₃')
            .replace('NO<sub>2</sub>', 'NO₂')
            .replace('CrO<sub>4</sub>', 'CrO₄')
            .replace('Cr<sub>2</sub>O<sub>7</sub>', 'Cr₂O₇')
            .replace('SO<sub>3</sub>', 'SO₃')
            .replace('S<sub>2</sub>O<sub>3</sub>', 'S₂O₃');

        return `${symbolHTML}<sup>${chargeDisplay}</sup>`;
    }

    // Function to decrease ion count when clicking the display element
    function decreaseIonCount(ionId) {
        clickSound.play().catch(e => console.error("Audio play failed:", e));
        if (selectedIons[ionId] && selectedIons[ionId] > 0) {
            selectedIons[ionId]--;
            if (selectedIons[ionId] === 0) {
                delete selectedIons[ionId]; // Remove ion if count reaches zero
            }
            updateSelectionDisplay();
            updateSubmitButtonState();
        }
    }

    // Update the display showing selected ions and their counts (Corrected Version)
    function updateSelectionDisplay() {
        // Clear previous selections
        cationSelectionDisplay.innerHTML = '';
        anionSelectionDisplay.innerHTML = '';
        let cationCountPresent = false;
        let anionCountPresent = false;

        const sortedIonIds = Object.keys(selectedIons).sort(); // Sort for consistent display order

        sortedIonIds.forEach(ionId => {
            const ion = allIons[ionId];
            const count = selectedIons[ionId];
            if (!ion || count <= 0) return; // Skip if ion data missing or count is zero

            const displayElement = document.createElement('span');
            displayElement.className = 'selected-ion-display';
            const countPrefix = count > 1 ? `${count} x ` : '';
            // Add decrease button (down arrow)
            displayElement.innerHTML = `${countPrefix}${getIonDisplay(ion)} <button class="decrease-ion-button" data-ionid="${ionId}">&#x21E9;</button>`;
            displayElement.style.marginRight = '10px';
            displayElement.style.cursor = 'default'; // Main span not clickable

            // Add event listener to the button inside the span
            const decreaseButton = displayElement.querySelector('.decrease-ion-button');
            if (decreaseButton) {
                decreaseButton.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent potential parent clicks if any
                    decreaseIonCount(ionId);
                });
                decreaseButton.title = 'Click to remove one'; // Tooltip for the button
            }


            if (ion.type === 'cation') {
                cationSelectionDisplay.appendChild(displayElement);
                cationCountPresent = true;
            } else if (ion.type === 'anion') {
                anionSelectionDisplay.appendChild(displayElement);
                anionCountPresent = true;
            }
        });

        // Update the main container text based on selections
        if (!cationCountPresent && !anionCountPresent) {
            selectedIonsContainer.innerHTML = 'Selected: <span id="cation-selection">None</span> + <span id="anion-selection">None</span>';
        } else {
            // Reconstruct the container content carefully
            selectedIonsContainer.innerHTML = 'Selected: ';
            const catSpan = document.createElement('span');
            catSpan.id = 'cation-selection';
            if (!cationCountPresent) catSpan.innerHTML = '<i>None</i>';
            selectedIonsContainer.appendChild(catSpan);
            selectedIonsContainer.appendChild(document.createTextNode(' + '));
            const anSpan = document.createElement('span');
            anSpan.id = 'anion-selection';
            if (!anionCountPresent) anSpan.innerHTML = '<i>None</i>';
            selectedIonsContainer.appendChild(anSpan);

            // Now append the actual ion displays back to the correct spans
            cationSelectionDisplay.childNodes.forEach(node => catSpan.appendChild(node.cloneNode(true)));
            anionSelectionDisplay.childNodes.forEach(node => anSpan.appendChild(node.cloneNode(true)));

             // Re-attach event listeners after cloning
             selectedIonsContainer.querySelectorAll('.decrease-ion-button').forEach(button => {
                const id = button.dataset.ionid;
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    decreaseIonCount(id);
                });
                button.title = 'Click to remove one';
            });
        }
    }


    // Function to handle clicking on an ion tile
    function handleTileClick(tileElement, ionData) {
        clickSound.play().catch(e => console.error("Error playing click sound:", e));

        // --- Determine the correct ionId key ---
        let ionId = null;
        for (const key in allIons) {
            const ion = allIons[key];
            // Match based on symbol AND charge primarily
            if (ion.symbol === ionData.symbol && ion.charge === ionData.charge) {
                 // Further check for polyatomic name match if symbols/charges are same (e.g. S vs SO3)
                 if (ion.isPolyatomic === ionData.isPolyatomic) {
                      if (!ion.isPolyatomic || (ion.isPolyatomic && ion.name === ionData.name)) {
                           ionId = key;
                           break;
                      }
                 } else if (!ion.isPolyatomic && !ionData.isPolyatomic) { // If both are monatomic, symbol/charge is enough
                      ionId = key;
                      break;
                 }
            }
        }
         // Fallback: Construct key if direct match failed (less reliable)
         if (!ionId) {
             let potentialKey;
             const absCharge = Math.abs(ionData.charge);
             if (ionData.isPolyatomic && ionData.charge < 0) {
                 potentialKey = `${ionData.symbol}^${absCharge}-`;
             } else {
                 const chargeSign = ionData.charge > 0 ? '+' : '-';
                 const chargeDisplay = absCharge === 1 ? chargeSign : `${absCharge}${chargeSign}`;
                 potentialKey = `${ionData.symbol}${chargeDisplay}`;
             }
             if (allIons.hasOwnProperty(potentialKey)) {
                 ionId = potentialKey;
             }
         }

        if (!ionId) {
            console.error(`Critical Error: Could not find matching key in allIons for clicked ion. Tile data:`, ionData);
            return;
        }
        // --- End Determine ionId ---

        const clickedIonType = allIons[ionId].type;

        // --- Check selection restrictions ---
        const selectedCationId = Object.keys(selectedIons).find(id => allIons[id]?.type === 'cation' && selectedIons[id] > 0);
        const selectedAnionId = Object.keys(selectedIons).find(id => allIons[id]?.type === 'anion' && selectedIons[id] > 0);

        if (clickedIonType === 'cation') {
            if (selectedCationId && selectedCationId !== ionId) {
                console.log("Restriction: Only one type of cation can be selected.");
                return; // Prevent selection
            }
        } else if (clickedIonType === 'anion') {
            if (selectedAnionId && selectedAnionId !== ionId) {
                console.log("Restriction: Only one type of anion can be selected.");
                return; // Prevent selection
            }
        }
        // --- End Check restrictions ---

        // Increment count for the selected ion
        selectedIons[ionId] = (selectedIons[ionId] || 0) + 1;

        // --- Visual Selection Logic ---
        // Remove 'selected' from other tiles of the same type
        const typeClass = clickedIonType === 'cation' ? '.cation' : '.anion';
        ionGrid.querySelectorAll(`.ion-tile${typeClass}`).forEach(tile => {
            if (tile !== tileElement) { // Don't deselect the one just clicked yet
                tile.classList.remove('selected');
            }
        });
        // Add 'selected' to the clicked tile
        tileElement.classList.add('selected');
        // --- End Visual Selection Logic ---


        updateSelectionDisplay();
        updateSubmitButtonState();
    }

    // Function to populate the ion grid based on the current level
    window.populateIonGrid = function() { // Make it global for startGame
        if (!ionGrid) {
            console.error("Element with ID 'ion-grid' not found.");
            return;
        }
        ionGrid.innerHTML = '';
        // selectedIons = {}; // Reset happens in startGame now

        // Clear displays and disable button
        updateSelectionDisplay();
        updateSubmitButtonState();

        const { cations, anions } = getIonsForLevel(currentDifficultyLevel);

        if (!cations || !anions || cations.length === 0 || anions.length === 0) {
             console.error(`Cannot populate grid: No ions available for level ${currentDifficultyLevel}.`);
             ionGrid.innerHTML = '<p style="color: red;">Error: Could not load ions for this level. Please restart.</p>';
             if(timerInterval) clearInterval(timerInterval);
             return;
        }

        const gridMax = 12; // Grid size
        const targetCations = Math.min(cations.length, Math.ceil(gridMax / 2));
        const targetAnions = Math.min(anions.length, Math.floor(gridMax / 2));

        let displayTilesData = [];
        // Get a random selection of cations and anions up to the target counts
        displayTilesData = displayTilesData.concat(cations.length > 0 ? cations.sort(() => 0.5 - Math.random()).slice(0, targetCations) : []);
        displayTilesData = displayTilesData.concat(anions.length > 0 ? anions.sort(() => 0.5 - Math.random()).slice(0, targetAnions) : []);

        // Fill remaining grid spots if needed, avoiding duplicates already shown
        let ionPool = [...cations, ...anions].filter(ion => ion && !displayTilesData.find(t => t && t.symbol === ion.symbol && t.charge === ion.charge));
        while (displayTilesData.length < gridMax && ionPool.length > 0) {
             let ionToAdd = ionPool.splice(Math.floor(Math.random() * ionPool.length), 1)[0];
             // Ensure it's not already in the display list
             if (ionToAdd && !displayTilesData.find(t => t && t.symbol === ionToAdd.symbol && t.charge === ionToAdd.charge)) {
                 displayTilesData.push(ionToAdd);
             }
        }

        // If still not enough tiles, fill with random ions from the level (allowing duplicates if necessary)
        let allLevelIons = [...cations, ...anions];
        while (displayTilesData.length < gridMax && allLevelIons.length > 0) {
             displayTilesData.push(allLevelIons[Math.floor(Math.random() * allLevelIons.length)]);
        }

        displayTilesData.sort(() => Math.random() - 0.5); // Shuffle the final set of tiles

        displayTilesData.forEach(ion => {
            if (!ion) return; // Skip if ion is somehow undefined
            const tile = document.createElement('div');
            tile.classList.add('ion-tile', ion.type); // Add 'cation' or 'anion' class
            tile.innerHTML = getIonDisplay(ion);

            // Store ion data on the tile for handleTileClick
            // Use JSON stringify to store the whole object if needed, or individual properties
            tile.dataset.symbol = ion.symbol;
            tile.dataset.charge = String(ion.charge); // Ensure charge is string
            tile.dataset.isPolyatomic = String(ion.isPolyatomic); // Ensure boolean is string
            tile.dataset.name = ion.name; // Store name for better matching in handleTileClick

            tile.addEventListener('click', () => handleTileClick(tile, ion)); // Pass the original ion object
            ionGrid.appendChild(tile);
        });
    }


    // --- Compound Formation and MCQ --- //

    function calculateFormula(cation, anion) {
        if (!cation || !anion) return "Error";
        const charge1 = Math.abs(cation.charge);
        const charge2 = Math.abs(anion.charge);
        const commonDivisor = gcd(charge1, charge2);
        const cationSubscript = charge2 / commonDivisor;
        const anionSubscript = charge1 / commonDivisor;

        let cationPart = cation.symbol;
        if (cation.isPolyatomic && cationSubscript > 1) cationPart = `(${cationPart})`;
        if (cationSubscript > 1) cationPart += `<sub>${cationSubscript}</sub>`;

        let anionPart = anion.symbol;
        if (anion.isPolyatomic && anionSubscript > 1) anionPart = `(${anionPart})`;
        if (anionSubscript > 1) anionPart += `<sub>${anionSubscript}</sub>`;

        // Ensure numerical subscripts are wrapped correctly
        cationPart = cationPart.replace(/(\d+)/g, '<sub>$1</sub>');
        anionPart = anionPart.replace(/(\d+)/g, '<sub>$1</sub>');

        // Fix specific polyatomic displays if needed (redundant if getIonDisplay handles it)
        cationPart = cationPart.replace('NH<sub>4</sub>', 'NH₄');
        anionPart = anionPart.replace('NO<sub>3</sub>', 'NO₃').replace('CO<sub>3</sub>', 'CO₃').replace('SO<sub>4</sub>', 'SO₄').replace('PO<sub>4</sub>', 'PO₄').replace('OH', 'OH').replace('CN', 'CN').replace('SCN', 'SCN').replace('NO<sub>2</sub>', 'NO₂').replace('BrO<sub>3</sub>', 'BrO₃').replace('ClO<sub>3</sub>', 'ClO₃').replace('IO<sub>3</sub>', 'IO₃').replace('CrO<sub>4</sub>', 'CrO₄').replace('Cr<sub>2</sub>O<sub>7</sub>', 'Cr₂O₇').replace('SO<sub>3</sub>', 'SO₃').replace('S<sub>2</sub>O<sub>3</sub>', 'S₂O₃');


        return cationPart + anionPart;
    }

    function generateCompoundName(cation, anion) {
         if (!cation || !anion) return "Error";
        return `${cation.name} ${anion.name}`;
    }

    function handleSubmitCompound() {
        if (submitCompoundButton.disabled) return;

        let firstCation = null;
        let firstAnion = null;
        for (const ionId in selectedIons) {
            if (selectedIons[ionId] <= 0) continue;
            const ion = allIons[ionId];
            if (!ion) continue;
            if (ion.type === 'cation' && !firstCation) firstCation = ion;
            if (ion.type === 'anion' && !firstAnion) firstAnion = ion;
            if (firstCation && firstAnion) break;
        }

        if (!firstCation || !firstAnion) {
            console.error("Could not determine cation/anion from selection.");
            feedbackArea.textContent = "Error: Select one cation and one anion.";
            feedbackArea.className = 'feedback-area error';
            return;
        }

        currentCompound = {
            cation: firstCation,
            anion: firstAnion,
            correctFormula: calculateFormula(firstCation, firstAnion),
            correctName: generateCompoundName(firstCation, firstAnion),
            selectedIonCounts: { ...selectedIons }
        };

        console.log("Formed Compound:", currentCompound);

        // Disable tiles and submit button
        document.querySelectorAll('.ion-tile').forEach(tile => tile.style.pointerEvents = 'none'); // Disable clicks
        submitCompoundButton.disabled = true;

        setupMCQ();
        gameArea.classList.add('hidden');
        mcqArea.classList.remove('hidden');
    }

    function setupMCQ() {
        mcqTriesLeft = 2;
        feedbackArea.textContent = '';
        feedbackArea.className = 'feedback-area'; // Reset class
        triesLeftDisplay.textContent = `Tries left: ${mcqTriesLeft}`;
        formedCompoundDisplay.innerHTML = `Selected: ${getIonDisplay(currentCompound.cation)} + ${getIonDisplay(currentCompound.anion)}`;

        const askForName = Math.random() < 0.5;
        mcqQuestion.textContent = askForName ? "What is the NAME of this compound?" : "What is the FORMULA of this compound?";

        const correctAnswer = askForName ? currentCompound.correctName : currentCompound.correctFormula;
        currentMCQOptionsArray = generateMCQOptions(correctAnswer, askForName);

        mcqOptions.innerHTML = '';
        currentMCQOptionsArray.forEach(option => {
            const button = document.createElement('button');
            button.innerHTML = option; // Use innerHTML to render subscripts/superscripts
            button.addEventListener('click', () => handleMCQAnswer(option, correctAnswer, button, askForName));
            mcqOptions.appendChild(button);
        });
    }

    function generateMCQOptions(correctAnswer, isNameQuestion) {
        const options = new Set([correctAnswer]);
        const cation = currentCompound.cation;
        const anion = currentCompound.anion;
        const cationCharge = Math.abs(cation.charge);
        const anionCharge = Math.abs(anion.charge);

        // Generate Distractors
        if (isNameQuestion) {
            // Distractor: Incorrect anion ending (e.g., Sodium Chlorate instead of Chloride)
            if (!anion.isPolyatomic && anion.name.endsWith('ide')) {
                const wrongEnding = anion.name.replace('ide', 'ate');
                if (wrongEnding !== anion.name) options.add(`${cation.name} ${wrongEnding}`);
            }
            // Distractor: Incorrect cation numeral (if variable OS)
            if (cation.variableOS) {
                const numerals = ['I', 'II', 'III', 'IV'];
                const wrongNumerals = numerals.filter(n => n !== cation.romanNumeral);
                if (wrongNumerals.length > 0) {
                    const wrongNumeral = wrongNumerals[Math.floor(Math.random() * wrongNumerals.length)];
                    const wrongName = cation.name.replace(`(${cation.romanNumeral})`, `(${wrongNumeral})`);
                    options.add(`${wrongName} ${anion.name}`);
                }
                 // Distractor: Missing numeral
                 options.add(`${cation.name.replace(/\(.*\)/, '').trim()} ${anion.name}`);
            }
            // Distractor: Swapped cation/anion names
            options.add(`${anion.name} ${cation.name}`);
            // Distractor: Polyatomic 'ite' vs 'ate'
            if (anion.isPolyatomic) {
                if (anion.name.endsWith('ate')) options.add(`${cation.name} ${anion.name.replace('ate', 'ite')}`);
                if (anion.name.endsWith('ite')) options.add(`${cation.name} ${anion.name.replace('ite', 'ate')}`);
            }

        } else { // Formula distractors
            // Distractor: Simple concatenation without subscripts
             if (correctAnswer !== `${cation.symbol}${anion.symbol}`) {
                 options.add(`${cation.symbol}${anion.symbol}`);
             }
            // Distractor: Swapped subscripts
            const cationSubscript = anionCharge / gcd(cationCharge, anionCharge);
            const anionSubscript = cationCharge / gcd(cationCharge, anionCharge);
            if (cationSubscript !== anionSubscript) {
                let swappedSubFormula = cation.symbol;
                if (cation.isPolyatomic && anionSubscript > 1) swappedSubFormula = `(${swappedSubFormula})`;
                if (anionSubscript > 1) swappedSubFormula += `<sub>${anionSubscript}</sub>`;
                let swappedAnionPart = anion.symbol;
                 if (anion.isPolyatomic && cationSubscript > 1) swappedAnionPart = `(${swappedAnionPart})`;
                 if (cationSubscript > 1) swappedAnionPart += `<sub>${cationSubscript}</sub>`;
                 swappedSubFormula += swappedAnionPart;
                 swappedSubFormula = swappedSubFormula.replace(/(\d+)/g, '<sub>$1</sub>'); // Ensure sub tags
                 if (correctAnswer !== swappedSubFormula) options.add(swappedSubFormula);
            }
            // Distractor: Missing parentheses for polyatomic ions
            if (cation.isPolyatomic && cationSubscript > 1) {
                 let noParenFormula = cation.symbol; // No parens
                 if (cationSubscript > 1) noParenFormula += `<sub>${cationSubscript}</sub>`;
                 let anionPart = anion.symbol;
                 if (anion.isPolyatomic && anionSubscript > 1) anionPart = `(${anionPart})`;
                 if (anionSubscript > 1) anionPart += `<sub>${anionSubscript}</sub>`;
                 noParenFormula += anionPart;
                 noParenFormula = noParenFormula.replace(/(\d+)/g, '<sub>$1</sub>');
                 if (correctAnswer !== noParenFormula) options.add(noParenFormula);
            }
             if (anion.isPolyatomic && anionSubscript > 1) {
                 let cationPart = cation.symbol;
                 if (cation.isPolyatomic && cationSubscript > 1) cationPart = `(${cationPart})`;
                 if (cationSubscript > 1) cationPart += `<sub>${cationSubscript}</sub>`;
                 let noParenFormula = anion.symbol; // No parens
                 if (anionSubscript > 1) noParenFormula += `<sub>${anionSubscript}</sub>`;
                 noParenFormula = cationPart + noParenFormula;
                 noParenFormula = noParenFormula.replace(/(\d+)/g, '<sub>$1</sub>');
                 if (correctAnswer !== noParenFormula) options.add(noParenFormula);
            }
            // Distractor: Reversed ions
             let reversedFormula = calculateFormula(anion, cation); // Calculate reversed
             if (correctAnswer !== reversedFormula) options.add(reversedFormula);

        }

        // Fill up to 4 options with unique distractors
        const allPossibleIons = Object.values(allIons);
        while (options.size < 4 && options.size < (allPossibleIons.length / 2)) { // Limit iterations
            const randomCation = allPossibleIons.filter(i => i.type === 'cation')[Math.floor(Math.random() * allPossibleIons.filter(i => i.type === 'cation').length)];
            const randomAnion = allPossibleIons.filter(i => i.type === 'anion')[Math.floor(Math.random() * allPossibleIons.filter(i => i.type === 'anion').length)];
            if (!randomCation || !randomAnion) continue; // Skip if random selection failed

            let distractor;
            if (isNameQuestion) {
                distractor = generateCompoundName(randomCation, randomAnion);
            } else {
                distractor = calculateFormula(randomCation, randomAnion);
            }
            // Ensure distractor is different from correct answer and other options
            if (distractor !== correctAnswer && !options.has(distractor)) {
                options.add(distractor);
            }
        }

        const optionsArray = Array.from(options);
        // Shuffle and ensure max 4 options
        optionsArray.sort(() => Math.random() - 0.5);
        return optionsArray.slice(0, 4);
    }

    function handleMCQAnswer(selectedAnswer, correctAnswer, buttonElement, isNameQuestion) {
        clickSound.play().catch(e => console.error("Error playing click sound:", e));

        const isCorrect = selectedAnswer === correctAnswer;
        let feedbackText = '';
        let isFinalAttempt = (mcqTriesLeft === 1);

        // Disable all buttons immediately
        mcqOptions.querySelectorAll('button').forEach(btn => btn.disabled = true);

        if (isCorrect) {
            feedbackText = "Correct!";
            feedbackArea.className = 'feedback-area correct';
            buttonElement.classList.add('correct'); // Mark selected button as correct
            correctSound.play().catch(e => console.error("Error playing correct sound:", e));
            updateScore(true);
            gameHistory.push({ compound: currentCompound, correct: true, attempt: selectedAnswer });
            setTimeout(nextRound, 1000); // Proceed after 1 second
        } else {
            mcqTriesLeft--;
            triesLeftDisplay.textContent = `Tries left: ${mcqTriesLeft}`;
            buttonElement.classList.add('incorrect'); // Mark selected button as incorrect
            incorrectSound.play().catch(e => console.error("Error playing incorrect sound:", e));

            if (mcqTriesLeft > 0) { // First incorrect attempt
                feedbackText = "Incorrect. Try again!";
                feedbackArea.className = 'feedback-area incorrect';
                // Re-enable only the non-selected buttons
                mcqOptions.querySelectorAll('button').forEach(btn => {
                    if (btn !== buttonElement) {
                        btn.disabled = false;
                    }
                });
            } else { // Final incorrect attempt
                feedbackArea.className = 'feedback-area incorrect';
                feedbackText = `Incorrect. The correct answer was: ${correctAnswer}`;
                updateScore(false);
                gameHistory.push({ compound: currentCompound, correct: false, attempt: selectedAnswer });
                // Highlight the actual correct answer button
                mcqOptions.querySelectorAll('button').forEach(btn => {
                    if (btn.innerHTML === correctAnswer) { // Compare innerHTML as options can contain HTML
                        btn.classList.add('correct');
                    }
                });
                setTimeout(nextRound, 2000); // Show correct answer for 2 seconds
            }
        }
        feedbackArea.innerHTML = feedbackText; // Display feedback
    }

    // Function to update score and streak
    function updateScore(correct) {
        if (correct) {
            score += 1; // +1 point for correct MCQ
            currentStreak++;
            if (currentStreak > highestStreak) {
                highestStreak = currentStreak;
            }
            // Check for level up
            if (currentStreak > 0 && currentStreak % CORRECT_ANSWERS_TO_LEVEL_UP === 0 && currentDifficultyLevel < maxLevel) {
                currentDifficultyLevel++;
                difficultyLevelDisplay.textContent = `Level: ${currentDifficultyLevel}`;
                // Optional: Add feedback for leveling up
            }
        } else {
            score -= 1; // -1 point for incorrect MCQ (final attempt)
            if (score < 0) score = 0; // Score cannot be negative
            currentStreak = 0; // Reset streak
        }
        scoreDisplay.textContent = `Score: ${score}`;
        streakDisplay.textContent = `Streak: ${currentStreak}`;
    }

    // Function to proceed to the next round or end game
    function nextRound() {
        if (currentDifficultyLevel > maxLevel) {
             showLevel20CompleteScreen();
             return;
        }

        // Reset for next round
        selectedIons = {};
        currentCompound = null;
        mcqArea.classList.add('hidden');
        gameArea.classList.remove('hidden');
        document.querySelectorAll('.ion-tile').forEach(tile => tile.style.pointerEvents = 'auto'); // Re-enable tiles

        populateIonGrid(); // Populate grid for the current level
        updateSelectionDisplay(); // Reset selection display
        updateSubmitButtonState(); // Reset submit button state
    }

    // Function to end the game (e.g., timer runs out)
    window.endGame = function() { // Make global for startTimer
        clearInterval(timerInterval);
        gameArea.classList.add('hidden');
        mcqArea.classList.add('hidden');
        level20CompleteScreen.classList.add('hidden');
        gameSummary.classList.remove('hidden');

        finalScoreDisplay.textContent = score;
        highestStreakDisplay.textContent = highestStreak;

        summaryList.innerHTML = ''; // Clear previous summary
        gameHistory.forEach(item => {
            const li = document.createElement('li');
            const formula = calculateFormula(item.compound.cation, item.compound.anion);
            const name = generateCompoundName(item.compound.cation, item.compound.anion);
            const status = item.correct ? '✅ Correct' : `❌ Incorrect (Selected: ${item.attempt})`;
            li.innerHTML = `<b>${formula} (${name})</b>: ${status}`;
            summaryList.appendChild(li);
        });

         // Send xAPI statement for game ended
         if (typeof sendGameEndedStatement === 'function') {
             sendGameEndedStatement(score, highestStreak, currentDifficultyLevel, gameHistory);
         } else {
             console.warn("sendGameEndedStatement function not found for xAPI.");
         }
    }

     // Function to show Level 20 Complete Screen
     function showLevel20CompleteScreen() {
         clearInterval(timerInterval);
         gameArea.classList.add('hidden');
         mcqArea.classList.add('hidden');
         gameSummary.classList.add('hidden');
         level20CompleteScreen.classList.remove('hidden');

         finalScoreL20Display.textContent = score;
         highestStreakL20Display.textContent = highestStreak;

         // Send xAPI statement for completing all levels
         if (typeof sendGameCompletedStatement === 'function') {
             sendGameCompletedStatement(score, highestStreak);
         } else {
             console.warn("sendGameCompletedStatement function not found for xAPI.");
         }
     }


    // --- Event Listeners ---
    submitCompoundButton.addEventListener('click', handleSubmitCompound);
    restartButton.addEventListener('click', startGame);
    restartButtonL20.addEventListener('click', startGame); // Restart from level 20 screen

    levelDownButton.addEventListener('click', () => {
        if (currentDifficultyLevel > 1) {
            currentDifficultyLevel--;
            difficultyLevelDisplay.textContent = `Level: ${currentDifficultyLevel}`;
            populateIonGrid(); // Repopulate for new level
            updateSelectionDisplay();
            updateSubmitButtonState();
        }
    });

    levelUpButton.addEventListener('click', () => {
        if (currentDifficultyLevel < maxLevel) {
            currentDifficultyLevel++;
            difficultyLevelDisplay.textContent = `Level: ${currentDifficultyLevel}`;
            populateIonGrid(); // Repopulate for new level
            updateSelectionDisplay();
            updateSubmitButtonState();
        }
    });


    // --- Initialization ---
    startGame(); // Start the game when the DOM is ready

}); // End of DOMContentLoaded
