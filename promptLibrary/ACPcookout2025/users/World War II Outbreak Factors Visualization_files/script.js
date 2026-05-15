// World War II Factors Visualization Script
// This script manages the interactive visualization of factors leading to WWII outbreak
// Modified to reflect Hitler's Aggressive Foreign Policy, Failure of Appeasement, and Nazi-Soviet Pact

class WWIIFactorsVisualization {
    constructor() {
        // Initialize factor data and weights - Updated factor names and descriptions
        this.factors = {
            trigger: { value: 85, weight: 0.4 },      // Nazi-Soviet Pact
            contributory: { value: 70, weight: 0.35 }, // Failure of Appeasement Policy
            underlying: { value: 60, weight: 0.25 }   // Hitler's Aggressive Foreign Policy
        };
        
        // Updated scenario templates for analysis with new factor context
        this.scenarios = {
            low: "With limited aggressive policies and effective diplomatic responses, war outbreak remains unlikely. International tensions exist but are manageable through negotiation.",
            moderate: "Moderate aggression with partial appeasement failure suggests growing tensions. War becomes possible but diplomatic solutions may still prevent conflict.",
            high: "High aggressive expansion with failed appeasement creates critical conditions. The Nazi-Soviet Pact makes war outbreak highly probable with multiple reinforcing diplomatic failures.",
            critical: "Critical alignment of Hitler's expansion, appeasement collapse, and the Nazi-Soviet Pact indicates imminent conflict. Historical precedent shows war is almost inevitable at these diplomatic levels."
        };
        
        this.init();
    }
    
    init() {
        this.bindEventListeners();
        this.updateVisualization();
        this.startPeriodicUpdates();
    }
    
