// Pedestrian Safety Explorer Game - Interactive simulation for learning traffic signs
// Designed for Primary 3-5 students with mixed abilities

class PedestrianSafetyGame {
    constructor() {
        // Game state management
        this.currentArea = 'school';
        this.score = 0;
        this.maxScore = 100;
        this.position = { x: 50, y: 50 }; // Character position as percentage
        this.badges = {
            crossing: false,
            warning: false,
            information: false,
            school: false
        };
        
        // Sign categories and their data
        this.signCategories = {
            crossing: ['🚦', '🚸', '⛔', '🔴'],
            warning: ['⚠️', '🚧', '⚡', '❗'],
            information: ['ℹ️', '🏥', '🚻', '♿'],
            school: ['🏫', '📚', '🚌', '👶']
        };
        
        // Current signs on screen
        this.currentSigns = [];
        this.signQuestions = this.initializeQuestions();
        
        // Area progression tracking
        this.areaProgress = {
            school: { completed: false, signsFound: 0, requiredSigns: 3 },
            shopping: { completed: false, signsFound: 0, requiredSigns: 4 },
            residential: { completed: false, signsFound: 0, requiredSigns: 4 },
            intersection: { completed: false, signsFound: 0, requiredSigns: 5 }
        };
        
        this.initializeGame();
    }
    
    // Initialize game elements and event listeners
    initializeGame() {
        this.setupEventListeners();
        this.updateUI();
        this.generateSigns();
        this.updateBackground();
        
        // Provide initial audio guidance
        this.speak("Welcome to Pedestrian Safety Explorer! Use the arrow buttons to move around and click on traffic signs to learn about them.");
    }
    
    // Set up all event listeners for interactive elements
    setupEventListeners() {
        // Movement controls - added down button event listener
        document.getElementById('leftBtn').addEventListener('click', () => this.moveCharacter('left'));
        document.getElementById('forwardBtn').addEventListener('click', () => this.moveCharacter('forward'));
        document.getElementById('rightBtn').addEventListener('click', () => this.moveCharacter('right'));
        document.getElementById('downBtn').addEventListener('click', () => this.moveCharacter('down')); // New down button
        
        // Area selection from map
        document.querySelectorAll('.area').forEach(area => {
            area.addEventListener('click', (e) => {
                const areaName = e.target.dataset.area;
                if (!e.target.classList.contains('locked')) {
                    this.changeArea(areaName);
                }
            });
        });
        
        // Touch and keyboard support
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Prevent context menu on long press for mobile
        document.addEventListener('contextmenu', e => e.preventDefault());
    }
    
    // Initialize question database for different signs
    initializeQuestions() {
        return {
            '🚦': {
                question: "What should you do at a traffic light?",
                choices: ["Wait for green", "Run across quickly", "Ignore the light", "Cross anytime"],
                correct: 0,
                explanation: "Always wait for the green pedestrian signal before crossing!"
            },
            '🚸': {
                question: "What does this pedestrian crossing sign mean?",
                choices: ["Children playing", "School zone ahead", "Pedestrian crossing", "No walking"],
                correct: 2,
                explanation: "This sign indicates a designated pedestrian crossing area."
            },
            '⛔': {
                question: "What should you do when you see this sign?",
                choices: ["Stop completely", "Slow down", "Speed up", "Turn around"],
                correct: 0,
                explanation: "This stop sign means you must come to a complete stop."
            },
            '⚠️': {
                question: "What does this warning sign tell you?",
                choices: ["Be careful", "Go faster", "Turn left", "Stop walking"],
                correct: 0,
                explanation: "Warning signs alert you to potential dangers ahead."
            },
            '🏫': {
                question: "What should you do in a school zone?",
                choices: ["Walk extra carefully", "Run to school", "Make noise", "Ignore signs"],
                correct: 0,
                explanation: "School zones require extra caution for children's safety."
            },
            '🚧': {
                question: "What does construction signage mean?",
                choices: ["Work area - be careful", "Play area", "Rest area", "Shopping area"],
                correct: 0,
                explanation: "Construction signs warn of work areas where you should be extra careful."
            }
        };
    }
    
