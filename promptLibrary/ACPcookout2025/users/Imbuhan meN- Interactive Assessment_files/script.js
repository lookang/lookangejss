// Malay meN- prefix assessment interactive
// Implements drag-and-drop sorting and sentence completion exercises
// Modified: Updated me- category rules for correct transformations: k→ng, p→m, s→ny
// Modified: Updated word data and sentence data to reflect correct transformations
// Modified: Removed all tooltip functionality and black hovering notifications
// Modified: Added functionality to create new bank of word cards when 'Set Semula' is clicked

class MenPrefixAssessment {
    constructor() {
        // Initialize assessment data and state
        this.currentMode = 'sorting';
        this.score = 0;
        this.totalQuestions = 0;
        this.correctAnswers = 0;
        this.currentHintLevel = 0;
        this.lastAction = null;
        this.errors = [];
        
        // Word data with base words and their correct meN- forms
        // Modified: Updated word categorization with correct transformations for k, p, s
        this.wordData = [
            // me- category (l, m, n, ng, ny, r, w, y, k→ng, t→n, p→m, s→ny)
            { base: 'lukis', correct: 'me', form: 'melukis', category: 'me' },
            { base: 'main', correct: 'me', form: 'memain', category: 'me' },
            { base: 'naik', correct: 'me', form: 'menaik', category: 'me' },
            { base: 'rasa', correct: 'me', form: 'merasa', category: 'me' },
            { base: 'warna', correct: 'me', form: 'mewarna', category: 'me' },
            { base: 'yakin', correct: 'me', form: 'meyakin', category: 'me' },
            { base: 'lihat', correct: 'me', form: 'melihat', category: 'me' },
            { base: 'nyala', correct: 'me', form: 'menyala', category: 'me' },
            // Modified: Corrected transformations for k, p, s, t words
            { base: 'kutip', correct: 'me', form: 'mengutip', category: 'me' }, // k→ng (CORRECTED)
            { base: 'kira', correct: 'me', form: 'mengira', category: 'me' }, // k→ng (CORRECTED)
            { base: 'tarik', correct: 'me', form: 'menarik', category: 'me' }, // t→n
            { base: 'tulis', correct: 'me', form: 'menulis', category: 'me' }, // t→n
            { base: 'potong', correct: 'me', form: 'memotong', category: 'me' }, // p→m (CORRECTED)
            { base: 'padam', correct: 'me', form: 'memadam', category: 'me' }, // p→m (CORRECTED)
            { base: 'sapu', correct: 'me', form: 'menyapu', category: 'me' }, // s→ny
            { base: 'siram', correct: 'me', form: 'menyiram', category: 'me' }, // s→ny (CORRECTED)
            { base: 'tonton', correct: 'me', form: 'menonton', category: 'me' }, // t→n
            { base: 'tahan', correct: 'me', form: 'menahan', category: 'me' }, // t→n
            
            // mem- category (b, f, v only)
            { base: 'baca', correct: 'mem', form: 'membaca', category: 'mem' },
            { base: 'fitnah', correct: 'mem', form: 'memfitnah', category: 'mem' },
            { base: 'veto', correct: 'mem', form: 'memveto', category: 'mem' },
            { base: 'beli', correct: 'mem', form: 'membeli', category: 'mem' },
            { base: 'bantu', correct: 'mem', form: 'membantu', category: 'mem' },
            
            // men- category (c, d, j, z only)
            { base: 'cari', correct: 'men', form: 'mencari', category: 'men' },
            { base: 'dapat', correct: 'men', form: 'mendapat', category: 'men' },
            { base: 'jual', correct: 'men', form: 'menjual', category: 'men' },
            { base: 'dengar', correct: 'men', form: 'mendengar', category: 'men' },
            { base: 'cuci', correct: 'men', form: 'mencuci', category: 'men' },
            
            // meng- category (g, h, vokal only)
            { base: 'guna', correct: 'meng', form: 'menggunakan', category: 'meng' },
            { base: 'hitung', correct: 'meng', form: 'menghitung', category: 'meng' },
            { base: 'emas', correct: 'meng', form: 'mengemas', category: 'meng' },
            { base: 'ajar', correct: 'meng', form: 'mengajar', category: 'meng' },
            { base: 'hantar', correct: 'meng', form: 'menghantar', category: 'meng' },
            { base: 'ganti', correct: 'meng', form: 'mengganti', category: 'meng' },
            
            // menge- category (monosyllabic words)
            { base: 'cat', correct: 'menge', form: 'mengecat', category: 'menge' },
            { base: 'bom', correct: 'menge', form: 'mengebom', category: 'menge' },
            { base: 'las', correct: 'menge', form: 'mengelas', category: 'menge' },
            { base: 'cop', correct: 'menge', form: 'mengecop', category: 'menge' },
            { base: 'rem', correct: 'menge', form: 'mengerem', category: 'menge' }
        ];
        
        // Sentence completion data
        // Modified: Updated sentences to reflect corrected transformations for k, p, s words
        this.sentenceData = [
            {
                sentence: "Dia ___ biliknya setiap petang.",
                options: ['mememas', 'mengemas', 'menemas', 'menyemas'], // Correct answer shuffled to position 2
                correct: 'mengemas',
                base: 'emas',
                explanation: "Kata dasar 'emas' bermula dengan vokal, jadi gunakan 'meng-'"
            },
            {
                sentence: "Adik ___ buku cerita setiap malam.",
                options: ['menbaca', 'mengbaca', 'membaca', 'menyaca'], // Correct answer shuffled to position 3
                correct: 'membaca',
                base: 'baca',
                explanation: "Kata dasar 'baca' bermula dengan 'b', jadi gunakan 'mem-'"
            },
            {
                sentence: "Pak Ali ___ surat kepada anaknya.",
                options: ['memtulis', 'mengtulis', 'menulis', 'menyulis'], // Correct answer shuffled to position 3
                correct: 'menulis',
                base: 'tulis',
                explanation: "Kata dasar 'tulis' bermula dengan 't', jadi gunakan 'me-' dan 't' menjadi 'n'"
            },
            {
                sentence: "Ibu ___ dinding rumah dengan warna biru.",
                options: ['memcat', 'mengecat', 'mencat', 'menyat'], // Correct answer shuffled to position 2
                correct: 'mengecat',
                base: 'cat',
                explanation: "Kata dasar 'cat' adalah satu suku kata, jadi gunakan 'menge-'"
            },
            // Modified: Updated kutip sentence with correct transformation k→ng
            {
                sentence: "Mereka ___ wang untuk membeli hadiah.",
                options: ['memutip', 'menutip', 'mengutip', 'menyutip'], // Correct answer shuffled to position 3 (CORRECTED)
                correct: 'mengutip',
                base: 'kutip',
                explanation: "Kata dasar 'kutip' bermula dengan 'k', jadi gunakan 'me-' dan 'k' menjadi 'ng'"
            },
            {
                sentence: "Dia ___ tali dengan kuat.",
                options: ['menarik', 'menyarik', 'mentarik', 'mengarik'], // Correct answer in position 1
                correct: 'menarik',
                base: 'tarik',
                explanation: "Kata dasar 'tarik' bermula dengan 't', jadi gunakan 'me-' dan 't' menjadi 'n'"
            },
            // Added: New sentence for 'p' word with correct transformation p→m
            {
                sentence: "Bomba ___ api dengan cepat.",
                options: ['memadam', 'menyadam', 'mengadam', 'menadam'], // Correct answer in position 1 (ADDED)
                correct: 'memadam',
                base: 'padam',
                explanation: "Kata dasar 'padam' bermula dengan 'p', jadi gunakan 'me-' dan 'p' menjadi 'm'"
            },
            // Added: New sentence for 's' word with correct transformation s→ny
            {
                sentence: "Nenek ___ pokok bunga setiap pagi.",
                options: ['menyiram', 'memiram', 'mengiram', 'mesiram'], // Correct answer in position 1 (ADDED)
                correct: 'menyiram',
                base: 'siram',
                explanation: "Kata dasar 'siram' bermula dengan 's', jadi gunakan 'me-' dan 's' menjadi 'ny'"
            }
        ];
        
        // Grammar rules for hints and feedback
        // Modified: Updated rules according to corrected transformations
        this.grammarRules = {
            'me': {
                rule: "Gunakan 'me-' untuk kata dasar yang bermula dengan l, m, n, ng, ny, r, w, y, k (k→ng), t (t→n), p (p→m), s (s→ny)",
                examples: ["lukis → melukis", "rasa → merasa", "kutip → mengutip (k→ng)", "tarik → menarik (t→n)", "padam → memadam (p→m)", "siram → menyiram (s→ny)"]
            },
            'mem': {
                rule: "Gunakan 'mem-' untuk kata dasar yang bermula dengan b, f, v",
                examples: ["baca → membaca", "fitnah → memfitnah", "veto → memveto"]
            },
            'men': {
                rule: "Gunakan 'men-' untuk kata dasar yang bermula dengan c, d, j, z",
                examples: ["cari → mencari", "dapat → mendapat", "jual → menjual"]
            },
            'meng': {
                rule: "Gunakan 'meng-' untuk kata dasar yang bermula dengan g, h, vokal",
                examples: ["guna → mengguna", "hitung → menghitung", "emas → mengemas"]
            },
            'menge': {
                rule: "Gunakan 'menge-' untuk kata dasar yang mempunyai satu suku kata sahaja",
                examples: ["cat → mengecat", "bom → mengebom", "las → mengelas"]
            }
        };
        
        this.currentSentenceIndex = 0;
        this.shuffledWords = [];
        
        this.initializeInterface();
        this.setupEventListeners();
        this.startSortingMode();
        
        // Create audio context for sound effects
        this.createAudioContext();
    }
    
