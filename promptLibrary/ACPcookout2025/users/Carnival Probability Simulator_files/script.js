// Carnival Probability Simulator JavaScript
// Interactive probability learning through carnival games

class CarnivalSimulator {
    constructor() {
        // Initialize game states and statistics
        this.currentGame = 'dartboard';
        this.gameStats = {
            dartboard: { attempts: 0, hits: 0, prediction: null },
            ringtoss: { attempts: 0, hits: 0, target: 'easy' },
            luckydraw: { attempts: 0, hits: 0, prediction: null, balls: ['red', 'blue', 'green', 'yellow', 'red'], drawnBalls: [] },
            cointoss: { attempts: 0, heads: 0, tails: 0 }
        };
        
        this.init();
    }

    init() {
        // Initialize event listeners and setup
        this.setupEventListeners();
        this.setupTooltips();
        this.resetLuckyDrawBalls();
    }

    setupEventListeners() {
        // Game selection buttons
        document.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchGame(e.target.dataset.game);
            });
        });

        // Dartboard game
        document.getElementById('throw-dart').addEventListener('click', () => {
            this.playDartboard();
        });

        document.getElementById('dartboard').addEventListener('click', (e) => {
            this.handleDartboardClick(e);
        });

        // Ring toss game
        document.getElementById('toss-ring').addEventListener('click', () => {
            this.playRingToss();
        });

        document.getElementById('ring-target').addEventListener('change', (e) => {
            this.gameStats.ringtoss.target = e.target.value;
        });

        // Lucky draw game
        document.getElementById('draw-ball').addEventListener('click', () => {
            this.playLuckyDraw();
        });

        document.getElementById('reset-draw').addEventListener('click', () => {
            this.resetLuckyDrawBalls();
        });

        // Coin toss game
        document.getElementById('flip-coin').addEventListener('click', () => {
            this.playCoinToss();
        });

        document.getElementById('multi-flip').addEventListener('click', () => {
            this.playMultipleCoinToss();
        });

        // Global reset
        document.getElementById('reset-all').addEventListener('click', () => {
            this.resetAllGames();
        });

        // Prediction inputs
        document.getElementById('dart-prediction').addEventListener('change', (e) => {
            this.gameStats.dartboard.prediction = parseInt(e.target.value);
        });

        document.getElementById('draw-prediction').addEventListener('change', (e) => {
            this.gameStats.luckydraw.prediction = parseInt(e.target.value);
        });
    }

    setupTooltips() {
        // Setup hover tooltips for educational content
        const tooltip = document.getElementById('tooltip');
        
        // Add tooltips to various elements
        const tooltipElements = [
            { selector: '.dartboard', text: 'Dartboard Probability: Bullseye has smallest area, lowest probability!' },
            { selector: '.pegs', text: 'Ring Toss: Different peg sizes = different success probabilities' },
            { selector: '.ball-container', text: 'Lucky Draw: With/without replacement changes probabilities!' },
            { selector: '.coin', text: 'Coin Toss: Theoretical probability is 50/50, but what about practice?' },
            { selector: '#replacement', text: 'Replacement affects probability calculations significantly!' }
        ];

        tooltipElements.forEach(({ selector, text }) => {
            const element = document.querySelector(selector);
            if (element) {
                element.addEventListener('mouseenter', (e) => {
                    this.showTooltip(e, text);
                });
                element.addEventListener('mouseleave', () => {
                    this.hideTooltip();
                });
            }
        });
    }

    showTooltip(event, text) {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = text;
        tooltip.classList.add('show');
        
        // Position tooltip
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 40}px`;
        tooltip.style.transform = 'translateX(-50%)';
    }

    hideTooltip() {
        document.getElementById('tooltip').classList.remove('show');
    }

    switchGame(gameType) {
        // Switch between different carnival games
        this.currentGame = gameType;
        
        // Update active button
        document.querySelectorAll('.game-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-game="${gameType}"]`).classList.add('active');
        
        // Show corresponding game panel
        document.querySelectorAll('.game-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`${gameType}-game`).classList.add('active');
    }

    playDartboard() {
        // Simulate dartboard throw with probability-based outcomes
        const btn = document.getElementById('throw-dart');
        btn.classList.add('loading');
        
        setTimeout(() => {
            const stats = this.gameStats.dartboard;
            stats.attempts++;
            
            // Simulate dart throw with weighted probabilities
            // Bullseye: 5%, Inner: 15%, Middle: 30%, Outer: 50%
            const random = Math.random();
            let hitZone, points;
            
            if (random < 0.05) {
                hitZone = 'bullseye';
                points = 20;
                stats.hits++;
            } else if (random < 0.2) {
                hitZone = 'inner-ring';
                points = 10;
            } else if (random < 0.5) {
                hitZone = 'middle-ring';
                points = 5;
            } else {
                hitZone = 'outer-ring';
                points = 1;
            }
            
            // Visual feedback
            this.animateHit(hitZone);
            this.updateDartboardStats();
            
            btn.classList.remove('loading');
        }, 1000);
    }

    handleDartboardClick(event) {
        // Allow students to click on dartboard zones for immediate feedback
        if (event.target.classList.contains('ring')) {
            const zone = event.target.classList[1]; // Get the specific ring class
            this.animateHit(zone);
            
            // Provide educational feedback
            const points = event.target.dataset.points;
            this.showTooltip(event, `This zone is worth ${points} points!`);
        }
    }

    animateHit(zone) {
        // Visual animation for successful hits
        const targetRing = document.querySelector(`.${zone}`);
        if (targetRing) {
            targetRing.classList.add('success-animation');
            setTimeout(() => {
                targetRing.classList.remove('success-animation');
            }, 600);
        }
    }

    updateDartboardStats() {
        // Update dartboard statistics display
        const stats = this.gameStats.dartboard;
        document.getElementById('dart-attempts').textContent = stats.attempts;
        document.getElementById('dart-hits').textContent = stats.hits;
        
        const actualRate = stats.attempts > 0 ? ((stats.hits / stats.attempts) * 100).toFixed(1) : 0;
        document.getElementById('dart-actual').textContent = `${actualRate}%`;
        
        // Compare with prediction if available
        if (stats.prediction !== null && stats.attempts >= 10) {
            const difference = Math.abs(actualRate - stats.prediction);
            const accuracy = difference < 5 ? 'Very close!' : difference < 10 ? 'Close!' : 'Keep trying!';
            console.log(`Prediction accuracy: ${accuracy}`);
        }
    }

    playRingToss() {
        // Ring toss game with different difficulty levels
        const btn = document.getElementById('toss-ring');
        btn.classList.add('loading');
        
        setTimeout(() => {
            const stats = this.gameStats.ringtoss;
            const target = stats.target;
            stats.attempts++;
            
            // Success probabilities based on difficulty
            const successRates = { easy: 0.6, medium: 0.3, hard: 0.1 };
            const success = Math.random() < successRates[target];
            
            if (success) {
                stats.hits++;
                // Animate successful ring toss
                const targetPeg = document.querySelector(`[data-difficulty="${target}"]`);
                targetPeg.classList.add('success-animation');
                setTimeout(() => {
                    targetPeg.classList.remove('success-animation');
                }, 600);
            }
            
            this.updateRingTossStats();
            btn.classList.remove('loading');
        }, 1000);
    }

    updateRingTossStats() {
        // Update ring toss statistics
        const stats = this.gameStats.ringtoss;
        document.getElementById('ring-attempts').textContent = stats.attempts;
        document.getElementById('ring-hits').textContent = stats.hits;
        
        const successRate = stats.attempts > 0 ? ((stats.hits / stats.attempts) * 100).toFixed(1) : 0;
        document.getElementById('ring-actual').textContent = `${successRate}%`;
    }

    playLuckyDraw() {
        // Lucky draw with replacement option affecting probabilities
        const stats = this.gameStats.luckydraw;
        const withReplacement = document.getElementById('replacement').checked;
        
        if (stats.balls.length === 0) {
            alert('No balls left to draw! Reset the game.');
            return;
        }
        
        stats.attempts++;
        
        // Random ball selection
        const randomIndex = Math.floor(Math.random() * stats.balls.length);
        const drawnBall = stats.balls[randomIndex];
        
        // Track red ball draws for probability calculation
        if (drawnBall === 'red') {
            stats.hits++;
        }
        
        // Visual feedback - add drawn ball to display
        this.displayDrawnBall(drawnBall);
        
        // Handle replacement logic
        if (!withReplacement) {
            stats.balls.splice(randomIndex, 1);
            this.updateBallDisplay();
        }
        
        this.updateLuckyDrawStats();
    }

    displayDrawnBall(color) {
        // Display the drawn ball in the results area
        const drawnBallsContainer = document.getElementById('drawn-balls');
        const ballElement = document.createElement('div');
        ballElement.className = `ball ${color}`;
        ballElement.style.width = '30px';
        ballElement.style.height = '30px';
        ballElement.textContent = color.charAt(0).toUpperCase();
        
        drawnBallsContainer.appendChild(ballElement);
    }

    updateBallDisplay() {
        // Update visual representation of remaining balls
        const ballContainer = document.querySelector('.ball-container');
        const balls = ballContainer.querySelectorAll('.ball');
        
        // Reset all balls
        balls.forEach(ball => {
            ball.classList.remove('drawn');
        });
        
        // Mark drawn balls based on remaining balls array
        const remainingBalls = this.gameStats.luckydraw.balls;
        const originalBalls = ['red', 'blue', 'green', 'yellow', 'red'];
        
        let ballIndex = 0;
        originalBalls.forEach((color, index) => {
            if (!remainingBalls.includes(color) || ballIndex >= remainingBalls.length) {
                balls[index].classList.add('drawn');
            } else if (remainingBalls[ballIndex] === color) {
                ballIndex++;
            }
        });
    }

    resetLuckyDrawBalls() {
        // Reset lucky draw game to initial state
        const stats = this.gameStats.luckydraw;
        stats.balls = ['red', 'blue', 'green', 'yellow', 'red'];
        stats.attempts = 0;
        stats.hits = 0;
        stats.drawnBalls = [];
        
        // Clear drawn balls display
        document.getElementById('drawn-balls').innerHTML = '';
        
        // Reset ball visual states
        document.querySelectorAll('.ball-container .ball').forEach(ball => {
            ball.classList.remove('drawn');
        });
        
        this.updateLuckyDrawStats();
    }

    updateLuckyDrawStats() {
        // Update lucky draw statistics and probability calculations
        const stats = this.gameStats.luckydraw;
        document.getElementById('draw-attempts').textContent = stats.attempts;
        document.getElementById('draw-hits').textContent = stats.hits;
        
        const actualRate = stats.attempts > 0 ? ((stats.hits / stats.attempts) * 100).toFixed(1) : 0;
        document.getElementById('draw-actual').textContent = `${actualRate}%`;
        
        // Educational insight: Show theoretical probability
        const withReplacement = document.getElementById('replacement').checked;
        const totalBalls = withReplacement ? 5 : stats.balls.length;
        const redBalls = withReplacement ? 2 : stats.balls.filter(ball => ball === 'red').length;
        const theoreticalProb = totalBalls > 0 ? ((redBalls / totalBalls) * 100).toFixed(1) : 0;
        
        console.log(`Theoretical probability of red: ${theoreticalProb}%`);
    }

    playCoinToss() {
        // Single coin toss with animation
        const coin = document.getElementById('coin');
        const btn = document.getElementById('flip-coin');
        
        btn.disabled = true;
        coin.classList.add('flipping');
        
        setTimeout(() => {
            const stats = this.gameStats.cointoss;
            stats.attempts++;
            
            const isHeads = Math.random() < 0.5;
            if (isHeads) {
                stats.heads++;
                coin.style.transform = 'rotateY(0deg)';
            } else {
                stats.tails++;
                coin.style.transform = 'rotateY(180deg)';
            }
            
            this.updateCoinTossStats();
            
            coin.classList.remove('flipping');
            btn.disabled = false;
        }, 1000);
    }

    playMultipleCoinToss() {
        // Multiple coin tosses for statistical analysis
        const flipCount = parseInt(document.getElementById('flip-count').value);
        const btn = document.getElementById('multi-flip');
        
        btn.classList.add('loading');
        btn.disabled = true;
        
        let flipsCompleted = 0;
        const flipInterval = setInterval(() => {
            const stats = this.gameStats.cointoss;
            stats.attempts++;
            
            const isHeads = Math.random() < 0.5;
            if (isHeads) {
                stats.heads++;
            } else {
                stats.tails++;
            }
            
            flipsCompleted++;
            
            if (flipsCompleted >= flipCount) {
                clearInterval(flipInterval);
                btn.classList.remove('loading');
                btn.disabled = false;
            }
            
            this.updateCoinTossStats();
        }, 100);
    }

    updateCoinTossStats() {
        // Update coin toss statistics with probability analysis
        const stats = this.gameStats.cointoss;
        document.getElementById('coin-attempts').textContent = stats.attempts;
        document.getElementById('coin-heads').textContent = stats.heads;
        document.getElementById('coin-tails').textContent = stats.tails;
        
        const headsRate = stats.attempts > 0 ? ((stats.heads / stats.attempts) * 100).toFixed(1) : 0;
        document.getElementById('coin-rate').textContent = `${headsRate}%`;
        
        // Educational insight: Compare with theoretical 50%
        if (stats.attempts >= 20) {
            const deviation = Math.abs(headsRate - 50);
            if (deviation < 5) {
                console.log('Results are very close to theoretical probability!');
            } else if (deviation < 10) {
                console.log('Results are reasonably close to theoretical probability.');
            } else {
                console.log('Results show significant deviation - this is normal with small samples!');
            }
        }
    }

    resetAllGames() {
        // Reset all game statistics and states
        if (confirm('Reset all games and statistics?')) {
            this.gameStats = {
                dartboard: { attempts: 0, hits: 0, prediction: null },
                ringtoss: { attempts: 0, hits: 0, target: 'easy' },
                luckydraw: { attempts: 0, hits: 0, prediction: null, balls: ['red', 'blue', 'green', 'yellow', 'red'], drawnBalls: [] },
                cointoss: { attempts: 0, heads: 0, tails: 0 }
            };
            
            // Reset all displays
            this.updateDartboardStats();
            this.updateRingTossStats();
            this.resetLuckyDrawBalls();
            this.updateCoinTossStats();
            
            // Clear input fields
            document.getElementById('dart-prediction').value = '';
            document.getElementById('draw-prediction').value = '';
            document.getElementById('flip-count').value = '10';
            
            // Reset coin display
            document.getElementById('coin').style.transform = 'rotateY(0deg)';
            
            alert('All games have been reset!');
        }
    }
}

