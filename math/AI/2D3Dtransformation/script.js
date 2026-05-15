// Global variables
let scene3d, camera3d, renderer3d;
let currentShape3d = null;
let animationId = null;
let mouseX = 0, mouseY = 0;
let isMouseDown = false;
let zoom2d = 1;
let zoom3d = 10.25; // Default to 100% zoom

// Shape transformation data
const transformations = {
    'circle-sphere': {
        name2d: 'Circle',
        name3d: 'Sphere',
        description: 'A circle is rotated around its diameter to create a sphere. Every point on the circle traces a circular path, forming a perfectly round 3D object.',
        properties2d: 'Radius, Circumference, Area = πr²',
        properties3d: 'Radius, Surface Area = 4πr², Volume = (4/3)πr³',
        color: '#e74c3c',
        steps: [
            'Start with a circle - a flat, round shape with all points equidistant from the center',
            'Choose a diameter (any line passing through the center)',
            'Rotate the circle 360° around this diameter as an axis',
            'Every point on the circle traces a circular path in 3D space',
            'The result is a sphere - a perfectly round 3D object'
        ],
        realWorldExamples: ['Ball', 'Planet Earth', 'Soap bubble', 'Orange']
    },
    'square-cube': {
        name2d: 'Square',
        name3d: 'Cube',
        description: 'A square is extruded perpendicular to its plane to create a cube. Each edge of the square becomes a face of the cube.',
        properties2d: 'Side length, Perimeter = 4s, Area = s²',
        properties3d: 'Edge length, Surface Area = 6s², Volume = s³',
        color: '#3498db',
        steps: [
            'Start with a square - a flat shape with four equal sides and four right angles',
            'Imagine lifting the square perpendicular to its plane',
            'Extrude (stretch) the square in the third dimension',
            'Each edge of the original square becomes a face of the cube',
            'The result is a cube - a 3D shape with 6 equal square faces'
        ],
        realWorldExamples: ['Dice', 'Ice cube', 'Rubik\'s cube', 'Building blocks']
    },
    'triangle-cone': {
        name2d: 'Triangle',
        name3d: 'Cone',
        description: 'A triangle is rotated around one of its sides (height) to create a cone. The base of the triangle forms the circular base of the cone.',
        properties2d: 'Base, Height, Area = ½bh',
        properties3d: 'Base radius, Height, Surface Area = πr(r+l), Volume = ⅓πr²h',
        color: '#2ecc71'
    },
    'triangle-pyramid': {
        name2d: 'Triangle',
        name3d: 'Triangular Pyramid',
        description: 'A triangle is lifted perpendicular to its plane to create a triangular pyramid (tetrahedron). The triangle forms the base.',
        properties2d: 'Base, Height, Area = ½bh',
        properties3d: 'Base area, Height, Volume = ⅓ × Base Area × Height',
        color: '#2ecc71'
    },
    'rectangle-cylinder': {
        name2d: 'Rectangle',
        name3d: 'Cylinder',
        description: 'A rectangle is rotated around one of its sides to create a cylinder. The rotating side becomes the axis, and the opposite side traces the circular cross-section.',
        properties2d: 'Length, Width, Area = lw',
        properties3d: 'Radius, Height, Surface Area = 2πr(r+h), Volume = πr²h',
        color: '#f39c12'
    },
    'rectangle-prism': {
        name2d: 'Rectangle',
        name3d: 'Rectangular Prism',
        description: 'A rectangle is extruded perpendicular to its plane to create a rectangular prism. The rectangle forms the cross-section throughout the prism.',
        properties2d: 'Length, Width, Area = lw',
        properties3d: 'Length, Width, Height, Volume = lwh, Surface Area = 2(lw+lh+wh)',
        color: '#f39c12'
    },
    'pentagon-prism': {
        name2d: 'Pentagon',
        name3d: 'Pentagonal Prism',
        description: 'A pentagon is extruded perpendicular to its plane to create a pentagonal prism. The pentagon forms the cross-section throughout the prism.',
        properties2d: '5 sides, Interior angles = 108°',
        properties3d: '2 pentagonal faces, 5 rectangular faces, Volume = Base Area × Height',
        color: '#9b59b6'
    },
    'hexagon-prism': {
        name2d: 'Hexagon',
        name3d: 'Hexagonal Prism',
        description: 'A hexagon is extruded perpendicular to its plane to create a hexagonal prism. The hexagon forms the cross-section throughout the prism.',
        properties2d: '6 sides, Interior angles = 120°',
        properties3d: '2 hexagonal faces, 6 rectangular faces, Volume = Base Area × Height',
        color: '#34495e'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    init3DScene();
    setupEventListeners();
});

