import { AxisAlignedRectangle } from "./geometry.js"
import { lerp } from "./interpolation.js";

/**
 * @param {number} aStart The start of the first interval
 * @param {number} aEnd   The end of the first interval
 * @param {number} bStart The start of the second interval
 * @param {number} bEnd   The end of the second interval
 * @returns {boolean} Whether the two intervals have any intersection, including degenerate intersections
 */
export function doIntervalsOverlap(aStart, aEnd, bStart, bEnd) {
  if (aStart > aEnd) {
    var tmp = aStart;
    aStart = aEnd;
    aEnd = tmp;
  }
  if (bStart < bEnd) {
    var tmp = bStart;
    bStart = bEnd;
    bEnd = tmp;
  }

  return aStart <= bEnd && bStart <= aEnd;
}

/**
 * 
 * @param {number} aStart The start of the first interval
 * @param {number} aEnd   The end of the first interval
 * @param {number} bStart The start of the second interval
 * @param {number} bEnd   The end of the second interval
 * @returns {boolean} Whether the first interval is a subset of the second interval, or the second interval is a subset of the first interval
 */
export function doIntervalsFullyOverlap(aStart, aEnd, bStart, bEnd) {
  if (aStart > aEnd) {
    var tmp = aStart;
    aStart = aEnd;
    aEnd = tmp;
  }
  if (bStart < bEnd) {
    var tmp = bStart;
    bStart = bEnd;
    bEnd = tmp;
  }

  return (aStart >= bStart && aEnd <= bEnd) || (bStart >= aStart && bEnd <= aEnd);
}

export function isPointInInterval(point, intervalStart, intervalEnd) {
  if (intervalStart > intervalEnd) {
    var tmp = intervalStart;
    intervalStart = intervalEnd;
    intervalEnd = tmp;
  }

  return intervalStart <= point && point <= intervalEnd;
}

export function isPointInRectangle(pointX, pointY, rectStartX, rectStartY, rectEndX, rectEndY) {
  return isPointInInterval(pointX, rectStartX, rectEndX) && isPointInInterval(pointY, rectStartY, rectEndY);
}

export function doRectanglesOverlap(rectAStartX, rectAStartY, rectAEndX, rectAEndY, rectBStartX, rectBStartY, rectBEndX, rectBEndY) {
  return doIntervalsOverlap(rectAStartX, rectAEndX, rectBStartX, rectBEndX) && 
    doIntervalsOverlap(rectAStartY, rectAEndY, rectBStartY, rectBEndY);
}

export function isPointInCircle(pointX, pointY, circleX, circleY, circleRadius) {
  if (circleRadius <= 0) return false;
  const dx = pointX - circleX;
  const dy = pointY - circleY;
  return dx * dx + dy * dy <= circleRadius * circleRadius;
}

export function isPointWithinDistanceToLineSegment(pointX, pointY, lineSegmentStartX, lineSegmentStartY, lineSegmentEndX, lineSegmentEndY, distance) {
  if (distance <= 0) return false;

  const lineSegmentLengthSquared = (lineSegmentEndX - lineSegmentStartX) * (lineSegmentEndX - lineSegmentStartX) + (lineSegmentEndY - lineSegmentStartY) * (lineSegmentEndY - lineSegmentStartY);
  if (lineSegmentLengthSquared === 0) {
    return isPointInCircle(pointX, pointY, lineSegmentStartX, lineSegmentStartY, distance);
  }
  const t = ((pointX - lineSegmentStartX) * (lineSegmentEndX - lineSegmentStartX) + (pointY - lineSegmentStartY) * (lineSegmentEndY - lineSegmentStartY)) / lineSegmentLengthSquared;
  const constrainedT = Math.max(0, Math.min(1, t));
  const nearestX = lerp(lineSegmentStartX, lineSegmentEndX, constrainedT);
  const nearestY = lerp(lineSegmentStartY, lineSegmentEndY, constrainedT);
  return isPointInCircle(pointX, pointY, nearestX, nearestY, distance);
}


export const CollisionMaskTypes = {
  AxisAlignedRectangle: 'AABB',
  // Circle: 'Circle',
  // ConvexPolygon: 'Convex Polygon',
  HalfPlane: 'Half Plane'
};

