// Game state management
class CCAgame {
    constructor() {
        // Initialize game state
        this.currentScreen = 'home';
        this.selectedAvatar = null;
        this.selectedCCA = null;
        this.selectedGoal = null;
        this.currentDay = 1;
        this.currentScene = 'introduction';
        
        // Player stats - start at 50%
        this.stats = {
            komitmen: 50,
            kerjasama: 50,
            kepimpinan: 50,
            bahasa: 50
        };
        
        // Game data
        this.vocabulary = this.initializeVocabulary();
        this.scenes = this.initializeScenes();
        this.currentSceneData = null;
        
        // Initialize event listeners
        this.initializeEventListeners();
        this.initializeTooltips();
    }
    
    // Initialize vocabulary database
    initializeVocabulary() {
        return {
            'aktiviti': 'Kegiatan atau acara yang dilakukan dalam CCA',
            'jadual': 'Susunan masa untuk aktiviti harian atau mingguan',
            'peranan': 'Tugas atau tanggungjawab seseorang dalam kumpulan',
            'peraturan': 'Undang-undang atau garis panduan yang mesti diikuti',
            'nilai': 'Prinsip atau kepercayaan yang penting',
            'komitmen': 'Janji atau dedikasi untuk melakukan sesuatu',
            'kerjasama': 'Bekerjasama dengan orang lain untuk mencapai matlamat',
            'kepimpinan': 'Kemahiran memimpin dan membimbing orang lain',
            'disiplin': 'Kawalan diri dan ketaatan kepada peraturan',
            'hormat': 'Menghargai dan menghormati orang lain',
            'tanggungjawab': 'Kewajipan untuk melakukan tugas dengan baik',
            'memohon': 'Meminta sesuatu dengan sopan',
            'menolak': 'Berkata tidak dengan cara yang baik',
            'memberi alasan': 'Menerangkan sebab sesuatu berlaku',
            'mencadangkan': 'Memberikan idea atau saranan',
            'refleksi': 'Berfikir semula tentang pengalaman',
            'persatuan': 'Kumpulan atau organisasi pelajar',
            'pancaragam': 'Seni persembahan tradisional Malaysia',
            'latihan': 'Sesi berlatih untuk meningkatkan kemahiran',
            'persediaan': 'Persiapan untuk sesuatu acara atau aktiviti'
        };
    }
    
