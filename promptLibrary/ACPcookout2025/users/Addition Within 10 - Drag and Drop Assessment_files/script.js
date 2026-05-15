// Assessment data and state management
class AdditionAssessment {
    constructor() {
        // Initialize assessment state
        this.currentQuestion = 0;
        this.score = 0;
        this.totalQuestions = 5;
        this.isAnswered = false;
        this.attempts = 0;
        this.maxAttempts = 3;
        this.hintShown = false; // Track if hint has been shown for current question
        
        // Generate questions for addition within 10
        this.questions = this.generateQuestions();
        
        // Initialize DOM elements
        this.initializeElements();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start the assessment
        this.displayCurrentQuestion();
        this.updateProgress();
    }
    
    // Generate 5 random addition questions within 10
    generateQuestions() {
        const questions = [];
        const usedCombinations = new Set();
        
        while (questions.length < this.totalQuestions) {
            // Generate random numbers that sum to 10 or less
            const result = Math.floor(Math.random() * 8) + 3; // Results from 3-10
            const firstNumber = Math.floor(Math.random() * (result - 1)) + 1; // Ensure positive
            const secondNumber = result - firstNumber;
            
            // Create unique identifier for this combination
            const combination = `${firstNumber}+${secondNumber}=${result}`;
            
            // Avoid duplicate questions
            if (!usedCombinations.has(combination) && secondNumber > 0 && secondNumber <= 7) {
                usedCombinations.add(combination);
                questions.push({
                    firstNumber,
                    secondNumber,
                    result,
                    answered: false
                });
            }
        }
        
        return questions;
    }
    
    // Initialize DOM element references
    initializeElements() {
        this.elements = {
            firstNumber: document.getElementById('firstNumber'),
            result: document.getElementById('result'),
            dropZone: document.getElementById('dropZone'),
            feedbackText: document.getElementById('feedbackText'),
            progressBar: document.getElementById('progressBar'),
            progressText: document.getElementById('progressText'),
            scoreDisplay: document.getElementById('scoreDisplay'),
            checkBtn: document.getElementById('checkBtn'),
            nextBtn: document.getElementById('nextBtn'),
            tryAgainBtn: document.getElementById('tryAgainBtn'),
            hintBtn: document.getElementById('hintBtn'), // New hint button element
            hintArea: document.getElementById('hintArea'), // New hint area element
            hintText: document.getElementById('hintText'), // New hint text element
            completionModal: document.getElementById('completionModal'),
            finalScore: document.getElementById('finalScore'),
            restartBtn: document.getElementById('restartBtn'),
            draggableNumbers: document.querySelectorAll('.draggable-number')
        };
    }
    
    // Set up all event listeners
    setupEventListeners() {
        // Drag and drop for desktop
        this.setupDragAndDrop();
        
        // Touch events for mobile
        this.setupTouchEvents();
        
        // Button event listeners
        this.elements.checkBtn.addEventListener('click', () => this.checkAnswer());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.tryAgainBtn.addEventListener('click', () => this.tryAgain());
        this.elements.hintBtn.addEventListener('click', () => this.showHint()); // New hint button listener
        this.elements.restartBtn.addEventListener('click', () => this.restartAssessment());
    }
    
    // Set up drag and drop functionality for desktop
    setupDragAndDrop() {
        // Add drag event listeners to draggable numbers
        this.elements.draggableNumbers.forEach(number => {
            number.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.value);
                e.target.classList.add('dragging');
            });
            
