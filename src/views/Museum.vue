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
    <Chat :globalConfig.sync="globalConfig" :messageBox.sync="messageBox"></Chat>
    <span id="mouseFollower"></span>
  </div>
</template>

<script>
import * as THREE from "three"
import * as LIGHT from '@/js/museum/light'
import {MUSEUM_CONFIG} from "@/constants/museum/museum";
import {CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';


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
      globalConfig: {
        username: "",
        ws: null,
        blockKey: false,
        mouseDown: false,
        mousePosition: {x: 0, y: 0},
        blockingObjects: []
      },

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
      this.player = new Player(this.scene, "robot", width/height, this.globalConfig);
      this.camera = this.player.getCamera();
      window.addEventListener('wheel', this.onWheel, false);
      window.addEventListener('resize', this.onResize, false);
      window.addEventListener('mousedown', this.onMouseDown, false);
      window.addEventListener('mousemove', this.onMouseMove, false);
      window.addEventListener('mouseup', this.onMouseUp, false);
      this.container.addEventListener("click", this.onClick, false);

      this.environment = new Environment(this.scene, this.globalConfig);
    },
    buildMuseum(){
      this.museum = new Museum(MUSEUM_CONFIG, this.globalConfig.blockingObjects);
      this.scene.add(this.museum);
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
              this.globalConfig.username = res.data.responseBody.user.username;

              this.globalConfig.ws = new WS(this.globalConfig.username, this.player, this.environment, this.messageBox);
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
    onWheel(event){
      this.player.cameraMove(-event.wheelDelta);
    },
    onMouseDown(event){
      if (event.button === 1)
      {
        this.globalConfig.mouseDown = true;
        this.globalConfig.mousePosition = {
          x: event.clientX,
          y: event.clientY
        };
      }
    },
    onMouseMove(event){
      if (this.globalConfig.mouseDown)
      {
        let deltaX = event.clientX - this.globalConfig.mousePosition.x;
        let deltaY = event.clientY - this.globalConfig.mousePosition.y;
        this.globalConfig.mousePosition = {
          x: event.clientX,
          y: event.clientY
        };
        this.player.cameraRotate({
          x: deltaX,
          y: deltaY
        });
      }

      let intersects = this.getIntersects(event);
      if(intersects.length !== 0){
        this.handleIntersectsHover(intersects);
      }
    },
    onMouseUp(event){
      if (event.button === 1)
      {
        this.globalConfig.mouseDown = false;
      }
    },
    onResize(){
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.labelRenderer.setSize(this.container.clientWidth, this.container.clientHeight);
    },
    onClick(event){
      console.log("被点击了");
      let intersects = this.getIntersects(event);
      if(intersects.length !== 0){
        this.handleIntersectsClick(intersects);
      }
      console.log(this.globalConfig)
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

    handleIntersectsClick(intersects){
      let obj = intersects[0].object;
      console.log("被点击的对象是：");
      console.log(obj);
      if (obj.onClick !== undefined)
      {
        // 触发物品的点击事件
        obj.onClick();
      }
      else
      {
        if (obj.parent.isExhibition){
          this.exhibition = obj.parent.item;
          this.showExhibition = true;
        }

        if (obj.parent.parent.isReceptionist){
          this.showNpc = true;
        }
      }
    },
    
    handleIntersectsHover(intersects){
      let cursor = "default";
      let display = "none";
      let innerText = "";

      let mouseFollower = document.getElementById("mouseFollower");
      mouseFollower.style.left = window.event.clientX + "px";
      mouseFollower.style.top = window.event.clientY + "px";

      let obj = intersects[0].object;
      if (obj.onHover !== undefined)
      {
        // 根据物品的设定改变提示框的显示
        let message = obj.hoverMessage();
        cursor = message.style.cursor;
        display = message.style.display;
        innerText = message.innerText;

        // 触发物品的悬浮事件
        obj.onHover();
      }
      else
      {
        if (obj.parent.isExhibition){
          cursor = "pointer";
          display = "block";
          innerText = "查看展品：《" + obj.parent.item.name + "》";
        }

        if (obj.parent.parent.isReceptionist){
          cursor = "pointer";
          display = "block";
          innerText = "与接待员对话";
        }
      }

      document.body.style.cursor = cursor;
      mouseFollower.style.display = display;
      mouseFollower.innerText = innerText;
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

#mouseFollower{
  position: fixed;
  padding: 0.5em;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}
</style>