    // Initialize scene data
    initializeScenes() {
        return {
            introduction: {
                title: 'Hari 1: Pengenalan',
                visual: '🏫',
                text: 'Selamat datang ke CCA! Hari ini adalah hari pertama anda sebagai ahli baru. Guru CCA, Cikgu Aminah, ingin bertemu dengan semua ahli baru untuk pengenalan.',
                choices: [
                    {
                        text: 'A) "Selamat pagi, Cikgu. Saya gembira dapat menyertai CCA ini."',
                        effects: { komitmen: 5, bahasa: 5 },
                        feedback: 'Jawapan yang sopan dan menunjukkan sikap positif!'
                    },
                    {
                        text: 'B) "Hi Cikgu, bila kita mula aktiviti?"',
                        effects: { komitmen: 2, bahasa: -2 },
                        feedback: 'Cuba guna sapaan yang lebih formal dalam situasi ini.'
                    },
                    {
                        text: 'C) *Hanya mengangguk dan duduk diam*',
                        effects: { komitmen: -3, kerjasama: -2 },
                        feedback: 'Pengenalan diri penting untuk membina hubungan baik!'
                    }
                ]
            },
            registration: {
                title: 'Hari 2: Pendaftaran Rasmi',
                visual: '📝',
                text: 'Hari ini anda perlu mengisi borang pendaftaran CCA dan memilih peranan yang diminati. Terdapat beberapa jawatan kosong: Setiausaha, Bendahari, dan Ahli Jawatankuasa.',
                choices: [
                    {
                        text: 'A) "Saya ingin mencuba jadi Setiausaha untuk belajar kemahiran baru."',
                        effects: { kepimpinan: 8, komitmen: 5, bahasa: 3 },
                        feedback: 'Sikap proaktif yang baik! Setiausaha memerlukan kemahiran komunikasi yang kuat.'
                    },
                    {
                        text: 'B) "Saya rasa saya sesuai jadi Ahli Jawatankuasa dulu."',
                        effects: { komitmen: 3, kerjasama: 5 },
                        feedback: 'Pilihan yang bijak untuk pemula. Anda boleh belajar sambil menyumbang.'
                    },
                    {
                        text: 'C) "Hmm... saya tak pasti. Boleh saya fikir dulu?"',
                        effects: { komitmen: -2 },
                        feedback: 'Tidak salah untuk berfikir, tetapi jangan terlalu lama menunggu!'
                    }
                ]
            },
            training: {
                title: 'Hari 3: Latihan Mingguan',
                visual: '🏃‍♂️',
                text: 'Latihan mingguan CCA bermula! Hari ini anda akan belajar aktiviti asas. Tetapi anda ada ujian Matematik esok dan belum bersedia sepenuhnya.',
                choices: [
                    {
                        text: 'A) Fokus sepenuhnya pada latihan CCA hari ini.',
                        effects: { komitmen: 8, kerjasama: 5, bahasa: -2 },
                        feedback: 'Komitmen yang tinggi, tetapi jangan abaikan akademik!'
                    },
                    {
                        text: 'B) "Cikgu, boleh saya keluar awal untuk belajar ujian esok?"',
                        effects: { komitmen: -3, bahasa: 5 },
                        feedback: 'Komunikasi yang sopan, tetapi cuba atur masa dengan lebih baik.'
                    },
                    {
                        text: 'C) Hadir latihan tetapi sambil belajar Matematik secara senyap.',
                        effects: { komitmen: -5, kerjasama: -3 },
                        feedback: 'Tidak menghormati masa latihan. Cuba fokus pada satu perkara pada satu masa.'
                    }
                ]
            },
            preparation: {
                title: 'Hari 5: Persediaan Acara',
                visual: '🎭',
                text: 'CCA anda akan menganjurkan acara kecil minggu depan. Semua ahli perlu membantu persediaan. Anda diberi pilihan untuk mengetuai satu bahagian.',
                choices: [
                    {
                        text: 'A) "Saya sanggup mengetuai bahagian dekorasi!"',
                        effects: { kepimpinan: 10, komitmen: 8, kerjasama: 3 },
                        feedback: 'Inisiatif yang cemerlang! Kepimpinan bermula dengan keberanian mengambil tanggungjawab.'
                    },
                    {
                        text: 'B) "Saya lebih suka membantu mana-mana bahagian yang perlukan."',
                        effects: { kerjasama: 8, komitmen: 5 },
                        feedback: 'Sikap membantu yang baik! Fleksibiliti adalah aset penting.'
                    },
                    {
                        text: 'C) "Saya tak yakin boleh handle... mungkin saya just ikut je."',
                        effects: { kepimpinan: -5, komitmen: -2 },
                        feedback: 'Keyakinan diri penting! Cuba ambil risiko kecil untuk berkembang.'
                    }
                ]
            },
            event: {
                title: 'Hari 7: Hari Acara & Refleksi',
                visual: '🎉',
                text: 'Hari acara tiba! Semua persediaan minggu ini akan diuji. Pada saat-saat akhir, ada masalah teknikal dengan sistem bunyi. Bagaimana anda bertindak?',
                choices: [
                    {
                        text: 'A) Cepat-cepat cari penyelesaian dan koordinasi dengan ahli lain.',
                        effects: { kepimpinan: 12, kerjasama: 8, komitmen: 5 },
                        feedback: 'Tindakan pantas dan kerjasama yang cemerlang! Ini adalah kepimpinan sebenar.'
                    },
                    {
                        text: 'B) Beritahu guru dan tunggu arahan selanjutnya.',
                        effects: { komitmen: 5, bahasa: 3 },
                        feedback: 'Komunikasi yang baik, tetapi cuba ambil lebih inisiatif dalam kecemasan.'
                    },
                    {
                        text: 'C) Panic dan tidak tahu apa yang perlu dibuat.',
                        effects: { kepimpinan: -8, kerjasama: -5 },
                        feedback: 'Dalam situasi sukar, cuba kekalkan ketenangan dan cari bantuan.'
                    }
                ]
            }
        };
    }
    
