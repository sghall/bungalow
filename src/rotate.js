import THREE from 'THREE';

var currObjectRel = new THREE.Vector3();
var currObjectDir = new THREE.Vector3();
var currObjectLat = new THREE.Vector3();
var currObjectUp  = new THREE.Vector3();

var movePos = new THREE.Vector3();
var quaternion = new THREE.Quaternion();

var axis = new THREE.Vector3();
var lastAxis = new THREE.Vector3();
var lastAngle = 0;

var rotationFactor = 0.2;
var rotateSpeed = 1.0;

var angle;

export function rotater (object, target) {

  target = target || new THREE.Vector3();

  return function (curr, prev) {

    movePos.set(curr.x - prev.x, curr.y - prev.y, 0);
    angle = movePos.length();

    if (angle) {

      currObjectRel
        .copy(object.position).sub(target);

      currObjectDir
        .copy(currObjectRel).normalize();

      currObjectUp
        .copy(object.up).normalize();

      currObjectLat
        .crossVectors(currObjectUp, currObjectDir).normalize();

      let dir = currObjectDir.setLength(curr.y - prev.y);
      let lat = currObjectLat.setLength(curr.x - prev.x);

      movePos.copy(dir.add(lat));

      axis.crossVectors(movePos, currObjectRel).normalize();

      angle *= rotateSpeed;

      quaternion
        .setFromAxisAngle(axis, angle);

      lastAxis.copy(axis);
      lastAngle = angle;

      return quaternion;

    } else if (lastAngle) {

      lastAngle *= Math.sqrt(1.0 - rotationFactor);

      quaternion
        .setFromAxisAngle(lastAxis, lastAngle);

      return quaternion;
    }

    return null;
  };
}

