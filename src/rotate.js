import THREE from 'THREE';

var rotateSpeed = 1.0;
var dynamicDampingFactor = 0.2;

var axis = new THREE.Vector3();
var lastAxis = new THREE.Vector3();
var lastAngle = 0;

var quaternion = new THREE.Quaternion();

var eye = new THREE.Vector3();
var eyeDirection = new THREE.Vector3();

var cameraUpDirection = new THREE.Vector3();
var cameraSidewaysDirection = new THREE.Vector3();

var moveDirection = new THREE.Vector3();

var angle;

export function rotater (camera, target) {

  target = target || new THREE.Vector3();

  return function (moveCurr, movePrev) {

    moveDirection.set(moveCurr.x - movePrev.x, moveCurr.y - movePrev.y, 0);
    angle = moveDirection.length();

    if (angle) {

      eye.copy(camera.position).sub(target);

      eyeDirection.copy(eye).normalize();

      cameraUpDirection.copy(camera.up).normalize();

      cameraSidewaysDirection
        .crossVectors(cameraUpDirection, eyeDirection)
        .normalize();

      cameraUpDirection
        .setLength(moveCurr.y - movePrev.y);

      cameraSidewaysDirection
        .setLength(moveCurr.x - movePrev.x);

      moveDirection
        .copy(cameraUpDirection.add(cameraSidewaysDirection));

      axis
        .crossVectors(moveDirection, eye)
        .normalize();

      angle *= rotateSpeed;

      quaternion
        .setFromAxisAngle(axis, angle);

      lastAxis.copy(axis);
      lastAngle = angle;

      return quaternion;
    }

    else if (lastAngle) {

      lastAngle *= Math.sqrt(1.0 - dynamicDampingFactor);
      
      quaternion
        .setFromAxisAngle(lastAxis, lastAngle);

      return quaternion;
    }

    return null;
  }
}

