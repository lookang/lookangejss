// Virtual Food Tests Lab Simulation
// Designed for Secondary 2 students to learn food nutrient testing

class FoodTestLab {
    constructor() {
        // Initialize lab state
        this.selectedSample = null;
        this.selectedReagent = null;
        this.currentTest = null;
        this.testStep = 0;
        this.testResults = {};
        
        // Food sample compositions (what nutrients they contain)
        this.sampleCompositions = {
            starch: { starch: true, sugar: false, protein: false, fat: false },
            glucose: { starch: false, sugar: true, protein: false, fat: false },
            protein: { starch: false, sugar: false, protein: true, fat: false },
            oil: { starch: false, sugar: false, protein: false, fat: true },
            unknown: { starch: true, sugar: true, protein: false, fat: false } // Mixed sample
        };
        
        // Test procedures and expected results - modified ethanol test to not require separate water
        this.testProcedures = {
            iodine: {
                name: 'Iodine Test for Starch',
                steps: ['Add sample', 'Add iodine solution', 'Observe'],
                nutrient: 'starch',
                positiveResult: 'Blue-black color indicates starch is present',
                negativeResult: 'Yellowish-brown color indicates no starch',
                positiveColor: 'positive-starch',
                negativeColor: 'negative-result'
            },
            benedict: {
                name: "Benedict's Test for Reducing Sugar",
                steps: ['Add sample', 'Add Benedict\'s solution', 'Heat in water bath', 'Observe'],
                nutrient: 'sugar',
                positiveResult: 'Green/orange/brick-red precipitate indicates reducing sugar',
                negativeResult: 'Blue color indicates no reducing sugar',
                positiveColor: 'positive-sugar-high',
                negativeColor: 'negative-result',
                requiresHeating: true
            },
            biuret: {
                name: 'Biuret Test for Protein',
                steps: ['Add sample', 'Add Biuret reagent', 'Shake and wait', 'Observe'],
                nutrient: 'protein',
                positiveResult: 'Violet color indicates protein is present',
                negativeResult: 'Blue color indicates no protein',
                positiveColor: 'positive-protein',
                negativeColor: 'negative-result'
            },
            ethanol: {
                name: 'Ethanol Emulsion Test for Fats',
                steps: ['Add sample', 'Add ethanol', 'Shake', 'Observe'], // Removed separate water step
                nutrient: 'fat',
                positiveResult: 'White emulsion indicates fats are present',
                negativeResult: 'Clear solution indicates no fats',
                positiveColor: 'positive-fat',
                negativeColor: 'negative-result',
                requiresShaking: true
                // Removed requiresWater property
            }
        };
        
        this.initializeEventListeners();
        this.setupTooltips();
        this.detectIframeMode();
    }
    
    // Detect if running in iframe and adjust height accordingly
    detectIframeMode() {
        try {
            if (window.self !== window.top) {
                document.getElementById('labContainer').classList.add('iframe-mode');
            }
        } catch (e) {
            // Assume iframe if we can't access parent
            document.getElementById('labContainer').classList.add('iframe-mode');
        }
    }
    
    // Set up all event listeners for interactive elements
    initializeEventListeners() {
        // Sample selection
        document.querySelectorAll('.sample-tube').forEach(tube => {
            tube.addEventListener('click', (e) => this.selectSample(e.currentTarget.dataset.sample));
        });
        
        // Reagent selection
        document.querySelectorAll('.reagent-bottle').forEach(bottle => {
            bottle.addEventListener('click', (e) => this.selectReagent(e.currentTarget.dataset.reagent));
        });
        
        // Action buttons
        document.getElementById('addSampleBtn').addEventListener('click', () => this.addSample());
        document.getElementById('addReagentBtn').addEventListener('click', () => this.addReagent());
        document.getElementById('heatBtn').addEventListener('click', () => this.heatSample());
        document.getElementById('shakeBtn').addEventListener('click', () => this.shakeSample());
        document.getElementById('observeBtn').addEventListener('click', () => this.observeResults());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetLab());
        