    // Initialize the user interface
    initializeInterface() {
        this.elements = {
            // Mode controls
            sortingModeBtn: document.getElementById('sortingMode'),
            sentenceModeBtn: document.getElementById('sentenceMode'),
            
            // Interfaces
            sortingInterface: document.getElementById('sortingInterface'),
            sentenceInterface: document.getElementById('sentenceInterface'),
            
            // Utility controls
            hintBtn: document.getElementById('hintBtn'),
            undoBtn: document.getElementById('undoBtn'),
            resetBtn: document.getElementById('resetBtn'),
            
            // Display elements
            scoreDisplay: document.getElementById('score'),
            progressFill: document.getElementById('progressFill'),
            feedbackArea: document.getElementById('feedbackArea'),
            
            // Word bank and drop zones
            wordCards: document.getElementById('wordCards'),
            dropZones: document.querySelectorAll('.drop-zone'),
            
            // Sentence mode elements
            sentenceQuestion: document.getElementById('sentenceQuestion'),
            sentenceOptions: document.getElementById('sentenceOptions'),
            
            // Modals
            resultsModal: document.getElementById('resultsModal'),
            hintModal: document.getElementById('hintModal'),
            resultsContent: document.getElementById('resultsContent'),
            hintContent: document.getElementById('hintContent'),
            closeResults: document.getElementById('closeResults'),
            closeHint: document.getElementById('closeHint')
            
            // REMOVED: tooltip element reference completely removed
        };
    }
    
