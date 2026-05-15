// Courtroom Family Responsibility Simulation
// This simulation helps JC2 students understand family dynamics and responsibilities

class CourtroomSimulation {
    constructor() {
        // Initialize simulation state
        this.currentScenario = null;
        this.selectedRole = null;
        this.arguments = [];
        this.progress = 0;
        this.scenarios = this.initializeScenarios();
        this.characters = this.initializeCharacters();
        
        // Bind event listeners
        this.bindEvents();
        
        // Initialize tooltip system
        this.initializeTooltips();
        
        // Start with welcome message
        this.updateJudgeDialogue("Selamat datang ke mahkamah. Pilih senario untuk memulakan simulasi.");
    }
    
    // Initialize scenario data with cause-and-effect relationships
    initializeScenarios() {
        return {
            1: {
                title: "Konflik Tanggungjawab",
                description: "Datuk Ahmad memerlukan penjagaan harian. Encik Razak sibuk dengan kerja dan menyerahkan tanggungjawab kepada isterinya.",
                judgeDialogue: "Encik Razak, mengapa anda tidak menjalankan tanggungjawab sebagai anak?",
                consequences: {
                    "peguam-datuk": "Datuk Ahmad berasa diabaikan dan kesihatan mentalnya merosot.",
                    "peguam-anak": "Encik Razak menghadapi tekanan kerjaya dan kewangan.",
                    "peguam-menantu": "Puan Siti mengalami tekanan fizikal dan emosi yang berlebihan."
                }
            },
            2: {
                title: "Mencari Penyelesaian",
                description: "Keluarga cuba mencari penyelesaian yang adil untuk semua pihak.",
                judgeDialogue: "Bagaimana keluarga ini boleh bekerjasama untuk menjaga Datuk Ahmad?",
                consequences: {
                    "peguam-datuk": "Datuk Ahmad memerlukan perhatian dan kasih sayang dari semua ahli keluarga.",
                    "peguam-anak": "Encik Razak perlu mengimbangi masa antara kerja dan keluarga.",
                    "peguam-menantu": "Puan Siti memerlukan sokongan dan bantuan dari suami."
                }
            },
            3: {
                title: "Keputusan Mahkamah",
                description: "Mahkamah membuat keputusan berdasarkan kepentingan terbaik untuk semua pihak.",
                judgeDialogue: "Berdasarkan hujahan semua pihak, mahkamah akan membuat keputusan yang adil.",
                consequences: {
                    "peguam-datuk": "Datuk Ahmad akan mendapat penjagaan yang sepatutnya.",
                    "peguam-anak": "Encik Razak mesti memenuhi tanggungjawab sebagai anak.",
                    "peguam-menantu": "Puan Siti akan mendapat sokongan yang diperlukan."
                }
            }
        };
    }
    
    // Initialize character data
    initializeCharacters() {
        return {
            datuk: {
                name: "Datuk Ahmad",
                status: "Menghidap dementia",
                emotions: ["sedih", "keliru", "memerlukan kasih sayang"]
            },
            anak: {
                name: "Encik Razak", 
                status: "Anak lelaki",
                emotions: ["tertekan", "bersalah", "keliru"]
            },
            menantu: {
                name: "Puan Siti",
                status: "Menantu & Penjaga", 
                emotions: ["penat", "sedih", "memerlukan sokongan"]
            }
        };
    }
    
