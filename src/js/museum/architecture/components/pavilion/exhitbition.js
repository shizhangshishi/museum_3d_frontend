import * as THREE from "three";
import {Image} from "@/js/museum/loadModel/image";
import {Reference} from "@/js/museum/reference";


export class Exhibition extends THREE.Mesh{
    // item 是一个展览品的所有信息
    constructor(size, item) {
        super();
        this.item = item;
        this.name = item.name;
        this.size = size;

        this.setExhibition();
    }
    setExhibition(){
        this.image = new Image(this.item.path, this.size);
        this.add(this.image);

        // let ref = new Reference(300, 250, 2);
        // this.add(ref);
    }
    load(){
        this.image.load();
    }
    click(){
        console.log("点击了一个展览品");
        console.log(this.item);
    }
}

Exhibition.prototype.isExhibition = true;
