import THREE from 'THREE';
import { currMouse, prevMouse } from './Events';

export class Rotate {
  constructor(camera, domElement, target) {
    this.rotateSpeed = 1.5;
    this.dynamicDampingFactor = 0.5;

    this.axis = new THREE.Vector3();
    this.lastAxis = new THREE.Vector3();

    this.angle = null;
    this.lastAngle = 0;

    this._quaternion = new THREE.Quaternion();

    this.eye = new THREE.Vector3();
    this.eyeDirection = new THREE.Vector3();

    this.cameraUpDirection = new THREE.Vector3();
    this.cameraSidewaysDirection = new THREE.Vector3();

    this.moveDirection = new THREE.Vector3();

    this.camera = camera;
    this.target = target || new THREE.Vector3();
  }

  get hasChanged() {
    return !currMouse.equals(prevMouse);
  }

  get quaternion() {

    this.moveDirection.set(currMouse.x - prevMouse.x, currMouse.y - prevMouse.y, 0);
    this.angle = this.moveDirection.length();

    if (this.angle) {

      this.eye.copy(this.camera.position).sub(this.target);

      this.eyeDirection.copy(this.eye).normalize();

      this.cameraUpDirection.copy(this.camera.up).normalize();

      this.cameraSidewaysDirection
        .crossVectors(this.cameraUpDirection, this.eyeDirection)
        .normalize();

      this.cameraUpDirection
        .setLength(currMouse.y - prevMouse.y);

      this.cameraSidewaysDirection
        .setLength(currMouse.x - prevMouse.x);

      this.moveDirection
        .copy(this.cameraUpDirection.add(this.cameraSidewaysDirection));

      this.axis
        .crossVectors(this.moveDirection, this.eye)
        .normalize();

      this.angle *= this.rotateSpeed;

      this._quaternion
        .setFromAxisAngle(this.axis, this.angle);

      this.lastAxis.copy(this.axis);
      this.lastAngle = this.angle;
      
      prevMouse.copy(currMouse);

      return this._quaternion;
    }

    else if (this.lastAngle) {

      this.lastAngle *= Math.sqrt(1.0 - this.dynamicDampingFactor);
      
      this._quaternion
        .setFromAxisAngle(this.lastAxis, this.lastAngle);
      
      prevMouse.copy(currMouse);

      return this._quaternion;
    }

    prevMouse.copy(currMouse);

    return null;
  }
}