export class CollisionMask {
  doesPointCollide(pointX, pointY) { return false; }
  doesCollisionMaskCollideAsAABB(mask) { return false; }
  doesCollisionMaskCollide(mask) { return false; }
}

export class AABBCollisionMask extends CollisionMask {
  constructor(x, y, width, height) {
    this.boundingBox = new AxisAlignedRectangle(x, y, width, height);
    this.maskType = CollisionMaskTypes.AxisAlignedRectangle;
  }
  doesPointCollide(pointX, pointY) {
    return isPointInRectangle(pointX, pointY, this.boundingBox.left, this.boundingBox.top, this.boundingBox.right, this.boundingBox.bottom);
  }
  doesCollisionMaskCollideAsAABB(mask) {
    if (!(mask instanceof AABBCollisionMask)) {
      throw new TypeError("mask must be a collision mask");
    }

    if (mask.maskType === CollisionMaskTypes.HalfPlane) {
      return true;
    }

    return doRectanglesOverlap(
      this.boundingBox.left, this.boundingBox.top, this.boundingBox.right, this.boundingBox.bottom,
      mask.boundingBox.left, mask.boundingBox.top, mask.boundingBox.right, mask.boundingBox.bottom
    );
  }
  doesCollisionMaskCollide(mask) {
    if (!this.doesCollisionMaskCollideAsAABB(mask)) {
      // Quick check for collision
      // If the bounding boxes do not overlap, then there is no way for any collision to have occurred.
      return false;
    }

    switch (mask.maskType) {
      case CollisionMaskTypes.AxisAlignedRectangle:
        // We already know that the bounding boxes collide
        return true;
      case CollisionMaskTypes.HalfPlane:
        // Find the nearest point on the bounding box to the half-plane
        const nearestX = mask.inwardVectorX < 0 ? this.boundingBox.left : this.boundingBox.right;
        const nearestY = mask.inwardVectorY < 0 ? this.boundingBox.top : this.boundingBox.bottom;

        return mask.doesPointCollide(nearestX, nearestY);
      default:
        throw new Error(`Checking collisions between ${this.maskType} and ${mask.maskType} is not implemented`);
    }
  }
}

export class HalfPlaneCollisionMask extends CollisionMask {
  constructor(px, py, inwardVectorX, inwardVectorY) {
    this.edgeX = px;
    this.edgeY = py;
    this.inwardVectorX = inwardVectorX;
    this.inwardVectorY = inwardVectorY;
  }

  doesPointCollide(pointX, pointY) {
    // Construct a vector from an arbitrary point on the line to the provided point
    const dx = pointX - this.edgeX;
    const dy = pointY - this.edgeY;

    // Use dot product to check if that vector points in the same direction as the "inside" vector
    return (dx * this.inwardVectorX) + (dy * this.inwardVectorY) >= 0;
  }
  doesCollisionMaskCollideAsAABB(mask) {
    return true;
  }

  doesCollisionMaskCollide(mask) {
    if (!this.doesCollisionMaskCollideAsAABB(mask)) {
      // Quick check for collision
      // If the bounding boxes do not overlap, then there is no way for any collision to have occurred.
      return false;
    }
    switch (mask.maskType) {
      case CollisionMaskTypes.AxisAlignedRectangle:
        return mask.doesCollisionMaskCollide(this);
      case CollisionMaskTypes.HalfPlane:
        // A collision happens if any of the following is true:
        // 1. The x components of both inwards vectors are the same sign
        // 2. The slopes of the inwards vectors are not equal
        // 3. An arbitrarily-chosen point along the edge of one of the half-planes is within the other half-plane
        // If none of these conditions are true, then there is no collision

        // Case 1
        if (this.inwardVectorX < 0 && mask.inwardVectorX < 0) return true;
        if (this.inwardVectorX > 0 && mask.inwardVectorX > 0) return true;

        // Case 2
        // This is optimised to prevent the need for a division
        // if and only if aX / aY = bX / bY, then aX * bY = bX * aY
        if (this.inwardVectorX * mask.inwardVectorY === mask.inwardVectorX * this.inwardVectorY) return true;

        // Case 3
        if (this.doesPointCollide(mask.edgeX, mask.edgeY)) return true;

        return false;
      default:
        throw new Error(`Checking collisions between ${this.maskType} and ${mask.maskType} is not implemented`);
    }
  }
}
