// Game state management
class PermissionGame {
    constructor() {
        this.currentLevel = 0;
        this.currentStep = 0;
        this.score = 0;
        this.scenarios = [
            {
                name: "Classroom",
                background: "classroom",
                characters: [
                    { name: "Mr Tan", role: "teacher", correct: true },
                    { name: "Sarah", role: "student", correct: false },
                    { name: "Ahmad", role: "student", correct: false }
                ],
                situation: "You want to borrow a pencil during class time.",
                steps: [
                    {
                        instruction: "Who should you ask for permission to borrow a pencil?",
                        options: ["Mr Tan (Teacher)", "Sarah (Classmate)", "Ahmad (Classmate)"],
                        correct: 0,
                        feedback: {
                            correct: "Great! You should ask your teacher Mr Tan for permission during class time.",
                            incorrect: "Not quite. During class time, you should ask your teacher for permission first."
                        }
                    },
                    {
                        instruction: "How do you get Mr Tan's attention appropriately?",
                        options: ["Shout 'Mr Tan!'", "Raise your hand quietly", "Tap him on the shoulder"],
                        correct: 1,
                        feedback: {
                            correct: "Perfect! Raising your hand quietly is the polite way to get teacher's attention.",
                            incorrect: "Try again. Think about the polite way to get your teacher's attention in class."
                        }
                    },
                    {
                        instruction: "How do you address Mr Tan?",
                        options: ["Hey!", "Mr Tan", "Teacher"],
                        correct: 1,
                        feedback: {
                            correct: "Excellent! Using 'Mr Tan' shows respect and is appropriate.",
                            incorrect: "Remember to use your teacher's proper name to show respect."
                        }
                    },
                    {
                        instruction: "How do you ask for permission politely?",
                        options: ["I need a pencil now", "May I please borrow a pencil?", "Give me a pencil"],
                        correct: 1,
                        feedback: {
                            correct: "Wonderful! Using 'May I please' is very polite and respectful.",
                            incorrect: "Think about using polite words like 'please' and 'may I' when asking."
                        }
                    },
                    {
                        instruction: "What do you do after asking?",
                        options: ["Take the pencil immediately", "Wait for Mr Tan to respond", "Ask someone else"],
                        correct: 1,
                        feedback: {
                            correct: "Perfect! Always wait for the person to give you permission before acting.",
                            incorrect: "Remember to wait patiently for the person to respond to your request."
                        }
                    }
                ]
            },
            {
                name: "Home",
                background: "home",
                characters: [
                    { name: "Mummy", role: "parent", correct: true },
                    { name: "Sister", role: "sibling", correct: false }
                ],
                situation: "You want to watch TV before finishing your homework.",
                steps: [
                    {
                        instruction: "Who should you ask for permission to watch TV?",
                        options: ["Mummy", "Sister", "Nobody"],
                        correct: 0,
                        feedback: {
                            correct: "Right! You should ask Mummy for permission since she's the adult in charge.",
                            incorrect: "Think about who makes the rules at home about TV and homework time."
                        }
                    },
                    {
                        instruction: "How do you get Mummy's attention nicely?",
                        options: ["Call 'Mummy' loudly", "Say 'Mummy' gently", "Pull her arm"],
                        correct: 1,
                        feedback: {
                            correct: "Great! Speaking gently shows good manners and respect.",
                            incorrect: "Remember to be gentle and respectful when getting someone's attention."
                        }
                    },
                    {
                        instruction: "How do you address Mummy?",
                        options: ["Mummy", "Hey you", "Woman"],
                        correct: 0,
                        feedback: {
                            correct: "Perfect! 'Mummy' is the loving and respectful way to address your mother.",
                            incorrect: "Always use the proper and loving name for your family members."
                        }
                    },
                    {
                        instruction: "How do you ask politely?",
                        options: ["I want to watch TV now", "Can I please watch TV?", "Let me watch TV"],
                        correct: 1,
                        feedback: {
                            correct: "Excellent! 'Can I please' shows you're asking nicely, not demanding.",
                            incorrect: "Remember to use polite words like 'please' and 'can I' when making requests."
                        }
                    },
                    {
                        instruction: "What should you do while waiting for Mummy's answer?",
                        options: ["Turn on the TV anyway", "Wait quietly and patiently", "Ask again immediately"],
                        correct: 1,
                        feedback: {
                            correct: "Wonderful! Waiting patiently shows maturity and respect.",
                            incorrect: "Patience is important. Wait for the person to think and give you an answer."
                        }
                    }
                ]
            },
            {
                name: "School Playground",
                background: "school",
                characters: [
                    { name: "Ms Lim", role: "teacher", correct: true },
                    { name: "Ben", role: "student", correct: false },
                    { name: "Mei Ling", role: "student", correct: false }
                ],
                situation: "You want to use the basketball during recess.",
                steps: [
                    {
                        instruction: "Who should you ask for permission to use the basketball?",
                        options: ["Ms Lim (Duty Teacher)", "Ben (Student)", "Mei Ling (Student)"],
                        correct: 0,
                        feedback: {
                            correct: "Correct! Ms Lim is the duty teacher who supervises playground activities.",
                            incorrect: "Look for the adult who is supervising the playground during recess."
                        }
                    },
                    {
                        instruction: "How do you approach Ms Lim appropriately?",
                        options: ["Run up quickly", "Walk up calmly", "Shout from far away"],
                        correct: 1,
                        feedback: {
                            correct: "Great! Walking up calmly is safe and shows good behavior.",
                            incorrect: "Think about the safe and polite way to approach someone."
                        }
                    },
                    {
                        instruction: "How do you greet Ms Lim?",
                        options: ["Ms Lim", "Teacher", "Hey"],
                        correct: 0,
                        feedback: {
                            correct: "Perfect! Using 'Ms Lim' is respectful and appropriate.",
                            incorrect: "Use the teacher's proper name to show respect."
                        }
                    },
                    {
                        instruction: "How do you make your request?",
                        options: ["I want the basketball", "May I please use the basketball?", "Can I have that ball?"],
                        correct: 1,
                        feedback: {
                            correct: "Excellent! This is a very polite and clear way to ask for permission.",
                            incorrect: "Remember to be specific and polite with 'may I please' in your request."
                        }
                    },
                    {
                        instruction: "What do you do after asking Ms Lim?",
                        options: ["Grab the basketball", "Wait for her permission", "Ask another teacher"],
                        correct: 1,
                        feedback: {
                            correct: "Perfect! Always wait for permission before taking or using something.",
                            incorrect: "Patience is key. Wait for the person to give you permission first."
                        }
                    }
                ]
            }
        ];
        
        this.init();
    }

