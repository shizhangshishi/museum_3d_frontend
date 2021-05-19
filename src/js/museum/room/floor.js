import * as THREE from "three";

export function getFloor(width, height, depth){
    let gem = new THREE.BoxGeometry(width, height, depth);
    let mat = new THREE.MeshLambertMaterial({color:"gray"});
    let floor = new THREE.Mesh(gem, mat);
    floor.position.y = -height / 2;
    floor.name = "地面";
    return floor;
}
