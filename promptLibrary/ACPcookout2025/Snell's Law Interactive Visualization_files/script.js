// Global variables for the interactive visualization
let graphCanvas, rayCanvas, graphCtx, rayCtx;
let currentAngle = 30; // degrees
let n1 = 1.00, n2 = 1.33; // refractive indices
let showNormal = true;
let criticalAngleMode = false;
let animationId;

// Material properties for realistic visualization
const materials = {
    '1.00': { name: 'Air', color: '#E3F2FD' },
    '1.33': { name: 'Water', color: '#2196F3' },
    '1.50': { name: 'Glass', color: '#4CAF50' },
    '2.42': { name: 'Diamond', color: '#9C27B0' }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCanvases();
    setupEventListeners();
    updateVisualization();
    
    // Show initial tooltip
    showTooltip('Adjust the incident angle and observe how light bends according to Snell\'s Law!');
});

/**
 * Initialize canvas elements and their 2D contexts
 */
function initializeCanvases() {
    graphCanvas = document.getElementById('graphCanvas');
    rayCanvas = document.getElementById('rayCanvas');
    graphCtx = graphCanvas.getContext('2d');
    rayCtx = rayCanvas.getContext('2d');
    
    // Set canvas dimensions based on container size
    resizeCanvases();
    
    // Add resize listener for responsive design
    window.addEventListener('resize', resizeCanvases);
}

/**
 * Resize canvases to fit their containers
 */
function resizeCanvases() {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        const canvas = panel.querySelector('canvas');
        if (canvas) {
            const rect = panel.getBoundingClientRect();
            canvas.width = rect.width - 4;
            canvas.height = rect.height - 60; // Account for header and values display
        }
    });
    updateVisualization();
}

/**
 * Set up all event listeners for interactive controls
 */
function setupEventListeners() {
    // Angle slider
    const angleSlider = document.getElementById('angleSlider');
    angleSlider.addEventListener('input', function() {
        currentAngle = parseFloat(this.value);
        document.getElementById('angleValue').textContent = currentAngle;
        updateVisualization();
    });
    
    // Medium selection dropdowns
    document.getElementById('medium1').addEventListener('change', handleMediumChange);
    document.getElementById('medium2').addEventListener('change', handleMediumChange);
    
    // Custom refractive index inputs
    document.getElementById('n1Custom').addEventListener('input', function() {
        if (document.getElementById('medium1').value === 'custom') {
            n1 = parseFloat(this.value) || 1.0;
            updateVisualization();
        }
    });
    
    document.getElementById('n2Custom').addEventListener('input', function() {
        if (document.getElementById('medium2').value === 'custom') {
            n2 = parseFloat(this.value) || 1.0;
            updateVisualization();
        }
    });
    
    // Control buttons
    document.getElementById('showCritical').addEventListener('click', toggleCriticalAngle);
    document.getElementById('toggleNormal').addEventListener('click', toggleNormalLines);
    document.getElementById('resetBtn').addEventListener('click', resetToDefaults);
    document.getElementById('examplesBtn').addEventListener('click', showExamples);
    
    // Canvas click interactions for plotting points
    graphCanvas.addEventListener('click', handleGraphClick);
    rayCanvas.addEventListener('click', handleRayClick);
    
    // Modal controls
    document.querySelector('.close').addEventListener('click', hideExamples);
    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.addEventListener('click', loadExample);
    });
    
    // Tooltip interactions
    setupTooltips();
}

/**
 * Handle medium selection changes
 */
function handleMediumChange(event) {
    const isFirstMedium = event.target.id === 'medium1';
    const customInput = document.getElementById(isFirstMedium ? 'n1Custom' : 'n2Custom');
    
    if (event.target.value === 'custom') {
        customInput.style.display = 'inline-block';
        customInput.focus();
    } else {
        customInput.style.display = 'none';
        if (isFirstMedium) {
            n1 = parseFloat(event.target.value);
        } else {
            n2 = parseFloat(event.target.value);
        }
        updateVisualization();
    }
}

/**
 * Calculate refracted angle using Snell's Law
 * n1 * sin(θ1) = n2 * sin(θ2)
 */