    // Handle character movement with boundary checking - added down movement
    moveCharacter(direction) {
        const moveDistance = 15;
        let newX = this.position.x;
        let newY = this.position.y;
        
        switch(direction) {
            case 'left':
                newX = Math.max(10, this.position.x - moveDistance);
                break;
            case 'right':
                newX = Math.min(90, this.position.x + moveDistance);
                break;
            case 'forward':
                newY = Math.max(20, this.position.y - moveDistance);
                break;
            case 'down': // New down movement functionality
                newY = Math.min(80, this.position.y + moveDistance);
                break;
        }
        
        // Update position and check for sign interactions
        this.position.x = newX;
        this.position.y = newY;
        
        this.updateCharacterPosition();
        this.checkSignProximity();
        
        // Add movement feedback
        this.addMovementFeedback(direction);
    }
    
    // Update character sprite position on screen
    updateCharacterPosition() {
        const character = document.getElementById('character');
        character.style.left = this.position.x + '%';
        character.style.bottom = (100 - this.position.y) + '%';
    }
    
    // Generate random traffic signs in the current area
    generateSigns() {
        const signContainer = document.getElementById('signContainer');
        signContainer.innerHTML = '';
        this.currentSigns = [];
        
        const areaConfig = this.getAreaConfig();
        const signCount = areaConfig.signCount;
        const availableSigns = areaConfig.signs;
        
        for (let i = 0; i < signCount; i++) {
            const signType = availableSigns[Math.floor(Math.random() * availableSigns.length)];
            const sign = this.createSign(signType);
            signContainer.appendChild(sign);
            this.currentSigns.push({
                element: sign,
                type: signType,
                found: false
            });
        }
    }
    
    // Get configuration for current area
    getAreaConfig() {
        const configs = {
            school: {
                signCount: 3,
                signs: ['🚦', '🚸', '🏫', '⚠️'],
                background: 'linear-gradient(to bottom, #87CEEB 0%, #98FB98 60%, #90EE90 100%)'
            },
            shopping: {
                signCount: 4,
                signs: ['🚦', 'ℹ️', '🚻', '♿', '⚠️'],
                background: 'linear-gradient(to bottom, #FFB6C1 0%, #FFA07A 60%, #FF7F50 100%)'
            },
            residential: {
                signCount: 4,
                signs: ['🚸', '⚠️', '🚧', 'ℹ️'],
                background: 'linear-gradient(to bottom, #DDA0DD 0%, #DA70D6 60%, #BA55D3 100%)'
            },
            intersection: {
                signCount: 5,
                signs: ['🚦', '⛔', '🚸', '⚠️', '🚧'],
                background: 'linear-gradient(to bottom, #F0E68C 0%, #FFD700 60%, #FFA500 100%)'
            }
        };
        
        return configs[this.currentArea] || configs.school;
    }
    
    // Create individual traffic sign element
    createSign(signType) {
        const sign = document.createElement('div');
        sign.className = 'traffic-sign';
        sign.textContent = signType;
        sign.dataset.type = signType;
        
        // Random positioning avoiding character spawn area
        const x = Math.random() * 80 + 10; // 10-90%
        const y = Math.random() * 60 + 20; // 20-80%
        
        sign.style.left = x + '%';
        sign.style.top = y + '%';
        
        // Add click handler for sign interaction
        sign.addEventListener('click', () => this.interactWithSign(signType));
        
        return sign;
    }
    
