import THREE from 'THREE';
import { camera, scene, canvas, renderer } from './scene';
import { rotater } from '../../../src/rotate';
import { zoom, mousewheel } from '../../../src/zoom';
import { getResizeHandler } from '../../../src/resize';

var screen = {left: 0, top: 0, width: 0, height: 0};
var resize = getResizeHandler(document, screen);

resize();

export var source = new THREE.Vector3();
export var target = new THREE.Vector3();
export var dynamicDampingFactor = 0.2;

var EPS = 0.000001;
var lastPosition = new THREE.Vector3();

var prev = new THREE.Vector2();
var curr = new THREE.Vector2();

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

var getMouseOnCircle = (function () {
  var vector = new THREE.Vector2();
  return function (pageX, pageY) {
    vector.set(
      ((pageX - screen.width * 0.5 - screen.left) / (screen.width * 0.5)),
      ((screen.height + 2 * (screen.top - pageY)) / screen.width)
    );
    return vector;
  };

}());

var rotate = rotater(camera);
var source = new THREE.Vector3();

function update() {
  // source.subVectors(camera.position, target);

  var quaternion = rotate(curr, prev);

  source
    .applyQuaternion(quaternion);

  camera.up
    .applyQuaternion(quaternion);

  camera.position.addVectors(target, source);
  camera.lookAt(target);

  if (lastPosition.distanceToSquared(camera.position) > EPS) {
    lastPosition.copy(camera.position);
  }
  render();
};

var geometry = new THREE.BoxGeometry(400, 400, 400);
var material = new THREE.MeshPhongMaterial({color: 'tomato'});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

document.addEventListener('mousedown', mousedown, false);
document.addEventListener('mousewheel', mousewheel, false);
document.addEventListener('DOMMouseScroll', mousewheel, false); // firefox

// update();

function animate() {
  requestAnimationFrame(animate);
  // update();
}

function render() {
  renderer.render(scene, camera);
}

render();
animate();