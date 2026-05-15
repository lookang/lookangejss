/**
 * K-Nearest Neighbor Algorithm Visualization
 * Interactive educational tool for understanding KNN classification
 * Implements cognitive load theory and multimedia learning principles
 */

class KNNVisualization {
    constructor() {
        // Initialize canvas and context for visualization
        this.canvas = document.getElementById('visualization-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Algorithm parameters
        this.k = 3;
        this.numPoints = 50;
        this.numCategories = 3;
        this.is3D = false;
        
        // 3D rotation and scaling parameters - Added rotationZ
        this.rotationX = 45;
        this.rotationY = 45;
        this.rotationZ = 0; // New Z-axis rotation parameter
        this.scale = 1;
        
        // Data storage
        this.dataPoints = [];
        this.testPoint = { x: 0, y: 0, z: 0 };
        this.nearestNeighbors = [];
        this.prediction = null;
        
        // Color palette for different categories (following design principles)
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        
        // Initialize the visualization
        this.initializeCanvas();
        this.generateRandomData();
        this.setupEventListeners();
        this.render();
    }
    
    /**
     * Initialize canvas dimensions and handle responsive design
     */
    initializeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight - 100; // Account for controls
        
        // Handle window resize for responsive design
        window.addEventListener('resize', () => {
            this.canvas.width = container.clientWidth;
            this.canvas.height = container.clientHeight - 100;
            this.render();
        });
    }
    
    /**
     * Generate random training data points with different categories
     * Applies cognitive load theory by using meaningful spatial distribution
     */
    generateRandomData() {
        this.dataPoints = [];
        
        for (let i = 0; i < this.numPoints; i++) {
            // Create clusters for better visualization and understanding
            const category = Math.floor(Math.random() * this.numCategories);
            const clusterCenterX = (category % 2) * 6 - 3;
            const clusterCenterY = Math.floor(category / 2) * 6 - 3;
            const clusterCenterZ = (category % 3) * 4 - 2;
            
            const point = {
                x: clusterCenterX + (Math.random() - 0.5) * 4,
                y: clusterCenterY + (Math.random() - 0.5) * 4,
                z: this.is3D ? clusterCenterZ + (Math.random() - 0.5) * 3 : 0,
                category: category
            };
            
            this.dataPoints.push(point);
        }
    }
    
