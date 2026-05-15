// Personal Concept Mapping Interactive
// Manages student responses and generates visual concept maps

class ConceptMappingApp {
    constructor() {
        // Application state
        this.studentName = '';
        this.answers = {};
        this.currentQuestion = null;
        
        // Question definitions organized by category
        this.questions = {
            self: [
                { id: 'self-1', text: 'Give three words to describe yourself' },
                { id: 'self-2', text: 'What is one thing that makes you different from others?' }
            ],
            life: [
                { id: 'life-1', text: 'What do you want your life to look like in 10 years?' },
                { id: 'life-2', text: 'What two things are important to you to lead a purposeful life?' }
            ],
            world: [
                { id: 'world-1', text: 'If you could solve one problem in the world, what would that be?' },
                { id: 'world-2', text: 'If you could teach one valuable lesson to others, what would it be and why?' }
            ],
            work: [
                { id: 'work-1', text: 'How much should your work influence who you are?' },
                { id: 'work-2', text: 'What three things do you value most at work?' }
            ]
        };
        
        // Initialize the application
        this.init();
    }
    
    init() {
        // Detect if running in iframe for height adjustment
        this.detectIframeMode();
        
        // Bind event listeners
        this.bindEvents();
        
        // Initialize tooltips
        this.initTooltips();
        
        // Show welcome screen
        this.showScreen('welcome-screen');
    }
    
    detectIframeMode() {
        // Check if running in iframe and adjust styling accordingly
        try {
            if (window.self !== window.top) {
                document.body.classList.add('iframe-mode');
            }
        } catch (e) {
            document.body.classList.add('iframe-mode');
        }
    }
    
