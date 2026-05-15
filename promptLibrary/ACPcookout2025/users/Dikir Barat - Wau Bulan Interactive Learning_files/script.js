// Dikir Barat Interactive Learning Application - Wau Bulan
// This application teaches students the traditional song "Wau Bulan" with proper pronunciation and rebana coordination
// Updated with louder rebana sounds, corrected 4/4 rhythm pattern, and drone pitch feature

class DikirBaratLearning {
    constructor() {
        // Initialize application state
        this.currentMode = 'rhythm'; // rhythm, vocal, combined
        this.isPlaying = false;
        this.isRecording = false;
        this.isDroneActive = false; // Added drone state
        this.currentTempo = 80; // BPM
        this.currentBeat = 0;
        this.currentLine = 0;
        this.beatInterval = null;
        this.audioContext = null;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.droneOscillator = null; // Added drone oscillator
        this.droneGain = null; // Added drone gain node
        
        // Corrected rhythm pattern with proper 4/4 time signature
        // Beat 1: Crotchet | Beat 2: Quaver-semiquaver-semiquaver | Beat 3: semiquaver-semiquaver-quaver | Beat 4: semiquaver-semiquaver-quaver
        this.rhythmPattern = [
            // Beat 1: Crotchet (1 full beat)
            { sound: 'T', duration: 'crotchet', beat: 1, timing: 0 },
            
            // Beat 2: Quaver-semiquaver-semiquaver
            { sound: 'T', duration: 'quaver', beat: 2, timing: 4 },        // Half beat
            { sound: 'K', duration: 'semiquaver', beat: 2, timing: 6 },    // Quarter beat
            { sound: 'T', duration: 'semiquaver', beat: 2, timing: 7 },    // Quarter beat
            
            // Beat 3: semiquaver-semiquaver-quaver
            { sound: 'K', duration: 'semiquaver', beat: 3, timing: 8 },    // Quarter beat
            { sound: 'T', duration: 'semiquaver', beat: 3, timing: 9 },    // Quarter beat
            { sound: 'K', duration: 'quaver', beat: 3, timing: 10 },       // Half beat
            
            // Beat 4: semiquaver-semiquaver-quaver
            { sound: 'T', duration: 'semiquaver', beat: 4, timing: 12 },   // Quarter beat
            { sound: 'K', duration: 'semiquaver', beat: 4, timing: 13 },   // Quarter beat
            { sound: 'T', duration: 'quaver', beat: 4, timing: 14 }        // Half beat
        ];
        
        // Updated lyrics for Wau Bulan with phonetic guides
        this.lyrics = [
            {
                malay: "Eh wau buleh, eh wau buleh",
                phonetic: "[eh wow boo-leh, eh wow boo-leh]",
                timing: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            },
            {
                malay: "Eh wau buleh teraju tigo",
                phonetic: "[eh wow boo-leh teh-rah-joo tee-goh]",
                timing: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            },
            {
                malay: "Eh wau, eh wau, eh wau buleh",
                phonetic: "[eh wow, eh wow, eh wow boo-leh]",
                timing: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            },
            {
                malay: "Eh wau buleh teraju tigo",
                phonetic: "[eh wow boo-leh teh-rah-joo tee-goh]",
                timing: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            },
            {
                malay: "Ala eh wau, eh wau buleh",
                phonetic: "[ah-lah eh wow, eh wow boo-leh]",
                timing: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            },
            {
                malay: "Eh wau buleh teraju tigo",
                phonetic: "[eh wow boo-leh teh-rah-joo tee-goh]",
                timing: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            },
            {
                malay: "Ala eh wau, eh wau buleh",
                phonetic: "[ah-lah eh wow, eh wow boo-leh]",
                timing: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            },
            {
                malay: "Eh wau buleh teraju tigo",
                phonetic: "[eh wow boo-leh teh-rah-joo tee-goh]",
                timing: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
        ];
        
        // Progress tracking
        this.progress = {
            rhythm: 0,
            vocal: 0,
            coordination: 0
        };
        
        this.initializeElements();
        this.bindEvents();
        this.initializeAudio();
        this.updateDisplay();
    }
    
    // Initialize DOM element references
    initializeElements() {
        this.elements = {
            tempoSlider: document.getElementById('tempo-slider'),
            tempoValue: document.getElementById('tempo-value'),
            droneToggle: document.getElementById('drone-toggle'), // Added drone toggle
            rhythmModeBtn: document.getElementById('rhythm-mode'),
            vocalModeBtn: document.getElementById('vocal-mode'),
            combinedModeBtn: document.getElementById('combined-mode'),
            playBtn: document.getElementById('play-btn'),
            pauseBtn: document.getElementById('pause-btn'),
            recordBtn: document.getElementById('record-btn'),
            rebanaDrum: document.getElementById('rebana-drum'),
            patternBeats: document.querySelectorAll('.beat'),
            lyricLines: document.querySelectorAll('.lyric-line'),
            practiceLineBtns: document.querySelectorAll('.practice-line-btn'),
            rhythmProgress: document.getElementById('rhythm-progress'),
            vocalProgress: document.getElementById('vocal-progress'),
            coordinationProgress: document.getElementById('coordination-progress'),
            recordingStatus: document.getElementById('recording-status'),
            stopRecordingBtn: document.getElementById('stop-recording'),
            metronome: document.getElementById('metronome')
        };
    }
    
    // Bind event listeners
    bindEvents() {
        // Tempo control
        this.elements.tempoSlider.addEventListener('input', (e) => {
            this.currentTempo = parseInt(e.target.value);
            this.elements.tempoValue.textContent = `${this.currentTempo} BPM`;
            if (this.isPlaying) {
                this.stopPlayback();
                this.startPlayback();
            }
        });
        
        // Drone control - Added drone toggle event listener
        this.elements.droneToggle.addEventListener('change', (e) => {
            this.toggleDrone(e.target.checked);
        });
        
        // Mode buttons
        this.elements.rhythmModeBtn.addEventListener('click', () => this.setMode('rhythm'));
        this.elements.vocalModeBtn.addEventListener('click', () => this.setMode('vocal'));
        this.elements.combinedModeBtn.addEventListener('click', () => this.setMode('combined'));
        
        // Playback controls
        this.elements.playBtn.addEventListener('click', () => this.startPlayback());
        this.elements.pauseBtn.addEventListener('click', () => this.stopPlayback());
        this.elements.recordBtn.addEventListener('click', () => this.toggleRecording());
        this.elements.stopRecordingBtn.addEventListener('click', () => this.stopRecording());
        
        // Rebana drum interaction
        this.elements.rebanaDrum.addEventListener('click', () => this.playDrumSound());
        this.elements.rebanaDrum.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.playDrumSound();
        });
        
