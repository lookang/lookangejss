import { Images, uiState, UiStates } from "./circuit-builder.js";
import { lerp, invLerp } from "./lib/interpolation.js";
import { isPointInRectangle } from "./lib/collion-checking.js";
import * as Builder from "./builder-components.js"

export class Sidebar {
  constructor(p) {
    const that = this;
    this.width = 128;

    this.buttons = [];
    var yOffset = 0;
    
    var buttonData = [
      {img: Images.battery, dragResult: function() { return new Builder.Battery(p.mouseX - (this.width - this.paddingLeft - this.paddingRight) / 2, p.mouseY - (this.height - this.paddingTop - this.paddingBottom) / 2); }},
      {img: Images.lamp, dragResult: function() { return new Builder.Lamp(p.mouseX - (this.width - this.paddingLeft - this.paddingRight) / 2, p.mouseY - (this.height - this.paddingTop - this.paddingBottom) / 2); }},
      {img: Images.rheostatComplete, dragResult: function() { return new Builder.Rheostat(p.mouseX - (this.width - this.paddingLeft - this.paddingRight) / 2, p.mouseY - (this.height - this.paddingTop - this.paddingBottom) / 2); }},
      {img: Images.switchOpen, dragResult: function() { return new Builder.Switch(p.mouseX - (this.width - this.paddingLeft - this.paddingRight) / 2, p.mouseY - (this.height - this.paddingTop - this.paddingBottom) / 2); }}
    ];

    buttonData.forEach(data => {
      var button = new SidebarButton(data.img, that, yOffset, data.dragResult);
      this.buttons.push(button);
      yOffset += button.marginTop + button.height + button.marginBottom;
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

      if (uiState === UiStates.WAITING) {
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
    
    var yoffset = -this.scrollOffset;
    this.buttons.forEach(button => {
      button.draw(p, 0, yoffset);
    })

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

  onResize(p, event) {
    this.updateTimeScrolled(p.millis())
  }
  updateTimeScrolled(time) {
    this.lastTimeScrolled = time;
  }

  doesPointCollide(pointX, pointY) {
    return pointX < this.width;
  }
}


function SidebarButton(image, controllingSidebar, yOffset, dragResult) {
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

  this.dragResult = dragResult;
}

SidebarButton.prototype.draw = function(p, xoffset, yoffset) {
  p.push();
  p.stroke(0);
  p.fill(224);
  p.translate(this.xOffset + xoffset, this.yOffset + yoffset);
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
};

SidebarButton.prototype.isPointColliding = function(pointX, pointY, xOffset=0, yOffset=0) {
  const left = xOffset + this.xOffset + this.marginLeft,
    right = xOffset + this.xOffset + this.width,
    top = yOffset + this.yOffset + this.marginTop,
    bottom = yOffset + this.yOffset + this.marginTop + this.height;

  return isPointInRectangle(pointX, pointY, left, top, right, bottom);
};

