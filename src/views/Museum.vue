<template>
  <div id="container">
    <BtnArea  :showSetting.sync="showSetting" :showMap.sync="showMap"></BtnArea>

    <Setting v-if="showSetting"
             :showSetting.sync="showSetting"
    ></Setting>

    <Map v-if="showMap"
         :showMap.sync="showMap"
    ></Map>

    <Exhibition v-if="showExhibition"
                :exhibition="exhibition"
                :showExhibition.sync="showExhibition"
    ></Exhibition>
    <Npc v-if="showNpc"
         :showNpc.sync="showNpc"
    ></Npc>
    <Chat :ws.sync="ws" :messageBox.sync="messageBox"></Chat>
  </div>
</template>

<script>
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as LIGHT from '@/js/museum/light'
import {MUSEUM_CONFIG} from "@/constants/museum/museum";
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';


import {Museum} from "@/js/museum/museum";
import {Player} from "@/js/museum/object/player";
import {Environment} from "@/js/museum/object/environment";

import WS from '@/utils/museum/ws.js';

import Code from '@/constants/code/resCode';
import Exhibition from "@/components/museum/Exhibition";
import BtnArea from "@/components/museum/BtnArea";
import Setting from "@/components/museum/Setting";
import Map from "@/components/museum/Map";
import Npc from "@/components/museum/Npc";
import Chat from "@/components/museum/Chat";



export default {
  components: {Chat, Npc, Map, Setting, BtnArea, Exhibition},
  name: "Museum",
  data(){
    return{
      username: "",
      ws: null,

      container:null,
      scene: null,

      camera: null,

      renderer: null,
      labelRenderer: null,

      player: null,
      environment: null,

      museum: null,
      person: null,

      npcSet: null,
      visitorSet:null,

      exhibition: null,

      showSetting: false,
      showMap: false,
      showExhibition: false,
      showNpc: false,

      messageBox: {
        newMessage: "",
        messages: []
      }
    }
  },
  mounted() {

    this.init();
    this.buildMuseum();

    this.buildPerson();
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
      this.player = new Player(this.scene, "robot", width/height);
      this.camera = this.player.getCamera();
      this.initControls();
      window.addEventListener('mousewheel', this.onMousewheel, false);
      window.addEventListener('resize', this.onResize, false);
      this.container.addEventListener("click", this.onClick, false);

      this.environment = new Environment(this.scene);
    },
    buildMuseum(){
      this.museum = new Museum(MUSEUM_CONFIG)
      this.scene.add(this.museum);
    },
    buildPerson(){
      this.buildNPC();
      this.buildVisitor();
    },
    buildNPC(){

    },
    buildVisitor(){

    },
    animate(){
      requestAnimationFrame(this.animate);

      this.labelRenderer.render( this.scene, this.camera );

      this.renderer.render(this.scene, this.camera);
    },
    initRenderer(width, height){
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0x4682B4,1.0);
      this.renderer.shadowMap.enabled = true;
      let dom = this.renderer.domElement;
      this.container.appendChild(dom);

      this.labelRenderer = new CSS2DRenderer();
      this.labelRenderer.setSize( width, height );
      this.labelRenderer.domElement.style.position = 'absolute';
      this.labelRenderer.domElement.style.top = 0;
      this.container.appendChild(this.labelRenderer.domElement);
    },
    initScene(){
      this.scene = new THREE.Scene();
      // this.scene.fog = new THREE.Fog(this.scene.background, 3000, 6000);
    },
    /*
    initCamera(k){
      this.camera = new THREE.PerspectiveCamera(45, k, 1, 10000);
      this.cameraPos = new THREE.Vector3(0, this.roomConfig.innerScale.height * 3.2, this.roomConfig.innerScale.depth);
      this.camera.position.set(this.cameraPos.x, this.cameraPos.y, this.cameraPos.z);
    },
    */
    initControls(){
      //this.controls = new OrbitControls(this.camera, this.renderer.domElement );
      //this.controls.enableDamping = false;
      //this.controls.dampingFactor = 0.5;
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

              this.ws = new WS(this.username, this.player, this.environment, this.messageBox);
              this.player.status.ws = this.ws;
              this.environment.status.ws = this.ws;
            }
            else
            {
              this.app.notify(res.data.responseMessage, "error");
            }

            return;
          }

          this.app.notify("服务器错误，请重试", "error");
        });
    },
    /*
    setCameraPos(){
      this.camera.position.set(this.cameraPos.x, this.cameraPos.y, this.cameraPos.z);
    },
    */
    setTargetPos(){
      this.controls.target = new THREE.Vector3(
        Number(this.player.status.x),
        Number(this.player.status.y),
        Number(this.player.status.z)
      );
      this.controls.update();
    },
    onMousewheel(){
      //this.setTargetPos();
    },
    onResize(){
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.labelRenderer.setSize(this.container.clientWidth, this.container.clientHeight);
      //this.setTargetPos();
    },
    onClick(event){
      console.log("被点击了");
      let intersects = this.getIntersects(event);
      if(intersects.length !== 0){
        this.handleIntersects(intersects);
      }
    },
    getIntersects(event){
      let rayCaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      let rect = this.container.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / this.container.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / this.container.clientHeight) * 2 + 1;
      rayCaster.setFromCamera(mouse, this.camera);

      return  rayCaster.intersectObjects(this.scene.children, true);
    },

    handleIntersects(intersects){
      let obj = intersects[0].object;
      console.log("被点击的对象是：");
      console.log(obj);
      if (obj.parent.isExhibition){
        this.exhibition = obj.parent.item;
        this.showExhibition = true;
      }

      if (obj.parent.parent.isReceptionist){
        this.showNpc = true;
      }
    },


  }
}
</script>

<style scoped>

#container{
  height: 100vh;
  width: 100%;
  position: relative;
}
</style>
