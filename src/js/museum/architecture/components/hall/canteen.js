import {FBXModel} from "@/js/museum/loadModel/externalModel";

const PATH = "/models/furniture/canteen.fbx"
export class Canteen extends FBXModel{
    constructor(size, rotation) {
        super(PATH, size, rotation);
        this.name = "餐厅";
    }
}
