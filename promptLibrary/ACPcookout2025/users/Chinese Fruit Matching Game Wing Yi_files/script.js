// Game data and state management
class FruitMatchingGame {
    constructor() {
        // Game data with fruits and their Chinese characters
        this.fruits = [
            { id: 'watermelon', emoji: '🍉', chinese: '西瓜', name: 'watermelon', hint: '大大的绿色水果' },
            { id: 'banana', emoji: '🍌', chinese: '香蕉', name: 'banana', hint: '黄色弯弯的水果' },
            { id: 'strawberry', emoji: '🍓', chinese: '草莓', name: 'strawberry', hint: '小红色水果' },
            { id: 'papaya', emoji: '🥭', chinese: '木瓜', name: 'papaya', hint: '橙色热带水果' },
            { id: 'apple', emoji: '🍎', chinese: '苹果', name: 'apple', hint: '红色圆形水果' },
            { id: 'grapes', emoji: '🍇', chinese: '葡萄', name: 'grapes', hint: '一串紫色水果' }
        ];
        
        // Game state
        this.matches = new Map(); // Track which fruit is matched to which box
        this.correctMatches = 0;
        this.gameCompleted = false;
        
        // DOM elements
        this.fruitCardsContainer = document.getElementById('fruitCards');
        this.matchingBoxesContainer = document.getElementById('matchingBoxes');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.tooltip = document.getElementById('tooltip');
        
        // Initialize the game
        this.init();
    }
    
    init() {
        this.createFruitCards();
        this.createMatchingBoxes();
        this.setupEventListeners();
        this.updateProgress();
        
        // Shuffle fruits for variety
        this.shuffleFruits();
    }
    
    // Create draggable fruit cards - Modified to remove Chinese text
    createFruitCards() {
        this.fruitCardsContainer.innerHTML = '';
        
        this.fruits.forEach(fruit => {
            const card = document.createElement('div');
            card.className = 'fruit-card';
            card.draggable = true;
            card.dataset.fruitId = fruit.id;
            
            // Modified: Only show emoji, no Chinese text
            card.innerHTML = `
                <span class="fruit-emoji">${fruit.emoji}</span>
            `;
            
            // Add drag event listeners
            card.addEventListener('dragstart', this.handleDragStart.bind(this));
            card.addEventListener('dragend', this.handleDragEnd.bind(this));
            
            // Touch support for mobile devices
            card.addEventListener('touchstart', this.handleTouchStart.bind(this));
            card.addEventListener('touchmove', this.handleTouchMove.bind(this));
            card.addEventListener('touchend', this.handleTouchEnd.bind(this));
            
            // Modified tooltip to show only fruit emoji without Chinese text
            card.addEventListener('mouseenter', (e) => this.showTooltip(e, `拖拽 ${fruit.emoji} 到对应的框中`));
            card.addEventListener('mouseleave', this.hideTooltip.bind(this));
            
            this.fruitCardsContainer.appendChild(card);
        });
    }
    
    // Create matching boxes for Chinese characters
    createMatchingBoxes() {
        this.matchingBoxesContainer.innerHTML = '';
        
        // Shuffle the order of matching boxes for variety
        const shuffledFruits = [...this.fruits].sort(() => Math.random() - 0.5);
        
        shuffledFruits.forEach(fruit => {
            const box = document.createElement('div');
            box.className = 'matching-box';
            box.dataset.targetId = fruit.id;
            
            box.innerHTML = `
                <span class="chinese-character">${fruit.chinese}</span>
                <span class="fruit-hint">${fruit.hint}</span>
                <span class="feedback-icon">✅</span>
            `;
            
            // Add drop event listeners
            box.addEventListener('dragover', this.handleDragOver.bind(this));
            box.addEventListener('drop', this.handleDrop.bind(this));
            box.addEventListener('dragleave', this.handleDragLeave.bind(this));
            
            // Tooltip support
            box.addEventListener('mouseenter', (e) => this.showTooltip(e, `放置对应的水果到 ${fruit.chinese} 框中`));
            box.addEventListener('mouseleave', this.hideTooltip.bind(this));
            
            this.matchingBoxesContainer.appendChild(box);
        });
    }
    
