// --- Basic Three.js Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, (window.innerWidth - 340) / window.innerHeight, 0.1, 1000); // Adjust width for UI panel
const renderer = new THREE.WebGLRenderer({ antialias: true });
const sceneContainer = document.getElementById('scene-container');
renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
sceneContainer.appendChild(renderer.domElement);

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// --- Camera Controls ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(2, 2, 5);
controls.update();

// --- Constants ---
const MU0 = 4 * Math.PI * 1e-7; // Permeability of free space
const WIRE_RADIUS = 0.05;
const WIRE_LENGTH = 3;

// --- Wire ---
const wireGeometry = new THREE.CylinderGeometry(WIRE_RADIUS, WIRE_RADIUS, WIRE_LENGTH, 32);
const wireMaterial = new THREE.MeshStandardMaterial({ color: 0xb87333 }); // Copper color
const wire = new THREE.Mesh(wireGeometry, wireMaterial);
scene.add(wire);

// --- Current Direction Arrow (on wire) ---
const arrowHeight = 0.4;
const arrowRadius = 0.1;
const currentArrowGeometry = new THREE.ConeGeometry(arrowRadius, arrowHeight, 16);
const currentArrowMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red
const currentArrow = new THREE.Mesh(currentArrowGeometry, currentArrowMaterial);
currentArrow.position.y = WIRE_LENGTH / 2 + arrowHeight / 2 - 0.01; // At the top
scene.add(currentArrow);

// --- Magnetic Field Lines ---
const fieldLinesGroup = new THREE.Group();
scene.add(fieldLinesGroup);
const fieldLineArrowsGroup = new THREE.Group(); // Group for arrows on field lines
scene.add(fieldLineArrowsGroup);

const NUM_FIELD_LINES = 5;
// const FIELD_LINE_RADIUS_STEP = 0.3; // Removed for exponential spacing
const INITIAL_FIELD_LINE_RADIUS = WIRE_RADIUS + 0.2; // Start first line a bit away from wire
const FIELD_LINE_RADIUS_SCALE_FACTOR = 1.6; // Lines get further apart by this factor
const FIELD_LINE_THICKNESS = 0.02;

function createOrUpdateFieldLines(current) {
    fieldLinesGroup.children.forEach(child => child.material.dispose()); // Clean up materials
    fieldLinesGroup.clear(); // Remove old lines
    fieldLineArrowsGroup.children.forEach(child => child.material.dispose());
    fieldLineArrowsGroup.clear();

    if (current === 0 || !showFieldLinesCheckbox.checked) {
        return; // No field if no current or hidden
    }

    let currentRadius = INITIAL_FIELD_LINE_RADIUS;
    for (let i = 0; i < NUM_FIELD_LINES; i++) {
        const radius = currentRadius;
        const torusGeometry = new THREE.TorusGeometry(radius, FIELD_LINE_THICKNESS, 16, 100);
        const fieldLineMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00, // Green
            transparent: true,
            opacity: Math.max(0.1, 0.55 - (i * 0.09)) // Fade out further lines, ensure minimum visibility
        });
        const fieldLine = new THREE.Mesh(torusGeometry, fieldLineMaterial);
        fieldLine.rotation.x = Math.PI / 2; // Align with wire
        fieldLinesGroup.add(fieldLine);

        // Add direction arrows to this field line
        const numArrowsPerLine = 4;
        for (let j = 0; j < numArrowsPerLine; j++) {
            const arrowGeom = new THREE.ConeGeometry(0.05, 0.1, 8);
            const arrowMat = new THREE.MeshBasicMaterial({ color: 0x00cc00 }); // Darker green
            const arrow = new THREE.Mesh(arrowGeom, arrowMat);

            const angle = (j / numArrowsPerLine) * Math.PI * 2;
            arrow.position.x = radius * Math.cos(angle);
            arrow.position.z = radius * Math.sin(angle); // On XZ plane initially

            // Orient arrow
            arrow.lookAt(
                radius * Math.cos(angle + (current > 0 ? -0.1 : 0.1)), // Point slightly ahead/behind
                0,
                radius * Math.sin(angle + (current > 0 ? -0.1 : 0.1))
            );
            arrow.rotateX(Math.PI/2); // Correct cone orientation
            if(current < 0) arrow.rotateZ(Math.PI); // Flip if current is negative


            fieldLineArrowsGroup.add(arrow);
        }
        currentRadius *= FIELD_LINE_RADIUS_SCALE_FACTOR; // Update radius for the next line
    }
}

