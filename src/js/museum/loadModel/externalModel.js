import * as THREE from "three"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";


export class ExternalModel extends THREE.Mesh{
    constructor(path,
                size = {width: 100, height: 100, depth: 100},
                rotation = {x: 0, y: 0, z: 0},
                loader = new FBXLoader())
    {
        super();
        this.name = "外部模型";
        this.path = path;
        this.size = size;
        this.modelRotation = rotation;
        this.loader = loader;

        this.isLoaded = false;
    }
    load(){
        if (!this.isLoaded)
            this.getModel((model) => {
                this.setScale(model);
                this.setRotation(model);
                this.setPosition(model);
                this.add(model);
                this.isLoaded = true;
            })
    }

    getModel(callBack){
        let path = this.path;
        this.loader.load(
            path,
            model => {
                callBack(model);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')
            },
            (error) => {
                console.log(`模型${path}加载失败`);
            });
    }
    setScale(model){
        let boundingBox = new THREE.Box3();
        boundingBox.expandByObject(model);
        let max = boundingBox.max;
        let min = boundingBox.min;

        let width = max.x - min.x;
        let height = max.y - min.y;
        let depth = max.z - min.z;


        let x = this.size.width / width;
        let y = this.size.height / height;
        let z =  this.size.depth / depth;
        model.scale.set(x, y, z);
    }
    setPosition(model){

    }
    setRotation(model){
        model.rotation.x = this.modelRotation.x;
        model.rotation.y = this.modelRotation.y;
        model.rotation.z = this.modelRotation.z;
    }

}
ExternalModel.prototype.isExternalModel = true;

export class FBXModel extends ExternalModel{
    constructor(path, size, rotation)
    {
        super(path, size, rotation, new FBXLoader());
        this.name = "FBX模型";
    }
}
export class OBJModel extends ExternalModel{
    constructor(path, size, rotation)
    {
        super(path, size, rotation, new OBJLoader());
        this.name = "FBX模型";
    }
}
