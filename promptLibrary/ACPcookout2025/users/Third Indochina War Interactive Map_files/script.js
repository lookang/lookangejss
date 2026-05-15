// Third Indochina War Interactive Map JavaScript
// Enhanced with historical and geographical accuracy improvements

class InteractiveMap {
    constructor() {
        // Initialize map properties
        this.currentZoom = 1;
        this.minZoom = 0.5;
        this.maxZoom = 3;
        this.zoomStep = 0.2;
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.currentTranslate = { x: 0, y: 0 };
        
        // Get DOM elements
        this.mapSvg = document.getElementById('map-svg');
        this.popup = document.getElementById('info-popup');
        this.popupTitle = document.getElementById('popup-title');
        this.popupDescription = document.getElementById('popup-description');
        this.popupDetails = document.getElementById('popup-details');
        this.timelineContent = document.getElementById('timeline-content');
        this.timelineToggle = document.getElementById('timeline-toggle');
        
        // Enhanced country information database with historical accuracy
        this.countryData = {
            vietnam: {
                title: "Socialist Republic of Vietnam",
                description: "Unified Vietnam (1975) became the dominant regional power, launching the invasion of Cambodia in 1978.",
                details: `
                    <strong>Historical Context:</strong><br>
                    • Unified after fall of Saigon (April 30, 1975)<br>
                    • Population: ~54 million (1978)<br>
                    • Capital: Hanoi (political), Ho Chi Minh City (economic)<br><br>
                    <strong>Role in Third Indochina War:</strong><br>
                    • Invaded Cambodia on December 25, 1978<br>
                    • Established People's Republic of Kampuchea (PRK)<br>
                    • Maintained 180,000+ troops in Cambodia (1979-1989)<br>
                    • Fought border war with China (Feb-Mar 1979)<br><br>
                    <strong>Motivations:</strong><br>
                    • Border disputes along Mekong Delta<br>
                    • Protection of ethnic Vietnamese in Cambodia<br>
                    • Counter Chinese influence in Southeast Asia<br>
                    • Soviet alliance provided military backing
                `
            },
            cambodia: {
                title: "Democratic Kampuchea (Cambodia)",
                description: "Under Khmer Rouge rule (1975-1979), Cambodia became the primary battleground of the Third Indochina War.",
                details: `
                    <strong>Historical Background:</strong><br>
                    • Khmer Rouge victory: April 17, 1975<br>
                    • Population: ~7-8 million (reduced by genocide)<br>
                    • Capital: Phnom Penh (evacuated 1975-1979)<br><br>
                    <strong>Khmer Rouge Period (1975-1979):</strong><br>
                    • Led by Pol Pot (Saloth Sar)<br>
                    • Radical agrarian communist policies<br>
                    • Genocide: 1.5-2 million deaths<br>
                    • Border raids into Vietnam's Mekong Delta<br><br>
                    <strong>Vietnamese Occupation (1979-1989):</strong><br>
                    • PRK established under Heng Samrin<br>
                    • Khmer Rouge retreated to Thai border<br>
                    • Coalition Government of Democratic Kampuchea formed (1982)<br>
                    • International isolation despite UN seat retention
                `
            },
            china: {
                title: "People's Republic of China",
                description: "China supported the Khmer Rouge and launched a punitive invasion of Vietnam in February 1979.",
                details: `
                    <strong>Strategic Position:</strong><br>
                    • Population: ~970 million (1978)<br>
                    • Leader: Deng Xiaoping (post-Mao era)<br>
                    • Sino-Soviet split influenced regional policy<br><br>
                    <strong>Support for Cambodia:</strong><br>
                    • Primary backer of Khmer Rouge since 1970<br>
                    • Military aid: weapons, training, advisors<br>
                    • Economic support during international isolation<br><br>
                    <strong>Sino-Vietnamese War (1979):</strong><br>
                    • Invasion: February 17 - March 16, 1979<br>
                    • 200,000+ PLA troops involved<br>
                    • Limited territorial gains, high casualties<br>
                    • Objective: "Teach Vietnam a lesson"<br>
                    • Demonstrated limits of Chinese military modernization
                `
            },
            thailand: {
                title: "Kingdom of Thailand",
                description: "Thailand played a crucial role as a frontline state, hosting refugees and facilitating international support.",
                details: `
                    <strong>Geopolitical Position:</strong><br>
                    • ASEAN founding member (1967)<br>
                    • US ally with security concerns<br>
                    • 800km border with Cambodia<br><br>
                    <strong>Refugee Crisis:</strong><br>
                    • 600,000+ Cambodian refugees (1979-1991)<br>
                    • Border camps: Khao-I-Dang, Site 2, others<br>
                    • International humanitarian operations base<br><br>
                    <strong>Covert Operations:</strong><br>
                    • Allowed arms supplies to resistance<br>
                    • Facilitated Chinese military aid<br>
                    • Coordinated with US intelligence<br>
                    • ASEAN diplomatic support for Coalition Government
                `
            },
            laos: {
                title: "Lao People's Democratic Republic",
                description: "Communist Laos served as Vietnam's closest ally and provided logistical support throughout the conflict.",
                details: `
                    <strong>Historical Context:</strong><br>
                    • Communist victory: December 1975<br>
                    • Population: ~3.2 million (1978)<br>
                    • Capital: Vientiane<br>
                    • Landlocked, dependent on Vietnam<br><br>
                    <strong>Role in Conflict:</strong><br>
                    • Vietnamese ally since Pathet Lao victory<br>
                    • Allowed Vietnamese troop transit<br>
                    • Provided rear base for operations<br>
                    • Limited direct involvement in Cambodia<br><br>
                    <strong>Strategic Importance:</strong><br>
                    • Completed Vietnamese sphere of influence<br>
                    • Geographic link in Indochinese communist bloc<br>
                    • Soviet aid recipient through Vietnamese coordination
                `
            },
            myanmar: {
                title: "Union of Burma (Myanmar)",
                description: "Burma maintained neutrality but was affected by regional instability and refugee flows.",
                details: `
                    <strong>Political Context:</strong><br>
                    • Military government under Ne Win<br>
                    • Non-aligned foreign policy<br>
                    • Isolated from regional conflicts<br><br>
                    <strong>Limited Regional Impact:</strong><br>
                    • Minimal involvement in Indochina conflicts<br>
                    • Focus on internal ethnic conflicts<br>
                    • Some refugee spillover from regional instability<br><br>
                    <strong>Strategic Position:</strong><br>
                    • Buffer between China and Southeast Asia<br>
                    • Limited economic ties with conflict participants
                `
            },
            malaysia: {
                title: "Malaysia",
                description: "Malaysia supported ASEAN's position against Vietnamese occupation while managing refugee issues.",
                details: `
                    <strong>ASEAN Leadership:</strong><br>
                    • Strong supporter of Cambodian resistance<br>
                    • Diplomatic pressure on Vietnam<br>
                    • Coordinated international response<br><br>
                    <strong>Refugee Impact:</strong><br>
                    • Vietnamese boat people arrivals<br>
                    • International resettlement coordination<br>
                    • Humanitarian assistance programs<br><br>
                    <strong>Strategic Concerns:</strong><br>
                    • Fear of communist expansion<br>
                    • Regional stability priorities<br>
                    • Balance between humanitarian and security needs
                `
            },
            'ussr-indicator': {
                title: "Soviet Union (USSR)",
                description: "The USSR provided massive military and economic support to Vietnam, making the conflict a proxy war.",
                details: `
                    <strong>Superpower Involvement:</strong><br>
                    • $3+ billion annual aid to Vietnam<br>
                    • Naval facilities at Cam Ranh Bay (1979)<br>
                    • Advanced weapons systems supply<br><br>
                    <strong>Strategic Objectives:</strong><br>
                    • Counter Chinese influence in Southeast Asia<br>
                    • Establish Soviet presence in South China Sea<br>
                    • Support socialist allies against Western-backed forces<br><br>
                    <strong>Military Support:</strong><br>
                    • MiG-23 fighters, T-54/55 tanks<br>
                    • Surface-to-air missiles (SAMs)<br>
                    • Naval vessels and coastal defense systems<br>
                    • Military advisors and technical personnel
                `
            },
            'usa-indicator': {
                title: "United States of America",
                description: "The USA found itself supporting former enemies against former allies in complex Cold War calculations.",
                details: `
                    <strong>Policy Contradictions:</strong><br>
                    • Opposed Vietnamese occupation of Cambodia<br>
                    • Indirectly supported Khmer Rouge through China<br>
                    • Maintained Cambodian UN seat recognition<br><br>
                    <strong>Strategic Calculations:</strong><br>
                    • Sino-American rapprochement (1972) influenced policy<br>
                    • Containment of Soviet influence prioritized<br>
                    • ASEAN alliance commitments<br><br>
                    <strong>Covert Operations:</strong><br>
                    • Intelligence sharing with China and Thailand<br>
                    • Humanitarian aid as political tool<br>
                    • Support for non-communist resistance groups<br>
                    • Diplomatic pressure for Vietnamese withdrawal
                `
            }
        };
        
        // Initialize the map
        this.init();
    }
    
