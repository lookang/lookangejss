// Global state management for the digestion simulation
class DigestionSimulator {
    constructor() {
        // Initialize state variables
        this.selectedFood = null;
        this.selectedPreparation = null;
        this.selectedEnzyme = null;
        this.isSimulating = false;
        
        // Enzyme-food compatibility mapping
        this.enzymeCompatibility = {
            'amylase': ['carbohydrate'],
            'protease': ['protein'],
            'lipase': ['fat']
        };
        
        // Enhanced surface area multipliers with more realistic values
        this.surfaceAreaMultipliers = {
            'low': 1,      // Whole food - minimal surface area
            'medium': 2.5, // Sliced - moderate increase in surface area
            'high': 4,     // Chopped - significant increase in surface area
            'very-high': 6 // Mashed - maximum surface area exposure
        };
        
        // Food type mappings
        this.foodTypes = {
            'fruit': 'carbohydrate',
            'vegetable': 'carbohydrate',
            'grain': 'carbohydrate',
            'protein': 'protein',
            'fat': 'fat'
        };

        // Food color mapping for visual representation
        this.foodColors = {
            'fruit': '#ff6b6b',
            'vegetable': '#ff9500',
            'protein': '#8b4513',
            'grain': '#daa520',
            'fat': '#ffeb3b'
        };
        
        this.initializeEventListeners();
        this.initializeTooltips();
        this.updateComparisonSidebar();
    }
    
    // Set up all event listeners for interactive elements
    initializeEventListeners() {
        // Food selection buttons
        document.querySelectorAll('.food-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectFood(e.target.closest('.food-btn')));
        });
        
