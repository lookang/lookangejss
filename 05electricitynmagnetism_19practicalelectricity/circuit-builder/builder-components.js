import { isPointInRectangle } from "./lib/collion-checking.js"
import { Images } from "./circuit-builder.js";

export class Component {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;

    this.image = image;
    // this.width = this.image.width;
    // this.height = this.image.height;
    this.width = 80;
    this.height = 64;
    this.connectionPoints = [];
    this.connectedComponents = [];
  }

  isPointInside(x, y) {
    return isPointInRectangle(x, y, this.x, this.y, this.x + this.width, this.y + this.height);
  }

  moveTo(x, y) {
    var dx = x - this.x;
    var dy = y - this.y;

    this.moveBy(dx, dy);
  }

  moveBy(dx, dy, _alreadyMoved=new WeakSet()) {
    if (_alreadyMoved.has(this)) return;
    _alreadyMoved.add(this);
    this.x += dx;
    this.y += dy;
    this.connectedComponents.forEach(component => component.moveBy(dx, dy, _alreadyMoved));
  }

  draw(p) {
    p.image(this.image, this.x, this.y, this.width, this.height, 0, 0, this.image.width, this.image.height, p.CONTAIN);
  }
}

export class Battery extends Component {
  constructor(x, y, voltage=1.5) {
    super(x, y, Images.battery);
    this.innerComponent = new VoltageSourceComponent(voltage);
  };
}

export class Lamp extends Component {
  constructor(x, y) {
    super(x, y, Images.lamp);
    this.innerComponent = new ResistorComponent(1);
  }
}
export class Rheostat extends Component {
  constructor(x, y, maxResistance=20) {
    super(x, y, Images.rheostatCoil);
    this.headImage = Images.rheostatHead;
    this.maxResistance = maxResistance;
    this.setting = 0.5;
    this.innerComponent = new ResistorComponent(maxResistance * this.setting);

    this.sliderLeft = -150;
    this.sliderRight = 150;
  }
  
  draw(p) {
    super.draw(p);
    p.image(this.headImage, this.x, this.y, this.width, this.height, 0, 0, this.image.width, this.image.height, p.CONTAIN);
  }
}
export class Switch extends Component {
  constructor(x, y) {
    super(x, y, Images.switchOpen);
    this.innerComponent = new ResistorComponent(0);
  }
}
