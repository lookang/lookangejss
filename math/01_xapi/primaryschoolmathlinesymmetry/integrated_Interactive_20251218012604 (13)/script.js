// Main application state
const state = {
    base: 3,
    index: 4,
    questionsAttempted: 0,
    totalQuestions: 5,
    currentQuestion: null,
    answered: false
};

// Questions bank - focused on observation and pattern recognition
const questions = [
    {
        type: 'count',
        getText: (base, index) => `How many times is ${base} multiplied together?`,
        getAnswer: (base, index) => index,
        getOptions: (base, index) => {
            const correct = index;
            const options = [correct];
            // Generate wrong options
            if (correct > 1) options.push(correct - 1);
            if (correct < 6) options.push(correct + 1);
            options.push(base); // Common misconception
            return shuffleArray([...new Set(options)]).slice(0, 4);
        }
    },
    {
        type: 'base',
        getText: (base, index) => `What number stays the same in all the multiplications?`,
        getAnswer: (base, index) => base,
        getOptions: (base, index) => {
            const correct = base;
            const options = [correct];
            if (correct > 2) options.push(correct - 1);
            if (correct < 10) options.push(correct + 1);
            options.push(index); // Common misconception
            return shuffleArray([...new Set(options)]).slice(0, 4);
        }
    },
    {
        type: 'index_meaning',
        getText: (base, index) => `In ${base}${getSuperscript(index)}, what does the ${index} tell us?`,
        getAnswer: (base, index) => 'How many times to multiply the base',
        getOptions: (base, index) => shuffleArray([
            'How many times to multiply the base',
            'The number to add',
            'The final answer',
            'The base number'
        ])
    },
    {
        type: 'change_index',
        getText: (base, index) => {
            const newIndex = index === 1 ? 2 : index - 1;
            return `If we change ${base}${getSuperscript(index)} to ${base}${getSuperscript(newIndex)}, how many times would ${base} be multiplied?`;
        },
        getAnswer: (base, index) => index === 1 ? 2 : index - 1,
        getOptions: (base, index) => {
            const correct = index === 1 ? 2 : index - 1;
            const options = [correct, index, base];
            if (correct > 1) options.push(correct - 1);
            if (correct < 6) options.push(correct + 1);
            return shuffleArray([...new Set(options)]).slice(0, 4);
        }
    },
    {
        type: 'change_base',
        getText: (base, index) => {
            const newBase = base === 2 ? 3 : base - 1;
            return `If we change ${base}${getSuperscript(index)} to ${newBase}${getSuperscript(index)}, what number would be multiplied ${index} times?`;
        },
        getAnswer: (base, index) => base === 2 ? 3 : base - 1,
        getOptions: (base, index) => {
            const correct = base === 2 ? 3 : base - 1;
            const options = [correct, base, index];
            if (correct > 2) options.push(correct - 1);
            if (correct < 10) options.push(correct + 1);
            return shuffleArray([...new Set(options)]).slice(0, 4);
        }
    }
];

// Initialize the application
function init() {
    // Check if running in standalone mode (new tab)
    if (window.self === window.top) {
        document.body.classList.add('standalone');
    }

    // Get DOM elements
    const baseSlider = document.getElementById('baseSlider');
    const baseInput = document.getElementById('baseInput');
    const indexSlider = document.getElementById('indexSlider');
    const indexInput = document.getElementById('indexInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const infoIcon = document.getElementById('infoIcon');
    const headerTooltip = document.getElementById('headerTooltip');

    // Sync slider and input for base
    baseSlider.addEventListener('input', (e) => {
        state.base = parseInt(e.target.value);
        baseInput.value = state.base;
        updateDisplay();
    });

    baseInput.addEventListener('input', (e) => {
        let value = parseInt(e.target.value);
        if (value < 2) value = 2;
        if (value > 10) value = 10;
        state.base = value;
        baseSlider.value = value;
        baseInput.value = value;
        updateDisplay();
    });

    // Sync slider and input for index
    indexSlider.addEventListener('input', (e) => {
        state.index = parseInt(e.target.value);
        indexInput.value = state.index;
        updateDisplay();
    });

    indexInput.addEventListener('input', (e) => {
        let value = parseInt(e.target.value);
        if (value < 1) value = 1;
        if (value > 6) value = 6;
        state.index = value;
        indexSlider.value = value;
        indexInput.value = value;
        updateDisplay();
    });

    // Calculate button
    calculateBtn.addEventListener('click', () => {
        const result = Math.pow(state.base, state.index);
        document.getElementById('resultDisplay').textContent = `= ${result}`;
    });

    // Info icon tooltip
    infoIcon.addEventListener('mouseenter', () => {
        headerTooltip.classList.add('show');
    });

    infoIcon.addEventListener('mouseleave', () => {
        headerTooltip.classList.remove('show');
    });

    // Touch support for info icon
    infoIcon.addEventListener('click', () => {
        headerTooltip.classList.toggle('show');
        setTimeout(() => {
            headerTooltip.classList.remove('show');
        }, 3000);
    });

    // Initial display
    updateDisplay();
    generateQuestion();
}

// Update all displays based on current state
function updateDisplay() {
    updateNotation();
    updateMultiplicationDisplay();
    // Clear result when values change
    document.getElementById('resultDisplay').textContent = '';
    // Generate new question when values change
    if (state.questionsAttempted < state.totalQuestions) {
        generateQuestion();
    }
}

// Update the notation display (e.g., 3⁴)
function updateNotation() {
    const notationText = document.getElementById('notationText');
    notationText.textContent = `${state.base}${getSuperscript(state.index)}`;
}

// Convert number to superscript
function getSuperscript(num) {
    const superscripts = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
    };
    return num.toString().split('').map(d => superscripts[d]).join('');
}

