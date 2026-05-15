// Interactive story and discussion system for "一千桶水"
// Modified to separate activities: 1. Brothers' behavior, 2. Villagers' behavior
// Provides sentence templates without giving students answers

class WhaleRescueInteractive {
    constructor() {
        // Initialize DOM elements
        this.initializeElements();
        
        // Story state management
        this.currentScene = 0;
        this.currentActivity = 1; // Track current activity (1 or 2)
        this.selectedCharacter = null;
        this.discussions = {
            activity1: [], // Discussions for brothers' behavior
            activity2: []  // Discussions for villagers' behavior
        };
        
        // Animation and interaction states
        this.animationInterval = null;
        this.isAnimating = false;
        
        // Initialize the interactive system
        this.init();
    }
    
    initializeElements() {
        // Main container elements
        this.container = document.getElementById('sceneContainer');
        this.whale = document.getElementById('whale');
        this.villagers = document.getElementById('villagers');
        this.waterBuckets = document.getElementById('waterBuckets');
        this.waves = document.getElementById('waves');
        this.progressFill = document.getElementById('progressFill');
        
        // Activity tab elements - NEW
        this.activity1Tab = document.getElementById('activity1Tab');
        this.activity2Tab = document.getElementById('activity2Tab');
        this.activity1Content = document.getElementById('activity1');
        this.activity2Content = document.getElementById('activity2');
        
        // Activity 1 elements (Brothers' behavior)
        this.actionCards1 = document.querySelectorAll('#actionCards1 .action-card');
        this.opinionPrompt1 = document.getElementById('opinionPrompt1');
        this.sentenceTemplates1 = document.getElementById('sentenceTemplates1');
        this.opinionInput1 = document.getElementById('opinionInput1');
        this.submitBtn1 = document.getElementById('submitOpinion1');
        this.discussionContent1 = document.getElementById('discussionContent1');
        
        // Activity 2 elements (Villagers' behavior)
        this.actionCards2 = document.querySelectorAll('#actionCards2 .action-card');
        this.opinionPrompt2 = document.getElementById('opinionPrompt2');
        this.sentenceTemplates2 = document.getElementById('sentenceTemplates2');
        this.opinionInput2 = document.getElementById('opinionInput2');
        this.submitBtn2 = document.getElementById('submitOpinion2');
        this.discussionContent2 = document.getElementById('discussionContent2');
        
        // Control elements
        this.showStoryBtn = document.getElementById('showStoryBtn');
        this.showCareBtn = document.getElementById('showCareBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.careExamples = document.getElementById('careExamples');
        
        // Tooltip
        this.tooltip = document.getElementById('tooltip');
        this.tooltipContent = document.getElementById('tooltipContent');
    }
    
    init() {
        this.setupEventListeners();
        this.startStoryAnimation();
        this.setupTooltips();
        
        // Initialize with first scene and first activity
        this.updateProgress(0);
        this.switchActivity(1);
        
        console.log('Whale Rescue Interactive initialized with separate activities');
    }
    
    setupEventListeners() {
        // Activity tab switching - NEW
        this.activity1Tab.addEventListener('click', () => this.switchActivity(1));
        this.activity2Tab.addEventListener('click', () => this.switchActivity(2));
        
        // Activity 1 interactions (Brothers' behavior)
        this.actionCards1.forEach(card => {
            card.addEventListener('click', (e) => this.selectCharacterAction(e, 1));
            card.addEventListener('mouseenter', (e) => this.showActionTooltip(e));
            card.addEventListener('mouseleave', () => this.hideTooltip());
        });
        
        // Activity 2 interactions (Villagers' behavior)
        this.actionCards2.forEach(card => {
            card.addEventListener('click', (e) => this.selectCharacterAction(e, 2));
            card.addEventListener('mouseenter', (e) => this.showActionTooltip(e));
            card.addEventListener('mouseleave', () => this.hideTooltip());
        });
        
        // Sentence template buttons for both activities
        document.querySelectorAll('.template-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.insertTemplate(e));
        });
        
        // Opinion submission for both activities
        this.submitBtn1.addEventListener('click', () => this.submitOpinion(1));
        this.submitBtn2.addEventListener('click', () => this.submitOpinion(2));
        
        // Enter key submission
        this.opinionInput1.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.submitOpinion(1);
            }
        });
        this.opinionInput2.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.submitOpinion(2);
            }
        });
        
        // Control buttons
        this.showStoryBtn.addEventListener('click', () => this.showStoryView());
        this.showCareBtn.addEventListener('click', () => this.showCareExamples());
        this.resetBtn.addEventListener('click', () => this.resetInteractive());
        
        // Scene interactions
        this.whale.addEventListener('click', () => this.interactWithWhale());
        document.querySelectorAll('.character').forEach(char => {
            char.addEventListener('click', (e) => this.interactWithCharacter(e));
        });
        
        // Animal care examples interactions
        document.querySelectorAll('.example-item').forEach(item => {
            item.addEventListener('click', (e) => this.discussCareExample(e));
        });
    }
    
    // NEW METHOD: Switch between activities
    switchActivity(activityNumber) {
        this.currentActivity = activityNumber;
        
        // Update tab appearance
        if (activityNumber === 1) {
            this.activity1Tab.classList.add('active');
            this.activity2Tab.classList.remove('active');
            this.activity1Content.style.display = 'block';
            this.activity2Content.style.display = 'none';
        } else {
            this.activity2Tab.classList.add('active');
            this.activity1Tab.classList.remove('active');
            this.activity2Content.style.display = 'block';
            this.activity1Content.style.display = 'none';
        }
        
        // Reset selection state
        this.selectedCharacter = null;
        this.clearActiveCards();
        
        console.log(`Switched to activity ${activityNumber}`);
    }
    
    // NEW METHOD: Clear active state from all cards
    clearActiveCards() {
        this.actionCards1.forEach(c => c.classList.remove('active'));
        this.actionCards2.forEach(c => c.classList.remove('active'));
        
        // Hide sentence templates and reset prompts
        this.sentenceTemplates1.style.display = 'none';
        this.sentenceTemplates2.style.display = 'none';
        this.opinionPrompt1.textContent = '点击上面的行为卡片，发表你的看法';
        this.opinionPrompt2.textContent = '点击上面的行为卡片，发表你的看法';
    }
    
    setupTooltips() {
        // Tooltip data for different elements
        const tooltipData = {
            whale: '这是搁浅的鲸鱼，需要大家的帮助才能回到大海',
            adong: '阿东：发现鲸鱼后立即决定救它的好心男孩',
            brother: '弟弟：跟着哥哥一起努力救鲸鱼',
            villagers: '村民们：看到后主动来帮忙的善良人们'
        };
        
        // Add tooltip listeners to story elements
        Object.keys(tooltipData).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('mouseenter', (e) => {
                    this.showTooltip(e, tooltipData[id]);
                });
                element.addEventListener('mouseleave', () => this.hideTooltip());
            }
        });
    }
    
    startStoryAnimation() {
        // Animate the rescue story progression
        let step = 0;
        const steps = [
            () => this.showDiscovery(),
            () => this.showInitialRescue(),
            () => this.showVillagersJoining(),
            () => this.showTideRising(),
            () => this.showWhaleRescued()
        ];
        
        this.animationInterval = setInterval(() => {
            if (step < steps.length) {
                steps[step]();
                this.updateProgress((step + 1) / steps.length * 100);
                step++;
            } else {
                clearInterval(this.animationInterval);
                this.isAnimating = false;
            }
        }, 3000);
        
        this.isAnimating = true;
    }
    
    showDiscovery() {
        // Show initial discovery scene
        this.whale.style.animation = 'whaleStruggle 2s ease-in-out infinite';
        console.log('Scene 1: Discovery of stranded whale');
    }
    
    showInitialRescue() {
        // Show brothers starting rescue
        this.createWaterBuckets(2);
        console.log('Scene 2: Brothers start rescue');
    }
    
    showVillagersJoining() {
        // Add villagers to help
        const villagerEmojis = ['👨', '👩', '👴', '👵'];
        villagerEmojis.forEach((emoji, index) => {
            setTimeout(() => {
                const villager = document.createElement('div');
                villager.className = 'villager';
                villager.textContent = emoji;
                villager.style.animationDelay = `${index * 0.5}s`;
                this.villagers.appendChild(villager);
            }, index * 500);
        });
        
        this.createWaterBuckets(6);
        console.log('Scene 3: Villagers join rescue effort');
    }
    
    showTideRising() {
        // Show tide rising
        this.waves.style.animation = 'waveRise 3s ease-in-out forwards';
        this.waves.style.opacity = '1';
        console.log('Scene 4: Tide rising');
    }
    
    showWhaleRescued() {
        // Show whale being rescued
        this.whale.style.animation = 'none';
        this.whale.style.transform = 'translateX(-50%) scale(1.2)';
        
        setTimeout(() => {
            this.whale.textContent = '🐋💦';
            this.whale.style.animation = 'whaleSwim 2s ease-in-out infinite';
        }, 1000);
        
        console.log('Scene 5: Whale rescued successfully');
    }
    
    createWaterBuckets(count) {
        // Create animated water bucket effects
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const bucket = document.createElement('div');
                bucket.className = 'water-bucket';
                bucket.textContent = '🪣💧';
                bucket.style.left = Math.random() * 80 + 10 + '%';
                bucket.style.top = Math.random() * 40 + 30 + '%';
                this.waterBuckets.appendChild(bucket);
                
                // Remove after animation
                setTimeout(() => {
                    if (bucket.parentNode) {
                        bucket.parentNode.removeChild(bucket);
                    }
                }, 1000);
            }, i * 200);
        }
    }
    
    updateProgress(percentage) {
        // Update story progress bar
        this.progressFill.style.width = percentage + '%';
    }
    
    // MODIFIED: Handle character action card selection for specific activity
    selectCharacterAction(event, activity) {
        const card = event.currentTarget;
        const character = card.dataset.character;
        const action = card.dataset.action;
        
        // Clear all active states first
        this.clearActiveCards();
        
        // Set active state for selected card
        card.classList.add('active');
        this.selectedCharacter = character;
        
        // Show appropriate opinion input interface based on activity
        if (activity === 1) {
            this.opinionPrompt1.textContent = `你对${character}的行为有什么看法？`;
            this.sentenceTemplates1.style.display = 'flex';
        } else {
            this.opinionPrompt2.textContent = `你对${character}的行为有什么看法？`;
            this.sentenceTemplates2.style.display = 'flex';
        }
        
        console.log(`Selected character: ${character}, action: ${action}, activity: ${activity}`);
    }
    
    showActionTooltip(event) {
        // Show detailed tooltip for character actions - MODIFIED to remove answers
        const card = event.currentTarget;
        const character = card.dataset.character;
        
        const tooltips = {
            '阿东': '点击讨论阿东发现鲸鱼后的行为',
            '弟弟': '点击讨论弟弟跟着哥哥一起行动的表现',
            '村民': '点击讨论村民们看到情况后的反应'
        };
        
        this.showTooltip(event, tooltips[character] || '点击发表你的看法');
    }
    
    // MODIFIED: Insert template based on current activity
    insertTemplate(event) {
        const template = event.currentTarget.dataset.template;
        const targetInput = this.currentActivity === 1 ? this.opinionInput1 : this.opinionInput2;
        const currentText = targetInput.value;
        
        if (currentText && !currentText.endsWith('\n')) {
            targetInput.value = currentText + '\n' + template;
        } else {
            targetInput.value = currentText + template;
        }
        
        targetInput.focus();
        
        // Position cursor after template
        const textLength = targetInput.value.length;
        targetInput.setSelectionRange(textLength, textLength);
    }
    
    // MODIFIED: Submit opinion for specific activity
    submitOpinion(activity) {
        const opinionInput = activity === 1 ? this.opinionInput1 : this.opinionInput2;
        const opinion = opinionInput.value.trim();
        
        if (!opinion || !this.selectedCharacter) {
            this.showTooltip({clientX: 200, clientY: 200}, '请先选择一个角色并输入你的看法');
            return;
        }
        
        // Create discussion item
        const discussionItem = {
            character: this.selectedCharacter,
            opinion: opinion,
            timestamp: new Date().toLocaleTimeString(),
            activity: activity
        };
        
        this.discussions[`activity${activity}`].push(discussionItem);
        this.displayDiscussion(discussionItem, activity);
        
        // Reset input for current activity
        opinionInput.value = '';
        this.selectedCharacter = null;
        this.clearActiveCards();
        
        console.log(`Opinion submitted for activity ${activity}:`, discussionItem);
    }
    
    // MODIFIED: Display discussion in appropriate panel
    displayDiscussion(discussionItem, activity) {
        const discussionContent = activity === 1 ? this.discussionContent1 : this.discussionContent2;
        
        const discussionDiv = document.createElement('div');
        discussionDiv.className = 'discussion-item';
        
        discussionDiv.innerHTML = `
            <div class="discussion-character">关于${discussionItem.character}的看法：</div>
            <div class="discussion-opinion">${discussionItem.opinion}</div>
        `;
        
        discussionContent.appendChild(discussionDiv);
        
        // Scroll to bottom
        discussionContent.scrollTop = discussionContent.scrollHeight;
        
        // Add some interactive responses - MODIFIED to be more neutral
        this.generateResponse(discussionItem, activity);
    }
    
    // MODIFIED: Generate neutral responses that don't provide answers
    generateResponse(discussionItem, activity) {
        const responses = [
            '很有趣的观点！',
            '你的想法很独特。',
            '这个角度很值得思考。',
            '还有其他同学想分享看法吗？'
        ];
        
        setTimeout(() => {
            const discussionContent = activity === 1 ? this.discussionContent1 : this.discussionContent2;
            const responseDiv = document.createElement('div');
            responseDiv.className = 'discussion-item';
            responseDiv.style.borderLeftColor = '#ff9800';
            
            responseDiv.innerHTML = `
                <div class="discussion-character">同学回应：</div>
                <div class="discussion-opinion">${responses[Math.floor(Math.random() * responses.length)]}</div>
            `;
            
            discussionContent.appendChild(responseDiv);
            discussionContent.scrollTop = discussionContent.scrollHeight;
        }, 1500);
    }
    
    showStoryView() {
        // Show story visualization panel
        this.careExamples.style.display = 'none';
        this.showStoryBtn.classList.add('active');
        this.showCareBtn.classList.remove('active');
    }
    
    showCareExamples() {
        // Show animal care examples panel
        this.careExamples.style.display = 'block';
        this.showCareBtn.classList.add('active');
        this.showStoryBtn.classList.remove('active');
    }
    
    discussCareExample(event) {
        // Handle discussion of animal care examples
        const example = event.currentTarget.textContent;
        
        const discussionItem = {
            character: '爱护动物',
            opinion: `我认为"${example}"是一个很好的爱护动物的方法。`,
            timestamp: new Date().toLocaleTimeString(),
            activity: this.currentActivity
        };
        
        this.discussions[`activity${this.currentActivity}`].push(discussionItem);
        this.displayDiscussion(discussionItem, this.currentActivity);
        
        // Switch back to story view
        setTimeout(() => {
            this.showStoryView();
        }, 1000);
    }
    
    // MODIFIED: Reset both activities
    resetInteractive() {
        // Reset discussion data for both activities
        this.discussions = {
            activity1: [],
            activity2: []
        };
        this.selectedCharacter = null;
        this.currentScene = 0;
        
        // Clear discussions for both activities
        this.discussionContent1.innerHTML = '';
        this.discussionContent2.innerHTML = '';
        
        // Reset inputs for both activities
        this.opinionInput1.value = '';
        this.opinionInput2.value = '';
        
        // Reset prompts and templates
        this.clearActiveCards();
        
        // Reset scene
        this.villagers.innerHTML = '';
        this.waterBuckets.innerHTML = '';
        this.waves.style.opacity = '0';
        this.whale.textContent = '🐋';
        this.whale.style.animation = 'whaleStruggle 3s ease-in-out infinite';
        this.whale.style.transform = 'translateX(-50%)';
        
        // Reset progress
        this.updateProgress(0);
        
        // Restart animation
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
        
        setTimeout(() => {
            this.startStoryAnimation();
        }, 500);
        
        // Switch to activity 1 and show story view
        this.switchActivity(1);
        this.showStoryView();
        
        console.log('Interactive reset completed for both activities');
    }
    
    interactWithWhale() {
        // Handle whale interaction
        if (!this.isAnimating) {
            this.whale.style.transform = 'translateX(-50%) scale(1.3)';
            this.createWaterBuckets(3);
            
            setTimeout(() => {
                this.whale.style.transform = 'translateX(-50%)';
            }, 1000);
        }
    }
    
    interactWithCharacter(event) {
        // Handle character interaction
        const character = event.currentTarget;
        character.style.transform = 'scale(1.5)';
        
        setTimeout(() => {
            character.style.transform = 'scale(1)';
        }, 500);
    }
    
    showTooltip(event, text) {
        // Show tooltip with information
        this.tooltipContent.textContent = text;
        this.tooltip.style.left = event.clientX + 10 + 'px';
        this.tooltip.style.top = event.clientY - 10 + 'px';
        this.tooltip.classList.add('show');
    }
    
    hideTooltip() {
        // Hide tooltip
        this.tooltip.classList.remove('show');
    }
}

// Initialize the interactive when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const whaleRescue = new WhaleRescueInteractive();
    
    // Add CSS animation for whale swimming
    const style = document.createElement('style');
    style.textContent = `
        @keyframes whaleSwim {
            0%, 100% { transform: translateX(-50%) translateY(0) rotate(0deg); }
            25% { transform: translateX(-45%) translateY(-5px) rotate(2deg); }
            50% { transform: translateX(-50%) translateY(-10px) rotate(0deg); }
            75% { transform: translateX(-55%) translateY(-5px) rotate(-2deg); }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Whale Rescue Interactive loaded successfully with separate activities');
});