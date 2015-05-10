import THREE from 'THREE';
import { Rotate } from './Rotate';
import { Zoom } from './Zoom';
import { setListeners } from './Events';

export class Control {
  constructor (camera, domElement) {
    this.camera = camera;

    this.rotation = new Rotate(camera, domElement);
    this.zooming = new Zoom(domElement);

    this.target = new THREE.Vector3();
    this.source = new THREE.Vector3();

    setListeners(domElement);
  }

  update() {

    if (this.rotation.hasChanged) {

      this.source.subVectors(this.camera.position, this.target);

      let quaternion = this.rotation.quaternion;

      if (quaternion) {
        this.source
          .copy(this.camera.position).sub(this.target)
          .applyQuaternion(quaternion)
          .multiplyScalar(this.zooming.factor);

      } else {
        this.source
          .copy(this.camera.position).sub(this.target)
          .multiplyScalar(this.zooming.factor);
      }

      this.camera.position.addVectors(this.target, this.source);
      this.camera.lookAt(this.target);

    } else {
      this.source
        .copy(this.camera.position).sub(this.target)
        .multiplyScalar(this.zooming.factor);

      this.camera.position.addVectors(this.target, this.source);
      this.camera.lookAt(this.target);
    }
  }
}





