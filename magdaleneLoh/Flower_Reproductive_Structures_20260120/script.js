// ===== DETECT IF RUNNING IN IFRAME =====
// Adjust container height based on whether we're in an iframe or standalone
function detectIframe() {
    if (window.self !== window.top) {
        document.body.classList.add('in-iframe');
    }
}
detectIframe();

// ===== FLOWER PARTS DATA =====
// Updated with exact terminology from user instructions
const flowerParts = {
    anther: {
        name: 'Anther',
        type: 'male',
        description: 'The anther contains pollen grains.',
        details: [
            '<strong>What is an Anther?</strong> The anther is the top part of the stamen (male part of the flower). It is like a little sac or pouch.',
            '<strong>What does it do?</strong> The anther produces and holds tiny yellow or orange powder called pollen. Pollen contains the male reproductive cells needed for reproduction.',
            '<strong>Fun fact:</strong> Pollen is so light that it can be carried by wind or by insects like bees and butterflies from flower to flower!',
            '<strong>How does it look?</strong> Anthers are usually small, rounded shapes, often colored yellow, orange, or red.'
        ]
    },
    filament: {
        name: 'Filament',
        type: 'male',
        description: 'The filament holds up the anther.',
        details: [
            '<strong>What is a Filament?</strong> The filament is a thin, thread-like stalk that holds up the anther. Think of it like the "stem" of the stamen.',
            '<strong>What does it do?</strong> It supports the anther and holds it up high so that pollen can be easily picked up by insects or blown by wind.',
            '<strong>Why is it important?</strong> Without the filament, the anther would not be in the right position to spread pollen.',
            '<strong>Where is it located?</strong> The filament is below the anther, connecting it to the flower\'s center.'
        ]
    },
    stigma: {
        name: 'Stigma',
        type: 'female',
        description: 'The stigma receives pollen grains.',
        details: [
            '<strong>What is a Stigma?</strong> The stigma is the topmost part of the female reproductive structure (called the carpel or pistil). It is usually the highest point in the flower.',
            '<strong>What does it do?</strong> The stigma catches and receives pollen grains from other flowers. Many stigmas are sticky or have tiny hairs to trap pollen.',
            '<strong>How does it work?</strong> When pollen lands on the stigma, it sticks to it. This is the first step in flower reproduction!',
            '<strong>Fun fact:</strong> Different flowers have different shaped stigmas - some are round, some are split into many parts!'
        ]
    },
    style: {
        name: 'Style',
        type: 'female',
        description: 'The style connects the stigma to the ovary.',
        details: [
            '<strong>What is a Style?</strong> The style is a tube-like structure that connects the stigma (at the top) to the ovary (at the bottom).',
            '<strong>What does it do?</strong> It acts as a "highway" or "tunnel" for pollen grains to travel down to reach the ovules inside the ovary.',
            '<strong>How long is it?</strong> The style can be very short or very long, depending on the flower type.',
            '<strong>Why is it important?</strong> Without the style, pollen would not be able to reach the ovules needed for seeds to form.'
        ]
    },
    ovary: {
        name: 'Ovary',
        type: 'female',
        description: 'The ovary contains ovules.',
        details: [
            '<strong>What is an Ovary?</strong> The ovary is the enlarged, bottom part of the female reproductive structure. It is like a tiny container or room.',
            '<strong>What does it do?</strong> The ovary protects the ovules inside it. After pollination, the ovary grows and becomes the fruit that holds the seeds!',
            '<strong>Fun fact:</strong> The fruits and vegetables you eat are actually the ovaries of flowers! For example, apples, tomatoes, and peppers are all grown ovaries.',
            '<strong>Why is it important?</strong> The ovary ensures that seeds are protected and helps disperse them when the fruit is eaten.'
        ]
    },
    ovule: {
        name: 'Ovule',
        type: 'female',
        description: 'The ovules contain female reproductive cells, also known as egg cells.',
        details: [
            '<strong>What is an Ovule?</strong> An ovule is a tiny structure inside the ovary that contains the female reproductive cell (the egg cell).',
            '<strong>What does it do?</strong> When pollen lands on the stigma and travels down the style, it reaches the ovule. The pollen and egg cell join together to create a seed.',
            '<strong>How small are they?</strong> Ovules are extremely tiny - you would need a microscope to see them clearly!',
            '<strong>Fun fact:</strong> One ovary can contain many ovules. That is why one flower can produce many seeds!'
        ]
    }
};

