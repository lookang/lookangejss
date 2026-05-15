// Interactive CPR & AED Training System
// This system creates an engaging, step-by-step learning experience with immediate feedback

class CPRTrainingSystem {
    constructor() {
        // Initialize system state
        this.currentModule = 0;
        this.totalModules = 6;
        this.score = 0;
        this.totalQuestions = 0;
        this.moduleProgress = {};
        
        // Initialize DOM elements
        this.initializeElements();
        
        // Load first module
        this.loadModule(0);
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize progress tracking
        this.updateProgress();
    }

    initializeElements() {
        // Get references to key DOM elements for efficient access
        this.contentArea = document.getElementById('contentArea');
        this.progressBar = document.getElementById('progressBar');
        this.progressText = document.getElementById('progressText');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.tooltip = document.getElementById('tooltip');
        this.modal = document.getElementById('modal');
        this.scoreTracker = document.getElementById('scoreTracker');
        this.currentScoreEl = document.getElementById('currentScore');
        this.totalScoreEl = document.getElementById('totalScore');
    }

    setupEventListeners() {
        // Navigation button event listeners
        this.prevBtn.addEventListener('click', () => this.previousModule());
        this.nextBtn.addEventListener('click', () => this.nextModule());
        
        // Modal close event listener
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Tooltip functionality for mobile and desktop
        document.addEventListener('mouseover', (e) => this.showTooltip(e));
        document.addEventListener('mouseout', () => this.hideTooltip());
        
        // Touch support for tooltips
        document.addEventListener('touchstart', (e) => this.handleTouch(e));
    }

