// Electromagnetic spectrum simulation - Interactive learning tool
// Implements cognitive load theory by providing clear visual feedback and progressive disclosure

class ElectromagneticSpectrumSimulator {
    constructor() {
        // Initialize DOM elements
        this.wavelengthSlider = document.getElementById('wavelengthSlider');
        this.frequencySlider = document.getElementById('frequencySlider');
        this.wavelengthValue = document.getElementById('wavelengthValue');
        this.frequencyValue = document.getElementById('frequencyValue');
        
        // Header elements - new additions for top display
        this.waveTypeHeader = document.getElementById('waveTypeHeader');
        this.wavelengthRangeHeader = document.getElementById('wavelengthRangeHeader');
        this.frequencyRangeHeader = document.getElementById('frequencyRangeHeader');
        
        this.applicationsList = document.getElementById('applicationsList');
        
        // NEW: Wave selection buttons
        this.waveButtons = document.querySelectorAll('.wave-btn');
        
        // Speed of light constant (m/s)
        this.SPEED_OF_LIGHT = 3e8;
        
        // Define electromagnetic spectrum data with Singapore curriculum alignment
        this.spectrumData = {
            radio: {
                name: 'Radio Waves',
                wavelengthRange: [1e-1, 1e3],
                frequencyRange: [3e5, 3e9],
                color: '#8B4513',
                applications: [
                    'Radio broadcasting',
                    'Television transmission',
                    'Mobile communications',
                    'WiFi and Bluetooth'
                ],
                position: 0,
                // NEW: Default values for quick selection
                defaultWavelength: 1e2, // 100 m
                defaultFrequency: 3e6   // 3 MHz
            },
            microwave: {
                name: 'Microwaves',
                wavelengthRange: [1e-3, 1e-1],
                frequencyRange: [3e9, 3e11],
                color: '#CD853F',
                applications: [
                    'Microwave ovens',
                    'Radar systems',
                    'Satellite communications',
                    'GPS navigation'
                ],
                position: 1,
                defaultWavelength: 1e-2, // 1 cm
                defaultFrequency: 3e10   // 30 GHz
            },
            infrared: {
                name: 'Infrared Radiation',
                wavelengthRange: [7e-7, 1e-3],
                frequencyRange: [3e11, 4.3e14],
                color: '#FF4500',
                applications: [
                    'Thermal imaging',
                    'Remote controls',
                    'Night vision devices',
                    'Heat therapy'
                ],
                position: 2,
                defaultWavelength: 1e-5, // 10 μm
                defaultFrequency: 3e13   // 30 THz
            },
            visible: {
                name: 'Visible Light',
                wavelengthRange: [380e-9, 700e-9],
                frequencyRange: [4.3e14, 7.9e14],
                color: 'linear-gradient(to right, #8B00FF, #4B0082, #0000FF, #00FF00, #FFFF00, #FFA500, #FF0000)',
                applications: [
                    'Human vision',
                    'Photography',
                    'Optical instruments',
                    'Photosynthesis'
                ],
                position: 3,
                defaultWavelength: 550e-9, // 550 nm (green light)
                defaultFrequency: 5.45e14  // ~545 THz
            },
            ultraviolet: {
                name: 'Ultraviolet Radiation',
                wavelengthRange: [10e-9, 380e-9],
                frequencyRange: [7.9e14, 3e16],
                color: '#9370DB',
                applications: [
                    'Sterilization',
                    'Vitamin D synthesis',
                    'Fluorescent lighting',
                    'Security marking'
                ],
                position: 4,
                defaultWavelength: 100e-9, // 100 nm
                defaultFrequency: 3e15     // 3 PHz
            },
            xray: {
                name: 'X-rays',
                wavelengthRange: [1e-11, 10e-9],
                frequencyRange: [3e16, 3e19],
                color: '#4169E1',
                applications: [
                    'Medical imaging',
                    'Airport security',
                    'Crystallography',
                    'Cancer treatment'
                ],
                position: 5,
                defaultWavelength: 1e-10, // 0.1 nm
                defaultFrequency: 3e18    // 3 EHz
            },
            gamma: {
                name: 'Gamma Rays',
                wavelengthRange: [1e-14, 1e-11],
                frequencyRange: [3e19, 3e22],
                color: '#191970',
                applications: [
                    'Cancer treatment',
                    'Nuclear medicine',
                    'Sterilization',
                    'Astronomy research'
                ],
                position: 6,
                defaultWavelength: 1e-12, // 1 pm
                defaultFrequency: 3e20    // 300 EHz
            }
        };
        
        this.isUpdating = false;
        this.currentWaveType = 'visible'; // Track current selection
        
        this.initializeEventListeners();
        this.updateDisplay();
    }
    