// ===== GUIDED LEARNING STEPS =====
// Updated with exact terminology from user instructions
const guidedSteps = [
    {
        title: 'Welcome to Flower Reproduction! 🌸',
        content: 'Flowers have special parts that help them reproduce. Let\'s learn about the male reproductive structures first, then the female reproductive structures.',
        highlight: []
    },
    {
        title: 'Male Reproductive Structure 1: Anther',
        content: 'The <strong>anther</strong> contains pollen grains. Pollen grains contain the male reproductive cells.',
        highlight: ['anther']
    },
    {
        title: 'Male Reproductive Structure 2: Filament',
        content: 'The <strong>filament</strong> holds up the anther. Together, the anther and filament are the male reproductive structures.',
        highlight: ['filament', 'anther']
    },
    {
        title: 'Female Reproductive Structure 1: Stigma',
        content: 'The <strong>stigma</strong> receives pollen grains. In some flowering plants, the stigma is sticky so that pollen grains can be collected easily.',
        highlight: ['stigma']
    },
    {
        title: 'Female Reproductive Structure 2: Style',
        content: 'The <strong>style</strong> connects the stigma to the ovary. It acts as a pathway for pollen.',
        highlight: ['style', 'stigma']
    },
    {
        title: 'Female Reproductive Structure 3: Ovary',
        content: 'The <strong>ovary</strong> contains ovules. It is located at the base of the flower.',
        highlight: ['ovary']
    },
    {
        title: 'Female Reproductive Structure 4: Ovule',
        content: 'The <strong>ovules</strong> contain female reproductive cells, also known as egg cells. The ovules are found inside the ovary.',
        highlight: ['ovule', 'ovary']
    }
];

// ===== QUIZ QUESTIONS =====
// Updated with exact terminology from user instructions
const quizQuestions = [
    {
        type: 'multiple-choice',
        question: 'Which part contains pollen grains?',
        choices: ['Stigma', 'Anther', 'Ovary', 'Style'],
        correct: 1,
        feedback: {
            correct: 'Excellent! The anther contains pollen grains. ✓',
            incorrect: 'Not quite. Think about which male reproductive structure contains pollen grains.'
        }
    },
    {
        type: 'fill-blank',
        question: 'The ______ contains ovules.',
        answer: 'ovary',
        feedback: {
            correct: 'Well done! The ovary contains ovules. ✓',
            incorrect: 'Try again. Which female reproductive structure contains ovules?'
        }
    },
    {
        type: 'multiple-choice',
        question: 'What does the filament do?',
        choices: ['Contains pollen grains', 'Holds up the anther', 'Receives pollen grains', 'Contains egg cells'],
        correct: 1,
        feedback: {
            correct: 'Correct! The filament holds up the anther. ✓',
            incorrect: 'Think about what the filament does for the anther.'
        }
    },
    {
        type: 'fill-blank',
        question: 'The ______ receives pollen grains.',
        answer: 'stigma',
        feedback: {
            correct: 'Perfect! The stigma receives pollen grains. ✓',
            incorrect: 'Hint: This part may be sticky in some flowering plants.'
        }
    },
    {
        type: 'multiple-choice',
        question: 'What do ovules contain?',
        choices: ['Male reproductive cells', 'Pollen grains', 'Female reproductive cells (egg cells)', 'Petals'],
        correct: 2,
        feedback: {
            correct: 'Excellent! The ovules contain female reproductive cells, also known as egg cells. ✓',
            incorrect: 'Remember, ovules are part of the female reproductive structures.'
        }
    },
    {
        type: 'multiple-choice',
        question: 'The style connects which two parts?',
        choices: ['Anther and filament', 'Stigma and ovary', 'Ovary and ovule', 'Petal and sepal'],
        correct: 1,
        feedback: {
            correct: 'Great work! The style connects the stigma to the ovary. ✓',
            incorrect: 'Think about which female reproductive structures the style connects.'
        }
    }
];

// ===== STATE MANAGEMENT =====
let currentMode = 'explore';
let currentGuidedStep = 0;
let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswered = [];

// ===== MODE SWITCHING =====
// Handle switching between Explore, Guided, and Quiz modes
const modeButtons = document.querySelectorAll('.mode-btn');
const modeContents = document.querySelectorAll('.mode-content');

modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        switchMode(mode);
    });
});

