// Game state and configuration
class SpaceMathShooter {
    constructor() {
        // Initialize canvas and context
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size to match container
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Game state variables
        this.gameState = 'menu'; // menu, playing, paused, gameOver
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.currentRound = 'prime'; // 'prime' or 'irrational'
        
        // Game objects
        this.spaceship = {
            x: this.canvas.width / 2 - 25,
            y: this.canvas.height - 80,
            width: 50,
            height: 40,
            speed: 5
        };
        
        this.bullets = [];
        this.targets = [];
        this.stars = [];
        this.particles = [];
        
        // Input handling
        this.keys = {};
        this.setupEventListeners();
        
        // Game data for different levels
        this.gameData = {
            prime: {
                instruction: "Shoot the prime number!",
                levels: [
                    // Level 1: Basic primes
                    [
                        { correct: 7, distractors: [4, 6, 8] },
                        { correct: 11, distractors: [9, 10, 12] },
                        { correct: 13, distractors: [14, 15, 16] },
                        { correct: 17, distractors: [18, 20, 21] }
                    ],
                    // Level 2: Larger primes
                    [
                        { correct: 23, distractors: [22, 24, 25] },
                        { correct: 29, distractors: [27, 28, 30] },
                        { correct: 31, distractors: [32, 33, 34] },
                        { correct: 37, distractors: [35, 36, 38] }
                    ],
                    // Level 3: Challenging primes
                    [
                        { correct: 41, distractors: [39, 40, 42] },
                        { correct: 43, distractors: [44, 45, 46] },
                        { correct: 47, distractors: [48, 49, 50] },
                        { correct: 53, distractors: [51, 52, 54] }
                    ]
                ]
            },
            irrational: {
                instruction: "Shoot the irrational number!",
                levels: [
                    // Level 1: Basic irrationals
                    [
                        { correct: "√2", distractors: ["2", "1/2", "0.5"] },
                        { correct: "√3", distractors: ["3", "1/3", "0.33"] },
                        { correct: "π", distractors: ["3", "22/7", "3.14"] },
                        { correct: "√5", distractors: ["5", "2.5", "1/5"] }
                    ],
                    // Level 2: More complex irrationals
                    [
                        { correct: "√7", distractors: ["7", "3.5", "7/2"] },
                        { correct: "√10", distractors: ["10", "5", "10/3"] },
                        { correct: "√11", distractors: ["11", "5.5", "11/2"] },
                        { correct: "e", distractors: ["2.7", "27/10", "2.71"] }
                    ],
                    // Level 3: Advanced irrationals
                    [
                        { correct: "√13", distractors: ["13", "6.5", "13/2"] },
                        { correct: "√17", distractors: ["17", "8.5", "17/2"] },
                        { correct: "√19", distractors: ["19", "9.5", "19/2"] },
                        { correct: "√23", distractors: ["23", "11.5", "23/2"] }
                    ]
                ]
            }
        };
        
        // Initialize game elements
        this.generateStars();
        this.currentQuestionIndex = 0;
        
        // Animation frame reference
        this.animationId = null;
        
        // Start the game loop
        this.gameLoop();
    }
    
    // Resize canvas to fit container
    resizeCanvas() {
        const container = document.getElementById('gameContainer');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        
        // Adjust spaceship position if canvas resized
        if (this.spaceship) {
            this.spaceship.x = Math.min(this.spaceship.x, this.canvas.width - this.spaceship.width);
            this.spaceship.y = this.canvas.height - 80;
        }
    }
    
    // Set up event listeners for controls
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            
            // Prevent default behavior for game keys
            if (['ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
                e.preventDefault();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // Button controls
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.togglePause();
        });
        
