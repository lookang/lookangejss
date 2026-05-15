

export class AxisAlignedRectangle {
  #x;
  #y;
  #width;
  #height;
  
  constructor(x, y, width, height) {
    this.#x = x;
    this.#y = y;
    this.#width = width;
    this.#height = height;

    if (this.#width < 0) {
      this.#x += this.#width;
      this.#width = -this.#width;
    }
    if (this.#height < 0) {
      this.#y += this.#height;
      this.#height = -this.#height;
    }
    
    console.assert(this.#width >= 0, "Axis aligned rectangle broke invariant (width >= 0)");
    console.assert(this.#height >= 0, "Axis aligned rectangle broke invariant (height >= 0)");
  }

  get left() { return this.#x; }
  get top() { return this.#y; }
  get right() { return this.#x + this.#width; }
  get bottom() { return this.#y + this.#height; }

  translateBy(x, y) {
    this.#x += x;
    this.#y += y;
  }

  scaleBy(scaleAlongX, scaleAlongY, originX=0, originY=0) {
    this.#x = (this.#x - originX) * scaleAlongX + originX;
    this.#y = (this.#y - originY) * scaleAlongY + originY;
    this.#width *= scaleAlongX;
    this.#height *= scaleAlongY;
  }
}
