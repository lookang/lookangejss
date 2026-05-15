// Interactive Lyrics Application for Primary 1 Students
// Implements cognitive load theory and multimedia learning principles

class InteractiveLyrics {
    constructor() {
        // Initialize application state
        this.flippedCards = new Set(); // Track which cards have been flipped
        this.audioContext = null; // For generating audio tones
        this.isPlaying = false; // Track audio playback state
        this.audioElement = null; // Reference to the HTML audio element
        
        this.init();
    }

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.setupAudio();
        this.addAccessibilityFeatures();
        console.log('Interactive Lyrics initialized for Primary 1 students');
    }

    // Set up all event listeners for interactive elements
    setupEventListeners() {
        // Add click listeners to all word-image elements
        const wordImages = document.querySelectorAll('.word-image');
        wordImages.forEach((element, index) => {
            // Mouse/touch events for flipping cards
            element.addEventListener('click', (e) => this.handleCardFlip(e, element));
            element.addEventListener('touchstart', (e) => this.handleCardFlip(e, element));
            
            // Keyboard accessibility
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleCardFlip(e, element);
                }
            });
            
            // Make elements focusable for keyboard navigation
            element.setAttribute('tabindex', '0');
            element.setAttribute('role', 'button');
            element.setAttribute('aria-label', `Click to reveal the word ${element.dataset.word} spelled out`);
        });

        // Play button event listeners
        const playButton = document.getElementById('playButton');
        playButton.addEventListener('click', () => this.handlePlaySong());
        playButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handlePlaySong();
            }
        });
    }

    // Handle card flip interaction with visual and audio feedback
    handleCardFlip(event, element) {
        event.preventDefault();
        
        const flipCard = element.querySelector('.flip-card');
        const word = element.dataset.word;
        const cardId = element.getAttribute('data-word') + '_' + Array.from(element.parentNode.children).indexOf(element);
        
        // Add haptic feedback for mobile devices
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Toggle flip state
        if (this.flippedCards.has(cardId)) {
            // Card is flipped, flip back to image
            flipCard.classList.remove('flipped');
            this.flippedCards.delete(cardId);
            element.setAttribute('aria-label', `Click to reveal the word ${word} spelled out`);
        } else {
            // Card shows image, flip to word
            flipCard.classList.add('flipped');
            this.flippedCards.add(cardId);
            element.setAttribute('aria-label', `Word revealed: ${word} spelled out. Click to show image again.`);
            
            // Modified: Trigger letter animation sequence for spelling out the word
            this.animateSpelledWord(element);
            
            // Play a success sound for positive reinforcement
            this.playSuccessSound();
        }
        
        // Add visual feedback
        this.addClickFeedback(element);
        
        console.log(`Card flipped: ${word}, Total flipped: ${this.flippedCards.size}`);
    }

    // Modified: New method to animate the spelled-out letters
    animateSpelledWord(element) {
        const letters = element.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            // Reset animation by removing and re-adding the animation class
            letter.style.animation = 'none';
            letter.offsetHeight; // Trigger reflow
            letter.style.animation = `letterPop 0.3s ease-out ${(index + 1) * 0.1}s both`;
        });
    }

    // Add visual feedback for interactions (Mayer's signaling principle)
    addClickFeedback(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }

    // Modified: Set up audio context and HTML audio element
    setupAudio() {
        try {
            // Create audio context for generating tones
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Audio context not supported:', error);
        }

        // Set up HTML audio element for playing the actual song
        this.audioElement = document.getElementById('songAudio');
        
        // Add event listeners for audio playback
        if (this.audioElement) {
            this.audioElement.addEventListener('ended', () => {
                this.stopSong();
            });
            
            this.audioElement.addEventListener('error', (e) => {
                console.log('Audio file could not be loaded, falling back to generated melody');
                // Fallback to generated melody if audio file fails
                this.playMelody();
            });
            
            this.audioElement.addEventListener('loadstart', () => {
                console.log('Loading audio file...');
            });
            
            this.audioElement.addEventListener('canplay', () => {
                console.log('Audio file ready to play');
            });
        }
    }

    // Play success sound when card is flipped (positive reinforcement)
    playSuccessSound() {
        if (!this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Create a pleasant chime sound
            oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1); // E5
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Error playing success sound:', error);
        }
    }

    // Modified: Handle play song button interaction with real audio file
    handlePlaySong() {
        const playButton = document.getElementById('playButton');
        
        if (this.isPlaying) {
            this.stopSong();
            return;
        }
        
        // Visual feedback for button press
        playButton.classList.add('playing');
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24" class="play-icon">
                <rect x="6" y="4" width="4" height="16" fill="white"/>
                <rect x="14" y="4" width="4" height="16" fill="white"/>
            </svg>
            <span>Playing...</span>
        `;
        
        this.isPlaying = true;
        
        // Try to play the actual audio file first
        if (this.audioElement && this.audioElement.src) {
            this.audioElement.play().then(() => {
                console.log('Playing audio file: You Are My Sunshine');
            }).catch((error) => {
                console.log('Could not play audio file, falling back to generated melody:', error);
                // Fallback to generated melody if audio file fails
                this.playMelody();
            });
        } else {
            // Fallback to generated melody
            this.playMelody();
        }
        
        console.log('Playing song: You Are My Sunshine');
    }

    // Play a simple melody representing "You Are My Sunshine" (fallback)
    playMelody() {
        if (!this.audioContext) {
            // Fallback: just show playing state for a few seconds
            setTimeout(() => this.stopSong(), 8000);
            return;
        }
        
        // Simple melody notes for "You Are My Sunshine" (first line)
        const melody = [
            { note: 261.63, duration: 0.5 }, // C4 - "You"
            { note: 293.66, duration: 0.5 }, // D4 - "are"
            { note: 329.63, duration: 0.5 }, // E4 - "my"
            { note: 392.00, duration: 1.0 }, // G4 - "sun-"
            { note: 349.23, duration: 0.5 }, // F4 - "shine"
            { note: 329.63, duration: 0.5 }, // E4 - "my"
            { note: 293.66, duration: 0.5 }, // D4 - "on-"
            { note: 261.63, duration: 1.5 }, // C4 - "ly"
            { note: 392.00, duration: 1.0 }, // G4 - "sun-"
            { note: 349.23, duration: 1.5 }  // F4 - "shine"
        ];
        
        let currentTime = this.audioContext.currentTime;
        
        melody.forEach((noteData, index) => {
            this.playNote(noteData.note, currentTime, noteData.duration);
            currentTime += noteData.duration;
        });
        
        // Stop playing after melody completes
        setTimeout(() => this.stopSong(), currentTime * 1000);
    }

    // Play a single note
    playNote(frequency, startTime, duration) {
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, startTime);
            oscillator.type = 'sine'; // Gentle sine wave for pleasant sound
            
            // Envelope for natural sound
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        } catch (error) {
            console.log('Error playing note:', error);
        }
    }

    // Modified: Stop song playback and reset button
    stopSong() {
        const playButton = document.getElementById('playButton');
        
        // Stop audio element if it's playing
        if (this.audioElement && !this.audioElement.paused) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        }
        
        playButton.classList.remove('playing');
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24" class="play-icon">
                <polygon points="5,3 19,12 5,21" fill="white"/>
            </svg>
            <span>Play Song</span>
        `;
        
        this.isPlaying = false;
        
        console.log('Song stopped');
    }

    // Modified: Add accessibility features for inclusive learning
    addAccessibilityFeatures() {
        // Add ARIA live region for screen readers
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-9999px';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
        
        // Add keyboard navigation instructions
        const instructions = document.createElement('div');
        instructions.setAttribute('role', 'region');
        instructions.setAttribute('aria-label', 'Instructions');
        instructions.style.position = 'absolute';
        instructions.style.left = '-9999px';
        instructions.innerHTML = 'Use Tab to navigate between images and the play button. Press Enter or Space to interact.';
        document.body.appendChild(instructions);
        
        // Modified: Announce when cards are flipped with spelling information
        const wordImages = document.querySelectorAll('.word-image');
        wordImages.forEach(element => {
            element.addEventListener('click', () => {
                const word = element.dataset.word;
                const liveRegion = document.getElementById('live-region');
                const letters = word.split('').join(', ');
                liveRegion.textContent = `Word revealed: ${word}, spelled ${letters}`;
            });
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create new instance of the interactive lyrics application
    const app = new InteractiveLyrics();
    
    // Add global error handling
    window.addEventListener('error', (event) => {
        console.error('Application error:', event.error);
    });
    
    // Handle audio context resume for mobile browsers
    document.addEventListener('touchstart', () => {
        if (app.audioContext && app.audioContext.state === 'suspended') {
            app.audioContext.resume();
        }
    }, { once: true });
    
    console.log('You Are My Sunshine - Interactive Lyrics loaded successfully');
});