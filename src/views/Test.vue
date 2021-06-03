<template>
 <v-container id="container">

 </v-container>
</template>
<script>


import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


import * as LIGHT from "@/js/museum/light";

import {Player} from "@/js/museum/object/player"
import {Receptionist} from "@/js/museum/architecture/components/hall/receptionist";
import {Reference} from "@/js/museum/reference";

import * as EXHIBITIONS from "/public/museum/room/0/0.json"

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
      let ref = new Reference();
      this.scene.add(ref);
      console.log(EXHIBITIONS.default);
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
