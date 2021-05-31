import * as THREE from "three"
export class Image extends THREE.Mesh{
    constructor(path, config, repeat = false) {
        super();
        this.name = "图片";
        this.path = path;
        this.config = config;
        this.isLoaded = false;
        this.repeat = repeat;
    }
    load(){
        if (!this.isLoaded)
            this.getImage((texture) => {
                this.setImage(texture);
            });
    }
    getImage(callBack){
        const loader = new THREE.TextureLoader();
        let path = this.path;

        loader.load(path,
            function (texture){
                callBack(texture);
            },
            null,
            function (error){
                console.log(`加载图片${path}失败`);
            });
    }
    setImage(texture){
        let config = this.config;
        this.setTexture(texture);
        let gem = new THREE.BoxGeometry(config.width, config.height, config.depth);
        let mat = new THREE.MeshLambertMaterial({map:texture});
        this.geometry = gem;
        this.material = mat;
        this.updateMorphTargets();
    }
    setTexture(texture){
        if (this.repeat){
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            let u = this.config.width / 100;
            let v = this.config.depth / 100;
            texture.repeat.set( u, v );
        }
    }
}
