export class SimObject {
  /**
   * @constructor
   * @param {SimulationManager} simulation 
   */
  constructor(simulation) {
    this.isPressed = false;
    this.dragStartX = undefined;
    this.dragStartY = undefined;
    /** @type {SimulationManager} */
    this.simulation = simulation;
    this.depth = 0;
  }
  onMouseDown(p, event) {
    this.isPressed = true;
    this.dragStartX = p.mouseX;
    this.dragStartY = p.mouseY;
  }
  onGlobalMouseUp(p, event) {
    this.isPressed = false;
    this.dragStartX = undefined;
    this.dragStartY = undefined;
  }
  onGlobalMouseDrag() {} // Not implemented
  doesPointCollide() {
    return false; // Not implemented
  }
}

export class SimulationManager {
  constructor(p) {
    this.objects = [];
    this.objectSet = new WeakSet();
    this.deletedObjects = new WeakSet();
    this.deletedObjectCount = 0;
    this.clearThreshold = 0.1;
  }

  onDepthChange() {
    this.objects.sort((left, right) => right.depth - left.depth);
  }

  addObject(obj) {
    this.objects.push(obj);
    this.objectSet.add(obj);
    obj.simulation = this;
    this.onDepthChange();
  }

  #clearDeletedObjects() {
    if (this.deletedObjectCount === 0) return;

    this.deletedObjectCount = 0;
    let targetIdx = 0;
    this.objects.forEach((obj) => {
      if (!this.deletedObjects.has(obj)) {
        this.objects[targetIdx] = obj;
        targetIdx += 1;
      }
    });
    this.objects.length = targetIdx;
  }

  deleteObject(obj) {
    if (this.objectSet.has(obj)) {
      this.#applyEventToObject(undefined, undefined, "onDelete", obj, false);

      this.deletedObjectCount += 1;
      if (this.deletedObjectCount / this.objects.length > this.clearThreshold) {
        this.#clearDeletedObjects();
      }

      this.objectSet.delete(obj);
      this.deletedObjects.add(obj);
      obj.simulation = null;
    }
  }

  get objectCount() {
    return this.objects.length - this.deletedObjects.length;
  }
  /**
   * 
   * @param {number} index 
   * @returns {SimObject}
   */
  getObject(index) {
    this.#clearDeletedObjects();
    return this.objects[index];
  }
  /**
   * 
   * @param {(obj: SimObject) => boolean} predicate 
   * @returns {SimObject|null}
   */
  getObjectByPredicate(predicate) {
    for (var i = 0; i < this.objects.length; i++) {
      const obj = this.objects[i];
      if (!this.deletedObjects.has(obj)) {
        if (predicate(obj)) {
          return obj;
        }
      }
    }
    return null;
  }

  #applyEvent(p, event, eventName, onlyOnMouseCollision=false) {
    this.objects.forEach((obj) => {
      this.#applyEventToObject(p, event, eventName, obj, onlyOnMouseCollision)
    });
  }
  #applyEventToObject(p, event, eventName, obj, onlyOnMouseCollision=false) {
    if (!this.deletedObjects.has(obj)) {
      if (typeof(obj[eventName]) === 'function' && (!onlyOnMouseCollision || obj.doesPointCollide(p.mouseX, p.mouseY))) {
        obj[eventName](p, event);
      }
    }
  }
  update(p) {
    this.#applyEvent(p, undefined, "update");
  }
  
  draw(p) {
    this.#applyEvent(p, undefined, "draw");
  }

  onResize(p, event) {
    this.#applyEvent(p, event, 'onResize');
  }

  onScroll(p, event) {
    this.#applyEvent(p, event, "onGlobalScroll");
    this.#applyEvent(p, event, "onScroll", true);
  }

  onMouseDown(p, event) {
    this.#applyEvent(p, event, "onGlobalMouseDown");
    this.#applyEvent(p, event, "onMouseDown", true);
  }

  onMouseDrag(p, event) {
    this.#applyEvent(p, event, "onGlobalMouseDrag");
    this.#applyEvent(p, event, "onMouseDrag", true);
  }

  onMouseUp(p, event) {
    this.#applyEvent(p, event, "onGlobalMouseUp");
    this.#applyEvent(p, event, "onMouseUp", true);
  }
}
