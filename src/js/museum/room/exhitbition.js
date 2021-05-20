import * as THREE from "three"


export function Exhibition(image, width, height, depth){
    this.image = image;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.mesh = null;
}
Exhibition.prototype.getMesh = function (){
    let loader = new THREE.TextureLoader();
    let that = this;
    return new Promise(function(resolve) {
        console.log("进入promise体");
        loader.load(that.image,
            function (texture){
            let gem = new THREE.BoxGeometry(that.width, that.height, that.depth);
            let mat = new THREE.MeshLambertMaterial({map:texture});
            let mesh = new THREE.Mesh(gem, mat);
            resolve(mesh);
        },
            null,
            function (error){
            console.log(`加载图片${this.image}失败`);
        })
    });
}
