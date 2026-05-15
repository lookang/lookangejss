const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const numElectronsSlider = document.getElementById('numElectrons');
const numElectronsValue = document.getElementById('numElectronsValue');

let atomRadius;
let electronRadius;
let numElectrons = parseInt(numElectronsSlider.value, 10);
let electrons = [];
let draggingElectron = null;
let offsetX, offsetY;
let isDragging = false;
let resizeTimeout; // Define resizeTimeout here
let animationFrameId;

// Function to resize canvas and recalculate sizes
function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    atomRadius = Math.min(canvas.width, canvas.height) * 0.3;
    electronRadius = canvas.height * 0.01;  // 1% of canvas height
    initElectrons(numElectrons);
    drawPlumPuddingModel();
}

// Function to draw the atom (positive sphere)
function drawAtom() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, atomRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'rgba(255, 200, 200, 0.5)'; // Light red color for positive sphere
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();
}

// Function to draw electrons
function drawElectrons() {
    electrons.forEach(electron => {
        ctx.beginPath();
        ctx.arc(electron.x, electron.y, electronRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'blue'; // Blue color for electrons
        ctx.fill();
        ctx.strokeStyle = 'darkblue';
        ctx.stroke();
        ctx.closePath();

        // Draw "-" sign on the electrons
        ctx.fillStyle = 'white';
        ctx.font = `${electronRadius * 1.5}px Arial`; // Adjust font size relative to electron radius
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('-', electron.x, electron.y);
    });
}

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to draw the entire Plum Pudding Model
function drawPlumPuddingModel() {
    clearCanvas();
    drawAtom();
    drawElectrons();
}

// Initialize electron positions without overlapping
function initElectrons(num) {
    electrons = [];
    const positions = new Set();
    for (let i = 0; i < num; i++) {
        let validPosition = false;
        let x, y;
        while (!validPosition) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * (atomRadius - electronRadius);
            x = canvas.width / 2 + distance * Math.cos(angle);
            y = canvas.height / 2 + distance * Math.sin(angle);
            const key = `${Math.round(x)},${Math.round(y)}`;
            if (!positions.has(key) && 
                electrons.every(electron => Math.sqrt((x - electron.x) ** 2 + (y - electron.y) ** 2) > 2 * electronRadius)) {
                validPosition = true;
                positions.add(key);
            }
        }
        electrons.push({ x, y });
    }
}

// Event listeners for dragging electrons
canvas.addEventListener('mousedown', (e) => {
    handleMouseDown(e);
});

canvas.addEventListener('mousemove', (e) => {
    handleMouseMove(e);
});

canvas.addEventListener('mouseup', () => {
    handleMouseUp();
});

canvas.addEventListener('mouseout', () => {
    handleMouseUp();
});

canvas.addEventListener('touchstart', (e) => {
    handleMouseDown(e.touches[0]);
    e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
    handleMouseMove(e.touches[0]);
    e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchend', () => {
    handleMouseUp();
});

// Handle mouse down event
function handleMouseDown(e) {
    isDragging = true;
    const mousePos = getMousePos(canvas, e);
    electrons.forEach(electron => {
        if (isInside(mousePos, electron)) {
            draggingElectron = electron;
            offsetX = mousePos.x - electron.x;
            offsetY = mousePos.y - electron.y;
        }
    });
}

// Handle mouse move event
function handleMouseMove(e) {
    if (isDragging && draggingElectron) {
        const mousePos = getMousePos(canvas, e);
        let newX = mousePos.x - offsetX;
        let newY = mousePos.y - offsetY;

        // Calculate distance from center
        const distFromCenter = Math.sqrt(Math.pow(newX - canvas.width / 2, 2) + Math.pow(newY - canvas.height / 2, 2));

        // Restrict movement within the atom's boundary
        if (distFromCenter + electronRadius <= atomRadius) {
            draggingElectron.x = newX;
            draggingElectron.y = newY;
        } else {
            // Restrict to the boundary
            const angle = Math.atan2(newY - canvas.height / 2, newX - canvas.width / 2);
            draggingElectron.x = canvas.width / 2 + (atomRadius - electronRadius) * Math.cos(angle);
            draggingElectron.y = canvas.height / 2 + (atomRadius - electronRadius) * Math.sin(angle);
        }

        requestAnimationFrame(drawPlumPuddingModel);
    }
}

// Handle mouse up event
function handleMouseUp() {
    isDragging = false;
    draggingElectron = null;
}

// Utility functions
function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function isInside(mousePos, electron) {
    return Math.sqrt((mousePos.x - electron.x) ** 2 + (mousePos.y - electron.y) ** 2) <= electronRadius;
}

// Handle slider input efficiently
numElectronsSlider.addEventListener('input', debounce(() => {
    numElectrons = parseInt(numElectronsSlider.value, 10);
    numElectronsValue.textContent = numElectrons;

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
        initElectrons(numElectrons);
        drawPlumPuddingModel();
    });
}, 10));  // Decrease debounce delay to make it more responsive

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Handle resize and orientation change events efficiently
function handleResizeOrOrientationChange() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCanvas();
        requestAnimationFrame(() => {
            initElectrons(numElectrons);
            drawPlumPuddingModel();
        });
    }, 100);
}

window.addEventListener('resize', handleResizeOrOrientationChange);
window.addEventListener('orientationchange', handleResizeOrOrientationChange);

// Initialize and draw the model
resizeCanvas();
initElectrons(numElectrons); // Ensure electrons are drawn initially
requestAnimationFrame(drawPlumPuddingModel);
