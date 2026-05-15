// Main application class for the interactive story
class WhaleRescueInteractive {
    constructor() {
        // Initialize application state
        this.currentScene = 1;
        this.currentQuestion = 1;
        this.responses = {
            opinions: [],
            careActions: [],
            teamworkRating: [], // Added for scene 2
            feelings: [], // Added for scene 3
            learnings: [] // Modified for scene 3
        };
        this.progress = 0;
        
        // Story content for each scene
        this.storyContent = {
            1: "阿东和弟弟到海边抓螃蟹，无意间看到沙滩上有一条鲸鱼，鲸鱼的大尾巴正拍打着沙滩。"鲸鱼搁浅了，怎么办？如果没有水，它就会死掉，"阿东急得团团转，"我们要赶快救它！"",
            2: "村民们看到了，也赶紧提着水桶来帮忙。有人把上衣脱下来，在海水里弄湿后，盖在鲸鱼的身上。阿福伯还开着车，把家里的抽水机载过来，从海里抽水，洒到鲸鱼的身上。",
            3: "不知过了多久，忽然有人喊："涨潮了！"只见海浪一波一波地冲了上来。大家都激动地欢呼起来："涨潮了！鲸鱼有救了！"海水越涨越高。突然，一个大浪打过来，鲸鱼的尾巴用力一摆，身体便随着波浪离开了沙滩。"
        };
        
        // Response templates for different opinions
        this.responseTemplates = {
            positive: "很好的看法！阿东和弟弟表现出了对动物的关爱和责任感。他们看到鲸鱼遇到困难时，没有袖手旁观，而是立即行动起来救助。这种善良和勇敢的行为值得我们学习。",
            neutral: "你的观点很中肯。阿东和弟弟的行为确实有可取之处，他们有爱心想要救助鲸鱼。不过，在实际救援中，寻求专业帮助可能会更有效。",
            negative: "你提出了很好的思考点。虽然阿东和弟弟的出发点是好的，但确实可以考虑更科学的救援方法，比如立即联系海洋救援队或相关部门。"
        };
        
        // Added response templates for teamwork rating (scene 2)
        this.teamworkTemplates = {
            'very-important': "你说得很对！团队合作在救援行动中确实非常重要。每个人都发挥自己的作用，有人提水，有人用湿衣服，有人带抽水机，大家齐心协力才能成功救助鲸鱼。",
            'important': "团队合作确实很重要。在这个故事中，如果只靠阿东和弟弟两个人，很难成功救助鲸鱼。村民们的加入让救援变得更有效率。",
            'somewhat': "团队合作有一定作用，但个人的善良和行动力也很重要。阿东和弟弟的主动行为激发了村民们的参与，这也是成功的关键。"
        };
        
        // Added response templates for feelings (scene 3)
        this.feelingTemplates = {
            'happy': "看到鲸鱼获救，确实让人感到很开心！这种快乐来自于看到生命得到拯救，也来自于人们善良行为的成功。",
            'moved': "这个故事确实很感人。人们不分彼此，为了救助一个陌生的生命而共同努力，这种温暖的人性让人深深感动。",
            'proud': "为这些善良的人们感到自豪是很自然的。他们的行为展现了人类最美好的品质——同情心和责任感。",
            'inspired': "这个故事确实很有启发性。它告诉我们，每个人都可以为保护动物、保护环境做出贡献，哪怕是小小的行动也很有意义。"
        };
        
        this.init();
    }
    
    // Initialize the application
    init() {
        this.bindEvents();
        this.showQuestion(1);
        this.updateProgress();
        this.startWaterAnimation();
    }
    