            number.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });
        
        // Add drop zone event listeners
        this.elements.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.elements.dropZone.classList.add('drag-over');
        });
        
        this.elements.dropZone.addEventListener('dragleave', () => {
            this.elements.dropZone.classList.remove('drag-over');
        });
        
        this.elements.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const value = e.dataTransfer.getData('text/plain');
            this.handleNumberDrop(value);
            this.elements.dropZone.classList.remove('drag-over');
        });
    }
    
    // Set up touch events for mobile devices
    setupTouchEvents() {
        this.elements.draggableNumbers.forEach(number => {
            number.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleTouchStart(e, number);
            });
        });
        
        this.elements.dropZone.addEventListener('touchstart', (e) => {
            e.preventDefault();
        });
    }
    
    // Handle touch interactions for mobile
    handleTouchStart(e, element) {
        const value = element.dataset.value;
        
        // Simple touch interaction - directly place number in drop zone
        if (!element.classList.contains('used')) {
            this.handleNumberDrop(value);
        }
    }
    
    // Handle when a number is dropped/placed in the drop zone
    handleNumberDrop(value) {
        if (this.isAnswered) return;
        
        // Update drop zone with the selected number
        this.elements.dropZone.innerHTML = `<span style="font-size: 36px; font-weight: bold; color: #2c3e50;">${value}</span>`;
        this.elements.dropZone.dataset.value = value;
        
        // Mark the draggable number as used
        this.elements.draggableNumbers.forEach(num => {
            if (num.dataset.value === value) {
                num.classList.add('used');
            } else {
                num.classList.remove('used');
            }
        });
        
        // Enable check button and show hint button if attempts > 0
        this.elements.checkBtn.disabled = false;
        if (this.attempts > 0 && !this.hintShown) {
            this.elements.hintBtn.style.display = 'inline-block';
        }
        
        // Update feedback
        this.elements.feedbackText.textContent = "Click 'Check Answer' to see if you're correct!";
        this.elements.feedbackText.className = '';
    }
    
    // Enhanced hint system - Show contextual hints for incorrect answers
    showHint() {
        const correctAnswer = this.questions[this.currentQuestion].secondNumber;
        const currentSum = this.questions[this.currentQuestion].result;
        const firstNumber = this.questions[this.currentQuestion].firstNumber;
        
        // Generate progressive hints based on attempt number
        let hintMessage = '';
        
        switch (this.attempts) {
            case 1:
                hintMessage = `Think: What number do you add to ${firstNumber} to get ${currentSum}?`;
                break;
            case 2:
                hintMessage = `Try counting up from ${firstNumber}: ${firstNumber}... ${firstNumber + 1}... ${firstNumber + 2}... until you reach ${currentSum}`;
                break;
            case 3:
                hintMessage = `Use your fingers! Start with ${firstNumber} fingers up, then count how many more you need to reach ${currentSum}`;
                break;
            default:
                hintMessage = `The missing number is ${correctAnswer}. Can you see why ${firstNumber} + ${correctAnswer} = ${currentSum}?`;
        }
        
        // Display the hint
        this.elements.hintText.textContent = hintMessage;
        this.elements.hintArea.style.display = 'flex';
        this.hintShown = true;
        
        // Hide hint button after showing hint
        this.elements.hintBtn.style.display = 'none';
        
        // Highlight the correct number if this is the final hint
        if (this.attempts >= 2) {
            this.highlightCorrectNumber(correctAnswer);
        }
        
        // Auto-hide hint after 8 seconds
        setTimeout(() => {
            this.elements.hintArea.style.display = 'none';
            this.removeNumberHighlights();
        }, 8000);
    }
    
    // Highlight the correct draggable number
    highlightCorrectNumber(correctAnswer) {
        this.elements.draggableNumbers.forEach(num => {
            if (num.dataset.value == correctAnswer && !num.classList.contains('used')) {
                num.classList.add('hint-highlight');
            }
        });
    }
    
    // Remove all number highlights
    removeNumberHighlights() {
        this.elements.draggableNumbers.forEach(num => {
            num.classList.remove('hint-highlight');
        });
    }
    
    // Check if the current answer is correct
    checkAnswer() {
        if (this.isAnswered) return;
        
        const userAnswer = parseInt(this.elements.dropZone.dataset.value);
        const correctAnswer = this.questions[this.currentQuestion].secondNumber;
        
        this.attempts++;
        
        if (userAnswer === correctAnswer) {
            // Correct answer
            this.handleCorrectAnswer();
        } else {
            // Incorrect answer
            this.handleIncorrectAnswer(correctAnswer);
        }
    }
    
    // Handle correct answer feedback and progression
    handleCorrectAnswer() {
        this.isAnswered = true;
        this.score++;
        
        // Visual feedback
        this.elements.dropZone.classList.add('correct');
        this.elements.feedbackText.textContent = "Excellent! That's correct! 🎉";
        this.elements.feedbackText.className = 'feedback-correct';
        
        // Hide hint area and remove highlights
        this.elements.hintArea.style.display = 'none';
        this.removeNumberHighlights();
        
        // Update score display
        this.elements.scoreDisplay.textContent = this.score;
        
        // Show next button or complete assessment
        this.elements.checkBtn.style.display = 'none';
        this.elements.hintBtn.style.display = 'none';
        
        if (this.currentQuestion < this.totalQuestions - 1) {
            this.elements.nextBtn.style.display = 'inline-block';
        } else {
            setTimeout(() => this.completeAssessment(), 1500);
        }
        
        // Mark question as answered
        this.questions[this.currentQuestion].answered = true;
    }
    
    // Enhanced incorrect answer handling with hint system
    handleIncorrectAnswer(correctAnswer) {
        // Visual feedback
        this.elements.dropZone.classList.add('incorrect');
        
        if (this.attempts < this.maxAttempts) {
            // Show encouragement and hint option
            this.elements.feedbackText.textContent = `Not quite right. Try again!`;
            this.elements.feedbackText.className = 'feedback-incorrect';
            
            // Show try again button and hint button
            this.elements.checkBtn.style.display = 'none';
            this.elements.tryAgainBtn.style.display = 'inline-block';
            
            // Show hint button if not already shown
            if (!this.hintShown) {
                this.elements.hintBtn.style.display = 'inline-block';
            }
        } else {
            // Max attempts reached, show correct answer
            this.elements.feedbackText.textContent = `The correct answer is ${correctAnswer}. Let's try the next question!`;
            this.elements.feedbackText.className = 'feedback-incorrect';
            
            this.elements.checkBtn.style.display = 'none';
            this.elements.hintBtn.style.display = 'none';
            this.elements.hintArea.style.display = 'none';
            this.removeNumberHighlights();
            
            if (this.currentQuestion < this.totalQuestions - 1) {
                this.elements.nextBtn.style.display = 'inline-block';
            } else {
                setTimeout(() => this.completeAssessment(), 2000);
            }
            
            this.isAnswered = true;
        }
        
        // Remove incorrect styling after animation
        setTimeout(() => {
            this.elements.dropZone.classList.remove('incorrect');
        }, 600);
    }
    
    // Allow student to try again
    tryAgain() {
        // Reset visual states
        this.elements.dropZone.classList.remove('incorrect', 'correct');
        this.elements.dropZone.innerHTML = '<span class="placeholder">?</span>';
        this.elements.dropZone.removeAttribute('data-value');
        
        // Reset draggable numbers
        this.elements.draggableNumbers.forEach(num => {
            num.classList.remove('used');
        });
        
        // Reset buttons and feedback
        this.elements.tryAgainBtn.style.display = 'none';
        this.elements.checkBtn.style.display = 'inline-block';
        this.elements.checkBtn.disabled = true;
        
        // Show hint button if hint hasn't been shown yet
        if (!this.hintShown && this.attempts > 0) {
            this.elements.hintBtn.style.display = 'inline-block';
        }
        
        this.elements.feedbackText.textContent = "Try again! Drag a number to complete the equation.";
        this.elements.feedbackText.className = '';
        
        // Hide hint area but keep hint availability
        this.elements.hintArea.style.display = 'none';
        this.removeNumberHighlights();
    }
    
    // Move to the next question
    nextQuestion() {
        this.currentQuestion++;
        this.attempts = 0;
        this.isAnswered = false;
        this.hintShown = false; // Reset hint status for new question
        
        // Reset UI elements
        this.resetQuestionUI();
        
        // Display new question
        this.displayCurrentQuestion();
        this.updateProgress();
    }
    
    // Reset UI elements for new question
    resetQuestionUI() {
        this.elements.dropZone.classList.remove('correct', 'incorrect');
        this.elements.dropZone.innerHTML = '<span class="placeholder">?</span>';
        this.elements.dropZone.removeAttribute('data-value');
        
        this.elements.draggableNumbers.forEach(num => {
            num.classList.remove('used');
        });
        
        this.elements.nextBtn.style.display = 'none';
        this.elements.tryAgainBtn.style.display = 'none';
        this.elements.hintBtn.style.display = 'none'; // Hide hint button for new question
        this.elements.checkBtn.style.display = 'inline-block';
        this.elements.checkBtn.disabled = true;
        
        // Hide hint area and remove highlights
        this.elements.hintArea.style.display = 'none';
        this.removeNumberHighlights();
        
        this.elements.feedbackText.textContent = "Drag a number to complete the equation";
        this.elements.feedbackText.className = '';
    }
    
    // Display the current question
    displayCurrentQuestion() {
        const question = this.questions[this.currentQuestion];
        this.elements.firstNumber.textContent = question.firstNumber;
        this.elements.result.textContent = question.result;
    }
    
    // Update progress bar and text
    updateProgress() {
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        this.elements.progressBar.style.setProperty('--progress', `${progress}%`);
        this.elements.progressText.textContent = `${this.currentQuestion}/${this.totalQuestions}`;
    }
    
    // Complete the assessment and show results
    completeAssessment() {
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        let message = '';
        
        if (percentage >= 80) {
            message = `Outstanding work! You got ${this.score} out of ${this.totalQuestions} correct!`;
        } else if (percentage >= 60) {
            message = `Good job! You got ${this.score} out of ${this.totalQuestions} correct. Keep practicing!`;
        } else {
            message = `You got ${this.score} out of ${this.totalQuestions} correct. Let's practice more addition!`;
        }
        
        this.elements.finalScore.textContent = message;
        this.elements.completionModal.style.display = 'flex';
        
        // Update final progress
        this.elements.progressBar.style.setProperty('--progress', '100%');
        this.elements.progressText.textContent = `${this.totalQuestions}/${this.totalQuestions}`;
    }
    
    // Restart the entire assessment
    restartAssessment() {
        // Reset all state
        this.currentQuestion = 0;
        this.score = 0;
        this.isAnswered = false;
        this.attempts = 0;
        this.hintShown = false; // Reset hint status
        
        // Generate new questions
        this.questions = this.generateQuestions();
        
        // Hide modal
        this.elements.completionModal.style.display = 'none';
        
        // Reset UI
        this.resetQuestionUI();
        this.elements.scoreDisplay.textContent = '0';
        
        // Start fresh
        this.displayCurrentQuestion();
        this.updateProgress();
    }
}

