import { Images, calculator } from "./circuit-builder.js";
import { lerp, invLerp } from "./lib/interpolation.js";
import { isPointInRectangle } from "./lib/collion-checking.js";
import * as Builder from "./builder-components.js";
import { SimObject } from "./sim-object.js";

export class Sidebar extends SimObject {
  constructor(simulation, p) {
    super(simulation);
    this.depth = 2;

    const that = this;
    this.width = 128;

    this.buttons = [];
    var yOffset = 0;
    
    var buttonData = [
      {
        img: Images.battery,
        dragResult: function() {
          const component = new Builder.Battery(simulation, p.mouseX, p.mouseY);
          component.isDragged = true;
          simulation.addObject(component);
          calculator.addComponent(component.innerComponent);
          calculator.recalculate();
          return component;
        }
      },
      {
        img: Images.lamp,
        dragResult: function() {
          const component = new Builder.Lamp(simulation, p.mouseX, p.mouseY);
          component.isDragged = true;
          simulation.addObject(component);
          calculator.addComponent(component.innerComponent);
          calculator.recalculate();
          return component;
        }
      },
      {
        img: Images.rheostatComplete,
        dragResult: function() {
          const component = new Builder.Rheostat(simulation, p.mouseX, p.mouseY);
          component.isDragged = true;
          simulation.addObject(component);
          calculator.addComponent(component.innerComponent);
          calculator.recalculate();
          return component;
        }
      },
      {
        img: Images.switchOpen,
        dragResult: function() {
          const component = new Builder.Switch(simulation, p.mouseX, p.mouseY);
          component.isDragged = true;
          simulation.addObject(component);
          calculator.addComponent(component.innerComponent);
          calculator.recalculate();
          return component;
        }
      },
      {
        img: Images.wireCoil,
        clickResult: function() {
          const wireTool = new Builder.WireTool(simulation);
          simulation.addObject(wireTool);
          return wireTool;
        }
      }
    ];

    buttonData.forEach(data => {
      var button;
      if (typeof (data.dragResult) === 'function') {
        button = new SidebarDragButton(simulation, data.img, that, yOffset, data.dragResult);
      } else if (typeof (data.clickResult) === 'function') {
        button = new SidebarClickButton(simulation, data.img, that, yOffset, data.clickResult);
      }
      this.buttons.push(button);
      yOffset += button.marginTop + button.height + button.marginBottom;
      simulation.addObject(button);
    });

    this.scrollOffset = 0;
    this.scrollTargetOffset = 0;
    this.scrollSpeed = 20;
    this.scrollSensitivity = 1;
    this.scrollVelocity = 0;
    this.scrollDecel = 1;

    this.height = this.buttons.reduce((acc, button) => (acc + button.marginTop + button.height + button.marginBottom), 0);
    this.lastMargin = this.buttons[this.buttons.length - 1].marginBottom;

    this.scrollbarColor = p.color(0, 0, 0); // black
    this.scrollbarAlpha = 192;
    this.scrollbarRightMargin = 2;
    this.scrollbarThickness = 4;
    this.scrollbarFadeStart = 200; // milliseconds
    this.scrollbarFadeEnd = 300; // milliseconds
    this.lastTimeScrolled = p.millis();
  }

  update(p) {
    // Handle scrolling
    if (p.height >= this.height - this.lastMargin) {
      this.scrollOffset = 0;
      this.scrollTargetOffset = 0;
    } else {
      var minScrollOffset = 0;
      var maxScrollOffset = this.height - p.height;

      if (!this.isPressed && !this.isDragged) {
        this.scrollTargetOffset += this.scrollVelocity;
      }
      if (this.scrollVelocity > 0) {
        this.scrollVelocity = Math.max(0, this.scrollVelocity - this.scrollDecel);
      } else if (this.scrollVelocity < 0) {
        this.scrollVelocity = Math.min(0, this.scrollVelocity + this.scrollDecel);
      }

      this.scrollTargetOffset = p.constrain(this.scrollTargetOffset, minScrollOffset, maxScrollOffset);
      this.scrollOffset = p.constrain(this.scrollOffset, minScrollOffset, maxScrollOffset);

      var deltaScroll = this.scrollTargetOffset - this.scrollOffset;
      this.scrollOffset += p.constrain(deltaScroll, -this.scrollSpeed, this.scrollSpeed);
      if (deltaScroll !== 0) {
        this.lastTimeScrolled = p.millis();
      }
    }
  }
  
