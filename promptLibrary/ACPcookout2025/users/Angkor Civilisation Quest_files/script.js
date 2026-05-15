// Game state management and data structure
class AngkorQuestGame {
    constructor() {
        // Initialize game state following cognitive load theory principles
        this.currentScene = 0;
        this.progress = 0;
        this.maxProgress = 5;
        this.inventory = [];
        this.gameData = this.initializeGameData();
        this.init();
    }

    // Initialize game data with educational content about Angkor civilization
    initializeGameData() {
        return {
            scenes: [
                {
                    id: 0,
                    title: "Welcome to Angkor",
                    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNreSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM4N0NFRUIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkQ3MDAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNza3kpIi8+PHJlY3QgeD0iMTUwIiB5PSIxNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjOEI0NTEzIi8+PHJlY3QgeD0iMTcwIiB5PSIxMDAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI1MCIgZmlsbD0iIzhCNDUxMyIvPjx0ZXh0IHg9IjIwMCIgeT0iMjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4QjQ1MTMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFuZ2tvciBXYXQ8L3RleHQ+PC9zdmc+",
                    dialogue: "Welcome, young explorer! You are about to embark on a journey through the magnificent Angkor civilisation. Your mission is to discover how the ancient Khmer Empire's innovations continue to influence our world today.",
                    actions: ['explore', 'talk', 'examine']
                },
                {
                    id: 1,
                    title: "Temple Complex",
                    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNreTIiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjODdDRUVCIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOThGQjk4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjc2t5MikiLz48cG9seWdvbiBwb2ludHM9IjUwLDE1MCAzNTAsMTUwIDIwMCw1MCIgZmlsbD0iIzhCNDUxMyIvPjxyZWN0IHg9IjEwMCIgeT0iMTUwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0E0NjkzQSIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMTAiIGZpbGw9IiNGRkQ3MDAiLz48dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOEI0NTEzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5UZW1wbGUgQ29tcGxleDwvdGV4dD48L3N2Zz4=",
                    dialogue: "You stand before the magnificent temple complex. The intricate stone carvings tell stories of ancient engineering marvels. Notice how the temple's design influenced modern architecture in Southeast Asia.",
                    actions: ['explore', 'examine'],
                    discovery: "🏛️"
                },
                {
                    id: 2,
                    title: "Irrigation System",
                    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9IndhdGVyIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwQkZGRiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwOEZGRiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjOThGQjk4Ii8+PHJlY3QgeD0iNTAiIHk9IjE1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSI0MCIgZmlsbD0idXJsKCN3YXRlcikiLz48cmVjdCB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjOEI0NTEzIi8+PHJlY3QgeD0iMjgwIiB5PSIxMDAiIHdpZHRoPSIyMCIgaGVpZ2h0PSI1MCIgZmlsbD0iIzhCNDUxMyIvPjx0ZXh0IHg9IjIwMCIgeT0iMjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4QjQ1MTMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPklyamlnYXRpb24gQ2FuYWw8L3RleHQ+PC9zdmc+",
                    dialogue: "The ancient Khmer built sophisticated irrigation systems called 'barays' to manage water resources. These engineering principles are still used in modern Singapore's water management systems!",
                    actions: ['examine', 'talk'],
                    discovery: "💧"
                },
                {
                    id: 3,
                    title: "Trade Routes",
                    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI0Y0RTRCQyIvPjxwYXRoIGQ9Ik01MCAyMDAgUTIwMCAxMDAgMzUwIDIwMCIgc3Ryb2tlPSIjOEI0NTEzIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjIwMCIgcj0iMTUiIGZpbGw9IiNGRkQ3MDAiLz48Y2lyY2xlIGN4PSIzNTAiIGN5PSIyMDAiIHI9IjE1IiBmaWxsPSIjRkZENzAwIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTAwIiByPSIyMCIgZmlsbD0iI0ZGNjk0OSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4QjQ1MTMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlRyYWRlIE5ldHdvcms8L3RleHQ+PC9zdmc+",
                    dialogue: "Angkor was a major trading hub connecting China, India, and Southeast Asia. This established trade networks that modern Singapore continues to benefit from as a global trading center.",
                    actions: ['explore', 'talk'],
                    discovery: "🛤️"
                },
                {
                    id: 4,
                    title: "Cultural Legacy",
                    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI0ZGRjhEQyIvPjxyZWN0IHg9IjEwMCIgeT0iNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZENzAwIiBvcGFjaXR5PSIwLjciLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjUwIiBmaWxsPSIjRkY2OTQ5IiBvcGFjaXR5PSIwLjgiLz48cG9seWdvbiBwb2ludHM9IjIwMCwxMDAgMjIwLDE0MCAyNDAsMTIwIDIyMCwxNjAgMjAwLDIwMCAxODAsMTYwIDE2MCwxMjAgMTgwLDE0MCIgZmlsbD0iIzhCNDUxMyIvPjx0ZXh0IHg9IjIwMCIgeT0iMjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4QjQ1MTMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkN1bHR1cmFsIEFydHM8L3RleHQ+PC9zdmc+",
                    dialogue: "The artistic traditions of Angkor live on today! From temple architecture in modern buildings to traditional dance forms, you can see Angkor's influence in contemporary Southeast Asian culture.",
                    actions: ['examine'],
                    discovery: "🎭"
                }
            ],
            decisions: [
                {
                    sceneId: 1,
                    question: "How should we preserve these ancient engineering techniques?",
                    choices: [
                        { text: "Study and adapt for modern use", result: "You chose wisely! Modern engineers study ancient techniques to solve current problems." },
                        { text: "Keep them as historical curiosities", result: "While preservation is important, we can also learn from ancient innovations!" }
                    ]
                },
                {
                    sceneId: 2,
                    question: "What can Singapore learn from Angkor's water management?",
                    choices: [
                        { text: "Sustainable water conservation", result: "Excellent! Singapore's NEWater program uses similar principles of water recycling." },
                        { text: "Traditional farming methods", result: "Good thinking, but Singapore focuses more on urban water solutions." }
                    ]
                }
            ]
        };
    }

