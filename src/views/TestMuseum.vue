<template>
  <v-container id="container">
<!--    <Npc :showNpc.sync = showNpc></Npc>-->
  </v-container>
</template>
<script>


import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import * as LIGHT from "@/js/museum/light";
import {MUSEUM_CONFIG} from "@/constants/museum/museum";
import {Museum} from "@/js/museum/museum";
import {Reference} from "@/js/museum/reference";
import Npc from "@/components/museum/Npc";


export default {
  name: 'Test',
  // components: {Npc},
  label:'Test 3D 模型',
  data() {
    return {
      container:null,
      scene: null,
      camera: null,
      renderer: null,

      museum: null,

      showNpc: false,
    }
  },
  methods: {
    init(){
      this.container = document.getElementById("container");
      let width = this.container.clientWidth;
      let height = this.container.clientHeight;

      this.initCamera(width / height);
      this.initScene();
      this.initRenderer(width, height);
      this.initLight();
      this.initControls();

      this.initMuseum();
    },
    initMuseum(){
      // 添加一个参照物
      // this.scene.add(new Reference());

      this.museum = new Museum(MUSEUM_CONFIG);
      this.scene.add(this.museum);
      // console.log(this.museum);
    },
    initRenderer(width, height){
      this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0x4682B4,1.0);
      this.renderer.shadowMap.enabled = true;
      let dom = this.renderer.domElement;

      this.container.appendChild(dom);
    },
    initScene(){
      this.scene = new THREE.Scene();
      // this.scene.fog = new THREE.Fog(this.scene.background, 50_00, 100_00);
    },
    initCamera(k){
      this.camera = new THREE.PerspectiveCamera(45, k, 1, 10000);
      this.camera.position.set(0, 45_00, 25_00);
    },
    initControls(){
      this.controls = new OrbitControls(this.camera, this.renderer.domElement );
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.5;
      this.controls.target = new THREE.Vector3(0, 0, -10_00);
    },
    initLight(){

      // 模拟太阳光
      let directionLight = LIGHT.getDirectionLight(0, 200, 0);
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
