const canvas = document.getElementById("plotCanvas");
const pointsTravelled = document.getElementById("points-travelled");
// scenariosCompleted is no longer a single element for text, but we'll get the label and count separately
const ctx = canvas.getContext("2d");

// Set initial canvas dimensions
const originalCanvasWidth = 1200;
const originalCanvasHeight = 600;
canvas.width = originalCanvasWidth;
canvas.height = originalCanvasHeight;
let currentScale = 1;
let fontScaleFactor = 1; // Initialize font scale factor

// Girl's initial state
let girl = {
  image: "Girl.png",
  x: 600,
  y: 100,
  currentLocation: "Home",
  startingPoint: "Home",
  travelledLocations: [],
  traveled: [],
  travelledDistance: 0,
};

let trace = [];

//define all configurations for scenarios here
const scenarios = {
  "Task A": {
    description:
      "Susan needs to post a letter and buy some cookies from the Cafe.\nShe can go to the places in any order. Find the shortest path to take.",
    points: {
      Home: { image: "Home.png", x: 600, y: 75, textY: 165, textX: 595 }, // Moved up
      Postbox: { image: "Postbox.png", x: 200, y: 180, textY: 280 }, // Moved left/up
      Grandmother: { image: "Grandmother.png", x: 750, y: 300 }, // Moved right
      Cafe: { image: "Cafe.png", x: 1050, y: 420 }, // Moved right/down
      Market: { image: "Market.png", x: 320, y: 475, textX: 320, textY: 570 }, // Moved left/down
    },
    connections: [
      {
        from: "Home",
        to: "Postbox",
        line: "sin",
        distance: 25,
        textX: 330,
        textY: 110,
      },
      {
        from: "Home",
        to: "Market",
        line: "curve",
        distance: 30,
        textY: 275,
        textX: 350,
      },
      {
        from: "Home",
        to: "Grandmother",
        line: "straight",
        distance: 20,
        textX: 740,
      },
      {
        from: "Postbox",
        to: "Market",
        line: "curve",
        distance: 15,
        textX: 210,
        textY: 355,
      },
      {
        from: "Postbox",
        to: "Grandmother",
        line: "sin",
        distance: 30,
        textX: 570,
        textY: 235,
      },
      {
        from: "Market",
        to: "Grandmother",
        line: "straight",
        distance: 35,
        textX: 510,
        textY: 345,
      },
      {
        from: "Market",
        to: "Cafe",
        line: "sin",
        distance: 45,
        textX: 660,
        textY: 485,
      },
      {
        from: "Grandmother",
        to: "Cafe",
        line: "curve",
        distance: 25,
        textX: 965,
        textY: 285,
      },
    ],
    answer: {
      points: ["Postbox", "Cafe"],
      returnToStart: false,
    },
    completed: false,
  },
  "Task B": {
    description:
      "Susan will visit her grandmother first, then post a letter and lastly go to the Cafe to meet her friends for tea.\nFind the shortest path to take.",
    points: {
      Home: { image: "Home.png", x: 630, y: 107, textY: 35, textX: 627 },
      Postbox: { image: "Postbox.png", x: 135, y: 185, textY: 285, textX: 125 },
      Grandmother: { image: "Grandmother.png", x: 570, y: 290 },
      Cafe: { image: "Cafe.png", x: 1000, y: 365 },
      Market: { image: "Market.png", x: 405, y: 495, textY: 590 },
    },
    connections: [
      {
        from: "Home",
        to: "Postbox",
        line: "curve",
        distance: 35,
        textX: 340,
        textY: 60,
      },
      {
        from: "Home",
        to: "Grandmother",
        line: "curve",
        distance: 10,
        textX: 630,
        textY: 205,
      },
      {
        from: "Home",
        to: "Cafe",
        line: "curve",
        distance: 30,
        textX: 905,
        textY: 200,
      },
      {
        from: "Postbox",
        to: "Grandmother",
        line: "sin",
        distance: 25,
        textX: 410,
        textY: 215,
      },
      {
        from: "Postbox",
        to: "Market",
        line: "sin",
        distance: 25,
        textX: 210,
        textY: 385,
      },
      {
        from: "Grandmother",
        to: "Cafe",
        line: "straight",
        distance: 20,
        textX: 765,
        textY: 280,
      },
      {
        from: "Grandmother",
        to: "Market",
        line: "straight",
        distance: 15,
        textX: 535,
        textY: 400,
      },
      {
        from: "Cafe",
        to: "Market",
        line: "straight",
        distance: 35,
        textX: 710,
        textY: 465,
      },
    ],
    answer: {
      points: ["Grandmother", "Postbox", "Cafe"],
      order: ["Grandmother", "Postbox", "Cafe"],
      returnToStart: false,
    },
    completed: false,
  },
  "Task C": {
    description:
      "Susan visits each of the places once only and then return home.\nFind the shortest path to take.",
    points: {
      Home: { image: "Home.png", x: 630, y: 107, textY: 35, textX: 627 }, // Moved up
      Postbox: { image: "Postbox.png", x: 150, y: 250, textY: 347 }, // Moved left
      Grandmother: { image: "Grandmother.png", x: 620, y: 295, textY: 360 }, // Moved right
      Cafe: { image: "Cafe.png", x: 1050, y: 250 }, // Moved right
      Market: { image: "Market.png", x: 575, y: 495, textY: 590 }, // Moved down
    },
    connections: [
      {
        from: "Home",
        to: "Postbox",
        line: "sin",
        distance: 30,
        textX: 320,
        textY: 150,
      },
      {
        from: "Home",
        to: "Grandmother",
        line: "curve",
        distance: 10,
        textX: 670,
        textY: 210,
      },
      {
        from: "Home",
        to: "Cafe",
        line: "curve",
        distance: 30,
        textX: 900,
        textY: 100,
      },
      {
        from: "Postbox",
        to: "Grandmother",
        line: "straight",
        distance: 25,
        textX: 470,
        textY: 240,
      },
      {
        from: "Postbox",
        to: "Market",
        line: "straight",
        distance:35,
        textX: 325,
        textY: 410,
      },
      {
        from: "Grandmother",
        to: "Cafe",
        line: "straight",
        distance: 20,
        textX: 840,
        textY: 225,
      },
      {
        from: "Grandmother",
        to: "Market",
        line: "straight",
        distance: 10,
        textX: 525,
        textY: 400,
      },
      {
        from: "Cafe",
        to: "Market",
        line: "straight",
        distance: 30,
        textX: 860,
        textY: 400,
      },
    ],
    answer: {
      points: ["Postbox", "Grandmother", "Cafe", "Market"],
      returnToStart: true,
    },
    completed: false,
  },
  "Task D": {
    description:
      "Susan is very tired and can only visit 3 places.\nHelp her deicde which 3 places she can go to in the shortest distance.",
    points: {
      Home: { image: "Home.png", x: 630, y: 107, textY: 35, textX: 627 }, // Moved up
      Postbox: { image: "Postbox.png", x: 230, y: 240, textY: 340 }, // Moved left/up
      Grandmother: { image: "Grandmother.png", x: 965, y: 220, textY: 285 }, // Moved right/up
      Cafe: { image: "Cafe.png", x: 900, y: 455 }, // Moved right/down
      Market: { image: "Market.png", x: 400, y: 500, textY: 593 }, // Moved left/down
    },
    connections: [
      {
        from: "Home",
        to: "Postbox",
        line: "curve",
        distance: 30,
        textY: 85,
        textX: 390,
      },
      {
        from: "Home",
        to: "Grandmother",
        line: "straight",
        distance: 20,
        textY: 120,
        textX: 810,
      },
      {
        from: "Home",
        to: "Market",
        line: "curve",
        distance: 35,
        textX: 400,
        textY: 320,
      },
      {
        from: "Postbox",
        to: "Grandmother",
        line: "straight",
        distance: 40,
        textX: 630,
        textY: 265,
      },
      {
        from: "Postbox",
        to: "Market",
        line: "sin",
        distance: 15,
        textX: 255,
        textY: 415,
      },
      {
        from: "Grandmother",
        to: "Market",
        line: "sin",
        distance: 35,
        textX: 750,
        textY: 360,
      },
      {
        from: "Grandmother",
        to: "Cafe",
        line: "curve",
        distance: 25,
        textX: 965,
        textY: 350,
      },
      {
        from: "Market",
        to: "Cafe",
        line: "straight",
        distance: 30,
        textY: 515,
      },
    ],
    answer: {
      points: 3,
      returnToStart: false,
    },
    completed: false,
  },
  Demonstration: {
    description:
      "Find the shortest path Susan needs to take to visit both the Market and Grandmother's House in any order.",
    points: {
      Home: { image: "Home.png", x: 630, y: 107, textY: 35, textX: 627 }, // Moved up
      Grandmother: { image: "Grandmother.png", x: 965, y: 220, textY: 285 }, // Moved right/up
      Market: { image: "Market.png", x: 400, y: 500, textY: 593 }, // Moved left/down
    },
    connections: [
      {
        from: "Home",
        to: "Grandmother",
        line: "straight",
        distance: 20,
        textY: 120,
        textX: 810,
      },
      {
        from: "Home",
        to: "Market",
        line: "curve",
        distance: 35,
        textX: 400,
        textY: 320,
      },
      {
        from: "Grandmother",
        to: "Market",
        line: "sin",
        distance: 35,
        textX: 750,
        textY: 360,
      },
    ],
    answer: {
      points: ["Market", "Grandmother"],
    },
    completed: false,
  },
};

