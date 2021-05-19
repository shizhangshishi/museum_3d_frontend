import * as THREE from "three"

export function getDirectionLight(x, y, z){
    let light = new THREE.DirectionalLight( 0xffffff, 0.3 );//模拟远处类似太阳的光源-->
    light.color.setHSL( 0.1, 1, 0.95 );
    light.position.set( x, y, z).normalize();
    return light;
}
export function getAmbientLight(x, y, z){
    let light = new THREE.AmbientLight( 0xffffff, 1 ); //AmbientLight,影响整个场景的光源-->
    light.position.set(0,0,0);
    return light;
}

export function getSpotLight(){

}
