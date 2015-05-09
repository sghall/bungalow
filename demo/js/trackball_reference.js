import THREE from 'THREE';
import './TrackballControls';
import { camera, scene, renderer } from './scene';

var geometry = new THREE.BoxGeometry(400, 400, 400);
var material = new THREE.MeshPhongMaterial({color: 'tomato'});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var controls = new THREE.TrackballControls( camera );

controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

controls.noZoom = true;
controls.noPan = true;

controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();
