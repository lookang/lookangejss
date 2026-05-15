// Animal Classification Mystery Game
// Educational game for Primary 3 students to learn animal classification

class AnimalClassificationGame {
    constructor() {
        // Game state variables
        this.score = 0;
        this.level = 1;
        this.timeLeft = 60;
        this.currentQuestion = 0;
        this.questionsPerLevel = 5;
        this.correctAnswers = 0;
        this.totalAnswers = 0;
        this.gameActive = false;
        this.timer = null;
        
        // Added speaker button variable for auditory learners
        this.speakerButton = null;
        
        // Animal database with educational information
        // MODIFIED: Removed spider from insects array as requested
        this.animals = {
            mammals: [
                { name: 'Elephant', emoji: '🐘', hint: 'Large animal with trunk, feeds milk to babies' },
                { name: 'Lion', emoji: '🦁', hint: 'King of jungle, has fur and feeds milk to cubs' },
                { name: 'Whale', emoji: '🐋', hint: 'Lives in ocean but breathes air and feeds milk' },
                { name: 'Bat', emoji: '🦇', hint: 'Flying animal that feeds milk to babies' },
                { name: 'Monkey', emoji: '🐒', hint: 'Swings on trees, has fur and feeds milk' },
                { name: 'Dog', emoji: '🐕', hint: 'Pet animal with fur that feeds milk to puppies' },
                { name: 'Cat', emoji: '🐱', hint: 'Pet with whiskers that feeds milk to kittens' },
                { name: 'Horse', emoji: '🐴', hint: 'Farm animal with mane that feeds milk to foals' }
            ],
            birds: [
                { name: 'Eagle', emoji: '🦅', hint: 'Has feathers, wings and lays eggs in nests' },
                { name: 'Penguin', emoji: '🐧', hint: 'Cannot fly but has feathers and lays eggs' },
                { name: 'Owl', emoji: '🦉', hint: 'Night bird with feathers that lays eggs' },
                { name: 'Parrot', emoji: '🦜', hint: 'Colorful bird with feathers that can talk' },
                { name: 'Duck', emoji: '🦆', hint: 'Water bird with feathers and webbed feet' },
                { name: 'Chicken', emoji: '🐔', hint: 'Farm bird with feathers that lays eggs we eat' },
                { name: 'Peacock', emoji: '🦚', hint: 'Beautiful bird with colorful tail feathers' }
            ],
            fish: [
                { name: 'Shark', emoji: '🦈', hint: 'Lives in water, breathes through gills' },
                { name: 'Goldfish', emoji: '🐠', hint: 'Colorful pet that lives in water with gills' },
                { name: 'Tuna', emoji: '🐟', hint: 'Ocean fish that breathes through gills' },
                { name: 'Seahorse', emoji: '🐴', hint: 'Unusual fish that lives in water' },
                { name: 'Clownfish', emoji: '🐠', hint: 'Orange fish that lives in coral reefs' }
            ],
            reptiles: [
                { name: 'Snake', emoji: '🐍', hint: 'Has scales, cold-blooded, lays eggs on land' },
                { name: 'Lizard', emoji: '🦎', hint: 'Has scales and changes color' },
                { name: 'Turtle', emoji: '🐢', hint: 'Has shell and scales, lays eggs on land' },
                { name: 'Crocodile', emoji: '🐊', hint: 'Large reptile with scales living near water' },
                { name: 'Iguana', emoji: '🦎', hint: 'Large lizard with scales that loves sun' }
            ],
            amphibians: [
                { name: 'Frog', emoji: '🐸', hint: 'Lives on land and water, starts as tadpole' },
                { name: 'Toad', emoji: '🐸', hint: 'Like frog but with bumpy skin' },
                { name: 'Salamander', emoji: '🦎', hint: 'Lives in water and land, smooth wet skin' }
            ],
            // MODIFIED: Removed spider entry from insects array
            insects: [
                { name: 'Butterfly', emoji: '🦋', hint: 'Has 6 legs, 3 body parts and colorful wings' },
                { name: 'Bee', emoji: '🐝', hint: 'Has 6 legs, makes honey, important for flowers' },
                { name: 'Ant', emoji: '🐜', hint: 'Small insect with 6 legs, works in groups' },
                { name: 'Ladybug', emoji: '🐞', hint: 'Red insect with 6 legs and black spots' },
                { name: 'Grasshopper', emoji: '🦗', hint: 'Green insect with 6 legs that jumps' }
            ],
            // Added new category for animals that don't belong to the main groups
            // MODIFIED: Added spider to the "other" category since it has 8 legs and is an arachnid, not an insect
            other: [
                { name: 'Jellyfish', emoji: '🪼', hint: 'Lives in water but is not a fish - has no backbone' },
                { name: 'Octopus', emoji: '🐙', hint: 'Lives in water but is not a fish - is a mollusk' },
                { name: 'Starfish', emoji: '⭐', hint: 'Lives in water but is not a fish - is an echinoderm' },
                { name: 'Coral', emoji: '🪸', hint: 'Looks like a plant but is actually an animal' },
                { name: 'Sponge', emoji: '🧽', hint: 'Simple animal that lives in water and filters food' },
                { name: 'Spider', emoji: '🕷️', hint: 'Has 8 legs, spins webs to catch food - is an arachnid, not an insect' }
            ]
        };
        
        // Current animal being displayed
        this.currentAnimal = null;
        
        // DOM elements
        this.initializeElements();
        this.setupEventListeners();
        this.startGame();
    }
    