    // Handle sign interaction and show question popup
    interactWithSign(signType) {
        if (!this.signQuestions[signType]) return;
        
        const popup = document.getElementById('signPopup');
        const signImage = document.getElementById('signImage');
        const question = document.getElementById('question');
        const choices = document.getElementById('choices');
        
        const questionData = this.signQuestions[signType];
        
        // Populate popup content
        signImage.textContent = signType;
        question.textContent = questionData.question;
        
        // Create choice buttons
        choices.innerHTML = '';
        questionData.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice;
            button.addEventListener('click', () => this.handleAnswer(index, questionData, signType));
            choices.appendChild(button);
        });
        
        // Show popup
        popup.classList.remove('hidden');
        
        // Speak the question for accessibility
        this.speak(questionData.question);
    }
    
    // Handle answer selection and provide feedback
    handleAnswer(selectedIndex, questionData, signType) {
        const popup = document.getElementById('signPopup');
        const isCorrect = selectedIndex === questionData.correct;
        
        // Hide popup first
        popup.classList.add('hidden');
        
        // Show feedback
        this.showFeedback(isCorrect, questionData.explanation);
        
        if (isCorrect) {
            this.handleCorrectAnswer(signType);
        } else {
            this.handleIncorrectAnswer();
        }
    }
    
    // Handle correct answer logic
    handleCorrectAnswer(signType) {
        // Increase score
        this.score = Math.min(this.maxScore, this.score + 10);
        
        // Mark sign as found
        const signElement = document.querySelector(`[data-type="${signType}"]`);
        if (signElement) {
            signElement.style.opacity = '0.5';
            signElement.style.pointerEvents = 'none';
        }
        
        // Update area progress
        this.areaProgress[this.currentArea].signsFound++;
        
        // Check for badge earning
        this.checkBadgeEarning(signType);
        
        // Check area completion
        this.checkAreaCompletion();
        
        // Update UI
        this.updateUI();
        
        // Provide audio feedback
        this.speak("Correct! Well done!");
    }
    
    // Handle incorrect answer with gentle correction
    handleIncorrectAnswer() {
        // Small score penalty but not below 0
        this.score = Math.max(0, this.score - 2);
        this.updateUI();
        
        // Provide encouraging audio feedback
        this.speak("Not quite right, but keep trying! Learning takes practice.");
    }
    
    // Show visual feedback for answers
    showFeedback(isCorrect, explanation) {
        const feedback = document.getElementById('feedback');
        const icon = document.getElementById('feedbackIcon');
        const text = document.getElementById('feedbackText');
        
        if (isCorrect) {
            feedback.className = 'feedback correct';
            icon.textContent = '✅';
            text.textContent = 'Correct! ' + explanation;
        } else {
            feedback.className = 'feedback incorrect';
            icon.textContent = '❌';
            text.textContent = 'Try again! ' + explanation;
        }
        
        feedback.classList.remove('hidden');
        
        // Auto-hide feedback after 3 seconds
        setTimeout(() => {
            feedback.classList.add('hidden');
        }, 3000);
    }
    
    // Check if player has earned any badges
    checkBadgeEarning(signType) {
        // Determine which category this sign belongs to
        let category = null;
        for (const [cat, signs] of Object.entries(this.signCategories)) {
            if (signs.includes(signType)) {
                category = cat;
                break;
            }
        }
        
        if (category && !this.badges[category]) {
            // Check if player has found enough signs of this category
            const categoryProgress = this.getCategoryProgress(category);
            if (categoryProgress >= 2) { // Need to find 2 signs of same category
                this.badges[category] = true;
                this.showBadgeEarned(category);
            }
        }
    }
    
    // Get progress for a specific sign category
    getCategoryProgress(category) {
        let count = 0;
        const signs = this.signCategories[category];
        
        // Count found signs in current area
        document.querySelectorAll('.traffic-sign').forEach(sign => {
            if (signs.includes(sign.dataset.type) && sign.style.opacity === '0.5') {
                count++;
            }
        });
        
        return count;
    }
    
    // Show badge earned animation
    showBadgeEarned(category) {
        const badge = document.querySelector(`[data-type="${category}"]`);
        if (badge) {
            badge.classList.remove('locked');
            badge.classList.add('earned');
            
            // Speak achievement
            this.speak(`Congratulations! You earned the ${category} signs badge!`);
        }
    }
    
    // Check if current area is completed
    checkAreaCompletion() {
        const progress = this.areaProgress[this.currentArea];
        if (progress.signsFound >= progress.requiredSigns && !progress.completed) {
            progress.completed = true;
            this.showAreaCompletion();
            this.unlockNextArea();
        }
    }
    
    // Show area completion celebration
    showAreaCompletion() {
        const celebration = document.getElementById('celebration');
        celebration.classList.remove('hidden');
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            celebration.classList.add('hidden');
        }, 3000);
        
        // Speak achievement
        this.speak(`Amazing! You've completed the ${this.currentArea} area safely!`);
    }
    
    // Unlock next area for progression
    unlockNextArea() {
        const areaOrder = ['school', 'shopping', 'residential', 'intersection'];
        const currentIndex = areaOrder.indexOf(this.currentArea);
        
        if (currentIndex < areaOrder.length - 1) {
            const nextArea = areaOrder[currentIndex + 1];
            const nextAreaElement = document.querySelector(`[data-area="${nextArea}"]`);
            if (nextAreaElement) {
                nextAreaElement.classList.remove('locked');
            }
        }
    }
    
    // Change to different neighborhood area
    changeArea(areaName) {
        this.currentArea = areaName;
        this.position = { x: 50, y: 50 }; // Reset position
        
        // Update area visual indicators
        document.querySelectorAll('.area').forEach(area => {
            area.classList.remove('active');
            if (this.areaProgress[area.dataset.area].completed) {
                area.classList.add('completed');
            }
        });
        
        document.querySelector(`[data-area="${areaName}"]`).classList.add('active');
        
        // Regenerate signs and update visuals
        this.generateSigns();
        this.updateBackground();
        this.updateCharacterPosition();
        this.updateUI();
        
        // Provide area context
        this.speak(`Welcome to the ${areaName} area. Look for traffic signs and learn about pedestrian safety!`);
    }
    
    // Update background based on current area
    updateBackground() {
        const background = document.getElementById('background');
        const config = this.getAreaConfig();
        background.style.background = config.background;
    }
    
    // Check if character is near any signs
    checkSignProximity() {
        const proximityThreshold = 20; // Distance threshold for interaction hints
        
        this.currentSigns.forEach(signData => {
            const sign = signData.element;
            const signRect = sign.getBoundingClientRect();
            const character = document.getElementById('character');
            const charRect = character.getBoundingClientRect();
            
            // Calculate distance
            const distance = Math.sqrt(
                Math.pow(signRect.left - charRect.left, 2) + 
                Math.pow(signRect.top - charRect.top, 2)
            );
            
            // Add visual hint when close
            if (distance < proximityThreshold && !signData.found) {
                sign.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
            } else {
                sign.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }
        });
    }
    
    // Add visual feedback for character movement
    addMovementFeedback(direction) {
        const character = document.getElementById('character');
        character.style.transform = 'translateX(-50%) scale(1.1)';
        
        setTimeout(() => {
            character.style.transform = 'translateX(-50%) scale(1)';
        }, 200);
    }
    
    // Handle keyboard input for accessibility - added down arrow key support
    handleKeyboard(event) {
        switch(event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                this.moveCharacter('left');
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.moveCharacter('right');
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.moveCharacter('forward');
                break;
            case 'ArrowDown': // New keyboard support for down movement
                event.preventDefault();
                this.moveCharacter('down');
                break;
        }
    }
    
    // Update all UI elements
    updateUI() {
        // Update score meter
        const scoreFill = document.getElementById('scoreFill');
        const scoreText = document.getElementById('scoreText');
        const scorePercentage = (this.score / this.maxScore) * 100;
        
        scoreFill.style.width = scorePercentage + '%';
        scoreText.textContent = `${this.score}/${this.maxScore}`;
        
        // Update badge display
        Object.entries(this.badges).forEach(([category, earned]) => {
            const badge = document.querySelector(`[data-type="${category}"]`);
            if (badge) {
                if (earned) {
                    badge.classList.remove('locked');
                    badge.classList.add('earned');
                } else {
                    badge.classList.add('locked');
                    badge.classList.remove('earned');
                }
            }
        });
        
        // Update area progress
        Object.entries(this.areaProgress).forEach(([area, progress]) => {
            const areaElement = document.querySelector(`[data-area="${area}"]`);
            if (areaElement) {
                if (progress.completed) {
                    areaElement.classList.add('completed');
                    areaElement.classList.remove('locked', 'active');
                }
            }
        });
    }
    
    // Text-to-speech for audio narration (fallback for browsers without speech synthesis)
    speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1.1;
            utterance.volume = 0.8;
            speechSynthesis.speak(utterance);
        } else {
            // Fallback: show text in console for debugging
            console.log('Audio: ' + text);
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global game instance
    window.pedestrianGame = new PedestrianSafetyGame();
    
    // Add resize handler for responsive behavior
    window.addEventListener('resize', () => {
        // Adjust layout if needed
        const container = document.querySelector('.container');
        if (window.innerHeight > 500) {
            container.style.height = '90vh';
        } else {
            container.style.height = '450px';
        }
    });
    
    // Prevent zoom on double tap for mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

// Export for potential external access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PedestrianSafetyGame;
}