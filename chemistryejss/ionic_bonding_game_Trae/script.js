document.addEventListener('DOMContentLoaded', function() {
    // Game state
    let gameState = {
        score: 0,
        compoundsFormed: 0,
        selectedCation: null,
        selectedAnion: null,
        formedCompounds: []
    };

    // Define ions with their symbols, names, and charges
    const cations = [
        { symbol: 'Li+', name: 'Lithium', charge: 1, color: '#ff9999' },
        { symbol: 'Na+', name: 'Sodium', charge: 1, color: '#ffb380' },
        { symbol: 'K+', name: 'Potassium', charge: 1, color: '#ffcc99' },
        { symbol: 'Mg2+', name: 'Magnesium', charge: 2, color: '#ff8080' },
        { symbol: 'Ca2+', name: 'Calcium', charge: 2, color: '#ff6666' },
        { symbol: 'Al3+', name: 'Aluminum', charge: 3, color: '#ff4d4d' },
        { symbol: 'Fe2+', name: 'Iron(II)', charge: 2, color: '#cc9966' },
        { symbol: 'Fe3+', name: 'Iron(III)', charge: 3, color: '#996633' },
        { symbol: 'Cu+', name: 'Copper(I)', charge: 1, color: '#cc6699' },
        { symbol: 'Cu2+', name: 'Copper(II)', charge: 2, color: '#993366' },
        { symbol: 'Zn2+', name: 'Zinc', charge: 2, color: '#9999ff' },
        { symbol: 'Ag+', name: 'Silver', charge: 1, color: '#c0c0c0' },
        { symbol: 'NH4+', name: 'Ammonium', charge: 1, color: '#ccff99' }
    ];

    const anions = [
        { symbol: 'F-', name: 'Fluoride', charge: -1, color: '#99ff99' },
        { symbol: 'Cl-', name: 'Chloride', charge: -1, color: '#99ffcc' },
        { symbol: 'Br-', name: 'Bromide', charge: -1, color: '#99ccff' },
        { symbol: 'I-', name: 'Iodide', charge: -1, color: '#cc99ff' },
        { symbol: 'O2-', name: 'Oxide', charge: -2, color: '#ff99cc' },
        { symbol: 'S2-', name: 'Sulfide', charge: -2, color: '#ffcc66' },
        { symbol: 'OH-', name: 'Hydroxide', charge: -1, color: '#99ffff' },
        { symbol: 'NO3-', name: 'Nitrate', charge: -1, color: '#ff99ff' },
        { symbol: 'NO2-', name: 'Nitrite', charge: -1, color: '#ffccff' },
        { symbol: 'CO32-', name: 'Carbonate', charge: -2, color: '#ccffcc' },
        { symbol: 'SO42-', name: 'Sulfate', charge: -2, color: '#ffffcc' },
        { symbol: 'PO43-', name: 'Phosphate', charge: -3, color: '#ffddcc' },
        { symbol: 'C2H3O2-', name: 'Acetate', charge: -1, color: '#ddffcc' }
    ];

    // DOM elements
    const cationsList = document.getElementById('cations-list');
    const anionsList = document.getElementById('anions-list');
    const selectedCationElement = document.getElementById('selected-cation');
    const selectedAnionElement = document.getElementById('selected-anion');
    const bondButton = document.getElementById('bond-button');
    const resultMessage = document.getElementById('result-message');
    const compoundsList = document.getElementById('compounds-list');
    const scoreElement = document.getElementById('score');
    const compoundsElement = document.getElementById('compounds');
    const resetButton = document.getElementById('reset-button');
    const helpButton = document.getElementById('help-button');
    const helpModal = document.getElementById('help-modal');
    const closeModalButton = document.querySelector('.close');

    // Initialize the game
    function initGame() {
        renderIons();
        setupEventListeners();
        updateUI();
    }

    // Render ions in their respective containers
    function renderIons() {
        // Render cations
        cationsList.innerHTML = '';
        cations.forEach(cation => {
            const ionElement = createIonElement(cation, 'cation');
            cationsList.appendChild(ionElement);
        });

        // Render anions
        anionsList.innerHTML = '';
        anions.forEach(anion => {
            const ionElement = createIonElement(anion, 'anion');
            anionsList.appendChild(ionElement);
        });
    }

    // Create an ion element
    function createIonElement(ion, type) {
        const ionElement = document.createElement('div');
        ionElement.className = `ion ${type}`;
        ionElement.style.backgroundColor = ion.color;
        ionElement.innerHTML = `
            <div class="ion-symbol">${ion.symbol}</div>
            <div class="ion-name">${ion.name}</div>
            <div class="ion-charge">Charge: ${ion.charge > 0 ? '+' + ion.charge : ion.charge}</div>
        `;

        // Add click event listener
        ionElement.addEventListener('click', () => {
            if (type === 'cation') {
                selectCation(ion);
            } else {
                selectAnion(ion);
            }
        });

        return ionElement;
    }

    // Select a cation
    function selectCation(cation) {
        gameState.selectedCation = cation;
        updateUI();
    }

    // Select an anion
    function selectAnion(anion) {
        gameState.selectedAnion = anion;
        updateUI();
    }

    // Update the UI based on the current game state
    function updateUI() {
        // Update selected ions display
        if (gameState.selectedCation) {
            selectedCationElement.innerHTML = `
                <div class="ion-symbol">${gameState.selectedCation.symbol}</div>
                <div class="ion-name">${gameState.selectedCation.name}</div>
                <div class="ion-charge">Charge: +${gameState.selectedCation.charge}</div>
            `;
            selectedCationElement.style.backgroundColor = gameState.selectedCation.color;
            selectedCationElement.style.borderStyle = 'solid';
        } else {
            selectedCationElement.innerHTML = 'Select a cation';
            selectedCationElement.style.backgroundColor = '#f5f5f5';
            selectedCationElement.style.borderStyle = 'dashed';
        }

        if (gameState.selectedAnion) {
            selectedAnionElement.innerHTML = `
                <div class="ion-symbol">${gameState.selectedAnion.symbol}</div>
                <div class="ion-name">${gameState.selectedAnion.name}</div>
                <div class="ion-charge">Charge: ${gameState.selectedAnion.charge}</div>
            `;
            selectedAnionElement.style.backgroundColor = gameState.selectedAnion.color;
            selectedAnionElement.style.borderStyle = 'solid';
        } else {
            selectedAnionElement.innerHTML = 'Select an anion';
            selectedAnionElement.style.backgroundColor = '#f5f5f5';
            selectedAnionElement.style.borderStyle = 'dashed';
        }

        // Enable/disable bond button
        bondButton.disabled = !(gameState.selectedCation && gameState.selectedAnion);

        // Update score and compounds count
        scoreElement.textContent = gameState.score;
        compoundsElement.textContent = gameState.compoundsFormed;
    }

    // Form a bond between selected ions
    function formBond() {
        if (!gameState.selectedCation || !gameState.selectedAnion) {
            return;
        }

        const cation = gameState.selectedCation;
        const anion = gameState.selectedAnion;

        // Calculate the number of each ion needed for a balanced compound
        const cationCharge = Math.abs(cation.charge);
        const anionCharge = Math.abs(anion.charge);
        
        // Find the least common multiple (LCM) of the charges
        const lcm = findLCM(cationCharge, anionCharge);
        
        // Calculate how many of each ion is needed
        const cationCount = lcm / cationCharge;
        const anionCount = lcm / anionCharge;

        // Create the chemical formula
        let formula = '';
        
        // Add cation to formula
        const cationSymbol = cation.symbol.replace(/\+/g, '');
        if (cationCount === 1) {
            formula += cationSymbol;
        } else {
            formula += cationCount + cationSymbol;
        }
        
        // Add anion to formula
        const anionSymbol = anion.symbol.replace(/\-/g, '');
        if (anionCount === 1) {
            formula += anionSymbol;
        } else {
            formula += anionCount + anionSymbol;
        }

        // Check if this compound has already been formed
        if (gameState.formedCompounds.includes(formula)) {
            resultMessage.textContent = `You've already formed ${formula}. Try a different combination!`;
            resultMessage.className = 'error-message';
            return;
        }

        // Add the compound to the list
        gameState.formedCompounds.push(formula);
        gameState.compoundsFormed++;
        
        // Calculate points based on complexity
        const points = cationCount + anionCount + Math.abs(cation.charge) + Math.abs(anion.charge);
        gameState.score += points;

        // Display success message
        resultMessage.textContent = `Success! You formed ${formula}. +${points} points!`;
        resultMessage.className = 'success-message';

        // Add compound to the compounds list
        const compoundElement = document.createElement('div');
        compoundElement.className = 'compound';
        compoundElement.innerHTML = `
            <div class="compound-formula">${formula}</div>
            <div class="compound-name">${cation.name} ${anion.name}</div>
        `;
        compoundsList.appendChild(compoundElement);

        // Reset selected ions
        gameState.selectedCation = null;
        gameState.selectedAnion = null;

        // Update UI
        updateUI();
    }

    // Find the greatest common divisor (GCD) using Euclidean algorithm
    function findGCD(a, b) {
        return b === 0 ? a : findGCD(b, a % b);
    }

    // Find the least common multiple (LCM)
    function findLCM(a, b) {
        return (a * b) / findGCD(a, b);
    }

    // Reset the game
    function resetGame() {
        gameState = {
            score: 0,
            compoundsFormed: 0,
            selectedCation: null,
            selectedAnion: null,
            formedCompounds: []
        };

        resultMessage.textContent = '';
        resultMessage.className = '';
        compoundsList.innerHTML = '';
        updateUI();
    }

    // Setup event listeners
    function setupEventListeners() {
        bondButton.addEventListener('click', formBond);
        resetButton.addEventListener('click', resetGame);
        
        // Help modal
        helpButton.addEventListener('click', () => {
            helpModal.style.display = 'block';
        });
        
        closeModalButton.addEventListener('click', () => {
            helpModal.style.display = 'none';
        });
        
        window.addEventListener('click', (event) => {
            if (event.target === helpModal) {
                helpModal.style.display = 'none';
            }
        });
    }

    // Initialize the game
    initGame();
});