function switchMode(mode) {
    currentMode = mode;
    
    // Update button states
    modeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Update content visibility
    modeContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected mode
    if (mode === 'explore') {
        document.getElementById('explore-mode').classList.add('active');
        resetExploreMode();
    } else if (mode === 'guided') {
        document.getElementById('guided-mode').classList.add('active');
        currentGuidedStep = 0;
        showGuidedStep(0);
    } else if (mode === 'quiz') {
        document.getElementById('quiz-mode').classList.add('active');
        startQuiz();
    }
}

// ===== EXPLORE MODE =====
// Interactive exploration of flower parts
function resetExploreMode() {
    const infoDisplay = document.getElementById('info-display');
    infoDisplay.innerHTML = `
        <div class="welcome-message">
            <h2>Welcome! 🌸</h2>
            <p>Select a flower part to learn about its reproductive structures.</p>
            <div class="legend">
                <div class="legend-item">
                    <span class="legend-color male"></span>
                    <span>Male parts</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color female"></span>
                    <span>Female parts</span>
                </div>
            </div>
            <div class="part-selector">
                <h3>Choose a part to learn:</h3>
                <div class="button-grid">
                    <button class="part-btn" data-part="anther">🌼 Anther</button>
                    <button class="part-btn" data-part="filament">🌼 Filament</button>
                    <button class="part-btn" data-part="stigma">🌸 Stigma</button>
                    <button class="part-btn" data-part="style">🌸 Style</button>
                    <button class="part-btn" data-part="ovary">🌸 Ovary</button>
                    <button class="part-btn" data-part="ovule">🌸 Ovule</button>
                </div>
            </div>
        </div>
    `;
    
    // Add click handlers to part buttons
    document.querySelectorAll('.part-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const partName = e.target.dataset.part;
            showPartInfo(partName);
        });
    });
}

// Display information about a flower part
function showPartInfo(partName) {
    const part = flowerParts[partName];
    if (!part) return;
    
    const infoDisplay = document.getElementById('info-display');
    
    const detailsList = part.details.map(detail => `<li>${detail}</li>`).join('');
    
    infoDisplay.innerHTML = `
        <div class="part-info">
            <h2>🌿 ${part.name}</h2>
            <span class="part-type ${part.type}">${part.type.toUpperCase()} PART</span>
            <p><strong>${part.description}</strong></p>
            <ul>
                ${detailsList}
            </ul>
            <button class="back-btn" onclick="resetExploreMode()">← Back to parts list</button>
        </div>
    `;
}

