// Main application class for the interactive activity
class WhaleRescueActivity {
    constructor() {
        // Initialize activity state
        this.currentScene = null;
        this.responses = [];
        this.timerMinutes = 15;
        this.timerSeconds = 0;
        this.timerInterval = null;
        this.isTimerRunning = false;
        this.partnerMode = false;
        
        // Scene data with questions and prompts
        this.sceneData = {
            1: {
                title: "发现鲸鱼",
                question: "阿东和弟弟发现搁浅的鲸鱼时，他们的反应如何？你觉得他们这样做对吗？为什么？",
                details: "阿东急得团团转说：'鲸鱼搁浅了，怎么办？如果没有水，它就会死掉，我们要赶快救它！'"
            },
            2: {
                title: "开始救援", 
                question: "阿东说需要一千桶水来救鲸鱼，你觉得这个想法怎么样？如果是你，你会怎么做？",
                details: "兄弟俩喘着气，来来回回地跑着，汗水湿透了衣服。到底提了多少桶水，都数不清了。"
            },
            3: {
                title: "村民帮忙",
                question: "村民们看到后也来帮忙，你觉得他们的行为如何？这说明了什么？",
                details: "村民们提着水桶来帮忙，有人脱下上衣盖在鲸鱼身上，阿福伯还开车载来抽水机。"
            },
            4: {
                title: "成功救援",
                question: "最后鲸鱼得救了，它向大家道谢。你从这个故事中学到了什么？",
                details: "鲸鱼一次又一次地喷出水柱，好像在向大家道谢。村民们也挥着手，依依不舍地跟鲸鱼道别。"
            }
        };
        
        this.initializeElements();
        this.bindEvents();
        this.updateTimer();
    }
    