function calculateRefractionAngle(incidentAngle, n1, n2) {
    const incidentRad = incidentAngle * Math.PI / 180;
    const sinTheta2 = (n1 * Math.sin(incidentRad)) / n2;
    
    // Check for total internal reflection
    if (sinTheta2 > 1) {
        return null; // Total internal reflection occurs
    }
    
    return Math.asin(sinTheta2) * 180 / Math.PI;
}

/**
 * Calculate critical angle for total internal reflection
 */
function calculateCriticalAngle(n1, n2) {
    if (n1 <= n2) return null; // No critical angle when going to denser medium
    return Math.asin(n2 / n1) * 180 / Math.PI;
}

/**
 * Main visualization update function
 */
function updateVisualization() {
    // Calculate refracted angle
    const refractedAngle = calculateRefractionAngle(currentAngle, n1, n2);
    const criticalAngle = calculateCriticalAngle(n1, n2);
    
    // Update display values
    updateDisplayValues(refractedAngle);
    
    // Draw both visualizations
    drawGraph(refractedAngle, criticalAngle);
    drawRayDiagram(refractedAngle, criticalAngle);
    
    // Show/hide critical angle indicator
    const indicator = document.getElementById('criticalIndicator');
    if (refractedAngle === null) {
        indicator.style.display = 'block';
    } else {
        indicator.style.display = 'none';
    }
}

/**
 * Update numerical display values
 */
function updateDisplayValues(refractedAngle) {
    document.getElementById('n1Value').textContent = n1.toFixed(2);
    document.getElementById('n2Value').textContent = n2.toFixed(2);
    document.getElementById('theta1Value').textContent = currentAngle.toFixed(1);
    document.getElementById('theta2Value').textContent = 
        refractedAngle !== null ? refractedAngle.toFixed(1) : 'N/A';
}

/**
 * Draw the mathematical graph showing sin(θ1) vs sin(θ2)
 */
