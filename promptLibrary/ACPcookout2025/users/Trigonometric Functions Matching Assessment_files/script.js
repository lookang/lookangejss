// Trigonometric Functions Matching Assessment
// This script handles the interactive matching game for trigonometric functions

class TrigAssessment {
    constructor() {
        // Assessment data with trigonometric functions and their properties
        this.functions = [
            {
                id: 1,
                equation: 'y = sin(x)',
                amplitude: 1,
                period: 2 * Math.PI,
                phase: 0,
                vertical: 0,
                color: '#e74c3c'
            },
            {
                id: 2,
                equation: 'y = cos(x)',
                amplitude: 1,
                period: 2 * Math.PI,
                phase: 0,
                vertical: 0,
                color: '#3498db'
            },
            {
                id: 3,
                equation: 'y = sin(2x)',
                amplitude: 1,
                period: Math.PI,
                phase: 0,
                vertical: 0,
                color: '#e67e22'
            },
            {
                id: 4,
                equation: 'y = sin(x) - 1',
                amplitude: 1,
                period: 2 * Math.PI,
                phase: 0,
                vertical: -1,
                color: '#9b59b6'
            },
            {
                id: 5,
                equation: 'y = 2sin(x)',
                amplitude: 2,
                period: 2 * Math.PI,
                phase: 0,
                vertical: 0,
                color: '#27ae60'
            },
            {
                id: 6,
                equation: 'y = cos(x) + 1',
                amplitude: 1,
                period: 2 * Math.PI,
                phase: 0,
                vertical: 1,
                color: '#f39c12'
            }
        ];

        // Game state
        this.matches = new Map();
        this.score = 0;
        this.totalQuestions = this.functions.length;
        this.draggedElement = null;
        this.hintsUsed = 0;

        // Initialize the assessment
        this.init();
    }

    init() {
    // Generate graphs and equation zones
    this.generateGraphs();
    this.generateEquationZones();
    this.setupEventListeners();
    this.updateProgress();
    this.updateScore();

    // Clear, concise instructions on first load
    this.showFeedback(
        'Drag each graph (left) onto its matching equation (right). Then click "Check Answers". Use "Get Hint" for help or "Try Again" to reset.',
        'info'
    );
    }

    // Generate interactive graph canvases
    generateGraphs() {
        const container = document.getElementById('graphsContainer');

        // Ensure we do not duplicate pre-rendered items (clear and re-render)
        container.innerHTML = '';
        
        // Shuffle functions for random order
        const shuffledFunctions = [...this.functions].sort(() => Math.random() - 0.5);
        
        shuffledFunctions.forEach(func => {
            const graphItem = document.createElement('div');
            graphItem.className = 'graph-item';
            graphItem.draggable = true;
            graphItem.dataset.functionId = func.id;
            
            // Create canvas for the graph - adjusted size for better fit
            const canvas = document.createElement('canvas');
            canvas.className = 'graph-canvas';
            canvas.width = 150;
            canvas.height = 70; // Reduced height to fit better in grid
            
            // Draw the trigonometric function
            this.drawFunction(canvas, func);
            
            // Create label
            const label = document.createElement('div');
            label.className = 'graph-label';
            label.textContent = `Graph ${func.id}`;
            
            graphItem.appendChild(canvas);
            graphItem.appendChild(label);
            container.appendChild(graphItem);
            
            // Add drag event listeners
            this.setupDragEvents(graphItem);
        });
    }

    // Draw trigonometric function on canvas with labeled axes
    drawFunction(canvas, func) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Set up coordinate system with margins for labels
        const marginLeft = 15;
        const marginBottom = 15;
        const marginTop = 5;
        const marginRight = 5;
        const plotWidth = width - marginLeft - marginRight;
        const plotHeight = height - marginTop - marginBottom;
        
