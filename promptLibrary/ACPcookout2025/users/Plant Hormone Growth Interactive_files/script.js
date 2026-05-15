// Plant Growth Interactive Script
// This script manages the tomato plant growth simulation based on enzyme X presence
// Modified to create more natural, flexible plant growth with segmented stem

class PlantGrowthSimulator {
    constructor() {
        // Initialize DOM elements
        this.enzymeToggle = document.getElementById('enzymeToggle');
        this.enzymeStatus = document.getElementById('enzymeStatus');
        this.resetBtn = document.getElementById('resetBtn');
        this.stemContainer = document.getElementById('stemContainer'); // Changed from plantStem to stemContainer
        this.leavesContainer = document.getElementById('leavesContainer');
        this.fruitsContainer = document.getElementById('fruitsContainer');
        this.flowersContainer = document.getElementById('flowersContainer');
        this.heightIndicator = document.getElementById('heightIndicator');
        this.heightDisplay = document.getElementById('heightDisplay');
        this.infoContent = document.getElementById('infoContent');
        this.enzymeExplanation = document.getElementById('enzymeExplanation');
        this.progressFill = document.getElementById('progressFill');
        this.rulerMarks = document.querySelector('.ruler-marks');
        
        // Plant growth parameters
        this.baseHeight = 20; // Base height in pixels
        this.maxHeightWithoutEnzyme = 80; // Maximum height without enzyme
        this.maxHeightWithEnzyme = 160; // Maximum height with enzyme
        this.currentHeight = this.baseHeight;
        this.targetHeight = this.baseHeight;
        this.isEnzymeActive = false;
        this.growthStage = 0; // 0: seedling, 1: young plant, 2: flowering, 3: fruiting
        
        // Natural growth parameters - Added for more realistic plant behavior
        this.stemSegments = []; // Array to store individual stem segments
        this.segmentHeight = 10; // Height of each stem segment
        this.naturalVariation = 0.3; // Random variation factor for natural growth
        
        // Animation parameters
        this.animationDuration = 800; // milliseconds
        this.growthInterval = null;
        
        this.init();
    }
    
    init() {
        // Create ruler marks
        this.createRulerMarks();
        
        // Set up event listeners
        this.enzymeToggle.addEventListener('change', () => this.toggleEnzyme());
        this.resetBtn.addEventListener('click', () => this.resetExperiment());
        
        // Initialize plant display with natural stem segments
        this.createNaturalStem();
        this.updatePlantDisplay();
        this.updateInfoPanel();
        
        // Add touch support for mobile devices
        this.addTouchSupport();
    }
    
    // Create ruler marks for height measurement
    createRulerMarks() {
        const maxHeight = 180; // Maximum ruler height in cm
        const pixelsPerCm = 2; // Scale factor
        
        for (let i = 0; i <= maxHeight; i += 10) {
            const mark = document.createElement('div');
            mark.style.position = 'absolute';
            mark.style.bottom = `${i * pixelsPerCm}px`;
            mark.style.right = '0';
            mark.style.width = i % 50 === 0 ? '15px' : '8px';
            mark.style.height = '1px';
            mark.style.backgroundColor = '#666';
            
            if (i % 50 === 0 && i > 0) {
                const label = document.createElement('span');
                label.textContent = i;
                label.style.position = 'absolute';
                label.style.right = '18px';
                label.style.top = '-6px';
                label.style.fontSize = '8px';
                label.style.color = '#666';
                mark.appendChild(label);
            }
            
            this.rulerMarks.appendChild(mark);
        }
    }
    
    // Create natural stem with individual segments for flexibility
    createNaturalStem() {
        this.stemContainer.innerHTML = ''; // Clear existing segments
        this.stemSegments = [];
        
        const numSegments = Math.ceil(this.currentHeight / this.segmentHeight);
        
        for (let i = 0; i < numSegments; i++) {
            const segment = document.createElement('div');
            segment.className = 'stem-segment';
            
            // Add natural variation to each segment's sway angle
            const swayAngle = (Math.random() - 0.5) * this.naturalVariation;
            segment.style.setProperty('--sway-angle', `${swayAngle}deg`);
            
            // Add slight delay to each segment's animation for wave effect
            segment.style.animationDelay = `${i * 0.1}s`;
            
            this.stemContainer.appendChild(segment);
            this.stemSegments.push(segment);
        }
    }
    
