import { TreeVertex } from "./TreeVertex.js";
import * as ResistorLib from "./ResistorLib.js";
import { Debug } from "./Debug.js";
import { CircuitCalculator } from "./CircuitCalculator.js"
/** @typedef {number} Voltage */
/** @typedef {number} Current */
/** @typedef {number} Resistance */


export class Component {

  constructor() {
    /** @type {TreeVertex} */
    this.sideA = new TreeVertex(this);
    
    /** @type {TreeVertex} */
    this.sideB = new TreeVertex(this);
    
    /** @type {?Component} */
    this.abstractionController = null;

    this.isDisabled = false;
  }
  
  disableComponent() {
    this.isDisabled = true;
  }

  enableComponent() {
    this.isDisabled = false;
    this.unsafeClearAbstractionController();
  }

  isActive(withinAbstraction=null) {
    return (this.abstractionController === withinAbstraction || this.abstractionController === null) && !this.isDisabled;
  }

  /**
   * @function setAbstractionController(abstractionController)
   * @param {?ResistorComponent} abstractionController
   * @desc Sets the owner of the resistor component. If the owner is already set, prints a warning.
   */
  setAbstractionController(abstractionController) {
    if (this.abstractionController !== null && abstractionController !== null) {
      const errorMesssage = "The resistor already has an owner, so something funky is going on, and something might have just broken"
      Debug.error(errorMesssage);
    }
    this.abstractionController = abstractionController;
  }

  /**
   * @function unsafeClearOwner()
   * @desc Clears the owner of the resistor component. This function assumes the caller will handle any cleanup needed
   * the ownership to be safely cleared.
   */
  unsafeClearAbstractionController() {
    this.abstractionController = null;
  }

  /**
   * @function isShorted()
   * @returns {boolean} Whether both sides of the component are part of the same
   * conductor tree
   */
  isShorted() {
    return this.sideA.isInSameTreeWith(this.sideB)
  }

  /**
   * 
   */
  getRootAbstractionController() {
    let component = this;
    while (component.abstractionController !== null) {
      component = component.abstractionController;
    }
    return component;
  }

  /**
   * 
   * @param {CircuitCalculator} calculator 
   * @returns {Current} The amoutn of current passing through this component
   */
  getCurrent(calculator) {
    if (!(calculator instanceof CircuitCalculator)) { 
      Debug.error("calculator is not a CircuitCalculator in call of getCurrent");
      return 0;
    }
    if (this.isDisabled) {
      return 0;
    }

    if (this.abstractionController !== null) {
      return this.abstractionController.getCurrent(calculator);
    } else {
      return calculator.getComponentCurrent(this);
    }
  }

  getVoltage(node, calculator) {
    if (this.abstractionController) {
      return this.abstractionController.getVoltage(node, calculator);
    }

    if (!(calculator instanceof CircuitCalculator)) {
      Debug.error("calculator is not a CircuitCalculator in call of getVoltage");
      return 0;
    }
    if (!(node instanceof TreeVertex)) {
      Debug.warn("node is not a TreeVertex");
      return 0;
    }

    const aRoot = this.sideA.getRoot();
    const bRoot = this.sideB.getRoot();
    const nRoot = node.getRoot();
    
    if (this.isDisabled) {
      return undefined;
    } else if (aRoot === nRoot) {
      return calculator.getNodeVoltage(aRoot);
    } else if (bRoot === nRoot) {
      return calculator.getNodeVoltage(bRoot);
    }
  }

  reset() {
    // If this had internal components, it'd re-enable the external components and remove itself.
    this.enableComponent();
  }
}

export class ResistorComponent extends Component {
  /**
   * @constructor
   * @param {Resistance} resistance Resistance in Ohms
   */
  constructor(resistance) {
    super();

    /** @type {Resistance} */
    this.resistance = resistance;
  }
  /**
   * @function applyCurrent(current)
   * @param {Current} current Current, in amperes
   * @returns {Voltage} The voltage across the resistor, in volts
   */
  applyCurrent(current) {
    Debug.log(`Current: ${formatSi(current, 4, 'A')}`);
    Debug.log(`Calculated voltage: ${formatSi(current * this.resistance, 4, 'V')}`);
    return current * this.resistance;
  }
  /**
   * @function applyVoltage(voltage)
   * @param {Voltage} voltage Voltage, in volts
   * @returns {Current} The current passing through the resistor, in amperes
   */
  applyVoltage(voltage) {
    Debug.log(`Voltage: ${formatSi(voltage, 4, 'V')}`);
    Debug.log(`Calculated current: ${formatSi(this.resistance / voltage, 4, 'A')}`)
    return this.resistance / voltage;
  }

