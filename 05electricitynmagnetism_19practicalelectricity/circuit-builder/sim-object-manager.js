export const SimObjectDisplayModes = {
  World: "world",
  Screen: "screen"
}

export class SimObject {
  constructor(mask=null) {
    this.mask = mask;
  }

  isPointColliding(pointX, pointY) {
    if (this.mask === null) {
      // Null mask is always 
      return false;
    }
    return this.mask.doesPointCollide(pointX, pointY);
  }

  onMouseDown(event) {}
  onMouseDragged(event) {}
  draw(p) {}
}

function validateEventResponse(event, isEventConsumed, stateTransition, shouldConsume) {
  if (isEventConsumed) {
    if (stateTransition !== null) {
      throw new Error("Cannot perform a state transition when some other object has already consumed the event");
    }
    if (shouldConsume) {
      throw new Error("Cannot consume the event when some other object has already consumed the event");
    }
  }
}

export const SimObjectManager = {
  guiObjects: [],
  worldObjects: [],
  worldOffset: {x:0, y:0},
  worldScale: {x:1, y:1},
  draggedObjects: [],
  mouseDownObjects: [],
  uiState: null,
  onMouseDown: function(event) {
    let isEventConsumed = false;
    event.isConsumed = false;
    event.uiState = this.uiState;
    
    for (let i = this.guiObjects.length - 1; i >= 0; i--) {
      const obj = this.guiObjects[i];

      const {stateTransition=null, shouldConsume=false} = obj.onMouseDown(event);
      validateEventResponse(event, isEventConsumed, stateTransition, shouldConsume);
      event.isConsumed = shouldConsume;
      event.uiState = stateTransition;

      isEventConsumed = shouldConsume;
      this.uiState = stateTransition;
    }
    for (let i = this.worldObjects.length - 1; i >= 0; i--) {
      const {stateTransition=null, shouldConsume=false} = this.worldObjects[i].onMouseDown(event);
      validateEventResponse(event, isEventConsumed, stateTransition, shouldConsume);
      event.isConsumed = shouldConsume;
      event.uiState = stateTransition;

      isEventConsumed = shouldConsume;
      this.uiState = stateTransition;
    }
  },
  draw: function(p) {
    const fn = function(obj) {
      obj.draw(p);
    }
    
    p.push();
    p.translate(this.worldOffset.x, this.worldOffset.y);
    p.scale(this.worldScale.x, this.worldScale.y);
    this.worldObjects.forEach(fn);
    p.pop();
    
    this.guiObjects.forEach(fn);
  }
};
