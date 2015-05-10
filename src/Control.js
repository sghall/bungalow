import THREE from 'THREE';
import { Rotate } from './Rotate';
import { Zoom } from './Zoom';

export class Control {
  constructor (camera, domElement) {
    this.camera = camera;
    this.rotate = new Rotate(camera);
    this.zoom = new Zoom(domElement);

    this.target = new THREE.Vector3();
    this.source = new THREE.Vector3();

    document.addEventListener('mousewheel', this.zoom.mousewheel.bind(this.zoom), false);
    document.addEventListener('DOMMouseScroll', this.zoom.mousewheel.bind(this.zoom), false);
  }

  update() {

    let zoomFactor = this.zoom.update();

    if (this.rotate.hasChanged) {

      this.source.subVectors(this.camera.position, this.target);

      let quaternion = this.rotate.getQuaternion();

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

    } else {
      this.source
        .copy(this.camera.position).sub(this.target)
        .multiplyScalar(zoomFactor);

      this.camera.position.addVectors(this.target, this.source);
      this.camera.lookAt(this.target);
    }
  }
}





