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
let usedCombinations = new Set();
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
    // Updated based on GameContentDatabase_v8-2 (Images 2 & 3)
    const allIons = {
        // C1a: Monatomic cations with fixed oxidation states (+1)
        'Li+': { symbol: 'Li', name: 'Lithium', charge: 1, type: 'cation', variableOS: false, isPolyatomic: false, categoryCode: 'C1a' },
        'Na+': { symbol: 'Na', name: 'Sodium', charge: 1, type: 'cation', variableOS: false, isPolyatomic: false, categoryCode: 'C1a' },
        'K+': { symbol: 'K', name: 'Potassium', charge: 1, type: 'cation', variableOS: false, isPolyatomic: false, categoryCode: 'C1a' },
        'Ag+': { symbol: 'Ag', name: 'Silver', charge: 1, type: 'cation', variableOS: false, isPolyatomic: false, categoryCode: 'C1a' }, // Note: Ag is often fixed +1 in intro chem
        // C1b: Monatomic cations with fixed oxidation states (+2)
        'Be2+': { symbol: 'Be', name: 'Beryllium', charge: 2, type: 'cation', variableOS: false, isPolyatomic: false, categoryCode: 'C1b' },
        'Mg2+': { symbol: 'Mg', name: 'Magnesium', charge: 2, type: 'cation', variableOS: false, isPolyatomic: false, categoryCode: 'C1b' },
        'Ca2+': { symbol: 'Ca', name: 'Calcium', charge: 2, type: 'cation', variableOS: false, isPolyatomic: false, categoryCode: 'C1b' },
        'Sr2+': { symbol: 'Sr', name: 'Strontium', charge: 2, type: 'cation', variableOS: false, isPolyatomic: false, categoryCode: 'C1b' },
        'Ba2+': { symbol: 'Ba', name: 'Barium', charge: 2, type: 'cation', variableOS: false, isPolyatomic: false, categoryCode: 'C1b' },
        'Zn2+': { symbol: 'Zn', name: 'Zinc', charge: 2, type: 'cation', variableOS: false, isPolyatomic: false, categoryCode: 'C1b' }, // Note: Zn is often fixed +2 in intro chem
        // C1c: Monatomic cations with fixed oxidation states (+3)
        'Al3+': { symbol: 'Al', name: 'Aluminum', charge: 3, type: 'cation', variableOS: false, isPolyatomic: false, categoryCode: 'C1c' },
        // C2a: Monatomic cations with variable oxidation states (common, +1)
        'Cu+': { symbol: 'Cu', name: 'Copper(I)', charge: 1, type: 'cation', variableOS: true, romanNumeral: 'I', isPolyatomic: false, categoryCode: 'C2a' },
        // C2b: Monatomic cations with variable oxidation states (common, +2)
        'Cu2+': { symbol: 'Cu', name: 'Copper(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false, categoryCode: 'C2b' },
        'Fe2+': { symbol: 'Fe', name: 'Iron(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false, categoryCode: 'C2b' },
        'Ni2+': { symbol: 'Ni', name: 'Nickel(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false, categoryCode: 'C2b' },
        'Pb2+': { symbol: 'Pb', name: 'Lead(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false, categoryCode: 'C2b' },
        // C2c: Monatomic cations with variable oxidation states (common, +3)
        'Fe3+': { symbol: 'Fe', name: 'Iron(III)', charge: 3, type: 'cation', variableOS: true, romanNumeral: 'III', isPolyatomic: false, categoryCode: 'C2c' },
        // C2d: Monatomic cations with variable oxidation states (common, +4)
        'Ti4+': { symbol: 'Ti', name: 'Titanium(IV)', charge: 4, type: 'cation', variableOS: true, romanNumeral: 'IV', isPolyatomic: false, categoryCode: 'C2d' },
        'Pb4+': { symbol: 'Pb', name: 'Lead(IV)', charge: 4, type: 'cation', variableOS: true, romanNumeral: 'IV', isPolyatomic: false, categoryCode: 'C2d' },
        // C3a: Polyatomic cations (common)
        'NH4+': { symbol: 'NH₄', name: 'Ammonium', charge: 1, type: 'cation', variableOS: false, isPolyatomic: true, categoryCode: 'C3a' },
        // C4a: Monatomic cations with variable oxidation states (less common, +3)
        'V3+': { symbol: 'V', name: 'Vanadium(III)', charge: 3, type: 'cation', variableOS: true, romanNumeral: 'III', isPolyatomic: false, categoryCode: 'C4a' },
        'Cr3+': { symbol: 'Cr', name: 'Chromium(III)', charge: 3, type: 'cation', variableOS: true, romanNumeral: 'III', isPolyatomic: false, categoryCode: 'C4a' },
        'Co3+': { symbol: 'Co', name: 'Cobalt(III)', charge: 3, type: 'cation', variableOS: true, romanNumeral: 'III', isPolyatomic: false, categoryCode: 'C4a' },
        // C4b: Monatomic cations with variable oxidation states (less common, +2)
        'Mn2+': { symbol: 'Mn', name: 'Manganese(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false, categoryCode: 'C4b' },
        'Co2+': { symbol: 'Co', name: 'Cobalt(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false, categoryCode: 'C4b' },
        'Pt2+': { symbol: 'Pt', name: 'Platinum(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false, categoryCode: 'C4b' },
        'Hg2+': { symbol: 'Hg', name: 'Mercury(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false, categoryCode: 'C4b' },
        'Sn2+': { symbol: 'Sn', name: 'Tin(II)', charge: 2, type: 'cation', variableOS: true, romanNumeral: 'II', isPolyatomic: false, categoryCode: 'C4b' },
        // C4c: Monatomic cations with variable oxidation states (less common, +4)
        'Mn4+': { symbol: 'Mn', name: 'Manganese(IV)', charge: 4, type: 'cation', variableOS: true, romanNumeral: 'IV', isPolyatomic: false, categoryCode: 'C4c' },
        'Pt4+': { symbol: 'Pt', name: 'Platinum(IV)', charge: 4, type: 'cation', variableOS: true, romanNumeral: 'IV', isPolyatomic: false, categoryCode: 'C4c' },
        'Sn4+': { symbol: 'Sn', name: 'Tin(IV)', charge: 4, type: 'cation', variableOS: true, romanNumeral: 'IV', isPolyatomic: false, categoryCode: 'C4c' },

        // A1a: Monatomic anions (-1)
        'F-': { symbol: 'F', name: 'Fluoride', charge: -1, type: 'anion', isPolyatomic: false, categoryCode: 'A1a' },
        'Cl-': { symbol: 'Cl', name: 'Chloride', charge: -1, type: 'anion', isPolyatomic: false, categoryCode: 'A1a' },
        'Br-': { symbol: 'Br', name: 'Bromide', charge: -1, type: 'anion', isPolyatomic: false, categoryCode: 'A1a' },
        'I-': { symbol: 'I', name: 'Iodide', charge: -1, type: 'anion', isPolyatomic: false, categoryCode: 'A1a' },
        // A1b: Monatomic anions (-2)
        'O2-': { symbol: 'O', name: 'Oxide', charge: -2, type: 'anion', isPolyatomic: false, categoryCode: 'A1b' },
        'S2-': { symbol: 'S', name: 'Sulfide', charge: -2, type: 'anion', isPolyatomic: false, categoryCode: 'A1b' },
        // A1c: Monatomic anions (-3)
        'N3-': { symbol: 'N', name: 'Nitride', charge: -3, type: 'anion', isPolyatomic: false, categoryCode: 'A1c' },
        'P3-': { symbol: 'P', name: 'Phosphide', charge: -3, type: 'anion', isPolyatomic: false, categoryCode: 'A1c' },
        // A3a: Polyatomic anions (common, -1)
        'OH-': { symbol: 'OH', name: 'Hydroxide', charge: -1, type: 'anion', isPolyatomic: true, categoryCode: 'A3a' },
        'NO3-': { symbol: 'NO₃', name: 'Nitrate', charge: -1, type: 'anion', isPolyatomic: true, categoryCode: 'A3a' },
        // A3b: Polyatomic anions (common, -2)
        'CO3^2-': { symbol: 'CO₃', name: 'Carbonate', charge: -2, type: 'anion', isPolyatomic: true, categoryCode: 'A3b' },
        'SO4^2-': { symbol: 'SO₄', name: 'Sulfate', charge: -2, type: 'anion', isPolyatomic: true, categoryCode: 'A3b' },
        // A3c: Polyatomic anions (common, -3)
        'PO4^3-': { symbol: 'PO₄', name: 'Phosphate', charge: -3, type: 'anion', isPolyatomic: true, categoryCode: 'A3c' },
        // A4a: Polyatomic anions (less common, -1)
        'CN-': { symbol: 'CN', name: 'Cyanide', charge: -1, type: 'anion', isPolyatomic: true, categoryCode: 'A4a' },
        'SCN-': { symbol: 'SCN', name: 'Thiocyanate', charge: -1, type: 'anion', isPolyatomic: true, categoryCode: 'A4a' },
        'NO2-': { symbol: 'NO₂', name: 'Nitrite', charge: -1, type: 'anion', isPolyatomic: true, categoryCode: 'A4a' },
        'BrO3-': { symbol: 'BrO₃', name: 'Bromate', charge: -1, type: 'anion', isPolyatomic: true, categoryCode: 'A4a' },
        'ClO3-': { symbol: 'ClO₃', name: 'Chlorate', charge: -1, type: 'anion', isPolyatomic: true, categoryCode: 'A4a' },
        'IO3-': { symbol: 'IO₃', name: 'Iodate', charge: -1, type: 'anion', isPolyatomic: true, categoryCode: 'A4a' },
        // A4b: Polyatomic anions (less common, -2)
        'CrO4^2-': { symbol: 'CrO₄', name: 'Chromate', charge: -2, type: 'anion', isPolyatomic: true, categoryCode: 'A4b' },
        'Cr2O7^2-': { symbol: 'Cr₂O₇', name: 'Dichromate', charge: -2, type: 'anion', isPolyatomic: true, categoryCode: 'A4b' },
        'SO3^2-': { symbol: 'SO₃', name: 'Sulfite', charge: -2, type: 'anion', isPolyatomic: true, categoryCode: 'A4b' },
        'S2O3^2-': { symbol: 'S₂O₃', name: 'Thiosulfate', charge: -2, type: 'anion', isPolyatomic: true, categoryCode: 'A4b' },
    };

    // Updated based on GameContentDatabase_v8-2 (Image 1) - Using Category Codes and Ratios
    const levelDefinitions = {
        1: { cationCodes: ['C1a'], anionCodes: ['A1a'], ratios: ['1:1'] },
        2: { cationCodes: ['C1a', 'C1b'], anionCodes: ['A1a', 'A1b'], ratios: ['1:1', '1:2', '2:1'] },
        3: { cationCodes: ['C1b'], anionCodes: ['A1c', 'A1a'], ratios: ['1:1', '1:2', '2:1', '2:3', '3:2'] },
        4: { cationCodes: ['C1b', 'C1c'], anionCodes: ['A1c', 'A1b'], ratios: ['1:1', '1:2', '2:1', '2:3', '3:2'] },
        5: { cationCodes: ['C2a', 'C2b', 'C2c'], anionCodes: ['A1a'], ratios: ['1:1', '1:2', '2:1', '1:3', '3:1'] },
        6: { cationCodes: ['C2b', 'C2c'], anionCodes: ['A1b', 'A1a'], ratios: ['1:1', '1:2', '2:1', '2:3', '3:2'] },
        7: { cationCodes: ['C2c', 'C2d'], anionCodes: ['A1c', 'A1b', 'A1a'], ratios: ['1:1', '1:2', '2:1', '1:3', '3:1', '1:4', '4:1', '2:3', '3:2', '3:4', '4:3'] }, // Simplified 'all' for high charges
        8: { cationCodes: ['C1a', 'C1b', 'C1c', 'C2a', 'C2b', 'C2c', 'C2d'], anionCodes: ['A1a', 'A1b', 'A1c'] }, // Ratios: all
        9: { cationCodes: ['C1a', 'C1b', 'C1c', 'C2a', 'C2b', 'C2c', 'C2d', 'C3a'], anionCodes: ['A1a', 'A1b', 'A1c'] }, // Ratios: all
        10: { cationCodes: ['C1a'], anionCodes: ['A3a', 'A3b'], ratios: ['1:1', '1:2', '2:1'] },
        11: { cationCodes: ['C1b', 'C1c'], anionCodes: ['A3a', 'A3b'], ratios: ['1:1', '1:2', '2:1', '2:3', '3:2'] },
        12: { cationCodes: ['C1a', 'C1b', 'C1c'], anionCodes: ['A3a', 'A3b', 'A3c'] }, // Ratios: all
        13: { cationCodes: ['C1a', 'C1b', 'C1c', 'C2a', 'C2b', 'C2c', 'C2d', 'C3a'], anionCodes: ['A3a', 'A3b', 'A3c'] }, // Ratios: all
        14: { cationCodes: ['C1a', 'C1b', 'C1c', 'C2a', 'C2b', 'C2c', 'C2d', 'C3a'], anionCodes: ['A1a', 'A1b', 'A1c', 'A3a', 'A3b', 'A3c'] }, // Ratios: all
        15: { cationCodes: ['C1a', 'C1b', 'C1c', 'C2a', 'C2b', 'C2c', 'C2d', 'C3a'], anionCodes: ['A1a', 'A1b', 'A1c', 'A3a', 'A3b', 'A3c'] }, // Ratios: all
        16: { cationCodes: ['C4a', 'C4b', 'C4c'], anionCodes: ['A1a', 'A1b', 'A1c'] }, // Ratios: all
        17: { cationCodes: ['C1a', 'C1b', 'C1c', 'C2a', 'C2b', 'C2c', 'C2d', 'C3a', 'C4a', 'C4b', 'C4c'], anionCodes: ['A1a', 'A1b', 'A1c', 'A3a', 'A3b', 'A3c'] }, // Ratios: all
        18: { cationCodes: ['C1a'], anionCodes: ['A4a'], ratios: ['1:1'] },
        19: { cationCodes: ['C1a', 'C1b', 'C1c', 'C2a', 'C2b', 'C2c', 'C2d', 'C3a'], anionCodes: ['A4a', 'A4b'] }, // Ratios: all
        20: { cationCodes: ['C1a', 'C1b', 'C1c', 'C2a', 'C2b', 'C2c', 'C2d', 'C3a', 'C4a', 'C4b', 'C4c'], anionCodes: ['A1a', 'A1b', 'A1c', 'A3a', 'A3b', 'A3c', 'A4a', 'A4b'] }, // Ratios: all
    };

    // Data structure for common mistakes based on MistakeIdentification_v3-1 (Image 2)
    // Simplified initial version - focusing on name mistakes primarily
    const commonMistakes = {
        // Anion Name Mistakes
        'A1a': { // e.g., Fluoride (F-)
            name: [
                (n) => n.replace(/ide$/, 'ate'), // N2: -ide to -ate (e.g., Fluorate)
                (n) => n.replace(/ide$/, 'ite'), // N3: -ide to -ite (e.g., Fluorite)
                (n) => n.replace(/ide$/, '')     // N1: Element name (e.g., Fluorine) - simplified
            ]
        },
        'A1b': { // e.g., Oxide (O2-)
             name: [
                (n) => n.replace(/ide$/, 'ate'), // N2: -ide to -ate
                (n) => n.replace(/ide$/, 'ite'), // N3: -ide to -ite
                (n) => n.replace(/ide$/, '')     // N1: Element name - simplified
            ]
        },
         'A1c': { // e.g., Nitride (N3-)
             name: [
                (n) => n.replace(/ide$/, 'ate'), // N2: -ide to -ate
                (n) => n.replace(/ide$/, 'ite'), // N3: -ide to -ite
                (n) => n.replace(/ide$/, '')     // N1: Element name - simplified
            ]
        },
        'A3a': { // e.g., Nitrate (NO3-)
            name: [
                (n) => n.replace(/ate$/, 'ide'), // N2: -ate to -ide
                (n) => n.replace(/ate$/, 'ite')  // N3: -ate to -ite
            ]
        },
         'A3b': { // e.g., Carbonate (CO3^2-)
            name: [
                (n) => n.replace(/ate$/, 'ide'), // N2: -ate to -ide
                (n) => n.replace(/ate$/, 'ite')  // N3: -ate to -ite
            ]
        },
         'A3c': { // e.g., Phosphate (PO4^3-)
             name: [
                (n) => n.replace(/ate$/, 'ide'), // N2: -ate to -ide
                (n) => n.replace(/ate$/, 'ite')  // N3: -ate to -ite
            ]
        },
         'A4a': { // e.g., Chlorate (ClO3-)
             name: [
                (n) => n.replace(/ate$/, 'ide'), // N2: -ate to -ide
                (n) => n.replace(/ate$/, 'ite')  // N3: -ate to -ite
            ]
        },
         'A4b': { // e.g., Chromate (CrO4^2-)
             name: [
                (n) => n.replace(/ate$/, 'ide'), // N2: -ate to -ide
                (n) => n.replace(/ate$/, 'ite')  // N3: -ate to -ite
            ]
        },
        // Cation Name Mistakes
        'C1a': {}, // Fixed OS, few common name mistakes other than using symbol
        'C1b': {},
        'C1c': {},
        'C2a': { // e.g., Copper(I) (Cu+)
            name: [
                (n) => n.replace(/\(.*\)/, '').trim(), // N5: Missing Roman numeral
                (n) => n.replace('I', 'II')             // N4: Incorrect Roman numeral
            ]
        },
        'C2b': { // e.g., Iron(II) (Fe2+)
            name: [
                (n) => n.replace(/\(.*\)/, '').trim(), // N5: Missing Roman numeral
                (n) => n.replace('II', 'III'),          // N4: Incorrect Roman numeral
                (n) => n.replace('II', 'I')             // N4: Incorrect Roman numeral
            ]
        },
        'C2c': { // e.g., Iron(III) (Fe3+)
             name: [
                (n) => n.replace(/\(.*\)/, '').trim(), // N5: Missing Roman numeral
                (n) => n.replace('III', 'II'),          // N4: Incorrect Roman numeral
                (n) => n.replace('III', 'IV')           // N4: Incorrect Roman numeral
            ]
        },
        'C2d': { // e.g., Lead(IV) (Pb4+)
             name: [
                (n) => n.replace(/\(.*\)/, '').trim(), // N5: Missing Roman numeral
                (n) => n.replace('IV', 'II')            // N4: Incorrect Roman numeral
            ]
        },
        'C3a': {}, // Ammonium - usually correct name or symbol error
        'C4a': { // e.g., Chromium(III) (Cr3+)
             name: [
                (n) => n.replace(/\(.*\)/, '').trim(), // N5: Missing Roman numeral
                (n) => n.replace('III', 'II')           // N4: Incorrect Roman numeral
            ]
        },
        'C4b': { // e.g., Manganese(II) (Mn2+)
             name: [
                (n) => n.replace(/\(.*\)/, '').trim(), // N5: Missing Roman numeral
                (n) => n.replace('II', 'IV'),           // N4: Incorrect Roman numeral
                 (n) => n.replace('II', 'III')          // N4: Incorrect Roman numeral
            ]
        },
        'C4c': { // e.g., Tin(IV) (Sn4+)
             name: [
                (n) => n.replace(/\(.*\)/, '').trim(), // N5: Missing Roman numeral
                (n) => n.replace('IV', 'II')            // N4: Incorrect Roman numeral
            ]
        }
        // Note: Formula mistakes (SF, C, F) are harder to generalize here
        // and often depend on the combination, better handled in generation logic.
    };


    // --- Helper Functions ---
    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

    // Function to get the ions for the current difficulty level (Updated for Category Codes)
    function getIonsForLevel(level) {
        const levelData = levelDefinitions[level];
        if (!levelData || !levelData.cationCodes || !levelData.anionCodes) {
            console.error(`Level ${level} definition or codes not found.`);
            return { cations: [], anions: [] };
        }

        const allowedCationCodes = new Set(levelData.cationCodes);
        const allowedAnionCodes = new Set(levelData.anionCodes);

        const cations = [];
        const anions = [];

        for (const ionKey in allIons) {
            const ion = allIons[ionKey];
            if (ion.type === 'cation' && allowedCationCodes.has(ion.categoryCode)) {
                cations.push(ionKey);
            } else if (ion.type === 'anion' && allowedAnionCodes.has(ion.categoryCode)) {
                anions.push(ionKey);
            }
        }

        if (cations.length === 0 || anions.length === 0) {
             console.warn(`No cations or anions found for level ${level} with codes:`, levelData);
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

    // Update the state of the submit button based on selection, charge balance, and allowed ratio
    function updateSubmitButtonState() {
        const selectedCationId = Object.keys(selectedIons).find(id => allIons[id]?.type === 'cation' && selectedIons[id] > 0);
        const selectedAnionId = Object.keys(selectedIons).find(id => allIons[id]?.type === 'anion' && selectedIons[id] > 0);

        const hasCation = !!selectedCationId;
        const hasAnion = !!selectedAnionId;

        let isBalanced = false;
        let isRatioCorrect = false; // Default to false

        if (hasCation && hasAnion) {
            const charges = calculateTotalCharge();
            isBalanced = charges.positive + charges.negative === 0;

            // If charges are balanced, check if the ratio of selected ions is the simplest possible ratio.
            if (isBalanced) {
                const cation = allIons[selectedCationId];
                const anion = allIons[selectedAnionId];
                const cationCount = selectedIons[selectedCationId];
                const anionCount = selectedIons[selectedAnionId];

                // Calculate the simplest ratio based on fundamental charges
                const charge1 = Math.abs(cation.charge);
                const charge2 = Math.abs(anion.charge);
                const commonDivisor = gcd(charge1, charge2);
                const simplestCationSubscript = charge2 / commonDivisor;
                const simplestAnionSubscript = charge1 / commonDivisor;

                // The ratio is correct only if the selected counts match the simplest chemical ratio
                isRatioCorrect = (cationCount === simplestCationSubscript && anionCount === simplestAnionSubscript);
            }
        }

        // Enable only if one cation and one anion are selected, charges are balanced, AND the ratio is the simplest correct one.
        submitCompoundButton.disabled = !(hasCation && hasAnion && isBalanced && isRatioCorrect);
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

    // Function to change ion count when clicking the display element
    function changeIonCount(ionId, change) {
        clickSound.play().catch(e => console.error("Audio play failed:", e));
        if (selectedIons[ionId]) {
            selectedIons[ionId] += change;
            if (selectedIons[ionId] <= 0) {
                delete selectedIons[ionId]; // Remove ion if count reaches zero or less
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
            displayElement.innerHTML = `
                <button class="count-change-button" data-ionid="${ionId}" data-change="-1">-</button>
                ${countPrefix}${getIonDisplay(ion)}
                <button class="count-change-button" data-ionid="${ionId}" data-change="1">+</button>
            `;
            displayElement.style.marginRight = '10px';
            displayElement.style.cursor = 'default'; // Main span not clickable

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
             selectedIonsContainer.querySelectorAll('.count-change-button').forEach(button => {
                const id = button.dataset.ionid;
                const change = parseInt(button.dataset.change, 10);
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    changeIonCount(id, change);
                });
            });
        }
    }


    // Function to handle clicking on an ion tile
    function handleTileClick(ionId, tileElement) {
        clickSound.play().catch(e => console.error("Error playing click sound:", e));

        if (tileElement.classList.contains('used')) {
            return; // Do nothing if the tile is already used
        }

        if (!ionId || !allIons[ionId]) {
            console.error(`Critical Error: Invalid ionId "${ionId}" passed to handleTileClick.`);
            return;
        }

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

        displayTilesData.forEach(ionKey => {
            const ion = allIons[ionKey];
            if (!ion) {
                console.warn(`Could not find ion data for key: ${ionKey}`);
                return;
            }
            const tile = document.createElement('div');
            tile.classList.add('ion-tile', ion.type);
            tile.innerHTML = getIonDisplay(ion);
            tile.dataset.ionId = ionKey; // Store the direct key

            const combinationKey = `${ionKey}`;
            if (usedCombinations.has(combinationKey)) {
                tile.classList.add('used');
            }

            tile.addEventListener('click', () => handleTileClick(ionKey, tile)); // Pass the key and the tile element
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

        // The following lines were removed to prevent double subscripting of simple ions:
        // cationPart = cationPart.replace(/(\d+)/g, '<sub>$1</sub>');
        // anionPart = anionPart.replace(/(\d+)/g, '<sub>$1</sub>');

        // Fix specific polyatomic displays if needed (redundant if getIonDisplay handles it)
        // Note: The direct replacement for polyatomic ions like NH₄ is generally good,
        // but ensure it doesn't conflict with the subscript logic if those symbols themselves might contain numbers
        // that shouldn't be subscripted further by other logic (though removed lines were the main issue).
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
            button.innerHTML = option.text; // Use the text property
            button.addEventListener('click', () => handleMCQAnswer(option, correctAnswer, button, askForName));
            mcqOptions.appendChild(button);
        });
    }

    function generateMCQOptions(correctAnswer, isNameQuestion) {
        const potentialDistractors = new Set(); // Use a Set to store unique potential distractors
        const cation = currentCompound.cation;
        const anion = currentCompound.anion;
        const cationCode = cation.categoryCode;
        const anionCode = anion.categoryCode;

        // --- Generate Targeted Distractors based on commonMistakes ---
        if (isNameQuestion) {
            const correctCationName = cation.name;
            const correctAnionName = anion.name;

            // Apply cation name mistakes
            if (commonMistakes[cationCode]?.name) {
                commonMistakes[cationCode].name.forEach(mistakeFn => {
                    const wrongCationName = mistakeFn(correctCationName);
                    if (wrongCationName !== correctCationName) {
                        const potentialDistractor = { text: `${wrongCationName} ${correctAnionName}`, mistakeType: 'cationName' };
                        if (potentialDistractor.text !== correctAnswer) potentialDistractors.add(potentialDistractor);
                    }
                });
            }
            // Apply anion name mistakes
            if (commonMistakes[anionCode]?.name) {
                commonMistakes[anionCode].name.forEach(mistakeFn => {
                    const wrongAnionName = mistakeFn(correctAnionName);
                    // Add condition to exclude "Potassium Iod" distractor for Potassium Iodide
                    if (wrongAnionName !== correctAnionName && !(correctCationName === 'Potassium' && correctAnionName === 'Iodide' && wrongAnionName === 'Iod')) {
                        const potentialDistractor = { text: `${correctCationName} ${wrongAnionName}`, mistakeType: 'anionName' };
                        if (potentialDistractor.text !== correctAnswer) potentialDistractors.add(potentialDistractor);
                    }
                });
            }
            // Distractor: Swapped names
            const swappedName = { text: `${correctAnionName} ${correctCationName}`, mistakeType: 'swappedNames' };
            if (swappedName.text !== correctAnswer) potentialDistractors.add(swappedName);

        } else { // Formula distractors
            const cationCharge = Math.abs(cation.charge);
            const anionCharge = Math.abs(anion.charge);
            const cationSymbol = cation.symbol;
            const anionSymbol = anion.symbol;
            const cationIsPolyatomic = cation.isPolyatomic;
            const anionIsPolyatomic = anion.isPolyatomic;

            // Calculate correct subscripts
            const commonDivisor = gcd(cationCharge, anionCharge);
            const cationSubscript = anionCharge / commonDivisor;
            const anionSubscript = cationCharge / commonDivisor;

            // Distractor: Simple concatenation without subscripts
            const simpleConcatText = `${cationSymbol}${anionSymbol}`;
            if (correctAnswer !== simpleConcatText) {
                potentialDistractors.add({ text: simpleConcatText, mistakeType: 'simpleConcat' });
            }

            // Distractor: Swapped subscripts
            if (cationSubscript !== anionSubscript) {
                 let swappedFormulaText = cationSymbol;
                 if (cationIsPolyatomic && anionSubscript > 1) swappedFormulaText = `(${swappedFormulaText})`;
                 if (anionSubscript > 1) swappedFormulaText += `<sub>${anionSubscript}</sub>`;

                 let swappedAnionPart = anionSymbol;
                 if (anionIsPolyatomic && cationSubscript > 1) swappedAnionPart = `(${swappedAnionPart})`;
                 if (cationSubscript > 1) swappedAnionPart += `<sub>${cationSubscript}</sub>`;

                 swappedFormulaText += swappedAnionPart;
                 swappedFormulaText = swappedFormulaText.replace(/<sub>1<\/sub>/g, ''); // Remove subscript 1
                 if (correctAnswer !== swappedFormulaText) {
                    potentialDistractors.add({ text: swappedFormulaText, mistakeType: 'swappedSubscripts' });
                }
            }

            // Distractor: Missing parentheses for polyatomic ions
            if (cationIsPolyatomic && cationSubscript > 1) {
                let noParenFormulaText = cationSymbol + (cationSubscript > 1 ? `<sub>${cationSubscript}</sub>` : '');
                let anionPart = anionSymbol;
                if (anionIsPolyatomic && anionSubscript > 1) anionPart = `(${anionPart})`;
                if (anionSubscript > 1) anionPart += `<sub>${anionSubscript}</sub>`;
                noParenFormulaText += anionPart;
                noParenFormulaText = noParenFormulaText.replace(/<sub>1<\/sub>/g, ''); // Remove subscript 1
                 if (correctAnswer !== noParenFormulaText) {
                    potentialDistractors.add({ text: noParenFormulaText, mistakeType: 'missingParenthesesCation' });
                }
            }
            if (anionIsPolyatomic && anionSubscript > 1) {
                let cationPart = cationSymbol;
                 if (cationIsPolyatomic && cationSubscript > 1) cationPart = `(${cationPart})`;
                 if (cationSubscript > 1) cationPart += `<sub>${cationSubscript}</sub>`;

                let noParenFormulaAnionText = anionSymbol + (anionSubscript > 1 ? `<sub>${anionSubscript}</sub>` : '');
                noParenFormulaAnionText = cationPart + noParenFormulaAnionText;
                noParenFormulaAnionText = noParenFormulaAnionText.replace(/<sub>1<\/sub>/g, ''); // Remove subscript 1
                 if (correctAnswer !== noParenFormulaAnionText) {
                    potentialDistractors.add({ text: noParenFormulaAnionText, mistakeType: 'missingParenthesesAnion' });
                }
            }

             // Distractor: Incorrect ratio (e.g., 1:1 if not already the case, or other simple incorrect ratios)
             // This aims to create a formula with an incorrect charge balance if the correct one isn't 1:1
             if (cationSubscript !== 1 || anionSubscript !== 1) { // If correct is not 1:1
                let incorrectRatioText = cationSymbol + anionSymbol; // Basic 1:1
                incorrectRatioText = incorrectRatioText.replace(/<sub>1<\/sub>/g, '');
                if (correctAnswer !== incorrectRatioText) {
                    potentialDistractors.add({ text: incorrectRatioText, mistakeType: 'incorrectRatio' });
                }
             } else { // If correct IS 1:1, try a 1:2 or 2:1 if plausible
                let incorrectRatioTextAlt = cationSymbol + "<sub>2</sub>" + anionSymbol;
                incorrectRatioTextAlt = incorrectRatioTextAlt.replace(/<sub>1<\/sub>/g, '');
                 if (correctAnswer !== incorrectRatioTextAlt && !Array.from(potentialDistractors).some(d => d.text === incorrectRatioTextAlt)) {
                    potentialDistractors.add({ text: incorrectRatioTextAlt, mistakeType: 'incorrectRatio' });
                }
             }

            // Distractors with other plausible incorrect ratios (e.g., K2I, KI2, K3I2 for KI)
            const plausibleIncorrectRatios = [
                { cSub: 2, aSub: 1, type: 'incorrectRatio_2_1' },
                { cSub: 1, aSub: 2, type: 'incorrectRatio_1_2' },
                { cSub: 3, aSub: 1, type: 'incorrectRatio_3_1' },
                { cSub: 1, aSub: 3, type: 'incorrectRatio_1_3' },
                { cSub: 2, aSub: 3, type: 'incorrectRatio_2_3' },
                { cSub: 3, aSub: 2, type: 'incorrectRatio_3_2' }
            ];

            for (const ratio of plausibleIncorrectRatios) {
                if (potentialDistractors.size >= 7) break; // Limit total distractors before random fill

                let distractorFormula = '';
                // Cation part
                if (cationIsPolyatomic && ratio.cSub > 1) distractorFormula += `(${cationSymbol})`;
                else distractorFormula += cationSymbol;
                if (ratio.cSub > 1) distractorFormula += `<sub>${ratio.cSub}</sub>`;

                // Anion part
                if (anionIsPolyatomic && ratio.aSub > 1) distractorFormula += `(${anionSymbol})`;
                else distractorFormula += anionSymbol;
                if (ratio.aSub > 1) distractorFormula += `<sub>${ratio.aSub}</sub>`;
                
                distractorFormula = distractorFormula.replace(/<sub>1<\/sub>/g, ''); // Clean up subscript 1 if it was explicitly 1

                if (correctAnswer !== distractorFormula && !Array.from(potentialDistractors).some(d => d.text === distractorFormula)) {
                    potentialDistractors.add({ text: distractorFormula, mistakeType: ratio.type });
                }
            }
        }

        // --- Select up to 3 distractors from the potential pool ---
        // Convert Set to Array and filter out any potential null/undefined entries
        const distractorsArray = Array.from(potentialDistractors).filter(opt => opt && typeof opt.text === 'string' && opt.text.length > 0);
        distractorsArray.sort(() => Math.random() - 0.5); // Shuffle potential distractors

        const selectedDistractors = distractorsArray.slice(0, 3);

        // --- Fill remaining slots with random plausible compounds if needed ---
        const { cations: levelCations, anions: levelAnions } = getIonsForLevel(currentDifficultyLevel);
        let attempts = 0;
        while (selectedDistractors.length < 3 && attempts < 50) { // Aim for 3 distractors, limit attempts
            const randomCation = levelCations[Math.floor(Math.random() * levelCations.length)];
            const randomAnion = levelAnions[Math.floor(Math.random() * levelAnions.length)];
            if (!randomCation || !randomAnion) {
                attempts++;
                continue;
            }

            let newDistractorText;
            if (isNameQuestion) {
                newDistractorText = generateCompoundName(randomCation, randomAnion);
            } else {
                newDistractorText = calculateFormula(randomCation, randomAnion);
            }

            // Ensure newDistractor is different from correct answer and selected distractors
            const plainNewDistractor = newDistractorText.replace(/<sub>|<\/sub>/g, '');
            const plainCorrectAnswer = correctAnswer.replace(/<sub>|<\/sub>/g, '');
            const plainSelectedDistractors = selectedDistractors.map(opt => opt.text.replace(/<sub>|<\/sub>/g, ''));

            if (plainNewDistractor !== plainCorrectAnswer && !plainSelectedDistractors.includes(plainNewDistractor)) {
                selectedDistractors.push({ text: newDistractorText, mistakeType: 'random' }); // Mark as random distractor
            }
            attempts++;
        }

        // --- Combine correct answer with selected distractors and shuffle ---
        // Ensure correct answer is also an object with text property
        const finalOptions = [{ text: correctAnswer, mistakeType: 'correct' }, ...selectedDistractors];

        // Ensure exactly 4 unique options based on text content
        const uniqueOptionsMap = new Map();
        finalOptions.forEach(opt => {
            const plainText = opt.text.replace(/<sub>|<\/sub>/g, '');
            if (!uniqueOptionsMap.has(plainText)) {
                uniqueOptionsMap.set(plainText, opt);
            }
        });
        const uniqueOptions = Array.from(uniqueOptionsMap.values());

        // If somehow we still don't have 4 unique options (unlikely with random fill), add more random ones
         attempts = 0;
         while (uniqueOptions.length < 4 && attempts < 50) {
             const randomCation = levelCations[Math.floor(Math.random() * levelCations.length)];
             const randomAnion = levelAnions[Math.floor(Math.random() * levelAnions.length)];
             if (!randomCation || !randomAnion) {
                 attempts++;
                 continue;
             }

             let newOptionText;
             if (isNameQuestion) {
                 newOptionText = generateCompoundName(randomCation, randomAnion);
             } else {
                 newOptionText = calculateFormula(randomCation, randomAnion);
             }

             const plainNewOption = newOptionText.replace(/<sub>|<\/sub>/g, '');
             const plainUniqueOptions = uniqueOptions.map(opt => opt.text.replace(/<sub>|<\/sub>/g, ''));

             if (!plainUniqueOptions.includes(plainNewOption)) {
                 uniqueOptions.push({ text: newOptionText, mistakeType: 'random' }); // Mark as random distractor
             }
             attempts++;
         }

        // Ensure exactly 4 options (slice if more, though unlikely after unique filter)
        if (uniqueOptions.length > 4) {
             console.warn("More than 4 unique options generated, slicing to 4.");
             uniqueOptions.length = 4;
        }

        // Shuffle the final unique options
        uniqueOptions.sort(() => Math.random() - 0.5);

        console.log("Generated MCQ Options:", uniqueOptions); // Add this line for debugging

        return uniqueOptions;
    }


    // Helper function to strip HTML tags (specifically <sub>) for comparison
    function stripHtmlTags(htmlString) {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }

    function handleMCQAnswer(selectedAnswer, correctAnswer, buttonElement, isNameQuestion) {
        clickSound.play().catch(e => console.error("Error playing click sound:", e));

        const currentClickedOptionText = stripHtmlTags(buttonElement.innerHTML.trim()); // Get innerHTML and strip tags
        const plainCorrectAnswer = stripHtmlTags(correctAnswer); // Strip tags from correct answer

        const isCorrect = currentClickedOptionText === plainCorrectAnswer;
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

            const cationId = Object.keys(currentCompound.selectedIonCounts).find(id => allIons[id]?.type === 'cation');
            const anionId = Object.keys(currentCompound.selectedIonCounts).find(id => allIons[id]?.type === 'anion');
            if (cationId) usedCombinations.add(cationId);
            if (anionId) usedCombinations.add(anionId);

            gameHistory.push({ compound: currentCompound, correct: true, attempt: { text: currentClickedOptionText } }); // Use stripped text for history
            setTimeout(nextRound, 1000); // Proceed after 1 second
        } else {
            mcqTriesLeft--;
            triesLeftDisplay.textContent = `Tries left: ${mcqTriesLeft}`;
            buttonElement.classList.add('incorrect'); // Mark selected button as incorrect
            incorrectSound.play().catch(e => console.error("Error playing incorrect sound:", e));

            // Find the selected option object to get the mistake type
            // Need to strip tags from options in currentMCQOptionsArray for accurate finding
            const selectedOptionObject = currentMCQOptionsArray.find(opt => stripHtmlTags(opt.text) === currentClickedOptionText);
            const mistakeType = selectedOptionObject ? selectedOptionObject.mistakeType : 'unknown';
            console.log(`Selected option text: "${currentClickedOptionText}", Found mistakeType: "${mistakeType}", Selected object:`, selectedOptionObject, "Current MCQ Options Array:", currentMCQOptionsArray);

            if (mcqTriesLeft > 0) { // Not the final attempt
                let specificFeedbackGiven = false;
                if (isNameQuestion) {
                    const cationRequiresRoman = ['C2a', 'C2b', 'C2c', 'C2d', 'C4a', 'C4b', 'C4c'].includes(currentCompound.cation.categoryCode);
                    switch (mistakeType) {
                        case 'swappedNames':
                            feedbackText = "Incorrect. It looks like the names might be in the reverse order. Remember, cation first, then anion. Try again!";
                            specificFeedbackGiven = true;
                            break;
                        case 'cationName':
                            let cationFeedback = "Incorrect. Focus on the cation's name. ";
                            if (cationRequiresRoman) {
                                cationFeedback += `Does ${currentCompound.cation.name.split('(')[0].trim()} need a Roman numeral here? `;
                            }
                            cationFeedback += "Check spelling and rules. Try again!";
                            feedbackText = cationFeedback;
                            specificFeedbackGiven = true;
                            break;
                        case 'anionName':
                            let anionFeedback = "Incorrect. Focus on the anion's name. ";
                            if (currentCompound.anion.isPolyatomic) {
                                anionFeedback += `Is it a polyatomic ion? Check its specific name and ending. `;
                            } else {
                                anionFeedback += `For monatomic anions, check the -ide ending. `;
                            }
                            anionFeedback += "Try again!";
                            feedbackText = anionFeedback;
                            specificFeedbackGiven = true;
                            break;
                    }
                } else { // Formula question
                    const cationSymbol = currentCompound.cation.symbol;
                    const anionSymbol = currentCompound.anion.symbol;
                    switch (mistakeType) {
                        case 'simpleConcat':
                            feedbackText = `Incorrect. Just putting ${cationSymbol} and ${anionSymbol} together isn't always right. Balance the charges. Try again!`;
                            specificFeedbackGiven = true;
                            break;
                        case 'swappedSubscripts':
                            feedbackText = "Incorrect. Subscripts might be on the wrong ions. Think 'criss-cross'. Try again!";
                            specificFeedbackGiven = true;
                            break;
                        case 'missingParenthesesCation':
                            feedbackText = `Incorrect. Polyatomic cation ${cationSymbol} might need parentheses if there's more than one. Try again!`;
                            specificFeedbackGiven = true;
                            break;
                        case 'missingParenthesesAnion':
                            feedbackText = `Incorrect. Polyatomic anion ${anionSymbol} might need parentheses if there's more than one. Try again!`;
                            specificFeedbackGiven = true;
                            break;
                        case 'incorrectRatio': // General fallback if a more specific ratio isn't matched
                            feedbackText = "Incorrect. Check the ion charges. How do they combine to make a neutral compound? Are subscripts needed?";
                            specificFeedbackGiven = true;
                            break;
                        case 'incorrectRatio_2_1': // e.g., student chose Cation₂Anion₁
                            feedbackText = `You've chosen a 2:1 ratio for ${cationSymbol} to ${anionSymbol}. This ratio would be correct if ${cationSymbol} had a +1 charge and ${anionSymbol} had a -2 charge (like in Na₂O from Na⁺ and O²⁻). Considering ${cationSymbol} has a charge of ${currentCompound.cation.charge} and ${anionSymbol} has a charge of ${currentCompound.anion.charge}, does this 2:1 ratio make the compound neutral?`;
                            specificFeedbackGiven = true;
                            break;
                        case 'incorrectRatio_1_2': // e.g., student chose Cation₁Anion₂
                            feedbackText = `A 1:2 ratio for ${cationSymbol} to ${anionSymbol}. This is the right approach if ${cationSymbol} is +2 and ${anionSymbol} is -1 (like in MgCl₂ from Mg²⁺ and Cl⁻). Given that ${cationSymbol} is ${currentCompound.cation.charge} and ${anionSymbol} is ${currentCompound.anion.charge}, does this 1:2 ratio balance the charges?`;
                            specificFeedbackGiven = true;
                            break;
                        case 'incorrectRatio_3_1': // e.g., student chose Cation₃Anion₁
                            feedbackText = `You're suggesting a 3:1 ratio for ${cationSymbol} to ${anionSymbol}. This works when ${cationSymbol} has a +1 charge and ${anionSymbol} has a -3 charge (think Na₃N from Na⁺ and N³⁻). With ${cationSymbol} at ${currentCompound.cation.charge} and ${anionSymbol} at ${currentCompound.anion.charge}, does this 3:1 ratio achieve neutrality?`;
                            specificFeedbackGiven = true;
                            break;
                        case 'incorrectRatio_1_3': // e.g., student chose Cation₁Anion₃
                            feedbackText = `This 1:3 ratio for ${cationSymbol} to ${anionSymbol} is correct if ${cationSymbol} carries a +3 charge and ${anionSymbol} carries a -1 charge (for instance, AlCl₃ from Al³⁺ and Cl⁻). Your ions are ${cationSymbol} (${currentCompound.cation.charge}) and ${anionSymbol} (${currentCompound.anion.charge}). Does a 1:3 ratio balance these out?`;
                            specificFeedbackGiven = true;
                            break;
                        case 'incorrectRatio_2_3': // e.g., student chose Cation₂Anion₃
                            feedbackText = `A 2:3 ratio for ${cationSymbol} to ${anionSymbol}. This is the formula structure for ions like a +3 cation and a -2 anion (e.g., Al₂O₃ from Al³⁺ and O²⁻). For your specific ions, ${cationSymbol} (${currentCompound.cation.charge}) and ${anionSymbol} (${currentCompound.anion.charge}), does this 2:3 ratio result in a neutral compound?`;
                            specificFeedbackGiven = true;
                            break;
                        case 'incorrectRatio_3_2': // e.g., student chose Cation₃Anion₂
                            feedbackText = `You've selected a 3:2 ratio for ${cationSymbol} to ${anionSymbol}. This is correct when the cation has a +2 charge and the anion has a -3 charge (like in Mg₃N₂ from Mg²⁺ and N³⁻). Given ${cationSymbol} is ${currentCompound.cation.charge} and ${anionSymbol} is ${currentCompound.anion.charge}, does this 3:2 ratio balance the total charges to zero?`;
                            specificFeedbackGiven = true;
                            break;
                    }
                }

                if (!specificFeedbackGiven) {
                    feedbackText = "Incorrect. Try again!"; // Generic for other first attempts or if no specific feedback applies
                }

                feedbackArea.className = 'feedback-area incorrect';
                // Re-enable only the non-selected buttons
                mcqOptions.querySelectorAll('button').forEach(btn => {
                    if (btn !== buttonElement) {
                        btn.disabled = false;
                    }
                });
            } else { // Final incorrect attempt (Provide guiding feedback instead of answer)
                feedbackArea.className = 'feedback-area incorrect';
                updateScore(false);
                gameHistory.push({ compound: currentCompound, correct: false, attempt: { text: currentClickedOptionText } }); // Use stripped text for history

                // Provide specific feedback based on mistake type
                if (isNameQuestion) {
                    const cationRequiresRoman = ['C2a', 'C2b', 'C2c', 'C2d', 'C4a', 'C4b', 'C4c'].includes(currentCompound.cation.categoryCode);
                    switch (mistakeType) {
                        case 'swappedNames':
                            feedbackText = "Incorrect. It looks like the names might be in the reverse order. In chemistry, when naming ionic compounds, we always state the name of the cation (the positive ion, usually a metal or polyatomic ion like NH₄⁺) first, followed by the name of the anion (the negative ion, which could be a nonmetal ending in -ide, or a polyatomic ion like SO₄²⁻). Think of it as 'positive first, then negative'.";
                            break;
                        case 'cationName':
                            let cationFeedback = "Incorrect. Let's focus on the cation's name. ";
                            if (cationRequiresRoman) {
                                cationFeedback += `Remember that ${currentCompound.cation.name.split('(')[0].trim()} can have multiple charges, so a Roman numeral is needed to specify its charge in this compound. `;
                            } else {
                                cationFeedback += `Is the cation name spelled correctly? `;
                            }
                            feedbackText = cationFeedback;
                            break;
                        case 'anionName':
                            let anionFeedback = "Incorrect. Let's look at the anion's name. ";
                            if (currentCompound.anion.isPolyatomic) {
                                anionFeedback += `Is it a polyatomic ion? Make sure you're using the correct name and ending (e.g., -ate, -ite). `;
                            } else {
                                anionFeedback += `For monatomic anions, the ending usually changes to -ide. Is that the case here? `;
                            }
                            feedbackText = anionFeedback;
                            break;
                        case 'random': // For random name distractors
                            feedbackText = `Incorrect. That's not the correct name for the compound formed by ${currentCompound.cation.name} and ${currentCompound.anion.name}. Double-check both the cation and anion parts.`;
                            break;
                        default:
                            feedbackText = "Incorrect. Let's review the general rules for naming ionic compounds. Consider the cation, the anion, and any special rules like Roman numerals or polyatomic ion names.";
                    }
                } else { // Formula question
                    const cationSymbol = currentCompound.cation.symbol;
                    const anionSymbol = currentCompound.anion.symbol;
                    const isCationPolyatomic = currentCompound.cation.isPolyatomic;
                    const isAnionPolyatomic = currentCompound.anion.isPolyatomic;

                    switch (mistakeType) {
                        case 'simpleConcat':
                            feedbackText = `Incorrect. Just putting ${cationSymbol} and ${anionSymbol} together isn't always enough. Ionic compounds need to be electrically neutral. Have you considered the charges of the ions and if subscripts are needed to balance them?`;
                            break;
                        case 'swappedSubscripts':
                            feedbackText = "Incorrect. It looks like the subscripts might be on the wrong ions. Remember the 'criss-cross' rule? The numerical value of the anion's charge often becomes the cation's subscript, and vice-versa (after simplifying).";
                            break;
                        case 'missingParenthesesCation':
                            feedbackText = `Incorrect. The cation ${cationSymbol} is polyatomic. If you need more than one of these polyatomic units to balance the charge, you must enclose it in parentheses before adding the subscript.`;
                            break;
                        case 'missingParenthesesAnion':
                            feedbackText = `Incorrect. The anion ${anionSymbol} is polyatomic. If you need more than one of these polyatomic units to balance the charge, you must enclose it in parentheses before adding the subscript.`;
                            break;
                        case 'incorrectRatio':
                        case 'incorrectRatio_2_1':
                        case 'incorrectRatio_1_2':
                        case 'incorrectRatio_3_1':
                        case 'incorrectRatio_1_3':
                        case 'incorrectRatio_2_3':
                        case 'incorrectRatio_3_2':
                            feedbackText = `Incorrect. The ratio of ${cationSymbol} to ${anionSymbol} ions in your formula doesn't result in a neutral compound. Double-check the charges of each ion (K is ${currentCompound.cation.charge}, I is ${currentCompound.anion.charge}) and adjust the subscripts so the total positive charge equals the total negative charge.`;
                            break;
                        case 'random': // For distractors that are valid formulas but for wrong elements
                            feedbackText = `Incorrect. While that might be a valid chemical formula, does it correctly represent the compound formed specifically by ${cationSymbol} (with charge ${currentCompound.cation.charge}) and ${anionSymbol} (with charge ${currentCompound.anion.charge})? Check the elements and their charges.`;
                            break;
                        default:
                            feedbackText = "Incorrect. Let's review the rules for writing formulas for ionic compounds. Key things to consider are: the symbols of the ions, their charges, using subscripts to balance charges, and when to use parentheses for polyatomic ions.";
                    }
                }


                // Do NOT highlight the correct answer button anymore
                // mcqOptions.querySelectorAll('button').forEach(btn => {
                //     if (btn.innerHTML === correctAnswer) {
                //         btn.classList.add('correct');
                //     }
                // });

                setTimeout(nextRound, 2500); // Give a bit more time to read feedback
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
                usedCombinations.clear(); // Reset used combinations on level up
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

        // Add the last selected ions if the game ended via timeout and ions were selected
        if (Object.keys(selectedIons).length > 0) {
            const lastSelectionLi = document.createElement('li');
            let selectionText = '';
            const sortedIonIds = Object.keys(selectedIons).sort();
            sortedIonIds.forEach((ionId, index) => {
                 const ion = allIons[ionId];
                 const count = selectedIons[ionId];
                 if (ion && count > 0) {
                     const countPrefix = count > 1 ? `${count} x ` : '';
                     selectionText += `${countPrefix}${getIonDisplay(ion)}`;
                     if (index < sortedIonIds.length - 1) {
                         selectionText += ' + ';
                     }
                 }
            });
             lastSelectionLi.innerHTML = `<i>Last Selection (In Progress): ${selectionText}</i>`;
             lastSelectionLi.style.fontStyle = 'italic'; // Optional: style it differently
             lastSelectionLi.style.backgroundColor = '#eee'; // Optional: different background
             summaryList.appendChild(lastSelectionLi); // Add it to the list
        }

        // Display completed attempts
        gameHistory.forEach(item => {
            const li = document.createElement('li');
            const formula = calculateFormula(item.compound.cation, item.compound.anion);
            const name = generateCompoundName(item.compound.cation, item.compound.anion);
            const status = item.correct ? '✅ Correct' : `❌ Incorrect (Selected: ${item.attempt.text})`; // Use .text property
            li.innerHTML = `<b>${formula} (${name})</b>: ${status}`;
            summaryList.appendChild(li);
        });

         // Send xAPI statement for game ended
         if (typeof sendGameEndedStatement === 'function') {
             sendGameEndedStatement(score, highestStreak, currentDifficultyLevel, gameHistory);
         } else {
             console.warn("sendGameEndedStatement function not found for xAPI.");
         }
        // Send xAPI state, similar to reference
        try {
            if (typeof storeState === 'function') {
                const stateData = {
                    score: score,
                    feedback: summaryList.innerHTML // Use the actual summary
                };
                storeState(stateData);
                console.log("xAPI state sent from endGame (script.js):", stateData);
            } else {
                console.error("storeState function not found in endGame (script.js).");
            }
        } catch (e) {
            console.error("Error sending xAPI state from endGame (script.js):", e);
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
        // Send xAPI state
        try {
            if (typeof storeState === 'function') {
                const stateData = {
                    score: score, // Final score
                    feedback: "Congratulations! You have completed all levels! Final Score: " + score + ", Highest Streak: " + highestStreak
                };
                storeState(stateData);
                console.log("xAPI state sent from showLevel20CompleteScreen (script.js):", stateData);
            } else {
                console.error("storeState function not found in showLevel20CompleteScreen (script.js).");
            }
        } catch (e) {
            console.error("Error sending xAPI state from showLevel20CompleteScreen (script.js):", e);
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
    // Helper function to update the xAPI state display
    function updateXAPIState(feedbackText) {
        if (typeof storeState === 'function') {
            const stateData = { // Simplified structure
                score: score,     // Current score (e.g., 0 at start)
                feedback: feedbackText // e.g., "Game Started"
            };
            storeState(stateData);
            console.log("xAPI state sent from updateXAPIState (script.js):", stateData); // Added log
        } else {
            console.warn("storeState function not found for xAPI state update in updateXAPIState (script.js)."); // Updated log
        }
    }

    // --- Initialization ---
    startGame(); // Start the game when the DOM is ready

}); // End of DOMContentLoaded

// Add initial state update when the game starts
startGame = (function(originalStartGame) {
    return function() {
        originalStartGame();
        // Initial state update
        if (typeof updateXAPIState === 'function') {
             updateXAPIState("Game Started");
        }
    };
})(startGame);
