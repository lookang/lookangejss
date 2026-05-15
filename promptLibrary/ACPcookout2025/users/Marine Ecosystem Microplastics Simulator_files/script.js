// Marine Ecosystem Microplastics Simulator
// Educational simulation for Secondary 3 students (Ages 14-15)

class EcosystemSimulator {
    constructor() {
        // Initialize simulation state
        this.isPlaying = false;
        this.speed = 1;
        this.time = 0;
        this.microplasticLevel = 245; // μg/L
        this.waterQuality = 80;
        this.marineLife = 65;
        this.biodiversity = 45;
        
        // Pollution sources (0-100%)
        this.industrialWaste = 30;
        this.plasticDebris = 45;
        this.textileFibers = 25;
        
        // Cleanup efforts (0-100%)
        this.oceanCleanup = 20;
        this.preventionPrograms = 15;
        
        // Chart data for visualization
        this.chartData = [];
        this.maxDataPoints = 50;
        
        // Animation and canvas setup
        this.canvas = document.getElementById('ecosystem-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.chartCanvas = document.getElementById('microplastic-chart');
        this.chartCtx = this.chartCanvas.getContext('2d');
        
        // Marine life entities for animation
        this.marineEntities = this.initializeMarineLife();
        this.microplasticParticles = [];
        
        // Initialize event listeners and UI
        this.initializeEventListeners();
        this.initializeChart();
        this.updateUI();
        this.animate();
    }
    
    // Initialize marine life entities for ecosystem visualization
    initializeMarineLife() {
        const entities = [];
        const types = [
            { type: 'fish', color: '#FFD700', size: 8, speed: 1 },
            { type: 'turtle', color: '#228B22', size: 12, speed: 0.5 },
            { type: 'coral', color: '#FF6347', size: 15, speed: 0 },
            { type: 'seaweed', color: '#32CD32', size: 10, speed: 0.2 }
        ];
        
        for (let i = 0; i < 20; i++) {
            const entityType = types[Math.floor(Math.random() * types.length)];
            entities.push({
                ...entityType,
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * entityType.speed,
                vy: (Math.random() - 0.5) * entityType.speed,
                health: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
                id: i
            });
        }
        return entities;
    }
    
    // Set up all event listeners for interactive elements
    initializeEventListeners() {
        // Time controls
        document.getElementById('play-pause').addEventListener('click', () => this.togglePlayPause());
        document.getElementById('reset').addEventListener('click', () => this.resetSimulation());
        document.getElementById('speed-slider').addEventListener('input', (e) => this.setSpeed(e.target.value));
        
        // Pollution source sliders
        document.getElementById('industrial-slider').addEventListener('input', (e) => {
            this.industrialWaste = parseInt(e.target.value);
            document.getElementById('industrial-value').textContent = `${e.target.value}%`;
        });
        
        document.getElementById('plastic-slider').addEventListener('input', (e) => {
            this.plasticDebris = parseInt(e.target.value);
            document.getElementById('plastic-value').textContent = `${e.target.value}%`;
        });
        
        document.getElementById('textile-slider').addEventListener('input', (e) => {
            this.textileFibers = parseInt(e.target.value);
            document.getElementById('textile-value').textContent = `${e.target.value}%`;
        });
        
        // Cleanup effort sliders
        document.getElementById('cleanup-slider').addEventListener('input', (e) => {
            this.oceanCleanup = parseInt(e.target.value);
            document.getElementById('cleanup-value').textContent = `${e.target.value}%`;
        });
        
        document.getElementById('prevention-slider').addEventListener('input', (e) => {
            this.preventionPrograms = parseInt(e.target.value);
            document.getElementById('prevention-value').textContent = `${e.target.value}%`;
        });
        
        // Help system
        document.getElementById('help-btn').addEventListener('click', () => this.showHelp());
        document.getElementById('help-close').addEventListener('click', () => this.hideHelp());
        
        // Alert system
        document.getElementById('alert-close').addEventListener('click', () => this.hideAlert());
        
        // Tooltip system for enhanced accessibility
        this.setupTooltips();
        
        // Keyboard accessibility
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    // Setup tooltip system for educational context
    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        const tooltipContent = document.getElementById('tooltip-content');
        
        // Add tooltips to various elements
        const tooltipElements = [
            { selector: '.indicator', content: 'Health indicators show the current state of different ecosystem components. Green is healthy, amber shows stress, red indicates critical conditions.' },
            { selector: '#microplastic-chart', content: 'This graph shows microplastic concentration over time. Higher levels indicate more pollution in the water.' },
            { selector: '.control-header', content: 'Use these controls to adjust pollution sources and cleanup efforts. Observe how your decisions affect the ecosystem.' }
        ];
        
        tooltipElements.forEach(({ selector, content }) => {
            document.querySelectorAll(selector).forEach(element => {
                element.addEventListener('mouseenter', (e) => {
                    tooltipContent.textContent = content;
                    tooltip.classList.remove('tooltip-hidden');
                    this.positionTooltip(e, tooltip);
                });
                
                element.addEventListener('mouseleave', () => {
                    tooltip.classList.add('tooltip-hidden');
                });
                
                element.addEventListener('mousemove', (e) => {
                    this.positionTooltip(e, tooltip);
                });
            });
        });
    }
    
    // Position tooltip near cursor
    positionTooltip(event, tooltip) {
        const rect = document.getElementById('main-container').getBoundingClientRect();
        const x = event.clientX - rect.left + 10;
        const y = event.clientY - rect.top - 10;
        
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    }
    
    // Handle keyboard navigation for accessibility
    handleKeyboard(event) {
        switch(event.key) {
            case ' ':
                event.preventDefault();
                this.togglePlayPause();
                break;
            case 'r':
                if (event.ctrlKey) {
                    event.preventDefault();
                    this.resetSimulation();
                }
                break;
            case 'h':
                this.showHelp();
                break;
            case 'Escape':
                this.hideHelp();
                this.hideAlert();
                break;
        }
    }
    
    // Initialize chart for data visualization
    initializeChart() {
        // Add initial data points
        for (let i = 0; i < 10; i++) {
            this.chartData.push({
                time: i,
                level: this.microplasticLevel + (Math.random() - 0.5) * 20
            });
        }
    }
    
    // Toggle play/pause state
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const button = document.getElementById('play-pause');
        button.textContent = this.isPlaying ? '⏸️ Pause' : '▶️ Play';
        button.classList.toggle('primary', !this.isPlaying);
        button.classList.toggle('secondary', this.isPlaying);
    }
    
