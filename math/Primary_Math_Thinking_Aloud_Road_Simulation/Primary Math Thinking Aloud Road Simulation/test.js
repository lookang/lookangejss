const canvas = document.getElementById("plotCanvas");
const ctx = canvas.getContext("2d");

// Define points with their positions and colors
const points = {
  a: { x: 200, y: 100, color: "red" },
  b: { x: 300, y: 50, color: "blue" },
  c: { x: 300, y: 100, color: "green" },
  d: { x: 300, y: 200, color: "orange" },
  e: { x: 400, y: 200, color: "purple" },
};

// Connections between points with toggling options
const connections = [
  { from: "a", to: "b", isStraight: false },
  { from: "a", to: "c", isStraight: false },
  { from: "a", to: "d", isStraight: false },
  { from: "b", to: "c", isStraight: false },
  { from: "b", to: "e", isStraight: false },
  { from: "c", to: "d", isStraight: false },
  { from: "c", to: "e", isStraight: false },
  { from: "d", to: "e", isStraight: false },
];

let draggingPoint = null;
let hoveredConnection = null; // Store the currently hovered connection
const pointRadius = 10; // Radius for the draggable points

// Function to draw all connections
function drawLines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  connections.forEach((connection) => {
    const point1 = points[connection.from];
    const point2 = points[connection.to];
    drawConnection(
      point1,
      point2,
      connection.isStraight,
      connection === hoveredConnection
    ); // Pass hover state
  });

  // Draw points
  for (const point of Object.values(points)) {
    drawPoint(point);
  }
}

// Function to draw a connection
function drawConnection(point1, point2, isStraight, isHovered) {
  ctx.beginPath();
  ctx.strokeStyle = isHovered ? "orange" : "blue"; // Change color on hover
  ctx.lineWidth = isHovered ? 3 : 2; // Thicker line on hover

  if (isStraight) {
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
  } else {
    // Curved line using quadratic curve
    const midX = (point1.x + point2.x) / 2;
    const midY = (point1.y + point2.y) / 2;
    const controlPointY = midY - 50; // Control point to create a curve
    ctx.moveTo(point1.x, point1.y);
    ctx.quadraticCurveTo(midX, controlPointY, point2.x, point2.y);
  }

  ctx.stroke();
}

// Function to draw a point
function drawPoint(point) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
  ctx.fillStyle = point.color; // Use the defined color for each point
  ctx.fill();
}

// Function to determine if the mouse is near the midpoint of the curve
function isMouseNearMidpoint(mouseX, mouseY, point1, point2) {
  const midX = (point1.x + point2.x) / 2;
  const midY = (point1.y + point2.y) / 2 - 25; // Adjusted for control point
  return Math.hypot(mouseX - midX, mouseY - midY) < 25; // Sensitivity
}

// Event listener for toggling line type on click
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  connections.forEach((connection) => {
    const point1 = points[connection.from];
    const point2 = points[connection.to];

    // Check if the mouse clicked near the midpoint of the connection line
    const isClicked = connection.isStraight
      ? Math.hypot(
          mouseX - (point1.x + point2.x) / 2,
          mouseY - (point1.y + point2.y) / 2
        ) < 10 // For straight lines
      : isMouseNearMidpoint(mouseX, mouseY, point1, point2); // For curved lines

    if (isClicked) {
      connection.isStraight = !connection.isStraight; // Toggle the line type
      drawLines(); // Redraw lines with the new state
    }
  });
});

// Mouse event listeners for dragging points
canvas.addEventListener("mousedown", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Check if the mouse is near any point
  for (const key in points) {
    const point = points[key];
    if (Math.hypot(mouseX - point.x, mouseY - point.y) < pointRadius) {
      draggingPoint = point;
      break;
    }
  }
});

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Check if mouse is hovering over any connection
  hoveredConnection = null; // Reset hovered connection
  connections.forEach((connection) => {
    const point1 = points[connection.from];
    const point2 = points[connection.to];

    // Calculate the center of the connection line
    const centerX = (point1.x + point2.x) / 2;
    const centerY = (point1.y + point2.y) / 2;

    // Check if the mouse is near the center of the connection line
    const isHovered = connection.isStraight
      ? Math.hypot(mouseX - centerX, mouseY - centerY) < 10 // For straight lines
      : isMouseNearMidpoint(mouseX, mouseY, point1, point2); // For curved lines

    if (isHovered) {
      hoveredConnection = connection; // Set the hovered connection
    }
  });

  // Update dragging position if dragging a point
  if (draggingPoint) {
    draggingPoint.x = mouseX;
    draggingPoint.y = mouseY;
  }

  drawLines(); // Redraw with updated hover and dragging state
});

canvas.addEventListener("mouseup", () => {
  draggingPoint = null;
});

// Initial draw
drawLines();
