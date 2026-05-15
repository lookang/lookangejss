// Game state management
class SafetyExplorerGame {
    constructor() {
        // Initialize game state
        this.currentLocation = null;
        this.playerPosition = { x: 50, y: 50 }; // Percentage-based positioning
        this.collectedStars = 0;
        this.signsFound = 0;
        this.totalSigns = 5;
        this.weather = 'sunny';
        this.timeOfDay = 'day';
        
        // Location-specific data
        this.locations = {
            siglap: {
                name: 'Siglap Road',
                description: 'Quiet residential area with HDB blocks',
                background: 'linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%)',
                signs: [
                    { id: 1, type: 'pedestrian_crossing', emoji: '🚶‍♂️', x: 20, y: 30, question: 'What should you do at a pedestrian crossing?', options: ['Run across quickly', 'Press button and wait for green man', 'Cross without looking', 'Wait for cars to stop'], correct: 1 },
                    { id: 2, type: 'traffic_light', emoji: '🚦', x: 70, y: 60, question: 'What does a red traffic light mean for pedestrians?', options: ['Cross quickly', 'Do not cross', 'Cross if no cars coming', 'Press the button'], correct: 1 },
                    { id: 3, type: 'bus_stop', emoji: '🚌', x: 40, y: 80, question: 'How should you behave at a bus stop?', options: ['Stand anywhere on the road', 'Queue in an orderly line', 'Run to catch the bus', 'Block the bus door'], correct: 1 },
                    { id: 4, type: 'void_deck', emoji: '🏠', x: 60, y: 20, question: 'What should you be careful of in void decks?', options: ['Running children and cyclists', 'Loud music', 'Bright lights', 'Cold air'], correct: 0 },
                    { id: 5, type: 'zebra_crossing', emoji: '🦓', x: 80, y: 40, question: 'Before crossing at a zebra crossing, you should:', options: ['Look both ways', 'Run across', 'Use your phone', 'Close your eyes'], correct: 0 }
                ]
            },
            bedok: {
                name: 'Bedok Mall',
                description: 'Busy shopping area with multiple crossings',
                background: 'linear-gradient(to bottom, #FFE4B5 0%, #DDA0DD 100%)',
                signs: [
                    { id: 1, type: 'shopping_crossing', emoji: '🛒', x: 30, y: 25, question: 'Near shopping malls, you should be extra careful because:', options: ['More people and cars', 'Bright lights', 'Air conditioning', 'Music playing'], correct: 0 },
                    { id: 2, type: 'carpark_exit', emoji: '🚗', x: 60, y: 70, question: 'At carpark exits, what should you watch for?', options: ['Shopping trolleys', 'Cars reversing out', 'Security guards', 'Parking tickets'], correct: 1 },
                    { id: 3, type: 'busy_junction', emoji: '⚠️', x: 20, y: 60, question: 'At busy junctions, the safest approach is to:', options: ['Cross quickly when light changes', 'Wait for all traffic to clear completely', 'Follow other people', 'Use your phone for directions'], correct: 1 },
                    { id: 4, type: 'escalator', emoji: '🔄', x: 75, y: 35, question: 'On escalators, you should:', options: ['Run up or down', 'Stand on the left, walk on the right', 'Sit down', 'Jump off at the end'], correct: 1 },
                    { id: 5, type: 'loading_bay', emoji: '🚛', x: 45, y: 50, question: 'Near loading bays, be careful of:', options: ['Delivery trucks and workers', 'Shopping bags', 'Price tags', 'Store music'], correct: 0 }
                ]
            },
            parkway: {
                name: 'Parkway Parade',
                description: 'Complex multi-level commercial area',
                background: 'linear-gradient(to bottom, #B0C4DE 0%, #F0E68C 100%)',
                signs: [
                    { id: 1, type: 'overhead_bridge', emoji: '🌉', x: 40, y: 20, question: 'Overhead bridges are used to:', options: ['Get a better view', 'Safely cross busy roads', 'Exercise', 'Meet friends'], correct: 1 },
                    { id: 2, type: 'multi_level', emoji: '🏢', x: 70, y: 45, question: 'In multi-level buildings, always check:', options: ['The weather outside', 'Which level you are on', 'The time', 'Your shopping list'], correct: 1 },
                    { id: 3, type: 'pedestrian_bridge', emoji: '🚶‍♀️', x: 25, y: 65, question: 'When using pedestrian bridges, you should:', options: ['Run to save time', 'Hold the handrail and walk carefully', 'Look at your phone', 'Push other people'], correct: 1 },
                    { id: 4, type: 'lift_lobby', emoji: '🛗', x: 60, y: 75, question: 'In lift lobbies, be aware of:', options: ['People entering and exiting lifts', 'Elevator music', 'Floor numbers', 'Button colors'], correct: 0 },
                    { id: 5, type: 'exit_signs', emoji: '🚪', x: 80, y: 30, question: 'Exit signs are important because they:', options: ['Look pretty', 'Show the way out in emergencies', 'Light up the area', 'Make noise'], correct: 1 }
                ]
            }
        };
        
        // Initialize DOM elements
        this.initializeElements();
        this.setupEventListeners();
        this.showTooltips();
    }

