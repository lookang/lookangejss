// Virtual Synthesizer Workstation
// This script implements a complete synthesizer with oscillators, filters, ADSR envelope, LFO, and real-time visualization

class VirtualSynthesizer {
    constructor() {
        // Initialize Web Audio API context
        this.audioContext = null;
        this.isPlaying = false;
        this.currentNote = null;
        
        // Synthesis components
        this.oscillator = null;
        this.gainNode = null;
        this.filterNode = null;
        this.lfoOscillator = null;
        this.lfoGain = null;
        this.analyser = null;
        
        // Current settings
        this.settings = {
            waveform: 'sine',
            frequency: 440,
            filterType: 'lowpass',
            cutoff: 2000,
            resonance: 0,
            attack: 0.1,
            decay: 0.3,
            sustain: 0.5,
            release: 0.5,
            lfoRate: 2,
            lfoDepth: 0,
            lfoTarget: 'frequency',
            volume: 0.3
        };
        
        // Initialize the synthesizer
        this.init();
    }
    
    // Initialize all components and event listeners
    init() {
        this.setupEventListeners();
        this.updateDisplays();
        this.drawEnvelope();
        this.startVisualization();
    }
    
    // Initialize Web Audio API context (called when user first interacts)
    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.setupAudioNodes();
        }
        
        // Resume context if suspended (required by some browsers)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
    
    // Set up the audio processing chain
    setupAudioNodes() {
        // Create analyser for visualization
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.analyser.connect(this.audioContext.destination);
        
        // Create master gain node
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = this.settings.volume;
        this.masterGain.connect(this.analyser);
    }
    
    // Set up all event listeners for the interface
    setupEventListeners() {
        // Waveform selection buttons
        document.querySelectorAll('.wave-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.wave-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.settings.waveform = btn.dataset.wave;
                if (this.oscillator) {
                    this.oscillator.type = this.settings.waveform;
                }
            });
        });
        
        // Filter type selection buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.settings.filterType = btn.dataset.filter;
                if (this.filterNode) {
                    this.filterNode.type = this.settings.filterType;
                }
            });
        });
        
        // Frequency control
        const freqSlider = document.getElementById('frequency');
        freqSlider.addEventListener('input', (e) => {
            this.settings.frequency = parseFloat(e.target.value);
            document.getElementById('freq-display').textContent = `${this.settings.frequency} Hz`;
            if (this.oscillator) {
                this.oscillator.frequency.value = this.settings.frequency;
            }
        });
        
        // Filter controls
        const cutoffSlider = document.getElementById('cutoff');
        cutoffSlider.addEventListener('input', (e) => {
            this.settings.cutoff = parseFloat(e.target.value);
            document.getElementById('cutoff-display').textContent = `${this.settings.cutoff} Hz`;
            if (this.filterNode) {
                this.filterNode.frequency.value = this.settings.cutoff;
            }
        });
        
        const resonanceSlider = document.getElementById('resonance');
        resonanceSlider.addEventListener('input', (e) => {
            this.settings.resonance = parseFloat(e.target.value);
            document.getElementById('res-display').textContent = this.settings.resonance;
            if (this.filterNode) {
                this.filterNode.Q.value = this.settings.resonance;
            }
        });
        
        // ADSR envelope controls
        ['attack', 'decay', 'sustain', 'release'].forEach(param => {
            const slider = document.getElementById(param);
            slider.addEventListener('input', (e) => {
                this.settings[param] = parseFloat(e.target.value);
                const suffix = param === 'sustain' ? '' : 's';
                document.getElementById(`${param}-display`).textContent = `${this.settings[param]}${suffix}`;
                this.drawEnvelope();
            });
        });
        
        // LFO controls
        const lfoRateSlider = document.getElementById('lfo-rate');
        lfoRateSlider.addEventListener('input', (e) => {
            this.settings.lfoRate = parseFloat(e.target.value);
            document.getElementById('lfo-rate-display').textContent = `${this.settings.lfoRate} Hz`;
            if (this.lfoOscillator) {
                this.lfoOscillator.frequency.value = this.settings.lfoRate;
            }
        });
        
        const lfoDepthSlider = document.getElementById('lfo-depth');
        lfoDepthSlider.addEventListener('input', (e) => {
            this.settings.lfoDepth = parseFloat(e.target.value);
            document.getElementById('lfo-depth-display').textContent = this.settings.lfoDepth;
            this.updateLFORouting();
        });
        
        const lfoTargetSelect = document.getElementById('lfo-target');
        lfoTargetSelect.addEventListener('change', (e) => {
            this.settings.lfoTarget = e.target.value;
            this.updateLFORouting();
        });
        
        // Volume control
        const volumeSlider = document.getElementById('volume');
        volumeSlider.addEventListener('input', (e) => {
            this.settings.volume = parseFloat(e.target.value);
            document.getElementById('volume-display').textContent = `${Math.round(this.settings.volume * 100)}%`;
            if (this.masterGain) {
                this.masterGain.gain.value = this.settings.volume;
            }
        });
        
        // Play button
        const playBtn = document.getElementById('play-btn');
        playBtn.addEventListener('click', () => {
            this.initAudioContext();
            if (this.isPlaying) {
                this.stopNote();
            } else {
                this.playNote(this.settings.frequency);
            }
        });
        
        // Virtual keyboard
        document.querySelectorAll('.key').forEach(key => {
            key.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.initAudioContext();
                const freq = parseFloat(key.dataset.freq);
                this.playNote(freq);
                key.classList.add('active');
            });
            
            key.addEventListener('mouseup', (e) => {
                this.stopNote();
                key.classList.remove('active');
            });
            
            key.addEventListener('mouseleave', (e) => {
                key.classList.remove('active');
            });
            
            // Touch events for mobile
            key.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.initAudioContext();
                const freq = parseFloat(key.dataset.freq);
                this.playNote(freq);
                key.classList.add('active');
            });
            
            key.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.stopNote();
                key.classList.remove('active');
            });
        });
        
        // Tooltip system
        this.setupTooltips();
    }
    
    // Set up tooltip functionality
    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const text = element.dataset.tooltip;
                tooltip.textContent = text;
                tooltip.classList.add('show');
                
                // Position tooltip
                const rect = element.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                
                let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                let top = rect.top - tooltipRect.height - 10;
                
                // Keep tooltip within viewport
                if (left < 10) left = 10;
                if (left + tooltipRect.width > window.innerWidth - 10) {
                    left = window.innerWidth - tooltipRect.width - 10;
                }
                if (top < 10) top = rect.bottom + 10;
                
                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`;
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });
    }
    
    // Play a note with the current synthesizer settings
    playNote(frequency) {
        if (!this.audioContext) return;
        
        // Stop any currently playing note
        this.stopNote();
        
        // Create oscillator
        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.type = this.settings.waveform;
        this.oscillator.frequency.value = frequency;
        
        // Create filter
        this.filterNode = this.audioContext.createBiquadFilter();
        this.filterNode.type = this.settings.filterType;
        this.filterNode.frequency.value = this.settings.cutoff;
        this.filterNode.Q.value = this.settings.resonance;
        
        // Create gain node for ADSR envelope
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = 0;
        
        // Set up LFO if depth > 0
        if (this.settings.lfoDepth > 0) {
            this.setupLFO();
        }
        
        // Connect audio nodes
        this.oscillator.connect(this.filterNode);
        this.filterNode.connect(this.gainNode);
        this.gainNode.connect(this.masterGain);
        
        // Apply ADSR envelope
        const now = this.audioContext.currentTime;
        const attackTime = this.settings.attack;
        const decayTime = this.settings.decay;
        const sustainLevel = this.settings.sustain;
        
        // Attack phase
        this.gainNode.gain.setValueAtTime(0, now);
        this.gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
        
        // Decay phase
        this.gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
        
        // Start oscillator
        this.oscillator.start(now);
        if (this.lfoOscillator) {
            this.lfoOscillator.start(now);
        }
        
        this.isPlaying = true;
        this.currentNote = frequency;
        
        // Update UI
        document.getElementById('play-btn').textContent = 'STOP';
        document.getElementById('play-btn').classList.add('playing');
    }
    
    // Stop the currently playing note
    stopNote() {
        if (!this.oscillator || !this.audioContext) return;
        
        // Apply release envelope
        const now = this.audioContext.currentTime;
        const releaseTime = this.settings.release;
        
        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
        this.gainNode.gain.linearRampToValueAtTime(0, now + releaseTime);
        
        // Stop oscillator after release
        this.oscillator.stop(now + releaseTime);
        if (this.lfoOscillator) {
            this.lfoOscillator.stop(now + releaseTime);
        }
        
        // Clean up
        setTimeout(() => {
            this.oscillator = null;
            this.gainNode = null;
            this.filterNode = null;
            this.lfoOscillator = null;
            this.lfoGain = null;
        }, (releaseTime * 1000) + 100);
        
        this.isPlaying = false;
        this.currentNote = null;
        
        // Update UI
        document.getElementById('play-btn').textContent = 'PLAY';
        document.getElementById('play-btn').classList.remove('playing');
    }
    
    // Set up LFO (Low Frequency Oscillator) for modulation
    setupLFO() {
        this.lfoOscillator = this.audioContext.createOscillator();
        this.lfoOscillator.type = 'sine';
        this.lfoOscillator.frequency.value = this.settings.lfoRate;
        
        this.lfoGain = this.audioContext.createGain();
        this.lfoGain.gain.value = this.settings.lfoDepth;
        
        this.lfoOscillator.connect(this.lfoGain);
        this.updateLFORouting();
    }
    
    // Update LFO routing based on current target
    updateLFORouting() {
        if (!this.lfoGain || !this.oscillator) return;
        
        // Disconnect previous routing
        this.lfoGain.disconnect();
        
        // Set modulation depth
        this.lfoGain.gain.value = this.settings.lfoDepth;
        
        // Route to appropriate destination
        switch (this.settings.lfoTarget) {
            case 'frequency':
                if (this.oscillator) {
                    this.lfoGain.connect(this.oscillator.frequency);
                }
                break;
            case 'cutoff':
                if (this.filterNode) {
                    this.lfoGain.connect(this.filterNode.frequency);
                }
                break;
            case 'volume':
                if (this.gainNode) {
                    this.lfoGain.connect(this.gainNode.gain);
                }
                break;
        }
    }
    
    // Update all display values
    updateDisplays() {
        document.getElementById('freq-display').textContent = `${this.settings.frequency} Hz`;
        document.getElementById('cutoff-display').textContent = `${this.settings.cutoff} Hz`;
        document.getElementById('res-display').textContent = this.settings.resonance;
        document.getElementById('attack-display').textContent = `${this.settings.attack}s`;
        document.getElementById('decay-display').textContent = `${this.settings.decay}s`;
        document.getElementById('sustain-display').textContent = this.settings.sustain;
        document.getElementById('release-display').textContent = `${this.settings.release}s`;
        document.getElementById('lfo-rate-display').textContent = `${this.settings.lfoRate} Hz`;
        document.getElementById('lfo-depth-display').textContent = this.settings.lfoDepth;
        document.getElementById('volume-display').textContent = `${Math.round(this.settings.volume * 100)}%`;
    }
    
    // Draw ADSR envelope visualization
    drawEnvelope() {
        const canvas = document.getElementById('envelope-canvas');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set up drawing
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Calculate envelope points
        const width = canvas.width;
        const height = canvas.height;
        const totalTime = this.settings.attack + this.settings.decay + 0.5 + this.settings.release;
        
        const attackX = (this.settings.attack / totalTime) * width;
        const decayX = attackX + (this.settings.decay / totalTime) * width;
        const sustainX = decayX + (0.5 / totalTime) * width;
        const releaseX = width;
        
        const sustainY = height - (this.settings.sustain * height);
        
        // Draw envelope shape
        ctx.moveTo(0, height);
        ctx.lineTo(attackX, 0);
        ctx.lineTo(decayX, sustainY);
        ctx.lineTo(sustainX, sustainY);
        ctx.lineTo(releaseX, height);
        
        ctx.stroke();
        
        // Add labels
        ctx.fillStyle = '#00d4ff';
        ctx.font = '10px Arial';
        ctx.fillText('A', attackX/2 - 5, height - 5);
        ctx.fillText('D', (attackX + decayX)/2 - 5, height - 5);
        ctx.fillText('S', (decayX + sustainX)/2 - 5, height - 5);
        ctx.fillText('R', (sustainX + releaseX)/2 - 5, height - 5);
    }
    
    // Start waveform visualization
    startVisualization() {
        const canvas = document.getElementById('waveform-canvas');
        const ctx = canvas.getContext('2d');
        
        const draw = () => {
            requestAnimationFrame(draw);
            
            if (!this.analyser) {
                // Draw a flat line when no audio is playing
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = '#444';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);
                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.stroke();
                return;
            }
            
            // Get audio data
            const bufferLength = this.analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            this.analyser.getByteTimeDomainData(dataArray);
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw waveform
            ctx.strokeStyle = '#00d4ff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const sliceWidth = canvas.width / bufferLength;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = v * canvas.height / 2;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                
                x += sliceWidth;
            }
            
            ctx.stroke();
        };
        
        draw();
    }
}

// Initialize the synthesizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const synth = new VirtualSynthesizer();
    
    // Add keyboard shortcuts for better interaction
    document.addEventListener('keydown', (e) => {
        // Map computer keyboard to musical notes
        const keyMap = {
            'a': 261.63, // C4
            'w': 277.18, // C#4
            's': 293.66, // D4
            'e': 311.13, // D#4
            'd': 329.63, // E4
            'f': 349.23, // F4
            't': 369.99, // F#4
            'g': 392.00, // G4
            'y': 415.30, // G#4
            'h': 440.00, // A4
            'u': 466.16, // A#4
            'j': 493.88  // B4
        };
        
        if (keyMap[e.key.toLowerCase()] && !e.repeat) {
            synth.initAudioContext();
            synth.playNote(keyMap[e.key.toLowerCase()]);
        }
        
        // Space bar to play/stop
        if (e.code === 'Space') {
            e.preventDefault();
            document.getElementById('play-btn').click();
        }
    });
    
    document.addEventListener('keyup', (e) => {
        const keyMap = {
            'a': 261.63, 'w': 277.18, 's': 293.66, 'e': 311.13,
            'd': 329.63, 'f': 349.23, 't': 369.99, 'g': 392.00,
            'y': 415.30, 'h': 440.00, 'u': 466.16, 'j': 493.88
        };
        
        if (keyMap[e.key.toLowerCase()]) {
            synth.stopNote();
        }
    });
});