    // Initialize all event listeners for user interaction
    initializeEventListeners() {
        // Wavelength slider with debouncing for smooth performance
        this.wavelengthSlider.addEventListener('input', (e) => {
            if (!this.isUpdating) {
                this.isUpdating = true;
                const wavelength = Math.pow(10, parseFloat(e.target.value));
                const frequency = this.SPEED_OF_LIGHT / wavelength;
                this.updateFrequencySlider(frequency);
                this.updateDisplay();
                // NEW: Update active button based on current wavelength
                this.updateActiveButton(wavelength);
                setTimeout(() => { this.isUpdating = false; }, 50);
            }
        });
        
        // Frequency slider with reciprocal wavelength calculation
        this.frequencySlider.addEventListener('input', (e) => {
            if (!this.isUpdating) {
                this.isUpdating = true;
                const frequency = Math.pow(10, parseFloat(e.target.value));
                const wavelength = this.SPEED_OF_LIGHT / frequency;
                this.updateWavelengthSlider(wavelength);
                this.updateDisplay();
                // NEW: Update active button based on current wavelength
                this.updateActiveButton(wavelength);
                setTimeout(() => { this.isUpdating = false; }, 50);
            }
        });
        
        // NEW: Wave button event listeners
        this.waveButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const waveType = e.target.dataset.wave;
                this.selectWaveType(waveType);
            });
            
            // Add keyboard support for wave buttons
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const waveType = e.target.dataset.wave;
                    this.selectWaveType(waveType);
                }
            });
        });
        
        // Touch support for mobile devices
        this.addTouchSupport();
    }
    
    // NEW: Select specific wave type and update sliders accordingly
    selectWaveType(waveType) {
        if (!this.spectrumData[waveType]) return;
        
        this.currentWaveType = waveType;
        const waveData = this.spectrumData[waveType];
        
        // Update active button styling
        this.waveButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.wave === waveType) {
                btn.classList.add('active');
            }
        });
        
        // Set sliders to default values for this wave type
        this.isUpdating = true;
        
        const wavelength = waveData.defaultWavelength;
        const frequency = waveData.defaultFrequency;
        
        // Update slider positions
        const logWave = Math.log10(wavelength);
        const logFreq = Math.log10(frequency);
        
        this.wavelengthSlider.value = Math.max(-12, Math.min(3, logWave));
        this.frequencySlider.value = Math.max(5, Math.min(20, logFreq));
        
        // Update display
        this.updateDisplay();
        
        setTimeout(() => { this.isUpdating = false; }, 100);
    }
    
    // NEW: Update active button based on current wavelength
    updateActiveButton(wavelength) {
        const { key } = this.getCurrentRegion(wavelength);
        if (key !== this.currentWaveType) {
            this.currentWaveType = key;
            this.waveButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.wave === key) {
                    btn.classList.add('active');
                }
            });
        }
    }
    
    // Add touch support for better mobile interaction
    addTouchSupport() {
        const sliders = [this.wavelengthSlider, this.frequencySlider];
        
        sliders.forEach(slider => {
            slider.addEventListener('touchstart', (e) => {
                e.preventDefault();
                slider.focus();
            });
            
            slider.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = slider.getBoundingClientRect();
                const percent = (touch.clientX - rect.left) / rect.width;
                const min = parseFloat(slider.min);
                const max = parseFloat(slider.max);
                const value = min + (max - min) * percent;
                slider.value = Math.max(min, Math.min(max, value));
                slider.dispatchEvent(new Event('input'));
            });
        });
    }
    
    // Update frequency slider based on wavelength (maintaining c = λf relationship)
    updateFrequencySlider(frequency) {
        const logFreq = Math.log10(frequency);
        this.frequencySlider.value = Math.max(5, Math.min(20, logFreq));
    }
    
    // Update wavelength slider based on frequency
    updateWavelengthSlider(wavelength) {
        const logWave = Math.log10(wavelength);
        this.wavelengthSlider.value = Math.max(-12, Math.min(3, logWave));
    }
    
    // Format values with appropriate SI prefixes for educational clarity
    formatValue(value, unit) {
        const prefixes = [
            { factor: 1e12, symbol: 'T' },
            { factor: 1e9, symbol: 'G' },
            { factor: 1e6, symbol: 'M' },
            { factor: 1e3, symbol: 'k' },
            { factor: 1, symbol: '' },
            { factor: 1e-3, symbol: 'm' },
            { factor: 1e-6, symbol: 'μ' },
            { factor: 1e-9, symbol: 'n' },
            { factor: 1e-12, symbol: 'p' },
            { factor: 1e-15, symbol: 'f' }
        ];
        
        for (let prefix of prefixes) {
            if (Math.abs(value) >= prefix.factor) {
                const scaledValue = value / prefix.factor;
                if (scaledValue >= 100) {
                    return `${scaledValue.toFixed(0)} ${prefix.symbol}${unit}`;
                } else if (scaledValue >= 10) {
                    return `${scaledValue.toFixed(1)} ${prefix.symbol}${unit}`;
                } else {
                    return `${scaledValue.toFixed(2)} ${prefix.symbol}${unit}`;
                }
            }
        }
        
        return `${value.toExponential(2)} ${unit}`;
    }
    
    // Format frequency range for scientific notation display in header
    formatFrequencyRange(minFreq, maxFreq) {
        const formatScientific = (value) => {
            const exponent = Math.floor(Math.log10(value));
            const mantissa = value / Math.pow(10, exponent);
            return `${mantissa.toFixed(1)}×10${this.formatExponent(exponent)}`;
        };
        
        return `${formatScientific(minFreq)} - ${formatScientific(maxFreq)} Hz`;
    }
    
    // Format exponent with superscript characters
    formatExponent(exp) {
        const superscripts = {
            '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
            '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
            '-': '⁻'
        };
        
        return exp.toString().split('').map(char => superscripts[char] || char).join('');
    }
    
    // Determine which spectrum region the current values fall into
    getCurrentRegion(wavelength) {
        for (let [key, data] of Object.entries(this.spectrumData)) {
            if (wavelength >= data.wavelengthRange[0] && wavelength <= data.wavelengthRange[1]) {
                return { key, data };
            }
        }
        return { key: 'visible', data: this.spectrumData.visible };
    }
    
    // Main display update function - implements Mayer's coherence principle
    updateDisplay() {
        const wavelength = Math.pow(10, parseFloat(this.wavelengthSlider.value));
        const frequency = Math.pow(10, parseFloat(this.frequencySlider.value));
        
        // Update value displays with proper formatting
        this.wavelengthValue.textContent = this.formatValue(wavelength, 'm');
        this.frequencyValue.textContent = this.formatValue(frequency, 'Hz');
        
        // Get current region and update information
        const { key, data } = this.getCurrentRegion(wavelength);
        this.updateInformation(data);
    }
    
    // Update information panel and header with current wave type data
    updateInformation(regionData) {
        // Update header information - new functionality
        this.waveTypeHeader.textContent = regionData.name;
        
        // Format wavelength range for header display
        const minWave = this.formatValue(regionData.wavelengthRange[0], 'm');
        const maxWave = this.formatValue(regionData.wavelengthRange[1], 'm');
        this.wavelengthRangeHeader.textContent = `${minWave} - ${maxWave}`;
        
        // Format frequency range for header display
        this.frequencyRangeHeader.textContent = this.formatFrequencyRange(
            regionData.frequencyRange[0], 
            regionData.frequencyRange[1]
        );
        
        // Update applications list with smooth transition
        this.updateApplications(regionData.applications);
    }
    
    // Update applications with fade transition for better UX
    updateApplications(applications) {
        this.applicationsList.style.opacity = '0';
        
        setTimeout(() => {
            this.applicationsList.innerHTML = '';
            applications.forEach(app => {
                const appItem = document.createElement('div');
                appItem.className = 'app-item';
                appItem.textContent = app;
                this.applicationsList.appendChild(appItem);
            });
            this.applicationsList.style.opacity = '1';
        }, 150);
    }
}