// Initialize the carnival simulator when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CarnivalSimulator();
    
    // Add educational tips that appear periodically
    setInterval(() => {
        const tips = [
            'Tip: Larger sample sizes give more accurate probability estimates!',
            'Tip: Compare your predictions with actual results to improve understanding!',
            'Tip: Theoretical probability vs. experimental probability can differ!',
            'Tip: Try different games to see how probability works in various contexts!'
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        console.log(randomTip);
    }, 30000); // Show tip every 30 seconds
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function(e) {
    // Enable touch interactions for all clickable elements
    if (e.target.classList.contains('game-btn') || 
        e.target.classList.contains('throw-btn') || 
        e.target.classList.contains('toss-btn') || 
        e.target.classList.contains('draw-btn') || 
        e.target.classList.contains('flip-btn') || 
        e.target.classList.contains('reset-btn')) {
        e.target.style.transform = 'scale(0.95)';
    }
});

document.addEventListener('touchend', function(e) {
    // Reset touch feedback
    if (e.target.classList.contains('game-btn') || 
        e.target.classList.contains('throw-btn') || 
        e.target.classList.contains('toss-btn') || 
        e.target.classList.contains('draw-btn') || 
        e.target.classList.contains('flip-btn') || 
        e.target.classList.contains('reset-btn')) {
        setTimeout(() => {
            e.target.style.transform = '';
        }, 100);
    }
});

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Add keyboard navigation support
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('game-btn') || 
            e.target.tagName === 'BUTTON') {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Performance optimization: Lazy load animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all game panels for smooth transitions
document.querySelectorAll('.game-panel').forEach(panel => {
    observer.observe(panel);
});