function drawGraph(refractedAngle, criticalAngle) {
    const ctx = graphCtx;
    const width = graphCanvas.width;
    const height = graphCanvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up coordinate system
    const margin = 40;
    const graphWidth = width - 2 * margin;
    const graphHeight = height - 2 * margin;
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin); // x-axis
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(margin, margin); // y-axis
    ctx.stroke();
    
    // Draw axis labels
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('sin(θ₁)', width / 2, height - 10);
    
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('sin(θ₂)', 0, 0);
    ctx.restore();
    
    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
        const x = margin + (i / 10) * graphWidth;
        const y = height - margin - (i / 10) * graphHeight;
        
        ctx.beginPath();
        ctx.moveTo(x, height - margin);
        ctx.lineTo(x, margin);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(margin, y);
        ctx.lineTo(width - margin, y);
        ctx.stroke();
        
        // Add scale labels
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText((i / 10).toFixed(1), x, height - margin + 15);
        ctx.textAlign = 'right';
        ctx.fillText((i / 10).toFixed(1), margin - 5, y + 3);
    }
    
    // Draw Snell's law curve: sin(θ2) = (n1/n2) * sin(θ1)
    ctx.strokeStyle = '#2196F3';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const ratio = n1 / n2;
    let firstPoint = true;
    
    for (let sinTheta1 = 0; sinTheta1 <= 1; sinTheta1 += 0.01) {
        const sinTheta2 = ratio * sinTheta1;
        
        if (sinTheta2 <= 1) { // Valid refraction
            const x = margin + sinTheta1 * graphWidth;
            const y = height - margin - sinTheta2 * graphHeight;
            
            if (firstPoint) {
                ctx.moveTo(x, y);
                firstPoint = false;
            } else {
                ctx.lineTo(x, y);
            }
        }
    }
    ctx.stroke();
    
    // Plot current point
    if (refractedAngle !== null) {
        const sinTheta1 = Math.sin(currentAngle * Math.PI / 180);
        const sinTheta2 = Math.sin(refractedAngle * Math.PI / 180);
        const x = margin + sinTheta1 * graphWidth;
        const y = height - margin - sinTheta2 * graphHeight;
        
        ctx.fillStyle = '#FF5722';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add point label
        ctx.fillStyle = '#333';
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`(${sinTheta1.toFixed(2)}, ${sinTheta2.toFixed(2)})`, x + 10, y - 10);
    }
    
    // Highlight critical angle if enabled
    if (criticalAngleMode && criticalAngle !== null) {
        const sinCritical = Math.sin(criticalAngle * Math.PI / 180);
        const x = margin + sinCritical * graphWidth;
        
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(x, height - margin);
        ctx.lineTo(x, margin);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Label critical angle
        ctx.fillStyle = '#FF0000';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Critical: ${criticalAngle.toFixed(1)}°`, x, margin - 5);
    }
}

/**
 * Draw the ray diagram showing light refraction
 */
function drawRayDiagram(refractedAngle, criticalAngle) {
    const ctx = rayCtx;
    const width = rayCanvas.width;
    const height = rayCanvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw interface between media
    const interfaceY = height / 2;
    
    // Draw medium backgrounds
    const material1 = materials[n1.toString()] || { color: '#E3F2FD', name: 'Medium 1' };
    const material2 = materials[n2.toString()] || { color: '#E8F5E8', name: 'Medium 2' };
    
    ctx.fillStyle = material1.color;
    ctx.fillRect(0, 0, width, interfaceY);
    ctx.fillStyle = material2.color;
    ctx.fillRect(0, interfaceY, width, height - interfaceY);
    
    // Draw interface line
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, interfaceY);
    ctx.lineTo(width, interfaceY);
    ctx.stroke();
    
    // Draw normal line if enabled
    if (showNormal) {
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
        ctx.setLineDash([]);
    }
    
    // Calculate ray positions
    const centerX = width / 2;
    const rayLength = Math.min(width, height) * 0.3;
    
    // Draw incident ray
    const incidentRad = currentAngle * Math.PI / 180;
    const incidentEndX = centerX - rayLength * Math.sin(incidentRad);
    const incidentEndY = interfaceY - rayLength * Math.cos(incidentRad);
    
    ctx.strokeStyle = '#2196F3';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(incidentEndX, incidentEndY);
    ctx.lineTo(centerX, interfaceY);
    ctx.stroke();
    
    // Draw arrowhead for incident ray
    drawArrowhead(ctx, incidentEndX, incidentEndY, centerX, interfaceY, '#2196F3');
    
    // Draw refracted or reflected ray
    if (refractedAngle !== null) {
        // Normal refraction
        const refractedRad = refractedAngle * Math.PI / 180;
        const refractedEndX = centerX + rayLength * Math.sin(refractedRad);
        const refractedEndY = interfaceY + rayLength * Math.cos(refractedRad);
        
        ctx.strokeStyle = '#FF5722';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX, interfaceY);
        ctx.lineTo(refractedEndX, refractedEndY);
        ctx.stroke();
        
        drawArrowhead(ctx, centerX, interfaceY, refractedEndX, refractedEndY, '#FF5722');
    } else {
        // Total internal reflection
        const reflectedEndX = centerX + rayLength * Math.sin(incidentRad);
        const reflectedEndY = interfaceY - rayLength * Math.cos(incidentRad);
        
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX, interfaceY);
        ctx.lineTo(reflectedEndX, reflectedEndY);
        ctx.stroke();
        
        drawArrowhead(ctx, centerX, interfaceY, reflectedEndX, reflectedEndY, '#FF0000');
    }
    
    // Draw angle measurements if normal is shown
    if (showNormal) {
        drawAngleArc(ctx, centerX, interfaceY, currentAngle, true, '#2196F3');
        if (refractedAngle !== null) {
            drawAngleArc(ctx, centerX, interfaceY, refractedAngle, false, '#FF5722');
        }
    }
    
    // Add medium labels
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${material1.name} (n=${n1.toFixed(2)})`, 10, 25);
    ctx.fillText(`${material2.name} (n=${n2.toFixed(2)})`, 10, height - 10);
}

/**
 * Draw an arrowhead at the end of a ray
 */
