document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const beamLengthMeters = 10.0;
    const beamMassKg = 50.0;
    const g = 9.8; // m/s^2

    const loads = [
        { massKg: 100, posXMetres: 3.0 },
        { massKg: 150, posXMetres: 7.0 },
        { massKg: 200, posXMetres: 8.5 },
    ];

    // --- Canvas Setup ---
    const canvas = document.getElementById('beamCanvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('simulation-container');

    // --- Dynamic Sizing ---
    let canvasWidth, canvasHeight;
    let scaleFactor; // Pixels per meter
    const beamThicknessPx = 20;
    const supportHeightPx = 30;
    const loadHeightPx = 40;
    const paddingY = 70; // Space above/below beam for forces/labels
    const paddingX = 30; // Space at the sides

    function resizeCanvas() {
        // Get container dimensions
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Calculate canvas width (2/3 of container width)
        canvasWidth = containerWidth * 0.66;
        
        // Calculate scale based on width, leaving padding
        scaleFactor = (canvasWidth - 2 * paddingX) / beamLengthMeters;
        
        // Set canvas drawing dimensions
        canvas.width = canvasWidth;
        
        // Calculate height needed - simplified version
        canvasHeight = containerHeight * 0.8; // Use 80% of container height
        canvas.height = canvasHeight;
        
        // Redraw everything after resize
        runSimulation();
    }

    // --- Physics Calculations ---
    let FL = 0;
    let FR = 0;
    let totalWeightN = 0;

    // Touch event handlers for mobile devices
function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function handleTouchEnd(e) {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup');
    canvas.dispatchEvent(mouseEvent);
}

// Add touch event listeners
canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

function calculateForces() {
        // 1. Weights
        const beamWeightN = beamMassKg * g;
        const beamWeightPosX = beamLengthMeters / 2;

        let totalDownwardForce = beamWeightN;
        loads.forEach(load => {
            load.weightN = load.massKg * g;
            totalDownwardForce += load.weightN;
        });
        totalWeightN = totalDownwardForce; // Store for display

        // 2. Torques about Left Support (pivot at x=0)
        let totalClockwiseTorque = 0;

        // Torque from beam weight
        totalClockwiseTorque += beamWeightN * beamWeightPosX;

        // Torques from loads
        loads.forEach(load => {
            totalClockwiseTorque += load.weightN * load.posXMetres;
        });

        // 3. Solve for FR
        // Sum of Torques = 0 => FR * beamLengthMeters - totalClockwiseTorque = 0
        FR = totalClockwiseTorque / beamLengthMeters;

        // 4. Solve for FL
        // Sum of Forces = 0 => FL + FR - totalDownwardForce = 0
        FL = totalDownwardForce - FR;

        // Update display with null checks
        const forceLElement = document.getElementById('forceL');
        const forceRElement = document.getElementById('forceR');
        const totalWeightElement = document.getElementById('totalWeight');
        
        if (forceLElement) forceLElement.textContent = FL.toFixed(1);
        if (forceRElement) forceRElement.textContent = FR.toFixed(1);
        if (totalWeightElement) totalWeightElement.textContent = totalWeightN.toFixed(1);
    
        // Add calculation steps display
        const stepsDiv = document.getElementById('calculationSteps');
        if (stepsDiv) {
            stepsDiv.innerHTML = `
                <h3>Calculation Steps:</h3>
                <h4>Physics Principles:</h4>
                <p>1. Net Force = 0 (ΣF = 0):</p>
                <p>   F_L + F_R = Total Weight</p>
                
                <p>2. Net Torque about Left Support = 0 (Στ = 0):</p>
                <p>   F_R × Beam Length = Total Torque</p>
                
                <h4>Calculations:</h4>
                <p>1. Total Weight = Beam Weight + Load Weights</p>
                <p>   = (${beamMassKg} kg × ${g} m/s²) + (${loads.map(l => `${l.massKg} kg × ${g} m/s²`).join(' + ')})</p>
                <p>   = ${beamWeightN.toFixed(1)} N + ${loads.reduce((sum, l) => sum + l.weightN, 0).toFixed(1)} N</p>
                <p>   = ${totalWeightN.toFixed(1)} N</p>
                
                <p>2. Torque about Left Support:</p>
                <p>   = Beam Weight × ${beamWeightPosX.toFixed(1)} m ${loads.map(l => ` + ${l.massKg} kg × ${g} m/s² × ${l.posXMetres.toFixed(1)} m`).join('')}</p>
                <p>   = ${(beamWeightN * beamWeightPosX).toFixed(1)} Nm ${loads.map(l => ` + ${(l.weightN * l.posXMetres).toFixed(1)} Nm`).join('')}</p>
                <p>   = ${totalClockwiseTorque.toFixed(1)} Nm</p>
                
                <p>3. Solve for F_R (from Στ = 0):</p>
                <p>   F_R × ${beamLengthMeters.toFixed(1)} m = ${totalClockwiseTorque.toFixed(1)} Nm</p>
                <p>   F_R = ${totalClockwiseTorque.toFixed(1)} Nm / ${beamLengthMeters.toFixed(1)} m</p>
                <p>   F_R = ${FR.toFixed(1)} N</p>
                
                <p>4. Solve for F_L (from ΣF = 0):</p>
                <p>   F_L + ${FR.toFixed(1)} N = ${totalWeightN.toFixed(1)} N</p>
                <p>   F_L = ${totalWeightN.toFixed(1)} N - ${FR.toFixed(1)} N</p>
                <p>   F_L = ${FL.toFixed(1)} N</p>
            `;
        }
    }


    // --- Drawing Functions ---
    function drawBeam() {
        ctx.fillStyle = '#888';
        const beamY = canvas.height - paddingY - beamThicknessPx; // Position from bottom
        ctx.fillRect(paddingX, beamY, beamLengthMeters * scaleFactor, beamThicknessPx);
        return beamY;
    }

    function drawSupports(beamY) {
        ctx.fillStyle = '#c00'; // Red supports

        // Left support (at x=0)
        const supportTopY = beamY + beamThicknessPx;
        const supportBaseY = supportTopY + supportHeightPx;
        const supportWidth = 30;

        ctx.beginPath();
        ctx.moveTo(paddingX, supportTopY); // Top point
        ctx.lineTo(paddingX - supportWidth / 2, supportBaseY); // Bottom left
        ctx.lineTo(paddingX + supportWidth / 2, supportBaseY); // Bottom right
        ctx.closePath();
        ctx.fill();

        // Right support (at x=L)
        const rightSupportX = paddingX + beamLengthMeters * scaleFactor;
        ctx.beginPath();
        ctx.moveTo(rightSupportX, supportTopY); // Top point
        ctx.lineTo(rightSupportX - supportWidth / 2, supportBaseY); // Bottom left
        ctx.lineTo(rightSupportX + supportWidth / 2, supportBaseY); // Bottom right
        ctx.closePath();
        ctx.fill();
    }

    function drawLoads(beamY) {
        ctx.fillStyle = '#ffcc00'; // Yellow sacks
        ctx.strokeStyle = '#b8860b'; // Darker border
        ctx.lineWidth = 1;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#333'; // Text color

        const loadWidthPx = 35; // Fixed width for sacks
        const loadTopY = beamY - loadHeightPx; // Place on top of beam

        // Beam weight indication (optional visual cue)
        const beamWeightDrawX = paddingX + (beamLengthMeters / 2) * scaleFactor;
        // Change from upward to downward arrow:
        drawArrow(beamWeightDrawX, beamY, beamWeightDrawX, beamY + loadHeightPx / 2, '#00aaff', 'Beam W');

        // Draw each sack
        loads.forEach((load, index) => {
            const loadCenterX = paddingX + load.posXMetres * scaleFactor;
            const loadLeftX = loadCenterX - loadWidthPx / 2;

            // Draw sack (simple rect)
            ctx.fillStyle = '#ffcc00';
            ctx.fillRect(loadLeftX, loadTopY, loadWidthPx, loadHeightPx);
            ctx.strokeRect(loadLeftX, loadTopY, loadWidthPx, loadHeightPx);

            // Draw label
            ctx.fillStyle = '#333';
            ctx.fillText(`${load.massKg} kg`, loadCenterX, loadTopY - 5);

            // Draw weight force arrow
            drawArrow(loadCenterX, beamY, loadCenterX, beamY + paddingY * 0.6, '#e67e22');

            // Store load positions for hit testing - adjust y position to include beamY
            load.hitArea = {
                x: loadLeftX - 10,  // Expand hit area left by 10px
                y: beamY - loadHeightPx - 10,  // Expand hit area up by 10px
                width: loadWidthPx + 20,  // Expand hit area width by 20px
                height: loadHeightPx + 100  // Expand hit area height by 20px
            };
            console.log(`Load ${index} hitArea:`, load.hitArea);
        });
    }

    // Add these new functions for drag handling
    // Add these at the top with other variables
    let isDragging = false;
    let draggedLoadIndex = -1;

    function setupDragHandlers() {
        console.log('Setting up drag handlers...'); // Debug log
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseleave', handleMouseUp);
    }

    function handleMouseDown(e) {
        console.log('Mouse down event detected'); // Debug log
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        console.log(`Mouse position: ${mouseX}, ${mouseY}`); // Debug log
    
        for (let i = 0; i < loads.length; i++) {
            const area = loads[i].hitArea;
            console.log(`Checking load ${i} hitArea:`, area); // Debug log
            if (mouseX >= area.x && mouseX <= area.x + area.width &&
                mouseY >= area.y && mouseY <= area.y + area.height) {
                console.log(`Hit load ${i}`); // Debug log
                isDragging = true;
                draggedLoadIndex = i;
                canvas.style.cursor = 'grabbing';
                return;
            }
        }
        console.log('No load was hit'); // Debug log
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        
        // Calculate new position in meters
        let newPosX = (mouseX - paddingX) / scaleFactor;
        
        // Constrain between supports (0 to beamLengthMeters)
        newPosX = Math.max(0, Math.min(newPosX, beamLengthMeters));
        
        // Update load position
        loads[draggedLoadIndex].posXMetres = newPosX;
        
        // Recalculate and redraw
        runSimulation();
    }

    function handleMouseUp() {
        if (isDragging) {
            isDragging = false;
            draggedLoadIndex = -1;
            canvas.style.cursor = 'pointer';
        }
    }

     function drawForces(beamY) {
        const arrowLengthScale = 0.01; // Adjust for visual scaling of forces

        // Draw FL
        const FlX = paddingX;
        drawArrow(FlX, beamY, FlX, beamY - FL * arrowLengthScale, '#2ecc71', `F_L=${FL.toFixed(0)}N`); // Upward green

        // Draw FR
        const FrX = paddingX + beamLengthMeters * scaleFactor;
        drawArrow(FrX, beamY, FrX, beamY - FR * arrowLengthScale, '#2ecc71', `F_R=${FR.toFixed(0)}N`); // Upward green
     }

     function drawArrow(fromX, fromY, toX, toY, color = 'black', label = '') {
        const headLength = 10; // length of head in pixels
        const dx = toX - fromX;
        const dy = toY - fromY;
        const angle = Math.atan2(dy, dx);

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2;

        // Line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();

        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();

        // Label (optional)
        if (label) {
            ctx.font = '11px sans-serif';
            ctx.textAlign = (fromX === toX) ? 'center' : (dx > 0 ? 'left' : 'right'); // Basic alignment
             const labelOffset = (fromY === toY) ? 15 : 0; // Offset for horizontal/vertical
             const labelX = toX + (fromX === toX ? 5 : 0); // Offset text slightly right for vertical arrows
             const labelY = toY + (fromY < toY ? 15 : -8); // Offset text below/above arrowhead
            ctx.fillText(label, labelX , labelY);
        }
     }

     function drawDistances(beamY) {
         ctx.font = '11px sans-serif';
         ctx.fillStyle = '#555';
         ctx.textAlign = 'center';
         const textY = beamY + beamThicknessPx + supportHeightPx + 25; // Below supports

         // Start point
         ctx.fillText('0 m', paddingX, textY);

         // Load positions
         let lastPos = 0;
         loads.forEach(load => {
             const currentX = paddingX + load.posXMetres * scaleFactor;
             const midPointX = paddingX + ((load.posXMetres + lastPos)/2) * scaleFactor;
             const distance = (load.posXMetres - lastPos).toFixed(1); // Changed to toFixed(1)
             if (distance > 0.1) {
                 ctx.fillText(`${distance} m`, midPointX, textY - 12);
                 // Draw line segment marker
                 ctx.beginPath();
                 ctx.moveTo(paddingX + lastPos * scaleFactor, textY - 20);
                 ctx.lineTo(currentX, textY - 20);
                 ctx.stroke();
             }
             lastPos = load.posXMetres;
         });

         // Distance from last load to end
         const endX = paddingX + beamLengthMeters * scaleFactor;
         const lastDistance = (beamLengthMeters - lastPos).toFixed(1); // Changed to toFixed(1)
         const lastMidPointX = paddingX + ((beamLengthMeters + lastPos) / 2) * scaleFactor;
         if (lastDistance > 0.1) {
             ctx.fillText(`${lastDistance} m`, lastMidPointX, textY - 12);
              // Draw line segment marker
              ctx.beginPath();
              ctx.moveTo(paddingX + lastPos * scaleFactor, textY - 20);
              ctx.lineTo(endX, textY - 20);
              ctx.stroke();
         }

         // End point
         ctx.fillText(`${beamLengthMeters.toFixed(1)} m`, endX, textY);
     }


    // --- Main Simulation Function ---
    function runSimulation() {
        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Perform calculations
        calculateForces(); // Ensure forces are calculated before drawing things based on them

        // Draw elements
        const beamY = drawBeam();
        drawSupports(beamY);
        drawLoads(beamY);
        drawForces(beamY); // Draw forces based on calculated values
        drawDistances(beamY); // Add distance markers
    }

    // --- Initial Setup & Event Listeners ---
    window.addEventListener('resize', resizeCanvas);
    // Add this at the end of DOMContentLoaded
    setupDragHandlers();
    resizeCanvas(); // Initial draw
});