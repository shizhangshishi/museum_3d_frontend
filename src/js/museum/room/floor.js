import * as THREE from "three";


export class Floor extends THREE.Mesh{
    constructor(width, height, depth) {
        super();
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.init();

    }
    init(){
        this.name = "地面";

        this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        this.material = new THREE.MeshLambertMaterial({color:"gray"});
        this.updateMorphTargets();

        this.position.y = - this.height / 2;
    }
    click(){
        console.log("被点击了");
        console.log(this.position);
        console.log(this.width);
    }
}
Floor.prototype.isFloor = true;
