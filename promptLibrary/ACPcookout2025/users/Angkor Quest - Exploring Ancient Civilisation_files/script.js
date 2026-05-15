// Game state management and core functionality
class AngkorQuest {
    constructor() {
        // Initialize game state
        this.currentScene = 0;
        this.progress = 0;
        this.inventory = [];
        this.discoveries = [];
        this.gameHistory = [];
        
        // Game scenes and story data
        this.scenes = [
            {
                id: 0,
                title: "Angkor Wat Temple Complex",
                description: "You stand before the magnificent Angkor Wat, the world's largest religious monument. Built in the early 12th century, this Hindu-Buddhist temple represents the pinnacle of Khmer architecture.",
                background: "temple",
                hotspots: [
                    { x: 60, y: 40, id: "temple", icon: "🏛️", tooltip: "Explore the main temple structure" },
                    { x: 25, y: 60, id: "moat", icon: "🌊", tooltip: "Investigate the temple moat system" }
                ],
                legacyConnection: "Modern irrigation and water management systems"
            },
            {
                id: 1,
                title: "Bayon Temple - Faces of Compassion",
                description: "The Bayon temple features over 200 serene faces carved in stone, representing the Buddhist ideal of compassion. These faces watch over the land, symbolizing the king's care for his people.",
                background: "faces",
                hotspots: [
                    { x: 45, y: 35, id: "faces", icon: "😌", tooltip: "Study the carved faces" },
                    { x: 70, y: 55, id: "carvings", icon: "🎨", tooltip: "Examine the bas-relief carvings" }
                ],
                legacyConnection: "Modern concepts of leadership and social responsibility"
            },
            {
                id: 2,
                title: "Ta Prohm - Nature Reclaims",
                description: "Ta Prohm shows how nature and human creation can coexist. Massive trees grow through the temple ruins, creating a unique harmony between architecture and the natural world.",
                background: "nature",
                hotspots: [
                    { x: 35, y: 45, id: "trees", icon: "🌳", tooltip: "Observe the tree-temple integration" },
                    { x: 65, y: 30, id: "restoration", icon: "🔨", tooltip: "Learn about conservation efforts" }
                ],
                legacyConnection: "Modern environmental conservation and sustainable development"
            },
            {
                id: 3,
                title: "Angkor Thom - The Great City",
                description: "Angkor Thom was a massive walled city, home to over one million people. Its advanced urban planning included hospitals, schools, and a sophisticated water management system.",
                background: "city",
                hotspots: [
                    { x: 50, y: 40, id: "gates", icon: "🚪", tooltip: "Enter through the city gates" },
                    { x: 30, y: 65, id: "infrastructure", icon: "🏗️", tooltip: "Study the urban infrastructure" }
                ],
                legacyConnection: "Modern urban planning and public health systems"
            }
        ];

        // Initialize DOM elements
        this.initializeElements();
        this.setupEventListeners();
        this.loadScene(0);
    }

    // Initialize DOM element references
    initializeElements() {
        this.elements = {
            gameContainer: document.getElementById('gameContainer'),
            progressBar: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText'),
            sceneImage: document.getElementById('sceneImage'),
            sceneText: document.getElementById('sceneText'),
            interactiveElements: document.getElementById('interactiveElements'),
            inventoryItems: document.getElementById('inventoryItems'),
            dialogueText: document.getElementById('dialogueText'),
            decisionButtons: document.getElementById('decisionButtons'),
            backBtn: document.getElementById('backBtn'),
            nextBtn: document.getElementById('nextBtn'),
            resetBtn: document.getElementById('resetBtn'),
            tooltip: document.getElementById('tooltip'),
            achievement: document.getElementById('achievementNotification')
        };
    }

