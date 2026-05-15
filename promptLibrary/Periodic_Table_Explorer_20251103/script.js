// Periodic Table Explorer - Interactive Chemistry Learning Tool
// Designed for Secondary 3-4 students following Singapore curriculum

class PeriodicTableExplorer {
    constructor() {
        // Initialize analytics tracking
        this.analytics = {
            elementsExplored: new Set(),
            propertyViewsUsed: new Set(),
            groupsFiltered: 0,
            sessionStartTime: Date.now(),
            interactions: []
        };
        
        // Current state
        this.currentProperty = 'default';
        this.selectedElement = null;
        
        // Initialize the application
        this.init();
    }
    
    init() {
        this.createPeriodicTable();
        this.setupEventListeners();
        this.startAnalyticsTimer();
        this.updateAnalytics();
        
        // Detect if running in iframe
        if (window !== window.parent) {
            document.body.classList.add('iframe-mode');
        }
    }
    
    // Simplified periodic table data for Secondary 3-4 level
    getElementData() {
        return [
            // Period 1
            {symbol: 'H', name: 'Hydrogen', number: 1, mass: 1.008, group: 'nonmetals', period: 1, column: 1, electronegativity: 2.20, atomicRadius: 37, ionizationEnergy: 1312},
            {symbol: 'He', name: 'Helium', number: 2, mass: 4.003, group: 'noble-gases', period: 1, column: 18, electronegativity: null, atomicRadius: 32, ionizationEnergy: 2372},
            
            // Period 2
            {symbol: 'Li', name: 'Lithium', number: 3, mass: 6.941, group: 'alkali-metals', period: 2, column: 1, electronegativity: 0.98, atomicRadius: 134, ionizationEnergy: 520},
            {symbol: 'Be', name: 'Beryllium', number: 4, mass: 9.012, group: 'alkaline-earth', period: 2, column: 2, electronegativity: 1.57, atomicRadius: 90, ionizationEnergy: 899},
            {symbol: 'B', name: 'Boron', number: 5, mass: 10.811, group: 'metalloids', period: 2, column: 13, electronegativity: 2.04, atomicRadius: 82, ionizationEnergy: 801},
            {symbol: 'C', name: 'Carbon', number: 6, mass: 12.011, group: 'nonmetals', period: 2, column: 14, electronegativity: 2.55, atomicRadius: 77, ionizationEnergy: 1086},
            {symbol: 'N', name: 'Nitrogen', number: 7, mass: 14.007, group: 'nonmetals', period: 2, column: 15, electronegativity: 3.04, atomicRadius: 75, ionizationEnergy: 1402},
            {symbol: 'O', name: 'Oxygen', number: 8, mass: 15.999, group: 'nonmetals', period: 2, column: 16, electronegativity: 3.44, atomicRadius: 73, ionizationEnergy: 1314},
            {symbol: 'F', name: 'Fluorine', number: 9, mass: 18.998, group: 'nonmetals', period: 2, column: 17, electronegativity: 3.98, atomicRadius: 71, ionizationEnergy: 1681},
            {symbol: 'Ne', name: 'Neon', number: 10, mass: 20.180, group: 'noble-gases', period: 2, column: 18, electronegativity: null, atomicRadius: 69, ionizationEnergy: 2081},
            
            // Period 3
            {symbol: 'Na', name: 'Sodium', number: 11, mass: 22.990, group: 'alkali-metals', period: 3, column: 1, electronegativity: 0.93, atomicRadius: 154, ionizationEnergy: 496},
            {symbol: 'Mg', name: 'Magnesium', number: 12, mass: 24.305, group: 'alkaline-earth', period: 3, column: 2, electronegativity: 1.31, atomicRadius: 130, ionizationEnergy: 738},
            {symbol: 'Al', name: 'Aluminium', number: 13, mass: 26.982, group: 'other-metals', period: 3, column: 13, electronegativity: 1.61, atomicRadius: 118, ionizationEnergy: 578},
            {symbol: 'Si', name: 'Silicon', number: 14, mass: 28.086, group: 'metalloids', period: 3, column: 14, electronegativity: 1.90, atomicRadius: 111, ionizationEnergy: 787},
            {symbol: 'P', name: 'Phosphorus', number: 15, mass: 30.974, group: 'nonmetals', period: 3, column: 15, electronegativity: 2.19, atomicRadius: 98, ionizationEnergy: 1012},
            {symbol: 'S', name: 'Sulfur', number: 16, mass: 32.065, group: 'nonmetals', period: 3, column: 16, electronegativity: 2.58, atomicRadius: 88, ionizationEnergy: 1000},
            {symbol: 'Cl', name: 'Chlorine', number: 17, mass: 35.453, group: 'nonmetals', period: 3, column: 17, electronegativity: 3.16, atomicRadius: 79, ionizationEnergy: 1251},
            {symbol: 'Ar', name: 'Argon', number: 18, mass: 39.948, group: 'noble-gases', period: 3, column: 18, electronegativity: null, atomicRadius: 71, ionizationEnergy: 1521},
            
            // Period 4 (selected elements)
            {symbol: 'K', name: 'Potassium', number: 19, mass: 39.098, group: 'alkali-metals', period: 4, column: 1, electronegativity: 0.82, atomicRadius: 196, ionizationEnergy: 419},
            {symbol: 'Ca', name: 'Calcium', number: 20, mass: 40.078, group: 'alkaline-earth', period: 4, column: 2, electronegativity: 1.00, atomicRadius: 174, ionizationEnergy: 590},
            {symbol: 'Fe', name: 'Iron', number: 26, mass: 55.845, group: 'transition-metals', period: 4, column: 8, electronegativity: 1.83, atomicRadius: 140, ionizationEnergy: 762},
            {symbol: 'Cu', name: 'Copper', number: 29, mass: 63.546, group: 'transition-metals', period: 4, column: 11, electronegativity: 1.90, atomicRadius: 145, ionizationEnergy: 745},
            {symbol: 'Zn', name: 'Zinc', number: 30, mass: 65.38, group: 'transition-metals', period: 4, column: 12, electronegativity: 1.65, atomicRadius: 142, ionizationEnergy: 906},
            {symbol: 'Br', name: 'Bromine', number: 35, mass: 79.904, group: 'nonmetals', period: 4, column: 17, electronegativity: 2.96, atomicRadius: 94, ionizationEnergy: 1140},
            {symbol: 'Kr', name: 'Krypton', number: 36, mass: 83.798, group: 'noble-gases', period: 4, column: 18, electronegativity: 3.00, atomicRadius: 88, ionizationEnergy: 1351}
        ];
    }
    
