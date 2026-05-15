// Singapore Air Quality Data Visualization
// This interactive visualization helps students explore PSI data patterns

class AirQualityVisualization {
    constructor() {
        // Initialize data structures and UI elements
        this.currentRegion = null;
        this.selectedRegions = [];
        this.compareMode = false;
        this.currentTimeIndex = 59; // Start at most recent data
        
        // Sample PSI data for Singapore regions over 5 years (2019-2023)
        this.psiData = this.generateSampleData();
        this.significantEvents = this.getSignificantEvents();
        
        // Chart context for drawing graphs
        this.chart = null;
        this.chartCanvas = document.getElementById('psiChart');
        this.chartCtx = this.chartCanvas.getContext('2d');
        
        this.initializeEventListeners();
        this.updateVisualization();
        this.drawChart();
    }

    // Generate realistic sample PSI data for demonstration
    generateSampleData() {
        const regions = ['North', 'Central', 'East', 'West', 'South'];
        const data = {};
        const startDate = new Date('2019-01-01');
        const endDate = new Date('2023-12-31');
        
        regions.forEach(region => {
            data[region] = [];
            let currentDate = new Date(startDate);
            
            while (currentDate <= endDate) {
                // Base PSI with seasonal variations
                let basePSI = 45 + Math.random() * 30;
                
                // Add seasonal patterns (higher during dry season)
                const month = currentDate.getMonth();
                if (month >= 1 && month <= 3) { // Dry season (Feb-Apr)
                    basePSI += 15 + Math.random() * 25;
                }
                
                // Add regional variations
                if (region === 'West') basePSI += 5; // Industrial area
                if (region === 'Central') basePSI += 3; // Urban density
                
                // Add occasional haze events
                if (Math.random() < 0.02) { // 2% chance of haze event
                    basePSI += 50 + Math.random() * 100;
                }
                
                // Generate pollutant breakdown
                const pm25 = basePSI * 0.6 + Math.random() * 10;
                const pm10 = basePSI * 0.8 + Math.random() * 15;
                const ozone = 20 + Math.random() * 30;
                
                data[region].push({
                    date: new Date(currentDate),
                    psi: Math.round(basePSI),
                    pm25: Math.round(pm25),
                    pm10: Math.round(pm10),
                    ozone: Math.round(ozone),
                    weather: this.generateWeatherData()
                });
                
                // Move to next week
                currentDate.setDate(currentDate.getDate() + 7);
            }
        });
        
        return data;
    }

    // Generate weather data correlations
    generateWeatherData() {
        return {
            rainfall: Math.random() * 50,
            windSpeed: 5 + Math.random() * 15,
            windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
            humidity: 60 + Math.random() * 30
        };
    }

    // Define significant haze events for educational context
    getSignificantEvents() {
        return [
            {
                date: '2019-09-15',
                title: 'Indonesian Forest Fires',
                description: 'Transboundary haze from Indonesian peat bog fires caused PSI levels to spike above 150 across Singapore.',
                regions: ['West', 'Central'],
                impact: 'Schools advised to reduce outdoor activities'
            },
            {
                date: '2020-03-20',
                title: 'COVID-19 Lockdown Effect',
                description: 'Circuit breaker measures led to significantly improved air quality with PSI dropping to historic lows.',
                regions: ['Central', 'North'],
                impact: 'Average PSI reduced by 30% during lockdown period'
            },
            {
                date: '2021-08-10',
                title: 'Regional Haze Episode',
                description: 'Southwest monsoon carried smoke from Sumatra fires, affecting western regions most severely.',
                regions: ['West', 'South'],
                impact: 'N95 masks recommended for outdoor activities'
            }
        ];
    }

    // Set up all event listeners for user interactions
    initializeEventListeners() {
        // Region selection on map
        document.querySelectorAll('.region').forEach(region => {
            region.addEventListener('click', (e) => this.selectRegion(e.target.dataset.region));
            region.addEventListener('mouseenter', (e) => this.showRegionTooltip(e));
            region.addEventListener('mouseleave', () => this.hideTooltip());
        });

        // Control panel interactions
        document.getElementById('yearFilter').addEventListener('change', () => this.updateVisualization());
        document.getElementById('seasonFilter').addEventListener('change', () => this.updateVisualization());
        document.getElementById('compareBtn').addEventListener('click', () => this.toggleCompareMode());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadData());

