// Game state and configuration
class PrefixSuffixGame {
    constructor() {
        // Game questions with base words, correct affixes, and hints
        this.questions = [
            { word: 'play', correct: 're', hint: 'To do something again', meaning: 'replay' },
            { word: 'read', correct: 'able', hint: 'Capable of being done', meaning: 'readable' },
            { word: 'use', correct: 're', hint: 'To utilize again', meaning: 'reuse' },
            { word: 'wash', correct: 'able', hint: 'Can be cleaned', meaning: 'washable' },
            { word: 'write', correct: 're', hint: 'To compose text again', meaning: 'rewrite' },
            { word: 'move', correct: 'able', hint: 'Capable of being shifted', meaning: 'movable' },
            { word: 'build', correct: 're', hint: 'To construct again', meaning: 'rebuild' },
            { word: 'break', correct: 'able', hint: 'Can be damaged', meaning: 'breakable' },
            { word: 'tell', correct: 're', hint: 'To say something again', meaning: 'retell' },
            { word: 'count', correct: 'able', hint: 'Can be numbered', meaning: 'countable' },
            { word: 'heat', correct: 're', hint: 'To warm up again', meaning: 'reheat' },
            { word: 'love', correct: 'able', hint: 'Worthy of affection', meaning: 'lovable' }
        ];
        
        // Game state variables
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 30;
        this.gameActive = false;
        this.timer = null;
        
        // DOM elements
        this.initializeElements();
        this.setupEventListeners();
        this.startGame();
    }
    
    // Initialize DOM element references
    initializeElements() {
        this.elements = {
            progressFill: document.getElementById('progressFill'),
            questionCounter: document.getElementById('questionCounter'),
            score: document.getElementById('score'),
            timer: document.getElementById('timer'),
            baseWord: document.getElementById('baseWord'),
            baseWordSmall: document.getElementById('baseWordSmall'),
            affixPlaceholder: document.getElementById('affixPlaceholder'),
            hintText: document.getElementById('hintText'),
            reBtn: document.getElementById('reBtn'),
            ableBtn: document.getElementById('ableBtn'),
            feedbackSection: document.getElementById('feedbackSection'),
            feedbackMessage: document.getElementById('feedbackMessage'),
            correctWord: document.getElementById('correctWord'),
            nextBtn: document.getElementById('nextBtn'),
            restartBtn: document.getElementById('restartBtn'),
            celebrationOverlay: document.getElementById('celebrationOverlay'),
            celebrationMessage: document.getElementById('celebrationMessage'),
            finalScore: document.getElementById('finalScore'),
            tooltip: document.getElementById('tooltip')
        };
    }
    
    // Setup all event listeners
    setupEventListeners() {
        // Answer button clicks
        this.elements.reBtn.addEventListener('click', () => this.selectAnswer('re'));
        this.elements.ableBtn.addEventListener('click', () => this.selectAnswer('able'));
        
        // Control button clicks
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());
        
        // Tooltip functionality
        this.setupTooltips();
        
