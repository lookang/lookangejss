// Singapore Population Data (simulated realistic data)
const populationData = {
    1980: { totalPop: 2413945, citizens: 2042465, residents: 45678, nonresidents: 325802 },
    1985: { totalPop: 2735957, citizens: 2201543, residents: 58234, nonresidents: 476180 },
    1990: { totalPop: 3047132, citizens: 2391234, residents: 81456, nonresidents: 574442 },
    1995: { totalPop: 3524506, citizens: 2629876, residents: 156789, nonresidents: 737841 },
    2000: { totalPop: 4027887, citizens: 2985123, residents: 290456, nonresidents: 752308 },
    2005: { totalPop: 4265762, citizens: 3230945, residents: 383567, nonresidents: 651250 },
    2010: { totalPop: 5076732, citizens: 3771721, residents: 541758, nonresidents: 763253 },
    2015: { totalPop: 5535002, citizens: 3375808, residents: 527409, nonresidents: 1631785 },
    2020: { totalPop: 5685807, citizens: 3523200, residents: 522300, nonresidents: 1640307 }
};

// Chart configuration and state
let chartState = {
    currentYear: 2020,
    chartType: 'line',
    activeCategories: {
        totalPop: true,
        citizens: true,
        residents: true,
        nonresidents: true
    },
    sortBy: 'year'
};

// Color scheme for different categories
const colors = {
    totalPop: '#2196F3',
    citizens: '#4CAF50',
    residents: '#FF9800',
    nonresidents: '#F44336'
};

// Chart canvas and context
let canvas, ctx;
let tooltip;

// Initialize the visualization
document.addEventListener('DOMContentLoaded', function() {
    initializeChart();
    setupEventListeners();
    updateChart();
});

/**
 * Initialize the chart canvas and get 2D context
 */
function initializeChart() {
    canvas = document.getElementById('mainChart');
    ctx = canvas.getContext('2d');
    tooltip = document.getElementById('tooltip');
    
    // Set canvas size based on container
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

/**
 * Resize canvas to fit container while maintaining aspect ratio
 */
function resizeCanvas() {
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width - 30; // Account for padding
    canvas.height = Math.min(350, rect.height - 80); // Account for legend and padding
    
    updateChart();
}

/**
 * Set up all event listeners for interactive elements
 */
function setupEventListeners() {
    // Year range slider
    const yearRange = document.getElementById('yearRange');
    const yearDisplay = document.getElementById('yearDisplay');
    
    yearRange.addEventListener('input', function() {
        chartState.currentYear = parseInt(this.value);
        yearDisplay.textContent = this.value;
        updateChart();
        updateInsights();
    });
    
    // Chart type selector
    document.getElementById('chartType').addEventListener('change', function() {
        chartState.chartType = this.value;
        updateChart();
    });
    
    // Category checkboxes
    const checkboxes = ['totalPop', 'citizens', 'residents', 'nonresidents'];
    checkboxes.forEach(category => {
        document.getElementById(category).addEventListener('change', function() {
            chartState.activeCategories[category] = this.checked;
            updateLegendVisibility();
            updateChart();
        });
    });
    
    // Sort selector
    document.getElementById('sortBy').addEventListener('change', function() {
        chartState.sortBy = this.value;
        updateChart();
    });
    
    // Legend item clicks for toggling visibility
    document.querySelectorAll('.legend-item').forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            const checkbox = document.getElementById(category);
            checkbox.checked = !checkbox.checked;
            chartState.activeCategories[category] = checkbox.checked;
            updateLegendVisibility();
            updateChart();
        });
    });
    
    // Canvas mouse events for tooltips and interaction
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', hideTooltip);
    canvas.addEventListener('click', handleCanvasClick);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
}

/**
 * Update legend visual state based on active categories
 */
function updateLegendVisibility() {
    document.querySelectorAll('.legend-item').forEach(item => {
        const category = item.dataset.category;
        if (chartState.activeCategories[category]) {
            item.classList.remove('inactive');
        } else {
            item.classList.add('inactive');
        }
    });
}

/**
 * Main chart rendering function - handles all chart types
 */
function updateChart() {
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get filtered and sorted data
    const data = getFilteredData();
    
    if (data.length === 0) return;
    
    // Render based on chart type
    switch (chartState.chartType) {
        case 'line':
            renderLineChart(data);
            break;
        case 'bar':
            renderBarChart(data);
            break;
        case 'scatter':
            renderScatterPlot(data);
            break;
    }
    
    // Draw axes and labels
    drawAxes(data);
}