    /**
     * Setup event listeners for interactive controls
     * Implements immediate feedback principle from multimedia learning
     */
    setupEventListeners() {
        // K value slider
        const kSlider = document.getElementById('k-slider');
        const kValue = document.getElementById('k-value');
        kSlider.addEventListener('input', (e) => {
            this.k = parseInt(e.target.value);
            kValue.textContent = this.k;
            this.updateClassification();
        });
        
        // Number of points slider
        const pointsSlider = document.getElementById('points-slider');
        const pointsValue = document.getElementById('points-value');
        pointsSlider.addEventListener('input', (e) => {
            this.numPoints = parseInt(e.target.value);
            pointsValue.textContent = this.numPoints;
            this.generateRandomData();
            this.render();
        });
        
        // Categories slider
        const categoriesSlider = document.getElementById('categories');
        const categoriesValue = document.getElementById('categories-value');
        categoriesSlider.addEventListener('input', (e) => {
            this.numCategories = parseInt(e.target.value);
            categoriesValue.textContent = this.numCategories;
            this.generateRandomData();
            this.render();
        });
        
        // Action buttons
        document.getElementById('randomize-btn').addEventListener('click', () => {
            this.generateRandomData();
            this.render();
        });
        
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetParameters();
        });
        
        document.getElementById('toggle-3d-btn').addEventListener('click', () => {
            this.toggle3D();
        });
        
        // Test point inputs
        document.getElementById('test-x').addEventListener('input', (e) => {
            this.testPoint.x = parseFloat(e.target.value) || 0;
            this.render();
        });
        
        document.getElementById('test-y').addEventListener('input', (e) => {
            this.testPoint.y = parseFloat(e.target.value) || 0;
            this.render();
        });
        
        document.getElementById('test-z').addEventListener('input', (e) => {
            this.testPoint.z = parseFloat(e.target.value) || 0;
            this.render();
        });
        
        // Classification button
        document.getElementById('classify-btn').addEventListener('click', () => {
            this.classifyTestPoint();
        });
        
        // 3D rotation controls - Added Z-axis rotation event listener
        document.getElementById('rotate-x').addEventListener('input', (e) => {
            this.rotationX = parseFloat(e.target.value);
            this.render();
        });
        
        document.getElementById('rotate-y').addEventListener('input', (e) => {
            this.rotationY = parseFloat(e.target.value);
            this.render();
        });
        
        // New Z-axis rotation control
        document.getElementById('rotate-z').addEventListener('input', (e) => {
            this.rotationZ = parseFloat(e.target.value);
            this.render();
        });
        
        document.getElementById('scale-slider').addEventListener('input', (e) => {
            this.scale = parseFloat(e.target.value);
            this.render();
        });
        
        // Canvas click interaction for placing test points
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Convert screen coordinates to data coordinates
            const dataCoords = this.screenToDataCoordinates(x, y);
            this.testPoint.x = dataCoords.x;
            this.testPoint.y = dataCoords.y;
            
            // Update input fields
            document.getElementById('test-x').value = this.testPoint.x.toFixed(1);
            document.getElementById('test-y').value = this.testPoint.y.toFixed(1);
            
            this.render();
        });
    }
    
    /**
     * Convert screen coordinates to data coordinates
     */
    screenToDataCoordinates(screenX, screenY) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const scale = Math.min(this.canvas.width, this.canvas.height) / 20 * this.scale;
        
        return {
            x: (screenX - centerX) / scale,
            y: (centerY - screenY) / scale
        };
    }
    
    /**
     * Convert data coordinates to screen coordinates for rendering
     * Enhanced with Z-axis rotation support
     */
    dataToScreenCoordinates(point) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const scale = Math.min(this.canvas.width, this.canvas.height) / 20 * this.scale;
        
        if (this.is3D) {
            // Apply 3D rotation transformations including Z-axis rotation
            const radX = this.rotationX * Math.PI / 180;
            const radY = this.rotationY * Math.PI / 180;
            const radZ = this.rotationZ * Math.PI / 180; // New Z-axis rotation
            
            let x = point.x;
            let y = point.y;
            let z = point.z;
            
            // Rotate around Z axis first
            const x1 = x * Math.cos(radZ) - y * Math.sin(radZ);
            const y1 = x * Math.sin(radZ) + y * Math.cos(radZ);
            const z1 = z;
            
            // Rotate around X axis
            const x2 = x1;
            const y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX);
            const z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX);
            
            // Rotate around Y axis
            const x3 = x2 * Math.cos(radY) + z2 * Math.sin(radY);
            const y3 = y2;
            const z3 = -x2 * Math.sin(radY) + z2 * Math.cos(radY);
            
            // Project to 2D screen
            const perspective = 1 / (1 + z3 * 0.1);
            return {
                x: centerX + x3 * scale * perspective,
                y: centerY - y3 * scale * perspective,
                size: perspective,
                z: z3 // Keep z for depth sorting
            };
        } else {
            return {
                x: centerX + point.x * scale,
                y: centerY - point.y * scale,
                size: 1,
                z: 0
            };
        }
    }
    
    /**
     * Apply 3D transformations to axis vectors for grid rendering
     * New function to handle axis rotation
     */
    transformAxisVector(vector) {
        if (!this.is3D) return vector;
        
        const radX = this.rotationX * Math.PI / 180;
        const radY = this.rotationY * Math.PI / 180;
        const radZ = this.rotationZ * Math.PI / 180;
        
        let x = vector.x;
        let y = vector.y;
        let z = vector.z;
        
        // Apply same rotation sequence as data points
        // Rotate around Z axis
        const x1 = x * Math.cos(radZ) - y * Math.sin(radZ);
        const y1 = x * Math.sin(radZ) + y * Math.cos(radZ);
        const z1 = z;
        
        // Rotate around X axis
        const x2 = x1;
        const y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX);
        const z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX);
        
        // Rotate around Y axis
        const x3 = x2 * Math.cos(radY) + z2 * Math.sin(radY);
        const y3 = y2;
        const z3 = -x2 * Math.sin(radY) + z2 * Math.cos(radY);
        
        return { x: x3, y: y3, z: z3 };
    }
    
    /**
     * Calculate Euclidean distance between two points
     * Core algorithm component for KNN
     */
    calculateDistance(point1, point2) {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        const dz = this.is3D ? (point1.z - point2.z) : 0;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    
    /**
     * Implement K-Nearest Neighbor classification algorithm
     * Educational focus on algorithm transparency
     */
    classifyTestPoint() {
        // Calculate distances to all training points
        const distances = this.dataPoints.map(point => ({
            point: point,
            distance: this.calculateDistance(this.testPoint, point)
        }));
        
        // Sort by distance and take k nearest neighbors
        distances.sort((a, b) => a.distance - b.distance);
        this.nearestNeighbors = distances.slice(0, this.k);
        
        // Count votes from nearest neighbors
        const votes = {};
        this.nearestNeighbors.forEach(neighbor => {
            const category = neighbor.point.category;
            votes[category] = (votes[category] || 0) + 1;
        });
        
        // Find the category with most votes
        let maxVotes = 0;
        let predictedCategory = 0;
        for (const category in votes) {
            if (votes[category] > maxVotes) {
                maxVotes = votes[category];
                predictedCategory = parseInt(category);
            }
        }
        
        this.prediction = {
            category: predictedCategory,
            confidence: maxVotes / this.k,
            votes: votes
        };
        
        this.updateResults();
        this.render();
    }
    
    /**
     * Update classification results display
     * Implements feedback principle from multimedia learning
     */
    updateResults() {
        const resultDiv = document.getElementById('classification-result');
        const neighborsDiv = document.getElementById('nearest-neighbors');
        
        if (this.prediction) {
            resultDiv.innerHTML = `
                <span style="color: ${this.colors[this.prediction.category]}">
                    Predicted Category: ${this.prediction.category + 1}
                </span>
                <br>Confidence: ${(this.prediction.confidence * 100).toFixed(1)}%
            `;
            
            const neighborInfo = this.nearestNeighbors.map(n => 
                `Cat ${n.point.category + 1} (d=${n.distance.toFixed(2)})`
            ).join(', ');
            
            neighborsDiv.textContent = `K=${this.k} neighbors: ${neighborInfo}`;
        } else {
            resultDiv.textContent = 'Click "Classify" to see prediction';
            neighborsDiv.textContent = '';
        }
    }
    
    /**
     * Update classification when parameters change
     */
    updateClassification() {
        if (this.prediction) {
            this.classifyTestPoint();
        }
    }
    
    /**
     * Toggle between 2D and 3D visualization modes
     */
    toggle3D() {
        this.is3D = !this.is3D;
        const rotationControls = document.getElementById('rotation-controls');
        const testZGroup = document.getElementById('test-z-group');
        const toggleBtn = document.getElementById('toggle-3d-btn');
        
        if (this.is3D) {
            rotationControls.style.display = 'flex';
            testZGroup.style.display = 'flex';
            toggleBtn.textContent = 'Toggle 2D';
        } else {
            rotationControls.style.display = 'none';
            testZGroup.style.display = 'none';
            toggleBtn.textContent = 'Toggle 3D';
            this.testPoint.z = 0;
        }
        
        this.generateRandomData();
        this.render();
    }
    
    /**
     * Reset all parameters to default values
     * Updated to include Z-axis rotation reset
     */
    resetParameters() {
        this.k = 3;
        this.numPoints = 50;
        this.numCategories = 3;
        this.rotationX = 45;
        this.rotationY = 45;
        this.rotationZ = 0; // Reset Z-axis rotation
        this.scale = 1;
        this.testPoint = { x: 0, y: 0, z: 0 };
        this.prediction = null;
        this.nearestNeighbors = [];
        
        // Update UI controls including Z-axis rotation
        document.getElementById('k-slider').value = 3;
        document.getElementById('k-value').textContent = 3;
        document.getElementById('points-slider').value = 50;
        document.getElementById('points-value').textContent = 50;
        document.getElementById('categories').value = 3;
        document.getElementById('categories-value').textContent = 3;
        document.getElementById('test-x').value = 0;
        document.getElementById('test-y').value = 0;
        document.getElementById('test-z').value = 0;
        document.getElementById('rotate-x').value = 45;
        document.getElementById('rotate-y').value = 45;
        document.getElementById('rotate-z').value = 0; // Reset Z-axis rotation control
        document.getElementById('scale-slider').value = 1;
        
        this.generateRandomData();
        this.updateResults();
        this.render();
    }
    
    /**
     * Main rendering function for visualization
     * Implements visual design principles for educational effectiveness
     */
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw coordinate grid and axes for spatial reference (now rotates with data)
        this.drawGrid();
        
        // Sort points by depth for proper 3D rendering
        const allPoints = [...this.dataPoints];
        if (this.nearestNeighbors.length > 0) {
            allPoints.push(this.testPoint);
        }
        
        const screenPoints = allPoints.map(point => ({
            point: point,
            screen: this.dataToScreenCoordinates(point)
        }));
        
        screenPoints.sort((a, b) => (b.screen.z || 0) - (a.screen.z || 0));
        
        // Draw training data points
        screenPoints.forEach(({ point, screen }) => {
            if (point === this.testPoint) return; // Skip test point for now
            
            const isNeighbor = this.nearestNeighbors.some(n => n.point === point);
            this.drawDataPoint(screen, point.category, isNeighbor);
        });
        
        // Draw connections to nearest neighbors
        if (this.nearestNeighbors.length > 0) {
            const testScreenCoords = this.dataToScreenCoordinates(this.testPoint);
            this.nearestNeighbors.forEach(neighbor => {
                const screenCoords = this.dataToScreenCoordinates(neighbor.point);
                this.drawConnection(testScreenCoords, screenCoords);
            });
        }
        
        // Draw test point on top
        if (this.nearestNeighbors.length > 0 || this.testPoint.x !== 0 || this.testPoint.y !== 0 || this.testPoint.z !== 0) {
            const testScreenCoords = this.dataToScreenCoordinates(this.testPoint);
            this.drawTestPoint(testScreenCoords);
        }
        
        // Draw legend
        this.drawLegend();
    }
    
    /**
     * Draw coordinate grid and axes for spatial reference
     * Enhanced to rotate grid and axes along with the data points
     */
    drawGrid() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const scale = Math.min(this.canvas.width, this.canvas.height) / 20 * this.scale;
        
        // Draw grid lines that rotate with the coordinate system
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 1;
        
        // Create grid lines in 3D space, then project to screen
        for (let i = -10; i <= 10; i++) {
            if (i === 0) continue; // Skip center lines
            
            // Grid lines parallel to X-axis (varying Y)
            const startPoint1 = this.dataToScreenCoordinates({ x: -10, y: i, z: 0 });
            const endPoint1 = this.dataToScreenCoordinates({ x: 10, y: i, z: 0 });
            
            this.ctx.beginPath();
            this.ctx.moveTo(startPoint1.x, startPoint1.y);
            this.ctx.lineTo(endPoint1.x, endPoint1.y);
            this.ctx.stroke();
            
            // Grid lines parallel to Y-axis (varying X)
            const startPoint2 = this.dataToScreenCoordinates({ x: i, y: -10, z: 0 });
            const endPoint2 = this.dataToScreenCoordinates({ x: i, y: 10, z: 0 });
            
            this.ctx.beginPath();
            this.ctx.moveTo(startPoint2.x, startPoint2.y);
            this.ctx.lineTo(endPoint2.x, endPoint2.y);
            this.ctx.stroke();
        }
        
        // Draw coordinate axes that rotate with the system
        this.ctx.strokeStyle = '#999';
        this.ctx.lineWidth = 3;
        
        // X-axis (red)
        const xAxisStart = this.dataToScreenCoordinates({ x: -10, y: 0, z: 0 });
        const xAxisEnd = this.dataToScreenCoordinates({ x: 10, y: 0, z: 0 });
        this.ctx.strokeStyle = '#ff4444';
        this.ctx.beginPath();
        this.ctx.moveTo(xAxisStart.x, xAxisStart.y);
        this.ctx.lineTo(xAxisEnd.x, xAxisEnd.y);
        this.ctx.stroke();
        
        // Y-axis (green)
        const yAxisStart = this.dataToScreenCoordinates({ x: 0, y: -10, z: 0 });
        const yAxisEnd = this.dataToScreenCoordinates({ x: 0, y: 10, z: 0 });
        this.ctx.strokeStyle = '#44ff44';
        this.ctx.beginPath();
        this.ctx.moveTo(yAxisStart.x, yAxisStart.y);
        this.ctx.lineTo(yAxisEnd.x, yAxisEnd.y);
        this.ctx.stroke();
        
        // Z-axis (blue) - only visible in 3D mode
        if (this.is3D) {
            const zAxisStart = this.dataToScreenCoordinates({ x: 0, y: 0, z: -10 });
            const zAxisEnd = this.dataToScreenCoordinates({ x: 0, y: 0, z: 10 });
            this.ctx.strokeStyle = '#4444ff';
            this.ctx.beginPath();
            this.ctx.moveTo(zAxisStart.x, zAxisStart.y);
            this.ctx.lineTo(zAxisEnd.x, zAxisEnd.y);
            this.ctx.stroke();
        }
        
        // Draw axis labels
        this.ctx.fillStyle = '#666';
        this.ctx.font = '12px Arial';
        
        // X-axis label
        const xLabelPos = this.dataToScreenCoordinates({ x: 11, y: 0, z: 0 });
        this.ctx.fillText('X', xLabelPos.x, xLabelPos.y);
        
        // Y-axis label
        const yLabelPos = this.dataToScreenCoordinates({ x: 0, y: 11, z: 0 });
        this.ctx.fillText('Y', yLabelPos.x, yLabelPos.y);
        
        // Z-axis label (3D only)
        if (this.is3D) {
            const zLabelPos = this.dataToScreenCoordinates({ x: 0, y: 0, z: 11 });
            this.ctx.fillText('Z', zLabelPos.x, zLabelPos.y);
        }
    }
    
    /**
     * Draw individual data points with category-based coloring
     */
    drawDataPoint(screenCoords, category, isNeighbor) {
        const radius = isNeighbor ? 8 * screenCoords.size : 6 * screenCoords.size;
        
        this.ctx.fillStyle = this.colors[category];
        this.ctx.strokeStyle = isNeighbor ? '#333' : '#fff';
        this.ctx.lineWidth = isNeighbor ? 3 : 2;
        
        this.ctx.beginPath();
        this.ctx.arc(screenCoords.x, screenCoords.y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Add glow effect for neighbors
        if (isNeighbor) {
            this.ctx.shadowColor = this.colors[category];
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(screenCoords.x, screenCoords.y, radius, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
    }
    
    /**
     * Draw test point with distinctive styling
     */
    drawTestPoint(screenCoords) {
        const radius = 10 * screenCoords.size;
        
        // Outer ring
        this.ctx.fillStyle = this.prediction ? this.colors[this.prediction.category] : '#333';
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 3;
        
        this.ctx.beginPath();
        this.ctx.arc(screenCoords.x, screenCoords.y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Inner cross to distinguish test point
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(screenCoords.x - 6, screenCoords.y);
        this.ctx.lineTo(screenCoords.x + 6, screenCoords.y);
        this.ctx.moveTo(screenCoords.x, screenCoords.y - 6);
        this.ctx.lineTo(screenCoords.x, screenCoords.y + 6);
        this.ctx.stroke();
    }
    
    /**
     * Draw connections between test point and nearest neighbors
     */
    drawConnection(from, to) {
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]);
    }
    
    /**
     * Draw legend for category colors
     */
    drawLegend() {
        const legendX = 10;
        const legendY = 10;
        const itemHeight = 20;
        
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.fillRect(legendX, legendY, 100, this.numCategories * itemHeight + 10);
        
        for (let i = 0; i < this.numCategories; i++) {
            const y = legendY + 15 + i * itemHeight;
            
            // Color circle
            this.ctx.fillStyle = this.colors[i];
            this.ctx.beginPath();
            this.ctx.arc(legendX + 15, y, 6, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Category label
            this.ctx.fillStyle = '#333';
            this.ctx.fillText(`Category ${i + 1}`, legendX + 30, y + 4);
        }
    }
}

// Initialize the visualization when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new KNNVisualization();
});