<template>
  <div id="container">
  </div>
</template>

<script>
import * as THREE from 'three'
import "three/examples/js/controls/OrbitControls"

import * as MUSEUM from '@/constants/museum'
import * as LIGHT from '@/js/museum/light'
import * as FLOOR from '@/js/museum/room/floor'
import * as WALL from '@/js/museum/room/wall'

export default {
  props: ["roomId"],
  name: "Room",
  data(){
    return{
      container:null,
      scene: null,
      camera: null,
      renderer: null,
      controls: null
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
      this.buildFloor();
      this.buildWalls();
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
      this.camera.position.set(-200, 3600, 1000);
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
    buildFloor(){
      let floor = FLOOR.getFloor(MUSEUM.default.FLOOR_WIDTH, MUSEUM.default.FLOOR_HEIGHT, MUSEUM.default.FLOOR_DEPTH);
      this.scene.add(floor);
    },
    buildWalls(){
      let length, width, height, depth;
      depth = MUSEUM.default.WALL_DEPTH;

      length = MUSEUM.default.ROOM_LENGTH;
      width = MUSEUM.default.ROOM_WIDTH;
      height = MUSEUM.default.ROOM_HEIGHT;

      this.buildBehindWall(length, height, depth, width / 2 );
      this.buildFrontWall(length , height, depth, width / 2);
      this.buildLeftWall(depth, height, width + depth, length / 2);
      this.buildRightWall(depth, height, width + depth, length / 2);
    },
    buildBehindWall(width, height, depth, offset){

      let wall = WALL.getBehindWall(width, height, depth, offset);
      this.scene.add(wall);
    },
    buildFrontWall(width, height, depth, offset){
      let wall = WALL.getFrontWall(width, height, depth, offset);
      this.scene.add(wall);
    },
    buildLeftWall(width, height, depth, offset){

      let wall = WALL.getLeftWall(width, height, depth, offset);
      this.scene.add(wall);
    },
    buildRightWall(width, height, depth, offset){
      let wall = WALL.getRightWall(width, height, depth, offset);
      this.scene.add(wall);
    },
    addExhibitions(){

    }
  }
}
</script>

<style scoped>
#container{
  height: 100vh;
}
</style>