    // Initialize DOM element references
    initializeElements() {
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.levelElement = document.getElementById('level');
        this.progressElement = document.getElementById('progress');
        this.animalImageElement = document.getElementById('animalImage');
        this.animalNameElement = document.getElementById('animalName');
        this.feedbackElement = document.getElementById('feedbackMessage');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.classificationButtons = document.querySelectorAll('.classification-btn');
        this.tooltip = document.getElementById('tooltip');
        // Initialize speaker button for auditory learners
        this.speakerButton = document.getElementById('speakerBtn');
    }
    
    // Setup event listeners for user interactions
    setupEventListeners() {
        // Classification button clicks
        this.classificationButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleClassification(e));
            
            // Tooltip functionality for educational support
            button.addEventListener('mouseenter', (e) => this.showTooltip(e));
            button.addEventListener('mouseleave', () => this.hideTooltip());
        });
        
        // Added speaker button event listener for auditory learners
        this.speakerButton.addEventListener('click', () => this.readAnimalName());
        
        // Play again button
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.resetGame();
            this.startGame();
        });
        
        // Touch support for mobile devices
        this.classificationButtons.forEach(button => {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                button.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Added function to read animal name aloud for auditory learners
    readAnimalName() {
        if (this.currentAnimal && 'speechSynthesis' in window) {
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            
            // Create speech utterance
            const utterance = new SpeechSynthesisUtterance(this.currentAnimal.name);
            utterance.rate = 0.8; // Slightly slower for better comprehension
            utterance.pitch = 1.1; // Slightly higher pitch for children
            utterance.volume = 0.8;
            
            // Visual feedback during speech
            this.speakerButton.style.transform = 'scale(1.2)';
            this.speakerButton.style.background = 'rgba(255, 255, 255, 0.4)';
            
            utterance.onend = () => {
                this.speakerButton.style.transform = 'scale(1)';
                this.speakerButton.style.background = 'rgba(255, 255, 255, 0.2)';
            };
            
            // Speak the animal name
            speechSynthesis.speak(utterance);
        } else {
            // Fallback for browsers without speech synthesis
            console.log('Speech synthesis not supported');
            this.showFeedback('Audio not available in this browser', 'incorrect');
        }
    }
    
    // Start the game
    startGame() {
        this.gameActive = true;
        this.startTimer();
        this.loadNextAnimal();
        this.updateDisplay();
    }
    
    // Start the countdown timer
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            // Time warning visual feedback
            if (this.timeLeft <= 10) {
                this.timerElement.style.color = '#ff416c';
                this.timerElement.style.animation = 'pulse 1s infinite';
            }
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    // Load next animal for classification
    loadNextAnimal() {
        // Get random animal group (including the new "other" category)
        const groups = Object.keys(this.animals);
        const randomGroup = groups[Math.floor(Math.random() * groups.length)];
        const animalsInGroup = this.animals[randomGroup];
        
        // Get random animal from group
        const randomAnimal = animalsInGroup[Math.floor(Math.random() * animalsInGroup.length)];
        
        this.currentAnimal = {
            ...randomAnimal,
            correctGroup: randomGroup
        };
        
        // Update display with animation
        this.animalImageElement.style.opacity = '0';
        this.animalNameElement.style.opacity = '0';
        
        setTimeout(() => {
            this.animalImageElement.textContent = this.currentAnimal.emoji;
            this.animalNameElement.textContent = this.currentAnimal.name;
            this.animalImageElement.style.opacity = '1';
            this.animalNameElement.style.opacity = '1';
        }, 200);
        
        // Reset button states
        this.resetButtonStates();
    }
    
    // Handle classification button clicks
    handleClassification(event) {
        if (!this.gameActive) return;
        
        const selectedGroup = event.currentTarget.dataset.group;
        const isCorrect = selectedGroup === this.currentAnimal.correctGroup;
        
        this.totalAnswers++;
        
        // Visual feedback
        this.classificationButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.group === this.currentAnimal.correctGroup) {
                btn.classList.add('correct');
            } else if (btn.dataset.group === selectedGroup && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        // Update score and show feedback
        if (isCorrect) {
            this.correctAnswers++;
            this.score += this.level * 10; // Higher score for higher levels
            // Special feedback message for "other" category
            if (this.currentAnimal.correctGroup === 'other') {
                this.showFeedback('Excellent! That\'s correct! This animal doesn\'t belong to the main groups! 🎉', 'correct');
            } else {
                this.showFeedback('Excellent! That\'s correct! 🎉', 'correct');
            }
        } else {
            // Enhanced feedback for "other" category
            if (this.currentAnimal.correctGroup === 'other') {
                this.showFeedback(`Not quite! ${this.currentAnimal.name} doesn't belong to any of the main groups. ${this.currentAnimal.hint}`, 'incorrect');
            } else {
                this.showFeedback(`Not quite! ${this.currentAnimal.name} is a ${this.currentAnimal.correctGroup}. ${this.currentAnimal.hint}`, 'incorrect');
            }
        }
        
        this.currentQuestion++;
        this.updateDisplay();
        
        // Check level progression
        setTimeout(() => {
            if (this.currentQuestion >= this.questionsPerLevel) {
                this.levelUp();
            } else {
                this.loadNextAnimal();
            }
        }, 2000);
    }
    
    // Show feedback message with animation
    showFeedback(message, type) {
        this.feedbackElement.textContent = message;
        this.feedbackElement.className = `feedback-message show ${type}`;
        
        setTimeout(() => {
            this.feedbackElement.classList.remove('show');
        }, 1800);
    }
    
    // Level up progression
    levelUp() {
        this.level++;
        this.currentQuestion = 0;
        this.timeLeft += 20; // Bonus time for completing level
        
        this.showFeedback(`🎊 Level ${this.level} Unlocked! Bonus time added! 🎊`, 'correct');
        
        setTimeout(() => {
            this.loadNextAnimal();
        }, 2500);
    }
    
    // Reset button visual states
    resetButtonStates() {
        this.classificationButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
        });
    }
    
    // Update all display elements
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.timerElement.textContent = this.timeLeft;
        this.levelElement.textContent = this.level;
        this.progressElement.textContent = `${this.currentQuestion}/${this.questionsPerLevel}`;
    }
    
    // Show educational tooltip
    showTooltip(event) {
        const button = event.currentTarget;
        const title = button.getAttribute('title');
        
        if (title) {
            this.tooltip.textContent = title;
            this.tooltip.classList.add('show');
            
            // Position tooltip
            const rect = button.getBoundingClientRect();
            const containerRect = document.getElementById('gameContainer').getBoundingClientRect();
            
            this.tooltip.style.left = (rect.left + rect.width / 2 - containerRect.left) + 'px';
            this.tooltip.style.top = (rect.top - containerRect.top - 40) + 'px';
            this.tooltip.style.transform = 'translateX(-50%)';
        }
    }
    
    // Hide tooltip
    hideTooltip() {
        this.tooltip.classList.remove('show');
    }
    
    // End game and show results
    endGame() {
        this.gameActive = false;
        clearInterval(this.timer);
        
        // Calculate accuracy
        const accuracy = this.totalAnswers > 0 ? Math.round((this.correctAnswers / this.totalAnswers) * 100) : 0;
        
        // Update final stats
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLevel').textContent = this.level;
        document.getElementById('accuracy').textContent = accuracy + '%';
        
        // Show appropriate message based on performance
        const gameOverTitle = document.getElementById('gameOverTitle');
        if (accuracy >= 80) {
            gameOverTitle.textContent = '🌟 Amazing Work! 🌟';
        } else if (accuracy >= 60) {
            gameOverTitle.textContent = '👍 Good Job! 👍';
        } else {
            gameOverTitle.textContent = '💪 Keep Practicing! 💪';
        }
        
        // Show game over screen
        this.gameOverScreen.classList.add('show');
    }
    
    // Reset game state for new game
    resetGame() {
        this.score = 0;
        this.level = 1;
        this.timeLeft = 60;
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.totalAnswers = 0;
        this.gameActive = false;
        
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Cancel any ongoing speech for auditory learners
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
        
        // Reset visual elements
        this.timerElement.style.color = 'white';
        this.timerElement.style.animation = 'none';
        this.gameOverScreen.classList.remove('show');
        this.feedbackElement.classList.remove('show');
        this.resetButtonStates();
        
        // Reset speaker button appearance
        this.speakerButton.style.transform = 'scale(1)';
        this.speakerButton.style.background = 'rgba(255, 255, 255, 0.2)';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if running in iframe or full screen for responsive design
    const isInIframe = window.self !== window.top;
    const gameContainer = document.getElementById('gameContainer');
    
    if (!isInIframe && window.innerHeight > 500) {
        gameContainer.style.height = '90vh';
    }
    
    // Start the game
    new AnimalClassificationGame();
});

// Add CSS animation keyframes dynamically for pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);