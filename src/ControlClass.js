import THREE from 'THREE';
import { Rotate } from './Rotate';
import { Zoom } from './Zoom';
import { getMouseOnCircle } from './mouse';

var currMouse = new THREE.Vector2();
var prevMouse = new THREE.Vector2();

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

export class Control {
  constructor (camera, domElement) {
    this.camera = camera;
    this.rotate = new Rotate(camera);
    this.zoom = new Zoom(domElement);

    this.target = new THREE.Vector3();
    this.source = new THREE.Vector3();

    document.addEventListener('mousedown', mousedown, false);
    document.addEventListener('mousewheel', this.zoom.mousewheel.bind(this.zoom), false);
    document.addEventListener('DOMMouseScroll', this.zoom.mousewheel.bind(this.zoom), false);
  }

  update() {

    let zoomFactor = this.zoom.update();

    if (!currMouse.equals(prevMouse)) {

      this.source.subVectors(this.camera.position, this.target);

      let quaternion = this.rotate.update(currMouse, prevMouse);

      if (quaternion) {
        this.source
          .copy(this.camera.position).sub(this.target)
          .applyQuaternion(quaternion)
          .multiplyScalar(zoomFactor);

      } else {
        this.source
          .copy(this.camera.position).sub(this.target)
          .multiplyScalar(zoomFactor);
      }

      this.camera.position.addVectors(this.target, this.source);
      this.camera.lookAt(this.target);
      prevMouse.copy(currMouse);
    } else {
      this.source
        .copy(this.camera.position).sub(this.target)
        .multiplyScalar(zoomFactor);

      this.camera.position.addVectors(this.target, this.source);
      this.camera.lookAt(this.target);
    }
  }
}





