// import { SimObject } from "./sim-object-manager.js";
// import * as SimObjectManager from "./sim-object-manager.js"
import { Sidebar } from "./sidebar.js"

export var CircuitBuilderConfig = {
  GuiEnabled: true
}

export const UiStates = {
  WAITING: 0,
  PRESSED_IN_GUI: 1,
  SCROLLING_IN_GUI: 2,
  DRAGGING_COMPONENT: 3,
};
export var uiState = UiStates.WAITING;

var resetButton = null;

function resetClicked() {
  // Make the simulation reset
  // clear things

  Gui = new Sidebar(p);
  setupSimulation();
}


var Gui;

var Simulation = {}
function setupSimulation() {
  // do stuff
  Simulation.components = [];
}

function displaySimulation(p) {
  Simulation.components.forEach(function (component) {
    component.draw(p);
  })
}


var dragStartX = undefined, dragStartY = undefined;
var buttonPressed = null;
var componentDragged = null;

export const Images = {};
new p5(function(p) {
  // [p5]
  p.setup = function() {
    // put setup code here
    resetButton = p.createButton("Reset");
    p.createCanvas(p.windowWidth - 64, p.windowHeight - 64);

    resetButton.mousePressed(resetClicked);
  }
  // [p5]
  p.mouseWheel = function(event) {
    Gui.onScroll(p, event);
  }
  // [p5]
  p.windowResized = function(event) {
    p.resizeCanvas(p.windowWidth - 64, p.windowHeight - 64);

    Gui.onResize(p, event);
  }
  
  // [p5]
  p.draw = function() {
    // put drawing code here
    p.background(192);
    Gui.update(p);
  
    Gui.draw(p);
    displaySimulation(p);
  }
  
  // [p5]
  p.mousePressed = function(event) {
    if (event.target.className !== "p5Canvas") {
      return;
    }
  
    switch (uiState) {
      case UiStates.WAITING:
        if (Gui.doesPointCollide(p.mouseX, p.mouseY)) {
          var button = Gui.buttons.reduce(
            (acc, button) => acc || (button.isPointColliding(p.mouseX, p.mouseY, 0, -Gui.scrollOffset) ? button : null),
            null
          );
          
          if (button === null) {
            uiState = UiStates.SCROLLING_IN_GUI;
          } else {
            // Mouse pressed in left panel
            uiState = UiStates.PRESSED_IN_GUI;
            buttonPressed = button;
            dragStartX = p.mouseX;
            dragStartY = p.mouseY;
          }
        } else {
          var dragged = Simulation.components.reduce((acc, component) => acc || (component.isPointInside(p.mouseX, p.mouseY) ? component : null), null);
          if (dragged !== null) {
            uiState = UiStates.DRAGGING_COMPONENT;
            componentDragged = dragged;
          }
        }
        break;
    }
  }
  
  // [p5]
  p.mouseDragged = function(event) {
    if (event.target.className !== "p5Canvas") {
      return;
    }
  
    switch (uiState) {
      case UiStates.PRESSED_IN_GUI:
        var dragX = dragStartX - p.mouseX;
        var dragY = dragStartY - p.mouseY;
  
        if (Math.abs(dragX) > 5 || Math.abs(dragY) > 5) {
          if (Math.abs(dragX) - Math.abs(dragY) > 3) {
            // Horizontal drag
  
            uiState = UiStates.DRAGGING_COMPONENT;
            componentDragged = buttonPressed.dragResult();
            buttonPressed = null;
  
            Simulation.components.push(componentDragged);
          } else if (Math.abs(dragX) - Math.abs(dragY) < -3) {
            // Vertical drag
            uiState = UiStates.SCROLLING_IN_GUI;
  
            Gui.scrollOffset += dragY;
            Gui.scrollTargetOffset = Gui.scrollOffset;
            Gui.scrollVelocity = dragY;
            Gui.lastTimeScrolled = p.millis();
          }
        }
        break;
  
      case UiStates.SCROLLING_IN_GUI:
        Gui.scrollOffset -= event.movementY;
        Gui.scrollTargetOffset = Gui.scrollOffset;
        Gui.scrollVelocity = -event.movementY;
        Gui.lastTimeScrolled = p.millis();
        break;
      
      case UiStates.DRAGGING_COMPONENT:
        if (componentDragged === null) {
          uiState = UiStates.WAITING;
          break;
        }
        componentDragged.moveBy(event.movementX, event.movementY);
        break;
    }
  }
  
  // [p5]
  p.mouseReleased = function(event) {
    switch (uiState) {
      case UiStates.PRESSED_IN_GUI:
        // Create element from the type of the button
        uiState = UiStates.WAITING;
        break;
      case UiStates.SCROLLING_IN_GUI:
        uiState = UiStates.WAITING;
        break;
      case UiStates.DRAGGING_COMPONENT:
        // Drop the component here
        componentDragged = null;
        uiState = UiStates.WAITING;
        break;
    }
  }
  
  // [p5]
  p.preload = function() {
    const imgPath = "img/"
    Images.lamp = p.loadImage(imgPath + "lamp.png");
    Images.battery = p.loadImage(imgPath + "battery.png");
    Images.rheostatComplete = p.loadImage(imgPath + "rheostat-complete.png"); // for button
    Images.rheostatCoil = p.loadImage(imgPath + "rheostat-coil.png");
    Images.rheostatHead = p.loadImage(imgPath + "rheostat-head.png");
    Images.switchClosed = p.loadImage(imgPath + "switch-closed.png");
    Images.switchOpen = p.loadImage(imgPath + "switch-open.png");
  
    setupSimulation();
    Gui = new Sidebar(p);
  }
});
