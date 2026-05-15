// Disease Transmission Probability Simulator
// Integrates dice rolling with epidemiological modeling

class Student {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.vx = (Math.random() - 0.5) * 2; // Random velocity
        this.vy = (Math.random() - 0.5) * 2;
        this.state = 'healthy'; // healthy, infected, recovered
        this.infectionTime = 0;
        this.recoveryTime = 300; // frames to recover
        this.radius = 8;
        this.infectionRadius = 25;
    }

    update(canvasWidth, canvasHeight) {
        // Move student
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x <= this.radius || this.x >= canvasWidth - this.radius) {
            this.vx *= -1;
        }
        if (this.y <= this.radius || this.y >= canvasHeight - this.radius) {
            this.vy *= -1;
        }

        // Keep within bounds
        this.x = Math.max(this.radius, Math.min(canvasWidth - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvasHeight - this.radius, this.y));

        // Update infection status
        if (this.state === 'infected') {
            this.infectionTime++;
            if (this.infectionTime >= this.recoveryTime) {
                this.state = 'recovered';
            }
        }
    }

    draw(ctx) {
        // Draw infection radius for infected students
        if (this.state === 'infected') {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.infectionRadius, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Draw student
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        
        switch (this.state) {
            case 'healthy':
                ctx.fillStyle = '#4CAF50';
                break;
            case 'infected':
                ctx.fillStyle = '#f44336';
                break;
            case 'recovered':
                ctx.fillStyle = '#2196F3';
                break;
        }
        
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    distanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

class DiseaseSimulator {
    constructor() {
        this.canvas = document.getElementById('simulationCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.chartCanvas = document.getElementById('chartCanvas');
        this.chartCtx = this.chartCanvas.getContext('2d');
        this.infectionGraphCanvas = document.getElementById('infectionGraphCanvas');
        this.infectionGraphCtx = this.infectionGraphCanvas.getContext('2d');
        
        this.students = [];
        this.running = false;
        this.animationId = null;
        
        // Statistics tracking
        this.totalContacts = 0;
        this.successfulTransmissions = 0;
        this.lastDiceRoll = null;
        this.transmissionHistory = [];
        this.probabilityDistribution = new Array(11).fill(0); // For sums 2-12
        
        // SORBET Activity tracking
        this.stageData = [
            { stage: 0, newInfected: 1, totalInfected: 1 },
            { stage: 1, newInfected: 0, totalInfected: 1 },
            { stage: 2, newInfected: 0, totalInfected: 1 },
            { stage: 3, newInfected: 0, totalInfected: 1 },
            { stage: 4, newInfected: 0, totalInfected: 1 },
            { stage: 5, newInfected: 0, totalInfected: 1 }
        ];
        this.currentStage = 0;
        this.stageTimer = 0;
        this.stageInterval = 180; // frames per stage (3 seconds at 60fps)
        
        this.initializeElements();
        this.setupEventListeners();
        this.initializeWorksheet();
        this.resetSimulation();
    }

    initializeElements() {
        // Get DOM elements
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.rollDiceBtn = document.getElementById('rollDiceBtn');
        this.populationSlider = document.getElementById('populationSlider');
        this.populationValue = document.getElementById('populationValue');
        
        // Statistics elements
        this.lastDiceRollElement = document.getElementById('lastDiceRoll');
        this.transmissionPercentElement = document.getElementById('transmissionPercent');
        this.totalContactsElement = document.getElementById('totalContacts');
        this.successfulTransmissionsElement = document.getElementById('successfulTransmissions');
        this.successRateElement = document.getElementById('successRate');
        this.healthyCountElement = document.getElementById('healthyCount');
        this.infectedCountElement = document.getElementById('infectedCount');
        this.recoveredCountElement = document.getElementById('recoveredCount');
        
        // Dice elements
        this.dice1 = document.getElementById('dice1');
        this.dice2 = document.getElementById('dice2');
        this.diceSumElement = document.getElementById('diceSum');
        
        // Worksheet elements
        this.mostContagiousInput = document.getElementById('mostContagiousAnswer');
        this.reflectionTextarea = document.getElementById('reflectionAnswer');
        
        // Setup answer checking for most contagious question
        this.setupAnswerChecking();
        this.setupReflectionChecking();
    }

    initializeWorksheet() {
        // Initialize possibility diagram interactivity
        this.initializePossibilityDiagram();
        
        // Draw initial infection graph
        this.drawInfectionGraph();
    }

    initializePossibilityDiagram() {
        const table = document.getElementById('possibilityDiagram');
        const cells = table.querySelectorAll('tbody td');
        
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                // Highlight clicked sum
                const sum = parseInt(cell.textContent);
                this.highlightProbabilitySum(sum);
            });
            
            cell.addEventListener('mouseenter', () => {
                cell.style.background = '#3498db';
                cell.style.color = 'white';
                cell.style.cursor = 'pointer';
            });
            
            cell.addEventListener('mouseleave', () => {
                cell.style.background = '#ecf0f1';
                cell.style.color = '#2c3e50';
            });
        });
    }

    highlightProbabilitySum(sum) {
        // Highlight corresponding row in probability table
        const probabilityTable = document.getElementById('probabilityTable');
        const rows = probabilityTable.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            row.style.background = '';
        });
        
        const targetRow = rows[sum - 2];
        if (targetRow) {
            targetRow.style.background = '#e8f4fd';
            targetRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.toggleSimulation());
        this.resetBtn.addEventListener('click', () => this.resetSimulation());
        this.rollDiceBtn.addEventListener('click', () => this.rollDice());
        this.populationSlider.addEventListener('input', (e) => {
            this.populationValue.textContent = e.target.value;
            if (!this.running) {
                this.resetSimulation();
            }
        });

        // Tab switching functionality
        this.setupTabSwitching();

        // Handle canvas resize
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
    }

    setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
                
                // Redraw infection graph if switching to Activity 1
                if (targetTab === 'activity1') {
                    setTimeout(() => this.drawInfectionGraph(), 100);
                }
            });
        });
    }

    setupAnswerChecking() {
        this.mostContagiousInput.addEventListener('input', () => {
            this.checkMostContagiousAnswer();
        });
        
        this.mostContagiousInput.addEventListener('blur', () => {
            this.checkMostContagiousAnswer();
        });
    }

    setupReflectionChecking() {
        this.reflectionTextarea.addEventListener('input', () => {
            this.checkReflectionAnswer();
        });
        
        this.reflectionTextarea.addEventListener('blur', () => {
            this.checkReflectionAnswer();
        });
    }

    checkReflectionAnswer() {
        const answer = this.reflectionTextarea.value.trim().toLowerCase();
        
        // Remove any existing feedback
        this.removeReflectionFeedback();
        
        if (!answer || answer.length < 10) {
            if (answer.length > 0) {
                this.showReflectionFeedback('Please provide a more detailed response (at least 10 characters).', false);
            }
            return;
        }
        
        // Key concepts to look for
        const keyConceptsFound = [];
        const conceptChecks = [
            {
                concept: 'Bell curve/Normal distribution',
                keywords: ['bell', 'curve', 'normal', 'distribution', 'bell-shaped', 'symmetric'],
                weight: 3
            },
            {
                concept: 'Sum of 7 most frequent',
                keywords: ['7', 'seven', 'most', 'frequent', 'common', 'likely', 'peak', 'highest'],
                weight: 3
            },
            {
                concept: 'Convergence to theoretical',
                keywords: ['approach', 'closer', 'theoretical', 'expected', 'converge', 'match', 'similar'],
                weight: 2
            },
            {
                concept: 'More data/trials',
                keywords: ['more', 'larger', 'bigger', 'increase', 'additional', 'extra', 'many'],
                weight: 1
            },
            {
                concept: 'Smoothing effect',
                keywords: ['smooth', 'even', 'stable', 'consistent', 'regular', 'predictable'],
                weight: 2
            },
            {
                concept: 'Extreme values rare',
                keywords: ['2', 'two', '12', 'twelve', 'rare', 'uncommon', 'few', 'less', 'edges', 'ends'],
                weight: 2
            }
        ];
        
        let totalScore = 0;
        let maxPossibleScore = 0;
        
        conceptChecks.forEach(check => {
            maxPossibleScore += check.weight;
            const found = check.keywords.some(keyword => answer.includes(keyword));
            if (found) {
                keyConceptsFound.push(check.concept);
                totalScore += check.weight;
            }
        });
        
        // Calculate percentage score
        const scorePercentage = (totalScore / maxPossibleScore) * 100;
        
        // Determine feedback based on score
        let feedbackMessage = '';
        let isGood = false;
        
        if (scorePercentage >= 70) {
            isGood = true;
            feedbackMessage = `✓ Excellent response! You've identified key concepts: ${keyConceptsFound.join(', ')}. `;
            feedbackMessage += 'You understand that with more data, the distribution should approach a bell curve with sum 7 being most frequent.';
        } else if (scorePercentage >= 50) {
            isGood = true;
            feedbackMessage = `✓ Good response! You mentioned: ${keyConceptsFound.join(', ')}. `;
            feedbackMessage += 'Consider also mentioning how the graph would form a bell curve with sum 7 at the peak.';
        } else if (scorePercentage >= 30) {
            isGood = false;
            feedbackMessage = `◐ Partial understanding. You touched on: ${keyConceptsFound.join(', ')}. `;
            feedbackMessage += 'Try to think about: bell curve shape, sum 7 being most common, and how more data makes results more predictable.';
        } else {
            isGood = false;
            feedbackMessage = '◐ Your response could be more specific. Think about: ';
            feedbackMessage += 'What shape would the graph have? Which sum would be most common? How does more data affect the pattern?';
        }
        
        this.showReflectionFeedback(feedbackMessage, isGood);
    }

    showReflectionFeedback(message, isGood) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `reflection-feedback ${isGood ? 'good' : 'needs-improvement'}`;
        feedbackDiv.textContent = message;
        
        // Insert feedback after the textarea
        this.reflectionTextarea.parentNode.insertBefore(feedbackDiv, this.reflectionTextarea.nextSibling);
        
        // Update textarea styling
        this.reflectionTextarea.className = isGood ? 'good-answer' : 'needs-improvement-answer';
    }

    removeReflectionFeedback() {
        const existingFeedback = document.querySelector('.reflection-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Reset textarea styling
        this.reflectionTextarea.className = '';
    }

    checkMostContagiousAnswer() {
        const answer = this.mostContagiousInput.value.trim();
        const answerNum = parseInt(answer);
        
        // Remove any existing feedback
        this.removeFeedback();
        
        if (!answer) return;
        
        // Find the most observed sum currently
        const maxCount = Math.max(...this.probabilityDistribution);
        const mostObservedSums = [];
        
        this.probabilityDistribution.forEach((count, index) => {
            if (count === maxCount && count > 0) {
                mostObservedSums.push(index + 2);
            }
        });
        
        let isCorrect = false;
        let feedbackMessage = '';
        
        if (answerNum === 7) {
            // Theoretically correct answer
            isCorrect = true;
            feedbackMessage = '✓ Correct! Sum of 7 is theoretically the most likely (6/36 probability).';
        } else if (mostObservedSums.includes(answerNum) && maxCount > 0) {
            // Currently most observed answer
            isCorrect = true;
            feedbackMessage = `✓ Correct for current data! Sum of ${answerNum} has been observed most frequently (${maxCount} times).`;
        } else if (answerNum >= 2 && answerNum <= 12) {
            // Valid sum but not correct
            isCorrect = false;
            const totalRolls = this.probabilityDistribution.reduce((sum, count) => sum + count, 0);
            if (totalRolls > 0) {
                const currentCount = this.probabilityDistribution[answerNum - 2];
                feedbackMessage = `✗ Sum of ${answerNum} has only appeared ${currentCount} times. The theoretical most likely is 7, and currently most observed is ${mostObservedSums.join(' and ')}.`;
            } else {
                feedbackMessage = '✗ Sum of 7 is theoretically the most likely (6/36 probability). Try rolling some dice first!';
            }
        } else {
            // Invalid input
            isCorrect = false;
            feedbackMessage = '✗ Please enter a valid dice sum (2-12).';
        }
        
        this.showFeedback(feedbackMessage, isCorrect);
    }

    showFeedback(message, isCorrect) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackDiv.textContent = message;
        
        // Insert feedback after the input
        this.mostContagiousInput.parentNode.insertBefore(feedbackDiv, this.mostContagiousInput.nextSibling);
        
        // Update input styling
        this.mostContagiousInput.className = isCorrect ? 'correct-answer' : 'incorrect-answer';
    }

    removeFeedback() {
        const existingFeedback = document.querySelector('.answer-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Reset input styling
        this.mostContagiousInput.className = '';
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        this.canvas.width = Math.floor(rect.width * 0.6);
        this.canvas.height = Math.floor(rect.height);
        
        // Resize chart canvas
        this.chartCanvas.width = this.chartCanvas.offsetWidth;
        this.chartCanvas.height = 100;
    }

    rollDice() {
        // Animate dice rolling
        this.dice1.classList.add('rolling');
        this.dice2.classList.add('rolling');
        
        setTimeout(() => {
            const die1 = Math.floor(Math.random() * 6) + 1;
            const die2 = Math.floor(Math.random() * 6) + 1;
            const sum = die1 + die2;
            
            this.updateDiceDisplay(die1, die2, sum);
            this.lastDiceRoll = sum;
            
            // Update probability distribution
            this.probabilityDistribution[sum - 2]++;
            
            // Update display
            this.updateStatistics();
            this.drawProbabilityChart();
            
            // Remove rolling animation
            this.dice1.classList.remove('rolling');
            this.dice2.classList.remove('rolling');
        }, 500);
    }

    updateDiceDisplay(die1, die2, sum) {
        this.renderDieFace(this.dice1.querySelector('.dice-face'), die1);
        this.renderDieFace(this.dice2.querySelector('.dice-face'), die2);
        this.diceSumElement.textContent = `Sum: ${sum}`;
    }

    renderDieFace(faceElement, value) {
        // Clear existing dots
        faceElement.innerHTML = '';
        
        // Define dot positions for each die face
        const dotPatterns = {
            1: [4], // center
            2: [0, 8], // top-left, bottom-right
            3: [0, 4, 8], // top-left, center, bottom-right
            4: [0, 2, 6, 8], // corners
            5: [0, 2, 4, 6, 8], // corners + center
            6: [0, 2, 3, 5, 6, 8] // two columns
        };
        
        const pattern = dotPatterns[value] || [];
        
        // Create 9 positions (3x3 grid)
        for (let i = 0; i < 9; i++) {
            const dot = document.createElement('div');
            if (pattern.includes(i)) {
                dot.className = 'dot';
            } else {
                dot.style.visibility = 'hidden';
                dot.style.width = '6px';
                dot.style.height = '6px';
            }
            faceElement.appendChild(dot);
        }
    }

    createStudents(count) {
        this.students = [];
        const margin = 20;
        
        for (let i = 0; i < count; i++) {
            const x = margin + Math.random() * (this.canvas.width - 2 * margin);
            const y = margin + Math.random() * (this.canvas.height - 2 * margin);
            this.students.push(new Student(x, y, i));
        }
        
        // Patient zero
        if (this.students.length > 0) {
            this.students[0].state = 'infected';
        }
    }

    checkTransmissions() {
        const infected = this.students.filter(s => s.state === 'infected');
        const healthy = this.students.filter(s => s.state === 'healthy');
        
        infected.forEach(infectedStudent => {
            healthy.forEach(healthyStudent => {
                const distance = infectedStudent.distanceTo(healthyStudent);
                
                if (distance <= infectedStudent.infectionRadius) {
                    this.totalContacts++;
                    
                    // Roll dice for transmission
                    const diceRoll = this.rollDiceForTransmission();
                    const transmissionProbability = diceRoll / 12;
                    
                    if (Math.random() < transmissionProbability) {
                        healthyStudent.state = 'infected';
                        this.successfulTransmissions++;
                        
                        // Visual feedback - student scales up briefly
                        this.animateInfection(healthyStudent);
                    }
                    
                    this.transmissionHistory.push({
                        diceRoll: diceRoll,
                        probability: transmissionProbability,
                        successful: healthyStudent.state === 'infected'
                    });
                }
            });
        });
    }

    rollDiceForTransmission() {
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const sum = die1 + die2;
        
        this.lastDiceRoll = sum;
        this.updateDiceDisplay(die1, die2, sum);
        this.probabilityDistribution[sum - 2]++;
        
        return sum;
    }

    animateInfection(student) {
        // Create visual pulse effect
        const originalRadius = student.radius;
        let pulseFrame = 0;
        const pulseFrames = 30;
        
        const pulse = () => {
            if (pulseFrame < pulseFrames) {
                const scale = 1 + 0.5 * Math.sin((pulseFrame / pulseFrames) * Math.PI);
                student.radius = originalRadius * scale;
                pulseFrame++;
                requestAnimationFrame(pulse);
            } else {
                student.radius = originalRadius;
            }
        };
        
        pulse();
    }

    updateStatistics() {
        const healthy = this.students.filter(s => s.state === 'healthy').length;
        const infected = this.students.filter(s => s.state === 'infected').length;
        const recovered = this.students.filter(s => s.state === 'recovered').length;
        
        // Update population counts
        this.healthyCountElement.textContent = healthy;
        this.infectedCountElement.textContent = infected;
        this.recoveredCountElement.textContent = recovered;
        
        // Update transmission statistics
        this.lastDiceRollElement.textContent = this.lastDiceRoll || '-';
        this.transmissionPercentElement.textContent = this.lastDiceRoll ? 
            `${((this.lastDiceRoll / 12) * 100).toFixed(1)}%` : '-';
        this.totalContactsElement.textContent = this.totalContacts;
        this.successfulTransmissionsElement.textContent = this.successfulTransmissions;
        
        const successRate = this.totalContacts > 0 ? 
            (this.successfulTransmissions / this.totalContacts * 100).toFixed(1) : 0;
        this.successRateElement.textContent = `${successRate}%`;
        
        // Update SORBET activity tables
        this.updateActivityTables();
    }

    updateActivityTables() {
        // Update stage data based on current infection counts
        if (this.running && this.stageTimer % this.stageInterval === 0 && this.currentStage < 5) {
            const currentInfected = this.students.filter(s => s.state === 'infected').length;
            const previousTotal = this.currentStage > 0 ? this.stageData[this.currentStage - 1].totalInfected : 1;
            
            this.stageData[this.currentStage].newInfected = Math.max(0, currentInfected - previousTotal);
            this.stageData[this.currentStage].totalInfected = currentInfected;
            
            this.currentStage++;
        }
        
        // Update table display
        this.stageData.forEach((data, index) => {
            const newCell = document.getElementById(`stage${index}-new`);
            const totalCell = document.getElementById(`stage${index}-total`);
            
            if (newCell) newCell.textContent = data.newInfected;
            if (totalCell) totalCell.textContent = data.totalInfected;
        });
        
        // Update probability table with observed data
        this.updateProbabilityTable();
        
        // Update infection graph
        this.drawInfectionGraph();
    }

    updateProbabilityTable() {
        const totalRolls = this.probabilityDistribution.reduce((sum, count) => sum + count, 0);
        
        this.probabilityDistribution.forEach((count, index) => {
            const sum = index + 2;
            const countElement = document.getElementById(`count-${sum}`);
            const percentElement = document.getElementById(`percent-${sum}`);
            
            if (countElement) countElement.textContent = count;
            if (percentElement) {
                const percentage = totalRolls > 0 ? ((count / totalRolls) * 100).toFixed(1) : 0;
                percentElement.textContent = `${percentage}%`;
            }
        });
        
        // Re-check the most contagious answer after updating data
        if (this.mostContagiousInput.value.trim()) {
            this.checkMostContagiousAnswer();
        }
    }

    drawInfectionGraph() {
        const ctx = this.infectionGraphCtx;
        const canvas = this.infectionGraphCanvas;
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Set up graph parameters
        const margin = 40;
        const graphWidth = width - 2 * margin;
        const graphHeight = height - 2 * margin;
        
        // Draw axes
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(margin, height - margin);
        ctx.lineTo(width - margin, height - margin); // x-axis
        ctx.moveTo(margin, height - margin);
        ctx.lineTo(margin, margin); // y-axis
        ctx.stroke();
        
        // Draw axis labels
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Stages', width / 2, height - 5);
        
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Total Infected', 0, 0);
        ctx.restore();
        
        // Find max value for scaling
        const maxInfected = Math.max(...this.stageData.map(d => d.totalInfected), 10);
        
        // Draw grid lines and labels
        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 1;
        ctx.fillStyle = '#7f8c8d';
        ctx.font = '10px Arial';
        
        // Vertical grid lines (stages)
        for (let i = 0; i <= 5; i++) {
            const x = margin + (i / 5) * graphWidth;
            ctx.beginPath();
            ctx.moveTo(x, margin);
            ctx.lineTo(x, height - margin);
            ctx.stroke();
            
            ctx.textAlign = 'center';
            ctx.fillText(i.toString(), x, height - margin + 15);
        }
        
        // Horizontal grid lines (infected count)
        for (let i = 0; i <= maxInfected; i += Math.max(1, Math.floor(maxInfected / 5))) {
            const y = height - margin - (i / maxInfected) * graphHeight;
            ctx.beginPath();
            ctx.moveTo(margin, y);
            ctx.lineTo(width - margin, y);
            ctx.stroke();
            
            ctx.textAlign = 'right';
            ctx.fillText(i.toString(), margin - 5, y + 3);
        }
        
        // Draw data line
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        this.stageData.forEach((data, index) => {
            const x = margin + (index / 5) * graphWidth;
            const y = height - margin - (data.totalInfected / maxInfected) * graphHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = '#e74c3c';
        this.stageData.forEach((data, index) => {
            const x = margin + (index / 5) * graphWidth;
            const y = height - margin - (data.totalInfected / maxInfected) * graphHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Add value labels
            ctx.fillStyle = '#2c3e50';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(data.totalInfected.toString(), x, y - 8);
            ctx.fillStyle = '#e74c3c';
        });
    }

    drawProbabilityChart() {
        const ctx = this.chartCtx;
        const width = this.chartCanvas.width;
        const height = this.chartCanvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        if (this.probabilityDistribution.every(count => count === 0)) return;
        
        const maxCount = Math.max(...this.probabilityDistribution);
        const barWidth = width / 11;
        
        // Draw bars
        this.probabilityDistribution.forEach((count, index) => {
            const barHeight = (count / maxCount) * (height - 20);
            const x = index * barWidth;
            const y = height - barHeight - 10;
            
            // Color based on probability (red = low, green = high)
            const probability = (index + 2) / 12;
            const red = Math.floor(255 * (1 - probability));
            const green = Math.floor(255 * probability);
            
            ctx.fillStyle = `rgb(${red}, ${green}, 0)`;
            ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
            
            // Draw dice sum labels
            ctx.fillStyle = '#333';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText((index + 2).toString(), x + barWidth/2, height - 2);
            
            // Draw count labels
            if (count > 0) {
                ctx.fillText(count.toString(), x + barWidth/2, y - 2);
            }
        });
        
        // Draw title
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Dice Roll Distribution', width/2, 15);
    }

    animate() {
        if (!this.running) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw students
        this.students.forEach(student => {
            student.update(this.canvas.width, this.canvas.height);
            student.draw(this.ctx);
        });
        
        // Check for transmissions
        this.checkTransmissions();
        
        // Update stage timer
        this.stageTimer++;
        
        // Update statistics
        this.updateStatistics();
        this.drawProbabilityChart();
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    toggleSimulation() {
        if (this.running) {
            this.running = false;
            this.startBtn.textContent = 'Start Simulation';
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        } else {
            this.running = true;
            this.startBtn.textContent = 'Pause Simulation';
            this.animate();
        }
    }

    resetSimulation() {
        this.running = false;
        this.startBtn.textContent = 'Start Simulation';
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Reset statistics
        this.totalContacts = 0;
        this.successfulTransmissions = 0;
        this.lastDiceRoll = null;
        this.transmissionHistory = [];
        this.probabilityDistribution = new Array(11).fill(0);
        
        // Reset SORBET activity data
        this.stageData = [
            { stage: 0, newInfected: 1, totalInfected: 1 },
            { stage: 1, newInfected: 0, totalInfected: 1 },
            { stage: 2, newInfected: 0, totalInfected: 1 },
            { stage: 3, newInfected: 0, totalInfected: 1 },
            { stage: 4, newInfected: 0, totalInfected: 1 },
            { stage: 5, newInfected: 0, totalInfected: 1 }
        ];
        this.currentStage = 0;
        this.stageTimer = 0;
        
        // Create new population
        const populationSize = parseInt(this.populationSlider.value);
        this.createStudents(populationSize);
        
        // Reset dice display to show no roll
        this.resetDiceDisplay();
        
        // Update display
        this.updateStatistics();
        this.drawProbabilityChart();
        this.drawInfectionGraph();
        
        // Draw initial state
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.students.forEach(student => student.draw(this.ctx));
    }

    resetDiceDisplay() {
        // Clear dice faces to show no dots
        this.dice1.querySelector('.dice-face').innerHTML = '';
        this.dice2.querySelector('.dice-face').innerHTML = '';
        this.diceSumElement.textContent = 'Sum: -';
    }
}

// Initialize simulation when page loads
document.addEventListener('DOMContentLoaded', () => {
    new DiseaseSimulator();
});
