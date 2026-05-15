// Recorder Fingering Simulator JavaScript
// Implements cognitive load theory and multimedia learning principles

class RecorderSimulator {
    constructor() {
        // Initialize audio context for sound generation
        this.audioContext = null;
        this.currentNote = null;
        
        // Fingering patterns for each note (1 = covered, 0 = open)
        // Based on standard recorder fingering chart
        this.fingeringPatterns = {
            'C': { thumb: 1, holes: [1, 1, 1, 1, 1, 1, 1] }, // All covered
            'D': { thumb: 1, holes: [1, 1, 1, 1, 1, 1, 0] }, // Leave bottom hole open
            'E': { thumb: 1, holes: [1, 1, 1, 1, 1, 0, 0] }, // Leave bottom two open
            'F': { thumb: 1, holes: [1, 1, 1, 1, 0, 0, 0] }, // Leave bottom three open
            'G': { thumb: 1, holes: [1, 1, 1, 0, 0, 0, 0] }, // Leave bottom four open
            'A': { thumb: 1, holes: [1, 1, 0, 0, 0, 0, 0] }, // Leave bottom five open
            'B': { thumb: 1, holes: [1, 0, 0, 0, 0, 0, 0] }, // Only thumb and first hole
            'C\'': { thumb: 0.5, holes: [1, 0, 0, 0, 0, 0, 0] } // Half-thumb technique for high C
        };
        
        // Staff positions for notes (in pixels from top)
        this.staffPositions = {
            'C': 85,   // Below staff
            'D': 75,   // Below staff
            'E': 65,   // On bottom line
            'F': 55,   // Between bottom lines
            'G': 45,   // On second line
            'A': 35,   // Between middle lines
            'B': 25,   // On third line
            'C\'': 15  // Above staff
        };
        
        this.initializeAudio();
        this.bindEvents();
        this.showWelcomeTooltip();
    }
    
    // Initialize Web Audio API for sound generation
    initializeAudio() {
        try {
            // Create audio context (handles browser compatibility)
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
            this.audioContext = null;
        }
    }
    
