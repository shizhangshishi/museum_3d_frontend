import * as THREE from "three";


export function Floor(width, height, depth){
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.mesh = this.getFloor();
}
Floor.prototype.getFloor = function (){
    let gem = new THREE.BoxGeometry(this.width, this.height, this.depth);
    let mat = new THREE.MeshLambertMaterial({color:"gray"});
    let floor = new THREE.Mesh(gem, mat);
    floor.position.y = - this.height / 2;
    floor.name = "地面";
    return floor;
}