// --- UI Elements ---
const currentSlider = document.getElementById('currentSlider');
const currentValueDisplay = document.getElementById('currentValueDisplay');
const reverseCurrentBtn = document.getElementById('reverseCurrentBtn');
const showFieldLinesCheckbox = document.getElementById('showFieldLinesCheckbox');
const bFieldValueDisplay = document.getElementById('bFieldValue');
const rhrImage = document.getElementById('rhrImage');
const currentDirText = document.getElementById('currentDirText');

let currentStrength = parseFloat(currentSlider.value);

// --- Update Functions ---
function updateVisuals() {
    currentValueDisplay.textContent = `${currentStrength.toFixed(1)} A`;

    // Update current direction arrow on wire
    currentArrow.visible = currentStrength !== 0;
    if (currentStrength > 0) {
        currentArrow.position.y = WIRE_LENGTH / 2 + arrowHeight / 2 - 0.01;
        currentArrow.rotation.x = 0;
        currentDirText.textContent = "Up / Forward";
        if(rhrImage) rhrImage.src = "placeholder_rhr_up.svg"; // Update if you have images
    } else if (currentStrength < 0) {
        currentArrow.position.y = -WIRE_LENGTH / 2 - arrowHeight / 2 + 0.01;
        currentArrow.rotation.x = Math.PI; // Point down
        currentDirText.textContent = "Down / Backward";
        if(rhrImage) rhrImage.src = "placeholder_rhr_down.png";
    } else {
        currentDirText.textContent = "None";
        if(rhrImage) rhrImage.src = ""; // Or a neutral image
    }

    createOrUpdateFieldLines(currentStrength);
    updateBFieldValue();
}

function updateBFieldValue() {
    const r = 0.1; // Fixed reference distance for display
    if (currentStrength === 0) {
        bFieldValueDisplay.textContent = `0 T`;
        return;
    }
    const B = (MU0 * Math.abs(currentStrength)) / (2 * Math.PI * r);
    bFieldValueDisplay.textContent = `${B.toExponential(2)} T`;
}


// --- Event Listeners ---
currentSlider.addEventListener('input', (event) => {
    currentStrength = parseFloat(event.target.value);
    updateVisuals();
});

reverseCurrentBtn.addEventListener('click', () => {
    currentStrength *= -1;
    currentSlider.value = currentStrength; // Update slider position
    updateVisuals();
});

showFieldLinesCheckbox.addEventListener('change', () => {
    updateVisuals(); // Re-create lines based on checkbox state
});

window.addEventListener('resize', () => {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
});

// --- Animation Loop ---
let lastTime = 0;
const arrowRotationSpeed = 0.001; // Radians per millisecond

function animate(time) {
    requestAnimationFrame(animate);
    const deltaTime = time - lastTime;
    lastTime = time;

    // Animate arrows on field lines (simple rotation around Y axis)
    if (currentStrength !== 0 && showFieldLinesCheckbox.checked) {
        fieldLineArrowsGroup.children.forEach(arrow => {
            // This part needs more sophisticated logic to move along the torus
            // For simplicity, we'll rotate the whole group as if the arrows are fixed on a disk
            // A proper implementation would update each arrow's position and orientation along its torus
        });
        // Simple rotation of the whole arrows group for effect.
        // Direction depends on current.
        fieldLineArrowsGroup.rotation.y += (currentStrength > 0 ? 1 : -1) * arrowRotationSpeed * deltaTime;
    }


    controls.update();
    renderer.render(scene, camera);
}

// --- Initial Call ---
updateVisuals();
animate(0);