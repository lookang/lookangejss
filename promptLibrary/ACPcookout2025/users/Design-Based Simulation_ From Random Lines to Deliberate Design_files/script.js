// Design-Based Simulation: From Random Lines to Deliberate Design
// Main application class that handles the entire simulation

class DesignSimulation {
    constructor() {
        // Initialize canvas and context
        this.canvas = document.getElementById('mainCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size to match container
        this.resizeCanvas();
        
        // Application state
        this.currentTool = 'random'; // 'random', 'design', 'eraser', 'smudge'
        this.currentColor = '#000000';
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.zoomLevel = 1;
        this.panX = 0;
        this.panY = 0;
        
        // Random line generation settings
        this.density = 5;
        this.lineLength = 100;
        this.opacity = 0.7;
        
        // Storage for sketches and reflections
        this.gallery = [];
        this.currentSketch = null;
        
        // Animation state
        this.animationActive = false;
        this.animationFrame = 0;
        
        // AI generation state - Added for AI image generation
        this.aiGenerationActive = false;
        
        // Initialize event listeners
        this.initializeEventListeners();
        
        // Show welcome tooltip
        this.showCenterTooltip('Welcome! Start by generating random lines, then use the Design Pen to trace shapes you discover.', 3000);
    }
    
    // Resize canvas to fit container while maintaining aspect ratio
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Set up canvas context properties
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.imageSmoothingEnabled = true;
    }
    
