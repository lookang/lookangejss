// Space exploration events data with comprehensive information
const spaceEvents = [
    {
        id: 1,
        year: 1957,
        title: "Sputnik 1 Launch",
        icon: "🛰️",
        type: "first",
        description: "First artificial satellite launched by Soviet Union",
        details: "Sputnik 1 was the first artificial Earth satellite, launched on October 4, 1957. It marked the beginning of the Space Age and the Space Race between the USSR and USA.",
        decade: 1950
    },
    {
        id: 2,
        year: 1961,
        title: "First Human in Space",
        icon: "👨‍🚀",
        type: "first",
        description: "Yuri Gagarin orbits Earth",
        details: "Soviet cosmonaut Yuri Gagarin became the first human to orbit Earth on April 12, 1961, aboard Vostok 1, completing one orbit in 108 minutes.",
        decade: 1960
    },
    {
        id: 3,
        year: 1969,
        title: "Moon Landing",
        icon: "🌙",
        type: "moon",
        description: "Apollo 11 lands on the Moon",
        details: "Neil Armstrong and Buzz Aldrin became the first humans to land on the Moon on July 20, 1969, while Michael Collins orbited above.",
        decade: 1960
    },
    {
        id: 4,
        year: 1970,
        title: "Venera 7 Landing",
        icon: "🪐",
        type: "first",
        description: "First successful Venus landing",
        details: "Soviet Venera 7 became the first spacecraft to successfully land on Venus and transmit data from the surface.",
        decade: 1970
    },
    {
        id: 5,
        year: 1975,
        title: "Apollo-Soyuz Mission",
        icon: "🤝",
        type: "cooperation",
        description: "US-Soviet cooperation in space",
        details: "The Apollo-Soyuz Test Project was the first joint US-Soviet space mission, symbolizing détente between the two superpowers.",
        decade: 1970
    },
    {
        id: 6,
        year: 1981,
        title: "Space Shuttle Program",
        icon: "🚀",
        type: "first",
        description: "First reusable spacecraft",
        details: "Space Shuttle Columbia launched on April 12, 1981, beginning the era of reusable spacecraft and routine access to space.",
        decade: 1980
    },
    {
        id: 7,
        year: 1986,
        title: "Challenger Disaster",
        icon: "💥",
        type: "accident",
        description: "Space Shuttle tragedy",
        details: "Space Shuttle Challenger broke apart 73 seconds after launch, killing all seven crew members and leading to major safety improvements.",
        decade: 1980
    },
    {
        id: 8,
        year: 1990,
        title: "Hubble Space Telescope",
        icon: "🔭",
        type: "first",
        description: "Revolutionary space observatory",
        details: "The Hubble Space Telescope was launched, providing unprecedented views of the universe and revolutionizing astronomy.",
        decade: 1990
    },
    {
        id: 9,
        year: 1998,
        title: "International Space Station",
        icon: "🏗️",
        type: "cooperation",
        description: "Global space cooperation begins",
        details: "Construction of the ISS began with international cooperation between USA, Russia, Europe, Japan, and Canada.",
        decade: 1990
    },
    {
        id: 10,
        year: 2003,
        title: "Columbia Disaster",
        icon: "💔",
        type: "accident",
        description: "Second shuttle tragedy",
        details: "Space Shuttle Columbia disintegrated during re-entry, killing all seven crew members and leading to the shuttle program's eventual end.",
        decade: 2000
    },
    {
        id: 11,
        year: 2012,
        title: "SpaceX Dragon",
        icon: "🐉",
        type: "first",
        description: "First commercial cargo to ISS",
        details: "SpaceX Dragon became the first commercial spacecraft to deliver cargo to the International Space Station.",
        decade: 2010
    },
    {
        id: 12,
        year: 2020,
        title: "Crew Dragon Demo-2",
        icon: "👨‍🚀👨‍🚀",
        type: "first",
        description: "First commercial crew mission",
        details: "SpaceX Crew Dragon carried NASA astronauts to the ISS, marking the return of human spaceflight from US soil.",
        decade: 2020
    }
];

// Global variables for game state
let draggedElement = null;
let correctPlacements = 0;
let totalEvents = spaceEvents.length;
let placedEvents = new Set();
let showMeIndex = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
    initializeEventCards();
    initializeEventListeners();
    updateProgress();
});

// Create timeline with decade markers and drop zones
function initializeTimeline() {
    const timeline = document.getElementById('timeline');
    const startYear = 1950;
    const endYear = 2020;
    const timelineWidth = 800;
    
    // Create decade markers and drop zones
    for (let year = startYear; year <= endYear; year += 10) {
        const position = ((year - startYear) / (endYear - startYear)) * timelineWidth;
        
        // Create decade marker
        const marker = document.createElement('div');
        marker.className = 'decade-marker';
        marker.style.left = position + 'px';
        marker.setAttribute('data-year', year);
        timeline.appendChild(marker);
        
        // Create drop zone for this decade
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.setAttribute('data-decade', year);
        dropZone.style.left = position + 'px';
        dropZone.style.width = (timelineWidth / ((endYear - startYear) / 10)) + 'px';
        
        const label = document.createElement('div');
        label.className = 'drop-zone-label';
        label.textContent = `${year}s`;
        dropZone.appendChild(label);
        
        timeline.appendChild(dropZone);
        
        // Add drop event listeners
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', handleDrop);
        dropZone.addEventListener('dragenter', handleDragEnter);
        dropZone.addEventListener('dragleave', handleDragLeave);
    }
}