    bindEventListeners() {
        // Slider event listeners for real-time updates
        const sliders = document.querySelectorAll('.factor-slider');
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                this.handleSliderChange(e);
            });
            
            // Add touch support for mobile devices
            slider.addEventListener('touchmove', (e) => {
                this.handleSliderChange(e);
            });
        });
        
        // Analyze button click handler
        const analyzeBtn = document.getElementById('analyze-impact');
        analyzeBtn.addEventListener('click', () => {
            this.performDetailedAnalysis();
        });
        
        // Add keyboard support for accessibility
        sliders.forEach(slider => {
            slider.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    setTimeout(() => this.handleSliderChange(e), 10);
                }
            });
        });
    }
    
    handleSliderChange(event) {
        const slider = event.target;
        const factorType = slider.getAttribute('data-factor');
        const value = parseInt(slider.value);
        
        // Update factor value
        this.factors[factorType].value = value;
        
        // Update slider value display
        const valueDisplay = slider.parentElement.querySelector('.slider-value');
        valueDisplay.textContent = `${value}%`;
        
        // Add visual feedback
        slider.style.background = `linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) ${value}%, rgba(255,255,255,0.3) ${value}%, rgba(255,255,255,0.3) 100%)`;
        
        // Update visualization in real-time
        this.updateVisualization();
        
        // Add haptic feedback for mobile devices
        if (navigator.vibrate && 'ontouchstart' in window) {
            navigator.vibrate(10);
        }
    }
    
    calculateWarProbability() {
        // Calculate weighted probability based on factor values and historical weights
        let totalProbability = 0;
        
        Object.keys(this.factors).forEach(factorType => {
            const factor = this.factors[factorType];
            totalProbability += (factor.value * factor.weight);
        });
        
        // Apply historical context modifiers - Updated for new factors
        const pactBonus = this.factors.trigger.value > 80 ? 10 : 0; // Nazi-Soviet Pact bonus
        const combinationBonus = this.calculateCombinationBonus();
        
        totalProbability = Math.min(100, totalProbability + pactBonus + combinationBonus);
        
        return Math.round(totalProbability);
    }
    
    calculateCombinationBonus() {
        // Bonus for high combinations of factors (historical synergy effect)
        const values = Object.values(this.factors).map(f => f.value);
        const average = values.reduce((a, b) => a + b, 0) / values.length;
        
        if (average > 75) return 8;
        if (average > 60) return 5;
        if (average > 45) return 2;
        return 0;
    }
    
    updateVisualization() {
        const probability = this.calculateWarProbability();
        
        // Update probability meter
        this.updateProbabilityMeter(probability);
        
        // Update timeline impacts
        this.updateTimelineImpacts();
        
        // Update impact chart
        this.updateImpactChart();
        
        // Update scenario analysis
        this.updateScenarioAnalysis(probability);
    }
    
    updateProbabilityMeter(probability) {
        const meterFill = document.getElementById('probability-fill');
        const meterText = document.getElementById('probability-text');
        
        // Animate meter fill
        meterFill.style.width = `${probability}%`;
        meterText.textContent = `${probability}%`;
        
        // Color coding based on probability level
        let gradient;
        if (probability < 30) {
            gradient = 'linear-gradient(90deg, #2ed573, #7bed9f)';
        } else if (probability < 60) {
            gradient = 'linear-gradient(90deg, #ffa502, #ff9f43)';
        } else {
            gradient = 'linear-gradient(90deg, #ff6348, #ff3838)';
        }
        
        meterFill.style.background = gradient;
        
        // Add pulsing effect for high probability
        if (probability > 80) {
            meterFill.style.animation = 'pulse 2s infinite';
        } else {
            meterFill.style.animation = 'none';
        }
    }
    
    updateTimelineImpacts() {
        // Update timeline item impacts with current factor values
        document.getElementById('underlying-impact').textContent = `${this.factors.underlying.value}%`;
        document.getElementById('contributory-impact').textContent = `${this.factors.contributory.value}%`;
        document.getElementById('trigger-impact').textContent = `${this.factors.trigger.value}%`;
        
        // Add visual emphasis for high-impact factors
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const factorTypes = ['underlying', 'contributory', 'trigger'];
            const factorValue = this.factors[factorTypes[index]].value;
            
            if (factorValue > 75) {
                item.style.background = 'rgba(255, 99, 71, 0.1)';
                item.style.borderLeft = '3px solid #ff6347';
            } else if (factorValue > 50) {
                item.style.background = 'rgba(255, 165, 0, 0.1)';
                item.style.borderLeft = '3px solid #ffa500';
            } else {
                item.style.background = 'transparent';
                item.style.borderLeft = 'none';
            }
        });
    }
    
    updateImpactChart() {
        // Update horizontal bar chart with current factor values
        const triggerBar = document.getElementById('trigger-bar-fill');
        const contributoryBar = document.getElementById('contributory-bar-fill');
        const underlyingBar = document.getElementById('underlying-bar-fill');
        
        // Animate bar widths
        triggerBar.style.width = `${this.factors.trigger.value}%`;
        contributoryBar.style.width = `${this.factors.contributory.value}%`;
        underlyingBar.style.width = `${this.factors.underlying.value}%`;
        
        // Add data labels on bars
        this.addBarLabels();
    }
    
    addBarLabels() {
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach((bar, index) => {
            const factorTypes = ['trigger', 'contributory', 'underlying'];
            const value = this.factors[factorTypes[index]].value;
            
            // Remove existing label
            const existingLabel = bar.querySelector('.bar-value-label');
            if (existingLabel) existingLabel.remove();
            
            // Add new label if bar is wide enough
            if (value > 20) {
                const label = document.createElement('div');
                label.className = 'bar-value-label';
                label.textContent = `${value}%`;
                label.style.cssText = `
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: white;
                    font-size: 11px;
                    font-weight: bold;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                `;
                bar.appendChild(label);
            }
        });
    }
    
    updateScenarioAnalysis(probability) {
        const scenarioText = document.getElementById('scenario-text');
        let scenario;
        
        // Determine scenario based on probability and factor combination
        if (probability < 25) {
            scenario = this.scenarios.low;
        } else if (probability < 50) {
            scenario = this.scenarios.moderate;
        } else if (probability < 80) {
            scenario = this.scenarios.high;
        } else {
            scenario = this.scenarios.critical;
        }
        
        // Add specific factor analysis - Updated for new factors
        const dominantFactor = this.getDominantFactor();
        const factorSpecificText = this.getFactorSpecificAnalysis(dominantFactor);
        
        scenarioText.innerHTML = `
            <div style="margin-bottom: 8px;">${scenario}</div>
            <div style="font-size: 11px; opacity: 0.8; font-style: italic;">
                Dominant factor: ${factorSpecificText}
            </div>
        `;
        
        // Add typewriter effect for new analysis
        this.animateTextReveal(scenarioText);
    }
    
    getDominantFactor() {
        let maxValue = 0;
        let dominantFactor = 'trigger';
        
        Object.keys(this.factors).forEach(factorType => {
            if (this.factors[factorType].value > maxValue) {
                maxValue = this.factors[factorType].value;
                dominantFactor = factorType;
            }
        });
        
        return dominantFactor;
    }
    
    getFactorSpecificAnalysis(dominantFactor) {
        // Updated analyses to reflect new factor names and their historical significance
        const analyses = {
            trigger: "The Nazi-Soviet Pact eliminates Germany's fear of a two-front war, making invasion of Poland inevitable.",
            contributory: "Failed appeasement policies embolden Hitler's expansion, demonstrating Western weakness and inability to stop aggression.",
            underlying: "Hitler's systematic aggressive foreign policy creates sustained international tension and territorial ambitions that cannot be satisfied peacefully."
        };
        
        return analyses[dominantFactor];
    }
    
    performDetailedAnalysis() {
        // Triggered by analyze button - provides comprehensive analysis
        const analyzeBtn = document.getElementById('analyze-impact');
        
        // Visual feedback
        analyzeBtn.style.background = 'linear-gradient(135deg, #2ed573, #7bed9f)';
        analyzeBtn.textContent = 'Analyzing...';
        
        // Simulate analysis delay for better UX
        setTimeout(() => {
            this.generateDetailedReport();
            
            // Reset button
            analyzeBtn.style.background = 'linear-gradient(135deg, #ff9ff3, #f368e0)';
            analyzeBtn.textContent = 'Analyze Combined Impact';
        }, 1500);
        
        // Add visual emphasis to all components during analysis
        this.highlightAnalysisComponents();
    }
    
    highlightAnalysisComponents() {
        const components = document.querySelectorAll('.probability-meter, .timeline-container, .impact-chart, .scenario-analysis');
        
        components.forEach((component, index) => {
            setTimeout(() => {
                component.style.transform = 'scale(1.02)';
                component.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                
                setTimeout(() => {
                    component.style.transform = 'scale(1)';
                    component.style.boxShadow = '';
                }, 300);
            }, index * 200);
        });
    }
    
    generateDetailedReport() {
        const probability = this.calculateWarProbability();
        const dominantFactor = this.getDominantFactor();
        
        // Create detailed analysis popup or update scenario section - Updated factor names
        const detailedAnalysis = `
            Current Analysis (${new Date().toLocaleTimeString()}):
            War Probability: ${probability}%
            Dominant Factor: ${this.getFactorDisplayName(dominantFactor)}
            
            Factor Breakdown:
            • Nazi-Soviet Pact: ${this.factors.trigger.value}% (Weight: 40%)
            • Appeasement Failure: ${this.factors.contributory.value}% (Weight: 35%)
            • Hitler's Aggression: ${this.factors.underlying.value}% (Weight: 25%)
            
            Historical Context: ${this.getHistoricalContext(probability)}
        `;
        
        // Update scenario analysis with detailed report
        const scenarioText = document.getElementById('scenario-text');
        scenarioText.innerHTML = `<pre style="font-family: inherit; white-space: pre-wrap; font-size: 11px; line-height: 1.4;">${detailedAnalysis}</pre>`;
    }
    
    // Helper method to get display names for factors
    getFactorDisplayName(factorType) {
        const displayNames = {
            trigger: 'Nazi-Soviet Pact',
            contributory: 'Appeasement Policy Failure', 
            underlying: 'Hitler\'s Aggressive Foreign Policy'
        };
        return displayNames[factorType] || factorType;
    }
    
    getHistoricalContext(probability) {
        // Updated historical context to reflect new factors
        if (probability > 80) {
            return "Similar diplomatic conditions in August 1939 led to actual war outbreak within days of the Nazi-Soviet Pact signing.";
        } else if (probability > 60) {
            return "Comparable to tensions during the Munich Crisis of 1938 when appeasement temporarily delayed conflict.";
        } else if (probability > 40) {
            return "Resembles the period of 1936-1937 when Hitler's early aggressive moves were met with limited Western response.";
        } else {
            return "Similar to the early 1930s when Hitler's foreign policy ambitions were still developing and containable.";
        }
    }
    
    animateTextReveal(element) {
        // Simple fade-in animation for text updates
        element.style.opacity = '0.5';
        element.style.transform = 'translateY(5px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.3s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }
    
    startPeriodicUpdates() {
        // Periodic updates for dynamic elements (optional enhancement)
        setInterval(() => {
            // Add subtle animations or data refreshes if needed
            this.addSubtleAnimations();
        }, 5000);
    }
    
    addSubtleAnimations() {
        // Add breathing effect to high-probability elements
        const probability = this.calculateWarProbability();
        
        if (probability > 75) {
            const meterFill = document.getElementById('probability-fill');
            meterFill.style.animation = 'pulse 3s ease-in-out infinite';
        }
    }
}

// CSS Animation definitions (added dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
    }
    
    @keyframes slideIn {
        from { transform: translateX(-20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .timeline-item {
        animation: slideIn 0.5s ease-out;
    }
`;
document.head.appendChild(style);

// Initialize the visualization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const visualization = new WWIIFactorsVisualization();
    
    // Add global error handling
    window.addEventListener('error', (e) => {
        console.error('Visualization error:', e.error);
    });
    
    // Add resize handler for responsive updates
    window.addEventListener('resize', () => {
        // Recalculate layouts if needed
        visualization.updateVisualization();
    });
    
    // Expose visualization instance for debugging
    window.wwiiViz = visualization;
});