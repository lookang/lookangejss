import { VoltageSourceComponent, ResistorComponent } from "./lib/circuit-sim/ElectricalGraph.js";
import * as ResistorLib from "./lib/circuit-sim/ResistorLib.js";
import { CircuitCalculator } from "./lib/circuit-sim/CircuitCalculator.js";

console.warn("This file is for internal use and should not be released.");

/**
 * @constructor
 * @param {Function} testedFn 
 * @param {any[]} parameters 
 * @param {Function} desiredResult 
 * @param {string?} testName 
 */
function Test(testedFn, parameters, desiredResult, testName) {
  this.testedFn = testedFn;
  this.parameters = parameters;
  this.desiredResult = desiredResult;
  this.testName = testName;
}
Test.testNumber = 1;
Test.testBuffer = [];
Test.create = function create(testedFn, parameters, expectedReturnValue, testName) {
  if (testName === undefined) {
    testName = `Test ${this.testNumber}`
    this.testNumber += 1;
  }
  this.testBuffer.push(new Test(testedFn, parameters, expectedReturnValue, testName));
};
Test.execute = function execute() {
  console.group("Running %i tests", this.testBuffer.length);
  const testTimerName = "Test Timer"
  console.time(testTimerName);
  let successCount = 0;
  for (let i = 0; i < this.testBuffer.length; i++) {
    // Do the test
    const isSuccessful = this.testBuffer[i].execute();
    if (isSuccessful) {
      successCount += 1;
    }
  }
  console.info(`Test suite completed. ${successCount}/${this.testBuffer.length} tests passed`);
  this.testBuffer.length = 0;
  console.timeEnd(testTimerName);
  console.groupEnd();
};
Test.prototype.execute = function execute() {
  // this.testedFn = testedFn;
  // this.parameters = parameters;
  // this.expectedReturnValue = expectedReturnValue;
  // this.testName = testName;
  console.group(this.testName)
  try {
    const result = this.testedFn.apply({}, this.parameters);
    if (this.desiredResult(result)) {
      console.info("Test successful: %o", result);
      return true;
    } else {
      console.warn("Test failed: %o", result);
      return false;
    }
  } catch (e) {
    console.error("Test failed with error:");
    console.log(e);
    console.log(e.stack);
    console.trace();
    return false;
  } finally {
    console.groupEnd();
  }
};

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistor = new ResistorComponent(1);
  const shorted = new ResistorComponent(90);
  battery.sideA.addChild(resistor.sideB);
  battery.sideB.addChild(resistor.sideA);
  battery.sideB.addChild(shorted.sideA);
  battery.sideB.addChild(shorted.sideB);
  components.push(battery);
  components.push(resistor);
  components.push(shorted);
  const didTrim = ResistorLib._simplify_trimShorted(components);
  const rightLength = components.length === 2
  const didAbstract = !shorted.isActive();
  return {didTrim, rightLength, didAbstract};
}, [], x => (x.didTrim && x.rightLength && x.didAbstract), "test trimShorted positive");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistor = new ResistorComponent(1);
  battery.sideA.addChild(resistor.sideB);
  battery.sideB.addChild(resistor.sideA);
  components.push(battery);
  components.push(resistor);
  
  return {didTrim:ResistorLib._simplify_trimShorted(components)};
}, [], x => !x.didTrim, "test trimShorted negative");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistor = new ResistorComponent(1);
  const deadEnd = new ResistorComponent(90);
  battery.sideA.addChild(resistor.sideB);
  battery.sideB.addChild(resistor.sideA);
  battery.sideB.addChild(deadEnd.sideB);
  components.push(battery);
  components.push(resistor);
  components.push(deadEnd);
  
  const didTrim = ResistorLib._simplify_trimDeadEnd(components);
  const rightLength = components.length === 2;
  const didAbstract = !deadEnd.isActive();

  console.log(deadEnd);

  return {didTrim, rightLength, didAbstract};
}, [], x => (x.didTrim && x.rightLength && x.didAbstract), "test trimDeadEnd positive");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistor = new ResistorComponent(1);
  battery.sideA.addChild(resistor.sideB);
  battery.sideB.addChild(resistor.sideA);
  components.push(battery);
  components.push(resistor);
  
  return {didTrim: ResistorLib._simplify_trimDeadEnd(components)};
}, [], x => !x.didTrim, "test trimDeadEnd negative");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistor = new ResistorComponent(1);
  const disconnected = new ResistorComponent(90);
  battery.sideA.addChild(resistor.sideB);
  battery.sideB.addChild(resistor.sideA);
  components.push(battery);
  components.push(resistor);
  components.push(disconnected);
  
  const didTrim = ResistorLib._simplify_trimDisconnected(components);
  const rightLength = components.length === 2;
  const didAbstract = !disconnected.isActive();

  console.log(disconnected);

  return {didTrim, rightLength, didAbstract};
}, [], x => (x.didTrim && x.rightLength && x.didAbstract), "test trimDisconnected positive");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistor = new ResistorComponent(1);
  
  battery.sideA.addChild(resistor.sideB);
  battery.sideB.addChild(resistor.sideA);
  components.push(battery);
  components.push(resistor);
  
  const didTrim = ResistorLib._simplify_trimDisconnected(components);

  return {didTrim};
}, [], x => (!x.didTrim), "test trimDisconnected negative");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistorA = new ResistorComponent(1);
  const resistorB = new ResistorComponent(1);

  battery.sideA.addChild(resistorA.sideB);
  battery.sideB.addChild(resistorA.sideA);
  battery.sideA.addChild(resistorB.sideB);
  battery.sideB.addChild(resistorB.sideA);
  
  components.push(battery);
  components.push(resistorA);
  
  const didMerge = ResistorLib._simplify_mergeParallel(components);
  const didAbstractA = resistorA.abstractionController !== null;
  const didAbstractB = resistorA.abstractionController !== null;
  const didParallelize = resistorA.abstractionController.abstractionController === resistorA.abstractionController.abstractionController;
  const aCorrectProportion = resistorA.abstractionController.currentMultiplier === 0.5;
  const bCorrectProportion = resistorB.abstractionController.currentMultiplier === 0.5;
  
  return {didMerge, didAbstractA, didAbstractB, didParallelize, aCorrectProportion, bCorrectProportion};
}, [], x => (x.didMerge && x.didAbstractA && x.didAbstractB && x.didParallelize && x.aCorrectProportion && x.bCorrectProportion), "test mergeParallel positive");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistor = new ResistorComponent(1);
  battery.sideA.addChild(resistor.sideB);
  battery.sideB.addChild(resistor.sideA);
  components.push(battery);
  components.push(resistor);

  const didMerge = ResistorLib._simplify_mergeParallel(components);
  return {didMerge};
}, [], x => !x.didMerge, "test mergeParallel negative");

