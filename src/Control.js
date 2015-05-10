import THREE from 'THREE';
import { Rotate } from './Rotate';
import { Zoom } from './Zoom';

export class Control {
  constructor (camera, domElement) {
    this.camera = camera;
    this.rotation = new Rotate(camera, domElement);
    this.zoom = new Zoom(domElement);

    this.target = new THREE.Vector3();
    this.source = new THREE.Vector3();
  }

  update() {

    if (this.rotation.hasChanged) {

      this.source.subVectors(this.camera.position, this.target);

      let quaternion = this.rotation.getQuaternion();

      if (quaternion) {
        this.source
          .copy(this.camera.position).sub(this.target)
          .applyQuaternion(quaternion)
          .multiplyScalar(this.zoom.factor);

      } else {
        this.source
          .copy(this.camera.position).sub(this.target)
          .multiplyScalar(this.zoom.factor);
      }

      this.camera.position.addVectors(this.target, this.source);
      this.camera.lookAt(this.target);

    } else {
      this.source
        .copy(this.camera.position).sub(this.target)
        .multiplyScalar(this.zoom.factor);

      this.camera.position.addVectors(this.target, this.source);
      this.camera.lookAt(this.target);
    }
  }
}