function setupEventListeners() {
    const shapeSelect = document.getElementById('shapeSelect');
    const animateBtn = document.getElementById('animateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const stepByStepBtn = document.getElementById('stepByStepBtn');
    const centreBtn = document.getElementById('centreBtn');

    shapeSelect.addEventListener('change', handleShapeChange);
    animateBtn.addEventListener('click', animateTransformation);
    resetBtn.addEventListener('click', resetView);
    stepByStepBtn.addEventListener('click', showStepByStepGuide);
    centreBtn.addEventListener('click', centreView);
    
    // Setup zoom functionality
    setupZoomControls();
}

function setupZoomControls() {
    const shape2dContainer = document.getElementById('shape2d');
    const shape3dContainer = document.getElementById('shape3d');
    
    // Desktop zoom with mouse wheel
    shape2dContainer.addEventListener('wheel', (event) => {
        event.preventDefault();
        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        zoom2d = Math.max(0.5, Math.min(3, zoom2d + delta));
        updateZoom2D();
    });
    
    shape3dContainer.addEventListener('wheel', (event) => {
        event.preventDefault();
        const delta = event.deltaY > 0 ? 0.5 : -0.5;
        zoom3d = Math.max(0.5, Math.min(20, zoom3d + delta));
        updateZoom3D();
    });
    
    // Mobile touch zoom for 2D
    setupTouchZoom(shape2dContainer, '2d');
    
    // Mobile touch zoom for 3D
    setupTouchZoom(shape3dContainer, '3d');
    
    // Add zoom indicators and controls
    addZoomIndicators();
    addMobileZoomControls();
}

function updateZoom2D() {
    const shape2dContainer = document.getElementById('shape2d');
    const shapeElement = shape2dContainer.firstElementChild;
    if (shapeElement) {
        shapeElement.style.transform = `scale(${zoom2d})`;
    }
    updateZoomIndicator('2d', zoom2d);
}

function updateZoom3D() {
    if (camera3d) {
        const baseDistance = 4;
        // Invert the zoom calculation - smaller zoom3d value = closer camera = larger view
        // Map zoom3d range (0.5-20) to distance range (close-far)
        const distance = baseDistance + (20 - zoom3d);
        const angle = Math.atan2(camera3d.position.z, camera3d.position.x);
        const height = camera3d.position.y;
        
        camera3d.position.x = Math.cos(angle) * distance;
        camera3d.position.z = Math.sin(angle) * distance;
        camera3d.position.y = height;
        camera3d.lookAt(0, 0, 0);
    }
    updateZoomIndicator('3d', zoom3d);
}

function addZoomIndicators() {
    // Add zoom indicator for 2D
    const shape2dContainer = document.getElementById('shape2d');
    const zoom2dIndicator = document.createElement('div');
    zoom2dIndicator.id = 'zoom2d-indicator';
    zoom2dIndicator.className = 'zoom-indicator';
    zoom2dIndicator.innerHTML = 'Zoom: 100%';
    shape2dContainer.appendChild(zoom2dIndicator);
    
    // Add zoom indicator for 3D
    const shape3dContainer = document.getElementById('shape3d');
    const zoom3dIndicator = document.createElement('div');
    zoom3dIndicator.id = 'zoom3d-indicator';
    zoom3dIndicator.className = 'zoom-indicator';
    zoom3dIndicator.innerHTML = 'Zoom: 100%';
    shape3dContainer.appendChild(zoom3dIndicator);
}

function updateZoomIndicator(type, zoomLevel) {
    const indicator = document.getElementById(`zoom${type}-indicator`);
    if (indicator) {
        let percentage;
        if (type === '2d') {
            percentage = Math.round(zoomLevel * 100);
        } else {
            // For 3D, map zoom range (0.5-20) to percentage (300%-10%)
            // When zoom3d = 0.5 (closest), show 300%
            // When zoom3d = 20 (farthest), show 10%
            percentage = Math.round((20.5 - zoomLevel) / 19.5 * 290 + 10);
        }
        indicator.innerHTML = `Zoom: ${percentage}%`;
    }
}

function init3DScene() {
    const container = document.getElementById('shape3d');
    
    // Scene setup
    scene3d = new THREE.Scene();
    scene3d.background = new THREE.Color(0xf8f9fa);
    
    // Camera setup
    camera3d = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera3d.position.set(4, 4, 4);
    camera3d.lookAt(0, 0, 0);
    
    // Renderer setup
    renderer3d = new THREE.WebGLRenderer({ antialias: true });
    renderer3d.setSize(300, 300);
    renderer3d.shadowMap.enabled = true;
    renderer3d.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer3d.domElement);
    
    // Mouse interaction setup
    setupMouseControls(container);
    
    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene3d.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene3d.add(directionalLight);
    
    // Start render loop
    animate3D();
}

