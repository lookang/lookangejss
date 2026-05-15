// Simultaneous Equations Explorer - Interactive Learning Tool
// Modified to work with whole numbers only and improved graph display
// Added manual algebraic solution capability

class SimultaneousEquationsExplorer {
    constructor() {
        // Initialize canvas and context for drawing graphs
        this.canvas = document.getElementById('graph-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set up coordinate system parameters for better display
        this.gridSize = 30; // Increased pixels per unit for better visibility
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.maxX = this.canvas.width / (2 * this.gridSize);
        this.maxY = this.canvas.height / (2 * this.gridSize);
        
        // Current equation coefficients - restricted to whole numbers
        this.m1 = 1;   // gradient of line 1
        this.c1 = 0;   // y-intercept of line 1
        this.m2 = -1;  // gradient of line 2
        this.c2 = 2;   // y-intercept of line 2
        
        // Game state variables
        this.currentLevel = 1;
        this.score = 0;
        this.showSteps = false;
        this.currentChallenge = null;
        
        // Challenge templates for different levels - using whole numbers only
        this.challenges = {
            1: [
                { target: [1, 1], hint: "Make both lines pass through (1, 1)" },
                { target: [0, 2], hint: "Find where the lines meet at x = 0" },
                { target: [2, 0], hint: "Create an intersection on the x-axis" },
                { target: [3, 3], hint: "Try the point (3, 3)" }
            ],
            2: [
                { target: [2, 4], hint: "Work with the point (2, 4)" },
                { target: [-1, 3], hint: "Work with negative x-values" },
                { target: [4, 1], hint: "Try the point (4, 1)" }
            ],
            3: [
                { parallel: true, hint: "Make the lines parallel - what happens?" },
                { coincident: true, hint: "Make the lines identical" }
            ]
        };
        
        this.initializeEventListeners();
        this.updateDisplay();
        this.drawGraph();
    }
    
    // Set up all event listeners for interactive elements
    initializeEventListeners() {
        // Slider and input synchronization for m1 (gradient of line 1) - whole numbers only
        const m1Slider = document.getElementById('m1-slider');
        const m1Input = document.getElementById('m1-input');
        
        m1Slider.addEventListener('input', (e) => {
            this.m1 = parseInt(e.target.value);
            m1Input.value = this.m1;
            this.updateDisplay();
        });
        
        m1Input.addEventListener('input', (e) => {
            this.m1 = parseInt(e.target.value) || 0;
            m1Slider.value = this.m1;
            this.updateDisplay();
        });
        
        // Slider and input synchronization for c1 (y-intercept of line 1) - whole numbers only
        const c1Slider = document.getElementById('c1-slider');
        const c1Input = document.getElementById('c1-input');
        
        c1Slider.addEventListener('input', (e) => {
            this.c1 = parseInt(e.target.value);
            c1Input.value = this.c1;
            this.updateDisplay();
        });
        
        c1Input.addEventListener('input', (e) => {
            this.c1 = parseInt(e.target.value) || 0;
            c1Slider.value = this.c1;
            this.updateDisplay();
        });
        
        // Slider and input synchronization for m2 (gradient of line 2) - whole numbers only
        const m2Slider = document.getElementById('m2-slider');
        const m2Input = document.getElementById('m2-input');
        
        m2Slider.addEventListener('input', (e) => {
            this.m2 = parseInt(e.target.value);
            m2Input.value = this.m2;
            this.updateDisplay();
        });
        
        m2Input.addEventListener('input', (e) => {
            this.m2 = parseInt(e.target.value) || 0;
            m2Slider.value = this.m2;
            this.updateDisplay();
        });
        
        // Slider and input synchronization for c2 (y-intercept of line 2) - whole numbers only
        const c2Slider = document.getElementById('c2-slider');
        const c2Input = document.getElementById('c2-input');
        
        c2Slider.addEventListener('input', (e) => {
            this.c2 = parseInt(e.target.value);
            c2Input.value = this.c2;
            this.updateDisplay();
        });
        
        c2Input.addEventListener('input', (e) => {
            this.c2 = parseInt(e.target.value) || 0;
            c2Slider.value = this.c2;
            this.updateDisplay();
        });
        
        // Manual solution checking - new feature
        document.getElementById('check-manual').addEventListener('click', () => {
            this.checkManualSolution();
        });
        
        // Action button event listeners
        document.getElementById('toggle-steps').addEventListener('click', () => {
            this.toggleSteps();
        });
        
        document.getElementById('check-answer').addEventListener('click', () => {
            this.checkAnswer();
        });
        
        document.getElementById('new-challenge').addEventListener('click', () => {
            this.generateNewChallenge();
        });
        
        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showHint();
        });
        