    // Initialize DOM element references
    initializeElements() {
        this.elements = {
            locationSelector: document.getElementById('locationSelector'),
            gameArea: document.getElementById('gameArea'),
            currentLocation: document.getElementById('currentLocation'),
            starCount: document.getElementById('starCount'),
            signCount: document.getElementById('signCount'),
            weatherIndicator: document.getElementById('weatherIndicator'),
            gameViewport: document.getElementById('gameViewport'),
            character: document.getElementById('character'),
            signsContainer: document.getElementById('signsContainer'),
            actionPrompt: document.getElementById('actionPrompt'),
            miniMap: document.getElementById('miniMap'),
            minimapContent: document.getElementById('minimapContent'),
            playerDot: document.getElementById('playerDot'),
            signModal: document.getElementById('signModal'),
            achievementNotification: document.getElementById('achievementNotification'),
            tooltip: document.getElementById('tooltip'),
            backBtn: document.getElementById('backBtn')
        };
    }

    // Setup all event listeners
    setupEventListeners() {
        // Location selection
        document.querySelectorAll('.location-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const location = e.currentTarget.dataset.location;
                this.startGame(location);
            });
        });

        // Back button
        this.elements.backBtn.addEventListener('click', () => {
            this.returnToLocationSelector();
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (this.currentLocation) {
                this.handleKeyPress(e);
            }
        });

        // Touch controls
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const direction = e.currentTarget.dataset.direction;
                this.moveCharacter(direction);
            });
        });

        // Modal close
        document.querySelector('.close-btn').addEventListener('click', () => {
            this.closeModal();
        });

        // Sign options
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('option-btn')) {
                this.handleOptionClick(e.target);
            }
        });

        // Traffic sign clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('traffic-sign')) {
                this.handleSignClick(e.target);
            }
        });
    }

    // Setup tooltip functionality
    showTooltips() {
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target.title, e);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    // Show tooltip
    showTooltip(text, event) {
        this.elements.tooltip.textContent = text;
        this.elements.tooltip.classList.remove('hidden');
        
        const rect = event.target.getBoundingClientRect();
        this.elements.tooltip.style.left = rect.left + 'px';
        this.elements.tooltip.style.top = (rect.bottom + 5) + 'px';
    }

    // Hide tooltip
    hideTooltip() {
        this.elements.tooltip.classList.add('hidden');
    }

    // Start game in selected location
    startGame(locationKey) {
        this.currentLocation = locationKey;
        const location = this.locations[locationKey];
        
        // Reset game state
        this.collectedStars = 0;
        this.signsFound = 0;
        this.playerPosition = { x: 50, y: 50 };
        
        // Update UI
        this.elements.locationSelector.classList.add('hidden');
        this.elements.gameArea.classList.remove('hidden');
        this.elements.currentLocation.textContent = location.name;
        this.elements.gameViewport.style.background = location.background;
        
        // Set random weather
        this.setRandomWeather();
        
        // Position character
        this.updateCharacterPosition();
        
        // Place signs
        this.placeSigns(location.signs);
        
        // Update stats
        this.updateStats();
        
        // Show welcome message
        this.showAchievement(`Welcome to ${location.name}! Find all traffic signs to collect Safety Stars!`);
    }

    // Return to location selector
    returnToLocationSelector() {
        this.elements.gameArea.classList.add('hidden');
        this.elements.locationSelector.classList.remove('hidden');
        this.currentLocation = null;
        this.elements.signsContainer.innerHTML = '';
    }

    // Handle keyboard input
    handleKeyPress(event) {
        const key = event.key.toLowerCase();
        let direction = null;
        
        switch(key) {
            case 'arrowup':
            case 'w':
                direction = 'up';
                break;
            case 'arrowdown':
            case 's':
                direction = 'down';
                break;
            case 'arrowleft':
            case 'a':
                direction = 'left';
                break;
            case 'arrowright':
            case 'd':
                direction = 'right';
                break;
            case ' ':
                event.preventDefault();
                this.handleSpaceBar();
                break;
        }
        
        if (direction) {
            event.preventDefault();
            this.moveCharacter(direction);
        }
    }

    // Move character in specified direction
    moveCharacter(direction) {
        const moveAmount = 5; // Percentage
        
        switch(direction) {
            case 'up':
                this.playerPosition.y = Math.max(5, this.playerPosition.y - moveAmount);
                this.elements.character.textContent = '🚶‍♂️';
                break;
            case 'down':
                this.playerPosition.y = Math.min(95, this.playerPosition.y + moveAmount);
                this.elements.character.textContent = '🚶‍♂️';
                break;
            case 'left':
                this.playerPosition.x = Math.max(5, this.playerPosition.x - moveAmount);
                this.elements.character.textContent = '🚶‍♀️';
                break;
            case 'right':
                this.playerPosition.x = Math.min(95, this.playerPosition.x + moveAmount);
                this.elements.character.textContent = '🚶‍♂️';
                break;
        }
        
        this.updateCharacterPosition();
        this.updateMiniMap();
        this.checkSignProximity();
    }

    // Update character position on screen
    updateCharacterPosition() {
        this.elements.character.style.left = this.playerPosition.x + '%';
        this.elements.character.style.top = this.playerPosition.y + '%';
    }

    // Update mini-map player position
    updateMiniMap() {
        this.elements.playerDot.style.left = this.playerPosition.x + '%';
        this.elements.playerDot.style.top = this.playerPosition.y + '%';
    }

    // Place traffic signs in the scene
    placeSigns(signs) {
        this.elements.signsContainer.innerHTML = '';
        
        signs.forEach(sign => {
            const signElement = document.createElement('div');
            signElement.className = 'traffic-sign';
            signElement.textContent = sign.emoji;
            signElement.style.left = sign.x + '%';
            signElement.style.top = sign.y + '%';
            signElement.dataset.signId = sign.id;
            signElement.title = `Click to identify this ${sign.type.replace('_', ' ')} sign`;
            
            this.elements.signsContainer.appendChild(signElement);
        });
    }

    // Check if player is near any signs
    checkSignProximity() {
        const signs = document.querySelectorAll('.traffic-sign');
        signs.forEach(sign => {
            const signRect = sign.getBoundingClientRect();
            const characterRect = this.elements.character.getBoundingClientRect();
            
            const distance = Math.sqrt(
                Math.pow(signRect.left - characterRect.left, 2) + 
                Math.pow(signRect.top - characterRect.top, 2)
            );
            
            if (distance < 50) { // Close proximity
                sign.style.transform = 'scale(1.3)';
                sign.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
            } else {
                sign.style.transform = 'scale(1)';
                sign.style.boxShadow = 'none';
            }
        });
    }

    // Handle traffic sign clicks
    handleSignClick(signElement) {
        const signId = parseInt(signElement.dataset.signId);
        const location = this.locations[this.currentLocation];
        const signData = location.signs.find(s => s.id === signId);
        
        if (signData) {
            this.showSignModal(signData);
        }
    }

    // Show sign identification modal
    showSignModal(signData) {
        const modal = this.elements.signModal;
        const signImage = document.getElementById('signImage');
        const signQuestion = document.getElementById('signQuestion');
        const signOptions = document.getElementById('signOptions');
        
        signImage.textContent = signData.emoji;
        signQuestion.textContent = signData.question;
        
        // Create option buttons
        signOptions.innerHTML = '';
        signData.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.dataset.optionIndex = index;
            button.dataset.signId = signData.id;
            signOptions.appendChild(button);
        });
        
        modal.classList.remove('hidden');
    }

    // Handle option selection
    handleOptionClick(optionElement) {
        const optionIndex = parseInt(optionElement.dataset.optionIndex);
        const signId = parseInt(optionElement.dataset.signId);
        const location = this.locations[this.currentLocation];
        const signData = location.signs.find(s => s.id === signId);
        
        // Clear previous states
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
        });
        
        if (optionIndex === signData.correct) {
            optionElement.classList.add('correct');
            this.handleCorrectAnswer(signId);
        } else {
            optionElement.classList.add('incorrect');
            document.querySelectorAll('.option-btn')[signData.correct].classList.add('correct');
        }
        
        // Close modal after delay
        setTimeout(() => {
            this.closeModal();
        }, 2000);
    }

    // Handle correct answer
    handleCorrectAnswer(signId) {
        this.collectedStars++;
        this.signsFound++;
        
        // Remove the sign from the scene
        const signElement = document.querySelector(`[data-sign-id="${signId}"]`);
        if (signElement) {
            signElement.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                signElement.remove();
            }, 500);
        }
        
        this.updateStats();
        this.showAchievement('Safety Star collected! 🌟');
        
        // Check if all signs found
        if (this.signsFound >= this.totalSigns) {
            setTimeout(() => {
                this.showAchievement(`Congratulations! You've mastered ${this.locations[this.currentLocation].name} safety! 🎉`);
            }, 1000);
        }
    }

    // Close modal
    closeModal() {
        this.elements.signModal.classList.add('hidden');
    }

    // Update game statistics
    updateStats() {
        this.elements.starCount.textContent = this.collectedStars;
        this.elements.signCount.textContent = `${this.signsFound}/${this.totalSigns}`;
    }

    // Set random weather
    setRandomWeather() {
        const weathers = ['☀️', '⛅', '🌧️'];
        const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
        this.elements.weatherIndicator.textContent = randomWeather;
        
        // Adjust visibility based on weather
        if (randomWeather === '🌧️') {
            this.elements.gameViewport.style.filter = 'brightness(0.8) contrast(0.9)';
        } else {
            this.elements.gameViewport.style.filter = 'none';
        }
    }

    // Show achievement notification
    showAchievement(message) {
        const notification = this.elements.achievementNotification;
        const text = notification.querySelector('.achievement-text');
        
        text.textContent = message;
        notification.classList.remove('hidden');
        
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    // Handle spacebar press for context actions
    handleSpaceBar() {
        // Check if near any interactive elements
        const nearbyElements = this.getNearbyInteractiveElements();
        if (nearbyElements.length > 0) {
            this.showContextualAction(nearbyElements[0]);
        }
    }

    // Get nearby interactive elements
    getNearbyInteractiveElements() {
        // Implementation for detecting nearby interactive elements
        // This would check for traffic lights, crossings, etc.
        return [];
    }

    // Show contextual action prompt
    showContextualAction(element) {
        const prompt = this.elements.actionPrompt;
        const promptText = prompt.querySelector('.prompt-text');
        const promptActions = prompt.querySelector('.prompt-actions');
        
        promptText.textContent = 'What should you do here?';
        promptActions.innerHTML = '<button onclick="game.handleContextAction()">Look both ways</button>';
        
        prompt.classList.remove('hidden');
        
        setTimeout(() => {
            prompt.classList.add('hidden');
        }, 3000);
    }

    // Handle context action
    handleContextAction() {
        this.elements.actionPrompt.classList.add('hidden');
        this.showAchievement('Good safety practice! 👍');
    }
}

// CSS animation for fade out
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.5); }
    }
`;
document.head.appendChild(style);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new SafetyExplorerGame();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    if (window.game && window.game.currentLocation) {
        window.game.updateCharacterPosition();
        window.game.updateMiniMap();
    }
});