// EDM Drum Sequencer - Educational Interactive Tool
// Implements step sequencing, audio synthesis, and real-time pattern manipulation

class EDMSequencer {
    constructor() {
        // Initialize audio context and core properties
        this.audioContext = null;
        this.isPlaying = false;
        this.currentStep = 0;
        this.tempo = 120;
        this.swing = 0;
        this.stepInterval = null;
        
        // Added master filter parameters
        this.masterFilter = {
            cutoff: 20000,
            resonance: 0
        };
        
        // Pattern data structure - tracks and their step states (added bass track)
        this.pattern = {
            kick: new Array(16).fill(false),
            snare: new Array(16).fill(false),
            hihat: new Array(16).fill(false),
            openhat: new Array(16).fill(false),
            clap: new Array(16).fill(false),
            crash: new Array(16).fill(false),
            bass: new Array(16).fill(false) // Added bass track
        };
        
        // Simplified audio parameters - removed individual filter settings (added bass track)
        this.trackParams = {
            kick: { volume: 0.8 },
            snare: { volume: 0.7 },
            hihat: { volume: 0.6 },
            openhat: { volume: 0.5 },
            clap: { volume: 0.65 },
            crash: { volume: 0.4 },
            bass: { volume: 0.75 } // Added bass track parameters
        };
        
        // Preset patterns for educational reference (updated with bass patterns)
        this.presets = {
            house: {
                kick: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
                snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
                hihat: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
                openhat: [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
                clap: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                crash: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                bass: [1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0] // Added bass pattern for house
            },
            techno: {
                kick: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
                snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
                hihat: [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                openhat: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
                clap: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                crash: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                bass: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0] // Added bass pattern for techno
            },
            breakbeat: {
                kick: [1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
                snare: [0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0],
                hihat: [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
                openhat: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                clap: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                crash: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                bass: [1,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0] // Added bass pattern for breakbeat
            },
            dubstep: {
                kick: [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
                snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
                hihat: [0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
                openhat: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                clap: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                crash: [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                bass: [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0] // Added bass pattern for dubstep
            }
        };
        
        this.init();
    }
    
    // Initialize the sequencer interface and event listeners
    async init() {
        try {
            // Initialize Web Audio API
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create step buttons for each track
            this.createStepButtons();
            
            // Set up event listeners for all controls
            this.setupEventListeners();
            
            // Initialize tooltip system
            this.setupTooltips();
            
            console.log('EDM Sequencer initialized successfully');
        } catch (error) {
            console.error('Failed to initialize sequencer:', error);
        }
    }
    
    // Create the 16-step button grid for each drum track (updated to include bass)
    createStepButtons() {
        const tracks = ['kick', 'snare', 'hihat', 'openhat', 'clap', 'crash', 'bass']; // Added bass track
        
        tracks.forEach(track => {
            const container = document.querySelector(`[data-track="${track}"]`);
            if (container) {
                // Clear existing buttons
                container.innerHTML = '';
                
                // Create 16 step buttons
                for (let i = 0; i < 16; i++) {
                    const button = document.createElement('button');
                    button.className = 'step-btn';
                    button.dataset.track = track;
                    button.dataset.step = i;
                    button.title = `${track.toUpperCase()} - Step ${i + 1}`;
                    
                    // Add click event for step programming
                    button.addEventListener('click', () => {
                        this.toggleStep(track, i);
                        this.updateStepButton(track, i);
                    });
                    
                    container.appendChild(button);
                }
            }
        });
    }
    
    // Set up all event listeners for controls
    setupEventListeners() {
        // Transport controls
        document.getElementById('playBtn').addEventListener('click', () => this.togglePlayback());
        document.getElementById('stopBtn').addEventListener('click', () => this.stop());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearPattern());
        document.getElementById('randomBtn').addEventListener('click', () => this.generateRandomPattern());
        
        // Tempo control
        const tempoSlider = document.getElementById('tempoSlider');
        tempoSlider.addEventListener('input', (e) => {
            this.tempo = parseInt(e.target.value);
            document.getElementById('tempoDisplay').textContent = this.tempo;
            if (this.isPlaying) {
                this.updateTempo();
            }
        });
        
        // Swing control
        const swingSlider = document.getElementById('swingSlider');
        swingSlider.addEventListener('input', (e) => {
            this.swing = parseInt(e.target.value);
            document.getElementById('swingDisplay').textContent = this.swing + '%';
        });
        
        // Added master filter controls
        const masterCutoffSlider = document.getElementById('masterCutoffSlider');
        masterCutoffSlider.addEventListener('input', (e) => {
            this.masterFilter.cutoff = parseFloat(e.target.value);
            // Update display with formatted value
            const value = this.masterFilter.cutoff;
            const display = value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value.toFixed(0);
            document.getElementById('cutoffDisplay').textContent = display;
        });
        
        const masterResonanceSlider = document.getElementById('masterResonanceSlider');
        masterResonanceSlider.addEventListener('input', (e) => {
            this.masterFilter.resonance = parseFloat(e.target.value);
            document.getElementById('resonanceDisplay').textContent = this.masterFilter.resonance.toFixed(0);
        });
        
        // Volume controls for each track (removed individual filter controls)
        this.setupTrackControls();
        
        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.target.dataset.preset;
                this.loadPreset(preset);
            });
        });
    }
    
    // Set up volume controls for each track (updated to include bass)
    setupTrackControls() {
        const tracks = ['kick', 'snare', 'hihat', 'openhat', 'clap', 'crash', 'bass']; // Added bass track
        
        tracks.forEach(track => {
            // Volume slider
            const volumeSlider = document.querySelector(`[data-track="${track}"].volume-slider`);
            if (volumeSlider) {
                volumeSlider.addEventListener('input', (e) => {
                    this.trackParams[track].volume = e.target.value / 100;
                });
            }
        });
    }
    
    // Set up tooltip system for educational information
    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        
        // Add tooltips to all elements with title attributes
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const title = e.target.getAttribute('title');
                if (title) {
                    tooltip.textContent = title;
                    tooltip.classList.add('show');
                    this.positionTooltip(e, tooltip);
                }
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
            
            element.addEventListener('mousemove', (e) => {
                if (tooltip.classList.contains('show')) {
                    this.positionTooltip(e, tooltip);
                }
            });
        });
    }
    
    // Position tooltip near cursor
    positionTooltip(event, tooltip) {
        const rect = document.querySelector('.sequencer-container').getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        tooltip.style.left = Math.min(x + 10, rect.width - tooltip.offsetWidth - 10) + 'px';
        tooltip.style.top = Math.max(y - tooltip.offsetHeight - 10, 10) + 'px';
    }
    
    // Toggle step on/off in pattern
    toggleStep(track, step) {
        this.pattern[track][step] = !this.pattern[track][step];
    }
    
    // Update visual state of step button
    updateStepButton(track, step) {
        const button = document.querySelector(`[data-track="${track}"][data-step="${step}"]`);
        if (button) {
            button.classList.toggle('active', this.pattern[track][step]);
        }
    }
    
    // Toggle playback state
    async togglePlayback() {
        if (!this.audioContext) return;
        
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
        
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    // Start pattern playback
    play() {
        this.isPlaying = true;
        document.getElementById('playBtn').classList.add('playing');
        document.getElementById('playBtn').textContent = '⏸';
        
        this.updateTempo();
    }
    
    // Pause playback
    pause() {
        this.isPlaying = false;
        document.getElementById('playBtn').classList.remove('playing');
        document.getElementById('playBtn').textContent = '▶';
        
        if (this.stepInterval) {
            clearInterval(this.stepInterval);
        }
    }
    
    // Stop playback and reset position
    stop() {
        this.pause();
        this.currentStep = 0;
        this.updateStepIndicator();
    }
    
    // Update tempo and restart interval if playing
    updateTempo() {
        if (this.stepInterval) {
            clearInterval(this.stepInterval);
        }
        
        if (this.isPlaying) {
            // Calculate step duration with swing
            const stepDuration = (60 / this.tempo / 4) * 1000; // 16th notes in milliseconds
            
            this.stepInterval = setInterval(() => {
                this.playStep();
                this.currentStep = (this.currentStep + 1) % 16;
                this.updateStepIndicator();
            }, stepDuration);
        }
    }
    
    // Play current step across all tracks (updated to include bass)
    playStep() {
        const tracks = ['kick', 'snare', 'hihat', 'openhat', 'clap', 'crash', 'bass']; // Added bass track
        
        tracks.forEach(track => {
            if (this.pattern[track][this.currentStep]) {
                this.playDrumSound(track);
                this.animateStepButton(track, this.currentStep);
            }
        });
    }
    
    // Animate step button when triggered
    animateStepButton(track, step) {
        const button = document.querySelector(`[data-track="${track}"][data-step="${step}"]`);
        if (button) {
            button.classList.add('playing');
            setTimeout(() => {
                button.classList.remove('playing');
            }, 100);
        }
    }
    
    // Update step position indicator
    updateStepIndicator() {
        document.querySelectorAll('.step-num').forEach((num, index) => {
            num.classList.toggle('active', index === this.currentStep);
        });
    }
    
    // Generate synthetic drum sounds using Web Audio API with master filter (added bass synthesis)
    playDrumSound(track) {
        if (!this.audioContext) return;
        
        const params = this.trackParams[track];
        const now = this.audioContext.currentTime;
        
        // Create audio nodes
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        // Use master filter instead of individual track filters
        const filter = this.audioContext.createBiquadFilter();
        const noiseBuffer = this.createNoiseBuffer();
        const noiseSource = this.audioContext.createBufferSource();
        
        // Configure master filter with current settings
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(this.masterFilter.cutoff, now);
        filter.Q.setValueAtTime(this.masterFilter.resonance, now);
        
        // Generate different sounds for each track (added bass synthesis)
        switch (track) {
            case 'kick':
                // Low frequency sine wave with quick decay
                oscillator.frequency.setValueAtTime(60, now);
                oscillator.frequency.exponentialRampToValueAtTime(30, now + 0.1);
                gainNode.gain.setValueAtTime(params.volume, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                break;
                
            case 'snare':
                // Mix of noise and tone
                noiseSource.buffer = noiseBuffer;
                oscillator.frequency.setValueAtTime(200, now);
                gainNode.gain.setValueAtTime(params.volume * 0.7, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                break;
                
            case 'hihat':
                // High frequency noise burst
                noiseSource.buffer = noiseBuffer;
                gainNode.gain.setValueAtTime(params.volume * 0.5, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                break;
                
            case 'openhat':
                // Longer high frequency noise
                noiseSource.buffer = noiseBuffer;
                gainNode.gain.setValueAtTime(params.volume * 0.4, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                break;
                
            case 'clap':
                // Multiple noise bursts
                noiseSource.buffer = noiseBuffer;
                gainNode.gain.setValueAtTime(params.volume * 0.6, now);
                gainNode.gain.setValueAtTime(0, now + 0.01);
                gainNode.gain.setValueAtTime(params.volume * 0.6, now + 0.02);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                break;
                
            case 'crash':
                // Wide frequency noise with long decay
                noiseSource.buffer = noiseBuffer;
                gainNode.gain.setValueAtTime(params.volume * 0.8, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
                break;
                
            case 'bass':
                // Added bass synthesis - low frequency sawtooth wave with filter sweep
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(55, now); // Low A note
                // Add slight frequency modulation for character
                oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.1);
                gainNode.gain.setValueAtTime(params.volume * 0.8, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                break;
        }
        
        // Connect audio graph through master filter (updated for bass)
        if (track === 'kick' || track === 'bass') {
            oscillator.connect(filter);
        } else {
            noiseSource.connect(filter);
            if (track === 'snare') {
                oscillator.connect(filter);
            }
        }
        
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Start and stop sounds (updated for bass)
        if (track === 'kick' || track === 'snare' || track === 'bass') {
            oscillator.start(now);
            oscillator.stop(now + (track === 'bass' ? 0.4 : 0.3));
        }
        
        if (track !== 'kick' && track !== 'bass') {
            noiseSource.start(now);
            noiseSource.stop(now + (track === 'crash' ? 1.0 : 0.2));
        }
    }
    
    // Create noise buffer for percussion sounds
    createNoiseBuffer() {
        const bufferSize = this.audioContext.sampleRate * 0.2;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        return buffer;
    }
    
    // Clear all steps in pattern (updated to include bass)
    clearPattern() {
        Object.keys(this.pattern).forEach(track => {
            this.pattern[track].fill(false);
            for (let i = 0; i < 16; i++) {
                this.updateStepButton(track, i);
            }
        });
    }
    
    // Generate random pattern for experimentation (updated to include bass)
    generateRandomPattern() {
        const tracks = ['kick', 'snare', 'hihat', 'openhat', 'clap', 'crash', 'bass']; // Added bass track
        const densities = { 
            kick: 0.3, 
            snare: 0.2, 
            hihat: 0.4, 
            openhat: 0.1, 
            clap: 0.1, 
            crash: 0.05,
            bass: 0.25 // Added bass density
        };
        
        tracks.forEach(track => {
            for (let i = 0; i < 16; i++) {
                this.pattern[track][i] = Math.random() < densities[track];
                this.updateStepButton(track, i);
            }
        });
    }
    
    // Load preset pattern (updated to include bass patterns)
    loadPreset(presetName) {
        if (this.presets[presetName]) {
            const preset = this.presets[presetName];
            
            Object.keys(preset).forEach(track => {
                for (let i = 0; i < 16; i++) {
                    this.pattern[track][i] = preset[track][i] === 1;
                    this.updateStepButton(track, i);
                }
            });
        }
    }
}

// Initialize sequencer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sequencer = new EDMSequencer();
});

// Handle audio context resume on user interaction (required by browsers)
document.addEventListener('click', async () => {
    if (window.sequencer && window.sequencer.audioContext && window.sequencer.audioContext.state === 'suspended') {
        await window.sequencer.audioContext.resume();
    }
}, { once: true });