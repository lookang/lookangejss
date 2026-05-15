// Game state and data management
class DoctorGame {
    constructor() {
        // Game state variables
        this.currentCase = 0;
        this.score = 0;
        this.streak = 0;
        this.errors = 0;
        this.consecutiveErrors = 0;
        this.gameData = [];
        
        // DOM elements
        this.elements = {
            caseNumber: document.getElementById('caseNumber'),
            sentenceDisplay: document.getElementById('sentenceDisplay'),
            feedbackMessage: document.getElementById('feedbackMessage'),
            score: document.getElementById('score'),
            streak: document.getElementById('streak'),
            errors: document.getElementById('errors'),
            nextBtn: document.getElementById('nextBtn'),
            injectionModal: document.getElementById('injectionModal'),
            injectionQuestion: document.getElementById('injectionQuestion'),
            tooltip: document.getElementById('tooltip')
        };
        
        // Sample sentences with incorrect usage of 的/地/得
        this.sentences = [
            {
                text: "小明跑<span class='incorrect-char'>的</span>很快。",
                correct: "得",
                explanation: "跑得很快 - '得'用于动词后表示程度",
                hint: "动词'跑'后面表示程度，应该用'得'"
            },
            {
                text: "她高兴<span class='incorrect-char'>得</span>唱起歌来。",
                correct: "地",
                explanation: "高兴地唱 - '地'用于形容词后修饰动词",
                hint: "形容词'高兴'修饰动词'唱'，应该用'地'"
            },
            {
                text: "这是我<span class='incorrect-char'>地</span>书包。",
                correct: "的",
                explanation: "我的书包 - '的'表示所属关系",
                hint: "表示所属关系，应该用'的'"
            },
            {
                text: "老师认真<span class='incorrect-char'>的</span>批改作业。",
                correct: "地",
                explanation: "认真地批改 - '地'用于形容词后修饰动词",
                hint: "形容词'认真'修饰动词'批改'，应该用'地'"
            },
            {
                text: "他画<span class='incorrect-char'>地</span>真好看。",
                correct: "得",
                explanation: "画得真好看 - '得'用于动词后表示程度",
                hint: "动词'画'后面表示程度，应该用'得'"
            },
            {
                text: "漂亮<span class='incorrect-char'>得</span>花朵在风中摇摆。",
                correct: "的",
                explanation: "漂亮的花朵 - '的'用于形容词后修饰名词",
                hint: "形容词'漂亮'修饰名词'花朵'，应该用'的'"
            },
            {
                text: "同学们安静<span class='incorrect-char'>的</span>听课。",
                correct: "地",
                explanation: "安静地听课 - '地'用于形容词后修饰动词",
                hint: "形容词'安静'修饰动词'听课'，应该用'地'"
            },
            {
                text: "这道题做<span class='incorrect-char'>地</span>对了。",
                correct: "得",
                explanation: "做得对 - '得'用于动词后表示结果",
                hint: "动词'做'后面表示结果，应该用'得'"
            }
        ];
        
        // Injection check questions for repeated errors
        this.injectionQuestions = [
            {
                question: "'的'主要用于修饰名词，表示属性或所属关系。",
                answer: true
            },
            {
                question: "'地'用于动词后面，表示程度或结果。",
                answer: false
            },
            {
                question: "'得'用于动词或形容词后面，表示程度、结果或可能性。",
                answer: true
            },
            {
                question: "'地'用于形容词或副词后面，修饰动词。",
                answer: true
            },
            {
                question: "'的'可以用在动词后面表示程度。",
                answer: false
            }
        ];
        
        this.init();
    }
    
    // Initialize the game
    init() {
        this.shuffleSentences();
        this.setupEventListeners();
        this.loadCurrentCase();
        this.updateDisplay();
    }
    
