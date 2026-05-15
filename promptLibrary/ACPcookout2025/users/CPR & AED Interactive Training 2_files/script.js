// Global variables for tracking progress and state
let currentModule = 1;
let totalModules = 8;
let score = 0;
let maxScore = 100;
let achievements = {
    chainMaster: false,
    symptomDetective: false,
    cprExpert: false
};

// Module-specific state
let organClicked = { heart: false, lungs: false };
let chainCorrect = false;
let symptomScore = 0;
let cprStep = 1;
let compressionCount = 0;
let ventilationCount = 0;
let cycleCount = 1;
let isVentilationMode = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    initializeDragAndDrop();
    initializeTooltips();
    
    // Add touch event listeners for mobile
    if ('ontouchstart' in window) {
        document.addEventListener('touchstart', handleTouch);
        document.addEventListener('touchmove', handleTouch);
        document.addEventListener('touchend', handleTouch);
    }
});

// Progress tracking
function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const percentage = (currentModule / totalModules) * 100;
    
    progressBar.style.width = percentage + '%';
    progressText.textContent = `Module ${currentModule} of ${totalModules}`;
}

// Navigation between modules
function nextModule() {
    // Hide current module
    document.getElementById(`module${currentModule}`).classList.remove('active');
    
    // Move to next module
    currentModule++;
    updateProgress();
    
    // Show next module or completion screen
    if (currentModule <= totalModules) {
        document.getElementById(`module${currentModule}`).classList.add('active');
        
        // Initialize module-specific functionality
        initializeCurrentModule();
    } else {
        showCompletion();
    }
}

// Initialize current module functionality
function initializeCurrentModule() {
    switch(currentModule) {
        case 3:
            resetChainBuilder();
            break;
        case 7:
            resetCPRAssessment();
            break;
        case 8:
            resetCPRPractice();
            break;
    }
}

// Module 1: Choice handling
function makeChoice(choice) {
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    let feedback = '';
    let isCorrect = false;
    
    switch(choice) {
        case 'panic':
            feedback = '❌ Panicking won\'t help! Stay calm and assess the situation.';
            break;
        case 'call':
            feedback = '⚠️ Good instinct, but first ensure the scene is safe!';
            score += 5;
            break;
        case 'assess':
            feedback = '✅ Excellent! Always check for danger first - this is the "D" in DRSABC.';
            score += 15;
            isCorrect = true;
            break;
    }
    
    // Show feedback with tooltip
    showTooltip(feedback, 3000);
    
    // Enable next button after delay
    setTimeout(() => {
        document.getElementById('nextBtn2').disabled = false;
    }, 2000);
}

// Module 2: Organ information
function showOrganInfo(organ) {
    const organInfo = document.getElementById('organInfo');
    let info = '';
    
    if (organ === 'heart') {
        info = '❤️ <strong>Heart Function:</strong> Acts as a pump, circulating blood throughout your body. Size of your clenched fist, located between your lungs.';
        organClicked.heart = true;
    } else if (organ === 'lungs') {
        info = '🫁 <strong>Lung Function:</strong> Gas exchange chambers where oxygen enters the blood and carbon dioxide is removed. Located on either side of your chest.';
        organClicked.lungs = true;
    }
    
    organInfo.innerHTML = info;
    
    // Check if both organs clicked
    if (organClicked.heart && organClicked.lungs) {
        document.getElementById('nextBtn2').disabled = false;
        score += 10;
    }
}

// Module 3: Chain of Survival drag and drop
function initializeDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const dropZone = document.getElementById('dropZone');
    
    if (!dropZone) return;
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragend', handleDragEnd);
    });
    
    const slots = document.querySelectorAll('.chain-slot');
    slots.forEach(slot => {
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.order);
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const draggedOrder = e.dataTransfer.getData('text/plain');
    const slotPosition = e.target.dataset.position;
    
    if (draggedOrder === slotPosition) {
        // Correct placement
        const draggedElement = document.querySelector(`[data-order="${draggedOrder}"]`);
        e.target.appendChild(draggedElement.cloneNode(true));
        e.target.classList.add('filled');
        draggedElement.style.display = 'none';
        
        checkChainCompletion();
    } else {
        // Incorrect placement - show feedback
        showTooltip('❌ Not quite right! Think about the logical order of emergency response.', 2000);
    }
}

function checkChainCompletion() {
    const filledSlots = document.querySelectorAll('.chain-slot.filled').length;
    if (filledSlots === 4) {
        chainCorrect = true;
        achievements.chainMaster = true;
        score += 20;
        document.getElementById('chainFeedback').innerHTML = '✅ Perfect! You\'ve built the Chain of Survival correctly!';
        document.getElementById('chainFeedback').className = 'feedback success';
        document.getElementById('nextBtn3').disabled = false;
    }
}

function resetChainBuilder() {
    const slots = document.querySelectorAll('.chain-slot');
    const links = document.querySelectorAll('.draggable');
    
    slots.forEach(slot => {
        slot.innerHTML = slot.dataset.position;
        slot.classList.remove('filled');
    });
    
    links.forEach(link => {
        link.style.display = 'block';
    });
    
    document.getElementById('chainFeedback').innerHTML = '';
    document.getElementById('nextBtn3').disabled = true;
}