    // Drag and drop event handlers
    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.fruitId);
        e.target.classList.add('dragging');
    }
    
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.target.closest('.matching-box').classList.add('drag-over');
    }
    
    handleDragLeave(e) {
        e.target.closest('.matching-box').classList.remove('drag-over');
    }
    
    handleDrop(e) {
        e.preventDefault();
        const box = e.target.closest('.matching-box');
        box.classList.remove('drag-over');
        
        const fruitId = e.dataTransfer.getData('text/plain');
        const targetId = box.dataset.targetId;
        
        this.processMatch(fruitId, targetId, box);
    }
    
    // Touch event handlers for mobile support
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const card = e.target.closest('.fruit-card');
        
        card.classList.add('dragging');
        this.draggedElement = card;
        this.touchOffset = {
            x: touch.clientX - card.offsetLeft,
            y: touch.clientY - card.offsetTop
        };
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        if (!this.draggedElement) return;
        
        const touch = e.touches[0];
        this.draggedElement.style.position = 'fixed';
        this.draggedElement.style.left = (touch.clientX - this.touchOffset.x) + 'px';
        this.draggedElement.style.top = (touch.clientY - this.touchOffset.y) + 'px';
        this.draggedElement.style.zIndex = '1000';
        
        // Highlight potential drop targets
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const matchingBox = elementBelow?.closest('.matching-box');
        
        // Remove previous highlights
        document.querySelectorAll('.matching-box').forEach(box => {
            box.classList.remove('drag-over');
        });
        
        if (matchingBox) {
            matchingBox.classList.add('drag-over');
        }
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        if (!this.draggedElement) return;
        
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const matchingBox = elementBelow?.closest('.matching-box');
        
        // Reset dragged element position
        this.draggedElement.style.position = '';
        this.draggedElement.style.left = '';
        this.draggedElement.style.top = '';
        this.draggedElement.style.zIndex = '';
        this.draggedElement.classList.remove('dragging');
        
        // Remove all drag-over highlights
        document.querySelectorAll('.matching-box').forEach(box => {
            box.classList.remove('drag-over');
        });
        
        if (matchingBox) {
            const fruitId = this.draggedElement.dataset.fruitId;
            const targetId = matchingBox.dataset.targetId;
            this.processMatch(fruitId, targetId, matchingBox);
        }
        
        this.draggedElement = null;
    }
    
    // Process matching logic
    processMatch(fruitId, targetId, box) {
        // Remove previous match if exists
        this.removeExistingMatch(targetId);
        
        // Check if it's a correct match
        const isCorrect = fruitId === targetId;
        
        if (isCorrect) {
            this.matches.set(targetId, fruitId);
            box.classList.remove('incorrect');
            box.classList.add('correct');
            
            // Hide the matched fruit card
            const fruitCard = document.querySelector(`[data-fruit-id="${fruitId}"]`);
            if (fruitCard) {
                fruitCard.style.opacity = '0.3';
                fruitCard.draggable = false;
                fruitCard.style.pointerEvents = 'none';
            }
            
            // Add fruit emoji to the box
            const existingEmoji = box.querySelector('.matched-emoji');
            if (!existingEmoji) {
                const fruit = this.fruits.find(f => f.id === fruitId);
                const emoji = document.createElement('span');
                emoji.className = 'matched-emoji';
                emoji.textContent = fruit.emoji;
                emoji.style.fontSize = '20px';
                emoji.style.marginTop = '5px';
                box.appendChild(emoji);
            }
            
            this.correctMatches++;
            this.playSuccessSound();
            
        } else {
            box.classList.remove('correct');
            box.classList.add('incorrect');
            
            // Show hint
            this.showHint(box, '再想想这个水果的特点！');
            
            // Remove incorrect class after animation
            setTimeout(() => {
                box.classList.remove('incorrect');
            }, 1000);
        }
        
        this.updateProgress();
        
        // Check if game is completed
        if (this.correctMatches === this.fruits.length) {
            setTimeout(() => {
                this.gameCompleted = true;
                this.showResults();
            }, 500);
        }
    }
    
    // Remove existing match from a box
    removeExistingMatch(targetId) {
        if (this.matches.has(targetId)) {
            const previousFruitId = this.matches.get(targetId);
            const previousCard = document.querySelector(`[data-fruit-id="${previousFruitId}"]`);
            if (previousCard) {
                previousCard.style.opacity = '1';
                previousCard.draggable = true;
                previousCard.style.pointerEvents = 'auto';
            }
            
            // Remove matched emoji
            const box = document.querySelector(`[data-target-id="${targetId}"]`);
            const emoji = box.querySelector('.matched-emoji');
            if (emoji) {
                emoji.remove();
            }
            
            this.matches.delete(targetId);
            this.correctMatches--;
        }
    }
    
    // Update progress bar and text
    updateProgress() {
        const percentage = (this.correctMatches / this.fruits.length) * 100;
        this.progressFill.style.width = percentage + '%';
        this.progressText.textContent = `${this.correctMatches}/${this.fruits.length} 完成`;
    }
    
    // Show tooltip
    showTooltip(e, text) {
        this.tooltip.textContent = text;
        this.tooltip.style.opacity = '1';
        
        const rect = e.target.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        
        // Position tooltip in center of screen for iframe compatibility
        this.tooltip.style.left = '50%';
        this.tooltip.style.top = '50%';
        this.tooltip.style.transform = 'translate(-50%, -50%)';
    }
    
    // Hide tooltip
    hideTooltip() {
        this.tooltip.style.opacity = '0';
    }
    
    // Show hint message
    showHint(element, message) {
        const hint = document.createElement('div');
        hint.className = 'hint-message';
        hint.textContent = message;
        hint.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff9800;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 100;
            animation: fadeInOut 2s ease;
        `;
        
        element.style.position = 'relative';
        element.appendChild(hint);
        
        setTimeout(() => {
            if (hint.parentNode) {
                hint.parentNode.removeChild(hint);
            }
        }, 2000);
    }
    
    // Play success sound (visual feedback since audio might not work in iframe)
    playSuccessSound() {
        // Create visual feedback instead of audio
        const feedback = document.createElement('div');
        feedback.textContent = '🎉';
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 30px;
            z-index: 1000;
            animation: successPop 1s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(feedback);
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 1000);
    }
    
    // Shuffle fruits for variety
    shuffleFruits() {
        this.fruits.sort(() => Math.random() - 0.5);
        this.createFruitCards();
    }
    
    // Show results modal
    showResults() {
        const modal = document.getElementById('resultsModal');
        const scoreDisplay = document.getElementById('scoreDisplay');
        const encouragementText = document.getElementById('encouragementText');
        
        const score = this.correctMatches;
        const total = this.fruits.length;
        const percentage = Math.round((score / total) * 100);
        
        scoreDisplay.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 10px;">🏆</div>
            <div>你的得分: ${score}/${total}</div>
            <div style="font-size: 18px; color: #666;">${percentage}% 正确率</div>
        `;
        
        // Encouraging messages based on performance
        let encouragement = '';
        if (percentage === 100) {
            encouragement = '🌟 太棒了！你全部答对了！你对水果的认识非常好！';
        } else if (percentage >= 80) {
            encouragement = '👏 很好！你做得很棒！继续加油！';
        } else if (percentage >= 60) {
            encouragement = '💪 不错的尝试！多练习一下会更好！';
        } else {
            encouragement = '🌱 继续努力！每次练习都会进步的！';
        }
        
        encouragementText.textContent = encouragement;
        modal.style.display = 'block';
    }
    
    // Reset game
    resetGame() {
        this.matches.clear();
        this.correctMatches = 0;
        this.gameCompleted = false;
        
        // Reset all visual states
        document.querySelectorAll('.fruit-card').forEach(card => {
            card.style.opacity = '1';
            card.draggable = true;
            card.style.pointerEvents = 'auto';
        });
        
        document.querySelectorAll('.matching-box').forEach(box => {
            box.classList.remove('correct', 'incorrect');
            const emoji = box.querySelector('.matched-emoji');
            if (emoji) {
                emoji.remove();
            }
        });
        
        this.updateProgress();
        this.shuffleFruits();
        this.createMatchingBoxes();
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Help button
        document.getElementById('helpBtn').addEventListener('click', () => {
            document.getElementById('helpModal').style.display = 'block';
        });
        
        // Close help modal
        document.getElementById('closeHelpBtn').addEventListener('click', () => {
            document.getElementById('helpModal').style.display = 'none';
        });
        
        // Submit button
        document.getElementById('submitBtn').addEventListener('click', () => {
            if (this.correctMatches === this.fruits.length) {
                this.showResults();
            } else {
                alert(`还有 ${this.fruits.length - this.correctMatches} 个水果没有正确配对。继续努力！`);
            }
        });
        
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            if (confirm('确定要重新开始吗？')) {
                this.resetGame();
            }
        });
        
        // Play again button
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            document.getElementById('resultsModal').style.display = 'none';
            this.resetGame();
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            const helpModal = document.getElementById('helpModal');
            const resultsModal = document.getElementById('resultsModal');
            
            if (e.target === helpModal) {
                helpModal.style.display = 'none';
            }
            if (e.target === resultsModal) {
                resultsModal.style.display = 'none';
            }
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.getElementById('helpModal').style.display = 'none';
                document.getElementById('resultsModal').style.display = 'none';
            }
        });
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        50% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
    }
    
    @keyframes successPop {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
    
    .hint-message {
        animation: fadeInOut 2s ease;
    }
`;
document.head.appendChild(style);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FruitMatchingGame();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust layout if needed
    const container = document.querySelector('.container');
    if (window.innerHeight > 600 && window.innerWidth > 800) {
        container.style.height = '90vh';
    } else {
        container.style.height = '450px';
    }
});