  draw(p) {
    p.push();
    p.resetMatrix();
    p.fill(128);
    p.noStroke();
    p.rect(0, 0, this.width, p.height);

    this.displayScrollbar(p);

    p.pop();
  }

  displayScrollbar(p) {
    var timeSinceScrolled = p.millis() - this.lastTimeScrolled;
    if (p.height < this.height - this.lastMargin && timeSinceScrolled < this.scrollbarFadeEnd) {
      var scrollbarHalfThickness = this.scrollbarThickness / 2;
      var scrollbarHeight = p.height - this.scrollbarThickness;
      var scrollbarLength = scrollbarHeight * p.height / this.height;
      var scrollbarPosition = scrollbarHalfThickness + this.scrollOffset / this.height * scrollbarHeight;

      var scrollbarAlphaAtTime;

      if (timeSinceScrolled < this.scrollbarFadeStart) {
        scrollbarAlphaAtTime = this.scrollbarAlpha;
      } else {
        var t = invLerp(this.scrollbarFadeStart, this.scrollbarFadeEnd, timeSinceScrolled);
        scrollbarAlphaAtTime = lerp(this.scrollbarAlpha, 0, t);
      }

      p.push();
      p.stroke(0, scrollbarAlphaAtTime);
      p.strokeWeight(this.scrollbarThickness);

      p.line(this.width - scrollbarHalfThickness - this.scrollbarRightMargin, scrollbarPosition, this.width - scrollbarHalfThickness - this.scrollbarRightMargin, scrollbarPosition + scrollbarLength);
      p.pop();
    }
  }

  onScroll(p, event) {
    if (p.mouseX < this.width) {
      this.scrollTargetOffset += event.deltaY * this.scrollSensitivity;
    }
  }

  onMouseDown(p, event) {
    super.onMouseDown(p, event);

    var button = this.buttons.reduce(
      (acc, button) => acc || (button.doesPointCollide(p.mouseX, p.mouseY) ? button : null),
      null
    );

    if (button === null) {
      this.isDragged = true;
    } else {
      // Mouse pressed in left panel
      this.isPressed = true;
    }
  }

  onGlobalMouseDrag(p, event) {
    if (!this.isPressed) return;
    
    if (this.isDragged) {
      this.scrollOffset -= event.movementY;
      this.scrollTargetOffset = this.scrollOffset;
      this.scrollVelocity = -event.movementY;
      this.lastTimeScrolled = p.millis();
    } else {
      var dragX = p.mouseX - this.dragStartX;
      var dragY = p.mouseY- this.dragStartY;

      if (Math.abs(dragX) > 5 || Math.abs(dragY) > 5) {
        if (Math.abs(dragX) - Math.abs(dragY) > 3) {
          // Horizontal drag
          this.isPressed = false;
          return;
        } else if (Math.abs(dragX) - Math.abs(dragY) < -3) {
          // Vertical drag
          this.isPressed = false;
          this.isDragged = true;

          this.scrollOffset -= dragY;
          this.scrollTargetOffset = this.scrollOffset;
          this.scrollVelocity = -dragY;
          this.lastTimeScrolled = p.millis();
        }
      }
    }
  }

  onGlobalMouseUp(p, event) {
    super.onGlobalMouseUp(p, event);
    this.isDragged = false;
  }

  onResize(p, event) {
    this.updateTimeScrolled(p.millis());
  }