        // Mobile controls
        document.getElementById('moveLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys['ArrowLeft'] = true;
        });
        
        document.getElementById('moveLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys['ArrowLeft'] = false;
        });
        
        document.getElementById('moveRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys['ArrowRight'] = true;
        });
        
        document.getElementById('moveRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys['ArrowRight'] = false;
        });
        
        document.getElementById('shoot').addEventListener('click', (e) => {
            e.preventDefault();
            this.shoot();
        });
        
        // Prevent context menu on touch devices
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    // Generate background stars
    generateStars() {
        this.stars = [];
        for (let i = 0; i < 100; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 2 + 1,
                brightness: Math.random()
            });
        }
    }
    
    // Start the game
    startGame() {
        this.gameState = 'playing';
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.currentQuestionIndex = 0;
        this.bullets = [];
        this.particles = [];
        
        // Reset spaceship position
        this.spaceship.x = this.canvas.width / 2 - 25;
        
        // Show pause button, hide start button
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'inline-block';
        
        // Start first round
        this.startNewRound();
        
        this.updateUI();
    }
    
    // Start a new round with targets
    startNewRound() {
        // Alternate between prime and irrational rounds
        this.currentRound = (this.currentRound === 'prime') ? 'irrational' : 'prime';
        
        // Get current level data (cycle through levels)
        const levelIndex = Math.min(Math.floor((this.level - 1) / 2), 2);
        const roundData = this.gameData[this.currentRound];
        const questions = roundData.levels[levelIndex];
        
        // Get current question (cycle through questions)
        const questionIndex = this.currentQuestionIndex % questions.length;
        const currentQuestion = questions[questionIndex];
        
        // Update instruction
        document.getElementById('instruction').textContent = roundData.instruction;
        document.getElementById('instruction').title = `Level ${this.level}: ${roundData.instruction}`;
        
        // Create targets with all options
        this.targets = [];
        const allOptions = [currentQuestion.correct, ...currentQuestion.distractors];
        
        // Shuffle options
        for (let i = allOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
        }
        
        // Create target objects
        const targetWidth = 80;
        const targetHeight = 50;
        const spacing = (this.canvas.width - (4 * targetWidth)) / 5;
        
        for (let i = 0; i < 4; i++) {
            this.targets.push({
                x: spacing + i * (targetWidth + spacing),
                y: 100,
                width: targetWidth,
                height: targetHeight,
                value: allOptions[i],
                isCorrect: allOptions[i] === currentQuestion.correct,
                speed: 1 + this.level * 0.2,
                hit: false
            });
        }
        
        this.currentQuestionIndex++;
    }
    
    // Handle input
    handleInput() {
        if (this.gameState !== 'playing') return;
        
        // Move spaceship
        if (this.keys['ArrowLeft'] && this.spaceship.x > 0) {
            this.spaceship.x -= this.spaceship.speed;
        }
        if (this.keys['ArrowRight'] && this.spaceship.x < this.canvas.width - this.spaceship.width) {
            this.spaceship.x += this.spaceship.speed;
        }
        
        // Shoot
        if (this.keys['Space']) {
            this.shoot();
            this.keys['Space'] = false; // Prevent continuous shooting
        }
    }
    
    // Shoot bullet
    shoot() {
        if (this.gameState !== 'playing') return;
        
        // Limit bullets on screen
        if (this.bullets.length < 3) {
            this.bullets.push({
                x: this.spaceship.x + this.spaceship.width / 2 - 2,
                y: this.spaceship.y,
                width: 4,
                height: 15,
                speed: 8
            });
            
            // Add shooting effect
            this.createParticles(this.spaceship.x + this.spaceship.width / 2, this.spaceship.y, '#00ffff');
        }
    }
    
    // Create particle effects
    createParticles(x, y, color) {
        for (let i = 0; i < 5; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 30,
                maxLife: 30,
                color: color,
                size: Math.random() * 3 + 1
            });
        }
    }
    
    // Update game objects
    update() {
        if (this.gameState !== 'playing') return;
        
        // Update stars
        this.stars.forEach(star => {
            star.y += star.speed;
            if (star.y > this.canvas.height) {
                star.y = 0;
                star.x = Math.random() * this.canvas.width;
            }
        });
        
        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.y -= bullet.speed;
            return bullet.y > -bullet.height;
        });
        
        // Update targets
        this.targets.forEach(target => {
            if (!target.hit) {
                target.y += target.speed;
            }
        });
        
        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            return particle.life > 0;
        });
        
        // Check collisions
        this.checkCollisions();
        
        // Check if targets reached bottom
        if (this.targets.some(target => target.y > this.canvas.height - 100 && !target.hit)) {
            this.lives--;
            if (this.lives <= 0) {
                this.gameOver();
            } else {
                this.startNewRound();
            }
        }
        
        // Check if all targets are off screen or hit
        if (this.targets.every(target => target.hit || target.y > this.canvas.height)) {
            setTimeout(() => {
                if (this.gameState === 'playing') {
                    this.level++;
                    this.startNewRound();
                }
            }, 1000);
        }
    }
    
    // Check for collisions between bullets and targets
    checkCollisions() {
        this.bullets.forEach((bullet, bulletIndex) => {
            this.targets.forEach((target, targetIndex) => {
                if (!target.hit && 
                    bullet.x < target.x + target.width &&
                    bullet.x + bullet.width > target.x &&
                    bullet.y < target.y + target.height &&
                    bullet.y + bullet.height > target.y) {
                    
                    // Remove bullet
                    this.bullets.splice(bulletIndex, 1);
                    
                    // Mark target as hit
                    target.hit = true;
                    
                    // Check if correct
                    if (target.isCorrect) {
                        this.score += 10 * this.level;
                        this.showFeedback(`Correct! ${target.value} is ${this.currentRound === 'prime' ? 'prime' : 'irrational'}.`, true);
                        this.createParticles(target.x + target.width / 2, target.y + target.height / 2, '#00ff00');
                    } else {
                        this.lives--;
                        this.showFeedback(`Wrong! ${target.value} is not ${this.currentRound === 'prime' ? 'prime' : 'irrational'}.`, false);
                        this.createParticles(target.x + target.width / 2, target.y + target.height / 2, '#ff0000');
                        
                        if (this.lives <= 0) {
                            this.gameOver();
                        }
                    }
                    
                    this.updateUI();
                }
            });
        });
    }
    
    // Show feedback message
    showFeedback(message, isCorrect) {
        const feedbackPanel = document.getElementById('feedbackPanel');
        const feedback = document.getElementById('feedback');
        
        feedback.textContent = message;
        feedbackPanel.className = isCorrect ? 'show' : 'show wrong';
        
        setTimeout(() => {
            feedbackPanel.className = '';
        }, 2000);
    }
    
    // Update UI elements
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('lives').textContent = this.lives;
    }
    
    // Toggle pause
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            document.getElementById('pauseBtn').textContent = 'Resume';
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            document.getElementById('pauseBtn').textContent = 'Pause';
        }
    }
    
    // Game over
    gameOver() {
        this.gameState = 'gameOver';
        document.getElementById('startBtn').style.display = 'inline-block';
        document.getElementById('startBtn').textContent = 'Play Again';
        document.getElementById('pauseBtn').style.display = 'none';
        
        this.showFeedback(`Game Over! Final Score: ${this.score}`, false);
    }
    
    // Render everything
    render() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(0, 4, 40, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw stars
        this.stars.forEach(star => {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
        });
        
        // Draw spaceship
        this.drawSpaceship();
        
        // Draw bullets
        this.bullets.forEach(bullet => {
            this.ctx.fillStyle = '#00ffff';
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            
            // Add glow effect
            this.ctx.shadowColor = '#00ffff';
            this.ctx.shadowBlur = 10;
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            this.ctx.shadowBlur = 0;
        });
        
        // Draw targets
        this.targets.forEach(target => {
            if (!target.hit) {
                // Draw target background
                this.ctx.fillStyle = '#333';
                this.ctx.fillRect(target.x, target.y, target.width, target.height);
                
                // Draw border
                this.ctx.strokeStyle = '#00ffff';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(target.x, target.y, target.width, target.height);
                
                // Draw text
                this.ctx.fillStyle = '#fff';
                this.ctx.font = '16px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(
                    target.value.toString(),
                    target.x + target.width / 2,
                    target.y + target.height / 2
                );
            }
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            this.ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            this.ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        });
        
        // Draw pause overlay
        if (this.gameState === 'paused') {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2);
        }
    }
    
    // Draw the spaceship
    drawSpaceship() {
        const ship = this.spaceship;
        
        // Draw spaceship body
        this.ctx.fillStyle = '#00ffff';
        this.ctx.fillRect(ship.x + 10, ship.y + 20, 30, 20);
        
        // Draw spaceship nose
        this.ctx.beginPath();
        this.ctx.moveTo(ship.x + 25, ship.y);
        this.ctx.lineTo(ship.x + 15, ship.y + 20);
        this.ctx.lineTo(ship.x + 35, ship.y + 20);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw wings
        this.ctx.fillRect(ship.x, ship.y + 30, 15, 10);
        this.ctx.fillRect(ship.x + 35, ship.y + 30, 15, 10);
        
        // Add glow effect
        this.ctx.shadowColor = '#00ffff';
        this.ctx.shadowBlur = 15;
        this.ctx.fillRect(ship.x + 10, ship.y + 20, 30, 20);
        this.ctx.shadowBlur = 0;
    }
    
    // Main game loop
    gameLoop() {
        this.handleInput();
        this.update();
        this.render();
        
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new SpaceMathShooter();
    
    // Add tooltip functionality
    const gameContainer = document.getElementById('gameContainer');
    const tooltip = document.getElementById('tooltip');
    
    let tooltipTimeout;
    
    gameContainer.addEventListener('mouseenter', () => {
        tooltipTimeout = setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 1000);
    });
    
    gameContainer.addEventListener('mouseleave', () => {
        clearTimeout(tooltipTimeout);
        tooltip.style.opacity = '0';
    });
    
    // Prevent scrolling on mobile when touching game area
    gameContainer.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
});