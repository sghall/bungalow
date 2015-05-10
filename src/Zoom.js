import THREE from 'THREE';

export class Zoom {

  constructor(domElement) {
    this.domElement = domElement;
    this.zoomFactor = 0.2;

    this.zoomStart = new THREE.Vector2();
    this.zoomEnd   = new THREE.Vector2();

    this.touchZoomDistanceStart = 0;
    this.touchZoomDistanceEnd   = 0;

    this.zoomSpeed = 1.2;

    this.domElement.addEventListener('touchstart', this.touchstart.bind(this), false);
    this.domElement.addEventListener('touchend', this.touchend.bind(this), false);
    this.domElement.addEventListener('touchmove', this.touchmove.bind(this), false);

    document.addEventListener('mousewheel', this.mousewheel.bind(this), false);
    document.addEventListener('DOMMouseScroll', this.mousewheel.bind(this), false);
  }

  get factor() {
    let factor = 1.0 + (this.zoomEnd.y - this.zoomStart.y) * this.zoomSpeed;

    if (factor !== 1.0 && factor > 0.0) {
      this.zoomStart.y += (this.zoomEnd.y - this.zoomStart.y) * this.zoomFactor;
    }

    return factor;
  }

  touchstart(event) {
    if (event.touches.length === 2) {
      let dx = event.touches[0].pageX - event.touches[1].pageX;
      let dy = event.touches[0].pageY - event.touches[1].pageY;
      this.touchZoomDistanceEnd = this.touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
    }
  }

  touchmove(event) {
    if (event.touches.length === 2) {
      let dx = event.touches[0].pageX - event.touches[1].pageX;
      let dy = event.touches[0].pageY - event.touches[1].pageY;
      this.touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
    }
  }

  touchend(event) {
    if (event.touches.length === 2) {
      this.touchZoomDistanceStart = this.touchZoomDistanceEnd = 0;
    }
  }

  mousewheel(event) {
    event.preventDefault();
    event.stopPropagation();

    var delta = 0;

    if (event.wheelDelta) {
      delta = event.wheelDelta / 40;
    } else if (event.detail) {
      delta = -event.detail / 3;
    }
    this.zoomStart.y += delta * 0.01;
  }
}
