import * as THREE from "three"


function getWall(width, height, depth){
    let gem = new THREE.BoxGeometry(width, height, depth );
    let mat = new THREE.MeshPhongMaterial({color: 0xafc0ca})
    let wall = new THREE.Mesh(gem, mat);
    wall.position.y += height / 2;
    return wall;
}
export function getLeftWall(width, height, depth, offset){
    let wall = getWall(width, height, depth);
    wall.name = "左墙";
    wall.position.x -= offset;
    return wall;
}
export function getBehindWall(width, height, depth, offset){
    let wall = getWall(width, height, depth);
    wall.name = "后墙";
    wall.position.z -= offset;
    return wall;
}
export function getRightWall(width, height, depth, offset){
    let wall = getWall(width, height, depth);
    wall.name = "右墙";
    wall.position.x += offset;
    return wall;
}
export function getFrontWall(width, height, depth, offset){
    let wall = getWall(width, height, depth);
    wall.name = "后墙";
    wall.position.z += offset;
    return wall;
}
