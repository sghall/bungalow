import THREE from 'THREE';

var currMouse = new THREE.Vector2();
var prevMouse = new THREE.Vector2();

var width  = window.innerWidth;
var height = window.innerHeight;

var mouse = new THREE.Vector2();

function getMouseOnCircle(pageX, pageY) {
  let x = (pageX - width * 0.5) / (width * 0.5);
  let y = (height + 2 * -pageY) / width;

  return mouse.set(x, y);
}

function mousedown(event) {
  event.preventDefault();
  event.stopPropagation();

  currMouse.copy(getMouseOnCircle(event.pageX, event.pageY));
  prevMouse.copy(currMouse);

  document.addEventListener('mousemove', mousemove, false);
  document.addEventListener('mouseup', mouseup, false);
}

function mousemove(event) {
  event.preventDefault();
  event.stopPropagation();

  prevMouse.copy(currMouse);
  currMouse.copy(getMouseOnCircle(event.pageX, event.pageY));
}

function mouseup(event) {
  event.preventDefault();
  event.stopPropagation();
  document.removeEventListener('mousemove', mousemove);
  document.removeEventListener('mouseup', mouseup);
}

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

    document.addEventListener('mousedown', mousedown, false);
  }

  get hasChanged() {
    return !currMouse.equals(prevMouse);
  }

  getQuaternion() {

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

      this.quaternion
        .setFromAxisAngle(this.axis, this.angle);

      this.lastAxis.copy(this.axis);
      this.lastAngle = this.angle;
      
      prevMouse.copy(currMouse);

      return this.quaternion;
    }

    else if (this.lastAngle) {

      this.lastAngle *= Math.sqrt(1.0 - this.dynamicDampingFactor);
      
      this.quaternion
        .setFromAxisAngle(this.lastAxis, this.lastAngle);
      
      prevMouse.copy(currMouse);

      return this.quaternion;
    }

    prevMouse.copy(currMouse);

    return null;
  }
}