    // Initialize the game interface and event listeners
    init() {
        this.updateScene();
        this.updateProgress();
        this.setupEventListeners();
        this.showTooltip();
    }

    // Set up event listeners for interactive elements
    setupEventListeners() {
        // Add hover effects for inventory items
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('inventory-item')) {
                this.showItemTooltip(e.target, e);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('inventory-item')) {
                this.hideTooltip();
            }
        });
    }

    // Update the current scene display with new content
    updateScene() {
        const scene = this.gameData.scenes[this.currentScene];
        
        // Update scene visuals following multimedia learning principles
        document.getElementById('sceneTitle').textContent = scene.title;
        document.getElementById('sceneImage').style.backgroundImage = `url('${scene.image}')`;
        
        // Update dialogue with appropriate cognitive load
        this.typeText(scene.dialogue);
        
        // Show appropriate action buttons
        this.updateActionButtons(scene.actions);
        
        // Add discovery item to inventory if present
        if (scene.discovery && !this.inventory.includes(scene.discovery)) {
            this.addToInventory(scene.discovery);
        }
    }

    // Typewriter effect for dialogue text to manage cognitive load
    typeText(text) {
        const dialogueElement = document.getElementById('dialogueText');
        dialogueElement.textContent = '';
        let index = 0;
        
        const typeInterval = setInterval(() => {
            dialogueElement.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(typeInterval);
            }
        }, 30); // Optimal reading speed for Primary 6 students
    }

    // Update available action buttons based on scene
    updateActionButtons(availableActions) {
        const buttons = document.querySelectorAll('.nav-btn');
        
        buttons.forEach(button => {
            const action = button.id.replace('Btn', '');
            if (availableActions.includes(action)) {
                button.style.display = 'block';
                button.classList.remove('hidden');
            } else {
                button.style.display = 'none';
            }
        });
    }

    // Handle navigation actions with educational feedback
    handleAction(action) {
        const scene = this.gameData.scenes[this.currentScene];
        
        switch(action) {
            case 'explore':
                if (this.currentScene < this.gameData.scenes.length - 1) {
                    this.currentScene++;
                    this.progress++;
                    this.updateScene();
                    this.updateProgress();
                } else {
                    this.showCompletionMessage();
                }
                break;
                
            case 'talk':
                this.showDecisionOptions();
                break;
                
            case 'examine':
                this.showExaminationResult();
                break;
        }
        
        // Provide haptic feedback for touch devices
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    // Show decision options for critical thinking
    showDecisionOptions() {
        const decision = this.gameData.decisions.find(d => d.sceneId === this.currentScene);
        
        if (decision) {
            document.getElementById('navigationButtons').classList.add('hidden');
            document.getElementById('decisionButtons').classList.remove('hidden');
            
            document.getElementById('choice1').textContent = decision.choices[0].text;
            document.getElementById('choice2').textContent = decision.choices[1].text;
            
            // Store decision data for processing
            this.currentDecision = decision;
        }
    }

    // Process student's decision and provide educational feedback
    makeDecision(choiceIndex) {
        if (this.currentDecision) {
            const choice = this.currentDecision.choices[choiceIndex - 1];
            
            // Show result with educational feedback
            document.getElementById('dialogueText').textContent = choice.result;
            
            // Reset to navigation buttons
            document.getElementById('decisionButtons').classList.add('hidden');
            document.getElementById('navigationButtons').classList.remove('hidden');
            
            // Award progress for making decisions
            this.progress += 0.5;
            this.updateProgress();
        }
    }

    // Show examination results with educational content
    showExaminationResult() {
        const examinations = [
            "You discover ancient stone inscriptions that show early forms of writing systems still used in Southeast Asia today!",
            "These water channels demonstrate hydraulic engineering principles that influenced modern urban planning.",
            "The architectural techniques you observe are still used in traditional buildings across Southeast Asia.",
            "These trade artifacts show how Angkor connected diverse cultures, much like Singapore does today."
        ];
        
        const randomExamination = examinations[Math.floor(Math.random() * examinations.length)];
        document.getElementById('dialogueText').textContent = randomExamination;
        
        // Award discovery points
        this.progress += 0.3;
        this.updateProgress();
    }

    // Add items to inventory with visual feedback
    addToInventory(item) {
        this.inventory.push(item);
        this.updateInventoryDisplay();
        
        // Visual feedback for new discovery
        const inventoryPanel = document.getElementById('inventoryPanel');
        inventoryPanel.style.transform = 'scale(1.05)';
        setTimeout(() => {
            inventoryPanel.style.transform = 'scale(1)';
        }, 300);
    }

    // Update inventory display grid
    updateInventoryDisplay() {
        const inventoryGrid = document.getElementById('inventoryGrid');
        inventoryGrid.innerHTML = '';
        
        // Create inventory slots (max 8 for visual organization)
        for (let i = 0; i < 8; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-item';
            
            if (i < this.inventory.length) {
                slot.textContent = this.inventory[i];
                slot.title = this.getItemDescription(this.inventory[i]);
            } else {
                slot.style.opacity = '0.3';
                slot.style.background = '#f0f0f0';
            }
            
            inventoryGrid.appendChild(slot);
        }
    }

    // Get educational descriptions for inventory items
    getItemDescription(item) {
        const descriptions = {
            '🏛️': 'Temple Architecture - Influences modern building design in Southeast Asia',
            '💧': 'Water Management - Ancient techniques used in modern water systems',
            '🛤️': 'Trade Networks - Established routes still important for global commerce',
            '🎭': 'Cultural Arts - Traditional forms preserved in contemporary culture'
        };
        
        return descriptions[item] || 'Ancient artifact with modern relevance';
    }

    // Update progress bar with smooth animation
    updateProgress() {
        const progressPercent = (this.progress / this.maxProgress) * 100;
        document.getElementById('progressFill').style.width = `${progressPercent}%`;
        document.getElementById('progressText').textContent = `Quest Progress: ${Math.floor(this.progress)}/${this.maxProgress}`;
        
        // Check for completion
        if (this.progress >= this.maxProgress) {
            setTimeout(() => this.showCompletionMessage(), 1000);
        }
    }

    // Show completion message with educational summary
    showCompletionMessage() {
        const completionMessage = `
            🎉 Quest Complete! 🎉
            
            You've successfully explored the Angkor civilisation and discovered how its innovations continue to influence our modern world:
            
            • Architecture and urban planning
            • Water management systems  
            • International trade networks
            • Cultural and artistic traditions
            
            The legacy of Angkor lives on in Singapore and Southeast Asia today!
        `;
        
        document.getElementById('dialogueText').textContent = completionMessage;
        
        // Hide action buttons and show restart option
        document.getElementById('actionPanel').innerHTML = `
            <button class="nav-btn" onclick="game.restart()" style="background: linear-gradient(135deg, #FFD700, #FFA500);">
                🔄 Start New Quest
            </button>
        `;
    }

    // Show tooltip for additional information
    showItemTooltip(element, event) {
        const tooltip = document.getElementById('tooltip');
        const description = element.title;
        
        if (description) {
            tooltip.textContent = description;
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY - 30}px`;
            tooltip.classList.remove('hidden');
        }
    }

    // Hide tooltip
    hideTooltip() {
        document.getElementById('tooltip').classList.add('hidden');
    }

    // Show main tooltip on game container
    showTooltip() {
        const container = document.getElementById('gameContainer');
        container.addEventListener('mouseenter', (e) => {
            this.showItemTooltip(container, e);
        });
        
        container.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });
    }

    // Restart the game
    restart() {
        this.currentScene = 0;
        this.progress = 0;
        this.inventory = [];
        this.updateScene();
        this.updateProgress();
        this.updateInventoryDisplay();
        
        // Reset action panel
        document.getElementById('actionPanel').innerHTML = `
            <div id="navigationButtons">
                <button class="nav-btn" id="exploreBtn" onclick="handleAction('explore')">🔍 Explore Temple</button>
                <button class="nav-btn" id="talkBtn" onclick="handleAction('talk')">💬 Talk to Guide</button>
                <button class="nav-btn" id="examineBtn" onclick="handleAction('examine')">📜 Examine Artifacts</button>
            </div>
            <div id="decisionButtons" class="hidden">
                <button class="decision-btn" id="choice1" onclick="makeDecision(1)"></button>
                <button class="decision-btn" id="choice2" onclick="makeDecision(2)"></button>
            </div>
        `;
    }
}

// Global game instance and helper functions
let game;

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    game = new AngkorQuestGame();
});

// Global helper functions for button interactions
function handleAction(action) {
    game.handleAction(action);
}

function makeDecision(choice) {
    game.makeDecision(choice);
}

// Prevent context menu on touch devices for better UX
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle orientation changes on mobile devices
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        // Recalculate layout if needed
        const container = document.getElementById('gameContainer');
        container.style.height = window.innerHeight > 500 ? '90vh' : '450px';
    }, 100);
});