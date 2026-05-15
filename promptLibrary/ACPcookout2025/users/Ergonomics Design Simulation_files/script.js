// Ergonomics Design Simulation - JavaScript Implementation
// This script handles the interactive simulation for testing ergonomic relationships

class ErgonomicsSimulation {
    constructor() {
        // Initialize simulation state
        this.currentProduct = 'chair';
        this.currentUser = 5; // 5th percentile
        this.zoomLevel = 1;
        this.testResults = [];
        
        // Anthropometric data for different percentiles (in cm)
        this.anthropometricData = {
            5: { height: 152, armReach: 65, legLength: 76, shoulderWidth: 36 },
            50: { height: 165, armReach: 72, legLength: 83, shoulderWidth: 42 },
            95: { height: 178, armReach: 79, legLength: 90, shoulderWidth: 48 }
        };
        
        // Current configuration values
        this.config = {
            chair: {
                seatHeight: 45,
                tableHeight: 75,
                backAngle: 105
            },
            tool: {
                gripDiameter: 3.5,
                toolLength: 15,
                weight: 200
            },
            control: {
                buttonSize: 12,
                panelDistance: 60,
                buttonSpacing: 20
            },
            device: {
                screenTilt: 15,
                screenDistance: 50,
                keyboardHeight: 3
            }
        };
        
        this.initializeEventListeners();
        this.updateVisualization();
        this.calculateComfortScore();
    }
    
