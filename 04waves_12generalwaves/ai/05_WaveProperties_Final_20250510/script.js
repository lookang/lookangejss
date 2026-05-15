// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to HTML elements
    const timeCanvas = document.getElementById('timeGraph');
    const distanceCanvas = document.getElementById('distanceGraph');
    const wavelengthSlider = document.getElementById('wavelength');
    const amplitudeSlider = document.getElementById('amplitude');
    const periodSlider = document.getElementById('period');
    const frequencySlider = document.getElementById('frequency');
    const wavelengthValue = document.getElementById('wavelengthValue');
    const amplitudeValue = document.getElementById('amplitudeValue');
    const periodValue = document.getElementById('periodValue');
    const frequencyValue = document.getElementById('frequencyValue');
    const waveSpeedValue = document.getElementById('waveSpeedValue');
    const resetButton = document.getElementById('resetButton');
    // Added reference to the Start/Pause button
    const startPauseButton = document.getElementById('startPauseButton');

    // Get the 2D context for both canvases
    const timeCtx = timeCanvas.getContext('2d');
    const distanceCtx = distanceCanvas.getContext('2d');

    // Default values for wave properties
    const defaultValues = {
        wavelength: 5.0,
        amplitude: 2.0,
        period: 2.0,
        frequency: 0.5
    };

    // Current values (will be updated by sliders)
    let wavelength = defaultValues.wavelength;
    let amplitude = defaultValues.amplitude;
    let period = defaultValues.period;
    let frequency = defaultValues.frequency;
    let waveSpeed = wavelength * frequency;

    // Animation variables
    let animationId;
    let startTime = Date.now();
    // Added animation state variable
    let isAnimating = true;
    // Added variable to store the time when animation was paused
    let pausedTime = 0;
    // Added variable to store the elapsed time before pausing
    let elapsedTimeBeforePause = 0;

    // Initialize the graphs
    function initializeGraphs() {
        // Set up the time graph
        drawTimeGraph();
        
        // Set up the distance graph
        drawDistanceGraph();
        
        // Update the wave speed display
        updateWaveSpeed();
    }

    // Function to draw grid lines on a canvas
    function drawGrid(ctx, width, height, majorStep, minorStep) {
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 0.5;
        
        // Draw minor grid lines
        ctx.beginPath();
        for (let x = 0; x <= width; x += minorStep) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += minorStep) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        ctx.stroke();
        
        // Draw major grid lines
        ctx.strokeStyle = '#a0a0a0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= width; x += majorStep) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += majorStep) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        ctx.stroke();
    }

    // Function to draw axes on a canvas
    function drawAxes(ctx, width, height) {
        const centerY = height / 2;
        
        // Draw x-axis
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
        
        // Draw y-axis
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);
        ctx.stroke();
        
        // Draw axis ticks and labels
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // X-axis ticks and labels
        for (let x = 50; x < width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, centerY - 5);
            ctx.lineTo(x, centerY + 5);
            ctx.stroke();
            
            // For time graph, show time in seconds
            if (ctx === timeCtx) {
                const timeValue = (x / 50).toFixed(1);
                ctx.fillText(timeValue, x, centerY + 20);
            } 
            // For distance graph, show distance in cm
            else if (ctx === distanceCtx) {
                const distanceValue = (x / 10).toFixed(1);
                ctx.fillText(distanceValue, x, centerY + 20);
            }
        }
        
        // Y-axis ticks and labels - Modified to show specific displacement values
        ctx.textAlign = 'right';
        
        // Define displacement values to show
        const displacementValues = [-3.0, -2.0, -1.0, 0, 1.0, 2.0, 3.0];
        
        // Draw tick marks and labels for each displacement value
        for (const value of displacementValues) {
            // Calculate y position for this displacement value
            const y = centerY - (value * 50); // 50 pixels = 1 cm
            
            // Draw tick mark
            ctx.beginPath();
            ctx.moveTo(-5, y);
            ctx.lineTo(5, y);
            ctx.stroke();
            
            // Draw label
            ctx.fillText(value.toFixed(1), -10, y + 5);
        }
    }

    // Function to draw the displacement-time graph
    function drawTimeGraph() {
        const width = timeCanvas.width;
        const height = timeCanvas.height;
        const centerY = height / 2;
        
        // Clear the canvas
        timeCtx.clearRect(0, 0, width, height);
        
        // Draw grid and axes
        drawGrid(timeCtx, width, height, 50, 10);
        drawAxes(timeCtx, width, height);
        
        // Calculate the current time offset for animation
        // Modified to account for paused state
        let currentTime;
        if (isAnimating) {
            currentTime = (Date.now() - startTime) / 1000 + elapsedTimeBeforePause; // in seconds
        } else {
            currentTime = elapsedTimeBeforePause; // Use the time when animation was paused
        }
        
        // Draw the sine wave for displacement vs time
        timeCtx.strokeStyle = '#3498db';
        timeCtx.lineWidth = 3;
        timeCtx.beginPath();
        
        for (let x = 0; x <= width; x++) {
            // Convert x-position to time
            const t = x / 50; // 50 pixels = 1 second
            
            // Calculate displacement using sine function
            // y = A * sin(2π * f * t)
            const displacement = amplitude * Math.sin(2 * Math.PI * frequency * (t - currentTime));
            
            // Convert displacement to y-position (invert because canvas y increases downward)
            const y = centerY - (displacement * 50); // 50 pixels = 1 cm
            
            if (x === 0) {
                timeCtx.moveTo(x, y);
            } else {
                timeCtx.lineTo(x, y);
            }
        }
        timeCtx.stroke();
    }

    // Function to draw the displacement-distance graph
    function drawDistanceGraph() {
        const width = distanceCanvas.width;
        const height = distanceCanvas.height;
        const centerY = height / 2;
        
        // Clear the canvas
        distanceCtx.clearRect(0, 0, width, height);
        
        // Draw grid and axes
        drawGrid(distanceCtx, width, height, 50, 10);
        drawAxes(distanceCtx, width, height);
        
        // Calculate the current time offset for animation
        // Modified to account for paused state
        let currentTime;
        if (isAnimating) {
            currentTime = (Date.now() - startTime) / 1000 + elapsedTimeBeforePause; // in seconds
        } else {
            currentTime = elapsedTimeBeforePause; // Use the time when animation was paused
        }
        
        // Draw the sine wave for displacement vs distance
        distanceCtx.strokeStyle = '#e74c3c';
        distanceCtx.lineWidth = 3;
        distanceCtx.beginPath();
        
        for (let x = 0; x <= width; x++) {
            // Convert x-position to distance
            const distance = x / 10; // 10 pixels = 1 cm
            
            // Calculate displacement using sine function
            // y = A * sin(2π * x / λ - 2π * f * t)
            // where x is distance, λ is wavelength, f is frequency, t is time
            const displacement = amplitude * Math.sin(2 * Math.PI * (distance / wavelength - frequency * currentTime));
            
            // Convert displacement to y-position (invert because canvas y increases downward)
            const y = centerY - (displacement * 50); // 50 pixels = 1 cm
            
            if (x === 0) {
                distanceCtx.moveTo(x, y);
            } else {
                distanceCtx.lineTo(x, y);
            }
        }
        distanceCtx.stroke();
        
        // Removed the arrow drawing code
        // Comment: The arrow drawing code has been removed as requested
    }

    // Function to draw an arrow
    function drawArrow(ctx, fromX, fromY, toX, toY) {
        const headLength = 10;
        const headAngle = Math.PI / 6; // 30 degrees
        
        // Draw the line
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, fromY);
        ctx.stroke();
        
        // Calculate the angle of the line
        const angle = Math.atan2(0, toX - fromX);
        
        // Draw the arrowhead
        ctx.beginPath();
        ctx.moveTo(toX, fromY);
        ctx.lineTo(toX - headLength * Math.cos(angle - headAngle), 
                  fromY - headLength * Math.sin(angle - headAngle));
        ctx.lineTo(toX - headLength * Math.cos(angle + headAngle), 
                  fromY - headLength * Math.sin(angle + headAngle));
        ctx.closePath();
        ctx.fillStyle = '#000';
        ctx.fill();
    }

    // Function to update the wave speed display
    function updateWaveSpeed() {
        waveSpeed = wavelength * frequency;
        waveSpeedValue.textContent = waveSpeed.toFixed(1);
    }

    // Function to animate the graphs
    function animate() {
        drawTimeGraph();
        drawDistanceGraph();
        animationId = requestAnimationFrame(animate);
    }

    // Modified function to toggle animation state
    function toggleAnimation() {
        if (isAnimating) {
            // Pause animation
            cancelAnimationFrame(animationId);
            pausedTime = Date.now();
            elapsedTimeBeforePause += (pausedTime - startTime) / 1000;
            startPauseButton.textContent = 'Start';
            startPauseButton.classList.add('paused');
        } else {
            // Resume animation
            startTime = Date.now();
            animate();
            startPauseButton.textContent = 'Pause';
            startPauseButton.classList.remove('paused');
        }
        isAnimating = !isAnimating;
        
        // Even when paused, update the graphs once to reflect current slider values
        if (!isAnimating) {
            drawTimeGraph();
            drawDistanceGraph();
        }
    }

    // Event listeners for sliders
    wavelengthSlider.addEventListener('input', function() {
        wavelength = parseFloat(this.value);
        wavelengthValue.textContent = wavelength.toFixed(1);
        updateWaveSpeed();
        
        // Added: Update graphs even when paused
        if (!isAnimating) {
            drawTimeGraph();
            drawDistanceGraph();
        }
    });

    amplitudeSlider.addEventListener('input', function() {
        amplitude = parseFloat(this.value);
        amplitudeValue.textContent = amplitude.toFixed(1);
        
        // Added: Update graphs even when paused
        if (!isAnimating) {
            drawTimeGraph();
            drawDistanceGraph();
        }
    });

    periodSlider.addEventListener('input', function() {
        period = parseFloat(this.value);
        periodValue.textContent = period.toFixed(1);
        
        // Update frequency when period changes (f = 1/T)
        frequency = 1 / period;
        frequencySlider.value = frequency.toFixed(1);
        frequencyValue.textContent = frequency.toFixed(1);
        
        updateWaveSpeed();
        
        // Added: Update graphs even when paused
        if (!isAnimating) {
            drawTimeGraph();
            drawDistanceGraph();
        }
    });

    frequencySlider.addEventListener('input', function() {
        frequency = parseFloat(this.value);
        frequencyValue.textContent = frequency.toFixed(1);
        
        // Update period when frequency changes (T = 1/f)
        period = 1 / frequency;
        periodSlider.value = period.toFixed(1);
        periodValue.textContent = period.toFixed(1);
        
        updateWaveSpeed();
        
        // Added: Update graphs even when paused
        if (!isAnimating) {
            drawTimeGraph();
            drawDistanceGraph();
        }
    });

    // Added event listener for Start/Pause button
    startPauseButton.addEventListener('click', toggleAnimation);

    // Reset button event listener
    resetButton.addEventListener('click', function() {
        // Reset all values to defaults
        wavelength = defaultValues.wavelength;
        amplitude = defaultValues.amplitude;
        period = defaultValues.period;
        frequency = defaultValues.frequency;
        
        // Update slider positions
        wavelengthSlider.value = wavelength;
        amplitudeSlider.value = amplitude;
        periodSlider.value = period;
        frequencySlider.value = frequency;
        
        // Update displayed values
        wavelengthValue.textContent = wavelength.toFixed(1);
        amplitudeValue.textContent = amplitude.toFixed(1);
        periodValue.textContent = period.toFixed(1);
        frequencyValue.textContent = frequency.toFixed(1);
        
        // Reset animation time and state
        startTime = Date.now();
        elapsedTimeBeforePause = 0;
        
        // If animation was paused, restart it
        if (!isAnimating) {
            isAnimating = true;
            animate();
            startPauseButton.textContent = 'Pause';
            startPauseButton.classList.remove('paused');
        }
        
        // Update wave speed
        updateWaveSpeed();
    });

    // Initialize and start the animation
    initializeGraphs();
    animate();
});