// Create event cards for dragging
function initializeEventCards() {
    const container = document.getElementById('eventCards');
    
    // Shuffle events for variety
    const shuffledEvents = [...spaceEvents].sort(() => Math.random() - 0.5);
    
    shuffledEvents.forEach(event => {
        const card = createEventCard(event);
        container.appendChild(card);
    });
}

// Create individual event card element
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.draggable = true;
    card.setAttribute('data-event-id', event.id);
    card.setAttribute('data-year', event.year);
    card.setAttribute('data-decade', event.decade);
    card.setAttribute('data-type', event.type);
    
    card.innerHTML = `
        <div class="event-icon">${event.icon}</div>
        <div class="event-year">${event.year}</div>
        <div class="event-title">${event.title}</div>
    `;
    
    // Add drag event listeners
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    
    // Add click listener for details
    card.addEventListener('click', () => showEventDetails(event));
    
    // Add tooltip
    card.addEventListener('mouseenter', (e) => showTooltip(e, event.description));
    card.addEventListener('mouseleave', hideTooltip);
    
    return card;
}

// Initialize all event listeners
function initializeEventListeners() {
    // Control buttons
    document.getElementById('checkBtn').addEventListener('click', checkAnswers);
    document.getElementById('showMeBtn').addEventListener('click', showMeHint);
    document.getElementById('resetBtn').addEventListener('click', resetTimeline);
    
    // Zoom slider
    document.getElementById('zoomSlider').addEventListener('input', handleZoom);
    
    // Modal close buttons
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('printCertificate').addEventListener('click', printCertificate);
    document.getElementById('playAgain').addEventListener('click', resetTimeline);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('eventModal');
        const successModal = document.getElementById('successModal');
        if (e.target === modal) closeModal();
        if (e.target === successModal) closeModal();
    });
}

// Drag and drop handlers
function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedElement = null;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    if (!draggedElement) return;
    
    const dropZone = e.target.closest('.drop-zone');
    if (!dropZone) return;
    
    const eventId = parseInt(draggedElement.getAttribute('data-event-id'));
    const event = spaceEvents.find(e => e.id === eventId);
    
    if (!event) return;
    
    // Create timeline event
    const timelineEvent = createTimelineEvent(event, dropZone);
    document.getElementById('timeline').appendChild(timelineEvent);
    
    // Mark original card as placed
    draggedElement.classList.add('placed');
    draggedElement.draggable = false;
    placedEvents.add(eventId);
    
    updateProgress();
    
    // Check if all events are placed
    if (placedEvents.size === totalEvents) {
        setTimeout(checkAnswers, 500);
    }
}

// Create event on timeline
function createTimelineEvent(event, dropZone) {
    const timelineEvent = document.createElement('div');
    timelineEvent.className = 'timeline-event';
    timelineEvent.setAttribute('data-event-id', event.id);
    timelineEvent.setAttribute('data-type', event.type);
    
    // Position within the drop zone
    const dropZoneRect = dropZone.getBoundingClientRect();
    const timelineRect = document.getElementById('timeline').getBoundingClientRect();
    const relativeLeft = dropZoneRect.left - timelineRect.left;
    
    // Add some random positioning within the decade for visual variety
    const randomOffset = Math.random() * (dropZone.offsetWidth - 70);
    timelineEvent.style.left = (relativeLeft + randomOffset) + 'px';
    
    timelineEvent.innerHTML = `
        <div class="event-icon">${event.icon}</div>
        <div class="event-year">${event.year}</div>
        <div class="event-title">${event.title}</div>
    `;
    
    // Add click listener for details
    timelineEvent.addEventListener('click', () => showEventDetails(event));
    
    // Add tooltip
    timelineEvent.addEventListener('mouseenter', (e) => showTooltip(e, event.description));
    timelineEvent.addEventListener('mouseleave', hideTooltip);
    
    return timelineEvent;
}

// Check all answers and provide feedback
function checkAnswers() {
    const timelineEvents = document.querySelectorAll('.timeline-event');
    let correct = 0;
    
    timelineEvents.forEach(timelineEvent => {
        const eventId = parseInt(timelineEvent.getAttribute('data-event-id'));
        const event = spaceEvents.find(e => e.id === eventId);
        const dropZone = getDropZoneForEvent(timelineEvent);
        
        if (dropZone && event) {
            const dropZoneDecade = parseInt(dropZone.getAttribute('data-decade'));
            const isCorrect = event.decade === dropZoneDecade;
            
            // Find corresponding card
            const card = document.querySelector(`[data-event-id="${eventId}"]`);
            
            if (isCorrect) {
                timelineEvent.classList.add('correct');
                card.classList.add('correct');
                correct++;
            } else {
                timelineEvent.classList.add('incorrect');
                card.classList.add('incorrect');
                
                // Show hint tooltip
                showTooltip({
                    clientX: timelineEvent.offsetLeft + 30,
                    clientY: timelineEvent.offsetTop + 60
                }, `This event happened in the ${event.decade}s`);
                
                setTimeout(hideTooltip, 3000);
            }
        }
    });
    
    correctPlacements = correct;
    updateProgress();
    
    // Show success if all correct
    if (correct === totalEvents) {
        setTimeout(() => {
            document.getElementById('successModal').style.display = 'block';
        }, 1000);
    }
}

