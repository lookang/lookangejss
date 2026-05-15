// Game state management and core functionality
class PermissionQuestGame {
    constructor() {
        // Game state variables
        this.currentScenario = 0;
        this.currentStep = 0;
        this.completedSteps = [];
        this.scenarios = this.initializeScenarios();
        this.skillSteps = [
            "Decide who to ask for permission",
            "Get the person's attention in an appropriate way", 
            "Address the person",
            "Ask for permission politely",
            "Wait for the person to give you permission"
        ];
        
        // Voice-over functionality for accessibility
        this.voiceEnabled = true;
        this.speechSynthesis = window.speechSynthesis;
        this.currentUtterance = null;
        
        // Initialize game elements
        this.initializeElements();
        this.setupEventListeners();
        this.startGame();
    }

    // Initialize DOM elements for easy access
    initializeElements() {
        this.gameArea = document.getElementById('gameArea');
        this.dialogueBox = document.getElementById('dialogueBox');
        this.dialogueText = document.getElementById('dialogueText');
        this.dialogueButtons = document.getElementById('dialogueButtons');
        this.decisionContainer = document.getElementById('decisionContainer');
        this.decisionTitle = document.getElementById('decisionTitle');
        this.decisionButtons = document.getElementById('decisionButtons');
        this.celebrationMessage = document.getElementById('celebrationMessage');
        this.progressBar = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.levelIndicator = document.querySelector('.level-text');
        this.levelIcon = document.querySelector('.level-icon');
        this.skillsInventory = document.getElementById('skillsInventory');
        this.nextScenarioBtn = document.getElementById('nextScenarioBtn');
        this.character = document.getElementById('character');
        this.npc = document.getElementById('npc');
        this.npcSprite = document.getElementById('npcSprite');
        this.tooltip = document.getElementById('tooltip');
        this.voiceToggleBtn = document.getElementById('voiceToggleBtn');
    }