    // Set simulation speed
    setSpeed(value) {
        this.speed = parseInt(value);
        document.getElementById('speed-value').textContent = `${value}x`;
    }
    
    // Reset simulation to initial state
    resetSimulation() {
        this.isPlaying = false;
        this.time = 0;
        this.microplasticLevel = 245;
        this.waterQuality = 80;
        this.marineLife = 65;
        this.biodiversity = 45;
        
        // Reset sliders to default values
        document.getElementById('industrial-slider').value = 30;
        document.getElementById('plastic-slider').value = 45;
        document.getElementById('textile-slider').value = 25;
        document.getElementById('cleanup-slider').value = 20;
        document.getElementById('prevention-slider').value = 15;
        
        // Update slider displays
        document.getElementById('industrial-value').textContent = '30%';
        document.getElementById('plastic-value').textContent = '45%';
        document.getElementById('textile-value').textContent = '25%';
        document.getElementById('cleanup-value').textContent = '20%';
        document.getElementById('prevention-value').textContent = '15%';
        
        // Reset UI
        document.getElementById('play-pause').textContent = '▶️ Play';
        document.getElementById('play-pause').classList.add('primary');
        document.getElementById('play-pause').classList.remove('secondary');
        
        // Reset chart data
        this.chartData = [];
        this.initializeChart();
        
        // Reinitialize marine life
        this.marineEntities = this.initializeMarineLife();
        this.microplasticParticles = [];
        
        this.updateUI();
    }
    
    // Show help modal
    showHelp() {
        document.getElementById('help-modal').classList.remove('modal-hidden');
    }
    
    // Hide help modal
    hideHelp() {
        document.getElementById('help-modal').classList.add('modal-hidden');
    }
    
    // Show alert for critical conditions
    showAlert(message) {
        document.getElementById('alert-text').textContent = message;
        document.getElementById('alert-system').classList.remove('alert-hidden');
    }
    
    // Hide alert
    hideAlert() {
        document.getElementById('alert-system').classList.add('alert-hidden');
    }
    
