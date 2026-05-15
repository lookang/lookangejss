// Food Web Ecosystem Interactive Assessment
// This script manages the ecosystem simulation and student interactions

class FoodWebEcosystem {
    constructor() {
        // Initialize organism data with feeding relationships and population dynamics
        this.organisms = {
            grass: { 
                name: 'Grass', 
                population: 50, 
                basePopulation: 50, 
                level: 'producer',
                feeds: [],
                fedBy: ['rabbit', 'deer', 'mouse'],
                growthRate: 0.1,
                maxCapacity: 100
            },
            rabbit: { 
                name: 'Rabbit', 
                population: 30, 
                basePopulation: 30, 
                level: 'primary',
                feeds: ['grass'],
                fedBy: ['fox', 'hawk'],
                dependencyFactor: 0.6
            },
            deer: { 
                name: 'Deer', 
                population: 25, 
                basePopulation: 25, 
                level: 'primary',
                feeds: ['grass'],
                fedBy: ['wolf'],
                dependencyFactor: 0.5
            },
            mouse: { 
                name: 'Mouse', 
                population: 40, 
                basePopulation: 40, 
                level: 'primary',
                feeds: ['grass'],
                fedBy: ['snake', 'hawk'],
                dependencyFactor: 0.7
            },
            fox: { 
                name: 'Fox', 
                population: 15, 
                basePopulation: 15, 
                level: 'secondary',
                feeds: ['rabbit'],
                fedBy: ['wolf'],
                dependencyFactor: 0.8
            },
            hawk: { 
                name: 'Hawk', 
                population: 12, 
                basePopulation: 12, 
                level: 'secondary',
                feeds: ['rabbit', 'mouse'],
                fedBy: [],
                dependencyFactor: 0.7
            },
            snake: { 
                name: 'Snake', 
                population: 10, 
                basePopulation: 10, 
                level: 'secondary',
                feeds: ['mouse'],
                fedBy: [],
                dependencyFactor: 0.9
            },
            wolf: { 
                name: 'Wolf', 
                population: 8, 
                basePopulation: 8, 
                level: 'tertiary',
                feeds: ['deer', 'fox'],
                fedBy: [],
                dependencyFactor: 0.9
            }
        };

        // Assessment tracking
        this.observations = [];
        this.interactionCount = 0;
        this.correctObservations = 0;
        this.selectedOrganism = 'grass';
        
        // Initialize the interface
        this.initializeInterface();
        this.bindEvents();
        this.updateDisplay();
        // Enable dragging and keep connections updated
        this.setupDragging();
        this.updateAllArrows();
    }

    initializeInterface() {
        // Set up initial UI state
        this.progressBar = document.getElementById('progressBar');
        this.progressText = document.getElementById('progressText');
        this.organismSelect = document.getElementById('organismSelect');
        this.populationSlider = document.getElementById('populationSlider');
        this.sliderValue = document.getElementById('sliderValue');
        this.feedbackMessage = document.getElementById('feedbackMessage');
        this.observationList = document.getElementById('observationList');
        
        // Set initial slider value
        this.populationSlider.value = this.organisms[this.selectedOrganism].population;
        this.sliderValue.textContent = this.populationSlider.value;
    }

    bindEvents() {
        // Organism selection change
        this.organismSelect.addEventListener('change', (e) => {
            this.selectedOrganism = e.target.value;
            this.populationSlider.value = this.organisms[this.selectedOrganism].population;
            this.sliderValue.textContent = this.populationSlider.value;
            this.highlightSelectedOrganism();
            this.showFeedback('Selected ' + this.organisms[this.selectedOrganism].name + ' for modification.', 'info');
        });

        // Population slider change
        this.populationSlider.addEventListener('input', (e) => {
            this.sliderValue.textContent = e.target.value;
        });

        // Observe changes button
        document.getElementById('observeBtn').addEventListener('click', () => {
            this.observeEcosystemChanges();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetEcosystem();
        });

        // Submit button
        document.getElementById('submitBtn').addEventListener('click', () => {
            this.submitAssessment();
        });

        // Organism click interactions for additional feedback
        document.querySelectorAll('.organism').forEach(organism => {
            organism.addEventListener('click', (e) => {
                const type = e.currentTarget.getAttribute('data-type');
                this.showOrganismInfo(type);
            });
        });

        // Initial organism highlight
        this.highlightSelectedOrganism();
    }

