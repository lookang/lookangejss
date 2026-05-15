// Define some functions for interactivity and analytics

// Update the unit circle with the current angle
function updateAngle() {
    const degree = parseFloat(document.getElementById('degree').value);
    const radian = degree * (Math.PI / 180);
    drawUnitCircle(radian);
    document.getElementById('angleTip').textContent = `Angle: ${degree}° (${radian.toFixed(2)} rad)`;
    drawTrigGraphs(radian);
}

// Reset to 0 degrees
function reset() {
    document.getElementById('degree').value = 0;
    updateAngle();
}

// Toggle between degrees and radians
function toggleRadian() {
    const currentValue = document.getElementById('degree').value;
    if (currentValue % 1 === 0) {
        document.getElementById('degree').value = currentValue * (180 / Math.PI);
    } else {
        document.getElementById('degree').value = currentValue * Math.PI / 180;
    }
    updateAngle();
}

// Draw the unit circle with the current angle
function drawUnitCircle(angleRadian) {
    const canvas = document.getElementById('unitCircle');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, 90, 0, angleRadian, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
    // Optional: Draw sine and cosine projections (needs math for exact values at special angles)
    // Example: draw a line to (90, 0) and (0, 1) for sin(90° = 1)
    if (angleRadian === Math.PI / 2) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX, 0);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillText('sin(90° = 1)', centerX - 30, centerY + 10);
    }
}

// Draw graphs of sin(x) and cos(x) with interactive sliders
function drawTrigGraphs(angleRadian) {
    const sinGraph = document.getElementById('sinGraph');
    const cosGraph = document.getElementById('cosGraph');
    const ctxSin = sinGraph.getContext('2d');
    const ctxCos = cosGraph.getContext('2d');
    ctxSin.clearRect(0, 0, sinGraph.width, sinGraph.height);
    ctxCos.clearRect(0, 0, cosGraph.width, cosGraph.height);

    // Draw y = sin(x) graph
    drawGraph(ctxSin, angleRadian, 'sin(x)', 'red');
    // Draw y = cos(x) graph
    drawGraph(ctxCos, angleRadian, 'cos(x)', 'blue');

    // Function to draw a graph with interactive sliders
    function drawGraph(ctx, radian, functionLabel, color) {
        const x = Array.from({ length: 400 }, (_, i) => i / 20);
        const ySin = x.map(x => Math.sin(radian * x));
        const yCos = x.map(x => Math.cos(radian * x));

        // Draw axis and labels
        ctx.beginPath();
        ctx.moveTo(0, sinGraph.height);
        ctx.lineTo(sinGraph.width, 0);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(functionLabel, sinGraph.width / 2, 10);
        ctx.fillText('y', 10, sinGraph.height - 10);

        // Draw graph lines
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.moveTo(0, ySin[0]);
        ctx.lineTo(sinGraph.width, ySin[ySin.length - 1]);
        ctx.stroke();
        // Optional: Highlight special points (e.g., sin(0) = 0, sin(90) = 1, etc.)
        if (isSpecialAngle(radian)) {
            ctx.fillStyle = 'yellow';
            ctx.fillRect(0, ySin[0], 5, 5);
        }

        // Add interactive point (draggable)
        const point = {
            x: sinGraph.width / 2,
            y: ySin[Math.floor(x.length / 2)]
        };
        const drag = (e) => {
            if (e.type === 'mousedown' || e.type === 'touchstart') {
                document.addEventListener('mousemove', dragMove);
                document.addEventListener('touchmove', dragMove);
                document.addEventListener('mouseup', dragEnd);
                document.addEventListener('touchend', dragEnd);
                point.startX = e.clientX || e.touches[0].clientX;
                point.startY = e.clientY || e.touches[0].clientY;
            } else if (e.type === 'mouseup' || e.type === 'touchend') {
                document.removeEventListener('mousemove', dragMove);
                document.removeEventListener('touchmove', dragMove);
                document.removeEventListener('mouseup', dragEnd);
                document.removeEventListener('touchend', dragEnd);
                const newX = (e.clientX || e.touches[0].clientX) - point.startX;
                point.x = clamp(0, sinGraph.width, newX);
                updatePoint(point.x, point.y);
            }
        };
        sinGraph.addEventListener('mousedown', drag);
        sinGraph.addEventListener('touchstart', drag);
        // Update point position on drag
        function dragMove(e) {
            if (e.type === 'mousemove' || e.type === 'touchmove') {
                const newX = e.clientX || e.touches[0].clientX;
                point.x = clamp(0, sinGraph.width, newX - sinGraph.offsetLeft);
                updatePoint(point.x, point.y);
            }
        }
        function dragEnd() {
            updatePoint(point.x, point.y);
        }
        function updatePoint(x, y) {
            if (isNaN(x) || isNaN(y)) return;
            const yVal = Math.sin(radian * x / 180); // Convert to radians
            // Update graph and analytics
            updateGraph(yVal, 'sin', x, y);
            // Record action in analytics
            logAction(`Dragged point to (${x.toFixed(2)}, ${y.toFixed(2)})`);
        }
    }

    // Helper function to highlight special angles (e.g., 0°, 90°, 180°, etc.)
    function isSpecialAngle(radian) {
        return [
            0, Math.PI / 2, Math.PI, 3 * Math.PI / 2
        ].includes(radian);
    }

    // Update graph with new point (simplified for this example)
    function updateGraph(yVal, functionLabel, x, y) {
        // Example: Draw a small dot at (x, y)
        ctxSin.fillStyle = 'red';
        ctxSin.fillRect(x, sinGraph.height - yVal * sinGraph.height, 5, 5);
        // Update cos graph similarly if needed
    }
}

// Analytics panel
function logAction(action) {
    const log = document.getElementById('actionLog');
    const entry = `<li>${action}</li>`;
    log.innerHTML += entry;
    log.scrollTop = log.scrollHeight;
}

function toggleAnalytics() {
    const analytics = document.getElementById('analyticsLog');
    analytics.style.display = analytics.style.display === 'block' ? 'none' : 'block';
}

function clearLog() {
    document.getElementById('actionLog').innerHTML = '';
}

// Check if user has moved the slider (or interacted)
document.getElementById('degree').addEventListener('input', (e) => {
    if (e.target.value % 1 !== 0) { // Non-integer input (e.g., drag)
        logAction(`User adjusted slider to ${e.target.value}°`);
    }
});