        // Pollutant toggles
        ['pm25Toggle', 'pm10Toggle', 'ozoneToggle'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => this.drawChart());
        });

        // Time slider
        const timeSlider = document.getElementById('timeSlider');
        timeSlider.addEventListener('input', (e) => {
            this.currentTimeIndex = parseInt(e.target.value);
            this.updateTimeDisplay();
            this.updateVisualization();
        });

        // Close buttons
        document.getElementById('closeInfo').addEventListener('click', () => this.closeRegionInfo());
        document.getElementById('closePopup').addEventListener('click', () => this.closeEventPopup());

        // Chart click events for data points
        this.chartCanvas.addEventListener('click', (e) => this.handleChartClick(e));

        // Window resize handling
        window.addEventListener('resize', () => this.drawChart());
    }

    // Handle region selection and display detailed information
    selectRegion(regionName) {
        // Update visual selection
        document.querySelectorAll('.region').forEach(r => r.classList.remove('selected'));
        document.getElementById(regionName.toLowerCase()).classList.add('selected');

        if (this.compareMode) {
            // Add to comparison if not already selected
            if (!this.selectedRegions.includes(regionName)) {
                this.selectedRegions.push(regionName);
                if (this.selectedRegions.length > 3) {
                    this.selectedRegions.shift(); // Limit to 3 regions for clarity
                }
            }
        } else {
            this.currentRegion = regionName;
            this.selectedRegions = [regionName];
        }

        this.showRegionInfo(regionName);
        this.drawChart();
        this.updateMapColors();
    }

    // Display detailed region information panel
    showRegionInfo(regionName) {
        const regionData = this.getFilteredData()[regionName];
        if (!regionData || regionData.length === 0) return;

        const currentData = regionData[Math.min(this.currentTimeIndex, regionData.length - 1)];
        const avgPSI = Math.round(regionData.reduce((sum, d) => sum + d.psi, 0) / regionData.length);
        
        document.getElementById('regionTitle').textContent = `${regionName} Region`;
        document.getElementById('regionContent').innerHTML = `
            <div class="info-section">
                <h4>Current Reading</h4>
                <div class="psi-reading ${this.getPSIClass(currentData.psi)}">
                    PSI: ${currentData.psi}
                </div>
                <p class="health-advice">${this.getHealthAdvice(currentData.psi)}</p>
            </div>
            
            <div class="info-section">
                <h4>Pollutant Breakdown</h4>
                <div class="pollutant-data">
                    <div>PM2.5: ${currentData.pm25} μg/m³</div>
                    <div>PM10: ${currentData.pm10} μg/m³</div>
                    <div>Ozone: ${currentData.ozone} μg/m³</div>
                </div>
            </div>
            
            <div class="info-section">
                <h4>Weather Conditions</h4>
                <div class="weather-data">
                    <div>Rainfall: ${currentData.weather.rainfall.toFixed(1)}mm</div>
                    <div>Wind: ${currentData.weather.windSpeed.toFixed(1)}km/h ${currentData.weather.windDirection}</div>
                    <div>Humidity: ${currentData.weather.humidity.toFixed(0)}%</div>
                </div>
            </div>
            
            <div class="info-section">
                <h4>Statistics</h4>
                <div class="stats-data">
                    <div>Average PSI: ${avgPSI}</div>
                    <div>Data Points: ${regionData.length}</div>
                    <div>Trend: ${this.calculateTrend(regionData)}</div>
                </div>
            </div>
        `;
        
        document.getElementById('regionInfo').classList.remove('hidden');
    }

    // Calculate trend direction for region data
    calculateTrend(data) {
        if (data.length < 2) return 'Insufficient data';
        
        const recent = data.slice(-10);
        const older = data.slice(-20, -10);
        
        const recentAvg = recent.reduce((sum, d) => sum + d.psi, 0) / recent.length;
        const olderAvg = older.reduce((sum, d) => sum + d.psi, 0) / older.length;
        
        const diff = recentAvg - olderAvg;
        if (Math.abs(diff) < 2) return 'Stable';
        return diff > 0 ? 'Increasing' : 'Decreasing';
    }

    // Get PSI classification for styling
    getPSIClass(psi) {
        if (psi <= 50) return 'good';
        if (psi <= 100) return 'moderate';
        if (psi <= 200) return 'unhealthy';
        return 'hazardous';
    }

    // Provide health advice based on PSI level
    getHealthAdvice(psi) {
        if (psi <= 50) return 'Air quality is good. Normal activities can be carried out.';
        if (psi <= 100) return 'Air quality is moderate. Sensitive individuals should reduce outdoor activities.';
        if (psi <= 200) return 'Air quality is unhealthy. Reduce outdoor activities and wear masks if necessary.';
        return 'Air quality is hazardous. Avoid outdoor activities and stay indoors.';
    }

    // Update map region colors based on current PSI levels
    updateMapColors() {
        const filteredData = this.getFilteredData();
        
        Object.keys(filteredData).forEach(region => {
            const regionElement = document.getElementById(region.toLowerCase());
            const data = filteredData[region];
            
            if (data && data.length > 0) {
                const currentPSI = data[Math.min(this.currentTimeIndex, data.length - 1)].psi;
                const psiClass = this.getPSIClass(currentPSI);
                
                // Remove all PSI classes
                regionElement.classList.remove('good', 'moderate', 'unhealthy', 'very-unhealthy', 'hazardous');
                // Add current PSI class
                regionElement.classList.add(psiClass);
            }
        });
    }

    // Toggle between single region and comparison mode
    toggleCompareMode() {
        this.compareMode = !this.compareMode;
        const btn = document.getElementById('compareBtn');
        
        if (this.compareMode) {
            btn.textContent = 'Exit Compare';
            btn.style.background = '#ff6b6b';
            this.selectedRegions = [];
        } else {
            btn.textContent = 'Compare Regions';
            btn.style.background = '';
            if (this.selectedRegions.length > 0) {
                this.currentRegion = this.selectedRegions[0];
                this.selectedRegions = [this.currentRegion];
            }
        }
        
        this.drawChart();
    }

    // Filter data based on current year and season selections
    getFilteredData() {
        const yearFilter = document.getElementById('yearFilter').value;
        const seasonFilter = document.getElementById('seasonFilter').value;
        const filteredData = {};
        
        Object.keys(this.psiData).forEach(region => {
            filteredData[region] = this.psiData[region].filter(dataPoint => {
                // Year filter
                if (yearFilter !== 'all' && dataPoint.date.getFullYear() !== parseInt(yearFilter)) {
                    return false;
                }
                
                // Season filter
                if (seasonFilter !== 'all') {
                    const month = dataPoint.date.getMonth();
                    switch (seasonFilter) {
                        case 'dry':
                            if (month < 1 || month > 3) return false;
                            break;
                        case 'wet':
                            if (month < 10 && month > 0) return false;
                            break;
                        case 'inter':
                            if (month < 4 || month > 9) return false;
                            break;
                    }
                }
                
                return true;
            });
        });
        
        return filteredData;
    }

    // Draw the main PSI trend chart
    drawChart() {
        const ctx = this.chartCtx;
        const canvas = this.chartCanvas;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const filteredData = this.getFilteredData();
        const regionsToShow = this.selectedRegions.length > 0 ? this.selectedRegions : ['Central'];
        
        if (regionsToShow.length === 0) return;
        
        // Chart dimensions and margins
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const chartWidth = canvas.width - margin.left - margin.right;
        const chartHeight = canvas.height - margin.top - margin.bottom;
        
        // Find data range for scaling
        let maxPSI = 0;
        let minDate = null;
        let maxDate = null;
        
        regionsToShow.forEach(region => {
            const data = filteredData[region] || [];
            data.forEach(d => {
                maxPSI = Math.max(maxPSI, d.psi);
                if (!minDate || d.date < minDate) minDate = d.date;
                if (!maxDate || d.date > maxDate) maxDate = d.date;
            });
        });
        
        if (!minDate || !maxDate) return;
        
        maxPSI = Math.max(maxPSI, 100); // Ensure minimum scale
        
        // Draw chart background and grid
        this.drawChartBackground(ctx, margin, chartWidth, chartHeight, maxPSI);
        
        // Draw data lines for each selected region
        const colors = ['#4facfe', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
        
        regionsToShow.forEach((region, index) => {
            const data = filteredData[region] || [];
            if (data.length === 0) return;
            
            const color = colors[index % colors.length];
            this.drawDataLine(ctx, data, margin, chartWidth, chartHeight, maxPSI, minDate, maxDate, color, region);
        });
        
        // Draw current time indicator
        this.drawTimeIndicator(ctx, margin, chartWidth, chartHeight, minDate, maxDate);
        
        // Draw legend
        this.drawChartLegend(ctx, regionsToShow, colors, canvas.width, margin);
    }

    // Draw chart background with grid lines and labels
    drawChartBackground(ctx, margin, width, height, maxPSI) {
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        ctx.font = '12px Arial';
        ctx.fillStyle = '#666';
        
        // Horizontal grid lines (PSI levels)
        const psiSteps = [0, 50, 100, 150, 200, Math.ceil(maxPSI / 50) * 50];
        psiSteps.forEach(psi => {
            if (psi > maxPSI) return;
            const y = margin.top + height - (psi / maxPSI) * height;
            
            ctx.beginPath();
            ctx.moveTo(margin.left, y);
            ctx.lineTo(margin.left + width, y);
            ctx.stroke();
            
            // PSI labels
            ctx.fillText(psi.toString(), margin.left - 35, y + 4);
        });
        
        // Vertical grid lines (time)
        const timeSteps = 5;
        for (let i = 0; i <= timeSteps; i++) {
            const x = margin.left + (i / timeSteps) * width;
            
            ctx.beginPath();
            ctx.moveTo(x, margin.top);
            ctx.lineTo(x, margin.top + height);
            ctx.stroke();
        }
        
        // Axis labels
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('PSI Level', 10, margin.top + height / 2);
        ctx.fillText('Time Period', margin.left + width / 2 - 40, margin.top + height + 35);
    }

    // Draw data line for a specific region
    drawDataLine(ctx, data, margin, width, height, maxPSI, minDate, maxDate, color, region) {
        if (data.length < 2) return;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const timeRange = maxDate - minDate;
        
        data.forEach((point, index) => {
            const x = margin.left + ((point.date - minDate) / timeRange) * width;
            const y = margin.top + height - (point.psi / maxPSI) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = color;
        data.forEach(point => {
            const x = margin.left + ((point.date - minDate) / timeRange) * width;
            const y = margin.top + height - (point.psi / maxPSI) * height;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
            
            // Check for significant events
            this.checkForSignificantEvent(ctx, point, x, y, region);
        });
    }

    // Check and mark significant events on the chart
    checkForSignificantEvent(ctx, dataPoint, x, y, region) {
        const eventDate = dataPoint.date.toISOString().split('T')[0];
        const event = this.significantEvents.find(e => 
            e.date === eventDate && e.regions.includes(region)
        );
        
        if (event) {
            // Draw event marker
            ctx.fillStyle = '#ff4444';
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fill();
            
            // Add click handler data
            this.addEventClickHandler(x, y, event);
        }
    }

    // Add click handler for event markers
    addEventClickHandler(x, y, event) {
        // Store event data for click detection
        if (!this.eventMarkers) this.eventMarkers = [];
        this.eventMarkers.push({ x, y, event, radius: 6 });
    }

    // Handle clicks on chart (for event markers)
    handleChartClick(e) {
        if (!this.eventMarkers) return;
        
        const rect = this.chartCanvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Check if click is near any event marker
        const clickedEvent = this.eventMarkers.find(marker => {
            const distance = Math.sqrt(
                Math.pow(clickX - marker.x, 2) + Math.pow(clickY - marker.y, 2)
            );
            return distance <= marker.radius + 5; // 5px tolerance
        });
        
        if (clickedEvent) {
            this.showEventPopup(clickedEvent.event);
        }
    }

    // Show popup with event details
    showEventPopup(event) {
        document.getElementById('popupContent').innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Affected Regions:</strong> ${event.regions.join(', ')}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <p><strong>Impact:</strong> ${event.impact}</p>
        `;
        
        document.getElementById('eventPopup').classList.remove('hidden');
    }

    // Draw current time indicator on chart
    drawTimeIndicator(ctx, margin, width, height, minDate, maxDate) {
        const filteredData = this.getFilteredData();
        const regionData = Object.values(filteredData)[0];
        
        if (!regionData || regionData.length === 0) return;
        
        const currentData = regionData[Math.min(this.currentTimeIndex, regionData.length - 1)];
        const timeRange = maxDate - minDate;
        const x = margin.left + ((currentData.date - minDate) / timeRange) * width;
        
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        ctx.beginPath();
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, margin.top + height);
        ctx.stroke();
        
        ctx.setLineDash([]);
    }

    // Draw chart legend
    drawChartLegend(ctx, regions, colors, canvasWidth, margin) {
        ctx.font = '12px Arial';
        const legendY = margin.top - 5;
        let legendX = margin.left;
        
        regions.forEach((region, index) => {
            ctx.fillStyle = colors[index % colors.length];
            ctx.fillRect(legendX, legendY, 15, 3);
            
            ctx.fillStyle = '#333';
            ctx.fillText(region, legendX + 20, legendY + 10);
            
            legendX += ctx.measureText(region).width + 40;
        });
    }

    // Update time display based on slider position
    updateTimeDisplay() {
        const filteredData = this.getFilteredData();
        const regionData = Object.values(filteredData)[0];
        
        if (regionData && regionData.length > 0) {
            const currentData = regionData[Math.min(this.currentTimeIndex, regionData.length - 1)];
            document.getElementById('currentDate').textContent = 
                currentData.date.toLocaleDateString();
        }
    }

    // Show tooltip on region hover
    showRegionTooltip(e) {
        const region = e.target.dataset.region;
        const filteredData = this.getFilteredData();
        const regionData = filteredData[region];
        
        if (!regionData || regionData.length === 0) return;
        
        const currentData = regionData[Math.min(this.currentTimeIndex, regionData.length - 1)];
        const tooltip = document.getElementById('tooltip');
        
        tooltip.innerHTML = `
            <strong>${region} Region</strong><br>
            PSI: ${currentData.psi}<br>
            Status: ${this.getPSIStatus(currentData.psi)}<br>
            <em>Click for details</em>
        `;
        
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY - 10 + 'px';
        tooltip.classList.remove('hidden');
    }

    // Get PSI status text
    getPSIStatus(psi) {
        if (psi <= 50) return 'Good';
        if (psi <= 100) return 'Moderate';
        if (psi <= 200) return 'Unhealthy';
        return 'Hazardous';
    }

    // Hide tooltip
    hideTooltip() {
        document.getElementById('tooltip').classList.add('hidden');
    }

    // Close region information panel
    closeRegionInfo() {
        document.getElementById('regionInfo').classList.add('hidden');
    }

    // Close event popup
    closeEventPopup() {
        document.getElementById('eventPopup').classList.add('hidden');
    }

    // Download filtered data as CSV
    downloadData() {
        const filteredData = this.getFilteredData();
        let csvContent = 'Region,Date,PSI,PM2.5,PM10,Ozone,Rainfall,Wind Speed,Wind Direction,Humidity\n';
        
        Object.keys(filteredData).forEach(region => {
            filteredData[region].forEach(dataPoint => {
                csvContent += `${region},${dataPoint.date.toISOString().split('T')[0]},${dataPoint.psi},${dataPoint.pm25},${dataPoint.pm10},${dataPoint.ozone},${dataPoint.weather.rainfall.toFixed(1)},${dataPoint.weather.windSpeed.toFixed(1)},${dataPoint.weather.windDirection},${dataPoint.weather.humidity.toFixed(0)}\n`;
            });
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'singapore_air_quality_data.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // Update entire visualization based on current filters
    updateVisualization() {
        this.updateMapColors();
        this.drawChart();
        this.updateTimeDisplay();
        
        // Reset event markers for new data
        this.eventMarkers = [];
        
        // Update region info if panel is open
        if (this.currentRegion && !document.getElementById('regionInfo').classList.contains('hidden')) {
            this.showRegionInfo(this.currentRegion);
        }
    }
}

// Initialize the visualization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AirQualityVisualization();
});