// Get the drop zone that contains a timeline event
function getDropZoneForEvent(timelineEvent) {
    const timeline = document.getElementById('timeline');
    const dropZones = timeline.querySelectorAll('.drop-zone');
    const eventRect = timelineEvent.getBoundingClientRect();
    const timelineRect = timeline.getBoundingClientRect();
    const eventCenter = eventRect.left - timelineRect.left + (eventRect.width / 2);
    
    for (let dropZone of dropZones) {
        const zoneLeft = dropZone.offsetLeft;
        const zoneRight = zoneLeft + dropZone.offsetWidth;
        
        if (eventCenter >= zoneLeft && eventCenter <= zoneRight) {
            return dropZone;
        }
    }
    
    return null;
}

// Show hint for next event
function showMeHint() {
    const unplacedEvents = spaceEvents.filter(event => !placedEvents.has(event.id));
    
    if (unplacedEvents.length === 0) {
        showTooltip({clientX: 200, clientY: 100}, "All events have been placed!");
        setTimeout(hideTooltip, 2000);
        return;
    }
    
    const eventToShow = unplacedEvents[showMeIndex % unplacedEvents.length];
    const card = document.querySelector(`[data-event-id="${eventToShow.id}"]`);
    const correctDropZone = document.querySelector(`[data-decade="${eventToShow.decade}"]`);
    
    if (card && correctDropZone) {
        // Highlight the card and correct drop zone
        card.style.animation = 'pulse 1s ease-in-out 3';
        correctDropZone.style.animation = 'pulse 1s ease-in-out 3';
        
        showTooltip({
            clientX: card.offsetLeft + 80,
            clientY: card.offsetTop + 40
        }, `This event belongs in the ${eventToShow.decade}s`);
        
        setTimeout(() => {
            card.style.animation = '';
            correctDropZone.style.animation = '';
            hideTooltip();
        }, 3000);
    }
    
    showMeIndex++;
}

// Reset the timeline
function resetTimeline() {
    // Remove all timeline events
    const timelineEvents = document.querySelectorAll('.timeline-event');
    timelineEvents.forEach(event => event.remove());
    
    // Reset all cards
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        card.classList.remove('placed', 'correct', 'incorrect');
        card.draggable = true;
    });
    
    // Reset game state
    placedEvents.clear();
    correctPlacements = 0;
    showMeIndex = 0;
    
    updateProgress();
    closeModal();
}

// Handle zoom functionality
function handleZoom(e) {
    const timeline = document.getElementById('timeline');
    const zoomLevel = parseFloat(e.target.value);
    timeline.style.transform = `scaleX(${zoomLevel})`;
}

// Show event details in modal
function showEventDetails(event) {
    const modal = document.getElementById('eventModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 15px;">${event.icon}</div>
            <h2>${event.year} - ${event.title}</h2>
            <p style="font-size: 16px; margin: 15px 0; color: #666;">${event.description}</p>
            <p style="font-size: 14px; line-height: 1.6; text-align: left;">${event.details}</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('eventModal').style.display = 'none';
    document.getElementById('successModal').style.display = 'none';
}

// Show tooltip
function showTooltip(e, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = text;
    tooltip.style.left = e.clientX + 'px';
    tooltip.style.top = (e.clientY - 40) + 'px';
    tooltip.classList.add('show');
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// Update progress indicator
function updateProgress() {
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');
    
    progressText.textContent = `${correctPlacements}/${totalEvents} correct`;
    const percentage = (correctPlacements / totalEvents) * 100;
    progressFill.style.width = percentage + '%';
}

// Print certificate (simplified for demo)
function printCertificate() {
    const certificateWindow = window.open('', '_blank');
    certificateWindow.document.write(`
        <html>
        <head>
            <title>Space Exploration Timeline Certificate</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .certificate { border: 5px solid #4CAF50; padding: 40px; margin: 20px; }
                h1 { color: #4CAF50; font-size: 36px; }
                .rocket { font-size: 60px; margin: 20px; }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="rocket">🚀</div>
                <h1>Certificate of Achievement</h1>
                <h2>Space Exploration Timeline</h2>
                <p>This certifies that you have successfully completed the Space Exploration Timeline interactive learning experience.</p>
                <p>You demonstrated excellent understanding of the chronological order of major space exploration milestones from 1957 to 2020.</p>
                <p><strong>Date: ${new Date().toLocaleDateString()}</strong></p>
            </div>
        </body>
        </html>
    `);
    certificateWindow.document.close();
    certificateWindow.print();
}

// Add CSS animation for pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);