Test.create(function() {
  //todo
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistorA = new ResistorComponent(1);
  const resistorB = new ResistorComponent(2);

  battery.sideA.addChild(resistorA.sideB);
  resistorA.sideA.addChild(resistorB.sideB);
  resistorB.sideA.addChild(battery.sideB);
  
  components.push(battery);
  components.push(resistorA);
  components.push(resistorB);

  const didMerge = ResistorLib._simplify_mergeSerial(components);
  
  const serialResistor = resistorA.abstractionController;
  console.log(serialResistor);
  const didAbstractA = serialResistor !== null;
  const didAbstractB = resistorB.abstractionController !== null;
  const isConnected = 
    (serialResistor.sideA.isInSameTreeWith(battery.sideA) && serialResistor.sideB.isInSameTreeWith(battery.sideB))
   || (serialResistor.sideA.isInSameTreeWith(battery.sideB) && serialResistor.sideB.isInSameTreeWith(battery.sideA));
  const isSerialized = resistorA.abstractionController === resistorB.abstractionController && serialResistor !== null;
  return {didMerge, didAbstractA, didAbstractB, isSerialized, isConnected};
}, [], x => (x.didMerge && x.didAbstractA && x.didAbstractB && x.isSerialized && x.isConnected), "test mergeSerial positive");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistor = new ResistorComponent(1);
  battery.sideA.addChild(resistor.sideB);
  battery.sideB.addChild(resistor.sideA);
  components.push(battery);
  components.push(resistor);

  const didMerge = ResistorLib._simplify_mergeSerial(components);
  return {didMerge};
}, [], x => !x.didMerge, "test mergeSerial negative");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistor = new ResistorComponent(1);
  battery.sideA.addChild(resistor.sideB);
  battery.sideB.addChild(resistor.sideA);
  components.push(battery);
  components.push(resistor);

  const batteryA = battery.sideA;
  const batteryB = battery.sideB;
  
  const calculator = new CircuitCalculator(components);
  calculator.calculateCircuit();

  console.log(calculator._partById);
  console.log(calculator.matrix);
  console.log(calculator._invMatrix);
  console.log(calculator._circuitValues);

  const aVoltage = calculator.getNodeVoltage(batteryA);
  const bVoltage = calculator.getNodeVoltage(batteryB);
  const batteryCurrent = calculator.getComponentCurrent(battery);
  const resistorCurrent = calculator.getComponentCurrent(resistor);

  return {aVoltage, bVoltage, batteryCurrent, resistorCurrent};
}, [], x => (x.aVoltage === 0 && x.bVoltage === 9 && x.batteryCurrent === 9 && x.resistorCurrent === 9), "test calculator");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistorA = new ResistorComponent(2);
  const resistorB = new ResistorComponent(2);

  battery.sideA.addChild(resistorA.sideB);
  battery.sideB.addChild(resistorA.sideA);
  battery.sideA.addChild(resistorB.sideB);
  battery.sideB.addChild(resistorB.sideA);
  
  components.push(battery);
  components.push(resistorA);

  const calculator = new CircuitCalculator(components);
  console.log(calculator.matrix)
  calculator.calculateCircuit();

  const aVoltage = battery.getVoltage(battery.sideA, calculator);
  const bVoltage = battery.getVoltage(battery.sideB, calculator);
  const batteryCurrent = battery.getCurrent(calculator);
  const resistorACurrent = resistorA.getCurrent(calculator);
  const resistorBCurrent = resistorB.getCurrent(calculator);

  return {aVoltage, bVoltage, resistorACurrent, resistorBCurrent, batteryCurrent};
}, [], x => (x.aVoltage === 0 && x.bVoltage === 9 && x.batteryCurrent === 9 && x.resistorACurrent === 4.5 && x.resistorBCurrent === 4.5), "test calculator parallel");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistorA = new ResistorComponent(1);
  const resistorB = new ResistorComponent(2);

  battery.sideA.addChild(resistorA.sideB);
  resistorA.sideA.addChild(resistorB.sideB);
  resistorB.sideA.addChild(battery.sideB);
  
  components.push(battery);
  components.push(resistorA);
  components.push(resistorB);

  const calculator = new CircuitCalculator(components);
  console.log(calculator.matrix)
  calculator.calculateCircuit();

  const aVoltage = battery.getVoltage(battery.sideA, calculator);
  const bVoltage = resistorA.getVoltage(resistorA.sideA, calculator);
  const cVoltage = battery.getVoltage(battery.sideB, calculator);
  const batteryCurrent = battery.getCurrent(calculator);
  const resistorACurrent = resistorA.getCurrent(calculator);
  const resistorBCurrent = resistorB.getCurrent(calculator);

  return {aVoltage, bVoltage, cVoltage, batteryCurrent, resistorACurrent, resistorBCurrent}
}, [], x => (x.aVoltage === 0 && x.bVoltage === 3 && x.cVoltage === 9 && x.batteryCurrent === 3 && x.resistorACurrent === 3 & x.resistorBCurrent === 3), "test calculator serial");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistor = new ResistorComponent(1);
  const shorted = new ResistorComponent(90);
  battery.sideA.addChild(resistor.sideB);
  battery.sideB.addChild(resistor.sideA);
  battery.sideB.addChild(shorted.sideA);
  battery.sideB.addChild(shorted.sideB);
  components.push(battery);
  components.push(resistor);
  components.push(shorted);

  const calculator = new CircuitCalculator(components);
  calculator.calculateCircuit();
  const shortedCurrent = calculator.getComponentCurrent(shorted);
  return {shortedCurrent};
}, [], x => (x.shortedCurrent === 0), "test calculator with trimShorted");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistor = new ResistorComponent(1);
  const deadEnd = new ResistorComponent(90);
  battery.sideA.addChild(resistor.sideB);
  battery.sideB.addChild(resistor.sideA);
  battery.sideB.addChild(deadEnd.sideB);
  components.push(battery);
  components.push(resistor);
  components.push(deadEnd);

  const calculator = new CircuitCalculator(components);
  calculator.calculateCircuit();
  const deadEndCurrent = calculator.getComponentCurrent(deadEnd);
  const deadEndVoltage = calculator.getNodeVoltage(deadEnd.sideA);
  const batteryPosVoltage = calculator.getNodeVoltage(battery.sideB);

  return {deadEndCurrent, deadEndVoltage, batteryPosVoltage};
}, [], x => (x.deadEndCurrent === 0 && x.deadEndVoltage === x.batteryPosVoltage), "test calculator with trimDeadEnd");

