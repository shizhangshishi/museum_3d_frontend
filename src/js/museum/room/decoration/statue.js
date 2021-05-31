// import * as THREE from "three"
// import {Model3D} from "@/utils/museum/model3D";
//
//
// const BASIC_PATH = "/models/object/statue/";
// const PEDESTAL_PATH = BASIC_PATH + "pedestal.fbx";
//
// export class Statue extends THREE.Mesh{
//     constructor(name, pedScale = {x: 1, y: 1, z: 1}, staScale = {x: 1, y: 1, z: 1}) {
//         super();
//         this.name = name;
//         this.setStatue(pedScale);
//         this.setStatue(staScale);
//     }
//     setStatue(scale){
//         let offsetY = 0;
//         let path = BASIC_PATH + this.name + ".fbX";
//         let model3D = new Model3D(path, scale);
//         model3D.getModel().then(model => {
//             model.position.y += offsetY;
//             this.add(model);
//         })
//     }
//     setPedestal(scale){
//         let model3D = new Model3D(PEDESTAL_PATH, scale);
//         model3D.getModel().then(model => {
//             this.add(model);
//         })
//     }
//     getOffset(){
//
//     }
//
// }
