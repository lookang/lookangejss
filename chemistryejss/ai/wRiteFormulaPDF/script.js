document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score');
    const streakDisplay = document.getElementById('streak');
    const difficultyLevelDisplay = document.getElementById('difficulty-level');
    const ionGrid = document.getElementById('ion-grid');
    const cationSelectionDisplay = document.getElementById('cation-selection');
    const anionSelectionDisplay = document.getElementById('anion-selection');
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
    // New elements for Level 20 Complete Screen
    const level20CompleteScreen = document.getElementById('level-20-complete-screen');
    const finalScoreL20Display = document.getElementById('final-score-l20');
    const highestStreakL20Display = document.getElementById('highest-streak-l20');
    const restartButtonL20 = document.getElementById('restart-button-l20');


    // --- Audio Elements ---
    const clickSound = new Audio('sounds/click.wav');
    const correctSound = new Audio('sounds/correct.wav');
    const incorrectSound = new Audio('sounds/incorrect.wav');
    // Optional: Add error handling for loading if needed, or volume control
    // clickSound.onerror = () => console.error("Failed to load click sound");
    // correctSound.onerror = () => console.error("Failed to load correct sound");
    // incorrectSound.onerror = () => console.error("Failed to load incorrect sound");

    // --- Game State ---
    let score = 0;
    let currentStreak = 0;
    let highestStreak = 0;
    let timeLeft = 90; // 90 seconds as per PDF
    let timerInterval = null;
    let currentDifficultyLevel = 1;
    let maxLevel = 20; // Final max level
    let selectedCation = null;
    let selectedAnion = null;
    let currentCompound = null;
    let mcqTriesLeft = 2; // 2 tries per MCQ as per PDF (Figure B1)
    let gameHistory = []; // To store attempts for summary
    let currentMCQOptionsArray = []; // Store the options for the current MCQ
    const CORRECT_ANSWERS_TO_LEVEL_UP = 3; // Progress level every 3 correct answers in a row

    // --- Chemistry Data ---
    // Based on PDF Annex B, Appendix B1, Table B5 & B6 (Levels 1-20)
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
    // Greatest Common Divisor function (needed for formula calculation and distractors)
    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

    // --- Game Logic Functions ---

    function getIonDisplay(ion) {
        let chargeDisplay = '';
        if (!ion || typeof ion.charge === 'undefined') return 'Error';
        if (ion.charge > 0) {
            chargeDisplay = ion.charge === 1 ? '+' : `${ion.charge}+`;
        } else if (ion.charge < 0) {
            chargeDisplay = ion.charge === -1 ? '⁻' : `${Math.abs(ion.charge)}⁻`;
        }
        // Handle subscripts in polyatomic symbols
        const symbolHTML = ion.symbol
            .replace(/(\d+)/g, '<sub>$1</sub>') // General subscript handling
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

    function getIonsForLevel(level) {
        const currentLevelDef = levelDefinitions[level];
        if (!currentLevelDef) {
            console.warn(`Level definition not found for level ${level}. Using level ${maxLevel}.`);
            return getIonsForLevel(maxLevel);
        }

        let cations = currentLevelDef.cations.map(id => allIons[id]).filter(Boolean);
        let anions = currentLevelDef.anions.map(id => allIons[id]).filter(Boolean);

        if (cations.length === 0 || anions.length === 0) {
             console.error(`Mapped ions resulted in empty list for level ${level}. Cation IDs: ${currentLevelDef.cations.join(', ')}, Anion IDs: ${currentLevelDef.anions.join(', ')}`);
             return { cations: [], anions: [] };
        }

        return { cations, anions };
    }


    function populateIonGrid() {
        ionGrid.innerHTML = '';
        selectedCation = null;
        selectedAnion = null;
        cationSelectionDisplay.textContent = 'None';
        anionSelectionDisplay.textContent = 'None';
        submitCompoundButton.disabled = true;

        const { cations, anions } = getIonsForLevel(currentDifficultyLevel);

        if (cations.length === 0 || anions.length === 0) {
             console.error(`Cannot populate grid: No ions available for level ${currentDifficultyLevel}.`);
             ionGrid.innerHTML = '<p style="color: red;">Error: Could not load ions for this level. Please restart.</p>';
             if(timerInterval) clearInterval(timerInterval);
             return;
        }

        const currentIons = [...cations, ...anions];
        currentIons.sort(() => Math.random() - 0.5);

        const gridMax = 12; // Reduced grid size to 12 tiles
        const targetCations = Math.min(cations.length, Math.ceil(gridMax / 2)); // Aim for ~6 cations
        const targetAnions = Math.min(anions.length, Math.floor(gridMax / 2)); // Aim for ~6 anions

        let displayTiles = [];
         displayTiles = displayTiles.concat(cations.length > 0 ? cations.sort(() => 0.5 - Math.random()).slice(0, targetCations) : []);
         displayTiles = displayTiles.concat(anions.length > 0 ? anions.sort(() => 0.5 - Math.random()).slice(0, targetAnions) : []);


        let ionPool = [...cations, ...anions].filter(ion => ion && !displayTiles.find(t => t && t.symbol === ion.symbol && t.charge === ion.charge));
        while (displayTiles.length < gridMax && ionPool.length > 0) {
             let ionToAdd = ionPool.splice(Math.floor(Math.random() * ionPool.length), 1)[0];
             if (ionToAdd && !displayTiles.find(t => t && t.symbol === ionToAdd.symbol && t.charge === ionToAdd.charge)) {
                 displayTiles.push(ionToAdd);
             }
        }

         let allLevelIons = [...cations, ...anions];
         while (displayTiles.length < gridMax && allLevelIons.length > 0) {
             displayTiles.push(allLevelIons[Math.floor(Math.random() * allLevelIons.length)]);
         }


        displayTiles.sort(() => Math.random() - 0.5);

        displayTiles.forEach(ion => {
            if (!ion) return;
            const tile = document.createElement('div');
            tile.classList.add('ion-tile', ion.type);
            tile.innerHTML = getIonDisplay(ion);
            tile.dataset.symbol = ion.symbol;
            tile.dataset.charge = ion.charge;
            tile.dataset.isPolyatomic = ion.isPolyatomic;

            tile.addEventListener('click', () => handleTileClick(tile, ion));
            ionGrid.appendChild(tile);
        });
    }

    function handleTileClick(tileElement, ionData) {
        if (tileElement.classList.contains('disabled')) return;
        clickSound.play().catch(e => console.error("Error playing click sound:", e)); // Play click sound

        const isSelected = tileElement.classList.contains('selected');
        const type = ionData.type;

        if (isSelected) {
            tileElement.classList.remove('selected');
            if (type === 'cation') {
                selectedCation = null;
                cationSelectionDisplay.textContent = 'None';
            } else {
                selectedAnion = null;
                anionSelectionDisplay.textContent = 'None';
            }
        } else {
            const previouslySelected = ionGrid.querySelector(`.ion-tile.${type}.selected`);
            if (previouslySelected) {
                previouslySelected.classList.remove('selected');
            }

            tileElement.classList.add('selected');
            if (type === 'cation') {
                selectedCation = ionData;
                cationSelectionDisplay.innerHTML = getIonDisplay(ionData);
            } else {
                selectedAnion = ionData;
                anionSelectionDisplay.innerHTML = getIonDisplay(ionData);
            }
        }

        submitCompoundButton.disabled = !(selectedCation && selectedAnion);
    }

    function calculateFormula(cation, anion) {
        if (!cation || !anion) return "Error";
        const charge1 = Math.abs(cation.charge);
        const charge2 = Math.abs(anion.charge);

        // Use gcd from outer scope
        const commonDivisor = gcd(charge1, charge2);
        const cationSubscript = charge2 / commonDivisor;
        const anionSubscript = charge1 / commonDivisor;

        let cationPart = cation.symbol;
        if (cation.isPolyatomic && cationSubscript > 1) {
            cationPart = `(${cationPart})`;
        }
        if (cationSubscript > 1) {
            cationPart += `<sub>${cationSubscript}</sub>`;
        }

        let anionPart = anion.symbol;
        if (anion.isPolyatomic && anionSubscript > 1) {
            anionPart = `(${anionPart})`;
        }
        if (anionSubscript > 1) {
            anionPart += `<sub>${anionSubscript}</sub>`;
        }

        cationPart = cationPart.replace(/(\d+)/g, '<sub>$1</sub>');
        anionPart = anionPart.replace(/(\d+)/g, '<sub>$1</sub>');


        return cationPart + anionPart;
    }

    function generateCompoundName(cation, anion) {
         if (!cation || !anion) return "Error";
        return `${cation.name} ${anion.name}`;
    }


    function handleSubmitCompound() {
        if (!selectedCation || !selectedAnion) return;

        currentCompound = {
            cation: selectedCation,
            anion: selectedAnion,
            correctFormula: calculateFormula(selectedCation, selectedAnion),
            correctName: generateCompoundName(selectedCation, selectedAnion)
        };

        console.log("Formed Compound:", currentCompound);

        document.querySelectorAll('.ion-tile').forEach(tile => tile.classList.add('disabled'));
        submitCompoundButton.disabled = true;

        setupMCQ();
        gameArea.classList.add('hidden');
        mcqArea.classList.remove('hidden');
    }

    function setupMCQ() {
        mcqTriesLeft = 2;
        feedbackArea.textContent = '';
        feedbackArea.className = 'feedback-area';
        triesLeftDisplay.textContent = `Tries left: ${mcqTriesLeft}`;
        formedCompoundDisplay.innerHTML = `Selected: ${getIonDisplay(currentCompound.cation)} + ${getIonDisplay(currentCompound.anion)}`;

        const askForName = Math.random() < 0.5;
        mcqQuestion.textContent = askForName ? "What is the NAME of this compound?" : "What is the FORMULA of this compound?";

        const correctAnswer = askForName ? currentCompound.correctName : currentCompound.correctFormula;
        currentMCQOptionsArray = generateMCQOptions(correctAnswer, askForName);

        mcqOptions.innerHTML = '';
        currentMCQOptionsArray.forEach(option => {
            const button = document.createElement('button');
            button.innerHTML = option;
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

        if (isNameQuestion) {
            // --- Name Distractors ---
            let anionElementName = anion.symbol.replace(/[\d()]/g, '');
             if (anionElementName === 'F') anionElementName = 'Fluorine';
             else if (anionElementName === 'Cl') anionElementName = 'Chlorine';
             else if (anionElementName === 'Br') anionElementName = 'Bromine';
             else if (anionElementName === 'I') anionElementName = 'Iodine';
             else if (anionElementName === 'O') anionElementName = 'Oxygen';
             else if (anionElementName === 'S') anionElementName = 'Sulfur';
             else if (anionElementName === 'N') anionElementName = 'Nitrogen';
             else if (anionElementName === 'P') anionElementName = 'Phosphorus';
             else if (anionElementName === 'CN') anionElementName = 'Cyanogen';
             else if (anionElementName === 'SCN') anionElementName = 'Thiocyanogen';

             if (anionElementName !== anion.name && !options.has(`${cation.name} ${anionElementName}`)) {
                 options.add(`${cation.name} ${anionElementName}`);
             }

             if (!options.has(`${anion.name} ${cation.name}`)) {
                options.add(`${anion.name} ${cation.name}`);
             }

            if (cation.variableOS) {
                const nameWithoutNumeral = cation.name.replace(/\(.*\)/, '').trim();
                 if (!options.has(`${nameWithoutNumeral} ${anion.name}`)) {
                    options.add(`${nameWithoutNumeral} ${anion.name}`);
                 }
            }
            if (cation.variableOS && options.size < 4) {
                 const numerals = ['I', 'II', 'III', 'IV'];
                 const currentNumeralIndex = numerals.indexOf(cation.romanNumeral);
                 if (currentNumeralIndex !== -1) {
                     if (currentNumeralIndex + 1 < numerals.length) {
                         const wrongNumeral = numerals[currentNumeralIndex + 1];
                         const wrongName = cation.name.replace(`(${cation.romanNumeral})`, `(${wrongNumeral})`);
                          if (!options.has(wrongName + ` ${anion.name}`)) {
                             options.add(wrongName + ` ${anion.name}`);
                          }
                     }
                     if (options.size < 4 && currentNumeralIndex - 1 >= 0) {
                         const wrongNumeral = numerals[currentNumeralIndex - 1];
                         const wrongName = cation.name.replace(`(${cation.romanNumeral})`, `(${wrongNumeral})`);
                          if (!options.has(wrongName + ` ${anion.name}`)) {
                             options.add(wrongName + ` ${anion.name}`);
                          }
                     }
                 }
            }
            if (anion.isPolyatomic && anion.name.endsWith('ate') && options.size < 4) {
                const iteName = anion.name.replace('ate', 'ite');
                 if (!options.has(`${cation.name} ${iteName}`)) {
                    options.add(`${cation.name} ${iteName}`);
                 }
            }
             if (anion.isPolyatomic && anion.name.endsWith('ite') && options.size < 4) {
                const ateName = anion.name.replace('ite', 'ate');
                 if (!options.has(`${cation.name} ${ateName}`)) {
                    options.add(`${cation.name} ${ateName}`);
                 }
            }
             if (anion.isPolyatomic && anion.name === 'Cyanide' && options.size < 4) {
                 if (!options.has(`${cation.name} Cyanate`)) { options.add(`${cation.name} Cyanate`); }
             }


        } else { // --- Formula Distractors ---
            if (correctAnswer !== `${cation.symbol}${anion.symbol}`) {
                 options.add(`${cation.symbol}${anion.symbol}`);
            }

             let swappedFormula = `${cation.symbol}<sub>${anionCharge}</sub>${anion.symbol}<sub>${cationCharge}</sub>`;
             if (cation.isPolyatomic && anionCharge > 1) swappedFormula = `(${cation.symbol})<sub>${anionCharge}</sub>${anion.symbol}<sub>${cationCharge}</sub>`;
             if (anion.isPolyatomic && cationCharge > 1) swappedFormula = `${cation.symbol}<sub>${anionCharge}</sub>(${anion.symbol})<sub>${cationCharge}</sub>`;
             if (cation.isPolyatomic && anionCharge > 1 && anion.isPolyatomic && cationCharge > 1) swappedFormula = `(${cation.symbol})<sub>${anionCharge}</sub>(${anion.symbol})<sub>${cationCharge}</sub>`;
             swappedFormula = swappedFormula.replace(/(\d+)/g, '<sub>$1</sub>');

             if (correctAnswer !== swappedFormula && (anionCharge > 1 || cationCharge > 1)) {
                 options.add(swappedFormula);
             }

            // Reversed Formula - Use correct charges from this scope
            let reversedCationPart = cation.symbol;
            let cationSubValRev = anionCharge / gcd(cationCharge, anionCharge); // Corrected calculation
            if (cation.isPolyatomic && cationSubValRev > 1) reversedCationPart = `(${cation.symbol})`;
            if (cationSubValRev > 1) reversedCationPart += `<sub>${cationSubValRev}</sub>`;

            let reversedAnionPart = anion.symbol;
            let anionSubValRev = cationCharge / gcd(cationCharge, anionCharge); // Corrected calculation
            if (anion.isPolyatomic && anionSubValRev > 1) reversedAnionPart = `(${anion.symbol})`;
            if (anionSubValRev > 1) reversedAnionPart += `<sub>${anionSubValRev}</sub>`;

            reversedCationPart = reversedCationPart.replace(/(\d+)/g, '<sub>$1</sub>');
            reversedAnionPart = reversedAnionPart.replace(/(\d+)/g, '<sub>$1</sub>');
            let reversedFormula = reversedAnionPart + reversedCationPart;

             if (correctAnswer !== reversedFormula) {
                options.add(reversedFormula);
             }


            let formulaWithOnes = cation.symbol;
            if (cationCharge === 1 && anionCharge === 1) {
                 formulaWithOnes += `<sub>1</sub>${anion.symbol}<sub>1</sub>`;
                 formulaWithOnes = formulaWithOnes.replace(/(\d+)/g, '<sub>$1</sub>');
                 if (correctAnswer !== formulaWithOnes) {
                     options.add(formulaWithOnes);
                 }
            }

            const cationSubVal = anionCharge / gcd(cationCharge, anionCharge); // Corrected calculation
            const anionSubVal = cationCharge / gcd(cationCharge, anionCharge); // Corrected calculation
            if (anion.isPolyatomic && anionSubVal > 1) {
                let formulaWithoutParen = calculateFormula(cation, { ...anion, isPolyatomic: false });
                 if (correctAnswer !== formulaWithoutParen && !options.has(formulaWithoutParen)) {
                    options.add(formulaWithoutParen);
                 }
            }
             if (cation.isPolyatomic && cationSubVal > 1) {
                let formulaWithoutParen = calculateFormula({ ...cation, isPolyatomic: false }, anion);
                 if (correctAnswer !== formulaWithoutParen && !options.has(formulaWithoutParen)) {
                    options.add(formulaWithoutParen);
                 }
            }


             let lowerCaseFormula = correctAnswer.toLowerCase();
             if (correctAnswer !== lowerCaseFormula && !options.has(lowerCaseFormula)) {
                 options.add(lowerCaseFormula);
             }
        }

        // No placeholders added


        const optionsArray = Array.from(options);
        while (optionsArray.length > 4) {
            optionsArray.splice(Math.floor(Math.random() * optionsArray.length), 1);
        }
        optionsArray.sort(() => Math.random() - 0.5);
        return optionsArray;
    }

    function handleMCQAnswer(selectedAnswer, correctAnswer, buttonElement, isNameQuestion) {
        clickSound.play().catch(e => console.error("Error playing click sound:", e)); // Play click sound on answer attempt

        const isCorrect = selectedAnswer === correctAnswer;
        let feedbackText = '';
        let isFinalAttempt = (mcqTriesLeft === 1);

        if (mcqTriesLeft === 2 && !isCorrect) {
            mcqTriesLeft--;
            triesLeftDisplay.textContent = `Tries left: ${mcqTriesLeft}`;
            buttonElement.classList.add('incorrect');
            buttonElement.disabled = true;
            feedbackArea.className = 'feedback-area incorrect';
            incorrectSound.play().catch(e => console.error("Error playing incorrect sound:", e)); // Play incorrect sound

             if (isNameQuestion) {
                 if (selectedAnswer.startsWith(currentCompound.anion.name)) feedbackText = "Incorrect. Remember, the cation name comes first.";
                 else if (currentCompound.cation.variableOS && !/\(\w+\)/.test(selectedAnswer)) feedbackText = "Incorrect. Remember to include the Roman numeral for variable charge metals.";
                 else if (currentCompound.anion.isPolyatomic && (selectedAnswer.endsWith('ide') && !currentCompound.anion.name.endsWith('ide'))) feedbackText = "Incorrect. Check the ending for polyatomic ions.";
                 else if (!currentCompound.anion.isPolyatomic && !selectedAnswer.endsWith('ide')) feedbackText = "Incorrect. Check the ending for simple monatomic anions.";
                 else feedbackText = "Incorrect. Review the naming rules.";
            } else { // Formula question
                 if (selectedAnswer.includes('<sub>1</sub>')) feedbackText = "Incorrect. Subscript '1' is usually omitted.";
                 else if (selectedAnswer.startsWith(currentCompound.anion.symbol.replace(/<sub>\d+<\/sub>/g, ''))) feedbackText = "Incorrect. The cation symbol comes first.";
                 else if (selectedAnswer === `${currentCompound.cation.symbol}${currentCompound.anion.symbol}` && correctAnswer !== selectedAnswer) feedbackText = "Incorrect. Check ion charges for the ratio.";
                 else if ( (currentCompound.anion.isPolyatomic && (Math.abs(currentCompound.cation.charge) / gcd(Math.abs(currentCompound.cation.charge), Math.abs(currentCompound.anion.charge))) > 1 && !/[\(\)]/.test(selectedAnswer) ) || (currentCompound.cation.isPolyatomic && (Math.abs(currentCompound.anion.charge) / gcd(Math.abs(currentCompound.cation.charge), Math.abs(currentCompound.anion.charge))) > 1 && !/[\(\)]/.test(selectedAnswer) ) ) feedbackText = "Incorrect. Remember parentheses for multiple polyatomic ions.";
                 else feedbackText = "Incorrect. Check charges and neutrality.";
            }
            feedbackText += ` Try again! (${mcqTriesLeft} left)`;
            feedbackArea.innerHTML = feedbackText;
            return;
        }

        mcqOptions.querySelectorAll('button').forEach(btn => btn.disabled = true);

        if (isCorrect) {
            feedbackText = "Correct!";
            feedbackArea.className = 'feedback-area correct';
            buttonElement.classList.remove('incorrect');
            buttonElement.classList.add('correct');
            correctSound.play().catch(e => console.error("Error playing correct sound:", e)); // Play correct sound
            updateScore(true);
            gameHistory.push({ compound: currentCompound, correct: true, attempt: selectedAnswer });
            setTimeout(nextRound, 1000);
        } else {
            feedbackArea.className = 'feedback-area incorrect';
            buttonElement.classList.add('incorrect'); // Ensure the final clicked is marked incorrect
            incorrectSound.play().catch(e => console.error("Error playing incorrect sound:", e)); // Play incorrect sound

            // Create a temporary element to safely get text content from HTML answer
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = correctAnswer; // Put HTML into temp element
            const correctAnswerText = tempDiv.textContent || tempDiv.innerText || ""; // Extract plain text

            feedbackText = `Incorrect. The correct answer was: ${correctAnswerText}`; // Construct feedback with plain text
            updateScore(false);
            gameHistory.push({ compound: currentCompound, correct: false, attempt: selectedAnswer });
            mcqOptions.querySelectorAll('button').forEach(btn => {
                // Highlight the correct button even if the displayed text is different (due to HTML)
                const tempBtnDiv = document.createElement('div');
                tempBtnDiv.innerHTML = btn.innerHTML;
                const btnText = tempBtnDiv.textContent || tempBtnDiv.innerText || "";
                const correctAnsDiv = document.createElement('div');
                correctAnsDiv.innerHTML = correctAnswer;
                const correctAnsText = correctAnsDiv.textContent || correctAnsDiv.innerText || "";

                if (btn.innerHTML === correctAnswer || btnText === correctAnsText) { // Compare both HTML and text content
                    btn.classList.add('correct');
                }
            });
            setTimeout(nextRound, 2000);
            // Set the feedback area content using the plain text version
            feedbackArea.textContent = feedbackText; // Use textContent to avoid HTML parsing issues
            return; // Exit early as feedback is set for this case
        }

        // Only set feedbackArea.innerHTML here if it wasn't the final incorrect attempt or the first incorrect try
        feedbackArea.innerHTML = feedbackText; // This handles the "Correct!" case and the first incorrect try hint
    } // End of handleMCQAnswer function


     function updateScore(correct) {
        if (correct) {
            const points = currentDifficultyLevel; // Score increases by level number (was 10 * level)
            score += points;
            currentStreak++;
            if (currentStreak > highestStreak) {
                highestStreak = currentStreak;
            }

            // Check for level up condition
            if (currentStreak > 0 && currentStreak % CORRECT_ANSWERS_TO_LEVEL_UP === 0) {
                if (currentDifficultyLevel === maxLevel) {
                    // Reached level up condition on the final level - Game Complete!
                    showLevel20CompleteScreen(); // Call the new function
                    return; // Stop further processing in updateScore for this case
                } else if (currentDifficultyLevel < maxLevel) {
                    // Normal level up
                    currentDifficultyLevel++;
                    difficultyLevelDisplay.textContent = `Level: ${currentDifficultyLevel}`;
                    console.log(`Level Up! Reached Level ${currentDifficultyLevel}`);
                    populateIonGrid();
                }
            }

        } else {
            currentStreak = 0;
        }
        scoreDisplay.textContent = `Score: ${score}`;
        streakDisplay.textContent = `Streak: ${currentStreak}`;
    }

    function nextRound() {
        selectedCation = null;
        selectedAnion = null;
        currentCompound = null;
        cationSelectionDisplay.textContent = 'None';
        anionSelectionDisplay.textContent = 'None';
        submitCompoundButton.disabled = true;

        mcqArea.classList.add('hidden');
        gameArea.classList.remove('hidden');

        // Only re-enable if grid wasn't repopulated
        if (currentStreak === 0 || currentStreak % CORRECT_ANSWERS_TO_LEVEL_UP !== 0) {
             document.querySelectorAll('.ion-tile').forEach(tile => {
                 tile.classList.remove('disabled', 'selected');
             });
        } // Else: Grid was repopulated by level up

    }


    function startGame() {
        score = 0;
        currentStreak = 0;
        highestStreak = 0;
        timeLeft = 90;
        currentDifficultyLevel = 1;
        gameHistory = [];

        scoreDisplay.textContent = `Score: ${score}`;
        streakDisplay.textContent = `Streak: ${currentStreak}`;
        difficultyLevelDisplay.textContent = `Level: ${currentDifficultyLevel}`;
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        gameSummary.classList.add('hidden');
        mcqArea.classList.add('hidden');
        level20CompleteScreen.classList.add('hidden'); // Hide level 20 screen on restart
        gameArea.classList.remove('hidden');

        populateIonGrid();
        startTimer();
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time: ${timeLeft}s`;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(timerInterval);
        timerDisplay.textContent = "Time's up!";

        gameArea.classList.add('hidden');
        mcqArea.classList.add('hidden');
        level20CompleteScreen.classList.add('hidden'); // Hide level 20 screen if timer runs out
        gameSummary.classList.remove('hidden'); // Show regular game over screen

        finalScoreDisplay.textContent = score;
        highestStreakDisplay.textContent = highestStreak;

        summaryList.innerHTML = '';
        gameHistory.forEach(item => {
            const li = document.createElement('li');
            li.classList.add(item.correct ? 'correct' : 'incorrect');
            li.innerHTML = `Attempted: ${getIonDisplay(item.compound.cation)} + ${getIonDisplay(item.compound.anion)} → 
                            ${item.correct ? item.compound.correctFormula : `<s>${item.attempt}</s> (${item.compound.correctFormula})`} / 
                            ${item.correct ? item.compound.correctName : `<s>${item.attempt}</s> (${item.compound.correctName})`}`;
            summaryList.appendChild(li);
        });
    }

    function showLevel20CompleteScreen() {
        clearInterval(timerInterval); // Stop the timer
        timerDisplay.textContent = "Finished!"; // Update timer display

        gameArea.classList.add('hidden');
        mcqArea.classList.add('hidden');
        gameSummary.classList.add('hidden'); // Ensure regular summary is hidden too
        level20CompleteScreen.classList.remove('hidden'); // Show the completion screen

        finalScoreL20Display.textContent = score; // Display final score
        highestStreakL20Display.textContent = highestStreak; // Display highest streak

        // Optional: Play a victory sound?
        // victorySound.play().catch(e => console.error("Error playing victory sound:", e));
    }

    // --- Level Change Functions ---
    function decreaseLevel() {
        if (currentDifficultyLevel > 1) {
            currentDifficultyLevel--;
            difficultyLevelDisplay.textContent = `Level: ${currentDifficultyLevel}`;
            populateIonGrid(); // Refresh grid for new level
            clickSound.play().catch(e => console.error("Error playing click sound:", e));
        }
    }

    function increaseLevel() {
        if (currentDifficultyLevel < maxLevel) {
            currentDifficultyLevel++;
            difficultyLevelDisplay.textContent = `Level: ${currentDifficultyLevel}`;
            populateIonGrid(); // Refresh grid for new level
            clickSound.play().catch(e => console.error("Error playing click sound:", e));
        }
    }

    // --- Event Listeners ---
    submitCompoundButton.addEventListener('click', handleSubmitCompound);
    restartButton.addEventListener('click', startGame); // Listener for regular game over screen
    restartButtonL20.addEventListener('click', startGame); // Listener for level 20 complete screen
    levelDownButton.addEventListener('click', decreaseLevel);
    levelUpButton.addEventListener('click', increaseLevel);

    // --- Initial Game Start ---
    startGame();

});