    // Initialize DOM elements
    initializeElements() {
        this.sceneCards = document.querySelectorAll('.scene-card');
        this.questionPrompt = document.getElementById('currentQuestion');
        this.scaffoldBtns = document.querySelectorAll('.scaffold-btn');
        this.responseDisplay = document.getElementById('responseDisplay');
        this.clearBtn = document.getElementById('clearBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.timerDisplay = document.getElementById('timerDisplay');
        this.timerBtn = document.getElementById('timerBtn');
        this.partnerModeCheckbox = document.getElementById('partnerMode');
        this.progressFill = document.getElementById('progressFill');
        this.centerTooltip = document.getElementById('centerTooltip');
        this.headerTooltip = document.getElementById('headerTooltip');
    }
    
    // Bind all event listeners
    bindEvents() {
        // Scene card clicks
        this.sceneCards.forEach(card => {
            card.addEventListener('click', (e) => this.selectScene(e));
        });
        
        // Language scaffold button clicks
        this.scaffoldBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.addScaffold(e));
        });
        
        // Control button clicks
        this.clearBtn.addEventListener('click', () => this.clearResponses());
        this.shareBtn.addEventListener('click', () => this.shareResponse());
        
        // Timer controls
        this.timerBtn.addEventListener('click', () => this.toggleTimer());
        
        // Partner mode toggle
        this.partnerModeCheckbox.addEventListener('change', (e) => {
            this.partnerMode = e.target.checked;
            this.updatePartnerMode();
        });
        
        // Header tooltip click for mobile
        this.headerTooltip.addEventListener('click', () => this.showCenterTooltip());
        
        // Center tooltip close
        document.querySelector('.tooltip-close').addEventListener('click', () => {
            this.centerTooltip.classList.remove('show');
        });
        
        // Close tooltip when clicking outside
        this.centerTooltip.addEventListener('click', (e) => {
            if (e.target === this.centerTooltip) {
                this.centerTooltip.classList.remove('show');
            }
        });
    }
    
    // Handle scene selection
    selectScene(event) {
        const sceneNum = parseInt(event.currentTarget.dataset.scene);
        
        // Remove active class from all cards
        this.sceneCards.forEach(card => card.classList.remove('active'));
        
        // Add active class to selected card
        event.currentTarget.classList.add('active');
        
        // Update current scene
        this.currentScene = sceneNum;
        
        // Update question prompt
        const sceneInfo = this.sceneData[sceneNum];
        this.questionPrompt.textContent = sceneInfo.question;
        this.questionPrompt.classList.add('active');
        
        // Update progress
        this.updateProgress();
        
        // Show scene details in center tooltip on mobile
        if (window.innerWidth <= 600) {
            this.showSceneDetails(sceneNum);
        }
    }
    
    // Add language scaffold to response
    addScaffold(event) {
        const scaffoldText = event.target.dataset.text;
        
        // Create response item with larger font size for better readability
        const responseItem = document.createElement('div');
        responseItem.className = 'response-item';
        responseItem.innerHTML = `
            <strong>${scaffoldText}</strong>
            <span class="response-input" contenteditable="true" placeholder="继续表达你的想法..." style="font-size: 13px;"></span>
        `;
        
        // Remove placeholder if it exists
        const placeholder = this.responseDisplay.querySelector('.response-placeholder');
        if (placeholder) {
            placeholder.remove();
        }
        
        // Add to response display
        this.responseDisplay.appendChild(responseItem);
        
        // Focus on the editable span
        const inputSpan = responseItem.querySelector('.response-input');
        inputSpan.focus();
        
        // Add to responses array
        this.responses.push({
            scene: this.currentScene,
            scaffold: scaffoldText,
            timestamp: new Date()
        });
        
        // Update progress
        this.updateProgress();
        
        // Add visual feedback
        event.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            event.target.style.transform = '';
        }, 150);
    }
    
    // Clear all responses
    clearResponses() {
        this.responseDisplay.innerHTML = '<div class="response-placeholder">选择语言支架开始表达想法</div>';
        this.responses = [];
        this.updateProgress();
        
        // Visual feedback
        this.clearBtn.style.background = '#ff5722';
        setTimeout(() => {
            this.clearBtn.style.background = '';
        }, 200);
    }
    
    // Share response (simulate sharing)
    shareResponse() {
        if (this.responses.length === 0) {
            this.showNotification('请先添加一些想法再分享！');
            return;
        }
        
        // Collect all response text
        const responseTexts = Array.from(this.responseDisplay.querySelectorAll('.response-item')).map(item => {
            const scaffold = item.querySelector('strong').textContent;
            const input = item.querySelector('.response-input').textContent || '';
            return `${scaffold} ${input}`.trim();
        });
        
        // Show sharing notification
        this.showNotification(`已分享 ${responseTexts.length} 个观点！${this.partnerMode ? ' 等待同伴反馈...' : ''}`);
        
        // Visual feedback
        this.shareBtn.style.transform = 'scale(0.95)';
        this.shareBtn.style.background = '#45a049';
        setTimeout(() => {
            this.shareBtn.style.transform = '';
            this.shareBtn.style.background = '';
        }, 300);
    }
    
    // Toggle timer
    toggleTimer() {
        if (this.isTimerRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }
    
    // Start timer
    startTimer() {
        this.isTimerRunning = true;
        this.timerBtn.textContent = '暂停';
        this.timerBtn.style.background = '#f44336';
        
        this.timerInterval = setInterval(() => {
            if (this.timerSeconds > 0) {
                this.timerSeconds--;
            } else if (this.timerMinutes > 0) {
                this.timerMinutes--;
                this.timerSeconds = 59;
            } else {
                // Timer finished
                this.finishTimer();
                return;
            }
            this.updateTimer();
        }, 1000);
    }
    
    // Pause timer
    pauseTimer() {
        this.isTimerRunning = false;
        this.timerBtn.textContent = '继续';
        this.timerBtn.style.background = '#ff9800';
        clearInterval(this.timerInterval);
    }
    
    // Finish timer
    finishTimer() {
        this.isTimerRunning = false;
        this.timerBtn.textContent = '重新开始';
        this.timerBtn.style.background = '#4caf50';
        clearInterval(this.timerInterval);
        this.showNotification('活动时间结束！请进行总结分享。');
    }
    
    // Update timer display
    updateTimer() {
        const minutes = this.timerMinutes.toString().padStart(2, '0');
        const seconds = this.timerSeconds.toString().padStart(2, '0');
        this.timerDisplay.textContent = `${minutes}:${seconds}`;
        
        // Update timer color based on remaining time
        const totalSeconds = this.timerMinutes * 60 + this.timerSeconds;
        if (totalSeconds <= 60) {
            this.timerDisplay.style.color = '#f44336'; // Red for last minute
        } else if (totalSeconds <= 300) {
            this.timerDisplay.style.color = '#ff9800'; // Orange for last 5 minutes
        } else {
            this.timerDisplay.style.color = '#333';
        }
    }
    
    // Update partner mode
    updatePartnerMode() {
        const discussionHeader = document.querySelector('.discussion-header h3');
        if (this.partnerMode) {
            discussionHeader.textContent = '双人讨论区域';
            this.showNotification('已启用双人模式！请与同伴一起讨论。');
        } else {
            discussionHeader.textContent = '讨论区域';
        }
    }
    
    // Update progress indicator
    updateProgress() {
        const totalScenes = Object.keys(this.sceneData).length;
        const completedScenes = this.currentScene ? 1 : 0;
        const responseProgress = Math.min(this.responses.length / 4, 1); // Max 4 responses expected
        
        const overallProgress = ((completedScenes / totalScenes) * 50) + (responseProgress * 50);
        this.progressFill.style.width = `${overallProgress}%`;
        
        // Update progress text
        const progressText = document.querySelector('.progress-text');
        if (overallProgress >= 100) {
            progressText.textContent = '活动完成';
            progressText.style.color = '#4caf50';
        } else {
            progressText.textContent = `活动进度 ${Math.round(overallProgress)}%`;
        }
    }
    
    // Show center tooltip with larger font size for better readability
    showCenterTooltip() {
        const content = this.centerTooltip.querySelector('.tooltip-content');
        content.innerHTML = `
            <h3 style="font-size: 18px; margin-bottom: 12px;">《一千桶水》口语互动活动</h3>
            <p style="font-size: 15px; margin-bottom: 8px;"><strong>学习目标：</strong>学生能对人物的行为发表看法，并说明理由。</p>
            <p style="font-size: 15px; margin-bottom: 8px;"><strong>活动说明：</strong></p>
            <ul style="font-size: 14px; margin-left: 20px; margin-bottom: 8px;">
                <li style="margin-bottom: 4px;">点击场景卡片选择讨论话题</li>
                <li style="margin-bottom: 4px;">使用语言支架表达观点</li>
                <li style="margin-bottom: 4px;">双人模式可与同伴互动</li>
                <li style="margin-bottom: 4px;">活动时长15-20分钟</li>
            </ul>
            <p style="font-size: 15px; margin-bottom: 8px;"><strong>语言支架使用提示：</strong></p>
            <ul style="font-size: 14px; margin-left: 20px;">
                <li style="margin-bottom: 4px;">"我觉得他这样做..." - 表达对行为的看法</li>
                <li style="margin-bottom: 4px;">"你说得有道理。可是..." - 回应并提出不同观点</li>
                <li style="margin-bottom: 4px;">"如果是我，我会..." - 提出自己的做法</li>
                <li style="margin-bottom: 4px;">"这个主意不错" - 表示赞同</li>
            </ul>
        `;
        this.centerTooltip.classList.add('show');
    }
    
    // Show scene details in center tooltip with larger font size
    showSceneDetails(sceneNum) {
        const sceneInfo = this.sceneData[sceneNum];
        const content = this.centerTooltip.querySelector('.tooltip-content');
        content.innerHTML = `
            <h3 style="font-size: 18px; margin-bottom: 12px;">${sceneInfo.title}</h3>
            <p style="font-size: 15px; margin-bottom: 8px;"><strong>讨论问题：</strong></p>
            <p style="font-size: 14px; margin-bottom: 12px; line-height: 1.6;">${sceneInfo.question}</p>
            <p style="font-size: 15px; margin-bottom: 8px;"><strong>故事情节：</strong></p>
            <p style="font-size: 14px; line-height: 1.6;">${sceneInfo.details}</p>
        `;
        this.centerTooltip.classList.add('show');
    }
    
    // Show notification with larger font size for better visibility
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 14px 18px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 3000;
            max-width: 280px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            line-height: 1.4;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the activity when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WhaleRescueActivity();
});

// Handle responsive height changes
window.addEventListener('resize', () => {
    // Adjust container height based on viewport
    const container = document.querySelector('.container');
    if (window.innerHeight >= 500 && window.innerWidth >= 800) {
        container.style.height = '90vh';
        container.style.maxHeight = '90vh';
    } else {
        container.style.height = '450px';
        container.style.maxHeight = '450px';
    }
});