// Update the visual multiplication display
function updateMultiplicationDisplay() {
    const display = document.getElementById('multiplicationDisplay');
    display.innerHTML = '';

    // Create boxes for each base multiplication
    for (let i = 0; i < state.index; i++) {
        const box = document.createElement('div');
        box.className = 'base-box';
        box.textContent = state.base;
        display.appendChild(box);

        // Add multiplication sign between boxes (but not after the last one)
        if (i < state.index - 1) {
            const multiply = document.createElement('span');
            multiply.className = 'multiply-sign';
            multiply.textContent = '×';
            display.appendChild(multiply);
        }
    }
}

// Generate a new question
function generateQuestion() {
    if (state.questionsAttempted >= state.totalQuestions) {
        showCompletion();
        return;
    }

    state.answered = false;

    // Select a random question type
    const questionTemplate = questions[Math.floor(Math.random() * questions.length)];
    
    // Generate question text
    const questionText = typeof questionTemplate.getText === 'function' 
        ? questionTemplate.getText(state.base, state.index)
        : questionTemplate.getText;

    // Get correct answer
    const correctAnswer = typeof questionTemplate.getAnswer === 'function'
        ? questionTemplate.getAnswer(state.base, state.index)
        : questionTemplate.getAnswer;

    // Get options
    const options = typeof questionTemplate.getOptions === 'function'
        ? questionTemplate.getOptions(state.base, state.index)
        : questionTemplate.getOptions;

    // Store current question
    state.currentQuestion = {
        text: questionText,
        correctAnswer: correctAnswer,
        options: options
    };

    // Display question
    displayQuestion();
}

// Display the current question
function displayQuestion() {
    const questionTextEl = document.getElementById('questionText');
    const answerOptionsEl = document.getElementById('answerOptions');
    const feedbackEl = document.getElementById('feedbackMessage');

    questionTextEl.textContent = state.currentQuestion.text;
    answerOptionsEl.innerHTML = '';
    feedbackEl.classList.remove('show', 'correct', 'incorrect');

    // Create answer buttons
    state.currentQuestion.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => checkAnswer(option, btn));
        answerOptionsEl.appendChild(btn);
    });
}

// Check if the selected answer is correct
function checkAnswer(selectedAnswer, button) {
    if (state.answered) return;

    state.answered = true;
    const feedbackEl = document.getElementById('feedbackMessage');
    const allButtons = document.querySelectorAll('.answer-btn');

    // Disable all buttons
    allButtons.forEach(btn => btn.disabled = true);

    // Check if answer is correct
    const isCorrect = selectedAnswer === state.currentQuestion.correctAnswer || 
                      selectedAnswer.toString() === state.currentQuestion.correctAnswer.toString();

    if (isCorrect) {
        button.classList.add('correct');
        feedbackEl.textContent = '✓ Correct! Well done!';
        feedbackEl.classList.add('show', 'correct');
    } else {
        button.classList.add('incorrect');
        // Highlight correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === state.currentQuestion.correctAnswer.toString() ||
                btn.textContent === state.currentQuestion.correctAnswer) {
                btn.classList.add('correct');
            }
        });
        feedbackEl.textContent = `✗ Not quite. The correct answer is: ${state.currentQuestion.correctAnswer}`;
        feedbackEl.classList.add('show', 'incorrect');
    }

    // Update progress
    state.questionsAttempted++;
    updateProgress();

    // Generate next question after delay
    setTimeout(() => {
        if (state.questionsAttempted < state.totalQuestions) {
            generateQuestion();
        } else {
            showCompletion();
        }
    }, 2500);
}

// Update progress bar and counter
function updateProgress() {
    const progressCount = document.getElementById('progressCount');
    const progressFill = document.getElementById('progressFill');

    progressCount.textContent = state.questionsAttempted;
    const percentage = (state.questionsAttempted / state.totalQuestions) * 100;
    progressFill.style.width = `${percentage}%`;
}

// Show completion message
function showCompletion() {
    const questionTextEl = document.getElementById('questionText');
    const answerOptionsEl = document.getElementById('answerOptions');
    const feedbackEl = document.getElementById('feedbackMessage');

    questionTextEl.textContent = '🎉 Great job! You have completed all the questions!';
    answerOptionsEl.innerHTML = '';
    
    const restartBtn = document.createElement('button');
    restartBtn.className = 'answer-btn';
    restartBtn.textContent = 'Start Again';
    restartBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    restartBtn.style.color = 'white';
    restartBtn.style.border = 'none';
    restartBtn.addEventListener('click', resetGame);
    answerOptionsEl.appendChild(restartBtn);

    feedbackEl.classList.remove('show');
}

// Reset the game
function resetGame() {
    state.questionsAttempted = 0;
    state.answered = false;
    updateProgress();
    generateQuestion();
}

// Utility function to shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);