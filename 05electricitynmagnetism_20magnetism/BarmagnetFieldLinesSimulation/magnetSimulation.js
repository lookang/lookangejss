document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('magnetCanvas');
  const ctx = canvas.getContext('2d');
  const slider = document.getElementById('fieldLineSlider');
  const numFieldLinesDisplay = document.getElementById('numFieldLinesDisplay');
  const playButton = document.getElementById('playButton');
  const pauseButton = document.getElementById('pauseButton');
  const resetButton = document.getElementById('resetButton');

  const magnetLength = 100;
  const magnetWidth = 40;
  const magnetStrength = 5000;
  const magnetCenter = { x: canvas.width / 2, y: canvas.height / 2 };
  let numFieldLines = parseInt(slider.value);
  let animationId;
  let isAnimating = false;
  let isDragging = false;

  const compass = {
    x: magnetCenter.x + 150,
    y: magnetCenter.y,
    radius: 40, // Doubled the size
  };

  const drawMagnet = () => {
    ctx.fillStyle = '#cccccc';
    ctx.fillRect(magnetCenter.x - magnetLength / 2, magnetCenter.y - magnetWidth / 2, magnetLength, magnetWidth);
    ctx.fillStyle = 'blue';
    ctx.fillRect(magnetCenter.x - magnetLength / 2, magnetCenter.y - magnetWidth / 2, magnetLength / 2, magnetWidth);
    ctx.fillStyle = 'red';
    ctx.fillRect(magnetCenter.x, magnetCenter.y - magnetWidth / 2, magnetLength / 2, magnetWidth);

    ctx.fillStyle = '#000000';
    ctx.font = '20px Arial';
    ctx.fillText('S', magnetCenter.x - magnetLength / 2 + 10, magnetCenter.y + 7);
    ctx.fillText('N', magnetCenter.x + magnetLength / 2 - 20, magnetCenter.y + 7);
  };

  const calculateField = (x, y) => {
    const northPole = { x: magnetCenter.x - magnetLength / 4, y: magnetCenter.y };
    const southPole = { x: magnetCenter.x + magnetLength / 4, y: magnetCenter.y };

    const rNorth = Math.sqrt((x - northPole.x) ** 2 + (y - northPole.y) ** 2);
    const rSouth = Math.sqrt((x - southPole.x) ** 2 + (y - southPole.y) ** 2);

    const factor = magnetStrength / (4 * Math.PI);

    let Bx, By;

    if (x > magnetCenter.x - magnetLength / 2 && x < magnetCenter.x + magnetLength / 2 &&
        y > magnetCenter.y - magnetWidth / 2 && y < magnetCenter.y + magnetWidth / 2) {
      // Inside the magnet, field points from South to North
      Bx = factor / 1000;
      By = 0;
    } else {
      // Outside the magnet
      Bx = factor * ((southPole.x - x) / rSouth ** 3 - (northPole.x - x) / rNorth ** 3);
      By = factor * ((southPole.y - y) / rSouth ** 3 - (northPole.y - y) / rNorth ** 3);
    }

    return { x: Bx, y: By };
  };

  const drawArrow = (x, y, dx, dy) => {
    const angle = Math.atan2(dy, dx);
    const length = 5;
    ctx.moveTo(x, y);
    ctx.lineTo(x + length * Math.cos(angle - Math.PI / 6), y + length * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x, y);
    ctx.lineTo(x + length * Math.cos(angle + Math.PI / 6), y + length * Math.sin(angle + Math.PI / 6));
  };

  const traceFieldLine = (startX, startY, direction) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);

    let x = startX;
    let y = startY;
    const stepSize = 2;
    const maxSteps = 500;

    for (let i = 0; i < maxSteps; i++) {
      const field = calculateField(x, y);
      const magnitude = Math.sqrt(field.x ** 2 + field.y ** 2);

      if (magnitude === 0) break;

      const dx = direction * stepSize * field.x / magnitude;
      const dy = direction * stepSize * field.y / magnitude;

      x += dx;
      y += dy;

      if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) break;

      ctx.lineTo(x, y);

      if (i % 20 === 0) drawArrow(x, y, field.x, field.y);
    }

    ctx.stroke();
  };

  const drawFieldLines = () => {
    ctx.strokeStyle = 'rgba(0, 0, 255, 0.4)';
    ctx.lineWidth = 1;

    const linesPerSide = Math.floor(numFieldLines / 2);
    const startPoints = [
      ...Array(linesPerSide)
        .fill()
        .map((_, i) => ({ x: 0, y: (i + 1) * canvas.height / (linesPerSide + 1) })),
      ...Array(linesPerSide)
        .fill()
        .map((_, i) => ({ x: canvas.width, y: (i + 1) * canvas.height / (linesPerSide + 1) })),
      ...Array(linesPerSide)
        .fill()
        .map((_, i) => ({ x: (i + 1) * canvas.width / (linesPerSide + 1), y: 0 })),
      ...Array(linesPerSide)
        .fill()
        .map((_, i) => ({ x: (i + 1) * canvas.width / (linesPerSide + 1), y: canvas.height }))
    ];

    startPoints.forEach((point) => {
      traceFieldLine(point.x, point.y, 1);
      traceFieldLine(point.x, point.y, -1);
    });
  };

  const drawCompass = () => {
    ctx.beginPath();
    ctx.arc(compass.x, compass.y, compass.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    const field = calculateField(compass.x, compass.y);
    const B = Math.sqrt(field.x ** 2 + field.y ** 2).toFixed(2);
    let angle = (Math.PI - Math.atan2(field.y, field.x)) * 180 / Math.PI;
    // Reverse the arrow direction inside the magnet
    if (compass.x > magnetCenter.x - magnetLength / 2 && compass.x < magnetCenter.x + magnetLength / 2 &&
      compass.y > magnetCenter.y - magnetWidth / 2 && compass.y < magnetCenter.y + magnetWidth / 2) {
        angle = (0 - Math.atan2(field.y, field.x)) * 180 / Math.PI;
      }
    ctx.fillStyle = '#000000';
    ctx.font = '14px Arial';
    ctx.fillText(`${B} T`, compass.x - 30, compass.y - 5); // Adjusted position
    ctx.fillText(`${angle.toFixed(2)}°`, compass.x - 30, compass.y + 15); // Adjusted position

    const arrowAngle = Math.atan2(field.y, field.x) + Math.PI; // Reverse the arrow direction
    
    ctx.beginPath();
    ctx.moveTo(compass.x, compass.y);
    if (compass.x > magnetCenter.x - magnetLength / 2 && compass.x < magnetCenter.x + magnetLength / 2 &&
        compass.y > magnetCenter.y - magnetWidth / 2 && compass.y < magnetCenter.y + magnetWidth / 2) {
        // Inside the magnet, reverse the arrow direction
        ctx.lineTo(compass.x - compass.radius * Math.cos(arrowAngle), compass.y - compass.radius * Math.sin(arrowAngle));
    } else {
        ctx.lineTo(compass.x + compass.radius * Math.cos(arrowAngle), compass.y + compass.radius * Math.sin(arrowAngle));
    }
    ctx.strokeStyle = 'orange';
    ctx.stroke();

    // Draw the arrowhead pointing in the direction opposite to the B field
    const headLength = 10;
    const headAngle = Math.PI / 6;
    ctx.beginPath();
    if (compass.x > magnetCenter.x - magnetLength / 2 && compass.x < magnetCenter.x + magnetLength / 2 &&
      compass.y > magnetCenter.y - magnetWidth / 2 && compass.y < magnetCenter.y + magnetWidth / 2) {
      // Inside the magnet, reverse the arrowhead direction
      ctx.moveTo(compass.x - compass.radius * Math.cos(arrowAngle), compass.y - compass.radius * Math.sin(arrowAngle));
      ctx.lineTo(compass.x - compass.radius * Math.cos(arrowAngle) + headLength * Math.cos(arrowAngle - headAngle), compass.y - compass.radius * Math.sin(arrowAngle) + headLength * Math.sin(arrowAngle - headAngle));
      ctx.moveTo(compass.x - compass.radius * Math.cos(arrowAngle), compass.y - compass.radius * Math.sin(arrowAngle));
      ctx.lineTo(compass.x - compass.radius * Math.cos(arrowAngle) + headLength * Math.cos(arrowAngle + headAngle), compass.y - compass.radius * Math.sin(arrowAngle) + headLength * Math.sin(arrowAngle + headAngle));
  } else {
      ctx.moveTo(compass.x + compass.radius * Math.cos(arrowAngle), compass.y + compass.radius * Math.sin(arrowAngle));
      ctx.lineTo(compass.x + compass.radius * Math.cos(arrowAngle) - headLength * Math.cos(arrowAngle - headAngle), compass.y + compass.radius * Math.sin(arrowAngle) - headLength * Math.sin(arrowAngle - headAngle));
      ctx.moveTo(compass.x + compass.radius * Math.cos(arrowAngle), compass.y + compass.radius * Math.sin(arrowAngle));
      ctx.lineTo(compass.x + compass.radius * Math.cos(arrowAngle) - headLength * Math.cos(arrowAngle + headAngle), compass.y + compass.radius * Math.sin(arrowAngle) - headLength * Math.sin(arrowAngle + headAngle));
  }
    ctx.strokeStyle = 'orange';
    ctx.stroke();
};








  const animateCompass = () => {
    if (!isAnimating) return;

    const field = calculateField(compass.x, compass.y);
    const magnitude = Math.sqrt(field.x ** 2 + field.y ** 2);
    const stepSize = 1;

    if (magnitude !== 0) {
      if (compass.x > magnetCenter.x - magnetLength / 2 && compass.x < magnetCenter.x + magnetLength / 2 &&
          compass.y > magnetCenter.y - magnetWidth / 2 && compass.y < magnetCenter.y + magnetWidth / 2) {
        // Inside the magnet, move to the right (positive x direction)
        compass.x += stepSize;
      } else {
        compass.x -= stepSize * field.x / magnitude;
        compass.y -= stepSize * field.y / magnitude;
      }
    }

    draw();
    animationId = requestAnimationFrame(animateCompass);
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFieldLines();
    drawMagnet();
    drawCompass();
  };

  slider.addEventListener('input', (event) => {
    numFieldLines = Number(event.target.value);
    numFieldLinesDisplay.textContent = numFieldLines;
    draw();
  });

  playButton.addEventListener('click', () => {
    if (!isAnimating) {
      isAnimating = true;
      animateCompass();
    }
  });

  pauseButton.addEventListener('click', () => {
    if (isAnimating) {
      isAnimating = false;
      cancelAnimationFrame(animationId);
    }
  });

  resetButton.addEventListener('click', () => {
    isAnimating = false;
    cancelAnimationFrame(animationId);
    compass.x = magnetCenter.x + 150;
    compass.y = magnetCenter.y;
    draw();
  });

  canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (Math.sqrt((mouseX - compass.x) ** 2 + (mouseY - compass.y) ** 2) < compass.radius) {
      isDragging = true;
    }
  });

  canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
      const rect = canvas.getBoundingClientRect();
      compass.x = event.clientX - rect.left;
      compass.y = event.clientY - rect.top;
      draw();
    }
  });

  canvas.addEventListener('mouseup', () => {
    isDragging = false;
  });

  canvas.addEventListener('touchstart', (event) => {
    const rect = canvas.getBoundingClientRect();
    const touchX = event.touches[0].clientX - rect.left;
    const touchY = event.touches[0].clientY - rect.top;

    if (Math.sqrt((touchX - compass.x) ** 2 + (touchY - compass.y) ** 2) < compass.radius) {
      isDragging = true;
    }
  });

  canvas.addEventListener('touchmove', (event) => {
    if (isDragging) {
      const rect = canvas.getBoundingClientRect();
      compass.x = event.touches[0].clientX - rect.left;
      compass.y = event.touches[0].clientY - rect.top;
      draw();
    }
  });

  canvas.addEventListener('touchend', () => {
    isDragging = false;
  });

  draw();
});