    highlightSelectedOrganism() {
        // Remove previous selections
        document.querySelectorAll('.organism-circle').forEach(circle => {
            circle.classList.remove('selected');
        });
        
        // Highlight current selection
        const selectedElement = document.querySelector(`[data-type="${this.selectedOrganism}"] .organism-circle`);
        if (selectedElement) {
            selectedElement.classList.add('selected');
        }
    }

    observeEcosystemChanges() {
        const newPopulation = parseInt(this.populationSlider.value);
        const oldPopulation = this.organisms[this.selectedOrganism].population;
        const change = newPopulation - oldPopulation;
        
        if (change === 0) {
            this.showFeedback('No change detected. Try adjusting the population slider.', 'info');
            return;
        }

        // Update the selected organism's population
        this.organisms[this.selectedOrganism].population = newPopulation;
        
        // Calculate ecosystem effects using ecological principles
        this.calculateEcosystemEffects(this.selectedOrganism, change);
        
        // Update visual display
        this.updateDisplay();
        
        // Record observation
        this.recordObservation(this.selectedOrganism, change);
        
        // Provide feedback
        this.provideFeedback(this.selectedOrganism, change);
        
        // Update progress
        this.updateProgress();
        
        this.interactionCount++;
    }

    calculateEcosystemEffects(changedOrganism, change) {
        const organism = this.organisms[changedOrganism];
        
        // Effect on organisms this one feeds on (prey)
        organism.feeds.forEach(preyType => {
            const prey = this.organisms[preyType];
            // If predator increases, prey decreases (and vice versa)
            const effect = -change * 0.3; // 30% inverse relationship
            prey.population = Math.max(0, Math.min(100, prey.population + effect));
        });

        // Effect on organisms that feed on this one (predators)
        organism.fedBy.forEach(predatorType => {
            const predator = this.organisms[predatorType];
            // If prey increases, predator can increase (and vice versa)
            const effect = change * predator.dependencyFactor * 0.2; // 20% direct relationship
            predator.population = Math.max(0, Math.min(100, predator.population + effect));
        });

        // Secondary effects (cascade through food web)
        this.calculateSecondaryEffects(changedOrganism, change);
    }

    calculateSecondaryEffects(originalOrganism, originalChange) {
        // Implement trophic cascade effects
        const visited = new Set([originalOrganism]);
        const queue = [{organism: originalOrganism, change: originalChange, depth: 0}];
        
        while (queue.length > 0 && queue[0].depth < 3) { // Limit cascade depth
            const {organism: currentOrganism, change: currentChange, depth} = queue.shift();
            const current = this.organisms[currentOrganism];
            
            // Reduced effect with each level
            const dampening = Math.pow(0.5, depth + 1);
            
            // Affect next level in food chain
            current.feeds.forEach(preyType => {
                if (!visited.has(preyType)) {
                    const effect = -currentChange * dampening * 0.1;
                    this.organisms[preyType].population = Math.max(0, Math.min(100, 
                        this.organisms[preyType].population + effect));
                    queue.push({organism: preyType, change: effect, depth: depth + 1});
                    visited.add(preyType);
                }
            });
            
            current.fedBy.forEach(predatorType => {
                if (!visited.has(predatorType)) {
                    const effect = currentChange * dampening * 0.1;
                    this.organisms[predatorType].population = Math.max(0, Math.min(100, 
                        this.organisms[predatorType].population + effect));
                    queue.push({organism: predatorType, change: effect, depth: depth + 1});
                    visited.add(predatorType);
                }
            });
        }
    }

    updateDisplay() {
        // Update population counts in the visualization
        Object.keys(this.organisms).forEach(type => {
            const countElement = document.getElementById(`${type}-count`);
            if (countElement) {
                const population = Math.round(this.organisms[type].population);
                countElement.textContent = population;
                
                // Visual feedback based on population health
                const circle = document.querySelector(`[data-type="${type}"] .organism-circle`);
                if (circle) {
                    if (population < 10) {
                        circle.style.opacity = '0.4';
                        circle.style.filter = 'grayscale(50%)';
                    } else if (population > 80) {
                        circle.style.opacity = '1';
                        circle.style.filter = 'brightness(1.2)';
                    } else {
                        circle.style.opacity = '1';
                        circle.style.filter = 'none';
                    }
                }
            }
        });

        // Keep arrows aligned (useful if anything shifted due to responsive layout)
        this.updateAllArrows();
    }

