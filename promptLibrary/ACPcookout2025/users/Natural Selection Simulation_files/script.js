/**
 * Natural Selection Simulation - Educational Game
 * Teaches principles of evolution through interactive population dynamics
 */

class NaturalSelectionSimulation {
    constructor() {
        // Initialize simulation state
        this.isRunning = false;
        this.isPaused = false;
        this.generation = 0;
        this.population = [];
        this.maxPopulation = 20;
        this.currentEnvironment = 'forest';
        this.mutationRate = 0.02;
        this.speed = 5;
        this.generationData = [];
        
        // Statistics tracking
        this.stats = {
            survivors: 0,
            deaths: 0,
            mutations: 0,
            totalGenerations: 0
        };
        
        // Environment configurations
        this.environments = {
            forest: {
                name: 'Forest Environment',
                description: 'Green organisms blend in better, avoiding predators',
                favoredTraits: { color: 'green' },
                survivalModifier: 0.3
            },
            desert: {
                name: 'Desert Environment', 
                description: 'Brown/tan organisms camouflage against sand',
                favoredTraits: { color: 'brown' },
                survivalModifier: 0.3
            },
            arctic: {
                name: 'Arctic Environment',
                description: 'White organisms blend with snow and ice',
                favoredTraits: { color: 'white' },
                survivalModifier: 0.3
            }
        };
        
        // Possible traits for organisms
        this.traits = {
            colors: ['red', 'green', 'blue', 'brown', 'white', 'yellow', 'purple'],
            sizes: ['small', 'medium', 'large']
        };
        
        this.initializeElements();
        this.setupEventListeners();
        this.createInitialPopulation();
        this.updateDisplay();
    }
    
    /**
     * Initialize DOM elements and references
     */
    initializeElements() {
        // Control elements
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.environmentSelect = document.getElementById('environment-select');
        this.speedSlider = document.getElementById('speed-slider');
        this.mutationSlider = document.getElementById('mutation-rate');
        this.mutationDisplay = document.getElementById('mutation-display');
        
        // Display elements
        this.organismGrid = document.getElementById('organism-grid');
        this.generationCount = document.getElementById('generation-count');
        this.populationCount = document.getElementById('population-count');
        this.avgFitness = document.getElementById('avg-fitness');
        this.envTitle = document.getElementById('env-title');
        this.envDescription = document.getElementById('env-description');
        this.environmentDisplay = document.getElementById('environment-display');
        
        // Statistics elements
        this.survivorsCount = document.getElementById('survivors-count');
        this.deathsCount = document.getElementById('deaths-count');
        this.mutationsCount = document.getElementById('mutations-count');
        
        // Chart and tooltip
        this.traitChart = document.getElementById('trait-chart');
        this.chartContext = this.traitChart.getContext('2d');
        this.tooltip = document.getElementById('tooltip');
        
        // Modal elements
        this.resultsModal = document.getElementById('results-modal');
        this.resultsContent = document.getElementById('results-content');
    }
    
