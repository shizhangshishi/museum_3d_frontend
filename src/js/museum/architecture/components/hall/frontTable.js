import * as THREE from "three"
import {FBXModel} from "@/js/museum/loadModel/externalModel";

const PATH = "/models/furniture/front_table.fbx"
export class FrontTable extends FBXModel{
    constructor(size, rotation, blockingObjects) {
        super(PATH, size, rotation);
        this.name = "前台桌子";
        this.blockingObjects = blockingObjects;

        this.addBox(size);
    }

    addBox(size)
    {
        let boxGeometry = new THREE.BoxGeometry(size.width, size.height, size.depth);
        let boxMaterial = new THREE.MeshBasicMaterial();
        let box = new THREE.Mesh(boxGeometry, boxMaterial);

        box.position.x = this.position.x;
        box.position.y = this.position.y;
        box.position.z = this.position.z;
        box.rotation.x = this.rotation.x;
        box.rotation.y = this.rotation.y;
        box.rotation.z = this.rotation.z;

        box.name = this.name + "-碰撞箱";
        box.visible = false;

        this.blockingObjects.push(box);
        this.add(box);
    }
}