  updateTimeScrolled(time) {
    this.lastTimeScrolled = time;
  }

  doesPointCollide(pointX, pointY) {
    return pointX < this.width;
  }
}
class SidebarButton extends SimObject {
  constructor(simulation, image, controllingSidebar, yOffset) {
    super(simulation);

    this.controllingSidebar = controllingSidebar;
    
    this.marginLeft = 16;
    this.marginTop = 16;
    this.marginRight = 16;
    this.marginBottom = 16;
    
    this.paddingLeft = 8;
    this.paddingTop = 16;
    this.paddingRight = 8;
    this.paddingBottom = 16;
    
    this.image = image;
    this.width = controllingSidebar.width - this.marginLeft - this.marginRight;
    this.height = 96;
    this.xOffset = 0;
    this.yOffset = yOffset;

    this.depth = 1;
  }

  draw(p) {
    var yoffset = -this.controllingSidebar.scrollOffset;
    
    p.push();
    p.stroke(0);
    p.fill(224);
    p.translate(this.xOffset, this.yOffset + yoffset);
    p.rect(this.marginLeft, this.marginTop, this.controllingSidebar.width - this.marginLeft - this.marginRight, this.height);
    
    if (this.image != null) {
      let left = this.marginLeft + this.paddingLeft,
          top = this.marginTop + this.paddingTop,
          right = this.controllingSidebar.width - this.marginRight - this.paddingRight,
          bottom = top + this.height - this.paddingBottom,
          centerX = (left + right) / 2,
          centerY = (top + bottom) / 2,
          centerW = right - left,
          centerH = top - bottom;
      
      p.imageMode(p.CENTER);
      p.image(this.image,
        centerX, centerY, centerW, centerH,
        0, 0, this.image.width, this.image.height,
        p.CONTAIN, p.CENTER, p.CENTER);
    }
    
    p.pop();
  }

  doesPointCollide = function (pointX, pointY) {
    let yOffset = -this.controllingSidebar.scrollOffset;

    const left = this.xOffset + this.marginLeft,
      right = this.xOffset + this.width,
      top = yOffset + this.yOffset + this.marginTop,
      bottom = yOffset + this.yOffset + this.marginTop + this.height;
    
    return isPointInRectangle(pointX, pointY, left, top, right, bottom);
  }
}
class SidebarDragButton extends SidebarButton {
  constructor(simulation, image, controllingSidebar, yOffset, dragResult) {
    super(simulation, image, controllingSidebar, yOffset);
    this.dragResult = dragResult;
  }

  onGlobalMouseDrag(p, event) {
    var dragX = p.mouseX - this.dragStartX;
    var dragY = p.mouseY- this.dragStartY;

    if (this.isPressed) {
      if (Math.abs(dragX) > 5 || Math.abs(dragY) > 5) {
        if (Math.abs(dragX) - Math.abs(dragY) > 3) {
          this.dragResult(p, event);

          this.isPressed = false;
        } else if (Math.abs(dragX) - Math.abs(dragY) < -3) {
          this.isPressed = false;
        }
      }
    }
  }
}

class SidebarClickButton extends SidebarButton {
  constructor(simulation, image, controllingSidebar, yOffset, clickResult) {
    super(simulation, image, controllingSidebar, yOffset);
    this.clickResult = clickResult;
  }
  onGlobalMouseDrag(p, event) {
    var dragX = p.mouseX - this.dragStartX;
    var dragY = p.mouseY- this.dragStartY;

    if (this.isPressed) {
      if (Math.abs(dragX) > 5 || Math.abs(dragY) > 5) {
        this.isPressed = false;
      }
    }
  }
  onMouseDown(p, event) {
    super.onMouseDown(p, event);
    this.wasPressed = true;
  }
  onMouseUp(p, event) {
    if (this.wasPressed) {
      if (typeof(this.clickResult) === 'function') {
        this.clickResult(p, event);
      }
      this.wasPressed = false;
    }
  }
}