// MRT Translation Explorer Game Logic
class MRTTranslationGame {
    constructor() {
        // Game state management
        this.currentMode = 'chinese'; // 'chinese', 'english', 'sound'
        this.currentStation = null;
        this.score = 0;
        this.totalQuestions = 0;
        this.correctAnswers = 0;
        this.completedStations = new Set();
        this.badges = [];
        this.soundEnabled = true;
        
        // Station data with cultural facts
        this.stations = {
            'woodlands': {
                en: 'Woodlands',
                zh: '兀兰',
                fact: 'Woodlands was named after the rubber plantations that once covered the area.',
                line: 'ns'
            },
            'yishun': {
                en: 'Yishun',
                zh: '义顺',
                fact: 'Yishun means "suitable for living" in Chinese.',
                line: 'ns'
            },
            'orchard': {
                en: 'Orchard',
                zh: '乌节',
                fact: 'Named after the nutmeg and pepper plantations in the 1800s.',
                line: 'ns'
            },
            'marina-bay': {
                en: 'Marina Bay',
                zh: '滨海湾',
                fact: 'Marina Bay is built on reclaimed land from the sea.',
                line: 'ns'
            },
            'jurong-east': {
                en: 'Jurong East',
                zh: '裕廊东',
                fact: 'Jurong was named after a type of bird found in the area.',
                line: 'ew'
            },
            'clementi': {
                en: 'Clementi',
                zh: '金文泰',
                fact: 'Named after Sir Cecil Clementi, a former Governor of Hong Kong.',
                line: 'ew'
            },
            'raffles-place': {
                en: 'Raffles Place',
                zh: '莱佛士坊',
                fact: 'Named after Sir Stamford Raffles, founder of modern Singapore.',
                line: 'ew'
            },
            'changi-airport': {
                en: 'Changi Airport',
                zh: '樟宜机场',
                fact: 'Changi means "thorny tree" in Malay.',
                line: 'ew'
            },
            'dhoby-ghaut': {
                en: 'Dhoby Ghaut',
                zh: '多美歌',
                fact: 'Dhoby Ghaut means "washerman\'s place" in Hindi.',
                line: 'cc'
            },
            'bishan': {
                en: 'Bishan',
                zh: '碧山',
                fact: 'Bishan means "green mountain" in Chinese.',
                line: 'cc'
            },
            'paya-lebar': {
                en: 'Paya Lebar',
                zh: '巴耶利峇',
                fact: 'Paya Lebar means "wide swamp" in Malay.',
                line: 'cc'
            },
            'harbourfront': {
                en: 'HarbourFront',
                zh: '港湾',
                fact: 'HarbourFront offers beautiful views of Sentosa Island.',
                line: 'cc'
            },
            'bukit-panjang': {
                en: 'Bukit Panjang',
                zh: '武吉班让',
                fact: 'Bukit Panjang means "long hill" in Malay.',
                line: 'dt'
            },
            'little-india': {
                en: 'Little India',
                zh: '小印度',
                fact: 'Little India is the heart of Singapore\'s Indian community.',
                line: 'dt'
            },
            'chinatown': {
                en: 'Chinatown',
                zh: '牛车水',
                fact: 'Chinatown\'s Chinese name means "bullock cart water".',
                line: 'dt'
            },
            'bayfront': {
                en: 'Bayfront',
                zh: '海湾舫',
                fact: 'Bayfront is home to the iconic Marina Bay Sands.',
                line: 'dt'
            }
        };
        
        // Initialize the game
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateUI();
        this.createAudioContext();
        this.showTooltip();
    }
    
    // Event binding for all interactive elements
    bindEvents() {
        // Mode selection buttons
        document.getElementById('chineseMode').addEventListener('click', () => this.setMode('chinese'));
        document.getElementById('englishMode').addEventListener('click', () => this.setMode('english'));
        document.getElementById('soundMode').addEventListener('click', () => this.setMode('sound'));
        
        // Station nodes on the map
        document.querySelectorAll('.station-node').forEach(node => {
            node.addEventListener('click', (e) => this.selectStation(e.currentTarget));
            node.addEventListener('mouseenter', (e) => this.showStationTooltip(e));
            node.addEventListener('mouseleave', () => this.hideTooltip());
        });
        
        // Challenge panel buttons
        document.getElementById('submitBtn').addEventListener('click', () => this.checkAnswer());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextChallenge());
        document.getElementById('backToMapBtn').addEventListener('click', () => this.backToMap());
        document.getElementById('soundButton').addEventListener('click', () => this.playStationSound());
        
