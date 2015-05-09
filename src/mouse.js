import THREE from 'THREE';

var screen = {
  left: 0, 
  top: 0, 
  width: window.innerWidth, 
  height: window.innerHeight
};

var mouse = new THREE.Vector2();

export var getMouseOnCircle = function (pageX, pageY) {
  let x = (pageX - screen.width * 0.5 - screen.left) / (screen.width * 0.5);
  let y = (screen.height + 2 * (screen.top - pageY)) / screen.width;
  mouse.set(x, y);
  return mouse;
}
