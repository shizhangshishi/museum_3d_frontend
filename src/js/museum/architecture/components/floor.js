import * as THREE from "three"
import {Image} from "@/js/museum/loadModel/image";

const PATH = "/museum/brick/brick2.jpg"

export class Floor extends THREE.Mesh{
    constructor(config) {
        super();
        this.name = "室内地板";
        this.config = config;

        this.image = null;

        this.setFloor();
    }
    setFloor(){
        this.image = new Image(PATH, this.config, true);
        this.add(this.image);

        this.position.y += this.config.height / 2;
    }
    load(){
        this.image.load();
    }
}
