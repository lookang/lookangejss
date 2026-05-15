// Game state management and core functionality
class FractionalEquationsGame {
    constructor() {
        // Game state variables
        this.score = 0;
        this.currentQuestion = 1;
        this.totalQuestions = 10;
        this.streak = 0;
        this.maxScore = 99;
        
        // Analytics tracking
        this.analytics = {
            totalAttempts: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            questionTimes: [],
            errorTypes: {},
            questionHistory: []
        };
        
        // Question timing
        this.questionStartTime = null;
        this.currentAnswer = null;
        this.currentHint = '';
        
        // Initialize the game
        this.init();
    }
    
    init() {
        // Set up event listeners for all interactive elements
        this.setupEventListeners();
        
        // Generate first question
        this.generateQuestion();
        
        // Start timing for analytics
        this.questionStartTime = Date.now();
        
        // Initialize analytics display
        this.updateAnalyticsDisplay();
    }
    
    setupEventListeners() {
        // Submit button and Enter key for answer submission
        document.getElementById('submitBtn').addEventListener('click', () => this.submitAnswer());
        document.getElementById('answerInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitAnswer();
        });
        
        // Hint button functionality
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        
        // Next question button
        document.getElementById('nextBtn').addEventListener('click', () => this.nextQuestion());
        
        // Analytics panel toggle
        document.getElementById('analyticsToggle').addEventListener('click', () => this.toggleAnalytics());
        
        // Restart game button
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
        