    // Update simulation state based on current parameters
    updateSimulation() {
        if (!this.isPlaying) return;
        
        // Calculate pollution input rate
        const totalPollution = (this.industrialWaste + this.plasticDebris + this.textileFibers) / 3;
        const totalCleanup = (this.oceanCleanup + this.preventionPrograms) / 2;
        
        // Update microplastic level based on inputs and cleanup
        const pollutionRate = (totalPollution / 100) * 2; // Max 2 μg/L per frame
        const cleanupRate = (totalCleanup / 100) * 1.5; // Max 1.5 μg/L per frame
        
        this.microplasticLevel += (pollutionRate - cleanupRate) * this.speed;
        this.microplasticLevel = Math.max(0, this.microplasticLevel);
        
        // Update ecosystem health based on microplastic levels
        this.updateEcosystemHealth();
        
        // Add microplastic particles for visualization
        if (Math.random() < pollutionRate / 10) {
            this.addMicroplasticParticle();
        }
        
        // Update marine life health
        this.updateMarineLife();
        
        // Update chart data
        this.updateChartData();
        
        // Check for critical conditions
        this.checkAlertConditions();
        
        this.time += this.speed;
    }
    
    // Update ecosystem health indicators based on microplastic levels
    updateEcosystemHealth() {
        // Water quality decreases with microplastic concentration
        this.waterQuality = Math.max(0, 100 - (this.microplasticLevel / 5));
        
        // Marine life health affected by water quality
        this.marineLife = Math.max(0, this.waterQuality * 0.8);
        
        // Biodiversity is most sensitive to pollution
        this.biodiversity = Math.max(0, this.waterQuality * 0.6);
    }
    
    // Add microplastic particle for visualization
    addMicroplasticParticle() {
        if (this.microplasticParticles.length < 100) {
            this.microplasticParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }
    
    // Update marine life entities based on ecosystem health
    updateMarineLife() {
        this.marineEntities.forEach(entity => {
            // Update health based on microplastic levels
            const healthImpact = this.microplasticLevel / 1000;
            entity.health = Math.max(0.1, entity.health - healthImpact * 0.001);
            
            // Update movement (affected by health)
            if (entity.type !== 'coral') {
                entity.x += entity.vx * entity.health;
                entity.y += entity.vy * entity.health;
                
                // Boundary wrapping
                if (entity.x < 0) entity.x = this.canvas.width;
                if (entity.x > this.canvas.width) entity.x = 0;
                if (entity.y < 0) entity.y = this.canvas.height;
                if (entity.y > this.canvas.height) entity.y = 0;
            }
        });
    }
    
    // Update chart data with current microplastic level
    updateChartData() {
        this.chartData.push({
            time: this.time,
            level: this.microplasticLevel
        });
        
        // Keep only recent data points
        if (this.chartData.length > this.maxDataPoints) {
            this.chartData.shift();
        }
    }
    
    // Check for conditions that trigger alerts
    checkAlertConditions() {
        if (this.microplasticLevel > 400 && this.time % 300 === 0) {
            this.showAlert('Critical microplastic levels detected! Marine life at severe risk.');
        } else if (this.biodiversity < 20 && this.time % 400 === 0) {
            this.showAlert('Biodiversity critically low! Ecosystem collapse imminent.');
        } else if (this.waterQuality < 30 && this.time % 350 === 0) {
            this.showAlert('Water quality severely degraded! Immediate action required.');
        }
    }
    
    // Update all UI elements with current simulation state
    updateUI() {
        // Update health indicators
        this.updateHealthIndicator('water-quality', this.waterQuality);
        this.updateHealthIndicator('marine-life', this.marineLife);
        this.updateHealthIndicator('biodiversity', this.biodiversity);
        
        // Update statistics
        document.getElementById('current-level').textContent = `${Math.round(this.microplasticLevel)} μg/L`;
        
        // Calculate affected species based on health levels
        const totalSpecies = 20;
        const affectedSpecies = Math.round(totalSpecies * (1 - (this.marineLife / 100)));
        document.getElementById('species-affected').textContent = `${affectedSpecies}/${totalSpecies}`;
        
        // Update ecosystem health status
        const healthElement = document.getElementById('ecosystem-health');
        if (this.biodiversity > 60) {
            healthElement.textContent = 'Healthy';
            healthElement.className = 'stat-value health-good';
        } else if (this.biodiversity > 30) {
            healthElement.textContent = 'Moderate';
            healthElement.className = 'stat-value health-moderate';
        } else {
            healthElement.textContent = 'Critical';
            healthElement.className = 'stat-value health-critical';
        }
    }
    
    // Update individual health indicator
    updateHealthIndicator(id, value) {
        const indicator = document.querySelector(`#${id} .indicator-fill`);
        indicator.style.width = `${value}%`;
        indicator.setAttribute('data-level', Math.round(value));
        
        // Update color based on value
        if (value > 60) {
            indicator.style.background = '#4CAF50';
        } else if (value > 30) {
            indicator.style.background = '#FF9800';
        } else {
            indicator.style.background = '#F44336';
        }
    }
    
    // Render ecosystem visualization
    renderEcosystem() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw water gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.5, '#4682B4');
        gradient.addColorStop(1, '#191970');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw microplastic particles
        this.microplasticParticles.forEach((particle, index) => {
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = '#FF4444';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Update particle position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Remove particles that drift off screen
            if (particle.x < -10 || particle.x > this.canvas.width + 10 ||
                particle.y < -10 || particle.y > this.canvas.height + 10) {
                this.microplasticParticles.splice(index, 1);
            }
        });
        
