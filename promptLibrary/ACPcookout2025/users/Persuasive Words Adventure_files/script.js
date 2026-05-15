// Game state management and configuration
class PersuasiveWordsGame {
    constructor() {
        // Game state variables
        this.currentLevel = 1;
        this.maxLevels = 5;
        this.score = 0;
        this.persuasionPower = 0;
        this.selectedWords = [];
        
        // Game scenarios and word choices for vocabulary development
        this.scenarios = [
            {
                id: 1,
                context: "You're presenting the recycling program to the school board. Choose words that show strong impact.",
                sentence: "This program will {word} benefit our school community.",
                options: [
                    { word: "significantly", score: 3, feedback: "Excellent! 'Significantly' shows measurable, substantial impact.", explanation: "This word conveys quantifiable importance and suggests the benefits will be clearly noticeable." },
                    { word: "probably", score: 1, feedback: "Weak choice. 'Probably' shows uncertainty.", explanation: "'Probably' introduces doubt and makes your argument less convincing. Avoid uncertain language in persuasive writing." },
                    { word: "maybe", score: 0, feedback: "Poor choice. 'Maybe' undermines your argument.", explanation: "'Maybe' is the weakest possible word here - it suggests you're not even sure there will be benefits." },
                    { word: "definitely", score: 2, feedback: "Good, but could be stronger. 'Definitely' shows certainty.", explanation: "While 'definitely' shows confidence, 'significantly' would be better as it implies measurable impact." }
                ]
            },
            {
                id: 2,
                context: "Now you're explaining the environmental impact. Choose words that create urgency.",
                sentence: "We must {word} address our school's waste problem.",
                options: [
                    { word: "immediately", score: 3, feedback: "Perfect! 'Immediately' creates urgency and shows the problem is critical.", explanation: "This word emphasizes that delay is not acceptable and the issue requires prompt action." },
                    { word: "eventually", score: 0, feedback: "Terrible choice. 'Eventually' removes all urgency.", explanation: "'Eventually' suggests the problem isn't serious and can wait indefinitely - the opposite of persuasive." },
                    { word: "soon", score: 1, feedback: "Vague timing. 'Soon' lacks specific urgency.", explanation: "'Soon' is too indefinite. It doesn't convey the critical nature of environmental issues." },
                    { word: "carefully", score: 2, feedback: "Good approach, but lacks urgency. 'Carefully' shows thoughtfulness.", explanation: "While being careful is important, environmental issues often require both careful planning AND immediate action." }
                ]
            },
            {
                id: 3,
                context: "You're discussing student participation. Choose words that show collective benefit.",
                sentence: "This initiative will {word} engage every student in our school.",
                options: [
                    { word: "actively", score: 3, feedback: "Excellent! 'Actively' implies hands-on participation and engagement.", explanation: "This word suggests students won't be passive observers but will be meaningfully involved in the process." },
                    { word: "possibly", score: 0, feedback: "Weak! 'Possibly' shows you're unsure about student engagement.", explanation: "Using 'possibly' makes it sound like you haven't planned for student involvement properly." },
                    { word: "quietly", score: 1, feedback: "Contradictory. 'Quietly' suggests minimal engagement.", explanation: "Quiet engagement isn't what you want to emphasize when trying to show broad student participation." },
                    { word: "meaningfully", score: 2, feedback: "Good choice! 'Meaningfully' shows the engagement will be valuable.", explanation: "This emphasizes quality of engagement, though 'actively' might be stronger for showing participation levels." }
                ]
            },
            {
                id: 4,
                context: "You're presenting the long-term benefits. Choose words that show lasting impact.",
                sentence: "The positive effects will {word} transform our school culture.",
                options: [
                    { word: "permanently", score: 3, feedback: "Powerful! 'Permanently' shows lasting, irreversible positive change.", explanation: "This word emphasizes that the benefits aren't temporary but will create lasting institutional change." },
                    { word: "temporarily", score: 0, feedback: "Counterproductive! 'Temporarily' suggests the benefits won't last.", explanation: "Why would anyone support a program that only has temporary benefits? This undermines your entire argument." },
                    { word: "gradually", score: 2, feedback: "Decent choice. 'Gradually' shows steady, progressive change.", explanation: "While realistic, 'gradually' doesn't convey the transformative power as strongly as 'permanently'." },
                    { word: "slightly", score: 1, feedback: "Underwhelming. 'Slightly' minimizes the impact.", explanation: "'Slightly' suggests the transformation will be barely noticeable - not very persuasive for a major initiative." }
                ]
            },
            {
                id: 5,
                context: "Your final appeal to the school board. Choose words that compel action.",
                sentence: "I {word} urge you to approve this essential program today.",
                options: [
                    { word: "respectfully", score: 2, feedback: "Professional, but could be stronger. Shows proper tone.", explanation: "'Respectfully' maintains appropriate formality but doesn't add emotional weight to your appeal." },
                    { word: "desperately", score: 1, feedback: "Too emotional. 'Desperately' might seem unprofessional.", explanation: "While it shows passion, 'desperately' can make you appear less credible in a formal setting." },
                    { word: "strongly", score: 3, feedback: "Perfect! 'Strongly' shows conviction while maintaining professionalism.", explanation: "This word conveys deep conviction and confidence in your proposal while remaining appropriate for the formal setting." },
                    { word: "casually", score: 0, feedback: "Inappropriate tone! 'Casually' undermines the importance.", explanation: "A casual tone suggests you don't think the program is very important - completely wrong for a persuasive appeal." }
                ]
            }
        ];
        
        // Initialize DOM elements
        this.initializeElements();
        this.setupEventListeners();
        this.startGame();
    }
    
