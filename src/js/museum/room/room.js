import * as THREE from "three";
import {Floor} from "@/js/museum/room/floor";
import {LeftWall, BehindWall, RightWall, FrontWall} from "@/js/museum/room/wall";

export class Room extends THREE.Mesh{
    constructor(roomConfig) {
        super();
        this.roomConfig = roomConfig;
        this.name = "房间";

        this.floor = null;
        this.walls = {};

        this.init();
    }
    init(){
        this.setFloor();
        this.setWalls();
        this.setExhibitions();
    }
    setFloor(){
        let floorConfig = this.roomConfig.floor;
        this.floor = new Floor(floorConfig.width, floorConfig.height, floorConfig.depth);
        this.add(this.floor);
    }

    setWalls(){
        let wallsConfig = this.roomConfig.walls;
        let scale = this.roomConfig.innerScale;
        this.setLeftWall(wallsConfig.left, scale);
        this.setBehindWall(wallsConfig.behind, scale);
        this.setRightWall(wallsConfig.right, scale);
        this.setFrontWall(wallsConfig.front, scale);
    }
    setLeftWall(config, scale){

        let position = {
            x: -scale.width / 2,
            y: config.height / 2,
            z: 0
        }
        let wall = new LeftWall(config, position);
        this.walls.left = wall;
        this.add(wall);
    }
    setBehindWall(config, scale){

        let position = {
            x: 0,
            y: config.height / 2,
            z: -scale.depth / 2
        }
        let wall = new BehindWall(config, position);
        this.walls.behind = wall;
        this.add(wall);
    }
    setRightWall(config, scale){

        let position = {
            x: scale.width / 2,
            y: config.height / 2,
            z: 0
        }
        let wall = new RightWall(config, position);
        this.walls.right = wall;
        this.add(wall);
    }
    setFrontWall(config, scale){

        let position = {
            x: 0,
            y: config.height / 2,
            z: scale.depth / 2
        }
        let wall = new FrontWall(config, position);
        this.walls.front = wall;
        this.add(wall);
    }

    setExhibitions(){
        let exhibitions = this.roomConfig.exhibitions;
        this.setWallExhibitions(exhibitions.exhibitionScale, exhibitions.wallExhibitions);
    }
    setWallExhibitions(scale, exhibitions){

        this.walls.left.addExhibitions(scale, exhibitions.left);
        this.walls.behind.addExhibitions(scale, exhibitions.behind);
        this.walls.right.addExhibitions(scale, exhibitions.right);
        this.walls.front.addExhibitions(scale, exhibitions.front);
    }
}
Room.prototype.isRoom = true;
