// Self-Discovery Interactive JavaScript
// Manages the personality assessment flow and analysis

class SelfDiscoveryApp {
    constructor() {
        // Initialize application state
        this.currentQuestion = 1;
        this.totalQuestions = 5;
        this.answers = {};
        
        // Initialize DOM elements
        this.initializeElements();
        
        // Bind event listeners
        this.bindEvents();
        
        // Initialize the first question
        this.updateUI();
    }
    
    // Initialize DOM element references
    initializeElements() {
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.modalOverlay = document.getElementById('modalOverlay');
        this.modalContent = document.getElementById('modalContent');
        this.closeBtn = document.getElementById('closeBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.tooltip = document.getElementById('tooltip');
    }
    
    // Bind all event listeners
    bindEvents() {
        // Navigation button events
        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        
        // Modal events
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.restartBtn.addEventListener('click', () => this.restart());
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) this.closeModal();
        });
        
        // Input events for question 1 (text inputs)
        ['word1', 'word2', 'word3'].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => this.handleTextInput());
            }
        });
        
        // Option button events for multiple choice questions
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleOptionSelect(e));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Tooltip events
        document.addEventListener('mousemove', (e) => this.handleTooltip(e));
    }
    
    // Handle text input changes for question 1
    handleTextInput() {
        const word1 = document.getElementById('word1')?.value.trim();
        const word2 = document.getElementById('word2')?.value.trim();
        const word3 = document.getElementById('word3')?.value.trim();
        
        // Store answers
        this.answers[1] = {
            words: [word1, word2, word3].filter(word => word.length > 0)
        };
        
        // Enable next button if at least 2 words are provided
        this.nextBtn.disabled = this.answers[1].words.length < 2;
    }
    
    // Handle option selection for multiple choice questions
    handleOptionSelect(e) {
        const button = e.target;
        const questionCard = button.closest('.question-card');
        const questionId = parseInt(questionCard.id.replace('question', ''));
        
        // Remove previous selection
        questionCard.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Add selection to clicked button
        button.classList.add('selected');
        
        // Store answer
        this.answers[questionId] = {
            value: button.dataset.value,
            text: button.textContent
        };
        
        // Enable next button
        this.nextBtn.disabled = false;
    }
    
    // Navigate to previous question
    previousQuestion() {
        if (this.currentQuestion > 1) {
            this.currentQuestion--;
            this.updateUI();
        }
    }
    
    // Navigate to next question or show results
    nextQuestion() {
        if (this.currentQuestion < this.totalQuestions) {
            this.currentQuestion++;
            this.updateUI();
        } else {
            this.showResults();
        }
    }
    
    // Update UI based on current question
    updateUI() {
        // Update progress bar
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `Question ${this.currentQuestion} of ${this.totalQuestions}`;
        
        // Update question cards visibility
        document.querySelectorAll('.question-card').forEach((card, index) => {
            const questionNum = index + 1;
            card.classList.remove('active', 'prev');
            
            if (questionNum === this.currentQuestion) {
                card.classList.add('active');
            } else if (questionNum < this.currentQuestion) {
                card.classList.add('prev');
            }
        });
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentQuestion === 1;
        this.nextBtn.textContent = this.currentQuestion === this.totalQuestions ? 'View Results' : 'Next';
        
        // Check if current question is answered
        this.updateNextButtonState();
    }
    
    // Update next button state based on current question answers
    updateNextButtonState() {
        const hasAnswer = this.answers[this.currentQuestion];
        
        if (this.currentQuestion === 1) {
            // For text inputs, check if at least 2 words are provided
            this.nextBtn.disabled = !hasAnswer || hasAnswer.words.length < 2;
        } else {
            // For multiple choice, check if an option is selected
            this.nextBtn.disabled = !hasAnswer;
        }
    }
    
    // Generate personality analysis based on answers
    generateAnalysis() {
        const analysis = {
            personalityType: this.determinePersonalityType(),
            strengths: this.identifyStrengths(),
            learningStyle: this.determineLearningStyle(),
            socialTendency: this.determineSocialTendency(),
            recommendations: this.generateRecommendations()
        };
        
        return analysis;
    }
    
    // Determine personality type based on answers
    determinePersonalityType() {
        const words = this.answers[1]?.words || [];
        const motivation = this.answers[2]?.value;
        const challengeStyle = this.answers[3]?.value;
        
        // Simple personality type determination logic
        const traits = [];
        
        // Analyze descriptive words
        const positiveWords = ['confident', 'creative', 'friendly', 'ambitious', 'curious', 'kind', 'determined'];
        const analyticalWords = ['logical', 'systematic', 'careful', 'precise', 'methodical'];
        const socialWords = ['outgoing', 'helpful', 'collaborative', 'empathetic', 'supportive'];
        
        words.forEach(word => {
            const lowerWord = word.toLowerCase();
            if (positiveWords.some(pw => lowerWord.includes(pw))) traits.push('positive');
            if (analyticalWords.some(aw => lowerWord.includes(aw))) traits.push('analytical');
            if (socialWords.some(sw => lowerWord.includes(sw))) traits.push('social');
        });
        
        // Combine with other answers
        if (motivation === 'achievement') traits.push('goal-oriented');
        if (motivation === 'relationships') traits.push('people-focused');
        if (motivation === 'creativity') traits.push('creative');
        if (challengeStyle === 'analytical') traits.push('methodical');
        if (challengeStyle === 'collaborative') traits.push('team-player');
        
        return this.getPersonalityDescription(traits);
    }
    
    // Get personality description based on traits
    getPersonalityDescription(traits) {
        const descriptions = {
            'creative-social': 'Creative Collaborator - You thrive on innovation and working with others to bring ideas to life.',
            'analytical-goal': 'Strategic Achiever - You approach goals systematically and enjoy solving complex problems.',
            'social-helper': 'Supportive Leader - You naturally help others succeed and create positive team dynamics.',
            'creative-individual': 'Independent Innovator - You prefer to explore creative solutions on your own terms.',
            'default': 'Balanced Individual - You show a healthy mix of different personality traits and adapt well to various situations.'
        };
        
        // Simple matching logic
        if (traits.includes('creative') && traits.includes('social')) return descriptions['creative-social'];
        if (traits.includes('analytical') && traits.includes('goal-oriented')) return descriptions['analytical-goal'];
        if (traits.includes('social') && traits.includes('people-focused')) return descriptions['social-helper'];
        if (traits.includes('creative')) return descriptions['creative-individual'];
        
        return descriptions['default'];
    }
    
    // Identify key strengths
    identifyStrengths() {
        const strengths = [];
        const words = this.answers[1]?.words || [];
        const motivation = this.answers[2]?.value;
        const challengeStyle = this.answers[3]?.value;
        const socialStyle = this.answers[4]?.value;
        
        // Analyze based on descriptive words
        words.forEach(word => {
            const lowerWord = word.toLowerCase();
            if (['creative', 'innovative', 'artistic'].some(w => lowerWord.includes(w))) {
                strengths.push('Creativity & Innovation');
            }
            if (['kind', 'caring', 'empathetic', 'helpful'].some(w => lowerWord.includes(w))) {
                strengths.push('Empathy & Compassion');
            }
            if (['determined', 'persistent', 'focused'].some(w => lowerWord.includes(w))) {
                strengths.push('Persistence & Determination');
            }
        });
        
        // Add strengths based on other answers
        if (motivation === 'helping') strengths.push('Service Orientation');
        if (challengeStyle === 'analytical') strengths.push('Problem-Solving Skills');
        if (socialStyle === 'leader') strengths.push('Leadership Abilities');
        if (socialStyle === 'mediator') strengths.push('Conflict Resolution');
        
        return [...new Set(strengths)]; // Remove duplicates
    }
    
    // Determine learning style
    determineLearningStyle() {
        const learningPref = this.answers[5]?.value;
        const challengeStyle = this.answers[3]?.value;
        
        const styles = {
            'quiet': 'Independent Learner - You learn best through self-directed study and reflection.',
            'discussion': 'Collaborative Learner - You thrive in group discussions and peer learning.',
            'hands-on': 'Kinesthetic Learner - You learn best through practical, hands-on experiences.',
            'visual': 'Visual Learner - You process information best through visual presentations and diagrams.',
            'varied': 'Adaptive Learner - You benefit from a mix of learning approaches and can adapt to different styles.'
        };
        
        return styles[learningPref] || styles['varied'];
    }
    
    // Determine social tendency
    determineSocialTendency() {
        const socialStyle = this.answers[4]?.value;
        const motivation = this.answers[2]?.value;
        
        const tendencies = {
            'leader': 'Natural Leader - You tend to take initiative and guide others toward common goals.',
            'supporter': 'Team Supporter - You excel at encouraging others and building team cohesion.',
            'mediator': 'Peacemaker - You have a talent for resolving conflicts and finding common ground.',
            'observer': 'Thoughtful Observer - You prefer to understand situations fully before contributing.',
            'contributor': 'Active Participant - You enjoy sharing ideas and contributing to group success.'
        };
        
        return tendencies[socialStyle] || tendencies['contributor'];
    }
    
    // Generate personalized recommendations
    generateRecommendations() {
        const recommendations = [];
        const motivation = this.answers[2]?.value;
        const challengeStyle = this.answers[3]?.value;
        const socialStyle = this.answers[4]?.value;
        const learningStyle = this.answers[5]?.value;
        
        // Learning recommendations
        if (learningStyle === 'discussion') {
            recommendations.push('Join study groups or discussion forums to maximize your learning potential.');
        }
        if (learningStyle === 'hands-on') {
            recommendations.push('Seek out practical projects and experiential learning opportunities.');
        }
        if (learningStyle === 'quiet') {
            recommendations.push('Create a dedicated quiet space for focused study and reflection.');
        }
        
        // Social recommendations
        if (socialStyle === 'leader') {
            recommendations.push('Consider taking on leadership roles in group projects or extracurricular activities.');
        }
        if (socialStyle === 'mediator') {
            recommendations.push('Your conflict resolution skills could be valuable in peer support roles.');
        }
        
        // Challenge-handling recommendations
        if (challengeStyle === 'collaborative') {
            recommendations.push('Don\'t hesitate to reach out for help - your collaborative approach is a strength.');
        }
        if (challengeStyle === 'analytical') {
            recommendations.push('Trust your analytical skills, but also consider getting input from others.');
        }
        
        return recommendations;
    }
    
    // Show results modal with personality analysis
    showResults() {
        const analysis = this.generateAnalysis();
        
        const resultsHTML = `
            <div class="insight-section">
                <h3>🎯 Your Personality Profile</h3>
                <p>${analysis.personalityType}</p>
                <div class="trait-tags">
                    ${this.answers[1]?.words.map(word => `<span class="trait-tag">${word}</span>`).join('') || ''}
                </div>
            </div>
            
            <div class="insight-section">
                <h3>💪 Your Key Strengths</h3>
                ${analysis.strengths.map(strength => `<p>• ${strength}</p>`).join('')}
            </div>
            
            <div class="insight-section">
                <h3>📚 Your Learning Style</h3>
                <p>${analysis.learningStyle}</p>
            </div>
            
            <div class="insight-section">
                <h3>👥 Your Social Tendency</h3>
                <p>${analysis.socialTendency}</p>
            </div>
            
            <div class="insight-section">
                <h3>🚀 Recommendations for You</h3>
                ${analysis.recommendations.map(rec => `<p>• ${rec}</p>`).join('')}
            </div>
        `;
        
        this.modalContent.innerHTML = resultsHTML;
        this.modalOverlay.classList.add('active');
    }
    
    // Close results modal
    closeModal() {
        this.modalOverlay.classList.remove('active');
    }
    
    // Restart the assessment
    restart() {
        this.currentQuestion = 1;
        this.answers = {};
        
        // Reset all inputs
        document.querySelectorAll('.word-input').forEach(input => input.value = '');
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Close modal and update UI
        this.closeModal();
        this.updateUI();
    }
    
    // Handle keyboard navigation
    handleKeyboard(e) {
        if (e.key === 'Enter' && !this.nextBtn.disabled) {
            this.nextQuestion();
        } else if (e.key === 'Escape' && this.modalOverlay.classList.contains('active')) {
            this.closeModal();
        }
    }
    
    // Handle tooltip display
    handleTooltip(e) {
        const target = e.target;
        
        // Show tooltip for elements with title attribute
        if (target.title) {
            this.tooltip.textContent = target.title;
            this.tooltip.style.left = `${e.clientX + 10}px`;
            this.tooltip.style.top = `${e.clientY - 30}px`;
            this.tooltip.style.opacity = '1';
            
            // Hide tooltip after 3 seconds
            setTimeout(() => {
                this.tooltip.style.opacity = '0';
            }, 3000);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Detect if running in iframe
    if (window.self !== window.top) {
        document.body.classList.add('iframe-mode');
    }
    
    // Initialize the self-discovery app
    new SelfDiscoveryApp();
});

// Additional utility functions for enhanced interactivity

// Smooth scroll behavior for better UX
function smoothTransition(element, property, startValue, endValue, duration = 300) {
    const startTime = performance.now();
    const change = endValue - startValue;
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeInOut = progress < 0.5 
            ? 2 * progress * progress 
            : -1 + (4 - 2 * progress) * progress;
        
        const currentValue = startValue + change * easeInOut;
        element.style[property] = `${currentValue}px`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Enhanced accessibility features
function enhanceAccessibility() {
    // Add ARIA labels for screen readers
    document.querySelectorAll('.option-btn').forEach((btn, index) => {
        btn.setAttribute('aria-label', `Option ${index + 1}: ${btn.textContent}`);
    });
    
    // Add keyboard navigation hints
    document.querySelectorAll('.word-input').forEach(input => {
        input.setAttribute('aria-describedby', 'input-help');
    });
    
    // Focus management for modal
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
    }
}

// Call accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);