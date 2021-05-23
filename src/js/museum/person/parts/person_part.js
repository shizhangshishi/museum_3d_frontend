import * as THREE from "three"
export class PersonPart extends THREE.Mesh{
    constructor(scale, color) {
        super();
        this.width = scale.width;
        this.height = scale.height;
        this.depth =  scale.depth;
        this.color = color;

        this.setMesh();
    }
    setMesh(){

        let gem = new THREE.BoxGeometry(this.width, this.height, this.depth);
        let mat = new THREE.MeshLambertMaterial({color: String(this.color)});
        this.geometry = gem;
        this.material = mat;
        this.updateMorphTargets();
    }
}
PersonPart.prototype.isPersonPart = true;
