import * as THREE from "three";
import {Floor} from "@/js/museum/architecture/components/floor";
import * as WALL from "@/js/museum/architecture/components/wall"


export class Room extends THREE.Mesh{
    constructor(config, blockingObjects) {
        super();
        this.roomConfig = config.ROOM;
        this.blockingObjects = blockingObjects;
        this.name = "房间";

        this.floor = null;
        this.walls = {};

        this.setRoom();
    }
    setRoom(){
        this.setFloor();
        this.setWalls();
    }
    setFloor(){
        let config = this.roomConfig.FLOOR;
        this.floor = new Floor(config);
        this.add(this.floor);
    }
    load(){
        this.floor.load();
    }

    setWalls(){
        let innerSize = this.roomConfig.INNER_SIZE;
        let wallDepth = this.roomConfig.WALL_DEPTH;

        this.setLeftWall(innerSize, wallDepth);
        this.setBehindWall(innerSize, wallDepth);
        this.setRightWall(innerSize, wallDepth);
        this.setFrontWall(innerSize, wallDepth);
    }
    setLeftWall(innerSize, wallDepth){

        let position = {
            x: - (innerSize.width + wallDepth) / 2,
            y: innerSize.height / 2,
            z: 0
        }
        let config = {
            width: innerSize.depth + 2 * wallDepth,
            height: innerSize.height,
            depth: wallDepth
        }
        let wall = new WALL.LeftWall(config, position);
        this.walls.left = wall;
        this.add(wall);
        this.blockingObjects.push(wall);
    }
    setBehindWall(innerSize, wallDepth){
        let position = {
            x: 0,
            y: innerSize.height / 2,
            z: - (innerSize.depth + wallDepth) / 2
        }
        let config = {
            width: innerSize.width + 2 * wallDepth,
            height: innerSize.height,
            depth: wallDepth
        }

        let wall = new WALL.BehindWall(config, position);
        this.walls.behind = wall;
        this.add(wall);
        this.blockingObjects.push(wall);
    }
    setRightWall(innerSize, wallDepth){

        let position = {
            x: (innerSize.width + wallDepth) / 2,
            y: innerSize.height / 2,
            z: 0
        }
        let config = {
            width: innerSize.depth + 2 * wallDepth,
            height: innerSize.height,
            depth: wallDepth
        }
        let wall = new WALL.RightWall(config, position);
        this.walls.right = wall;
        this.add(wall);
        this.blockingObjects.push(wall);
    }
    setFrontWall(innerSize, wallDepth){

        let position = {
            x: 0,
            y: innerSize.height / 2,
            z: (innerSize.depth + wallDepth) / 2
        }
        let config = {
            width: innerSize.width + 2 * wallDepth,
            height: innerSize.height,
            depth: wallDepth
        }
        let wall = new WALL.FrontWall(config, position);
        this.walls.front = wall;
        this.add(wall);
        this.blockingObjects.push(wall);
    }
}
Room.prototype.isRoom = true;