    // Set up all event listeners
    setupEventListeners() {
        // Navigation button events
        this.elements.backBtn.addEventListener('click', () => this.goBack());
        this.elements.nextBtn.addEventListener('click', () => this.goNext());
        this.elements.resetBtn.addEventListener('click', () => this.resetGame());

        // Tooltip events for main container
        this.elements.gameContainer.addEventListener('mouseenter', (e) => {
            if (e.target === this.elements.gameContainer) {
                this.showTooltip(e, this.elements.gameContainer.title);
            }
        });

        this.elements.gameContainer.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });

        // Global mouse move for tooltip positioning
        document.addEventListener('mousemove', (e) => {
            if (this.elements.tooltip.classList.contains('show')) {
                this.positionTooltip(e);
            }
        });

        // Touch support for mobile devices
        this.setupTouchSupport();
    }

    // Enhanced touch support for mobile devices
    setupTouchSupport() {
        let touchStartTime;
        
        this.elements.gameContainer.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
        });

        this.elements.gameContainer.addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;
            
            // Long press for tooltip (500ms)
            if (touchDuration > 500) {
                const target = e.target.closest('.hotspot, .inventory-item');
                if (target && target.dataset.tooltip) {
                    this.showTooltip(e.changedTouches[0], target.dataset.tooltip);
                    setTimeout(() => this.hideTooltip(), 3000);
                }
            }
        });
    }

    // Load and display a specific scene
    loadScene(sceneId) {
        const scene = this.scenes[sceneId];
        if (!scene) return;

        this.currentScene = sceneId;
        
        // Update scene description
        this.elements.sceneText.textContent = scene.description;
        
        // Update scene background
        this.updateSceneBackground(scene.background);
        
        // Clear and create hotspots
        this.createHotspots(scene.hotspots);
        
        // Update dialogue
        this.elements.dialogueText.textContent = `You are exploring ${scene.title}. Click on the glowing areas to discover more about this ancient wonder.`;
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Update progress
        this.updateProgress();
        
        // Create decision buttons for this scene
        this.createDecisionButtons(scene);
        
        // Add to history
        this.gameHistory.push(sceneId);
    }

    // Update scene background based on scene type
    updateSceneBackground(backgroundType) {
        const backgrounds = {
            temple: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%23FFE4B5"/><stop offset="100%" style="stop-color:%23DEB887"/></linearGradient></defs><rect width="800" height="400" fill="url(%23sky)"/><rect x="0" y="300" width="800" height="100" fill="%23228B22"/><rect x="200" y="100" width="400" height="200" fill="%238B4513" rx="20"/><polygon points="200,100 400,50 600,100" fill="%23654321"/><rect x="350" y="150" width="100" height="150" fill="%234B0000"/><circle cx="100" cy="80" r="30" fill="%23FFD700" opacity="0.8"/></svg>')`,
            faces: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><rect width="800" height="400" fill="%23DEB887"/><rect x="0" y="320" width="800" height="80" fill="%23228B22"/><rect x="150" y="80" width="500" height="240" fill="%238B4513" rx="15"/><circle cx="300" cy="180" r="40" fill="%23654321"/><circle cx="500" cy="180" r="40" fill="%23654321"/><ellipse cx="300" cy="160" rx="15" ry="20" fill="%23000"/><ellipse cx="500" cy="160" rx="15" ry="20" fill="%23000"/><path d="M280,200 Q300,220 320,200" stroke="%23000" stroke-width="3" fill="none"/><path d="M480,200 Q500,220 520,200" stroke="%23000" stroke-width="3" fill="none"/></svg>')`,
            nature: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><rect width="800" height="400" fill="%23228B22"/><rect x="200" y="150" width="400" height="200" fill="%238B4513" opacity="0.7"/><ellipse cx="150" cy="200" rx="80" ry="120" fill="%23006400"/><ellipse cx="650" cy="180" rx="60" ry="100" fill="%23006400"/><ellipse cx="400" cy="120" rx="100" ry="150" fill="%23228B22"/><rect x="380" y="200" width="40" height="100" fill="%234B0000" opacity="0.8"/></svg>')`,
            city: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><rect width="800" height="400" fill="%23DEB887"/><rect x="0" y="350" width="800" height="50" fill="%23228B22"/><rect x="100" y="200" width="600" height="150" fill="%238B4513"/><rect x="300" y="150" width="200" height="50" fill="%23654321"/><rect x="200" y="250" width="80" height="100" fill="%234B0000"/><rect x="520" y="250" width="80" height="100" fill="%234B0000"/><rect x="360" y="180" width="80" height="170" fill="%234B0000"/></svg>')`
        };
        
        this.elements.sceneImage.style.backgroundImage = backgrounds[backgroundType] || backgrounds.temple;
    }

    // Create interactive hotspots for the current scene
    createHotspots(hotspots) {
        this.elements.interactiveElements.innerHTML = '';
        
        hotspots.forEach(hotspot => {
            const hotspotElement = document.createElement('div');
            hotspotElement.className = 'hotspot';
            hotspotElement.style.left = `${hotspot.x}%`;
            hotspotElement.style.top = `${hotspot.y}%`;
            hotspotElement.textContent = hotspot.icon;
            hotspotElement.dataset.tooltip = hotspot.tooltip;
            hotspotElement.dataset.id = hotspot.id;
            
            // Add click event
            hotspotElement.addEventListener('click', () => this.exploreHotspot(hotspot));
            
            // Add hover events for tooltip
            hotspotElement.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, hotspot.tooltip);
            });
            
            hotspotElement.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
            
            this.elements.interactiveElements.appendChild(hotspotElement);
        });
    }

    // Handle hotspot exploration
    exploreHotspot(hotspot) {
        const scene = this.scenes[this.currentScene];
        const discoveries = {
            temple: "🏛️ Ancient Architecture",
            moat: "🌊 Water Management",
            faces: "😌 Buddhist Philosophy", 
            carvings: "🎨 Historical Records",
            trees: "🌳 Natural Harmony",
            restoration: "🔨 Conservation",
            gates: "🚪 City Planning",
            infrastructure: "🏗️ Public Works"
        };
        
        // Add discovery to inventory
        const discovery = discoveries[hotspot.id];
        if (discovery && !this.inventory.includes(discovery)) {
            this.inventory.push(discovery);
            this.updateInventory();
            this.showAchievement("New Discovery!", `You discovered: ${discovery}`);
        }
        
        // Update dialogue with exploration result
        const explorationTexts = {
            temple: "The temple's intricate design shows advanced mathematical and architectural knowledge. The precise alignment with celestial bodies demonstrates the Khmer's sophisticated understanding of astronomy.",
            moat: "This water management system prevented flooding and provided irrigation. Modern Singapore uses similar principles in its water management and flood control systems.",
            faces: "These serene faces represent the Buddhist concept of compassion in leadership. Today's emphasis on empathetic leadership in organizations echoes this ancient wisdom.",
            carvings: "These detailed carvings record historical events and daily life. They're like ancient newspapers, showing us how people lived, worked, and celebrated.",
            trees: "The harmony between nature and architecture here inspires modern sustainable architecture and urban planning that works with natural environments.",
            restoration: "Conservation efforts here use both traditional techniques and modern technology, similar to how we preserve heritage buildings in Singapore today.",
            gates: "The city gates controlled access and trade, much like modern customs and immigration systems that manage the flow of people and goods.",
            infrastructure: "The advanced road systems, hospitals, and schools show early urban planning principles still used in modern cities like Singapore."
        };
        
        this.elements.dialogueText.textContent = explorationTexts[hotspot.id] || "You've made an interesting discovery!";
        
        // Update progress
        this.progress = Math.min(100, this.progress + 15);
        this.updateProgress();
    }

    // Create decision buttons for scene interactions
    createDecisionButtons(scene) {
        this.elements.decisionButtons.innerHTML = '';
        
        const decisions = [
            { text: "Learn about Legacy", action: () => this.showLegacyConnection(scene) },
            { text: "Compare to Today", action: () => this.showModernComparison(scene) },
            { text: "Take Notes", action: () => this.takeNotes(scene) }
        ];
        
        decisions.forEach(decision => {
            const button = document.createElement('button');
            button.className = 'decision-btn';
            button.textContent = decision.text;
            button.addEventListener('click', decision.action);
            this.elements.decisionButtons.appendChild(button);
        });
    }

    // Show how ancient Angkor connects to modern life
    showLegacyConnection(scene) {
        const connections = {
            0: "Angkor's water management systems inspire modern Singapore's water conservation and NEWater programs. The ancient Khmer's ability to manage water resources in a tropical climate mirrors Singapore's approach to water security.",
            1: "The Bayon's emphasis on compassionate leadership influences modern management styles. Many Singapore companies now prioritize employee welfare and social responsibility, echoing the Khmer king's care for his people.",
            2: "Ta Prohm's integration with nature inspires Singapore's 'City in a Garden' vision. Modern architects study how Angkor balanced human needs with environmental preservation.",
            3: "Angkor Thom's urban planning principles appear in Singapore's HDB towns and new developments. The ancient city's hospitals, schools, and infrastructure layout influences modern urban design."
        };
        
        this.elements.dialogueText.textContent = connections[this.currentScene] || "This ancient wisdom continues to influence our modern world.";
        this.showAchievement("Legacy Connection!", "You've connected ancient wisdom to modern life!");
    }

    // Show modern comparisons
    showModernComparison(scene) {
        const comparisons = {
            0: "Like Angkor Wat's precise construction, modern Singapore uses advanced engineering for buildings like Marina Bay Sands, combining beauty with functionality.",
            1: "The Bayon's 200+ faces watching over the people is like Singapore's community centers and grassroots organizations that care for residents in every neighborhood.",
            2: "Ta Prohm's nature-architecture harmony is seen in Singapore's park connectors and green buildings that integrate plants into urban structures.",
            3: "Angkor Thom's million residents had hospitals and schools, just like Singapore's comprehensive healthcare and education systems serve all citizens today."
        };
        
        this.elements.dialogueText.textContent = comparisons[this.currentScene] || "Ancient innovations continue in modern forms.";
    }

    // Allow students to take notes (simulate learning activity)
    takeNotes(scene) {
        const notePrompts = {
            0: "Note taken: 'Angkor Wat shows how ancient people used math and astronomy in architecture. Modern buildings also need precise planning.'",
            1: "Note taken: 'The Bayon teaches that good leaders care about their people's wellbeing, just like modern Singapore's government programs.'",
            2: "Note taken: 'Ta Prohm shows that humans and nature can work together, inspiring Singapore's green building designs.'",
            3: "Note taken: 'Angkor Thom had good city planning with hospitals and schools, similar to Singapore's well-planned towns today.'"
        };
        
        this.elements.dialogueText.textContent = notePrompts[this.currentScene] || "You've recorded important observations!";
        
        // Add note-taking achievement
        if (!this.discoveries.includes('note_taker')) {
            this.discoveries.push('note_taker');
            this.showAchievement("Scholar!", "You're taking good notes about your discoveries!");
        }
    }

    // Update inventory display
    updateInventory() {
        this.elements.inventoryItems.innerHTML = '';
        
        this.inventory.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            itemElement.textContent = item.split(' ')[0]; // Show just the emoji
            itemElement.dataset.tooltip = item;
            itemElement.title = item;
            
            // Add hover tooltip
            itemElement.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, item);
            });
            
            itemElement.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
            
            this.elements.inventoryItems.appendChild(itemElement);
        });
    }

    // Update progress bar and text
    updateProgress() {
        this.elements.progressBar.style.width = `${this.progress}%`;
        this.elements.progressText.textContent = `Quest Progress: ${Math.round(this.progress)}%`;
        
        // Check for completion
        if (this.progress >= 100 && !this.discoveries.includes('quest_complete')) {
            this.discoveries.push('quest_complete');
            setTimeout(() => {
                this.showAchievement("Quest Complete!", "You've successfully explored Angkor and discovered how its legacy lives on today!");
            }, 500);
        }
    }

    // Navigation functions
    goBack() {
        if (this.currentScene > 0) {
            this.loadScene(this.currentScene - 1);
        }
    }

    goNext() {
        if (this.currentScene < this.scenes.length - 1) {
            this.loadScene(this.currentScene + 1);
        }
    }

    // Update navigation button states
    updateNavigationButtons() {
        this.elements.backBtn.disabled = this.currentScene === 0;
        this.elements.nextBtn.disabled = this.currentScene === this.scenes.length - 1;
        
        // Update button text based on context
        if (this.currentScene === this.scenes.length - 1) {
            this.elements.nextBtn.textContent = "Quest Complete";
        } else {
            this.elements.nextBtn.textContent = "Next Site →";
        }
    }

    // Reset game to initial state
    resetGame() {
        this.currentScene = 0;
        this.progress = 0;
        this.inventory = [];
        this.discoveries = [];
        this.gameHistory = [];
        
        this.updateInventory();
        this.updateProgress();
        this.loadScene(0);
        
        this.showAchievement("Fresh Start!", "Your quest begins anew. Explore Angkor's wonders!");
    }

    // Tooltip management
    showTooltip(event, text) {
        this.elements.tooltip.textContent = text;
        this.elements.tooltip.classList.add('show');
        this.positionTooltip(event);
    }

    positionTooltip(event) {
        const tooltip = this.elements.tooltip;
        const rect = this.elements.gameContainer.getBoundingClientRect();
        
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top - 40;
        
        // Keep tooltip within container bounds
        if (x + tooltip.offsetWidth > rect.width) {
            x = rect.width - tooltip.offsetWidth - 10;
        }
        if (y < 0) {
            y = event.clientY - rect.top + 20;
        }
        
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    }

    hideTooltip() {
        this.elements.tooltip.classList.remove('show');
    }

    // Achievement notification system
    showAchievement(title, text) {
        const achievement = this.elements.achievement;
        achievement.querySelector('.achievement-title').textContent = title;
        achievement.querySelector('.achievement-text').textContent = text;
        
        achievement.classList.add('show');
        
        setTimeout(() => {
            achievement.classList.remove('show');
        }, 3000);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if running in iframe and adjust height accordingly
    if (window.self !== window.top) {
        document.body.classList.add('iframe');
    }
    
    // Start the Angkor Quest game
    window.angkorQuest = new AngkorQuest();
    
    // Add keyboard support for accessibility
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                if (!window.angkorQuest.elements.backBtn.disabled) {
                    window.angkorQuest.goBack();
                }
                break;
            case 'ArrowRight':
                if (!window.angkorQuest.elements.nextBtn.disabled) {
                    window.angkorQuest.goNext();
                }
                break;
            case 'r':
            case 'R':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    window.angkorQuest.resetGame();
                }
                break;
        }
    });
    
    console.log("Angkor Quest initialized successfully!");
});