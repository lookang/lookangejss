// Game state and configuration
class ChineseSpaceShooter {
    constructor() {
        // Initialize game elements
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameContainer = document.getElementById('gameContainer');
        
        // Resize canvas to fit container
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Game state variables
        this.gameState = 'playing'; // 'playing', 'paused', 'gameOver'
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.combo = 0;
        this.maxCombo = 0;
        this.correctAnswers = 0;
        this.totalAnswers = 0;
        this.soundEnabled = true;
        
        // Game objects
        this.spaceship = {
            x: 0,
            y: 0,
            width: 40,
            height: 30,
            speed: 5
        };
        
        this.bullets = [];
        this.asteroids = [];
        this.particles = [];
        this.powerUps = [];
        
        // Chinese characters database for Primary 3 level
        this.characters = [
            { char: '水', meaning: 'Water', pinyin: 'shuǐ' },
            { char: '火', meaning: 'Fire', pinyin: 'huǒ' },
            { char: '木', meaning: 'Wood', pinyin: 'mù' },
            { char: '金', meaning: 'Gold', pinyin: 'jīn' },
            { char: '土', meaning: 'Earth', pinyin: 'tǔ' },
            { char: '人', meaning: 'Person', pinyin: 'rén' },
            { char: '大', meaning: 'Big', pinyin: 'dà' },
            { char: '小', meaning: 'Small', pinyin: 'xiǎo' },
            { char: '上', meaning: 'Up', pinyin: 'shàng' },
            { char: '下', meaning: 'Down', pinyin: 'xià' },
            { char: '左', meaning: 'Left', pinyin: 'zuǒ' },
            { char: '右', meaning: 'Right', pinyin: 'yòu' },
            { char: '中', meaning: 'Middle', pinyin: 'zhōng' },
            { char: '日', meaning: 'Sun', pinyin: 'rì' },
            { char: '月', meaning: 'Moon', pinyin: 'yuè' },
            { char: '山', meaning: 'Mountain', pinyin: 'shān' },
            { char: '川', meaning: 'River', pinyin: 'chuān' },
            { char: '田', meaning: 'Field', pinyin: 'tián' },
            { char: '口', meaning: 'Mouth', pinyin: 'kǒu' },
            { char: '手', meaning: 'Hand', pinyin: 'shǒu' }
        ];
        
        // Current question
        this.currentQuestion = null;
        this.generateNewQuestion();
        
        // Input handling
        this.keys = {};
        this.mousePos = { x: 0, y: 0 };
        this.touchPos = { x: 0, y: 0 };
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Initialize spaceship position
        this.spaceship.x = this.canvas.width / 2 - this.spaceship.width / 2;
        this.spaceship.y = this.canvas.height - this.spaceship.height - 20;
        
        // Game timing
        this.lastTime = 0;
        this.asteroidSpawnTimer = 0;
        this.asteroidSpawnInterval = 2000; // 2 seconds
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Start game loop
        this.gameLoop();
        
        // Load leaderboard
        this.loadLeaderboard();
    }
    
    // Resize canvas to fit container while maintaining aspect ratio
    resizeCanvas() {
        const container = this.gameContainer;
        const rect = container.getBoundingClientRect();
        
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Update spaceship position if canvas size changed
        if (this.spaceship) {
            this.spaceship.x = Math.min(this.spaceship.x, this.canvas.width - this.spaceship.width);
            this.spaceship.y = Math.min(this.spaceship.y, this.canvas.height - this.spaceship.height);
        }
    }
    
