const canvas = document.getElementById("plotCanvas");
const pointsTravelled = document.getElementById("points-travelled");
const scenariosCompleted = document.getElementById("scenarios-completed");
const ctx = canvas.getContext("2d");

// Girl's initial state
let girl = {
  image: "Girl.png",
  x: 600,
  y: 100,
  currentLocation: "Home",
  startingPoint: "Home",
  travelledLocations: [],
  travelledDistance: 0,
};

let trace = [];

//define all configurations for scenarios here
const scenarios = {
  "Scenario A": {
    description:
      "Find the shortest distance. Visit all points exactly once, then return home.",
    points: {
      Home: { image: "Home.png", x: 600, y: 100, textY: 35 },
      Postbox: { image: "Postbox.png", x: 200, y: 250 },
      Grandmother: { image: "Grandmother.png", x: 600, y: 250, textY: 300 },
      Cafe: { image: "Cafe.png", x: 1000, y: 250 },
      Market: { image: "Market.png", x: 600, y: 400 },
    },
    connections: [
      { from: "Home", to: "Postbox", line: "sin", distance: 20, },
      { from: "Home", to: "Grandmother", line: "curve", distance: 10 },
      { from: "Home", to: "Cafe", line: "curve", distance: 30 },
      { from: "Postbox", to: "Grandmother", line: "straight", distance: 25 },
      { from: "Postbox", to: "Market", line: "straight", distance: 15 },
      { from: "Grandmother", to: "Cafe", line: "straight", distance: 20 },
      { from: "Grandmother", to: "Market", line: "straight", distance: 10 },
      { from: "Cafe", to: "Market", line: "straight", distance: 25 },
    ],
    answer: {
      points: ["Postbox", "Grandmother", "Cafe", "Market"],
      returnToStart: true,
    },
    completed: false,
  },
  "Scenario B": {
    description:
      "Find the shortest distance. Visit Grandmother House, Postbox then Cafe.",
    points: {
      Home: { image: "Home.png", x: 600, y: 100, textY: 35 },
      Postbox: { image: "Postbox.png", x: 200, y: 150 },
      Grandmother: { image: "Grandmother.png", x: 600, y: 250 },
      Cafe: { image: "Cafe.png", x: 1000, y: 250 },
      Market: { image: "Market.png", x: 400, y: 500 },
    },
    connections: [
      { from: "Home", to: "Postbox", line: "curve", distance: 25 },
      { from: "Home", to: "Grandmother", line: "curve", distance: 10 },
      { from: "Home", to: "Cafe", line: "curve", distance: 30 },
      { from: "Postbox", to: "Grandmother", line: "sin", distance: 35 },
      { from: "Postbox", to: "Market", line: "sin", distance: 20 },
      { from: "Grandmother", to: "Cafe", line: "straight", distance: 20 },
      { from: "Grandmother", to: "Market", line: "straight", distance: 15 },
      { from: "Cafe", to: "Market", line: "straight", distance: 35 },
    ],
    answer: {
      points: ["Grandmother", "Postbox", "Cafe"],
      order: ["Grandmother", "Postbox", "Cafe"],
      returnToStart: false,
    },
    completed: false,
  },
  "Scenario C": {
    description: "Find the shortest distance. Visit any 3 locations.",
    points: {
      Home: { image: "Home.png", x: 600, y: 100, textY: 35 },
      Postbox: { image: "Postbox.png", x: 250, y: 300 },
      Grandmother: { image: "Grandmother.png", x: 750, y: 200, textY: 250 },
      Cafe: { image: "Cafe.png", x: 900, y: 300 },
      Market: { image: "Market.png", x: 400, y: 500 },
    },
    connections: [
      { from: "Home", to: "Postbox", line: "curve", distance: 30, textY: 180 },
      { from: "Home", to: "Grandmother", line: "straight", distance: 20, textY: 120, textX: 700 },
      { from: "Home", to: "Market", line: "curve", distance: 35 },
      { from: "Postbox", to: "Grandmother", line: "straight", distance: 25, textX: 600, textY: 190 },
      { from: "Postbox", to: "Market", line: "sin", distance: 15 },
      { from: "Grandmother", to: "Market", line: "sin", distance: 35 },
      { from: "Grandmother", to: "Cafe", line: "curve", distance: 25, textX: 870, textY: 190 },
      { from: "Market", to: "Cafe", line: "straight", distance: 30 },
    ],
    answer: {
      points: 3,
      returnToStart: false,
    },
    completed: false,
  },
  "Scenario D": {
    description:
      "Find the shortest distance. Visit Postbox and Cafe in any order.",
    points: {
      Home: { image: "Home.png", x: 600, y: 100, textY: 35 },
      Postbox: { image: "Postbox.png", x: 250, y: 200 },
      Grandmother: { image: "Grandmother.png", x: 700, y: 300 },
      Cafe: { image: "Cafe.png", x: 1000, y: 400 },
      Market: { image: "Market.png", x: 450, y: 500 },
    },
    connections: [
      { from: "Home", to: "Postbox", line: "sin", distance: 25 },
      { from: "Home", to: "Market", line: "curve", distance: 30, textY: 340 },
      { from: "Home", to: "Grandmother", line: "straight", distance: 20 },
      { from: "Postbox", to: "Market", line: "curve", distance: 15 },
      { from: "Postbox", to: "Grandmother", line: "sin", distance: 30, textX: 580, textY: 240 },
      { from: "Market", to: "Grandmother", line: "straight", distance: 20 },
      { from: "Market", to: "Cafe", line: "sin", distance: 45 },
      { from: "Grandmother", to: "Cafe", line: "curve", distance: 25 },
    ], answer: {
      points: ["Postbox", "Cafe"],
      returnToStart: false,
    },
    completed: false,
  },
};