  /**
   * @function updateResistance()
   * @returns {Resistance} The new resistance of the resistor, in amperes
   */
  updateResistance() {
    return this.resistance;
  }

  
}

export class ProportionalCurrentSplit extends ResistorComponent {
  /**
   * @constructor
   * @param {number} currentMultiplier 
   * @param {ResistorComponent} innerResistor 
   */
  constructor(currentMultiplier, innerResistor) {
    super(innerResistor.resistance);
    this.currentMultiplier = currentMultiplier;
    this.innerResistor = null;
    this.setInnerResistor(innerResistor);
  }
  getCurrent(calculator) {
    return super.getCurrent(calculator) * this.currentMultiplier;
  }
  setInnerResistor(resistor) {
    if (this.innerResistor !== null) {
      this.innerResistor.setAbstractionController(null);
    }
    this.innerResistor = resistor;
    resistor.setAbstractionController(this);
  }

  applyCurrent(current) {
    return this.innerResistor.applyCurrent(current * this.currentMultiplier);
  }

  applyVoltage(voltage) {
    return this.innerResistor.applyVoltage(voltage * this.currentMultiplier);
  }

  updateResistance() {
    this.resistance = this.innerResistor.updateResistance();
    return this.resistance;
  }

  reset() {
    this.sideA.removePreservingConnectedness();
    this.sideB.removePreservingConnectedness();

    this.innerResistor.setAbstractionController(null);
    this.innerResistor.reset();
    this.disableComponent();
  }
}

export class ParallelResistorComponent extends ResistorComponent {
  constructor(resistance) {
    super(resistance);
    /** @type {ProportionalCurrentSplit[]} */
    this.parallelResistorList = [];
  }
  /**
   * @param {ResistorComponent[]} resistorList
   * @returns {?ParallelResistorComponent} Returns a ParallelResistorComponent if all resistors were parallel; otherwise returns null.
   */
  static fromResistorList(resistorList) {
    if (!ResistorLib.isParallel(resistorList)) {
      return null;
    }

    const newResistor = new ParallelResistorComponent(0);
    if (resistorList.length === 0) {
      return newResistor;
    }
    const sideARoot = resistorList[0].sideA.getRoot();
    const sideBRoot = resistorList[0].sideB.getRoot();

    newResistor.sideA = new TreeVertex(newResistor);
    newResistor.sideB = new TreeVertex(newResistor);

    newResistor.sideA.addChild(sideARoot);
    newResistor.sideB.addChild(sideBRoot);

    newResistor.parallelResistorList = resistorList.map((resistor) => new ProportionalCurrentSplit(0, resistor));
    for (let i = 0; i < newResistor.parallelResistorList.length; i++) {
      const currentSplit = newResistor.parallelResistorList[i];
      currentSplit.setAbstractionController(newResistor);
    }
    newResistor.updateResistance();
    return newResistor;
  }

  applyCurrent(current) {
    for (var i = 0; i < this.parallelResistorList.length; i++) {
      this.parallelResistorList[i].applyCurrent(current);
    }
  }

  applyVoltage(voltage) {
    for (var i = 0; i < this.parallelResistorList.length; i++) {
      this.parallelResistorList[i].applyVoltage(voltage);
    }
  }

  updateResistance() {
    let sumReciprocalResistance = 0;
    /** @type {ProportionalCurrentSplit[]} */
    let zeroResistanceResistors = [];
    let firstZeroResistanceResistorIndex = -1;

    let sumResistance = 0;

    for (let i = 0; i < this.parallelResistorList.length; i++) {
      const split = this.parallelResistorList[i];
      split.updateResistance();
      sumResistance += split.resistance;
    }

    // Calculate sumReciprocalResistance
    for (let i = 0; i < this.parallelResistorList.length; i++) {
      const split = this.parallelResistorList[i];
      split.currentMultiplier = split.resistance/sumResistance;

      if (split.resistance === 0) {
        zeroResistanceResistors.push(split);
        if (firstZeroResistanceResistorIndex < 0) {
          firstZeroResistanceResistorIndex = i;
        }
      }

      if (zeroResistanceResistors.length === 0) {
        sumReciprocalResistance += 1 / split.resistance;
      } else {
        split.currentMultiplier = 0;
      }
    }

    // Edge case: if more than one of the component resistors has zero resistance, then the current flows through them equally 
    // (I assume in this case that 0 resistance means "approximately zero", and that those values are all equal)
    if (zeroResistanceResistors.length !== 0) {
      // Zero out all of the ParallelResistorComponents
      for (var i = 0; i < firstZeroResistanceResistorIndex; i++) {
        this.parallelResistorList[i].currentMultiplier = 0;
      }

      const currentThroughConductor = 1/zeroResistanceResistors.length;
      for (var i = 0; i < zeroResistanceResistors.length; i++) {
        zeroResistanceResistors[i].currentMultiplier = currentThroughConductor;
      }
      this.resistance = 0;
    } else {
      this.resistance = 1/sumReciprocalResistance;
    }
    return this.resistance;
  }

