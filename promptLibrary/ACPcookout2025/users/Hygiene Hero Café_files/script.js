// Game state management
class HygieneHeroCafe {
    constructor() {
        // Game state variables
        this.happiness = 100;
        this.badgeCount = 0;
        this.dailyProgress = 0;
        this.maxDailyGoal = 10;
        this.timer = 30;
        this.isRushHour = false;
        this.currentSituation = null;
        this.gameActive = true;
        
        // Hygiene situations with correct actions
        this.situations = [
            {
                id: 'cough',
                icon: '🤧',
                text: 'Oh no! You need to cough!',
                correctAction: 'coverMouthBtn',
                feedback: 'Perfect! You covered your mouth to keep germs away!'
            },
            {
                id: 'sneeze',
                icon: '🤧',
                text: 'Achoo! You need to sneeze!',
                correctAction: 'useTissueBtn',
                feedback: 'Excellent! Using a tissue keeps everyone safe!'
            },
            {
                id: 'spill',
                icon: '💧',
                text: 'Oops! Something spilled on the counter!',
                correctAction: 'cleanSurfaceBtn',
                feedback: 'Great job! Clean surfaces prevent contamination!'
            },
            {
                id: 'dirtyHands',
                icon: '🤲',
                text: 'Your hands look dirty from cooking!',
                correctAction: 'washHandsBtn',
                feedback: 'Wonderful! Clean hands make safe food!'
            }
        ];
        
        // Badge types for achievements
        this.badges = ['🏆', '⭐', '🥇', '🎖️', '👑', '💎', '🌟', '✨'];
        
        // Initialize the game
        this.init();
    }
    
    init() {
        // Get DOM elements
        this.elements = {
            happinessFill: document.getElementById('happinessFill'),
            happinessScore: document.getElementById('happinessScore'),
            badgeCount: document.getElementById('badgeCount'),
            timer: document.getElementById('timer'),
            chef: document.getElementById('chef'),
            chefStatus: document.getElementById('chefStatus'),
            situationAlert: document.getElementById('situationAlert'),
            alertIcon: document.getElementById('alertIcon'),
            alertText: document.getElementById('alertText'),
            customer1: document.getElementById('customer1'),
            customerThought: document.getElementById('customerThought'),
            achievementBadges: document.getElementById('achievementBadges'),
            dailyProgress: document.getElementById('dailyProgress'),
            progressText: document.getElementById('progressText'),
            feedbackOverlay: document.getElementById('feedbackOverlay'),
            feedbackIcon: document.getElementById('feedbackIcon'),
            feedbackText: document.getElementById('feedbackText'),
            tooltip: document.getElementById('tooltip'),
            tooltipContent: document.getElementById('tooltipContent')
        };
        
        // Bind event listeners
        this.bindEvents();
        
        // Start the game loop
        this.startGameLoop();
        
        // Show initial welcome message
        this.showFeedback('🎮', 'Welcome to Hygiene Hero Café! Keep the kitchen clean!');
        
        // Start first situation after welcome
        setTimeout(() => {
            this.generateSituation();
        }, 3000);
    }
    
