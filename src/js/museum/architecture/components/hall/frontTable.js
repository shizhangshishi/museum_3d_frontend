import {FBXModel} from "@/js/museum/loadModel/externalModel";

const PATH = "/models/furniture/front_table.fbx"
export class FrontTable extends FBXModel{
    constructor(size, rotation) {
        super(PATH, size, rotation);
        this.name = "前台桌子";
    }
}
