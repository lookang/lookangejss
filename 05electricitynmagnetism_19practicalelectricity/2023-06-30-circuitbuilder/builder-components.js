// TODO: When something is added, update the calculator
// TODO: Make scissor tool to get rid of components or wires

import { isPointInCircle, isPointInRectangle, isPointWithinDistanceToLineSegment } from "./lib/collion-checking.js"
import { CircuitBuilderConfig, Images, calculator } from "./circuit-builder.js";
import { SimObject } from "./sim-object.js";
import { TreeVertex } from "./lib/circuit-sim/TreeVertex.js";
import { VoltageSourceComponent, ResistorComponent } from "./lib/circuit-sim/ElectricalGraph.js"

export class Component extends SimObject {
  constructor(simulation, x, y, image) {
    super(simulation);
    this.x = x;
    this.y = y;
    this.innerComponent = null;

    this.image = image;
    // this.width = this.image.width;
    // this.height = this.image.height;
    this.width = 80;
    this.height = 64;
    this.connectionPoints = [];

    this.isDragged = false;
  }

  addConnectionPoint(xOffset, yOffset, treeVertex) {
    const connectionPoint = new WireConnectionPoint(this.simulation, this.x + xOffset, this.y + yOffset, this, treeVertex);
    this.connectionPoints.push(connectionPoint);
    this.simulation.addObject(connectionPoint);
    return connectionPoint;
  }

  doesPointCollide(x, y) {
    return isPointInRectangle(x, y, this.x - this.width / 2, this.y - this.height / 2, this.x + this.width / 2, this.y + this.height / 2);
  }

  moveTo(x, y) {
    var dx = x - this.x;
    var dy = y - this.y;

    this.moveBy(dx, dy);
  }

  moveBy(dx, dy, _alreadyMoved=new WeakSet()) {
    if (_alreadyMoved.has(this)) return;
    _alreadyMoved.add(this);
    this.x += dx;
    this.y += dy;
    this.connectionPoints.forEach(component => component.moveBy(dx, dy, _alreadyMoved));
  }

  draw(p) {
    p.push();
    p.imageMode(p.CENTER);
    p.image(this.image, this.x, this.y, this.width, this.height, 0, 0, this.image.width, this.image.height, p.CONTAIN);
    p.fill(0);
    p.textAlign(p.CENTER, p.BOTTOM);
    const current = this.innerComponent.getCurrent(calculator);
    const leftArrow = "\u2190";
    const rightArrow = "\u2192";
    const embedArrow = current < 0 ? leftArrow : (current > 0 ? rightArrow : "");
    const currentText = `${embedArrow} ${Math.abs(current).toFixed(2)} A ${embedArrow}`;

    p.text(currentText, this.x, this.y - this.height / 2);
    p.pop();
  }

  onMouseDown(p, event) {
    super.onMouseDown(p, event);
    this.isDragged = true;
  }

  onGlobalMouseUp(p, event) {
    super.onGlobalMouseUp(p, event);
    this.isDragged = false;
  }

  onGlobalMouseDrag(p, event) {
    if (this.isDragged) {
      this.moveBy(event.movementX, event.movementY);
    }
  }
}

export class Battery extends Component {
  constructor(simulation, x, y, voltage=1.5) {
    super(simulation, x, y, Images.battery);
    this.innerComponent = new VoltageSourceComponent(voltage);

    this.addConnectionPoint(-32, 0, this.innerComponent.sideA);
    this.addConnectionPoint(32, 0, this.innerComponent.sideB);
  };
}

export class Lamp extends Component {
  constructor(simulation, x, y) {
    super(simulation, x, y, Images.lamp);
    // this.innerComponent = new ResistorComponent(8.3);
    this.innerComponent = new ResistorComponent(1);

    this.addConnectionPoint(-32, 4, this.innerComponent.sideA);
    this.addConnectionPoint(32, 4, this.innerComponent.sideB);
  }
}
export class Rheostat extends Component {
  constructor(simulation, x, y, maxResistance=20) {
    super(simulation, x, y, Images.rheostatCoil);
    this.headImage = Images.rheostatHead;
    this.maxResistance = maxResistance;
    this.setting = 0.5;
    this.innerComponent = new ResistorComponent(maxResistance * this.setting);

    this.sliderLeft = -150;
    this.sliderRight = 150;

    this.addConnectionPoint(-32, 0, this.innerComponent.sideA);
    this.addConnectionPoint(32, 0, this.innerComponent.sideB);
  }
  