    bindEvents() {
        // Welcome screen events
        const nameInput = document.getElementById('student-name');
        const startBtn = document.getElementById('start-btn');
        
        nameInput.addEventListener('input', (e) => {
            const name = e.target.value.trim();
            startBtn.disabled = name.length < 2;
            if (name.length >= 2) {
                this.studentName = name;
            }
        });
        
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !startBtn.disabled) {
                this.startQuestioning();
            }
        });
        
        startBtn.addEventListener('click', () => this.startQuestioning());
        
        // Question screen events
        document.querySelectorAll('.question-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const questionId = e.target.dataset.question;
                this.openQuestionModal(questionId);
            });
        });
        
        // Modal events
        const modal = document.getElementById('question-modal');
        const closeBtn = modal.querySelector('.close-btn');
        const saveBtn = document.getElementById('save-answer-btn');
        const answerInput = document.getElementById('answer-input');
        
        closeBtn.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
        
        saveBtn.addEventListener('click', () => this.saveAnswer());
        
        // Character counter for answer input
        answerInput.addEventListener('input', (e) => {
            const counter = document.querySelector('.char-counter');
            const length = e.target.value.length;
            counter.textContent = `${length}/500`;
            counter.style.color = length > 450 ? '#e53e3e' : '#a0aec0';
        });
        
        // Generate map button
        document.getElementById('generate-map-btn').addEventListener('click', () => {
            this.generateConceptMap();
        });
        
        // Map screen controls
        document.getElementById('back-to-questions').addEventListener('click', () => {
            this.showScreen('question-screen');
        });
        
        document.getElementById('reset-map').addEventListener('click', () => {
            this.resetApp();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    initTooltips() {
        // Initialize tooltip system for enhanced accessibility
        const tooltip = document.getElementById('tooltip');
        
        // Add tooltip to elements that need additional information
        document.addEventListener('mouseover', (e) => {
            const target = e.target;
            let tooltipText = '';
            
            if (target.classList.contains('category-icon')) {
                const category = target.closest('.category-card').dataset.category;
                tooltipText = this.getCategoryDescription(category);
            } else if (target.classList.contains('completion-badge')) {
                const isCompleted = target.classList.contains('completed');
                tooltipText = isCompleted ? 'Category completed' : 'Answer at least one question';
            } else if (target.classList.contains('progress-fill')) {
                tooltipText = 'Progress: Complete one question from each category to create your map';
            }
            
            if (tooltipText) {
                this.showTooltip(e, tooltipText);
            }
        });
        
        document.addEventListener('mouseout', () => {
            this.hideTooltip();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (tooltip.classList.contains('visible')) {
                this.updateTooltipPosition(e);
            }
        });
    }
    
    getCategoryDescription(category) {
        const descriptions = {
            self: 'Explore your personal identity and unique characteristics',
            life: 'Reflect on your aspirations and values for a meaningful life',
            world: 'Consider your impact and contribution to society',
            work: 'Examine your relationship with work and career values'
        };
        return descriptions[category] || '';
    }
    
    showTooltip(event, text) {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = text;
        tooltip.classList.add('visible');
        this.updateTooltipPosition(event);
    }
    
    updateTooltipPosition(event) {
        const tooltip = document.getElementById('tooltip');
        const container = document.getElementById('main-container');
        const containerRect = container.getBoundingClientRect();
        
        let x = event.clientX - containerRect.left + 10;
        let y = event.clientY - containerRect.top - 10;
        
        // Ensure tooltip stays within container bounds
        const tooltipRect = tooltip.getBoundingClientRect();
        if (x + tooltipRect.width > containerRect.width) {
            x = event.clientX - containerRect.left - tooltipRect.width - 10;
        }
        if (y < 0) {
            y = event.clientY - containerRect.top + 20;
        }
        
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }
    
    hideTooltip() {
        document.getElementById('tooltip').classList.remove('visible');
    }
    
    startQuestioning() {
        this.showScreen('question-screen');
        this.updateProgress();
    }
    
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.add('active');
    }
    
    openQuestionModal(questionId) {
        this.currentQuestion = questionId;
        const [category, number] = questionId.split('-');
        const questionData = this.questions[category][parseInt(number) - 1];
        
        const modal = document.getElementById('question-modal');
        const questionText = document.getElementById('modal-question-text');
        const answerInput = document.getElementById('answer-input');
        
        questionText.textContent = questionData.text;
        answerInput.value = this.answers[questionId] || '';
        answerInput.focus();
        
        // Update character counter
        const counter = document.querySelector('.char-counter');
        counter.textContent = `${answerInput.value.length}/500`;
        
        modal.classList.add('active');
    }
    
    closeModal() {
        document.getElementById('question-modal').classList.remove('active');
        this.currentQuestion = null;
    }
    
    saveAnswer() {
        const answerInput = document.getElementById('answer-input');
        const answer = answerInput.value.trim();
        
        if (answer.length < 5) {
            alert('Please provide a more detailed answer (at least 5 characters).');
            return;
        }
        
        // Save the answer
        this.answers[this.currentQuestion] = answer;
        
        // Update UI to show question as answered
        const questionBtn = document.querySelector(`[data-question="${this.currentQuestion}"]`);
        questionBtn.classList.add('answered');
        
        // Update category completion status
        this.updateCategoryCompletion();
        
        // Update progress
        this.updateProgress();
        
        // Close modal
        this.closeModal();
        
        // Provide feedback
        this.showFeedback('Answer saved successfully!');
    }
    
    updateCategoryCompletion() {
        // Check completion status for each category
        Object.keys(this.questions).forEach(category => {
            const hasAnswer = this.questions[category].some(q => 
                this.answers[q.id] && this.answers[q.id].trim().length > 0
            );
            
            const badge = document.querySelector(`[data-category="${category}"] .completion-badge`);
            badge.classList.toggle('completed', hasAnswer);
        });
    }
    
    updateProgress() {
        // Calculate progress based on category completion
        const completedCategories = Object.keys(this.questions).filter(category => 
            this.questions[category].some(q => 
                this.answers[q.id] && this.answers[q.id].trim().length > 0
            )
        ).length;
        
        const progress = (completedCategories / 4) * 100;
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        progressFill.style.width = progress + '%';
        
        if (completedCategories === 4) {
            progressText.textContent = 'All categories completed! Ready to create your concept map.';
            document.getElementById('generate-map-btn').disabled = false;
        } else {
            const remaining = 4 - completedCategories;
            progressText.textContent = `Complete ${remaining} more categor${remaining === 1 ? 'y' : 'ies'} to create your map`;
        }
    }
    
    showFeedback(message) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #48bb78;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            z-index: 2000;
            font-size: 0.9rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        feedback.textContent = message;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }
    
    generateConceptMap() {
        this.showScreen('map-screen');
        this.createVisualMap();
    }
    
    createVisualMap() {
        const svg = document.getElementById('concept-map');
        const svgRect = svg.getBoundingClientRect();
        
        // Clear existing content
        svg.innerHTML = '';
        
        // Define map dimensions and center
        const width = 800;
        const height = 600;
        const centerX = width / 2;
        const centerY = height / 2;
        
        // Create central node (student name)
        this.createNode(svg, centerX, centerY, this.studentName, 'central-node', 60);
        
        // Position category nodes around the center
        const categoryPositions = [
            { x: centerX - 200, y: centerY - 150, category: 'self' },
            { x: centerX + 200, y: centerY - 150, category: 'life' },
            { x: centerX - 200, y: centerY + 150, category: 'world' },
            { x: centerX + 200, y: centerY + 150, category: 'work' }
        ];
        
        categoryPositions.forEach(pos => {
            // Create category node
            const categoryName = pos.category.charAt(0).toUpperCase() + pos.category.slice(1);
            this.createNode(svg, pos.x, pos.y, categoryName, 'category-node', 40);
            
            // Create link from center to category
            this.createLink(svg, centerX, centerY, pos.x, pos.y);
            
            // Create answer nodes for this category
            const answeredQuestions = this.questions[pos.category].filter(q => 
                this.answers[q.id] && this.answers[q.id].trim().length > 0
            );
            
            answeredQuestions.forEach((question, index) => {
                const angle = (index * 60) - 30; // Spread answers around category
                const distance = 120;
                const answerX = pos.x + Math.cos(angle * Math.PI / 180) * distance;
                const answerY = pos.y + Math.sin(angle * Math.PI / 180) * distance;
                
                // Truncate long answers for display
                const answerText = this.truncateText(this.answers[question.id], 20);
                this.createNode(svg, answerX, answerY, answerText, 'answer-node', 30);
                
                // Create link from category to answer
                this.createLink(svg, pos.x, pos.y, answerX, answerY);
                
                // Add full answer as tooltip data
                const answerNode = svg.lastElementChild.previousElementSibling;
                answerNode.setAttribute('data-full-answer', this.answers[question.id]);
                answerNode.setAttribute('data-question', question.text);
            });
        });
        
        // Add interactivity to map nodes
        this.addMapInteractivity(svg);
    }
    
    createNode(svg, x, y, text, className, radius) {
        // Create node group
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', `map-node ${className}`);
        group.setAttribute('transform', `translate(${x}, ${y})`);
        
        // Create circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('class', 'node-circle');
        circle.setAttribute('r', radius);
        circle.setAttribute('cx', 0);
        circle.setAttribute('cy', 0);
        
        // Create text
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('class', 'node-text');
        textElement.setAttribute('x', 0);
        textElement.setAttribute('y', 0);
        
        // Handle multi-line text for longer content
        const words = text.split(' ');
        if (words.length > 2 && radius < 50) {
            // Split into multiple lines for smaller nodes
            const midpoint = Math.ceil(words.length / 2);
            const line1 = words.slice(0, midpoint).join(' ');
            const line2 = words.slice(midpoint).join(' ');
            
            const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan1.setAttribute('x', 0);
            tspan1.setAttribute('dy', '-0.3em');
            tspan1.textContent = line1;
            
            const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan2.setAttribute('x', 0);
            tspan2.setAttribute('dy', '1em');
            tspan2.textContent = line2;
            
            textElement.appendChild(tspan1);
            textElement.appendChild(tspan2);
        } else {
            textElement.textContent = text;
        }
        
        group.appendChild(circle);
        group.appendChild(textElement);
        svg.appendChild(group);
    }
    
    createLink(svg, x1, y1, x2, y2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('class', 'map-link');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        
        svg.appendChild(line);
    }
    
    addMapInteractivity(svg) {
        // Add hover effects and tooltips to map nodes
        const nodes = svg.querySelectorAll('.map-node');
        
        nodes.forEach(node => {
            node.addEventListener('mouseenter', (e) => {
                const fullAnswer = node.getAttribute('data-full-answer');
                const question = node.getAttribute('data-question');
                
                if (fullAnswer && question) {
                    const tooltipText = `${question}\n\n${fullAnswer}`;
                    this.showTooltip(e, tooltipText);
                }
            });
            
            node.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    }
    
    resetApp() {
        // Confirm reset action
        if (confirm('Are you sure you want to start over? All your answers will be lost.')) {
            this.studentName = '';
            this.answers = {};
            this.currentQuestion = null;
            
            // Reset UI elements
            document.getElementById('student-name').value = '';
            document.getElementById('start-btn').disabled = true;
            document.getElementById('generate-map-btn').disabled = true;
            
            // Remove answered classes
            document.querySelectorAll('.question-btn').forEach(btn => {
                btn.classList.remove('answered');
            });
            
            // Reset completion badges
            document.querySelectorAll('.completion-badge').forEach(badge => {
                badge.classList.remove('completed');
            });
            
            // Reset progress
            document.querySelector('.progress-fill').style.width = '0%';
            document.querySelector('.progress-text').textContent = 'Complete at least 1 question from each category';
            
            // Return to welcome screen
            this.showScreen('welcome-screen');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ConceptMappingApp();
});

// Handle window resize for responsive map
window.addEventListener('resize', () => {
    // Redraw map if currently visible
    const mapScreen = document.getElementById('map-screen');
    if (mapScreen.classList.contains('active')) {
        setTimeout(() => {
            const app = window.conceptMappingApp;
            if (app) {
                app.createVisualMap();
            }
        }, 100);
    }
});