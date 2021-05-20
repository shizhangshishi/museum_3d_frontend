import * as THREE from "three";
import {Floor} from "@/js/museum/room/floor";
import {Wall} from "@/js/museum/room/wall";
import {Exhibition} from "@/js/museum/room/exhitbition";

export function Room(length, width, height){
    this.length = length;
    this.width = width;
    this.height = height;
    this.obj = new THREE.Object3D();

    this.floor = null;
    this.walls = [];
    this.wallsExhibitions = [];
}

Room.prototype.buildFloor = function (width, height, depth){
    this.floor = new Floor(width, height, depth);
    this.obj.add(this.floor.mesh);
}

// 构造墙体
// 0 - 3: left behind right front
Room.prototype.buildWalls = function (depth){
    this.buildLeftWall(depth);
    this.buildBehindWall(depth);
    this.buildRightWall(depth);
    this.buildFrontWall(depth);
}
Room.prototype.buildLeftWall = function (depth){
    let width = this.width + depth;
    let wall = new Wall(width, this.height, depth);
    wall.setPosition(-this.length / 2, this.height / 2, 0);
    wall.rotate(0, 0.5 * Math.PI, 0);
    this.walls.push(wall);
    this.obj.add(wall.mesh);
}
Room.prototype.buildBehindWall = function (depth){
    let wall = new Wall(this.length, this.height, depth);
    wall.setPosition(0, this.height / 2, -this.width / 2);
    this.walls.push(wall);
    this.obj.add(wall.mesh);
}
Room.prototype.buildRightWall = function (depth){
    let width = this.width + depth;
    let wall = new Wall(width, this.height, depth);
    wall.setPosition(this.length / 2, this.height / 2, 0);
    wall.rotate(0, -0.5 * Math.PI, 0);
    this.walls.push(wall);
    this.obj.add(wall.mesh);
}
Room.prototype.buildFrontWall = function (depth){
    let wall = new Wall(this.length, this.height, depth);
    wall.setPosition(0, this.height / 2, this.width / 2);
    wall.rotate(0, Math.PI, 0);
    this.walls.push(wall);
    this.obj.add(wall.mesh);
}


//添加墙壁展览品
Room.prototype.addWallsExhibitions = function (wallsExhibitionsSrc, height, depth){
    for (let i = 0; i < wallsExhibitionsSrc.length; i++){
        let wallExhibitions = this.getWallExhibitions(wallsExhibitionsSrc[i], height, depth);
        this.wallsExhibitions.push(wallExhibitions);
    }

    // 将展览品加入墙上
    for(let i = 0; i < this.walls.length; i++){
        this.addExhibitionsToWall(this.walls[i], this.wallsExhibitions[i], height, depth);
    }
}
//获取一面墙壁的展览品
Room.prototype.getWallExhibitions = function (wallExhibitionsSrc, height, depth){
    let exhibitions = [];
    for(let i = 0; i < wallExhibitionsSrc.length; i++){
        let width = wallExhibitionsSrc[i].k * height;
        exhibitions.push(new Exhibition(wallExhibitionsSrc[i].image, width, height, depth));
    }
    return exhibitions;
}
Room.prototype.addExhibitionsToWall = function (wall, exhibitions){
    let totalWidth = 0;

    for(let exhibition of exhibitions){
        totalWidth += exhibition.width;
    }

    let start = - wall.width / 2;
    let space = wall.width - totalWidth;
    let marginX = (space / exhibitions.length) / 2;
    let offsets = this.getOffsets(exhibitions, marginX);



    for(let i = 0; i < exhibitions.length; i++){
        exhibitions[i].getMesh().then((mesh) => {
            mesh.position.z += wall.depth / 2;
            mesh.position.x += start + offsets[i];
            wall.mesh.add(mesh);
        })
    }
}
Room.prototype.getOffsets = function (exhibitions, marginX){
    console.log(exhibitions);
    let offsets = [];
    let offset;
    offset = exhibitions[0].width / 2 + marginX;
    offsets.push(offset);
    for(let i = 1; i < exhibitions.length; i++){
        let gap = exhibitions[i - 1].width / 2 + 2 * marginX + exhibitions[i].width / 2;
        offset = offsets[i - 1] + gap;
        offsets.push(offset);
    }
    return offsets;
}
