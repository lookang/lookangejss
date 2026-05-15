// Game state management and interactive functionality
class SchoolHeroesGame {
    constructor() {
        // Initialize game state variables
        this.score = 0;
        this.level = 1;
        this.progress = 0;
        this.currentScenario = 0;
        this.totalScenarios = 8;
        
        // Text-to-speech functionality variables
        this.speechSynthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.isSpeaking = false;
        
        // Game scenarios with prosocial behavior choices
        this.scenarios = [
            {
                icon: "🏫",
                description: "You arrive at school and see your teacher at the door.",
                dialogue: "Your teacher is greeting students at the classroom door. What should you do?",
                choices: [
                    { text: "Say 'Good morning, Teacher!' with a smile", correct: true, feedback: "Excellent! Greeting your teacher politely shows respect!" },
                    { text: "Walk past without saying anything", correct: false, feedback: "Remember to greet your teacher! It shows respect and kindness." },
                    { text: "Run into the classroom quickly", correct: false, feedback: "It's better to greet your teacher first before entering the classroom." }
                ]
            },
            {
                icon: "📚",
                description: "During lesson time, you notice a classmate has dropped their pencil.",
                dialogue: "Your friend's pencil rolled under their desk. What's the right thing to do?",
                choices: [
                    { text: "Help pick up the pencil and give it back", correct: true, feedback: "Great job! Helping friends shows kindness and care!" },
                    { text: "Ignore it and continue with your work", correct: false, feedback: "Helping friends when they need it is a kind thing to do!" },
                    { text: "Tell the teacher about the pencil", correct: false, feedback: "You can help directly by picking it up for your friend!" }
                ]
            },
            {
                icon: "🍎",
                description: "It's recess time and you're eating your snack.",
                dialogue: "You finish your snack and need to throw away the wrapper. What should you do?",
                choices: [
                    { text: "Throw it in the dustbin", correct: true, feedback: "Perfect! Keeping our school clean is everyone's responsibility!" },
                    { text: "Leave it on the table", correct: false, feedback: "Remember to clean up after yourself to keep our school tidy!" },
                    { text: "Put it in your bag to throw later", correct: false, feedback: "Good thinking, but it's better to throw it in the dustbin right away!" }
                ]
            },
            {
                icon: "🤝",
                description: "A new student joins your class today.",
                dialogue: "There's a new friend in your class who looks shy. How can you help?",
                choices: [
                    { text: "Introduce yourself and invite them to play", correct: true, feedback: "Wonderful! Making new friends feel welcome is very kind!" },
                    { text: "Wait for the teacher to introduce them", correct: false, feedback: "You can help by being friendly and welcoming!" },
                    { text: "Continue playing with your usual friends", correct: false, feedback: "Including new friends helps them feel welcome and happy!" }
                ]
            },
            {
                icon: "📖",
                description: "During reading time, you want to borrow a book.",
                dialogue: "You want to read a book that another student is looking at. What should you do?",
                choices: [
                    { text: "Ask politely if you can read it after them", correct: true, feedback: "Excellent! Asking nicely and waiting your turn shows good manners!" },
                    { text: "Take the book when they're not looking", correct: false, feedback: "Always ask before taking something that someone else is using!" },
                    { text: "Tell the teacher they won't share", correct: false, feedback: "Try asking politely first - most friends are happy to share!" }
                ]
            },
            {
                icon: "🎨",
                description: "During art class, you accidentally spill paint on your friend's work.",
                dialogue: "Oh no! You accidentally got paint on your friend's artwork. What should you do?",
                choices: [
                    { text: "Say sorry and offer to help fix it", correct: true, feedback: "Great! Saying sorry and helping to fix mistakes shows responsibility!" },
                    { text: "Pretend it wasn't you", correct: false, feedback: "It's always better to be honest and say sorry when we make mistakes!" },
                    { text: "Blame someone else", correct: false, feedback: "Being truthful and taking responsibility is the right thing to do!" }
                ]
            },
            {
                icon: "🏃",
                description: "You're walking in the corridor and see someone running.",
                dialogue: "You see a classmate running in the corridor. What's the safe thing to do?",
                choices: [
                    { text: "Remind them to walk safely in school", correct: true, feedback: "Perfect! Helping friends stay safe shows you care about them!" },
                    { text: "Run with them because it looks fun", correct: false, feedback: "Running in corridors can be dangerous. Walking keeps everyone safe!" },
                    { text: "Ignore them and continue walking", correct: false, feedback: "Helping friends make safe choices is a kind thing to do!" }
                ]
            },
            {
                icon: "🌟",
                description: "The school day is ending and it's time to go home.",
                dialogue: "School is over! What's a good way to end the day?",
                choices: [
                    { text: "Thank your teacher and say goodbye nicely", correct: true, feedback: "Fantastic! You've learned so much about being a good school friend!" },
                    { text: "Rush out quickly to go home", correct: false, feedback: "Taking time to say goodbye politely is a nice way to end the day!" },
                    { text: "Leave without saying anything", correct: false, feedback: "Saying goodbye shows appreciation for your teacher and classmates!" }
                ]
            }
        ];
        
        // Initialize game elements
        this.initializeGame();
    }
    
