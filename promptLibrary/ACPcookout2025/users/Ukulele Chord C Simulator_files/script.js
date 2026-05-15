// Ukulele Chord C Simulator JavaScript
// This script handles the interactive functionality for learning ukulele chord C

class UkuleleSimulator {
    constructor() {
        // Initialize the simulator
        this.initializeElements();
        this.setupEventListeners();
        this.setupAudioContext();
        
        // Chord C fingering: 3rd fret on A string (bottom string, string 4)
        this.chordC = {
            name: 'C Major',
            fingering: [
                { string: 4, fret: 3 } // A string, 3rd fret
            ],
            frequencies: [261.63, 329.63, 392.00, 523.25] // C4, E4, G4, C5 approximation
        };
    }
    
    initializeElements() {
        // Get DOM elements
        this.chordButton = document.getElementById('chordC');
        this.chordNameDisplay = document.getElementById('chordName');
        this.fingerPositionDisplay = document.getElementById('fingerPosition');
        this.frets = document.querySelectorAll('.fret');
        
        // Initialize display
        this.clearFingering();
    }
    
    setupEventListeners() {
        // Add click/touch event listener to chord button
        this.chordButton.addEventListener('click', () => {
            this.playChordC();
        });
        
        // Add keyboard support for accessibility
        this.chordButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.playChordC();
            }
        });
    }
    
    setupAudioContext() {
        // Create audio context for generating ukulele sounds
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Web Audio API not supported');
            this.audioContext = null;
        }
    }
    
    playChordC() {
        // Main function to play chord C
        console.log('Playing Chord C');
        
        // Show visual fingering
        this.showFingering(this.chordC);
        
        // Play audio
        this.playChordAudio(this.chordC.frequencies);
        
        // Update display
        this.updateDisplay(this.chordC);
        
        // Add visual feedback to button
        this.animateButton();
    }
    
    showFingering(chord) {
        // Clear previous fingering
        this.clearFingering();
        
        // Show new fingering positions
        chord.fingering.forEach(position => {
            const fret = this.getFretElement(position.string, position.fret);
            if (fret) {
                fret.classList.add('active');
                
                // Add tooltip for finger position
                fret.title = `Place finger here - String ${position.string}, Fret ${position.fret}`;
            }
        });
    }
    
    clearFingering() {
        // Remove all active fingering indicators
        this.frets.forEach(fret => {
            fret.classList.remove('active');
            fret.title = '';
        });
    }
    
    getFretElement(stringNumber, fretNumber) {
        // Get specific fret element based on string and fret numbers
        const string = document.querySelector(`[data-string="${stringNumber}"]`);
        if (string) {
            return string.querySelector(`[data-fret="${fretNumber}"]`);
        }
        return null;
    }
    
    playChordAudio(frequencies) {
        // Generate and play ukulele-like chord sound
        if (!this.audioContext) {
            console.log('Audio context not available');
            return;
        }
        
        // Resume audio context if suspended (required by some browsers)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        const now = this.audioContext.currentTime;
        const duration = 2.0; // 2 seconds
        
        // Create oscillators for each note in the chord
        frequencies.forEach((frequency, index) => {
            this.createUkuleleNote(frequency, now, duration, index * 0.05);
        });
    }
    
    createUkuleleNote(frequency, startTime, duration, delay) {
        // Create a single ukulele-like note
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filterNode = this.audioContext.createBiquadFilter();
        
        // Configure oscillator for ukulele-like sound
        oscillator.type = 'sawtooth'; // Sawtooth wave for string-like timbre
        oscillator.frequency.setValueAtTime(frequency, startTime + delay);
        
        // Configure filter for warmer sound
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(2000, startTime + delay);
        filterNode.Q.setValueAtTime(1, startTime + delay);
        
        // Configure envelope (ADSR)
        const attackTime = 0.1;
        const decayTime = 0.3;
        const sustainLevel = 0.3;
        const releaseTime = 1.0;
        
        gainNode.gain.setValueAtTime(0, startTime + delay);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + delay + attackTime);
        gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + delay + attackTime + decayTime);
        gainNode.gain.setValueAtTime(sustainLevel, startTime + delay + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, startTime + delay + duration);
        
        // Connect audio nodes
        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Start and stop oscillator
        oscillator.start(startTime + delay);
        oscillator.stop(startTime + delay + duration);
    }
    
    updateDisplay(chord) {
        // Update the display with chord information
        this.chordNameDisplay.textContent = chord.name;
        
        // Create fingering description
        const fingeringText = chord.fingering.map(pos => 
            `String ${pos.string} (${this.getStringName(pos.string)}), Fret ${pos.fret}`
        ).join(', ');
        
        this.fingerPositionDisplay.textContent = `Fingering: ${fingeringText}`;
        
        // Clear display after 3 seconds
        setTimeout(() => {
            this.chordNameDisplay.textContent = '';
            this.fingerPositionDisplay.textContent = '';
            this.clearFingering();
        }, 3000);
    }
    
    getStringName(stringNumber) {
        // Convert string number to note name
        const stringNames = {
            1: 'G',
            2: 'C', 
            3: 'E',
            4: 'A'
        };
        return stringNames[stringNumber] || 'Unknown';
    }
    
    animateButton() {
        // Add visual feedback to button press
        this.chordButton.style.transform = 'scale(0.95)';
        this.chordButton.style.backgroundColor = '#5a67d8';
        
        setTimeout(() => {
            this.chordButton.style.transform = 'scale(1)';
            this.chordButton.style.backgroundColor = '';
        }, 150);
    }
}

// Initialize the simulator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Ukulele Chord C Simulator');
    const simulator = new UkuleleSimulator();
    
    // Add global error handling
    window.addEventListener('error', (e) => {
        console.error('Simulator error:', e.error);
    });
    
    // Handle visibility changes (for mobile optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && simulator.audioContext) {
            // Pause audio context when tab is hidden
            simulator.audioContext.suspend();
        }
    });
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UkuleleSimulator;
}