    // Define scenarios with different contexts (home, school, classroom)
    initializeScenarios() {
        return [
            {
                name: "Home",
                icon: "🏠",
                background: "home-bg",
                npc: "👩",
                npcName: "Mom",
                context: "You want to go outside to play with your friends.",
                steps: [
                    {
                        question: "Who should you ask for permission to go outside?",
                        options: [
                            { text: "Ask your little brother", correct: false, feedback: "Your little brother can't give you permission. Try asking an adult!" },
                            { text: "Ask Mom or Dad", correct: true, feedback: "Great choice! Parents are the right people to ask for permission at home." },
                            { text: "Just go outside without asking", correct: false, feedback: "Always ask for permission first. It's important for your safety!" }
                        ]
                    },
                    {
                        question: "How should you get Mom's attention?",
                        options: [
                            { text: "Shout 'MOM!' very loudly", correct: false, feedback: "That's too loud and not polite. Try a gentler approach." },
                            { text: "Gently tap her shoulder and say 'Excuse me'", correct: true, feedback: "Perfect! That's a polite way to get someone's attention." },
                            { text: "Stand behind her and wait silently", correct: false, feedback: "She might not notice you. It's better to politely get her attention." }
                        ]
                    },
                    {
                        question: "How should you address Mom?",
                        options: [
                            { text: "Hey you!", correct: false, feedback: "That's not respectful. Use her name or title instead." },
                            { text: "Mom", correct: true, feedback: "Excellent! Using her name shows respect." },
                            { text: "Don't say anything", correct: false, feedback: "It's polite to address the person you're speaking to." }
                        ]
                    },
                    {
                        question: "What's the polite way to ask for permission?",
                        options: [
                            { text: "I'm going outside now!", correct: false, feedback: "That's telling, not asking. Remember to ask politely." },
                            { text: "May I please go outside to play?", correct: true, feedback: "Perfect! Using 'may I please' is very polite." },
                            { text: "Can I go outside? I really want to!", correct: false, feedback: "Close, but 'may I please' is more polite than 'can I'." }
                        ]
                    },
                    {
                        question: "What should you do after asking?",
                        options: [
                            { text: "Start walking to the door immediately", correct: false, feedback: "Wait for an answer first! Don't assume the answer is yes." },
                            { text: "Keep asking until she says yes", correct: false, feedback: "That's not respectful. Accept whatever answer she gives." },
                            { text: "Wait quietly for her answer", correct: true, feedback: "Excellent! Always wait patiently for the person's response." }
                        ]
                    }
                ]
            },
            {
                name: "School",
                icon: "🏫", 
                background: "school-bg",
                npc: "👨‍🏫",
                npcName: "Mr. Teacher",
                context: "You need to use the bathroom during recess.",
                steps: [
                    {
                        question: "Who should you ask for permission to use the bathroom?",
                        options: [
                            { text: "Ask your friend", correct: false, feedback: "Your friend can't give you permission. You need to ask a teacher!" },
                            { text: "Ask the teacher on duty", correct: true, feedback: "Great! Teachers are responsible for giving permission at school." },
                            { text: "Just go without asking anyone", correct: false, feedback: "Always ask for permission at school for your safety!" }
                        ]
                    },
                    {
                        question: "The teacher is talking to another student. How do you get attention?",
                        options: [
                            { text: "Interrupt them immediately", correct: false, feedback: "Don't interrupt! Wait for them to finish talking." },
                            { text: "Wait nearby and raise your hand", correct: true, feedback: "Perfect! This shows you're waiting politely without interrupting." },
                            { text: "Walk away and find another teacher", correct: false, feedback: "It's better to wait politely for this teacher to be available." }
                        ]
                    },
                    {
                        question: "How should you address the teacher?",
                        options: [
                            { text: "Teacher!", correct: false, feedback: "Use their proper title like 'Mr.' or 'Ms.' with their name." },
                            { text: "Mr. Johnson", correct: true, feedback: "Excellent! Using their proper title shows respect." },
                            { text: "Hey!", correct: false, feedback: "That's not respectful. Always use proper titles with teachers." }
                        ]
                    },
                    {
                        question: "What's the best way to ask for permission?",
                        options: [
                            { text: "I need to go to the bathroom right now!", correct: false, feedback: "That sounds demanding. Try asking more politely." },
                            { text: "May I please use the bathroom?", correct: true, feedback: "Perfect! That's polite and clear." },
                            { text: "Bathroom?", correct: false, feedback: "Use complete sentences and say 'please' to be polite." }
                        ]
                    },
                    {
                        question: "What should you do while waiting for permission?",
                        options: [
                            { text: "Start walking toward the bathroom", correct: false, feedback: "Wait for the teacher's response first!" },
                            { text: "Ask again louder", correct: false, feedback: "Be patient! The teacher heard you the first time." },
                            { text: "Stand quietly and wait for the answer", correct: true, feedback: "Great! Patience shows respect and good manners." }
                        ]
                    }
                ]
            },
            {
                name: "Classroom", 
                icon: "📚",
                background: "classroom-bg",
                npc: "👩‍🏫",
                npcName: "Ms. Smith",
                context: "You want to borrow a pencil from the teacher's desk.",
                steps: [
                    {
                        question: "Who should you ask to borrow a pencil?",
                        options: [
                            { text: "Take it without asking", correct: false, feedback: "Never take things without permission! That's not respectful." },
                            { text: "Ask the teacher", correct: true, feedback: "Correct! Always ask the teacher before taking anything from their desk." },
                            { text: "Ask the student next to you", correct: false, feedback: "The pencil belongs to the teacher, so you need to ask the teacher." }
                        ]
                    },
                    {
                        question: "The teacher is writing on the board. How do you get attention?",
                        options: [
                            { text: "Call out 'Teacher!'", correct: false, feedback: "Don't call out during class. Use the proper way to get attention." },
                            { text: "Raise your hand and wait", correct: true, feedback: "Perfect! Raising your hand is the classroom rule for getting attention." },
                            { text: "Go up to the teacher immediately", correct: false, feedback: "Stay in your seat and raise your hand first." }
                        ]
                    },
                    {
                        question: "When the teacher calls on you, how do you address her?",
                        options: [
                            { text: "Ms. Smith", correct: true, feedback: "Excellent! Always use the teacher's proper title and name." },
                            { text: "You", correct: false, feedback: "That's not respectful. Use the teacher's name." },
                            { text: "Lady", correct: false, feedback: "Use the teacher's proper title, not general terms." }
                        ]
                    },
                    {
                        question: "How should you ask to borrow the pencil?",
                        options: [
                            { text: "Give me a pencil", correct: false, feedback: "That's demanding, not asking. Try being more polite." },
                            { text: "May I please borrow a pencil?", correct: true, feedback: "Perfect! That's polite and shows good manners." },
                            { text: "I need a pencil", correct: false, feedback: "That's stating a need, not asking permission. Add 'may I please'." }
                        ]
                    },
                    {
                        question: "After asking, what should you do?",
                        options: [
                            { text: "Go to the teacher's desk", correct: false, feedback: "Wait for permission first! Don't assume the answer is yes." },
                            { text: "Wait for the teacher to respond", correct: true, feedback: "Great! Always wait patiently for the teacher's answer." },
                            { text: "Ask your classmate instead", correct: false, feedback: "You already asked the teacher. Wait for their response." }
                        ]
                    }
                ]
            }
        ];
    }