    // Initialize event listeners
    initializeEventListeners() {
        // Avatar selection
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                this.selectedAvatar = option.dataset.avatar;
                this.checkStartButton();
            });
        });
        
        // CCA selection
        document.getElementById('ccaSelect').addEventListener('change', (e) => {
            this.selectedCCA = e.target.value;
            this.checkStartButton();
        });
        
        // Goal selection
        document.querySelectorAll('input[name="goal"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.selectedGoal = e.target.value;
                this.checkStartButton();
            });
        });
    }
    
    // Initialize tooltip system
    initializeTooltips() {
        const tooltip = document.getElementById('tooltip');
        
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const text = e.target.dataset.tooltip;
                tooltip.textContent = text;
                tooltip.classList.remove('hidden');
                this.positionTooltip(e, tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.add('hidden');
            });
            
            element.addEventListener('mousemove', (e) => {
                this.positionTooltip(e, tooltip);
            });
        });
    }
    
    // Position tooltip near cursor
    positionTooltip(event, tooltip) {
        const rect = document.getElementById('gameContainer').getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        tooltip.style.left = `${x + 10}px`;
        tooltip.style.top = `${y - 30}px`;
    }
    
    // Check if start button should be enabled
    checkStartButton() {
        const startBtn = document.querySelector('.start-btn');
        if (this.selectedAvatar && this.selectedCCA && this.selectedGoal) {
            startBtn.disabled = false;
        }
    }
    
    // Update meter displays
    updateMeters() {
        Object.keys(this.stats).forEach(stat => {
            const meter = document.getElementById(`${stat}Meter`);
            const value = document.getElementById(`${stat}Value`);
            
            // Clamp values between 0 and 100
            this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat]));
            
            meter.style.width = `${this.stats[stat]}%`;
            value.textContent = `${this.stats[stat]}%`;
            
            // Color coding based on performance
            if (this.stats[stat] >= 70) {
                meter.style.background = 'linear-gradient(90deg, #48bb78, #38a169)';
            } else if (this.stats[stat] >= 40) {
                meter.style.background = 'linear-gradient(90deg, #ed8936, #dd6b20)';
            } else {
                meter.style.background = 'linear-gradient(90deg, #e53e3e, #c53030)';
            }
        });
    }
    
    // Apply choice effects to stats
    applyChoiceEffects(effects) {
        Object.keys(effects).forEach(stat => {
            if (this.stats.hasOwnProperty(stat)) {
                this.stats[stat] += effects[stat];
            }
        });
        this.updateMeters();
    }
    
    // Show feedback modal
    showFeedback(title, content) {
        document.getElementById('feedbackTitle').textContent = title;
        document.getElementById('feedbackContent').innerHTML = content;
        document.getElementById('feedbackModal').classList.remove('hidden');
    }
    
    // Load current scene
    loadScene(sceneKey) {
        const scene = this.scenes[sceneKey];
        if (!scene) return;
        
        this.currentSceneData = scene;
        
        // Update scene info
        document.getElementById('sceneTitle').textContent = scene.title;
        document.getElementById('dayCounter').textContent = `Hari ${this.currentDay}/7`;
        
        // Update visual
        document.getElementById('sceneVisual').textContent = scene.visual;
        
        // Update text
        document.getElementById('sceneText').textContent = scene.text;
        
        // Create dialogue options
        const optionsContainer = document.getElementById('dialogueOptions');
        optionsContainer.innerHTML = '';
        
        scene.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'dialogue-option';
            button.textContent = choice.text;
            button.addEventListener('click', () => this.handleChoice(choice));
            optionsContainer.appendChild(button);
        });
    }
    
    // Handle player choice
    handleChoice(choice) {
        // Apply effects
        this.applyChoiceEffects(choice.effects);
        
        // Show feedback
        this.showFeedback('Maklum Balas', choice.feedback);
        
        // Progress to next scene after feedback
        setTimeout(() => {
            this.progressScene();
        }, 2000);
    }
    
    // Progress to next scene
    progressScene() {
        const sceneOrder = ['introduction', 'registration', 'training', 'preparation', 'event'];
        const currentIndex = sceneOrder.indexOf(this.currentScene);
        
        if (currentIndex < sceneOrder.length - 1) {
            this.currentScene = sceneOrder[currentIndex + 1];
            this.currentDay += Math.floor((currentIndex + 2) * 7 / sceneOrder.length);
            this.loadScene(this.currentScene);
        } else {
            this.endGame();
        }
    }
    
    // End game and show results - Modified to include restart functionality
    endGame() {
        let outcome = '';
        let performance = '';
        
        // Calculate overall performance
        const average = Object.values(this.stats).reduce((a, b) => a + b, 0) / 4;
        
        if (average >= 80) {
            outcome = 'Cemerlang! Anda telah menunjukkan prestasi yang luar biasa dalam CCA.';
            performance = 'excellent';
        } else if (average >= 60) {
            outcome = 'Baik! Anda telah belajar banyak dan menunjukkan kemajuan yang baik.';
            performance = 'good';
        } else {
            outcome = 'Anda telah berusaha. Teruskan belajar dan cuba lagi!';
            performance = 'needs-improvement';
        }
        
        // Show end screen with results and restart button
        const endContent = `
            <h2>Tamat Simulasi</h2>
            <p>${outcome}</p>
            <div class="final-stats">
                <h3>Keputusan Akhir:</h3>
                <p>Komitmen: ${this.stats.komitmen}%</p>
                <p>Kerjasama: ${this.stats.kerjasama}%</p>
                <p>Kepimpinan: ${this.stats.kepimpinan}%</p>
                <p>Bahasa: ${this.stats.bahasa}%</p>
            </div>
            <div class="reflection">
                <h3>Refleksi:</h3>
                <p>Apakah yang anda pelajari daripada pengalaman CCA ini?</p>
                <textarea placeholder="Tulis refleksi anda di sini..." rows="4" style="width: 100%; margin: 10px 0; padding: 10px; border-radius: 8px; border: 2px solid #e2e8f0; font-family: inherit; resize: vertical;"></textarea>
            </div>
        `;
        
        // Update modal actions to include restart button
        document.getElementById('feedbackContent').innerHTML = endContent;
        document.getElementById('feedbackTitle').textContent = 'Keputusan Akhir';
        
        // Replace modal actions with restart button
        const modalActions = document.querySelector('.modal-actions');
        modalActions.innerHTML = `
            <button class="restart-btn" onclick="restartGame()">
                <span>🔄</span> Mula Semula
            </button>
        `;
        
        document.getElementById('feedbackModal').classList.remove('hidden');
    }
    
    // Reset game state - New method for restart functionality
    resetGame() {
        // Reset all game state variables
        this.currentScreen = 'home';
        this.selectedAvatar = null;
        this.selectedCCA = null;
        this.selectedGoal = null;
        this.currentDay = 1;
        this.currentScene = 'introduction';
        
        // Reset stats to initial values
        this.stats = {
            komitmen: 50,
            kerjasama: 50,
            kepimpinan: 50,
            bahasa: 50
        };
        
        // Clear UI selections
        document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
        document.getElementById('ccaSelect').value = '';
        document.querySelectorAll('input[name="goal"]').forEach(radio => radio.checked = false);
        
        // Disable start button
        document.querySelector('.start-btn').disabled = true;
        
        // Reset meters
        this.updateMeters();
        
        // Clear scene content
        document.getElementById('sceneTitle').textContent = 'Hari 1: Pengenalan';
        document.getElementById('dayCounter').textContent = 'Hari 1/7';
        document.getElementById('sceneVisual').textContent = '';
        document.getElementById('sceneText').textContent = 'Selamat datang ke simulasi CCA! Anda baru sahaja mendaftar untuk CCA pilihan anda. Guru CCA ingin bertemu dengan semua ahli baru.';
        document.getElementById('dialogueOptions').innerHTML = '';
    }
    
    // Populate glossary
    populateGlossary() {
        const glossaryList = document.getElementById('glossaryList');
        glossaryList.innerHTML = '';
        
        Object.entries(this.vocabulary).forEach(([term, definition]) => {
            const item = document.createElement('div');
            item.className = 'glossary-item';
            item.innerHTML = `
                <div class="glossary-term">${term}</div>
                <div class="glossary-definition">${definition}</div>
            `;
            glossaryList.appendChild(item);
        });
    }
    
    // Filter glossary based on search
    filterGlossary() {
        const searchTerm = document.getElementById('glossarySearch').value.toLowerCase();
        const items = document.querySelectorAll('.glossary-item');
        
        items.forEach(item => {
            const term = item.querySelector('.glossary-term').textContent.toLowerCase();
            const definition = item.querySelector('.glossary-definition').textContent.toLowerCase();
            
            if (term.includes(searchTerm) || definition.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Initialize game instance
const game = new CCAgame();

// Screen navigation functions
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    game.currentScreen = screenId;
}

function showHome() {
    showScreen('homeScreen');
}

function showAvatarSelection() {
    showScreen('avatarScreen');
}

function showInstructions() {
    showScreen('instructionsScreen');
}

function showGlossary() {
    game.populateGlossary();
    showScreen('glossaryScreen');
}

function startGame() {
    if (!game.selectedAvatar || !game.selectedCCA || !game.selectedGoal) {
        alert('Sila lengkapkan semua pilihan terlebih dahulu.');
        return;
    }
    
    showScreen('gameScreen');
    game.loadScene('introduction');
    game.updateMeters();
}

// Restart game function - New function to handle game restart
function restartGame() {
    // Close any open modals
    closeFeedback();
    closeTask();
    
    // Reset game state
    game.resetGame();
    
    // Return to home screen
    showHome();
}

// Task functions
function showTask(taskType) {
    document.getElementById('taskPanel').classList.remove('hidden');
    // Load specific task based on type
}

function submitTask() {
    // Handle task submission
    closeTask();
}

function closeTask() {
    document.getElementById('taskPanel').classList.add('hidden');
}

// Modal functions
function closeFeedback() {
    document.getElementById('feedbackModal').classList.add('hidden');
    
    // Reset modal actions to default state when closing
    const modalActions = document.querySelector('.modal-actions');
    modalActions.innerHTML = `
        <button class="modal-btn" onclick="closeFeedback()">Faham</button>
    `;
}

// Glossary filter function
function filterGlossary() {
    game.filterGlossary();
}

// Initialize responsive height detection
function detectEnvironment() {
    const container = document.getElementById('gameContainer');
    
    // Check if likely in iframe
    if (window.self !== window.top) {
        container.style.height = '450px';
    } else {
        container.style.height = '90vh';
    }
}

// Run environment detection on load and resize
window.addEventListener('load', detectEnvironment);
window.addEventListener('resize', detectEnvironment);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFeedback();
        closeTask();
    }
    
    // Arrow key navigation for dialogue options
    if (game.currentScreen === 'gameScreen') {
        const options = document.querySelectorAll('.dialogue-option');
        const focused = document.activeElement;
        const currentIndex = Array.from(options).indexOf(focused);
        
        if (e.key === 'ArrowDown' && currentIndex < options.length - 1) {
            options[currentIndex + 1].focus();
            e.preventDefault();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            options[currentIndex - 1].focus();
            e.preventDefault();
        } else if (e.key === 'Enter' && focused.classList.contains('dialogue-option')) {
            focused.click();
            e.preventDefault();
        }
    }
});

// Touch support for mobile devices
document.addEventListener('touchstart', (e) => {
    // Enable touch interactions
}, { passive: true });

// Performance optimization - lazy load content
document.addEventListener('DOMContentLoaded', () => {
    // Initialize game after DOM is ready
    console.log('CCA Simulation Game initialized successfully!');
});