/**
 * Get filtered and sorted data based on current state
 */
function getFilteredData() {
    const years = Object.keys(populationData)
        .map(year => parseInt(year))
        .filter(year => year <= chartState.currentYear);
    
    if (chartState.sortBy === 'value') {
        years.sort((a, b) => {
            const aTotal = populationData[a].totalPop;
            const bTotal = populationData[b].totalPop;
            return aTotal - bTotal;
        });
    }
    
    return years.map(year => ({
        year,
        ...populationData[year]
    }));
}

/**
 * Render line chart visualization
 */
function renderLineChart(data) {
    const margin = { top: 20, right: 20, bottom: 40, left: 80 };
    const chartWidth = canvas.width - margin.left - margin.right;
    const chartHeight = canvas.height - margin.top - margin.bottom;
    
    // Calculate scales
    const maxValue = Math.max(...data.map(d => Math.max(
        chartState.activeCategories.totalPop ? d.totalPop : 0,
        chartState.activeCategories.citizens ? d.citizens : 0,
        chartState.activeCategories.residents ? d.residents : 0,
        chartState.activeCategories.nonresidents ? d.nonresidents : 0
    )));
    
    const xScale = chartWidth / (data.length - 1);
    const yScale = chartHeight / maxValue;
    
    // Draw lines for each active category
    Object.keys(chartState.activeCategories).forEach(category => {
        if (!chartState.activeCategories[category]) return;
        
        ctx.strokeStyle = colors[category];
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = margin.left + index * xScale;
            const y = margin.top + chartHeight - (point[category] * yScale);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = colors[category];
        data.forEach((point, index) => {
            const x = margin.left + index * xScale;
            const y = margin.top + chartHeight - (point[category] * yScale);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    });
}

/**
 * Render bar chart visualization
 */
function renderBarChart(data) {
    const margin = { top: 20, right: 20, bottom: 40, left: 80 };
    const chartWidth = canvas.width - margin.left - margin.right;
    const chartHeight = canvas.height - margin.top - margin.bottom;
    
    const activeCategories = Object.keys(chartState.activeCategories)
        .filter(cat => chartState.activeCategories[cat]);
    
    const barWidth = chartWidth / (data.length * activeCategories.length + data.length);
    const categoryWidth = barWidth * activeCategories.length;
    
    const maxValue = Math.max(...data.map(d => Math.max(
        ...activeCategories.map(cat => d[cat])
    )));
    
    const yScale = chartHeight / maxValue;
    
    data.forEach((point, dataIndex) => {
        activeCategories.forEach((category, catIndex) => {
            const x = margin.left + dataIndex * (categoryWidth + barWidth) + catIndex * barWidth;
            const height = point[category] * yScale;
            const y = margin.top + chartHeight - height;
            
            ctx.fillStyle = colors[category];
            ctx.fillRect(x, y, barWidth * 0.8, height);
        });
    });
}

/**
 * Render scatter plot visualization
 */
function renderScatterPlot(data) {
    const margin = { top: 20, right: 20, bottom: 40, left: 80 };
    const chartWidth = canvas.width - margin.left - margin.right;
    const chartHeight = canvas.height - margin.top - margin.bottom;
    
    const maxValue = Math.max(...data.map(d => d.totalPop));
    const xScale = chartWidth / (data.length - 1);
    const yScale = chartHeight / maxValue;
    
    Object.keys(chartState.activeCategories).forEach(category => {
        if (!chartState.activeCategories[category]) return;
        
        ctx.fillStyle = colors[category];
        
        data.forEach((point, index) => {
            const x = margin.left + index * xScale;
            const y = margin.top + chartHeight - (point[category] * yScale);
            const radius = Math.sqrt(point[category] / 100000) + 3;
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            
            // Add subtle border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    });
}

/**
 * Draw chart axes and labels
 */
function drawAxes(data) {
    const margin = { top: 20, right: 20, bottom: 40, left: 80 };
    const chartWidth = canvas.width - margin.left - margin.right;
    const chartHeight = canvas.height - margin.top - margin.bottom;
    
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + chartHeight);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top + chartHeight);
    ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
    ctx.stroke();
    
    // Y-axis labels
    const maxValue = Math.max(...data.map(d => Math.max(
        chartState.activeCategories.totalPop ? d.totalPop : 0,
        chartState.activeCategories.citizens ? d.citizens : 0,
        chartState.activeCategories.residents ? d.residents : 0,
        chartState.activeCategories.nonresidents ? d.nonresidents : 0
    )));
    
    for (let i = 0; i <= 5; i++) {
        const value = (maxValue / 5) * i;
        const y = margin.top + chartHeight - (value / maxValue) * chartHeight;
        
        ctx.fillText(formatNumber(value), 10, y + 4);
        
        // Grid lines
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(margin.left + chartWidth, y);
        ctx.stroke();
        ctx.strokeStyle = '#666';
    }
    
    // X-axis labels
    data.forEach((point, index) => {
        const x = margin.left + (index * chartWidth) / (data.length - 1);
        ctx.fillText(point.year.toString(), x - 15, margin.top + chartHeight + 20);
    });
}

/**
 * Handle mouse movement for tooltips
 */
function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const dataPoint = getDataPointAtPosition(mouseX, mouseY);
    
    if (dataPoint) {
        showTooltip(event.clientX, event.clientY, dataPoint);
    } else {
        hideTooltip();
    }
}

/**
 * Handle touch events for mobile devices
 */
function handleTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    
    const dataPoint = getDataPointAtPosition(touchX, touchY);
    if (dataPoint) {
        showTooltip(touch.clientX, touch.clientY, dataPoint);
    }
}

function handleTouchMove(event) {
    event.preventDefault();
    handleTouchStart(event);
}

/**
 * Handle canvas clicks for interaction
 */
function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    const dataPoint = getDataPointAtPosition(clickX, clickY);
    if (dataPoint) {
        // Update year slider to clicked data point
        document.getElementById('yearRange').value = dataPoint.year;
        chartState.currentYear = dataPoint.year;
        document.getElementById('yearDisplay').textContent = dataPoint.year;
        updateChart();
        updateInsights();
    }
}

/**
 * Get data point at specific canvas position
 */
function getDataPointAtPosition(x, y) {
    const margin = { top: 20, right: 20, bottom: 40, left: 80 };
    const chartWidth = canvas.width - margin.left - margin.right;
    const chartHeight = canvas.height - margin.top - margin.bottom;
    
    if (x < margin.left || x > margin.left + chartWidth || 
        y < margin.top || y > margin.top + chartHeight) {
        return null;
    }
    
    const data = getFilteredData();
    const xScale = chartWidth / (data.length - 1);
    
    // Find closest data point
    let closestIndex = Math.round((x - margin.left) / xScale);
    closestIndex = Math.max(0, Math.min(closestIndex, data.length - 1));
    
    return data[closestIndex];
}

/**
 * Show tooltip with data information
 */
function showTooltip(x, y, dataPoint) {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    
    document.getElementById('tooltipTitle').textContent = `Population Data`;
    document.getElementById('tooltipValue').textContent = 
        `Total: ${formatNumber(dataPoint.totalPop)}`;
    document.getElementById('tooltipYear').textContent = `Year: ${dataPoint.year}`;
    
    tooltip.style.left = (x - containerRect.left - 60) + 'px';
    tooltip.style.top = (y - containerRect.top - 80) + 'px';
    tooltip.classList.add('visible');
}

/**
 * Hide tooltip
 */
function hideTooltip() {
    tooltip.classList.remove('visible');
}

/**
 * Format numbers for display (e.g., 1,234,567)
 */
function formatNumber(num) {
    return Math.round(num).toLocaleString();
}

/**
 * Update insights based on current data
 */
function updateInsights() {
    const currentData = populationData[chartState.currentYear];
    const insights = document.getElementById('insights');
    
    const growthRate = chartState.currentYear > 1980 ? 
        ((currentData.totalPop - populationData[1980].totalPop) / populationData[1980].totalPop * 100).toFixed(1) : 0;
    
    const nonResidentPercent = (currentData.nonresidents / currentData.totalPop * 100).toFixed(1);
    
    insights.innerHTML = `
        <p>• Total population in ${chartState.currentYear}: ${formatNumber(currentData.totalPop)}</p>
        <p>• Growth since 1980: ${growthRate}%</p>
        <p>• Non-residents make up ${nonResidentPercent}% of population</p>
        <p>• Citizens: ${formatNumber(currentData.citizens)} | Residents: ${formatNumber(currentData.residents)}</p>
    `;
}