        // Modal event listeners
        document.getElementById('modal-close').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('modal-accept').addEventListener('click', () => {
            this.acceptChallenge();
        });
        
        // Close modal when clicking outside
        document.getElementById('challenge-modal').addEventListener('click', (e) => {
            if (e.target.id === 'challenge-modal') {
                this.closeModal();
            }
        });
    }
    
    // New method to check manual algebraic solution
    checkManualSolution() {
        const manualX = parseInt(document.getElementById('manual-x').value);
        const manualY = parseInt(document.getElementById('manual-y').value);
        
        if (isNaN(manualX) || isNaN(manualY)) {
            this.showFeedback('Please enter whole numbers for both x and y values.', 'warning');
            return;
        }
        
        const intersection = this.calculateIntersection();
        
        if (!intersection) {
            this.showFeedback('The lines are parallel - there is no intersection point to find!', 'error');
            return;
        }
        
        // Check if manual solution matches calculated intersection (allowing for rounding)
        if (Math.abs(manualX - Math.round(intersection.x)) < 0.1 && 
            Math.abs(manualY - Math.round(intersection.y)) < 0.1) {
            this.score += 15;
            this.showFeedback(`Excellent algebraic work! The intersection is indeed (${Math.round(intersection.x)}, ${Math.round(intersection.y)}). +15 points!`, 'success');
            this.updateScore();
            
            // Clear the input fields
            document.getElementById('manual-x').value = '';
            document.getElementById('manual-y').value = '';
        } else {
            // Verify the solution by substituting into both equations
            const y1Check = this.m1 * manualX + this.c1;
            const y2Check = this.m2 * manualX + this.c2;
            
            if (manualY === y1Check && manualY === y2Check) {
                this.score += 15;
                this.showFeedback(`Perfect! Your solution (${manualX}, ${manualY}) satisfies both equations. +15 points!`, 'success');
                this.updateScore();
            } else {
                this.showFeedback(`Not quite right. Check: Does (${manualX}, ${manualY}) satisfy both equations?`, 'error');
            }
        }
    }
    
    // Update all display elements with current values - modified for whole numbers
    updateDisplay() {
        // Update equation displays with whole numbers
        document.getElementById('m1-display').textContent = this.m1;
        document.getElementById('c1-display').textContent = this.c1 >= 0 ? this.c1 : this.c1;
        document.getElementById('m2-display').textContent = this.m2;
        document.getElementById('c2-display').textContent = this.c2 >= 0 ? this.c2 : this.c2;
        
        // Calculate and display intersection point
        const intersection = this.calculateIntersection();
        const intersectionDisplay = document.getElementById('intersection-point');
        
        if (intersection) {
            // Display with appropriate precision - whole numbers when possible
            const xDisplay = Number.isInteger(intersection.x) ? intersection.x : intersection.x.toFixed(2);
            const yDisplay = Number.isInteger(intersection.y) ? intersection.y : intersection.y.toFixed(2);
            intersectionDisplay.textContent = `(${xDisplay}, ${yDisplay})`;
            intersectionDisplay.style.color = '#e74c3c';
        } else {
            intersectionDisplay.textContent = 'No solution (parallel lines)';
            intersectionDisplay.style.color = '#95a5a6';
        }
        
        // Update solution steps if visible
        if (this.showSteps) {
            this.updateSolutionSteps();
        }
        
        // Redraw the graph with improved display
        this.drawGraph();
    }
    
    // Calculate intersection point of two lines
    calculateIntersection() {
        // Check if lines are parallel (same gradient)
        if (this.m1 === this.m2) {
            return null; // No intersection (parallel lines)
        }
        
        // Solve simultaneous equations:
        // y = m1*x + c1
        // y = m2*x + c2
        // Therefore: m1*x + c1 = m2*x + c2
        // (m1 - m2)*x = c2 - c1
        // x = (c2 - c1) / (m1 - m2)
        
        const x = (this.c2 - this.c1) / (this.m1 - this.m2);
        const y = this.m1 * x + this.c1;
        
        return { x, y };
    }
    
    // Draw the coordinate grid and both linear equations - improved for better visibility
    drawGraph() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.drawGrid();
        
        // Draw axes
        this.drawAxes();
        
        // Draw both lines
        this.drawLine(this.m1, this.c1, '#e74c3c', 'Line 1'); // Red line
        this.drawLine(this.m2, this.c2, '#3498db', 'Line 2'); // Blue line
        
        // Draw intersection point
        const intersection = this.calculateIntersection();
        if (intersection) {
            this.drawIntersectionPoint(intersection);
        }
    }
    
    // Draw coordinate grid - improved visibility
    drawGrid() {
        this.ctx.strokeStyle = '#f0f0f0';
        this.ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    // Draw x and y axes - improved with grid numbers
    drawAxes() {
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 3;
        
        // X-axis
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.centerY);
        this.ctx.lineTo(this.canvas.width, this.centerY);
        this.ctx.stroke();
        
        // Y-axis
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, 0);
        this.ctx.lineTo(this.centerX, this.canvas.height);
        this.ctx.stroke();
        
        // Add axis labels and grid numbers
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.fillText('x', this.canvas.width - 20, this.centerY - 10);
        this.ctx.fillText('y', this.centerX + 10, 20);
        
        // Add grid numbers
        this.ctx.font = '12px Arial';
        for (let i = -Math.floor(this.maxX); i <= Math.floor(this.maxX); i++) {
            if (i !== 0) {
                const x = this.centerX + i * this.gridSize;
                this.ctx.fillText(i.toString(), x - 5, this.centerY + 20);
            }
        }
        
        for (let i = -Math.floor(this.maxY); i <= Math.floor(this.maxY); i++) {
            if (i !== 0) {
                const y = this.centerY - i * this.gridSize;
                this.ctx.fillText(i.toString(), this.centerX - 20, y + 5);
            }
        }
        
        // Add origin label
        this.ctx.fillText('0', this.centerX - 15, this.centerY + 20);
    }
    
    // Draw a linear equation line - improved thickness and visibility
    drawLine(m, c, color, label) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 4; // Increased line thickness
        
        // Calculate line endpoints
        const x1 = -this.maxX;
        const y1 = m * x1 + c;
        const x2 = this.maxX;
        const y2 = m * x2 + c;
        
        // Convert to canvas coordinates
        const canvasX1 = this.centerX + x1 * this.gridSize;
        const canvasY1 = this.centerY - y1 * this.gridSize;
        const canvasX2 = this.centerX + x2 * this.gridSize;
        const canvasY2 = this.centerY - y2 * this.gridSize;
        
        // Draw line
        this.ctx.beginPath();
        this.ctx.moveTo(canvasX1, canvasY1);
        this.ctx.lineTo(canvasX2, canvasY2);
        this.ctx.stroke();
        
        // Add line label with better positioning
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 14px Arial';
        const labelX = canvasX2 - 50;
        const labelY = canvasY2 - 10;
        this.ctx.fillText(label, labelX, labelY);
    }
    
    // Draw intersection point with highlight - improved visibility
    drawIntersectionPoint(intersection) {
        const canvasX = this.centerX + intersection.x * this.gridSize;
        const canvasY = this.centerY - intersection.y * this.gridSize;
        
        // Check if point is within canvas bounds
        if (canvasX >= 0 && canvasX <= this.canvas.width && 
            canvasY >= 0 && canvasY <= this.canvas.height) {
            
            // Draw outer circle (highlight) - larger for better visibility
            this.ctx.fillStyle = '#f39c12';
            this.ctx.beginPath();
            this.ctx.arc(canvasX, canvasY, 12, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Draw inner circle (intersection point)
            this.ctx.fillStyle = '#e74c3c';
            this.ctx.beginPath();
            this.ctx.arc(canvasX, canvasY, 8, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Add coordinate label with better formatting
            this.ctx.fillStyle = '#2c3e50';
            this.ctx.font = 'bold 12px Arial';
            const xDisplay = Number.isInteger(intersection.x) ? intersection.x : intersection.x.toFixed(1);
            const yDisplay = Number.isInteger(intersection.y) ? intersection.y : intersection.y.toFixed(1);
            const label = `(${xDisplay}, ${yDisplay})`;
            this.ctx.fillText(label, canvasX + 15, canvasY - 15);
        }
    }
    
    // Toggle display of solution steps
    toggleSteps() {
        this.showSteps = !this.showSteps;
        const button = document.getElementById('toggle-steps');
        const stepsContent = document.getElementById('steps-content');
        
        if (this.showSteps) {
            button.textContent = 'Hide Steps';
            this.updateSolutionSteps();
        } else {
            button.textContent = 'Show Steps';
            stepsContent.textContent = 'Click "Show Steps" to see algebraic solution';
        }
    }
    
    // Update algebraic solution steps display - improved for whole numbers
    updateSolutionSteps() {
        const stepsContent = document.getElementById('steps-content');
        const intersection = this.calculateIntersection();
        
        if (!intersection) {
            stepsContent.textContent = `Equation 1: y = ${this.m1}x + ${this.c1}
Equation 2: y = ${this.m2}x + ${this.c2}

Since both gradients are equal (${this.m1}), 
the lines are parallel and never intersect.
Therefore, there is no solution.`;
            return;
        }
        
        const steps = `Equation 1: y = ${this.m1}x + ${this.c1}
Equation 2: y = ${this.m2}x + ${this.c2}

Step 1: Set equations equal
${this.m1}x + ${this.c1} = ${this.m2}x + ${this.c2}

Step 2: Collect x terms
${this.m1}x - ${this.m2}x = ${this.c2} - ${this.c1}
${(this.m1 - this.m2)}x = ${(this.c2 - this.c1)}

Step 3: Solve for x
x = ${(this.c2 - this.c1)} ÷ ${(this.m1 - this.m2)}
x = ${Number.isInteger(intersection.x) ? intersection.x : intersection.x.toFixed(2)}

Step 4: Substitute back to find y
y = ${this.m1} × ${Number.isInteger(intersection.x) ? intersection.x : intersection.x.toFixed(2)} + ${this.c1}
y = ${Number.isInteger(intersection.y) ? intersection.y : intersection.y.toFixed(2)}

Solution: (${Number.isInteger(intersection.x) ? intersection.x : intersection.x.toFixed(2)}, ${Number.isInteger(intersection.y) ? intersection.y : intersection.y.toFixed(2)})`;
        
        stepsContent.textContent = steps;
    }
    
    // Generate a new challenge based on current level - modified for whole numbers
    generateNewChallenge() {
        const levelChallenges = this.challenges[this.currentLevel] || this.challenges[1];
        this.currentChallenge = levelChallenges[Math.floor(Math.random() * levelChallenges.length)];
        
        const modal = document.getElementById('challenge-modal');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');
        
        title.textContent = `Level ${this.currentLevel} Challenge`;
        
        if (this.currentChallenge.target) {
            const [targetX, targetY] = this.currentChallenge.target;
            body.innerHTML = `
                <p><strong>Challenge:</strong> Adjust the sliders to make both lines intersect at the point (${targetX}, ${targetY}).</p>
                <p><strong>Hint:</strong> ${this.currentChallenge.hint}</p>
                <p>Use both the graphical view and try solving algebraically in the manual solution section!</p>
            `;
        } else if (this.currentChallenge.parallel) {
            body.innerHTML = `
                <p><strong>Challenge:</strong> Make the two lines parallel to each other.</p>
                <p><strong>Hint:</strong> ${this.currentChallenge.hint}</p>
                <p>What do you notice about the gradients when lines are parallel?</p>
            `;
        } else if (this.currentChallenge.coincident) {
            body.innerHTML = `
                <p><strong>Challenge:</strong> Make the two lines identical (coincident).</p>
                <p><strong>Hint:</strong> ${this.currentChallenge.hint}</p>
                <p>What happens when both the gradient and y-intercept are the same?</p>
            `;
        }
        
        modal.style.display = 'block';
    }
    
    // Check if current answer matches the challenge - modified for whole numbers
    checkAnswer() {
        if (!this.currentChallenge) {
            this.showFeedback('Generate a new challenge first!', 'warning');
            return;
        }
        
        const intersection = this.calculateIntersection();
        
        if (this.currentChallenge.target) {
            const [targetX, targetY] = this.currentChallenge.target;
            
            if (intersection && 
                Math.abs(intersection.x - targetX) < 0.1 && 
                Math.abs(intersection.y - targetY) < 0.1) {
                
                this.score += 10 * this.currentLevel;
                this.showFeedback(`Excellent! You found the intersection at (${targetX}, ${targetY})! +${10 * this.currentLevel} points`, 'success');
                this.updateScore();
                this.currentChallenge = null;
                
                // Level progression
                if (this.score >= this.currentLevel * 50) {
                    this.levelUp();
                }
            } else {
                this.showFeedback('Not quite right. Check your intersection point and try again.', 'error');
            }
        } else if (this.currentChallenge.parallel) {
            if (this.m1 === this.m2 && this.c1 !== this.c2) {
                this.score += 15 * this.currentLevel;
                this.showFeedback(`Perfect! The lines are parallel with no intersection. +${15 * this.currentLevel} points`, 'success');
                this.updateScore();
                this.currentChallenge = null;
            } else {
                this.showFeedback('The lines should be parallel (same gradient, different y-intercept).', 'error');
            }
        } else if (this.currentChallenge.coincident) {
            if (this.m1 === this.m2 && this.c1 === this.c2) {
                this.score += 20 * this.currentLevel;
                this.showFeedback(`Amazing! The lines are identical with infinite solutions. +${20 * this.currentLevel} points`, 'success');
                this.updateScore();
                this.currentChallenge = null;
            } else {
                this.showFeedback('The lines should be identical (same gradient and y-intercept).', 'error');
            }
        }
    }
    
    // Show contextual hints
    showHint() {
        if (!this.currentChallenge) {
            this.showFeedback('Generate a challenge first to get hints!', 'warning');
            return;
        }
        
        let hint = '';
        
        if (this.currentChallenge.target) {
            const [targetX, targetY] = this.currentChallenge.target;
            hint = `To get intersection at (${targetX}, ${targetY}): Both equations must be satisfied. Try the manual solution section to work it out algebraically!`;
        } else if (this.currentChallenge.parallel) {
            hint = 'For parallel lines: Make the gradients (m₁ and m₂) equal, but keep different y-intercepts.';
        } else if (this.currentChallenge.coincident) {
            hint = 'For identical lines: Make both the gradients AND y-intercepts exactly the same.';
        }
        
        this.showFeedback(hint, 'info');
    }
    
    // Display feedback messages
    showFeedback(message, type = 'info') {
        const feedbackPanel = document.getElementById('feedback-panel');
        const feedbackMessage = document.getElementById('feedback-message');
        
        feedbackMessage.textContent = message;
        feedbackPanel.className = `feedback-panel show ${type}`;
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            feedbackPanel.classList.remove('show');
        }, 4000);
    }
    
    // Update score display
    updateScore() {
        document.getElementById('score').textContent = this.score;
    }
    
    // Level up progression
    levelUp() {
        this.currentLevel++;
        document.getElementById('current-level').textContent = this.currentLevel;
        this.showFeedback(`Level Up! Welcome to Level ${this.currentLevel}!`, 'success');
        
        // Unlock new challenge types
        if (this.currentLevel === 2) {
            document.getElementById('challenge-text').textContent = 'More challenging intersections unlocked!';
        } else if (this.currentLevel === 3) {
            document.getElementById('challenge-text').textContent = 'Advanced challenges: parallel and coincident lines!';
        }
    }
    
    // Modal management
    closeModal() {
        document.getElementById('challenge-modal').style.display = 'none';
    }
    
    acceptChallenge() {
        this.closeModal();
        document.getElementById('challenge-text').textContent = 'Challenge accepted! Try solving algebraically too!';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create the main application instance
    const explorer = new SimultaneousEquationsExplorer();
    
    // Add some initial guidance
    setTimeout(() => {
        explorer.showFeedback('Welcome! Adjust the sliders (whole numbers only) and try the manual solution section!', 'info');
    }, 1000);
    
    // Handle canvas resize for responsiveness - improved to prevent compression
    function resizeCanvas() {
        const canvas = explorer.canvas;
        const container = canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        // Maintain 1:1 aspect ratio and prevent compression
        const maxSize = Math.min(rect.width - 20, 400);
        
        if (maxSize < 400) {
            canvas.style.width = maxSize + 'px';
            canvas.style.height = maxSize + 'px';
        } else {
            canvas.style.width = '400px';
            canvas.style.height = '400px';
        }
        
        explorer.drawGraph();
    }
    
    // Initial resize and add resize listener
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Add keyboard shortcuts for power users
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'n':
                    e.preventDefault();
                    explorer.generateNewChallenge();
                    break;
                case 'h':
                    e.preventDefault();
                    explorer.showHint();
                    break;
                case 'Enter':
                    e.preventDefault();
                    explorer.checkAnswer();
                    break;
            }
        }
    });
});