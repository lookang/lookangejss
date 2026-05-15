// Enhanced Greenhouse Effect Simulation
// This script manages the interactive visualization of greenhouse gases and temperature changes

class GreenhouseSimulation {
    constructor() {
        // Initialize DOM elements
        this.earthContainer = document.getElementById('earth-container');
        this.earth = document.getElementById('earth');
        this.co2Slider = document.getElementById('co2-slider');
        this.ch4Slider = document.getElementById('ch4-slider');
        this.n2oSlider = document.getElementById('n2o-slider');
        this.co2Value = document.getElementById('co2-value');
        this.ch4Value = document.getElementById('ch4-value');
        this.n2oValue = document.getElementById('n2o-value');
        this.mercury = document.getElementById('mercury');
        this.tempDisplay = document.getElementById('temperature-display');
        this.resetBtn = document.getElementById('reset-btn');
        this.tooltip = document.getElementById('info-tooltip');
        this.mainContainer = document.getElementById('main-container');
        
        // Simulation parameters
        this.particles = [];
        this.baseTemperature = 15.0; // Pre-industrial global average temperature
        this.currentTemperature = 15.0;
        
        // Current atmospheric levels (2023 approximate values)
        this.currentLevels = {
            co2: 415,
            ch4: 1900,
            n2o: 335
        };
        
        // Initialize the simulation
        this.init();
    }
    
    init() {
        // Set up event listeners for sliders
        this.co2Slider.addEventListener('input', () => this.updateSimulation());
        this.ch4Slider.addEventListener('input', () => this.updateSimulation());
        this.n2oSlider.addEventListener('input', () => this.updateSimulation());
        
        // Reset button functionality
        this.resetBtn.addEventListener('click', () => this.resetToCurrentLevels());
        
        // Tooltip functionality for main container
        this.mainContainer.addEventListener('mouseenter', () => this.showTooltip());
        this.mainContainer.addEventListener('mouseleave', () => this.hideTooltip());
        
        // Touch support for mobile devices
        this.mainContainer.addEventListener('touchstart', () => this.showTooltip());
        this.mainContainer.addEventListener('touchend', () => {
            setTimeout(() => this.hideTooltip(), 3000); // Hide after 3 seconds on mobile
        });

        // Make the tooltip draggable (mouse + touch)
        this.makeTooltipDraggable();
        
        // Initial simulation update
        this.updateSimulation();
        
        // Start particle animation loop
        this.animateParticles();
    }
    
    // Update the entire simulation based on current slider values
    updateSimulation() {
        // Get current values from sliders
        const co2 = parseInt(this.co2Slider.value);
        const ch4 = parseInt(this.ch4Slider.value);
        const n2o = parseInt(this.n2oSlider.value);
        
        // Update display values
        this.co2Value.textContent = co2;
        this.ch4Value.textContent = ch4;
        this.n2oValue.textContent = n2o;
        
        // Calculate temperature change based on greenhouse gas concentrations
        this.calculateTemperature(co2, ch4, n2o);
        
        // Update visual elements
        this.updateParticles(co2, ch4, n2o);
        this.updateThermometer();
        this.updateAtmosphereEffect();
    }
    
    // Calculate global temperature based on greenhouse gas concentrations
    // Using simplified radiative forcing equations
    calculateTemperature(co2, ch4, n2o) {
        // Pre-industrial levels for reference
        const preCO2 = 280; // ppm
        const preCH4 = 700; // ppb
        const preN2O = 270; // ppb
        
        // Radiative forcing calculations (simplified)
        // CO2 forcing: 5.35 * ln(C/C0) W/m²
        const co2Forcing = co2 > 0 ? 5.35 * Math.log(co2 / preCO2) : 0;
        
        // CH4 forcing: 0.036 * (√C - √C0) W/m²
        const ch4Forcing = ch4 > 0 ? 0.036 * (Math.sqrt(ch4) - Math.sqrt(preCH4)) : 0;
        
        // N2O forcing: 0.12 * (√C - √C0) W/m²
        const n2oForcing = n2o > 0 ? 0.12 * (Math.sqrt(n2o) - Math.sqrt(preN2O)) : 0;
        
        // Total radiative forcing
        const totalForcing = co2Forcing + ch4Forcing + n2oForcing;
        
        // Convert to temperature change (climate sensitivity ~0.8°C per W/m²)
        const tempChange = totalForcing * 0.8;
        
        // Update current temperature
        this.currentTemperature = Math.max(this.baseTemperature + tempChange, 10); // Minimum 10°C
        this.currentTemperature = Math.min(this.currentTemperature, 25); // Maximum 25°C for display
    }
    
