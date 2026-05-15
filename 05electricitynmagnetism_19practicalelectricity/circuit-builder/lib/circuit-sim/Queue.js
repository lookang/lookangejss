
class Queue {
  /**
   * 
   * @param {Iterable<T> | T} iterableOrT 
   */
  constructor(iterableOrT) {
    if (iterableOrT === undefined) {
      /** @type {Array.<T>} */
      this._data = [];
    } else if (iterableOrT != null && iterableOrT[Symbol.iterator] !== undefined) {
      /* INTENTIONALLY USING != RATHER THAN !== */
      this._data = Array.from(iterableOrT);
    } else {
      /** @type {Array.<T>} */
      this._data = [iterableOrT];
    }
    /** @type {number} */
    this._start = 0;
    /** @type {number} */
    this._end = this._data.length;
    /** @type {number} */
    this._listResizeMultiplier = 2;
    /** @type {number} */
    this._listResizeSlack = 64;
  }

  get length() {
    if (this._start <= this._end) {
      return this._end - this._start;
    } else {
      return this._end - this._start + this._data.length;
    }
  }

  set length(val) {
    if (val > this.length) {
      throw "Cannot extend queue";
    }
    if (val + this._start <= this._data.length) {
      // We can just snip a bit off the end
      // This leaves junk data at the start
      this._data.length = val + this._start;
      this._end = this._data.length;
    } else {
      // We need to rearrange the data so that we can fit everything in
      // We're going to do the easy thing and just pull the data out, then
      // change the current data
      this.repackData(val);
    }
  }

  /**
   * @param {number} [upTo] 
   */
  repackData(upTo) {
    if (upTo === undefined) {
      upTo = this.length;
    }
    const data = [];
    data.length = upTo;
    for (let i = 0; i < upTo; i++) {
      data[i] = this._data[(this._start + i) % this._data.length];
    }
    this._data.length = upTo;
    for (let i = 0; i < upTo; i++) {
      this._data[i] = data[i];
    }
    this._start = 0;
    this._end = this._data.length;
  }

  /**
   * @param {T} data 
   */
  push(data) {
    if (this._end === this.start - 1) {
      this.repackData();
    }
    this._data[this._end] = data;
    this._end += 1;
  }

  /**
   * @returns {T | undefined}
   */
  pop() {
    if (this._end === this._start) { return undefined; }

    this._end -= 1;
    if (this._end < 0) {
      this._end = this._data.length - 1;
    }
    if (this.length * this._listResizeMultiplier + this._listResizeMultiplier < this._data.length) {
      this.repackData();
      // Maybe resize
    }
    return this._data[this._end];
  }

  /**
   * 
   * @returns {T | undefined}
   */
  peek() {
    if (this._end === this._start) { return undefined; }

    if (this._end === 0) {
      return this._data[this._data.length - 1];
    } else {
      return this._data[this._end - 1];
    }
  }
}