Test.create(function() {
  const components = [];
  const battery = new VoltageSourceComponent(9);
  const resistor = new ResistorComponent(1);
  const disconnected = new ResistorComponent(90);
  battery.sideA.addChild(resistor.sideB);
  battery.sideB.addChild(resistor.sideA);
  components.push(battery);
  components.push(resistor);
  components.push(disconnected);
  
  const calculator = new CircuitCalculator(components);
  calculator.calculateCircuit();

  const disconnectedVoltageA = calculator.getNodeVoltage(disconnected.sideA);
  const disconnectedVoltageB = calculator.getNodeVoltage(disconnected.sideB);
  const disconnectedCurrent = calculator.getComponentCurrent(disconnected);

  return {disconnectedVoltageA, disconnectedVoltageB, disconnectedCurrent};
}, [], x => (x.disconnectedVoltageA === 0 && x.disconnectedVoltageA === 0 && x.disconnectedVoltageA === 0), "test calculator with trimDisconnected");

Test.create(function() {
  const components = []
  const battery = new VoltageSourceComponent(1.5);
  components.push(battery);
  const calculator = new CircuitCalculator(components);
  calculator.calculateCircuit();
  const current = battery.getCurrent(calculator);
  return {current};
}, [], x => x.current === 0, "test that individual component does not crash when getting current")

Test.execute();
