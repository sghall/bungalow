import THREE from 'THREE';

// export class Pan {

//   constructor(camera) {

//     this.camera = camera;
//     this.mouseChange = new THREE.Vector2();
//     this.objectUp = new THREE.Vector3();
//     this.pan = new THREE.Vector3();

//     this._panStart = new THREE.Vector3();
//     this._panEnd = new THREE.Vector3();
//   }

//   update () {
//     this.mouseChange.copy( this._panEnd ).sub( this._panStart );

//     if (this.mouseChange.lengthSq()) {

//       mouseChange.multiplyScalar( _eye.length() * _this.panSpeed );

//       pan.copy( _eye ).cross( _this.object.up ).setLength( mouseChange.x );
//       pan.add( objectUp.copy( _this.object.up ).setLength( mouseChange.y ) );

//       _panStart.add(mouseChange.subVectors(_panEnd, _panStart).multiplyScalar(_this.dynamicDampingFactor));
//     }
//   }
// }
