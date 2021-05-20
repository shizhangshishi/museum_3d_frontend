<template>
  <v-container id="container">
  </v-container>
</template>

<script>
import * as THREE from 'three'
import "three/examples/js/controls/OrbitControls"

import * as MUSEUM from '@/constants/museum'
import * as LIGHT from '@/js/museum/light'
import * as EXHIBITIONS from '@/constants/exhibitions'

import {Room} from "@/js/museum/room/room";

export default {
  props: ["roomId"],
  name: "Room",
  data(){
    return{
      container:null,
      scene: null,
      camera: null,
      renderer: null,
      controls: null,

      exhibitions: EXHIBITIONS.EXHIBITIONS[this.roomId - 1]
    }
  },
  mounted() {
    this.init();
    this.buildRoom();
    this.animate();
  },
  methods:{
    init(){
      this.container = document.getElementById("container");
      let width = this.container.clientWidth;
      let height = this.container.clientHeight;

      this.initRenderer(width, height);
      this.initScene();
      this.initCamera(width / height);
      this.initLight();
      this.initControls();
    },
    buildRoom(){
      let room = new Room(MUSEUM.ROOM_LENGTH, MUSEUM.ROOM_WIDTH, MUSEUM.ROOM_HEIGHT);
      room.buildFloor(MUSEUM.FLOOR_WIDTH, MUSEUM.FLOOR_HEIGHT, MUSEUM.FLOOR_DEPTH);
      room.buildWalls(MUSEUM.WALL_DEPTH);
      let exhibitionHeight = MUSEUM.ROOM_HEIGHT * 0.4;
      room.addWallsExhibitions(this.exhibitions, exhibitionHeight, EXHIBITIONS.EXHIBITION_DEPTH);
      this.scene.add(room.obj);
    },
    animate(){
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
    initRenderer(width, height){
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0x4682B4,1.0);
      this.renderer.shadowMap.enabled = true;
      this.container.appendChild(this.renderer.domElement);
    },
    initScene(){
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.Fog(this.scene.background, 3000, 6000);
    },
    initCamera(k){
      this.camera = new THREE.PerspectiveCamera(45, k, 0.1, 10000);
      this.camera.position.set(0, 3600, 1000);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    },
    initControls(){
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement );
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.5;
      this.controls.update();
    },
    initLight(){
      let directionLight = LIGHT.getDirectionLight(0, 100, 0);
      this.scene.add(directionLight);

      let ambientLight = LIGHT.getAmbientLight(0, 0, 0);
      this.scene.add(ambientLight);
    },
  }
}
</script>

<style scoped>
#container{
  height: 100vh;
}
</style>
