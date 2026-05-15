// Peribahasa data with meanings and cultural context
const peribahasaData = [
    {
        id: 1,
        peribahasa: "Seperti katak di bawah tempurung",
        meaning: "Orang yang berpandangan sempit dan tidak tahu tentang dunia luar",
        situation: "Digunakan untuk menggambarkan seseorang yang tidak mahu menerima pandangan atau pengetahuan baru",
        culturalFact: "Peribahasa ini menggunakan analogi katak yang hidup di bawah tempurung kelapa, hanya melihat ruang yang terhad dan tidak mengetahui dunia yang luas di luar.",
        level: 1
    },
    {
        id: 2,
        peribahasa: "Air dicincang tidak akan putus",
        meaning: "Hubungan kekeluargaan tidak akan terputus walaupun ada perselisihan",
        situation: "Digunakan ketika adik-beradik atau keluarga bergaduh tetapi akhirnya berbaik semula",
        culturalFact: "Peribahasa ini menekankan pentingnya ikatan darah dalam budaya Melayu yang sangat menghargai institusi keluarga.",
        level: 1
    },
    {
        id: 3,
        peribahasa: "Bagai aur dengan tebing",
        meaning: "Hubungan yang sangat rapat dan saling memerlukan",
        situation: "Menggambarkan persahabatan atau kerjasama yang erat antara dua pihak",
        culturalFact: "Aur (sejenis buluh) tumbuh di tebing sungai dan akarnya membantu mengukuhkan tanah tebing, manakala tebing melindungi aur.",
        level: 2
    },
    {
        id: 4,
        peribahasa: "Hangat-hangat tahi ayam",
        meaning: "Semangat yang tidak kekal lama, cepat surut",
        situation: "Digunakan untuk mengkritik orang yang bersemangat pada awalnya tetapi cepat berhenti",
        culturalFact: "Tahi ayam panas ketika baru keluar tetapi cepat sejuk. Ini menggambarkan sifat manusia yang kadang-kadang tidak konsisten.",
        level: 2
    },
    {
        id: 5,
        peribahasa: "Lempar batu sembunyi tangan",
        meaning: "Berbuat jahat tetapi tidak mahu mengaku atau bertanggungjawab",
        situation: "Digunakan untuk mengkritik orang yang suka menghasut atau menyebabkan masalah tetapi berpura-pura tidak tahu",
        culturalFact: "Peribahasa ini mengajar tentang pentingnya kejujuran dan keberanian mengakui kesalahan dalam budaya Melayu.",
        level: 3
    },
    {
        id: 6,
        peribahasa: "Rezeki anak soleh",
        meaning: "Nasib baik yang datang secara tidak dijangka",
        situation: "Digunakan ketika seseorang mendapat keberuntungan atau kejayaan tanpa usaha yang keras",
        culturalFact: "Dalam kepercayaan Melayu, anak yang soleh akan mendapat berkat dan rezeki yang mudah kerana doa ibu bapa.",
        level: 3
    }
];

// Game state management
class PeribahasaGame {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.correctMatches = 0;
        this.totalAttempts = 0;
        this.selectedPeribahasaCard = null;
        this.selectedMeaningCard = null;
        this.currentQuestions = [];
        this.hintsUsed = 0;
        
