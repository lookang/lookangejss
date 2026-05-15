import "./Polyfill.js"; // For side-effects
import { Debug } from "./Debug.js";
import { Component, ResistorComponent, VoltageSourceComponent, ParallelResistorComponent, SerialResistorComponent } from "./ElectricalGraph.js";
import { TreeVertex } from "./TreeVertex.js";
import { Queue } from "./Queue.js";
/**
 * 
 * @param {TreeVertex} nodeA 
 * @param {TreeVertex} nodeB
 * @returns {Component[]} 
 */
export function getAllComponentsBetween(nodeA, nodeB) {
  // todo
  const sideARoot = nodeA.getRoot();
  const sideBRoot = nodeB.getRoot();

  if (sideARoot === sideBRoot) { return []; }

  const checkedResistors = new WeakSet();

  const parallelComponents = [];
  const resistorsConnectedToA = getAllConnectedComponents(sideARoot);

  for (let i = 0; i < resistorsConnectedToA.length; i++) {
    const iterResistor = resistorsConnectedToA[i];
    
    if (checkedResistors.has(iterResistor)) continue;
    checkedResistors.add(iterResistor);

    const resistorSideARoot = iterResistor.sideA.getRoot();
    const resistorSideBRoot = iterResistor.sideB.getRoot();
    
    const isParallelAligned = sideARoot === resistorSideARoot && sideBRoot === resistorSideBRoot;
    const isParallelMisaligned = sideARoot === resistorSideBRoot && sideBRoot === resistorSideARoot;

    if ((isParallelAligned || isParallelMisaligned)) {
      parallelComponents.push(iterResistor);
    }
  }
  return parallelComponents;
}
/**
 * @param {ResistorComponent[]} resistorList 
 * @param {?ResistorComponent} [withinAbstraction=null]
 * @returns {boolean} true if all the resistor components are parallel, false otherwise. Returns
 * false if the list contains any components that are not resistor components. Lists containing 
 * 0 or 1 resistors are parallel. 
 */
export function isParallel(resistorList, withinAbstraction=null) {
  for (let i = 0; i < resistorList.length; i++) {
    if (!(resistorList[i] instanceof ResistorComponent)) {
      return false;
    }
  }
  if (resistorList.length === 0) return true;
  if (resistorList.length === 1 ) {
    // If it's integrated, then it's not parallel to anything
    // if it's not integrated, then a single component is always parallel
    if (!resistorList[0].isActive(withinAbstraction)) return false;
    
    // Check if the component is a source
    if (!(resistorList[0] instanceof ResistorComponent)) return false;

    // Default case
    return true;
  }

  if (!resistorList[0].isActive(withinAbstraction)) {
    return false;
  }

  const firstResistorSideARoot = resistorList[0].sideA.getRoot();
  const firstResistorSideBRoot = resistorList[0].sideB.getRoot();


  for (let i = 1; i < resistorList.length; i++) {
    const resistor = resistorList[i];
    const resistorSideARoot = resistor.sideA.getRoot();
    const resistorSideBRoot = resistor.sideB.getRoot();
    const parallelAligned = (resistorSideARoot === firstResistorSideARoot) && (resistorSideBRoot === firstResistorSideBRoot); 
    const parallelMisaligned = (resistorSideARoot === firstResistorSideBRoot) && (resistorSideBRoot === firstResistorSideARoot);
    if (!(parallelAligned || parallelMisaligned)) {
      // Not parallel, so return false
      return false;
    }
    if (!resistor.isActive(withinAbstraction)) {
      // Is already integrated into a different component, so it can't be part of this parallel component
      return false;
    }
  }
  return true;
};
/**
 * @param {ResistorComponent} resistor 
 * @param {?ResistorComponent} [withinAbstraction=null]
 * @returns {ResistorComponent[]} All resistors that are not integrated into other 
 * components, are not voltage or current sources, and are parallel to the parameter
 */
