import * as THREE from "three"


export class Reference extends THREE.Mesh{
    constructor(width = 100, height = 100, depth = 100) {
        super();
        this.geometry = new THREE.BoxGeometry(width, height, depth);
        this.material = new THREE.MeshLambertMaterial({color:"red"});
        this.updateMorphTargets();
        this.position.y = 50;
    }
}