    // Module content data structure with interactive elements
    getModuleContent() {
        return [
            {
                id: 1,
                title: "🫀 Understanding the Heart & Chain of Survival",
                icon: "🫀",
                scenario: {
                    title: "Emergency Response Scenario",
                    content: "You're at a shopping mall when someone suddenly collapses. Understanding the Chain of Survival could mean the difference between life and death."
                },
                challenge: {
                    type: "knowledge_check",
                    title: "Heart & Lung Function Challenge",
                    question: "What is the primary function of the heart in our body?",
                    options: [
                        "To filter blood and remove toxins",
                        "To pump blood around the body like a pump",
                        "To produce red blood cells",
                        "To regulate body temperature"
                    ],
                    correct: 1,
                    feedback: {
                        correct: "✅ Excellent! The heart functions as a pump, situated in the center of the chest between the lungs. It's about the size of your clenched fist and pumps blood throughout the body.",
                        incorrect: "❌ Not quite. The heart's primary function is to pump blood around the body. It's located in the center of your chest and is about the size of your clenched fist."
                    }
                },
                practice: {
                    title: "🔍 Chain of Survival Analysis",
                    content: "The Chain of Survival has 4 critical links. Any missing link decreases survival chances!",
                    steps: [
                        "Early Recognition & Call for Help (Call 995)",
                        "Early CPR (Chest compressions + rescue breathing)",
                        "Early Defibrillation (AED use)",
                        "Early Advanced Care (Paramedics & hospital)"
                    ]
                },
                tooltip: "The Chain of Survival represents the critical steps needed to maximize survival from cardiac arrest. Each link is essential!"
            },
            {
                id: 2,
                title: "⚡ Clinical vs Biological Death",
                icon: "⚡",
                scenario: {
                    title: "Time-Critical Emergency",
                    content: "Brain cells can only survive 4-6 minutes without oxygen. Understanding the difference between clinical and biological death is crucial for effective response."
                },
                challenge: {
                    type: "decision_tree",
                    title: "Emergency Timeline Decision",
                    question: "A person has been in cardiac arrest for 3 minutes. What is their current status?",
                    options: [
                        "Biological death - too late to help",
                        "Clinical death - immediate CPR can still save them",
                        "Brain death - only organs can be saved",
                        "Reversible death - they will recover naturally"
                    ],
                    correct: 1,
                    feedback: {
                        correct: "✅ Correct! At 3 minutes, this is clinical death. The heart has stopped pumping, but brain damage hasn't started yet. Immediate CPR can still save their life!",
                        incorrect: "❌ At 3 minutes, this is clinical death. The person is still saveable with immediate CPR! Brain damage typically begins after 4-6 minutes without oxygen."
                    }
                },
                practice: {
                    title: "⏱️ Critical Timeline Understanding",
                    content: "In Singapore, cardiac arrest is the 2nd most common cause of death, with 2/3 occurring outside hospitals.",
                    steps: [
                        "0-4 minutes: Clinical Death - Full recovery possible with CPR",
                        "4-6 minutes: Brain cells begin to die without oxygen",
                        "6+ minutes: Biological Death - Irreversible brain damage begins",
                        "Remember: Every minute counts in cardiac arrest!"
                    ]
                },
                tooltip: "Clinical death is when the heart stops but the person can still be saved. Biological death occurs when brain damage becomes irreversible."
            },
            {
                id: 3,
                title: "🚨 Recognizing Cardiac Arrest & Heart Attack",
                icon: "🚨",
                scenario: {
                    title: "Symptom Recognition Challenge",
                    content: "Your colleague suddenly grabs their chest and looks distressed. Can you identify if this is a heart attack and respond appropriately?"
                },
                challenge: {
                    type: "symptom_checker",
                    title: "Heart Attack Symptom Identification",
                    question: "Which of these is the MOST characteristic symptom of a heart attack?",
                    options: [
                        "Sharp, stabbing pain that comes and goes",
                        "Squeezing, heavy chest tightness lasting 20+ minutes",
                        "Mild chest discomfort after exercise",
                        "Sudden severe headache with vision changes"
                    ],
                    correct: 1,
                    feedback: {
                        correct: "✅ Perfect! Heart attack chest pain is typically described as squeezing, heavy, or tight, usually lasting more than 20 minutes and often radiating to arms, neck, or jaw.",
                        incorrect: "❌ Heart attack pain is typically squeezing or heavy, not sharp or stabbing. It usually lasts more than 20 minutes and may radiate to the shoulder, neck, jaw, or arm."
                    }
                },
                practice: {
                    title: "🔍 Complete Symptom Assessment",
                    content: "Heart attack symptoms can vary, but knowing the key signs saves lives:",
                    steps: [
                        "Chest: Squeezing, heavy, tight feeling (center chest)",
                        "Radiation: Pain spreads to shoulder, neck, jaw, arm, upper abdomen",
                        "Duration: Usually lasts more than 20 minutes",
                        "Other signs: Sweating, nausea, shortness of breath, weakness",
                        "Note: Some victims may think it's just indigestion!"
                    ]
                },
                tooltip: "Heart attack symptoms can be subtle. The classic 'crushing chest pain' doesn't always occur, especially in women and elderly patients."
            },
            {
                id: 4,
                title: "💪 Risk Factors & Heart-Healthy Living",
                icon: "💪",
                scenario: {
                    title: "Personal Risk Assessment",
                    content: "Understanding risk factors helps prevent heart disease. Some factors you can't change, but many you can control through lifestyle choices."
                },
                challenge: {
                    type: "risk_assessment",
                    title: "Modifiable Risk Factors Challenge",
                    question: "Which risk factor for heart disease CAN be changed through lifestyle modifications?",
                    options: [
                        "Family history of heart disease",
                        "Being male gender",
                        "Cigarette smoking and high blood pressure",
                        "Increasing age"
                    ],
                    correct: 2,
                    feedback: {
                        correct: "✅ Excellent! Smoking, high blood pressure, high cholesterol, diabetes, lack of exercise, stress, and obesity are all modifiable risk factors that you can change!",
                        incorrect: "❌ While heredity, gender, and age cannot be changed, lifestyle factors like smoking, blood pressure, exercise, and diet can be modified to reduce heart disease risk."
                    }
                },
                practice: {
                    title: "🌟 Prudent Heart Living Plan",
                    content: "Create your heart-healthy lifestyle plan:",
                    steps: [
                        "🚭 No smoking - Single most important change",
                        "🥗 Eat wisely - Less oil, more fruits & vegetables",
                        "🏃 Exercise regularly - Strengthens heart muscle",
                        "⚖️ Maintain healthy weight - Reduces heart workload",
                        "🩺 Control blood pressure - Monitor and manage",
                        "😌 Manage stress - Practice relaxation techniques"
                    ]
                },
                tooltip: "Prudent heart living can reduce your risk of heart attack by up to 80%. Small changes make a big difference!"
            },
            {
                id: 5,
                title: "🫁 CPR Assessment & Technique",
                icon: "🫁",
                scenario: {
                    title: "CPR Emergency Response",
                    content: "You find someone unconscious and unresponsive. You must quickly assess if CPR is needed and perform it correctly. Remember: CPR can save lives when done right!"
                },
                challenge: {
                    type: "procedure_check",
                    title: "CPR Assessment Sequence",
                    question: "What is the correct sequence for assessing if someone needs CPR?",
                    options: [
                        "Check pulse, then breathing, then responsiveness",
                        "Check breathing, then pulse, then responsiveness",
                        "Check responsiveness, then breathing, then pulse",
                        "Check for injuries, then breathing, then pulse"
                    ],
                    correct: 2,
                    feedback: {
                        correct: "✅ Perfect! The correct sequence is: 1) Check responsiveness (tap & shout), 2) Check breathing (look for chest rise), 3) Check pulse (carotid artery). Each check takes up to 10 seconds.",
                        incorrect: "❌ Remember the sequence: Responsiveness first (tap & shout), then breathing (look for chest rise), then pulse (carotid artery). Each assessment takes up to 10 seconds."
                    }
                },
                practice: {
                    title: "🎯 CPR Technique Mastery",
                    content: "Master the CPR technique - 30 compressions : 2 ventilations",
                    steps: [
                        "Hand position: Heel of palm on center of chest",
                        "Compression depth: Minimum 5cm deep",
                        "Compression rate: 100-120 per minute",
                        "Count: '1 and 2 and 3 and 4 and FIVE and...'",
                        "Ventilations: 400-600ml air volume per breath",
                        "Cycles: 5 cycles = 1 round of CPR"
                    ]
                },
                tooltip: "High-quality CPR doubles or triples survival chances. Push hard, push fast, allow complete recoil, and minimize interruptions."
            },
            {
                id: 6,
                title: "⚡ AED Operation & Integration",
                icon: "⚡",
                scenario: {
                    title: "AED Emergency Response",
                    content: "The AED has arrived during your CPR efforts. Proper AED use combined with CPR gives the victim the best chance of survival. You must act quickly and safely."
                },
                challenge: {
                    type: "safety_check",
                    title: "AED Safety Assessment",
                    question: "Before using an AED, what safety checks must you perform?",
                    options: [
                        "Check if victim is breathing normally",
                        "Ensure area is safe from water, metal surfaces, and flammable gases",
                        "Confirm victim's age and weight",
                        "Check if victim has a pulse"
                    ],
                    correct: 1,
                    feedback: {
                        correct: "✅ Excellent! Safety first! Check for water (conducts electricity), metal surfaces (conducts electricity), and flammable gases (fire risk). Also ensure the victim is unresponsive, not breathing, and has no pulse.",
                        incorrect: "❌ Safety is critical with AEDs! You must ensure the area is free from water, metal surfaces, and flammable gases before using the AED. These can conduct electricity and cause harm."
                    }
                },
                practice: {
                    title: "🔧 AED Operation Protocol",
                    content: "Follow the complete AED protocol for maximum effectiveness:",
                    steps: [
                        "Confirm cardiac arrest (no response, no breathing, no pulse)",
                        "Ensure safety (no water, metal, flammable gases)",
                        "Prepare chest (remove hair, dry skin, remove jewelry)",
                        "Apply pads correctly (upper right chest, lower left side)",
                        "Follow AED voice prompts exactly",
                        "Continue CPR between shocks as directed",
                        "Maximum 6 shocks per episode"
                    ]
                },
                tooltip: "AEDs are designed to be user-friendly, but proper training ensures safe and effective use. The machine guides you through each step."
            }
        ];
    }