    // Initialize game elements and event listeners
    initializeGame() {
        this.updateDisplay();
        this.setupTooltips();
        this.setupSpeechSynthesis();
        this.startGame();
    }
    
    // Setup speech synthesis functionality
    setupSpeechSynthesis() {
        // Check if speech synthesis is supported
        if (!this.speechSynthesis) {
            console.warn('Speech synthesis not supported in this browser');
            const speakerBtn = document.getElementById('speaker-btn');
            speakerBtn.style.display = 'none';
            return;
        }
        
        // Handle speech synthesis events
        this.speechSynthesis.addEventListener('voiceschanged', () => {
            // Voices are loaded, ready to use
        });
    }
    
    // Read out the current situation using text-to-speech
    readOutSituation() {
        // Stop any currently playing speech
        if (this.isSpeaking) {
            this.speechSynthesis.cancel();
            this.updateSpeakerButton(false);
            return;
        }
        
        // Get current text to read
        const sceneDescription = document.getElementById('scene-description').textContent;
        const dialogueText = document.getElementById('dialogue-text').textContent;
        const textToRead = `${sceneDescription} ${dialogueText}`;
        
        // Create speech utterance
        this.currentUtterance = new SpeechSynthesisUtterance(textToRead);
        
        // Configure speech settings for child-friendly voice
        this.currentUtterance.rate = 0.8; // Slightly slower for clarity
        this.currentUtterance.pitch = 1.1; // Slightly higher pitch
        this.currentUtterance.volume = 0.8;
        
        // Try to use a more suitable voice if available
        const voices = this.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.lang.startsWith('en') && 
            (voice.name.includes('Female') || voice.name.includes('Google'))
        );
        if (preferredVoice) {
            this.currentUtterance.voice = preferredVoice;
        }
        
        // Set up event handlers
        this.currentUtterance.onstart = () => {
            this.isSpeaking = true;
            this.updateSpeakerButton(true);
        };
        
        this.currentUtterance.onend = () => {
            this.isSpeaking = false;
            this.updateSpeakerButton(false);
        };
        
        this.currentUtterance.onerror = () => {
            this.isSpeaking = false;
            this.updateSpeakerButton(false);
            console.error('Speech synthesis error occurred');
        };
        
