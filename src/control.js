import THREE from 'THREE';
import { rotater } from './rotate';
import { zoom, mousewheel } from './zoom';
import { getMouseOnCircle } from './mouse';

var EPS = 0.000001;
var lastPosition = new THREE.Vector3();

var prev = new THREE.Vector2();
var curr = new THREE.Vector2();

var target = new THREE.Vector3();
var source = new THREE.Vector3();

export function createControl(camera) {
  let rotate = rotater(camera);

  return function() {

    source.subVectors(camera.position, target);

    let quaternion = rotate(curr, prev, source);
    let zoomFactor = zoom();

    // if (quaternion) {
    //   source
    //     .copy(camera.position).sub(target)
    //     .applyQuaternion(quaternion)
    //     .multiplyScalar(zoomFactor);
    //   // console.log(quaternion)
    //   camera.up
    //     .applyQuaternion(quaternion);

    // } else {
    //   source
    //     .copy(camera.position).sub(target)
    //     .multiplyScalar(zoomFactor);
    // }
    // console.log(source)

    camera.position.addVectors(target, source);
    camera.lookAt(target);

    if (lastPosition.distanceToSquared(camera.position) > EPS) {
      lastPosition.copy(camera.position);
    }
  };
}

function mousedown(event) {
  event.preventDefault();
  event.stopPropagation();

  curr.copy(getMouseOnCircle(event.pageX, event.pageY));
  prev.copy(curr);

  document.addEventListener('mousemove', mousemove, false);
  document.addEventListener('mouseup', mouseup, false);
}

function mousemove(event) {
  event.preventDefault();
  event.stopPropagation();

  prev.copy(curr);
  curr.copy(getMouseOnCircle(event.pageX, event.pageY));
}

function mouseup(event) {
  event.preventDefault();
  event.stopPropagation();
  document.removeEventListener('mousemove', mousemove);
  document.removeEventListener('mouseup', mouseup);
}

document.addEventListener('mousedown', mousedown, false);
document.addEventListener('mousewheel', mousewheel, false);
document.addEventListener('DOMMouseScroll', mousewheel, false); // firefox

