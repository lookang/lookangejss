// Game State Management
class HawkerCultureDetective {
    constructor() {
        this.gameState = {
            currentScreen: 'map',
            currentStall: null,
            currentQuestion: 0,
            cluesCollected: 0,
            totalScore: 0,
            completedStalls: [],
            stallProgress: {},
            timerStarted: false,
            startTime: null,
            showTimer: false
        };
        
        this.stallData = {
            chinese: {
                name: '中式档口 Chinese Stall',
                avatar: '👨‍🍳',
                dialogue: '欢迎光临！我们这里有很多传统中式小食。你想了解什么？',
                tooltip: 'Welcome! We have many traditional Chinese snacks here. What would you like to know?',
                choices: [
                    {
                        text: '请问这些点心有什么历史？',
                        tooltip: 'What is the history of these dim sum?',
                        correct: true,
                        feedback: '很好！中式点心源于广东，随着华人移民传到新加坡，成为小贩文化的重要组成部分。'
                    },
                    {
                        text: '我要最便宜的食物。',
                        tooltip: 'I want the cheapest food.',
                        correct: false,
                        feedback: '礼貌地询问食物的文化背景更能体现对传统的尊重哦！'
                    },
                    {
                        text: '你们的食物干净吗？',
                        tooltip: 'Is your food clean?',
                        correct: false,
                        feedback: '新加坡的小贩中心都有严格的卫生标准，我们可以更礼貌地了解食物特色。'
                    }
                ],
                clue: '中式档口线索：华人移民带来了广东点心传统，丰富了新加坡的饮食文化。'
            },
            malay: {
                name: '马来档口 Malay Stall',
                avatar: '👩‍🍳',
                dialogue: '你好！我们的马来菜融合了很多香料。你想尝试什么？',
                tooltip: 'Hello! Our Malay dishes blend many spices. What would you like to try?',
                choices: [
                    {
                        text: '能介绍一下椰浆饭的文化意义吗？',
                        tooltip: 'Can you tell me about the cultural significance of nasi lemak?',
                        correct: true,
                        feedback: '椰浆饭是马来文化的象征，代表了马来社区对香料和椰子的巧妙运用，体现了文化传承。'
                    },
                    {
                        text: '这个太辣了，有不辣的吗？',
                        tooltip: 'This is too spicy, do you have non-spicy options?',
                        correct: false,
                        feedback: '可以礼貌地询问："请问有比较温和的口味吗？"这样更尊重文化特色。'
                    },
                    {
                        text: '马来菜都很油腻吧？',
                        tooltip: 'Malay food is all very oily, right?',
                        correct: false,
                        feedback: '这样的偏见不利于文化交流。马来菜有丰富的烹饪方式和健康选择。'
                    }
                ],
                clue: '马来档口线索：马来菜的香料运用展现了马来文化的精髓，椰浆饭是文化认同的象征。'
            },
            indian: {
                name: '印度档口 Indian Stall',
                avatar: '👨‍🍳',
                dialogue: '欢迎！我们的印度菜有很多素食选择，适合不同信仰的人。',
                tooltip: 'Welcome! Our Indian food has many vegetarian options, suitable for people of different faiths.',
                choices: [
                    {
                        text: '素食选择体现了什么文化价值？',
                        tooltip: 'What cultural values do vegetarian options reflect?',
                        correct: true,
                        feedback: '很棒！素食选择体现了印度文化中的宗教包容性和对不同饮食需求的尊重，促进了多元和谐。'
                    },
                    {
                        text: '印度菜为什么这么多咖喱？',
                        tooltip: 'Why does Indian food have so much curry?',
                        correct: false,
                        feedback: '可以更深入地了解："咖喱在印度文化中有什么特殊意义？"这样能学到更多文化知识。'
                    },
                    {
                        text: '你们用手吃饭很不卫生。',
                        tooltip: 'Eating with hands is very unhygienic.',
                        correct: false,
                        feedback: '这是文化偏见。用手吃饭是印度传统文化的一部分，有其文化意义和正确方式。'
                    }
                ],
                clue: '印度档口线索：印度菜的素食传统体现了宗教包容，丰富了新加坡的多元饮食文化。'
            },
            fusion: {
                name: '融合档口 Fusion Stall',
                avatar: '👨‍🍳',
                dialogue: '这里有很多创新菜式，结合了不同文化的精华！',
                tooltip: 'We have many innovative dishes here that combine the essence of different cultures!',
                choices: [
                    {
                        text: '融合菜如何体现新加坡特色？',
                        tooltip: 'How does fusion cuisine reflect Singapore\'s characteristics?',
                        correct: true,
                        feedback: '非常好！融合菜体现了新加坡多元文化的和谐共存，创造出独特的本土特色，这就是文化融合的魅力。'
                    },
                    {
                        text: '这些菜不正宗，不如传统菜。',
                        tooltip: 'These dishes are not authentic, not as good as traditional dishes.',
                        correct: false,
                        feedback: '创新不代表不尊重传统。融合菜是文化交流的结果，体现了新加坡的包容性。'
                    },
                    {
                        text: '随便给我一个最受欢迎的。',
                        tooltip: 'Just give me whatever is most popular.',
                        correct: false,
                        feedback: '了解菜品背后的文化故事更有意义，这样能更好地欣赏文化融合的价值。'
                    }
                ],
                clue: '融合档口线索：创新融合菜体现了新加坡多元文化的和谐共存和创新精神。'
            }
        };
        
        this.quizQuestions = [
            {
                question: '新加坡小贩文化最重要的特点是什么？\nWhat is the most important characteristic of Singapore\'s hawker culture?',
                options: [
                    'A. 价格便宜 Cheap prices',
                    'B. 多元文化融合 Multicultural integration',
                    'C. 食物美味 Delicious food',
                    'D. 营业时间长 Long operating hours'
                ],
                correct: 1,
                explanation: '多元文化融合是新加坡小贩文化的核心特点，体现了不同族群的和谐共存。'
            },
            {
                question: '小贩中心对新加坡社会的主要作用是什么？\nWhat is the main role of hawker centers in Singapore society?',
                options: [
                    'A. 提供就业机会 Provide employment',
                    'B. 促进社会交流和文化传承 Promote social interaction and cultural heritage',
                    'C. 增加政府收入 Increase government revenue',
                    'D. 发展旅游业 Develop tourism'
                ],
                correct: 1,
                explanation: '小贩中心是重要的社交场所，促进不同族群的交流，传承各自的文化传统。'
            },
            {
                question: '为什么说小贩文化体现了新加坡的国家认同？\nWhy does hawker culture reflect Singapore\'s national identity?',
                options: [
                    'A. 因为政府大力推广 Government promotion',
                    'B. 因为游客很喜欢 Tourists love it',
                    'C. 因为它融合了各族群的文化特色 It integrates cultural features of all ethnic groups',
                    'D. 因为历史悠久 Long history'
                ],
                correct: 2,
                explanation: '小贩文化融合了华人、马来人、印度人等各族群的饮食文化，体现了"多元一体"的国家特色。'
            },
            {
                question: '在小贩中心用餐时，最能体现文化尊重的行为是？\nWhen dining at hawker centers, which behavior best shows cultural respect?',
                options: [
                    'A. 只吃自己熟悉的食物 Only eat familiar food',
                    'B. 了解不同菜式的文化背景 Learn about cultural backgrounds of different dishes',
                    'C. 快速用餐离开 Eat quickly and leave',
                    'D. 大声讨论食物 Discuss food loudly'
                ],
                correct: 1,
                explanation: '了解和尊重不同菜式的文化背景，体现了对多元文化的欣赏和包容。'
            },
            {
                question: '小贩文化对新加坡年轻一代的意义是什么？\nWhat does hawker culture mean to Singapore\'s younger generation?',
                options: [
                    'A. 便宜的用餐选择 Cheap dining option',
                    'B. 文化身份认同的重要载体 Important carrier of cultural identity',
                    'C. 怀旧的象征 Symbol of nostalgia',
                    'D. 商业机会 Business opportunity'
                ],
                correct: 1,
                explanation: '小贩文化是年轻一代了解和传承多元文化传统的重要途径，有助于建立文化认同感。'
            },
            {
                question: '保护小贩文化最重要的原因是什么？\nWhat is the most important reason to preserve hawker culture?',
                options: [
                    'A. 维持传统口味 Maintain traditional flavors',
                    'B. 支持小贩生计 Support hawkers\' livelihoods',
                    'C. 传承多元文化价值和促进社会和谐 Preserve multicultural values and promote social harmony',
                    'D. 吸引更多游客 Attract more tourists'
                ],
                correct: 2,
                explanation: '保护小贩文化最重要的是传承其承载的多元文化价值，维护社会和谐，这是新加坡国家认同的重要组成部分。'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.showScreen('map');
        this.updateProgress();
        this.startTimer();
    }
    
    bindEvents() {
        // Stall clicks
        document.querySelectorAll('.stall').forEach(stall => {
            stall.addEventListener('click', (e) => {
                const stallType = e.currentTarget.dataset.stall;
                this.enterStall(stallType);
            });
        });
        
        // Reflection corner click
        document.getElementById('reflectionCorner').addEventListener('click', () => {
            if (this.gameState.cluesCollected >= 3) {
                this.startQuiz();
            }
        });
        
        // Back button
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showScreen('map');
        });
        
        // Control buttons
        document.getElementById('hintBtn').addEventListener('click', () => {
            this.showHint();
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetGame();
        });
        
        document.getElementById('timerBtn').addEventListener('click', () => {
            this.toggleTimer();
        });
        
        // Quiz navigation
        document.getElementById('nextQuestionBtn').addEventListener('click', () => {
            this.nextQuestion();
        });
        
        // Results actions
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportResults();
        });
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.resetGame();
        });
        
        // Tooltip functionality
        this.setupTooltips();
    }
    
    setupTooltips() {
        const tooltip = document.getElementById('globalTooltip');
        
        document.addEventListener('mouseover', (e) => {
            const title = e.target.getAttribute('title');
            if (title) {
                tooltip.textContent = title;
                tooltip.classList.add('show');
                this.updateTooltipPosition(e, tooltip);
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (tooltip.classList.contains('show')) {
                this.updateTooltipPosition(e, tooltip);
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.getAttribute('title')) {
                tooltip.classList.remove('show');
            }
        });
    }
    
    updateTooltipPosition(e, tooltip) {
        const rect = document.getElementById('gameContainer').getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        tooltip.style.left = `${Math.min(x + 10, rect.width - 220)}px`;
        tooltip.style.top = `${Math.max(y - 30, 10)}px`;
    }
    
    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.map-hub, .stall-screen, .quiz-screen, .results-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        switch(screenName) {
            case 'map':
                document.getElementById('mapHub').classList.add('active');
                break;
            case 'stall':
                document.getElementById('stallScreen').classList.add('active');
                break;
            case 'quiz':
                document.getElementById('quizScreen').classList.add('active');
                break;
            case 'results':
                document.getElementById('resultsScreen').classList.add('active');
                break;
        }
        
        this.gameState.currentScreen = screenName;
    }
    
    enterStall(stallType) {
        this.gameState.currentStall = stallType;
        this.showScreen('stall');
        this.loadStallContent(stallType);
    }
    
    loadStallContent(stallType) {
        const stallData = this.stallData[stallType];
        
        // Update stall header
        document.getElementById('stallTitle').textContent = stallData.name;
        
        // Update character avatar
        document.getElementById('stallkeeper').textContent = stallData.avatar;
        
        // Update dialogue
        document.getElementById('dialogueText').textContent = stallData.dialogue;
        document.getElementById('dialogueTooltip').textContent = stallData.tooltip;
        
        // Load choices
        this.loadChoices(stallData.choices);
        
        // Hide feedback initially
        document.getElementById('feedbackSection').classList.remove('active');
    }
    
    loadChoices(choices) {
        const choicesSection = document.getElementById('choicesSection');
        choicesSection.innerHTML = '';
        
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.innerHTML = `${choice.text}<br><small style="opacity: 0.7;">${choice.tooltip}</small>`;
            button.addEventListener('click', () => {
                this.handleChoice(choice, button, index);
            });
            choicesSection.appendChild(button);
        });
    }
    
    handleChoice(choice, button, index) {
        // Disable all choice buttons
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
        });
        
        // Show feedback
        const feedbackSection = document.getElementById('feedbackSection');
        const feedbackText = document.getElementById('feedbackText');
        
        if (choice.correct) {
            button.classList.add('correct');
            this.gameState.totalScore += 20;
            this.gameState.cluesCollected++;
            
            // Mark stall as completed
            const stallType = this.gameState.currentStall;
            if (!this.gameState.completedStalls.includes(stallType)) {
                this.gameState.completedStalls.push(stallType);
                document.getElementById(stallType + 'Stall').classList.add('completed');
                document.getElementById(stallType + 'Badge').style.display = 'flex';
            }
            
            feedbackText.innerHTML = `<strong>正确！Correct!</strong><br>${choice.feedback}<br><br><strong>获得线索 Clue Obtained:</strong><br>${this.stallData[stallType].clue}`;
        } else {
            button.classList.add('incorrect');
            feedbackText.innerHTML = `<strong>再想想 Think Again!</strong><br>${choice.feedback}`;
        }
        
        feedbackSection.classList.add('active');
        this.updateProgress();
        
        // Check if reflection corner should be unlocked
        if (this.gameState.cluesCollected >= 3) {
            document.getElementById('reflectionCorner').classList.remove('locked');
        }
        
        // Auto return to map after 3 seconds
        setTimeout(() => {
            this.showScreen('map');
        }, 3000);
    }
    
    startQuiz() {
        this.gameState.currentQuestion = 0;
        this.showScreen('quiz');
        this.loadQuestion();
    }
    
    loadQuestion() {
        const question = this.quizQuestions[this.gameState.currentQuestion];
        
        document.getElementById('questionNumber').textContent = this.gameState.currentQuestion + 1;
        document.getElementById('totalQuestions').textContent = this.quizQuestions.length;
        document.getElementById('questionText').textContent = question.question;
        
        const optionsContainer = document.getElementById('questionOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => {
                this.handleQuizAnswer(index, button);
            });
            optionsContainer.appendChild(button);
        });
        
        document.getElementById('nextQuestionBtn').style.display = 'none';
    }
    
    handleQuizAnswer(selectedIndex, button) {
        const question = this.quizQuestions[this.gameState.currentQuestion];
        
        // Disable all option buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
        });
        
        if (selectedIndex === question.correct) {
            button.style.background = 'linear-gradient(145deg, #a8e6cf, #88d8a3)';
            button.style.borderColor = '#4CAF50';
            this.gameState.totalScore += 15;
        } else {
            button.style.background = 'linear-gradient(145deg, #ffcccb, #ff9999)';
            button.style.borderColor = '#f44336';
            
            // Highlight correct answer
            document.querySelectorAll('.option-btn')[question.correct].style.background = 'linear-gradient(145deg, #a8e6cf, #88d8a3)';
            document.querySelectorAll('.option-btn')[question.correct].style.borderColor = '#4CAF50';
        }
        
        // Show explanation
        const explanationDiv = document.createElement('div');
        explanationDiv.style.marginTop = '16px';
        explanationDiv.style.padding = '12px';
        explanationDiv.style.background = '#f8f9fa';
        explanationDiv.style.borderRadius = '8px';
        explanationDiv.style.fontSize = '13px';
        explanationDiv.innerHTML = `<strong>解释 Explanation:</strong><br>${question.explanation}`;
        document.getElementById('questionOptions').appendChild(explanationDiv);
        
        document.getElementById('nextQuestionBtn').style.display = 'block';
        this.updateProgress();
    }
    
    nextQuestion() {
        this.gameState.currentQuestion++;
        
        if (this.gameState.currentQuestion < this.quizQuestions.length) {
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }
    
    showResults() {
        this.showScreen('results');
        
        document.getElementById('finalClues').textContent = `${this.gameState.cluesCollected}/4`;
        document.getElementById('finalScore').textContent = this.gameState.totalScore;
    }
    
    updateProgress() {
        const progressPercentage = (this.gameState.cluesCollected / 4) * 100;
        document.getElementById('progressFill').style.width = `${progressPercentage}%`;
        document.getElementById('cluesCount').textContent = this.gameState.cluesCollected;
        document.getElementById('totalScore').textContent = this.gameState.totalScore;
    }
    
    showHint() {
        let hintText = '';
        
        if (this.gameState.currentScreen === 'map') {
            if (this.gameState.cluesCollected < 3) {
                hintText = '提示：点击不同的档口，礼貌地与档主对话，了解文化背景来收集线索！\nHint: Click on different stalls and politely interact with stall owners to learn about cultural backgrounds and collect clues!';
            } else {
                hintText = '提示：你已经收集了足够的线索，可以进入反思角落开始测验了！\nHint: You have collected enough clues, you can enter the Reflection Corner to start the quiz!';
            }
        } else if (this.gameState.currentScreen === 'stall') {
            hintText = '提示：选择最能体现文化尊重和学习态度的对话选项。\nHint: Choose dialogue options that show cultural respect and learning attitude.';
        } else if (this.gameState.currentScreen === 'quiz') {
            hintText = '提示：回想你在各个档口学到的文化知识来回答问题。\nHint: Recall the cultural knowledge you learned at each stall to answer the questions.';
        }
        
        if (hintText) {
            alert(hintText);
        }
    }
    
    resetGame() {
        if (confirm('确定要重置游戏进度吗？\nAre you sure you want to reset the game progress?')) {
            this.gameState = {
                currentScreen: 'map',
                currentStall: null,
                currentQuestion: 0,
                cluesCollected: 0,
                totalScore: 0,
                completedStalls: [],
                stallProgress: {},
                timerStarted: false,
                startTime: null,
                showTimer: false
            };
            
            // Reset UI
            document.querySelectorAll('.stall').forEach(stall => {
                stall.classList.remove('completed');
            });
            
            document.querySelectorAll('.completion-badge').forEach(badge => {
                badge.style.display = 'none';
            });
            
            document.getElementById('reflectionCorner').classList.add('locked');
            document.getElementById('reflectionText').value = '';
            
            this.showScreen('map');
            this.updateProgress();
            this.startTimer();
        }
    }
    
    startTimer() {
        this.gameState.startTime = Date.now();
        this.gameState.timerStarted = true;
        this.updateTimer();
    }
    
    updateTimer() {
        if (!this.gameState.timerStarted) return;
        
        const elapsed = Date.now() - this.gameState.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        document.getElementById('timerText').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        setTimeout(() => this.updateTimer(), 1000);
    }
    
    toggleTimer() {
        this.gameState.showTimer = !this.gameState.showTimer;
        const timerDisplay = document.getElementById('timerDisplay');
        
        if (this.gameState.showTimer) {
            timerDisplay.classList.add('active');
        } else {
            timerDisplay.classList.remove('active');
        }
    }
    
    exportResults() {
        const results = {
            timestamp: new Date().toISOString(),
            cluesCollected: this.gameState.cluesCollected,
            totalScore: this.gameState.totalScore,
            completedStalls: this.gameState.completedStalls,
            reflection: document.getElementById('reflectionText').value,
            timeSpent: this.gameState.timerStarted ? 
                Math.floor((Date.now() - this.gameState.startTime) / 1000) : 0
        };
        
        const dataStr = JSON.stringify(results, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `hawker_culture_detective_results_${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HawkerCultureDetective();
});