        // Start speaking
        this.speechSynthesis.speak(this.currentUtterance);
    }
    
    // Update speaker button appearance based on speaking state
    updateSpeakerButton(isSpeaking) {
        const speakerBtn = document.getElementById('speaker-btn');
        if (isSpeaking) {
            speakerBtn.classList.add('speaking');
            speakerBtn.textContent = '🔇'; // Mute icon when speaking
            speakerBtn.title = 'Click to stop reading';
        } else {
            speakerBtn.classList.remove('speaking');
            speakerBtn.textContent = '🔊'; // Speaker icon when not speaking
            speakerBtn.title = 'Click to hear the situation read aloud';
        }
    }
    
    // Setup tooltip functionality for UI elements
    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        const tooltipContent = document.getElementById('tooltip-content');
        
        // Add tooltip functionality to elements with title attributes
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                tooltipContent.textContent = e.target.getAttribute('title');
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
    
    // Position tooltip near cursor
    positionTooltip(event, tooltip) {
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2) + 'px';
        tooltip.style.top = (rect.top - 40) + 'px';
    }
    
    // Start the game with first scenario
    startGame() {
        this.loadScenario(this.currentScenario);
    }
    
    // Load a specific scenario
    loadScenario(index) {
        if (index >= this.scenarios.length) {
            this.completeGame();
            return;
        }
        
        const scenario = this.scenarios[index];
        
        // Update scene elements
        document.getElementById('situation-icon').textContent = scenario.icon;
        document.getElementById('scene-description').textContent = scenario.description;
        document.getElementById('dialogue-text').textContent = scenario.dialogue;
        
        // Setup choice buttons
        const choice1 = document.getElementById('choice1');
        const choice2 = document.getElementById('choice2');
        const choice3 = document.getElementById('choice3');
        
        choice1.textContent = scenario.choices[0].text;
        choice2.textContent = scenario.choices[1].text;
        choice3.textContent = scenario.choices[2].text;
        
        // Show all choice buttons
        choice1.style.display = 'block';
        choice2.style.display = 'block';
        choice3.style.display = 'block';
        
        // Reset button styles
        [choice1, choice2, choice3].forEach(btn => {
            btn.className = 'decision-btn';
        });
        
        // Stop any ongoing speech when loading new scenario
        if (this.isSpeaking) {
            this.speechSynthesis.cancel();
            this.updateSpeakerButton(false);
        }
        
        // Add character animation
        this.animateCharacter();
    }
    
    // Handle choice selection
    makeChoice(choiceIndex) {
        const scenario = this.scenarios[this.currentScenario];
        const choice = scenario.choices[choiceIndex - 1];
        const button = document.getElementById(`choice${choiceIndex}`);
        
        // Stop speech if playing
        if (this.isSpeaking) {
            this.speechSynthesis.cancel();
            this.updateSpeakerButton(false);
        }
        
        // Provide immediate visual feedback
        if (choice.correct) {
            button.classList.add('correct');
            this.score += 10;
            this.progress += (100 / this.totalScenarios);
            this.showCelebration(choice.feedback, '🎉');
            this.animateCharacterSuccess();
        } else {
            button.classList.add('wrong');
            this.showCelebration(choice.feedback, '💭');
        }
        
        // Update display
        this.updateDisplay();
        
        // Disable all buttons temporarily
        document.querySelectorAll('.decision-btn').forEach(btn => {
            btn.disabled = true;
        });
        
        // Auto-continue after feedback
        setTimeout(() => {
            this.nextScenario();
        }, 2000);
    }
    
    // Move to next scenario
    nextScenario() {
        this.currentScenario++;
        
        // Check for level progression
        if (this.currentScenario % 3 === 0 && this.currentScenario < this.scenarios.length) {
            this.level++;
            this.showCelebration(`Level ${this.level} unlocked! You're becoming a great school friend!`, '⭐');
        }
        
        // Re-enable buttons
        document.querySelectorAll('.decision-btn').forEach(btn => {
            btn.disabled = false;
        });
        
        // Load next scenario or complete game
        if (this.currentScenario < this.scenarios.length) {
            this.loadScenario(this.currentScenario);
        } else {
            this.completeGame();
        }
    }
    
    // Complete the game
    completeGame() {
        const finalScore = this.score;
        let message = '';
        let emoji = '';
        
        if (finalScore >= 70) {
            message = `Amazing! You scored ${finalScore} points! You're a true School Hero! 🌟`;
            emoji = '🏆';
        } else if (finalScore >= 50) {
            message = `Great job! You scored ${finalScore} points! You're learning to be a good friend! 😊`;
            emoji = '🎉';
        } else {
            message = `Good try! You scored ${finalScore} points! Keep practicing to become a better school friend! 💪`;
            emoji = '👍';
        }
        
        // Update scene for completion
        document.getElementById('situation-icon').textContent = emoji;
        document.getElementById('scene-description').textContent = 'Congratulations! You completed School Heroes Adventure!';
        document.getElementById('dialogue-text').textContent = message;
        
        // Show restart option
        const choice1 = document.getElementById('choice1');
        choice1.textContent = 'Play Again';
        choice1.style.display = 'block';
        choice1.onclick = () => this.restartGame();
        
        // Hide other buttons
        document.getElementById('choice2').style.display = 'none';
        document.getElementById('choice3').style.display = 'none';
        
        // Stop any ongoing speech
        if (this.isSpeaking) {
            this.speechSynthesis.cancel();
            this.updateSpeakerButton(false);
        }
        
        // Final celebration
        setTimeout(() => {
            this.showCelebration(message, emoji);
        }, 1000);
    }
    
    // Restart the game
    restartGame() {
        this.score = 0;
        this.level = 1;
        this.progress = 0;
        this.currentScenario = 0;
        
        // Stop any ongoing speech
        if (this.isSpeaking) {
            this.speechSynthesis.cancel();
            this.updateSpeakerButton(false);
        }
        
        this.updateDisplay();
        this.loadScenario(0);
        
        // Reset choice button onclick handlers
        document.getElementById('choice1').onclick = () => this.makeChoice(1);
        document.getElementById('choice2').onclick = () => this.makeChoice(2);
        document.getElementById('choice3').onclick = () => this.makeChoice(3);
    }
    
    // Show celebration overlay
    showCelebration(message, emoji) {
        const overlay = document.getElementById('celebration-overlay');
        const text = document.getElementById('celebration-text');
        const emojiElement = overlay.querySelector('.celebration-emoji');
        
        text.textContent = message;
        emojiElement.textContent = emoji;
        overlay.style.display = 'flex';
    }
    
    // Hide celebration overlay
    hideCelebration() {
        document.getElementById('celebration-overlay').style.display = 'none';
    }
    
    // Update score and progress display
    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('progress-fill').style.width = Math.min(this.progress, 100) + '%';
    }
    
    // Animate character for engagement
    animateCharacter() {
        const character = document.getElementById('main-character');
        character.style.transform = 'scale(1.1)';
        setTimeout(() => {
            character.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Animate character for success
    animateCharacterSuccess() {
        const characterFace = document.querySelector('.character-face');
        const originalEmoji = characterFace.textContent;
        characterFace.textContent = '🎉';
        
        setTimeout(() => {
            characterFace.textContent = '😊';
        }, 1500);
    }
}

// Global function for choice handling (called from HTML)
let game;

function makeChoice(choiceIndex) {
    if (game) {
        game.makeChoice(choiceIndex);
    }
}

function hideCelebration() {
    if (game) {
        game.hideCelebration();
    }
}

// Global function for text-to-speech (called from HTML)
function readOutSituation() {
    if (game) {
        game.readOutSituation();
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    game = new SchoolHeroesGame();
});

// Handle responsive design for different screen sizes
window.addEventListener('resize', function() {
    // Adjust game container height based on viewport
    const container = document.querySelector('.game-container');
    if (window.innerHeight > 500) {
        container.style.height = '90vh';
        container.style.maxHeight = '90vh';
    } else {
        container.style.height = '450px';
        container.style.maxHeight = '450px';
    }
});

// Touch event handling for mobile devices
document.addEventListener('touchstart', function(e) {
    // Prevent default touch behavior that might interfere with game
    if (e.target.classList.contains('decision-btn') || e.target.classList.contains('speaker-btn')) {
        e.preventDefault();
    }
}, { passive: false });

// Accessibility: Keyboard navigation support
document.addEventListener('keydown', function(e) {
    const buttons = document.querySelectorAll('.decision-btn:not([style*="display: none"])');
    
    switch(e.key) {
        case '1':
            if (buttons[0] && !buttons[0].disabled) buttons[0].click();
            break;
        case '2':
            if (buttons[1] && !buttons[1].disabled) buttons[1].click();
            break;
        case '3':
            if (buttons[2] && !buttons[2].disabled) buttons[2].click();
            break;
        case 'Enter':
            if (document.getElementById('celebration-overlay').style.display === 'flex') {
                hideCelebration();
            }
            break;
        case ' ': // Spacebar to trigger speech
            e.preventDefault();
            readOutSituation();
            break;
    }
});