    // Shuffle sentences for variety
    shuffleSentences() {
        for (let i = this.sentences.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.sentences[i], this.sentences[j]] = [this.sentences[j], this.sentences[i]];
        }
    }
    
    // Set up all event listeners
    setupEventListeners() {
        // Medicine button clicks
        document.querySelectorAll('.medicine-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleMedicineClick(e));
        });
        
        // Next button click
        this.elements.nextBtn.addEventListener('click', () => this.nextCase());
        
        // Injection modal option clicks
        document.querySelectorAll('.injection-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleInjectionAnswer(e));
        });
        
        // Tooltip functionality
        this.setupTooltips();
        
        // Touch and mouse event optimization
        this.optimizeInteractions();
    }
    
    // Setup tooltip functionality for hints and information
    setupTooltips() {
        // Medicine button tooltips
        document.querySelectorAll('.medicine-btn').forEach(btn => {
            btn.addEventListener('mouseenter', (e) => this.showTooltip(e, btn.title));
            btn.addEventListener('mouseleave', () => this.hideTooltip());
        });
        
        // Game container tooltip for header info
        document.querySelector('.game-container').addEventListener('mouseenter', (e) => {
            if (e.target === e.currentTarget) {
                this.showTooltip(e, e.target.title);
            }
        });
        
        document.querySelector('.game-container').addEventListener('mouseleave', () => {
            this.hideTooltip();
        });
    }
    
    // Optimize interactions for touch and mouse
    optimizeInteractions() {
        // Add touch feedback for mobile devices
        document.querySelectorAll('.medicine-btn, .next-btn, .injection-option').forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            btn.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
    }
    
    // Show tooltip with positioning
    showTooltip(event, text) {
        if (!text) return;
        
        const tooltip = this.elements.tooltip;
        tooltip.textContent = text;
        tooltip.classList.add('show');
        
        // Position tooltip
        const rect = event.target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 10;
        
        // Adjust if tooltip goes off screen
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
            top = rect.bottom + 10;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }
    
    // Hide tooltip
    hideTooltip() {
        this.elements.tooltip.classList.remove('show');
    }
    
    // Load current case data
    loadCurrentCase() {
        if (this.currentCase >= this.sentences.length) {
            this.endGame();
            return;
        }
        
        const currentSentence = this.sentences[this.currentCase];
        this.elements.caseNumber.textContent = this.currentCase + 1;
        this.elements.sentenceDisplay.innerHTML = currentSentence.text;
        this.elements.feedbackMessage.textContent = '';
        this.elements.feedbackMessage.className = 'feedback-message';
        this.elements.nextBtn.disabled = true;
        
        // Reset medicine button states
        document.querySelectorAll('.medicine-btn').forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            btn.disabled = false;
        });
    }
    
    // Handle medicine button clicks
    handleMedicineClick(event) {
        const selectedMedicine = event.currentTarget.dataset.medicine;
        const currentSentence = this.sentences[this.currentCase];
        const isCorrect = selectedMedicine === currentSentence.correct;
        
        // Disable all medicine buttons
        document.querySelectorAll('.medicine-btn').forEach(btn => {
            btn.disabled = true;
        });
        
        if (isCorrect) {
            this.handleCorrectAnswer(event.currentTarget, currentSentence);
        } else {
            this.handleIncorrectAnswer(event.currentTarget, currentSentence);
        }
    }
    
    // Handle correct answer
    handleCorrectAnswer(button, sentence) {
        button.classList.add('correct');
        this.score += 10;
        this.streak++;
        this.consecutiveErrors = 0;
        
        this.elements.feedbackMessage.textContent = `正确！${sentence.explanation}`;
        this.elements.feedbackMessage.className = 'feedback-message correct';
        this.elements.nextBtn.disabled = false;
        
        this.updateDisplay();
        this.playSuccessSound();
    }
    
    // Handle incorrect answer
    handleIncorrectAnswer(button, sentence) {
        button.classList.add('incorrect');
        this.errors++;
        this.streak = 0;
        this.consecutiveErrors++;
        
        this.elements.feedbackMessage.textContent = `不对哦！${sentence.hint}`;
        this.elements.feedbackMessage.className = 'feedback-message incorrect';
        
        this.updateDisplay();
        this.playErrorSound();
        
        // Check if injection check is needed (3 consecutive errors)
        if (this.consecutiveErrors >= 3) {
            setTimeout(() => this.showInjectionCheck(), 1000);
        } else {
            // Re-enable medicine buttons for another attempt
            setTimeout(() => {
                document.querySelectorAll('.medicine-btn').forEach(btn => {
                    btn.disabled = false;
                    btn.classList.remove('incorrect');
                });
            }, 1500);
        }
    }
    
    // Show injection check modal
    showInjectionCheck() {
        const randomQuestion = this.injectionQuestions[Math.floor(Math.random() * this.injectionQuestions.length)];
        this.elements.injectionQuestion.textContent = randomQuestion.question;
        this.elements.injectionModal.dataset.correctAnswer = randomQuestion.answer;
        this.elements.injectionModal.classList.add('show');
    }
    
    // Handle injection check answer
    handleInjectionAnswer(event) {
        const selectedAnswer = event.currentTarget.dataset.answer === 'true';
        const correctAnswer = this.elements.injectionModal.dataset.correctAnswer === 'true';
        
        if (selectedAnswer === correctAnswer) {
            this.elements.injectionModal.classList.remove('show');
            this.consecutiveErrors = 0;
            // Re-enable medicine buttons
            document.querySelectorAll('.medicine-btn').forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('incorrect');
            });
        } else {
            // Show brief feedback and keep modal open
            event.currentTarget.style.background = '#f44336';
            setTimeout(() => {
                event.currentTarget.style.background = '';
            }, 500);
        }
    }
    
    // Move to next case
    nextCase() {
        this.currentCase++;
        this.loadCurrentCase();
    }
    
    // Update display elements
    updateDisplay() {
        this.elements.score.textContent = this.score;
        this.elements.streak.textContent = this.streak;
        this.elements.errors.textContent = this.errors;
    }
    
    // End game and show results
    endGame() {
        const accuracy = this.sentences.length > 0 ? Math.round((this.score / (this.sentences.length * 10)) * 100) : 0;
        
        this.elements.sentenceDisplay.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2>🎉 恭喜完成所有病例！</h2>
                <p style="margin: 10px 0;">总得分: ${this.score}</p>
                <p style="margin: 10px 0;">准确率: ${accuracy}%</p>
                <p style="margin: 10px 0;">最高连对: ${Math.max(...this.gameData.map(d => d.streak || 0), this.streak)}</p>
                <button onclick="location.reload()" style="
                    background: #4caf50; 
                    color: white; 
                    border: none; 
                    padding: 10px 20px; 
                    border-radius: 20px; 
                    cursor: pointer;
                    margin-top: 15px;
                ">重新开始</button>
            </div>
        `;
        
        this.elements.nextBtn.style.display = 'none';
    }
    
    // Play success sound (visual feedback for silent environment)
    playSuccessSound() {
        // Create visual success indicator
        const indicator = document.createElement('div');
        indicator.textContent = '✓';
        indicator.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3em;
            color: #4caf50;
            z-index: 1002;
            pointer-events: none;
            animation: successPop 0.8s ease;
        `;
        
        document.body.appendChild(indicator);
        setTimeout(() => indicator.remove(), 800);
    }
    
    // Play error sound (visual feedback for silent environment)
    playErrorSound() {
        // Create visual error indicator
        const indicator = document.createElement('div');
        indicator.textContent = '✗';
        indicator.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3em;
            color: #f44336;
            z-index: 1002;
            pointer-events: none;
            animation: errorShake 0.8s ease;
        `;
        
        document.body.appendChild(indicator);
        setTimeout(() => indicator.remove(), 800);
    }
}

// Add CSS animations for visual feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes successPop {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
    
    @keyframes errorShake {
        0%, 100% { transform: translate(-50%, -50%) translateX(0); opacity: 0; }
        10%, 30%, 50%, 70%, 90% { transform: translate(-50%, -50%) translateX(-10px); opacity: 1; }
        20%, 40%, 60%, 80% { transform: translate(-50%, -50%) translateX(10px); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DoctorGame();
});

// Handle window resize for responsive tooltip positioning
window.addEventListener('resize', () => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip.classList.contains('show')) {
        tooltip.classList.remove('show');
    }
});