export function getParallelResistors(resistor, withinAbstraction=null) {
  // Returns all resistors parallel to this resistor not integrated into other components
  // All parallel resistors will share both sides with this resistor
  // so if I get the list of all resistors that share one side, that list is
  // necessarily a superset of the list we're looking for
  if (!(resistor instanceof ResistorComponent)) return [];

  const sideARoot = resistor.sideA.getRoot();
  const sideBRoot = resistor.sideB.getRoot();
  const checkedResistors = new WeakSet();

  const parallelResistors = [];
  const resistorsConnectedToA = getConnectedResistors(sideARoot, withinAbstraction);

  for (const iterResistor of resistorsConnectedToA) {
    if (checkedResistors.has(iterResistor)) continue;
    checkedResistors.add(iterResistor);

    const resistorSideARoot = iterResistor.sideA.getRoot();
    const resistorSideBRoot = iterResistor.sideB.getRoot();
    
    const isParallelAligned = sideARoot === resistorSideARoot && sideBRoot === resistorSideBRoot;
    const isParallelMisaligned = sideARoot === resistorSideBRoot && sideBRoot === resistorSideARoot;
    const isActive = iterResistor.isActive(withinAbstraction);

    if ((isParallelAligned || isParallelMisaligned) && isActive) {
      parallelResistors.push(iterResistor);
    }
  }
  return parallelResistors;
}
/**
 * @param {TreeVertex} treeVertex
 * @param {?ResistorComponent} [withinAbstraction=null]
 * @returns {ResistorComponent[]} List of vertices which either end is in the same tree 
 * as this vertex, and are either part of another resistor, or are directly part of the 
 * resistor in the second parameter. If a resistor is shorted, it appears twice in the
 * returned list
 */
export function getConnectedResistors(treeVertex, withinAbstraction=null) {
  const resistors = [];
  if (!(treeVertex instanceof TreeVertex)) return [];

  treeVertex.forEachInTree(function(vertex) {
    /** @type {ResistorComponent} */
    const resistor = vertex.value;
    if (resistor instanceof ResistorComponent) {
      if (resistor.isActive(withinAbstraction)) {
        resistors.push(resistor);
      }
    }
  });

  return resistors;
}
/**
 * 
 * @param {ResistorComponent} resistor
 * @param {?ResistorComponent} [withinAbstraction=null]
 */
export function getSerialResistors(resistor, withinAbstraction=null) {
  if (!(resistor instanceof ResistorComponent)) {
    // If the provided resistor component isn't actually a resistor component, then there's no serial resistors
    // here. Therefore, return an empty array.
    return [];
  }

  const previousResistors = [];
  const thisAndNextResistors = [resistor];
  const visitedResistors = new WeakSet();

  _getSerialResistors_getLinearInDirection(resistor.sideA, resistor, previousResistors, withinAbstraction, visitedResistors);
  _getSerialResistors_getLinearInDirection(resistor.sideB, resistor, thisAndNextResistors, withinAbstraction, visitedResistors);

  /*
  The logic here is as follows:
  the previousResistors array holds the [(k - 1)th, (k - 2)th, ... 1st] components
  and the thisAndNextResistors array holds the [kth, (k + 1)th, ... nth] components.
  So, if you reverse previousResistors, then concat thisAndNextResistors,
  you get [1st, 2nd, ... (k - 1)th, kth, (k + 1)th, ... nth] components, in that order
  as wanted
  */

  return previousResistors.reverse().concat(thisAndNextResistors);
}

/**
 * @param {TreeVertex} treeVertex The treeVertex in which direction to go
 * @param {ResistorComponent} resistor The resistor component to go away from
 * @param {ResistorComponent[]} [out=[]] The array to which this export function will append the result to 
 * @param {?ResistorComponent} [withinAbstraction=null] The resistor component which may own resistors added to the out array
 * @param {WeakSet<ResistorComponent>} [visitedResistors]
 */