    // Bind all event listeners for interaction
    bindEvents() {
        // Note button clicks - primary interaction
        document.querySelectorAll('.note-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.playNote(e));
            // Add touch support for mobile devices
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.playNote(e);
            });
        });
        
        // Control button events
        document.getElementById('resetBtn').addEventListener('click', () => this.resetFingering());
        document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());
        
        // Modal close events
        document.querySelector('.close').addEventListener('click', () => this.closeHelp());
        document.getElementById('helpModal').addEventListener('click', (e) => {
            if (e.target.id === 'helpModal') this.closeHelp();
        });
        
        // Keyboard support for accessibility
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    // Main function to play note and show fingering
    playNote(event) {
        const button = event.target;
        const note = button.dataset.note;
        const frequency = parseFloat(button.dataset.frequency);
        
        // Visual feedback - highlight active button
        this.clearActiveButtons();
        button.classList.add('active');
        
        // Play the sound
        this.generateTone(frequency, 0.8); // 800ms duration
        
        // Show note on staff
        this.displayNoteOnStaff(note);
        
        // Show fingering pattern
        this.showFingering(note);
        
        // Store current note for reference
        this.currentNote = note;
        
        // Remove active state after animation
        setTimeout(() => {
            button.classList.remove('active');
        }, 600);
    }
    
    // Generate recorder-like tone using Web Audio API
    generateTone(frequency, duration) {
        if (!this.audioContext) {
            // Fallback: show visual feedback only
            this.showAudioFallback();
            return;
        }
        
        try {
            // Resume audio context if suspended (browser policy)
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            // Create oscillator for the fundamental frequency
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            // Set up recorder-like timbre (combination of sine and triangle waves)
            oscillator.type = 'triangle'; // Warmer than sine, less harsh than square
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            
            // Create envelope for natural sound (ADSR)
            const now = this.audioContext.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05); // Attack
            gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.1); // Decay
            gainNode.gain.setValueAtTime(0.2, now + duration - 0.1); // Sustain
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // Release
            
            // Connect audio nodes
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Start and stop the tone
            oscillator.start(now);
            oscillator.stop(now + duration);
            
        } catch (error) {
            console.warn('Audio generation failed:', error);
            this.showAudioFallback();
        }
    }
    
    // Visual feedback when audio is not available
    showAudioFallback() {
        const noteDisplay = document.getElementById('noteDisplay');
        noteDisplay.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            noteDisplay.style.animation = '';
        }, 600);
    }
    
    // Display note on musical staff
    displayNoteOnStaff(note) {
        const noteDisplay = document.getElementById('noteDisplay');
        
        // Clear previous note classes
        noteDisplay.className = 'note-display';
        
        // Set note content and position
        noteDisplay.textContent = '♪';
        noteDisplay.classList.add(note.replace('\'', '-high'));
        
        // Animate note appearance
        noteDisplay.style.transform = 'scale(0)';
        noteDisplay.style.opacity = '0';
        
        setTimeout(() => {
            noteDisplay.style.transform = 'scale(1)';
            noteDisplay.style.opacity = '1';
        }, 50);
    }
    
    // Show fingering pattern on recorder
    showFingering(note) {
        const pattern = this.fingeringPatterns[note];
        if (!pattern) return;
        
        // Handle thumb hole (back of recorder)
        const thumbHole = document.querySelector('#hole-thumb .hole-circle');
        if (pattern.thumb === 1) {
            thumbHole.classList.add('filled');
        } else if (pattern.thumb === 0.5) {
            // Half-hole technique for high notes
            thumbHole.style.background = 'linear-gradient(to bottom, #333 50%, #fff 50%)';
            thumbHole.classList.remove('filled');
        } else {
            thumbHole.classList.remove('filled');
            thumbHole.style.background = '#fff';
        }
        
        // Handle finger holes (0-6)
        pattern.holes.forEach((covered, index) => {
            const hole = document.querySelector(`#hole-${index} .hole-circle`);
            if (covered) {
                hole.classList.add('filled');
            } else {
                hole.classList.remove('filled');
            }
        });
        
        // Add visual feedback animation
        this.animateHoles();
    }
    
    // Animate hole changes for better visual feedback
    animateHoles() {
        const holes = document.querySelectorAll('.hole-circle');
        holes.forEach((hole, index) => {
            setTimeout(() => {
                hole.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    hole.style.transform = 'scale(1)';
                }, 150);
            }, index * 50);
        });
    }
    
    // Reset all fingerings to show clean recorder
    resetFingering() {
        // Clear all hole fillings
        document.querySelectorAll('.hole-circle').forEach(hole => {
            hole.classList.remove('filled');
            hole.style.background = '#fff';
        });
        
        // Clear note display
        const noteDisplay = document.getElementById('noteDisplay');
        noteDisplay.textContent = '';
        noteDisplay.className = 'note-display';
        
        // Clear active buttons
        this.clearActiveButtons();
        
        // Reset current note
        this.currentNote = null;
        
        // Visual feedback for reset action
        const resetBtn = document.getElementById('resetBtn');
        resetBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            resetBtn.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Clear active button states
    clearActiveButtons() {
        document.querySelectorAll('.note-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
    
    // Show help modal with fingering guide
    showHelp() {
        const modal = document.getElementById('helpModal');
        modal.style.display = 'block';
        
        // Focus management for accessibility
        modal.querySelector('.close').focus();
    }
    
    // Close help modal
    closeHelp() {
        const modal = document.getElementById('helpModal');
        modal.style.display = 'none';
    }
    
    // Keyboard navigation support
    handleKeyboard(event) {
        const key = event.key.toLowerCase();
        
        // Map keyboard keys to notes
        const keyMap = {
            'c': 'C',
            'd': 'D',
            'e': 'E',
            'f': 'F',
            'g': 'G',
            'a': 'A',
            'b': 'B',
            '8': 'C\'' // Use 8 for high C
        };
        
        if (keyMap[key]) {
            const button = document.querySelector(`[data-note="${keyMap[key]}"]`);
            if (button) {
                button.click();
            }
        }
        
        // Other keyboard shortcuts
        switch (key) {
            case 'r':
                this.resetFingering();
                break;
            case 'h':
                this.showHelp();
                break;
            case 'escape':
                this.closeHelp();
                break;
        }
    }
    
    // Show welcome tooltip on first load
    showWelcomeTooltip() {
        // Create temporary tooltip for first-time users
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            max-width: 300px;
            text-align: center;
        `;
        tooltip.textContent = 'Click any note to hear the recorder sound and see the fingering!';
        
        document.body.appendChild(tooltip);
        
        // Remove tooltip after 3 seconds or on first interaction
        const removeTooltip = () => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        };
        
        setTimeout(removeTooltip, 3000);
        document.addEventListener('click', removeTooltip, { once: true });
    }
}

// Initialize the simulator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if running in iframe and adjust height accordingly
    if (window.self !== window.top) {
        document.body.style.height = '450px';
    }
    
    // Create and start the simulator
    const simulator = new RecorderSimulator();
    
    // Add global error handling
    window.addEventListener('error', (e) => {
        console.warn('Simulator error:', e.error);
    });
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecorderSimulator;
}