        // Tooltip functionality for help text
        this.setupTooltips();
    }
    
    setupTooltips() {
        // Add tooltip functionality to elements with title attributes
        const elementsWithTooltips = document.querySelectorAll('[title]');
        const tooltip = document.getElementById('tooltip');
        
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const title = e.target.getAttribute('title');
                if (title) {
                    tooltip.textContent = title;
                    tooltip.style.display = 'block';
                    this.positionTooltip(e, tooltip);
                }
            });
            
            element.addEventListener('mousemove', (e) => {
                if (tooltip.style.display === 'block') {
                    this.positionTooltip(e, tooltip);
                }
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
        });
    }
    
    positionTooltip(e, tooltip) {
        // Position tooltip near cursor but keep it within viewport
        const rect = document.getElementById('gameContainer').getBoundingClientRect();
        const x = e.clientX - rect.left + 10;
        const y = e.clientY - rect.top - 30;
        
        tooltip.style.left = Math.min(x, rect.width - tooltip.offsetWidth - 10) + 'px';
        tooltip.style.top = Math.max(y, 10) + 'px';
    }
    
    generateQuestion() {
        // Generate different types of simple fractional equations
        const questionTypes = [
            this.generateBasicFraction,
            this.generateFractionWithVariable,
            this.generateSimpleEquation,
            this.generateCrossMultiplication
        ];
        
        // Select random question type
        const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        const question = questionType.call(this);
        
        // Display the question
        document.getElementById('questionText').textContent = `Solve for x:`;
        document.getElementById('equation').textContent = question.equation;
        document.getElementById('steps').textContent = '';
        
        // Store the correct answer and hint
        this.currentAnswer = question.answer;
        this.currentHint = question.hint;
        
        // Clear previous feedback and input
        document.getElementById('answerInput').value = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('feedback').className = '';
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').disabled = false;
        
        // Reset question timer
        this.questionStartTime = Date.now();
    }
    
    generateBasicFraction() {
        // Generate equations like: x/3 = 2
        const denominator = Math.floor(Math.random() * 8) + 2; // 2-9
        const result = Math.floor(Math.random() * 10) + 1; // 1-10
        const answer = result * denominator;
        
        return {
            equation: `x/${denominator} = ${result}`,
            answer: answer,
            hint: `Multiply both sides by ${denominator} to isolate x`
        };
    }
    
    generateFractionWithVariable() {
        // Generate equations like: 2x/5 = 4
        const coefficient = Math.floor(Math.random() * 4) + 2; // 2-5
        const denominator = Math.floor(Math.random() * 6) + 2; // 2-7
        const result = Math.floor(Math.random() * 8) + 2; // 2-9
        const answer = (result * denominator) / coefficient;
        
        return {
            equation: `${coefficient}x/${denominator} = ${result}`,
            answer: answer,
            hint: `Multiply both sides by ${denominator}, then divide by ${coefficient}`
        };
    }
    
    generateSimpleEquation() {
        // Generate equations like: (x + 2)/3 = 4
        const addend = Math.floor(Math.random() * 8) + 1; // 1-8
        const denominator = Math.floor(Math.random() * 5) + 2; // 2-6
        const result = Math.floor(Math.random() * 6) + 2; // 2-7
        const answer = (result * denominator) - addend;
        
        return {
            equation: `(x + ${addend})/${denominator} = ${result}`,
            answer: answer,
            hint: `Multiply both sides by ${denominator}, then subtract ${addend}`
        };
    }
    
    generateCrossMultiplication() {
        // Generate equations like: x/4 = 3/2
        const denom1 = Math.floor(Math.random() * 6) + 2; // 2-7
        const num2 = Math.floor(Math.random() * 8) + 1; // 1-8
        const denom2 = Math.floor(Math.random() * 5) + 2; // 2-6
        const answer = (num2 * denom1) / denom2;
        
        return {
            equation: `x/${denom1} = ${num2}/${denom2}`,
            answer: answer,
            hint: `Cross multiply: x × ${denom2} = ${num2} × ${denom1}`
        };
    }
    
    submitAnswer() {
        const userInput = document.getElementById('answerInput').value.trim();
        if (!userInput) return;
        
        // Parse user answer (handle fractions and decimals)
        const userAnswer = this.parseAnswer(userInput);
        const isCorrect = Math.abs(userAnswer - this.currentAnswer) < 0.001;
        
        // Record timing for analytics
        const timeSpent = (Date.now() - this.questionStartTime) / 1000;
        this.analytics.questionTimes.push(timeSpent);
        this.analytics.totalAttempts++;
        
        // Update analytics and display feedback
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer(userAnswer);
        }
        
        // Record question in history for analytics
        this.analytics.questionHistory.push({
            question: document.getElementById('equation').textContent,
            userAnswer: userInput,
            correctAnswer: this.currentAnswer,
            isCorrect: isCorrect,
            timeSpent: timeSpent
        });
        
        // Update displays
        this.updateScoreDisplay();
        this.updateAnalyticsDisplay();
        
        // Disable submit button and show next button
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('nextBtn').style.display = 'block';
    }
    
    parseAnswer(input) {
        // Handle fraction input like "1/2" or decimal like "0.5"
        if (input.includes('/')) {
            const parts = input.split('/');
            if (parts.length === 2) {
                const numerator = parseFloat(parts[0]);
                const denominator = parseFloat(parts[1]);
                if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                    return numerator / denominator;
                }
            }
        }
        return parseFloat(input) || 0;
    }
    
    handleCorrectAnswer() {
        this.analytics.correctAnswers++;
        this.streak++;
        
        // Calculate score based on streak and question difficulty
        const basePoints = 5;
        const streakBonus = Math.min(this.streak, 5);
        const points = Math.min(basePoints + streakBonus, this.maxScore - this.score);
        this.score += points;
        
        // Display positive feedback
        const feedback = document.getElementById('feedback');
        feedback.textContent = `Correct! +${points} points. Great work!`;
        feedback.className = 'correct';
        
        // Show working steps
        this.showWorkingSteps();
    }
    
    handleIncorrectAnswer(userAnswer) {
        this.analytics.incorrectAnswers++;
        this.streak = 0;
        
        // Analyze error type for misconception tracking
        this.analyzeError(userAnswer);
        
        // Display corrective feedback
        const feedback = document.getElementById('feedback');
        feedback.textContent = `Incorrect. The correct answer is ${this.formatAnswer(this.currentAnswer)}. Try to identify where you went wrong.`;
        feedback.className = 'incorrect';
        
        // Show working steps
        this.showWorkingSteps();
    }
    
    analyzeError(userAnswer) {
        // Identify common misconceptions in fractional equations
        const correctAnswer = this.currentAnswer;
        const difference = Math.abs(userAnswer - correctAnswer);
        
        if (Math.abs(userAnswer - (correctAnswer / 2)) < 0.001) {
            this.recordError('Forgot to multiply by denominator');
        } else if (Math.abs(userAnswer - (correctAnswer * 2)) < 0.001) {
            this.recordError('Multiplied instead of divided');
        } else if (difference > correctAnswer) {
            this.recordError('Calculation error - result too large');
        } else if (userAnswer < 0 && correctAnswer > 0) {
            this.recordError('Sign error');
        } else {
            this.recordError('General calculation error');
        }
    }
    
    recordError(errorType) {
        if (this.analytics.errorTypes[errorType]) {
            this.analytics.errorTypes[errorType]++;
        } else {
            this.analytics.errorTypes[errorType] = 1;
        }
    }
    
    showWorkingSteps() {
        // Display step-by-step solution
        const equation = document.getElementById('equation').textContent;
        const steps = document.getElementById('steps');
        
        // Generate appropriate steps based on equation type
        if (equation.includes('(') && equation.includes(')')) {
            steps.innerHTML = `
                <div>Step 1: Multiply both sides by the denominator</div>
                <div>Step 2: Simplify and isolate the variable</div>
                <div>Step 3: x = ${this.formatAnswer(this.currentAnswer)}</div>
            `;
        } else if (equation.includes('/') && equation.includes('=')) {
            steps.innerHTML = `
                <div>Step 1: Cross multiply or multiply by denominator</div>
                <div>Step 2: Solve for x</div>
                <div>Step 3: x = ${this.formatAnswer(this.currentAnswer)}</div>
            `;
        }
    }
    
    formatAnswer(answer) {
        // Format answer as fraction if it's a simple fraction, otherwise as decimal
        if (answer % 1 === 0) {
            return answer.toString();
        } else {
            // Check if it can be expressed as a simple fraction
            for (let denom = 2; denom <= 12; denom++) {
                if (Math.abs((answer * denom) % 1) < 0.001) {
                    const num = Math.round(answer * denom);
                    return `${num}/${denom}`;
                }
            }
            return answer.toFixed(2);
        }
    }
    
    showHint() {
        // Display hint in a temporary overlay
        const feedback = document.getElementById('feedback');
        const originalContent = feedback.textContent;
        const originalClass = feedback.className;
        
        feedback.textContent = `💡 Hint: ${this.currentHint}`;
        feedback.className = 'hint';
        feedback.style.background = '#fff3cd';
        feedback.style.color = '#856404';
        feedback.style.border = '1px solid #ffeaa7';
        
        // Restore original content after 4 seconds
        setTimeout(() => {
            feedback.textContent = originalContent;
            feedback.className = originalClass;
            feedback.style.background = '';
            feedback.style.color = '';
            feedback.style.border = '';
        }, 4000);
    }
    
    nextQuestion() {
        if (this.currentQuestion >= this.totalQuestions) {
            this.endGame();
        } else {
            this.currentQuestion++;
            this.generateQuestion();
            this.updateQuestionCounter();
        }
    }
    
    updateScoreDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('streak').textContent = this.streak;
    }
    
    updateQuestionCounter() {
        document.getElementById('currentQ').textContent = this.currentQuestion;
    }
    
    updateAnalyticsDisplay() {
        // Update real-time analytics
        const accuracy = this.analytics.totalAttempts > 0 ? 
            Math.round((this.analytics.correctAnswers / this.analytics.totalAttempts) * 100) : 0;
        document.getElementById('accuracy').textContent = `${accuracy}%`;
        
        // Update average time
        const avgTime = this.analytics.questionTimes.length > 0 ?
            Math.round(this.analytics.questionTimes.reduce((a, b) => a + b, 0) / this.analytics.questionTimes.length) : 0;
        document.getElementById('avgTime').textContent = `${avgTime}s`;
        
        // Update error types
        const errorTypesDiv = document.getElementById('errorTypes');
        const errorEntries = Object.entries(this.analytics.errorTypes);
        if (errorEntries.length > 0) {
            const topError = errorEntries.reduce((a, b) => a[1] > b[1] ? a : b);
            errorTypesDiv.textContent = `${topError[0]} (${topError[1]}x)`;
        } else {
            errorTypesDiv.textContent = 'None yet';
        }
        
        // Update question history
        this.updateQuestionHistory();
    }
    
    updateQuestionHistory() {
        const historyDiv = document.getElementById('questionHistory');
        historyDiv.innerHTML = '<h4>Recent Questions:</h4>';
        
        const recentQuestions = this.analytics.questionHistory.slice(-5).reverse();
        recentQuestions.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = `history-item ${item.isCorrect ? 'correct' : 'incorrect'}`;
            historyItem.innerHTML = `
                <div>Q${this.analytics.questionHistory.length - index}: ${item.question}</div>
                <div>Your answer: ${item.userAnswer} | Correct: ${this.formatAnswer(item.correctAnswer)} | ${item.timeSpent.toFixed(1)}s</div>
            `;
            historyDiv.appendChild(historyItem);
        });
    }
    
    toggleAnalytics() {
        const content = document.getElementById('analyticsContent');
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    }
    
    endGame() {
        // Show game completion screen with final analytics
        const gameComplete = document.getElementById('gameComplete');
        const finalScore = document.getElementById('finalScore');
        const finalAnalytics = document.getElementById('finalAnalytics');
        
        finalScore.textContent = `Final Score: ${this.score}/99`;
        
        const accuracy = Math.round((this.analytics.correctAnswers / this.analytics.totalAttempts) * 100);
        const avgTime = Math.round(this.analytics.questionTimes.reduce((a, b) => a + b, 0) / this.analytics.questionTimes.length);
        
        finalAnalytics.innerHTML = `
            <div><strong>Performance Summary:</strong></div>
            <div>Accuracy: ${accuracy}%</div>
            <div>Questions Correct: ${this.analytics.correctAnswers}/${this.totalQuestions}</div>
            <div>Average Time: ${avgTime} seconds</div>
            <div>Best Streak: ${Math.max(...this.analytics.questionHistory.map((_, i) => this.calculateStreakAt(i)))}</div>
        `;
        
        gameComplete.style.display = 'flex';
    }
    
    calculateStreakAt(index) {
        // Calculate the longest streak up to a given point
        let maxStreak = 0;
        let currentStreak = 0;
        
        for (let i = 0; i <= index; i++) {
            if (this.analytics.questionHistory[i].isCorrect) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
        }
        
        return maxStreak;
    }
    
    restartGame() {
        // Reset all game state and analytics
        this.score = 0;
        this.currentQuestion = 1;
        this.streak = 0;
        this.analytics = {
            totalAttempts: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            questionTimes: [],
            errorTypes: {},
            questionHistory: []
        };
        
        // Hide completion screen and reset displays
        document.getElementById('gameComplete').style.display = 'none';
        this.updateScoreDisplay();
        this.updateQuestionCounter();
        this.updateAnalyticsDisplay();
        
        // Generate new first question
        this.generateQuestion();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FractionalEquationsGame();
});