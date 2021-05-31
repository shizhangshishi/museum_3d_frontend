import {FBXModel} from "@/js/museum/loadModel/externalModel";
import * as THREE from "three";

const PATH = "/models/person/astronaut.fbx"
export class Receptionist extends FBXModel{
    constructor(size, rotation) {
        super(PATH, size, rotation);
        this.name = "前台接待人员";
    }

}
