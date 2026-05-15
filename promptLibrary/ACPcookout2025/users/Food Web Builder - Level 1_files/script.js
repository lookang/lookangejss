// Food Web Simulation Game - Level 1: Building Food Chains
// Designed for lower readiness Secondary 3 students with extensive scaffolding

class FoodWebGame {
    constructor() {
        // Game state management
        this.currentLevel = 1;
        this.progress = 0;
        this.attempts = 0;
        this.hintsUsed = 0;
        this.correctPlacements = 0;
        this.totalSlots = 4;
        
        // Game elements
        this.mascot = document.getElementById('mascotCharacter');
        this.mascotSpeech = document.getElementById('mascotSpeech');
        this.mascotText = document.getElementById('mascotText');
        this.instructionText = document.getElementById('instructionText');
        this.feedbackMessage = document.getElementById('feedbackMessage');
        this.checkButton = document.getElementById('checkButton');
        this.progressBar = document.getElementById('progressBar');
        this.headerTooltip = document.getElementById('headerTooltip');
        
        // Initialize game
        this.init();
    }

    init() {
        console.log('Initializing Food Web Game Level 1');
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.showWelcomeMessage();
        this.updateProgress();
        
        // Show header tooltip on progress bar hover
        this.progressBar.addEventListener('mouseenter', () => {
            this.headerTooltip.style.opacity = '1';
        });
        
        this.progressBar.addEventListener('mouseleave', () => {
            this.headerTooltip.style.opacity = '0';
        });
    }

    setupEventListeners() {
        // Mascot interaction for hints and encouragement
        this.mascot.addEventListener('click', () => {
            this.showMascotHint();
        });

        // Show me how button - demonstrates correct sequence
        document.getElementById('showMeButton').addEventListener('click', () => {
            this.demonstrateCorrectSequence();
        });

        // Hint button - provides contextual hints
        document.getElementById('hintButton').addEventListener('click', () => {
            this.provideHint();
        });

        // Reset button - clears all placements
        document.getElementById('resetButton').addEventListener('click', () => {
            this.resetGame();
        });

        // Check answer button - validates current arrangement
        this.checkButton.addEventListener('click', () => {
            this.checkAnswer();
        });

        // Glossary toggle
        document.getElementById('glossaryToggle').addEventListener('click', () => {
            this.toggleGlossary();
        });

        // Success modal buttons
        document.getElementById('nextLevelButton').addEventListener('click', () => {
            this.proceedToNextLevel();
        });

        document.getElementById('practiceButton').addEventListener('click', () => {
            this.practiceMode();
        });
    }

    setupDragAndDrop() {
        console.log('Setting up drag and drop functionality');
        
        const organisms = document.querySelectorAll('.organism');
        const slots = document.querySelectorAll('.chain-slot');

        // Make organisms draggable
        organisms.forEach(organism => {
            organism.addEventListener('dragstart', (e) => {
                console.log('Drag started:', organism.dataset.type);
                e.dataTransfer.setData('text/plain', organism.dataset.type);
                organism.classList.add('dragging');
            });

            organism.addEventListener('dragend', () => {
                organism.classList.remove('dragging');
            });

            // Touch support for mobile devices
            organism.addEventListener('touchstart', (e) => {
                this.handleTouchStart(e, organism);
            });
        });

        // Setup drop zones
        slots.forEach(slot => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.classList.add('drag-over');
            });

            slot.addEventListener('dragleave', () => {
                slot.classList.remove('drag-over');
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                const organismType = e.dataTransfer.getData('text/plain');
                this.handleDrop(slot, organismType);
                slot.classList.remove('drag-over');
            });