function animate3D() {
    animationId = requestAnimationFrame(animate3D);
    
    // No auto-rotation - user controls rotation manually
    renderer3d.render(scene3d, camera3d);
}

function setupMouseControls(container) {
    const canvas = renderer3d.domElement;
    
    // Mouse controls for desktop
    canvas.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    
    canvas.addEventListener('mousemove', (event) => {
        if (!isMouseDown || !currentShape3d) return;
        
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;
        
        currentShape3d.rotation.y += deltaX * 0.01;
        currentShape3d.rotation.x += deltaY * 0.01;
        
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    
    canvas.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
    
    canvas.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });
    
    // Touch controls for mobile (single finger rotation)
    canvas.addEventListener('touchstart', (event) => {
        if (event.touches.length === 1) {
            event.preventDefault();
            isMouseDown = true;
            mouseX = event.touches[0].clientX;
            mouseY = event.touches[0].clientY;
        }
    }, { passive: false });
    
    canvas.addEventListener('touchmove', (event) => {
        if (event.touches.length === 1 && isMouseDown && currentShape3d) {
            event.preventDefault();
            const deltaX = event.touches[0].clientX - mouseX;
            const deltaY = event.touches[0].clientY - mouseY;
            
            currentShape3d.rotation.y += deltaX * 0.01;
            currentShape3d.rotation.x += deltaY * 0.01;
            
            mouseX = event.touches[0].clientX;
            mouseY = event.touches[0].clientY;
        }
    }, { passive: false });
    
    canvas.addEventListener('touchend', (event) => {
        if (event.touches.length === 0) {
            isMouseDown = false;
        }
    });
}

function handleShapeChange(event) {
    const selectedValue = event.target.value;
    if (selectedValue) {
        displayTransformation(selectedValue);
    } else {
        clearShapes();
    }
}

function displayTransformation(transformationType) {
    const transformation = transformations[transformationType];
    
    // Display 2D shape
    display2DShape(transformationType);
    
    // Display 3D shape
    display3DShape(transformationType);
    
    // Update information
    updateShapeInfo(transformation);
    
    // Update explanation
    updateExplanation(transformation);
}

function display2DShape(transformationType) {
    const container = document.getElementById('shape2d');
    container.innerHTML = '';
    
    const shapeDiv = document.createElement('div');
    
    switch(transformationType) {
        case 'circle-sphere':
            shapeDiv.className = 'circle-2d';
            break;
        case 'square-cube':
            shapeDiv.className = 'square-2d';
            break;
        case 'triangle-cone':
        case 'triangle-pyramid':
            shapeDiv.className = 'triangle-2d';
            break;
        case 'rectangle-cylinder':
        case 'rectangle-prism':
            shapeDiv.className = 'rectangle-2d';
            break;
        case 'pentagon-prism':
            shapeDiv.className = 'pentagon-2d';
            break;
        case 'hexagon-prism':
            shapeDiv.className = 'hexagon-2d';
            break;
    }
    
    container.appendChild(shapeDiv);
}

