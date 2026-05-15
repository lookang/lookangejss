// Global variables for game state management
let gameState = {
    currentPhase: 'graph', // 'graph', 'assessment', 'results'
    studentsData: [],
    currentQuestion: 0,
    correctAnswers: 0,
    totalQuestions: 4,
    startTime: Date.now(),
    questionStartTime: Date.now(),
    attempts: [],
    graphData: {
        reading: 0,
        sports: 0,
        art: 0
    }
};

// Student avatar configurations with diverse representation
const studentAvatars = [
    { emoji: '👦🏻', bg: '#FFE0B2' }, { emoji: '👧🏻', bg: '#F8BBD9' },
    { emoji: '👦🏽', bg: '#DCEDC8' }, { emoji: '👧🏽', bg: '#E1BEE7' },
    { emoji: '👦🏿', bg: '#BBDEFB' }, { emoji: '👧🏿', bg: '#FFCDD2' },
    { emoji: '👦🏼', bg: '#C8E6C9' }, { emoji: '👧🏼', bg: '#FFF9C4' },
    { emoji: '👦🏾', bg: '#FFE0CC' }, { emoji: '👧🏾', bg: '#E0F2F1' },
    { emoji: '👦', bg: '#F3E5F5' }, { emoji: '👧', bg: '#E8F5E8' },
    { emoji: '👦🏻', bg: '#FFF3E0' }, { emoji: '👧🏻', bg: '#FCE4EC' },
    { emoji: '👦🏽', bg: '#E3F2FD' }, { emoji: '👧🏽', bg: '#F1F8E9' },
    { emoji: '👦🏿', bg: '#FFF8E1' }, { emoji: '👧🏿', bg: '#EFEBE9' }
];

// Question templates for assessment
const questionTemplates = [
    {
        type: 'count',
        template: 'How many students chose {activity}?',
        generateOptions: (activity) => {
            const correct = gameState.graphData[activity];
            const options = [correct];
            // Generate 3 incorrect options
            for (let i = 0; i < 3; i++) {
                let wrong;
                do {
                    wrong = Math.max(0, correct + Math.floor(Math.random() * 6) - 3);
                } while (options.includes(wrong));
                options.push(wrong);
            }
            return shuffleArray(options);
        }
    },
    {
        type: 'most_popular',
        template: 'Which activity is most popular?',
        generateOptions: () => {
            const activities = Object.keys(gameState.graphData);
            const maxCount = Math.max(...Object.values(gameState.graphData));
            const mostPopular = activities.find(act => gameState.graphData[act] === maxCount);
            return shuffleArray([mostPopular, ...activities.filter(act => act !== mostPopular)]);
        }
    },
    {
        type: 'difference',
        template: 'How many more students chose {activity1} than {activity2}?',
        generateOptions: (activity1, activity2) => {
            const diff = Math.abs(gameState.graphData[activity1] - gameState.graphData[activity2]);
            const options = [diff];
            for (let i = 0; i < 3; i++) {
                let wrong;
                do {
                    wrong = Math.max(0, diff + Math.floor(Math.random() * 6) - 3);
                } while (options.includes(wrong));
                options.push(wrong);
            }
            return shuffleArray(options);
        }
    },
    {
        type: 'total',
        template: 'How many students participated in total?',
        generateOptions: () => {
            const total = Object.values(gameState.graphData).reduce((sum, count) => sum + count, 0);
            const options = [total];
            for (let i = 0; i < 3; i++) {
                let wrong;
                do {
                    wrong = Math.max(1, total + Math.floor(Math.random() * 8) - 4);
                } while (options.includes(wrong));
                options.push(wrong);
            }
            return shuffleArray(options);
        }
    }
];

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Picture Graph Builder initialized');
    initializeGame();
    setupEventListeners();
    createStudentAvatars();
    updateProgress();
});

/**
 * Initialize game state and UI elements
 */
function initializeGame() {
    gameState.currentPhase = 'graph';
    gameState.currentQuestion = 0;
    gameState.correctAnswers = 0;
    gameState.startTime = Date.now();
    gameState.attempts = [];
    gameState.graphData = { reading: 0, sports: 0, art: 0 };
    
    // Show graph phase
    document.getElementById('graphPhase').classList.add('active');
    document.getElementById('assessmentPhase').classList.remove('active');
    document.getElementById('resultsPhase').classList.remove('active');
    
    // Reset UI elements
    document.getElementById('completeGraphBtn').disabled = true;
    clearColumns();
    clearReferenceColumns(); // Added to clear reference columns
}