        // Practice line buttons
        this.elements.practiceLineBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => this.practiceLine(index));
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.isPlaying ? this.stopPlayback() : this.startPlayback();
                    break;
                case 'KeyR':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.toggleRecording();
                    }
                    break;
                case 'KeyD':
                    // Toggle drone with 'D' key
                    this.elements.droneToggle.checked = !this.elements.droneToggle.checked;
                    this.toggleDrone(this.elements.droneToggle.checked);
                    break;
                case 'Digit1':
                    this.setMode('rhythm');
                    break;
                case 'Digit2':
                    this.setMode('vocal');
                    break;
                case 'Digit3':
                    this.setMode('combined');
                    break;
            }
        });
    }
    
    // Initialize Web Audio API with louder rebana tom sounds and drone functionality
    async initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create louder authentic rebana tom sounds
            this.createRebanaTomSounds();
            
            // Initialize drone functionality
            this.initializeDrone();
            
            // Initialize media recorder for recording functionality
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.mediaRecorder = new MediaRecorder(stream);
                this.setupMediaRecorder();
            }
        } catch (error) {
            console.warn('Audio initialization failed:', error);
            // Fallback to visual-only mode
        }
    }
    
    // Initialize drone pitch functionality
    initializeDrone() {
        if (!this.audioContext) return;
        
        // Create drone gain node for volume control
        this.droneGain = this.audioContext.createGain();
        this.droneGain.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.droneGain.connect(this.audioContext.destination);
    }
    
    // Toggle drone pitch on/off
    toggleDrone(isActive) {
        if (!this.audioContext || !this.droneGain) return;
        
        this.isDroneActive = isActive;
        
        if (isActive) {
            // Start drone
            this.droneOscillator = this.audioContext.createOscillator();
            this.droneOscillator.type = 'sine';
            this.droneOscillator.frequency.setValueAtTime(220, this.audioContext.currentTime); // A3 reference pitch
            
            // Connect to gain node
            this.droneOscillator.connect(this.droneGain);
            
            // Fade in drone
            this.droneGain.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.5);
            
            // Start oscillator
            this.droneOscillator.start();
            
            console.log('Drone pitch activated');
        } else {
            // Stop drone
            if (this.droneOscillator) {
                // Fade out drone
                this.droneGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5);
                
                // Stop oscillator after fade out
                setTimeout(() => {
                    if (this.droneOscillator) {
                        this.droneOscillator.stop();
                        this.droneOscillator = null;
                    }
                }, 500);
                
                console.log('Drone pitch deactivated');
            }
        }
    }
    
    // Create louder authentic rebana tom sounds using Web Audio API
    createRebanaTomSounds() {
        this.drumSounds = {
            // High tom for 'T' (Tak) - higher pitch, shorter decay, LOUDER
            tak: () => this.playTomSound({
                frequency: 180,        // Higher frequency for high tom
                decay: 0.3,           // Quick decay
                filterFreq: 800,      // Brighter filter
                volume: 0.8,          // INCREASED VOLUME from 0.4 to 0.8
                noiseAmount: 0.3      // Increased noise for more presence
            }),
            // Low tom for 'K' (Kah) - lower pitch, longer decay, LOUDER
            kah: () => this.playTomSound({
                frequency: 100,       // Lower frequency for low tom
                decay: 0.5,          // Longer decay
                filterFreq: 400,     // Darker filter
                volume: 0.9,         // INCREASED VOLUME from 0.5 to 0.9
                noiseAmount: 0.4     // Increased noise for deeper tom sound
            })
        };
    }
    
    // Play louder authentic tom sound with realistic characteristics
    playTomSound(params) {
        if (!this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        
        // Create oscillator for the fundamental tone
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        // Create noise for realistic tom texture
        const noiseBuffer = this.createNoiseBuffer(0.1);
        const noiseSource = this.audioContext.createBufferSource();
        const noiseGain = this.audioContext.createGain();
        const noiseFilter = this.audioContext.createBiquadFilter();
        
        // Setup oscillator (fundamental tone)
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(params.frequency, now);
        // Add pitch bend for realistic tom sound
        oscillator.frequency.exponentialRampToValueAtTime(params.frequency * 0.5, now + params.decay);
        
        // Setup filter for tone shaping
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(params.filterFreq, now);
        filter.Q.setValueAtTime(2, now);
        
        // Setup gain envelope with louder volume
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(params.volume, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + params.decay);
        
        // Setup noise component with increased presence
        noiseSource.buffer = noiseBuffer;
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(params.frequency * 2, now);
        noiseFilter.Q.setValueAtTime(1, now);
        
        noiseGain.gain.setValueAtTime(0, now);
        noiseGain.gain.linearRampToValueAtTime(params.noiseAmount, now + 0.005);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + params.decay * 0.3);
        
        // Connect audio nodes
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.audioContext.destination);
        
        // Start and stop
        oscillator.start(now);
        oscillator.stop(now + params.decay);
        
        noiseSource.start(now);
        noiseSource.stop(now + params.decay);
    }
    
    // Create noise buffer for realistic tom texture
    createNoiseBuffer(duration) {
        const sampleRate = this.audioContext.sampleRate;
        const length = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (length * 0.1));
        }
        
        return buffer;
    }
    
    // Setup media recorder for recording functionality
    setupMediaRecorder() {
        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                this.recordedChunks.push(event.data);
            }
        };
        
        this.mediaRecorder.onstop = () => {
            const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
            this.recordedChunks = [];
            
            // Create download link for recorded audio
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `wau-bulan-practice-${Date.now()}.webm`;
            a.click();
            
            // Update progress based on recording completion
            this.updateProgress('coordination', 10);
        };
    }
    
    // Set learning mode (rhythm, vocal, combined)
    setMode(mode) {
        this.currentMode = mode;
        
        // Update button states
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        this.elements[`${mode}ModeBtn`].classList.add('active');
        
        // Reset playback if currently playing
        if (this.isPlaying) {
            this.stopPlayback();
        }
        
        this.updateDisplay();
    }
    
    // Start playback with corrected 4/4 timing
    startPlayback() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.currentBeat = 0;
        
        // Calculate beat interval based on tempo (quarter note = 1 beat)
        const quarterNoteInterval = (60 / this.currentTempo) * 1000;
        
        // Use semiquaver intervals for precise timing (16 subdivisions per bar)
        const semiquaverInterval = quarterNoteInterval / 4;
        
        this.beatInterval = setInterval(() => {
            this.processBeat();
        }, semiquaverInterval);
        
        // Show metronome
        this.elements.metronome.classList.add('active');
        
        // Update UI
        this.elements.playBtn.style.display = 'none';
        this.elements.pauseBtn.style.display = 'inline-block';
        
        // Update progress
        this.updateProgress('rhythm', 5);
    }
    
    // Stop playback
    stopPlayback() {
        if (!this.isPlaying) return;
        
        this.isPlaying = false;
        
        if (this.beatInterval) {
            clearInterval(this.beatInterval);
            this.beatInterval = null;
        }
        
        // Hide metronome
        this.elements.metronome.classList.remove('active');
        
        // Reset visual indicators
        this.elements.patternBeats.forEach(beat => beat.classList.remove('active'));
        this.elements.lyricLines.forEach(line => line.classList.remove('active'));
        this.elements.rebanaDrum.classList.remove('playing');
        
        // Update UI
        this.elements.playBtn.style.display = 'inline-block';
        this.elements.pauseBtn.style.display = 'none';
    }
    
    // Process each beat during playback with corrected timing
    processBeat() {
        const semiquaverCount = this.currentBeat % 16; // 16 semiquavers per bar in 4/4
        
        // Find which pattern note should play at this timing
        const currentNote = this.rhythmPattern.find(note => note.timing === semiquaverCount);
        
        // Visual feedback for rhythm pattern
        this.elements.patternBeats.forEach((beat, index) => {
            const patternNote = this.rhythmPattern[index];
            beat.classList.toggle('active', patternNote && patternNote.timing === semiquaverCount);
        });
        
        // Metronome animation - emphasize main beats (every 4 semiquavers)
        const pendulum = document.querySelector('.metronome-pendulum');
        if (pendulum) {
            const isMainBeat = semiquaverCount % 4 === 0;
            pendulum.classList.toggle('tick', isMainBeat);
            pendulum.classList.toggle('tock', !isMainBeat);
        }
        
        // Play sounds based on mode and timing
        if (currentNote && (this.currentMode === 'rhythm' || this.currentMode === 'combined')) {
            this.playRhythmSound(currentNote.sound);
            this.animateDrum();
        }
        
        // Highlight lyrics based on timing
        if (this.currentMode === 'vocal' || this.currentMode === 'combined') {
            this.highlightLyrics(semiquaverCount);
        }
        
        this.currentBeat++;
        
        // Update progress periodically
        if (this.currentBeat % 16 === 0) { // Every bar
            this.updateProgress(this.currentMode, 2);
        }
    }
    
    // Play rhythm sound with louder authentic tom sounds
    playRhythmSound(sound) {
        if (this.drumSounds) {
            if (sound === 'T') {
                this.drumSounds.tak(); // High tom
            } else if (sound === 'K') {
                this.drumSounds.kah(); // Low tom
            }
        }
    }
    
    // Animate drum visual feedback
    animateDrum() {
        this.elements.rebanaDrum.classList.add('playing');
        setTimeout(() => {
            this.elements.rebanaDrum.classList.remove('playing');
        }, 200);
    }
    
    // Highlight lyrics based on beat timing
    highlightLyrics(semiquaverCount) {
        const lineIndex = Math.floor(this.currentBeat / 16) % this.lyrics.length;
        
        this.elements.lyricLines.forEach((line, index) => {
            line.classList.toggle('active', index === lineIndex);
        });
    }
    
    // Play drum sound on manual interaction
    playDrumSound() {
        if (this.drumSounds) {
            // Alternate between high and low tom sounds
            const sound = Math.random() > 0.5 ? 'tak' : 'kah';
            this.drumSounds[sound]();
        }
        
        this.animateDrum();
        this.updateProgress('rhythm', 1);
    }
    
    // Practice individual lyric line
    practiceLine(lineIndex) {
        this.currentLine = lineIndex;
        
        // Highlight the selected line
        this.elements.lyricLines.forEach((line, index) => {
            line.classList.toggle('active', index === lineIndex);
        });
        
        // Speak the line using Web Speech API if available
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(this.lyrics[lineIndex].malay);
            utterance.lang = 'ms-MY'; // Malay language
            utterance.rate = 0.8; // Slower for learning
            speechSynthesis.speak(utterance);
        }
        
        // Update progress
        this.updateProgress('vocal', 5);
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
            this.elements.lyricLines[lineIndex].classList.remove('active');
        }, 3000);
    }
    
    // Toggle recording functionality
    toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }
    
    // Start recording
    startRecording() {
        if (!this.mediaRecorder || this.mediaRecorder.state === 'recording') return;
        
        this.isRecording = true;
        this.mediaRecorder.start();
        
        // Show recording status
        this.elements.recordingStatus.style.display = 'flex';
        this.elements.recordBtn.textContent = '⏹ Stop Recording';
        this.elements.recordBtn.style.background = '#dc3545';
        
        // Auto-start playback for practice
        if (!this.isPlaying) {
            this.startPlayback();
        }
    }
    
    // Stop recording
    stopRecording() {
        if (!this.mediaRecorder || this.mediaRecorder.state !== 'recording') return;
        
        this.isRecording = false;
        this.mediaRecorder.stop();
        
        // Hide recording status
        this.elements.recordingStatus.style.display = 'none';
        this.elements.recordBtn.textContent = '🎤 Record';
        this.elements.recordBtn.style.background = '#28a745';
        
        // Update progress
        this.updateProgress('coordination', 15);
    }
    
    // Update progress tracking
    updateProgress(category, increment) {
        this.progress[category] = Math.min(100, this.progress[category] + increment);
        
        const progressElement = this.elements[`${category}Progress`];
        if (progressElement) {
            progressElement.style.width = `${this.progress[category]}%`;
        }
        
        // Check for completion milestones
        if (this.progress[category] >= 100) {
            this.showAchievement(`${category.charAt(0).toUpperCase() + category.slice(1)} Mastered!`);
        }
    }
    
    // Show achievement notification
    showAchievement(message) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.textContent = `🎉 ${message}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideDown 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Update display based on current state
    updateDisplay() {
        // Update mode-specific visibility
        const isRhythmMode = this.currentMode === 'rhythm' || this.currentMode === 'combined';
        const isVocalMode = this.currentMode === 'vocal' || this.currentMode === 'combined';
        
        // Show/hide relevant sections based on mode
        document.querySelector('.rebana-section').style.opacity = isRhythmMode ? '1' : '0.5';
        document.querySelector('.lyrics-section').style.opacity = isVocalMode ? '1' : '0.5';
    }
    
    // Handle window resize for responsive design
    handleResize() {
        // Adjust layout based on available space
        const container = document.querySelector('.main-container');
        const isSmallScreen = window.innerWidth < 768 || window.innerHeight < 500;
        
        if (isSmallScreen) {
            container.classList.add('compact-mode');
        } else {
            container.classList.remove('compact-mode');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new DikirBaratLearning();
    
    // Handle window resize
    window.addEventListener('resize', () => app.handleResize());
    app.handleResize(); // Initial call
    
    // Add CSS animation for achievement notifications and compact mode
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        .compact-mode .rebana-drum {
            width: 80px !important;
            height: 80px !important;
        }
        
        .compact-mode .beat.crotchet {
            width: 20px !important;
            height: 20px !important;
            font-size: 10px !important;
        }
        
        .compact-mode .beat.quaver {
            width: 16px !important;
            height: 16px !important;
            font-size: 8px !important;
        }
        
        .compact-mode .beat.semiquaver {
            width: 12px !important;
            height: 12px !important;
            font-size: 7px !important;
        }
        
        .compact-mode .malay-text {
            font-size: 13px !important;
        }
    `;
    document.head.appendChild(style);
});

// Service worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}