function drawArrowhead(ctx, fromX, fromY, toX, toY, color) {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const arrowLength = 15;
    const arrowAngle = Math.PI / 6;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - arrowLength * Math.cos(angle - arrowAngle),
        toY - arrowLength * Math.sin(angle - arrowAngle)
    );
    ctx.lineTo(
        toX - arrowLength * Math.cos(angle + arrowAngle),
        toY - arrowLength * Math.sin(angle + arrowAngle)
    );
    ctx.closePath();
    ctx.fill();
}

/**
 * Draw angle measurement arc
 */
function drawAngleArc(ctx, centerX, centerY, angle, isIncident, color) {
    const radius = 40;
    const angleRad = angle * Math.PI / 180;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    if (isIncident) {
        // Draw incident angle on the left side of the normal (upper-left quadrant)
        ctx.arc(centerX, centerY, radius, -Math.PI/2, -Math.PI/2 - angleRad, true);
    } else {
        ctx.arc(centerX, centerY, radius, Math.PI/2 - angleRad, Math.PI/2, false);
    }
    ctx.stroke();
    
    // Add angle label
    ctx.fillStyle = color;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    const labelRadius = radius + 15;
    let labelX, labelY;
    
    if (isIncident) {
        const labelAngle = -Math.PI/2 - angleRad/2;
        labelX = centerX + labelRadius * Math.cos(labelAngle);
        labelY = centerY + labelRadius * Math.sin(labelAngle);
    } else {
        const labelAngle = Math.PI/2 - angleRad/2;
        labelX = centerX + labelRadius * Math.cos(labelAngle);
        labelY = centerY + labelRadius * Math.sin(labelAngle);
    }
    
    ctx.fillText(`${angle.toFixed(1)}°`, labelX, labelY);
}

/**
 * Handle clicks on the graph canvas for interactive plotting
 */
function handleGraphClick(event) {
    const rect = graphCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to graph coordinates
    const margin = 40;
    const graphWidth = graphCanvas.width - 2 * margin;
    const graphHeight = graphCanvas.height - 2 * margin;
    
    if (x >= margin && x <= graphCanvas.width - margin && 
        y >= margin && y <= graphCanvas.height - margin) {
        
        const sinTheta1 = (x - margin) / graphWidth;
        const theta1 = Math.asin(sinTheta1) * 180 / Math.PI;
        
        if (theta1 >= 0 && theta1 <= 90) {
            currentAngle = theta1;
            document.getElementById('angleSlider').value = currentAngle;
            document.getElementById('angleValue').textContent = currentAngle.toFixed(1);
            updateVisualization();
        }
    }
}

/**
 * Handle clicks on the ray canvas
 */
function handleRayClick(event) {
    // Add visual feedback for interaction
    const rect = rayCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Create ripple effect
    createRipple(x, y, rayCanvas);
}

/**
 * Create a visual ripple effect at click position
 */
function createRipple(x, y, canvas) {
    const ctx = canvas.getContext('2d');
    let radius = 0;
    const maxRadius = 50;
    
    function animate() {
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = 'rgba(33, 150, 243, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
        
        radius += 2;
        if (radius < maxRadius) {
            requestAnimationFrame(animate);
        } else {
            updateVisualization(); // Redraw to remove ripple
        }
    }
    animate();
}

/**
 * Toggle critical angle visualization
 */
function toggleCriticalAngle() {
    criticalAngleMode = !criticalAngleMode;
    const button = document.getElementById('showCritical');
    button.textContent = criticalAngleMode ? 'Hide Critical Angle' : 'Show Critical Angle';
    button.style.background = criticalAngleMode ? 
        'linear-gradient(145deg, #FF5722, #E64A19)' : 
        'linear-gradient(145deg, #4CAF50, #45a049)';
    updateVisualization();
}

/**
 * Toggle normal line visibility
 */
function toggleNormalLines() {
    showNormal = !showNormal;
    const button = document.getElementById('toggleNormal');
    button.textContent = showNormal ? 'Hide Normal' : 'Show Normal';
    updateVisualization();
}

/**
 * Reset all values to defaults
 */