/**
 * Set up all event listeners for interactive elements
 */
function setupEventListeners() {
    // Complete graph button
    document.getElementById('completeGraphBtn').addEventListener('click', startAssessment);
    
    // Next question button
    document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);
    
    // Restart button
    document.getElementById('restartBtn').addEventListener('click', restartGame);
    
    // Hint button
    document.getElementById('hintBtn').addEventListener('click', showHint);
    
    // Column drag and drop events
    const columns = document.querySelectorAll('.column-grid');
    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
        column.addEventListener('dragenter', handleDragEnter);
        column.addEventListener('dragleave', handleDragLeave);
    });
}

/**
 * Create draggable student avatars in the pool
 */
function createStudentAvatars() {
    const avatarsPool = document.getElementById('avatarsPool');
    avatarsPool.innerHTML = '';
    
    // Create 17 student avatars for optimal distribution
    for (let i = 0; i < 17; i++) {
        const avatar = studentAvatars[i % studentAvatars.length];
        const studentDiv = document.createElement('div');
        studentDiv.className = 'student-avatar';
        studentDiv.draggable = true;
        studentDiv.style.backgroundColor = avatar.bg;
        studentDiv.textContent = avatar.emoji;
        studentDiv.dataset.studentId = i;
        
        // Add drag event listeners
        studentDiv.addEventListener('dragstart', handleDragStart);
        studentDiv.addEventListener('dragend', handleDragEnd);
        
        // Add touch support for mobile
        studentDiv.addEventListener('touchstart', handleTouchStart, { passive: false });
        studentDiv.addEventListener('touchmove', handleTouchMove, { passive: false });
        studentDiv.addEventListener('touchend', handleTouchEnd, { passive: false });
        
        avatarsPool.appendChild(studentDiv);
    }
}

/**
 * Handle drag start event
 */
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.studentId);
    e.target.classList.add('dragging');
    
    // Highlight valid drop zones
    document.querySelectorAll('.column').forEach(col => col.classList.add('highlight'));
}

/**
 * Handle drag end event
 */
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    
    // Remove highlights
    document.querySelectorAll('.column').forEach(col => col.classList.remove('highlight'));
    document.querySelectorAll('.column-grid').forEach(grid => grid.classList.remove('drag-over'));
}

/**
 * Handle drag over event (required for drop to work)
 */
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

/**
 * Handle drag enter event
 */