// Module 4: Time challenge
function checkTime(minutes) {
    const buttons = document.querySelectorAll('.timer-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    let feedback = '';
    if (minutes === 5) {
        feedback = '✅ Correct! Brain damage begins after 4-6 minutes without oxygen. Every second counts!';
        score += 15;
        buttons[1].classList.add('correct');
    } else {
        feedback = '❌ Not quite. Brain damage begins after 4-6 minutes without oxygen circulation.';
        buttons.forEach(btn => {
            if (btn.textContent.includes(minutes.toString())) {
                btn.classList.add('incorrect');
            }
        });
    }
    
    document.getElementById('timeFeedback').innerHTML = feedback;
    document.getElementById('timeFeedback').className = minutes === 5 ? 'feedback success' : 'feedback error';
    
    setTimeout(() => {
        document.getElementById('nextBtn4').disabled = false;
    }, 2000);
}

// Module 5: Symptom checker
function selectSymptom(card, isCorrect) {
    if (card.classList.contains('selected-correct') || card.classList.contains('selected-incorrect')) {
        return; // Already selected
    }
    
    if (isCorrect) {
        card.classList.add('selected-correct');
        symptomScore++;
        score += 5;
    } else {
        card.classList.add('selected-incorrect');
    }
    
    updateSymptomScore();
    
    // Check if all correct symptoms are selected
    if (symptomScore === 4) {
        achievements.symptomDetective = true;
        setTimeout(() => {
            document.getElementById('nextBtn5').disabled = false;
        }, 1000);
    }
}

function updateSymptomScore() {
    document.getElementById('scoreDisplay').textContent = `Score: ${symptomScore}/4`;
}

// Module 6: Risk factor sorting
function initializeRiskSorting() {
    const riskFactors = document.querySelectorAll('.risk-factor');
    const dropAreas = document.querySelectorAll('.drop-area');
    
    riskFactors.forEach(factor => {
        factor.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                text: e.target.textContent,
                type: e.target.dataset.type
            }));
        });
    });
    
    dropAreas.forEach(area => {
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('drag-over');
        });
        
        area.addEventListener('dragleave', (e) => {
            area.classList.remove('drag-over');
        });
        
        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('drag-over');
            
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            const category = area.dataset.category;
            
            if (data.type === category) {
                // Correct placement
                const newFactor = document.createElement('div');
                newFactor.className = 'risk-factor placed';
                newFactor.textContent = data.text;
                area.appendChild(newFactor);
                
                // Remove from original location
                const original = Array.from(document.querySelectorAll('.risk-factor')).find(f => 
                    f.textContent === data.text && !f.classList.contains('placed')
                );
                if (original) original.style.display = 'none';
                
                score += 3;
                checkRiskSortingCompletion();
            } else {
                showTooltip('❌ Think about whether this factor can be changed through lifestyle choices.', 2000);
            }
        });
    });
}

function checkRiskSortingCompletion() {
    const placedFactors = document.querySelectorAll('.risk-factor.placed').length;
    if (placedFactors === 6) {
        document.getElementById('riskFeedback').innerHTML = '✅ Excellent! You understand which risk factors you can control.';
        document.getElementById('riskFeedback').className = 'feedback success';
        document.getElementById('nextBtn6').disabled = false;
    }
}

// Module 7: CPR Assessment steps
function completeStep(stepNumber) {
    const currentStep = document.getElementById(`step${stepNumber}`);
    const nextStep = document.getElementById(`step${stepNumber + 1}`);
    
    currentStep.classList.remove('active');
    currentStep.querySelector('.step-btn').disabled = true;
    score += 3;
    
    if (nextStep) {
        nextStep.classList.remove('hidden');
        nextStep.classList.add('active');
    } else {
        // All steps completed
        document.getElementById('nextBtn7').disabled = false;
        achievements.cprExpert = true;
    }
}

function resetCPRAssessment() {
    for (let i = 2; i <= 6; i++) {
        const step = document.getElementById(`step${i}`);
        step.classList.add('hidden');
        step.classList.remove('active');
        step.querySelector('.step-btn').disabled = false;
    }
    document.getElementById('step1').classList.add('active');
}

// Module 8: CPR Practice
function resetCPRPractice() {
    compressionCount = 0;
    ventilationCount = 0;
    cycleCount = 1;
    isVentilationMode = false;
    
    document.getElementById('compressionCount').textContent = '0';
    document.getElementById('ventilationCount').textContent = '0';
    document.getElementById('cycleCount').textContent = '1';
    document.getElementById('instructions').textContent = 'Click the chest 30 times for compressions';
    
    // Add click event to compression zone
    document.getElementById('compressionZone').addEventListener('click', performCompression);
    document.getElementById('ventilationZone').addEventListener('click', performVentilation);
}

