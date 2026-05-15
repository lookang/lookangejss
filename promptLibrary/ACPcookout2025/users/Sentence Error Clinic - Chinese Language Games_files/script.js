// Main application class for the sentence clinic game
class SentenceClinic {
    constructor() {
        // Initialize DOM elements
        this.sentenceInput = document.getElementById('sentenceInput');
        this.diagnoseBtn = document.getElementById('diagnoseBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.resultPanel = document.getElementById('resultPanel');
        this.examplesContent = document.getElementById('examplesContent');
        this.examplesTitle = document.querySelector('.examples-title');
        this.tooltip = document.getElementById('tooltip');
        
        // Initialize result content elements
        this.diagnosisContent = document.getElementById('diagnosisContent');
        this.treatmentContent = document.getElementById('treatmentContent');
        this.explanationContent = document.getElementById('explanationContent');
        this.encouragementContent = document.getElementById('encouragementContent');
        
        // Bind event listeners
        this.bindEvents();
        
        // Initialize examples panel as collapsed on mobile
        this.initializeExamplesPanel();
        
        // Database of sentence patterns and their corrections
        this.sentenceDatabase = this.initializeSentenceDatabase();
    }
    
    // Initialize event listeners for all interactive elements
    bindEvents() {
        // Main diagnosis button
        this.diagnoseBtn.addEventListener('click', () => this.diagnoseSentence());
        
        // Clear button
        this.clearBtn.addEventListener('click', () => this.clearAll());
        
        // Enter key support for textarea
        this.sentenceInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.diagnoseSentence();
            }
        });
        
        // Examples panel toggle
        this.examplesTitle.addEventListener('click', () => this.toggleExamples());
        
        // Example sentence click handlers
        document.querySelectorAll('.example-item').forEach(item => {
            item.addEventListener('click', () => {
                const sentence = item.dataset.sentence;
                this.sentenceInput.value = sentence;
                this.sentenceInput.focus();
            });
        });
        
        // Tooltip functionality
        this.initializeTooltips();
    }
    
    // Initialize the sentence database with patterns and corrections
    initializeSentenceDatabase() {
        return [
            {
                pattern: /你吃先/,
                type: '语序不当',
                correction: '你先吃',
                explanation: '时间副词"先"应该放在动词"吃"的前面，这样句子读起来更自然。'
            },
            {
                pattern: /我们的双手弄脏了在劳动中/,
                type: '语序不当',
                correction: '在劳动中我们的双手弄脏了',
                explanation: '地点状语"在劳动中"应该放在句子的开头，这样逻辑更清晰。'
            },
            {
                pattern: /不管天气十分炎热/,
                type: '关联词语搭配不当',
                correction: '尽管天气十分炎热，大家还是坚持锻炼身体',
                explanation: '"不管"通常用于假设条件，而"尽管"更适合表示转折关系。'
            },
            {
                pattern: /穿着.*风衣和.*帽子/,
                type: '词语搭配错误',
                correction: '玛莎穿着一件蓝色的风衣，戴着一顶黄色的帽子',
                explanation: '衣服用"穿"，帽子用"戴"，动词要搭配准确。'
            },
            {
                pattern: /听了.*话，很受教育/,
                type: '缺少主语',
                correction: '听了老师的一番话，我很受教育',
                explanation: '句子缺少主语，需要说明是"谁"受到了教育。'
            },
            {
                pattern: /眼睛注视地看着/,
                type: '语义重复',
                correction: '上课时，小华的眼睛注视着老师',
                explanation: '"注视"本身就包含了"看"的意思，不需要重复。'
            },
            {
                pattern: /许许多多数不清/,
                type: '语义重复',
                correction: '广场上挤满了许许多多的人群',
                explanation: '"许许多多"和"数不清"意思相近，保留一个即可。'
            },
            {
                pattern: /小明的病.*恢复了健康/,
                type: '搭配错误',
                correction: '经过治疗，小明恢复了健康',
                explanation: '是人恢复健康，不是病恢复健康。主语应该是"小明"。'
            },
            {
                pattern: /所有的.*我大部分都/,
                type: '前后矛盾',
                correction: '这里的景点，我大部分都游览过',
                explanation: '"所有"和"大部分"是矛盾的，不能同时使用。'
            },
            {
                pattern: /不正确的错字/,
                type: '语义重复',
                correction: '作文写好以后，我们要学会把错字改正过来',
                explanation: '"错字"本身就是不正确的，"不正确的"是多余的修饰。'
            },
            {
                pattern: /不爱惜粮食，任意浪费的是可耻的/,
                type: '句子成分残缺',
                correction: '这种不爱惜粮食，任意浪费的行为是可耻的',
                explanation: '句子缺少宾语，需要说明什么"是可耻的"。'
            },
            {
                pattern: /数量.*提高/,
                type: '词语搭配问题',
                correction: '现在市场上商品的质量大大提高了',
                explanation: '数量用"增加"，质量用"提高"，动词搭配要准确。'
            }
        ];
    }
    
    // Main diagnosis function
    diagnoseSentence() {
        const sentence = this.sentenceInput.value.trim();
        
        if (!sentence) {
            this.showTooltip('请先输入一个句子哦！', this.sentenceInput);
            return;
        }
        
        // Check if sentence has issues
        const diagnosis = this.analyzeSentence(sentence);
        this.displayDiagnosis(diagnosis);
        this.resultPanel.style.display = 'block';
        
        // Scroll to results on mobile
        if (window.innerWidth <= 768) {
            this.resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // Analyze sentence for common errors
    analyzeSentence(sentence) {
        // Check against known patterns
        for (let item of this.sentenceDatabase) {
            if (item.pattern.test(sentence)) {
                return {
                    hasError: true,
                    type: item.type,
                    correction: item.correction,
                    explanation: item.explanation,
                    original: sentence
                };
            }
        }
        
        // If no specific pattern matches, provide general feedback
        return this.generateGeneralFeedback(sentence);
    }
    
    // Generate feedback for sentences not in database
    generateGeneralFeedback(sentence) {
        // Basic checks for common issues
        const issues = [];
        
        // Check for missing subjects (sentences starting with verbs)
        if (/^[听看想说做写]/.test(sentence) && !sentence.includes('我') && !sentence.includes('他') && !sentence.includes('她')) {
            issues.push('可能缺少主语');
        }
        
        // Check for word order issues (common patterns)
        if (/很.*地.*着/.test(sentence)) {
            issues.push('可能存在语序问题');
        }
        
        // Check for redundant expressions
        if (/非常.*很/.test(sentence) || /十分.*很/.test(sentence)) {
            issues.push('可能存在语义重复');
        }
        
        if (issues.length > 0) {
            return {
                hasError: true,
                type: issues.join('、'),
                correction: '建议检查句子的' + issues.join('和') + '问题',
                explanation: '这个句子可能存在一些小问题，建议仔细检查一下语法结构。',
                original: sentence
            };
        }
        
        // If no issues found
        return {
            hasError: false,
            type: '句子健康',
            correction: '这个句子很棒！',
            explanation: '句子结构完整，表达清晰，没有发现明显的语法问题。',
            original: sentence
        };
    }
    
    // Display diagnosis results with friendly formatting
    displayDiagnosis(diagnosis) {
        // Diagnosis report
        if (diagnosis.hasError) {
            this.diagnosisContent.innerHTML = `
                <span style="color: #f44336;">发现问题：${diagnosis.type}</span><br>
                <small style="color: #666;">原句：${diagnosis.original}</small>
            `;
        } else {
            this.diagnosisContent.innerHTML = `
                <span style="color: #4caf50;">✅ 句子很健康！</span><br>
                <small style="color: #666;">没有发现明显的语法问题</small>
            `;
        }
        
        // Treatment plan
        this.treatmentContent.innerHTML = diagnosis.correction;
        
        // Explanation
        this.explanationContent.innerHTML = diagnosis.explanation;
        
        // Encouragement
        this.encouragementContent.innerHTML = this.getRandomEncouragement(diagnosis.hasError);
    }
    
    // Get random encouragement message
    getRandomEncouragement(hasError) {
        const encouragements = hasError ? [
            "别担心，每个句子都能治好，我相信你！ 💪",
            "发现问题就是进步的开始，继续加油！ 🌟",
            "语法就像拼图，慢慢拼就能完整啦！ 🧩",
            "每次修改都让你的语文更进步！ 📈",
            "不错不错，这样练习下去一定会越来越好！ 👍"
        ] : [
            "太棒了！你的语感很好呢！ 🎉",
            "完美！继续保持这样的水平！ ⭐",
            "句子写得很棒，语法功底不错！ 👏",
            "很好！可以挑战更复杂的句子了！ 🚀",
            "优秀！你已经掌握了基本的语法规则！ 🏆"
        ];
        
        return encouragements[Math.floor(Math.random() * encouragements.length)];
    }
    
    // Clear all inputs and results
    clearAll() {
        this.sentenceInput.value = '';
        this.resultPanel.style.display = 'none';
        this.sentenceInput.focus();
        
        // Reset welcome message
        document.getElementById('welcomeMessage').innerHTML = 
            '欢迎来到病句诊所！我是您的病句医生，专门帮助诊断和治疗"生病的句子"。请在下方输入您想检查的句子吧！';
    }
    
    // Toggle examples panel
    toggleExamples() {
        const isCollapsed = this.examplesContent.classList.contains('collapsed');
        
        if (isCollapsed) {
            this.examplesContent.classList.remove('collapsed');
            this.examplesTitle.classList.remove('collapsed');
        } else {
            this.examplesContent.classList.add('collapsed');
            this.examplesTitle.classList.add('collapsed');
        }
    }
    
    // Initialize examples panel state
    initializeExamplesPanel() {
        // Collapse on mobile by default to save space
        if (window.innerWidth <= 768) {
            this.examplesContent.classList.add('collapsed');
            this.examplesTitle.classList.add('collapsed');
        }
    }
    
    // Initialize tooltip functionality
    initializeTooltips() {
        // Add tooltip to elements with title attribute
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(element.title, element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }
    
    // Show tooltip
    showTooltip(text, targetElement) {
        this.tooltip.textContent = text;
        this.tooltip.classList.add('show');
        
        // Position tooltip
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        
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
        
        this.tooltip.style.left = left + 'px';
        this.tooltip.style.top = top + 'px';
    }
    
    // Hide tooltip
    hideTooltip() {
        this.tooltip.classList.remove('show');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if running in iframe and adjust container height
    if (window.self !== window.top) {
        document.body.style.height = '450px';
        document.querySelector('.container').style.height = '450px';
    } else {
        document.body.style.height = '90vh';
        document.querySelector('.container').style.height = '90vh';
    }
    
    // Initialize the sentence clinic application
    const clinic = new SentenceClinic();
    
    // Add some visual feedback for touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback to buttons
        document.querySelectorAll('button, .example-item').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
    }
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', () => {
        clinic.hideTooltip();
    });
    
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});