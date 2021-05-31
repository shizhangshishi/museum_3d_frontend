import * as THREE from "three";


export class Floor extends THREE.Mesh{
    constructor(config) {
        super();
        this.config = config;
        this.name = "博物馆外界地面";


    }
    load(){
        let gem = new THREE.BoxGeometry(this.config.width, this.config.height, this.config.depth);
        let mat = new THREE.MeshLambertMaterial({color:"gray"});
        let model = new THREE.Mesh(gem, mat);
        this.add(model);

        this.position.y = - this.config.height / 2;
    }
}
