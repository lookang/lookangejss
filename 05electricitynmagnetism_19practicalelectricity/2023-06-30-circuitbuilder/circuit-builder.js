import { SimulationManager } from "./sim-object.js";
import { Sidebar } from "./sidebar.js"
import { CircuitCalculator } from "./lib/circuit-sim/CircuitCalculator.js";

export var CircuitBuilderConfig = {
  GuiEnabled: true,
  WireDisplayThickness: 4,
  WireInteractionThickness: 8,
  ShouldHighlightConnectionPoints: true,
  ConnectionPointHighlightSize: 12,
  ConnectionPointInteractionSize: 14,
  CrocodileClipEnabled: true,
  CrocodileClipSize: 32
}
var simulation = null;
export const Images = {};

export var calculator = new CircuitCalculator([]);

var sketch = null;
var resetButton = null;
var Gui;

function resetClicked() {
  // Make the simulation reset
  // clear things
  if (sketch !== null) {
    setupSimulation(sketch);
  }
}

function setupSimulation(p) {
  // do stuff
  simulation = new SimulationManager(p);
  Gui = new Sidebar(simulation, p);
  simulation.addObject(Gui);

  simulation.components = [];
}


new p5(function(p) {
  sketch = p;
  // [p5]
  p.setup = function() {
    // put setup code here
    resetButton = p.createButton("Reset");
    p.createCanvas(p.windowWidth - 64, p.windowHeight - 64);
    resetButton.mousePressed(resetClicked);

    for (let canvas of document.getElementsByClassName("p5Canvas")) {
      canvas.addEventListener("contextmenu", (e) => {e.preventDefault();})
    }

    p.angleMode = p.RADIANS;
  }
  // [p5]
  p.mouseWheel = function(event) {
    simulation.onScroll(p, event);
  }
  // [p5]
  p.windowResized = function(event) {
    p.resizeCanvas(p.windowWidth - 64, p.windowHeight - 64);
    simulation.onScroll(p, event);
  }
  
  // [p5]
  p.draw = function() {
    // put drawing code here
    simulation.update(p);
    p.background(192);
    simulation.draw(p);
  }
  
  // [p5]
  p.mousePressed = function(event) {
    if (event.target.className !== "p5Canvas") {
      return;
    }
    simulation.onMouseDown(p, event);
  }
  
  // [p5]
  p.mouseDragged = function(event) {
    if (event.target.className !== "p5Canvas") {
      return;
    }
    simulation.onMouseDrag(p, event);
  }
  
  // [p5]
  p.mouseReleased = function(event) {
    simulation.onMouseUp(p, event);
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
    Images.wireCoil = p.loadImage(imgPath + "wire-coil.png");
    Images.crocodileClip = p.loadImage(imgPath + "crocodile-clip.svg");

    setupSimulation(p);
  }
});