    // Update particle visualization based on gas concentrations
    updateParticles(co2, ch4, n2o) {
        // Clear existing particles
        this.clearParticles();
        
        // Calculate number of particles based on concentrations
        // Scale down for visual clarity
        const co2Particles = Math.floor(co2 / 50); // 1 particle per 50 ppm
        const ch4Particles = Math.floor(ch4 / 200); // 1 particle per 200 ppb
        const n2oParticles = Math.floor(n2o / 50); // 1 particle per 50 ppb
        
        // Create CO2 particles
        for (let i = 0; i < co2Particles; i++) {
            this.createParticle('co2');
        }
        
        // Create CH4 particles
        for (let i = 0; i < ch4Particles; i++) {
            this.createParticle('ch4');
        }
        
        // Create N2O particles
        for (let i = 0; i < n2oParticles; i++) {
            this.createParticle('n2o');
        }
    }
    
    // Create individual gas particle - Modified to position particles within the atmosphere ring
    createParticle(gasType) {
        const particle = document.createElement('div');
        particle.className = `gas-particle ${gasType}-particle`;
        
        // Get Earth's position and dimensions for accurate positioning
        const earthRect = this.earth.getBoundingClientRect();
        const containerRect = this.earthContainer.getBoundingClientRect();
        
        // Calculate Earth's center relative to the container
        const earthCenterX = (earthRect.left + earthRect.width / 2) - containerRect.left;
        const earthCenterY = (earthRect.top + earthRect.height / 2) - containerRect.top;
        
        // Define the atmosphere ring boundaries
        const earthRadius = 60; // Half of Earth's width (120px / 2)
        const atmosphereInnerRadius = earthRadius + 5; // Just outside Earth's surface
        const atmosphereOuterRadius = earthRadius + 15; // Within the atmosphere ring
        
        // Generate random position within the atmosphere ring
        const angle = Math.random() * 2 * Math.PI;
        const distance = atmosphereInnerRadius + Math.random() * (atmosphereOuterRadius - atmosphereInnerRadius);
        
        const x = earthCenterX + Math.cos(angle) * distance;
        const y = earthCenterY + Math.sin(angle) * distance;
        
        // Position particle relative to the Earth container
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Add random animation delay for more natural movement
        particle.style.animationDelay = Math.random() * 4 + 's';
        
        // Store particle's orbital properties for realistic atmospheric movement
        particle.dataset.angle = angle;
        particle.dataset.distance = distance;
        particle.dataset.speed = 0.5 + Math.random() * 1; // Random orbital speed
        
        this.earthContainer.appendChild(particle);
        this.particles.push(particle);
    }
    
    // Clear all particles from the display
    clearParticles() {
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.particles = [];
    }
    
    // Update thermometer display
    updateThermometer() {
        // Calculate mercury height (50% = 15°C baseline)
        const tempRange = 15; // Temperature range for display (10-25°C)
        const minTemp = 10;
        const maxTemp = 25;
        
        // Clamp temperature to display range
        const clampedTemp = Math.max(minTemp, Math.min(maxTemp, this.currentTemperature));
        
        // Calculate height percentage
        const heightPercent = ((clampedTemp - minTemp) / (maxTemp - minTemp)) * 100;
        
        // Update mercury height with smooth transition
        this.mercury.style.height = heightPercent + '%';
        
        // Update temperature display
        this.tempDisplay.textContent = this.currentTemperature.toFixed(1) + '°C';
        
        // Color code mercury based on temperature
        if (this.currentTemperature > 17) {
            this.mercury.style.background = 'linear-gradient(to top, #ff2222, #ff4444)';
        } else if (this.currentTemperature > 15) {
            this.mercury.style.background = 'linear-gradient(to top, #ff6644, #ff8866)';
        } else {
            this.mercury.style.background = 'linear-gradient(to top, #4444ff, #6666ff)';
        }
    }
    
    // Update atmosphere visual effects based on temperature
    updateAtmosphereEffect() {
        const atmosphere = document.getElementById('atmosphere');
        const tempIncrease = this.currentTemperature - this.baseTemperature;
        
        // Increase atmosphere opacity and glow with temperature
        const opacity = Math.min(0.6 + (tempIncrease * 0.1), 1.0);
        const glowIntensity = Math.min(10 + (tempIncrease * 5), 30);
        
        atmosphere.style.borderColor = `rgba(255, ${Math.max(100 - tempIncrease * 10, 0)}, 0, ${opacity})`;
        atmosphere.style.boxShadow = `0 0 ${glowIntensity}px rgba(255, ${Math.max(100 - tempIncrease * 10, 0)}, 0, ${opacity})`;
    }
    
    // Reset sliders to current atmospheric levels
    resetToCurrentLevels() {
        this.co2Slider.value = this.currentLevels.co2;
        this.ch4Slider.value = this.currentLevels.ch4;
        this.n2oSlider.value = this.currentLevels.n2o;
        
        // Add visual feedback for reset action
        this.resetBtn.style.background = '#45a049';
        setTimeout(() => {
            this.resetBtn.style.background = '#4CAF50';
        }, 200);
        
        this.updateSimulation();
    }
    
    // Show informational tooltip
    showTooltip() {
        this.tooltip.classList.remove('hidden');
    }
    