export function _getSerialResistors_getLinearInDirection(treeVertex, resistor, out=[], withinAbstraction=null, visitedResistors=new WeakSet()) {
  // We may assume that the inputs are validated because this is a "private" function
  let rootedTreeVertex = treeVertex.getRoot();
  let backwardsResistor = resistor;

  /*
  We know that the following loop is not infinite;
  this is because each iteration, we add the resistor to a WeakSet (visitedResistors)
  and we don't create a new resistor within the loop.
  Therefore this loop can only run once per ResistorComponent that has been instantiated
  which we know must be finite.
  */
  while (true) {
    let resistorsFromVertex = getConnectedComponents(rootedTreeVertex, withinAbstraction);
    if (resistorsFromVertex.length !== 2) {
      // Not linear anymore
      break;
    }

    let nextResistor = resistorsFromVertex[0];

    if (nextResistor === backwardsResistor) {
      nextResistor = resistorsFromVertex[1];
      if (nextResistor === backwardsResistor) {
        // We don't handle shorted resistors here; the next outer iteration of "clear-shorted, merge parallel, merge serial" should clear the shorted resistor though
        break;
      }
    }

    if (!(nextResistor instanceof ResistorComponent)) {
      // Next resistor isn't actually a resistor, so we're done
      break;
    }
    if (visitedResistors.has(nextResistor)) {
      // We've made a full loop
      break;
    }
    visitedResistors.add(nextResistor);

    out.push(nextResistor);
    
    let nextRootedTreeVertex = nextResistor.sideA.getRoot();
    if (nextRootedTreeVertex === rootedTreeVertex) {
      nextRootedTreeVertex = nextResistor.sideB.getRoot();
      // We don't need to check again
      // because we've already validated that nextResistor is not shorted
      // because it only appeared once in the list of resistors attached to this tree
    }

    backwardsResistor = nextResistor;
    rootedTreeVertex = nextRootedTreeVertex;
  }

  return out;
}

/**
 * @param {TreeVertex} treeVertex 
 * @returns {Component[]} A list of components attached to the tree the tree vertex is part of. If
 * the component is shorted, it appears twice in this list.
 */
export function getConnectedComponents(treeVertex) {
  if (!(treeVertex instanceof TreeVertex)) return [];
  const connectedComponents = [];
  treeVertex.forEachInTree(function(iteratedVertex) {
    if (iteratedVertex.value instanceof Component) {
      const component = iteratedVertex.value;

      if (component.isActive()) {
        connectedComponents.push(iteratedVertex.value);
      }
    }
  });
  return connectedComponents;
};

/**
 * @param {TreeVertex} treeVertex 
 * @returns {Component[]} A list of components attached to the tree the tree vertex is part of. If
 * the component is shorted, it appears twice in this list.
 */
export function getAllConnectedComponents(treeVertex) {
  if (!(treeVertex instanceof TreeVertex)) return [];
  const connectedComponents = [];
  treeVertex.forEachInTree(function(iteratedVertex) {
    if (iteratedVertex.value instanceof Component) {
      const component = iteratedVertex.value;

      
      connectedComponents.push(iteratedVertex.value);
    }
  });
  return connectedComponents;
};

/**
 * @param {TreeVertex} treeVertex 
 * @returns {number}
 */
export function getConnectedComponentCount(treeVertex) {
  if (!(treeVertex instanceof TreeVertex)) return 0;
  const components = getConnectedComponents(treeVertex);
  let doubleCounted = 0;
  const seenComponents = new WeakSet();
  for (let i = 0; i < components.length; i++) {
    if (seenComponents.has(components[i])) {
      doubleCounted += 1;
    }
    seenComponents.add(components[i]);
  }
  return components.length - doubleCounted;
}
/**
 * @param {ResistorComponent[]} resistorList
 * @param {?ResistorComponent} [withinAbstraction=null]
 * @returns {boolean}
 */
export function isResistorListSerialPath(resistorList, withinAbstraction=null) {
  if (!Object.hasOwn(resistorList, "length")) return false; // If the list is not array-like, return false

  for (let i = 0; i < resistorList.length; i++) {
    const resistor = resistorList[i];
    if (!(resistor instanceof ResistorComponent)) {
      // If any element is not a ResistorComponent, then it's not a serial resistor path
      return false;
    }

    if (!resistor.isActive(withinAbstraction)) {
      // If any resistor is abstracted away and we aren't supposed to peek inside the abstraction, then it's not valid
      return false;
    }
  }

  // Zero or length lists are always serial, since the previous checks happened
  if (resistorList.length <= 1) return true; 

  for (let i = 1; i < resistorList.length; i++) {
    const resistor = resistorList[i];
    const previousResistor = resistorList[i - 1];
    const componentCountAtSideA = getConnectedComponentCount(resistor.sideA);
    const componentCountAtSideB = getConnectedComponentCount(resistor.sideB);
    const resistorsAtSideA = getConnectedResistors(resistor.sideA);
    const resistorsAtSideB = getConnectedResistors(resistor.sideB);

    if (componentCountAtSideA !== 2) {
      if (i + 1 !== resistorList.length) {
        // The path branches in the middle, and therefore resistorList isn't a set of resistors in series
        return false;
      } else if (componentCountAtSideB !== 2) {
        alert("This message occurs when there's branching on both sides of the last resistor, but it wasn't detected in the previous resistor. This shouldn't be possible, and this alert happening means that there was a severe error somewhere in the code. Possible causes include manually modifying trees")
        return false;
      }
    } else if (componentCountAtSideB !== 2 && i + 1 !== resistorList.length) {
      // The path branches in the middle, and therefore resistorList isn't a set of resistors in series
      return false;
    }
    
    // We may assume that if there is a path backwards, then the path from behind also goes forwards.
    if (resistorsAtSideA.indexOf(previousResistor) === -1 && resistorsAtSideB.indexOf(previousResistor) === -1) {
      // there's no path backwards
      return false;
    }
  }
  // We have validated the following:
  // 1. There is a path from the first to the last resistors
  // 2. The path contains no branches
  // 3. All resistors are all part of the provided resistor or of no resistor
  // Therefore, the list is a valid list of resistors in series
  return true;
}
/**
 * @export function getShortedResistors()
 * @param {TreeVertex} treeVertex
 * @param {?ResistorComponent} component
 * @returns {ResistorComponent[]} A list of all resistors which start and end in the 
 * same tree as the provided treeVertex
 */
