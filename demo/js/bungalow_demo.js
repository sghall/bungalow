import THREE from 'THREE';
import { camera, scene, renderer } from './scene';
import { createControl } from '../../src/control';

var geometry = new THREE.BoxGeometry(400, 400, 400);
var material = new THREE.MeshPhongMaterial({color: 'tomato'});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var moveCamera = createControl(camera);

function animate() {
  moveCamera();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