    /**
     * Set up all event listeners for user interactions
     */
    setupEventListeners() {
        // Control buttons
        this.startBtn.addEventListener('click', () => this.toggleSimulation());
        this.pauseBtn.addEventListener('click', () => this.pauseSimulation());
        this.resetBtn.addEventListener('click', () => this.resetSimulation());
        
        // Environment and parameter controls
        this.environmentSelect.addEventListener('change', (e) => {
            this.changeEnvironment(e.target.value);
        });
        
        this.speedSlider.addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
        });
        
        this.mutationSlider.addEventListener('input', (e) => {
            this.mutationRate = parseInt(e.target.value) / 100;
            this.mutationDisplay.textContent = `${e.target.value}%`;
        });
        
        // Concept explanations
        document.querySelectorAll('.concept-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
        
        // Tooltip functionality
        this.setupTooltips();
        
        // Modal close functionality
        document.querySelector('.close').addEventListener('click', () => {
            this.resultsModal.style.display = 'none';
        });
        
        // Analyze results button
        document.getElementById('analyze-btn').addEventListener('click', () => {
            this.showAnalysis();
        });
    }
    
    /**
     * Set up tooltip system for educational content
     */
    setupTooltips() {
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target.title, e);
                e.target.removeAttribute('title'); // Prevent default tooltip
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }
    
    /**
     * Show custom tooltip with educational content
     */
    showTooltip(text, event) {
        this.tooltip.textContent = text;
        this.tooltip.classList.add('show');
        
        const rect = event.target.getBoundingClientRect();
        this.tooltip.style.left = `${rect.left + rect.width / 2}px`;
        this.tooltip.style.top = `${rect.top - 40}px`;
        this.tooltip.style.transform = 'translateX(-50%)';
    }
    
    /**
     * Hide tooltip
     */
    hideTooltip() {
        this.tooltip.classList.remove('show');
    }
    
    /**
     * Create initial population with random traits
     */
    createInitialPopulation() {
        this.population = [];
        
        for (let i = 0; i < this.maxPopulation; i++) {
            const organism = this.createOrganism();
            this.population.push(organism);
        }
    }
    
    /**
     * Create a single organism with random or inherited traits
     */
    createOrganism(parent1 = null, parent2 = null) {
        let color, size;
        
        if (parent1 && parent2) {
            // Inherit traits from parents with possible mutation
            color = Math.random() < 0.5 ? parent1.color : parent2.color;
            size = Math.random() < 0.5 ? parent1.size : parent2.size;
            
            // Apply mutations
            if (Math.random() < this.mutationRate) {
                color = this.traits.colors[Math.floor(Math.random() * this.traits.colors.length)];
                this.stats.mutations++;
            }
            
            if (Math.random() < this.mutationRate) {
                size = this.traits.sizes[Math.floor(Math.random() * this.traits.sizes.length)];
                this.stats.mutations++;
            }
        } else {
            // Random traits for initial population
            color = this.traits.colors[Math.floor(Math.random() * this.traits.colors.length)];
            size = this.traits.sizes[Math.floor(Math.random() * this.traits.sizes.length)];
        }
        
        return {
            id: Math.random().toString(36).substr(2, 9),
            color: color,
            size: size,
            fitness: this.calculateFitness(color, size),
            age: 0,
            alive: true
        };
    }
    
    /**
     * Calculate organism fitness based on environment
     */
    calculateFitness(color, size) {
        const env = this.environments[this.currentEnvironment];
        let fitness = 0.5; // Base fitness
        
        // Color advantage in current environment
        if (env.favoredTraits.color === color) {
            fitness += env.survivalModifier;
        }
        
        // Size advantages (medium size is generally optimal)
        if (size === 'medium') {
            fitness += 0.1;
        } else if (size === 'small') {
            fitness += 0.05; // Slight advantage in some scenarios
        }
        
        // Add some randomness to prevent deterministic outcomes
        fitness += (Math.random() - 0.5) * 0.2;
        
        return Math.max(0, Math.min(1, fitness)); // Clamp between 0 and 1
    }
    
    /**
     * Change environment and update organism fitness
     */
    changeEnvironment(newEnvironment) {
        this.currentEnvironment = newEnvironment;
        const env = this.environments[newEnvironment];
        
        // Update environment display
        this.envTitle.textContent = env.name;
        this.envDescription.textContent = env.description;
        this.environmentDisplay.className = `environment-${newEnvironment}`;
        
        // Recalculate fitness for all organisms
        this.population.forEach(organism => {
            organism.fitness = this.calculateFitness(organism.color, organism.size);
        });
        
        this.updateDisplay();
    }
    
    /**
     * Toggle simulation start/stop
     */
    toggleSimulation() {
        if (this.isRunning) {
            this.stopSimulation();
        } else {
            this.startSimulation();
        }
    }
    
    /**
     * Start the simulation
     */
    startSimulation() {
        this.isRunning = true;
        this.isPaused = false;
        this.startBtn.textContent = 'Stop Evolution';
        this.startBtn.style.background = 'linear-gradient(45deg, #dc3545, #e83e8c)';
        
        this.simulationInterval = setInterval(() => {
            if (!this.isPaused) {
                this.runGeneration();
            }
        }, Math.max(100, 1100 - this.speed * 100));
    }
    
    /**
     * Stop the simulation
     */
    stopSimulation() {
        this.isRunning = false;
        this.startBtn.textContent = 'Start Evolution';
        this.startBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
        }
        
        this.showResults();
    }
    
    /**
     * Pause/resume simulation
     */
    pauseSimulation() {
        if (this.isRunning) {
            this.isPaused = !this.isPaused;
            this.pauseBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
        }
    }
    
    /**
     * Reset simulation to initial state
     */
    resetSimulation() {
        this.stopSimulation();
        this.generation = 0;
        this.stats = { survivors: 0, deaths: 0, mutations: 0, totalGenerations: 0 };
        this.generationData = [];
        this.createInitialPopulation();
        this.updateDisplay();
        this.drawChart();
    }
    
    /**
     * Run a single generation of natural selection
     */
    runGeneration() {
        this.generation++;
        this.stats.totalGenerations++;
        
        // Selection phase - determine survivors
        const survivors = this.selectSurvivors();
        this.stats.survivors += survivors.length;
        this.stats.deaths += (this.population.length - survivors.length);
        
        // Reproduction phase - create next generation
        const nextGeneration = this.reproduce(survivors);
        
        // Update population
        this.population = nextGeneration;
        
        // Record generation data for analysis
        this.recordGenerationData();
        
        // Update display
        this.updateDisplay();
        this.drawChart();
        
        // Check for simulation end conditions
        if (this.generation >= 50 || this.population.length === 0) {
            this.stopSimulation();
        }
    }
    
    /**
     * Select survivors based on fitness
     */
    selectSurvivors() {
        const survivors = [];
        
        this.population.forEach(organism => {
            // Survival probability based on fitness
            if (Math.random() < organism.fitness) {
                survivors.push(organism);
            }
        });
        
        // Ensure minimum population survives
        if (survivors.length < 2) {
            const sortedByFitness = [...this.population].sort((a, b) => b.fitness - a.fitness);
            return sortedByFitness.slice(0, Math.max(2, Math.floor(this.population.length * 0.3)));
        }
        
        return survivors;
    }
    
    /**
     * Create next generation through reproduction
     */
    reproduce(survivors) {
        const nextGeneration = [];
        
        // Keep some survivors
        survivors.forEach(survivor => {
            nextGeneration.push({...survivor, age: survivor.age + 1});
        });
        
        // Create offspring to reach target population
        while (nextGeneration.length < this.maxPopulation && survivors.length >= 2) {
            const parent1 = survivors[Math.floor(Math.random() * survivors.length)];
            const parent2 = survivors[Math.floor(Math.random() * survivors.length)];
            
            if (parent1.id !== parent2.id) {
                const offspring = this.createOrganism(parent1, parent2);
                nextGeneration.push(offspring);
            }
        }
        
        return nextGeneration;
    }
    
    /**
     * Record data for current generation
     */
    recordGenerationData() {
        const colorCounts = {};
        let totalFitness = 0;
        
        this.population.forEach(organism => {
            colorCounts[organism.color] = (colorCounts[organism.color] || 0) + 1;
            totalFitness += organism.fitness;
        });
        
        this.generationData.push({
            generation: this.generation,
            colorCounts: colorCounts,
            averageFitness: totalFitness / this.population.length,
            populationSize: this.population.length
        });
    }
    
    /**
     * Update all display elements
     */
    updateDisplay() {
        // Update generation info
        this.generationCount.textContent = this.generation;
        this.populationCount.textContent = this.population.length;
        
        // Calculate and display average fitness
        const avgFit = this.population.reduce((sum, org) => sum + org.fitness, 0) / this.population.length;
        this.avgFitness.textContent = `${Math.round(avgFit * 100)}%`;
        
        // Update statistics
        this.survivorsCount.textContent = this.stats.survivors;
        this.deathsCount.textContent = this.stats.deaths;
        this.mutationsCount.textContent = this.stats.mutations;
        
        // Update organism display
        this.updateOrganismGrid();
    }
    
    /**
     * Update the visual grid of organisms
     */
    updateOrganismGrid() {
        this.organismGrid.innerHTML = '';
        
        this.population.forEach(organism => {
            const organismElement = document.createElement('div');
            organismElement.className = 'organism';
            organismElement.style.backgroundColor = organism.color;
            
            // Size styling
            if (organism.size === 'small') {
                organismElement.style.transform = 'scale(0.8)';
            } else if (organism.size === 'large') {
                organismElement.style.transform = 'scale(1.2)';
            }
            
            // Fitness indicator (border thickness)
            const borderWidth = Math.max(1, Math.round(organism.fitness * 4));
            organismElement.style.borderWidth = `${borderWidth}px`;
            
            // Add click interaction for detailed info
            organismElement.addEventListener('click', () => {
                this.showOrganismDetails(organism);
            });
            
            // Add hover tooltip
            organismElement.title = `Color: ${organism.color}, Size: ${organism.size}, Fitness: ${Math.round(organism.fitness * 100)}%`;
            
            this.organismGrid.appendChild(organismElement);
        });
    }
    
    /**
     * Show detailed information about an organism
     */
    showOrganismDetails(organism) {
        const details = `
            <strong>Organism Details:</strong><br>
            Color: ${organism.color}<br>
            Size: ${organism.size}<br>
            Fitness: ${Math.round(organism.fitness * 100)}%<br>
            Age: ${organism.age} generations<br>
            Environment Advantage: ${this.environments[this.currentEnvironment].favoredTraits.color === organism.color ? 'Yes' : 'No'}
        `;
        
        this.showTooltip(details, { target: { getBoundingClientRect: () => ({ left: window.innerWidth/2, top: window.innerHeight/2, width: 0 }) }});
        
        setTimeout(() => this.hideTooltip(), 3000);
    }
    
    /**
     * Draw trait distribution chart
     */
    drawChart() {
        if (!this.generationData.length) return;
        
        const ctx = this.chartContext;
        const canvas = this.traitChart;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get latest generation data
        const latestData = this.generationData[this.generationData.length - 1];
        const colors = Object.keys(latestData.colorCounts);
        const maxCount = Math.max(...Object.values(latestData.colorCounts));
        
        // Draw bars
        const barWidth = canvas.width / colors.length;
        colors.forEach((color, index) => {
            const count = latestData.colorCounts[color];
            const barHeight = (count / maxCount) * (canvas.height - 30);
            
            ctx.fillStyle = color;
            ctx.fillRect(index * barWidth, canvas.height - barHeight - 20, barWidth - 2, barHeight);
            
            // Draw labels
            ctx.fillStyle = '#333';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(color.substr(0, 3), index * barWidth + barWidth/2, canvas.height - 5);
            ctx.fillText(count.toString(), index * barWidth + barWidth/2, canvas.height - barHeight - 25);
        });
        
        // Draw title
        ctx.fillStyle = '#333';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Generation ${this.generation} - Trait Distribution`, canvas.width/2, 15);
    }
    
    /**
     * Show simulation results
     */
    showResults() {
        if (this.generationData.length === 0) return;
        
        const finalData = this.generationData[this.generationData.length - 1];
        const initialData = this.generationData[0];
        
        let resultsHTML = `
            <h4>Evolution Summary</h4>
            <p><strong>Generations:</strong> ${this.generation}</p>
            <p><strong>Final Population:</strong> ${finalData.populationSize}</p>
            <p><strong>Average Fitness:</strong> ${Math.round(finalData.averageFitness * 100)}%</p>
            <p><strong>Total Mutations:</strong> ${this.stats.mutations}</p>
            <br>
            <h4>Trait Changes</h4>
        `;
        
        // Compare initial vs final trait distribution
        const initialColors = Object.keys(initialData.colorCounts);
        const finalColors = Object.keys(finalData.colorCounts);
        
        initialColors.forEach(color => {
            const initialCount = initialData.colorCounts[color] || 0;
            const finalCount = finalData.colorCounts[color] || 0;
            const change = finalCount - initialCount;
            const changePercent = Math.round((change / initialCount) * 100);
            
            resultsHTML += `<p><span style="color: ${color};">●</span> ${color}: ${initialCount} → ${finalCount} (${change > 0 ? '+' : ''}${changePercent}%)</p>`;
        });
        
        this.resultsContent.innerHTML = resultsHTML;
        this.resultsModal.style.display = 'block';
    }
    
    /**
     * Show detailed analysis of results
     */
    showAnalysis() {
        const env = this.environments[this.currentEnvironment];
        const favoredColor = env.favoredTraits.color;
        const finalData = this.generationData[this.generationData.length - 1];
        const favoredCount = finalData.colorCounts[favoredColor] || 0;
        const totalPopulation = finalData.populationSize;
        
        let analysisHTML = `
            <h4>Scientific Analysis</h4>
            <p><strong>Environment:</strong> ${env.name}</p>
            <p><strong>Favored Trait:</strong> ${favoredColor} color</p>
            <p><strong>Final ${favoredColor} organisms:</strong> ${favoredCount} out of ${totalPopulation} (${Math.round((favoredCount/totalPopulation)*100)}%)</p>
            <br>
            <h4>Key Observations:</h4>
            <ul>
                <li>${favoredCount > totalPopulation/2 ? 'Natural selection successfully increased' : 'Environmental pressure was not strong enough to significantly increase'} the frequency of advantageous traits</li>
                <li>Mutations introduced ${this.stats.mutations} new variations during evolution</li>
                <li>Average fitness ${finalData.averageFitness > 0.6 ? 'improved significantly' : 'showed moderate improvement'} over ${this.generation} generations</li>
            </ul>
            <br>
            <h4>Discussion Questions:</h4>
            <ol>
                <li>Why did ${favoredColor} organisms ${favoredCount > totalPopulation/2 ? 'become more common' : 'not dominate completely'}?</li>
                <li>How did mutations contribute to population diversity?</li>
                <li>What would happen if the environment changed again?</li>
            </ol>
        `;
        
        this.resultsContent.innerHTML = analysisHTML;
    }
}

// Initialize simulation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const simulation = new NaturalSelectionSimulation();
    
    // Add educational tooltips and interactions
    const educationalContent = {
        'genetic-variation': 'Genetic variation provides the raw material for natural selection. Without differences between individuals, evolution cannot occur.',
        'natural-selection': 'Natural selection is the process where organisms with favorable traits survive and reproduce more successfully than others.',
        'adaptation': 'Adaptations are traits that increase an organism\'s fitness in a particular environment. They arise through natural selection over many generations.',
        'mutation': 'Mutations are random changes in genetic material that can introduce new traits into a population.'
    };
    
    // Add keyboard shortcuts for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') { // Spacebar to pause/resume
            e.preventDefault();
            simulation.pauseSimulation();
        } else if (e.key === 'r' || e.key === 'R') { // R to reset
            simulation.resetSimulation();
        } else if (e.key === 's' || e.key === 'S') { // S to start/stop
            simulation.toggleSimulation();
        }
    });
    
    // Add touch support for mobile devices
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        
        // Swipe up to start simulation
        if (deltaY > 50) {
            if (!simulation.isRunning) {
                simulation.startSimulation();
            }
        }
        // Swipe down to pause
        else if (deltaY < -50) {
            simulation.pauseSimulation();
        }
    });
    
    console.log('Natural Selection Simulation initialized successfully!');
});