    bindEvents() {
        // Hygiene action buttons
        const buttons = ['coverMouthBtn', 'washHandsBtn', 'useTissueBtn', 'cleanSurfaceBtn'];
        buttons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            button.addEventListener('click', () => this.handleHygieneAction(buttonId));
            
            // Add touch feedback
            button.addEventListener('touchstart', () => {
                button.style.transform = 'scale(0.95)';
            });
            button.addEventListener('touchend', () => {
                button.style.transform = '';
            });
        });
        
        // Tooltip functionality
        this.addTooltipListeners();
        
        // Audio context for sound effects (simplified for offline use)
        this.initAudio();
    }
    
    addTooltipListeners() {
        // Add tooltip to all elements with title attribute
        const elementsWithTooltips = document.querySelectorAll('[title]');
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target.title, e);
            });
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
            element.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(e);
            });
        });
    }
    
    showTooltip(text, event) {
        this.elements.tooltipContent.textContent = text;
        this.elements.tooltip.classList.add('show');
        this.updateTooltipPosition(event);
    }
    
    hideTooltip() {
        this.elements.tooltip.classList.remove('show');
    }
    
    updateTooltipPosition(event) {
        const tooltip = this.elements.tooltip;
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    }
    
    initAudio() {
        // Simple audio feedback using Web Audio API
        this.audioContext = null;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio not supported');
        }
    }
    
    playSound(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    startGameLoop() {
        // Main game timer
        this.gameInterval = setInterval(() => {
            if (this.gameActive) {
                this.updateTimer();
                this.checkRushHour();
            }
        }, 1000);
        
        // Situation generation interval
        this.situationInterval = setInterval(() => {
            if (this.gameActive && !this.currentSituation) {
                this.generateSituation();
            }
        }, 5000 + Math.random() * 5000); // Random interval between 5-10 seconds
    }
    
    updateTimer() {
        this.timer--;
        this.elements.timer.textContent = this.timer;
        
        if (this.timer <= 0) {
            this.timer = 30; // Reset timer
            this.checkDailyGoal();
        }
    }
    
    checkRushHour() {
        // Rush hour occurs randomly
        if (Math.random() < 0.1 && !this.isRushHour) {
            this.startRushHour();
        } else if (this.isRushHour && Math.random() < 0.3) {
            this.endRushHour();
        }
    }
    
    startRushHour() {
        this.isRushHour = true;
        this.elements.timer.parentElement.classList.add('rush-hour');
        this.showChefStatus('Rush hour! Work fast!');
        
        // Generate situations more frequently during rush hour
        if (this.situationInterval) {
            clearInterval(this.situationInterval);
        }
        this.situationInterval = setInterval(() => {
            if (this.gameActive && !this.currentSituation) {
                this.generateSituation();
            }
        }, 2000 + Math.random() * 3000); // Faster during rush hour
    }
    
    endRushHour() {
        this.isRushHour = false;
        this.elements.timer.parentElement.classList.remove('rush-hour');
        this.hideChefStatus();
        
        // Return to normal situation generation speed
        if (this.situationInterval) {
            clearInterval(this.situationInterval);
        }
        this.situationInterval = setInterval(() => {
            if (this.gameActive && !this.currentSituation) {
                this.generateSituation();
            }
        }, 5000 + Math.random() * 5000);
    }
    
    generateSituation() {
        if (this.currentSituation) return;
        
        // Select random situation
        const situation = this.situations[Math.floor(Math.random() * this.situations.length)];
        this.currentSituation = situation;
        
        // Display situation alert
        this.elements.alertIcon.textContent = situation.icon;
        this.elements.alertText.textContent = situation.text;
        this.elements.situationAlert.classList.add('show');
        
        // Play alert sound
        this.playSound(800, 0.3);
        
        // Auto-hide after 10 seconds if not resolved
        setTimeout(() => {
            if (this.currentSituation === situation) {
                this.handleTimeout();
            }
        }, 10000);
    }
    
    handleHygieneAction(actionId) {
        if (!this.currentSituation) {
            // No active situation - still give positive feedback for good hygiene
            this.showFeedback('👍', 'Good hygiene practice!');
            this.updateHappiness(5);
            return;
        }
        
        const situation = this.currentSituation;
        const button = document.getElementById(actionId);
        
        if (actionId === situation.correctAction) {
            // Correct action
            this.handleCorrectAction(button, situation);
        } else {
            // Incorrect action
            this.handleIncorrectAction(button);
        }
        
        // Clear current situation
        this.currentSituation = null;
        this.elements.situationAlert.classList.remove('show');
    }
    
    handleCorrectAction(button, situation) {
        // Visual feedback
        button.classList.add('correct');
        setTimeout(() => button.classList.remove('correct'), 600);
        
        // Play success sound
        this.playSound(523, 0.2); // C note
        this.playSound(659, 0.2, 0.1); // E note
        
        // Update game state
        this.updateHappiness(20);
        this.updateDailyProgress();
        this.addBadge();
        
        // Show feedback
        this.showFeedback('⭐', situation.feedback);
        
        // Update customer happiness
        this.updateCustomerMood('happy');
        
        // Add sparkle effect
        this.addSparkleEffect();
        
        // Show chef status
        this.showChefStatus('Great job!');
    }
    
    handleIncorrectAction(button) {
        // Visual feedback
        button.classList.add('incorrect');
        setTimeout(() => button.classList.remove('incorrect'), 600);
        
        // Play error sound
        this.playSound(200, 0.5);
        
        // Update game state
        this.updateHappiness(-10);
        
        // Show feedback
        this.showFeedback('😟', 'Oops! Try a different hygiene action next time.');
        
        // Update customer mood
        this.updateCustomerMood('concerned');
        
        // Show chef status
        this.showChefStatus('Try again!');
    }
    
    handleTimeout() {
        // Situation timed out
        this.updateHappiness(-15);
        this.showFeedback('⏰', 'Too slow! Quick hygiene actions keep customers happy!');
        this.updateCustomerMood('unhappy');
        
        this.currentSituation = null;
        this.elements.situationAlert.classList.remove('show');
    }
    
    updateHappiness(change) {
        this.happiness = Math.max(0, Math.min(100, this.happiness + change));
        this.elements.happinessScore.textContent = this.happiness;
        
        // Update happiness meter
        this.elements.happinessFill.style.width = this.happiness + '%';
        
        // Change color based on happiness level
        if (this.happiness > 70) {
            this.elements.happinessFill.style.background = 'linear-gradient(90deg, #00b894, #00cec9)';
        } else if (this.happiness > 40) {
            this.elements.happinessFill.style.background = 'linear-gradient(90deg, #fdcb6e, #e17055)';
        } else {
            this.elements.happinessFill.style.background = 'linear-gradient(90deg, #e17055, #d63031)';
        }
    }
    
    updateDailyProgress() {
        this.dailyProgress = Math.min(this.maxDailyGoal, this.dailyProgress + 1);
        
        // Update progress bar
        const progressPercent = (this.dailyProgress / this.maxDailyGoal) * 100;
        this.elements.dailyProgress.style.width = progressPercent + '%';
        this.elements.progressText.textContent = `${this.dailyProgress}/${this.maxDailyGoal} good choices`;
        
        // Check if daily goal is reached
        if (this.dailyProgress >= this.maxDailyGoal) {
            this.showFeedback('🎉', 'Amazing! You completed your daily hygiene goal!');
            this.addSpecialBadge();
        }
    }
    
    addBadge() {
        if (Math.random() < 0.3) { // 30% chance to get a badge
            const badge = this.badges[Math.floor(Math.random() * this.badges.length)];
            const badgeElement = document.createElement('span');
            badgeElement.className = 'badge';
            badgeElement.textContent = badge;
            this.elements.achievementBadges.appendChild(badgeElement);
            
            this.badgeCount++;
            this.elements.badgeCount.textContent = this.badgeCount;
        }
    }
    
    addSpecialBadge() {
        const specialBadge = document.createElement('span');
        specialBadge.className = 'badge';
        specialBadge.textContent = '👑';
        specialBadge.style.fontSize = '24px';
        this.elements.achievementBadges.appendChild(specialBadge);
        
        this.badgeCount++;
        this.elements.badgeCount.textContent = this.badgeCount;
    }
    
    updateCustomerMood(mood) {
        const customer = this.elements.customer1.querySelector('.customer-face');
        const thought = this.elements.customerThought;
        
        switch (mood) {
            case 'happy':
                customer.textContent = '😊';
                thought.textContent = 'Yummy clean food!';
                thought.style.background = 'rgba(0, 184, 148, 0.2)';
                break;
            case 'concerned':
                customer.textContent = '😐';
                thought.textContent = 'Is the food clean?';
                thought.style.background = 'rgba(253, 203, 110, 0.3)';
                break;
            case 'unhappy':
                customer.textContent = '😟';
                thought.textContent = 'I want clean food!';
                thought.style.background = 'rgba(225, 112, 85, 0.3)';
                break;
        }
    }
    
    showChefStatus(message) {
        this.elements.chefStatus.textContent = message;
        this.elements.chefStatus.style.opacity = '1';
        
        setTimeout(() => {
            this.hideChefStatus();
        }, 2000);
    }
    
    hideChefStatus() {
        this.elements.chefStatus.style.opacity = '0';
    }
    
    addSparkleEffect() {
        // Create sparkle elements around the kitchen
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.textContent = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * 200 + 'px';
                sparkle.style.top = Math.random() * 100 + 'px';
                
                this.elements.chef.parentElement.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }, i * 200);
        }
    }
    
    showFeedback(icon, text) {
        this.elements.feedbackIcon.textContent = icon;
        this.elements.feedbackText.textContent = text;
        this.elements.feedbackOverlay.classList.add('show');
        
        setTimeout(() => {
            this.elements.feedbackOverlay.classList.remove('show');
        }, 2000);
    }
    
    checkDailyGoal() {
        if (this.dailyProgress >= this.maxDailyGoal) {
            this.showFeedback('🏆', 'Congratulations! You are a true Hygiene Hero!');
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if running in iframe and adjust height
    if (window.self !== window.top) {
        document.querySelector('.game-container').style.height = '450px';
    } else {
        document.querySelector('.game-container').style.height = '90vh';
    }
    
    // Start the game
    const game = new HygieneHeroCafe();
    
    // Make game globally accessible for debugging
    window.hygieneGame = game;
});

// Handle visibility change to pause/resume game
document.addEventListener('visibilitychange', () => {
    if (window.hygieneGame) {
        if (document.hidden) {
            window.hygieneGame.gameActive = false;
        } else {
            window.hygieneGame.gameActive = true;
        }
    }
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust layout for mobile devices
    const container = document.querySelector('.game-container');
    if (window.innerWidth < 480) {
        container.classList.add('mobile');
    } else {
        container.classList.remove('mobile');
    }
});