export function getShortedResistors(treeVertex, withinAbstraction=null) {
  if (!(treeVertex instanceof TreeVertex)) return [];
  const shortedResistors = [];
  const visitedResistors = new WeakSet();
  const resistors = getConnectedResistors(treeVertex, withinAbstraction);

  for (var i = 0; i < resistors.length; i++) {
    const resistor = resistors[i];
    if (visitedResistors.has(resistor)) {
      shortedResistors.push(resistor);
    }
    visitedResistors.add(resistor);
  }

  return shortedResistors;
}
/**
 * @param {Component} component
 * @returns {Component[]} A list of all components that are directly or indirectly connected
 * to the provided component.
 */
export function getAllComponents(component) {
  if (!(component instanceof Component)) return []; // There's no components connected to a non-component object

  // Setup data structures
  /** @type {WeakSet<Co-mponent | TreeVertex>} */
  const visitedObjects = new WeakSet();
  /** @type {TreeVertex[]} */
  const openSet = [];
  /** @type {Component[]} */
  const visitedList = [];

  // Seed initial state
  openSet.push(component.sideA.getRoot());
  visitedObjects.add(openSet[0]);

  // Graph search
  do {
    const treeRoot = openSet.pop();
    const components = getConnectedComponents(treeRoot);
    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      if (!visitedObjects.contains(component)) {
        visitedObjects.add(component);
        visitedList.push(component);
        
        const sideARoot = component.sideA.getRoot();
        const sideBRoot = component.sideB.getRoot();

        if (!visitedObjects.contains(sideARoot)) {
          openSet.push(sideARoot);
          visitedObjects.add(sideARoot);
        }
        if (!visitedObjects.contains(sideBRoot)) {
          openSet.push(sideBRoot);
          visitedObjects.add(sideBRoot);
        }
      }
    }
  } while (openSet.length > 0);
  return visitedList;
}
/**
 * 
 * @param {Component} component The component to start the search from
 * @returns {ResistorComponent[]} All resistor components that are connected, directly or
 * indirectly, to the provided component (including the component itself, if it is a resistor). 
 */
export function getAllResistors(component) {
  const componentList = getAllComponents(component);
  const resistorList = componentList.filter(component => component instanceof ResistorComponent);

  return resistorList;
}
/**
 * 
 * @param {TreeVertex[]} openList Edited
 * @param {WeakSet<TreeVertex>} exploredRoots Edited
 * @param {WeakSet<Component>} exploredComponentWeakset Edited 
 * @param {Component[]} newlyVisitedComponents 
 * @returns {Component[]} The list of components that are newly added to the open list
 */
export function _graphSearchIter(openList, exploredRoots, exploredComponentWeakset, newlyVisitedComponents=[]) {
  // Do for side A
  const root = openList.pop();

  // Mark the root as visited by the side
  exploredRoots.add(root);
  
  // One iteration of DFS on side A
  const components = getConnectedComponents(root);
  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    if (exploredComponentWeakset.has(component)) continue;

    exploredComponentWeakset.add(component);
    newlyVisitedComponents.push(component);
    const resARoot = component.sideA.getRoot();
    const resBRoot = component.sideB.getRoot();
    
    if (!exploredRoots.has(resARoot)) {
    //if (!resARoot[sideASymbol]) {
      openList.push(resARoot);
      exploredRoots.add(resARoot);
    }
    if (!exploredRoots.has(resBRoot)) {
      openList.push(resBRoot);
      exploredRoots.add(resBRoot);
    }
  }
  return newlyVisitedComponents
};
/**
 * @param {Component} component 
 * @returns {boolean} Whether the resistor is in a loop
 */
