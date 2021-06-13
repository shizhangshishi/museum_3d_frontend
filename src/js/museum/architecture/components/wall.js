import * as THREE from "three"
import * as THREE110 from "three-110"

const ThreeBsp = require("tthreebsp")(THREE110);

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
        let y = -(this.config.height - height) / 2;
        let hole = this.getHole(width, height, x, y);
        this.holes.push({
            width: width,
            height: height,
            x: x,
            y: y,
        });
        this.hollow(hole);
    }
    setDoorFrames(items){
        let holes = this.getHoles(items);
        this.hollowHoles(holes);
    }
    // 挖矩形洞
    hollow(hole){

        let gem = new THREE110.BoxGeometry(this.config.width, this.config.height, this.config.depth);
        let mat = new THREE110.MeshLambertMaterial({color: 0xafc0ca});
        let wall = new THREE110.Mesh(gem, mat);

        let wallBsp = new ThreeBsp(wall);
        let holeBsp = new ThreeBsp(hole);
        let resultBsp = wallBsp.subtract(holeBsp);


        let result = resultBsp.toGeometry();
        result.computeFaceNormals();
        result.computeVertexNormals();

        this.geometry = new THREE110.BufferGeometry().fromGeometry(result);
        this.updateMorphTargets();
    }
    hollowHoles(holes){
        let gem = new THREE110.BoxGeometry(this.config.width, this.config.height, this.config.depth);
        let mat = new THREE110.MeshLambertMaterial({color: 0xafc0ca});
        let wall = new THREE110.Mesh(gem, mat);
        let resultBsp = new ThreeBsp(wall);

        for (let hole of holes){
            let holeBsp = new ThreeBsp(hole);
            resultBsp = resultBsp.subtract(holeBsp);
        }
        let result = resultBsp.toGeometry();
        result.computeFaceNormals();
        result.computeVertexNormals();

        this.geometry = new THREE110.BufferGeometry().fromGeometry(result);
        this.updateMorphTargets();
    }
    getHole(width, height, x, y){
        let gem = new THREE110.BoxGeometry(width, height, this.config.depth);
        let mat = new THREE110.MeshLambertMaterial({color: "red"});
        let hole = new THREE110.Mesh(gem, mat);

        hole.position.x = x;
        hole.position.y = y;

        hole.rotation.x = this.rotation.x;
        hole.rotation.y = this.rotation.y;
        hole.rotation.z = this.rotation.z;

        return hole;

    }
    getHoles(items){
        let holes = [];
        for(let item of items){
            let y = -(this.config.height - item.height) / 2;
            holes.push(this.getHole(item.width, item.height, item.x, y));
            this.holes.push({
                width: item.width,
                height: item.height,
                x: item.x,
                y: y,
            });
        }
        return holes;
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