        // Draw grid
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let i = 0; i <= 4; i++) {
            const x = marginLeft + (i * plotWidth / 4);
            ctx.beginPath();
            ctx.moveTo(x, marginTop);
            ctx.lineTo(x, marginTop + plotHeight);
            ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let i = 0; i <= 4; i++) {
            const y = marginTop + (i * plotHeight / 4);
            ctx.beginPath();
            ctx.moveTo(marginLeft, y);
            ctx.lineTo(marginLeft + plotWidth, y);
            ctx.stroke();
        }
        
        // Draw axes
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 2;
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(marginLeft, marginTop + plotHeight/2);
        ctx.lineTo(marginLeft + plotWidth, marginTop + plotHeight/2);
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(marginLeft, marginTop);
        ctx.lineTo(marginLeft, marginTop + plotHeight);
        ctx.stroke();
        
        // Add axis labels
        ctx.fillStyle = '#666';
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        
        // X-axis labels (0°, 90°, 180°, 270°, 360°)
        const xLabels = ['0°', '90°', '180°', '270°', '360°'];
        for (let i = 0; i < xLabels.length; i++) {
            const x = marginLeft + (i * plotWidth / 4);
            ctx.fillText(xLabels[i], x, height - 2);
        }
        
        // Y-axis labels
        ctx.textAlign = 'right';
        ctx.fillText('2', marginLeft - 2, marginTop + 2);
        ctx.fillText('1', marginLeft - 2, marginTop + plotHeight/4 + 2);
        ctx.fillText('0', marginLeft - 2, marginTop + plotHeight/2 + 2);
        ctx.fillText('-1', marginLeft - 2, marginTop + 3*plotHeight/4 + 2);
        ctx.fillText('-2', marginLeft - 2, marginTop + plotHeight + 2);
        
        // Draw function
        ctx.strokeStyle = func.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Scale for x-axis: 0 to 2π (360°)
        const xScale = (2 * Math.PI) / plotWidth;
        // Scale for y-axis: -2 to 2 to match labels (and accommodate y=2sin(x))
        // Range = 4 units total, so pixels per unit = plotHeight / 4
        const yScale = plotHeight / 4;
        
        for (let x = 0; x < plotWidth; x++) {
            const realX = x * xScale;
            let y;
            
            // Calculate y based on function type
            if (func.equation.includes('cos')) {
                y = func.amplitude * Math.cos(realX / (func.period / (2 * Math.PI)) + func.phase) + func.vertical;
            } else {
                y = func.amplitude * Math.sin(realX / (func.period / (2 * Math.PI)) + func.phase) + func.vertical;
            }
            
            const canvasX = marginLeft + x;
            const canvasY = marginTop + plotHeight/2 - y * yScale;
            
            // Ensure y is within canvas bounds
            if (canvasY >= marginTop && canvasY <= marginTop + plotHeight) {
                if (x === 0) {
                    ctx.moveTo(canvasX, canvasY);
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            }
        }
        
        ctx.stroke();
    }

    // Generate equation drop zones
    generateEquationZones() {
        const container = document.getElementById('equationsContainer');

        // Ensure we do not duplicate pre-rendered items (clear and re-render)
        container.innerHTML = '';
        
        this.functions.forEach(func => {
            const zone = document.createElement('div');
            zone.className = 'equation-zone';
            zone.dataset.functionId = func.id;
            
            const equationText = document.createElement('div');
            equationText.className = 'equation-text';
            equationText.textContent = func.equation;
            
            zone.appendChild(equationText);
            container.appendChild(zone);
            
            // Add drop event listeners
            this.setupDropEvents(zone);
        });
    }

    // Setup drag events for graph items
    setupDragEvents(element) {
        element.addEventListener('dragstart', (e) => {
            this.draggedElement = element;
            element.classList.add('dragging');
            // Improve cross-browser drag: set data and effects
            try {
                e.dataTransfer.setData('text/plain', element.dataset.functionId || '');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.dropEffect = 'move';
            } catch (_) {
                // Some browsers may restrict dataTransfer; fallback is handled by this.draggedElement
            }
        });

        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
            this.draggedElement = null;
        });

        // Touch events for mobile
        element.addEventListener('touchstart', (e) => {
            this.draggedElement = element;
            element.classList.add('dragging');
            e.preventDefault();
        });

        element.addEventListener('touchmove', (e) => {
            if (!this.draggedElement) return;
            
            const touch = e.touches[0];
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            
            // Remove previous drag-over states
            document.querySelectorAll('.drag-over').forEach(el => {
                el.classList.remove('drag-over');
            });
            
            // Add drag-over to current target
            const dropZone = elementBelow?.closest('.equation-zone');
            if (dropZone && !dropZone.querySelector('.graph-item')) {
                dropZone.classList.add('drag-over');
            }
            
            e.preventDefault();
        });

        element.addEventListener('touchend', (e) => {
            if (!this.draggedElement) return;
            
            const touch = e.changedTouches[0];
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            const dropZone = elementBelow?.closest('.equation-zone');
            
            if (dropZone && !dropZone.querySelector('.graph-item')) {
                this.handleDrop(dropZone, this.draggedElement);
            }
            
            // Clean up
            document.querySelectorAll('.drag-over').forEach(el => {
                el.classList.remove('drag-over');
            });
            
            this.draggedElement.classList.remove('dragging');
            this.draggedElement = null;
            e.preventDefault();
        });
    }

    // Setup drop events for equation zones
    setupDropEvents(zone) {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!zone.querySelector('.graph-item')) {
                zone.classList.add('drag-over');
            }
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            
            if (this.draggedElement && !zone.querySelector('.graph-item')) {
                this.handleDrop(zone, this.draggedElement);
            }
        });
    }

    // Handle drop logic
    handleDrop(zone, graphElement) {
        const zoneId = parseInt(zone.dataset.functionId);
        const graphId = parseInt(graphElement.dataset.functionId);
        
        // Remove from previous location if exists
        const previousMatch = Array.from(this.matches.entries())
            .find(([_, value]) => value === graphId);
        if (previousMatch) {
            const previousZone = document.querySelector(`[data-function-id="${previousMatch[0]}"]`);
            const previousGraph = previousZone.querySelector('.graph-item');
            if (previousGraph) {
                document.getElementById('graphsContainer').appendChild(previousGraph);
                previousGraph.classList.remove('matched');
            }
            this.matches.delete(previousMatch[0]);
        }
        
        // Add to new location
        zone.appendChild(graphElement);
        graphElement.classList.add('matched');
        this.matches.set(zoneId, graphId);
        
        this.updateProgress();
        this.showFeedback('Graph moved! Continue matching or check your answers.', 'info');
    }

    // Setup event listeners for controls
    setupEventListeners() {
        document.getElementById('checkBtn').addEventListener('click', () => {
            this.checkAnswers();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetAssessment();
        });

        document.getElementById('hintBtn').addEventListener('click', () => {
            this.showHint();
        });

        // Tooltip functionality
        document.addEventListener('mouseover', (e) => {
            if (e.target.title) {
                this.showTooltip(e.target.title, e.pageX, e.pageY);
            }
        });

        document.addEventListener('mouseout', () => {
            this.hideTooltip();
        });
    }

    // Check answers and provide feedback
    checkAnswers() {
        if (this.matches.size === 0) {
            this.showFeedback('Please match at least one graph before checking!', 'error');
            return;
        }

        let correct = 0;
        const zones = document.querySelectorAll('.equation-zone');
        
        zones.forEach(zone => {
            const zoneId = parseInt(zone.dataset.functionId);
            const matchedId = this.matches.get(zoneId);
            
            zone.classList.remove('correct', 'incorrect');
            
            if (matchedId === zoneId) {
                zone.classList.add('correct');
                correct++;
            } else if (matchedId) {
                zone.classList.add('incorrect');
            }
        });

        this.score = correct;
        this.updateScore();
        this.updateProgress();

        if (correct === this.totalQuestions) {
            this.showFeedback(`🎉 Excellent! You got all ${correct} matches correct! Well done understanding trigonometric functions!`, 'success');
        } else if (correct > this.totalQuestions / 2) {
            this.showFeedback(`Good work! You got ${correct} out of ${this.totalQuestions} correct. Review the incorrect matches and try again!`, 'info');
        } else {
            this.showFeedback(`You got ${correct} out of ${this.totalQuestions} correct. Don't worry - trigonometric functions can be tricky. Use the hint button or try again!`, 'error');
        }
    }

    // Reset the assessment
    resetAssessment() {
        // Clear all matches
        this.matches.clear();
        this.score = 0;
        this.hintsUsed = 0;

        // Move all graphs back to graphs container
        const graphsContainer = document.getElementById('graphsContainer');
        const allGraphs = document.querySelectorAll('.graph-item');
        
        allGraphs.forEach(graph => {
            graph.classList.remove('matched');
            graphsContainer.appendChild(graph);
        });

        // Clear zone states
        document.querySelectorAll('.equation-zone').forEach(zone => {
            zone.classList.remove('correct', 'incorrect', 'drag-over');
        });

        this.updateProgress();
        this.updateScore();
        this.showFeedback('Assessment reset! Start matching the graphs to their equations.', 'info');
    }

    // Show hint for unmatched items
    showHint() {
        const unmatchedZones = Array.from(document.querySelectorAll('.equation-zone'))
            .filter(zone => !zone.querySelector('.graph-item'));
        
        if (unmatchedZones.length === 0) {
            this.showFeedback('All graphs are matched! Click "Check Answers" to see your results.', 'info');
            return;
        }

        // Pick a random unmatched zone
        const randomZone = unmatchedZones[Math.floor(Math.random() * unmatchedZones.length)];
        const zoneId = parseInt(randomZone.dataset.functionId);
        const func = this.functions.find(f => f.id === zoneId);

        let hint = `Hint for ${func.equation}: `;
        
        if (func.amplitude !== 1) {
            hint += `This function has amplitude ${func.amplitude}. `;
        }
        
        if (func.period !== 2 * Math.PI) {
            hint += `The period is ${func.period === Math.PI ? 'π' : func.period.toFixed(2)}. `;
        }
        
        if (func.vertical !== 0) {
            hint += `The graph is shifted ${func.vertical > 0 ? 'up' : 'down'} by ${Math.abs(func.vertical)} unit(s). `;
        }
        
        if (func.equation.includes('cos')) {
            hint += 'This is a cosine function (starts at maximum). ';
        } else {
            hint += 'This is a sine function (starts at zero). ';
        }

        this.hintsUsed++;
        this.showFeedback(hint, 'info');
        
        // Highlight the zone briefly
        randomZone.style.boxShadow = '0 0 20px #2196F3';
        setTimeout(() => {
            randomZone.style.boxShadow = '';
        }, 2000);
    }

    // Update progress bar
    updateProgress() {
        const progress = (this.matches.size / this.totalQuestions) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
    }

    // Update score display
    updateScore() {
        document.getElementById('scoreDisplay').textContent = `Score: ${this.score}/${this.totalQuestions}`;
    }

    // Show feedback message
    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        
        // Auto-hide after 5 seconds for non-success messages
        if (type !== 'success') {
            setTimeout(() => {
                feedback.textContent = '';
                feedback.className = 'feedback';
            }, 5000);
        }
    }

    // Show tooltip
    showTooltip(text, x, y) {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = text;
        tooltip.style.left = `${x + 10}px`;
        tooltip.style.top = `${y - 30}px`;
        tooltip.classList.add('show');
    }

    // Hide tooltip
    hideTooltip() {
        document.getElementById('tooltip').classList.remove('show');
    }
}

// Initialize the assessment when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TrigAssessment();
});