        // Touch support for mobile devices
        this.setupTouchSupport();
    }
    
    // Setup tooltip functionality for better UX in iframe
    setupTooltips() {
        const elementsWithTooltips = document.querySelectorAll('[title]');
        
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', (e) => this.showTooltip(e));
            element.addEventListener('mouseleave', () => this.hideTooltip());
            element.addEventListener('mousemove', (e) => this.updateTooltipPosition(e));
        });
    }
    
    // Setup touch support for mobile devices
    setupTouchSupport() {
        const buttons = document.querySelectorAll('.option-btn, .control-btn');
        
        buttons.forEach(button => {
            button.addEventListener('touchstart', () => {
                button.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', () => {
                setTimeout(() => {
                    button.style.transform = '';
                }, 100);
            });
        });
    }
    
    // Show tooltip
    showTooltip(e) {
        const tooltip = this.elements.tooltip;
        tooltip.textContent = e.target.getAttribute('title');
        tooltip.style.opacity = '1';
        this.updateTooltipPosition(e);
    }
    
    // Hide tooltip
    hideTooltip() {
        this.elements.tooltip.style.opacity = '0';
    }
    
    // Update tooltip position
    updateTooltipPosition(e) {
        const tooltip = this.elements.tooltip;
        const rect = e.target.getBoundingClientRect();
        
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    }
    
    // Start the game
    startGame() {
        this.gameActive = true;
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 30;
        
        this.updateDisplay();
        this.loadQuestion();
        this.startTimer();
    }
    
    // Load current question
    loadQuestion() {
        const question = this.questions[this.currentQuestion];
        
        // Update question display
        this.elements.baseWord.textContent = question.word;
        this.elements.baseWordSmall.textContent = question.word;
        this.elements.hintText.textContent = question.hint;
        this.elements.affixPlaceholder.textContent = '?';
        
        // Reset button states
        this.elements.reBtn.className = 'option-btn prefix-btn';
        this.elements.ableBtn.className = 'option-btn suffix-btn';
        this.elements.reBtn.disabled = false;
        this.elements.ableBtn.disabled = false;
        
        // Hide feedback and next button
        this.elements.feedbackMessage.className = 'feedback-message';
        this.elements.correctWord.className = 'correct-word';
        this.elements.nextBtn.style.display = 'none';
        
        // Update progress
        this.updateProgress();
    }
    
    // Handle answer selection
    selectAnswer(selectedAffix) {
        if (!this.gameActive) return;
        
        const question = this.questions[this.currentQuestion];
        const isCorrect = selectedAffix === question.correct;
        
        // Disable buttons to prevent multiple clicks
        this.elements.reBtn.disabled = true;
        this.elements.ableBtn.disabled = true;
        
        // Update button states and show feedback
        if (isCorrect) {
            this.handleCorrectAnswer(selectedAffix, question);
        } else {
            this.handleIncorrectAnswer(selectedAffix, question);
        }
        
        // Show next button or end game
        setTimeout(() => {
            if (this.currentQuestion < this.questions.length - 1) {
                this.elements.nextBtn.style.display = 'block';
            } else {
                this.endGame();
            }
        }, 1500);
    }
    
    // Handle correct answer
    handleCorrectAnswer(selectedAffix, question) {
        this.score += 10;
        this.timeLeft += 5; // Bonus time for correct answer
        
        // Update affix placeholder
        this.elements.affixPlaceholder.textContent = selectedAffix;
        
        // Show correct feedback
        this.elements.feedbackMessage.textContent = '🎉 Correct!';
        this.elements.feedbackMessage.className = 'feedback-message correct';
        
        this.elements.correctWord.textContent = `"${question.meaning}" - ${question.hint}`;
        this.elements.correctWord.className = 'correct-word show';
        
        // Highlight correct button
        const correctBtn = selectedAffix === 're' ? this.elements.reBtn : this.elements.ableBtn;
        correctBtn.className += ' correct';
        
        this.updateDisplay();
    }
    
    // Handle incorrect answer
    handleIncorrectAnswer(selectedAffix, question) {
        // Show incorrect feedback
        this.elements.feedbackMessage.textContent = '❌ Try again!';
        this.elements.feedbackMessage.className = 'feedback-message incorrect';
        
        this.elements.correctWord.textContent = `Correct: "${question.correct}${question.word}" - ${question.meaning}`;
        this.elements.correctWord.className = 'correct-word show';
        
        // Highlight buttons
        const selectedBtn = selectedAffix === 're' ? this.elements.reBtn : this.elements.ableBtn;
        const correctBtn = question.correct === 're' ? this.elements.reBtn : this.elements.ableBtn;
        
        selectedBtn.className += ' incorrect';
        correctBtn.className += ' correct';
        
        // Update affix placeholder with correct answer
        this.elements.affixPlaceholder.textContent = question.correct;
    }
    
    // Move to next question
    nextQuestion() {
        this.currentQuestion++;
        this.loadQuestion();
    }
    
    // Update progress bar and counters
    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        this.elements.progressFill.style.width = progress + '%';
        this.elements.questionCounter.textContent = `${this.currentQuestion + 1}/${this.questions.length}`;
    }
    
    // Update score and timer display
    updateDisplay() {
        this.elements.score.textContent = `Score: ${this.score}`;
        this.elements.timer.textContent = `${this.timeLeft}s`;
    }
    
    // Start countdown timer
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            // Change timer color when time is low
            if (this.timeLeft <= 10) {
                this.elements.timer.style.background = 'rgba(231, 76, 60, 0.8)';
                this.elements.timer.style.animation = 'pulse 1s infinite';
            }
            
            // End game when time runs out
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    // End the game and show results
    endGame() {
        this.gameActive = false;
        clearInterval(this.timer);
        
        // Calculate performance
        const percentage = Math.round((this.score / (this.questions.length * 10)) * 100);
        let message = '';
        let emoji = '';
        
        if (percentage >= 80) {
            message = 'Excellent work!';
            emoji = '🏆';
        } else if (percentage >= 60) {
            message = 'Good job!';
            emoji = '🌟';
        } else {
            message = 'Keep practicing!';
            emoji = '💪';
        }
        
        // Show celebration overlay
        this.elements.celebrationMessage.textContent = message;
        this.elements.finalScore.textContent = `Final Score: ${this.score}/${this.questions.length * 10} (${percentage}%)`;
        this.elements.celebrationOverlay.querySelector('.celebration-emoji').textContent = emoji;
        this.elements.celebrationOverlay.classList.add('show');
        
        // Show restart button
        this.elements.restartBtn.style.display = 'block';
        this.elements.nextBtn.style.display = 'none';
    }
    
    // Restart the game
    restartGame() {
        // Hide celebration overlay
        this.elements.celebrationOverlay.classList.remove('show');
        
        // Reset timer styling
        this.elements.timer.style.background = 'rgba(255, 255, 255, 0.2)';
        this.elements.timer.style.animation = '';
        
        // Hide restart button
        this.elements.restartBtn.style.display = 'none';
        
        // Shuffle questions for variety
        this.shuffleQuestions();
        
        // Start new game
        this.startGame();
    }
    
    // Shuffle questions array for replay variety
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PrefixSuffixGame();
});

// Add CSS animation for timer pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);