let selectedScenario = "Task C";
let scenarioStartTime; // Variable to store the start time of the current scenario attempt

const images = {};

let pastAttemptsByScenario = {};

// Preload images
function preloadImages(scenario) {
  const promises = [];
  for (const pointName in scenario.points) {
    const point = scenario.points[pointName];
    if (!images[point.image]) {
      const img = new Image();
      img.src = "./images/" + point.image;
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
    girlImg.src = "./images/" + girl.image;
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
    const p1 = scenario.points[connection.from];
    const p2 = scenario.points[connection.to];
    drawConnection(p1, p2, connection.line, connection.distance);

    const baseLabelX =
      connection.textX !== undefined ? connection.textX : (p1.x + p2.x) / 2;
    const baseLabelY =
      connection.textY !== undefined ? connection.textY : (p1.y + p2.y) / 2;

    const scaledLabelX = baseLabelX * currentScale;
    const scaledLabelY = baseLabelY * currentScale;

    ctx.font = `bold ${20 * currentScale}px Arial`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    // Adjusted base font size from 20px to 24px
    ctx.font = `bold ${35 * currentScale}px Arial`;
    ctx.fillText(
      `${connection.distance}m`,
      scaledLabelX + 10 * currentScale,
      scaledLabelY + 15 * currentScale
    );
  });

  // Draw locations
  for (const pointName in scenario.points) {
    const point = scenario.points[pointName];
    const img = images[point.image];
    if (img) {
      const scaledX = point.x * currentScale;
      const scaledY = point.y * currentScale;
      // Adjusted base image size from 100px to 120px
      const imageSize = 150 * currentScale;
      const imageOffset = imageSize / 2;

      ctx.drawImage(
        img,
        scaledX - imageOffset,
        scaledY - imageOffset,
        imageSize,
        imageSize
      );

      const baseTextX = point.textX !== undefined ? point.textX : point.x;
      const baseTextY = point.textY !== undefined ? point.textY : point.y + 70; // 70 is offset in original scale

      const scaledTextX = baseTextX * currentScale;
      const scaledTextY = baseTextY * currentScale;

      // Adjusted base font size from 25px to 30px
      ctx.font = `${35 * currentScale}px Arial`;
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(pointName, scaledTextX, scaledTextY);
    }
  }

  // Draw the trace
  if (trace.length > 0) {
    ctx.beginPath();
    // Adjusted base line width from 5px to 7px
    ctx.lineWidth = 7 * currentScale;
    ctx.strokeStyle = "yellow";

    // Draw trace from the first point to the last
    // trace stores unscaled coordinates
    ctx.moveTo(trace[0].x * currentScale, trace[0].y * currentScale);
    for (let i = 1; i < trace.length; i++) {
      ctx.lineTo(trace[i].x * currentScale, trace[i].y * currentScale);
    }
    ctx.stroke();
  }

  // Draw the girl
  // girl.x and girl.y store unscaled coordinates
  const girlImg = images[girl.image];
  if (girlImg) {
    // Adjusted base size from 60px to 70px
    const girlSize = 70 * currentScale;
    const girlScaledX = girl.x * currentScale;
    const girlScaledY = girl.y * currentScale;
    // Adjusted offsets based on new size (70/2 = 35)
    const girlOffsetX = 35 * currentScale;
    const girlOffsetY = 70 * currentScale; // Assuming image is roughly square and offset is full height
    ctx.drawImage(
      girlImg,
      girlScaledX - girlOffsetX,
      girlScaledY - girlOffsetY,
      girlSize,
      girlSize
    );
  }
}