// Initialize the assessment when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create new assessment instance
    const assessment = new AdditionAssessment();
    
    // Add tooltip functionality for the info icon
    const tooltipTrigger = document.querySelector('.tooltip-trigger');
    if (tooltipTrigger) {
        tooltipTrigger.addEventListener('mouseenter', (e) => {
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Addition Within 10 Assessment - Drag the correct numbers to complete each equation';
            tooltip.style.cssText = `
                position: absolute;
                top: 30px;
                right: 0;
                background: #2c3e50;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                max-width: 200px;
                white-space: normal;
            `;
            
            tooltipTrigger.appendChild(tooltip);
        });
        
        tooltipTrigger.addEventListener('mouseleave', () => {
            const tooltip = tooltipTrigger.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    }
    
    // Prevent default drag behavior on images and other elements
    document.addEventListener('dragstart', (e) => {
        if (!e.target.classList.contains('draggable-number')) {
            e.preventDefault();
        }
    });
    
    // Enhanced keyboard support for accessibility including hint functionality
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const activeElement = document.activeElement;
            if (activeElement.classList.contains('draggable-number')) {
                e.preventDefault();
                assessment.handleNumberDrop(activeElement.dataset.value);
            }
        }
        
        // Add 'H' key shortcut for hints
        if (e.key.toLowerCase() === 'h' && assessment.elements.hintBtn.style.display !== 'none') {
            e.preventDefault();
            assessment.showHint();
        }
    });
    
    // Make draggable numbers focusable for keyboard navigation
    document.querySelectorAll('.draggable-number').forEach(number => {
        number.setAttribute('tabindex', '0');
        number.setAttribute('role', 'button');
        number.setAttribute('aria-label', `Number ${number.dataset.value}`);
    });
});