    // Update stem segments based on current height
    updateNaturalStem() {
        const requiredSegments = Math.ceil(this.currentHeight / this.segmentHeight);
        const currentSegments = this.stemSegments.length;
        
        // Add new segments if needed
        if (requiredSegments > currentSegments) {
            for (let i = currentSegments; i < requiredSegments; i++) {
                const segment = document.createElement('div');
                segment.className = 'stem-segment';
                
                // Add natural variation and animation delay
                const swayAngle = (Math.random() - 0.5) * this.naturalVariation;
                segment.style.setProperty('--sway-angle', `${swayAngle}deg`);
                segment.style.animationDelay = `${i * 0.1}s`;
                
                // Start new segments slightly smaller and grow them in
                segment.style.transform = 'scaleY(0)';
                segment.style.transition = 'transform 0.5s ease-out';
                
                this.stemContainer.appendChild(segment);
                this.stemSegments.push(segment);
                
                // Animate new segment growth
                setTimeout(() => {
                    segment.style.transform = 'scaleY(1)';
                }, 50);
            }
        }
        
        // Adjust height of stem container
        this.stemContainer.style.height = `${this.currentHeight}px`;
    }
    
    // Toggle enzyme X on/off
    toggleEnzyme() {
        this.isEnzymeActive = this.enzymeToggle.checked;
        
        // Update enzyme status display
        this.enzymeStatus.textContent = `Enzyme X: ${this.isEnzymeActive ? 'ON' : 'OFF'}`;
        this.enzymeStatus.style.color = this.isEnzymeActive ? '#2e7d32' : '#d32f2f';
        
        // Set target height based on enzyme presence
        if (this.isEnzymeActive) {
            this.targetHeight = this.maxHeightWithEnzyme;
            this.stemContainer.parentElement.classList.add('enzyme-active');
        } else {
            this.targetHeight = this.maxHeightWithoutEnzyme;
            this.stemContainer.parentElement.classList.remove('enzyme-active');
        }
        
        // Start natural growth animation
        this.animateNaturalGrowth();
        this.updateInfoPanel();
    }
    
    // Animate plant growth to target height with natural progression
    animateNaturalGrowth() {
        const startHeight = this.currentHeight;
        const heightDifference = this.targetHeight - startHeight;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.animationDuration, 1);
            
            // Use easing function for smooth animation with natural variation
            const easedProgress = this.easeOutCubic(progress);
            
            // Add slight random variation to simulate natural growth irregularity
            const naturalVariation = Math.sin(progress * Math.PI * 3) * 2;
            
            this.currentHeight = startHeight + (heightDifference * easedProgress) + naturalVariation;
            this.updateNaturalStem(); // Update stem segments
            this.updatePlantDisplay();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Final height adjustment without variation
                this.currentHeight = this.targetHeight;
                this.updateNaturalStem();
                this.updatePlantDisplay();
                this.updateGrowthStage();
                this.addPlantFeatures();
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // Easing function for smooth animation
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    // Update plant visual display
    updatePlantDisplay() {
        // Height indicator and display are updated as before
        const indicatorBottom = 60 + this.currentHeight;
        this.heightIndicator.style.bottom = `${indicatorBottom}px`;
        this.heightDisplay.style.bottom = `${indicatorBottom - 5}px`;
        
        // Convert pixels to cm for display (approximate scale)
        const heightInCm = Math.round(this.currentHeight * 0.5);
        this.heightDisplay.textContent = `${heightInCm} cm`;
        
        // Update progress bar
        const maxPossibleHeight = this.maxHeightWithEnzyme;
        const progressPercentage = (this.currentHeight / maxPossibleHeight) * 100;
        this.progressFill.style.width = `${Math.min(progressPercentage, 100)}%`;
    }
    
    // Update growth stage based on current height
    updateGrowthStage() {
        const previousStage = this.growthStage;
        
        if (this.currentHeight >= 140 && this.isEnzymeActive) {
            this.growthStage = 3; // Fruiting stage
        } else if (this.currentHeight >= 100) {
            this.growthStage = 2; // Flowering stage
        } else if (this.currentHeight >= 50) {
            this.growthStage = 1; // Young plant
        } else {
            this.growthStage = 0; // Seedling
        }
        
        // Add new features if stage increased
        if (this.growthStage > previousStage) {
            this.addPlantFeatures();
        }
    }
    