  draw(p) {
    super.draw(p);
    p.push();
    p.imageMode(p.CENTER);
    p.image(this.headImage, this.x, this.y, this.width, this.height, 0, 0, this.image.width, this.image.height, p.CONTAIN);
    p.pop();
  }
}
export class Switch extends Component {
  constructor(simulation, x, y) {
    super(simulation, x, y, Images.switchOpen);
    this.innerComponent = new ResistorComponent(0);

    this.addConnectionPoint(-22, 12, this.innerComponent.sideA);
    this.addConnectionPoint(10, 12, this.innerComponent.sideB);
  }
}
export class WireConnectionPoint extends SimObject {
  constructor(simulation, x, y, ownerComponent, treeVertex) {
    super(simulation);
    this.x = x;
    this.y = y;
    this.depth = -1;

    this.ownerComponent = ownerComponent
    this.associatedTreeVertex = treeVertex;
    this.connectionList = [];
    this.connectionSet = new WeakSet();
    this.hasBeenDrawn = false;
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  moveTo(x, y) {
    var dx = x - this.x;
    var dy = y - this.y;
    this.moveBy(dx, dy);
  }
  
  addConnection(otherPoint) {
    if (this.connectionSet.has(otherPoint)) {
      return;
    }
    this.connectionSet.add(otherPoint);
    this.connectionList.push(otherPoint);
    otherPoint.connectionSet.add(this);
    otherPoint.connectionList.push(this);

    this.associatedTreeVertex.addConnection(otherPoint.associatedTreeVertex);
  }
  removeConnection(otherPoint) {
    if (!this.connectionSet.has(otherPoint)) {
      return;
    }
    if (this.associatedTreeVertex.isDirectlyConnectedTo(otherPoint.associatedTreeVertex)) {
      // TODO: Remove connection, then search for alternate connections between the trees
    }
    this.connectionSet.delete(otherPoint);
    this.connectionList.splice(this.connectionList.indexOf(otherPoint), 1);
  }

  update(p) {
    this.hasBeenDrawn = false;
  }
  draw(p) {
    if (this.hasBeenDrawn) return;
    this.hasBeenDrawn = true;

    p.push();
    
    this.connectionList.forEach((other) => {
      if (other.hasBeenDrawn) return;
      WireConnectionPoint.drawWire(p, this.x, this.y, other.x, other.y);
    });

    if (CircuitBuilderConfig.ShouldHighlightConnectionPoints) {
      p.fill(255, 255, 0, 192);
      p.stroke(0);
      p.strokeWeight(1);
      p.ellipse(this.x, this.y, CircuitBuilderConfig.ConnectionPointHighlightSize, CircuitBuilderConfig.ConnectionPointHighlightSize);
    }

    p.pop();
  }

  static drawWire(p, startX, startY, endX, endY) {
    const dx = endX - startX;
    const dy = endY - startY;
    const theta = Math.atan2(dy, dx);
    const wireLength = Math.sqrt(dx * dx + dy * dy);
    const wireOffsetX = dx / wireLength * CircuitBuilderConfig.CrocodileClipSize; 
    const wireOffsetY = dy / wireLength * CircuitBuilderConfig.CrocodileClipSize;
    
    p.push();
    
    // p.stroke(184, 115, 51);
    p.stroke(0);
    p.strokeWeight(CircuitBuilderConfig.WireDisplayThickness);

    if (CircuitBuilderConfig.CrocodileClipEnabled) {
      p.line(startX + wireOffsetX, startY + wireOffsetY, endX - wireOffsetX, endY - wireOffsetY);
      p.imageMode(p.CENTER);
      p.push();
      p.translate(startX, startY);
      p.rotate(theta + Math.PI / 2);
      p.translate(0, -CircuitBuilderConfig.CrocodileClipSize / 2)
      p.image(Images.crocodileClip, 0, 0, CircuitBuilderConfig.CrocodileClipSize, CircuitBuilderConfig.CrocodileClipSize, 0, 0, Images.crocodileClip.width, Images.crocodileClip.height, p.CONTAIN);
      p.pop();
  
      p.push();
      p.translate(endX, endY);
      p.rotate(theta - Math.PI / 2);
      p.translate(0, -CircuitBuilderConfig.CrocodileClipSize / 2);
      p.image(Images.crocodileClip, 0, 0, CircuitBuilderConfig.CrocodileClipSize, CircuitBuilderConfig.CrocodileClipSize, 0, 0, Images.crocodileClip.width, Images.crocodileClip.height, p.CONTAIN);
      p.pop();
    } else {
      p.line(startX, startY, endX, endY);
    }
    p.pop();
  }

  onDelete() {
    for (const point of this.connectionList) {
      this.removeConnection(point);
    }
  }
}

export class WireTool extends SimObject {
  constructor() {
    super();
    this.startConnectionPoint = null;
    this.depth = -10
  }