function handleDragEnter(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

/**
 * Handle drag leave event
 */
function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

/**
 * Handle drop event - place student in column
 */
function handleDrop(e) {
    e.preventDefault();
    const studentId = e.dataTransfer.getData('text/plain');
    const studentElement = document.querySelector(`[data-student-id="${studentId}"]`);
    const column = e.currentTarget;
    const activity = column.id.replace('Column', '');
    
    if (studentElement && !studentElement.classList.contains('placed')) {
        // Clone the student avatar for the column
        const clonedStudent = studentElement.cloneNode(true);
        clonedStudent.classList.add('placed');
        clonedStudent.draggable = false;
        
        // Add to column
        column.appendChild(clonedStudent);
        
        // Remove from pool
        studentElement.remove();
        
        // Update graph data
        gameState.graphData[activity]++;
        
        // Update column count display
        updateColumnCount(activity);
        
        // Check if graph is complete
        checkGraphComplete();
        
        // Play success sound (simulated with visual feedback)
        column.classList.add('correct-animation');
        setTimeout(() => column.classList.remove('correct-animation'), 600);
    }
    
    // Clean up drag states
    e.currentTarget.classList.remove('drag-over');
    document.querySelectorAll('.column').forEach(col => col.classList.remove('highlight'));
}

/**
 * Touch event handlers for mobile support
 */
let draggedElement = null;
let touchOffset = { x: 0, y: 0 };

function handleTouchStart(e) {
    e.preventDefault();
    draggedElement = e.target;
    const touch = e.touches[0];
    const rect = draggedElement.getBoundingClientRect();
    touchOffset.x = touch.clientX - rect.left;
    touchOffset.y = touch.clientY - rect.top;
    
    draggedElement.classList.add('dragging');
    document.querySelectorAll('.column').forEach(col => col.classList.add('highlight'));
}

function handleTouchMove(e) {
    if (!draggedElement) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    draggedElement.style.position = 'fixed';
    draggedElement.style.left = (touch.clientX - touchOffset.x) + 'px';
    draggedElement.style.top = (touch.clientY - touchOffset.y) + 'px';
    draggedElement.style.zIndex = '1000';
    draggedElement.style.pointerEvents = 'none';
    
    // Check for drop zone
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropZone = elementBelow?.closest('.column-grid');
    
    document.querySelectorAll('.column-grid').forEach(grid => grid.classList.remove('drag-over'));
    if (dropZone) {
        dropZone.classList.add('drag-over');
    }
}

function handleTouchEnd(e) {
    if (!draggedElement) return;
    e.preventDefault();
    
    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropZone = elementBelow?.closest('.column-grid');
    
    if (dropZone && !draggedElement.classList.contains('placed')) {
        const activity = dropZone.id.replace('Column', '');
        
        // Clone and place student
        const clonedStudent = draggedElement.cloneNode(true);
        clonedStudent.classList.add('placed');
        clonedStudent.draggable = false;
        clonedStudent.style.position = '';
        clonedStudent.style.left = '';
        clonedStudent.style.top = '';
        clonedStudent.style.zIndex = '';
        clonedStudent.style.pointerEvents = '';
        
        dropZone.appendChild(clonedStudent);
        draggedElement.remove();
        
        gameState.graphData[activity]++;
        updateColumnCount(activity);
        checkGraphComplete();
        
        dropZone.classList.add('correct-animation');
        setTimeout(() => dropZone.classList.remove('correct-animation'), 600);
    } else {
        // Reset position
        draggedElement.style.position = '';
        draggedElement.style.left = '';
        draggedElement.style.top = '';
        draggedElement.style.zIndex = '';
        draggedElement.style.pointerEvents = '';
    }
    
    // Clean up
    draggedElement.classList.remove('dragging');
    document.querySelectorAll('.column').forEach(col => col.classList.remove('highlight'));
    document.querySelectorAll('.column-grid').forEach(grid => grid.classList.remove('drag-over'));
    draggedElement = null;
}

/**
 * Update the count display for a column
 */
function updateColumnCount(activity) {
    const column = document.querySelector(`[data-activity="${activity}"]`);
    let countDisplay = column.querySelector('.column-count');
    
    if (!countDisplay) {
        countDisplay = document.createElement('div');
        countDisplay.className = 'column-count';
        column.style.position = 'relative';
        column.appendChild(countDisplay);
    }
    
    countDisplay.textContent = gameState.graphData[activity];
}

/**
 * Check if the graph building is complete
 */
function checkGraphComplete() {
    const totalStudents = Object.values(gameState.graphData).reduce((sum, count) => sum + count, 0);
    const remainingStudents = document.querySelectorAll('#avatarsPool .student-avatar').length;
    
    if (remainingStudents === 0 || totalStudents >= 12) {
        document.getElementById('completeGraphBtn').disabled = false;
        document.getElementById('completeGraphBtn').textContent = `Complete Graph (${totalStudents} students placed)`;
    }
}

/**
 * Create reference graph for assessment phase - New function to copy graph to reference area
 */
function createReferenceGraph() {
    const activities = ['reading', 'sports', 'art'];
    
    activities.forEach(activity => {
        const originalColumn = document.getElementById(`${activity}Column`);
        const referenceColumn = document.getElementById(`reference${activity.charAt(0).toUpperCase() + activity.slice(1)}Column`);
        
        // Clear reference column
        referenceColumn.innerHTML = '';
        
        // Copy all student avatars from original column to reference
        const students = originalColumn.querySelectorAll('.student-avatar.placed');
        students.forEach(student => {
            const referenceStudent = document.createElement('div');
            referenceStudent.className = 'reference-avatar';
            referenceStudent.style.backgroundColor = student.style.backgroundColor;
            referenceStudent.textContent = student.textContent;
            referenceColumn.appendChild(referenceStudent);
        });
    });
}

/**
 * Clear reference columns - New function to clear reference graph
 */
function clearReferenceColumns() {
    const referenceColumns = ['referenceReadingColumn', 'referenceSportsColumn', 'referenceArtColumn'];
    referenceColumns.forEach(columnId => {
        const column = document.getElementById(columnId);
        if (column) {
            column.innerHTML = '';
        }
    });
}

/**
 * Start the assessment phase - Modified to create reference graph
 */
function startAssessment() {
    gameState.currentPhase = 'assessment';
    gameState.currentQuestion = 0;
    gameState.questionStartTime = Date.now();
    
    // Create reference graph before switching phases
    createReferenceGraph();
    
    // Switch to assessment phase
    document.getElementById('graphPhase').classList.remove('active');
    document.getElementById('assessmentPhase').classList.add('active');
    
    updateProgress();
    generateQuestion();
    
    // Provide audio instruction (simulated with visual feedback)
    showFeedback('Let\'s answer some questions about your graph!', 'correct');
}

/**
 * Generate and display a question based on the graph data
 */
function generateQuestion() {
    const questionContainer = document.getElementById('questionText');
    const optionsContainer = document.getElementById('questionOptions');
    const feedbackContainer = document.getElementById('feedback');
    
    // Clear previous content
    optionsContainer.innerHTML = '';
    feedbackContainer.innerHTML = '';
    document.getElementById('nextQuestionBtn').style.display = 'none';
    
    let question, options, correctAnswer;
    const activities = Object.keys(gameState.graphData);
    const questionType = questionTemplates[gameState.currentQuestion % questionTemplates.length];
    
    switch (questionType.type) {
        case 'count':
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            question = questionType.template.replace('{activity}', randomActivity);
            options = questionType.generateOptions(randomActivity);
            correctAnswer = gameState.graphData[randomActivity];
            break;
            
        case 'most_popular':
            question = questionType.template;
            options = questionType.generateOptions();
            const maxCount = Math.max(...Object.values(gameState.graphData));
            correctAnswer = activities.find(act => gameState.graphData[act] === maxCount);
            break;
            
        case 'difference':
            const sortedActivities = activities.sort((a, b) => gameState.graphData[b] - gameState.graphData[a]);
            const act1 = sortedActivities[0];
            const act2 = sortedActivities[sortedActivities.length - 1];
            question = questionType.template.replace('{activity1}', act1).replace('{activity2}', act2);
            options = questionType.generateOptions(act1, act2);
            correctAnswer = Math.abs(gameState.graphData[act1] - gameState.graphData[act2]);
            break;
            
        case 'total':
            question = questionType.template;
            options = questionType.generateOptions();
            correctAnswer = Object.values(gameState.graphData).reduce((sum, count) => sum + count, 0);
            break;
    }
    
    questionContainer.textContent = question;
    
    // Create option buttons
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = typeof option === 'string' ? 
            option.charAt(0).toUpperCase() + option.slice(1) : option;
        button.addEventListener('click', () => checkAnswer(option, correctAnswer, button));
        optionsContainer.appendChild(button);
    });
    
    // Store correct answer for hint system
    gameState.currentCorrectAnswer = correctAnswer;
}

