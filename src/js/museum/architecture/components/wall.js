import * as THREE from "three"
import {Exhibition} from "@/js/museum/architecture/components/pavilion/exhitbition";


const ThreeBsp = require("tthreebsp")(THREE);

export class Wall extends THREE.Mesh{
    constructor(config, wallPosition) {
        super();
        this.config = config;
        this.holes = [];
        this.wallPosition = wallPosition;
        this.setWall();
        this.setPosition();
    }
    setWall(){
        this.name = "墙壁";
        this.geometry = new THREE.BoxGeometry(this.config.width, this.config.height, this.config.depth);
        this.material = new THREE.MeshLambertMaterial({color: 0xafc0ca});
        this.updateMorphTargets();
    }
    setPosition(){
        this.position.x = this.wallPosition.x;
        this.position.y = this.wallPosition.y;
        this.position.z = this.wallPosition.z;
    }
    rotate(xRad, yRad, zRad){
        this.rotation.x += xRad;
        this.rotation.y += yRad;
        this.rotation.z += zRad;
    }

    // 挖门框
    setDoorFrame(width, height, x){
        let y = - (this.config.height - height) / 2;
        this.hollow(width, height, x, y);
    }
    // 挖矩形洞
    hollow(width, height, x, y){
        let hole = this.getHole(width, height, x, y);
        this.holes.push({
            width: width,
            height: height,
            x: x,
            y: y,
        });

        let wallBsp = new ThreeBsp(this);
        let holeBsp = new ThreeBsp(hole);
        let resultBsp = wallBsp.subtract(holeBsp);

        let result = resultBsp.toMesh();
        result.geometry.computeFaceNormals();
        result.geometry.computeVertexNormals();

        this.geometry = result.geometry;
        this.updateMorphTargets();
    }
    getHole(width, height, x, y){
        let gem = new THREE.BoxGeometry(width, height, this.config.depth);
        let mat = new THREE.MeshLambertMaterial({color: "red"});
        let hole = new THREE.Mesh(gem, mat);

        // hole.position
        hole.position.x = this.position.x + x;
        hole.position.y = this.position.y + y;
        hole.position.z = this.position.z;

        return hole;

    }

    click(){
        console.log(this.name);
        console.log(this.children);
    }
}
Wall.prototype.isWall = true;

export class LeftWall extends Wall{
    constructor(config, position) {
        super(config, position);
        this.name = "左墙";
        this.rotate(0, 0.5 * Math.PI, 0);
    }
    getHole(width, height, x, y) {
        let hole = super.getHole(width, height, x, y);
        hole.rotation.y += 0.5 * Math.PI;
        return hole;
    }
}
export class BehindWall extends Wall{
    constructor(config, position) {
        super(config, position);
        this.name = "后墙";
    }
}
export class RightWall extends Wall{
    constructor(config, position) {
        super(config, position);
        this.name = "右墙";
        this.rotate(0, - 0.5 * Math.PI, 0);
    }
    getHole(width, height, x, y) {
        let hole = super.getHole(width, height, x, y);
        hole.rotation.y += 0.5 * Math.PI;
        return hole;
    }
}
export class FrontWall extends Wall{
    constructor(config, position) {
        super(config, position);
        this.name = "前墙";
        this.rotate(0, Math.PI, 0);
    }
}

