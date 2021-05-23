<template>
  <v-container id="container">
  </v-container>
</template>

<script>
import * as THREE from 'three'
import "three-orbitcontrols/OrbitControls"

import * as MUSEUM from '@/constants/museum'
import * as LIGHT from '@/js/museum/light'
import * as EXHIBITIONS from '@/constants/exhibitions'

import {Room} from "@/js/museum/room/room";
import Player from "@/js/museum/object/player";

import WS from '@/utils/museum/ws.js';

import Code from '@/constants/code/resCode';

export default {
  props: ["roomId"],
  name: "Room",
  data(){
    return{
      username: "",
      ws: null,

      container:null,
      scene: null,
      camera: null,
      renderer: null,
    
      player: null,

      exhibitions: EXHIBITIONS.EXHIBITIONS[this.roomId - 1]
    }
  },
  mounted() {
    this.init();
    this.buildRoom();

    this.animate();

    this.setUpWS();
  },
  methods:{
    init(){
      this.container = document.getElementById("container");
      let width = this.container.clientWidth;
      let height = this.container.clientHeight;

      this.initRenderer(width, height);
      this.initScene();
      this.initLight();
      this.player = new Player(this.scene, "astronaut", width/height);
      this.camera = this.player.getCamera();
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
    initLight(){
      let directionLight = LIGHT.getDirectionLight(0, 100, 0);
      this.scene.add(directionLight);

      let ambientLight = LIGHT.getAmbientLight(0, 0, 0);
      this.scene.add(ambientLight);
    },
    setUpWS () {
      this.$axios.get("/user/detail")
        .catch(() => {})
        .then(res => {
          if (res)
          {
            if (res.data.responseCode === Code.SUCCESS)
            {
              this.username = res.data.responseBody.user.username;
            }
            else
            {
              this.app.notify(res.data.responseMessage, "error");
            }
            
            this.ws = new WS(this.username);
            this.player.status.ws = this.ws;

            return;
          }

          this.app.notify("服务器错误，请重试", "error");
        });
    },
  }
}
</script>

<style scoped>
#container{
  height: 100vh;
}
</style>
