import THREE from 'THREE';

var  _lastAxis = new THREE.Vector3();
var  _lastAngle = 0;

var rotateSpeed = 1.0;
var dynamicDampingFactor = 0.2;


var axis = new THREE.Vector3(),
  quaternion = new THREE.Quaternion(),
  eyeDirection = new THREE.Vector3(),
  objectUpDirection = new THREE.Vector3(),
  objectSidewaysDirection = new THREE.Vector3(),
  moveDirection = new THREE.Vector3(),
  angle;

export function rotater (camera, target) {

  target = target || new THREE.Vector3();

  return function (_moveCurr, _movePrev, _eye) {

    moveDirection.set( _moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0 );
    angle = moveDirection.length();

    if ( angle ) {

      _eye.copy( camera.position ).sub( target );
      // console.log(_eye)
      eyeDirection.copy( _eye ).normalize();
      objectUpDirection.copy( camera.up ).normalize();
      objectSidewaysDirection.crossVectors( objectUpDirection, eyeDirection ).normalize();

      objectUpDirection.setLength( _moveCurr.y - _movePrev.y );
      objectSidewaysDirection.setLength( _moveCurr.x - _movePrev.x );

      moveDirection.copy( objectUpDirection.add( objectSidewaysDirection ) );

      axis.crossVectors( moveDirection, _eye ).normalize();

      angle *= rotateSpeed;
      quaternion.setFromAxisAngle( axis, angle );

      _eye.applyQuaternion( quaternion );

      _lastAxis.copy( axis );
      _lastAngle = angle;

    }

    else if (_lastAngle ) {

      _lastAngle *= Math.sqrt( 1.0 - dynamicDampingFactor );
      _eye.copy( camera.position ).sub( target );
      quaternion.setFromAxisAngle( _lastAxis, _lastAngle );
      _eye.applyQuaternion( quaternion );

    }

    _movePrev.copy( _moveCurr );
  }
}