    // Bind all event listeners
    bindEvents() {
        // Scene navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const scene = parseInt(e.target.dataset.scene);
                this.switchScene(scene);
            });
        });
        
        // Opinion buttons
        document.querySelectorAll('.opinion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectOpinion(e.target.dataset.opinion);
            });
        });
        
        // Care action items
        document.querySelectorAll('.action-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.toggleCareAction(e.target.dataset.action);
            });
        });
        
        // Added event listeners for rating buttons (scene 2)
        document.querySelectorAll('.rating-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectTeamworkRating(e.target.dataset.rating);
            });
        });
        
        // Added event listeners for feeling buttons (scene 3)
        document.querySelectorAll('.feeling-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectFeeling(e.target.dataset.feeling);
            });
        });
        
        // Modified suggestion submission to handle both inputs
        document.getElementById('submitSuggestion')?.addEventListener('click', () => {
            this.submitSuggestion();
        });
        
        // Added learning submission for scene 3
        document.getElementById('submitLearning')?.addEventListener('click', () => {
            this.submitLearning();
        });
        
        // Tooltip functionality
        this.initTooltips();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }
    
    // Switch between story scenes
    switchScene(sceneNumber) {
        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-scene="${sceneNumber}"]`).classList.add('active');
        
        // Update scene display
        document.querySelectorAll('.scene').forEach(scene => {
            scene.classList.remove('active');
        });
        document.getElementById(`scene${sceneNumber}`).classList.add('active');
        
        // Update story text
        document.getElementById('storyText').innerHTML = `<p>${this.storyContent[sceneNumber]}</p>`;
        
        // Update current scene and show corresponding question
        this.currentScene = sceneNumber;
        this.showQuestion(sceneNumber);
        
        // Add visual effects based on scene
        this.addSceneEffects(sceneNumber);
    }
    
    // Add visual effects for different scenes
    addSceneEffects(sceneNumber) {
        switch(sceneNumber) {
            case 1:
                this.startWaterAnimation();
                break;
            case 2:
                this.showVillagersHelping();
                break;
            case 3:
                this.showTideAnimation();
                break;
        }
    }
    
    // Start water bucket animation
    startWaterAnimation() {
        const waterBuckets = document.getElementById('waterBuckets');
        waterBuckets.innerHTML = '';
        
        // Create animated water buckets
        for(let i = 0; i < 5; i++) {
            setTimeout(() => {
                const bucket = document.createElement('div');
                bucket.className = 'water-bucket';
                bucket.style.animationDelay = `${i * 0.2}s`;
                waterBuckets.appendChild(bucket);
            }, i * 300);
        }
    }
    
    // Show villagers helping animation
    showVillagersHelping() {
        const villagers = document.getElementById('villagers');
        if(villagers) {
            villagers.style.animation = 'fadeIn 1s ease-in-out';
        }
        
        const waterPump = document.getElementById('waterPump');
        if(waterPump) {
            waterPump.style.animation = 'pump 2s ease-in-out infinite';
        }
    }
    
    // Show tide animation
    showTideAnimation() {
        const waves = document.getElementById('waves');
        if(waves) {
            waves.style.animation = 'waveMotion 3s ease-in-out infinite';
        }
    }
    
    // Show specific question
    showQuestion(questionNumber) {
        document.querySelectorAll('.question').forEach(q => {
            q.classList.remove('active');
        });
        document.getElementById(`question${questionNumber}`).classList.add('active');
        this.currentQuestion = questionNumber;
    }
    
    // Handle opinion selection
    selectOpinion(opinion) {
        // Update button states
        document.querySelectorAll('.opinion-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-opinion="${opinion}"]`).classList.add('selected');
        
        // Store response
        this.responses.opinions = [opinion];
        
        // Show response
        this.showResponse(this.responseTemplates[opinion]);
        
        // Update progress
        this.updateProgress();
        
        // Auto-advance to next question after delay
        setTimeout(() => {
            if(this.currentScene < 3) {
                this.switchScene(this.currentScene + 1);
            }
        }, 2000);
    }
    
    // Toggle care action selection
    toggleCareAction(action) {
        const actionElement = document.querySelector(`[data-action="${action}"]`);
        
        if(actionElement.classList.contains('selected')) {
            actionElement.classList.remove('selected');
            this.responses.careActions = this.responses.careActions.filter(a => a !== action);
        } else {
            actionElement.classList.add('selected');
            this.responses.careActions.push(action);
        }
        
        // Show care actions summary
        this.showCareActionsSummary();
        this.updateProgress();
    }
    
    // Added method for teamwork rating selection (scene 2)
    selectTeamworkRating(rating) {
        // Update button states
        document.querySelectorAll('.rating-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-rating="${rating}"]`).classList.add('selected');
        
        // Store response
        this.responses.teamworkRating = [rating];
        
        // Show response
        this.showResponse(this.teamworkTemplates[rating]);
        
        // Update progress
        this.updateProgress();
    }
    
    // Added method for feeling selection (scene 3)
    selectFeeling(feeling) {
        const feelingElement = document.querySelector(`[data-feeling="${feeling}"]`);
        
        if(feelingElement.classList.contains('selected')) {
            feelingElement.classList.remove('selected');
            this.responses.feelings = this.responses.feelings.filter(f => f !== feeling);
        } else {
            feelingElement.classList.add('selected');
            this.responses.feelings.push(feeling);
        }
        
        // Show feelings summary
        this.showFeelingsSummary();
        this.updateProgress();
    }
    
    // Added method to show feelings summary
    showFeelingsSummary() {
        const feelings = this.responses.feelings;
        if(feelings.length > 0) {
            const feelingTexts = {
                happy: '很开心',
                moved: '很感动',
                proud: '很自豪',
                inspired: '受到启发'
            };
            
            const summary = feelings.map(feeling => feelingTexts[feeling]).join('、');
            const response = `你的感受：${summary}。${this.feelingTemplates[feelings[0]]}`;
            this.showResponse(response);
        }
    }
    
    // Show care actions summary
    showCareActionsSummary() {
        const actions = this.responses.careActions;
        if(actions.length > 0) {
            const actionTexts = {
                water: '提水桶帮忙',
                cloth: '用湿衣服覆盖',
                pump: '用抽水机',
                together: '大家一起努力'
            };
            
            const summary = actions.map(action => actionTexts[action]).join('、');
            this.showResponse(`村民们通过以下方式爱护动物：${summary}。这些行为体现了人们对动物生命的尊重和保护意识。`);
        }
    }
    
    // Submit suggestion (keeping for compatibility)
    submitSuggestion() {
        const suggestion = document.getElementById('suggestionInput')?.value.trim();
        
        if(suggestion) {
            this.responses.suggestions.push(suggestion);
            
            // Show positive feedback
            this.showResponse(`很好的建议！"${suggestion}" 这个想法很有创意。在紧急情况下，每个人的帮助都很重要。你的建议体现了对动物的关爱和责任感。`);
            
            // Clear input
            document.getElementById('suggestionInput').value = '';
            
            // Update progress
            this.updateProgress();
            
            // Show completion message
            setTimeout(() => {
                this.showCompletionMessage();
            }, 2000);
        } else {
            // Show prompt for input
            this.showResponse('请输入你的建议，分享你的想法！');
        }
    }
    
    // Added method for learning submission (scene 3)
    submitLearning() {
        const learning = document.getElementById('learningInput')?.value.trim();
        
        if(learning) {
            this.responses.learnings.push(learning);
            
            // Show positive feedback
            this.showResponse(`很棒的感悟！"${learning}" 这个学习体会很深刻。通过这个故事，我们不仅看到了人与动物和谐相处的美好，也学会了团结合作的重要性。你的思考很有价值！`);
            
            // Clear input
            document.getElementById('learningInput').value = '';
            
            // Update progress
            this.updateProgress();
            
            // Show completion message
            setTimeout(() => {
                this.showCompletionMessage();
            }, 2000);
        } else {
            // Show prompt for input
            this.showResponse('请分享你从这个故事中学到了什么！');
        }
    }
    
    // Show response in the response display area
    showResponse(message) {
        const responseContent = document.getElementById('responseContent');
        responseContent.innerHTML = `<p>${message}</p>`;
        
        // Add fade-in animation
        responseContent.style.animation = 'fadeIn 0.5s ease-in-out';
    }
    
    // Modified progress calculation to include new response types
    updateProgress() {
        const totalSteps = 5; // opinions + care actions + teamwork rating + feelings + learnings
        let completedSteps = 0;
        
        if(this.responses.opinions.length > 0) completedSteps++;
        if(this.responses.careActions.length > 0) completedSteps++;
        if(this.responses.teamworkRating.length > 0) completedSteps++;
        if(this.responses.feelings.length > 0) completedSteps++;
        if(this.responses.learnings.length > 0) completedSteps++;
        
        this.progress = (completedSteps / totalSteps) * 100;
        document.getElementById('progressFill').style.width = `${this.progress}%`;
    }
    
    // Show completion message
    showCompletionMessage() {
        if(this.progress === 100) {
            this.showResponse(`
                🎉 恭喜你完成了所有讨论！<br><br>
                通过这个故事，我们学到了：<br>
                • 要有爱心和责任感<br>
                • 团结合作的力量很大<br>
                • 保护动物是每个人的责任<br>
                • 在困难面前要勇敢行动<br>
                • 每个人的参与都很重要<br><br>
                你的参与和思考都很棒！
            `);
        }
    }
    
    // Initialize tooltip functionality
    initTooltips() {
        const tooltip = document.getElementById('tooltip');
        const tooltipContent = document.getElementById('tooltipContent');
        
        // Add tooltips to various elements
        const tooltipElements = [
            { selector: '.nav-btn[data-scene="1"]', text: '发现鲸鱼：阿东和弟弟发现搁浅的鲸鱼' },
            { selector: '.nav-btn[data-scene="2"]', text: '村民帮忙：大家一起救助鲸鱼' },
            { selector: '.nav-btn[data-scene="3"]', text: '鲸鱼获救：涨潮时鲸鱼回到大海' },
            { selector: '.whale', text: '这是搁浅的鲸鱼，需要大家的帮助' },
            { selector: '.progress-bar', text: '显示你的讨论进度' }
        ];
        
        tooltipElements.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach(element => {
                element.addEventListener('mouseenter', (e) => {
                    tooltipContent.textContent = item.text;
                    tooltip.classList.add('show');
                    this.positionTooltip(e, tooltip);
                });
                
                element.addEventListener('mouseleave', () => {
                    tooltip.classList.remove('show');
                });
                
                element.addEventListener('mousemove', (e) => {
                    this.positionTooltip(e, tooltip);
                });
            });
        });
    }
    
    // Position tooltip near cursor
    positionTooltip(event, tooltip) {
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.top = `${event.clientY - 30}px`;
    }
    
    // Handle keyboard navigation
    handleKeyboard(event) {
        switch(event.key) {
            case 'ArrowLeft':
                if(this.currentScene > 1) {
                    this.switchScene(this.currentScene - 1);
                }
                break;
            case 'ArrowRight':
                if(this.currentScene < 3) {
                    this.switchScene(this.currentScene + 1);
                }
                break;
            case 'Enter':
                if(event.target.tagName === 'TEXTAREA') {
                    event.preventDefault();
                    if(event.target.id === 'learningInput') {
                        this.submitLearning();
                    } else {
                        this.submitSuggestion();
                    }
                }
                break;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create and start the interactive application
    const app = new WhaleRescueInteractive();
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pump {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes waveMotion {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(20px); }
        }
    `;
    document.head.appendChild(style);
    
    // Add responsive behavior for iframe detection
    function adjustForIframe() {
        const container = document.querySelector('.container');
        if(window.self !== window.top) {
            // We're in an iframe
            container.style.height = '450px';
        } else {
            // We're in a full browser window
            container.style.height = '90vh';
        }
    }
    
    // Call on load and resize
    adjustForIframe();
    window.addEventListener('resize', adjustForIframe);
    
    // Add touch support for mobile devices
    if('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback
        document.querySelectorAll('button, .action-item').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
});