    // ----- Draggable nodes and live arrow updates -----

    setupDragging() {
        const svg = document.getElementById('foodWebSvg');
        if (!svg) return;

        let dragging = null;
        let dragMoved = false;
        let activePointerId = null;

        const getMouse = (evt) => {
            const pt = svg.createSVGPoint();
            pt.x = evt.clientX;
            pt.y = evt.clientY;
            const ctm = svg.getScreenCTM();
            if (!ctm) return { x: 0, y: 0 };
            const inv = ctm.inverse();
            const p = pt.matrixTransform(inv);
            return { x: p.x, y: p.y };
        };

        const onPointerMove = (evt) => {
            if (!dragging) return;
            evt.preventDefault();
            const m = getMouse(evt);

            // Detect if this interaction is an actual drag (for click suppression)
            const moved = Math.hypot(m.x - dragging.start.x, m.y - dragging.start.y);
            if (moved > 2) dragMoved = true;

            const nx = m.x - dragging.offset.x;
            const ny = m.y - dragging.offset.y;
            this.moveOrganism(dragging.type, nx, ny);
            this.updateAllArrows();
        };

        const onPointerUp = (evt) => {
            if (!dragging) return;
            const group = document.querySelector(`[data-type="${dragging.type}"]`);
            if (group) {
                group.style.cursor = 'grab';
                group.classList.remove('dragging');
                if (activePointerId != null && group.releasePointerCapture) {
                    try { group.releasePointerCapture(activePointerId); } catch (e) {}
                }
            }
            svg.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);

            // Defer clearing flag so click after drag can be suppressed
            setTimeout(() => { dragMoved = false; }, 0);
            dragging = null;
            activePointerId = null;
        };