        this.ctx.globalAlpha = 1;
        
        // Draw marine life entities
        this.marineEntities.forEach(entity => {
            this.ctx.globalAlpha = entity.health;
            this.ctx.fillStyle = entity.color;
            
            if (entity.type === 'fish') {
                this.drawFish(entity.x, entity.y, entity.size);
            } else if (entity.type === 'turtle') {
                this.drawTurtle(entity.x, entity.y, entity.size);
            } else if (entity.type === 'coral') {
                this.drawCoral(entity.x, entity.y, entity.size);
            } else if (entity.type === 'seaweed') {
                this.drawSeaweed(entity.x, entity.y, entity.size);
            }
        });
        
        this.ctx.globalAlpha = 1;
    }
    
    // Draw fish entity
    drawFish(x, y, size) {
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, size, size * 0.6, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw tail
        this.ctx.beginPath();
        this.ctx.moveTo(x - size, y);
        this.ctx.lineTo(x - size * 1.5, y - size * 0.5);
        this.ctx.lineTo(x - size * 1.5, y + size * 0.5);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    // Draw turtle entity
    drawTurtle(x, y, size) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw shell pattern
        this.ctx.strokeStyle = this.ctx.fillStyle;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 0.7, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    // Draw coral entity
    drawCoral(x, y, size) {
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const branchX = x + Math.cos(angle) * size * 0.5;
            const branchY = y + Math.sin(angle) * size * 0.5;
            
            this.ctx.beginPath();
            this.ctx.arc(branchX, branchY, size * 0.3, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    // Draw seaweed entity
    drawSeaweed(x, y, size) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + size);
        this.ctx.quadraticCurveTo(x + size * 0.5, y, x, y - size);
        this.ctx.lineWidth = size * 0.3;
        this.ctx.strokeStyle = this.ctx.fillStyle;
        this.ctx.stroke();
    }
    
    // Render data visualization chart
    renderChart() {
        const ctx = this.chartCtx;
        const width = this.chartCanvas.width;
        const height = this.chartCanvas.height;
        
        // Clear chart
        ctx.clearRect(0, 0, width, height);
        
        // Draw background
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid lines
        ctx.strokeStyle = '#e9ecef';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Vertical grid lines
        for (let i = 0; i <= 10; i++) {
            const x = (width / 10) * i;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Draw chart data
        if (this.chartData.length > 1) {
            ctx.strokeStyle = '#2196F3';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const maxLevel = Math.max(500, Math.max(...this.chartData.map(d => d.level)));
            
            this.chartData.forEach((point, index) => {
                const x = (index / (this.chartData.length - 1)) * width;
                const y = height - (point.level / maxLevel) * height;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
            
            // Draw data points
            ctx.fillStyle = '#2196F3';
            this.chartData.forEach((point, index) => {
                const x = (index / (this.chartData.length - 1)) * width;
                const y = height - (point.level / maxLevel) * height;
                
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            });
        }
        
        // Draw axis labels
        ctx.fillStyle = '#666';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('0', 5, height - 5);
        ctx.textAlign = 'right';
        ctx.fillText('500+', width - 5, 15);
    }
    
    // Main animation loop
    animate() {
        this.updateSimulation();
        this.updateUI();
        this.renderEcosystem();
        this.renderChart();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Ensure canvas is properly sized
    const canvas = document.getElementById('ecosystem-canvas');
    const container = document.getElementById('ecosystem-display');
    
    function resizeCanvas() {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Start the simulation
    new EcosystemSimulator();
});

// Service worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}