    // Initialize DOM element references
    initializeElements() {
        this.elements = {
            scoreValue: document.getElementById('scoreValue'),
            levelValue: document.getElementById('levelValue'),
            progressFill: document.getElementById('progressFill'),
            scenarioText: document.getElementById('scenarioText'),
            selectionPrompt: document.getElementById('selectionPrompt'),
            sentenceBuilder: document.getElementById('sentenceBuilder'),
            wordSlot: document.getElementById('wordSlot'),
            wordOptions: document.getElementById('wordOptions'),
            feedbackPanel: document.getElementById('feedbackPanel'),
            feedbackIcon: document.getElementById('feedbackIcon'),
            feedbackText: document.getElementById('feedbackText'),
            feedbackExplanation: document.getElementById('feedbackExplanation'),
            continueBtn: document.getElementById('continueBtn'),
            celebrationOverlay: document.getElementById('celebrationOverlay'),
            celebrationMessage: document.getElementById('celebrationMessage'),
            tooltip: document.getElementById('tooltip'),
            tooltipContent: document.getElementById('tooltipContent')
        };
    }
    
    // Set up event listeners for user interactions
    setupEventListeners() {
        // Continue button click handler
        this.elements.continueBtn.addEventListener('click', () => {
            this.nextLevel();
        });
        
        // Tooltip functionality for help text
        document.addEventListener('mouseover', (e) => {
            if (e.target.hasAttribute('title')) {
                this.showTooltip(e.target, e.target.getAttribute('title'));
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.hasAttribute('title')) {
                this.hideTooltip();
            }
        });
        
        // Mobile touch support for tooltips
        document.addEventListener('touchstart', (e) => {
            if (e.target.hasAttribute('title')) {
                this.showTooltip(e.target, e.target.getAttribute('title'));
                setTimeout(() => this.hideTooltip(), 2000);
            }
        });
    }
    
    // Start the game with first scenario
    startGame() {
        this.updateUI();
        this.loadScenario(this.currentLevel);
    }
    
    // Load and display current scenario
    loadScenario(level) {
        const scenario = this.scenarios[level - 1];
        if (!scenario) {
            this.endGame();
            return;
        }
        
        // Update scenario text with context
        this.elements.scenarioText.textContent = scenario.context;
        
        // Update sentence builder with placeholder
        this.elements.sentenceBuilder.innerHTML = scenario.sentence.replace('{word}', 
            '<span class="word-slot" id="wordSlot">[choose word]</span>');
        this.elements.wordSlot = document.getElementById('wordSlot');
        
        // Create word option buttons
        this.createWordOptions(scenario.options);
        
        // Hide feedback panel
        this.elements.feedbackPanel.style.display = 'none';
    }
    