    // Set up event listeners for interactive elements
    setupEventListeners() {
        // Reset button functionality
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetCurrentScenario();
        });

        // Next scenario button functionality  
        this.nextScenarioBtn.addEventListener('click', () => {
            this.nextScenario();
        });

        // Voice toggle button functionality - Added for accessibility
        this.voiceToggleBtn.addEventListener('click', () => {
            this.toggleVoice();
        });

        // Tooltip functionality for skill items
        this.skillsInventory.addEventListener('mouseenter', (e) => {
            if (e.target.closest('.skill-item')) {
                const skillItem = e.target.closest('.skill-item');
                const title = skillItem.getAttribute('title');
                this.showTooltip(e, title);
            }
        });

        this.skillsInventory.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });

        // Mobile touch support for tooltips
        this.skillsInventory.addEventListener('touchstart', (e) => {
            if (e.target.closest('.skill-item')) {
                const skillItem = e.target.closest('.skill-item');
                const title = skillItem.getAttribute('title');
                this.showTooltip(e, title);
                setTimeout(() => this.hideTooltip(), 2000);
            }
        });
    }

    // Voice-over functionality for accessibility - Added to help students who cannot read well
    speak(text, rate = 0.8) {
        if (!this.voiceEnabled || !this.speechSynthesis) return;
        
        // Stop any current speech
        this.speechSynthesis.cancel();
        
        // Create new utterance
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        this.currentUtterance.rate = rate;
        this.currentUtterance.pitch = 1;
        this.currentUtterance.volume = 0.8;
        
        // Try to use a child-friendly voice if available
        const voices = this.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.name.includes('Female') || 
            voice.name.includes('Karen') || 
            voice.name.includes('Samantha')
        );
        if (preferredVoice) {
            this.currentUtterance.voice = preferredVoice;
        }
        
        this.speechSynthesis.speak(this.currentUtterance);
    }

    // Toggle voice functionality
    toggleVoice() {
        this.voiceEnabled = !this.voiceEnabled;
        this.voiceToggleBtn.classList.toggle('active', this.voiceEnabled);
        
        if (!this.voiceEnabled) {
            this.speechSynthesis.cancel();
            this.voiceToggleBtn.textContent = '🔇 Voice Off';
        } else {
            this.voiceToggleBtn.textContent = '🔊 Voice';
            this.speak("Voice reading is now on");
        }
    }

    // Create voice button for individual options - Added for better accessibility
    createVoiceButton(text) {
        const voiceBtn = document.createElement('button');
        voiceBtn.className = 'voice-btn';
        voiceBtn.innerHTML = '🔊';
        voiceBtn.title = 'Listen to this option';
        voiceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            voiceBtn.classList.add('speaking');
            this.speak(text);
            
            // Remove speaking class after speech
            setTimeout(() => {
                voiceBtn.classList.remove('speaking');
            }, text.length * 50); // Approximate speech duration
        });
        return voiceBtn;
    }

    // Start the game with introduction
    startGame() {
        this.updateScenarioDisplay();
        const introText = "Welcome to Permission Quest! Let's learn the 5 important steps to ask for permission properly. Click 'Start Learning' to begin!";
        this.showDialogue(introText, [
            { text: "Start Learning", action: () => this.startScenario() }
        ]);
        
        // Automatically read the introduction if voice is enabled
        if (this.voiceEnabled) {
            setTimeout(() => this.speak(introText), 500);
        }
    }

    // Begin current scenario
    startScenario() {
        const scenario = this.scenarios[this.currentScenario];
        this.currentStep = 0;
        this.completedSteps = [];
        this.updateProgressDisplay();
        this.updateSkillsDisplay();
        
        const scenarioText = `${scenario.context} Let's practice asking for permission step by step!`;
        this.showDialogue(scenarioText, [
            { text: "Let's Practice!", action: () => this.nextStep() }
        ]);
        
        // Read scenario context aloud
        if (this.voiceEnabled) {
            setTimeout(() => this.speak(scenarioText), 500);
        }
    }

    // Progress to next step in current scenario
    nextStep() {
        const scenario = this.scenarios[this.currentScenario];
        
        if (this.currentStep < scenario.steps.length) {
            this.showDecisionStep(scenario.steps[this.currentStep]);
        } else {
            this.completeScenario();
        }
    }

    // Display decision step with multiple choice options - Enhanced with voice support
    showDecisionStep(step) {
        this.hideDialogue();
        this.decisionTitle.textContent = step.question;
        this.decisionButtons.innerHTML = '';
        
        // Read the question aloud
        if (this.voiceEnabled) {
            setTimeout(() => this.speak(step.question), 300);
        }
        
        // Create decision buttons for each option with voice support
        step.options.forEach((option, index) => {
            const buttonContainer = document.createElement('div');
            buttonContainer.style.position = 'relative';
            
            const button = document.createElement('button');
            button.className = 'decision-btn';
            button.textContent = option.text;
            button.addEventListener('click', () => this.handleDecision(option, button));
            
            // Add voice button for each option - Key accessibility feature
            const voiceBtn = this.createVoiceButton(option.text);
            button.appendChild(voiceBtn);
            
            buttonContainer.appendChild(button);
            this.decisionButtons.appendChild(buttonContainer);
            
            // Auto-read options after a delay if voice is enabled
            if (this.voiceEnabled) {
                setTimeout(() => {
                    this.speak(`Option ${index + 1}: ${option.text}`);
                }, 1000 + (index * 1500));
            }
        });
        
        this.decisionContainer.style.display = 'block';
        this.updateProgressDisplay();
    }

    // Handle user's decision and provide feedback - Enhanced with voice feedback
    handleDecision(option, button) {
        // Visual feedback for correct/incorrect answers
        if (option.correct) {
            button.classList.add('correct');
            this.completedSteps.push(this.currentStep);
            this.updateSkillsDisplay();
            
            // Show celebration for correct answer
            setTimeout(() => {
                const celebrationText = "Great job! " + option.feedback;
                this.showCelebration(celebrationText);
                
                // Read feedback aloud
                if (this.voiceEnabled) {
                    this.speak(celebrationText);
                }
                
                setTimeout(() => {
                    this.hideCelebration();
                    this.currentStep++;
                    this.nextStep();
                }, 2000);
            }, 500);
        } else {
            button.classList.add('incorrect');
            // Show feedback for incorrect answer
            setTimeout(() => {
                const feedbackText = option.feedback + " Try again!";
                this.showDialogue(feedbackText, [
                    { text: "Try Again", action: () => this.showDecisionStep(this.scenarios[this.currentScenario].steps[this.currentStep]) }
                ]);
                
                // Read incorrect feedback aloud
                if (this.voiceEnabled) {
                    this.speak(feedbackText);
                }
            }, 1000);
        }
        
        // Disable all buttons after selection
        const allButtons = this.decisionButtons.querySelectorAll('.decision-btn');
        allButtons.forEach(btn => btn.disabled = true);
    }

    // Complete current scenario - Enhanced with voice celebration
    completeScenario() {
        this.hideDecisionContainer();
        const scenario = this.scenarios[this.currentScenario];
        
        const completionText = `🎉 Congratulations! You've mastered asking for permission in the ${scenario.name}!`;
        this.showCelebration(completionText);
        
        // Read completion message aloud
        if (this.voiceEnabled) {
            this.speak(completionText);
        }
        
        setTimeout(() => {
            this.hideCelebration();
            if (this.currentScenario < this.scenarios.length - 1) {
                const nextText = "Amazing work! You've learned all 5 steps for this scenario. Ready for the next challenge?";
                this.showDialogue(nextText, [
                    { text: "Next Scenario", action: () => this.nextScenario() }
                ]);
                this.nextScenarioBtn.style.display = 'block';
                
                if (this.voiceEnabled) {
                    this.speak(nextText);
                }
            } else {
                const finalText = "🏆 Fantastic! You've completed all scenarios and mastered the art of asking for permission! You're now a Permission Quest champion!";
                this.showDialogue(finalText, [
                    { text: "Play Again", action: () => this.restartGame() }
                ]);
                
                if (this.voiceEnabled) {
                    this.speak(finalText);
                }
            }
        }, 3000);
    }

    // Move to next scenario
    nextScenario() {
        if (this.currentScenario < this.scenarios.length - 1) {
            this.currentScenario++;
            this.updateScenarioDisplay();
            this.startScenario();
            this.nextScenarioBtn.style.display = 'none';
        }
    }

    // Reset current scenario
    resetCurrentScenario() {
        this.currentStep = 0;
        this.completedSteps = [];
        this.hideDecisionContainer();
        this.hideCelebration();
        this.speechSynthesis.cancel(); // Stop any current speech
        this.updateProgressDisplay();
        this.updateSkillsDisplay();
        this.startScenario();
    }

    // Restart entire game
    restartGame() {
        this.currentScenario = 0;
        this.currentStep = 0;
        this.completedSteps = [];
        this.nextScenarioBtn.style.display = 'none';
        this.speechSynthesis.cancel(); // Stop any current speech
        this.updateScenarioDisplay();
        this.updateProgressDisplay();
        this.updateSkillsDisplay();
        this.startGame();
    }

    // Update scenario background and NPC
    updateScenarioDisplay() {
        const scenario = this.scenarios[this.currentScenario];
        this.gameArea.className = scenario.background;
        this.levelIcon.textContent = scenario.icon;
        this.levelIndicator.textContent = scenario.name;
        this.npcSprite.textContent = scenario.npc;
    }

    // Update progress bar
    updateProgressDisplay() {
        const progress = ((this.currentStep + 1) / 5) * 100;
        this.progressBar.style.width = progress + '%';
        this.progressText.textContent = `Step ${this.currentStep + 1} of 5`;
    }

    // Update skills inventory display
    updateSkillsDisplay() {
        const skillItems = this.skillsInventory.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            const statusElement = item.querySelector('.skill-status');
            if (this.completedSteps.includes(index)) {
                statusElement.textContent = '✅';
                item.classList.add('completed');
            } else {
                statusElement.textContent = '❌';
                item.classList.remove('completed');
            }
        });
    }

    // Show dialogue with options - Enhanced with voice support
    showDialogue(text, options = []) {
        this.dialogueText.textContent = text;
        this.dialogueButtons.innerHTML = '';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'dialogue-btn';
            button.textContent = option.text;
            button.addEventListener('click', option.action);
            this.dialogueButtons.appendChild(button);
        });
        
        this.dialogueBox.style.display = 'block';
        this.hideDecisionContainer();
    }

    // Hide dialogue box
    hideDialogue() {
        this.dialogueBox.style.display = 'none';
    }

    // Hide decision container
    hideDecisionContainer() {
        this.decisionContainer.style.display = 'none';
    }

    // Show celebration message
    showCelebration(text) {
        document.getElementById('celebrationText').textContent = text;
        this.celebrationMessage.style.display = 'block';
    }

    // Hide celebration message
    hideCelebration() {
        this.celebrationMessage.style.display = 'none';
    }

    // Show tooltip
    showTooltip(event, text) {
        this.tooltip.textContent = text;
        this.tooltip.style.display = 'block';
        this.tooltip.style.left = event.pageX + 10 + 'px';
        this.tooltip.style.top = event.pageY - 30 + 'px';
    }

    // Hide tooltip
    hideTooltip() {
        this.tooltip.style.display = 'none';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create new game instance
    const game = new PermissionQuestGame();
    
    // Add responsive height detection for iframe vs full screen
    function adjustHeight() {
        const container = document.getElementById('gameContainer');
        if (window.parent !== window) {
            // Running in iframe
            container.style.height = '450px';
        } else {
            // Running in full browser
            container.style.height = '90vh';
        }
    }
    
    // Adjust height on load and resize
    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    
    // Prevent context menu on right click for better mobile experience
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    // Add touch feedback for mobile devices
    document.addEventListener('touchstart', (e) => {
        if (e.target.tagName === 'BUTTON') {
            e.target.style.transform = 'scale(0.95)';
        }
    });
    
    document.addEventListener('touchend', (e) => {
        if (e.target.tagName === 'BUTTON') {
            setTimeout(() => {
                e.target.style.transform = '';
            }, 100);
        }
    });
    
    // Initialize voices when available - Important for cross-browser compatibility
    if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
            // Voices are now loaded and available
        };
    }
});