    createPeriodicTable() {
        const tableContainer = document.getElementById('periodic-table');
        const elements = this.getElementData();
        
        // Create grid positions for elements
        elements.forEach(element => {
            const elementDiv = document.createElement('div');
            elementDiv.className = `element ${element.group}`;
            elementDiv.style.gridColumn = element.column;
            elementDiv.style.gridRow = element.period;
            
            elementDiv.innerHTML = `
                <div class="element-number">${element.number}</div>
                <div class="element-symbol">${element.symbol}</div>
                <div class="element-name">${element.name}</div>
            `;
            
            // Store element data
            elementDiv.dataset.element = JSON.stringify(element);
            
            // Add event listeners for both mouse and touch
            this.addElementEventListeners(elementDiv, element);
            
            tableContainer.appendChild(elementDiv);
        });
    }
    
    addElementEventListeners(elementDiv, element) {
        // Mouse events
        elementDiv.addEventListener('click', () => this.selectElement(element, elementDiv));
        elementDiv.addEventListener('mouseenter', (e) => this.showTooltip(e, element));
        elementDiv.addEventListener('mouseleave', () => this.hideTooltip());
        
        // Touch events for mobile
        elementDiv.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.selectElement(element, elementDiv);
            this.showTooltip(e, element);
        });
        
        elementDiv.addEventListener('touchend', (e) => {
            e.preventDefault();
            setTimeout(() => this.hideTooltip(), 2000); // Hide tooltip after 2 seconds on touch
        });
    }
    
    selectElement(element, elementDiv) {
        // Remove previous selection
        document.querySelectorAll('.element.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Add selection to current element
        elementDiv.classList.add('selected');
        this.selectedElement = element;
        
        // Update element details panel
        this.updateElementDetails(element);
        
        // Track analytics
        this.analytics.elementsExplored.add(element.symbol);
        this.analytics.interactions.push({
            type: 'element_selected',
            element: element.symbol,
            timestamp: Date.now()
        });
        
        this.updateAnalytics();
    }
    
    updateElementDetails(element) {
        document.getElementById('element-name').textContent = element.name;
        document.getElementById('element-symbol').textContent = element.symbol;
        document.getElementById('atomic-number').textContent = element.number;
        document.getElementById('atomic-mass').textContent = element.mass;
        document.getElementById('element-group').textContent = this.getGroupName(element.group);
        document.getElementById('element-period').textContent = element.period;
        document.getElementById('electronegativity').textContent = 
            element.electronegativity ? element.electronegativity : 'N/A';
    }
    
    getGroupName(group) {
        const groupNames = {
            'alkali-metals': 'Alkali Metals',
            'alkaline-earth': 'Alkaline Earth Metals',
            'transition-metals': 'Transition Metals',
            'other-metals': 'Other Metals',
            'metalloids': 'Metalloids',
            'nonmetals': 'Nonmetals',
            'noble-gases': 'Noble Gases',
            'lanthanides': 'Lanthanides',
            'actinides': 'Actinides'
        };
        return groupNames[group] || 'Unknown';
    }
    
    showTooltip(event, element) {
        const tooltip = document.getElementById('tooltip');
        const rect = event.target.getBoundingClientRect();
        
        tooltip.innerHTML = `
            <strong>${element.name} (${element.symbol})</strong><br>
            Atomic Number: ${element.number}<br>
            Mass: ${element.mass}<br>
            Group: ${this.getGroupName(element.group)}
        `;
        
        tooltip.style.left = `${rect.left + rect.width/2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
        tooltip.classList.add('show');
    }
    
    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('show');
    }
    
    setupEventListeners() {
        // Property view selector
        const propertySelect = document.getElementById('property-select');
        propertySelect.addEventListener('change', (e) => {
            this.currentProperty = e.target.value;
            this.updatePropertyView();
            
            // Track analytics
            this.analytics.propertyViewsUsed.add(e.target.value);
            this.analytics.interactions.push({
                type: 'property_view_changed',
                property: e.target.value,
                timestamp: Date.now()
            });
            
            this.updateAnalytics();
        });
        
        // Group filter checkboxes
        const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateGroupFilters();
                
                // Track analytics
                this.analytics.groupsFiltered++;
                this.analytics.interactions.push({
                    type: 'group_filter_changed',
                    group: checkbox.id,
                    checked: checkbox.checked,
                    timestamp: Date.now()
                });
                
                this.updateAnalytics();
            });
        });
        
        // Reset button
        const resetBtn = document.getElementById('reset-btn');
        resetBtn.addEventListener('click', () => {
            this.resetView();
            
            // Track analytics
            this.analytics.interactions.push({
                type: 'reset_clicked',
                timestamp: Date.now()
            });
        });
        
        // Touch event handling for mobile
        document.addEventListener('touchstart', (e) => {
            // Prevent default touch behavior on interactive elements
            if (e.target.classList.contains('element') || 
                e.target.classList.contains('reset-button') ||
                e.target.tagName === 'SELECT' ||
                e.target.type === 'checkbox') {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    updatePropertyView() {
        const elements = document.querySelectorAll('.element');
        
        if (this.currentProperty === 'default') {
            // Reset to group colors
            elements.forEach(element => {
                const data = JSON.parse(element.dataset.element);
                element.className = `element ${data.group}`;
                if (this.selectedElement && data.symbol === this.selectedElement.symbol) {
                    element.classList.add('selected');
                }
            });
        } else {
            // Apply property-based coloring
            this.applyPropertyColoring(elements);
        }
    }
    
    applyPropertyColoring(elements) {
        const elementData = this.getElementData();
        const property = this.currentProperty;
        
        // Get min and max values for the property
        const values = elementData
            .map(el => el[property])
            .filter(val => val !== null && val !== undefined);
        
        const minVal = Math.min(...values);
        const maxVal = Math.max(...values);
        
        elements.forEach(element => {
            const data = JSON.parse(element.dataset.element);
            const value = data[property];
            
            if (value !== null && value !== undefined) {
                // Calculate color intensity based on value
                const intensity = (value - minVal) / (maxVal - minVal);
                const hue = 240 - (intensity * 180); // Blue to red gradient
                element.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
                element.style.color = intensity > 0.5 ? 'white' : 'black';
            } else {
                element.style.backgroundColor = '#e9ecef';
                element.style.color = 'black';
            }
            
            // Maintain selection
            if (this.selectedElement && data.symbol === this.selectedElement.symbol) {
                element.classList.add('selected');
            }
        });
    }
    
    updateGroupFilters() {
        const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
        const elements = document.querySelectorAll('.element');
        
        elements.forEach(element => {
            const data = JSON.parse(element.dataset.element);
            const groupCheckbox = document.getElementById(data.group);
            
            if (groupCheckbox && !groupCheckbox.checked) {
                element.style.display = 'none';
            } else {
                element.style.display = 'flex';
            }
        });
    }
    
    resetView() {
        // Reset property view
        document.getElementById('property-select').value = 'default';
        this.currentProperty = 'default';
        
        // Reset group filters
        const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        
        // Reset element selection
        document.querySelectorAll('.element.selected').forEach(el => {
            el.classList.remove('selected');
        });
        this.selectedElement = null;
        
        // Reset element details
        document.getElementById('element-name').textContent = 'Select an element';
        document.getElementById('element-symbol').textContent = '-';
        document.getElementById('atomic-number').textContent = '-';
        document.getElementById('atomic-mass').textContent = '-';
        document.getElementById('element-group').textContent = '-';
        document.getElementById('element-period').textContent = '-';
        document.getElementById('electronegativity').textContent = '-';
        
        // Update views
        this.updatePropertyView();
        this.updateGroupFilters();
        this.updateAnalytics();
    }
    
    startAnalyticsTimer() {
        setInterval(() => {
            this.updateSessionTime();
        }, 1000);
    }
    
    updateSessionTime() {
        const elapsed = Date.now() - this.analytics.sessionStartTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        document.getElementById('session-time').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateAnalytics() {
        document.getElementById('elements-explored').textContent = this.analytics.elementsExplored.size;
        document.getElementById('property-views').textContent = this.analytics.propertyViewsUsed.size;
        document.getElementById('groups-filtered').textContent = this.analytics.groupsFiltered;
    }
}

// Initialize the Periodic Table Explorer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PeriodicTableExplorer();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Recalculate layout if needed
    const tooltip = document.getElementById('tooltip');
    if (tooltip.classList.contains('show')) {
        tooltip.classList.remove('show');
    }
});

// Export for potential testing or extension
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PeriodicTableExplorer;
}