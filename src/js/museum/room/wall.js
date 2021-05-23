import * as THREE from "three"
import {Exhibition} from "@/js/museum/room/exhitbition";

export class Wall extends THREE.Mesh{
    constructor(config, position) {
        super();
        this.width = config.width;
        this.height = config.height;
        this.depth = config.depth;
        this.init();
        this.setPosition(position.x, position.y, position.z);
    }
    init(){
        this.name = "墙壁";
        this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        this.material = new THREE.MeshPhongMaterial({color: 0xafc0ca});
        this.updateMorphTargets();

    }
    setPosition(x, y, z){
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
    rotate(xRad, yRad, zRad){
        this.rotation.x += xRad;
        this.rotation.y += yRad;
        this.rotation.z += zRad;
    }

    addExhibitions(config, items){
        if (items.length > 0){
            let exhibitions = this.getExhibitions(config, items);
            let marginX = this.getMarginX(exhibitions);
            let offsets = this.getOffsets(exhibitions, marginX);
            let start = - this.width / 2;
            for(let i = 0; i < exhibitions.length; i++){
                exhibitions[i].init().then((exhibition) => {
                    exhibition.position.z += this.depth / 2;
                    exhibition.position.x += start + offsets[i];

                    this.add(exhibition);
                })
            }
        }
    }
    getExhibitions(config, items){
        let exhibitions = [];
        for(let item of items){
            exhibitions.push(new Exhibition(config, item));
        }
        return exhibitions;
}
    getMarginX(exhibitions){
        let total = 0;
        for(let exhibition of exhibitions){
            total += exhibition.width;
        }
        let spaceLeft = this.width - total;

        return (spaceLeft / 2) / exhibitions.length;

    }
    getOffsets(exhibitions, marginX){
        let offsets = [];
        let offset;
        offset = exhibitions[0].width / 2 + marginX;
        offsets.push(offset);
        for(let i = 1; i < exhibitions.length; i++){
            let gap = exhibitions[i - 1].width / 2 + 2 * marginX + exhibitions[i].width / 2;
            offset = offsets[i - 1] + gap;
            offsets.push(offset);
        }
        return offsets;
    }
    click(){
        console.log(this.name);
        console.log(this.children);
    }

}
Wall.prototype.isWall = true;

export class LeftWall extends Wall{
    constructor(config, position) {
        super(config, position);
        this.name = "左墙";
        this.rotate(0, 0.5 * Math.PI, 0);
    }
}
export class BehindWall extends Wall{
    constructor(config, position) {
        super(config, position);
        this.name = "后墙";
    }
}
export class RightWall extends Wall{
    constructor(config, position) {
        super(config, position);
        this.name = "右墙";
        this.rotate(0, - 0.5 * Math.PI, 0);
    }
}
export class FrontWall extends Wall{
    constructor(config, position) {
        super(config, position);
        this.name = "前墙";
        this.rotate(0, Math.PI, 0);
    }
}