    // Hide informational tooltip
    hideTooltip() {
        this.tooltip.classList.add('hidden');
    }

    // Make the information tooltip draggable so users can view elements behind it
    makeTooltipDraggable() {
        const el = this.tooltip;
        const container = this.mainContainer;
        let dragging = false;
        let offsetX = 0, offsetY = 0;
        let containerRect;

        const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

        const startDrag = (clientX, clientY) => {
            containerRect = container.getBoundingClientRect();
            const rect = el.getBoundingClientRect();
            // Convert centered tooltip to absolute position relative to container
            el.style.transform = 'none';
            el.style.left = (rect.left - containerRect.left) + 'px';
            el.style.top = (rect.top - containerRect.top) + 'px';
            offsetX = clientX - rect.left;
            offsetY = clientY - rect.top;
            dragging = true;
            el.classList.add('dragging');
        };

        const updatePosition = (clientX, clientY) => {
            if (!dragging) return;
            const rect = el.getBoundingClientRect();
            const elW = rect.width;
            const elH = rect.height;
            let left = clientX - containerRect.left - offsetX;
            let top = clientY - containerRect.top - offsetY;
            left = clamp(left, 0, containerRect.width - elW);
            top = clamp(top, 0, containerRect.height - elH);
            el.style.left = left + 'px';
            el.style.top = top + 'px';
        };

        const endDrag = () => {
            if (!dragging) return;
            dragging = false;
            el.classList.remove('dragging');
        };

        // Mouse events
        const mouseMove = (e) => updatePosition(e.clientX, e.clientY);
        const mouseUp = () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            endDrag();
        };

        el.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startDrag(e.clientX, e.clientY);
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        });

        // Touch events
        const touchMove = (e) => {
            if (!dragging) return;
            const t = e.touches && e.touches[0];
            if (!t) return;
            e.preventDefault();
            updatePosition(t.clientX, t.clientY);
        };
        const touchEnd = () => {
            document.removeEventListener('touchmove', touchMove);
            document.removeEventListener('touchend', touchEnd);
            endDrag();
        };

        el.addEventListener('touchstart', (e) => {
            if (!e.touches || e.touches.length !== 1) return;
            const t = e.touches[0];
            startDrag(t.clientX, t.clientY);
            document.addEventListener('touchmove', touchMove, { passive: false });
            document.addEventListener('touchend', touchEnd);
        });
    }
    
    // Animate particles continuously - Modified for more realistic atmospheric circulation
    animateParticles() {
        // Create a more realistic orbital movement for particles within the atmosphere
        const animateOrbitalMovement = () => {
            this.particles.forEach(particle => {
                // Get current orbital properties
                let angle = parseFloat(particle.dataset.angle);
                const distance = parseFloat(particle.dataset.distance);
                const speed = parseFloat(particle.dataset.speed);
                
                // Update angle for orbital movement
                angle += speed * 0.01; // Slow orbital speed
                particle.dataset.angle = angle;
                
                // Calculate new position based on Earth's current position
                const earthRect = this.earth.getBoundingClientRect();
                const containerRect = this.earthContainer.getBoundingClientRect();
                
                const earthCenterX = (earthRect.left + earthRect.width / 2) - containerRect.left;
                const earthCenterY = (earthRect.top + earthRect.height / 2) - containerRect.top;
                
                // Calculate new particle position
                const x = earthCenterX + Math.cos(angle) * distance;
                const y = earthCenterY + Math.sin(angle) * distance;
                
                // Add slight vertical oscillation to simulate atmospheric turbulence
                const oscillation = Math.sin(angle * 3) * 2;
                
                particle.style.left = x + 'px';
                particle.style.top = (y + oscillation) + 'px';
            });
            
            // Continue animation
            requestAnimationFrame(animateOrbitalMovement);
        };
        
        // Start the orbital animation
        animateOrbitalMovement();
    }
}

// Initialize the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create and start the greenhouse effect simulation
    const simulation = new GreenhouseSimulation();
    
    // Add keyboard accessibility
    document.addEventListener('keydown', (event) => {
        // Allow keyboard control of sliders
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('slider')) {
            // Trigger simulation update on keyboard input
            setTimeout(() => simulation.updateSimulation(), 10);
        }
        
        // Reset with 'R' key
        if (event.key === 'r' || event.key === 'R') {
            simulation.resetToCurrentLevels();
        }
    });
    
    // Handle window resize for responsive design
    window.addEventListener('resize', () => {
        // Recalculate particle positions if needed
        simulation.updateSimulation();
    });
    
    // Performance optimization: reduce particle updates on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        // Reduce particle count for better performance on low-end devices
        const originalCreateParticle = simulation.createParticle;
        let particleCount = 0;
        
        simulation.createParticle = function(gasType) {
            if (particleCount % 2 === 0) { // Create every other particle
                originalCreateParticle.call(this, gasType);
            }
            particleCount++;
        };
    }
});