    // Set up all event listeners
    setupEventListeners() {
        // Mode switching
        this.elements.sortingModeBtn.addEventListener('click', () => this.switchMode('sorting'));
        this.elements.sentenceModeBtn.addEventListener('click', () => this.switchMode('sentence'));
        
        // Utility buttons
        this.elements.hintBtn.addEventListener('click', () => this.showHint());
        this.elements.undoBtn.addEventListener('click', () => this.undoLastAction());
        this.elements.resetBtn.addEventListener('click', () => this.resetAssessment());
        
        // Modal controls
        this.elements.closeResults.addEventListener('click', () => this.closeModal('results'));
        this.elements.closeHint.addEventListener('click', () => this.closeModal('hint'));
        
        // Close modals when clicking outside
        [this.elements.resultsModal, this.elements.hintModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id.replace('Modal', ''));
                }
            });
        });
        
        // Drag and drop for sorting mode
        this.setupDragAndDrop();
        
        // REMOVED: tooltip functionality setup completely removed
    }
    
    // Create audio context for sound effects
    createAudioContext() {
        this.audioContext = null;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio context not supported');
        }
    }
    
    // Play sound effect
    playSound(type) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Different frequencies for different feedback types
        switch (type) {
            case 'correct':
                oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
                oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1); // E5
                break;
            case 'incorrect':
                oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime); // A3
                oscillator.frequency.setValueAtTime(196, this.audioContext.currentTime + 0.1); // G3
                break;
            case 'complete':
                oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
                oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1); // E5
                oscillator.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.2); // G5
                break;
        }
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
    
    // Switch between sorting and sentence modes
    switchMode(mode) {
        this.currentMode = mode;
        
        // Update button states
        this.elements.sortingModeBtn.classList.toggle('active', mode === 'sorting');
        this.elements.sentenceModeBtn.classList.toggle('active', mode === 'sentence');
        
        // Update interface visibility
        this.elements.sortingInterface.classList.toggle('active', mode === 'sorting');
        this.elements.sentenceInterface.classList.toggle('active', mode === 'sentence');
        
        // Initialize the selected mode
        if (mode === 'sorting') {
            this.startSortingMode();
        } else {
            this.startSentenceMode();
        }
        
        this.showFeedback('Mode bertukar ke ' + (mode === 'sorting' ? 'Pengkategorian' : 'Ayat'), 'info');
    }
    
    // Initialize sorting mode
    // Modified: Added functionality to create new randomized word bank
    startSortingMode() {
        // Create a new randomized selection of words each time
        this.shuffledWords = this.getRandomWordSelection();
        this.totalQuestions = this.shuffledWords.length;
        this.createWordCards();
        this.clearDropZones();
        this.updateProgress();
    }
    
    // Added: New method to get random word selection with balanced distribution
    getRandomWordSelection() {
        // Ensure we have a balanced selection from each category
        const categoryCounts = {
            'me': 4,      // 4 words from me- category
            'mem': 3,     // 3 words from mem- category
            'men': 3,     // 3 words from men- category
            'meng': 3,    // 3 words from meng- category
            'menge': 2    // 2 words from menge- category
        };
        
        const selectedWords = [];
        
        // Select words from each category
        Object.entries(categoryCounts).forEach(([category, count]) => {
            const categoryWords = this.wordData.filter(word => word.category === category);
            const shuffledCategoryWords = [...categoryWords].sort(() => Math.random() - 0.5);
            selectedWords.push(...shuffledCategoryWords.slice(0, count));
        });
        
        // Shuffle the final selection to randomize the order
        return selectedWords.sort(() => Math.random() - 0.5);
    }
    
    // Initialize sentence mode
    startSentenceMode() {
        this.currentSentenceIndex = 0;
        this.totalQuestions = this.sentenceData.length;
        this.showCurrentSentence();
        this.updateProgress();
    }
    
    // Create draggable word cards
    createWordCards() {
        this.elements.wordCards.innerHTML = '';
        
        this.shuffledWords.forEach((word, index) => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.textContent = word.base;
            card.draggable = true;
            card.dataset.wordIndex = index;
            card.dataset.correctCategory = word.correct;
            
            // Add drag event listeners
            card.addEventListener('dragstart', (e) => this.handleDragStart(e));
            card.addEventListener('dragend', (e) => this.handleDragEnd(e));
            
            // Touch support for mobile
            card.addEventListener('touchstart', (e) => this.handleTouchStart(e));
            card.addEventListener('touchmove', (e) => this.handleTouchMove(e));
            card.addEventListener('touchend', (e) => this.handleTouchEnd(e));
            
            this.elements.wordCards.appendChild(card);
        });
    }
    
    // Clear all drop zones
    clearDropZones() {
        this.elements.dropZones.forEach(zone => {
            zone.querySelector('.zone-content').innerHTML = '';
            zone.classList.remove('correct', 'incorrect');
        });
    }
    
    // Set up drag and drop functionality
    setupDragAndDrop() {
        this.elements.dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => this.handleDragOver(e));
            zone.addEventListener('drop', (e) => this.handleDrop(e));
            zone.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            zone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        });
    }
    
    // Drag event handlers
    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.wordIndex);
        e.target.classList.add('dragging');
        this.draggedElement = e.target;
    }
    
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.draggedElement = null;
    }
    
    handleDragOver(e) {
        e.preventDefault();
    }
    
    handleDragEnter(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }
    
    handleDragLeave(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            e.currentTarget.classList.remove('drag-over');
        }
    }
    
    handleDrop(e) {
        e.preventDefault();
        const zone = e.currentTarget;
        zone.classList.remove('drag-over');
        
        const wordIndex = e.dataTransfer.getData('text/plain');
        const word = this.shuffledWords[wordIndex];
        const targetCategory = zone.dataset.category;
        
        this.checkAnswer(word, targetCategory, zone, this.draggedElement);
    }
    
    // Touch event handlers for mobile support
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        if (!this.draggedElement) return;
        
        const touch = e.touches[0];
        this.draggedElement.style.position = 'fixed';
        this.draggedElement.style.left = touch.clientX - 50 + 'px';
        this.draggedElement.style.top = touch.clientY - 20 + 'px';
        this.draggedElement.style.zIndex = '1000';
        
        // Highlight drop zone under touch
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropZone = elementBelow?.closest('.drop-zone');
        
        this.elements.dropZones.forEach(zone => zone.classList.remove('drag-over'));
        if (dropZone) {
            dropZone.classList.add('drag-over');
        }
    }
    
    handleTouchEnd(e) {
        if (!this.draggedElement) return;
        
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropZone = elementBelow?.closest('.drop-zone');
        
        // Reset element position
        this.draggedElement.style.position = '';
        this.draggedElement.style.left = '';
        this.draggedElement.style.top = '';
        this.draggedElement.style.zIndex = '';
        this.draggedElement.classList.remove('dragging');
        
        this.elements.dropZones.forEach(zone => zone.classList.remove('drag-over'));
        
        if (dropZone) {
            const wordIndex = this.draggedElement.dataset.wordIndex;
            const word = this.shuffledWords[wordIndex];
            const targetCategory = dropZone.dataset.category;
            
            this.checkAnswer(word, targetCategory, dropZone, this.draggedElement);
        }
        
        this.draggedElement = null;
    }
    
    // Check if the dropped answer is correct
    checkAnswer(word, targetCategory, zone, cardElement) {
        const isCorrect = word.correct === targetCategory;
        
        // Store action for undo functionality
        this.lastAction = {
            type: 'drop',
            word: word,
            zone: zone,
            cardElement: cardElement,
            wasCorrect: isCorrect
        };
        
        if (isCorrect) {
            // Correct answer
            this.handleCorrectAnswer(word, zone, cardElement);
        } else {
            // Incorrect answer
            this.handleIncorrectAnswer(word, targetCategory, cardElement);
        }
        
        this.updateProgress();
    }
    
    // Handle correct answer
    handleCorrectAnswer(word, zone, cardElement) {
        this.correctAnswers++;
        this.score += 10;
        
        // Move card to drop zone
        const zoneContent = zone.querySelector('.zone-content');
        cardElement.classList.add('placed');
        cardElement.draggable = false;
        zoneContent.appendChild(cardElement);
        
        // Visual feedback
        zone.classList.add('correct');
        setTimeout(() => zone.classList.remove('correct'), 1000);
        
        // Audio feedback
        this.playSound('correct');
        
        // Text feedback
        this.showFeedback(`Betul! ${word.base} → ${word.form}`, 'success');
        
        // Check if all words are placed correctly
        if (this.correctAnswers === this.totalQuestions) {
            setTimeout(() => this.showCompletionFeedback(), 1000);
        }
        
        this.updateScore();
    }
    
    // Handle incorrect answer
    handleIncorrectAnswer(word, targetCategory, cardElement) {
        // Record error for results
        this.errors.push({
            word: word.base,
            attempted: targetCategory,
            correct: word.correct,
            explanation: this.grammarRules[word.correct].rule
        });
        
        // Visual feedback
        const targetZone = document.querySelector(`[data-category="${targetCategory}"]`);
        targetZone.classList.add('incorrect');
        setTimeout(() => targetZone.classList.remove('incorrect'), 1000);
        
        // Audio feedback
        this.playSound('incorrect');
        
        // Snap back animation
        cardElement.style.animation = 'incorrectShake 0.6s ease';
        setTimeout(() => {
            cardElement.style.animation = '';
        }, 600);
        
        // Show hint based on current hint level
        this.showIncorrectFeedback(word, targetCategory);
        
        // Increase hint level for next time
        this.currentHintLevel = Math.min(this.currentHintLevel + 1, 2);
    }
    
    // Show feedback for incorrect answers
    showIncorrectFeedback(word, attemptedCategory) {
        let feedback = '';
        
        if (this.currentHintLevel === 0) {
            // First hint: just indicate it's wrong
            feedback = `Tidak betul. Cuba lagi!`;
        } else if (this.currentHintLevel === 1) {
            // Second hint: give rule
            const rule = this.grammarRules[word.correct].rule;
            feedback = `Petunjuk: ${rule}`;
        } else {
            // Third hint: give example
            const example = this.grammarRules[word.correct].examples[0];
            feedback = `Contoh: ${example}`;
        }
        
        this.showFeedback(feedback, 'hint');
    }
    
    // Show current sentence in sentence mode
    // Modified: Removed black box hover effect by simplifying blank display
    showCurrentSentence() {
        if (this.currentSentenceIndex >= this.sentenceData.length) {
            this.showCompletionFeedback();
            return;
        }
        
        const sentence = this.sentenceData[this.currentSentenceIndex];
        
        // Modified: Display sentence with simple blank (no hover effects or black box)
        const sentenceHtml = sentence.sentence.replace('___', '<span class="sentence-blank"></span>');
        this.elements.sentenceQuestion.innerHTML = sentenceHtml;
        
        // Display options (already shuffled in sentenceData)
        this.elements.sentenceOptions.innerHTML = '';
        sentence.options.forEach(option => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'sentence-option';
            optionBtn.textContent = option;
            optionBtn.addEventListener('click', () => this.checkSentenceAnswer(option));
            this.elements.sentenceOptions.appendChild(optionBtn);
        });
    }
    
    // Check sentence completion answer
    checkSentenceAnswer(selectedOption) {
        const sentence = this.sentenceData[this.currentSentenceIndex];
        const isCorrect = selectedOption === sentence.correct;
        
        if (isCorrect) {
            this.correctAnswers++;
            this.score += 15;
            this.playSound('correct');
            this.showFeedback(`Betul! ${sentence.explanation}`, 'success');
        } else {
            this.playSound('incorrect');
            this.showFeedback(`Tidak betul. ${sentence.explanation}`, 'error');
            this.errors.push({
                sentence: sentence.sentence,
                attempted: selectedOption,
                correct: sentence.correct,
                explanation: sentence.explanation
            });
        }
        
        this.updateScore();
        this.currentSentenceIndex++;
        
        // Show next sentence after delay
        setTimeout(() => {
            if (this.currentSentenceIndex < this.sentenceData.length) {
                this.showCurrentSentence();
            } else {
                this.showCompletionFeedback();
            }
        }, 2000);
        
        this.updateProgress();
    }
    
    // Show completion feedback and results
    showCompletionFeedback() {
        this.playSound('complete');
        
        const percentage = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        let message = '';
        
        if (percentage >= 90) {
            message = 'Cemerlang! Anda menguasai imbuhan meN- dengan baik!';
        } else if (percentage >= 70) {
            message = 'Bagus! Teruskan usaha untuk menguasai imbuhan meN-.';
        } else if (percentage >= 50) {
            message = 'Sederhana. Cuba ulang kaji peraturan imbuhan meN-.';
        } else {
            message = 'Perlu lebih banyak latihan. Jangan berputus asa!';
        }
        
        this.showFeedback(message, 'success');
        
        // Show detailed results after a delay
        setTimeout(() => this.showResults(), 2000);
    }
    
    // Display detailed results
    showResults() {
        const percentage = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        
        let resultsHtml = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3>Skor Akhir: ${this.score} mata</h3>
                <p>Betul: ${this.correctAnswers}/${this.totalQuestions} (${percentage}%)</p>
            </div>
        `;
        
        if (this.errors.length > 0) {
            resultsHtml += '<h4>Kesilapan dan Penjelasan:</h4>';
            this.errors.forEach(error => {
                resultsHtml += `
                    <div class="error-summary">
                        <strong>${error.word || error.sentence}</strong><br>
                        Jawapan anda: <em>${error.attempted}</em><br>
                        Jawapan betul: <em>${error.correct}</em><br>
                        <small>${error.explanation}</small>
                    </div>
                `;
            });
        }
        
        // Add rule summaries (modified: updated rules for corrected transformations)
        resultsHtml += '<h4>Ringkasan Peraturan:</h4>';
        Object.entries(this.grammarRules).forEach(([category, rule]) => {
            resultsHtml += `
                <div class="rule-summary">
                    <strong>${category.toUpperCase()}-:</strong> ${rule.rule}<br>
                    <small>Contoh: ${rule.examples.join(', ')}</small>
                </div>
            `;
        });
        
        this.elements.resultsContent.innerHTML = resultsHtml;
        this.showModal('results');
    }
    
    // Show hint modal
    showHint() {
        let hintHtml = '';
        
        if (this.currentMode === 'sorting') {
            // Modified: Updated hint rules according to corrected transformations
            hintHtml = `
                <div class="hint-level">
                    <h4>Peraturan Asas Imbuhan meN-:</h4>
                    <ul>
                        <li><strong>me-:</strong> l, m, n, ng, ny, r, w, y, k (k→ng), t (t→n), p (p→m), s (s→ny)</li>
                        <li><strong>mem-:</strong> b, f, v</li>
                        <li><strong>men-:</strong> c, d, j, z</li>
                        <li><strong>meng-:</strong> g, h, vokal</li>
                        <li><strong>menge-:</strong> kata satu suku kata</li>
                    </ul>
                </div>
                
                <div class="hint-level">
                    <h4>Contoh Pengguguran Huruf dalam me-:</h4>
                    <p>kutip → me<strong>ng</strong>utip (k→ng)</p>
                    <p>tarik → me<strong>n</strong>arik (t→n)</p>
                    <p>padam → me<strong>m</strong>adam (p→m)</p>
                    <p>siram → me<strong>ny</strong>iram (s→ny)</p>
                </div>
            `;
        } else {
            hintHtml = `
                <div class="hint-level">
                    <h4>Tips Melengkapkan Ayat:</h4>
                    <ol>
                        <li>Kenal pasti kata dasar dalam pilihan jawapan</li>
                        <li>Lihat huruf pertama kata dasar</li>
                        <li>Gunakan peraturan imbuhan meN- yang sesuai</li>
                        <li>Periksa sama ada huruf perlu digugurkan atau ditukar</li>
                    </ol>
                </div>
            `;
        }
        
        this.elements.hintContent.innerHTML = hintHtml;
        this.showModal('hint');
    }
    
    // Undo last action
    undoLastAction() {
        if (!this.lastAction) {
            this.showFeedback('Tiada tindakan untuk dibatalkan', 'info');
            return;
        }
        
        const action = this.lastAction;
        
        if (action.type === 'drop' && action.wasCorrect) {
            // Move card back to word bank
            action.cardElement.classList.remove('placed');
            action.cardElement.draggable = true;
            this.elements.wordCards.appendChild(action.cardElement);
            
            // Update counters
            this.correctAnswers--;
            this.score -= 10;
            this.updateScore();
            this.updateProgress();
            
            this.showFeedback('Tindakan dibatalkan', 'info');
        }
        
        this.lastAction = null;
    }
    
    // Reset entire assessment
    // Modified: Enhanced to create new word bank when 'Set Semula' is clicked
    resetAssessment() {
        if (confirm('Adakah anda pasti mahu set semula penilaian ini?')) {
            // Reset all counters and state
            this.score = 0;
            this.correctAnswers = 0;
            this.currentHintLevel = 0;
            this.errors = [];
            this.lastAction = null;
            
            // Initialize the appropriate mode with new content
            if (this.currentMode === 'sorting') {
                // Create a completely new randomized word bank
                this.startSortingMode();
                this.showFeedback('Penilaian telah di-set semula dengan bank kata baharu!', 'info');
            } else {
                // Reset sentence mode (sentences remain the same but progress resets)
                this.startSentenceMode();
                this.showFeedback('Penilaian ayat telah di-set semula!', 'info');
            }
            
            this.updateScore();
        }
    }
    
    // Update score display
    updateScore() {
        this.elements.scoreDisplay.textContent = `Skor: ${this.score}`;
    }
    
    // Update progress bar
    updateProgress() {
        const progress = (this.correctAnswers / this.totalQuestions) * 100;
        this.elements.progressFill.style.width = progress + '%';
    }
    
    // Show feedback message
    showFeedback(message, type) {
        this.elements.feedbackArea.textContent = message;
        this.elements.feedbackArea.className = `feedback-area feedback-${type}`;
        
        // Clear feedback after 3 seconds
        setTimeout(() => {
            this.elements.feedbackArea.textContent = '';
            this.elements.feedbackArea.className = 'feedback-area';
        }, 3000);
    }
    
    // Show modal
    showModal(type) {
        const modal = this.elements[type + 'Modal'];
        modal.classList.add('active');
    }
    
    // Close modal
    closeModal(type) {
        const modal = this.elements[type + 'Modal'];
        modal.classList.remove('active');
    }
    
    // REMOVED: All tooltip functionality completely removed
    // - setupTooltips() method removed
    // - showTooltip() method removed
    // - moveTooltip() method removed
    // - hideTooltip() method removed
}

// Initialize the assessment when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MenPrefixAssessment();
});