    loadModule(moduleIndex) {
        // Load and display module content with smooth animation
        const modules = this.getModuleContent();
        const module = modules[moduleIndex];
        
        if (!module) return;

        // Create module HTML structure
        const moduleHTML = `
            <div class="module" data-module="${module.id}">
                <div class="module-header" data-tooltip="${module.tooltip}">
                    <span class="module-icon">${module.icon}</span>
                    <h2 class="module-title">${module.title}</h2>
                </div>
                
                <div class="scenario-box">
                    <div class="scenario-title">🎯 Scenario Setup</div>
                    <p>${module.scenario.content}</p>
                </div>
                
                <div class="interactive-challenge">
                    <div class="challenge-header">
                        <span class="challenge-icon">⚡</span>
                        <span class="challenge-title">${module.challenge.title}</span>
                    </div>
                    <div class="question-container">
                        <div class="question">${module.challenge.question}</div>
                        <div class="options" data-question-id="${module.id}">
                            ${module.challenge.options.map((option, index) => 
                                `<div class="option" data-option="${index}">${option}</div>`
                            ).join('')}
                        </div>
                        <div class="feedback" id="feedback-${module.id}" style="display: none;"></div>
                    </div>
                </div>
                
                <div class="practice-activity">
                    <div class="challenge-header">
                        <span class="challenge-icon">🔍</span>
                        <span class="challenge-title">${module.practice.title}</span>
                    </div>
                    <p>${module.practice.content}</p>
                    <ol class="practice-steps">
                        ${module.practice.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
        `;

        // Update content with fade animation
        this.contentArea.style.opacity = '0';
        setTimeout(() => {
            this.contentArea.innerHTML = moduleHTML;
            this.contentArea.style.opacity = '1';
            this.setupModuleInteractions(module);
        }, 150);

        // Update navigation state
        this.updateNavigation();
        this.updateProgress();
    }

