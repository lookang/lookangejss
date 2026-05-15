import { SimObject } from "./sim-object-manager";
import { SimObjectManager } from "./sim-object-manager";
import { HalfPlaneCollisionMask } from "./lib/collion-checking";

export class Gui extends SimObject {
  constructor() {
    this.mask = new HalfPlaneCollisionMask(128, 0, -1, 0);
  }
}

export class SidebarButton extends SimObject {
  constructor(img, xOffset, yOffset, dragRightResult) {}
}