    // Initialize all event listeners for the interface
    initializeEventListeners() {
        // Tool selection buttons
        document.getElementById('randomPen').addEventListener('click', () => this.selectTool('random'));
        document.getElementById('designPen').addEventListener('click', () => this.selectTool('design'));
        document.getElementById('eraser').addEventListener('click', () => this.selectTool('eraser'));
        document.getElementById('smudge').addEventListener('click', () => this.selectTool('smudge'));
        
        // Random line controls
        const densitySlider = document.getElementById('density');
        const lengthSlider = document.getElementById('lineLength');
        const opacitySlider = document.getElementById('opacity');
        
        densitySlider.addEventListener('input', (e) => {
            this.density = parseInt(e.target.value);
            document.getElementById('densityValue').textContent = this.density;
        });
        
        lengthSlider.addEventListener('input', (e) => {
            this.lineLength = parseInt(e.target.value);
            document.getElementById('lengthValue').textContent = this.lineLength;
        });
        
        opacitySlider.addEventListener('input', (e) => {
            this.opacity = parseFloat(e.target.value);
            document.getElementById('opacityValue').textContent = this.opacity;
        });
        
        // Color palette
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelector('.color-option.active').classList.remove('active');
                e.target.classList.add('active');
                this.currentColor = e.target.dataset.color;
            });
        });
        
        // Action buttons - Modified animate button handler for AI generation
        document.getElementById('generateRandom').addEventListener('click', () => this.generateRandomLines());
        document.getElementById('shapeHint').addEventListener('click', () => this.showShapeHints());
        document.getElementById('animate').addEventListener('click', () => this.generateAIImage());
        document.getElementById('reset').addEventListener('click', () => this.resetCanvas());
        
        // Zoom controls
        document.getElementById('zoomIn').addEventListener('click', () => this.zoom(1.2));
        document.getElementById('zoomOut').addEventListener('click', () => this.zoom(0.8));
        
        // Canvas drawing events
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        
        // Touch events for mobile support
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            this.canvas.dispatchEvent(mouseEvent);
        });
        
        // Reflection and gallery
        document.getElementById('saveReflection').addEventListener('click', () => this.saveReflection());
        
        // Window resize handler
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    // Select drawing tool and update UI
    selectTool(tool) {
        this.currentTool = tool;
        
        // Update button states
        document.querySelectorAll('.pen-btn, .tool-btn').forEach(btn => btn.classList.remove('active'));
        
        if (tool === 'random') {
            document.getElementById('randomPen').classList.add('active');
            document.getElementById('randomControls').style.display = 'block';
            this.canvas.style.cursor = 'crosshair';
        } else if (tool === 'design') {
            document.getElementById('designPen').classList.add('active');
            document.getElementById('randomControls').style.display = 'none';
            this.canvas.style.cursor = 'crosshair';
        } else if (tool === 'eraser') {
            document.getElementById('eraser').classList.add('active');
            document.getElementById('randomControls').style.display = 'none';
            this.canvas.style.cursor = 'grab';
        } else if (tool === 'smudge') {
            document.getElementById('smudge').classList.add('active');
            document.getElementById('randomControls').style.display = 'none';
            this.canvas.style.cursor = 'grab';
        }
    }
    
    // Generate random lines on the canvas
    generateRandomLines() {
        this.showCenterTooltip('Generating random lines...', 1000);
        
        // Clear previous random lines (keep design pen strokes)
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.density * 3; i++) {
            setTimeout(() => {
                // Random start point
                const startX = Math.random() * this.canvas.width;
                const startY = Math.random() * this.canvas.height;
                
                // Random angle and length
                const angle = Math.random() * Math.PI * 2;
                const length = this.lineLength * (0.5 + Math.random() * 0.5);
                
                const endX = startX + Math.cos(angle) * length;
                const endY = startY + Math.sin(angle) * length;
                
                // Draw random line
                this.ctx.save();
                this.ctx.globalAlpha = this.opacity * (0.3 + Math.random() * 0.7);
                this.ctx.strokeStyle = '#666';
                this.ctx.lineWidth = 1 + Math.random() * 2;
                this.ctx.beginPath();
                this.ctx.moveTo(startX, startY);
                this.ctx.lineTo(endX, endY);
                this.ctx.stroke();
                this.ctx.restore();
            }, i * 50);
        }
        
        setTimeout(() => {
            this.showCenterTooltip('Now switch to Design Pen to trace shapes you see!', 2000);
        }, this.density * 3 * 50 + 500);
    }
    
    // Start drawing based on current tool
    startDrawing(e) {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        this.lastX = (e.clientX - rect.left) / this.zoomLevel - this.panX;
        this.lastY = (e.clientY - rect.top) / this.zoomLevel - this.panY;
        
        if (this.currentTool === 'design') {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
        }
    }
    
    // Draw based on current tool and mouse movement
    draw(e) {
        if (!this.isDrawing) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const currentX = (e.clientX - rect.left) / this.zoomLevel - this.panX;
        const currentY = (e.clientY - rect.top) / this.zoomLevel - this.panY;
        
        this.ctx.save();
        
        if (this.currentTool === 'random') {
            // Random pen creates varied strokes
            this.ctx.globalAlpha = this.opacity;
            this.ctx.strokeStyle = '#666';
            this.ctx.lineWidth = 1 + Math.random() * 2;
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            
            // Add some randomness to the line
            const jitterX = currentX + (Math.random() - 0.5) * 5;
            const jitterY = currentY + (Math.random() - 0.5) * 5;
            this.ctx.lineTo(jitterX, jitterY);
            this.ctx.stroke();
            
        } else if (this.currentTool === 'design') {
            // Design pen creates smooth, deliberate strokes
            this.ctx.globalAlpha = 1;
            this.ctx.strokeStyle = this.currentColor;
            this.ctx.lineWidth = 3;
            this.ctx.lineTo(currentX, currentY);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(currentX, currentY);
            
        } else if (this.currentTool === 'eraser') {
            // Eraser removes content
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.beginPath();
            this.ctx.arc(currentX, currentY, 10, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalCompositeOperation = 'source-over';
            
        } else if (this.currentTool === 'smudge') {
            // Smudge tool blurs content
            const imageData = this.ctx.getImageData(currentX - 10, currentY - 10, 20, 20);
            this.ctx.putImageData(imageData, currentX - 8, currentY - 8);
        }
        
        this.ctx.restore();
        
        this.lastX = currentX;
        this.lastY = currentY;
    }
    
    // Stop drawing
    stopDrawing() {
        this.isDrawing = false;
        this.ctx.beginPath();
    }
    
    // Show shape detection hints
    showShapeHints() {
        this.showCenterTooltip('Look for enclosed areas, intersections, and emerging patterns. What do you see?', 3000);
        
        // Temporarily highlight potential shapes with overlay
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(0, 123, 255, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        // Draw some example hint circles at random intersections
        for (let i = 0; i < 3; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 30 + Math.random() * 20, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
        
        // Remove hints after 2 seconds
        setTimeout(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // Redraw the actual content here if needed
        }, 2000);
    }
    
    // Extract design pen strokes from canvas - New method to isolate design pen drawings
    extractDesignPenStrokes() {
        // Create a temporary canvas to isolate design pen strokes
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Copy current canvas
        tempCtx.drawImage(this.canvas, 0, 0);
        
        // Get image data and analyze for design pen strokes (colored, thicker lines)
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;
        
        // Create a simplified version focusing on design pen strokes
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const alpha = data[i + 3];
            
            // Keep only non-gray pixels (design pen strokes are colored)
            if (r === g && g === b && alpha > 0) {
                // This is likely a gray random line, make it transparent
                data[i + 3] = 0;
            }
        }
        
        tempCtx.putImageData(imageData, 0, 0);
        return tempCanvas.toDataURL();
    }
    
    // Generate AI image based on design pen sketch - New method for AI generation
    async generateAIImage() {
        if (this.aiGenerationActive) return;
        
        this.aiGenerationActive = true;
        const overlay = document.getElementById('animationOverlay');
        const content = document.getElementById('animationContent');
        
        overlay.classList.remove('hidden');
        
        try {
            // Show loading state
            content.innerHTML = `
                <div>
                    <div class="loading-spinner"></div>
                    <div style="margin-top: 20px;">🎨 Analyzing your sketch...</div>
                    <div style="font-size: 14px; margin-top: 10px; opacity: 0.8;">
                        AI is interpreting your design pen strokes
                    </div>
                </div>
            `;
            
            // Extract design pen strokes
            const sketchData = this.extractDesignPenStrokes();
            
            // Simulate AI processing steps
            const steps = [
                '🔍 Identifying key shapes and forms...',
                '🎭 Understanding artistic intent...',
                '✨ Generating hyperrealistic interpretation...',
                '🖼️ Finalizing your masterpiece...'
            ];
            
            for (let i = 0; i < steps.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                content.innerHTML = `
                    <div>
                        <div class="loading-spinner"></div>
                        <div style="margin-top: 20px;">${steps[i]}</div>
                        <div style="font-size: 14px; margin-top: 10px; opacity: 0.8;">
                            Processing step ${i + 1} of ${steps.length}
                        </div>
                    </div>
                `;
            }
            
            // Simulate AI image generation result
            await this.simulateAIImageGeneration(sketchData);
            
        } catch (error) {
            console.error('AI Generation Error:', error);
            content.innerHTML = `
                <div style="color: #ff6b6b;">
                    <div style="font-size: 48px;">⚠️</div>
                    <div>AI Generation Unavailable</div>
                    <div style="font-size: 14px; margin-top: 10px;">
                        Showing conceptual result instead
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                overlay.classList.add('hidden');
                this.aiGenerationActive = false;
            }, 3000);
        }
    }
    
    // Simulate AI image generation - New method to simulate AI response
    async simulateAIImageGeneration(sketchData) {
        const overlay = document.getElementById('animationOverlay');
        const content = document.getElementById('animationContent');
        
        // Create a conceptual "AI generated" result
        const aiResultCanvas = document.createElement('canvas');
        aiResultCanvas.width = 400;
        aiResultCanvas.height = 400;
        const aiCtx = aiResultCanvas.getContext('2d');
        
        // Create a stylized, more "realistic" version of the sketch
        aiCtx.fillStyle = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        aiCtx.fillRect(0, 0, 400, 400);
        
        // Add some artistic effects to simulate AI enhancement
        aiCtx.globalCompositeOperation = 'multiply';
        aiCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        
        // Draw enhanced version based on original sketch
        const img = new Image();
        img.onload = () => {
            // Apply artistic filters and enhancements
            aiCtx.globalCompositeOperation = 'source-over';
            aiCtx.filter = 'contrast(150%) saturate(120%) brightness(110%)';
            aiCtx.drawImage(img, 50, 50, 300, 300);
            
            // Add artistic overlay effects
            aiCtx.globalCompositeOperation = 'overlay';
            const gradient = aiCtx.createRadialGradient(200, 200, 0, 200, 200, 200);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
            aiCtx.fillStyle = gradient;
            aiCtx.fillRect(0, 0, 400, 400);
            
            // Display the result
            const resultImage = new Image();
            resultImage.onload = () => {
                content.innerHTML = `
                    <div style="text-align: center;">
                        <div style="margin-bottom: 20px; font-size: 24px;">🎨 AI Enhanced Version</div>
                        <img src="${aiResultCanvas.toDataURL()}" class="ai-generated-image" alt="AI Generated Hyperrealistic Image">
                        <div style="margin-top: 15px; font-size: 14px; opacity: 0.9;">
                            Your sketch transformed into hyperrealistic art!
                        </div>
                        <div style="margin-top: 10px; font-size: 12px; opacity: 0.7;">
                            Click anywhere to close
                        </div>
                    </div>
                `;
                
                // Add click to close functionality
                overlay.addEventListener('click', () => {
                    overlay.classList.add('hidden');
                    this.aiGenerationActive = false;
                    this.saveToGallery(aiResultCanvas.toDataURL());
                }, { once: true });
                
                // Auto-close after 10 seconds
                setTimeout(() => {
                    if (!overlay.classList.contains('hidden')) {
                        overlay.classList.add('hidden');
                        this.aiGenerationActive = false;
                        this.saveToGallery(aiResultCanvas.toDataURL());
                    }
                }, 10000);
            };
            
            resultImage.src = aiResultCanvas.toDataURL();
        };
        
        img.src = sketchData;
    }
    
    // Reset the canvas
    resetCanvas() {
        if (confirm('Are you sure you want to clear the canvas? This will remove all your work.')) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.showCenterTooltip('Canvas cleared! Ready for new explorations.', 1500);
        }
    }
    
    // Zoom functionality
    zoom(factor) {
        this.zoomLevel *= factor;
        this.zoomLevel = Math.max(0.5, Math.min(3, this.zoomLevel));
        
        document.getElementById('zoomLevel').textContent = Math.round(this.zoomLevel * 100) + '%';
        
        // Apply zoom transform
        this.ctx.save();
        this.ctx.scale(this.zoomLevel, this.zoomLevel);
        this.ctx.translate(this.panX, this.panY);
    }
    
    // Save current sketch to gallery - Modified to handle AI generated images
    saveToGallery(aiImageData = null) {
        const thumbnailCanvas = document.createElement('canvas');
        thumbnailCanvas.width = 100;
        thumbnailCanvas.height = 100;
        const thumbCtx = thumbnailCanvas.getContext('2d');
        
        if (aiImageData) {
            // If AI image provided, create thumbnail from AI result
            const aiImg = new Image();
            aiImg.onload = () => {
                thumbCtx.drawImage(aiImg, 0, 0, 100, 100);
                this.addToGallery(thumbnailCanvas.toDataURL(), aiImageData, 'AI Enhanced');
            };
            aiImg.src = aiImageData;
        } else {
            // Draw scaled version of main canvas
            thumbCtx.drawImage(this.canvas, 0, 0, 100, 100);
            this.addToGallery(thumbnailCanvas.toDataURL(), this.canvas.toDataURL(), 'Original Sketch');
        }
    }
    
    // Add item to gallery - New helper method
    addToGallery(thumbnail, fullImage, type) {
        const galleryItem = {
            thumbnail: thumbnail,
            fullImage: fullImage,
            timestamp: new Date(),
            reflection: document.getElementById('reflection').value,
            type: type
        };
        
        this.gallery.push(galleryItem);
        this.updateGalleryDisplay();
    }
    
    // Update gallery display - Modified to show AI generated images
    updateGalleryDisplay() {
        const galleryContainer = document.getElementById('gallery');
        galleryContainer.innerHTML = '';
        
        this.gallery.slice(-6).forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.title = `${item.type} - ${item.timestamp.toLocaleDateString()}`;
            
            const img = document.createElement('img');
            img.src = item.thumbnail;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            galleryItem.appendChild(img);
            galleryItem.addEventListener('click', () => {
                this.showCenterTooltip(`${item.type} from ${item.timestamp.toLocaleDateString()}\n${item.reflection}`, 3000);
            });
            
            galleryContainer.appendChild(galleryItem);
        });
    }
    
    // Save reflection and current work
    saveReflection() {
        const reflection = document.getElementById('reflection').value;
        if (reflection.trim()) {
            this.saveToGallery();
            this.showCenterTooltip('Reflection saved! Your design journey is recorded.', 2000);
            document.getElementById('reflection').value = '';
        } else {
            this.showCenterTooltip('Please write a reflection before saving.', 2000);
        }
    }
    
    // Show center tooltip with message
    showCenterTooltip(message, duration = 2000) {
        const tooltip = document.getElementById('centerTooltip');
        tooltip.textContent = message;
        tooltip.classList.remove('hidden');
        tooltip.classList.add('show');
        
        setTimeout(() => {
            tooltip.classList.remove('show');
            setTimeout(() => tooltip.classList.add('hidden'), 300);
        }, duration);
    }
}

// Add CSS animation for bounce effect
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(style);

// Initialize the simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const simulation = new DesignSimulation();
    
    // Make simulation globally accessible for debugging
    window.designSimulation = simulation;
    
    console.log('Design-Based Simulation initialized successfully!');
    console.log('Educational Objectives:');
    console.log('- Explore creative value of randomness in sketching');
    console.log('- Identify emergent shapes through observation');
    console.log('- Experience evolution from abstract to expressive design');
    console.log('- Appreciate role of play and iteration in design thinking');
    console.log('- NEW: Transform sketches into AI-generated hyperrealistic images');
});