    // Enhanced method to add realistic tomato plant features with natural positioning
    addPlantFeatures() {
        // Clear existing features
        this.leavesContainer.innerHTML = '';
        this.fruitsContainer.innerHTML = '';
        this.flowersContainer.innerHTML = '';
        
        // Add compound tomato leaves with natural positioning
        this.addNaturalTomatoLeaves();
        
        // Add flowers for flowering and fruiting stages
        if (this.growthStage >= 2) {
            this.addNaturalTomatoFlowers();
        }
        
        // Add fruits for mature plants with enzyme in fruiting stage
        if (this.growthStage >= 3 && this.isEnzymeActive) {
            this.addNaturalTomatoFruits();
        }
    }
    
    // Add realistic tomato compound leaves with natural variation
    addNaturalTomatoLeaves() {
        const leafPairs = Math.min(this.growthStage + 2, 5); // More leaves as plant grows
        
        for (let i = 0; i < leafPairs; i++) {
            // Create left and right leaves for each pair
            ['left', 'right'].forEach((side, sideIndex) => {
                const leaf = document.createElement('div');
                leaf.className = `leaf ${side}`;
                
                // Position leaves along the stem with natural variation
                const baseHeight = (this.currentHeight / (leafPairs + 1)) * (i + 1) + 15;
                const naturalOffset = (Math.random() - 0.5) * 8; // Natural height variation
                const leafHeight = baseHeight + naturalOffset;
                leaf.style.bottom = `${leafHeight}px`;
                
                // Add leaf stem (petiole)
                const leafStem = document.createElement('div');
                leafStem.className = 'leaf-stem';
                leaf.appendChild(leafStem);
                
                // Add staggered animation delay with natural variation
                const baseDelay = (i * 2 + sideIndex) * 0.15;
                const delayVariation = Math.random() * 0.1;
                leaf.style.animationDelay = `${baseDelay + delayVariation}s`;
                
                // Set rotation with natural variation
                const baseRotation = side === 'left' ? -25 : 25;
                const rotationVariation = (Math.random() - 0.5) * 10;
                const finalRotation = baseRotation + rotationVariation;
                leaf.style.setProperty('--rotation', `${finalRotation}deg`);
                
                // Add natural sway variation for each leaf
                const leafSway = (Math.random() - 0.5) * 4;
                leaf.style.setProperty('--leaf-sway', `${leafSway}deg`);
                
                this.leavesContainer.appendChild(leaf);
            });
        }
    }
    
    // Add tomato flowers with natural positioning
    addNaturalTomatoFlowers() {
        const flowerCount = Math.min(4, Math.floor(this.currentHeight / 30));
        
        for (let i = 0; i < flowerCount; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            
            // Position flowers along upper portion of stem with natural clustering
            const baseHeight = this.currentHeight * 0.4 + (Math.random() * this.currentHeight * 0.4);
            const clusterOffset = (Math.random() - 0.5) * 15; // Natural clustering
            const flowerHeight = baseHeight + clusterOffset;
            
            const flowerSide = Math.random() > 0.5 ? 'left' : 'right';
            const sideOffset = 8 + Math.random() * 15;
            
            flower.style.bottom = `${flowerHeight}px`;
            flower.style[flowerSide] = `${sideOffset}px`;
            flower.style.animationDelay = `${i * 0.3 + 0.5 + Math.random() * 0.2}s`;
            
            this.flowersContainer.appendChild(flower);
        }
    }
    