    init() {
        // Initialize DOM elements
        this.gameContainer = document.getElementById('gameContainer');
        this.progressFill = document.getElementById('progressFill');
        this.levelIndicator = document.getElementById('levelIndicator');
        this.scenarioBackground = document.getElementById('scenarioBackground');
        this.characterArea = document.getElementById('characterArea');
        this.skillsTracker = document.getElementById('skillsTracker');
        this.dialogueBox = document.getElementById('dialogueBox');
        this.dialogueContent = document.getElementById('dialogueContent');
        this.audioBtn = document.getElementById('audioBtn');
        this.decisionArea = document.getElementById('decisionArea');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.celebrationOverlay = document.getElementById('celebrationOverlay');
        this.celebrationMessage = document.getElementById('celebrationMessage');
        this.celebrationBtn = document.getElementById('celebrationBtn');
        this.tooltip = document.getElementById('tooltip');

        // Bind events
        this.bindEvents();
        
        // Start the game
        this.showIntroduction();
    }

    bindEvents() {
        // Navigation buttons
        this.nextBtn.addEventListener('click', () => this.handleNext());
        this.prevBtn.addEventListener('click', () => this.handlePrevious());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        
        // Audio button
        this.audioBtn.addEventListener('click', () => this.playAudio());
        
        // Celebration button
        this.celebrationBtn.addEventListener('click', () => this.hideCelebration());
        
        // Tooltip functionality
        this.setupTooltips();
        
        // Touch support for mobile
        this.setupTouchSupport();
    }

    setupTooltips() {
        // Add tooltips for various elements
        const tooltipElements = [
            { element: this.skillsTracker, text: "Track your progress through the 5 permission steps" },
            { element: this.audioBtn, text: "Click to hear the text read aloud" },
            { element: this.progressFill.parentElement, text: "Your overall game progress" }
        ];

        tooltipElements.forEach(({ element, text }) => {
            element.addEventListener('mouseenter', (e) => this.showTooltip(e, text));
            element.addEventListener('mouseleave', () => this.hideTooltip());
        });
    }