    setupModuleInteractions(module) {
        // Set up interactive elements for the current module
        const options = this.contentArea.querySelectorAll('.option');
        const feedbackEl = document.getElementById(`feedback-${module.id}`);
        
        options.forEach((option, index) => {
            option.addEventListener('click', () => {
                // Prevent multiple selections
                if (option.parentElement.classList.contains('answered')) return;
                
                // Mark as answered
                option.parentElement.classList.add('answered');
                
                // Clear previous selections
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                // Check answer and provide feedback
                this.checkAnswer(module, index, options, feedbackEl);
            });
        });

        // Initialize tooltip functionality for this module
        this.initializeTooltips();
    }

    checkAnswer(module, selectedIndex, options, feedbackEl) {
        // Process answer selection and provide immediate feedback
        const isCorrect = selectedIndex === module.challenge.correct;
        
        // Update score tracking
        if (!this.moduleProgress[module.id]) {
            this.totalQuestions++;
            this.moduleProgress[module.id] = { attempted: true, correct: isCorrect };
            if (isCorrect) this.score++;
            this.updateScore();
        }

        // Visual feedback on options
        options.forEach((option, index) => {
            if (index === module.challenge.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });

        // Show feedback message
        feedbackEl.innerHTML = isCorrect ? 
            module.challenge.feedback.correct : 
            module.challenge.feedback.incorrect;
        feedbackEl.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackEl.style.display = 'block';

        // Enable next button after answering
        this.nextBtn.disabled = false;
    }

    updateScore() {
        // Update score display
        this.currentScoreEl.textContent = this.score;
        this.totalScoreEl.textContent = this.totalQuestions;
    }

    updateProgress() {
        // Update progress bar and text
        const progress = ((this.currentModule + 1) / this.totalModules) * 100;
        this.progressBar.style.setProperty('--progress', `${progress}%`);
        this.progressText.textContent = `Module ${this.currentModule + 1} of ${this.totalModules}`;
    }

    updateNavigation() {
        // Update navigation button states
        this.prevBtn.disabled = this.currentModule === 0;
        this.nextBtn.disabled = this.currentModule === this.totalModules - 1;
        
        // Update button text for final module
        if (this.currentModule === this.totalModules - 1) {
            this.nextBtn.textContent = 'Complete Training';
        } else {
            this.nextBtn.textContent = 'Next →';
        }
    }

    nextModule() {
        // Navigate to next module or complete training
        if (this.currentModule < this.totalModules - 1) {
            this.currentModule++;
            this.loadModule(this.currentModule);
        } else {
            this.completeTraining();
        }
    }

    previousModule() {
        // Navigate to previous module
        if (this.currentModule > 0) {
            this.currentModule--;
            this.loadModule(this.currentModule);
        }
    }

    completeTraining() {
        // Show completion modal with results
        const completionRate = Math.round((this.score / this.totalQuestions) * 100);
        const passed = completionRate >= 70;
        
        const modalContent = `
            <h2>🎉 Training Complete!</h2>
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 48px; margin: 20px 0;">
                    ${passed ? '✅' : '📚'}
                </div>
                <h3>Your Score: ${this.score}/${this.totalQuestions} (${completionRate}%)</h3>
                <p style="color: ${passed ? '#28a745' : '#dc3545'}; font-weight: bold;">
                    ${passed ? 'Congratulations! You passed the training.' : 'Please review the material and try again.'}
                </p>
            </div>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4>Key Takeaways:</h4>
                <ul style="text-align: left; margin: 10px 0;">
                    <li>CPR can double or triple survival chances</li>
                    <li>Early defibrillation is crucial for cardiac arrest</li>
                    <li>Every minute counts in emergency situations</li>
                    <li>Proper technique and safety are essential</li>
                </ul>
            </div>
            <button onclick="location.reload()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                Restart Training
            </button>
        `;
        
        this.showModal(modalContent);
    }

    showModal(content) {
        // Display modal with custom content
        document.getElementById('modalBody').innerHTML = content;
        this.modal.style.display = 'block';
    }

    closeModal() {
        // Hide modal
        this.modal.style.display = 'none';
    }

    showTooltip(event) {
        // Show tooltip on hover for elements with data-tooltip attribute
        const element = event.target.closest('[data-tooltip]');
        if (!element) return;
        
        const tooltipText = element.getAttribute('data-tooltip');
        if (!tooltipText) return;
        
        this.tooltip.querySelector('#tooltipContent').textContent = tooltipText;
        this.tooltip.classList.add('show');
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        this.tooltip.style.left = `${rect.left + rect.width / 2}px`;
        this.tooltip.style.top = `${rect.top - 10}px`;
        this.tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
    }

    hideTooltip() {
        // Hide tooltip
        this.tooltip.classList.remove('show');
    }

    handleTouch(event) {
        // Handle touch events for mobile tooltip functionality
        const element = event.target.closest('[data-tooltip]');
        if (element) {
            event.preventDefault();
            this.showTooltip(event);
            setTimeout(() => this.hideTooltip(), 3000);
        }
    }

    initializeTooltips() {
        // Initialize tooltip functionality for dynamically loaded content
        const tooltipElements = this.contentArea.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.style.cursor = 'help';
            element.style.borderBottom = '1px dotted #999';
        });
    }
}

// Initialize the training system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CPRTrainingSystem();
});

// Add keyboard navigation support
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && !document.getElementById('prevBtn').disabled) {
        document.getElementById('prevBtn').click();
    } else if (event.key === 'ArrowRight' && !document.getElementById('nextBtn').disabled) {
        document.getElementById('nextBtn').click();
    }
});

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add ARIA labels for better screen reader support
    document.getElementById('prevBtn').setAttribute('aria-label', 'Go to previous module');
    document.getElementById('nextBtn').setAttribute('aria-label', 'Go to next module');
    document.getElementById('progressBar').setAttribute('role', 'progressbar');
    document.getElementById('progressBar').setAttribute('aria-label', 'Training progress');
});