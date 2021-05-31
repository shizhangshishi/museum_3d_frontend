import * as THREE from 'three';
import {Floor} from "@/js/museum/floor";
import {Architecture} from "@/js/museum/architecture/architecture";

export class Museum extends THREE.Mesh {
    constructor(config) {
        super();
        this.config = config;

        this.floor = null;
        this.architecture = null;
        this.tablet = null;

        this.setMuseum();
    }
    setMuseum(){
        this.setFloor();
        this.setArchitecture();
        this.setTablet();
    }
    setFloor(){
        this.floor = new Floor(this.config.FLOOR);
        this.add(this.floor);
        this.floor.load();
    }
    setArchitecture(){
        this.architecture = new Architecture(this.config.ARCHITECTURE);
        this.add(this.architecture);
        this.architecture.load();
    }
    setTablet(){

    }

}
