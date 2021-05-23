import * as THREE from "three"


export class Exhibition extends THREE.Mesh{
    constructor(scale, item) {
        super();
        this.height = scale.height;
        this.width = item.k * scale.height;
        this.depth = scale.depth;

        this.item = item;
        this.name = item.name;
    }
    init(){
        let loader = new THREE.TextureLoader();
        let that = this;
        return new Promise(function (resolve){
            loader.load(that.item.image,
                function (texture){
                    let gem = new THREE.BoxGeometry(that.width, that.height, that.depth);
                    let mat = new THREE.MeshLambertMaterial({map:texture});
                    that.geometry = gem;
                    that.material = mat;
                    that.updateMorphTargets();
                    resolve(that);
                },
                null,
                function (error){
                    console.log(`加载图片${that.item.image}失败`);
                });
        })
    }
    click(){
        console.log(this.item);
    }
}
Exhibition.prototype.isExhibition = true;