export function isComponentInLoop(component) {
  if (!(component instanceof Component)) return false; // Not a component
  // The algorithm is simple: 
  // Interlaced DFS from both sides of the resistor
  // Keep track of which TreeVertex roots are visited from each side
  // If any TreeVertex roots are visited from both sides, return true
  // If either side's open set is empty, return false

  // The reason for the two-way search is that it makes the maximum search
  // time limited by the smallest connected component on one side of the
  // resistor. A one-side search also works, but in practice can be much slower.
  const sideAOpenList = [];
  const sideBOpenList = [];
  const sideAExplored = new WeakSet();
  const sideBExplored = new WeakSet();
  
  sideAOpenList.push(component.sideA.getRoot());
  sideBOpenList.push(component.sideB.getRoot());

  sideAExplored.add(component);
  sideBExplored.add(component);
  // component[exploredComponentSymbol] = true;
  
  const newlyVisitedComponents = [];


  do {
    _graphSearchIter(sideAOpenList, sideAExplored, sideAExplored, newlyVisitedComponents);
    for (let i = 0; i < newlyVisitedComponents.length; i++) {
      if (sideBExplored.has(newlyVisitedComponents[i])) {
        return true;
      }
    }
    newlyVisitedComponents.length = 0;
    _graphSearchIter(sideBOpenList, sideBExplored, sideBExplored, newlyVisitedComponents);
    for (let i = 0; i < newlyVisitedComponents.length; i++) {
      if (sideAExplored.has(newlyVisitedComponents[i])) {
        return true;
      }
    }
    newlyVisitedComponents.length = 0;
  } while (sideAOpenList.length > 0 && sideBOpenList.length > 0);

  return false;
};
/**
 * @param {TreeVertex} treeVertex
 * @returns {TreeVertex[]} A list of TreeVertex instances which are roots connected to the provided tree
 * represented by the provided TreeVertex by a resistor.
 */
export function getConnectedRoots(treeVertex) {
  const treeRoot = treeVertex.getRoot();
  const connectedResistors = getConnectedResistors(treeRoot);
  const rootList = [];
  const visitedRoots = new WeakSet();

  const visitedSymbol = Symbol();
  treeRoot[visitedSymbol] = true;
  visitedRoots.add(treeRoot);

  for (let i = 0; i < connectedResistors.length; i++) {
    const rootA = connectedResistors[i].sideA.getRoot();
    const rootB = connectedResistors[i].sideB.getRoot();
    if (!visitedRoots.has(rootA)) {
      rootList.push(rootA);
      visitedRoots.add(rootA);
    }
    if (!visitedRoots.has(rootB)) {
      rootList.push(rootB);
      visitedRoots.add(rootB);
    }
  }

  return rootList;
}
/**
 * @param {Component} component 
 * @returns {boolean} Whether the provided component is connected (directly or indirectly)
 * to any VoltageSourceComponent set to true
 */
export function isConnectedToSource(component) {
  if (!(component instanceof Component)) return false;

  // TODO
  const openList = [component.sideA.getRoot()];
  const visitedSet = new WeakSet();
  visitedSet.add(openList[0]);

  do {
    const root = openList.pop();
    const components = getConnectedComponents(root);
    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      const sideARoot = component.sideA.getRoot();
      const sideBRoot = component.sideB.getRoot();

      if (component instanceof VoltageSourceComponent) {
        return true;
      }

      if (!visitedSet.has(sideARoot)) {
        visitedSet.add(sideARoot);
        openList.push(sideARoot);
      }
      if (!visitedSet.has(sideBRoot)) {
        visitedSet.add(sideBRoot);
        openList.push(sideBRoot);
      }
    }
  } while (openList.length > 0);
  
  return false;
};

/**
 * @param {TreeVertex} treeVertex
 * @param {(tv: TreeVertex) => boolean} stopCondition
 * @returns {TreeVertex[] | undefined} A path through these tree vertices
 */
