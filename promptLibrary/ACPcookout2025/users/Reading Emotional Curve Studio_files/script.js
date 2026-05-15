// Main application class for emotion curve analysis
class EmotionCurveAnalyzer {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.emotionData = [];
        this.canvas = document.getElementById('emotionCurve');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
    }

    // Initialize DOM elements
    initializeElements() {
        this.textInput = document.getElementById('textInput');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.resultsSection = document.getElementById('resultsSection');
        this.emotionStages = document.getElementById('emotionStages');
        this.curveDescription = document.getElementById('curveDescription');
        this.turningPoints = document.getElementById('turningPoints');
        this.reflection = document.getElementById('reflection');
        this.encouragement = document.getElementById('encouragement');
        this.curveNameInput = document.getElementById('curveNameInput');
        this.nameBtn = document.getElementById('nameBtn');
        this.tooltip = document.getElementById('tooltip');
    }

    // Bind event listeners
    bindEvents() {
        this.analyzeBtn.addEventListener('click', () => this.analyzeText());
        this.nameBtn.addEventListener('click', () => this.nameCurve());
        
        // Enter key support for inputs
        this.textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.analyzeText();
            }
        });
        
        this.curveNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.nameCurve();
            }
        });

        // Tooltip functionality
        this.setupTooltips();
    }

    // Setup canvas for responsive drawing
    setupCanvas() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth - 30; // Account for padding
        this.canvas.width = Math.min(containerWidth, 300);
        this.canvas.height = 120;
        
        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }

    // Setup tooltip system for better UX in iframe
    setupTooltips() {
        const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
        
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, element.getAttribute('data-tooltip'));
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
            
            element.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(e);
            });
        });
    }

    // Show tooltip with text
    showTooltip(event, text) {
        this.tooltip.textContent = text;
        this.tooltip.classList.add('show');
        this.updateTooltipPosition(event);
    }

    // Hide tooltip
    hideTooltip() {
        this.tooltip.classList.remove('show');
    }

    // Update tooltip position
    updateTooltipPosition(event) {
        const rect = this.tooltip.getBoundingClientRect();
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        
        let x = event.clientX - containerRect.left + 10;
        let y = event.clientY - containerRect.top - rect.height - 10;
        
        // Keep tooltip within container bounds
        if (x + rect.width > containerRect.width) {
            x = event.clientX - containerRect.left - rect.width - 10;
        }
        
        if (y < 0) {
            y = event.clientY - containerRect.top + 20;
        }
        
        this.tooltip.style.left = x + 'px';
        this.tooltip.style.top = y + 'px';
    }

    // Main text analysis function
    analyzeText() {
        const text = this.textInput.value.trim();
        
        if (!text) {
            alert('请输入要分析的文本内容！');
            return;
        }

        // Show loading state
        this.analyzeBtn.textContent = '分析中... 🔄';
        this.analyzeBtn.disabled = true;

        // Simulate analysis delay for better UX
        setTimeout(() => {
            this.performAnalysis(text);
            this.analyzeBtn.textContent = '开始情感分析 📈';
            this.analyzeBtn.disabled = false;
        }, 1000);
    }

    // Perform the actual emotion analysis
    performAnalysis(text) {
        // Generate emotion data based on text analysis
        this.emotionData = this.generateEmotionData(text);
        
        // Display results
        this.displayEmotionStages();
        this.drawEmotionCurve();
        this.displayCurveDescription();
        this.displayTurningPoints();
        this.displayReflection();
        this.displayEncouragement();
        
        // Show results section with animation
        this.resultsSection.style.display = 'flex';
        this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Generate emotion data from text (simplified AI simulation)
    generateEmotionData(text) {
        const emotions = ['平静', '兴奋', '悲伤', '希望', '愤怒', '喜悦', '忧郁', '激昂'];
        const textLength = text.length;
        const numPoints = Math.min(Math.max(3, Math.floor(textLength / 50)), 6);
        
        const data = [];
        for (let i = 0; i < numPoints; i++) {
            const progress = i / (numPoints - 1);
            const emotion = emotions[Math.floor(Math.random() * emotions.length)];
            const intensity = Math.random() * 0.6 + 0.2; // 0.2 to 0.8
            
            data.push({
                position: progress,
                emotion: emotion,
                intensity: intensity,
                description: this.getEmotionDescription(emotion, intensity)
            });
        }
        
        return data;
    }

    // Get description for emotion and intensity
    getEmotionDescription(emotion, intensity) {
        const intensityLevel = intensity > 0.6 ? '强烈' : intensity > 0.4 ? '中等' : '轻微';
        return `${intensityLevel}的${emotion}`;
    }

    // Display emotion stages
    displayEmotionStages() {
        this.emotionStages.innerHTML = '';
        
        this.emotionData.forEach((data, index) => {
            const tag = document.createElement('div');
            tag.className = 'emotion-tag';
            tag.textContent = data.emotion;
            tag.style.animationDelay = `${index * 0.2}s`;
            this.emotionStages.appendChild(tag);
            
            if (index < this.emotionData.length - 1) {
                const arrow = document.createElement('span');
                arrow.className = 'arrow';
                arrow.textContent = '→';
                this.emotionStages.appendChild(arrow);
            }
        });
    }

    // Draw emotion curve on canvas
    drawEmotionCurve() {
        const canvas = this.canvas;
        const ctx = this.ctx;
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 4; i++) {
            const y = (height / 4) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Vertical grid lines
        for (let i = 0; i <= 4; i++) {
            const x = (width / 4) * i;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Draw emotion curve
        if (this.emotionData.length > 1) {
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            ctx.beginPath();
            this.emotionData.forEach((data, index) => {
                const x = data.position * width;
                const y = height - (data.intensity * height);
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
            
            // Draw points
            ctx.fillStyle = '#764ba2';
            this.emotionData.forEach(data => {
                const x = data.position * width;
                const y = height - (data.intensity * height);
                
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
            });
        }
        
        // Add labels
        ctx.fillStyle = '#4a5568';
        ctx.font = '12px Microsoft YaHei';
        ctx.textAlign = 'center';
        
        this.emotionData.forEach(data => {
            const x = data.position * width;
            const y = height - (data.intensity * height);
            
            ctx.fillText(data.emotion, x, y - 10);
        });
    }

    // Display curve description
    displayCurveDescription() {
        const descriptions = [
            '情绪从平稳开始，经历起伏变化，展现出丰富的情感层次。',
            '情感曲线呈现波浪式发展，高潮与低谷交替出现。',
            '情绪变化渐进有序，体现了情感发展的内在逻辑。',
            '情感起伏跌宕，营造出强烈的情绪张力。'
        ];
        
        const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
        this.curveDescription.textContent = randomDescription;
    }

    // Display turning points analysis
    displayTurningPoints() {
        const turningPointsText = `
            <strong>关键转折点：</strong><br>
            • 开篇的情感基调奠定了整体氛围<br>
            • 中段的情绪变化体现了内心冲突<br>
            • 结尾的情感走向揭示了主题深意<br>
            <br>
            这些转折点通过词汇选择、意象运用和节奏变化来实现情感的层次递进。
        `;
        this.turningPoints.innerHTML = turningPointsText;
    }

    // Display author intention and reflection
    displayReflection() {
        const reflectionText = `
            <strong>作者意图分析：</strong><br>
            通过精心安排的情感起伏，作者引导读者体验复杂的内心世界，
            这种情感变化不仅丰富了文本的表现力，也加深了读者对主题的理解。
            <br><br>
            <strong>读者反思：</strong><br>
            情感曲线的设计体现了作者的匠心独运，
            每一个转折都承载着深层的情感内涵和思想表达。
        `;
        this.reflection.innerHTML = reflectionText;
    }

    // Display encouragement feedback
    displayEncouragement() {
        const encouragements = [
            '太棒了！你成功捕捉到了文本中的情感脉络！',
            '很好的分析！你对情感变化的理解很深刻！',
            '出色的洞察力！你发现了情感表达的精妙之处！',
            '令人印象深刻！你的情感分析很有见地！'
        ];
        
        const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
        this.encouragement.innerHTML = `
            <strong>${randomEncouragement}</strong><br><br>
            现在，试着为这条情感曲线起一个形象的名字吧！
            比如"渐强式"、"波浪式"、"螺旋上升式"等。
        `;
    }

    // Handle curve naming
    nameCurve() {
        const curveName = this.curveNameInput.value.trim();
        
        if (!curveName) {
            alert('请为情感曲线输入一个名字！');
            return;
        }
        
        // Show success feedback
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin-top: 15px;
            text-align: center;
            font-weight: 600;
            animation: slideIn 0.5s ease;
        `;
        successMessage.innerHTML = `
            🎉 太棒了！你将这条情感曲线命名为"${curveName}"！<br>
            这个名字很好地概括了情感变化的特点。
        `;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
        
        this.encouragement.appendChild(successMessage);
        this.curveNameInput.value = '';
        
        // Scroll to show the success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EmotionCurveAnalyzer();
});

// Handle window resize for responsive canvas
window.addEventListener('resize', () => {
    const analyzer = window.emotionAnalyzer;
    if (analyzer && analyzer.canvas) {
        analyzer.setupCanvas();
        if (analyzer.emotionData.length > 0) {
            analyzer.drawEmotionCurve();
        }
    }
});

// Export for potential external use
window.EmotionCurveAnalyzer = EmotionCurveAnalyzer;