function performCompression() {
    if (isVentilationMode) return;
    
    compressionCount++;
    document.getElementById('compressionCount').textContent = compressionCount;
    
    // Visual feedback
    const chest = document.getElementById('compressionPoint');
    chest.style.transform = 'scale(0.9)';
    setTimeout(() => {
        chest.style.transform = 'scale(1)';
    }, 100);
    
    if (compressionCount === 30) {
        // Switch to ventilation mode
        isVentilationMode = true;
        document.getElementById('compressionZone').classList.add('hidden');
        document.getElementById('ventilationZone').classList.remove('hidden');
        document.getElementById('instructions').textContent = 'Click the airway 2 times for ventilations';
    }
}

function performVentilation() {
    if (!isVentilationMode) return;
    
    ventilationCount++;
    document.getElementById('ventilationCount').textContent = ventilationCount;
    
    // Visual feedback
    const airway = document.getElementById('mouthPiece');
    airway.style.transform = 'scale(1.2)';
    setTimeout(() => {
        airway.style.transform = 'scale(1)';
    }, 200);
    
    if (ventilationCount === 2) {
        // Complete cycle
        completeCycle();
    }
}

function completeCycle() {
    cycleCount++;
    compressionCount = 0;
    ventilationCount = 0;
    isVentilationMode = false;
    
    document.getElementById('compressionCount').textContent = '0';
    document.getElementById('ventilationCount').textContent = '0';
    document.getElementById('cycleCount').textContent = cycleCount;
    
    document.getElementById('compressionZone').classList.remove('hidden');
    document.getElementById('ventilationZone').classList.add('hidden');
    
    if (cycleCount <= 5) {
        document.getElementById('instructions').textContent = 'Click the chest 30 times for compressions';
        score += 4;
    } else {
        // All cycles completed
        document.getElementById('instructions').textContent = '✅ CPR cycles completed!';
        document.getElementById('nextBtn8').disabled = false;
        score += 10;
    }
}

// Completion and scoring
function completeCourse() {
    showCompletion();
}

function showCompletion() {
    document.getElementById(`module${currentModule}`).classList.remove('active');
    document.getElementById('completion').classList.add('active');
    
    // Update final score
    document.getElementById('finalScore').textContent = `Final Score: ${score}/${maxScore}`;
    
    // Show achievements
    if (achievements.chainMaster) {
        document.getElementById('chainMaster').style.opacity = '1';
    }
    if (achievements.symptomDetective) {
        document.getElementById('symptomDetective').style.opacity = '1';
    }
    if (achievements.cprExpert) {
        document.getElementById('cprExpert').style.opacity = '1';
    }
}

function restartCourse() {
    // Reset all variables
    currentModule = 1;
    score = 0;
    achievements = { chainMaster: false, symptomDetective: false, cprExpert: false };
    organClicked = { heart: false, lungs: false };
    symptomScore = 0;
    
    // Hide completion and show first module
    document.getElementById('completion').classList.remove('active');
    document.getElementById('module1').classList.add('active');
    
    // Reset all buttons and states
    document.querySelectorAll('.next-btn').forEach(btn => btn.disabled = true);
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('correct', 'incorrect');
    });
    
    updateProgress();
}

// Tooltip system
function initializeTooltips() {
    const tooltip = document.getElementById('tooltip');
    
    // Add hover events for elements that need tooltips
    document.addEventListener('mouseover', (e) => {
        if (e.target.dataset.tooltip) {
            showTooltip(e.target.dataset.tooltip, 0, e.pageX, e.pageY);
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.dataset.tooltip) {
            hideTooltip();
        }
    });
}

function showTooltip(text, duration = 0, x = null, y = null) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = text;
    tooltip.classList.add('show');
    
    if (x !== null && y !== null) {
        tooltip.style.left = x + 'px';
        tooltip.style.top = (y - 40) + 'px';
    } else {
        // Center tooltip
        tooltip.style.left = '50%';
        tooltip.style.top = '50%';
        tooltip.style.transform = 'translate(-50%, -50%)';
    }
    
    if (duration > 0) {
        setTimeout(hideTooltip, duration);
    }
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// Touch event handling for mobile devices
function handleTouch(e) {
    // Prevent default touch behaviors that might interfere
    if (e.target.classList.contains('draggable') || 
        e.target.classList.contains('choice-btn') ||
        e.target.classList.contains('symptom-card')) {
        e.preventDefault();
    }
}

// Initialize drag and drop for risk factors when module loads
document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization to ensure DOM is ready
    setTimeout(() => {
        initializeRiskSorting();
    }, 100);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('choice-btn') || 
            e.target.classList.contains('step-btn') ||
            e.target.classList.contains('next-btn')) {
            e.target.click();
        }
    }
});

// Performance optimization: Lazy load module content
function lazyLoadModule(moduleNumber) {
    // This function can be extended to load module content dynamically
    // For now, all content is pre-loaded for offline functionality
    return true;
}

// Analytics tracking (placeholder for future implementation)
function trackProgress(event, data) {
    // This function can be extended to track user progress
    // console.log(`Event: ${event}`, data);
}

// Accessibility improvements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}