// Geometric Distribution Simulation - Main JavaScript File
// This script simulates the memoryless property of geometric distributions through dice rolling

class GeometricSimulation {
    constructor() {
        // Initialize DOM elements and simulation parameters
        this.initializeElements();
        this.initializeEventListeners();
        
        // Simulation data storage
        this.alexData = [];
        this.benData = [];
        this.isRunning = false;
        
        // Histogram visibility toggles - both visible by default
        this.showAlex = true;
        this.showBen = true;
        
        console.log('Geometric Distribution Simulation initialized');
    }
    
    // Initialize DOM element references
    initializeElements() {
        this.elements = {
            pastFailures: document.getElementById('pastFailures'),
            pastFailuresValue: document.getElementById('pastFailuresValue'),
            numTrials: document.getElementById('numTrials'),
            runSimulation: document.getElementById('runSimulation'),
            resetSimulation: document.getElementById('resetSimulation'),
            
            // Player stats elements
            alexAvg: document.getElementById('alexAvg'),
            alexProb: document.getElementById('alexProb'),
            benAvg: document.getElementById('benAvg'),
            benProb: document.getElementById('benProb'),
            benFailures: document.getElementById('benFailures'),
            
            // Dice displays
            alexDice: document.getElementById('alexDice'),
            benDice: document.getElementById('benDice'),
            
            // Progress elements
            progressFill: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText'),
            
            // Combined histogram canvas and toggle controls
            combinedHistogram: document.getElementById('combinedHistogram'),
            alexToggle: document.getElementById('alexToggle'),
            benToggle: document.getElementById('benToggle')
        };
    }
    
    // Set up event listeners for user interactions
    initializeEventListeners() {
        // Slider for past failures
        this.elements.pastFailures.addEventListener('input', (e) => {
            const value = e.target.value;
            this.elements.pastFailuresValue.textContent = value;
            this.elements.benFailures.textContent = value;
            this.updateProbabilities();
        });
        
        // Run simulation button
        this.elements.runSimulation.addEventListener('click', () => {
            if (!this.isRunning) {
                this.runSimulation();
            }
        });
        
        // Reset simulation button
        this.elements.resetSimulation.addEventListener('click', () => {
            this.resetSimulation();
        });
        
        // Toggle controls for histogram visibility
        this.elements.alexToggle.addEventListener('change', (e) => {
            this.showAlex = e.target.checked;
            this.drawCombinedHistogram(); // Redraw histogram with updated visibility
        });
        
        this.elements.benToggle.addEventListener('change', (e) => {
            this.showBen = e.target.checked;
            this.drawCombinedHistogram(); // Redraw histogram with updated visibility
        });
        
        // Initialize display
        this.updateProbabilities();
    }
    
    // Update probability displays (always 1/6 for geometric distribution)
    updateProbabilities() {
        // The key insight: probability is always 1/6 regardless of past failures
        this.elements.alexProb.textContent = '1/6 ≈ 0.167';
        this.elements.benProb.textContent = '1/6 ≈ 0.167';
    }
    
    // Simulate a single geometric random variable (rolls until first 6)
    simulateGeometric() {
        let rolls = 0;
        while (Math.random() > 1/6) {
            rolls++;
        }
        return rolls + 1; // Add 1 for the successful roll
    }
    