export function bfsFromNode(treeVertex, stopCondition) {
  const paramNode = treeVertex.getRoot();
  const openList = new Queue([treeVertex]);
  const backwardsPath = new WeakMap();

  let visitedCount = 0;
  backwardsPath.set(paramNode, null);

  while (openList.length > 0) {
    visitedCount += 1;
    const node = openList.pop();
    if (stopCondition(node)) {
      const returnValue = [];
      let currentPos = node;
      let pathLength = 0;
      do {
        pathLength += 1;
        returnValue.push(currentPos);
        currentPos = backwardsPath.get(currentPos);
        if (pathLength > visitedCount) {
          Debug.error("Path is longer than the number of vertices");
          return returnValue;
        }
      } while (currentPos !== null);

      return returnValue;
    }

    for (const edge of getAllConnectedComponents(node)) {
      const nodeA = edge.sideA.getRoot();
      if (!backwardsPath.has(nodeA)) {
        backwardsPath.set(nodeA, node);
        openList.push(nodeA);
      }
      const nodeB = edge.sideB.getRoot();
      if (!backwardsPath.has(nodeB)) {
        backwardsPath.set(nodeB, node);
        openList.push(nodeB);
      }
    }
  }

  return undefined;
};

/**
 * @export function applySimplificationIteration(resistorList) {
 * @param {ResistorComponent []} componentList The list of resistors that the iteration should
 * apply to. This list might be modified by the method, adding new resistors or removing
 * resistors that have been abstracted away.
 * @returns {boolean} Whether this iteration has modified the resistors. If the return value
 * is false, calling this method did not change (and, within the same version, will not further
 * change) the resistors.
 */
export function applySimplificationIteration(componentList, componentSet) {
  /*
  Iterate through the resistors. Do the following:
  1.  Mark resistors which are shorted as owned by themselves (they're shorted, so current will 
      not pass through them)
  2.  Mark resistors which are not part of a cycle as owned by themselves (they're in a dead end,
      so current will not pass through them)
  3.  Remove components that are disconnected from any VoltageSourceComponent or CurrentSourceComponent
  4.  Find and abstract away parallel resistors
  5.  Find and abstract away serial resistors
  
  Finally, return whether this iteration has changed anything in the graph

  */
  if (!Object.hasOwn(componentList, "length")) {
    // List isn't a list, nothing changed
    Debug.error("resistorList is not a list");
    return false;
  }

  // Check if everything is a component
  for (var i = 0; i < componentList.length; i++) {
    const component = componentList[i];
    if (!(component instanceof Component)) {
      // We've changed nothing, because not everything is a component here
      return false;
    }
  }

  const wasAnythingShorted = _simplify_trimShorted(componentList);
  const wasAnythingDeadEnd = _simplify_trimDeadEnd(componentList);
  const wasAnythingDisconnected = _simplify_trimDisconnected(componentList);
  const wasAnythingParallel = _simplify_mergeParallel(componentList, componentSet);
  const wasAnythingSerial = _simplify_mergeSerial(componentList, componentSet);

  return wasAnythingShorted || wasAnythingDeadEnd || wasAnythingDisconnected || wasAnythingParallel || wasAnythingSerial;
};
export function _simplify_trimShorted(resistorList) {
  let hasTrimmedShorted = false;
  // Get rid of shorted resistors
  for (let i = resistorList.length - 1; i >= 0; i--) {
    // Reverse iteration to allow for using splice to get rid of shorted resistors
    const resistor = resistorList[i];
    if (resistor.isShorted()) {
      resistor.disableComponent();
      resistorList.splice(i, 1);
      hasTrimmedShorted = true;
      Debug.info("Trimmed shorted component");
    }
  }
  return hasTrimmedShorted;
};
export function _simplify_trimDeadEnd(resistorList) {
  let hasTrimmedDeadEnd = false;
  // Get rid of resistors that are not in a loop
  for (let i = resistorList.length - 1; i >= 0; i--) {
    const resistor = resistorList[i];
    if (!isComponentInLoop(resistor)) {
      resistor.disableComponent();
      resistorList.splice(i, 1);
      hasTrimmedDeadEnd = true;
    }
  }
  return hasTrimmedDeadEnd;
};
export function _simplify_trimDisconnected(resistorList) {
  let hasTrimmedDisconnected = false;
  // Get rid of resistors that are not connected to any voltage source
  for (let i = resistorList.length - 1; i >= 0; i--) {
    const resistor = resistorList[i];
    if (!isConnectedToSource(resistor)) {
      resistor.disableComponent();
      resistorList.splice(i, 1);
      hasTrimmedDisconnected = true;
      Debug.info("Trimmed disconnected component");
    }
  }
  return hasTrimmedDisconnected;
};
export function _simplify_mergeParallel(resistorList, componentSet=new WeakSet()) {
  let hasSimplifiedParallel = false;
  for (let i = 0; i < resistorList.length; i++) {
    const resistor = resistorList[i];
    const parallelResistors = getParallelResistors(resistor);
    const parallelResistorSet = new WeakSet(parallelResistors);
    if (parallelResistors.length > 1) {
      // Abstract them out
      const newResistor = ParallelResistorComponent.fromResistorList(parallelResistors);
      if (newResistor === null) continue;

      componentSet.add(newResistor);
      // Remove from resistorList
      // Intentionally j > i
      // We don't splice out index i because we later replace it with the new resistor
      for (let j = resistorList.length - 1; j > i; j--) {
        if (parallelResistorSet.has(resistorList[j])) {
          resistorList.splice(j, 1);
        }
      }
      
      hasSimplifiedParallel = true;
      resistorList[i] = newResistor;
      Debug.info("Merged parallel resistors");
    }
  }
  return hasSimplifiedParallel;
};
export function _simplify_mergeSerial(resistorList, componentSet=new WeakSet()) {
  let hasSimplifiedSerial = false;
  for (let i = 0; i < resistorList.length; i++) {
    const resistor = resistorList[i];
    const serialResistors = getSerialResistors(resistor);
    if (serialResistors.length > 1) {
      // Abstract them out
      const newResistor = SerialResistorComponent.fromResistorList(serialResistors);
      if (newResistor === null) continue;

      componentSet.add(newResistor);
      // Remove from resistorList
      // Intentionally j > i
      // We don't splice out index i because we later replace it with the new resistor
      for (let j = resistorList.length - 1; j > i; j--) {
        for (let k = serialResistors.length - 1; k >= 0; k--) {
          if (resistorList[j] === serialResistors[k]) {
            resistorList.splice(j, 1);
            serialResistors.splice(k, 1);
          }
        }
      }
      // Set hasSimplifiedSerial to true
      hasSimplifiedSerial = true;
      resistorList[i] = newResistor;
      Debug.info("Merged serial resistors");
    }
  }
  return hasSimplifiedSerial;
};