        // Settings
        document.getElementById('settingsBtn').addEventListener('click', () => this.toggleSettings());
        document.getElementById('soundToggle').addEventListener('change', (e) => {
            this.soundEnabled = e.target.checked;
        });
        document.getElementById('contrastToggle').addEventListener('change', (e) => {
            document.body.classList.toggle('high-contrast', e.target.checked);
        });
        document.getElementById('fontSizeSlider').addEventListener('input', (e) => {
            document.body.style.fontSize = e.target.value + 'px';
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Answer input
        document.getElementById('answerInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAnswer();
        });
    }
    
    // Create audio context for sound effects
    createAudioContext() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.sounds = {
            correct: this.createBeepSound(800, 0.3),
            incorrect: this.createBeepSound(300, 0.5),
            tapIn: this.createBeepSound(1000, 0.2)
        };
    }
    
    // Generate beep sounds programmatically
    createBeepSound(frequency, duration) {
        return () => {
            if (!this.soundEnabled) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }
    
    // Mode switching functionality
    setMode(mode) {
        this.currentMode = mode;
        
        // Update button states
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(mode + 'Mode').classList.add('active');
        
        // Update UI based on mode
        this.updateChallengeUI();
    }
    
    // Station selection from map
    selectStation(stationNode) {
        const stationId = stationNode.dataset.station;
        
        // Check if station is locked (for progressive unlocking)
        if (stationNode.classList.contains('locked')) {
            this.showFeedback('This station is locked! Complete previous stations first.', 'incorrect');
            return;
        }
        
        this.currentStation = stationId;
        this.showChallenge();
        this.sounds.tapIn();
    }
    
    // Display challenge panel
    showChallenge() {
        document.getElementById('mapContainer').classList.add('hidden');
        document.getElementById('challengePanel').classList.remove('hidden');
        document.getElementById('challengePanel').classList.add('fade-in');
        
        this.updateChallengeUI();
    }
    
    // Update challenge UI based on current mode and station
    updateChallengeUI() {
        if (!this.currentStation) return;
        
        const station = this.stations[this.currentStation];
        const questionEl = document.getElementById('challengeQuestion');
        const inputMode = document.getElementById('inputMode');
        const mcqMode = document.getElementById('mcqMode');
        const soundBtn = document.getElementById('soundButton');
        
        // Reset UI
        inputMode.classList.add('hidden');
        mcqMode.classList.add('hidden');
        soundBtn.classList.add('hidden');
        document.getElementById('feedback').textContent = '';
        document.getElementById('nextBtn').classList.add('hidden');
        
        switch (this.currentMode) {
            case 'chinese':
                questionEl.textContent = `Translate to Chinese: ${station.en}`;
                inputMode.classList.remove('hidden');
                document.getElementById('answerInput').placeholder = '请输入中文翻译...';
                break;
                
            case 'english':
                questionEl.textContent = `Translate to English: ${station.zh}`;
                inputMode.classList.remove('hidden');
                document.getElementById('answerInput').placeholder = 'Enter English translation...';
                break;
                
            case 'sound':
                questionEl.textContent = 'Listen and select the correct translation:';
                soundBtn.classList.remove('hidden');
                mcqMode.classList.remove('hidden');
                this.generateMCQOptions();
                break;
        }
        
        // Clear previous input
        document.getElementById('answerInput').value = '';
    }
    
    // Generate multiple choice options for sound mode
    generateMCQOptions() {
        const station = this.stations[this.currentStation];
        const optionsContainer = document.getElementById('mcqOptions');
        optionsContainer.innerHTML = '';
        
        // Create options array with correct answer and distractors
        const options = [station.zh, station.en];
        
        // Add some distractors from other stations
        const otherStations = Object.values(this.stations).filter(s => s !== station);
        const distractors = otherStations.slice(0, 2).map(s => Math.random() > 0.5 ? s.zh : s.en);
        options.push(...distractors);
        
        // Shuffle options
        options.sort(() => Math.random() - 0.5);
        
        // Create option buttons
        options.forEach((option, index) => {
            const optionBtn = document.createElement('div');
            optionBtn.className = 'mcq-option';
            optionBtn.textContent = option;
            optionBtn.addEventListener('click', () => this.selectMCQOption(optionBtn, option));
            optionsContainer.appendChild(optionBtn);
        });
    }
    
    // Handle MCQ option selection
    selectMCQOption(optionBtn, selectedAnswer) {
        // Remove previous selections
        document.querySelectorAll('.mcq-option').forEach(opt => opt.classList.remove('selected'));
        
        // Mark current selection
        optionBtn.classList.add('selected');
        this.selectedMCQAnswer = selectedAnswer;
        
        // Auto-submit after selection
        setTimeout(() => this.checkAnswer(), 500);
    }
    
    // Play station name pronunciation
    playStationSound() {
        if (!this.soundEnabled || !this.currentStation) return;
        
        const station = this.stations[this.currentStation];
        
        // Use Web Speech API for pronunciation
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(station.en + ', ' + station.zh);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    }
    
    // Check user's answer
    checkAnswer() {
        if (!this.currentStation) return;
        
        const station = this.stations[this.currentStation];
        let userAnswer = '';
        let correctAnswer = '';
        
        // Get user input based on mode
        switch (this.currentMode) {
            case 'chinese':
                userAnswer = document.getElementById('answerInput').value.trim();
                correctAnswer = station.zh;
                break;
                
            case 'english':
                userAnswer = document.getElementById('answerInput').value.trim();
                correctAnswer = station.en;
                break;
                
            case 'sound':
                userAnswer = this.selectedMCQAnswer || '';
                correctAnswer = station.zh; // or station.en, depending on what was played
                break;
        }
        
        // Check if answer is correct
        const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        
        this.totalQuestions++;
        
        if (isCorrect) {
            this.correctAnswers++;
            this.score += 10;
            this.completedStations.add(this.currentStation);
            
            this.showFeedback(`Correct! 🎉 ${station.fact}`, 'correct');
            this.sounds.correct();
            
            // Mark station as completed
            document.querySelector(`[data-station="${this.currentStation}"]`).classList.add('completed');
            
            // Check for badges
            this.checkBadges();
            
        } else {
            this.showFeedback(`Try again! The correct answer is: ${correctAnswer}`, 'incorrect');
            this.sounds.incorrect();
        }
        
        // Show next button
        document.getElementById('nextBtn').classList.remove('hidden');
        
        // Update progress
        this.updateUI();
    }
    
    // Display feedback to user
    showFeedback(message, type) {
        const feedbackEl = document.getElementById('feedback');
        feedbackEl.textContent = message;
        feedbackEl.className = `feedback ${type}`;
    }
    
    // Check and award badges based on progress
    checkBadges() {
        const completedCount = this.completedStations.size;
        const accuracy = this.totalQuestions > 0 ? (this.correctAnswers / this.totalQuestions) * 100 : 0;
        
        // Award badges
        if (completedCount >= 4 && !this.badges.includes('City Line Novice')) {
            this.badges.push('City Line Novice');
            this.showBadgeNotification('City Line Novice 🚇');
        }
        
        if (completedCount >= 8 && !this.badges.includes('Bilingual Commuter')) {
            this.badges.push('Bilingual Commuter');
            this.showBadgeNotification('Bilingual Commuter 🗣️');
        }
        
        if (accuracy >= 90 && completedCount >= 12 && !this.badges.includes('Translation Master')) {
            this.badges.push('Translation Master');
            this.showBadgeNotification('Translation Master 🏆');
        }
    }
    
    // Show badge notification
    showBadgeNotification(badgeName) {
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        notification.textContent = `New Badge: ${badgeName}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(145deg, #FFD700, #FFA500);
            color: #333;
            padding: 10px 20px;
            border-radius: 20px;
            font-weight: bold;
            z-index: 1002;
            animation: slideDown 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Move to next challenge
    nextChallenge() {
        // Randomly select next station
        const availableStations = Object.keys(this.stations).filter(id => 
            !this.completedStations.has(id) || Math.random() > 0.7
        );
        
        if (availableStations.length > 0) {
            this.currentStation = availableStations[Math.floor(Math.random() * availableStations.length)];
            this.updateChallengeUI();
        } else {
            this.backToMap();
        }
    }
    
    // Return to map view
    backToMap() {
        document.getElementById('challengePanel').classList.add('hidden');
        document.getElementById('mapContainer').classList.remove('hidden');
        this.currentStation = null;
    }
    
    // Update UI elements (score, progress, badges)
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('stationsCompleted').textContent = 
            `${this.completedStations.size}/${Object.keys(this.stations).length}`;
        
        const accuracy = this.totalQuestions > 0 ? 
            Math.round((this.correctAnswers / this.totalQuestions) * 100) : 0;
        document.getElementById('accuracy').textContent = `${accuracy}%`;
        
        // Update badges display
        const badgeContainer = document.getElementById('badgeContainer');
        badgeContainer.innerHTML = '';
        this.badges.forEach(badge => {
            const badgeEl = document.createElement('span');
            badgeEl.className = 'badge';
            badgeEl.textContent = badge;
            badgeContainer.appendChild(badgeEl);
        });
    }
    
    // Toggle settings menu
    toggleSettings() {
        const settingsMenu = document.getElementById('settingsMenu');
        settingsMenu.classList.toggle('hidden');
    }
    
    // Show tooltip on hover
    showStationTooltip(event) {
        const stationNode = event.currentTarget;
        const stationId = stationNode.dataset.station;
        const station = this.stations[stationId];
        
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = `${station.en} / ${station.zh}`;
        tooltip.classList.remove('hidden');
        
        // Position tooltip
        const rect = stationNode.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2) + 'px';
        tooltip.style.top = (rect.top - 40) + 'px';
        tooltip.style.transform = 'translateX(-50%)';
    }
    
    // Hide tooltip
    hideTooltip() {
        document.getElementById('tooltip').classList.add('hidden');
    }
    
    // Show initial tooltip with game instructions
    showTooltip() {
        setTimeout(() => {
            const tooltip = document.getElementById('tooltip');
            tooltip.textContent = 'Click on any station to start your translation adventure! 点击任何站点开始翻译冒险！';
            tooltip.style.left = '50%';
            tooltip.style.top = '50%';
            tooltip.style.transform = 'translate(-50%, -50%)';
            tooltip.classList.remove('hidden');
            
            setTimeout(() => {
                tooltip.classList.add('hidden');
            }, 4000);
        }, 1000);
    }
    
    // Handle keyboard shortcuts
    handleKeyboard(event) {
        switch (event.key) {
            case 'Enter':
                if (!document.getElementById('challengePanel').classList.contains('hidden')) {
                    if (!document.getElementById('nextBtn').classList.contains('hidden')) {
                        this.nextChallenge();
                    } else {
                        this.checkAnswer();
                    }
                }
                break;
                
            case 'Escape':
                if (!document.getElementById('challengePanel').classList.contains('hidden')) {
                    this.backToMap();
                }
                break;
                
            case 'ArrowUp':
            case 'ArrowDown':
                // Navigate MCQ options
                if (this.currentMode === 'sound') {
                    event.preventDefault();
                    const options = document.querySelectorAll('.mcq-option');
                    const selected = document.querySelector('.mcq-option.selected');
                    let newIndex = 0;
                    
                    if (selected) {
                        const currentIndex = Array.from(options).indexOf(selected);
                        newIndex = event.key === 'ArrowUp' ? 
                            (currentIndex - 1 + options.length) % options.length :
                            (currentIndex + 1) % options.length;
                    }
                    
                    options.forEach(opt => opt.classList.remove('selected'));
                    options[newIndex].classList.add('selected');
                    this.selectedMCQAnswer = options[newIndex].textContent;
                }
                break;
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animation for badge notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                transform: translateX(-50%) translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Start the game
    window.mrtGame = new MRTTranslationGame();
});

// Handle window resize for responsive layout
window.addEventListener('resize', () => {
    // Adjust layout if needed
    const gameContainer = document.getElementById('gameContainer');
    if (window.innerHeight < 500) {
        gameContainer.style.height = '450px';
    } else {
        gameContainer.style.height = '90vh';
    }
});