    // Add realistic tomato fruits with natural clustering and hanging
    addNaturalTomatoFruits() {
        const fruitCount = Math.min(6, Math.floor(this.currentHeight / 25));
        
        for (let i = 0; i < fruitCount; i++) {
            const fruit = document.createElement('div');
            fruit.className = 'fruit';
            
            // Create natural fruit clusters (tomato characteristic)
            const clusterIndex = Math.floor(i / 2); // Group fruits in pairs
            const clusterHeight = this.currentHeight * 0.5 + (clusterIndex * 25) + (Math.random() * 15);
            const clusterSide = clusterIndex % 2 === 0 ? 'left' : 'right';
            
            // Position within cluster with natural variation
            const baseOffset = 12 + (i % 2) * 8;
            const naturalOffset = (Math.random() - 0.5) * 6;
            const clusterOffset = baseOffset + naturalOffset;
            
            const heightVariation = (i % 2) * 10 + (Math.random() - 0.5) * 8;
            
            fruit.style.bottom = `${clusterHeight + heightVariation}px`;
            fruit.style[clusterSide] = `${clusterOffset}px`;
            fruit.style.animationDelay = `${i * 0.25 + 1 + Math.random() * 0.3}s`;
            
            this.fruitsContainer.appendChild(fruit);
        }
    }
    
    // Enhanced information panel with natural growth details
    updateInfoPanel() {
        let observationText = '';
        let explanationText = '';
        
        // Growth stage descriptions
        const stageNames = ['Seedling Stage', 'Vegetative Growth', 'Flowering Stage', 'Fruiting Stage'];
        const stageDescriptions = [
            'Initial growth with flexible stem development and first true leaves.',
            'Rapid stem elongation with natural bending and compound leaf formation.',
            'Flower clusters form with natural swaying movement.',
            'Fruit development with natural hanging and clustering patterns.'
        ];
        
        if (this.isEnzymeActive) {
            observationText = `<strong>Observation:</strong> With Enzyme X active, the tomato plant grows taller (${Math.round(this.currentHeight * 0.5)} cm) with natural flexibility and develops complex structures.`;
            explanationText = `Enzyme X (auxin-like hormone) promotes natural cell elongation, allowing the stem to bend and sway naturally while supporting the development of compound leaves, flowers, and fruit formation.`;
        } else {
            observationText = `<strong>Observation:</strong> Without Enzyme X, the plant remains shorter (${Math.round(this.currentHeight * 0.5)} cm) but still maintains natural movement and limited reproductive development.`;
            explanationText = `Without adequate plant hormones, tomato plants show restricted growth but retain natural flexibility. Limited hormone levels result in fewer compound leaves and may prevent reaching full flowering potential.`;
        }
        
        // Add current stage information
        const stageInfo = `<br><em>Current Stage: ${stageNames[this.growthStage]}</em><br><small>${stageDescriptions[this.growthStage]}</small>`;
        
        this.infoContent.innerHTML = `<p>${observationText}${stageInfo}</p>`;
        this.enzymeExplanation.textContent = explanationText;
    }
    
    // Reset experiment to initial state with natural stem recreation
    resetExperiment() {
        // Reset all parameters
        this.isEnzymeActive = false;
        this.currentHeight = this.baseHeight;
        this.targetHeight = this.baseHeight;
        this.growthStage = 0;
        
        // Reset UI elements
        this.enzymeToggle.checked = false;
        this.enzymeStatus.textContent = 'Enzyme X: OFF';
        this.enzymeStatus.style.color = '#d32f2f';
        this.stemContainer.parentElement.classList.remove('enzyme-active');
        
        // Recreate natural stem with base segments
        this.createNaturalStem();
        
        // Clear all plant features
        this.leavesContainer.innerHTML = '';
        this.fruitsContainer.innerHTML = '';
        this.flowersContainer.innerHTML = '';
        
        // Update display
        this.updatePlantDisplay();
        this.updateInfoPanel();
        
        // Add visual feedback for reset
        this.resetBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.resetBtn.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Add touch support for mobile devices
    addTouchSupport() {
        // Ensure touch targets are large enough (minimum 44px)
        const touchElements = [this.enzymeToggle, this.resetBtn];
        
        touchElements.forEach(element => {
            if (element) {
                element.style.minHeight = '44px';
                element.style.minWidth = '44px';
                
                // Add touch feedback
                element.addEventListener('touchstart', (e) => {
                    element.style.opacity = '0.7';
                });
                
                element.addEventListener('touchend', (e) => {
                    element.style.opacity = '1';
                });
            }
        });
        
        // Prevent zoom on double tap for better mobile experience
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        });
        
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}

// Initialize the simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PlantGrowthSimulator();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Recalculate layout if needed
    const container = document.querySelector('.container');
    if (window.innerHeight > 500) {
        container.style.height = '90vh';
    } else {
        container.style.height = '450px';
    }
});