export function removeInfiniteResistance(componentList) {
  for (let i = componentList.length - 1; i >= 0; i--) {
    const component = componentList[i];
    if (component instanceof ResistorComponent && !isFinite(component.resistance)) {
      component.disableComponent();
      componentList.splice(i, 1);
    }
  }
};

export function simplify(componentList) {
  // Iteratively call applySimplificationIteration
  // componentList = Array.from(componentList);
  let didSimplify = true;
  const componentSet = new WeakSet(componentList);

  removeInfiniteResistance(componentList);

  while (didSimplify) {
    didSimplify = applySimplificationIteration(componentList, componentSet);
  }
  return componentSet;
}

/**
 * @export function compile
 * @param {Component[]} componentList 
 * @param {math.Matrix} matrix 
 * @returns {WeakSet<Component>}
 */
export function compile(componentList, calculator) {
  // Simplify
  const componentSet = simplify(componentList);
  // const componentSet = new WeakSet(componentList);
  
  // Get unique components
  const matrix = calculator.matrix;
  const uniqueSet = new WeakSet();
  /** @type {Component[]} */
  const uniqueComponents = [];
  /** @type {TreeVertex[]} */
  const uniqueNodes = [];
  for (let i = componentList.length - 1; i >= 0; i--) {
    const component = componentList[i];
    if (!uniqueSet.has(component)) {
      uniqueComponents.push(component);
      uniqueSet.add(component);
      
      const sideARoot = component.sideA.getRoot();
      if (!uniqueSet.has(sideARoot)) {
        uniqueNodes.push(sideARoot);
        uniqueSet.add(sideARoot);
      }

      const sideBRoot = component.sideB.getRoot();
      if (!uniqueSet.has(sideBRoot)) {
        uniqueNodes.push(sideBRoot);
        uniqueSet.add(sideBRoot);
      }
    }
  }

  // Assign each node and element an ID number
  const componentCount = uniqueComponents.length;
  const nodeCount = uniqueNodes.length;
  let itemId = 0;
  /** @type {WeakMap<object, number>} */
  let idByPart = new WeakMap();
  let partById = [];
  
  for (let i = 0; i < componentCount; i++) {
    idByPart.set(uniqueComponents[i], itemId);
    partById[itemId] = uniqueComponents[i];
    itemId += 1;
  }
  for (let i = 0; i < nodeCount; i++) {
    idByPart.set(uniqueNodes[i], itemId)
    partById[itemId] = uniqueNodes[i];
    itemId += 1;
  }
  calculator._idByPart = idByPart;
  calculator._partById = partById;
  
  // Set up matrix
  // The number of equations is twice the number of components that exist
  // and that number is equal to the number of rows

  // Clear matrix
  matrix.resize([0, 0])
  matrix.resize([componentCount + nodeCount, componentCount + nodeCount], 0);

  // In the convention of this program, current flowing from sideA to sideB of a component is +ve current
  // To make -ab-AB-AB-AB-loop work, where "ab" is a battery, and current is always positive, this means that
  // the positive terminal of the battery is sideB.
  // Algorithm: 
  // First, we iterate through each component.
  // We encode V=IR in this step
  let batteryA = -1;
  for (let i = 0; i < componentCount; i++) {
    const component = uniqueComponents[i];
    const componentId = idByPart.get(component);
    const row = componentId;
    const aRoot = component.sideA.getRoot();
    const bRoot = component.sideB.getRoot();

    const aId = idByPart.get(aRoot);
    const bId = idByPart.get(bRoot);
    if (componentId === undefined || aId === undefined || bId === undefined) {
      Debug.error("Component list does not contain entire connected component");
    }
    if (component instanceof ResistorComponent) {
      // For resistors:
      // A Node Voltage - B Node Voltage = Component Current * Component Resistance
      // componentCurrent * CONST_RESISTANCE - aVoltage + bVoltage = 0
      // vars[componentId] * CONST_RESISTANCE - vars[a] + vars[b] = 0
      matrix.set([row, componentId], component.resistance);
      matrix.set([row, aId], -1);
      matrix.set([row, bId], 1);
    } else if (component instanceof VoltageSourceComponent) {
      // For voltage sources:
      // A Node Voltage + Component Voltage = B Node Voltage
      // Current from the A node to the B node is an unknown determined by Kirchhoff's Current Law
      // aVoltage + BATTERY_VOLTAGE = bVoltage
      // bVoltage - aVoltage = BATTERY_VOLTAGE
      matrix.set([row, aId], -1);
      matrix.set([row, bId], 1);
      batteryA = aId;
    } else {
      Debug.error("Unsupported component type");
    }
  }
  
  // Second, we iterate over every node.
  // We encode Kirchhoff's Current Law in this step
  for (let i = 0; i < nodeCount; i++) {
    const node = uniqueNodes[i];
    const nodeId = idByPart.get(node);
    if (nodeId === batteryA) {
      // Special case: we don't need to encode Kirchhoff's Current Law in every node
      // because with the N nodes, Kirchhov's Current Law will encode N - 1 linearly
      // independent equations. With this specific node (defined as the negative terminal
      // of an arbitrary battery), we set the voltage at this node to be 0. This will
      // make that the voltage is a known value.
      matrix.set([nodeId, nodeId], 1);
      continue;
    }

    const row = nodeId;
    // Adding the component current of all components with this node as sideB, 
    // and subtracting the component current of all components with this node as sideA,
    // we set the resulting value to 0
    const connectedComponents = getConnectedComponents(node);
    for (let j = 0; j < connectedComponents.length; j++) {
      const component = connectedComponents[j];
      const componentId = idByPart.get(component);

      if (componentId === undefined) {
        continue;
      }

      if (component.sideA.getRoot() === node) {
        // Negative, because the component's sideA is this node
        // we can assume that the component is not shorted because the component's sideA is not this
        
        // - Component Current
        matrix.set([row, componentId], -1);

      } else {
        // Positive, because the component's sideB is this node

        // + Component Current
        matrix.set([row, componentId], 1);
      }
    }
  }
  calculator._partById = partById;
  return componentSet;
};
