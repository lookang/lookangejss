# Disease Spread & Dice Simulation Recreation Prompt

Create a comprehensive HTML application that combines dice probability with disease transmission simulation. The application should demonstrate how mathematical probability directly controls epidemiological outcomes.

## Core Requirements

### 1. Dice-Based Transmission System
- **Primary Feature**: Each contact between infected and healthy students must trigger an automatic dice roll
- **Transmission Probability**: Use formula (dice sum ÷ 12) where dice sum ranges from 2-12
  - Roll of 2 = 16.7% transmission chance
  - Roll of 6 = 50% transmission chance  
  - Roll of 12 = 100% transmission chance
- **Visual Dice**: Display two animated dice in bottom-left corner showing current roll values
- **No Fixed Rate**: Do NOT use a fixed infection rate slider - all transmission must be dice-controlled

### 2. Student Population Simulation
- **Population**: 50 students (configurable 10-200) represented as colored dots
- **Movement**: Students move randomly with physics-based boundary collision
- **States**: 
  - Healthy (teal/cyan with glow effect)
  - Infected (red with pulsing animation and infection radius)
  - Recovered (blue with glow effect)
- **Patient Zero**: Start with 1 infected student, rest healthy
- **Recovery System**: Infected students recover after configurable time (50-500 units)

### 3. User Interface Layout
- **Container**: 100% width, 450px height (iframe compatible)
- **Control Panel**: Top bar with all controls
  - Play, Pause, Step, Reset buttons
  - Population input field
  - Recovery time slider
  - Manual dice roll button
  - Toggle checkboxes for: Infection Radius, Movement Vectors, Statistics
- **Main Area**: Split into simulation area (left 2/3) and charts (right 1/3)
- **Variables Panel**: Top-right overlay showing live statistics

### 4. Live Variables Panel (Top-Right)
Display real-time statistics:
- Time (seconds elapsed)
- Healthy count
- Infected count  
- Recovered count
- Last Dice Roll (sum value)
- Transmission % (last roll ÷ 12 × 100)
- Total Contacts (proximity events)
- Successful Transmissions
- Overall Success Rate (transmissions ÷ contacts × 100)

### 5. Charts Area
**Dice Sum Distribution Chart:**
- Bar chart showing frequency of each dice sum (2-12)
- Bars should form bell curve over time
- Update after each roll

**Disease Progression Chart:**
- Three bars showing current Healthy/Infected/Recovered counts
- Color-coded: teal, red, blue
- Real-time height updates

### 6. Visual Effects & Feedback
- **Infection Radius**: Dashed circles around infected students
- **Transmission Success**: Brief scale-up animation when student gets infected
- **Dice Animation**: Rolling animation when dice are rolled
- **Color Coding**: Consistent throughout (teal=healthy, red=infected, blue=recovered)

### 7. Educational Integration
- **Probability Demonstration**: Students see how dice rolls directly affect disease spread
- **Statistics Tracking**: Real-time comparison of theoretical vs actual transmission rates
- **Visual Learning**: Clear connection between mathematical probability and biological outcomes

## Technical Specifications

### Styling Requirements
- **Theme**: Dark background with professional gradients
- **Colors**: 
  - Background: Dark blue gradients (#1a1a2e, #16213e)
  - Healthy: #4ecdc4 (teal)
  - Infected: #ff6b6b (red)
  - Recovered: #45b7d1 (blue)
- **Responsive**: Works on desktop, tablet, mobile
- **No External Dependencies**: Pure HTML/CSS/JavaScript only

### Core JavaScript Logic
```javascript
// Key function structure needed:
class DiseaseSimulation {
    rollDiceForTransmission() {
        // Roll two dice, return sum
        // Update dice display
        // Calculate transmission probability (sum/12)
        // Update statistics
    }
    
    updateSimulation() {
        // Move students
        // Check for contacts within infection radius
        // For each contact: roll dice and determine transmission
        // Handle recovery
        // Update all displays
    }
}
```

### Contact Detection & Transmission
- **Infection Radius**: 30 pixels around infected students
- **Contact Event**: When healthy student enters infected student's radius
- **Automatic Dice Roll**: Each contact triggers dice roll
- **Transmission Decision**: Compare random number to (dice sum ÷ 12)
- **Visual Feedback**: Show successful transmissions with animation

### Animation & Controls
- **Play/Pause**: Start/stop the simulation loop
- **Step**: Advance simulation by one frame
- **Reset**: Clear all and regenerate population
- **Manual Roll**: Allow users to roll dice independently for exploration

## Expected Behavior

When running:
1. Students move randomly around the simulation area
2. When infected student comes near healthy student, dice automatically roll
3. Dice values determine transmission probability
4. Statistics update in real-time showing the relationship between dice outcomes and disease spread
5. Charts show both dice distribution and disease progression
6. Students can observe how probability theory governs epidemic patterns

## Educational Outcomes

Students should be able to:
- See direct connection between dice probability and disease transmission
- Understand how individual random events create population-level patterns  
- Observe the relationship between theoretical probability and actual outcomes
- Learn how mathematical concepts apply to real-world biological processes

## File Structure
Create a single HTML file containing all CSS and JavaScript inline for easy deployment and sharing.

The final result should be a professional, educational simulation that clearly demonstrates the integration of probability mathematics with epidemiological modeling.
