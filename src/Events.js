import THREE from 'THREE';

export var currMouse = new THREE.Vector2();
export var prevMouse = new THREE.Vector2();

export function setListeners(domElement) {
  domElement.addEventListener('touchstart', touchstart, false);
  domElement.addEventListener('touchend', touchend, false);
  domElement.addEventListener('touchmove', touchmove, false);
  document.addEventListener('mousedown', mousedown, false);
}

function getMouseOnCircle(pageX, pageY) {
  let x = (pageX - window.innerWidth * 0.5) / (window.innerWidth * 0.5);
  let y = (window.innerHeight + 2 * -pageY) / window.innerWidth;
  return {x: x, y: y};
}

function mousedown(event) {
  event.preventDefault();
  event.stopPropagation();

  currMouse.copy(getMouseOnCircle(event.pageX, event.pageY));
  prevMouse.copy(currMouse);

  document.addEventListener('mousemove', mousemove, false);
  document.addEventListener('mouseup', mouseup, false);
}

function mousemove(event) {
  event.preventDefault();
  event.stopPropagation();

  prevMouse.copy(currMouse);
  currMouse.copy(getMouseOnCircle(event.pageX, event.pageY));
}

function mouseup(event) {
  event.preventDefault();
  event.stopPropagation();
  document.removeEventListener('mousemove', mousemove);
  document.removeEventListener('mouseup', mouseup);
}

function touchstart(event) {
  if (event.touches.length === 1) {
    currMouse.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
    prevMouse.copy(currMouse);
  }
}

function touchmove(event) {
  if (event.touches.length === 1) {
    prevMouse.copy(currMouse);
    currMouse.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
  }
}

function touchend(event) {
  if (event.touches.length === 1) {
    prevMouse.copy(currMouse);
    currMouse.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
  }
}