  reset() {
    this.sideA.removePreservingConnectedness();
    this.sideB.removePreservingConnectedness();

    for (let i = 0; i < this.parallelResistorList.length; i++) {
      const child = this.parallelResistorList[i];
      child.unsafeClearAbstractionController();
      child.reset();
    }

    this.disableComponent();
  }
}

export class SerialResistorComponent extends ResistorComponent {
  constructor(resistance) {
    super(resistance);
    
    // First element is next to sideA, last element is next to sideB
    this.serialResistorList = [];
  }

  getVoltage(node, calculator) {
    const endVoltage = super.getVoltage(node, calculator);
    if (endVoltage !== undefined) {
      return endVoltage;
    }

    // We may now assume that the voltage is set 
    const aVoltage = super.getVoltage(this.sideA, calculator);
    const bVoltage = super.getVoltage(this.sideB, calculator);

    const voltageChange = bVoltage - aVoltage;
    const voltageChangePerOhm = voltageChange / this.resistance;

    // We know that it's not the terminal nodes, because it would have been caught with the endVoltage check
    let resistanceTally = 0;

    for (let i = 0; i < this.serialResistorList.length; i++) {
      const resistor = this.serialResistorList[i];

      resistanceTally += resistor.resistance;

      if (resistor.sideA.isInSameTreeWith(node) || resistor.sideB.isInSameTreeWith(node)) {
        return aVoltage + voltageChangePerOhm * resistanceTally;
      }
    }
  }

  /**
   * @param {ResistorComponent[]} resistorList Must be in a serial order
   * @returns {?SerialResistorComponent}
   */
  static fromResistorList(resistorList) {
    if (ResistorLib.isResistorListSerialPath(resistorList)) {
      const resistance = resistorList.reduce((accumulator, value) => accumulator + value.resistance, 0);
      const newResistor = new SerialResistorComponent(resistance);
      newResistor.serialResistorList = Array.from(resistorList);
      for (let i = 0; i < newResistor.serialResistorList.length; i++) {
        const resistor = newResistor.serialResistorList[i];
        resistor.setAbstractionController(newResistor);
      }

      // Set the sides properly
      if (resistorList.length === 1) {
        resistorList[0].sideA.addChild(newResistor.sideA);
        resistanceList[0].sideB.addChild(newResistor.sideB);
      } else if (resistorList.length > 1) {
        const firstResistor = resistorList[0];
        const secondResistor = resistorList[1];
        if (firstResistor.sideA.isInSameTreeWith(secondResistor.sideA) || firstResistor.sideA.isInSameTreeWith(secondResistor.sideB)) {
          firstResistor.sideB.addChild(newResistor.sideA);
        } else {
          firstResistor.sideA.addChild(newResistor.sideA);
        }
        
        const lastResistor = resistorList[resistorList.length - 1];
        const secondLastResistor = resistorList[resistorList.length - 2];
        if (lastResistor.sideA.isInSameTreeWith(secondLastResistor.sideA) || lastResistor.sideA.isInSameTreeWith(secondLastResistor.sideB)) {
          lastResistor.sideB.addChild(newResistor.sideB);
        } else {
          lastResistor.sideA.addChild(newResistor.sideB);
        }
      }

      return newResistor;
    }
    return null;
  }
  
  applyCurrent(current) {
    for (let i = 0; i < this.serialResistorList.length; i++) {
      this.serialResistorList[i].applyCurrent(current);
    }
  }

  applyVoltage(voltage) {
    const voltagePerOhm = voltage / this.resistance;
    for (let i = 0; i < this.serialResistorList.length; i++) {
      this.serialResistorList[i].applyVoltage(voltage * voltagePerOhm * this.serialResistorList[i].resistance);
    }
    return this.resistance / voltage;
  }

  reset() {
    this.sideA.removePreservingConnectedness();
    this.sideB.removePreservingConnectedness();
    for (const innerResistor of this.serialResistorList) {
      innerResistor.reset();
    }
    this.disableComponent();
  }
}

export class VoltageSourceComponent extends Component {
  /**
   * @param {Voltage} voltage Voltage in volts
   * @constructor
   */
  constructor(voltage) {
    super();
    this.voltage = voltage;
  }
}