        document.querySelectorAll('.organism').forEach(group => {
            group.style.cursor = 'grab';

            // Prevent click-after-drag from triggering info popups
            group.addEventListener('click', (evt) => {
                if (dragMoved) { evt.stopImmediatePropagation(); evt.preventDefault(); }
            }, true);

            group.addEventListener('pointerdown', (evt) => {
                const type = group.getAttribute('data-type');
                const circle = group.querySelector('.organism-circle');
                if (!circle) return;

                const cx = parseFloat(circle.getAttribute('cx'));
                const cy = parseFloat(circle.getAttribute('cy'));
                const m = getMouse(evt);

                dragging = {
                    type,
                    offset: { x: m.x - cx, y: m.y - cy },
                    start: { x: m.x, y: m.y }
                };

                dragMoved = false;
                activePointerId = (typeof evt.pointerId === 'number') ? evt.pointerId : null;
                if (group.setPointerCapture && activePointerId !== null) {
                    try { group.setPointerCapture(activePointerId); } catch (e) {}
                }
                group.classList.add('dragging');
                group.style.cursor = 'grabbing';

                svg.addEventListener('pointermove', onPointerMove);
                window.addEventListener('pointerup', onPointerUp);
                evt.preventDefault();
            });
        });
    }

    moveOrganism(type, newX, newY) {
        const group = document.querySelector(`[data-type="${type}"]`);
        if (!group) return;
        const circle = group.querySelector('.organism-circle');
        if (!circle) return;

        const cx = parseFloat(circle.getAttribute('cx'));
        const cy = parseFloat(circle.getAttribute('cy'));
        const dx = newX - cx;
        const dy = newY - cy;

        // Move circle
        circle.setAttribute('cx', newX);
        circle.setAttribute('cy', newY);

        // Move texts by same delta to keep relative layout
        group.querySelectorAll('text').forEach(t => {
            const x = parseFloat(t.getAttribute('x'));
            const y = parseFloat(t.getAttribute('y'));
            t.setAttribute('x', x + dx);
            t.setAttribute('y', y + dy);
        });
    }

    getCenter(type) {
        const circle = document.querySelector(`[data-type="${type}"] .organism-circle`);
        if (!circle) return null;
        return {
            x: parseFloat(circle.getAttribute('cx')),
            y: parseFloat(circle.getAttribute('cy')),
            r: parseFloat(circle.getAttribute('r')) || 25
        };
    }

    updateArrow(line) {
        const from = line.getAttribute('data-from');
        const to = line.getAttribute('data-to');
        if (!from || !to) return;

        const start = this.getCenter(from);
        const end = this.getCenter(to);
        if (!start || !end) return;

        const vx = end.x - start.x;
        const vy = end.y - start.y;
        const len = Math.hypot(vx, vy) || 1;
        const ux = vx / len;
        const uy = vy / len;

        // Offset so lines meet circle edges, not centers
        const arrowHeadPadding = 8;
        const x1 = start.x + ux * (start.r + 2);
        const y1 = start.y + uy * (start.r + 2);
        const x2 = end.x - ux * (end.r + arrowHeadPadding);
        const y2 = end.y - uy * (end.r + arrowHeadPadding);

        line.setAttribute('x1', x1.toFixed(1));
        line.setAttribute('y1', y1.toFixed(1));
        line.setAttribute('x2', x2.toFixed(1));
        line.setAttribute('y2', y2.toFixed(1));
    }

    updateAllArrows() {
        document.querySelectorAll('.food-arrow').forEach(line => this.updateArrow(line));
    }

    // ----- End of dragging/arrow code -----

    recordObservation(organism, change) {
        const direction = change > 0 ? 'increased' : 'decreased';
        const magnitude = Math.abs(change);
        
        // Analyze the observation for correctness
        const observation = {
            organism: organism,
            change: change,
            timestamp: new Date().toLocaleTimeString(),
            effects: this.analyzeEffects(organism, change)
        };
        
        this.observations.push(observation);
        
        // Add to observation log
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${this.organisms[organism].name}</strong> ${direction} by ${magnitude}. 
            Effects: ${observation.effects.summary}
        `;
        this.observationList.appendChild(listItem);
        
        // Scroll to bottom of log
        this.observationList.scrollTop = this.observationList.scrollHeight;
    }

    analyzeEffects(organism, change) {
        const effects = {
            summary: '',
            correct: false,
            details: []
        };
        
        const org = this.organisms[organism];
        let correctPredictions = 0;
        let totalPredictions = 0;
        
        // Check effects on prey
        org.feeds.forEach(preyType => {
            totalPredictions++;
            const preyChange = this.organisms[preyType].population - this.organisms[preyType].basePopulation;
            if ((change > 0 && preyChange < 0) || (change < 0 && preyChange > 0)) {
                correctPredictions++;
                effects.details.push(`${this.organisms[preyType].name} population affected correctly`);
            }
        });
        
        // Check effects on predators
        org.fedBy.forEach(predatorType => {
            totalPredictions++;
            const predatorChange = this.organisms[predatorType].population - this.organisms[predatorType].basePopulation;
            if ((change > 0 && predatorChange > 0) || (change < 0 && predatorChange < 0)) {
                correctPredictions++;
                effects.details.push(`${this.organisms[predatorType].name} population affected correctly`);
            }
        });
        
        effects.correct = correctPredictions >= totalPredictions * 0.7; // 70% threshold
        effects.summary = `${correctPredictions}/${totalPredictions} relationships showed expected patterns`;
        
        if (effects.correct) {
            this.correctObservations++;
        }
        
        return effects;
    }

    provideFeedback(organism, change) {
        const org = this.organisms[organism];
        const direction = change > 0 ? 'increased' : 'decreased';
        
        let feedback = `You ${direction} ${org.name} population. `;
        
        // Provide educational feedback about relationships
        if (org.feeds.length > 0) {
            const preyNames = org.feeds.map(prey => this.organisms[prey].name).join(', ');
            feedback += `This affects ${preyNames} (what ${org.name} eats). `;
        }
        
        if (org.fedBy.length > 0) {
            const predatorNames = org.fedBy.map(pred => this.organisms[pred].name).join(', ');
            feedback += `This also affects ${predatorNames} (what eats ${org.name}). `;
        }
        
        feedback += 'Observe how the entire food web responds!';
        
        this.showFeedback(feedback, 'success');
    }

    showFeedback(message, type) {
        this.feedbackMessage.textContent = message;
        this.feedbackMessage.className = `feedback-message ${type}`;
        
        // Auto-hide after 5 seconds for non-error messages
        if (type !== 'error') {
            setTimeout(() => {
                this.feedbackMessage.textContent = '';
                this.feedbackMessage.className = 'feedback-message';
            }, 5000);
        }
    }

    showOrganismInfo(type) {
        const organism = this.organisms[type];
        let info = `${organism.name} (${organism.level} consumer)\n`;
        info += `Current population: ${Math.round(organism.population)}\n`;
        
        if (organism.feeds.length > 0) {
            info += `Feeds on: ${organism.feeds.map(prey => this.organisms[prey].name).join(', ')}\n`;
        }
        
        if (organism.fedBy.length > 0) {
            info += `Eaten by: ${organism.fedBy.map(pred => this.organisms[pred].name).join(', ')}`;
        }
        
        this.showFeedback(info, 'info');
    }

    updateProgress() {
        // Calculate progress based on interactions and correct observations
        const maxInteractions = 8; // Target number of meaningful interactions
        const interactionProgress = Math.min(this.interactionCount / maxInteractions, 1) * 50;
        const observationProgress = (this.correctObservations / Math.max(this.interactionCount, 1)) * 50;
        
        const totalProgress = Math.min(interactionProgress + observationProgress, 100);
        
        this.progressBar.style.setProperty('--progress', `${totalProgress}%`);
        this.progressText.textContent = `${Math.round(totalProgress)}% Complete`;
        
        // Show submit button when sufficient progress is made
        if (totalProgress >= 70 && this.interactionCount >= 5) {
            document.getElementById('submitBtn').style.display = 'block';
        }
    }

    resetEcosystem() {
        // Reset all populations to base values
        Object.keys(this.organisms).forEach(type => {
            this.organisms[type].population = this.organisms[type].basePopulation;
        });
        
        // Reset UI
        this.populationSlider.value = this.organisms[this.selectedOrganism].population;
        this.sliderValue.textContent = this.populationSlider.value;
        
        // Clear observations
        this.observations = [];
        this.observationList.innerHTML = '';
        
        // Reset progress
        this.interactionCount = 0;
        this.correctObservations = 0;
        this.updateProgress();
        
        // Update display
        this.updateDisplay();
        
        // Hide submit button
        document.getElementById('submitBtn').style.display = 'none';
        
        this.showFeedback('Ecosystem reset to original state. Try exploring different scenarios!', 'info');
    }

    submitAssessment() {
        const accuracy = this.correctObservations / Math.max(this.interactionCount, 1);
        let grade = '';
        let message = '';
        
        if (accuracy >= 0.8) {
            grade = 'Excellent';
            message = 'Outstanding understanding of food web relationships! You correctly identified how changes cascade through the ecosystem.';
        } else if (accuracy >= 0.6) {
            grade = 'Good';
            message = 'Good grasp of food web concepts. Consider how changes affect multiple levels of the food chain.';
        } else if (accuracy >= 0.4) {
            grade = 'Fair';
            message = 'Basic understanding shown. Remember that changes in one population affect both predators and prey.';
        } else {
            grade = 'Needs Improvement';
            message = 'Keep exploring! Focus on how organisms depend on each other for food and survival.';
        }
        
        const summary = `
            Assessment Complete!
            Grade: ${grade}
            Accuracy: ${Math.round(accuracy * 100)}%
            Interactions: ${this.interactionCount}
            Correct Observations: ${this.correctObservations}
            
            ${message}
            
            Key Learning: Food webs show how all organisms in an ecosystem are interconnected. Changes to one population create ripple effects throughout the entire system.
        `;
        
        this.showFeedback(summary, accuracy >= 0.6 ? 'success' : 'error');
        
        // Update progress to 100%
        this.progressBar.style.setProperty('--progress', '100%');
        this.progressText.textContent = '100% Complete';
    }
}

// Initialize the ecosystem when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Expose instance for resize hook to keep arrows connected
    window.__foodWeb = new FoodWebEcosystem();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust SVG viewBox if needed for mobile
    const svg = document.getElementById('foodWebSvg');
    const container = document.querySelector('.food-web-container');
    
    if (container && svg) {
        const containerWidth = container.clientWidth;
        if (containerWidth < 600) {
            svg.setAttribute('viewBox', '0 0 600 400');
        } else {
            svg.setAttribute('viewBox', '0 0 800 400');
        }
    }

    // Keep arrows connected after layout changes
    if (window.__foodWeb && typeof window.__foodWeb.updateAllArrows === 'function') {
        window.__foodWeb.updateAllArrows();
    }
});
