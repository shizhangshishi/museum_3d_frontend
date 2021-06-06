import {FBXModel} from "@/js/museum/loadModel/externalModel";
import * as THREE from "three";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";

const PATH = "/models/person/robot.fbx"
export class Receptionist extends FBXModel{
    constructor(size, rotation) {
        super(PATH, size, rotation);
        this.name = "前台接待人员";

        const div = document.createElement('div');
        div.innerHTML = "工作人员";
        div.style.color = '#ffffaa';
        div.style.width = '100px';
        div.style.height = '40px';
        div.style.textAlign = 'center';
        let label = new CSS2DObject(div);
        label.position.set(this.position.x, this.position.y + 200, this.position.z);
        this.add(label);
    }

}
Receptionist.prototype.isReceptionist = true;
