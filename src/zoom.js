import THREE from 'THREE';

var source = new THREE.Vector3();
var dynamicDampingFactor = 0.2;

var zoomStart = new THREE.Vector2();
var zoomEnd   = new THREE.Vector2();

var touchZoomDistanceStart = 0;
var touchZoomDistanceEnd   = 0;

var zoomSpeed = 1.2;

export function zoom() {

	var factor;
	var active = false;

	if (active) {

		factor = touchZoomDistanceStart / touchZoomDistanceEnd;
		touchZoomDistanceStart = touchZoomDistanceEnd;
		source.multiplyScalar(factor);

	} else {
		factor = 1.0 + (zoomEnd.y - zoomStart.y) * zoomSpeed;

		if (factor !== 1.0 && factor > 0.0) {
			source.multiplyScalar(factor);
			zoomStart.y += (zoomEnd.y - zoomStart.y) * dynamicDampingFactor;
		}

	}
}

export function mousewheel(event) {
  event.preventDefault();
  event.stopPropagation();

  var delta = 0;

  if (event.wheelDelta) { // WebKit / Opera / Explorer 9

    delta = event.wheelDelta / 40;

  } else if (event.detail) { // Firefox

    delta = -event.detail / 3;

  }

  zoomStart.y += delta * 0.01;
}
