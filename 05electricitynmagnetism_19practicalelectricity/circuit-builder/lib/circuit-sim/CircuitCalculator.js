
/**
 * @constructor
 * @param {Component[]} componentList 
 * @param {math.Matrix} matrix 
 */
function CircuitCalculator(componentList, matrix=math.matrix('dense')) {
  this.originalComponentList = Array.from(componentList);
  this.componentList = Array.from(componentList);
  this.matrix = matrix;
  this._partById = null;
  /** @type {WeakMap<TreeVertex | Component, number>} */
  this._idByPart = null; // Set by the compile script
  this._partById = null; // Also set by the compile script
  this._circuitValues = undefined;

  /** @type {WeakSet<TreeVertex>} */
  this._includedNodes = new WeakSet();
  this._includedComponents = ResistorLib.compile(this.componentList, this);
  if (this._includedComponents.length > 0) {
    this._invMatrix = math.inv(matrix);
  }

  for (let i = 0; i < this.originalComponentList.length; i++) {
    const component = this.originalComponentList[i];
    this._includedNodes.add(component.sideA.getRoot());
    this._includedNodes.add(component.sideB.getRoot());
  }
};
CircuitCalculator.prototype.calculateCircuit = function calculateCircuit() {
  if (this._circuitValues === undefined) {
    const baseVoltages = math.zeros(this.matrix.size()[0]);
    for (let i = 0; i < this._partById.length; i++) {
      const component = this._partById[i];
      if (component instanceof VoltageSourceComponent) {
        baseVoltages.set([i], component.voltage);
      }
    }
    Debug.log(baseVoltages);
    this._circuitValues =  math.multiply(this._invMatrix, baseVoltages);
  }
  return this._circuitValues;
};
/**
 * @param {TreeVertex} root 
 * @returns {number | undefined}
 */
CircuitCalculator.prototype._getDefinedNodeVoltage = function getDefinedNodeVoltage(root) {
  if (this._idByPart.has(root)) {
    const nodeId = this._idByPart.get(root);
    return this._circuitValues.get([nodeId]);
  } else {
    return undefined;
  }
};
/**
 * @param {TreeVertex} treeVertex 
 * @returns {Voltage}
 */
CircuitCalculator.prototype.getNodeVoltage = function getNodeVoltage(treeVertex) {
  if (!(treeVertex instanceof TreeVertex)) {
    Debug.error("Not a TreeVertex");
    return 0;
  }
  const root = treeVertex.getRoot();

  if (!this.hasNode(root)) {
    Debug.warn("TreeVertex not in calculator");
    return 0;
  }

  const definedNodeVoltage = this._getDefinedNodeVoltage(root);
  if (definedNodeVoltage !== undefined) {
    return definedNodeVoltage;
  } 
   
  const neighboringComponents = ResistorLib.getAllConnectedComponents(root);
  for (let i = 0; i < neighboringComponents.length; i++) {
    const component = neighboringComponents[i];
    const voltageAccordingToComponent = component.getVoltage(root, this);
    if (voltageAccordingToComponent !== undefined) {
      Debug.log("Found abstracted voltage by querying nearby components");
      return voltageAccordingToComponent;
    }
  }

  // We know that it's now in either a disconnected or shorted bunch of components
  // We should do a graph search, and for the nearest node that has a voltage, we return that voltage
  // If there's no such node, the voltage is 0
  const that = this;
  const pathFromDefinedVoltage = ResistorLib.bfsFromNode(root, function(tv) {return that._getDefinedNodeVoltage(tv) !== undefined});
  if (pathFromDefinedVoltage === undefined) {
    console.log("Disconnected from voltage sources");
    return 0; 
  }

  const nodeWithDefinedVoltage = pathFromDefinedVoltage[0];
  const nodeDefinedVoltage = this._getDefinedNodeVoltage(nodeWithDefinedVoltage);

  let voltageAccumulator = 0;
  for (let i = 1; i < pathFromDefinedVoltage.length; i++) {
    const previousNode = pathFromDefinedVoltage[i - 1];
    const node = pathFromDefinedVoltage[i];

    const componentsBetween = ResistorLib.getAllComponentsBetween(previousNode, node);

    if (componentsBetween.length === 0) { Debug.error("No components between, so there's a bug here"); return 0; }
    
    const hasMultipleComponents = componentsBetween.length > 1;

    for (const component of componentsBetween) {
      if (component instanceof VoltageSourceComponent) {
        if (hasMultipleComponents) {
          Debug.error("Has multiple components between here, and one of them is a VoltageSourceComponent, so there's a bug with parallelizing components");
          return 0;
        } else {
          if (component.sideA.isInSameTreeWith(previousNode)) {
            voltageAccumulator += component.voltage;
          } else {
            voltageAccumulator -= component.voltage;
          }
        }
      }
    }
  }
  
  console.info("Found voltage in a dead end or shorted section")
  return nodeDefinedVoltage + voltageAccumulator;
};
/**
 * @param {Component} component
 * @returns {Current}
 */
CircuitCalculator.prototype.getComponentCurrent = function getComponentCurrent(component) {
  if (!(component instanceof Component)) {
    Debug.error("Not a Component");
    return 0;
  }
  if (this.hasComponent(component)) {
    if (this._idByPart.has(component)) {
      this.componentId = this._idByPart.get(component);
      return this._circuitValues.get([this.componentId]);
    } else {
      return component.getCurrent(this);
    }
  } else {
    Debug.warn("Component not in calculator");
    return 0;
  }
};
/**
 * @returns {number}
 */
CircuitCalculator.prototype.getComponentCount = function getComponentCount() {
  return this._partById.length;
};
/**
 * 
 * @param {TreeVertex} node 
 * @returns 
 */
CircuitCalculator.prototype.hasNode = function hasNode(node) {
  if (!(node instanceof TreeVertex)) {
    Debug.warn("node is not a TreeVertex");
    return false;
  }
  const root = node.getRoot();
  return this._includedNodes.has(root);
};
/**
 * 
 * @param {Component} component 
 */
CircuitCalculator.prototype.hasComponent = function hasComponent(component) {
  if (!(component instanceof Component)) {
    Debug.warn("component not a Component");
    return false;
  }
  
  return this._includedComponents.has(component);
};
/**
 * @param {Component[]} componentList 
 */
CircuitCalculator.prototype.setComponentList = function setComponentList(componentList) {
  for (let i = 0; i < this.componentList.length; i++) {
    this.componentList[i].reset();
  }
  for (let i = 0; i < this.originalComponentList.length; i++) {
    this.originalComponentList[i].enableComponent();
  }

  CircuitCalculator.call(this, componentList, this.matrix);
};