        // Instructions toggle
        document.getElementById('instructionsToggle').addEventListener('click', () => this.toggleInstructions());
        
        // Close instructions when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('instructionsPanel');
            const toggle = document.getElementById('instructionsToggle');
            if (!panel.contains(e.target) && !toggle.contains(e.target)) {
                panel.style.display = 'none';
            }
        });
    }
    
    // Setup tooltip functionality for better user guidance
    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const title = e.target.getAttribute('title');
                if (title) {
                    tooltip.textContent = title;
                    tooltip.style.opacity = '1';
                    this.updateTooltipPosition(e);
                }
            });
            
            element.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(e);
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
        });
    }
    
    // Update tooltip position relative to mouse
    updateTooltipPosition(e) {
        const tooltip = document.getElementById('tooltip');
        const rect = document.getElementById('labContainer').getBoundingClientRect();
        
        let x = e.clientX - rect.left + 10;
        let y = e.clientY - rect.top - 30;
        
        // Keep tooltip within container bounds
        if (x + tooltip.offsetWidth > rect.width) {
            x = e.clientX - rect.left - tooltip.offsetWidth - 10;
        }
        if (y < 0) {
            y = e.clientY - rect.top + 20;
        }
        
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }
    
    // Handle sample selection with visual feedback
    selectSample(sampleType) {
        // Remove previous selection
        document.querySelectorAll('.sample-tube').forEach(tube => {
            tube.classList.remove('selected');
        });
        
        // Select new sample
        document.querySelector(`[data-sample="${sampleType}"]`).classList.add('selected');
        this.selectedSample = sampleType;
        
        // Update UI feedback
        this.updateActionButtons();
        this.showFeedback(`Selected ${sampleType} sample`);
    }
    
    // Handle reagent selection with visual feedback
    selectReagent(reagentType) {
        // Remove previous selection
        document.querySelectorAll('.reagent-bottle').forEach(bottle => {
            bottle.classList.remove('selected');
        });
        
        // Select new reagent
        document.querySelector(`[data-reagent="${reagentType}"]`).classList.add('selected');
        this.selectedReagent = reagentType;
        
        // Update UI feedback
        this.updateActionButtons();
        this.showFeedback(`Selected ${reagentType} reagent`);
    }
    
    // Add selected sample to test tube
    addSample() {
        if (!this.selectedSample) {
            this.showFeedback('Please select a food sample first', 'error');
            return;
        }
        
        const tubeContent = document.getElementById('tubeContent');
        const tubeLabel = document.getElementById('tubeLabel');
        
        // Visual representation of adding sample
        tubeContent.style.height = '20px';
        tubeContent.className = `tube-content ${this.selectedSample}-sample`;
        tubeLabel.textContent = `${this.selectedSample} sample`;
        
        this.currentTest = { sample: this.selectedSample, reagents: [], step: 1 };
        this.updateActionButtons();
        this.showFeedback(`Added ${this.selectedSample} sample to test tube`);
    }
    
    // Add selected reagent to test tube
    addReagent() {
        if (!this.selectedReagent) {
            this.showFeedback('Please select a reagent first', 'error');
            return;
        }
        
        if (!this.currentTest) {
            this.showFeedback('Please add a sample first', 'error');
            return;
        }
        
        const tubeContent = document.getElementById('tubeContent');
        const tubeLabel = document.getElementById('tubeLabel');
        
        // Add reagent to current test
        this.currentTest.reagents.push(this.selectedReagent);
        this.currentTest.step++;
        
        // Visual representation of adding reagent
        tubeContent.style.height = '40px';
        tubeLabel.textContent = `${this.currentTest.sample} + ${this.selectedReagent}`;
        
        // Determine test type and update UI accordingly
        if (this.selectedReagent in this.testProcedures) {
            this.currentTest.type = this.selectedReagent;
            const procedure = this.testProcedures[this.selectedReagent];
            
            // Show appropriate next steps
            if (procedure.requiresHeating && this.selectedReagent === 'benedict') {
                this.showFeedback(`Added ${this.selectedReagent}. Now heat the mixture.`);
            } else if (procedure.requiresShaking) {
                this.showFeedback(`Added ${this.selectedReagent}. Now shake the mixture.`);
            } else {
                this.showFeedback(`Added ${this.selectedReagent}. Ready to observe results.`);
            }
        }
        
        this.updateActionButtons();
    }
    
    // Heat the sample (for Benedict's test)
    heatSample() {
        if (!this.currentTest || !this.currentTest.reagents.includes('benedict')) {
            this.showFeedback('Heating is only needed for Benedict\'s test', 'error');
            return;
        }
        
        const testTube = document.getElementById('testTube');
        testTube.classList.add('heating');
        
        // Simulate heating process
        setTimeout(() => {
            testTube.classList.remove('heating');
            this.currentTest.heated = true;
            this.currentTest.step++;
            this.updateActionButtons();
            this.showFeedback('Sample heated. Ready to observe results.');
        }, 2000);
        
        this.showFeedback('Heating sample in water bath...');
    }
    
    // Shake the sample (for various tests) - modified to handle ethanol test without separate water step
    shakeSample() {
        if (!this.currentTest) {
            this.showFeedback('Please add sample and reagent first', 'error');
            return;
        }
        
        const testTube = document.getElementById('testTube');
        testTube.classList.add('shaking');
        
        // Simulate shaking process
        setTimeout(() => {
            testTube.classList.remove('shaking');
            this.currentTest.shaken = true;
            this.currentTest.step++;
            
            // For ethanol test, simulate water being naturally present in the sample
            if (this.currentTest.type === 'ethanol') {
                this.showFeedback('Shaken with ethanol. The emulsion effect is now visible. Ready to observe results.');
                // Auto-simulate water interaction for ethanol test
                setTimeout(() => {
                    document.getElementById('tubeLabel').textContent = `${this.currentTest.sample} + ethanol (emulsion)`;
                    this.updateActionButtons();
                }, 500);
            } else {
                this.updateActionButtons();
                this.showFeedback('Sample shaken. Ready to observe results.');
            }
        }, 1000);
        
        this.showFeedback('Shaking sample...');
    }
    
    // Observe and display test results
    observeResults() {
        if (!this.currentTest || !this.currentTest.type) {
            this.showFeedback('Please complete the test procedure first', 'error');
            return;
        }
        
        const procedure = this.testProcedures[this.currentTest.type];
        const sampleComposition = this.sampleCompositions[this.currentTest.sample];
        const hasNutrient = sampleComposition[procedure.nutrient];
        
        // Update test tube appearance based on results
        const tubeContent = document.getElementById('tubeContent');
        tubeContent.style.height = '60px';
        
        if (hasNutrient) {
            tubeContent.className = `tube-content ${procedure.positiveColor}`;
        } else {
            tubeContent.className = `tube-content ${procedure.negativeColor}`;
        }
        
        // Display results
        this.displayResults(procedure, hasNutrient);
        
        // Store result for tracking
        this.testResults[this.currentTest.sample] = this.testResults[this.currentTest.sample] || {};
        this.testResults[this.currentTest.sample][procedure.nutrient] = hasNutrient;
        
        this.updateActionButtons();
    }
    
    // Display test results with educational feedback
    displayResults(procedure, hasNutrient) {
        const resultDisplay = document.getElementById('resultDisplay');
        const conclusion = document.getElementById('conclusion');
        
        const resultText = hasNutrient ? procedure.positiveResult : procedure.negativeResult;
        const nutrientStatus = hasNutrient ? 'PRESENT' : 'ABSENT';
        
        resultDisplay.innerHTML = `
            <div class="result-text">
                <strong>${procedure.name}</strong><br>
                <em>Observation:</em> ${resultText}<br>
                <strong>Conclusion: ${procedure.nutrient.toUpperCase()} is ${nutrientStatus}</strong>
            </div>
        `;
        
        // Show educational conclusion
        conclusion.style.display = 'block';
        conclusion.innerHTML = `
            <strong>Learning Point:</strong> ${this.getEducationalNote(procedure.nutrient, hasNutrient)}
        `;
        
        this.showFeedback(`Test complete! ${procedure.nutrient.toUpperCase()} is ${nutrientStatus}`);
    }
    
    // Provide educational context for results - updated fat test explanation
    getEducationalNote(nutrient, present) {
        const notes = {
            starch: present ? 
                'Starch is a complex carbohydrate that provides energy. The iodine test works because iodine forms a complex with the helical structure of starch.' :
                'No starch detected. This sample does not contain complex carbohydrates.',
            sugar: present ?
                'Reducing sugars like glucose can donate electrons. Benedict\'s reagent changes color when reduced by these sugars during heating.' :
                'No reducing sugars detected. Benedict\'s solution remains blue when no reducing sugars are present.',
            protein: present ?
                'Proteins contain peptide bonds. Biuret reagent reacts with these bonds to produce a violet color.' :
                'No proteins detected. The absence of peptide bonds means no color change occurs.',
            fat: present ?
                'Fats are lipids that don\'t dissolve in water. When ethanol (containing dissolved fats) is shaken, it forms a white emulsion due to the interaction with water naturally present in the sample.' :
                'No fats detected. The solution remains clear because no lipids are present to form an emulsion.'
        };
        return notes[nutrient];
    }
    
    // Update button states based on current test progress - modified to handle ethanol test without separate water step
    updateActionButtons() {
        const addSampleBtn = document.getElementById('addSampleBtn');
        const addReagentBtn = document.getElementById('addReagentBtn');
        const heatBtn = document.getElementById('heatBtn');
        const shakeBtn = document.getElementById('shakeBtn');
        const observeBtn = document.getElementById('observeBtn');
        
        // Reset all buttons
        [addSampleBtn, addReagentBtn, heatBtn, shakeBtn, observeBtn].forEach(btn => {
            btn.disabled = true;
        });
        
        if (!this.currentTest) {
            // No test started - only allow adding sample
            addSampleBtn.disabled = !this.selectedSample;
        } else if (this.currentTest.step === 1) {
            // Sample added - allow adding reagent
            addReagentBtn.disabled = !this.selectedReagent;
        } else if (this.currentTest.type) {
            const procedure = this.testProcedures[this.currentTest.type];
            
            // Check what actions are needed based on test type
            if (procedure.requiresHeating && this.currentTest.reagents.includes('benedict') && !this.currentTest.heated) {
                heatBtn.disabled = false;
            } else if (procedure.requiresShaking && !this.currentTest.shaken) {
                shakeBtn.disabled = false;
            } else {
                // Ready to observe (removed water check for ethanol test)
                observeBtn.disabled = false;
            }
        }
    }
    
    // Reset the lab to initial state
    resetLab() {
        // Clear selections
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        this.selectedSample = null;
        this.selectedReagent = null;
        this.currentTest = null;
        
        // Reset test tube
        const tubeContent = document.getElementById('tubeContent');
        const tubeLabel = document.getElementById('tubeLabel');
        tubeContent.style.height = '0px';
        tubeContent.className = 'tube-content';
        tubeLabel.textContent = 'Empty';
        
        // Clear results
        document.getElementById('resultDisplay').innerHTML = '<div class="result-text">Select a sample and reagent to begin testing</div>';
        document.getElementById('conclusion').style.display = 'none';
        
        // Reset buttons
        this.updateActionButtons();
        
        this.showFeedback('Lab reset. Ready for new test.');
    }
    
    // Toggle instructions panel visibility
    toggleInstructions() {
        const panel = document.getElementById('instructionsPanel');
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    }
    
    // Show feedback messages to guide student learning
    showFeedback(message, type = 'info') {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1001;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        feedback.textContent = message;
        
        document.getElementById('labContainer').appendChild(feedback);
        
        // Animate in
        setTimeout(() => feedback.style.opacity = '1', 10);
        
        // Remove after delay
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }
}

// Initialize the lab when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FoodTestLab();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust layout if needed for different screen sizes
    const container = document.getElementById('labContainer');
    if (window.innerWidth < 768) {
        container.classList.add('mobile-layout');
    } else {
        container.classList.remove('mobile-layout');
    }
});