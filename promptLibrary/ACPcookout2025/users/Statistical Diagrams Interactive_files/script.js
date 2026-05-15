// Statistical Diagrams Interactive Application
// Designed for Secondary 1 students to explore different ways of representing data

class StatisticalDiagrams {
    constructor() {
        // Initialize application state
        this.currentChartType = 'bar';
        this.data = [];
        this.colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
        
        // Initialize the application
        this.init();
    }

    init() {
        // Set up event listeners and initial state
        this.setupEventListeners();
        this.initializeTable();
        this.loadSampleData();
        this.updateChart();
    }

    setupEventListeners() {
        // Chart type selection buttons
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectChartType(e.currentTarget.dataset.type);
            });
        });

        // Sample data button
        document.querySelector('.sample-btn').addEventListener('click', () => {
            this.loadSampleData();
        });

        // Add row button
        document.querySelector('.add-row-btn').addEventListener('click', () => {
            this.addTableRow();
        });

        // Tooltip functionality for help text
        this.setupTooltips();
    }

    setupTooltips() {
        // Enhanced tooltip system for better user guidance
        const tooltip = document.getElementById('helpTooltip');
        
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const title = e.target.getAttribute('title');
                if (title) {
                    tooltip.textContent = title;
                    tooltip.style.opacity = '1';
                    this.positionTooltip(e, tooltip);
                }
            });

            element.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });

            element.addEventListener('mousemove', (e) => {
                if (tooltip.style.opacity === '1') {
                    this.positionTooltip(e, tooltip);
                }
            });
        });
    }

    positionTooltip(e, tooltip) {
        // Position tooltip near cursor but keep it visible
        const rect = document.querySelector('.container').getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        tooltip.style.left = Math.min(x + 10, rect.width - tooltip.offsetWidth - 10) + 'px';
        tooltip.style.top = Math.max(y - tooltip.offsetHeight - 10, 10) + 'px';
    }

    initializeTable() {
        // Create initial empty rows for data entry
        const tableBody = document.getElementById('dataTableBody');
        tableBody.innerHTML = '';
        
        // Start with 5 empty rows
        for (let i = 0; i < 5; i++) {
            this.addTableRow(i, 0);
        }
    }

    addTableRow(siblings = '', frequency = '') {
        // Add a new row to the data entry table
        const tableBody = document.getElementById('dataTableBody');
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td><input type="number" min="0" value="${siblings}" placeholder="0" class="siblings-input"></td>
            <td><input type="number" min="0" value="${frequency}" placeholder="0" class="frequency-input"></td>
        `;
        
        tableBody.appendChild(row);
        
        // Add event listeners to new inputs
        row.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                this.updateDataFromTable();
                this.updateChart();
            });
        });
    }

    loadSampleData() {
        // Load sample data about siblings for demonstration
        const sampleData = [
            { siblings: 0, frequency: 8 },
            { siblings: 1, frequency: 12 },
            { siblings: 2, frequency: 7 },
            { siblings: 3, frequency: 3 },
            { siblings: 4, frequency: 1 }
        ];
        
        // Clear existing table
        this.initializeTable();
        
        // Populate table with sample data
        const tableBody = document.getElementById('dataTableBody');
        const rows = tableBody.querySelectorAll('tr');
        
        sampleData.forEach((item, index) => {
            if (rows[index]) {
                const siblingsInput = rows[index].querySelector('.siblings-input');
                const frequencyInput = rows[index].querySelector('.frequency-input');
                siblingsInput.value = item.siblings;
                frequencyInput.value = item.frequency;
            }
        });
        
        this.updateDataFromTable();
        this.updateChart();
    }

    updateDataFromTable() {
        // Extract data from table inputs and update internal data array
        const rows = document.querySelectorAll('#dataTableBody tr');
        this.data = [];
        
        rows.forEach(row => {
            const siblingsInput = row.querySelector('.siblings-input');
            const frequencyInput = row.querySelector('.frequency-input');
            
            const siblings = parseInt(siblingsInput.value) || 0;
            const frequency = parseInt(frequencyInput.value) || 0;
            
            if (frequency > 0) {
                this.data.push({ siblings, frequency });
            }
        });
        
        // Sort data by number of siblings for consistent display
        this.data.sort((a, b) => a.siblings - b.siblings);
    }

    selectChartType(type) {
        // Handle chart type selection
        this.currentChartType = type;
        
        // Update button states
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-type="${type}"]`).classList.add('active');
        
        // Update the chart display
        this.updateChart();
    }

    updateChart() {
        // Main chart update function - routes to specific chart type
        if (this.data.length === 0) {
            this.showEmptyState();
            return;
        }
        
        switch (this.currentChartType) {
            case 'bar':
                this.renderBarChart();
                break;
            case 'pie':
                this.renderPieChart();
                break;
            case 'pictogram':
                this.renderPictogram();
                break;
            case 'dot':
                this.renderDotPlot();
                break;
        }
        
        this.updateLegend();
    }

    showEmptyState() {
        // Display message when no data is available
        const container = document.getElementById('chartContainer');
        container.innerHTML = `
            <div style="text-align: center; color: #6c757d; font-size: 14px;">
                <p>📊</p>
                <p>Enter some data to see your chart!</p>
                <p style="font-size: 12px; margin-top: 10px;">Try clicking "Load Sample" to see an example.</p>
            </div>
        `;
        document.getElementById('chartLegend').innerHTML = '';
    }

    renderBarChart() {
        // Create SVG bar chart with proper scaling and labels
        const container = document.getElementById('chartContainer');
        const maxFreq = Math.max(...this.data.map(d => d.frequency));
        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        const width = 300;
        const height = 200;
        
        let svg = `<svg width="${width + margin.left + margin.right}" height="${height + margin.top + margin.bottom}" style="background: white;">`;
        
        // Draw bars
        const barWidth = (width - 20) / this.data.length;
        this.data.forEach((item, index) => {
            const barHeight = (item.frequency / maxFreq) * (height - 40);
            const x = margin.left + index * barWidth + 10;
            const y = margin.top + (height - 40) - barHeight;
            
            svg += `<rect x="${x}" y="${y}" width="${barWidth - 5}" height="${barHeight}" 
                    fill="${this.colors[index % this.colors.length]}" stroke="#333" stroke-width="1"/>`;
            
            // Add value labels on bars
            svg += `<text x="${x + (barWidth - 5) / 2}" y="${y - 5}" text-anchor="middle" 
                    font-size="10" fill="#333">${item.frequency}</text>`;
            
            // Add x-axis labels
            svg += `<text x="${x + (barWidth - 5) / 2}" y="${height + margin.top + 15}" text-anchor="middle" 
                    font-size="10" fill="#333">${item.siblings}</text>`;
        });
        
        // Add axes
        svg += `<line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height + margin.top}" stroke="#333" stroke-width="2"/>`;
        svg += `<line x1="${margin.left}" y1="${height + margin.top}" x2="${width + margin.left}" y2="${height + margin.top}" stroke="#333" stroke-width="2"/>`;
        
        // Add axis labels
        svg += `<text x="${margin.left + width / 2}" y="${height + margin.top + 35}" text-anchor="middle" 
                font-size="11" fill="#333" font-weight="bold">Number of Siblings</text>`;
        svg += `<text x="15" y="${margin.top + height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${margin.top + height / 2})" 
                font-size="11" fill="#333" font-weight="bold">Frequency</text>`;
        
        svg += '</svg>';
        container.innerHTML = svg;
    }

    renderPieChart() {
        // Create SVG pie chart with proper proportions and labels
        const container = document.getElementById('chartContainer');
        const total = this.data.reduce((sum, item) => sum + item.frequency, 0);
        const centerX = 150;
        const centerY = 100;
        const radius = 70;
        
        let svg = `<svg width="300" height="200" style="background: white;">`;
        let currentAngle = 0;
        
        this.data.forEach((item, index) => {
            const sliceAngle = (item.frequency / total) * 2 * Math.PI;
            const startAngle = currentAngle;
            const endAngle = currentAngle + sliceAngle;
            
            // Calculate arc path
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            const largeArc = sliceAngle > Math.PI ? 1 : 0;
            
            const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            svg += `<path d="${pathData}" fill="${this.colors[index % this.colors.length]}" 
                    stroke="white" stroke-width="2"/>`;
            
            // Add percentage labels
            const labelAngle = startAngle + sliceAngle / 2;
            const labelX = centerX + (radius * 0.7) * Math.cos(labelAngle);
            const labelY = centerY + (radius * 0.7) * Math.sin(labelAngle);
            const percentage = ((item.frequency / total) * 100).toFixed(1);
            
            if (percentage > 5) { // Only show label if slice is big enough
                svg += `<text x="${labelX}" y="${labelY}" text-anchor="middle" font-size="10" 
                        fill="white" font-weight="bold">${percentage}%</text>`;
            }
            
            currentAngle = endAngle;
        });
        
        svg += '</svg>';
        container.innerHTML = svg;
    }

    renderPictogram() {
        // Create pictogram using student icons
        const container = document.getElementById('chartContainer');
        let html = '<div class="pictogram-container">';
        
        this.data.forEach((item, index) => {
            html += '<div class="pictogram-row">';
            html += `<div class="pictogram-label">${item.siblings} sibling${item.siblings !== 1 ? 's' : ''}:</div>`;
            html += '<div class="pictogram-icons">';
            
            // Each icon represents one student
            for (let i = 0; i < item.frequency; i++) {
                html += '<span class="pictogram-icon">👤</span>';
            }
            
            html += `<span style="margin-left: 8px; font-size: 12px; color: #666;">(${item.frequency})</span>`;
            html += '</div>';
            html += '</div>';
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    renderDotPlot() {
        // Create SVG dot plot with stacked dots
        const container = document.getElementById('chartContainer');
        const maxFreq = Math.max(...this.data.map(d => d.frequency));
        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        const width = 300;
        const height = 200;
        const dotRadius = 4;
        
        let svg = `<svg width="${width + margin.left + margin.right}" height="${height + margin.top + margin.bottom}" style="background: white;">`;
        
        // Calculate spacing
        const columnWidth = (width - 20) / this.data.length;
        
        this.data.forEach((item, index) => {
            const centerX = margin.left + index * columnWidth + columnWidth / 2;
            
            // Stack dots vertically
            for (let i = 0; i < item.frequency; i++) {
                const dotY = margin.top + (height - 40) - (i * (dotRadius * 2 + 2)) - dotRadius;
                svg += `<circle cx="${centerX}" cy="${dotY}" r="${dotRadius}" 
                        fill="${this.colors[index % this.colors.length]}" stroke="#333" stroke-width="1"/>`;
            }
            
            // Add x-axis labels
            svg += `<text x="${centerX}" y="${height + margin.top + 15}" text-anchor="middle" 
                    font-size="10" fill="#333">${item.siblings}</text>`;
        });
        
        // Add axes
        svg += `<line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height + margin.top}" stroke="#333" stroke-width="2"/>`;
        svg += `<line x1="${margin.left}" y1="${height + margin.top}" x2="${width + margin.left}" y2="${height + margin.top}" stroke="#333" stroke-width="2"/>`;
        
        // Add axis labels
        svg += `<text x="${margin.left + width / 2}" y="${height + margin.top + 35}" text-anchor="middle" 
                font-size="11" fill="#333" font-weight="bold">Number of Siblings</text>`;
        svg += `<text x="15" y="${margin.top + height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${margin.top + height / 2})" 
                font-size="11" fill="#333" font-weight="bold">Frequency</text>`;
        
        svg += '</svg>';
        container.innerHTML = svg;
    }

    updateLegend() {
        // Update legend based on current chart type
        const legendContainer = document.getElementById('chartLegend');
        
        if (this.currentChartType === 'pie' || this.currentChartType === 'pictogram') {
            let legendHTML = '';
            this.data.forEach((item, index) => {
                legendHTML += `
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: ${this.colors[index % this.colors.length]}"></div>
                        <span>${item.siblings} sibling${item.siblings !== 1 ? 's' : ''} (${item.frequency} students)</span>
                    </div>
                `;
            });
            legendContainer.innerHTML = legendHTML;
        } else {
            legendContainer.innerHTML = '';
        }
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new StatisticalDiagrams();
});