<template>
 <v-container id="container">

 </v-container>
</template>
<script>


import * as THREE from "three"
import * as THREE110 from "three-110"
import {Geometry} from "three/examples/jsm/deprecated/Geometry"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


import * as LIGHT from "@/js/museum/light";

import {Player} from "@/js/museum/object/player"
import {Receptionist} from "@/js/museum/architecture/components/hall/receptionist";
import {Reference} from "@/js/museum/reference";
import {BehindWall, RightWall, LeftWall, FrontWall} from "@/js/museum/architecture/components/wall";


// THREE.Geometry = Geometry;
const ThreeBsp = require("tthreebsp")(THREE110);

export default {
  name: 'Test',
  label:'Test 3D 模型',
  data() {
    return {
      container:null,
      scene: null,
      camera: null,
      renderer: null,
    }
  },
  methods: {
    test(){
      this.testBsp();
    },
    testWall(){
      let ref = new Reference();
      this.scene.add(ref);

      let wall = new BehindWall({width: 10_00, height: 5_00, depth: 50}, {x: 0, y: 0, z: -2_00});
      wall.setDoorFrame(2_00, 2_00, 0);
      wall.setDoorFrame(2_00, 2_00, 100);
      this.scene.add(wall);
    },
    testBsp(){
      let gem1 = new THREE110.BoxGeometry(100, 100, 200);
      let mat1 = new THREE110.MeshLambertMaterial({color:"red"});
      let mesh1 = new THREE110.Mesh(gem1, mat1);
      mesh1.position.x += 200;

      let gem2 = new THREE110.BoxGeometry(200, 200, 200);
      let mat2 = new THREE110.MeshLambertMaterial({color:"gray"});
      let mesh2 = new THREE110.Mesh(gem2, mat2);

      let gem3 = new THREE110.BoxGeometry(600, 300, 200);
      let mat3 = new THREE110.MeshLambertMaterial({color:"gray"});
      let mesh3 = new THREE110.Mesh(gem3, mat3);


      let bsp1 = new ThreeBsp(mesh1);
      let bsp2 = new ThreeBsp(mesh2);
      let bsp3 = new ThreeBsp(mesh3);

      let resultBsp1 = bsp3.subtract(bsp1)
      let resultBsp = resultBsp1.subtract(bsp2);
      let result = resultBsp.toGeometry();
      result.computeFaceNormals();
      result.computeVertexNormals();

      let gem = new THREE110.BufferGeometry().fromGeometry(result);
      let mat = new THREE.MeshLambertMaterial({color:"blue"});
      let mesh = new THREE.Mesh(gem, mat);
      this.scene.add(mesh);
    },
    init(){
      this.container = document.getElementById("container");
      let width = this.container.clientWidth;
      let height = this.container.clientHeight;
      this.initCamera(width / height);
      this.initScene();
      this.initRenderer(width, height);
      this.initLight();
      this.initControls();
    },
    initRenderer(width, height){
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0x4682B4,1.0);
      this.renderer.shadowMap.enabled = true;
      let dom = this.renderer.domElement;

      this.container.appendChild(dom);
    },
    initScene(){
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.Fog(this.scene.background, 3000, 6000);
    },
    initCamera(k){
      this.camera = new THREE.PerspectiveCamera(45, k, 1, 10000);
      this.camera.position.set(0, 600, 800);
    },
    initControls(){
      this.controls = new OrbitControls(this.camera, this.renderer.domElement );
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.5;
    },
    initLight(){
      let directionLight = LIGHT.getDirectionLight(0, 100, 0);
      this.scene.add(directionLight);

      let ambientLight = LIGHT.getAmbientLight(0, 0, 0);
      this.scene.add(ambientLight);
    },


    addEventListener(){
      window.addEventListener('resize', this.onResize, false);
    },
    animate(){
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.init();
    this.test();
    this.addEventListener();
    this.animate();
  }
}
</script>
<style scoped>
#container{
  height: 100vh;
  position: relative;
}
</style>
