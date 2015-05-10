import THREE from 'THREE';
import { camera, scene, renderer } from './scene';
import { Control } from '../../src/control';

var geometry = new THREE.BoxGeometry(400, 400, 400);
var material = new THREE.MeshPhongMaterial({color: 'tomato'});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var control = new Control(camera, renderer.domElement);

function animate() {
  control.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
