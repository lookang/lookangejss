// Paper Chromatography Simulation Script
// This script handles the interactive chromatography experiment simulation

class ChromatographySimulation {
    constructor() {
        // Initialize simulation state
        this.currentPhase = 'setup';
        this.placedDyes = new Set();
        this.waterFilled = false;
        this.separationComplete = false;
        this.correctAnswer = 'X'; // Food colouring F contains the same components as toxic dye X
        
        // Initialize the simulation
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updatePhaseDisplay();
    }
    
    setupEventListeners() {
        // Phase navigation
        document.querySelectorAll('.phase').forEach(phase => {
            phase.addEventListener('click', (e) => {
                const targetPhase = e.target.dataset.phase;
                if (this.canNavigateToPhase(targetPhase)) {
                    this.switchPhase(targetPhase);
                }
            });
        });
        
        // Drag and drop for dye bottles
        this.setupDragAndDrop();
        
        // Process phase controls
        document.getElementById('start-process').addEventListener('click', () => {
            this.switchPhase('process');
        });
        
        document.getElementById('fill-water').addEventListener('click', () => {
            this.fillWater();
        });
        
        document.getElementById('start-separation').addEventListener('click', () => {
            this.startSeparation();
        });
        
        // Analysis phase controls
        document.getElementById('show-assessment').addEventListener('click', () => {
            this.showAssessment();
        });
        
        document.getElementById('submit-answer').addEventListener('click', () => {
            this.checkAnswer();
        });
        
        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetSimulation();
        });
        
        // Enter key for answer submission
        document.getElementById('answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
    }
    
    setupDragAndDrop() {
        // Make dye bottles draggable
        document.querySelectorAll('.dye-bottle').forEach(bottle => {
            bottle.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.dye);
                e.target.classList.add('dragging');
            });
            
            bottle.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });
        
        // Make spot markers drop targets
        document.querySelectorAll('.spot-marker').forEach(marker => {
            marker.addEventListener('dragover', (e) => {
                e.preventDefault();
                marker.classList.add('drag-over');
            });
            
            marker.addEventListener('dragleave', () => {
                marker.classList.remove('drag-over');
            });
            
            marker.addEventListener('drop', (e) => {
                e.preventDefault();
                marker.classList.remove('drag-over');
                
                const dyeType = e.dataTransfer.getData('text/plain');
                const spotType = marker.dataset.spot;
                
                // Only allow matching dye to matching spot
                if (dyeType === spotType) {
                    this.placeDye(dyeType);
                }
            });
        });
        
        // Touch support for mobile devices
        this.setupTouchDragAndDrop();
    }
    
    setupTouchDragAndDrop() {
        let draggedElement = null;
        
        document.querySelectorAll('.dye-bottle').forEach(bottle => {
            bottle.addEventListener('touchstart', (e) => {
                draggedElement = bottle;
                bottle.classList.add('dragging');
            });
            
            bottle.addEventListener('touchend', (e) => {
                if (draggedElement) {
                    draggedElement.classList.remove('dragging');
                    
                    // Find the element under the touch point
                    const touch = e.changedTouches[0];
                    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
                    
                    if (elementBelow && elementBelow.classList.contains('spot-marker')) {
                        const dyeType = draggedElement.dataset.dye;
                        const spotType = elementBelow.dataset.spot;
                        
                        if (dyeType === spotType) {
                            this.placeDye(dyeType);
                        }
                    }
                    
                    draggedElement = null;
                }
            });
        });
    }
    
    placeDye(dyeType) {
        // Show the dye spot on the filter paper
        const dyeSpot = document.querySelector(`.dye-spot[data-spot="${dyeType}"]`);
        const spotMarker = document.querySelector(`.spot-marker[data-spot="${dyeType}"]`);
        
        if (dyeSpot && spotMarker) {
            dyeSpot.classList.remove('hidden');
            spotMarker.style.opacity = '0.3';
            this.placedDyes.add(dyeType);
            
            // Check if all dyes are placed
            if (this.placedDyes.size === 5) {
                document.getElementById('start-process').disabled = false;
            }
            
            // Visual feedback
            this.showTooltip(spotMarker, `${dyeType} dye placed successfully!`);
        }
    }
    
    fillWater() {
        if (!this.waterFilled) {
            const waterLevel = document.getElementById('water-level');
            waterLevel.style.height = '20px'; // 2cm depth
            this.waterFilled = true;
            
            // Enable start separation button after a short delay
            setTimeout(() => {
                document.getElementById('start-separation').disabled = false;
            }, 1000);
            
            // Disable fill water button
            document.getElementById('fill-water').disabled = true;
            document.getElementById('fill-water').textContent = 'Water Filled';
        }
    }
    
    startSeparation() {
        // Start the chromatography separation animation
        const spots = document.querySelectorAll('.chromatogram-spot');
        let timer = 0;
        const timerDisplay = document.getElementById('timer');
        
        // Timer animation
        const timerInterval = setInterval(() => {
            timer++;
            timerDisplay.textContent = timer;
            
            if (timer >= 10) {
                clearInterval(timerInterval);
                this.separationComplete = true;
                
                // Enable analysis phase
                setTimeout(() => {
                    this.switchPhase('analysis');
                    this.generateResults();
                }, 1000);
            }
        }, 200);
        
        // Animate chromatogram spots moving up
        spots.forEach((spot, index) => {
            setTimeout(() => {
                this.animateSpotSeparation(spot);
            }, index * 200);
        });
        
        // Disable start separation button
        document.getElementById('start-separation').disabled = true;
    }
    
    animateSpotSeparation(spot) {
        const dyeType = spot.dataset.dye;
        let components = [];
        
        // Define separation patterns for each dye
        switch(dyeType) {
            case 'W':
                components = [{color: '#ff6b6b', distance: 30}];
                break;
            case 'X':
                components = [
                    {color: '#ff6b6b', distance: 25},
                    {color: '#4ecdc4', distance: 45}
                ];
                break;
            case 'Y':
                components = [{color: '#45b7d1', distance: 35}];
                break;
            case 'Z':
                components = [{color: '#96ceb4', distance: 40}];
                break;
            case 'F':
                // F contains the same components as X (this is the key finding)
                components = [
                    {color: '#ff6b6b', distance: 25},
                    {color: '#4ecdc4', distance: 45}
                ];
                break;
        }
        
        // Create separated components
        components.forEach((component, index) => {
            setTimeout(() => {
                const newSpot = spot.cloneNode(true);
                newSpot.style.background = component.color;
                newSpot.style.bottom = `${component.distance}px`;
                newSpot.style.opacity = '0.8';
                spot.parentNode.appendChild(newSpot);
                
                // Animate the movement
                setTimeout(() => {
                    newSpot.style.transition = 'bottom 2s ease-out';
                }, 100);
            }, index * 300);
        });
        
        // Hide original spot
        setTimeout(() => {
            spot.style.opacity = '0';
        }, 500);
    }
    
    generateResults() {
        // Generate final chromatogram results for analysis
        const resultContainers = document.querySelectorAll('.final-chromatogram');
        
        resultContainers.forEach(container => {
            const dyeType = container.classList[1].split('-')[0].toUpperCase();
            this.drawFinalChromatogram(container, dyeType);
        });
    }
    
    drawFinalChromatogram(container, dyeType) {
        // Clear existing content
        container.innerHTML = '';
        
        // Create base line
        const baseLine = document.createElement('div');
        baseLine.style.cssText = `
            position: absolute;
            bottom: 10px;
            left: 5px;
            right: 5px;
            height: 2px;
            background: #333;
        `;
        container.appendChild(baseLine);
        
        // Define chromatogram patterns
        let components = [];
        switch(dyeType) {
            case 'W':
                components = [{color: '#ff6b6b', distance: 30, size: 8}];
                break;
            case 'X':
                components = [
                    {color: '#ff6b6b', distance: 25, size: 8},
                    {color: '#4ecdc4', distance: 45, size: 8}
                ];
                break;
            case 'Y':
                components = [{color: '#45b7d1', distance: 35, size: 8}];
                break;
            case 'Z':
                components = [{color: '#96ceb4', distance: 40, size: 8}];
                break;
            case 'F':
                components = [
                    {color: '#ff6b6b', distance: 25, size: 8},
                    {color: '#4ecdc4', distance: 45, size: 8}
                ];
                break;
        }
        
        // Draw components
        components.forEach((component, index) => {
            const spot = document.createElement('div');
            spot.style.cssText = `
                position: absolute;
                bottom: ${component.distance}px;
                left: 50%;
                transform: translateX(-50%);
                width: ${component.size}px;
                height: ${component.size}px;
                background: ${component.color};
                border-radius: 50%;
                opacity: 0.8;
            `;
            container.appendChild(spot);
        });
    }
    
    showAssessment() {
        const assessmentPanel = document.getElementById('assessment-panel');
        assessmentPanel.classList.toggle('hidden');
    }
    
    checkAnswer() {
        const userAnswer = document.getElementById('answer-input').value.toUpperCase();
        const feedback = document.getElementById('feedback');
        
        feedback.classList.remove('hidden', 'correct', 'incorrect');
        
        if (userAnswer === this.correctAnswer) {
            feedback.classList.add('correct');
            feedback.innerHTML = `
                <strong>Correct!</strong> Food colouring F contains the same dye components as toxic dye X. 
                Both show two spots at the same distances: a red component at 25mm and a cyan component at 45mm from the start line. 
                This indicates that food colouring F contains toxic dye X and should not be used.
            `;
        } else {
            feedback.classList.add('incorrect');
            feedback.innerHTML = `
                <strong>Incorrect.</strong> Look carefully at the chromatogram patterns. 
                Compare the number of spots and their positions. Food colouring F has the same pattern as one of the toxic dyes. 
                Which toxic dye shows two spots at the same positions as F?
            `;
        }
    }
    
    switchPhase(phase) {
        // Update current phase
        this.currentPhase = phase;
        
        // Update phase indicators
        document.querySelectorAll('.phase').forEach(p => {
            p.classList.remove('active');
        });
        document.querySelector(`[data-phase="${phase}"]`).classList.add('active');
        
        // Update phase content
        document.querySelectorAll('.phase-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${phase}-phase`).classList.add('active');
    }
    
    canNavigateToPhase(phase) {
        // Define navigation rules
        switch(phase) {
            case 'setup':
                return true;
            case 'process':
                return this.placedDyes.size === 5;
            case 'analysis':
                return this.separationComplete;
            default:
                return false;
        }
    }
    
    updatePhaseDisplay() {
        // Update phase accessibility based on progress
        document.querySelectorAll('.phase').forEach(phase => {
            const phaseType = phase.dataset.phase;
            if (this.canNavigateToPhase(phaseType)) {
                phase.style.opacity = '1';
                phase.style.cursor = 'pointer';
            } else {
                phase.style.opacity = '0.5';
                phase.style.cursor = 'not-allowed';
            }
        });
    }
    
    resetSimulation() {
        // Reset all simulation state
        this.currentPhase = 'setup';
        this.placedDyes.clear();
        this.waterFilled = false;
        this.separationComplete = false;
        
        // Reset UI elements
        this.switchPhase('setup');
        
        // Reset dye spots
        document.querySelectorAll('.dye-spot').forEach(spot => {
            spot.classList.add('hidden');
        });
        
        // Reset spot markers
        document.querySelectorAll('.spot-marker').forEach(marker => {
            marker.style.opacity = '1';
        });
        
        // Reset water level
        document.getElementById('water-level').style.height = '0';
        
        // Reset buttons
        document.getElementById('start-process').disabled = true;
        document.getElementById('fill-water').disabled = false;
        document.getElementById('fill-water').textContent = 'Fill Water';
        document.getElementById('start-separation').disabled = true;
        
        // Reset timer
        document.getElementById('timer').textContent = '0';
        
        // Reset assessment
        document.getElementById('assessment-panel').classList.add('hidden');
        document.getElementById('answer-input').value = '';
        document.getElementById('feedback').classList.add('hidden');
        
        // Clear chromatogram results
        document.querySelectorAll('.final-chromatogram').forEach(container => {
            container.innerHTML = '';
        });
        
        // Clear process chromatogram spots
        document.querySelectorAll('.chromatogram-spot').forEach(spot => {
            spot.style.bottom = '0';
            spot.style.opacity = '1';
        });
        
        // Remove any dynamically created spots
        document.querySelectorAll('.chromatogram-spots > div:not(.chromatogram-spot)').forEach(spot => {
            spot.remove();
        });
        
        this.updatePhaseDisplay();
    }
    
    showTooltip(element, message) {
        // Create and show tooltip for user feedback
        const tooltip = document.createElement('div');
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
        
        // Remove tooltip after 2 seconds
        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 2000);
    }
}

// Initialize the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChromatographySimulation();
});

// Handle responsive height adjustment
function adjustHeight() {
    const container = document.querySelector('.container');
    if (window.parent !== window) {
        // In iframe
        container.style.height = '450px';
    } else {
        // In new tab
        container.style.height = '90vh';
    }
}

// Adjust height on load and resize
window.addEventListener('load', adjustHeight);
window.addEventListener('resize', adjustHeight);