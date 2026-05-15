export class TreeVertex {
  constructor(value) {
    /** @type {*} */
    this.value = value;
    /** @type {TreeVertex} */
    this.parent = null;
    /** @type {TreeVertex[]} */
    this.children = [];
  }

  /**
   * @param {TreeVertex} vertex 
   */
  addChild(vertex) {
    // Short-circuit if vertex is already a child of this vertex
    if (vertex.parent === this) {
      return;
    }

    // Short-circuit if vertex is trying to set itself as its own parent
    if (vertex === this) {
      return;
    }

    // Remove vertex from previous parent's children
    if (vertex.parent !== null) {
      const index = vertex.parent.children.indexOf(vertex);
      if (index !== -1) {
        vertex.parent.children.splice(index, 1);
      }
    }

    // Set new parent
    vertex.parent = this;

    // Add child to this vertex's children
    this.children.push(vertex);
  }

  removeChild(vertex) {
    if (vertex.parent === this) {
      vertex.parent = null;
      this.children.splice(this.children.indexOf(vertex), 1);
    }

  }

  /**
   * 
   * @param {TreeVertex} vertex 
   * @description Connects this vertex to another vertex, maintaining current connections. If 
   * these vertices are already connected in the tree, do nothing and return false
   * 
   * @returns {boolean} Whether a new connection is added
   */
  addConnection(vertex) {
    if (this.isInSameTreeWith(vertex)) {
      return false;
    }
    if (this.parent === null) {
      // O(1) solution: If this doesn't have a parent, then make the other vertex the parent of this.
      vertex.addChild(this);
    } else if (vertex.parent === null) {
      // O(1) solution: if vertex doesn't have parent, then make this the parent of the vertex
      this.addChild(vertex);
    } else {
      // O(n) solution: Make one of the vertices be a root then make the other vertex be the parent
      this.reroot();
      vertex.addChild(this);
    }
    return true;
  }

  /**
   * @description Make this TreeVertex the root of the tree
   */
  reroot() {
    // Traverse up to the root of the tree and store the path
    const path = [];
    let current = this;
    while (current.parent !== null) {
      path.push(current);
      current = current.parent;
    }

    // Make this vertex the new root
    this.parent = null;

    // Update distances between vertices along the path to the new root
    for (let i = path.length - 1; i >= 0; i--) {
      const vertex = path[i];
      const parent = i > 0 ? path[i - 1] : this;

      // Remove vertex from parent's children
      const index = parent.children.indexOf(vertex);
      if (index !== -1) {
        parent.children.splice(index, 1);
      }

      // Update parent and child relationships
      vertex.parent = parent;
      parent.children.push(vertex);
    }
  }

  /**
   * @returns {TreeVertex} the root of the tree
   */
  getRoot() {
    let current = this;
    while (current.parent !== null) {
      current = current.parent;
    }
    return current;
  }

  forEachDescendant(callback) {
    let dfsStack = [this];
    
    while (dfsStack.length > 0) {
      let top = dfsStack.pop();
      callback(top);
      for (let i = 0; i < top.children.length; i++) {
        dfsStack.push(top.children[i]);
      }
    }
  }

  /**
   * 
   * @param {forEachCallback} callback 
   */
  forEachInTree(callback) {
    this.getRoot().forEachDescendant(callback);
  }

  /**
   * @function isInSameTreeWith(treeVertex)
   * @param {TreeVertex} treeVertex 
   * @returns {boolean} Whether this vertex is in the same tree with the other vertex
   */
  isInSameTreeWith(treeVertex) {
    const thisRoot = this.getRoot();
    const thatRoot = treeVertex.getRoot();
    return thisRoot === thatRoot;
  }

  /**
   * @function isDescendantOf(treeVertex)
   * @param {TreeVertex} treeVertex 
   * @returns {boolean} Whether this TreeVertex is a (strict) descendant of the provided TreeVertex
   */
  isDescendantOf(treeVertex) {
    if (this === treeVertex) {
      return false;
    }

    let check = this.parent;
    while (check !== null) {
      if (check === treeVertex) {
        return true;
      }
      check = check.parent;
    }

    return false;
  }

  /**
   * @function isAncestorOf(treeVertex)
   * @param {TreeVertex} treeVertex 
   * @returns {boolean} Whether this TreeVertex is an ancestor of the provided TreeVertex
   */
  isAncestorOf(treeVertex) {
    return treeVertex.isDescendantOf(this);
  }

  /**
   * @function isParentOf(treeVertex)
   * @param {TreeVertex} treeVertex 
   * @returns {boolean} Whether this TreeVertex is a parent of the provided TreeVertex
   */
  isParentOf(treeVertex) {
    return treeVertex.parent === this;
  }
  /**
   * @function isChildOf(treeVertex)
   * @param {treeVertex} treeVertex 
   * @returns {boolean} Whether this TreeVertex is a child of the provided TreeVertex
   */
  isChildOf(treeVertex) {
    return this.parent === treeVertex;
  }

  /**
   * 
   * @param {TreeVertex} treeVertex 
   * @returns {boolean} Whether this TreeVertex is directly connected to the provided TreeVertex
   */
  isDirectlyConnectedTo(treeVertex) {
    return this.isParentOf(treeVertex) || this.isChildOf(treeVertex);
  }

  /**
   * @function removePreservingConnectedness()
   * @desc removes this TreeVertex, but makes its parent the parent of all its orphaned children,
   * or an arbitrary child the parent, if this vertex has no parent.
   */
  removePreservingConnectedness() {
    if (this.parent === null) {
      if (this.children.length === 0) {
        // We are aleady disconnected
        return;
      }
      this.parent = this.children.pop();
      this.parent.parent = null;
    }
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].parent = this.parent;
      this.parent.children.push(this.children[i]);
    }
  }

  /**
   * @function removeDisconnecting()
   * @desc Removes this TreeVertex, and disconnect parent from this vertex, and
   * disconnect all the children of this vertex from this vertex.
   */
  removeDisconnecting() {
    if (this.parent !== null) {
      this.parent.removeChild(this);
    }
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].parent = null;
    }
    this.children.length = 0;
  }

  disconnectFromParent() {
    if (this.parent !== null) {
      this.parent.children.splice(this.parent.children.indexOf(this), 1);
      this.parent = null;
    }
  }
}


/**
 * @callback forEachCallback
 * @param {TreeVertex} vertex
 */