/**
 * Check if the selected answer is correct - Modified to not show correct answer when incorrect
 */
function checkAnswer(selectedAnswer, correctAnswer, buttonElement) {
    const isCorrect = selectedAnswer === correctAnswer;
    const timeTaken = Date.now() - gameState.questionStartTime;
    
    // Record attempt
    gameState.attempts.push({
        question: gameState.currentQuestion,
        answer: selectedAnswer,
        correct: isCorrect,
        timeTaken: timeTaken
    });
    
    // Disable all option buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        if (btn === buttonElement) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
    });
    
    // Show feedback - Modified to not reveal correct answer when incorrect
    if (isCorrect) {
        gameState.correctAnswers++;
        showFeedback('✅ Excellent! That\'s correct!', 'correct');
        buttonElement.classList.add('correct-animation');
    } else {
        // Modified: Only show that it's incorrect, don't reveal the correct answer
        showFeedback('❌ Not quite right. Look at the graph and try to count carefully.', 'incorrect');
        // Removed: Don't highlight the correct answer when incorrect
    }
    
    // Show next button after delay
    setTimeout(() => {
        document.getElementById('nextQuestionBtn').style.display = 'block';
    }, 1500);
}

/**
 * Move to the next question or show results
 */
function nextQuestion() {
    gameState.currentQuestion++;
    
    if (gameState.currentQuestion >= gameState.totalQuestions) {
        showResults();
    } else {
        gameState.questionStartTime = Date.now();
        updateProgress();
        generateQuestion();
    }
}

/**
 * Display the final results
 */