    // Initialize all event listeners
    initEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Space') {
                e.preventDefault();
                this.shoot();
            }
            if (e.code === 'Escape') {
                this.togglePause();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // Mouse controls
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePos.x = e.clientX - rect.left;
            this.mousePos.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('click', () => {
            if (this.gameState === 'playing') {
                this.shoot();
            }
        });
        
        // Touch controls for mobile
        const touchArea = document.getElementById('touchArea');
        if (touchArea) {
            touchArea.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleTouch(e.touches[0]);
            });
            
            touchArea.addEventListener('touchmove', (e) => {
                e.preventDefault();
                this.handleTouch(e.touches[0]);
            });
        }
        
        // UI button controls
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('soundBtn').addEventListener('click', () => this.toggleSound());
        document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
        document.getElementById('leaderboardBtn').addEventListener('click', () => this.showLeaderboard());
        
        // Modal controls
        document.getElementById('closeHelp').addEventListener('click', () => this.hideHelp());
        document.getElementById('closeLeaderboard').addEventListener('click', () => this.hideLeaderboard());
        
        // Click outside modal to close
        document.getElementById('helpModal').addEventListener('click', (e) => {
            if (e.target.id === 'helpModal') this.hideHelp();
        });
        document.getElementById('leaderboardModal').addEventListener('click', (e) => {
            if (e.target.id === 'leaderboardModal') this.hideLeaderboard();
        });
    }
    
    // Handle touch input for mobile devices
    handleTouch(touch) {
        const rect = this.canvas.getBoundingClientRect();
        this.touchPos.x = touch.clientX - rect.left;
        this.touchPos.y = touch.clientY - rect.top;
        
        // Move spaceship towards touch position
        if (this.gameState === 'playing') {
            const targetX = this.touchPos.x - this.spaceship.width / 2;
            this.spaceship.x = Math.max(0, Math.min(targetX, this.canvas.width - this.spaceship.width));
        }
    }
    
    // Generate a new question for the player
    generateNewQuestion() {
        const randomChar = this.characters[Math.floor(Math.random() * this.characters.length)];
        this.currentQuestion = randomChar;
        
        // Update UI
        document.getElementById('questionText').textContent = `找到这个字: ${randomChar.char}`;
        document.getElementById('questionMeaning').textContent = `${randomChar.meaning} (${randomChar.pinyin})`;
    }
    
    // Create a new bullet
    shoot() {
        if (this.gameState !== 'playing') return;
        
        this.bullets.push({
            x: this.spaceship.x + this.spaceship.width / 2 - 2,
            y: this.spaceship.y,
            width: 4,
            height: 10,
            speed: 8,
            color: '#00ff00'
        });
        
        // Play shoot sound effect
        this.playSound('shoot');
    }
    
    // Create a new asteroid with random character
    createAsteroid() {
        const isCorrect = Math.random() < 0.3; // 30% chance for correct answer
        let character;
        
        if (isCorrect) {
            character = this.currentQuestion;
        } else {
            // Select a different random character
            do {
                character = this.characters[Math.floor(Math.random() * this.characters.length)];
            } while (character.char === this.currentQuestion.char);
        }
        
        const asteroid = {
            x: Math.random() * (this.canvas.width - 60),
            y: -60,
            width: 60,
            height: 60,
            speed: 1 + this.level * 0.5,
            character: character.char,
            isCorrect: isCorrect,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.1
        };
        
        this.asteroids.push(asteroid);
    }
    
    // Update game state
    update(deltaTime) {
        if (this.gameState !== 'playing') return;
        
        // Update spaceship position based on input
        if (!this.isMobile) {
            // Keyboard controls
            if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
                this.spaceship.x -= this.spaceship.speed;
            }
            if (this.keys['ArrowRight'] || this.keys['KeyD']) {
                this.spaceship.x += this.spaceship.speed;
            }
            if (this.keys['ArrowUp'] || this.keys['KeyW']) {
                this.spaceship.y -= this.spaceship.speed;
            }
            if (this.keys['ArrowDown'] || this.keys['KeyS']) {
                this.spaceship.y += this.spaceship.speed;
            }
        }
        
        // Keep spaceship within bounds
        this.spaceship.x = Math.max(0, Math.min(this.spaceship.x, this.canvas.width - this.spaceship.width));
        this.spaceship.y = Math.max(0, Math.min(this.spaceship.y, this.canvas.height - this.spaceship.height));
        
        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.y -= bullet.speed;
            return bullet.y > -bullet.height;
        });
        
        // Update asteroids
        this.asteroids.forEach(asteroid => {
            asteroid.y += asteroid.speed;
            asteroid.rotation += asteroid.rotationSpeed;
        });
        
        // Remove asteroids that are off screen
        this.asteroids = this.asteroids.filter(asteroid => {
            if (asteroid.y > this.canvas.height) {
                // Missed asteroid - lose life if it was correct
                if (asteroid.isCorrect) {
                    this.loseLife();
                }
                return false;
            }
            return true;
        });
        
        // Check bullet-asteroid collisions
        this.checkCollisions();
        
        // Spawn new asteroids
        this.asteroidSpawnTimer += deltaTime;
        if (this.asteroidSpawnTimer >= this.asteroidSpawnInterval) {
            this.createAsteroid();
            this.asteroidSpawnTimer = 0;
        }
        
        // Update particles
        this.updateParticles();
        
        // Auto-shoot for mobile devices
        if (this.isMobile && Math.random() < 0.1) {
            this.shoot();
        }
    }
    
    // Check collisions between bullets and asteroids
    checkCollisions() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            
            for (let j = this.asteroids.length - 1; j >= 0; j--) {
                const asteroid = this.asteroids[j];
                
                if (this.isColliding(bullet, asteroid)) {
                    // Remove bullet and asteroid
                    this.bullets.splice(i, 1);
                    this.asteroids.splice(j, 1);
                    
                    // Check if answer is correct
                    this.totalAnswers++;
                    if (asteroid.isCorrect) {
                        this.correctAnswer(asteroid);
                    } else {
                        this.wrongAnswer(asteroid);
                    }
                    
                    // Create explosion particles
                    this.createExplosion(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2, asteroid.isCorrect);
                    break;
                }
            }
        }
    }
    
    // Check if two objects are colliding
    isColliding(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }
    
    // Handle correct answer
    correctAnswer(asteroid) {
        this.correctAnswers++;
        this.combo++;
        this.maxCombo = Math.max(this.maxCombo, this.combo);
        
        // Calculate score with combo bonus
        let points = 10 + (this.combo * 2);
        this.score += points;
        
        // Show combo notification
        if (this.combo >= 3) {
            this.showPowerUpNotification(`连击 x${this.combo}!`);
        }
        
        // Play success sound
        this.playSound('correct');
        
        // Generate new question
        this.generateNewQuestion();
        
        // Check for level up
        this.checkLevelUp();
        
        // Update UI
        this.updateUI();
    }
    
    // Handle wrong answer
    wrongAnswer(asteroid) {
        this.combo = 0;
        this.score = Math.max(0, this.score - 5);
        this.loseLife();
        
        // Play error sound
        this.playSound('wrong');
        
        // Update UI
        this.updateUI();
    }
    
    // Lose a life
    loseLife() {
        this.lives--;
        this.combo = 0;
        
        // Update hearts display
        const hearts = document.querySelectorAll('.heart');
        if (hearts[this.lives]) {
            hearts[this.lives].classList.add('lost');
        }
        
        if (this.lives <= 0) {
            this.gameOver();
        }
    }
    
    // Check if player should level up
    checkLevelUp() {
        const requiredScore = this.level * 100;
        if (this.score >= requiredScore) {
            this.level++;
            this.showPowerUpNotification(`等级提升! 等级 ${this.level}`);
            
            // Increase difficulty
            this.asteroidSpawnInterval = Math.max(1000, this.asteroidSpawnInterval - 100);
            
            // Play level up sound
            this.playSound('levelup');
        }
    }
    
    // Create explosion particles
    createExplosion(x, y, isCorrect) {
        const color = isCorrect ? '#00ff00' : '#ff0000';
        const particleCount = isCorrect ? 12 : 8;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1.0,
                decay: 0.02,
                color: color,
                size: Math.random() * 4 + 2
            });
        }
    }
    
    // Update particle system
    updateParticles() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.size *= 0.98;
            return particle.life > 0;
        });
    }
    
    // Render the game
    render() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw stars background
        this.drawStars();
        
        // Draw spaceship
        this.drawSpaceship();
        
        // Draw bullets
        this.bullets.forEach(bullet => this.drawBullet(bullet));
        
        // Draw asteroids
        this.asteroids.forEach(asteroid => this.drawAsteroid(asteroid));
        
        // Draw particles
        this.particles.forEach(particle => this.drawParticle(particle));
        
        // Draw pause overlay
        if (this.gameState === 'paused') {
            this.drawPauseOverlay();
        }
    }
    
    // Draw animated stars background
    drawStars() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < 50; i++) {
            const x = (i * 37) % this.canvas.width;
            const y = (i * 23 + Date.now() * 0.01) % this.canvas.height;
            const size = Math.sin(Date.now() * 0.001 + i) * 1 + 1;
            this.ctx.fillRect(x, y, size, size);
        }
    }
    
    // Draw the player's spaceship
    drawSpaceship() {
        this.ctx.save();
        this.ctx.translate(this.spaceship.x + this.spaceship.width / 2, this.spaceship.y + this.spaceship.height / 2);
        
        // Draw spaceship body
        this.ctx.fillStyle = '#4a90e2';
        this.ctx.beginPath();
        this.ctx.moveTo(0, -15);
        this.ctx.lineTo(-15, 15);
        this.ctx.lineTo(0, 10);
        this.ctx.lineTo(15, 15);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw spaceship details
        this.ctx.fillStyle = '#7bb3f0';
        this.ctx.fillRect(-8, -5, 16, 8);
        
        // Draw engine glow
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.fillRect(-3, 12, 6, 8);
        
        this.ctx.restore();
    }
    
    // Draw a bullet
    drawBullet(bullet) {
        this.ctx.fillStyle = bullet.color;
        this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        
        // Add glow effect
        this.ctx.shadowColor = bullet.color;
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        this.ctx.shadowBlur = 0;
    }
    
    // Draw an asteroid with Chinese character
    drawAsteroid(asteroid) {
        this.ctx.save();
        this.ctx.translate(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2);
        this.ctx.rotate(asteroid.rotation);
        
        // Draw asteroid background
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, asteroid.width / 2);
        if (asteroid.isCorrect) {
            gradient.addColorStop(0, '#4a90e2');
            gradient.addColorStop(1, '#2a5a9a');
        } else {
            gradient.addColorStop(0, '#666666');
            gradient.addColorStop(1, '#333333');
        }
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, asteroid.width / 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw border
        this.ctx.strokeStyle = asteroid.isCorrect ? '#7bb3f0' : '#888888';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw Chinese character
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(asteroid.character, 0, 0);
        
        this.ctx.restore();
    }
    
    // Draw a particle
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.life;
        this.ctx.fillStyle = particle.color;
        this.ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
        this.ctx.restore();
    }
    
    // Draw pause overlay
    drawPauseOverlay() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('游戏暂停', this.canvas.width / 2, this.canvas.height / 2);
        
        this.ctx.font = '16px Arial';
        this.ctx.fillText('按 ESC 继续游戏', this.canvas.width / 2, this.canvas.height / 2 + 40);
    }
    
    // Update UI elements
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        
        // Update progress bar
        const progress = (this.score % 100) / 100 * 100;
        document.getElementById('progress').style.width = progress + '%';
        
        // Update stars based on combo
        const starsContainer = document.getElementById('stars');
        starsContainer.innerHTML = '';
        for (let i = 0; i < Math.min(this.combo, 5); i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.textContent = '⭐';
            starsContainer.appendChild(star);
        }
    }
    
    // Show power-up notification
    showPowerUpNotification(text) {
        const notification = document.getElementById('powerUpNotification');
        const textElement = notification.querySelector('.power-up-text');
        textElement.textContent = text;
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }
    
    // Game over
    gameOver() {
        this.gameState = 'gameOver';
        
        // Calculate accuracy
        const accuracy = this.totalAnswers > 0 ? Math.round((this.correctAnswers / this.totalAnswers) * 100) : 0;
        
        // Update game over screen
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('accuracy').textContent = accuracy + '%';
        document.getElementById('maxCombo').textContent = this.maxCombo;
        
        // Show game over screen
        document.getElementById('gameOver').style.display = 'flex';
        
        // Save score to leaderboard
        this.saveScore();
        
        // Play game over sound
        this.playSound('gameover');
    }
    
    // Restart the game
    restartGame() {
        // Reset game state
        this.gameState = 'playing';
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.combo = 0;
        this.maxCombo = 0;
        this.correctAnswers = 0;
        this.totalAnswers = 0;
        
        // Clear game objects
        this.bullets = [];
        this.asteroids = [];
        this.particles = [];
        this.powerUps = [];
        
        // Reset spaceship position
        this.spaceship.x = this.canvas.width / 2 - this.spaceship.width / 2;
        this.spaceship.y = this.canvas.height - this.spaceship.height - 20;
        
        // Reset timers
        this.asteroidSpawnTimer = 0;
        this.asteroidSpawnInterval = 2000;
        
        // Reset UI
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => heart.classList.remove('lost'));
        
        // Generate new question
        this.generateNewQuestion();
        
        // Hide game over screen
        document.getElementById('gameOver').style.display = 'none';
        
        // Update UI
        this.updateUI();
    }
    
    // Toggle pause
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            document.getElementById('pauseBtn').textContent = '▶️';
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            document.getElementById('pauseBtn').textContent = '⏸️';
        }
    }
    
    // Toggle sound
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        document.getElementById('soundBtn').textContent = this.soundEnabled ? '🔊' : '🔇';
    }
    
    // Show help modal
    showHelp() {
        document.getElementById('helpModal').style.display = 'flex';
    }
    
    // Hide help modal
    hideHelp() {
        document.getElementById('helpModal').style.display = 'none';
    }
    
    // Show leaderboard modal
    showLeaderboard() {
        this.displayLeaderboard();
        document.getElementById('leaderboardModal').style.display = 'flex';
    }
    
    // Hide leaderboard modal
    hideLeaderboard() {
        document.getElementById('leaderboardModal').style.display = 'none';
    }
    
    // Play sound effect
    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Create audio context for sound effects
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Different sounds for different events
            switch (type) {
                case 'shoot':
                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    break;
                case 'correct':
                    oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
                    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
                    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    break;
                case 'wrong':
                    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    break;
                case 'levelup':
                    oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
                    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
                    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
                    oscillator.frequency.setValueAtTime(1047, audioContext.currentTime + 0.3);
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                    break;
                case 'gameover':
                    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 1);
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
                    break;
            }
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + (type === 'gameover' ? 1 : type === 'levelup' ? 0.5 : type === 'correct' ? 0.3 : 0.1));
        } catch (e) {
            // Fallback for browsers that don't support Web Audio API
            console.log('Sound effect:', type);
        }
    }
    
    // Save score to leaderboard
    saveScore() {
        const leaderboard = this.loadLeaderboard();
        const newEntry = {
            score: this.score,
            level: this.level,
            accuracy: this.totalAnswers > 0 ? Math.round((this.correctAnswers / this.totalAnswers) * 100) : 0,
            date: new Date().toLocaleDateString()
        };
        
        leaderboard.push(newEntry);
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard.splice(10); // Keep only top 10
        
        localStorage.setItem('chineseSpaceShooterLeaderboard', JSON.stringify(leaderboard));
    }
    
    // Load leaderboard from localStorage
    loadLeaderboard() {
        const saved = localStorage.getItem('chineseSpaceShooterLeaderboard');
        return saved ? JSON.parse(saved) : [];
    }
    
    // Display leaderboard
    displayLeaderboard() {
        const leaderboard = this.loadLeaderboard();
        const container = document.getElementById('leaderboardList');
        
        if (leaderboard.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #888;">还没有分数记录</div>';
            return;
        }
        
        container.innerHTML = leaderboard.map((entry, index) => `
            <div class="leaderboard-entry ${index === 0 ? 'top-score' : ''}">
                <div>
                    <strong>#${index + 1}</strong>
                    <span style="margin-left: 10px;">等级 ${entry.level}</span>
                    <span style="margin-left: 10px;">正确率 ${entry.accuracy}%</span>
                </div>
                <div>
                    <strong>${entry.score}</strong> 分
                    <div style="font-size: 12px; opacity: 0.7;">${entry.date}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Main game loop
    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // Update and render
        this.update(deltaTime);
        this.render();
        
        // Continue loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChineseSpaceShooter();
});