        // Preparation method buttons
        document.querySelectorAll('.prep-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectPreparation(e.target.closest('.prep-btn')));
        });
        
        // Enzyme selection buttons
        document.querySelectorAll('.enzyme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectEnzyme(e.target.closest('.enzyme-btn')));
        });
        
        // Start simulation button
        document.getElementById('start-simulation').addEventListener('click', () => this.startSimulation());
        
        // Reset simulation when selections change
        document.addEventListener('selectionChanged', () => this.resetSimulation());
    }
    
    // Initialize tooltip functionality for enhanced user experience
    initializeTooltips() {
        const tooltip = document.getElementById('tooltip');
        
        // Add tooltips to buttons with detailed information
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const text = e.target.getAttribute('data-tooltip');
                tooltip.textContent = text;
                tooltip.classList.add('show');
                this.positionTooltip(e, tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
            
            element.addEventListener('mousemove', (e) => {
                this.positionTooltip(e, tooltip);
            });
        });
    }
    
    // Position tooltip near cursor but within viewport
    positionTooltip(event, tooltip) {
        const rect = event.target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = event.clientX + 10;
        let top = event.clientY - 10;
        
        // Adjust if tooltip would go off-screen
        if (left + tooltipRect.width > window.innerWidth) {
            left = event.clientX - tooltipRect.width - 10;
        }
        
        if (top < 0) {
            top = event.clientY + 20;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }
    
    // Handle food selection with visual feedback
    selectFood(button) {
        // Remove previous selection
        document.querySelectorAll('.food-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Add selection to clicked button
        button.classList.add('selected');
        
        // Store selection data
        this.selectedFood = {
            type: button.dataset.food,
            category: button.dataset.type,
            icon: button.querySelector('.food-icon').textContent,
            name: button.querySelector('.food-name').textContent
        };
        
        // Update visual display
        this.updateFoodDisplay();
        this.checkSimulationReady();
        this.highlightCompatibleEnzymes();
        this.updateComparisonSidebar(); // Update sidebar with food-specific colors
        
        // Dispatch custom event for other components
        document.dispatchEvent(new CustomEvent('selectionChanged'));
    }
    
    // Handle preparation method selection
    selectPreparation(button) {
        document.querySelectorAll('.prep-btn').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        
        this.selectedPreparation = {
            method: button.dataset.prep,
            surfaceArea: button.dataset.surface,
            icon: button.querySelector('.prep-icon').textContent,
            name: button.querySelector('.prep-name').textContent
        };
        
        this.updateFoodDisplay();
        this.checkSimulationReady();
        this.highlightActivePreparation(); // Highlight active preparation in sidebar
        
        document.dispatchEvent(new CustomEvent('selectionChanged'));
    }
    
    // Handle enzyme selection with compatibility checking
    selectEnzyme(button) {
        document.querySelectorAll('.enzyme-btn').forEach(btn => {
            btn.classList.remove('selected', 'correct', 'incorrect');
        });
        
        button.classList.add('selected');
        
        this.selectedEnzyme = {
            type: button.dataset.enzyme,
            target: button.dataset.target,
            icon: button.querySelector('.enzyme-icon').textContent,
            name: button.querySelector('.enzyme-name').textContent
        };
        
        // Check enzyme compatibility and provide visual feedback
        this.checkEnzymeCompatibility(button);
        this.updateEnzymeDisplay();
        this.checkSimulationReady();
        
        document.dispatchEvent(new CustomEvent('selectionChanged'));
    }
    
    // Visual feedback for enzyme compatibility
    checkEnzymeCompatibility(button) {
        if (!this.selectedFood) return;
        
        const isCompatible = this.enzymeCompatibility[this.selectedEnzyme.type].includes(this.selectedFood.category);
        
        if (isCompatible) {
            button.classList.add('correct');
            this.showFeedback('Correct enzyme choice! This enzyme will effectively break down this food type.', 'success');
        } else {
            button.classList.add('incorrect');
            this.showFeedback('This enzyme is not optimal for this food type. Try a different enzyme.', 'warning');
        }
    }
    
    // Highlight enzymes that are compatible with selected food
    highlightCompatibleEnzymes() {
        if (!this.selectedFood) return;
        
        document.querySelectorAll('.enzyme-btn').forEach(btn => {
            const enzymeType = btn.dataset.enzyme;
            const isCompatible = this.enzymeCompatibility[enzymeType].includes(this.selectedFood.category);
            
            if (isCompatible) {
                btn.style.borderColor = '#4CAF50';
                btn.style.backgroundColor = '#e8f5e8';
            } else {
                btn.style.borderColor = '#e9ecef';
                btn.style.backgroundColor = '#f8f9fa';
            }
        });
    }
    
    // Enhanced food display with accurate surface area visualization
    updateFoodDisplay() {
        const foodVisual = document.getElementById('food-visual');
        
        if (this.selectedFood && this.selectedPreparation) {
            const foodColor = this.foodColors[this.selectedFood.type] || '#4CAF50';
            
            foodVisual.innerHTML = `
                <div style="font-size: 24px;">${this.selectedFood.icon}</div>
                <div style="font-size: 12px; font-weight: 600;">${this.selectedFood.name}</div>
                <div style="font-size: 10px; color: #666;">${this.selectedPreparation.name}</div>
                <div class="food-pieces-container">
                    ${this.generateFoodPieces(this.selectedPreparation.method, foodColor)}
                </div>
            `;
        } else if (this.selectedFood) {
            foodVisual.innerHTML = `
                <div style="font-size: 24px;">${this.selectedFood.icon}</div>
                <div style="font-size: 12px; font-weight: 600;">${this.selectedFood.name}</div>
                <div style="font-size: 10px; color: #999;">Select preparation method</div>
            `;
        }
    }
    
    // Generate visual representation of food pieces based on preparation method
    generateFoodPieces(method, color) {
        let pieces = '';
        
        switch(method) {
            case 'whole':
                // Single large piece
                pieces = `<div class="food-piece whole" style="background-color: ${color};"></div>`;
                break;
            case 'sliced':
                // 3-4 medium slices
                for(let i = 0; i < 4; i++) {
                    pieces += `<div class="food-piece sliced" style="background-color: ${color};"></div>`;
                }
                break;
            case 'chopped':
                // 8-12 small pieces
                for(let i = 0; i < 10; i++) {
                    pieces += `<div class="food-piece chopped" style="background-color: ${color};"></div>`;
                }
                break;
            case 'mashed':
                // Many tiny pieces
                for(let i = 0; i < 20; i++) {
                    pieces += `<div class="food-piece mashed" style="background-color: ${color};"></div>`;
                }
                break;
        }
        
        return pieces;
    }
    
    // Update enzyme visual display
    updateEnzymeDisplay() {
        const enzymeVisual = document.getElementById('enzyme-visual');
        
        if (this.selectedEnzyme) {
            enzymeVisual.innerHTML = `
                <div style="font-size: 24px;">${this.selectedEnzyme.icon}</div>
                <div style="font-size: 12px; font-weight: 600;">${this.selectedEnzyme.name}</div>
                <div style="font-size: 10px; color: #666;">Ready to digest</div>
            `;
        }
    }
    
    // Update comparison sidebar with current food color and highlight active preparation
    updateComparisonSidebar() {
        const foodColor = this.selectedFood ? this.foodColors[this.selectedFood.type] : '#4CAF50';
        
        // Update visual representations with current food color
        const style = document.createElement('style');
        style.id = 'dynamic-food-colors';
        
        // Remove existing dynamic styles
        const existingStyle = document.getElementById('dynamic-food-colors');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        style.textContent = `
            .whole-pieces::before { background: ${foodColor} !important; }
            .sliced-pieces::before, .sliced-pieces::after { background: ${foodColor} !important; }
            .chopped-pieces { 
                background: repeating-linear-gradient(
                    45deg,
                    ${foodColor},
                    ${foodColor} 2px,
                    transparent 2px,
                    transparent 4px
                ) !important;
            }
            .mashed-pieces { 
                background: radial-gradient(circle, ${foodColor} 1px, transparent 1px) !important;
                background-size: 3px 3px !important;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Highlight active preparation method in comparison sidebar
    highlightActivePreparation() {
        // Remove previous highlights
        document.querySelectorAll('.comparison-item').forEach(item => {
            item.classList.remove('active');
        });
        
        if (this.selectedPreparation) {
            // Find and highlight the matching preparation method
            const comparisonItems = document.querySelectorAll('.comparison-item');
            comparisonItems.forEach(item => {
                const prepMethod = item.querySelector('.prep-method').textContent.toLowerCase();
                if (prepMethod === this.selectedPreparation.name.toLowerCase()) {
                    item.classList.add('active');
                }
            });
        }
    }
    
    // Check if all selections are made to enable simulation
    checkSimulationReady() {
        const startBtn = document.getElementById('start-simulation');
        const isReady = this.selectedFood && this.selectedPreparation && this.selectedEnzyme;
        
        startBtn.disabled = !isReady;
        
        if (isReady) {
            startBtn.textContent = 'Start Digestion Process';
            startBtn.style.background = '#4CAF50';
        } else {
            startBtn.textContent = 'Select all options to start';
            startBtn.style.background = '#6c757d';
        }
    }
    
    // Main simulation function with enhanced surface area calculations
    async startSimulation() {
        if (this.isSimulating) return;
        
        this.isSimulating = true;
        const startBtn = document.getElementById('start-simulation');
        const progressFill = document.getElementById('progress-fill');
        const digestionRate = document.getElementById('digestion-rate');
        
        startBtn.disabled = true;
        startBtn.textContent = 'Digestion in Progress...';
        
        // Calculate digestion efficiency with enhanced surface area impact
        const isCorrectEnzyme = this.enzymeCompatibility[this.selectedEnzyme.type].includes(this.selectedFood.category);
        const surfaceMultiplier = this.surfaceAreaMultipliers[this.selectedPreparation.surfaceArea];
        
        // More realistic digestion rate calculation
        let baseRate = isCorrectEnzyme ? 70 : 20; // Correct enzyme gives significant advantage
        let surfaceAreaBonus = (surfaceMultiplier - 1) * 15; // Each level adds 15% efficiency
        let finalRate = Math.min(95, baseRate + surfaceAreaBonus);
        
        // Animate digestion process
        await this.animateDigestion(finalRate, progressFill, digestionRate);
        
        // Show results and educational content
        this.showResults(isCorrectEnzyme, surfaceMultiplier, finalRate);
        
        // Reset button
        startBtn.disabled = false;
        startBtn.textContent = 'Run Simulation Again';
        this.isSimulating = false;
    }
    
    // Animate the digestion progress with realistic timing
    async animateDigestion(targetRate, progressFill, digestionRate) {
        const duration = 3000; // 3 seconds
        const steps = 60;
        const stepDuration = duration / steps;
        
        // Add visual effects to food pieces
        const foodPieces = document.querySelectorAll('.food-piece');
        foodPieces.forEach(piece => piece.classList.add('digesting'));
        
        for (let i = 0; i <= steps; i++) {
            const progress = (i / steps) * targetRate;
            progressFill.style.width = progress + '%';
            digestionRate.textContent = `Digestion Rate: ${Math.round(progress)}%`;
            
            // Color changes based on progress
            if (progress < 30) {
                progressFill.style.background = 'linear-gradient(90deg, #ff6b6b, #ffa726)';
            } else if (progress < 70) {
                progressFill.style.background = 'linear-gradient(90deg, #ffa726, #ffeb3b)';
            } else {
                progressFill.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
            }
            
            await new Promise(resolve => setTimeout(resolve, stepDuration));
        }
        
        foodPieces.forEach(piece => piece.classList.remove('digesting'));
    }
    
    // Display comprehensive results with enhanced surface area explanations
    showResults(isCorrectEnzyme, surfaceMultiplier, finalRate) {
        const resultsContent = document.getElementById('results-content');
        
        let enzymeEfficiency = isCorrectEnzyme ? 'High' : 'Low';
        let surfaceAreaEffect = this.getSurfaceAreaDescription(surfaceMultiplier);
        
        resultsContent.innerHTML = `
            <div class="result-summary">
                <h4 style="color: #2c5530; margin-bottom: 10px;">Simulation Results</h4>
                <div class="result-item">
                    <strong>Overall Digestion Efficiency:</strong> ${Math.round(finalRate)}%
                </div>
                <div class="result-item">
                    <strong>Enzyme Compatibility:</strong> ${enzymeEfficiency}
                    ${isCorrectEnzyme ? '✅' : '❌'}
                </div>
                <div class="result-item">
                    <strong>Surface Area Multiplier:</strong> ${surfaceMultiplier}x
                </div>
                <div class="result-item">
                    <strong>Surface Area Effect:</strong> ${surfaceAreaEffect}
                </div>
            </div>
            
            <div class="learning-insights" style="margin-top: 15px;">
                <h4 style="color: #2c5530; margin-bottom: 8px;">Key Learning Insights</h4>
                <div class="insight-item">
                    ${this.getEnzymeInsight(isCorrectEnzyme)}
                </div>
                <div class="insight-item">
                    ${this.getSurfaceAreaInsight(this.selectedPreparation.surfaceArea, surfaceMultiplier)}
                </div>
                <div class="insight-item">
                    <strong>Real-world Application:</strong> ${this.getRealWorldExample()}
                </div>
            </div>
            
            <div class="next-steps" style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 6px;">
                <strong>Try Next:</strong> Compare different preparation methods using the sidebar to see how surface area dramatically affects digestion rates!
            </div>
        `;
    }
    
    // Generate enhanced surface area insights
    getSurfaceAreaInsight(surfaceArea, multiplier) {
        const insights = {
            'low': `Whole foods have minimal surface area (1x). Only the outer surface is exposed to enzymes, resulting in slow digestion. The food must be broken down mechanically first.`,
            'medium': `Slicing increases surface area by ${multiplier}x. More internal surfaces are exposed, allowing enzymes to access more food material simultaneously.`,
            'high': `Chopping creates ${multiplier}x more surface area. Many small pieces provide numerous enzyme binding sites, significantly accelerating the digestion process.`,
            'very-high': `Mashing maximizes surface area (${multiplier}x). The cellular structure is broken down, exposing maximum surface area for optimal enzyme-substrate interactions.`
        };
        
        return `<strong>Surface Area Impact:</strong> ${insights[surfaceArea]}`;
    }
    
    // Generate contextual educational insights
    getEnzymeInsight(isCorrect) {
        if (isCorrect) {
            return `<strong>Enzyme Specificity:</strong> ${this.selectedEnzyme.name} is the correct enzyme for ${this.selectedFood.name}. Enzymes have specific shapes that fit only certain substrates, like a lock and key mechanism.`;
        } else {
            return `<strong>Enzyme Mismatch:</strong> ${this.selectedEnzyme.name} is not optimal for ${this.selectedFood.name}. Each enzyme has a specific function - try matching the enzyme to the food's main component.`;
        }
    }
    
    getSurfaceAreaDescription(multiplier) {
        if (multiplier === 1) return 'Minimal (Whole food)';
        if (multiplier === 2.5) return 'Moderate (Sliced)';
        if (multiplier === 4) return 'High (Chopped)';
        return 'Maximum (Mashed)';
    }
    
    getRealWorldExample() {
        const examples = {
            'fruit': 'Chewing breaks down fruit into smaller pieces, increasing surface area for better nutrient absorption in your digestive system.',
            'vegetable': 'Cooking and chewing vegetables breaks down cell walls, making nutrients more accessible to digestive enzymes.',
            'protein': 'Mechanical breakdown (chewing) and chemical breakdown (stomach acid) work together to denature proteins for enzyme action.',
            'grain': 'Grinding grains into flour dramatically increases surface area, making starches more accessible to amylase enzymes.',
            'fat': 'Bile salts emulsify fats into smaller droplets, increasing surface area for lipase enzyme action in the small intestine.'
        };
        
        return examples[this.selectedFood.type] || 'Different preparation methods affect how efficiently our bodies can digest and absorb nutrients.';
    }
    
    // Show contextual feedback messages
    showFeedback(message, type) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.className = `feedback ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#4CAF50' : '#ff9800'};
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 12px;
            z-index: 1001;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            animation: slideDown 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        // Remove after 3 seconds
        setTimeout(() => {
            feedback.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }
    
    // Reset simulation state
    resetSimulation() {
        const progressFill = document.getElementById('progress-fill');
        const digestionRate = document.getElementById('digestion-rate');
        
        progressFill.style.width = '0%';
        digestionRate.textContent = 'Digestion Rate: 0%';
        
        // Clear results if selections change
        if (!this.selectedFood || !this.selectedPreparation || !this.selectedEnzyme) {
            document.getElementById('results-content').innerHTML = `
                <div class="learning-point">
                    <strong>Key Learning Points:</strong>
                    <ul>
                        <li>Different food types require specific enzymes for digestion</li>
                        <li>Increased surface area speeds up enzymatic reactions</li>
                        <li>Enzyme-substrate specificity is crucial for effective digestion</li>
                        <li>Food preparation method significantly impacts digestion efficiency</li>
                    </ul>
                </div>
            `;
        }
    }
}

// Add CSS animations for feedback and enhanced food piece animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    }
    
    .result-item, .insight-item {
        margin-bottom: 8px;
        padding: 6px 0;
        border-bottom: 1px solid #eee;
        font-size: 12px;
        line-height: 1.4;
    }
    
    .result-item:last-child, .insight-item:last-child {
        border-bottom: none;
    }

    /* Enhanced food piece animations */
    .food-piece.digesting {
        animation: digestPiece 2s ease-in-out infinite;
    }

    @keyframes digestPiece {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(0.7); opacity: 0.7; }
        100% { transform: scale(0.4); opacity: 0.3; }
    }
`;
document.head.appendChild(style);

// Initialize the simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DigestionSimulator();
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true});