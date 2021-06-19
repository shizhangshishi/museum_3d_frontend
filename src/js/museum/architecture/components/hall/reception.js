import * as THREE from "three"
import {FrontTable} from "@/js/museum/architecture/components/hall/frontTable";
import {Receptionist} from "@/js/museum/architecture/components/hall/receptionist";


export class Reception extends THREE.Mesh{
    constructor(config, blockingObjects) {
        super();
        this.config = config;
        this.blockingObjects = blockingObjects;
        this.frontTable = null;
        this.receptionist = null;

        this.setReception();
    }
    setReception(){
        this.setFrontTable();
        this.setReceptionist();
    }
    setFrontTable(){
        let config = this.config.FRONT_TABLE;
        this.frontTable = new FrontTable(config, {x: 0, y: Math.PI, z: 0}, this.blockingObjects);
        this.add(this.frontTable);
    }
    setReceptionist(){
        let config = this.config.RECEPTIONIST;
        this.receptionist = new Receptionist(config, {x: 0, y: 0, z: 0});
        this.receptionist.position.z -= this.frontTable.size.depth;
        this.add(this.receptionist);
    }
    load(){
        this.frontTable.load();
        this.receptionist.load();
    }
}