// Draw connections between points
function drawConnection(point1, point2, lineType, distance) {
  ctx.beginPath();

  const p1x = point1.x * currentScale;
  const p1y = point1.y * currentScale;
  const p2x = point2.x * currentScale;
  const p2y = point2.y * currentScale;

  // Adjusted base line width from 25px to 30px
  ctx.lineWidth = 30 * currentScale;
  ctx.strokeStyle = "#808080";
  ctx.setLineDash([]);

  if (lineType === "straight") {
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
  } else if (lineType === "sin") {
    drawSineWave(
      { x: p1x, y: p1y },
      { x: p2x, y: p2y },
      2,
      false,
      currentScale
    );
  } else if (lineType === "curve") {
    const midX = (p1x + p2x) / 2;
    const midY = (p1y + p2y) / 2;
    const controlPointYOffset = 100 * currentScale;
    const controlPointY = midY - controlPointYOffset;
    ctx.moveTo(p1x, p1y);
    ctx.quadraticCurveTo(midX, controlPointY, p2x, p2y);
  }

  ctx.stroke();

  ctx.beginPath();
  // Adjusted base line width from 2px to 3px
  ctx.lineWidth = 3 * currentScale;
  ctx.strokeStyle = "white";
  // Adjusted base dash/gap from 15/10 to 18/12
  ctx.setLineDash([18 * currentScale, 12 * currentScale]);

  if (lineType === "straight") {
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
  } else if (lineType === "sin") {
    drawSineWave({ x: p1x, y: p1y }, { x: p2x, y: p2y }, 2, true, currentScale);
  } else if (lineType === "curve") {
    const midX = (p1x + p2x) / 2;
    const midY = (p1y + p2y) / 2;
    const controlPointYOffset = 100 * currentScale;
    const controlPointY = midY - controlPointYOffset;
    ctx.moveTo(p1x, p1y);
    ctx.quadraticCurveTo(midX, controlPointY, p2x, p2y);
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
// point1 and point2 are expected to be already scaled coordinates
function drawSineWave(point1, point2, oscillations, dashed = false, scale = 1) {
  // Adjusted base amplitudes from 30/15 to 35/20
  const amplitude1Scaled = 35 * scale;
  const amplitude2Scaled = 20 * scale;

  // frequency and length are based on the scaled points passed in
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  const length = Math.hypot(dx, dy);

  if (length === 0) return; // Avoid division by zero if points are identical

  const frequency = (Math.PI * 2 * oscillations) / length;

  ctx.moveTo(point1.x, point1.y);

  for (let i = 0; i <= length; i++) {
    const ratio = i / length;
    const x = point1.x + ratio * dx;
    const y =
      point1.y +
      ratio * dy +
      Math.sin(i * frequency) *
        (amplitude1Scaled * (1 - ratio) + amplitude2Scaled * ratio);
    ctx.lineTo(x, y);
  }

  if (dashed) {
    // Dash properties should also be scaled if not already handled by caller
    // Assuming caller (drawConnection) handles setLineDash with scaled values
    // If this function were called independently, it would need:
    // ctx.setLineDash([15 * scale, 10 * scale]);
  }
}

// Animate the girl's movement
// startPoint, endPoint are unscaled from scenario.points
// girl.x, girl.y, trace will store unscaled coordinates
function animateMovement(startPoint, endPoint, lineType, movingForward) {
  canvas.removeEventListener("dblclick", onCanvasDoubleClick);
  const frames = 100;
  let frame = 0;

  function animate() {
    if (frame <= frames) {
      let t = frame / frames;
      if (!movingForward) {
        t = 1 - t;
      }

      let x, y;
      if (lineType === "straight") {
        x = startPoint.x + t * (endPoint.x - startPoint.x);
        y = startPoint.y + t * (endPoint.y - startPoint.y);
      } else if (lineType === "curve") {
        const midX = (startPoint.x + endPoint.x) / 2;
        const midY = (startPoint.y + endPoint.y) / 2;
        const controlPointY = midY - 100;
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
      trace.push({ x: girl.x, y: girl.y });
      drawScenario(scenarios[selectedScenario]);

      frame++;
      requestAnimationFrame(animate);
    } else {
      // Re-enable double-click only after animation finishes
      canvas.addEventListener("dblclick", onCanvasDoubleClick);
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
  try {
    const scenario = scenarios[selectedScenario];
    const answer = scenario.answer;
    let isCorrect = true;

    const travelledLocations = girl.travelledLocations.filter(
      (location) => location !== girl.startingPoint
    );

    const needsToReturnToStart = answer.returnToStart || false;

    // --- Validation Checks ---
    if (needsToReturnToStart && girl.currentLocation !== girl.startingPoint) {
      alert(
        "You need to return to the starting point to complete this scenario."
      );
      isCorrect = false;
      return;
    }

    if (typeof answer.points === "number") {
      if (
        !needsToReturnToStart &&
        travelledLocations.length !== answer.points
      ) {
        alert(
          `You need to visit exactly ${answer.points} locations (excluding the starting point).`
        );
        isCorrect = false;
        return;
      }
    } else if (Array.isArray(answer.points)) {
      const pointsSet = new Set(travelledLocations);
      for (const point of answer.points) {
        if (!pointsSet.has(point)) {
          alert(`You did not visit ${point} as required.`);
          isCorrect = false;
          return;
        }
      }

      if (answer.order) {
        let orderIndex = 0;
        for (const location of travelledLocations) {
          if (location === answer.order[orderIndex]) {
            orderIndex++;
            if (orderIndex === answer.order.length) break;
          }
        }
        if (orderIndex < answer.order.length) {
          alert(
            `You did not visit the locations in the required order: ${answer.order.join(
              " -> "
            )}.`
          );
          isCorrect = false;
          return;
        }
      }
    }

    const minimalDistance = computeMinimalDistance(
      scenario,
      girl.startingPoint
    );

    if (minimalDistance === null) {
      alert(
        "Unable to calculate the minimal distance. Please check the scenario configuration."
      );
      isCorrect = false;
      return;
    }

    if (Math.abs(girl.travelledDistance - minimalDistance) > 1e-6) {
      alert(
        `Your total travelled distance is not the shortest path. Try again!`
      );
      isCorrect = false;
      return;
    }

    if (isCorrect) {
      alert("Congratulations! You found the shortest path.");
      // Calculate and store time taken only if the timer started and task is now complete
      if (scenarioStartTime && !scenarios[selectedScenario].completed) {
        const endTime = new Date();
        const timeDiff = endTime - scenarioStartTime; // Difference in milliseconds
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const timeTakenString = `${minutes}m ${remainingSeconds}s`;
        scenarios[selectedScenario].timeTaken = timeTakenString; // Store it in the scenario object
        console.log(
          `Scenario ${selectedScenario} completed in ${timeTakenString}`
        ); // Optional debug log
        scenarioStartTime = null; // Reset timer after successful completion
        scenarios[selectedScenario].numberOfAttempts = !pastAttemptsByScenario[
          selectedScenario
        ]
          ? 1
          : pastAttemptsByScenario[selectedScenario].length + 1;
      }
      scenarios[selectedScenario].completed = true; // Mark as completed
    }
  } finally {
    recordAttempt(selectedScenario);
  }
}

// Function to reset the game after an attempt
function resetGame() {
  girl.currentLocation = girl.startingPoint;
  girl.x = scenarios[selectedScenario].points[girl.startingPoint].x;
  girl.y = scenarios[selectedScenario].points[girl.startingPoint].y;
  girl.travelledLocations = [];
  girl.traveled = [];
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
  girl.traveled.push(`${destination} (${connection.distance}m)`);
}

// Ensure that the girl's initial state is set correctly when loading a scenario
function loadScenario(scenarioName) {
  const scenario = scenarios[scenarioName];
  document.getElementById("description").textContent = scenario.description;
  document.getElementById("description").innerHTML =
    scenario.description.replace(/\n/g, "<br>");

  // scenarioStartTime = new Date(); // REMOVED: Don't start timer automatically on load
  preloadImages(scenario).then(() => {
    // Adjust canvas size dynamically
    const aspectRatio = 2; // width / height
    const maxWidth = 1200;
    let newWidth = window.innerWidth * 0.9; // 90% of window width
    if (newWidth > maxWidth) newWidth = maxWidth;
    let newHeight = newWidth / aspectRatio;

    // Ensure height is not too small, e.g., for mobile devices
    if (window.innerHeight * 0.7 < newHeight) {
      newHeight = window.innerHeight * 0.7;
      newWidth = newHeight * aspectRatio;
    }

    // Cap width if it exceeds 90% of viewport width after height adjustment
    if (newWidth > window.innerWidth * 0.95) {
      newWidth = window.innerWidth * 0.95;
      newHeight = newWidth / aspectRatio;
    }

    canvas.width = newWidth;
    canvas.height = newHeight;

    currentScale = canvas.width / originalCanvasWidth; // For canvas elements

    // Font scaling factor based on window width for HTML text elements
    fontScaleFactor = window.innerWidth / originalCanvasWidth; // Update global fontScaleFactor
    // Clamp fontScaleFactor to prevent extreme sizes, e.g., 0.6x to 1.5x of base
    fontScaleFactor = Math.min(Math.max(fontScaleFactor, 0.6), 1.5);

    // Adjust description font size
    const descriptionElement = document.getElementById("description");
    if (descriptionElement) {
      const baseFontSize = 16; // Base font size in pixels
      let scaledFontSize = baseFontSize * fontScaleFactor;
      const minDescFontSize = 18;
      const maxDescFontSize = 24;
      scaledFontSize = Math.max(
        minDescFontSize,
        Math.min(scaledFontSize, maxDescFontSize)
      );
      descriptionElement.style.fontSize = `${scaledFontSize}px`;
    }

    // Adjust scenarios-completed-label font size
    const scenariosCompletedLabelElement = document.getElementById(
      "scenarios-completed-label"
    );
    if (scenariosCompletedLabelElement) {
      const baseFontSize = 14;
      let scaledFontSize = baseFontSize * fontScaleFactor;
      const minLabelFontSize = 16;
      const maxLabelFontSize = 20;
      scaledFontSize = Math.max(
        minLabelFontSize,
        Math.min(scaledFontSize, maxLabelFontSize)
      );
      scenariosCompletedLabelElement.style.fontSize = `${scaledFontSize}px`;
    }

    // Adjust points-travelled font size
    const pointsTravelledElement = document.getElementById("points-travelled");
    if (pointsTravelledElement) {
      const baseFontSize = 14;
      let scaledFontSize = baseFontSize * fontScaleFactor;
      const minPointsFontSize = 16;
      const maxPointsFontSize = 20;
      scaledFontSize = Math.max(
        minPointsFontSize,
        Math.min(scaledFontSize, maxPointsFontSize)
      );
      pointsTravelledElement.style.fontSize = `${scaledFontSize}px`;
    }

    // Adjust select dropdown font size
    const scenariosSelectElement = document.getElementById("scenarios");
    if (scenariosSelectElement) {
      const baseFontSize = 14;
      let scaledFontSize = baseFontSize * fontScaleFactor;
      const minSelectFontSize = 16;
      const maxSelectFontSize = 18; // Selects might need slightly different max
      scaledFontSize = Math.max(
        minSelectFontSize,
        Math.min(scaledFontSize, maxSelectFontSize)
      );
      scenariosSelectElement.style.fontSize = `${scaledFontSize}px`;
    }

    // Adjust button font sizes
    const checkButtonElement = document.getElementById("check");
    if (checkButtonElement) {
      const baseFontSize = 14;
      let scaledFontSize = baseFontSize * fontScaleFactor;
      const minButtonFontSize = 16;
      const maxButtonFontSize = 18;
      scaledFontSize = Math.max(
        minButtonFontSize,
        Math.min(scaledFontSize, maxButtonFontSize)
      );
      checkButtonElement.style.fontSize = `${scaledFontSize}px`;
    }

    const resetButtonElement = document.getElementById("reset");
    if (resetButtonElement) {
      const baseFontSize = 14;
      let scaledFontSize = baseFontSize * fontScaleFactor;
      const minButtonFontSize = 16;
      const maxButtonFontSize = 18;
      scaledFontSize = Math.max(
        minButtonFontSize,
        Math.min(scaledFontSize, maxButtonFontSize)
      );
      resetButtonElement.style.fontSize = `${scaledFontSize}px`;
    }

    drawScenario(scenario);
  });

  // Reset the girl's starting point based on the scenario's starting location
  // girl.x, girl.y are unscaled
  girl.startingPoint = girl.currentLocation || "Home";
  girl.x = scenario.points[girl.startingPoint].x;
  girl.y = scenario.points[girl.startingPoint].y;

  displayPastAnswers();
}

function completeMovement(scenario) {
  girl.travelledLocations.push(girl.currentLocation);

  recordAttempt(scenario);

  girl.travelledLocations = [];
  girl.travelledDistance = 0;
  girl.currentLocation = girl.startingPoint;
}

function recordAttempt(scenario) {
  // Removed async
  if (!pastAttemptsByScenario[scenario]) {
    pastAttemptsByScenario[scenario] = [];
  }

  let attemptDetails = {
    Start: girl.startingPoint,
    "Travelled to": girl.traveled.join(" -> "),
    "Total Distance": `${girl.travelledDistance}m`,
    "Time Stamp": scenarioStartTime
      ? `${Math.floor(
          (new Date() - scenarioStartTime) / 1000 / 60
        )}m ${Math.floor(((new Date() - scenarioStartTime) / 1000) % 60)}s`
      : scenarios[selectedScenario].timeTaken,
    Completed: scenarios[selectedScenario].completed || false,
  };

  pastAttemptsByScenario[scenario].push(attemptDetails);

  displayPastAnswers(); // Update local UI

  try {
    // Calculate the current score *at the time of the attempt*
    const currentScore = Object.keys(scenarios).filter(
      (s) => scenarios[s].completed
    ).length;
    // Get the stored time taken if the scenario has been completed successfully
    const timeTakenString =
      scenarios[selectedScenario].timeTaken || "Did not complete";
    const numberOfAttempts =
      scenarios[selectedScenario].numberOfAttempts ||
      pastAttemptsByScenario[selectedScenario].length;
    console.log(pastAttemptsByScenario);

    let attemptLogHtml = "";
    if (pastAttemptsByScenario[selectedScenario]) {
      pastAttemptsByScenario[selectedScenario].forEach((attempt, index) => {
        // Determine if the distance was correct for this attempt
        const scenario = scenarios[selectedScenario];
        const graph = buildGraph(scenario.connections);
        const minimalDistance = computeMinimalDistance(scenario, attempt.Start);
        const distanceCorrect =
          minimalDistance !== null &&
          Math.abs(parseFloat(attempt["Total Distance"]) - minimalDistance) <
            1e-6;
        const distanceCorrectString = distanceCorrect
          ? "is correct"
          : "is not correct";

        attemptLogHtml += `Attempt ${index + 1}: Traveled Locations: ${
          attempt["Travelled to"]
        }; Distance Traveled of ${
          attempt["Total Distance"]
        } ${distanceCorrectString}; Time Stamp: ${attempt["Time Stamp"]}<br>`;
      });
    }

    const feedback = `
    <div>
      <div>
        Total Attempts: ${numberOfAttempts}<br>
        Managed To Complete: ${
          scenarios[selectedScenario].completed || false
        }<br>
        Total Time Taken to Complete: ${timeTakenString}<br><br>

        Attempt Log:<br>
        ${attemptLogHtml}
      </div>
    </div>
    `;

    console.log(feedback);

    const stateToSend = {
      score: currentScore,
      feedback,
    };
    console.log("Sending state on attempt:", stateToSend);

    // Send state after every attempt
    storeState(stateToSend);
  } catch (error) {
    console.error("Failed to store state during attempt:", error);
  } finally {
    resetGame(); // <-- always runs even after a return
  }
}

function displayPastAnswers() {
  const pastAnswersDiv = document.getElementById("past-attempts");
  pastAnswersDiv.innerHTML = "";

  // Recalculate fontScaleFactor here to ensure it's current
  let fontScaleFactor = window.innerWidth / originalCanvasWidth;
  fontScaleFactor = Math.min(Math.max(fontScaleFactor, 0.6), 1.5); // Clamp

  const scenario = selectedScenario;
  const attempts = pastAttemptsByScenario[scenario];

  if (attempts && attempts.length > 0) {
    let scenarioDiv = document.createElement("div");

    // Scenario title scaling
    const baseScenarioTitleFontSize = 18;
    let scaledScenarioTitleFontSize =
      baseScenarioTitleFontSize * fontScaleFactor;
    const minScenarioTitleFontSize = 14;
    const maxScenarioTitleFontSize = 26;
    scaledScenarioTitleFontSize = Math.max(
      minScenarioTitleFontSize,
      Math.min(scaledScenarioTitleFontSize, maxScenarioTitleFontSize)
    );
    scenarioDiv.innerHTML = `<h3 style="margin: 0; font-size: ${scaledScenarioTitleFontSize}px; font-weight: bold;">${scenario}:</h3>`;

    let attemptsContainer = document.createElement("div");
    attemptsContainer.style.display = "flex";
    attemptsContainer.style.flexWrap = "wrap";

    attempts.forEach((attempt, index) => {
      let attemptDiv = document.createElement("div");
      attemptDiv.style.width = "400px";
      attemptDiv.style.textAlign = "left";
      attemptDiv.style.marginBottom = "10px";
      attemptDiv.style.marginTop = "10px";

      // Attempt number scaling
      const baseAttemptNumFontSize = 16;
      let scaledAttemptNumFontSize = baseAttemptNumFontSize * fontScaleFactor;
      const minAttemptNumFontSize = 12;
      const maxAttemptNumFontSize = 22;
      scaledAttemptNumFontSize = Math.max(
        minAttemptNumFontSize,
        Math.min(scaledAttemptNumFontSize, maxAttemptNumFontSize)
      );

      // Attempt details scaling
      const baseAttemptDetailFontSize = 14;
      let scaledAttemptDetailFontSize =
        baseAttemptDetailFontSize * fontScaleFactor;
      const minAttemptDetailFontSize = 10;
      const maxAttemptDetailFontSize = 18;
      scaledAttemptDetailFontSize = Math.max(
        minAttemptDetailFontSize,
        Math.min(scaledAttemptDetailFontSize, maxAttemptDetailFontSize)
      );

      let attemptDetailsHtml = `<strong style="font-size: ${scaledAttemptNumFontSize}px;">Attempt ${
        index + 1
      }:</strong><br>`;
      for (const key in attempt) {
        attemptDetailsHtml += `<span style="font-size: ${scaledAttemptDetailFontSize}px;">${key}: ${attempt[key]}</span><br>`;
      }
      attemptDiv.innerHTML = attemptDetailsHtml;

      attemptsContainer.appendChild(attemptDiv);
    });

    scenarioDiv.appendChild(attemptsContainer);
    pastAnswersDiv.appendChild(scenarioDiv);
  } else {
    // "No past attempts" message scaling
    const baseNoAttemptsFontSize = 14;
    let scaledNoAttemptsFontSize = baseNoAttemptsFontSize * fontScaleFactor;
    const minNoAttemptsFontSize = 10;
    const maxNoAttemptsFontSize = 18;
    scaledNoAttemptsFontSize = Math.max(
      minNoAttemptsFontSize,
      Math.min(scaledNoAttemptsFontSize, maxNoAttemptsFontSize)
    );
    pastAnswersDiv.innerHTML = `<p style="font-size: ${scaledNoAttemptsFontSize}px;">No past attempts for this scenario.</p>`;
  }
}

// Add resize event listener
window.addEventListener("resize", () => loadScenario(selectedScenario));

loadScenario(selectedScenario);

// Add event listener for the check button
document.getElementById("check").addEventListener("click", checkRoute);

// Add event listener for the reset button
document.getElementById("reset").addEventListener("click", resetGame);

// Ensure that when the scenario changes, the girl's state is reset appropriately
document.getElementById("scenarios").addEventListener("change", (event) => {
  selectedScenario = event.target.value;
  // scenarioStartTime = new Date(); // REMOVED: Don't start timer automatically on change
  scenarioStartTime = null; // Reset timer state when changing scenarios
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
canvas.addEventListener("dblclick", onCanvasDoubleClick);

function onCanvasDoubleClick(event) {
  const scenario = scenarios[selectedScenario];

  // Start timer on first interaction if scenario is not completed and timer hasn't started
  if (
    !scenario.completed &&
    !scenarioStartTime &&
    !pastAttemptsByScenario[selectedScenario]
  ) {
    scenarioStartTime = new Date();
    console.log(
      `Timer started for ${selectedScenario} at ${scenarioStartTime}`
    ); // Optional: for debugging
  }

  // Convert event.offsetX/Y (current canvas coords) to original unscaled coordinates
  const originalEventX = event.offsetX / currentScale;
  const originalEventY = event.offsetY / currentScale;

  for (const pointName in scenario.points) {
    const point = scenario.points[pointName]; // point.x, point.y are unscaled
    const distance = Math.hypot(
      originalEventX - point.x,
      originalEventY - point.y
    );

    // 50 is the click radius in the original coordinate system
    if (distance < 50) {
      moveGirl(pointName);
      break;
    }
  }
}