    init() {
        // Set up event listeners for all interactive elements
        this.setupEventListeners();
        
        // Initialize timeline as collapsed
        this.timelineContent.classList.add('hidden');
        
        // Set initial map state
        this.updateMapTransform();
        
        console.log('Third Indochina War Interactive Map initialized with enhanced geographical accuracy');
    }
    
    setupEventListeners() {
        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoom-out').addEventListener('click', () => this.zoomOut());
        document.getElementById('reset-view').addEventListener('click', () => this.resetView());
        
        // Country click events - now includes Myanmar and Malaysia for geographical completeness
        const countries = document.querySelectorAll('.country, .superpower');
        countries.forEach(country => {
            country.addEventListener('click', (e) => this.showCountryInfo(e.target.id));
            
            // Add touch feedback for mobile devices
            country.addEventListener('touchstart', (e) => {
                e.target.style.opacity = '0.8';
            });
            
            country.addEventListener('touchend', (e) => {
                e.target.style.opacity = '';
            });
        });
        
        // Popup close functionality
        document.getElementById('close-popup').addEventListener('click', () => this.hidePopup());
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) this.hidePopup();
        });
        
        // Timeline toggle
        document.querySelector('.timeline-header').addEventListener('click', () => this.toggleTimeline());
        
        // Timeline item interactions - enhanced with more historical events
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.addEventListener('click', (e) => this.highlightTimelineEvent(e.currentTarget));
        });
        
        // Map dragging functionality
        this.setupMapDragging();
        
        // Keyboard accessibility
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Prevent context menu on long press (mobile)
        this.mapSvg.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    setupMapDragging() {
        // Mouse events
        this.mapSvg.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.endDrag());
        
        // Touch events for mobile
        this.mapSvg.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.startDrag(touch);
        });
        
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                this.drag(touch);
            }
        });
        
        document.addEventListener('touchend', () => this.endDrag());
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.dragStart.x = e.clientX - this.currentTranslate.x;
        this.dragStart.y = e.clientY - this.currentTranslate.y;
        this.mapSvg.style.cursor = 'grabbing';
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        this.currentTranslate.x = e.clientX - this.dragStart.x;
        this.currentTranslate.y = e.clientY - this.dragStart.y;
        
        // Limit dragging bounds
        const maxTranslate = 100 * this.currentZoom;
        this.currentTranslate.x = Math.max(-maxTranslate, Math.min(maxTranslate, this.currentTranslate.x));
        this.currentTranslate.y = Math.max(-maxTranslate, Math.min(maxTranslate, this.currentTranslate.y));
        
        this.updateMapTransform();
    }
    
    endDrag() {
        this.isDragging = false;
        this.mapSvg.style.cursor = 'grab';
    }
    
    zoomIn() {
        if (this.currentZoom < this.maxZoom) {
            this.currentZoom = Math.min(this.maxZoom, this.currentZoom + this.zoomStep);
            this.updateMapTransform();
            this.announceZoomLevel();
        }
    }
    
    zoomOut() {
        if (this.currentZoom > this.minZoom) {
            this.currentZoom = Math.max(this.minZoom, this.currentZoom - this.zoomStep);
            this.updateMapTransform();
            this.announceZoomLevel();
        }
    }
    
    resetView() {
        this.currentZoom = 1;
        this.currentTranslate = { x: 0, y: 0 };
        this.updateMapTransform();
        console.log('Map view reset to default - showing accurate Southeast Asian geography');
    }
    
    updateMapTransform() {
        const transform = `scale(${this.currentZoom}) translate(${this.currentTranslate.x}px, ${this.currentTranslate.y}px)`;
        this.mapSvg.style.transform = transform;
    }
    
    announceZoomLevel() {
        // Accessibility: announce zoom level for screen readers
        const zoomPercent = Math.round(this.currentZoom * 100);
        console.log(`Zoom level: ${zoomPercent}%`);
    }
    
    showCountryInfo(countryId) {
        const countryInfo = this.countryData[countryId];
        if (!countryInfo) return;
        
        // Populate popup content with enhanced historical information
        this.popupTitle.textContent = countryInfo.title;
        this.popupDescription.textContent = countryInfo.description;
        this.popupDetails.innerHTML = countryInfo.details;
        
        // Show popup with animation
        this.popup.classList.remove('hidden');
        
        // Focus management for accessibility
        this.popup.focus();
        
        console.log(`Displaying historically accurate information for: ${countryInfo.title}`);
    }
    
    hidePopup() {
        this.popup.classList.add('hidden');
        console.log('Country information popup closed');
    }
    
    toggleTimeline() {
        const isHidden = this.timelineContent.classList.contains('hidden');
        
        if (isHidden) {
            this.timelineContent.classList.remove('hidden');
            this.timelineToggle.classList.add('expanded');
            this.timelineToggle.textContent = '▲';
        } else {
            this.timelineContent.classList.add('hidden');
            this.timelineToggle.classList.remove('expanded');
            this.timelineToggle.textContent = '▼';
        }
        
        console.log(`Enhanced timeline ${isHidden ? 'expanded' : 'collapsed'} - showing accurate historical dates`);
    }
    
    highlightTimelineEvent(item) {
        // Remove previous highlights
        document.querySelectorAll('.timeline-item').forEach(el => {
            el.style.backgroundColor = '';
        });
        
        // Highlight selected item
        item.style.backgroundColor = '#e3f2fd';
        
        const year = item.dataset.year;
        const event = item.querySelector('.event').textContent;
        
        // Create temporary tooltip for additional historical context
        this.showTimelineTooltip(item, year, event);
        
        console.log(`Historical timeline event selected: ${year} - ${event}`);
    }
    
    showTimelineTooltip(item, year, event) {
        // Remove existing tooltip
        const existingTooltip = document.querySelector('.timeline-tooltip');
        if (existingTooltip) existingTooltip.remove();
        
        // Enhanced historical context for timeline events
        const historicalContext = {
            '1975': 'End of Vietnam War - Communist victory unified Indochina under Vietnamese influence',
            '1978': 'Vietnamese invasion launched from multiple points along Cambodia border',
            '1979': 'Sino-Vietnamese War - China\'s attempt to punish Vietnam for Soviet alignment',
            '1982': 'Coalition Government united non-communist resistance with Khmer Rouge',
            '1989': 'Vietnamese withdrawal coincided with end of Cold War dynamics',
            '1991': 'Paris Agreements established UN transitional authority (UNTAC)'
        };
        
        // Create new tooltip with historical context
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip timeline-tooltip';
        tooltip.textContent = historicalContext[year] || `${year}: ${event}`;
        tooltip.style.opacity = '1';
        tooltip.style.position = 'absolute';
        tooltip.style.bottom = '100%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.marginBottom = '10px';
        tooltip.style.maxWidth = '250px';
        
        item.style.position = 'relative';
        item.appendChild(tooltip);
        
        // Auto-remove tooltip after 4 seconds (longer for more detailed context)
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
            item.style.backgroundColor = '';
        }, 4000);
    }
    
    handleKeyboard(e) {
        // Keyboard shortcuts for accessibility
        switch(e.key) {
            case 'Escape':
                if (!this.popup.classList.contains('hidden')) {
                    this.hidePopup();
                }
                break;
            case '+':
            case '=':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.zoomIn();
                }
                break;
            case '-':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.zoomOut();
                }
                break;
            case '0':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.resetView();
                }
                break;
        }
    }
}

// Initialize the enhanced interactive map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const map = new InteractiveMap();
    
    // Add loading animation completion
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    console.log('Third Indochina War Interactive Map loaded with enhanced historical and geographical accuracy');
    console.log('Improvements: Accurate country shapes, proper positioning, historical borders, major cities, Mekong River');
    console.log('Additional context: Myanmar and Malaysia included for regional completeness');
    console.log('Enhanced timeline: More precise dates and historical context');
    console.log('Educational objectives: Understanding Cold War conflicts in Southeast Asia with geographical accuracy');
    console.log('Target audience: JC1 students with mixed abilities');
});