  update(p) {
    p.noCursor();
  }

  onGlobalMouseDown(p, event) {
    if (event.button === 0) {
      // Is left button
      // Check if near connection point
      const clickedConnectionPoint = this.simulation.getObjectByPredicate(
        (obj) => ((obj instanceof WireConnectionPoint) && isPointInCircle(p.mouseX, p.mouseY, obj.x, obj.y, CircuitBuilderConfig.ConnectionPointInteractionSize))
      );

      if (clickedConnectionPoint !== null) {
        if (this.startConnectionPoint === null) {
          this.startConnectionPoint = clickedConnectionPoint;
        } else {
          this.startConnectionPoint.addConnection(clickedConnectionPoint);
          this.startConnectionPoint = null;
          calculator.recalculate();
          // TODO: Update calculator
        }
      }

    } else if (event.button === 2) {
      // Is right button
      if (this.startConnectionPoint === null) {
        calculator.recalculate();
        this.simulation.deleteObject(this);
        p.cursor();
      } else {
        this.startConnectionPoint = null;
      }
    }
  }

  draw(p) {
    p.push();
    if (this.startConnectionPoint !== null) {
      WireConnectionPoint.drawWire(p, this.startConnectionPoint.x, this.startConnectionPoint.y, p.mouseX, p.mouseY);
    }

    p.image(Images.wireCoil, p.mouseX, p.mouseY);
    p.stroke(0);
    p.strokeWeight(1);
    p.noFill();
    p.ellipse(p.mouseX, p.mouseY, 4, 4);
    p.pop();
  }
}

// export class Wire extends Component {
//   // Maybe remove
//   constructor(x, y) {
//     const initialLineSize = 96;
//     super(x, y, null);
//     this.x -= initialLineSize / 2;
//     this.endX = this.x + initialLineSize;
//     this.endY = this.y;

//     this.isStartSelected = false;
//     this.isEndSelected = false;
//   }
//   draw(p) {
//     p.push();
//     p.stroke(184, 115, 51);
//     p.strokeWeight(CircuitBuilderConfig.WireDisplayThickness);
//     p.line(this.x, this.y, this.endX, this.endY);
//     p.pop();
//   }
//   doesPointCollide(x, y) {
//     // Quick check: Check bounding box
//     const left = Math.min(this.x, this.endX) - CircuitBuilderConfig.WireInteractionThickness;
//     const top = Math.min(this.y, this.endY) - CircuitBuilderConfig.WireInteractionThickness;
//     const right = Math.max(this.x, this.endX) + CircuitBuilderConfig.WireInteractionThickness;
//     const bottom = Math.max(this.y, this.endY) + CircuitBuilderConfig.WireInteractionThickness;
//     if (!isPointInRectangle(x, y, left, top, right, bottom)) return false;

//     return isPointWithinDistanceToLineSegment(x, y, this.x, this.y, this.endX, this.endY, CircuitBuilderConfig.WireInteractionThickness);
//   }
//   onMouseDown(p, event) {
//     super.onMouseDown(p, event);
//     if (isPointInCircle(this.x, this.y, p.mouseX, p.mouseY, CircuitBuilderConfig.WireInteractionThickness)) {
//       this.isStartSelected = true;
//       this.isEndSelected = false;
//     }
//     if (isPointInCircle(this.endX, this.endY, p.mouseX, p.mouseY, CircuitBuilderConfig.WireInteractionThickness)) {
//       this.isEndSelected = true;
//       this.isStartSelected = false;
//     }
//   }
//   onGlobalMouseDrag(p, event) {
//     super.onGlobalMouseDrag(p, event);
//     if (!this.isStartSelected && !this.isEndSelected) {
//       this.isStartSelected = true;
//       this.isEndSelected = true;
//     }
//   }
//   moveBy(dx, dy, _alreadyMoved=new WeakSet()) {
//     super.moveBy(dx, dy, _alreadyMoved);
//     if (!this.isStartSelected) {
//       this.x -= dx;
//       this.y -= dy;
//     }
//     if (this.isEndSelected) {
//       this.endX += dx;
//       this.endY += dy;
//     }
//   }
//   onGlobalMouseUp(p, event) {
//     super.onGlobalMouseUp(p, event);
//     this.isStartSelected = false;
//     this.isEndSelected = false;
//   }
// }

export class Note extends Component {
  constructor(simulation, x, y, text='') {
    super(simulation, x, y, null);
    this.text = text;
    this.color = 0;
  }
  draw(p) {

  }
}