    // Bind all event listeners
    bindEvents() {
        // Scenario selection
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectScenario(e.target.dataset.scenario));
        });
        
        // Role selection
        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectRole(e.target.dataset.role));
        });
        
        // Character interaction
        document.querySelectorAll('.character').forEach(char => {
            char.addEventListener('click', (e) => this.interactWithCharacter(e.currentTarget.dataset.character));
        });
        
        // Argument submission
        document.getElementById('submit-argument').addEventListener('click', () => this.submitArgument());
        document.getElementById('reset-argument').addEventListener('click', () => this.resetSimulation());
        
        // Responsive text area
        document.getElementById('argument-text').addEventListener('input', this.autoResizeTextarea);
    }
    
    // Initialize tooltip system for better UX in iframe
    initializeTooltips() {
        const tooltip = document.getElementById('tooltip');
        
        // Add tooltips to elements with title attribute
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const text = e.target.getAttribute('title');
                tooltip.textContent = text;
                tooltip.classList.add('show');
                this.positionTooltip(e, tooltip);
                // Remove title to prevent default tooltip
                e.target.removeAttribute('title');
                e.target.setAttribute('data-title', text);
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
    
    // Position tooltip to stay within viewport
    positionTooltip(e, tooltip) {
        const rect = document.querySelector('.container').getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        tooltip.style.left = Math.min(x + 10, rect.width - tooltip.offsetWidth - 10) + 'px';
        tooltip.style.top = Math.max(y - tooltip.offsetHeight - 10, 10) + 'px';
    }
    
    // Select scenario and update interface
    selectScenario(scenarioId) {
        this.currentScenario = scenarioId;
        const scenario = this.scenarios[scenarioId];
        
        // Update UI
        document.querySelectorAll('.scenario-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-scenario="${scenarioId}"]`).classList.add('active');
        
        // Update judge dialogue
        this.updateJudgeDialogue(scenario.judgeDialogue);
        
        // Update progress
        this.updateProgress(33);
        
        // Enable role selection
        document.querySelectorAll('.role-btn').forEach(btn => btn.disabled = false);
        
        console.log(`Scenario ${scenarioId} selected: ${scenario.title}`);
    }
    
    // Select role and show argument platform
    selectRole(role) {
        this.selectedRole = role;
        
        // Update UI
        document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-role="${role}"]`).classList.add('active');
        
        // Show argument section
        const argumentSection = document.getElementById('argument-section');
        argumentSection.style.display = 'block';
        
        // Update role title
        const roleNames = {
            'peguam-datuk': 'Peguam Datuk Ahmad',
            'peguam-anak': 'Peguam Encik Razak', 
            'peguam-menantu': 'Peguam Puan Siti'
        };
        document.getElementById('role-title').textContent = `Hujahan ${roleNames[role]}:`;
        
        // Update progress
        this.updateProgress(66);
        
        console.log(`Role selected: ${role}`);
    }
    
    // Handle character interaction for empathy building
    interactWithCharacter(character) {
        const charData = this.characters[character];
        const emotions = charData.emotions.join(', ');
        
        this.updateJudgeDialogue(`${charData.name} sedang berasa ${emotions}. Bagaimana hujahan anda dapat membantu?`);
        
        // Add visual feedback
        const charElement = document.querySelector(`[data-character="${character}"]`);
        charElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            charElement.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Submit argument and show consequences
    submitArgument() {
        const argumentText = document.getElementById('argument-text').value.trim();
        
        if (!argumentText) {
            alert('Sila masukkan hujahan anda terlebih dahulu.');
            return;
        }
        
        if (!this.currentScenario || !this.selectedRole) {
            alert('Sila pilih senario dan peranan terlebih dahulu.');
            return;
        }
        
        // Store argument
        this.arguments.push({
            scenario: this.currentScenario,
            role: this.selectedRole,
            argument: argumentText,
            timestamp: new Date()
        });
        
        // Show results
        this.showConsequences();
        
        // Update progress to complete
        this.updateProgress(100);
        
        console.log('Argument submitted:', argumentText);
    }
    
    // Show consequences based on scenario and role
    showConsequences() {
        const scenario = this.scenarios[this.currentScenario];
        const consequence = scenario.consequences[this.selectedRole];
        
        // Show results panel
        const resultsPanel = document.getElementById('results-panel');
        resultsPanel.style.display = 'block';
        
        // Display consequences
        const consequencesDisplay = document.getElementById('consequences-display');
        consequencesDisplay.innerHTML = `
            <strong>Akibat dari hujahan anda:</strong><br>
            ${consequence}<br><br>
            <strong>Pembelajaran:</strong><br>
            Setiap keputusan dalam keluarga mempunyai kesan kepada semua ahli. 
            Komunikasi yang berkesan dan saling memahami adalah kunci kepada penyelesaian yang adil.
        `;
        
        // Generate lawyer conclusion
        this.generateLawyerConclusion();
        
        // Update judge dialogue
        this.updateJudgeDialogue("Mahkamah telah mendengar hujahan anda. Sila lihat keputusan dan kesimpulan di bawah.");
    }
    
    // Generate final lawyer conclusion
    generateLawyerConclusion() {
        const conclusions = {
            'peguam-datuk': 'Sebagai peguam Datuk Ahmad, saya menekankan bahawa warga emas berhak mendapat penjagaan dan penghormatan. Tanggungjawab anak terhadap ibu bapa adalah kewajipan moral dan undang-undang.',
            'peguam-anak': 'Sebagai peguam Encik Razak, saya memahami tekanan yang dihadapi oleh generasi sandwich. Walau bagaimanapun, tanggungjawab terhadap ibu bapa tidak boleh diabaikan sepenuhnya.',
            'peguam-menantu': 'Sebagai peguam Puan Siti, saya menegaskan bahawa menantu tidak sepatutnya menanggung beban penjagaan sendirian. Sokongan dari suami dan keluarga adalah penting untuk kesejahteraan semua pihak.'
        };
        
        const finalConclusion = document.getElementById('final-conclusion');
        const lawyerConclusion = document.getElementById('lawyer-conclusion');
        
        lawyerConclusion.textContent = conclusions[this.selectedRole];
        finalConclusion.style.display = 'block';
    }
    
    // Update judge dialogue with typing effect
    updateJudgeDialogue(text) {
        const judgeDialogue = document.getElementById('judge-dialogue');
        judgeDialogue.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                judgeDialogue.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        typeWriter();
    }
    
    // Update progress bar
    updateProgress(percentage) {
        this.progress = percentage;
        const progressFill = document.getElementById('progress-fill');
        progressFill.style.width = `${percentage}%`;
    }
    
    // Auto-resize textarea for better UX
    autoResizeTextarea(e) {
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    }
    
    // Reset simulation to initial state
    resetSimulation() {
        // Reset state
        this.currentScenario = null;
        this.selectedRole = null;
        this.arguments = [];
        this.progress = 0;
        
        // Reset UI
        document.querySelectorAll('.scenario-btn, .role-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById('argument-section').style.display = 'none';
        document.getElementById('results-panel').style.display = 'none';
        document.getElementById('argument-text').value = '';
        
        // Reset progress
        this.updateProgress(0);
        
        // Reset judge dialogue
        this.updateJudgeDialogue("Simulasi telah dimulakan semula. Pilih senario untuk memulakan.");
        
        console.log('Simulation reset');
    }
}

// Initialize simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create simulation instance
    const simulation = new CourtroomSimulation();
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            simulation.resetSimulation();
        }
    });
    
    // Handle window resize for responsive design
    window.addEventListener('resize', () => {
        // Recalculate tooltip positions if needed
        const tooltip = document.getElementById('tooltip');
        if (tooltip.classList.contains('show')) {
            tooltip.classList.remove('show');
        }
    });
    
    console.log('Courtroom Family Responsibility Simulation initialized');
});