// Global variables to track animation state
let animationRunning = true;
let currentEruptionType = 'strombolian';
let animationIntervals = [];
let lavaParticles = [];

// Eruption type configurations
const eruptionTypes = {
  strombolian: {
    title: 'Strombolian Eruption',
    lavaIntensity: {
      value: 'Moderate',
      particles: 8
    },
    ashCloud: {
      value: 'Small',
      radius: 70
    },
    dangerLevel: {
      value: 'Moderate',
      class: 'danger-moderate'
    },
    magmaViscosity: {
      value: 'Medium',
      color: '#FF4500',
      flowRate: 2 // seconds
    },
    description: 'Strombolian eruptions are characterized by moderate explosive activity with rhythmic ejections of incandescent lava fragments to heights of tens to hundreds of meters. These eruptions typically produce small ash clouds and moderate lava flows. Named after Stromboli volcano in Italy, these eruptions feature medium-viscosity magma and pose a moderate danger to surrounding areas.',
    example: 'Stromboli volcano in Italy has been erupting almost continuously for over 2,000 years, earning it the nickname "Lighthouse of the Mediterranean." Its regular, moderate explosions eject glowing lava fragments in a display often referred to as the "Stromboli Fireworks."'
  },
  plinian: {
    title: 'Plinian Eruption',
    lavaIntensity: {
      value: 'Low',
      particles: 4
    },
    ashCloud: {
      value: 'Massive',
      radius: 150
    },
    dangerLevel: {
      value: 'Extreme',
      class: 'danger-extreme'
    },
    magmaViscosity: {
      value: 'High',
      color: '#8B0000',
      flowRate: 4 // seconds
    },
    description: 'Plinian eruptions are extremely explosive volcanic events characterized by massive ash columns that can reach into the stratosphere (over 11 km high). These eruptions produce little lava flow but generate enormous volumes of ash and pyroclastic material. Named after Pliny the Younger who described the 79 CE eruption of Mount Vesuvius, these eruptions feature high-viscosity magma and pose an extreme danger to surrounding areas.',
    example: 'The 1991 eruption of Mount Pinatubo in the Philippines was a classic Plinian eruption, producing an ash column 35 km high and affecting global climate. The 79 CE eruption of Mount Vesuvius that destroyed Pompeii and Herculaneum is another famous example of a Plinian eruption.'
  },
  hawaiian: {
    title: 'Hawaiian Eruption',
    lavaIntensity: {
      value: 'High',
      particles: 12
    },
    ashCloud: {
      value: 'Minimal',
      radius: 40
    },
    dangerLevel: {
      value: 'Low',
      class: 'danger-low'
    },
    magmaViscosity: {
      value: 'Low',
      color: '#FFA500',
      flowRate: 1 // seconds
    },
    description: 'Hawaiian eruptions are characterized by effusive emission of highly fluid basalt lava with minimal explosive activity. These eruptions produce spectacular lava fountains and extensive lava flows but very little ash. Named after the volcanoes of Hawaii, these eruptions feature low-viscosity magma and pose a relatively low danger to human life, though they can cause significant property damage through lava flows.',
    example: 'Kīlauea volcano on the Big Island of Hawaii is famous for its Hawaiian-style eruptions. The 2018 lower Puna eruption produced lava fountains over 70 meters high and lava flows that destroyed over 700 homes but caused no fatalities due to the predictable nature of the eruption.'
  },
  vulcanian: {
    title: 'Vulcanian Eruption',
    lavaIntensity: {
      value: 'Moderate',
      particles: 8
    },
    ashCloud: {
      value: 'Moderate',
      radius: 100
    },
    dangerLevel: {
      value: 'High',
      class: 'danger-high'
    },
    magmaViscosity: {
      value: 'High',
      color: '#8B0000',
      flowRate: 3 // seconds
    },
    description: 'Vulcanian eruptions are characterized by short, violent explosions of thick lava and ash. These eruptions typically eject material up to 5 km in height and produce moderate ash clouds and thick, slow-moving lava flows. Named after Vulcano island in Italy, these eruptions feature high-viscosity magma and pose a high danger to surrounding areas due to their explosive nature and limited predictability.',
    example: 'The 1913-1914 eruptions of Sakurajima volcano in Japan displayed classic Vulcanian characteristics with violent explosions sending ash and bombs several kilometers into the air. Soufrière Hills volcano on Montserrat has also produced numerous Vulcanian eruptions since its reactivation in 1995.'
  }
};

// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the simulation with default eruption type
  initializeSimulation();
  
  // Set up event listeners
  document.getElementById('eruption-type').addEventListener('change', handleEruptionTypeChange);
  document.getElementById('play-pause-btn').addEventListener('click', toggleAnimation);
});

// Initialize the volcano simulation
function initializeSimulation() {
  // Set initial eruption type
  updateEruptionType(currentEruptionType);
  
  // Start animations
  startAnimations();
}

// Handle eruption type change from dropdown
function handleEruptionTypeChange(event) {
  const newType = event.target.value;
  updateEruptionType(newType);
}