function display3DShape(transformationType) {
    // Remove existing shape
    if (currentShape3d) {
        scene3d.remove(currentShape3d);
    }
    
    const transformation = transformations[transformationType];
    const color = new THREE.Color(transformation.color);
    
    let geometry, material, mesh;
    
    // Create material
    material = new THREE.MeshPhongMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });
    
    switch(transformationType) {
        case 'circle-sphere':
            geometry = new THREE.SphereGeometry(2.5, 32, 32);
            break;
        case 'square-cube':
            geometry = new THREE.BoxGeometry(3.5, 3.5, 3.5);
            break;
        case 'triangle-cone':
            geometry = new THREE.ConeGeometry(2.5, 5, 32);
            break;
        case 'triangle-pyramid':
            geometry = new THREE.TetrahedronGeometry(2.5);
            break;
        case 'rectangle-cylinder':
            geometry = new THREE.CylinderGeometry(1.8, 1.8, 5, 32);
            break;
        case 'rectangle-prism':
            geometry = new THREE.BoxGeometry(5, 2.5, 3.5);
            break;
        case 'pentagon-prism':
            geometry = createPentagonalPrism();
            break;
        case 'hexagon-prism':
            geometry = new THREE.CylinderGeometry(2.5, 2.5, 3.5, 6);
            break;
    }
    
    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    // Add wireframe
    const wireframeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    
    // Group mesh and wireframe
    const group = new THREE.Group();
    group.add(mesh);
    group.add(wireframe);
    
    // Add debug vertices for pyramid
    if (transformationType === 'triangle-pyramid') {
        addDebugVertices(geometry, group);
    }
    
    scene3d.add(group);
    currentShape3d = group;
}

