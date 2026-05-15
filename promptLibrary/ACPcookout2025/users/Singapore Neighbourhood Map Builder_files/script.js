// Singapore Neighbourhood Map Builder - Interactive Simulation
// Designed for Primary 2 students to explore spatial awareness and community planning

class NeighbourhoodSimulator {
    constructor() {
        // Initialize simulation state
        this.placedBuildings = new Map(); // Track placed buildings and their positions
        this.communityScores = {
            happiness: 50,
            accessibility: 50,
            safety: 50
        };
        
        // Building types and their community impact values
        this.buildingImpacts = {
            school: { happiness: 15, accessibility: 20, safety: 10 },
            hospital: { happiness: 10, accessibility: 25, safety: 15 },
            market: { happiness: 12, accessibility: 18, safety: 8 },
            park: { happiness: 20, accessibility: 5, safety: 12 },
            library: { happiness: 18, accessibility: 15, safety: 8 },
            playground: { happiness: 25, accessibility: 8, safety: 5 }
        };
        
        // Zone multipliers for strategic placement
        this.zoneMultipliers = {
            residential: { happiness: 1.2, accessibility: 1.1, safety: 1.3 },
            commercial: { happiness: 0.9, accessibility: 1.3, safety: 0.8 },
            recreational: { happiness: 1.4, accessibility: 0.8, safety: 1.1 }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateCommunityIndicators();
        this.showWelcomeMessage();
    }
    
    setupEventListeners() {
        // Drag and drop functionality for building placement
        this.setupDragAndDrop();
        
        // Control button listeners
        document.querySelector('.reset-btn').addEventListener('click', () => this.resetMap());
        document.querySelector('.analyze-btn').addEventListener('click', () => this.analyzeCommmunity());
        
        // Tooltip system for educational feedback
        this.setupTooltipSystem();
    }
    
    setupDragAndDrop() {
        const buildingItems = document.querySelectorAll('.building-item');
        const mapContainer = document.querySelector('.map-container');
        const dropZones = document.querySelectorAll('.drop-zone');
        
        // Make building items draggable
        buildingItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.dataset.type);
                item.style.opacity = '0.5';
            });
            
            item.addEventListener('dragend', (e) => {
                item.style.opacity = '1';
            });
        });
        
        // Setup drop zones
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const buildingType = e.dataTransfer.getData('text/plain');
                const rect = zone.getBoundingClientRect();
                const containerRect = mapContainer.getBoundingClientRect();
                
                // Calculate relative position within the map container
                const x = rect.left - containerRect.left + (rect.width / 2);
                const y = rect.top - containerRect.top + (rect.height / 2);
                
                this.placeBuildingOnMap(buildingType, x, y, zone.dataset.zone);
            });
        });
        
        // Allow dropping anywhere on the map
        mapContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        mapContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            
            const buildingType = e.dataTransfer.getData('text/plain');
            const rect = mapContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.placeBuildingOnMap(buildingType, x, y, 'general');
        });
    }
    
    placeBuildingOnMap(buildingType, x, y, zone = 'general') {
        const mapContainer = document.querySelector('.map-container');
        
        // Create building element
        const building = document.createElement('div');
        building.className = 'placed-building';
        building.dataset.type = buildingType;
        building.dataset.zone = zone;
        
        // Get building icon and name
        const iconMap = {
            school: '🏫',
            hospital: '🏥',
            market: '🏪',
            park: '🌳',
            library: '📚',
            playground: '🎪'
        };
        
        const nameMap = {
            school: 'School',
            hospital: 'Hospital',
            market: 'Market',
            park: 'Park',
            library: 'Library',
            playground: 'Playground'
        };
        
        building.innerHTML = `
            <div class="building-icon">${iconMap[buildingType]}</div>
            <span>${nameMap[buildingType]}</span>
        `;
        
        // Position the building
        building.style.left = `${Math.max(10, Math.min(x - 30, mapContainer.offsetWidth - 70))}px`;
        building.style.top = `${Math.max(10, Math.min(y - 30, mapContainer.offsetHeight - 70))}px`;
        
        // Add click to remove functionality
        building.addEventListener('click', () => {
            this.removeBuildingFromMap(building);
        });
        
        // Add tooltip
        building.title = `Click to remove this ${nameMap[buildingType]}`;
        
        mapContainer.appendChild(building);
        
        // Track the placed building
        const buildingId = Date.now();
        this.placedBuildings.set(buildingId, {
            type: buildingType,
            zone: zone,
            element: building
        });
        
        // Update community scores
        this.updateCommunityScores();
        this.showBuildingPlacedFeedback(nameMap[buildingType], zone);
    }
    
    removeBuildingFromMap(buildingElement) {
        // Find and remove from tracking
        for (let [id, building] of this.placedBuildings.entries()) {
            if (building.element === buildingElement) {
                this.placedBuildings.delete(id);
                break;
            }
        }
        
        // Remove from DOM
        buildingElement.remove();
        
        // Update community scores
        this.updateCommunityScores();
        this.showBuildingRemovedFeedback();
    }
    
    updateCommunityScores() {
        // Reset scores to base values
        this.communityScores = { happiness: 30, accessibility: 30, safety: 30 };
        
        // Calculate impact from each placed building
        for (let building of this.placedBuildings.values()) {
            const impact = this.buildingImpacts[building.type];
            const zoneMultiplier = this.zoneMultipliers[building.zone] || { happiness: 1, accessibility: 1, safety: 1 };
            
            // Apply building impact with zone multipliers
            this.communityScores.happiness += Math.round(impact.happiness * zoneMultiplier.happiness);
            this.communityScores.accessibility += Math.round(impact.accessibility * zoneMultiplier.accessibility);
            this.communityScores.safety += Math.round(impact.safety * zoneMultiplier.safety);
        }
        
        // Cap scores at 100
        Object.keys(this.communityScores).forEach(key => {
            this.communityScores[key] = Math.min(100, this.communityScores[key]);
        });
        
        this.updateCommunityIndicators();
    }
    
    updateCommunityIndicators() {
        // Update visual indicators with smooth animations
        const indicators = ['happiness', 'accessibility', 'safety'];
        
        indicators.forEach(indicator => {
            const fill = document.querySelector(`.${indicator}-fill`);
            const value = document.querySelector(`.${indicator}-value`);
            
            const score = this.communityScores[indicator];
            
            // Animate the fill bar
            fill.style.width = `${score}%`;
            value.textContent = `${score}%`;
            
            // Color coding based on score
            if (score >= 80) {
                fill.style.background = 'linear-gradient(90deg, #4caf50, #8bc34a)';
            } else if (score >= 60) {
                fill.style.background = 'linear-gradient(90deg, #ff9800, #ffc107)';
            } else {
                fill.style.background = 'linear-gradient(90deg, #f44336, #ff5722)';
            }
        });
    }
    
    analyzeCommmunity() {
        const buildingCount = this.placedBuildings.size;
        
        if (buildingCount === 0) {
            this.showCenterTooltip("Place some buildings on the map first to analyze your community!");
            return;
        }
        
        // Generate analysis based on current state
        let analysis = this.generateCommunityAnalysis();
        this.showCommunityAnalysis(analysis);
    }
    
    generateCommunityAnalysis() {
        const scores = this.communityScores;
        const buildingCount = this.placedBuildings.size;
        
        let analysis = {
            overall: '',
            suggestions: [],
            strengths: []
        };
        
        // Overall assessment
        const averageScore = Math.round((scores.happiness + scores.accessibility + scores.safety) / 3);
        
        if (averageScore >= 80) {
            analysis.overall = "Excellent! Your neighbourhood is thriving and well-balanced.";
        } else if (averageScore >= 65) {
            analysis.overall = "Good work! Your neighbourhood is developing well.";
        } else if (averageScore >= 50) {
            analysis.overall = "Your neighbourhood is okay, but could use some improvements.";
        } else {
            analysis.overall = "Your neighbourhood needs more planning to help the community.";
        }
        
        // Identify strengths
        if (scores.happiness >= 70) analysis.strengths.push("People are happy here!");
        if (scores.accessibility >= 70) analysis.strengths.push("Easy to get around!");
        if (scores.safety >= 70) analysis.strengths.push("Very safe neighbourhood!");
        
        // Generate suggestions
        if (scores.happiness < 60) {
            analysis.suggestions.push("Add more parks and playgrounds to make people happier!");
        }
        if (scores.accessibility < 60) {
            analysis.suggestions.push("Add schools and hospitals to help people access services!");
        }
        if (scores.safety < 60) {
            analysis.suggestions.push("Consider better placement of buildings for safety!");
        }
        
        if (buildingCount < 3) {
            analysis.suggestions.push("Try adding more buildings to create a complete neighbourhood!");
        }
        
        return analysis;
    }
    
    showCommunityAnalysis(analysis) {
        let message = `${analysis.overall}\n\n`;
        
        if (analysis.strengths.length > 0) {
            message += "Strengths:\n" + analysis.strengths.map(s => `• ${s}`).join('\n') + '\n\n';
        }
        
        if (analysis.suggestions.length > 0) {
            message += "Suggestions:\n" + analysis.suggestions.map(s => `• ${s}`).join('\n');
        }
        
        this.updateFeedbackText(message);
        this.showCenterTooltip("Community analysis complete! Check the results panel for details.");
    }
    
    resetMap() {
        // Remove all placed buildings
        this.placedBuildings.forEach(building => {
            building.element.remove();
        });
        
        this.placedBuildings.clear();
        
        // Reset community scores
        this.updateCommunityScores();
        
        // Reset feedback
        this.updateFeedbackText("Place buildings on the map to see how they affect your community!");
        
        this.showCenterTooltip("Map reset! Start building your neighbourhood again.");
    }
    
    setupTooltipSystem() {
        const tooltip = document.getElementById('centerTooltip');
        let tooltipTimeout;
        
        // Enhanced tooltip system for educational content
        document.addEventListener('mouseover', (e) => {
            if (e.target.title) {
                const title = e.target.title;
                e.target.title = ''; // Prevent default tooltip
                
                clearTimeout(tooltipTimeout);
                tooltip.textContent = title;
                tooltip.classList.add('show');
                
                // Store original title for restoration
                e.target.dataset.originalTitle = title;
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.dataset.originalTitle) {
                e.target.title = e.target.dataset.originalTitle;
                delete e.target.dataset.originalTitle;
                
                tooltipTimeout = setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 300);
            }
        });
    }
    
    showCenterTooltip(message, duration = 3000) {
        const tooltip = document.getElementById('centerTooltip');
        tooltip.textContent = message;
        tooltip.classList.add('show');
        
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, duration);
    }
    
    updateFeedbackText(text) {
        document.getElementById('feedbackText').textContent = text;
    }
    
    showBuildingPlacedFeedback(buildingName, zone) {
        const zoneNames = {
            residential: 'Residential Area',
            commercial: 'Commercial Area',
            recreational: 'Recreational Area',
            general: 'the map'
        };
        
        const zoneName = zoneNames[zone] || 'the map';
        this.showCenterTooltip(`${buildingName} placed in ${zoneName}! Watch how it affects your community.`);
    }
    
    showBuildingRemovedFeedback() {
        this.showCenterTooltip("Building removed! See how your community changes.");
    }
    
    showWelcomeMessage() {
        setTimeout(() => {
            this.showCenterTooltip("Welcome! Drag buildings from the left panel onto the map to build your Singapore neighbourhood!", 4000);
        }, 1000);
    }
}

// Initialize the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NeighbourhoodSimulator();
});

// Touch support for mobile devices
document.addEventListener('touchstart', (e) => {
    // Enable touch interactions for drag and drop on mobile
    if (e.target.classList.contains('building-item')) {
        e.target.style.transform = 'scale(1.05)';
    }
});

document.addEventListener('touchend', (e) => {
    if (e.target.classList.contains('building-item')) {
        e.target.style.transform = 'scale(1)';
    }
});

// Responsive design adjustments
window.addEventListener('resize', () => {
    // Adjust layout for different screen sizes
    const container = document.querySelector('.container');
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        container.style.flexDirection = 'column';
    } else {
        container.style.flexDirection = 'row';
    }
});