// Update the simulation based on eruption type
function updateEruptionType(type) {
  // Update current eruption type
  currentEruptionType = type;
  const eruption = eruptionTypes[type];
  
  // Update UI elements
  document.getElementById('eruption-title').textContent = eruption.title;
  document.querySelector('.title-label').textContent = eruption.title;
  
  // Update characteristics
  const lavaIntensityElement = document.getElementById('lava-intensity');
  const ashSizeElement = document.getElementById('ash-size');
  const dangerLevelElement = document.getElementById('danger-level');
  const magmaViscosityElement = document.getElementById('magma-viscosity');
  
  lavaIntensityElement.textContent = eruption.lavaIntensity.value;
  ashSizeElement.textContent = eruption.ashCloud.value;
  dangerLevelElement.textContent = eruption.dangerLevel.value;
  magmaViscosityElement.textContent = eruption.magmaViscosity.value;
  
  // Update danger level class
  dangerLevelElement.className = 'value ' + eruption.dangerLevel.class;
  
  // Update description and example
  document.getElementById('eruption-description').textContent = eruption.description;
  document.getElementById('eruption-example').textContent = eruption.example;
  
  // Update visual elements
  updateVisualElements(eruption);
  
  // Restart animations
  restartAnimations();
}

// Update visual elements based on eruption type
function updateVisualElements(eruption) {
  // Update magma chamber and conduit color
  const magmaChamber = document.getElementById('magma-chamber');
  const conduit = document.getElementById('conduit');
  
  magmaChamber.setAttribute('fill', eruption.magmaViscosity.color);
  conduit.setAttribute('stroke', eruption.magmaViscosity.color);
  
  // Update ash cloud size
  const ashCloud = document.getElementById('ash-cloud');
  ashCloud.setAttribute('rx', eruption.ashCloud.radius);
  ashCloud.setAttribute('ry', eruption.ashCloud.radius);
  
  // Position ash cloud based on size
  const yPosition = 150 - eruption.ashCloud.radius;
  ashCloud.setAttribute('cy', yPosition > 50 ? yPosition : 50);
  
  // Show ash cloud for all eruption types
  ashCloud.style.display = 'block';
  
  // Adjust ash cloud opacity based on size
  const opacity = Math.min(0.2 + (eruption.ashCloud.radius / 200), 0.9);
  ashCloud.setAttribute('fill', `rgba(100,100,100,${opacity})`);
}

// Start all animations
function startAnimations() {
  const eruption = eruptionTypes[currentEruptionType];
  
  // Clear any existing animation intervals
  clearAnimationIntervals();
  
  // Create lava particle animation interval
  const particleInterval = setInterval(() => {
    if (animationRunning) {
      createLavaParticle(eruption);
    }
  }, 500); // Create a new particle every 500ms
  
  animationIntervals.push(particleInterval);
}

// Create a lava particle with animation
function createLavaParticle(eruption) {
  const svg = document.getElementById('volcano-svg');
  const particlesContainer = document.getElementById('lava-particles-container');
  
  // Create a new lava particle
  const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  
  // Set particle attributes
  particle.setAttribute('cx', '400');
  particle.setAttribute('cy', '200');
  particle.setAttribute('r', Math.random() * 5 + 3); // Random size between 3-8px
  particle.setAttribute('fill', eruption.magmaViscosity.color);
  particle.classList.add('lava-particle');
  
  // Calculate random end position based on eruption type
  const angle = (Math.random() * 120 - 60) * (Math.PI / 180); // -60 to 60 degrees in radians
  const distance = Math.random() * 150 + 50; // Distance between 50-200px
  
  // Calculate end position
  const endX = Math.sin(angle) * distance;
  const endY = -Math.cos(angle) * distance * 0.8; // Negative because SVG Y increases downward
  
  // Set animation duration based on viscosity
  const duration = Math.random() * 2 + eruption.magmaViscosity.flowRate;
  
  // Apply CSS variables for animation
  particle.style.setProperty('--end-x', `${endX}px`);
  particle.style.setProperty('--end-y', `${endY}px`);
  particle.style.animation = `particle-animation ${duration}s`;
  
  // Add particle to container
  particlesContainer.appendChild(particle);
  
  // Remove particle after animation completes
  setTimeout(() => {
    if (particlesContainer.contains(particle)) {
      particlesContainer.removeChild(particle);
    }
  }, duration * 1000);
}

// Toggle animation play/pause
function toggleAnimation() {
  const button = document.getElementById('play-pause-btn');
  
  animationRunning = !animationRunning;
  
  if (animationRunning) {
    button.textContent = 'Pause Animation';
    // Resume animations
    startAnimations();
  } else {
    button.textContent = 'Play Animation';
    // Pause animations (intervals are cleared but existing particles continue)
    clearAnimationIntervals();
  }
}

// Clear all animation intervals
function clearAnimationIntervals() {
  animationIntervals.forEach(interval => clearInterval(interval));
  animationIntervals = [];
}

// Restart animations (used when changing eruption type)
function restartAnimations() {
  clearAnimationIntervals();
  
  // Clear existing particles
  const particlesContainer = document.getElementById('lava-particles-container');
  while (particlesContainer.firstChild) {
    particlesContainer.removeChild(particlesContainer.firstChild);
  }
  
  // Start new animations if animation is running
  if (animationRunning) {
    startAnimations();
  }
}