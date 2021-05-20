import * as THREE from "three"
import {Exhibition} from "@/js/museum/room/exhitbition";

export function Wall(width, height, depth){
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.mesh = this.initMesh();
}
Wall.prototype.initMesh = function (){
    let gem = new THREE.BoxGeometry(this.width, this.height, this.depth );
    let mat = new THREE.MeshPhongMaterial({color: 0xafc0ca})
    let mesh = new THREE.Mesh(gem, mat);
    return mesh;
}
Wall.prototype.setPosition = function (x, y, z){
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
}
Wall.prototype.rotate = function (xRad, yRad, zRad){
    this.mesh.rotation.x += xRad;
    this.mesh.rotation.y += yRad;
    this.mesh.rotation.z += zRad;
}