    // Create interactive word option buttons
    createWordOptions(options) {
        this.elements.wordOptions.innerHTML = '';
        
        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'word-option';
            button.textContent = option.word;
            button.setAttribute('data-index', index);
            
            // Add click handler for word selection
            button.addEventListener('click', () => {
                this.selectWord(option, button);
            });
            
            this.elements.wordOptions.appendChild(button);
        });
    }
    
    // Handle word selection and provide immediate feedback
    selectWord(selectedOption, buttonElement) {
        // Visual feedback for selection
        document.querySelectorAll('.word-option').forEach(btn => {
            btn.classList.remove('selected');
            btn.disabled = true;
        });
        buttonElement.classList.add('selected');
        
        // Update sentence with selected word
        this.elements.wordSlot.textContent = selectedOption.word;
        this.elements.wordSlot.style.background = this.getScoreColor(selectedOption.score);
        
        // Store selection for tracking
        this.selectedWords.push({
            level: this.currentLevel,
            word: selectedOption.word,
            score: selectedOption.score
        });
        
        // Update score and progress
        this.score += selectedOption.score;
        this.persuasionPower = Math.min(100, this.persuasionPower + (selectedOption.score * 10));
        
        // Show detailed feedback after brief delay
        setTimeout(() => {
            this.showFeedback(selectedOption);
        }, 800);
        
        this.updateUI();
    }
    
    // Display comprehensive feedback for educational value - MODIFIED to use more cheerful icons
    showFeedback(option) {
        // Determine feedback type and icon - Changed to more positive and cheerful symbols
        let feedbackType, icon;
        if (option.score === 3) {
            feedbackType = 'excellent';
            icon = '🌟'; // Changed from 🎯 to bright star
        } else if (option.score === 2) {
            feedbackType = 'good';
            icon = '😊'; // Changed from 👍 to happy face
        } else if (option.score === 1) {
            feedbackType = 'okay';
            icon = '🌱'; // Changed from 🤔 to growing plant (positive growth)
        } else {
            feedbackType = 'poor';
            icon = '💡'; // Changed from ❌ to light bulb (learning opportunity)
        }
        
        // Update feedback content
        this.elements.feedbackIcon.textContent = icon;
        this.elements.feedbackText.textContent = option.feedback;
        this.elements.feedbackExplanation.textContent = option.explanation;
        
        // Show feedback panel with animation
        this.elements.feedbackPanel.style.display = 'block';
        this.elements.feedbackPanel.style.animation = 'fadeInUp 0.5s ease-out';
        
        // Show celebration for excellent choices
        if (option.score === 3) {
            this.showCelebration("Excellent word choice! 🌟");
        }
    }
    
    // Progress to next level or end game
    nextLevel() {
        if (this.currentLevel < this.maxLevels) {
            this.currentLevel++;
            this.loadScenario(this.currentLevel);
        } else {
            this.endGame();
        }
    }
    
    // End game with final results and reflection
    endGame() {
        const finalScore = this.score;
        const maxPossibleScore = this.maxLevels * 3;
        const percentage = Math.round((finalScore / maxPossibleScore) * 100);
        
        let finalMessage;
        if (percentage >= 80) {
            finalMessage = `Outstanding! You scored ${finalScore}/${maxPossibleScore} (${percentage}%). You've mastered persuasive vocabulary! 🏆`;
        } else if (percentage >= 60) {
            finalMessage = `Well done! You scored ${finalScore}/${maxPossibleScore} (${percentage}%). You're developing strong persuasive skills! 👏`;
        } else {
            finalMessage = `Good effort! You scored ${finalScore}/${maxPossibleScore} (${percentage}%). Keep practicing to improve your persuasive vocabulary! 💪`;
        }
        
        this.showCelebration(finalMessage, true);
        
        // Provide option to restart
        setTimeout(() => {
            if (confirm("Would you like to play again and try different word choices?")) {
                this.resetGame();
            }
        }, 3000);
    }
    
    // Reset game state for replay
    resetGame() {
        this.currentLevel = 1;
        this.score = 0;
        this.persuasionPower = 0;
        this.selectedWords = [];
        this.elements.celebrationOverlay.style.display = 'none';
        this.startGame();
    }
    
    // Show celebration overlay with message
    showCelebration(message, isGameEnd = false) {
        this.elements.celebrationMessage.textContent = message;
        this.elements.celebrationOverlay.style.display = 'flex';
        
        // Auto-hide celebration unless it's game end
        if (!isGameEnd) {
            setTimeout(() => {
                this.elements.celebrationOverlay.style.display = 'none';
            }, 2000);
        }
    }
    
    // Update all UI elements with current game state
    updateUI() {
        this.elements.scoreValue.textContent = this.score;
        this.elements.levelValue.textContent = `${this.currentLevel}/${this.maxLevels}`;
        this.elements.progressFill.style.width = `${this.persuasionPower}%`;
    }
    
    // Get color based on score for visual feedback
    getScoreColor(score) {
        switch(score) {
            case 3: return 'linear-gradient(135deg, #00b894, #00cec9)'; // Excellent - green
            case 2: return 'linear-gradient(135deg, #fdcb6e, #e17055)'; // Good - orange
            case 1: return 'linear-gradient(135deg, #ffeaa7, #fab1a0)'; // Okay - yellow
            default: return 'linear-gradient(135deg, #fd79a8, #e84393)'; // Poor - red
        }
    }
    
    // Tooltip functionality for help and guidance
    showTooltip(element, text) {
        const tooltip = this.elements.tooltip;
        const tooltipContent = this.elements.tooltipContent;
        
        tooltipContent.textContent = text;
        tooltip.style.display = 'block';
        
        // Position tooltip relative to element
        const rect = element.getBoundingClientRect();
        const containerRect = document.getElementById('gameContainer').getBoundingClientRect();
        
        tooltip.style.left = `${rect.left - containerRect.left + (rect.width / 2)}px`;
        tooltip.style.top = `${rect.bottom - containerRect.top + 5}px`;
        tooltip.style.transform = 'translateX(-50%)';
    }
    
    hideTooltip() {
        this.elements.tooltip.style.display = 'none';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create new game instance
    const game = new PersuasiveWordsGame();
    
    // Add keyboard support for accessibility
    document.addEventListener('keydown', (e) => {
        // Allow Enter key to select focused word option
        if (e.key === 'Enter' && e.target.classList.contains('word-option')) {
            e.target.click();
        }
        
        // Allow Escape key to close celebration overlay
        if (e.key === 'Escape') {
            const overlay = document.getElementById('celebrationOverlay');
            if (overlay.style.display === 'flex') {
                overlay.style.display = 'none';
            }
        }
    });
    
    // Add focus management for better accessibility
    document.querySelectorAll('.word-option').forEach(button => {
        button.addEventListener('focus', () => {
            button.style.outline = '2px solid #74b9ff';
        });
        
        button.addEventListener('blur', () => {
            button.style.outline = 'none';
        });
    });
});