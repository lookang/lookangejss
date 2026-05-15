// Ukulele Chord Simulator JavaScript
// This script handles chord visualization, audio synthesis, and user interactions

class UkuleleSimulator {
    constructor() {
        // Initialize audio context for chord synthesis
        this.audioContext = null;
        this.currentChord = null;
        
        // Chord definitions with finger positions and frequencies
        this.chords = {
            'C': {
                name: 'C Major',
                description: 'Place your finger on the 3rd fret of the E string (3rd string)',
                fingers: ['finger-c-3'],
                // Frequencies for C major chord (G-C-E-C from top string to bottom)
                frequencies: [392, 523, 659, 523]
            },
            'F': {
                name: 'F Major', 
                description: 'Place fingers on the 1st fret of both C string (2nd) and A string (4th)',
                fingers: ['finger-f-1', 'finger-f-2'],
                // Frequencies for F major chord (A-F-A-F)
                frequencies: [440, 349, 440, 349]
            },
            'Am': {
                name: 'A Minor',
                description: 'Place your finger on the 2nd fret of the A string (4th string)',
                fingers: ['finger-am-2'],
                // Frequencies for A minor chord (G-C-E-A)
                frequencies: [392, 523, 659, 440]
            }
        };
        
        this.init();
    }
    
    init() {
        // Initialize audio context when user first interacts
        this.setupEventListeners();
        this.updateChordDisplay('Select a chord', 'Tap a chord button to see fingering and hear the sound');
    }
    
    setupEventListeners() {
        // Add click/touch listeners to chord buttons
        const chordButtons = document.querySelectorAll('.chord-btn');
        chordButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleChordSelection(e));
            // Add touch support for mobile devices
            button.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevent double-tap zoom
                this.handleChordSelection(e);
            });
        });
        
        // Add listeners to finger positions for educational interaction
        const fingers = document.querySelectorAll('.finger');
        fingers.forEach(finger => {
            finger.addEventListener('click', () => this.playChordSound());
        });
    }
    
    async handleChordSelection(event) {
        // Initialize audio context on first user interaction (required by browsers)
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const button = event.currentTarget;
        const chordKey = button.dataset.chord;
        const chord = this.chords[chordKey];
        
        if (!chord) return;
        
        // Update visual state
        this.clearActiveStates();
        button.classList.add('active');
        this.currentChord = chordKey;
        
        // Show chord information
        this.updateChordDisplay(chord.name, chord.description);
        
        // Show finger positions with staggered animation
        this.showFingerPositions(chord.fingers);
        
        // Play chord sound
        await this.playChordSound();
        
        // Show strum effect
        this.showStrumEffect();
        
        // Remove button active state after animation
        setTimeout(() => {
            button.classList.remove('active');
        }, 600);
    }
    
    clearActiveStates() {
        // Remove active states from all elements
        document.querySelectorAll('.chord-btn.active').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.finger.active').forEach(finger => {
            finger.classList.remove('active');
        });
    }
    
    updateChordDisplay(name, description) {
        // Update chord information display
        document.getElementById('currentChord').textContent = name;
        document.getElementById('chordDescription').textContent = description;
    }
    
    showFingerPositions(fingerClasses) {
        // Show finger positions with staggered animation for better visual feedback
        fingerClasses.forEach((fingerClass, index) => {
            setTimeout(() => {
                const finger = document.querySelector(`.${fingerClass}`);
                if (finger) {
                    finger.classList.add('active');
                }
            }, index * 150); // Stagger animations by 150ms
        });
    }
    
    async playChordSound() {
        // Synthesize and play ukulele chord sound
        if (!this.audioContext || !this.currentChord) return;
        
        const chord = this.chords[this.currentChord];
        const duration = 1.5; // Sound duration in seconds
        const now = this.audioContext.currentTime;
        
        // Create oscillators for each string frequency
        chord.frequencies.forEach((frequency, index) => {
            this.createStringSound(frequency, now, duration, index);
        });
    }
    
    createStringSound(frequency, startTime, duration, stringIndex) {
        // Create realistic ukulele string sound using multiple oscillators
        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filterNode = this.audioContext.createBiquadFilter();
        
        // Configure oscillators for ukulele-like timbre
        oscillator1.type = 'sawtooth';
        oscillator1.frequency.setValueAtTime(frequency, startTime);
        
        oscillator2.type = 'triangle';
        oscillator2.frequency.setValueAtTime(frequency * 2.01, startTime); // Slight detune for richness
        
        // Configure filter for warmth
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(3000, startTime);
        filterNode.Q.setValueAtTime(1, startTime);
        
        // Configure envelope for plucked string attack
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3 / chord.frequencies.length, startTime + 0.01); // Quick attack
        gainNode.gain.exponentialRampToValueAtTime(0.1 / chord.frequencies.length, startTime + 0.1); // Decay
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration); // Sustain and release
        
        // Connect audio nodes
        oscillator1.connect(filterNode);
        oscillator2.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Start and stop oscillators
        oscillator1.start(startTime + stringIndex * 0.02); // Slight stagger for realistic strum
        oscillator2.start(startTime + stringIndex * 0.02);
        oscillator1.stop(startTime + duration);
        oscillator2.stop(startTime + duration);
    }
    
    showStrumEffect() {
        // Visual feedback for strumming action
        const strumEffect = document.getElementById('strumEffect');
        strumEffect.classList.add('active');
        
        setTimeout(() => {
            strumEffect.classList.remove('active');
        }, 800);
    }
}

// Initialize the simulator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UkuleleSimulator();
});

// Handle visibility changes to pause audio context when not visible (performance optimization)
document.addEventListener('visibilitychange', () => {
    if (window.ukuleleSimulator && window.ukuleleSimulator.audioContext) {
        if (document.hidden) {
            window.ukuleleSimulator.audioContext.suspend();
        } else {
            window.ukuleleSimulator.audioContext.resume();
        }
    }
});