let selectedScenario = "Scenario A";

const images = {};

let pastAttemptsByScenario = {};

// Preload images
function preloadImages(scenario) {
  const promises = [];
  for (const pointName in scenario.points) {
    const point = scenario.points[pointName];
    if (!images[point.image]) {
      const img = new Image();
      img.src = point.image;
      images[point.image] = img;
      const promise = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      promises.push(promise);
    }
  }
  if (!images[girl.image]) {
    const girlImg = new Image();
    girlImg.src = girl.image;
    images[girl.image] = girlImg;
    const promise = new Promise((resolve, reject) => {
      girlImg.onload = resolve;
      girlImg.onerror = reject;
    });
    promises.push(promise);
  }
  return Promise.all(promises);
}

// Draw the scenario
function drawScenario(scenario) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw roads
  scenario.connections.forEach((connection) => {
    const point1 = scenario.points[connection.from];
    const point2 = scenario.points[connection.to];
    drawConnection(point1, point2, connection.line, connection.distance);

    const labelX =
      connection.textX !== undefined
        ? connection.textX
        : (point1.x + point2.x) / 2;
    const labelY =
      connection.textY !== undefined
        ? connection.textY
        : (point1.y + point2.y) / 2;
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`${connection.distance}m`, labelX + 10, labelY + 15);
  });

  // Draw locations
  for (const pointName in scenario.points) {
    const point = scenario.points[pointName];
    const img = images[point.image];
    if (img) {
      ctx.drawImage(img, point.x - 50, point.y - 50, 100, 100);

      const textX = point.textX !== undefined ? point.textX : point.x;
      const textY = point.textY !== undefined ? point.textY : point.y + 70;
      ctx.font = "25px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(pointName, textX, textY);
    }
  }

  // Draw the trace
  if (trace.length > 0) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "yellow";

    // Draw trace from the first point to the last
    ctx.moveTo(trace[0].x, trace[0].y);
    for (let i = 1; i < trace.length; i++) {
      ctx.lineTo(trace[i].x, trace[i].y);
    }
    ctx.stroke();
  }

  // Draw the girl
  const girlImg = images[girl.image];
  if (girlImg) {
    ctx.drawImage(girlImg, girl.x - 30, girl.y - 60, 60, 60);
  }
}

