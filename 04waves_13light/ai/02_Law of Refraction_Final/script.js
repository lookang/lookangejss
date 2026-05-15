// Global variables
let incidenceAngle = 30; // Initial angle of incidence in degrees
let mediumIndex = 1.3; // Initial refractive index (water)
let dataPoints = []; // Array to store recorded data points
let graphPoints = []; // Array to store points for the graph

// Constants for the media
const MEDIA = {
    AIR: { name: "air", index: 1, color: "rgba(255, 255, 255, 0.1)" },
    WATER: { name: "water", index: 1.3, color: "rgba(0, 100, 255, 0.2)" },
    GLASS: { name: "glass", index: 1.5, color: "rgba(0, 100, 255, 0.4)" },
    DIAMOND: { name: "diamond", index: 2.4, color: "rgba(0, 100, 255, 0.6)" }
};

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    // Get references to HTML elements
    const incidenceSlider = document.getElementById('incidenceSlider');
    const incidenceValue = document.getElementById('incidenceValue');
    const mediumSelect = document.getElementById('mediumSelect');
    const recordBtn = document.getElementById('recordBtn');
    const resetBtn = document.getElementById('resetBtn');
    const simulationCanvas = document.getElementById('simulationCanvas');
    const graphCanvas = document.getElementById('graphCanvas');
    // Added reference to the Show Graph button
    const showGraphBtn = document.getElementById('showGraphBtn');
    
    // Set up the simulation canvas context
    const simCtx = simulationCanvas.getContext('2d');
    
    // Set up the graph canvas context
    const graphCtx = graphCanvas.getContext('2d');
    
    // Initialize the simulation
    drawSimulation();
    drawGraph();
    
    // Event listeners for user interactions
    
    // Update the incidence angle when the slider changes
    incidenceSlider.addEventListener('input', function() {
        incidenceAngle = parseInt(this.value);
        incidenceValue.textContent = incidenceAngle + '°';
        drawSimulation();
    });
    
    // Update the medium when the dropdown changes
    mediumSelect.addEventListener('change', function() {
        mediumIndex = parseFloat(this.value);
        drawSimulation();
    });
    
    // Record the current data point when the record button is clicked
    recordBtn.addEventListener('click', function() {
        recordDataPoint();
        drawGraph();
    });
    
    // Reset all recorded data when the reset button is clicked
    resetBtn.addEventListener('click', function() {
        dataPoints = [];
        graphPoints = [];
        updateDataTable();
        drawGraph();
    });
    
    // Added event listener for the Show Graph button
    showGraphBtn.addEventListener('click', function() {
        const graphArea = document.querySelector('.graph-area');
        if (graphArea.style.display === 'block') {
            graphArea.style.display = 'none';
            this.textContent = 'Show Graph';
        } else {
            graphArea.style.display = 'block';
            this.textContent = 'Hide Graph';
            drawGraph(); // Redraw the graph when shown
        }
    });
    
    /**
     * Calculates the angle of refraction using Snell's Law
     * @param {number} incidenceAngle - Angle of incidence in degrees
     * @param {number} n1 - Refractive index of medium 1 (air)
     * @param {number} n2 - Refractive index of medium 2
     * @returns {number} - Angle of refraction in degrees
     */
    function calculateRefractionAngle(incidenceAngle, n1, n2) {
        // Convert incidence angle to radians
        const incidenceRad = incidenceAngle * Math.PI / 180;
        
        // Calculate sin of refraction angle using Snell's Law: n1 * sin(i) = n2 * sin(r)
        const sinRefraction = (n1 * Math.sin(incidenceRad)) / n2;
        
        // Handle total internal reflection case
        if (sinRefraction > 1) {
            return 90; // Total internal reflection
        }
        
        // Calculate refraction angle in radians and convert to degrees
        const refractionRad = Math.asin(sinRefraction);
        return refractionRad * 180 / Math.PI;
    }
    
    /**
     * Draws the simulation on the canvas
     */
    function drawSimulation() {
        // Clear the canvas
        simCtx.clearRect(0, 0, simulationCanvas.width, simulationCanvas.height);
        
        // Calculate the refraction angle
        const n1 = 1; // Air (medium 1)
        const n2 = mediumIndex; // Selected medium (medium 2)
        const refractionAngle = calculateRefractionAngle(incidenceAngle, n1, n2);
        
        // Set up dimensions
        const canvasWidth = simulationCanvas.width;
        const canvasHeight = simulationCanvas.height;
        const interfaceY = canvasHeight / 2; // Position of the interface between media
        const normalX = canvasWidth / 2; // Position of the normal line
        
        // Draw the two media
        // Medium 1 (air)
        simCtx.fillStyle = MEDIA.AIR.color;
        simCtx.fillRect(0, 0, canvasWidth, interfaceY);
        simCtx.strokeStyle = 'black';
        simCtx.strokeRect(0, 0, canvasWidth, interfaceY);
        
        // Medium 2 (selected medium)
        let mediumColor;
        let mediumName;
        
        // Set the color and name based on the refractive index
        switch(n2) {
            case 1:
                mediumColor = MEDIA.AIR.color;
                mediumName = MEDIA.AIR.name;
                break;
            case 1.3:
                mediumColor = MEDIA.WATER.color;
                mediumName = MEDIA.WATER.name;
                break;
            case 1.5:
                mediumColor = MEDIA.GLASS.color;
                mediumName = MEDIA.GLASS.name;
                break;
            case 2.4:
                mediumColor = MEDIA.DIAMOND.color;
                mediumName = MEDIA.DIAMOND.name;
                break;
            default:
                mediumColor = MEDIA.WATER.color;
                mediumName = MEDIA.WATER.name;
        }
        
        simCtx.fillStyle = mediumColor;
        simCtx.fillRect(0, interfaceY, canvasWidth, interfaceY);
        simCtx.strokeStyle = 'black';
        simCtx.strokeRect(0, interfaceY, canvasWidth, canvasHeight - interfaceY);
        
        // Draw the normal line (dotted)
        simCtx.beginPath();
        simCtx.setLineDash([5, 5]);
        simCtx.moveTo(normalX, 0);
        simCtx.lineTo(normalX, canvasHeight);
        simCtx.strokeStyle = 'black';
        simCtx.stroke();
        simCtx.setLineDash([]);
        
        // Calculate the incident ray coordinates
        const incidenceRad = incidenceAngle * Math.PI / 180;
        const rayLength = 200;
        
        // Start point of incident ray (depends on the angle)
        const incidentStartX = normalX - rayLength * Math.sin(incidenceRad);
        const incidentStartY = interfaceY - rayLength * Math.cos(incidenceRad);
        
        // End point of incident ray (at the interface)
        const incidentEndX = normalX;
        const incidentEndY = interfaceY;
        
        // Draw the incident ray
        simCtx.beginPath();
        simCtx.moveTo(incidentStartX, incidentStartY);
        simCtx.lineTo(incidentEndX, incidentEndY);
        simCtx.strokeStyle = 'red';
        simCtx.lineWidth = 2;
        simCtx.stroke();
        
        // Calculate the refracted ray coordinates
        const refractionRad = refractionAngle * Math.PI / 180;
        
        // End point of refracted ray
        const refractedEndX = normalX + rayLength * Math.sin(refractionRad);
        const refractedEndY = interfaceY + rayLength * Math.cos(refractionRad);
        
        // Draw the refracted ray
        simCtx.beginPath();
        simCtx.moveTo(incidentEndX, incidentEndY);
        simCtx.lineTo(refractedEndX, refractedEndY);
        simCtx.strokeStyle = 'red';
        simCtx.lineWidth = 2;
        simCtx.stroke();
        
        // Draw arrows on the rays to indicate direction
        drawArrow(simCtx, 
                 (incidentStartX + incidentEndX) / 2, 
                 (incidentStartY + incidentEndY) / 2, 
                 Math.atan2(incidentEndY - incidentStartY, incidentEndX - incidentStartX));
                 
        drawArrow(simCtx, 
                 (incidentEndX + refractedEndX) / 2, 
                 (incidentEndY + refractedEndY) / 2, 
                 Math.atan2(refractedEndY - incidentEndY, refractedEndX - incidentEndX));
        
        // Draw the angle of incidence (i) as a small arc between incident ray and normal
        const iArcRadius = 30;
        simCtx.beginPath();
        // Draw arc from normal to incident ray (clockwise)
        simCtx.arc(normalX, interfaceY, iArcRadius, -Math.PI/2, -Math.PI/2 - incidenceRad, true);
        simCtx.strokeStyle = 'black';
        simCtx.stroke();
        
        // Label for angle of incidence
        const iLabelX = normalX - iArcRadius * 0.7 * Math.sin(incidenceRad / 2);
        const iLabelY = interfaceY - iArcRadius * 0.7 * Math.cos(incidenceRad / 2);
        simCtx.fillStyle = 'black';
        simCtx.font = '14px Arial';
        simCtx.fillText(`i = ${incidenceAngle}°`, iLabelX, iLabelY);
        
        // MODIFIED CODE: Draw the angle of refraction (r) as a small arc between normal and refracted ray
        // Flipped about the boundary of medium 1 and 2 (geometrically reflected about the axis)
        const rArcRadius = 30;
        simCtx.beginPath();
        // Changed from counter-clockwise to clockwise to reflect about the axis
        simCtx.arc(normalX, interfaceY, rArcRadius, Math.PI/2, Math.PI/2 - refractionRad, true);
        simCtx.strokeStyle = 'black';
        simCtx.stroke();
        
        // Modified label position for angle of refraction to match the flipped arc
        const rLabelX = normalX + rArcRadius * 0.7 * Math.sin(refractionRad / 2);
        const rLabelY = interfaceY + rArcRadius * 0.7 * Math.cos(refractionRad / 2) + 20; // Adjusted Y position
        simCtx.fillStyle = 'black';
        simCtx.font = '14px Arial';
        simCtx.fillText(`r = ${refractionAngle.toFixed(1)}°`, rLabelX, rLabelY);
        
        // Label the media
        simCtx.fillStyle = 'black';
        simCtx.font = '16px Arial';
        simCtx.fillText(`medium 1: air`, 20, interfaceY - 20);
        simCtx.fillText(`medium 2: ${mediumName}`, 20, interfaceY + 30);
        
        // Label the rays
        simCtx.fillStyle = 'black';
        simCtx.font = '16px Arial';
        
        // Position for incident ray label
        const incidentLabelX = incidentStartX + 40;
        const incidentLabelY = incidentStartY - 10;
        simCtx.fillText("Incident ray", incidentLabelX, incidentLabelY);
        
        // Position for refracted ray label
        const refractedLabelX = refractedEndX - 120;
        const refractedLabelY = refractedEndY - 10;
        simCtx.fillText("refracted ray", refractedLabelX, refractedLabelY);
        
        // Label the normal
        simCtx.fillText("normal", normalX + 10, 30);
    }
    
    /**
     * Draws an arrow at the specified position and angle
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {number} x - X coordinate of the arrow center
     * @param {number} y - Y coordinate of the arrow center
     * @param {number} angle - Angle of the arrow in radians
     */
    function drawArrow(ctx, x, y, angle) {
        const arrowSize = 10;
        
        // Save the current context state
        ctx.save();
        
        // Translate to the arrow position
        ctx.translate(x, y);
        
        // Rotate to the arrow angle
        ctx.rotate(angle);
        
        // Draw the arrow
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrowSize, -arrowSize / 2);
        ctx.lineTo(-arrowSize, arrowSize / 2);
        ctx.closePath();
        
        // Fill the arrow
        ctx.fillStyle = 'red';
        ctx.fill();
        
        // Restore the context state
        ctx.restore();
    }
    
    /**
     * Records the current data point and updates the table
     */
    function recordDataPoint() {
        // Only allow up to 10 data points
        if (dataPoints.length >= 10) {
            alert("Maximum of 10 data points reached. Reset to record more.");
            return;
        }
        
        // Calculate the refraction angle
        const n1 = 1; // Air (medium 1)
        const n2 = mediumIndex; // Selected medium (medium 2)
        const refractionAngle = calculateRefractionAngle(incidenceAngle, n1, n2);
        
        // Calculate sin values
        const sinI = Math.sin(incidenceAngle * Math.PI / 180);
        const sinR = Math.sin(refractionAngle * Math.PI / 180);
        const ratio = sinI / sinR;
        
        // Create the data point
        const dataPoint = {
            incidenceAngle: incidenceAngle,
            refractionAngle: refractionAngle.toFixed(1),
            sinI: sinI.toFixed(3),
            sinR: sinR.toFixed(3),
            ratio: ratio.toFixed(3)
        };
        
        // Add to the data points array
        dataPoints.push(dataPoint);
        
        // Add to the graph points array
        graphPoints.push({
            x: parseFloat(sinR),
            y: parseFloat(sinI)
        });
        
        // Update the data table
        updateDataTable();
    }
    
    /**
     * Updates the data table with the recorded data points
     */
    function updateDataTable() {
        const tableBody = document.querySelector('#dataTable tbody');
        
        // Clear the table
        tableBody.innerHTML = '';
        
        // Add each data point to the table
        dataPoints.forEach(point => {
            const row = document.createElement('tr');
            
            // Create cells for each value
            const incidenceCell = document.createElement('td');
            incidenceCell.textContent = point.incidenceAngle.toFixed(1);
            
            const refractionCell = document.createElement('td');
            refractionCell.textContent = point.refractionAngle;
            
            const sinICell = document.createElement('td');
            sinICell.textContent = point.sinI;
            
            const sinRCell = document.createElement('td');
            sinRCell.textContent = point.sinR;
            
            const ratioCell = document.createElement('td');
            ratioCell.textContent = point.ratio;
            
            // Add cells to the row
            row.appendChild(incidenceCell);
            row.appendChild(refractionCell);
            row.appendChild(sinICell);
            row.appendChild(sinRCell);
            row.appendChild(ratioCell);
            
            // Add the row to the table
            tableBody.appendChild(row);
        });
    }
    
    /**
     * Draws the graph of sin i vs sin r
     */
    function drawGraph() {
        // Clear the canvas
        graphCtx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
        
        // Set up dimensions
        const width = graphCanvas.width;
        const height = graphCanvas.height;
        const padding = 50;
        
        // Define the graph area
        const graphWidth = width - 2 * padding;
        const graphHeight = height - 2 * padding;
        
        // Draw the grid
        drawGrid(graphCtx, padding, padding, graphWidth, graphHeight, 10);
        
        // Draw the axes
        drawAxes(graphCtx, padding, padding, graphWidth, graphHeight);
        
        // Draw the data points and line
        if (graphPoints.length > 0) {
            drawDataPoints(graphCtx, graphPoints, padding, padding, graphWidth, graphHeight);
        }
    }
    
    /**
     * Draws a grid on the graph
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {number} x - X coordinate of the top-left corner
     * @param {number} y - Y coordinate of the top-left corner
     * @param {number} width - Width of the grid
     * @param {number} height - Height of the grid
     * @param {number} divisions - Number of divisions in the grid
     */
    function drawGrid(ctx, x, y, width, height, divisions) {
        const stepX = width / divisions;
        const stepY = height / divisions;
        
        ctx.beginPath();
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 0.5;
        
        // Draw vertical grid lines
        for (let i = 0; i <= divisions; i++) {
            const xPos = x + i * stepX;
            ctx.moveTo(xPos, y);
            ctx.lineTo(xPos, y + height);
        }
        
        // Draw horizontal grid lines
        for (let i = 0; i <= divisions; i++) {
            const yPos = y + i * stepY;
            ctx.moveTo(x, yPos);
            ctx.lineTo(x + width, yPos);
        }
        
        ctx.stroke();
    }
    
    /**
     * Draws the axes on the graph
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {number} x - X coordinate of the top-left corner
     * @param {number} y - Y coordinate of the top-left corner
     * @param {number} width - Width of the graph area
     * @param {number} height - Height of the graph area
     */
    function drawAxes(ctx, x, y, width, height) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        
        // X-axis
        ctx.moveTo(x, y + height);
        ctx.lineTo(x + width, y + height);
        
        // Y-axis
        ctx.moveTo(x, y + height);
        ctx.lineTo(x, y);
        
        ctx.stroke();
        
        // Draw axis labels
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        
        // X-axis label
        ctx.fillText('sin r', x + width - 30, y + height + 30);
        
        // Y-axis label
        ctx.save();
        ctx.translate(x - 30, y + height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('sin i', 0, 0);
        ctx.restore();
        
        // Added: Draw arrowheads on axes
        // X-axis arrowhead
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.moveTo(x + width, y + height);
        ctx.lineTo(x + width - 10, y + height - 5);
        ctx.lineTo(x + width - 10, y + height + 5);
        ctx.closePath();
        ctx.fill();
        
        // Y-axis arrowhead
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 5, y + 10);
        ctx.lineTo(x + 5, y + 10);
        ctx.closePath();
        ctx.fill();
        
        // Added: Draw scale markers and labels on axes
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        // X-axis scale (0 to 1 in 0.2 increments)
        for (let i = 0; i <= 5; i++) {
            const scaleX = x + (width / 5) * i;
            const scaleValue = (i * 0.2).toFixed(1);
            
            // Draw tick mark
            ctx.beginPath();
            ctx.moveTo(scaleX, y + height);
            ctx.lineTo(scaleX, y + height + 5);
            ctx.stroke();
            
            // Draw label
            ctx.fillText(scaleValue, scaleX, y + height + 10);
        }
        
        // Y-axis scale (0 to 1 in 0.2 increments)
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i <= 5; i++) {
            const scaleY = y + height - (height / 5) * i;
            const scaleValue = (i * 0.2).toFixed(1);
            
            // Draw tick mark
            ctx.beginPath();
            ctx.moveTo(x, scaleY);
            ctx.lineTo(x - 5, scaleY);
            ctx.stroke();
            
            // Draw label
            ctx.fillText(scaleValue, x - 10, scaleY);
        }
    }
    
    /**
     * Draws the data points and a line connecting them on the graph
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {Array} points - Array of {x, y} points to plot
     * @param {number} x - X coordinate of the top-left corner
     * @param {number} y - Y coordinate of the top-left corner
     * @param {number} width - Width of the graph area
     * @param {number} height - Height of the graph area
     */
    function drawDataPoints(ctx, points, x, y, width, height) {
        // Find the maximum values for scaling
        let maxX = 1; // Maximum sin r value is 1
        let maxY = 1; // Maximum sin i value is 1
        
        // Scale the points to fit the graph area
        const scaledPoints = points.map(point => ({
            x: x + (point.x / maxX) * width,
            y: y + height - (point.y / maxY) * height
        }));
        
        // Draw the line connecting the points
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        
        // Move to the first point
        if (scaledPoints.length > 0) {
            ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y);
            
            // Draw lines to the remaining points
            for (let i = 1; i < scaledPoints.length; i++) {
                ctx.lineTo(scaledPoints[i].x, scaledPoints[i].y);
            }
        }
        
        ctx.stroke();
        
        // Draw the points
        ctx.fillStyle = 'blue';
        
        scaledPoints.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
});