    // Run the main simulation
    async runSimulation() {
        this.isRunning = true;
        this.elements.runSimulation.disabled = true;
        this.elements.runSimulation.textContent = 'Running...';
        
        // Add running animation to dice
        this.elements.alexDice.parentElement.classList.add('running');
        this.elements.benDice.parentElement.classList.add('running');
        
        const numTrials = parseInt(this.elements.numTrials.value);
        const pastFailures = parseInt(this.elements.pastFailures.value);
        
        // Clear previous data
        this.alexData = [];
        this.benData = [];
        
        // Update progress
        this.elements.progressText.textContent = `Running ${numTrials} trials...`;
        
        // Run simulations in batches to allow UI updates
        const batchSize = Math.min(100, numTrials);
        const numBatches = Math.ceil(numTrials / batchSize);
        
        for (let batch = 0; batch < numBatches; batch++) {
            const currentBatchSize = Math.min(batchSize, numTrials - batch * batchSize);
            
            // Run batch of simulations
            for (let i = 0; i < currentBatchSize; i++) {
                // Alex starts fresh - total rolls until first 6
                const alexRolls = this.simulateGeometric();
                this.alexData.push(alexRolls);
                
                // Ben has already failed pastFailures times - additional rolls needed
                const benAdditionalRolls = this.simulateGeometric();
                this.benData.push(benAdditionalRolls);
            }
            
            // Update progress
            const progress = ((batch + 1) / numBatches) * 100;
            this.elements.progressFill.style.width = `${progress}%`;
            this.elements.progressText.textContent = 
                `Completed ${Math.min((batch + 1) * batchSize, numTrials)} of ${numTrials} trials`;
            
            // Allow UI to update
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        
        // Calculate and display results
        this.displayResults();
        this.drawCombinedHistogram(); // Draw the combined overlapping histogram
        
        // Reset UI state
        this.isRunning = false;
        this.elements.runSimulation.disabled = false;
        this.elements.runSimulation.textContent = 'Run Simulation';
        this.elements.progressText.textContent = 'Simulation complete!';
        
        // Remove running animation
        this.elements.alexDice.parentElement.classList.remove('running');
        this.elements.benDice.parentElement.classList.remove('running');
        
        console.log(`Simulation completed: ${numTrials} trials`);
    }
    
    // Calculate and display statistical results
    displayResults() {
        if (this.alexData.length === 0) return;
        
        // Calculate averages
        const alexAvg = this.alexData.reduce((sum, val) => sum + val, 0) / this.alexData.length;
        const benAvg = this.benData.reduce((sum, val) => sum + val, 0) / this.benData.length;
        
        // Display results with appropriate precision
        this.elements.alexAvg.textContent = alexAvg.toFixed(2);
        this.elements.benAvg.textContent = benAvg.toFixed(2);
        
        // Update dice displays with random dice faces
        const dicefaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        this.elements.alexDice.textContent = dicefaces[5]; // Show 6 (success)
        this.elements.benDice.textContent = dicefaces[5]; // Show 6 (success)
        
        console.log(`Results - Alex avg: ${alexAvg.toFixed(2)}, Ben avg: ${benAvg.toFixed(2)}`);
    }
    
    // Draw combined overlapping histogram with increased resolution and reduced height
    drawCombinedHistogram() {
        if (this.alexData.length === 0 && this.benData.length === 0) return;
        
        const canvas = this.elements.combinedHistogram;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Determine the range for both datasets combined
        const allData = [...this.alexData, ...this.benData];
        const maxValue = Math.max(...allData);
        const minValue = Math.min(...allData);
        
        // Modified: Increased histogram resolution - more bins for better detail
        const numBins = Math.min(50, Math.max(20, maxValue - minValue + 1)); // Increased from 25 to 50 max bins
        const binWidth = (maxValue - minValue + 1) / numBins;
        
        // Create bins for both datasets
        const alexBins = new Array(numBins).fill(0);
        const benBins = new Array(numBins).fill(0);
        
        // Fill Alex's bins
        this.alexData.forEach(value => {
            const binIndex = Math.min(Math.floor((value - minValue) / binWidth), numBins - 1);
            alexBins[binIndex]++;
        });
        
        // Fill Ben's bins
        this.benData.forEach(value => {
            const binIndex = Math.min(Math.floor((value - minValue) / binWidth), numBins - 1);
            benBins[binIndex]++;
        });
        
        // Find max frequency for scaling
        const maxFreq = Math.max(...alexBins, ...benBins);
        
        // Drawing parameters - Modified: Adjusted for reduced canvas height
        const barWidth = width / numBins;
        const maxBarHeight = height - 30; // Reduced from 40 to 30 for smaller canvas
        
        // Draw Alex's histogram (if enabled)
        if (this.showAlex && this.alexData.length > 0) {
            ctx.fillStyle = 'rgba(40, 167, 69, 0.5)'; // 50% transparent green
            ctx.strokeStyle = 'rgba(40, 167, 69, 0.8)'; // Slightly more opaque border
            ctx.lineWidth = 1;
            
            alexBins.forEach((freq, i) => {
                if (freq > 0) {
                    const barHeight = (freq / maxFreq) * maxBarHeight;
                    const x = i * barWidth;
                    const y = height - 15 - barHeight; // Adjusted for reduced height
                    
                    // Draw bar with transparency
                    ctx.fillRect(x, y, barWidth - 1, barHeight); // Reduced bar spacing for higher resolution
                    ctx.strokeRect(x, y, barWidth - 1, barHeight);
                }
            });
        }
        
        // Draw Ben's histogram (if enabled)
        if (this.showBen && this.benData.length > 0) {
            ctx.fillStyle = 'rgba(253, 126, 20, 0.5)'; // 50% transparent orange
            ctx.strokeStyle = 'rgba(253, 126, 20, 0.8)'; // Slightly more opaque border
            ctx.lineWidth = 1;
            
            benBins.forEach((freq, i) => {
                if (freq > 0) {
                    const barHeight = (freq / maxFreq) * maxBarHeight;
                    const x = i * barWidth;
                    const y = height - 15 - barHeight; // Adjusted for reduced height
                    
                    // Draw bar with transparency
                    ctx.fillRect(x, y, barWidth - 1, barHeight); // Reduced bar spacing for higher resolution
                    ctx.strokeRect(x, y, barWidth - 1, barHeight);
                }
            });
        }
        
        // Draw frequency labels on bars where both datasets have values
        // Modified: Adjusted font size and positioning for reduced height
        ctx.fillStyle = '#333';
        ctx.font = '8px Arial'; // Reduced from 9px to 8px
        ctx.textAlign = 'center';
        
        for (let i = 0; i < numBins; i++) {
            const x = i * barWidth + barWidth/2;
            
            // Show Alex's frequency if visible and has data
            if (this.showAlex && alexBins[i] > 0) {
                const barHeight = (alexBins[i] / maxFreq) * maxBarHeight;
                const y = height - 15 - barHeight;
                if (barHeight > 12) { // Reduced threshold from 15 to 12
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.fillText(alexBins[i].toString(), x - 6, y + 10); // Adjusted positioning
                }
            }
            
            // Show Ben's frequency if visible and has data
            if (this.showBen && benBins[i] > 0) {
                const barHeight = (benBins[i] / maxFreq) * maxBarHeight;
                const y = height - 15 - barHeight;
                if (barHeight > 12) { // Reduced threshold from 15 to 12
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.fillText(benBins[i].toString(), x + 6, y + 10); // Adjusted positioning
                }
            }
        }
        
        // Draw x-axis labels - Modified: Adjusted for higher resolution
        ctx.fillStyle = '#333';
        ctx.font = '9px Arial'; // Slightly smaller font for more labels
        ctx.textAlign = 'center';
        
        // Show x-axis values at regular intervals - adjusted for higher resolution
        const labelStep = Math.max(1, Math.floor(numBins / 12)); // Increased from 10 to 12 for more labels
        for (let i = 0; i < numBins; i += labelStep) {
            const x = i * barWidth + barWidth/2;
            const value = Math.round(minValue + i * binWidth);
            ctx.fillText(value.toString(), x, height - 3); // Adjusted for reduced height
        }
        
        // Draw legend in top-right corner
        this.drawLegend(ctx, width, height);
        
        console.log(`Combined histogram drawn with ${numBins} bins - Alex: ${this.showAlex ? 'visible' : 'hidden'}, Ben: ${this.showBen ? 'visible' : 'hidden'}`);
    }
    
    // Draw legend for the combined histogram - Modified for reduced height
    drawLegend(ctx, width, height) {
        const legendX = width - 120;
        const legendY = 10; // Reduced from 15 to 10
        const legendItemHeight = 16; // Reduced from 20 to 16
        
        ctx.font = '10px Arial'; // Reduced from 11px to 10px
        ctx.textAlign = 'left';
        
        let legendIndex = 0;
        
        // Alex legend item (if visible)
        if (this.showAlex && this.alexData.length > 0) {
            const y = legendY + legendIndex * legendItemHeight;
            
            // Draw color box
            ctx.fillStyle = 'rgba(40, 167, 69, 0.5)';
            ctx.fillRect(legendX, y, 10, 10); // Reduced from 12x12 to 10x10
            ctx.strokeStyle = 'rgba(40, 167, 69, 0.8)';
            ctx.strokeRect(legendX, y, 10, 10);
            
            // Draw text
            ctx.fillStyle = '#333';
            ctx.fillText('Alex (Total)', legendX + 15, y + 8); // Adjusted positioning
            
            legendIndex++;
        }
        
        // Ben legend item (if visible)
        if (this.showBen && this.benData.length > 0) {
            const y = legendY + legendIndex * legendItemHeight;
            
            // Draw color box
            ctx.fillStyle = 'rgba(253, 126, 20, 0.5)';
            ctx.fillRect(legendX, y, 10, 10); // Reduced from 12x12 to 10x10
            ctx.strokeStyle = 'rgba(253, 126, 20, 0.8)';
            ctx.strokeRect(legendX, y, 10, 10);
            
            // Draw text
            ctx.fillStyle = '#333';
            ctx.fillText('Ben (Additional)', legendX + 15, y + 8); // Adjusted positioning
        }
    }
    
    // Reset simulation to initial state
    resetSimulation() {
        // Clear data
        this.alexData = [];
        this.benData = [];
        
        // Reset displays
        this.elements.alexAvg.textContent = '-';
        this.elements.benAvg.textContent = '-';
        this.elements.alexDice.textContent = '🎲';
        this.elements.benDice.textContent = '🎲';
        
        // Reset progress
        this.elements.progressFill.style.width = '0%';
        this.elements.progressText.textContent = 'Ready to simulate';
        
        // Clear combined histogram
        const ctx = this.elements.combinedHistogram.getContext('2d');
        ctx.clearRect(0, 0, this.elements.combinedHistogram.width, this.elements.combinedHistogram.height);
        
        // Reset controls to defaults - Modified: Changed default to 100 trials
        this.elements.pastFailures.value = 10;
        this.elements.pastFailuresValue.textContent = '10';
        this.elements.benFailures.textContent = '10';
        this.elements.numTrials.value = '100'; // Changed from '1000' to '100'
        
        // Reset toggle states to both visible
        this.elements.alexToggle.checked = true;
        this.elements.benToggle.checked = true;
        this.showAlex = true;
        this.showBen = true;
        
        // Remove any running animations
        this.elements.alexDice.parentElement.classList.remove('running');
        this.elements.benDice.parentElement.classList.remove('running');
        
        console.log('Simulation reset to initial state');
    }
}

// Initialize the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing simulation...');
    const simulation = new GeometricSimulation();
    
    // Make simulation globally accessible for debugging
    window.geometricSim = simulation;
});

// Handle window resize for responsive canvas sizing
window.addEventListener('resize', () => {
    // Redraw histogram if data exists
    if (window.geometricSim && window.geometricSim.alexData.length > 0) {
        setTimeout(() => {
            window.geometricSim.drawCombinedHistogram();
        }, 100);
    }
});

// Utility function to generate random dice face for visual feedback
function getRandomDiceFace() {
    const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return faces[Math.floor(Math.random() * 6)];
}

// Educational helper function to explain geometric distribution
function explainGeometricDistribution() {
    return {
        definition: "A geometric distribution models the number of trials needed to get the first success in repeated independent Bernoulli trials.",
        memorylessProperty: "The probability of success on the next trial is always the same, regardless of previous failures.",
        expectedValue: "For a geometric distribution with success probability p, the expected number of trials is 1/p.",
        diceExample: "For a fair die (p = 1/6), the expected number of rolls to get the first 6 is 6."
    };
}