function createPentagonalPrism() {
    const shape = new THREE.Shape();
    const radius = 2.5;
    
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        if (i === 0) {
            shape.moveTo(x, y);
        } else {
            shape.lineTo(x, y);
        }
    }
    
    const extrudeSettings = {
        depth: 3.5,
        bevelEnabled: false
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

function updateShapeInfo(transformation) {
    const info2d = document.getElementById('shape2dInfo');
    const info3d = document.getElementById('shape3dInfo');
    
    info2d.innerHTML = `
        <strong>${transformation.name2d}</strong><br>
        ${transformation.properties2d}
    `;
    
    info3d.innerHTML = `
        <strong>${transformation.name3d}</strong><br>
        ${transformation.properties3d}
    `;
}

function updateExplanation(transformation) {
    const explanationDiv = document.getElementById('transformationExplanation');
    
    explanationDiv.innerHTML = `
        <h3>How does the transformation work?</h3>
        <p><strong>${transformation.name2d} → ${transformation.name3d}</strong></p>
        <p>${transformation.description}</p>
        <ul>
            <li><strong>2D Properties:</strong> ${transformation.properties2d}</li>
            <li><strong>3D Properties:</strong> ${transformation.properties3d}</li>
        </ul>
    `;
}

function animateTransformation() {
    if (!currentShape3d) return;
    
    // Simple rotation animation
    const startRotation = { x: currentShape3d.rotation.x, y: currentShape3d.rotation.y };
    const endRotation = { x: startRotation.x + Math.PI * 2, y: startRotation.y + Math.PI };
    
    const duration = 3000; // 3 seconds
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeInOut = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        currentShape3d.rotation.x = startRotation.x + (endRotation.x - startRotation.x) * easeInOut;
        currentShape3d.rotation.y = startRotation.y + (endRotation.y - startRotation.y) * easeInOut;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

function centreView() {
    if (!currentShape3d) return;
    
    const shapeSelect = document.getElementById('shapeSelect');
    const selectedValue = shapeSelect.value;
    
    // Sync zoom levels - set 3D zoom to match 2D zoom scale
    zoom3d = 10.25; // Reset to 100% for consistent comparison
    
    // Position camera directly in front of object to match 2D view
    const distance = 4 + (20 - zoom3d);
    camera3d.position.set(0, 0, distance);
    camera3d.lookAt(0, 0, 0);
    
    // Set optimal object orientations for each shape type to match 2D perspective
    switch(selectedValue) {
        case 'circle-sphere':
            // Show sphere from front to match circle view
            currentShape3d.rotation.set(0, 0, 0);
            break;
        case 'square-cube':
            // Show cube face-on to match square view
            currentShape3d.rotation.set(0, 0, 0);
            break;
        case 'triangle-cone':
            // Show cone pointing up to match 2D triangle orientation
            currentShape3d.rotation.set(0, 0, 0);
            break;
        case 'triangle-pyramid':
            // Orient pyramid to sit flat on one triangular face
            currentShape3d.rotation.set(0, 0, 0);
            // Specific rotation to make tetrahedron sit on base with apex up
            currentShape3d.rotation.x = Math.acos(Math.sqrt(2/3)) - Math.PI/2;
            currentShape3d.rotation.y = 0;
            currentShape3d.rotation.z = 0;
            break;
        case 'rectangle-cylinder':
            // Show cylinder horizontally to match horizontal rectangle
            currentShape3d.rotation.set(0, 0, Math.PI/2);
            break;
        case 'rectangle-prism':
            // Show rectangular prism face-on to match rectangle view
            currentShape3d.rotation.set(0, 0, 0);
            break;
        case 'pentagon-prism':
            // Show pentagonal prism from front to see pentagon face
            currentShape3d.rotation.set(0, 0, 0);
            break;
        case 'hexagon-prism':
            // Show hexagonal prism from front to match 2D hexagon
            // Rotate to show the hexagonal face directly to camera
            currentShape3d.rotation.set(Math.PI/2, 0, 0);
            break;
        default:
            currentShape3d.rotation.set(0, 0, 0);
    }
    
    // Update zoom indicators
    updateZoomIndicator('3d', zoom3d);
}

function resetView() {
    if (currentShape3d) {
        currentShape3d.rotation.set(0, 0, 0);
    }
    
    // Reset camera position
    camera3d.position.set(4, 4, 4);
    camera3d.lookAt(0, 0, 0);
    
    // Reset zoom levels to 100%
    zoom2d = 1; // 100% for 2D
    zoom3d = 10.25; // This corresponds to 100% in the 3D zoom calculation
    updateZoom2D();
    updateZoom3D();
}

function clearShapes() {
    // Clear 2D shape
    document.getElementById('shape2d').innerHTML = '';
    
    // Clear 3D shape
    if (currentShape3d) {
        scene3d.remove(currentShape3d);
        currentShape3d = null;
    }
    
    // Clear info
    document.getElementById('shape2dInfo').innerHTML = '';
    document.getElementById('shape3dInfo').innerHTML = '';
    
    // Reset explanation
    document.getElementById('transformationExplanation').innerHTML = `
        <h3>How does the transformation work?</h3>
        <p>Select a transformation above to see how 2D shapes become 3D objects!</p>
    `;
}

function showStepByStepGuide() {
    const shapeSelect = document.getElementById('shapeSelect');
    const selectedValue = shapeSelect.value;
    
    if (!selectedValue) {
        alert('Please select a transformation first!');
        return;
    }
    
    const transformation = transformations[selectedValue];
    
    if (!transformation.steps) {
        alert('Step-by-step guide not available for this transformation yet. More guides coming soon!');
        return;
    }
    
    // Create modal for step-by-step guide
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    let stepsHTML = `
        <h2 style="color: #333; margin-bottom: 20px; text-align: center;">
            Step-by-Step Guide: ${transformation.name2d} → ${transformation.name3d}
        </h2>
        <div style="margin-bottom: 20px;">
    `;
    
    transformation.steps.forEach((step, index) => {
        stepsHTML += `
            <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid ${transformation.color};">
                <strong style="color: ${transformation.color};">Step ${index + 1}:</strong>
                <p style="margin: 5px 0 0 0; line-height: 1.5;">${step}</p>
            </div>
        `;
    });
    
    stepsHTML += `</div>`;
    
    if (transformation.realWorldExamples) {
        stepsHTML += `
            <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px;">
                <h4 style="color: #2ecc71; margin-bottom: 10px;">Real-World Examples:</h4>
                <p style="margin: 0; line-height: 1.5;">${transformation.realWorldExamples.join(', ')}</p>
            </div>
        `;
    }
    
    stepsHTML += `
        <div style="text-align: center; margin-top: 25px;">
            <button id="closeModal" style="
                background: #667eea;
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                transition: background 0.3s ease;
            ">Close Guide</button>
        </div>
    `;
    
    modalContent.innerHTML = stepsHTML;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = document.getElementById('closeModal');
    const closeModal = () => {
        document.body.removeChild(modal);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function setupTouchZoom(container, type) {
    let initialDistance = 0;
    let initialZoom = type === '2d' ? zoom2d : zoom3d;
    let touches = [];
    
    container.addEventListener('touchstart', (event) => {
        touches = Array.from(event.touches);
        
        if (touches.length === 2) {
            event.preventDefault();
            const touch1 = touches[0];
            const touch2 = touches[1];
            initialDistance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
            initialZoom = type === '2d' ? zoom2d : zoom3d;
        }
    }, { passive: false });
    
    container.addEventListener('touchmove', (event) => {
        if (event.touches.length === 2) {
            event.preventDefault();
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            const currentDistance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
            
            const scale = currentDistance / initialDistance;
            
            if (type === '2d') {
                zoom2d = Math.max(0.5, Math.min(3, initialZoom * scale));
                updateZoom2D();
            } else {
                // For 3D, invert the scale since smaller zoom3d = closer view
                const newZoom = initialZoom / scale;
                zoom3d = Math.max(0.5, Math.min(20, newZoom));
                updateZoom3D();
            }
        }
    }, { passive: false });
    
    container.addEventListener('touchend', (event) => {
        if (event.touches.length < 2) {
            touches = [];
        }
    });
}

function addMobileZoomControls() {
    // Check if we're on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
    
    if (!isMobile) return;
    
    // Add mobile zoom controls for 2D
    const shape2dContainer = document.getElementById('shape2d');
    const zoom2dControls = document.createElement('div');
    zoom2dControls.className = 'mobile-zoom-controls';
    zoom2dControls.innerHTML = `
        <button class="zoom-btn zoom-out" data-target="2d" data-action="out">−</button>
        <button class="zoom-btn zoom-in" data-target="2d" data-action="in">+</button>
    `;
    shape2dContainer.appendChild(zoom2dControls);
    
    // Add mobile zoom controls for 3D
    const shape3dContainer = document.getElementById('shape3d');
    const zoom3dControls = document.createElement('div');
    zoom3dControls.className = 'mobile-zoom-controls';
    zoom3dControls.innerHTML = `
        <button class="zoom-btn zoom-out" data-target="3d" data-action="out">−</button>
        <button class="zoom-btn zoom-in" data-target="3d" data-action="in">+</button>
    `;
    shape3dContainer.appendChild(zoom3dControls);
    
    // Add event listeners for zoom buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('zoom-btn')) {
            event.preventDefault();
            const target = event.target.dataset.target;
            const action = event.target.dataset.action;
            
            if (target === '2d') {
                const delta = action === 'in' ? 0.2 : -0.2;
                zoom2d = Math.max(0.5, Math.min(3, zoom2d + delta));
                updateZoom2D();
            } else if (target === '3d') {
                const delta = action === 'in' ? -1 : 1;
                zoom3d = Math.max(0.5, Math.min(20, zoom3d + delta));
                updateZoom3D();
            }
        }
    });
}

function addDebugVertices(geometry, group) {
    // Get the vertices from the geometry
    const vertices = geometry.attributes.position.array;
    const colors = ['red', 'blue', 'green', 'yellow']; // Different colors for each vertex
    
    // Create spheres at each vertex position
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];
        
        // Create a small sphere at each vertex
        const sphereGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const sphereMaterial = new THREE.MeshBasicMaterial({ 
            color: colors[Math.floor(i/3) % colors.length] 
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(x, y, z);
        
        // Add text label showing vertex coordinates
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 128;
        canvas.height = 64;
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'black';
        context.font = '12px Arial';
        context.fillText(`V${Math.floor(i/3)}`, 5, 15);
        context.fillText(`(${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)})`, 5, 35);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(x, y + 0.5, z);
        sprite.scale.set(1, 0.5, 1);
        
        if (group) {
            group.add(sphere);
            group.add(sprite);
        }
    }
    
    console.log('Pyramid vertices:');
    for (let i = 0; i < vertices.length; i += 3) {
        console.log(`Vertex ${Math.floor(i/3)}: (${vertices[i].toFixed(2)}, ${vertices[i+1].toFixed(2)}, ${vertices[i+2].toFixed(2)})`);
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    if (renderer3d) {
        renderer3d.setSize(300, 300);
        camera3d.aspect = 1;
        camera3d.updateProjectionMatrix();
    }
});