    // Initialize all event listeners for interactive elements
    initializeEventListeners() {
        // Product selection buttons
        document.querySelectorAll('.product-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectProduct(e.target.closest('.product-btn').dataset.product);
            });
        });
        
        // User percentile selection
        document.querySelectorAll('.user-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectUser(parseInt(e.target.dataset.percentile));
            });
        });
        
        // Slider controls for chair setup
        this.initializeSliders();
        
        // Action buttons
        document.getElementById('testBtn').addEventListener('click', () => this.runTest());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetConfiguration());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHints());
        document.getElementById('compareBtn').addEventListener('click', () => this.compareUsers());
        
        // Zoom controls
        document.getElementById('zoomIn').addEventListener('click', () => this.adjustZoom(1.2));
        document.getElementById('zoomOut').addEventListener('click', () => this.adjustZoom(0.8));
        
        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        
        // Tooltip functionality
        this.initializeTooltips();
        
        // Window resize handler for responsive design
        window.addEventListener('resize', () => this.handleResize());
    }
    
    // Initialize slider controls with real-time updates
    initializeSliders() {
        const sliders = ['seatHeight', 'tableHeight', 'backAngle'];
        
        sliders.forEach(sliderId => {
            const slider = document.getElementById(sliderId);
            const valueDisplay = document.getElementById(sliderId + 'Value');
            
            if (slider && valueDisplay) {
                slider.addEventListener('input', (e) => {
                    const value = parseInt(e.target.value);
                    valueDisplay.textContent = value;
                    this.config.chair[sliderId] = value;
                    this.updateVisualization();
                    this.calculateComfortScore();
                });
            }
        });
    }
    
    // Handle product selection and update UI accordingly
    selectProduct(productType) {
        // Update active button state
        document.querySelectorAll('.product-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-product="${productType}"]`).classList.add('active');
        
        this.currentProduct = productType;
        this.updateControlsForProduct(productType);
        this.updateVisualization();
        this.calculateComfortScore();
    }
    
    // Update control panel based on selected product
    updateControlsForProduct(productType) {
        const controlsSection = document.getElementById('chairControls');
        
        // Clear existing controls
        controlsSection.innerHTML = '';
        
        switch(productType) {
            case 'chair':
                controlsSection.innerHTML = `
                    <div class="slider-container">
                        <label for="seatHeight">Seat Height: <span id="seatHeightValue">${this.config.chair.seatHeight}</span>cm</label>
                        <input type="range" id="seatHeight" min="35" max="55" value="${this.config.chair.seatHeight}" class="slider">
                    </div>
                    <div class="slider-container">
                        <label for="tableHeight">Table Height: <span id="tableHeightValue">${this.config.chair.tableHeight}</span>cm</label>
                        <input type="range" id="tableHeight" min="65" max="85" value="${this.config.chair.tableHeight}" class="slider">
                    </div>
                    <div class="slider-container">
                        <label for="backAngle">Back Angle: <span id="backAngleValue">${this.config.chair.backAngle}</span>°</label>
                        <input type="range" id="backAngle" min="90" max="120" value="${this.config.chair.backAngle}" class="slider">
                    </div>
                `;
                break;
            case 'tool':
                controlsSection.innerHTML = `
                    <div class="slider-container">
                        <label for="gripDiameter">Grip Diameter: <span id="gripDiameterValue">${this.config.tool.gripDiameter}</span>cm</label>
                        <input type="range" id="gripDiameter" min="2.5" max="5.0" step="0.1" value="${this.config.tool.gripDiameter}" class="slider">
                    </div>
                    <div class="slider-container">
                        <label for="toolLength">Tool Length: <span id="toolLengthValue">${this.config.tool.toolLength}</span>cm</label>
                        <input type="range" id="toolLength" min="10" max="25" value="${this.config.tool.toolLength}" class="slider">
                    </div>
                    <div class="slider-container">
                        <label for="weight">Weight: <span id="weightValue">${this.config.tool.weight}</span>g</label>
                        <input type="range" id="weight" min="100" max="500" value="${this.config.tool.weight}" class="slider">
                    </div>
                `;
                break;
            case 'control':
                controlsSection.innerHTML = `
                    <div class="slider-container">
                        <label for="buttonSize">Button Size: <span id="buttonSizeValue">${this.config.control.buttonSize}</span>mm</label>
                        <input type="range" id="buttonSize" min="8" max="20" value="${this.config.control.buttonSize}" class="slider">
                    </div>
                    <div class="slider-container">
                        <label for="panelDistance">Panel Distance: <span id="panelDistanceValue">${this.config.control.panelDistance}</span>cm</label>
                        <input type="range" id="panelDistance" min="40" max="80" value="${this.config.control.panelDistance}" class="slider">
                    </div>
                    <div class="slider-container">
                        <label for="buttonSpacing">Button Spacing: <span id="buttonSpacingValue">${this.config.control.buttonSpacing}</span>mm</label>
                        <input type="range" id="buttonSpacing" min="10" max="30" value="${this.config.control.buttonSpacing}" class="slider">
                    </div>
                `;
                break;
            case 'device':
                controlsSection.innerHTML = `
                    <div class="slider-container">
                        <label for="screenTilt">Screen Tilt: <span id="screenTiltValue">${this.config.device.screenTilt}</span>°</label>
                        <input type="range" id="screenTilt" min="0" max="30" value="${this.config.device.screenTilt}" class="slider">
                    </div>
                    <div class="slider-container">
                        <label for="screenDistance">Screen Distance: <span id="screenDistanceValue">${this.config.device.screenDistance}</span>cm</label>
                        <input type="range" id="screenDistance" min="40" max="70" value="${this.config.device.screenDistance}" class="slider">
                    </div>
                    <div class="slider-container">
                        <label for="keyboardHeight">Keyboard Height: <span id="keyboardHeightValue">${this.config.device.keyboardHeight}</span>cm</label>
                        <input type="range" id="keyboardHeight" min="1" max="6" value="${this.config.device.keyboardHeight}" class="slider">
                    </div>
                `;
                break;
        }
        
        // Reinitialize sliders for new product
        this.initializeSliders();
    }
    
    // Handle user percentile selection
    selectUser(percentile) {
        // Update active button state
        document.querySelectorAll('.user-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-percentile="${percentile}"]`).classList.add('active');
        
        this.currentUser = percentile;
        this.updateVisualization();
        this.calculateComfortScore();
    }
    
    // Update the visual representation based on current settings
    updateVisualization() {
        const humanFigure = document.getElementById('humanFigure');
        const productVisual = document.getElementById('productVisual');
        const userData = this.anthropometricData[this.currentUser];
        
        // Scale human figure based on percentile
        const scaleFactors = { 5: 0.85, 50: 1.0, 95: 1.15 };
        const scale = scaleFactors[this.currentUser];
        
        if (humanFigure) {
            humanFigure.style.transform = `scale(${scale})`;
        }
        
        // Update product visualization based on current product and settings
        this.updateProductVisualization();
        
        // Update stress indicators
        this.updateStressIndicators();
        
        // Update posture based on configuration
        this.updatePosture();
    }
    
    // Update product-specific visualization
    updateProductVisualization() {
        const productVisual = document.getElementById('productVisual');
        
        switch(this.currentProduct) {
            case 'chair':
                this.updateChairVisualization();
                break;
            case 'tool':
                this.updateToolVisualization();
                break;
            case 'control':
                this.updateControlVisualization();
                break;
            case 'device':
                this.updateDeviceVisualization();
                break;
        }
    }
    
    // Update chair and table visualization
    updateChairVisualization() {
        const chair = document.getElementById('chair');
        const table = document.getElementById('table');
        const chairBack = chair?.querySelector('.chair-back');
        
        if (chairBack) {
            // Adjust chair back angle
            const angle = this.config.chair.backAngle - 90; // Convert to rotation angle
            chairBack.style.transform = `rotate(${-angle}deg)`;
        }
        
        if (chair) {
            // Adjust chair height (visual representation)
            const heightOffset = (this.config.chair.seatHeight - 45) * 2; // Scale for visual effect
            chair.style.transform = `translateY(${-heightOffset}px)`;
        }
        
        if (table) {
            // Adjust table height
            const tableOffset = (this.config.chair.tableHeight - 75) * 1.5;
            table.style.transform = `translateY(${-tableOffset}px)`;
        }
    }
    
    // Update tool visualization (placeholder for future implementation)
    updateToolVisualization() {
        // Implementation for tool visualization would go here
        console.log('Updating tool visualization');
    }
    
    // Update control panel visualization (placeholder)
    updateControlVisualization() {
        // Implementation for control panel visualization would go here
        console.log('Updating control panel visualization');
    }
    
    // Update device interface visualization (placeholder)
    updateDeviceVisualization() {
        // Implementation for device visualization would go here
        console.log('Updating device visualization');
    }
    
    // Update stress indicators based on current configuration
    updateStressIndicators() {
        const stressPoints = ['neckStress', 'backStress', 'armStress'];
        const stressLevels = this.calculateStressLevels();
        
        stressPoints.forEach((pointId, index) => {
            const point = document.getElementById(pointId);
            if (point) {
                // Remove existing stress classes
                point.classList.remove('stress-low', 'stress-medium', 'stress-high');
                
                // Add appropriate stress level class
                const stressLevel = stressLevels[index];
                if (stressLevel < 30) {
                    point.classList.add('stress-low');
                } else if (stressLevel < 70) {
                    point.classList.add('stress-medium');
                } else {
                    point.classList.add('stress-high');
                }
            }
        });
    }
    
    // Calculate stress levels for different body parts
    calculateStressLevels() {
        const userData = this.anthropometricData[this.currentUser];
        let neckStress = 0, backStress = 0, armStress = 0;
        
        switch(this.currentProduct) {
            case 'chair':
                // Calculate stress based on chair configuration
                const seatHeight = this.config.chair.seatHeight;
                const tableHeight = this.config.chair.tableHeight;
                const backAngle = this.config.chair.backAngle;
                
                // Neck stress calculation (simplified)
                const optimalTableHeight = userData.height * 0.45;
                neckStress = Math.abs(tableHeight - optimalTableHeight) * 2;
                
                // Back stress calculation
                const optimalBackAngle = 105;
                backStress = Math.abs(backAngle - optimalBackAngle) * 1.5;
                
                // Arm stress calculation
                const elbowHeight = seatHeight + (userData.height * 0.15);
                armStress = Math.abs(tableHeight - elbowHeight) * 1.8;
                
                break;
            default:
                // Default stress levels for other products
                neckStress = Math.random() * 50;
                backStress = Math.random() * 50;
                armStress = Math.random() * 50;
        }
        
        return [
            Math.min(100, Math.max(0, neckStress)),
            Math.min(100, Math.max(0, backStress)),
            Math.min(100, Math.max(0, armStress))
        ];
    }
    
    // Update human figure posture based on configuration
    updatePosture() {
        const leftArm = document.getElementById('leftArm');
        const rightArm = document.getElementById('rightArm');
        
        if (this.currentProduct === 'chair') {
            const tableHeight = this.config.chair.tableHeight;
            const seatHeight = this.config.chair.seatHeight;
            const userData = this.anthropometricData[this.currentUser];
            
            // Calculate arm angle based on table height
            const elbowHeight = seatHeight + (userData.height * 0.15);
            const armAngle = Math.max(-30, Math.min(30, (tableHeight - elbowHeight) * 2));
            
            if (leftArm) leftArm.style.transform = `rotate(${armAngle}deg)`;
            if (rightArm) rightArm.style.transform = `rotate(${-armAngle}deg)`;
        }
    }
    
    // Calculate overall comfort score based on current configuration
    calculateComfortScore() {
        let score = 100;
        const stressLevels = this.calculateStressLevels();
        const userData = this.anthropometricData[this.currentUser];
        
        switch(this.currentProduct) {
            case 'chair':
                // Deduct points based on stress levels
                score -= stressLevels[0] * 0.3; // Neck stress
                score -= stressLevels[1] * 0.4; // Back stress
                score -= stressLevels[2] * 0.3; // Arm stress
                
                // Additional ergonomic checks
                const seatHeight = this.config.chair.seatHeight;
                const optimalSeatHeight = userData.legLength * 0.6;
                score -= Math.abs(seatHeight - optimalSeatHeight) * 2;
                
                break;
            default:
                // Basic scoring for other products
                score -= stressLevels.reduce((sum, stress) => sum + stress, 0) / 3;
        }
        
        score = Math.max(0, Math.min(100, Math.round(score)));
        
        // Update UI
        this.updateComfortScoreDisplay(score);
        this.updateErgonomicIndicators(score, stressLevels);
        
        return score;
    }
    
    // Update comfort score display in the UI
    updateComfortScoreDisplay(score) {
        const scoreValue = document.getElementById('comfortScore');
        const scoreFill = document.getElementById('scoreFill');
        
        if (scoreValue) {
            scoreValue.textContent = score;
        }
        
        if (scoreFill) {
            scoreFill.style.width = `${score}%`;
        }
    }
    
    // Update ergonomic indicators based on score and stress levels
    updateErgonomicIndicators(score, stressLevels) {
        const indicators = [
            { id: 'postureIndicator', value: 100 - stressLevels[1] },
            { id: 'reachIndicator', value: 100 - stressLevels[2] },
            { id: 'strainIndicator', value: 100 - stressLevels[0] }
        ];
        
        indicators.forEach(indicator => {
            const element = document.getElementById(indicator.id);
            const statusElement = element?.querySelector('.indicator-status');
            
            if (statusElement) {
                // Remove existing classes
                statusElement.classList.remove('good', 'moderate', 'poor');
                
                // Determine status based on value
                if (indicator.value >= 70) {
                    statusElement.classList.add('good');
                    statusElement.textContent = 'Good';
                } else if (indicator.value >= 40) {
                    statusElement.classList.add('moderate');
                    statusElement.textContent = 'Moderate';
                } else {
                    statusElement.classList.add('poor');
                    statusElement.textContent = 'Poor';
                }
            }
        });
    }
    
    // Run a test and record results
    runTest() {
        const score = this.calculateComfortScore();
        const stressLevels = this.calculateStressLevels();
        const userData = this.anthropometricData[this.currentUser];
        
        // Determine main issues
        const issues = [];
        if (stressLevels[0] > 50) issues.push('Neck strain');
        if (stressLevels[1] > 50) issues.push('Back stress');
        if (stressLevels[2] > 50) issues.push('Arm reach');
        
        const result = {
            userType: `${this.currentUser}th percentile`,
            product: this.currentProduct,
            score: score,
            issues: issues.length > 0 ? issues.join(', ') : 'None',
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.testResults.push(result);
        this.updateResultsTable();
        
        // Provide feedback animation
        this.showTestFeedback(score);
    }
    
    // Update the results table with test data
    updateResultsTable() {
        const tbody = document.getElementById('resultsBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        // Show last 5 results
        const recentResults = this.testResults.slice(-5);
        
        recentResults.forEach(result => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${result.userType}</td>
                <td>${result.score}</td>
                <td>${result.issues}</td>
            `;
        });
    }
    
    // Show visual feedback after test
    showTestFeedback(score) {
        const testBtn = document.getElementById('testBtn');
        const originalText = testBtn.textContent;
        
        // Change button appearance based on score
        if (score >= 80) {
            testBtn.style.background = '#28a745';
            testBtn.textContent = '✓ Excellent!';
        } else if (score >= 60) {
            testBtn.style.background = '#ffc107';
            testBtn.textContent = '⚠ Good';
        } else {
            testBtn.style.background = '#dc3545';
            testBtn.textContent = '✗ Needs Work';
        }
        
        // Reset after 2 seconds
        setTimeout(() => {
            testBtn.style.background = '';
            testBtn.textContent = originalText;
        }, 2000);
    }
    
    // Reset configuration to default values
    resetConfiguration() {
        // Reset config to defaults
        this.config = {
            chair: { seatHeight: 45, tableHeight: 75, backAngle: 105 },
            tool: { gripDiameter: 3.5, toolLength: 15, weight: 200 },
            control: { buttonSize: 12, panelDistance: 60, buttonSpacing: 20 },
            device: { screenTilt: 15, screenDistance: 50, keyboardHeight: 3 }
        };
        
        // Update sliders
        const sliders = document.querySelectorAll('.slider');
        sliders.forEach(slider => {
            const property = slider.id;
            if (this.config[this.currentProduct] && this.config[this.currentProduct][property] !== undefined) {
                slider.value = this.config[this.currentProduct][property];
                const valueDisplay = document.getElementById(property + 'Value');
                if (valueDisplay) {
                    valueDisplay.textContent = this.config[this.currentProduct][property];
                }
            }
        });
        
        // Update visualization
        this.updateVisualization();
        this.calculateComfortScore();
        
        // Show reset feedback
        const resetBtn = document.getElementById('resetBtn');
        const originalText = resetBtn.textContent;
        resetBtn.textContent = '↻ Reset!';
        setTimeout(() => {
            resetBtn.textContent = originalText;
        }, 1000);
    }
    
    // Show hints modal with ergonomic principles
    showHints() {
        const modal = document.getElementById('hintModal');
        const hintContent = document.getElementById('hintContent');
        
        // Update hint content based on current product
        let hints = '';
        
        switch(this.currentProduct) {
            case 'chair':
                hints = `
                    <p><strong>Chair Setup Guidelines:</strong></p>
                    <ul>
                        <li>Feet should rest flat on floor or footrest</li>
                        <li>Thighs parallel to floor (90-110° knee angle)</li>
                        <li>Back angle between 100-110° for comfort</li>
                        <li>Elbow angle 90-120° when typing</li>
                        <li>Screen top at or below eye level</li>
                    </ul>
                `;
                break;
            case 'tool':
                hints = `
                    <p><strong>Hand Tool Design:</strong></p>
                    <ul>
                        <li>Grip diameter: 3-4cm for power grip</li>
                        <li>Tool weight should not exceed 2.3kg</li>
                        <li>Avoid extreme wrist angles</li>
                        <li>Consider both left and right-handed users</li>
                    </ul>
                `;
                break;
            case 'control':
                hints = `
                    <p><strong>Control Panel Layout:</strong></p>
                    <ul>
                        <li>Button size minimum 12mm for finger operation</li>
                        <li>Frequently used controls within easy reach</li>
                        <li>Logical grouping and spacing</li>
                        <li>Consider visual and tactile feedback</li>
                    </ul>
                `;
                break;
            case 'device':
                hints = `
                    <p><strong>Device Interface:</strong></p>
                    <ul>
                        <li>Screen distance: 50-70cm from eyes</li>
                        <li>Screen tilt: 10-20° backward</li>
                        <li>Keyboard slope: 0-25°</li>
                        <li>Support wrists during typing</li>
                    </ul>
                `;
                break;
        }
        
        hints += `
            <p><strong>General Principles:</strong></p>
            <ul>
                <li>Design for 5th to 95th percentile coverage</li>
                <li>Provide adjustability for user diversity</li>
                <li>Minimize awkward postures and repetitive motions</li>
                <li>Consider user feedback and comfort</li>
            </ul>
        `;
        
        hintContent.innerHTML = hints;
        modal.style.display = 'block';
    }
    
    // Close the hints modal
    closeModal() {
        const modal = document.getElementById('hintModal');
        modal.style.display = 'none';
    }
    
    // Compare different user types
    compareUsers() {
        const compareBtn = document.getElementById('compareBtn');
        const originalText = compareBtn.textContent;
        
        // Run tests for all user types
        const currentUser = this.currentUser;
        const results = [];
        
        [5, 50, 95].forEach(percentile => {
            this.currentUser = percentile;
            this.updateVisualization();
            const score = this.calculateComfortScore();
            results.push({
                percentile: percentile,
                score: score
            });
        });
        
        // Restore original user
        this.currentUser = currentUser;
        this.selectUser(currentUser);
        
        // Show comparison results
        const bestScore = Math.max(...results.map(r => r.score));
        const worstScore = Math.min(...results.map(r => r.score));
        const coverage = results.filter(r => r.score >= 70).length;
        
        compareBtn.textContent = `Coverage: ${coverage}/3 users`;
        
        // Add results to table
        results.forEach(result => {
            this.testResults.push({
                userType: `${result.percentile}th percentile`,
                product: this.currentProduct,
                score: result.score,
                issues: result.score < 70 ? 'Ergonomic issues' : 'Good fit',
                timestamp: new Date().toLocaleTimeString()
            });
        });
        
        this.updateResultsTable();
        
        // Reset button text
        setTimeout(() => {
            compareBtn.textContent = originalText;
        }, 3000);
    }
    
    // Adjust zoom level for detailed view
    adjustZoom(factor) {
        this.zoomLevel *= factor;
        this.zoomLevel = Math.max(0.5, Math.min(2.0, this.zoomLevel));
        
        const humanModel = document.getElementById('humanModel');
        if (humanModel) {
            humanModel.style.transform = `scale(${this.zoomLevel})`;
        }
    }
    
    // Initialize tooltip functionality
    initializeTooltips() {
        const tooltip = document.getElementById('tooltip');
        
        // Add tooltip to elements with title attribute
        document.addEventListener('mouseover', (e) => {
            if (e.target.title) {
                tooltip.textContent = e.target.title;
                tooltip.classList.add('show');
                this.updateTooltipPosition(e);
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (tooltip.classList.contains('show')) {
                this.updateTooltipPosition(e);
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.title) {
                tooltip.classList.remove('show');
            }
        });
    }
    
    // Update tooltip position
    updateTooltipPosition(e) {
        const tooltip = document.getElementById('tooltip');
        const rect = document.querySelector('.main-container').getBoundingClientRect();
        
        let x = e.clientX - rect.left + 10;
        let y = e.clientY - rect.top - 30;
        
        // Keep tooltip within bounds
        if (x + tooltip.offsetWidth > rect.width) {
            x = e.clientX - rect.left - tooltip.offsetWidth - 10;
        }
        if (y < 0) {
            y = e.clientY - rect.top + 20;
        }
        
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }
    
    // Handle window resize for responsive design
    handleResize() {
        // Adjust layout for mobile if needed
        const container = document.querySelector('.main-container');
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            container.classList.add('mobile-layout');
        } else {
            container.classList.remove('mobile-layout');
        }
    }
}

// Initialize the simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const simulation = new ErgonomicsSimulation();
    
    // Handle modal clicks outside content
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('hintModal');
        if (e.target === modal) {
            simulation.closeModal();
        }
    });
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'Escape':
                simulation.closeModal();
                break;
            case 'r':
            case 'R':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    simulation.resetConfiguration();
                }
                break;
            case 't':
            case 'T':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    simulation.runTest();
                }
                break;
        }
    });
    
    console.log('Ergonomics Design Simulation initialized successfully');
});