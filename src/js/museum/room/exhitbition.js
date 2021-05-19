import * as THREE from "three"


export function getExhibition(exhibition, width, height, angle, url, sth){
    let loader = new THREE.TextureLoader();
    let imgUrl = require("@/assets/museum/areas/area1/images/1.jpg");
    loader.load(imgUrl, function (texture){
        let geometry = new THREE.BoxGeometry(width, height,5);
        let material = new THREE.MeshLambertMaterial({map:texture,transparent:true});
        let image = new THREE.Mesh(geometry, material);
        image.rotation.y+= angle*Math.PI;
        if(sth)
            image.position.x -= 30;
        else
            image.position.x +=30;
        exhibition.add(image)
    });
}
