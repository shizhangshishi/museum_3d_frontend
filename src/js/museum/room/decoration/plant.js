import {ExternalModel} from "@/js/museum/loadModel/externalModel";


export class Plant extends ExternalModel{
    constructor(name,
                path = "/models/object/plant/plant1.fbx",
                size = {width: 100, height: 100, depth: 100},
                rotation = {x: 0, y: 0, z: 0})
    {
        super(path, size, rotation);
        this.name = name;
    }
}
Plant.prototype.isPlant = true;