// ===== GUIDED MODE =====
// Step-by-step learning experience
function showGuidedStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= guidedSteps.length) return;
    
    currentGuidedStep = stepIndex;
    const step = guidedSteps[stepIndex];
    
    // Update text content
    const guidedText = document.querySelector('.guided-text');
    guidedText.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.content}</p>
    `;
    
    // Update step indicator
    document.getElementById('step-indicator').textContent = `Step ${stepIndex + 1} of ${guidedSteps.length}`;
    
    // Update navigation buttons
    document.getElementById('prev-step').disabled = stepIndex === 0;
    document.getElementById('next-step').disabled = stepIndex === guidedSteps.length - 1;
    
    // Highlight relevant parts in diagram
    const guidedParts = document.querySelectorAll('.guided-part');
    guidedParts.forEach(part => {
        part.classList.remove('active');
        const partName = part.dataset.part;
        if (step.highlight.includes(partName)) {
            part.classList.add('active');
        }
    });
}

// Navigation buttons for guided mode
document.getElementById('prev-step').addEventListener('click', () => {
    showGuidedStep(currentGuidedStep - 1);
});

document.getElementById('next-step').addEventListener('click', () => {
    showGuidedStep(currentGuidedStep + 1);
});

// ===== QUIZ MODE =====
// Assessment with immediate feedback
function startQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    quizAnswered = new Array(quizQuestions.length).fill(false);
    
    document.getElementById('question-area').style.display = 'block';
    document.getElementById('results-area').style.display = 'none';
    
    showQuestion(0);
}

function showQuestion(questionIndex) {
    if (questionIndex < 0 || questionIndex >= quizQuestions.length) {
        showResults();
        return;
    }
    
    currentQuizQuestion = questionIndex;
    const question = quizQuestions[questionIndex];
    
    // Update question number
    document.getElementById('question-number').textContent = `Question ${questionIndex + 1} of ${quizQuestions.length}`;
    
    // Update question text
    document.getElementById('question-text').textContent = question.question;
    
    // Clear previous answer and feedback
    const answerArea = document.getElementById('answer-area');
    const feedbackArea = document.getElementById('feedback-area');
    feedbackArea.style.display = 'none';
    feedbackArea.className = '';
    document.getElementById('next-question').style.display = 'none';
    
    // Render answer input based on question type
    if (question.type === 'multiple-choice') {
        answerArea.innerHTML = question.choices.map((choice, index) => 
            `<button class="choice-btn" data-index="${index}">${choice}</button>`
        ).join('');
        
        // Add click handlers to choice buttons
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                checkMultipleChoice(parseInt(e.target.dataset.index));
            });
        });
    } else if (question.type === 'fill-blank') {
        answerArea.innerHTML = `
            <input type="text" class="blank-input" id="blank-answer" placeholder="Type your answer here">
            <br><br>
            <button class="submit-answer" id="submit-blank">Submit Answer</button>
        `;
        
        // Add submit handler
        document.getElementById('submit-blank').addEventListener('click', checkFillBlank);
        
        // Allow Enter key to submit
        document.getElementById('blank-answer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkFillBlank();
            }
        });
    }
}

// Check multiple choice answer
function checkMultipleChoice(selectedIndex) {
    const question = quizQuestions[currentQuizQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    // Mark answer as attempted
    quizAnswered[currentQuizQuestion] = true;
    
    // Update score
    if (isCorrect) {
        quizScore++;
    }
    
    // Disable all buttons
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.disabled = true;
        const index = parseInt(btn.dataset.index);
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show feedback
    showFeedback(isCorrect, question.feedback);
}

// Check fill-in-the-blank answer
function checkFillBlank() {
    const question = quizQuestions[currentQuizQuestion];
    const userAnswer = document.getElementById('blank-answer').value.trim().toLowerCase();
    const correctAnswer = question.answer.toLowerCase();
    
    const isCorrect = userAnswer === correctAnswer;
    
    // Mark answer as attempted
    quizAnswered[currentQuizQuestion] = true;
    
    // Update score
    if (isCorrect) {
        quizScore++;
    }
    
    // Disable input and button
    document.getElementById('blank-answer').disabled = true;
    document.getElementById('submit-blank').disabled = true;
    
    // Show feedback
    showFeedback(isCorrect, question.feedback);
}

// Display feedback for answer
function showFeedback(isCorrect, feedback) {
    const feedbackArea = document.getElementById('feedback-area');
    feedbackArea.textContent = isCorrect ? feedback.correct : feedback.incorrect;
    feedbackArea.className = isCorrect ? 'correct' : 'incorrect';
    feedbackArea.style.display = 'block';
    
    // Show next question button
    document.getElementById('next-question').style.display = 'inline-block';
}

// Next question button handler
document.getElementById('next-question').addEventListener('click', () => {
    showQuestion(currentQuizQuestion + 1);
});

// Show quiz results
function showResults() {
    document.getElementById('question-area').style.display = 'none';
    document.getElementById('results-area').style.display = 'block';
    
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    
    let message = '';
    if (percentage === 100) {
        message = 'Perfect score! You know your flower reproductive structures very well! 🌟';
    } else if (percentage >= 70) {
        message = 'Great job! You have a good understanding of flower reproductive structures! 🌸';
    } else {
        message = 'Good effort! Review the Explore and Guided modes to learn more. 🌱';
    }
    
    document.getElementById('score-display').innerHTML = `
        <p>You scored <strong>${quizScore}</strong> out of <strong>${quizQuestions.length}</strong></p>
        <p>${message}</p>
    `;
}

// Retry quiz button
document.getElementById('retry-quiz').addEventListener('click', startQuiz);

// ===== TOOLTIP FUNCTIONALITY =====
// Show tooltips on hover for mode buttons
const tooltip = document.getElementById('tooltip');

modeButtons.forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        const title = e.target.getAttribute('title');
        if (title) {
            tooltip.textContent = title;
            tooltip.classList.add('visible');
            updateTooltipPosition(e);
        }
    });
    
    btn.addEventListener('mousemove', updateTooltipPosition);
    
    btn.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });
});

function updateTooltipPosition(e) {
    const x = e.clientX;
    const y = e.clientY;
    tooltip.style.left = x + 10 + 'px';
    tooltip.style.top = y + 10 + 'px';
}

// ===== INITIALIZATION =====
// Set up initial state when page loads
document.addEventListener('DOMContentLoaded', () => {
    switchMode('explore');
});