function resetToDefaults() {
    currentAngle = 30;
    n1 = 1.00;
    n2 = 1.33;
    showNormal = true;
    criticalAngleMode = false;
    
    // Update UI elements
    document.getElementById('angleSlider').value = currentAngle;
    document.getElementById('angleValue').textContent = currentAngle;
    document.getElementById('medium1').value = '1.00';
    document.getElementById('medium2').value = '1.33';
    document.getElementById('n1Custom').style.display = 'none';
    document.getElementById('n2Custom').style.display = 'none';
    
    // Reset button states
    document.getElementById('showCritical').textContent = 'Show Critical Angle';
    document.getElementById('showCritical').style.background = 'linear-gradient(145deg, #4CAF50, #45a049)';
    document.getElementById('toggleNormal').textContent = 'Hide Normal';
    
    updateVisualization();
    showTooltip('Reset to default values: Air to Water at 30° incident angle');
}

/**
 * Show examples modal
 */
function showExamples() {
    document.getElementById('examplesModal').style.display = 'block';
}

/**
 * Hide examples modal
 */
function hideExamples() {
    document.getElementById('examplesModal').style.display = 'none';
}

/**
 * Load example scenarios
 */
function loadExample(event) {
    const scenario = event.target.dataset.scenario;
    
    switch (scenario) {
        case 'rainbow':
            // White light entering water droplet
            n1 = 1.00; n2 = 1.33; currentAngle = 42;
            document.getElementById('medium1').value = '1.00';
            document.getElementById('medium2').value = '1.33';
            showTooltip('Rainbow Formation: Light entering water droplet at 42° (red light critical angle)');
            break;
            
        case 'fiber':
            // Total internal reflection in optical fiber
            n1 = 1.50; n2 = 1.00; currentAngle = 75;
            document.getElementById('medium1').value = '1.50';
            document.getElementById('medium2').value = '1.00';
            criticalAngleMode = true;
            showTooltip('Fiber Optics: Light trapped in glass fiber by total internal reflection');
            break;
            
        case 'diamond':
            // Diamond's high refractive index
            n1 = 1.00; n2 = 2.42; currentAngle = 45;
            document.getElementById('medium1').value = '1.00';
            document.getElementById('medium2').value = '2.42';
            showTooltip('Diamond Brilliance: High refractive index creates dramatic light bending');
            break;
            
        case 'underwater':
            // Looking up from underwater
            n1 = 1.33; n2 = 1.00; currentAngle = 60;
            document.getElementById('medium1').value = '1.33';
            document.getElementById('medium2').value = '1.00';
            criticalAngleMode = true;
            showTooltip('Underwater Vision: Looking up from water shows critical angle effects');
            break;
    }
    
    // Update UI and visualization
    document.getElementById('angleSlider').value = currentAngle;
    document.getElementById('angleValue').textContent = currentAngle;
    updateVisualization();
    hideExamples();
}

/**
 * Set up tooltip functionality
 */
function setupTooltips() {
    const tooltip = document.getElementById('tooltip');
    const elementsWithTooltips = document.querySelectorAll('[title]');
    
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const title = this.getAttribute('title');
            if (title) {
                tooltip.textContent = title;
                tooltip.classList.add('show');
                updateTooltipPosition(e);
                this.removeAttribute('title'); // Prevent default tooltip
                this.setAttribute('data-title', title); // Store for later
            }
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
            const title = this.getAttribute('data-title');
            if (title) {
                this.setAttribute('title', title);
                this.removeAttribute('data-title');
            }
        });
        
        element.addEventListener('mousemove', updateTooltipPosition);
    });
}

/**
 * Update tooltip position
 */
function updateTooltipPosition(e) {
    const tooltip = document.getElementById('tooltip');
    const rect = document.body.getBoundingClientRect();
    
    tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
    tooltip.style.top = (e.clientY - rect.top - 30) + 'px';
}

/**
 * Show custom tooltip message
 */
function showTooltip(message) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = message;
    tooltip.classList.add('show');
    tooltip.style.left = '50%';
    tooltip.style.top = '20px';
    tooltip.style.transform = 'translateX(-50%)';
    
    setTimeout(() => {
        tooltip.classList.remove('show');
        tooltip.style.transform = 'none';
    }, 3000);
}

// Utility function to handle window resize
window.addEventListener('resize', function() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
        resizeCanvases();
    }, 100);
});
