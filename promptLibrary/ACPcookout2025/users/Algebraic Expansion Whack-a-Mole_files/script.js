// Game state management and core functionality
class AlgebraicExpansionGame {
    constructor() {
        // Game state variables
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.timeRemaining = 60;
        this.isGameActive = false;
        this.isPaused = false;
        this.currentQuestion = null;
        this.correctAnswer = '';
        this.activeMoles = [];
        this.gameTimer = null;
        this.moleTimer = null;
        
        // Game difficulty settings per level
        this.levelSettings = {
            1: { speed: 3000, questionType: 'simple' }, // a(x+b)
            2: { speed: 2500, questionType: 'linear' }, // a(bx+c)
            3: { speed: 2000, questionType: 'quadratic' } // (ax+b)(cx+d)
        };
        
        // DOM elements
        this.elements = {
            score: document.getElementById('score'),
            timer: document.getElementById('timer'),
            level: document.getElementById('level'),
            lives: document.getElementById('lives'),
            question: document.getElementById('question'),
            instruction: document.getElementById('instruction'),
            startBtn: document.getElementById('startBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            resetBtn: document.getElementById('resetBtn'),
            feedback: document.getElementById('feedback'),
            modal: document.getElementById('gameOverModal'),
            finalScore: document.getElementById('finalScore'),
            finalLevel: document.getElementById('finalLevel'),
            playAgainBtn: document.getElementById('playAgainBtn'),
            tooltip: document.getElementById('tooltip')
        };
        
        // Initialize the game
        this.init();
    }
    
    // Initialize game event listeners and setup
    init() {
        this.setupEventListeners();
        this.updateDisplay();
        this.setupTooltips();
    }
    
    // Setup all event listeners for game interaction
    setupEventListeners() {
        // Button event listeners
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.pauseBtn.addEventListener('click', () => this.togglePause());
        this.elements.resetBtn.addEventListener('click', () => this.resetGame());
        this.elements.playAgainBtn.addEventListener('click', () => this.playAgain());
        
        // Keyboard event listener for spacebar
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleSpacebarPress();
            }
        });
        
        // Touch/click events for mole holes (alternative input method)
        document.querySelectorAll('.mole-hole').forEach((hole, index) => {
            hole.addEventListener('click', () => this.handleMoleClick(index));
        });
    }
    
    // Setup tooltip functionality for better UX
    setupTooltips() {
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltip = this.elements.tooltip;
                tooltip.textContent = e.target.getAttribute('title');
                tooltip.style.opacity = '1';
                
                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            });
            
            element.addEventListener('mouseleave', () => {
                this.elements.tooltip.style.opacity = '0';
            });
        });
    }
    
    // Start the game
    startGame() {
        this.isGameActive = true;
        this.isPaused = false;
        this.elements.startBtn.disabled = true;
        this.elements.pauseBtn.disabled = false;
        this.elements.instruction.textContent = 'Press SPACEBAR when the correct answer appears!';
        
        this.startTimer();
        this.generateNewQuestion();
        this.startMoleSequence();
    }
    
    // Toggle pause/resume functionality
    togglePause() {
        if (this.isPaused) {
            this.isPaused = false;
            this.elements.pauseBtn.textContent = 'PAUSE';
            this.startTimer();
            this.startMoleSequence();
        } else {
            this.isPaused = true;
            this.elements.pauseBtn.textContent = 'RESUME';
            clearInterval(this.gameTimer);
            clearTimeout(this.moleTimer);
            this.hideAllMoles();
        }
    }
    
    // Reset game to initial state
    resetGame() {
        this.isGameActive = false;
        this.isPaused = false;
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.timeRemaining = 60;
        
        clearInterval(this.gameTimer);
        clearTimeout(this.moleTimer);
        
        this.elements.startBtn.disabled = false;
        this.elements.pauseBtn.disabled = true;
        this.elements.pauseBtn.textContent = 'PAUSE';
        this.elements.question.textContent = 'Press START to begin!';
        this.elements.instruction.textContent = 'Find the expanded form and press SPACEBAR when the correct answer appears';
        
        this.hideAllMoles();
        this.updateDisplay();
        this.elements.modal.style.display = 'none';
    }
    
    // Start game timer
    startTimer() {
        this.gameTimer = setInterval(() => {
            if (!this.isPaused && this.isGameActive) {
                this.timeRemaining--;
                this.updateDisplay();
                
                if (this.timeRemaining <= 0) {
                    this.endGame('Time\'s up!');
                }
            }
        }, 1000);
    }
    
    // Generate new algebraic expansion question based on current level
    generateNewQuestion() {
        const questionType = this.levelSettings[this.level].questionType;
        let question, answer;
        
        switch (questionType) {
            case 'simple': // Level 1: a(x+b)
                const a1 = this.getRandomInt(-5, 5, [0]);
                const b1 = this.getRandomInt(-8, 8, [0]);
                question = `${this.formatCoefficient(a1)}(x${this.formatSign(b1)})`;
                answer = `${this.formatCoefficient(a1)}x${this.formatSign(a1 * b1)}`;
                break;
                
            case 'linear': // Level 2: a(bx+c)
                const a2 = this.getRandomInt(-4, 4, [0]);
                const b2 = this.getRandomInt(-3, 3, [0]);
                const c2 = this.getRandomInt(-6, 6, [0]);
                question = `${this.formatCoefficient(a2)}(${this.formatCoefficient(b2)}x${this.formatSign(c2)})`;
                answer = `${this.formatCoefficient(a2 * b2)}x${this.formatSign(a2 * c2)}`;
                break;
                
            case 'quadratic': // Level 3: (ax+b)(cx+d)
                const a3 = this.getRandomInt(-3, 3, [0]);
                const b3 = this.getRandomInt(-4, 4, [0]);
                const c3 = this.getRandomInt(-3, 3, [0]);
                const d3 = this.getRandomInt(-4, 4, [0]);
                question = `(${this.formatCoefficient(a3)}x${this.formatSign(b3)})(${this.formatCoefficient(c3)}x${this.formatSign(d3)})`;
                
                const coeff_x2 = a3 * c3;
                const coeff_x = a3 * d3 + b3 * c3;
                const constant = b3 * d3;
                
                answer = `${this.formatCoefficient(coeff_x2)}x²${this.formatSign(coeff_x)}x${this.formatSign(constant)}`;
                break;
        }
        
        this.currentQuestion = question;
        this.correctAnswer = answer;
        this.elements.question.textContent = `Expand: ${question}`;
    }
    
    // Utility function to get random integer excluding certain values
    getRandomInt(min, max, exclude = []) {
        let num;
        do {
            num = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (exclude.includes(num));
        return num;
    }
    
    // Format coefficient for display (handle 1, -1 cases)
    formatCoefficient(coeff) {
        if (coeff === 1) return '';
        if (coeff === -1) return '-';
        return coeff.toString();
    }
    
    // Format sign for terms
    formatSign(num) {
        if (num === 0) return '';
        return num > 0 ? `+${num}` : num.toString();
    }
    
    // Start mole appearance sequence
    startMoleSequence() {
        if (!this.isGameActive || this.isPaused) return;
        
        this.hideAllMoles();
        this.generateMoleAnswers();
        this.showRandomMoles();
        
        const speed = this.levelSettings[this.level].speed;
        this.moleTimer = setTimeout(() => {
            this.startMoleSequence();
        }, speed);
    }
    
    // Generate answers for moles (1 correct, others incorrect)
    generateMoleAnswers() {
        const answers = [this.correctAnswer];
        
        // Generate 8 incorrect answers
        while (answers.length < 9) {
            const incorrectAnswer = this.generateIncorrectAnswer();
            if (!answers.includes(incorrectAnswer)) {
                answers.push(incorrectAnswer);
            }
        }
        
        // Shuffle answers
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        
        // Assign answers to moles
        answers.forEach((answer, index) => {
            document.getElementById(`answer-${index}`).textContent = answer;
        });
    }
    
    // Generate plausible incorrect answers
    generateIncorrectAnswer() {
        const questionType = this.levelSettings[this.level].questionType;
        
        switch (questionType) {
            case 'simple':
                const a = this.getRandomInt(-5, 5, [0]);
                const b = this.getRandomInt(-8, 8, [0]);
                return `${this.formatCoefficient(a)}x${this.formatSign(b)}`;
                
            case 'linear':
                const a2 = this.getRandomInt(-12, 12, [0]);
                const b2 = this.getRandomInt(-12, 12, [0]);
                return `${this.formatCoefficient(a2)}x${this.formatSign(b2)}`;
                
            case 'quadratic':
                const coeff_x2 = this.getRandomInt(-9, 9, [0]);
                const coeff_x = this.getRandomInt(-12, 12, [0]);
                const constant = this.getRandomInt(-16, 16, [0]);
                return `${this.formatCoefficient(coeff_x2)}x²${this.formatSign(coeff_x)}x${this.formatSign(constant)}`;
        }
    }
    
    // Show random moles with answers
    showRandomMoles() {
        const numMoles = Math.min(3 + this.level, 6); // Increase difficulty
        const moleIndices = [];
        
        while (moleIndices.length < numMoles) {
            const index = Math.floor(Math.random() * 9);
            if (!moleIndices.includes(index)) {
                moleIndices.push(index);
            }
        }
        
        this.activeMoles = moleIndices;
        moleIndices.forEach(index => {
            document.getElementById(`mole-${index}`).classList.add('active');
        });
    }
    
    // Hide all moles
    hideAllMoles() {
        for (let i = 0; i < 9; i++) {
            const mole = document.getElementById(`mole-${i}`);
            mole.classList.remove('active', 'correct', 'incorrect');
        }
        this.activeMoles = [];
    }
    
    // Handle spacebar press
    handleSpacebarPress() {
        if (!this.isGameActive || this.isPaused) return;
        
        this.checkAnswer();
    }
    
    // Handle mole click (alternative input)
    handleMoleClick(index) {
        if (!this.isGameActive || this.isPaused) return;
        
        const mole = document.getElementById(`mole-${index}`);
        if (mole.classList.contains('active')) {
            const answer = document.getElementById(`answer-${index}`).textContent;
            if (answer === this.correctAnswer) {
                this.handleCorrectAnswer(index);
            } else {
                this.handleIncorrectAnswer(index);
            }
        }
    }
    
    // Check if any active mole has the correct answer
    checkAnswer() {
        let correctMoleIndex = -1;
        
        this.activeMoles.forEach(index => {
            const answer = document.getElementById(`answer-${index}`).textContent;
            if (answer === this.correctAnswer) {
                correctMoleIndex = index;
            }
        });
        
        if (correctMoleIndex !== -1) {
            this.handleCorrectAnswer(correctMoleIndex);
        } else {
            this.handleIncorrectAnswer();
        }
    }
    
    // Handle correct answer
    handleCorrectAnswer(moleIndex = -1) {
        this.score += 10 * this.level;
        
        if (moleIndex !== -1) {
            document.getElementById(`mole-${moleIndex}`).classList.add('correct');
        }
        
        this.showFeedback('Correct! +' + (10 * this.level), 'correct');
        
        // Check for level progression
        if (this.score >= this.level * 50 && this.level < 3) {
            this.level++;
            this.showFeedback(`Level ${this.level}!`, 'correct');
            this.timeRemaining += 15; // Bonus time for level up
        }
        
        this.updateDisplay();
        this.generateNewQuestion();
        
        setTimeout(() => {
            this.hideAllMoles();
        }, 500);
    }
    
    // Handle incorrect answer
    handleIncorrectAnswer(moleIndex = -1) {
        this.lives--;
        
        if (moleIndex !== -1) {
            document.getElementById(`mole-${moleIndex}`).classList.add('incorrect');
        }
        
        this.showFeedback('Incorrect! -1 Life', 'incorrect');
        
        if (this.lives <= 0) {
            this.endGame('No lives remaining!');
            return;
        }
        
        this.updateDisplay();
        
        setTimeout(() => {
            this.hideAllMoles();
        }, 500);
    }
    
    // Show feedback message
    showFeedback(message, type) {
        const feedback = this.elements.feedback;
        feedback.textContent = message;
        feedback.className = `feedback-message show ${type}`;
        
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 1500);
    }
    
    // Update display elements
    updateDisplay() {
        this.elements.score.textContent = this.score;
        this.elements.timer.textContent = this.timeRemaining;
        this.elements.level.textContent = this.level;
        this.elements.lives.textContent = this.lives;
    }
    
    // End game
    endGame(reason) {
        this.isGameActive = false;
        clearInterval(this.gameTimer);
        clearTimeout(this.moleTimer);
        
        this.elements.finalScore.textContent = this.score;
        this.elements.finalLevel.textContent = this.level;
        document.getElementById('gameOverMessage').textContent = reason;
        
        this.elements.modal.style.display = 'block';
        this.hideAllMoles();
    }
    
    // Play again functionality
    playAgain() {
        this.elements.modal.style.display = 'none';
        this.resetGame();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AlgebraicExpansionGame();
});

// Prevent context menu on right click for better mobile experience
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle visibility change to pause game when tab is not active
document.addEventListener('visibilitychange', () => {
    const game = window.game;
    if (game && game.isGameActive && !game.isPaused && document.hidden) {
        game.togglePause();
    }
});