function showResults() {
    gameState.currentPhase = 'results';
    
    // Switch to results phase
    document.getElementById('assessmentPhase').classList.remove('active');
    document.getElementById('resultsPhase').classList.add('active');
    
    const totalTime = Math.round((Date.now() - gameState.startTime) / 1000);
    const accuracy = Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100);
    
    const resultsText = document.getElementById('resultsText');
    resultsText.innerHTML = `
        <div style="font-size: 18px; margin-bottom: 15px;">
            <strong>Your Results:</strong>
        </div>
        <div style="font-size: 16px; line-height: 1.6;">
            📊 Questions Correct: ${gameState.correctAnswers}/${gameState.totalQuestions}<br>
            🎯 Accuracy: ${accuracy}%<br>
            ⏱️ Total Time: ${totalTime} seconds<br>
            <br>
            <div style="background: rgba(76, 175, 80, 0.1); padding: 10px; border-radius: 6px; margin-top: 10px;">
                ${accuracy >= 75 ? 
                    '🌟 Outstanding work! You have mastered picture graphs!' : 
                    accuracy >= 50 ? 
                    '👍 Good job! Keep practicing to improve your graph reading skills.' :
                    '💪 Keep trying! Picture graphs will become easier with practice.'}
            </div>
        </div>
    `;
    
    updateProgress();
    
    console.log('Assessment completed:', {
        correctAnswers: gameState.correctAnswers,
        totalQuestions: gameState.totalQuestions,
        accuracy: accuracy,
        totalTime: totalTime,
        attempts: gameState.attempts
    });
}

/**
 * Restart the entire game
 */
function restartGame() {
    initializeGame();
    createStudentAvatars();
    updateProgress();
}

/**
 * Update the progress bar
 */
function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    let progress = 0;
    let text = '';
    
    switch (gameState.currentPhase) {
        case 'graph':
            const totalPlaced = Object.values(gameState.graphData).reduce((sum, count) => sum + count, 0);
            progress = Math.min(totalPlaced / 12 * 50, 50); // 50% for graph building
            text = `Building Graph... (${totalPlaced} students placed)`;
            break;
            
        case 'assessment':
            progress = 50 + (gameState.currentQuestion / gameState.totalQuestions * 50);
            text = `Question ${gameState.currentQuestion + 1} of ${gameState.totalQuestions}`;
            break;
            
        case 'results':
            progress = 100;
            text = 'Complete! 🎉';
            break;
    }
    
    progressBar.style.width = progress + '%';
    progressText.textContent = text;
}

/**
 * Show feedback message
 */
function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
}

/**
 * Show hint for current question - Modified hints for new behavior
 */
function showHint() {
    const hintText = document.getElementById('hintText');
    let hint = '';
    
    if (gameState.currentPhase === 'graph') {
        hint = 'Drag each student avatar to the column of their favorite activity. Try to distribute them evenly!';
    } else if (gameState.currentPhase === 'assessment') {
        const questionType = questionTemplates[gameState.currentQuestion % questionTemplates.length];
        switch (questionType.type) {
            case 'count':
                hint = 'Look at the reference graph on the left. Count the number of student avatars in the specific column carefully.';
                break;
            case 'most_popular':
                hint = 'Compare the heights of all three columns in the reference graph. Which one has the most students?';
                break;
            case 'difference':
                hint = 'Count students in both columns mentioned in the question, then subtract the smaller number from the larger number.';
                break;
            case 'total':
                hint = 'Add up all the students from all three columns in the reference graph.';
                break;
        }
    }
    
    hintText.textContent = hint;
    hintText.classList.add('show');
    
    setTimeout(() => {
        hintText.classList.remove('show');
    }, 4000);
}

/**
 * Clear all columns and reset graph data
 */
function clearColumns() {
    document.querySelectorAll('.column-grid').forEach(column => {
        column.innerHTML = '';
    });
    
    document.querySelectorAll('.column-count').forEach(count => {
        count.remove();
    });
    
    gameState.graphData = { reading: 0, sports: 0, art: 0 };
}

/**
 * Utility function to shuffle array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Add keyboard navigation support
    if (e.key === 'Escape') {
        // Hide hints
        document.getElementById('hintText').classList.remove('show');
    }
    
    if (e.key === 'h' || e.key === 'H') {
        // Show hint with keyboard shortcut
        showHint();
    }
});

// Performance optimization - cleanup event listeners when not needed
window.addEventListener('beforeunload', function() {
    // Cleanup any remaining event listeners
    document.querySelectorAll('.student-avatar').forEach(avatar => {
        avatar.removeEventListener('dragstart', handleDragStart);
        avatar.removeEventListener('dragend', handleDragEnd);
    });
});