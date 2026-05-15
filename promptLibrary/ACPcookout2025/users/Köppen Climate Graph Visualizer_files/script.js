// Climate Graph Visualizer - Main Application
// Handles Köppen climate data visualization with interactive controls

class ClimateGraphVisualizer {
    constructor() {
        // Application state
        this.selectedLocations = [];
        this.currentPeriod = '1980-2010';
        this.currentMode = 'overlay';
        this.filteredLocations = [];
        
        // Initialize sample data - in real app, this would come from API
        this.initializeData();
        
        // Initialize UI components
        this.initializeEventListeners();
        this.populateLocationOptions();
        this.populateFilters();
        
        // Set initial state
        this.updateDisplay();
    }

    // Initialize sample climate data for demonstration
    initializeData() {
        this.climateData = {
            'Singapore': {
                koppen: 'Af',
                region: 'Southeast Asia',
                country: 'Singapore',
                periods: {
                    '1980-2010': {
                        temperature: [26.8, 27.2, 27.8, 28.1, 28.2, 28.0, 27.8, 27.8, 27.6, 27.4, 27.0, 26.7],
                        precipitation: [234, 152, 193, 179, 171, 132, 158, 176, 169, 208, 254, 287]
                    },
                    '1990-2020': {
                        temperature: [27.1, 27.5, 28.1, 28.4, 28.5, 28.3, 28.1, 28.1, 27.9, 27.7, 27.3, 27.0],
                        precipitation: [242, 158, 201, 185, 178, 138, 164, 182, 175, 216, 262, 295]
                    }
                },
                extremeEvent: {
                    type: 'Flash Flood',
                    magnitude: '24-h rain 366 mm',
                    date: '2010-06-16',
                    time: '14:30 SGT',
                    description: 'Severe flooding in Orchard Road area due to intense rainfall.',
                    casualties: '0 deaths, multiple evacuations',
                    focusMonths: [5, 6, 7] // June-August
                }
            },
            'London': {
                koppen: 'Cfb',
                region: 'Western Europe',
                country: 'United Kingdom',
                periods: {
                    '1980-2010': {
                        temperature: [4.2, 4.6, 7.0, 9.8, 13.5, 16.7, 18.7, 18.4, 15.4, 11.5, 7.1, 4.9],
                        precipitation: [55, 40, 42, 44, 49, 45, 45, 50, 49, 69, 59, 55]
                    },
                    '1990-2020': {
                        temperature: [4.8, 5.2, 7.6, 10.4, 14.1, 17.3, 19.3, 19.0, 16.0, 12.1, 7.7, 5.5],
                        precipitation: [58, 42, 44, 46, 51, 47, 47, 52, 51, 72, 62, 58]
                    }
                },
                extremeEvent: {
                    type: 'Heatwave',
                    magnitude: 'Peak temp 40.3°C',
                    date: '2022-07-19',
                    time: '15:12 BST',
                    description: 'Record-breaking temperatures caused infrastructure disruption.',
                    casualties: 'Heat-related health warnings issued',
                    focusMonths: [6, 7, 8] // July-September
                }
            },
            'Cairo': {
                koppen: 'BWh',
                region: 'North Africa',
                country: 'Egypt',
                periods: {
                    '1980-2010': {
                        temperature: [13.4, 15.2, 18.9, 23.8, 28.4, 31.2, 32.8, 32.4, 29.8, 25.9, 20.1, 15.1],
                        precipitation: [5, 4, 3, 1, 1, 0, 0, 0, 0, 1, 2, 6]
                    },
                    '1990-2020': {
                        temperature: [14.0, 15.8, 19.5, 24.4, 29.0, 31.8, 33.4, 33.0, 30.4, 26.5, 20.7, 15.7],
                        precipitation: [5, 4, 3, 1, 1, 0, 0, 0, 0, 1, 2, 6]
                    }
                },
                extremeEvent: {
                    type: 'Sandstorm',
                    magnitude: 'Visibility <100m',
                    date: '2021-03-13',
                    time: '11:00 EET',
                    description: 'Massive sandstorm engulfed the city, disrupting air travel.',
                    casualties: 'Multiple respiratory health alerts',
                    focusMonths: [2, 3, 4] // March-May
                }
            },
            'Mumbai': {
                koppen: 'Aw',
                region: 'South Asia',
                country: 'India',
                periods: {
                    '1980-2010': {
                        temperature: [24.0, 24.8, 26.8, 28.4, 30.2, 29.1, 27.3, 27.1, 27.8, 28.4, 26.8, 24.7],
                        precipitation: [3, 3, 2, 1, 18, 507, 840, 682, 264, 64, 13, 3]
                    },
                    '1990-2020': {
                        temperature: [24.6, 25.4, 27.4, 29.0, 30.8, 29.7, 27.9, 27.7, 28.4, 29.0, 27.4, 25.3],
                        precipitation: [3, 3, 2, 1, 20, 525, 870, 706, 273, 66, 14, 3]
                    }
                },
                extremeEvent: {
                    type: 'Monsoon Flooding',
                    magnitude: '24-h rain 944 mm',
                    date: '2005-07-26',
                    time: '08:00 IST',
                    description: 'Record monsoon rainfall caused severe urban flooding.',
                    casualties: 'Over 400 deaths, thousands displaced',
                    focusMonths: [6, 7, 8, 9] // June-September
                }
            }
        };

        // Generate location list for filtering
        this.locations = Object.keys(this.climateData);
        this.filteredLocations = [...this.locations];
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // Location search and selection
        document.getElementById('location-search').addEventListener('input', (e) => {
            this.filterLocations(e.target.value);
        });

        document.getElementById('location-select').addEventListener('change', (e) => {
            if (e.target.value) {
                document.getElementById('location-search').value = e.target.value;
            }
        });

        document.getElementById('add-location').addEventListener('click', () => {
            this.addLocation();
        });

        // Filter controls
        document.getElementById('koppen-filter').addEventListener('change', (e) => {
            this.applyFilters();
        });

        document.getElementById('region-filter').addEventListener('change', (e) => {
            this.applyFilters();
        });

        // Period selection
        document.querySelectorAll('.btn-period').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setPeriod(e.target.dataset.period);
            });
        });

        // Mode selection
        document.querySelectorAll('.btn-mode').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setMode(e.target.dataset.mode);
            });
        });

        // Export controls
        document.getElementById('export-png').addEventListener('click', () => {
            this.exportPNG();
        });

        document.getElementById('export-csv').addEventListener('click', () => {
            this.exportCSV();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetToDefaults();
        });

        // Modal controls
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // Populate location dropdown options
    populateLocationOptions() {
        const select = document.getElementById('location-select');
        select.innerHTML = '<option value="">Choose location...</option>';
        
        this.filteredLocations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = `${location} (${this.climateData[location].koppen})`;
            select.appendChild(option);
        });
    }

    // Populate filter dropdowns
    populateFilters() {
        // Köppen filter
        const koppenFilter = document.getElementById('koppen-filter');
        const koppenTypes = [...new Set(Object.values(this.climateData).map(d => d.koppen))];
        koppenTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            koppenFilter.appendChild(option);
        });

        // Region filter
        const regionFilter = document.getElementById('region-filter');
        const regions = [...new Set(Object.values(this.climateData).map(d => d.region))];
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionFilter.appendChild(option);
        });
    }

    // Filter locations based on search input
    filterLocations(searchTerm) {
        const term = searchTerm.toLowerCase();
        this.filteredLocations = this.locations.filter(location => 
            location.toLowerCase().includes(term) ||
            this.climateData[location].koppen.toLowerCase().includes(term) ||
            this.climateData[location].country.toLowerCase().includes(term)
        );
        this.populateLocationOptions();
    }

    // Apply Köppen and region filters
    applyFilters() {
        const koppenFilter = document.getElementById('koppen-filter').value;
        const regionFilter = document.getElementById('region-filter').value;
        
        this.filteredLocations = this.locations.filter(location => {
            const data = this.climateData[location];
            const koppenMatch = !koppenFilter || data.koppen === koppenFilter;
            const regionMatch = !regionFilter || data.region === regionFilter;
            return koppenMatch && regionMatch;
        });
        
        this.populateLocationOptions();
    }

    // Add location to comparison
    addLocation() {
        const searchInput = document.getElementById('location-search');
        const locationName = searchInput.value.trim();
        
        if (!locationName) {
            this.showTooltip('Please enter a location name', searchInput);
            return;
        }
        
        if (!this.climateData[locationName]) {
            this.showTooltip('Location not found', searchInput);
            return;
        }
        
        if (this.selectedLocations.includes(locationName)) {
            this.showTooltip('Location already selected', searchInput);
            return;
        }
        
        if (this.selectedLocations.length >= 2) {
            this.showTooltip('Maximum 2 locations for comparison', searchInput);
            return;
        }
        
        this.selectedLocations.push(locationName);
        searchInput.value = '';
        this.updateSelectedLocationsDisplay();
        this.updateDisplay();
    }

    // Remove location from comparison
    removeLocation(locationName) {
        this.selectedLocations = this.selectedLocations.filter(loc => loc !== locationName);
        this.updateSelectedLocationsDisplay();
        this.updateDisplay();
    }

    // Update selected locations display
    updateSelectedLocationsDisplay() {
        const container = document.getElementById('selected-locations');
        container.innerHTML = '';
        
        if (this.selectedLocations.length === 0) {
            container.innerHTML = '<span style="color: #666; font-style: italic;">No locations selected</span>';
            return;
        }
        
        this.selectedLocations.forEach(location => {
            const tag = document.createElement('div');
            tag.className = 'location-tag';
            tag.innerHTML = `
                <span class="location-name" onclick="app.showEventCard('${location}')" 
                      title="Click to view extreme weather events">
                    ${location} (${this.climateData[location].koppen})
                </span>
                <button class="remove-btn" onclick="app.removeLocation('${location}')" 
                        title="Remove location" aria-label="Remove ${location}">×</button>
            `;
            container.appendChild(tag);
        });
    }

    // Set active period
    setPeriod(period) {
        this.currentPeriod = period;
        document.querySelectorAll('.btn-period').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.period === period);
        });
        this.updateDisplay();
    }

    // Set display mode
    setMode(mode) {
        this.currentMode = mode;
        document.querySelectorAll('.btn-mode').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        this.updateDisplay();
    }

    // Main display update function
    updateDisplay() {
        const container = document.getElementById('graph-canvas');
        
        if (this.selectedLocations.length === 0) {
            container.innerHTML = `
                <div class="no-data">
                    <div class="no-data-icon">📊</div>
                    <div>Select locations to view climate graphs</div>
                    <div style="font-size: 12px; color: #999;">Search and add up to 2 locations for comparison</div>
                </div>
            `;
            return;
        }
        
        if (this.currentMode === 'overlay' || this.selectedLocations.length === 1) {
            this.renderOverlayGraph(container);
        } else {
            this.renderSideBySideGraphs(container);
        }
    }

    // Render overlay graph (single chart with multiple locations)
    renderOverlayGraph(container) {
        container.innerHTML = '';
        
        const graphDiv = document.createElement('div');
        graphDiv.className = 'graph';
        
        // Create title
        const title = this.selectedLocations.length === 1 
            ? `${this.selectedLocations[0]} — ${this.climateData[this.selectedLocations[0]].koppen}`
            : `Climate Comparison — ${this.currentPeriod}`;
            
        graphDiv.innerHTML = `
            <div class="graph-title">${title}</div>
            <svg class="graph-svg" viewBox="0 0 800 400">
                <!-- Graph content will be rendered here -->
            </svg>
        `;
        
        container.appendChild(graphDiv);
        
        // Render the actual graph
        this.renderClimateGraph(graphDiv.querySelector('.graph-svg'), this.selectedLocations);
    }

    // Render side-by-side graphs
    renderSideBySideGraphs(container) {
        container.innerHTML = '';
        container.className = 'graph-canvas sidebyside-container';
        
        this.selectedLocations.forEach(location => {
            const graphDiv = document.createElement('div');
            graphDiv.className = 'graph';
            
            const title = `${location} — ${this.climateData[location].koppen}`;
            graphDiv.innerHTML = `
                <div class="graph-title" onclick="app.showEventCard('${location}')" 
                     title="Click to view extreme weather events">${title}</div>
                <svg class="graph-svg" viewBox="0 0 800 400">
                    <!-- Graph content will be rendered here -->
                </svg>
            `;
            
            container.appendChild(graphDiv);
            
            // Render individual graph
            this.renderClimateGraph(graphDiv.querySelector('.graph-svg'), [location]);
        });
    }

    // Render climate graph using SVG
    renderClimateGraph(svg, locations) {
        // Clear existing content
        svg.innerHTML = '';
        
        // Graph dimensions and margins
        const margin = { top: 20, right: 60, bottom: 40, left: 60 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
        
        // Create main group
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
        svg.appendChild(g);
        
        // Month labels
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Calculate scales
        const xScale = (index) => (index * width) / 11;
        
        // Get data ranges for scaling
        let tempMin = Infinity, tempMax = -Infinity;
        let precipMax = 0;
        
        locations.forEach(location => {
            const data = this.climateData[location].periods[this.currentPeriod];
            tempMin = Math.min(tempMin, ...data.temperature);
            tempMax = Math.max(tempMax, ...data.temperature);
            precipMax = Math.max(precipMax, ...data.precipitation);
        });
        
        // Add some padding to ranges
        tempMin = Math.floor(tempMin - 2);
        tempMax = Math.ceil(tempMax + 2);
        precipMax = Math.ceil(precipMax * 1.1);
        
        const tempScale = (temp) => height - ((temp - tempMin) / (tempMax - tempMin)) * height;
        const precipScale = (precip) => height - (precip / precipMax) * height;
        
        // Draw gridlines
        this.drawGridlines(g, width, height, tempMin, tempMax, precipMax);
        
        // Draw axes
        this.drawAxes(g, width, height, months, tempMin, tempMax, precipMax);
        
        // Draw data for each location
        const colors = ['#007acc', '#dc3545'];
        const patterns = ['solid', 'dashed'];
        
        locations.forEach((location, index) => {
            const data = this.climateData[location].periods[this.currentPeriod];
            const color = colors[index % colors.length];
            const pattern = patterns[index % patterns.length];
            
            // Draw precipitation bars
            this.drawPrecipitationBars(g, data.precipitation, precipScale, xScale, color, index, locations.length);
            
            // Draw temperature line
            this.drawTemperatureLine(g, data.temperature, tempScale, xScale, color, pattern);
            
            // Add data points for interaction
            this.addDataPoints(g, data, tempScale, precipScale, xScale, location, months);
        });
        
        // Add legend
        this.drawLegend(g, width, locations, colors);
    }

    // Draw gridlines for better readability
    drawGridlines(g, width, height, tempMin, tempMax, precipMax) {
        const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gridGroup.setAttribute('class', 'gridlines');
        gridGroup.setAttribute('stroke', '#e1e8ed');
        gridGroup.setAttribute('stroke-width', '1');
        gridGroup.setAttribute('opacity', '0.5');
        
        // Horizontal gridlines for temperature
        for (let temp = tempMin; temp <= tempMax; temp += 5) {
            const y = height - ((temp - tempMin) / (tempMax - tempMin)) * height;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', '0');
            line.setAttribute('y1', y);
            line.setAttribute('x2', width);
            line.setAttribute('y2', y);
            gridGroup.appendChild(line);
        }
        
        // Vertical gridlines for months
        for (let i = 0; i < 12; i++) {
            const x = (i * width) / 11;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', '0');
            line.setAttribute('x2', x);
            line.setAttribute('y2', height);
            gridGroup.appendChild(line);
        }
        
        g.appendChild(gridGroup);
    }

    // Draw axes with labels and units
    drawAxes(g, width, height, months, tempMin, tempMax, precipMax) {
        // X-axis (months)
        const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        xAxis.setAttribute('class', 'x-axis');
        
        const xAxisLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxisLine.setAttribute('x1', '0');
        xAxisLine.setAttribute('y1', height);
        xAxisLine.setAttribute('x2', width);
        xAxisLine.setAttribute('y2', height);
        xAxisLine.setAttribute('stroke', '#333');
        xAxisLine.setAttribute('stroke-width', '2');
        xAxis.appendChild(xAxisLine);
        
        // Month labels
        months.forEach((month, i) => {
            const x = (i * width) / 11;
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', height + 20);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '12');
            text.setAttribute('fill', '#333');
            text.textContent = month;
            xAxis.appendChild(text);
        });
        
        g.appendChild(xAxis);
        
        // Left Y-axis (temperature)
        const leftAxis = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        leftAxis.setAttribute('class', 'left-axis');
        
        const leftAxisLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        leftAxisLine.setAttribute('x1', '0');
        leftAxisLine.setAttribute('y1', '0');
        leftAxisLine.setAttribute('x2', '0');
        leftAxisLine.setAttribute('y2', height);
        leftAxisLine.setAttribute('stroke', '#333');
        leftAxisLine.setAttribute('stroke-width', '2');
        leftAxis.appendChild(leftAxisLine);
        
        // Temperature labels
        for (let temp = tempMin; temp <= tempMax; temp += 5) {
            const y = height - ((temp - tempMin) / (tempMax - tempMin)) * height;
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', '-10');
            text.setAttribute('y', y + 4);
            text.setAttribute('text-anchor', 'end');
            text.setAttribute('font-size', '11');
            text.setAttribute('fill', '#333');
            text.textContent = temp;
            leftAxis.appendChild(text);
        }
        
        // Temperature axis label
        const tempLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tempLabel.setAttribute('x', '-40');
        tempLabel.setAttribute('y', height / 2);
        tempLabel.setAttribute('text-anchor', 'middle');
        tempLabel.setAttribute('font-size', '12');
        tempLabel.setAttribute('fill', '#007acc');
        tempLabel.setAttribute('font-weight', 'bold');
        tempLabel.setAttribute('transform', `rotate(-90, -40, ${height / 2})`);
        tempLabel.textContent = 'Temperature (°C)';
        leftAxis.appendChild(tempLabel);
        
        g.appendChild(leftAxis);
        
        // Right Y-axis (precipitation)
        const rightAxis = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        rightAxis.setAttribute('class', 'right-axis');
        
        const rightAxisLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        rightAxisLine.setAttribute('x1', width);
        rightAxisLine.setAttribute('y1', '0');
        rightAxisLine.setAttribute('x2', width);
        rightAxisLine.setAttribute('y2', height);
        rightAxisLine.setAttribute('stroke', '#333');
        rightAxisLine.setAttribute('stroke-width', '2');
        rightAxis.appendChild(rightAxisLine);
        
        // Precipitation labels
        const precipStep = Math.ceil(precipMax / 5);
        for (let precip = 0; precip <= precipMax; precip += precipStep) {
            const y = height - (precip / precipMax) * height;
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', width + 10);
            text.setAttribute('y', y + 4);
            text.setAttribute('text-anchor', 'start');
            text.setAttribute('font-size', '11');
            text.setAttribute('fill', '#333');
            text.textContent = precip;
            rightAxis.appendChild(text);
        }
        
        // Precipitation axis label
        const precipLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        precipLabel.setAttribute('x', width + 40);
        precipLabel.setAttribute('y', height / 2);
        precipLabel.setAttribute('text-anchor', 'middle');
        precipLabel.setAttribute('font-size', '12');
        precipLabel.setAttribute('fill', '#28a745');
        precipLabel.setAttribute('font-weight', 'bold');
        precipLabel.setAttribute('transform', `rotate(90, ${width + 40}, ${height / 2})`);
        precipLabel.textContent = 'Precipitation (mm)';
        rightAxis.appendChild(precipLabel);
        
        g.appendChild(rightAxis);
    }

    // Draw precipitation bars
    drawPrecipitationBars(g, precipitation, precipScale, xScale, color, locationIndex, totalLocations) {
        const barWidth = (800 - 120) / 11 / totalLocations * 0.8; // Adjust for multiple locations
        const barOffset = locationIndex * barWidth;
        
        precipitation.forEach((precip, i) => {
            const x = xScale(i) - barWidth / 2 + barOffset;
            const y = precipScale(precip);
            const height = precipScale(0) - y;
            
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('width', barWidth);
            rect.setAttribute('height', height);
            rect.setAttribute('fill', color);
            rect.setAttribute('opacity', '0.7');
            rect.setAttribute('stroke', color);
            rect.setAttribute('stroke-width', '1');
            
            g.appendChild(rect);
        });
    }

    // Draw temperature line
    drawTemperatureLine(g, temperature, tempScale, xScale, color, pattern) {
        let pathData = '';
        
        temperature.forEach((temp, i) => {
            const x = xScale(i);
            const y = tempScale(temp);
            
            if (i === 0) {
                pathData += `M ${x} ${y}`;
            } else {
                pathData += ` L ${x} ${y}`;
            }
        });
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', '3');
        path.setAttribute('fill', 'none');
        
        if (pattern === 'dashed') {
            path.setAttribute('stroke-dasharray', '5,5');
        }
        
        g.appendChild(path);
        
        // Add temperature points
        temperature.forEach((temp, i) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', xScale(i));
            circle.setAttribute('cy', tempScale(temp));
            circle.setAttribute('r', '4');
            circle.setAttribute('fill', color);
            circle.setAttribute('stroke', 'white');
            circle.setAttribute('stroke-width', '2');
            
            g.appendChild(circle);
        });
    }

    // Add interactive data points
    addDataPoints(g, data, tempScale, precipScale, xScale, location, months) {
        data.temperature.forEach((temp, i) => {
            const precip = data.precipitation[i];
            
            // Invisible larger circle for easier interaction
            const interactionCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            interactionCircle.setAttribute('cx', xScale(i));
            interactionCircle.setAttribute('cy', tempScale(temp));
            interactionCircle.setAttribute('r', '15');
            interactionCircle.setAttribute('fill', 'transparent');
            interactionCircle.setAttribute('cursor', 'pointer');
            
            // Add event listeners for tooltip
            interactionCircle.addEventListener('mouseenter', (e) => {
                this.showDataTooltip(e, location, months[i], temp, precip);
            });
            
            interactionCircle.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
            
            g.appendChild(interactionCircle);
        });
    }

    // Draw legend
    drawLegend(g, width, locations, colors) {
        if (locations.length <= 1) return;
        
        const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        legend.setAttribute('class', 'legend');
        
        locations.forEach((location, i) => {
            const y = 20 + i * 20;
            
            // Color indicator
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', width - 150);
            rect.setAttribute('y', y - 8);
            rect.setAttribute('width', '15');
            rect.setAttribute('height', '3');
            rect.setAttribute('fill', colors[i]);
            legend.appendChild(rect);
            
            // Location name
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', width - 130);
            text.setAttribute('y', y);
            text.setAttribute('font-size', '12');
            text.setAttribute('fill', '#333');
            text.textContent = location;
            legend.appendChild(text);
        });
        
        g.appendChild(legend);
    }

    // Show data tooltip on hover
    showDataTooltip(event, location, month, temp, precip) {
        const tooltip = document.getElementById('tooltip');
        const content = `
            <strong>${location}</strong><br>
            ${month}: ${temp.toFixed(1)}°C, ${precip}mm
        `;
        
        tooltip.innerHTML = content;
        tooltip.classList.add('visible');
        
        // Position tooltip
        const rect = event.target.getBoundingClientRect();
        const appRect = document.getElementById('app').getBoundingClientRect();
        
        tooltip.style.left = (rect.left - appRect.left + 10) + 'px';
        tooltip.style.top = (rect.top - appRect.top - 10) + 'px';
    }

    // Show general tooltip
    showTooltip(message, element) {
        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = message;
        tooltip.classList.add('visible');
        
        const rect = element.getBoundingClientRect();
        const appRect = document.getElementById('app').getBoundingClientRect();
        
        tooltip.style.left = (rect.left - appRect.left) + 'px';
        tooltip.style.top = (rect.bottom - appRect.top + 5) + 'px';
        
        setTimeout(() => {
            this.hideTooltip();
        }, 2000);
    }

    // Hide tooltip
    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('visible');
    }

    // Show extreme weather event card
    showEventCard(location) {
        const eventData = this.climateData[location].extremeEvent;
        const modal = document.getElementById('event-modal');
        const content = document.getElementById('event-content');
        
        content.innerHTML = `
            <div class="event-info">
                <h4>${eventData.type}</h4>
                <div class="event-detail">
                    <strong>Magnitude:</strong>
                    <span>${eventData.magnitude}</span>
                </div>
                <div class="event-detail">
                    <strong>Location:</strong>
                    <span>${location}, ${this.climateData[location].country}</span>
                </div>
                <div class="event-detail">
                    <strong>Date:</strong>
                    <span>${eventData.date} at ${eventData.time}</span>
                </div>
                <div class="event-detail">
                    <strong>Impact:</strong>
                    <span>${eventData.casualties}</span>
                </div>
                <div class="event-detail" style="margin-top: 12px;">
                    <strong>Description:</strong>
                </div>
                <p style="margin-top: 8px; line-height: 1.5;">${eventData.description}</p>
                
                <button class="focus-months-btn" onclick="app.focusMonths('${location}')">
                    Focus Relevant Months
                </button>
            </div>
        `;
        
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.getElementById('close-modal').focus();
    }

    // Close event modal
    closeModal() {
        const modal = document.getElementById('event-modal');
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
    }

    // Focus on relevant months for extreme events
    focusMonths(location) {
        // This would highlight specific months on the graph
        // For now, we'll just close the modal and show a tooltip
        this.closeModal();
        
        const eventData = this.climateData[location].extremeEvent;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const focusMonthNames = eventData.focusMonths.map(m => months[m - 1]).join(', ');
        
        this.showTooltip(`Focusing on ${focusMonthNames} for ${location}`, 
                        document.getElementById('graph-container'));
    }

    // Export current graph as PNG
    exportPNG() {
        // Create a canvas element to render the SVG
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 400;
        
        // Get the SVG element
        const svg = document.querySelector('.graph-svg');
        if (!svg) {
            this.showTooltip('No graph to export', document.getElementById('export-png'));
            return;
        }
        
        // Convert SVG to data URL and draw on canvas
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            
            // Download the canvas as PNG
            canvas.toBlob((blob) => {
                const link = document.createElement('a');
                link.download = `climate-graph-${this.selectedLocations.join('-')}-${this.currentPeriod}.png`;
                link.href = URL.createObjectURL(blob);
                link.click();
                
                URL.revokeObjectURL(url);
                URL.revokeObjectURL(link.href);
            });
        };
        img.src = url;
    }

    // Export current data as CSV
    exportCSV() {
        if (this.selectedLocations.length === 0) {
            this.showTooltip('No data to export', document.getElementById('export-csv'));
            return;
        }
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        let csvContent = 'Month';
        
        // Add headers for each location
        this.selectedLocations.forEach(location => {
            csvContent += `,${location} Temp (°C),${location} Precip (mm)`;
        });
        csvContent += '\n';
        
        // Add data rows
        for (let i = 0; i < 12; i++) {
            csvContent += months[i];
            
            this.selectedLocations.forEach(location => {
                const data = this.climateData[location].periods[this.currentPeriod];
                csvContent += `,${data.temperature[i]},${data.precipitation[i]}`;
            });
            csvContent += '\n';
        }
        
        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.download = `climate-data-${this.selectedLocations.join('-')}-${this.currentPeriod}.csv`;
        link.href = URL.createObjectURL(blob);
        link.click();
        
        URL.revokeObjectURL(link.href);
    }

    // Reset to default state
    resetToDefaults() {
        this.selectedLocations = [];
        this.currentPeriod = '1980-2010';
        this.currentMode = 'overlay';
        
        // Reset UI controls
        document.getElementById('location-search').value = '';
        document.getElementById('koppen-filter').value = '';
        document.getElementById('region-filter').value = '';
        
        document.querySelectorAll('.btn-period').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.period === '1980-2010');
        });
        
        document.querySelectorAll('.btn-mode').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === 'overlay');
        });
        
        this.filteredLocations = [...this.locations];
        this.populateLocationOptions();
        this.updateSelectedLocationsDisplay();
        this.updateDisplay();
    }
}

// Initialize the application when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ClimateGraphVisualizer();
});