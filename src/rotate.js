import THREE from 'THREE';

export class Rotate {
  constructor(camera, target) {
    this.rotateSpeed = 1.0;
    this.dynamicDampingFactor = 0.2;

    this.axis = new THREE.Vector3();
    this.lastAxis = new THREE.Vector3();

    this.angle = null;
    this.lastAngle = 0;

    this.quaternion = new THREE.Quaternion();

    this.eye = new THREE.Vector3();
    this.eyeDirection = new THREE.Vector3();

    this.cameraUpDirection = new THREE.Vector3();
    this.cameraSidewaysDirection = new THREE.Vector3();

    this.moveDirection = new THREE.Vector3();

    this.camera = camera;
    this.target = target || new THREE.Vector3();
  }
  update(moveCurr, movePrev) {

    this.moveDirection.set(moveCurr.x - movePrev.x, moveCurr.y - movePrev.y, 0);
    this.angle = this.moveDirection.length();

    if (this.angle) {

      this.eye.copy(this.camera.position).sub(this.target);

      this.eyeDirection.copy(this.eye).normalize();

      this.cameraUpDirection.copy(this.camera.up).normalize();

      this.cameraSidewaysDirection
        .crossVectors(this.cameraUpDirection, this.eyeDirection)
        .normalize();

      this.cameraUpDirection
        .setLength(moveCurr.y - movePrev.y);

      this.cameraSidewaysDirection
        .setLength(moveCurr.x - movePrev.x);

      this.moveDirection
        .copy(this.cameraUpDirection.add(this.cameraSidewaysDirection));

      this.axis
        .crossVectors(this.moveDirection, this.eye)
        .normalize();

      this.angle *= this.rotateSpeed;

      this.quaternion
        .setFromAxisAngle(this.axis, this.angle);

      this.lastAxis.copy(this.axis);
      this.lastAngle = this.angle;

      return this.quaternion;
    }

    else if (this.lastAngle) {

      this.lastAngle *= Math.sqrt(1.0 - this.dynamicDampingFactor);
      
      this.quaternion
        .setFromAxisAngle(this.lastAxis, this.lastAngle);

      return this.quaternion;
    }

    return null;
  }
}