        this.initializeGame();
    }

    // Initialize the game and set up event listeners
    initializeGame() {
        this.setupEventListeners();
        this.showTooltipOnHover();
    }

    // Set up all event listeners for the game
    setupEventListeners() {
        // Screen navigation
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
        document.getElementById('share-btn').addEventListener('click', () => this.shareScore());
        
        // Modal close
        document.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        
        // Click outside modal to close
        document.getElementById('cultural-modal').addEventListener('click', (e) => {
            if (e.target.id === 'cultural-modal') {
                this.closeModal();
            }
        });
    }

    // Show tooltip on hover for various elements
    showTooltipOnHover() {
        const tooltip = document.getElementById('tooltip');
        const tooltipText = document.getElementById('tooltip-text');

        // Add tooltip to elements with title attribute
        document.addEventListener('mouseover', (e) => {
            if (e.target.title) {
                tooltipText.textContent = e.target.title;
                tooltip.classList.remove('hidden');
                this.updateTooltipPosition(e, tooltip);
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!tooltip.classList.contains('hidden')) {
                this.updateTooltipPosition(e, tooltip);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.title) {
                tooltip.classList.add('hidden');
            }
        });
    }

    // Update tooltip position based on mouse position
    updateTooltipPosition(e, tooltip) {
        const x = e.clientX + 10;
        const y = e.clientY - 10;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }

    // Start the game
    startGame() {
        this.switchScreen('welcome-screen', 'game-screen');
        this.loadLevel();
    }

    // Load current level questions
    loadLevel() {
        // Filter questions based on current level
        const levelQuestions = peribahasaData.filter(item => item.level <= this.currentLevel);
        
        // Shuffle and select questions for current round
        this.currentQuestions = this.shuffleArray([...levelQuestions]).slice(0, 3);
        
        this.renderCards();
        this.updateProgress();
        this.updateScore();
    }

    // Render peribahasa and meaning cards
    renderCards() {
        const peribahasaContainer = document.getElementById('peribahasa-container');
        const meaningsContainer = document.getElementById('meanings-container');
        
        // Clear existing cards
        peribahasaContainer.innerHTML = '';
        meaningsContainer.innerHTML = '';
        
        // Create shuffled arrays for display
        const shuffledPeribahasa = this.shuffleArray([...this.currentQuestions]);
        const shuffledMeanings = this.shuffleArray([...this.currentQuestions]);
        
        // Render peribahasa cards
        shuffledPeribahasa.forEach(item => {
            const card = this.createCard(item.peribahasa, 'peribahasa', item.id);
            peribahasaContainer.appendChild(card);
        });
        
        // Render meaning cards
        shuffledMeanings.forEach(item => {
            const meaningText = `${item.meaning}\n\nContoh: ${item.situation}`;
            const card = this.createCard(meaningText, 'meaning', item.id);
            meaningsContainer.appendChild(card);
        });
    }

    // Create individual card element
    createCard(text, type, id) {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = text;
        card.dataset.type = type;
        card.dataset.id = id;
        
        // Add click event listener
        card.addEventListener('click', () => this.selectCard(card));
        
        // Add touch support for mobile
        card.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.selectCard(card);
        });
        
        return card;
    }

    // Handle card selection
    selectCard(card) {
        const type = card.dataset.type;
        const id = parseInt(card.dataset.id);
        
        if (card.classList.contains('matched')) return;
        
        if (type === 'peribahasa') {
            // Deselect previous peribahasa card
            if (this.selectedPeribahasaCard) {
                this.selectedPeribahasaCard.classList.remove('selected');
            }
            
            this.selectedPeribahasaCard = card;
            card.classList.add('selected');
        } else {
            // Deselect previous meaning card
            if (this.selectedMeaningCard) {
                this.selectedMeaningCard.classList.remove('selected');
            }
            
            this.selectedMeaningCard = card;
            card.classList.add('selected');
        }
        
        // Check for match if both cards are selected
        if (this.selectedPeribahasaCard && this.selectedMeaningCard) {
            this.checkMatch();
        }
    }

    // Check if selected cards match
    checkMatch() {
        const peribahasaId = parseInt(this.selectedPeribahasaCard.dataset.id);
        const meaningId = parseInt(this.selectedMeaningCard.dataset.id);
        
        this.totalAttempts++;
        
        if (peribahasaId === meaningId) {
            // Correct match
            this.handleCorrectMatch();
        } else {
            // Incorrect match
            this.handleIncorrectMatch();
        }
    }

    // Handle correct match
    handleCorrectMatch() {
        this.selectedPeribahasaCard.classList.add('matched');
        this.selectedMeaningCard.classList.add('matched');
        
        this.correctMatches++;
        this.score += 10;
        
        // Show positive feedback
        this.showFeedback('Betul! Padanan yang tepat! 🎉', 'success');
        
        // Show cultural fact
        const matchedItem = peribahasaData.find(item => item.id === parseInt(this.selectedPeribahasaCard.dataset.id));
        setTimeout(() => {
            this.showCulturalFact(matchedItem.culturalFact);
        }, 1500);
        
        this.clearSelection();
        this.updateProgress();
        this.updateScore();
        
        // Check if level is complete
        if (this.correctMatches >= this.currentQuestions.length) {
            setTimeout(() => {
                this.completeLevel();
            }, 2000);
        }
    }

    // Handle incorrect match
    handleIncorrectMatch() {
        this.selectedPeribahasaCard.classList.add('incorrect');
        this.selectedMeaningCard.classList.add('incorrect');
        
        // Show negative feedback
        this.showFeedback('Cuba lagi! Padanan tidak tepat. 🤔', 'error');
        
        // Remove incorrect styling after animation
        setTimeout(() => {
            this.selectedPeribahasaCard.classList.remove('incorrect');
            this.selectedMeaningCard.classList.remove('incorrect');
            this.clearSelection();
        }, 1000);
    }

    // Clear current selection
    clearSelection() {
        if (this.selectedPeribahasaCard) {
            this.selectedPeribahasaCard.classList.remove('selected');
        }
        if (this.selectedMeaningCard) {
            this.selectedMeaningCard.classList.remove('selected');
        }
        
        this.selectedPeribahasaCard = null;
        this.selectedMeaningCard = null;
    }

    // Show feedback message
    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        const feedbackText = document.getElementById('feedback-text');
        
        feedbackText.textContent = message;
        feedback.classList.remove('hidden');
        
        // Auto-hide feedback after 3 seconds
        setTimeout(() => {
            feedback.classList.add('hidden');
        }, 3000);
    }

    // Show cultural fact modal
    showCulturalFact(fact) {
        const modal = document.getElementById('cultural-modal');
        const factText = document.getElementById('cultural-fact');
        
        factText.textContent = fact;
        modal.classList.remove('hidden');
    }

    // Close modal
    closeModal() {
        document.getElementById('cultural-modal').classList.add('hidden');
    }

    // Complete current level
    completeLevel() {
        if (this.currentLevel < 3) {
            this.currentLevel++;
            this.correctMatches = 0;
            this.showFeedback(`Tahniah! Naik ke Tahap ${this.currentLevel}! 🚀`, 'success');
            
            setTimeout(() => {
                this.loadLevel();
            }, 2000);
        } else {
            // Game complete
            this.showResults();
        }
    }

    // Show hint
    showHint() {
        if (this.hintsUsed >= 3) {
            this.showFeedback('Tiada lagi petunjuk tersedia!', 'error');
            return;
        }
        
        // Find an unmatched peribahasa
        const unmatchedCards = document.querySelectorAll('.card:not(.matched)');
        const peribahasaCards = Array.from(unmatchedCards).filter(card => card.dataset.type === 'peribahasa');
        
        if (peribahasaCards.length > 0) {
            const randomCard = peribahasaCards[Math.floor(Math.random() * peribahasaCards.length)];
            const matchingId = randomCard.dataset.id;
            const matchingMeaning = document.querySelector(`.card[data-type="meaning"][data-id="${matchingId}"]`);
            
            // Highlight the matching pair briefly
            randomCard.style.border = '3px solid #ffd700';
            matchingMeaning.style.border = '3px solid #ffd700';
            
            setTimeout(() => {
                randomCard.style.border = '';
                matchingMeaning.style.border = '';
            }, 2000);
            
            this.hintsUsed++;
            this.score = Math.max(0, this.score - 2); // Deduct points for hint
            this.updateScore();
            
            this.showFeedback('Petunjuk: Perhatikan kad yang diterangi! 💡', 'info');
        }
    }

    // Update progress bar
    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        const totalQuestions = this.currentQuestions.length;
        const progress = (this.correctMatches / totalQuestions) * 100;
        
        progressFill.style.width = progress + '%';
        progressText.textContent = `${this.correctMatches}/${totalQuestions}`;
    }

    // Update score display
    updateScore() {
        document.getElementById('score').textContent = `Skor: ${this.score}`;
        document.getElementById('level').textContent = `Tahap: ${this.currentLevel}`;
    }

    // Show results screen
    showResults() {
        const accuracy = this.totalAttempts > 0 ? Math.round((this.correctMatches * 3 / this.totalAttempts) * 100) : 0;
        
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('accuracy').textContent = accuracy + '%';
        
        // Set results title based on performance
        const resultsTitle = document.getElementById('results-title');
        if (accuracy >= 80) {
            resultsTitle.textContent = 'Cemerlang! 🌟';
        } else if (accuracy >= 60) {
            resultsTitle.textContent = 'Bagus! 👍';
        } else {
            resultsTitle.textContent = 'Cuba Lagi! 💪';
        }
        
        this.switchScreen('game-screen', 'results-screen');
    }

    // Share score (placeholder function)
    shareScore() {
        const accuracy = this.totalAttempts > 0 ? Math.round((this.correctMatches * 3 / this.totalAttempts) * 100) : 0;
        const shareText = `Saya baru sahaja menyelesaikan Peribahasa Interaktif dengan skor ${this.score} dan ketepatan ${accuracy}%! 🎉`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Peribahasa Interaktif',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.showFeedback('Skor telah disalin ke clipboard! 📋', 'success');
            });
        }
    }

    // Restart the game
    restartGame() {
        this.currentLevel = 1;
        this.score = 0;
        this.correctMatches = 0;
        this.totalAttempts = 0;
        this.hintsUsed = 0;
        this.clearSelection();
        
        this.switchScreen('results-screen', 'welcome-screen');
    }

    // Move to next question (if applicable)
    nextQuestion() {
        document.getElementById('feedback').classList.add('hidden');
    }

    // Switch between screens
    switchScreen(fromScreen, toScreen) {
        document.getElementById(fromScreen).classList.remove('active');
        document.getElementById(toScreen).classList.add('active');
    }

    // Utility function to shuffle array
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PeribahasaGame();
});

// Handle iframe detection and adjust layout
function detectIframe() {
    if (window.self !== window.top) {
        // Running in iframe
        document.body.classList.add('iframe-mode');
        document.getElementById('main-container').style.height = '450px';
    } else {
        // Running in full browser
        document.getElementById('main-container').style.height = '90vh';
    }
}

// Call iframe detection on load
window.addEventListener('load', detectIframe);

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    detectIframe();
});

// Prevent context menu on touch devices for better UX
document.addEventListener('contextmenu', (e) => {
    if (e.target.classList.contains('card')) {
        e.preventDefault();
    }
});

// Add keyboard support for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close modal if open
        const modal = document.getElementById('cultural-modal');
        if (!modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
        
        // Hide feedback if showing
        const feedback = document.getElementById('feedback');
        if (!feedback.classList.contains('hidden')) {
            feedback.classList.add('hidden');
        }
    }
});