    setupTouchSupport() {
        // Add touch feedback for buttons
        const buttons = this.gameContainer.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('touchstart', () => {
                button.style.transform = 'scale(0.95)';
            });
            button.addEventListener('touchend', () => {
                button.style.transform = '';
            });
        });
    }

    showTooltip(event, text) {
        this.tooltip.textContent = text;
        this.tooltip.style.left = event.pageX + 'px';
        this.tooltip.style.top = (event.pageY - 40) + 'px';
        this.tooltip.classList.add('show');
    }

    hideTooltip() {
        this.tooltip.classList.remove('show');
    }

    showIntroduction() {
        this.updateDialogue("Welcome to Permission Please! 🌟 In this game, you'll learn the 5 important steps to ask for permission politely. Let's practice in different places: classroom, home, and school playground!");
        this.nextBtn.textContent = "Start Learning →";
        this.updateProgress();
    }

    startLevel(levelIndex) {
        this.currentLevel = levelIndex;
        this.currentStep = 0;
        
        const scenario = this.scenarios[levelIndex];
        this.setupScenario(scenario);
        this.showStep();
    }

    setupScenario(scenario) {
        // Update background
        this.scenarioBackground.className = `scenario-background ${scenario.background}`;
        
        // Update level indicator
        this.levelIndicator.textContent = `Level ${this.currentLevel + 1} of ${this.scenarios.length}`;
        
        // Create characters
        this.characterArea.innerHTML = '';
        scenario.characters.forEach((character, index) => {
            const charElement = document.createElement('div');
            charElement.className = 'character';
            charElement.setAttribute('data-name', character.name);
            charElement.setAttribute('data-role', character.role);
            charElement.addEventListener('click', () => this.selectCharacter(index));
            this.characterArea.appendChild(charElement);
        });
        
        // Show scenario introduction
        this.updateDialogue(`📍 ${scenario.name}: ${scenario.situation} Let's learn how to ask for permission properly!`);
    }

    showStep() {
        const scenario = this.scenarios[this.currentLevel];
        const step = scenario.steps[this.currentStep];
        
        // Update skills tracker
        this.updateSkillsTracker();
        
        // Update dialogue
        this.updateDialogue(step.instruction);
        
        // Create decision buttons
        this.createDecisionButtons(step.options, step.correct);
        
        // Update navigation
        this.updateNavigation();
    }

    updateSkillsTracker() {
        const skillSteps = this.skillsTracker.querySelectorAll('.skill-step');
        skillSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index < this.currentStep) {
                step.classList.add('completed');
            } else if (index === this.currentStep) {
                step.classList.add('active');
            }
        });
    }

    createDecisionButtons(options, correctIndex) {
        this.decisionArea.innerHTML = '';
        
        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'decision-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.handleDecision(index, correctIndex));
            this.decisionArea.appendChild(button);
        });
    }

    handleDecision(selectedIndex, correctIndex) {
        const buttons = this.decisionArea.querySelectorAll('.decision-btn');
        const scenario = this.scenarios[this.currentLevel];
        const step = scenario.steps[this.currentStep];
        
        // Disable all buttons
        buttons.forEach(btn => btn.disabled = true);
        
        if (selectedIndex === correctIndex) {
            // Correct answer
            buttons[selectedIndex].classList.add('correct');
            this.updateDialogue(step.feedback.correct);
            this.score++;
            
            // Move to next step after delay
            setTimeout(() => {
                this.nextStep();
            }, 2000);
            
        } else {
            // Incorrect answer
            buttons[selectedIndex].classList.add('incorrect');
            buttons[correctIndex].classList.add('correct');
            this.updateDialogue(step.feedback.incorrect + " The correct answer is highlighted in green.");
            
            // Allow retry after delay
            setTimeout(() => {
                buttons.forEach(btn => {
                    btn.disabled = false;
                    btn.classList.remove('correct', 'incorrect');
                });
            }, 3000);
        }
    }

    nextStep() {
        this.currentStep++;
        
        if (this.currentStep >= this.scenarios[this.currentLevel].steps.length) {
            // Level completed
            this.completeLevel();
        } else {
            // Show next step
            this.showStep();
        }
        
        this.updateProgress();
    }

    completeLevel() {
        const isLastLevel = this.currentLevel >= this.scenarios.length - 1;
        
        if (isLastLevel) {
            this.completeGame();
        } else {
            this.showCelebration(
                "Level Complete! 🎉",
                `Great job completing the ${this.scenarios[this.currentLevel].name} scenario! You're learning how to ask for permission like a pro!`,
                () => {
                    this.currentLevel++;
                    this.startLevel(this.currentLevel);
                }
            );
        }
    }

    completeGame() {
        this.showCelebration(
            "Congratulations! 🏆",
            `You've mastered all 5 steps of asking for permission! You completed ${this.score} steps correctly. You're now a Permission Pro!`,
            () => {
                this.showGameComplete();
            }
        );
    }

    showGameComplete() {
        this.updateDialogue("🌟 Fantastic! You've learned how to ask for permission properly in different situations. Remember these 5 steps: 1) Decide who to ask, 2) Get attention appropriately, 3) Address the person, 4) Ask politely, 5) Wait for permission. Well done!");
        this.nextBtn.style.display = 'none';
        this.restartBtn.style.display = 'block';
        this.decisionArea.innerHTML = '';
    }

    showCelebration(title, message, callback) {
        this.celebrationMessage.textContent = message;
        this.celebrationOverlay.classList.add('show');
        
        this.celebrationBtn.onclick = () => {
            this.hideCelebration();
            if (callback) callback();
        };
    }

    hideCelebration() {
        this.celebrationOverlay.classList.remove('show');
    }

    handleNext() {
        if (this.currentLevel === 0 && this.currentStep === 0) {
            // Start first level
            this.startLevel(0);
        }
    }

    handlePrevious() {
        // Implementation for going back (if needed)
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep();
        }
    }

    restartGame() {
        this.currentLevel = 0;
        this.currentStep = 0;
        this.score = 0;
        this.nextBtn.style.display = 'block';
        this.restartBtn.style.display = 'none';
        this.showIntroduction();
    }

    updateDialogue(text) {
        this.dialogueContent.textContent = text;
    }

    updateNavigation() {
        this.prevBtn.disabled = this.currentLevel === 0 && this.currentStep === 0;
        
        if (this.currentStep >= this.scenarios[this.currentLevel].steps.length - 1 && 
            this.currentLevel >= this.scenarios.length - 1) {
            this.nextBtn.textContent = "Complete Game";
        } else {
            this.nextBtn.textContent = "Continue →";
        }
    }

    updateProgress() {
        const totalSteps = this.scenarios.reduce((sum, scenario) => sum + scenario.steps.length, 0);
        const completedSteps = this.scenarios.slice(0, this.currentLevel).reduce((sum, scenario) => sum + scenario.steps.length, 0) + this.currentStep;
        const progress = (completedSteps / totalSteps) * 100;
        
        this.progressFill.style.width = progress + '%';
    }

    playAudio() {
        // Text-to-speech functionality
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(this.dialogueContent.textContent);
            utterance.rate = 0.8;
            utterance.pitch = 1.1;
            utterance.volume = 0.8;
            
            // Use a child-friendly voice if available
            const voices = speechSynthesis.getVoices();
            const childVoice = voices.find(voice => 
                voice.name.includes('Female') || 
                voice.name.includes('Woman') ||
                voice.lang.startsWith('en')
            );
            
            if (childVoice) {
                utterance.voice = childVoice;
            }
            
            speechSynthesis.speak(utterance);
            
            // Visual feedback
            this.audioBtn.style.background = '#4CAF50';
            setTimeout(() => {
                this.audioBtn.style.background = '#2196F3';
            }, 1000);
        } else {
            // Fallback for browsers without speech synthesis
            alert('Audio not supported in this browser');
        }
    }

    selectCharacter(index) {
        const characters = this.characterArea.querySelectorAll('.character');
        characters.forEach((char, i) => {
            char.classList.toggle('selected', i === index);
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Ensure speech synthesis voices are loaded
    if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = () => {
            // Voices are now loaded
        };
    }
    
    // Start the game
    const game = new PermissionGame();
    
    // Add keyboard support for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('decision-btn') || 
                focusedElement.classList.contains('nav-btn')) {
                focusedElement.click();
            }
        }
    });
    
    // Handle window resize for responsive design
    window.addEventListener('resize', () => {
        // Adjust layout if needed
        const container = document.getElementById('gameContainer');
        if (window.innerHeight > 500) {
            container.style.height = '90vh';
        } else {
            container.style.height = '450px';
        }
    });
});