// Draw connections between points
function drawConnection(point1, point2, lineType, distance) {
  ctx.beginPath();

  ctx.lineWidth = 25;
  ctx.strokeStyle = "#808080";
  ctx.setLineDash([]);

  if (lineType === "straight") {
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
  } else if (lineType === "sin") {
    drawSineWave(point1, point2, 2);
  } else if (lineType === "curve") {
    const midX = (point1.x + point2.x) / 2;
    const midY = (point1.y + point2.y) / 2;
    const controlPointY = midY - 100;
    ctx.moveTo(point1.x, point1.y);
    ctx.quadraticCurveTo(midX, controlPointY, point2.x, point2.y);
  }

  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  ctx.setLineDash([15, 10]);

  if (lineType === "straight") {
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
  } else if (lineType === "sin") {
    drawSineWave(point1, point2, 2, true);
  } else if (lineType === "curve") {
    const midX = (point1.x + point2.x) / 2;
    const midY = (point1.y + point2.y) / 2;
    const controlPointY = midY - 100;
    ctx.moveTo(point1.x, point1.y);
    ctx.quadraticCurveTo(midX, controlPointY, point2.x, point2.y);
  }

  ctx.stroke();

  ctx.setLineDash([]);

  // const midX = (point1.x + point2.x) / 2;
  // const midY = (point1.y + point2.y) / 2;
  // ctx.font = "bold 20px Arial";
  // ctx.fillStyle = "black";
  // ctx.textAlign = "center";
  // ctx.fillText(`${distance}m`, midX + 10, midY + 15);
}

// Draw sine wave for the "sin" roads
function drawSineWave(point1, point2, oscillations, dashed = false) {
  const amplitude1 = 30;
  const amplitude2 = 15;
  const frequency =
    (Math.PI * 2 * oscillations) /
    Math.hypot(point2.x - point1.x, point2.y - point1.y);
  const length = Math.hypot(point2.x - point1.x, point2.y - point1.y);

  ctx.moveTo(point1.x, point1.y);

  for (let i = 0; i <= length; i++) {
    const ratio = i / length;
    const x = point1.x + ratio * (point2.x - point1.x);
    const y =
      point1.y +
      ratio * (point2.y - point1.y) +
      Math.sin(i * frequency) * (amplitude1 * (1 - ratio) + amplitude2 * ratio);
    ctx.lineTo(x, y);
  }

  if (dashed) {
    ctx.setLineDash([15, 10]);
  }
}

