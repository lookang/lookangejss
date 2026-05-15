// Acid-Base Indicator Testing Lab Simulation
// This script manages the interactive laboratory simulation for testing pH using various indicators

class IndicatorLab {
    constructor() {
        // Initialize lab state and data
        this.selectedSubstance = null;
        this.selectedIndicator = null;
        this.selectedTestTube = null;
        this.testTubes = [];
        this.results = {};
        
        // Substance properties with pH values and indicator responses
        this.substances = {
            'hcl': { name: 'HCl', ph: 1, nature: 'Strong Acid', color: '#ff4444' },
            'lemon': { name: 'Lemon Juice', ph: 2, nature: 'Weak Acid', color: '#ffff44' },
            'vinegar': { name: 'Vinegar', ph: 2.5, nature: 'Weak Acid', color: '#fff8dc' },
            'water': { name: 'Water', ph: 7, nature: 'Neutral', color: '#e8f4f8' },
            'baking': { name: 'Baking Soda', ph: 9, nature: 'Weak Base', color: '#e6ffe6' },
            'soap': { name: 'Soap', ph: 10, nature: 'Weak Base', color: '#e6f3ff' },
            'unknown': { name: 'Unknown X', ph: 8.5, nature: 'Weak Base', color: '#f0e6ff' }
        };
        
        // Indicator color responses based on pH
        this.indicatorColors = {
            'universal': {
                1: '#ff0000', 2: '#ff4500', 2.5: '#ffa500', 7: '#00ff00', 
                8.5: '#00ffff', 9: '#0080ff', 10: '#0000ff'
            },
            'litmus': {
                1: '#ff6b6b', 2: '#ff6b6b', 2.5: '#ff6b6b', 7: '#9b59b6', 
                8.5: '#4ecdc4', 9: '#4ecdc4', 10: '#4ecdc4'
            },
            'phenolphthalein': {
                1: 'transparent', 2: 'transparent', 2.5: 'transparent', 7: 'transparent', 
                8.5: '#ff69b4', 9: '#ff69b4', 10: '#ff1493'
            },
            'methyl': {
                1: '#ff4757', 2: '#ff4757', 2.5: '#ff6b6b', 7: '#ffa502', 
                8.5: '#ffa502', 9: '#ffa502', 10: '#ffa502'
            }
        };
        
        this.init();
    }
    
    init() {
        this.createTestTubes();
        this.bindEvents();
        this.initializeResultsTable();
        this.showInstructions();
    }
    
    // Create test tubes in the rack
    createTestTubes() {
        const container = document.getElementById('testTubesContainer');
        container.innerHTML = '';
        
        // Create 8 test tubes for experiments
        for (let i = 0; i < 8; i++) {
            const testTube = document.createElement('div');
            testTube.className = 'test-tube';
            testTube.dataset.tubeId = i;
            testTube.title = `Test Tube ${i + 1} - Click to select`;
            
            // Add click event for test tube selection
            testTube.addEventListener('click', () => this.selectTestTube(i));
            
            container.appendChild(testTube);
            this.testTubes.push({
                element: testTube,
                substance: null,
                indicator: null,
                tested: false
            });
        }
    }
    