// Initialize the simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if running in iframe for height adjustment
    if (window.self !== window.top) {
        document.body.classList.add('iframe-mode');
    }
    
    // Initialize the electromagnetic spectrum simulator
    const simulator = new ElectromagneticSpectrumSimulator();
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        const activeElement = document.activeElement;
        
        if (activeElement.classList.contains('slider')) {
            let step = 0.1;
            if (e.shiftKey) step = 1; // Larger steps with Shift
            if (e.ctrlKey) step = 0.01; // Smaller steps with Ctrl
            
            let currentValue = parseFloat(activeElement.value);
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                activeElement.value = Math.max(
                    parseFloat(activeElement.min),
                    currentValue - step
                );
                activeElement.dispatchEvent(new Event('input'));
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                activeElement.value = Math.min(
                    parseFloat(activeElement.max),
                    currentValue + step
                );
                activeElement.dispatchEvent(new Event('input'));
            }
        }
        
        // NEW: Keyboard shortcuts for wave type selection (1-7 keys)
        if (e.key >= '1' && e.key <= '7') {
            const waveTypes = ['radio', 'microwave', 'infrared', 'visible', 'ultraviolet', 'xray', 'gamma'];
            const index = parseInt(e.key) - 1;
            if (waveTypes[index]) {
                simulator.selectWaveType(waveTypes[index]);
            }
        }
    });
    
    // Add visual feedback for focus states (accessibility)
    const focusableElements = document.querySelectorAll('input, button');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #667eea';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});