            // Touch support for drop zones
            slot.addEventListener('touchend', (e) => {
                this.handleTouchDrop(e, slot);
            });
        });
    }

    handleTouchStart(e, organism) {
        // Store touch information for mobile drag and drop
        this.touchedOrganism = organism;
        organism.style.opacity = '0.7';
    }

    handleTouchDrop(e, slot) {
        if (this.touchedOrganism) {
            const organismType = this.touchedOrganism.dataset.type;
            this.handleDrop(slot, organismType);
            this.touchedOrganism.style.opacity = '1';
            this.touchedOrganism = null;
        }
    }

    handleDrop(slot, organismType) {
        console.log(`Attempting to place ${organismType} in slot ${slot.id}`);
        
        const acceptedType = slot.dataset.accepts;
        const isCorrect = organismType === acceptedType;

        if (isCorrect) {
            this.placeOrganismInSlot(slot, organismType);
            this.showPositiveFeedback(slot);
            this.correctPlacements++;
            
            // Update check button state
            if (this.correctPlacements === this.totalSlots) {
                this.checkButton.disabled = false;
                this.checkButton.style.background = 'linear-gradient(145deg, #4CAF50, #45a049)';
                this.showMascotMessage("Great! Now click 'Check Answer' to see if your food chain is complete!");
            }
        } else {
            this.showNegativeFeedback(slot, organismType, acceptedType);
        }

        this.attempts++;
    }

    placeOrganismInSlot(slot, organismType) {
        // Clear any existing content
        slot.innerHTML = '';
        
        // Create organism display in slot
        const organismData = this.getOrganismData(organismType);
        const organismDisplay = document.createElement('div');
        organismDisplay.className = 'placed-organism';
        organismDisplay.innerHTML = `
            <div class="organism-icon" style="font-size: 28px;">${organismData.icon}</div>
            <div class="organism-name" style="font-size: 10px; margin-top: 4px;">${organismData.name}</div>
        `;
        
        slot.appendChild(organismDisplay);
        slot.classList.add('filled', 'correct');
        
        // Hide the original organism from the bank
        const originalOrganism = document.querySelector(`[data-type="${organismType}"]`);
        if (originalOrganism) {
            originalOrganism.style.opacity = '0.3';
            originalOrganism.draggable = false;
        }
    }

    getOrganismData(type) {
        const organisms = {
            'sun': { icon: '☀️', name: 'Sun' },
            'producer': { icon: '🌱', name: 'Grass' },
            'primary-consumer': { icon: '🐰', name: 'Rabbit' },
            'secondary-consumer': { icon: '🦊', name: 'Fox' }
        };
        return organisms[type];
    }

    showPositiveFeedback(slot) {
        // Visual feedback for correct placement
        slot.style.animation = 'bounce 0.6s ease-in-out';
        
        // Audio feedback (if supported)
        this.playSound('success');
        
        // Show encouraging message
        const messages = [
            "Perfect! That's exactly right!",
            "Excellent placement!",
            "You're doing great!",
            "Fantastic! Keep going!"
        ];
        
        this.showFeedback(messages[Math.floor(Math.random() * messages.length)], 'success');
        
        // Reset animation
        setTimeout(() => {
            slot.style.animation = '';
        }, 600);
    }

    showNegativeFeedback(slot, attempted, expected) {
        // Visual feedback for incorrect placement
        slot.classList.add('incorrect');
        
        // Provide specific educational feedback
        const feedback = this.getSpecificFeedback(attempted, expected);
        this.showFeedback(feedback, 'error');
        
        // Show mascot encouragement
        this.showMascotMessage("Don't worry! Try again. Remember the energy flow!");
        
        // Reset visual state
        setTimeout(() => {
            slot.classList.remove('incorrect');
        }, 1000);
    }

    getSpecificFeedback(attempted, expected) {
        const feedbackMap = {
            'sun-producer': "The sun gives energy to plants first!",
            'sun-primary-consumer': "Animals can't eat sunlight directly. What do they eat?",
            'sun-secondary-consumer': "The sun doesn't directly feed carnivores. What's missing?",
            'producer-sun': "Plants need the sun's energy first!",
            'producer-primary-consumer': "Good thinking! But what comes before grass?",
            'producer-secondary-consumer': "Plants don't directly feed foxes. What eats plants?",
            'primary-consumer-sun': "Rabbits can't eat sunlight! What do rabbits eat?",
            'primary-consumer-producer': "Close! But what gives energy to plants?",
            'primary-consumer-secondary-consumer': "Rabbits come before foxes in the food chain!",
            'secondary-consumer-sun': "Foxes don't eat sunlight! What do foxes eat?",
            'secondary-consumer-producer': "Foxes don't usually eat plants. What do they hunt?",
            'secondary-consumer-primary-consumer': "Foxes eat rabbits, but what comes first?"
        };
        
        const key = `${attempted}-${expected}`;
        return feedbackMap[key] || "That doesn't quite fit there. Think about who eats who!";
    }

    showFeedback(message, type) {
        this.feedbackMessage.textContent = message;
        this.feedbackMessage.className = `show ${type}`;
        
        setTimeout(() => {
            this.feedbackMessage.classList.remove('show');
        }, 3000);
    }

    showMascotMessage(message) {
        this.mascotText.textContent = message;
        this.mascotSpeech.classList.add('show');
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            this.mascotSpeech.classList.remove('show');
        }, 4000);
    }

    showMascotHint() {
        this.hintsUsed++;
        
        const hints = [
            "Energy always starts with the sun! ☀️",
            "Plants are producers - they make their own food! 🌱",
            "Rabbits are herbivores - they eat plants! 🐰",
            "Foxes are carnivores - they eat other animals! 🦊",
            "Think: Sun → Plant → Plant-eater → Meat-eater"
        ];
        
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        this.showMascotMessage(randomHint);
    }

    provideHint() {
        // Provide contextual hints based on current state
        const emptySlots = document.querySelectorAll('.chain-slot:not(.filled)');
        
        if (emptySlots.length === 4) {
            this.showFeedback("Start by placing the sun in the first slot!", 'info');
        } else if (emptySlots.length === 3) {
            this.showFeedback("Next, add a producer (something that makes its own food)!", 'info');
        } else if (emptySlots.length === 2) {
            this.showFeedback("Now add a primary consumer (something that eats plants)!", 'info');
        } else if (emptySlots.length === 1) {
            this.showFeedback("Finally, add a secondary consumer (something that eats animals)!", 'info');
        }
        
        this.hintsUsed++;
    }

    demonstrateCorrectSequence() {
        console.log('Demonstrating correct sequence');
        
        // Reset first
        this.resetGame();
        
        // Show step-by-step demonstration
        const sequence = [
            { slot: 'slot1', type: 'sun', delay: 1000 },
            { slot: 'slot2', type: 'producer', delay: 2000 },
            { slot: 'slot3', type: 'primary-consumer', delay: 3000 },
            { slot: 'slot4', type: 'secondary-consumer', delay: 4000 }
        ];
        
        this.showMascotMessage("Watch carefully! I'll show you the correct order.");
        
        sequence.forEach(step => {
            setTimeout(() => {
                const slot = document.getElementById(step.slot);
                this.placeOrganismInSlot(slot, step.type);
                this.correctPlacements++;
                
                if (step.type === 'secondary-consumer') {
                    this.checkButton.disabled = false;
                    this.showMascotMessage("See? Sun → Grass → Rabbit → Fox! Now try it yourself!");
                    
                    // Reset after demonstration
                    setTimeout(() => {
                        this.resetGame();
                    }, 3000);
                }
            }, step.delay);
        });
    }

    checkAnswer() {
        console.log('Checking answer');
        
        if (this.correctPlacements === this.totalSlots) {
            this.showSuccessModal();
            this.updateProgress();
        } else {
            this.showFeedback("Not quite complete yet. Make sure all slots are filled correctly!", 'error');
        }
    }

    showSuccessModal() {
        const modal = document.getElementById('successModal');
        const starRating = document.getElementById('starRating');
        
        // Calculate star rating based on performance
        let stars = 3;
        if (this.attempts > 8) stars = 1;
        else if (this.attempts > 5) stars = 2;
        
        starRating.textContent = '⭐'.repeat(stars);
        
        // Show celebration animation
        this.playSound('celebration');
        modal.classList.add('show');
        
        // Update mascot message
        this.showMascotMessage("Fantastic work! You built a perfect food chain! 🎉");
    }

    resetGame() {
        console.log('Resetting game');
        
        // Clear all slots
        const slots = document.querySelectorAll('.chain-slot');
        slots.forEach(slot => {
            slot.innerHTML = `<div class="slot-hint">${this.getSlotHint(slot.id)}</div>`;
            slot.classList.remove('filled', 'correct', 'incorrect');
        });
        
        // Reset organisms in bank
        const organisms = document.querySelectorAll('.organism');
        organisms.forEach(organism => {
            organism.style.opacity = '1';
            organism.draggable = true;
        });
        
        // Reset game state
        this.correctPlacements = 0;
        this.checkButton.disabled = true;
        this.checkButton.style.background = '#ccc';
        
        // Reset feedback
        this.feedbackMessage.classList.remove('show');
        
        this.showMascotMessage("Let's try again! Remember: energy flows from the sun through living things.");
    }

    getSlotHint(slotId) {
        const hints = {
            'slot1': 'Energy Source',
            'slot2': 'Producer',
            'slot3': 'Primary Consumer',
            'slot4': 'Secondary Consumer'
        };
        return hints[slotId];
    }

    toggleGlossary() {
        const glossaryContent = document.getElementById('glossaryContent');
        glossaryContent.classList.toggle('show');
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        // Update progress based on level completion
        const progressPercentage = (this.currentLevel / 4) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `Level ${this.currentLevel}: Building Food Chains`;
    }

    proceedToNextLevel() {
        // In a full implementation, this would load Level 2
        alert('Congratulations! In the full version, you would proceed to Level 2: Multiple Food Chains');
        document.getElementById('successModal').classList.remove('show');
        this.resetGame();
    }

    practiceMode() {
        document.getElementById('successModal').classList.remove('show');
        this.resetGame();
        this.showMascotMessage("Great choice! Practice makes perfect. Try building the food chain again!");
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.showMascotMessage("Hi! I'm Ollie the Owl. Let's learn about food chains! Drag the organisms to build a chain showing how energy flows in nature.");
        }, 1000);
    }

    playSound(type) {
        // Audio feedback implementation (would use Web Audio API in full version)
        console.log(`Playing ${type} sound`);
        
        // Simple audio feedback using system sounds
        if ('speechSynthesis' in window && type === 'success') {
            const utterance = new SpeechSynthesisUtterance('Correct!');
            utterance.rate = 1.5;
            utterance.pitch = 1.2;
            utterance.volume = 0.3;
            speechSynthesis.speak(utterance);
        }
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Food Web Game');
    const game = new FoodWebGame();
    
    // Expose game instance for debugging
    window.foodWebGame = game;
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust layout for different screen sizes
    const gameContainer = document.getElementById('gameContainer');
    const isIframe = window.self !== window.top;
    
    if (isIframe) {
        gameContainer.style.height = '450px';
    } else {
        gameContainer.style.height = '90vh';
    }
});

// Prevent context menu on touch devices for better UX
document.addEventListener('contextmenu', (e) => {
    if (e.target.classList.contains('organism') || e.target.classList.contains('chain-slot')) {
        e.preventDefault();
    }
});

// Handle visibility change (when tab becomes inactive/active)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any animations or sounds when tab is not visible
        console.log('Game paused - tab not visible');
    } else {
        // Resume when tab becomes visible again
        console.log('Game resumed - tab visible');
    }
});