    // Bind all event listeners
    bindEvents() {
        // Substance bottle selection
        document.querySelectorAll('.substance').forEach(bottle => {
            bottle.addEventListener('click', (e) => {
                this.selectSubstance(e.target.closest('.bottle').dataset.substance);
            });
        });
        
        // Indicator bottle selection
        document.querySelectorAll('[data-indicator]').forEach(bottle => {
            bottle.addEventListener('click', (e) => {
                this.selectIndicator(e.target.closest('.bottle').dataset.indicator);
            });
        });
        
        // Control buttons
        document.getElementById('hintBtn').addEventListener('click', () => this.showHints());
        document.getElementById('zoomBtn').addEventListener('click', () => this.showZoom());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetLab());
        
        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }
    
    // Select a substance from the shelf
    selectSubstance(substance) {
        // Clear previous selections
        document.querySelectorAll('.substance').forEach(bottle => {
            bottle.classList.remove('selected');
        });
        
        // Select new substance
        document.querySelector(`[data-substance="${substance}"]`).classList.add('selected');
        this.selectedSubstance = substance;
        
        // Add substance to selected test tube if one is selected
        if (this.selectedTestTube !== null) {
            this.addSubstanceToTube();
        }
        
        this.updateInstructions();
    }
    
    // Select an indicator from the shelf
    selectIndicator(indicator) {
        // Clear previous selections
        document.querySelectorAll('[data-indicator]').forEach(bottle => {
            bottle.classList.remove('selected');
        });
        
        // Select new indicator
        document.querySelector(`[data-indicator="${indicator}"]`).classList.add('selected');
        this.selectedIndicator = indicator;
        
        // Add indicator to test tube if substance is already added
        if (this.selectedTestTube !== null && this.testTubes[this.selectedTestTube].substance) {
            this.addIndicatorToTube();
        }
        
        this.updateInstructions();
    }
    
    // Select a test tube from the rack
    selectTestTube(tubeId) {
        // Clear previous selections
        document.querySelectorAll('.test-tube').forEach(tube => {
            tube.classList.remove('selected');
        });
        
        // Select new test tube
        this.testTubes[tubeId].element.classList.add('selected');
        this.selectedTestTube = tubeId;
        
        // Update pH display if tube has been tested
        if (this.testTubes[tubeId].tested) {
            this.updatePHDisplay(tubeId);
        } else {
            this.clearPHDisplay();
        }
        
        this.updateInstructions();
    }
    
    // Add selected substance to the selected test tube
    addSubstanceToTube() {
        if (this.selectedTestTube === null || !this.selectedSubstance) return;
        
        const tube = this.testTubes[this.selectedTestTube];
        const substance = this.substances[this.selectedSubstance];
        
        // Add substance to tube
        tube.substance = this.selectedSubstance;
        tube.element.classList.add('has-substance');
        tube.element.style.setProperty('--substance-color', substance.color);
        tube.element.style.background = `linear-gradient(to bottom, transparent 60%, ${substance.color} 100%)`;
        
        // Update tooltip
        tube.element.title = `Test Tube ${this.selectedTestTube + 1} - Contains ${substance.name}`;
        
        this.updateInstructions();
    }
    
    // Add selected indicator to test tube and perform the test
    addIndicatorToTube() {
        if (this.selectedTestTube === null || !this.selectedIndicator || !this.testTubes[this.selectedTestTube].substance) return;
        
        const tube = this.testTubes[this.selectedTestTube];
        const substance = this.selectedSubstance;
        const indicator = this.selectedIndicator;
        
        // Perform the test with animation
        tube.element.classList.add('tested');
        tube.indicator = indicator;
        tube.tested = true;
        
        // Get the color change based on substance pH and indicator
        const ph = this.substances[substance].ph;
        const resultColor = this.indicatorColors[indicator][ph];
        
        // Animate color change
        setTimeout(() => {
            tube.element.style.background = `linear-gradient(to bottom, transparent 40%, ${resultColor} 100%)`;
            tube.element.classList.remove('tested');
        }, 400);
        
        // Update displays and record results
        this.updatePHDisplay(this.selectedTestTube);
        this.recordResult(substance, indicator, resultColor, ph);
        
        // Clear selections for next test
        this.clearSelections();
        this.updateInstructions();
    }
    
    // Update the digital pH display
    updatePHDisplay(tubeId) {
        const tube = this.testTubes[tubeId];
        if (!tube.substance) return;
        
        const substance = this.substances[tube.substance];
        document.getElementById('phReading').textContent = substance.ph.toFixed(1);
        document.getElementById('phNature').textContent = substance.nature;
        
        // Color code the display
        const phReading = document.getElementById('phReading');
        if (substance.ph < 7) {
            phReading.style.color = '#ff4444';
        } else if (substance.ph > 7) {
            phReading.style.color = '#4444ff';
        } else {
            phReading.style.color = '#44ff44';
        }
    }
    
    // Clear pH display
    clearPHDisplay() {
        document.getElementById('phReading').textContent = '-.-';
        document.getElementById('phNature').textContent = 'Select a test tube';
        document.getElementById('phReading').style.color = '#2196F3';
    }
    
    // Record test results in the table
    recordResult(substance, indicator, color, ph) {
        const substanceName = this.substances[substance].name;
        const nature = this.substances[substance].nature;
        
        // Initialize result object if not exists
        if (!this.results[substance]) {
            this.results[substance] = {
                name: substanceName,
                universal: '-',
                litmus: '-',
                phenolphthalein: '-',
                methyl: '-',
                ph: ph,
                nature: nature
            };
        }
        
        // Update specific indicator result
        this.results[substance][indicator] = color;
        
        this.updateResultsTable();
    }
    
    // Update the results table display
    updateResultsTable() {
        const tbody = document.querySelector('#resultsTable tbody');
        tbody.innerHTML = '';
        
        Object.keys(this.results).forEach(substance => {
            const result = this.results[substance];
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${result.name}</td>
                <td><div style="width:20px;height:20px;background:${result.universal};border:1px solid #ccc;margin:0 auto;border-radius:3px;"></div></td>
                <td><div style="width:20px;height:20px;background:${result.litmus};border:1px solid #ccc;margin:0 auto;border-radius:3px;"></div></td>
                <td><div style="width:20px;height:20px;background:${result.phenolphthalein};border:1px solid #ccc;margin:0 auto;border-radius:3px;"></div></td>
                <td><div style="width:20px;height:20px;background:${result.methyl};border:1px solid #ccc;margin:0 auto;border-radius:3px;"></div></td>
                <td>${result.ph}</td>
                <td>${result.nature}</td>
            `;
            
            tbody.appendChild(row);
        });
    }
    
    // Initialize empty results table
    initializeResultsTable() {
        const tbody = document.querySelector('#resultsTable tbody');
        tbody.innerHTML = '<tr><td colspan="7">No tests performed yet</td></tr>';
    }
    
    // Clear all selections
    clearSelections() {
        document.querySelectorAll('.bottle').forEach(bottle => {
            bottle.classList.remove('selected');
        });
        this.selectedSubstance = null;
        this.selectedIndicator = null;
    }
    
    // Show hint modal
    showHints() {
        document.getElementById('hintModal').style.display = 'block';
    }
    
    // Show zoom modal for detailed observation
    showZoom() {
        if (this.selectedTestTube !== null && this.testTubes[this.selectedTestTube].tested) {
            const tube = this.testTubes[this.selectedTestTube];
            const substance = this.substances[tube.substance];
            const color = this.indicatorColors[tube.indicator][substance.ph];
            
            const magnifiedTube = document.querySelector('.tube-zoom');
            magnifiedTube.style.background = `linear-gradient(to bottom, transparent 40%, ${color} 100%)`;
            
            document.getElementById('zoomModal').style.display = 'block';
        } else {
            alert('Please select a tested tube to zoom in!');
        }
    }
    
    // Reset the entire lab
    resetLab() {
        if (confirm('Are you sure you want to reset all tests?')) {
            // Clear all test tubes
            this.testTubes.forEach(tube => {
                tube.element.className = 'test-tube';
                tube.element.style.background = 'linear-gradient(to bottom, transparent 0%, #e8f4f8 100%)';
                tube.substance = null;
                tube.indicator = null;
                tube.tested = false;
            });
            
            // Clear selections and displays
            this.clearSelections();
            this.clearPHDisplay();
            this.selectedTestTube = null;
            this.results = {};
            
            // Reset results table
            this.initializeResultsTable();
            
            this.updateInstructions();
        }
    }
    
    // Update instruction display based on current state
    updateInstructions() {
        const instructions = document.getElementById('instructions');
        let step = 1;
        let text = '';
        
        if (!this.selectedTestTube) {
            text = '1. Select a clean test tube from the rack';
        } else if (!this.testTubes[this.selectedTestTube].substance) {
            text = '2. Select a substance to add to the test tube';
        } else if (!this.selectedIndicator) {
            text = '3. Select an indicator to test the substance';
        } else {
            text = '4. Click the indicator again to add it to the tube';
        }
        
        instructions.innerHTML = `<p style="font-weight: bold; color: #2196F3;">${text}</p>`;
    }
    
    // Show initial instructions
    showInstructions() {
        this.updateInstructions();
    }
}

// Initialize the lab when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new IndicatorLab();
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function(e) {
    // Enable touch interactions
}, { passive: true });

// Prevent zoom on double tap for better mobile experience
document.addEventListener('touchend', function(e) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

let lastTouchEnd = 0;