// Animate the girl's movement
function animateMovement(startPoint, endPoint, lineType, movingForward) {
  const frames = 100;
  let frame = 0;

  function animate() {
    if (frame <= frames) {
      let t = frame / frames;
      if (!movingForward) {
        t = 1 - t; // Reverse the parameter t to move backward along the path
      }

      let x, y;
      if (lineType === "straight") {
        x = startPoint.x + t * (endPoint.x - startPoint.x);
        y = startPoint.y + t * (endPoint.y - startPoint.y);
      } else if (lineType === "curve") {
        const midX = (startPoint.x + endPoint.x) / 2;
        const midY = (startPoint.y + endPoint.y) / 2;
        const controlPointY = midY - 100; // Adjust control point as needed
        x =
          (1 - t) * (1 - t) * startPoint.x +
          2 * (1 - t) * t * midX +
          t * t * endPoint.x;
        y =
          (1 - t) * (1 - t) * startPoint.y +
          2 * (1 - t) * t * controlPointY +
          t * t * endPoint.y;
      } else if (lineType === "sin") {
        const amplitude1 = 30;
        const amplitude2 = 15;
        const frequency =
          (Math.PI * 2 * 2) /
          Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y);
        const length = Math.hypot(
          endPoint.x - startPoint.x,
          endPoint.y - startPoint.y
        );

        const ratio = t;
        x = startPoint.x + ratio * (endPoint.x - startPoint.x);
        y =
          startPoint.y +
          ratio * (endPoint.y - startPoint.y) +
          Math.sin(ratio * length * frequency) *
          (amplitude1 * (1 - ratio) + amplitude2 * ratio);
      }

      girl.x = x;
      girl.y = y;

      // Add the current position to the trace array
      trace.push({ x: girl.x, y: girl.y });

      drawScenario(scenarios[selectedScenario]);

      frame++;
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// Build the graph from connections
function buildGraph(connections) {
  const graph = {};
  connections.forEach((connection) => {
    const { from, to, distance } = connection;
    if (!graph[from]) graph[from] = [];
    if (!graph[to]) graph[to] = [];
    graph[from].push({ node: to, distance });
    graph[to].push({ node: from, distance }); // Assuming bidirectional
  });
  return graph;
}

// Dijkstra's algorithm to find the shortest distance between two points
function getShortestDistance(graph, start, end) {
  const distances = {};
  const visited = new Set();
  const queue = [];

  for (const node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  queue.push({ node: start, distance: 0 });

  while (queue.length > 0) {
    // Get the node with the smallest distance
    queue.sort((a, b) => a.distance - b.distance);
    const current = queue.shift();
    if (visited.has(current.node)) continue;
    visited.add(current.node);

    if (current.node === end) {
      return current.distance;
    }

    for (const neighbor of graph[current.node]) {
      const newDistance = current.distance + neighbor.distance;
      if (newDistance < distances[neighbor.node]) {
        distances[neighbor.node] = newDistance;
        queue.push({ node: neighbor.node, distance: newDistance });
      }
    }
  }

  return null; // No path found
}

// Get all permutations of an array (used for small arrays to avoid performance issues)
function getPermutations(array) {
  if (array.length === 0) return [[]];
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const rest = array.slice(0, i).concat(array.slice(i + 1));
    const permutations = getPermutations(rest);
    for (const permutation of permutations) {
      result.push([array[i], ...permutation]);
    }
  }
  return result;
}

// Get all combinations of a certain length
function getCombinations(array, length) {
  if (length === 0) return [[]];
  if (array.length === 0) return [];
  const [first, ...rest] = array;
  const combinationsWithFirst = getCombinations(rest, length - 1).map(
    (combo) => [first, ...combo]
  );
  const combinationsWithoutFirst = getCombinations(rest, length);
  return combinationsWithFirst.concat(combinationsWithoutFirst);
}

// Compute minimal distance based on the scenario
function computeMinimalDistance(scenario, startingPoint) {
  const graph = buildGraph(scenario.connections);
  const answer = scenario.answer;

  // Exclude the starting point from possible locations
  const allPoints = Object.keys(scenario.points).filter(
    (point) => point !== startingPoint
  );

  if (typeof answer.points === "number") {
    // Visit any N locations
    const combinations = getCombinations(allPoints, answer.points);
    let minimalDistance = Infinity;

    for (const combo of combinations) {
      const permutations = getPermutations(combo);
      for (const perm of permutations) {
        let totalDistance = 0;
        let currentPoint = startingPoint;

        for (const point of perm) {
          const distance = getShortestDistance(graph, currentPoint, point);
          if (distance === null) continue;
          totalDistance += distance;
          currentPoint = point;
        }

        if (answer.returnToStart) {
          const distanceBack = getShortestDistance(
            graph,
            currentPoint,
            startingPoint
          );
          if (distanceBack === null) continue;
          totalDistance += distanceBack;
        }

        if (totalDistance < minimalDistance) {
          minimalDistance = totalDistance;
        }
      }
    }
    return minimalDistance;
  } else if (Array.isArray(answer.points)) {
    // Visit specified points
    const pointsToVisit = answer.points;
    let minimalDistance = Infinity;

    if (answer.order) {
      // Visit points in a specific order
      const permutations = [pointsToVisit]; // Only one order to consider
      for (const perm of permutations) {
        let totalDistance = 0;
        let currentPoint = startingPoint;

        for (const point of perm) {
          const distance = getShortestDistance(graph, currentPoint, point);
          if (distance === null) {
            totalDistance = Infinity;
            break;
          }
          totalDistance += distance;
          currentPoint = point;
        }

        if (answer.returnToStart) {
          const distanceBack = getShortestDistance(
            graph,
            currentPoint,
            startingPoint
          );
          if (distanceBack === null) continue;
          totalDistance += distanceBack;
        }

        if (totalDistance < minimalDistance) {
          minimalDistance = totalDistance;
        }
      }
    } else {
      // Visit points in any order
      const permutations = getPermutations(pointsToVisit);
      for (const perm of permutations) {
        let totalDistance = 0;
        let currentPoint = startingPoint;

        for (const point of perm) {
          const distance = getShortestDistance(graph, currentPoint, point);
          if (distance === null) {
            totalDistance = Infinity;
            break;
          }
          totalDistance += distance;
          currentPoint = point;
        }

        if (answer.returnToStart) {
          const distanceBack = getShortestDistance(
            graph,
            currentPoint,
            startingPoint
          );
          if (distanceBack === null) continue;
          totalDistance += distanceBack;
        }

        if (totalDistance < minimalDistance) {
          minimalDistance = totalDistance;
        }
      }
    }

    return minimalDistance;
  }

  return null;
}

function checkRoute() {
  const scenario = scenarios[selectedScenario];
  const answer = scenario.answer;

  const travelledLocations = girl.travelledLocations.filter(
    (location) => location !== girl.startingPoint
  );

  const needsToReturnToStart = answer.returnToStart || false;

  if (needsToReturnToStart && girl.currentLocation !== girl.startingPoint) {
    alert(
      "You need to return to the starting point to complete this scenario."
    );
    resetGame();
    return;
  }

  if (typeof answer.points === "number") {
    if (!needsToReturnToStart && travelledLocations.length !== answer.points) {
      alert(
        `You need to visit exactly ${answer.points} locations (excluding the starting point).`
      );
      resetGame();
      return;
    }
  } else if (Array.isArray(answer.points)) {
    // Check if all required points were visited
    const pointsSet = new Set(travelledLocations);
    for (const point of answer.points) {
      if (!pointsSet.has(point)) {
        alert(`You did not visit ${point} as required.`);
        resetGame();
        return;
      }
    }

    if (answer.order) {
      let orderIndex = 0;
      for (const location of travelledLocations) {
        if (location === answer.order[orderIndex]) {
          orderIndex++;
          if (orderIndex === answer.order.length) {
            break;
          }
        }
      }
      if (orderIndex < answer.order.length) {
        alert(
          `You did not visit the locations in the required order: ${answer.order.join(
            " -> "
          )}.`
        );
        resetGame();
        return;
      }
    }
  }

  const minimalDistance = computeMinimalDistance(scenario, girl.startingPoint);

  if (minimalDistance === null) {
    alert(
      "Unable to calculate the minimal distance. Please check the scenario configuration."
    );
    resetGame();
    return;
  }

  if (Math.abs(girl.travelledDistance - minimalDistance) > 1e-6) {
    alert(
      `Your total travelled distance is not the minimal possible distance of ${minimalDistance}m. Try again!`
    );
    resetGame();
    return;
  }

  alert("Congratulations! You found the shortest route.");
  recordAttempt(selectedScenario);
  scenarios[selectedScenario].completed = true;
  resetGame();
}

// Function to reset the game after an attempt
function resetGame() {
  girl.currentLocation = girl.startingPoint;
  girl.x = scenarios[selectedScenario].points[girl.startingPoint].x;
  girl.y = scenarios[selectedScenario].points[girl.startingPoint].y;
  girl.travelledLocations = [];
  girl.travelledDistance = 0;
  trace = [];
  pointsTravelled.innerHTML = `Points Travelled: `;
  loadScenario(selectedScenario);
}

// Modify the moveGirl function to update the girl's position correctly
function moveGirl(destination) {
  const scenario = scenarios[selectedScenario];

  const currentLocation = girl.currentLocation || girl.startingPoint;

  const connection = scenario.connections.find(
    (c) =>
      (c.from === currentLocation && c.to === destination) ||
      (c.to === currentLocation && c.from === destination)
  );

  if (!connection) {
    alert("The girl can't move directly to this location.");
    return;
  }

  const startPoint = scenario.points[connection.from];
  const endPoint = scenario.points[connection.to];

  // Determine the direction of movement
  const movingForward = currentLocation === connection.from;

  animateMovement(startPoint, endPoint, connection.line, movingForward);

  if (girl.travelledLocations.length > 0) {
    pointsTravelled.innerHTML += `, ${destination}`;
  } else {
    pointsTravelled.innerHTML += `${destination}`;
  }

  girl.currentLocation = destination;
  girl.travelledLocations.push(destination);
  girl.travelledDistance += connection.distance;
}

// Ensure that the girl's initial state is set correctly when loading a scenario
function loadScenario(scenarioName) {
  const scenario = scenarios[scenarioName];
  document.getElementById("description").textContent = scenario.description;
  preloadImages(scenario).then(() => {
    drawScenario(scenario);
  });

  // Reset the girl's starting point based on the scenario's starting location
  girl.startingPoint = girl.currentLocation || "Home";
  girl.x = scenario.points[girl.startingPoint].x;
  girl.y = scenario.points[girl.startingPoint].y;

  scenariosCompleted.innerHTML = `Completed Scenarios: ${Object.keys(scenarios).filter(scenario => scenarios[scenario].completed).length}/${Object.keys(scenarios).length}`;
}

function completeMovement(scenario) {
  girl.travelledLocations.push(girl.currentLocation);

  recordAttempt(scenario);

  girl.travelledLocations = [];
  girl.travelledDistance = 0;
  girl.currentLocation = girl.startingPoint;
}

function recordAttempt(scenario) {
  if (!pastAttemptsByScenario[scenario]) {
    pastAttemptsByScenario[scenario] = [];
  }

  let attemptDetails = [
    `Start: ${girl.startingPoint}`,
    `Travelled to: ${girl.travelledLocations.join(", ")}`,
    `Total Distance: ${girl.travelledDistance}m`,
  ];

  pastAttemptsByScenario[scenario].push(attemptDetails);

  displayPastAnswers();
}

function displayPastAnswers() {
  const pastAnswersDiv = document.getElementById("past-attempts");
  // Clear any existing content
  pastAnswersDiv.innerHTML = "";

  // Loop through each scenario in the pastAttemptsByScenario object
  for (let scenario in pastAttemptsByScenario) {
    // Create a div to hold the entire scenario section
    let scenarioDiv = document.createElement("div");

    // Create a scenario title (e.g., "Scenario A")
    scenarioDiv.innerHTML = `<h3 style="margin: 0; font-size: 18px; font-weight: bold;">${scenario}:</h3>`;

    // Create a container to hold all attempts for this scenario
    let attemptsContainer = document.createElement("div");
    attemptsContainer.style.display = "flex";
    attemptsContainer.style.flexWrap = "wrap";

    // Loop through each attempt for the current scenario
    pastAttemptsByScenario[scenario].forEach((attempt, index) => {
      // Create a div for each individual attempt
      let attemptDiv = document.createElement("div");
      attemptDiv.style.width = "400px"; // Set the width for consistent layout
      attemptDiv.style.textAlign = "left"; // Align text to the left

      // Populate the attempt details
      attemptDiv.innerHTML = `<strong style="font-size: 16px;">Attempt ${index + 1
        }:</strong><br>${attempt.join("<br>")}`;

      // Append the attempt div to the attempts container
      attemptsContainer.appendChild(attemptDiv);
    });

    // Append the attempts container to the scenario div
    scenarioDiv.appendChild(attemptsContainer);

    // Append the scenario div to the main pastAnswersDiv
    pastAnswersDiv.appendChild(scenarioDiv);
  }
}

loadScenario(selectedScenario);

// Add event listener for the check button
document.getElementById("check").addEventListener("click", checkRoute);

// Add event listener for the reset button
document.getElementById("reset").addEventListener("click", resetGame);

// Ensure that when the scenario changes, the girl's state is reset appropriately
document.getElementById("scenarios").addEventListener("change", (event) => {
  selectedScenario = event.target.value;
  girl.currentLocation = "Home";
  girl.startingPoint = girl.currentLocation;
  girl.x = scenarios[selectedScenario].points[girl.currentLocation].x;
  girl.y = scenarios[selectedScenario].points[girl.currentLocation].y;
  girl.travelledLocations = [];
  girl.travelledDistance = 0;
  trace = [];
  pointsTravelled.innerHTML = `Points Travelled: `;
  loadScenario(selectedScenario);
});

// Handle double-click on canvas to move the girl
canvas.addEventListener("dblclick", (event) => {
  const scenario = scenarios[selectedScenario];

  for (const pointName in scenario.points) {
    const point = scenario.points[pointName];
    const distance = Math.hypot(
      event.offsetX - point.x,
      event.offsetY - point.y
    );

    if (distance < 50) {
      moveGirl(pointName);
      break;
    }
  }
});
