import THREE from 'THREE';

var width  = window.innerWidth;
var height = window.innerHeight;

var mouse = new THREE.Vector2();

export var getMouseOnCircle = function (pageX, pageY) {
  let x = (pageX - width * 0.5) / (width * 0.5);
  let y = (height + 2 * -pageY) / width;

  return mouse.set(x, y);
}
