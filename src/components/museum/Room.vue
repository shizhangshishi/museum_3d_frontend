<!--<template>-->
<!--  <v-container>-->
<!--&lt;!&ndash;    开发阶段使用来切换视角&ndash;&gt;-->
<!--&lt;!&ndash;-->
<!--    <v-container>-->
<!--      <v-row>-->
<!--        <v-text-field v-model = "cameraPos.x"></v-text-field>-->
<!--        <v-text-field v-model = "cameraPos.y"></v-text-field>-->
<!--        <v-text-field v-model = "cameraPos.z"></v-text-field>-->
<!--        <v-btn @click="setCameraPos">change camera position</v-btn>-->
<!--      </v-row>-->
<!--      <v-row>-->
<!--        <v-text-field v-model = "targetPos.x"></v-text-field>-->
<!--        <v-text-field v-model = "targetPos.y"></v-text-field>-->
<!--        <v-text-field v-model = "targetPos.z"></v-text-field>-->
<!--        <v-btn @click="setTargetPos">change target position</v-btn>-->
<!--      </v-row>-->
<!--    </v-container>-->
<!--&ndash;&gt;-->

<!--    <v-container id="container">-->
<!--      <BtnArea  :showSetting.sync="showSetting" :showMap.sync="showMap"></BtnArea>-->

<!--      <Setting v-if="showSetting"-->
<!--               :showSetting.sync="showSetting"-->
<!--      ></Setting>-->

<!--      <Map v-if="showMap"-->
<!--           :showMap.sync="showMap"-->
<!--      ></Map>-->

<!--      <Exhibition v-if="showExhibition"-->
<!--                  :exhibition="exhibition"-->
<!--                  :showExhibition.sync="showExhibition"-->
<!--      ></Exhibition>-->
<!--      <Npc v-if="showNpc"-->
<!--           :showNpc.sync="showNpc"-->
<!--      ></Npc>-->
<!--      <Chat v-if="showChat"-->
<!--            :showChat.sync="showChat"-->
<!--      ></Chat>-->
<!--    </v-container>-->
<!--  </v-container>-->
<!--</template>-->

<!--<script>-->
<!--import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";-->
<!--import * as THREE from "three"-->
<!--import * as LIGHT from '@/js/museum/light'-->
<!--import {ROOM_0_CONFIG} from "@/constants/museum/room_0_config";-->


<!--import {Room} from "@/js/museum/room/room";-->
<!--import Player from "@/js/museum/object/player";-->

<!--import WS from '@/utils/museum/ws.js';-->

<!--import Code from '@/constants/code/resCode';-->
<!--import * as MuseumFont from "@/assets/fonts/ch/museum.typeface.json";-->
<!--import Exhibition from "@/components/museum/Exhibition";-->
<!--import BtnArea from "@/components/museum/BtnArea";-->
<!--import Setting from "@/components/museum/Setting";-->
<!--import Map from "@/components/museum/Map";-->
<!--import Npc from "@/components/museum/Npc";-->
<!--import Chat from "@/components/museum/Chat";-->

<!--import {NPC} from "@/js/museum/person/npc";-->
<!--import {Visitor} from "@/js/museum/person/visitor";-->
<!--import {VisitorSet} from "@/js/museum/person/visitor_set";-->
<!--import {NPCSet} from "@/js/museum/person/npc_set";-->


<!--export default {-->
<!--  components: {Chat, Npc, Map, Setting, BtnArea, Exhibition},-->
<!--  props: ["roomId"],-->
<!--  name: "Room",-->
<!--  data(){-->
<!--    return{-->
<!--      username: "",-->
<!--      ws: null,-->

<!--      container:null,-->
<!--      scene: null,-->

<!--      camera: null,-->
<!--      //cameraPos: new THREE.Vector3(0, 0, 0),-->
<!--      //targetPos: new THREE.Vector3(0, 0, 0),-->

<!--      renderer: null,-->
<!--    -->
<!--      player: null,-->

<!--      roomConfigs: [],-->
<!--      roomConfig: {},-->
<!--      room: null,-->
<!--      person: null,-->

<!--      npcSet: null,-->
<!--      visitorSet:null,-->

<!--      exhibition: null,-->

<!--      showSetting: false,-->
<!--      showMap: false,-->
<!--      showExhibition: false,-->
<!--      showNpc: false,-->
<!--      showChat: false-->

<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.roomConfigs = [ROOM_0_CONFIG];-->
<!--    this.roomConfig = this.roomConfigs[0];-->

<!--    this.init();-->
<!--    this.buildRoom();-->

<!--    this.buildPerson();-->
<!--    this.animate();-->

<!--    this.setUpWS();-->
<!--  },-->
<!--  methods:{-->
<!--    init(){-->
<!--      this.container = document.getElementById("container");-->
<!--      let width = this.container.clientWidth;-->
<!--      let height = this.container.clientHeight;-->

<!--      this.initRenderer(width, height);-->
<!--      this.initScene();-->
<!--      this.initLight();-->
<!--      this.player = new Player(this.scene, "astronaut", width/height);-->
<!--      this.camera = this.player.getCamera();-->
<!--      this.initControls();-->
<!--      window.addEventListener('mousewheel', this.onMousewheel, false);-->
<!--      window.addEventListener('resize', this.onResize, false);-->

<!--    },-->
<!--    buildRoom(){-->
<!--      this.room = new Room(this.roomConfig);-->
<!--      this.scene.add(this.room);-->
<!--    },-->
<!--    buildPerson(){-->
<!--      this.buildNPC();-->
<!--      this.buildVisitor();-->
<!--    },-->
<!--    buildNPC(){-->
<!--      this.NPCSet = new NPCSet();-->
<!--      let scale = {-->
<!--        width: 80,-->
<!--        height: 180,-->
<!--        depth: 80-->
<!--      }-->
<!--      let color = {-->
<!--        head: "red",-->
<!--        body: "blue",-->
<!--        leg: "black"-->
<!--      }-->
<!--      let npc = new NPC(scale, color);-->
<!--      this.NPCSet.add(npc);-->
<!--      this.scene.add(this.NPCSet);-->
<!--    },-->
<!--    buildVisitor(){-->
<!--      this.visitorSet = new VisitorSet();-->
<!--      let scale = {-->
<!--        width: 80,-->
<!--        height: 180,-->
<!--        depth: 80-->
<!--      }-->
<!--      let color = {-->
<!--        head: "yellow",-->
<!--        body: "red",-->
<!--        leg: "black"-->
<!--      }-->
<!--      let visitor = new Visitor(scale, color);-->
<!--      visitor.setPosition(-200, 0);-->
<!--      this.visitorSet.add(visitor);-->
<!--      this.scene.add(this.visitorSet);-->
<!--    },-->
<!--    animate(){-->
<!--      requestAnimationFrame(this.animate);-->
<!--      this.renderer.render(this.scene, this.camera);-->
<!--    },-->
<!--    initRenderer(width, height){-->
<!--      this.renderer = new THREE.WebGLRenderer({antialias: true});-->
<!--      this.renderer.setSize(width, height);-->
<!--      this.renderer.setClearColor(0x4682B4,1.0);-->
<!--      this.renderer.shadowMap.enabled = true;-->
<!--      let dom = this.renderer.domElement;-->
<!--      dom.addEventListener("click", this.onClick, false);-->
<!--      this.container.appendChild(dom);-->
<!--    },-->
<!--    initScene(){-->
<!--      this.scene = new THREE.Scene();-->
<!--      this.scene.fog = new THREE.Fog(this.scene.background, 3000, 6000);-->
<!--    },-->
<!--    /*-->
<!--    initCamera(k){-->
<!--      this.camera = new THREE.PerspectiveCamera(45, k, 1, 10000);-->
<!--      this.cameraPos = new THREE.Vector3(0, this.roomConfig.innerScale.height * 3.2, this.roomConfig.innerScale.depth);-->
<!--      this.camera.position.set(this.cameraPos.x, this.cameraPos.y, this.cameraPos.z);-->
<!--    },-->
<!--    */-->
<!--    initControls(){-->
<!--      this.controls = new OrbitControls(this.camera, this.renderer.domElement );-->
<!--      this.controls.enableDamping = true;-->
<!--      this.controls.dampingFactor = 0.5;-->
<!--    },-->
<!--    initLight(){-->
<!--      let directionLight = LIGHT.getDirectionLight(0, 100, 0);-->
<!--      this.scene.add(directionLight);-->

<!--      let ambientLight = LIGHT.getAmbientLight(0, 0, 0);-->
<!--      this.scene.add(ambientLight);-->
<!--    },-->
<!--    setUpWS () {-->
<!--      this.$axios.get("/user/detail")-->
<!--        .catch(() => {})-->
<!--        .then(res => {-->
<!--          if (res)-->
<!--          {-->
<!--            if (res.data.responseCode === Code.SUCCESS)-->
<!--            {-->
<!--              this.username = res.data.responseBody.user.username;-->
<!--            }-->
<!--            else-->
<!--            {-->
<!--              this.app.notify(res.data.responseMessage, "error");-->
<!--            }-->
<!--            -->
<!--            this.ws = new WS(this.username);-->
<!--            this.player.status.ws = this.ws;-->

<!--            return;-->
<!--          }-->

<!--          this.app.notify("服务器错误，请重试", "error");-->
<!--        });-->
<!--    },-->
<!--    /*-->
<!--    setCameraPos(){-->
<!--      this.camera.position.set(this.cameraPos.x, this.cameraPos.y, this.cameraPos.z);-->
<!--    },-->
<!--    */-->
<!--    setTargetPos(){-->
<!--      this.controls.target = new THREE.Vector3(-->
<!--        Number(this.player.status.x), -->
<!--        Number(this.player.status.y), -->
<!--        Number(this.player.status.z)-->
<!--      );-->
<!--      this.controls.update();-->
<!--    },-->

<!--    onMousewheel(){-->
<!--      this.setTargetPos();-->
<!--    },-->
<!--    onResize(){-->
<!--      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;-->
<!--      this.camera.updateProjectionMatrix();-->
<!--      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);-->
<!--      this.setTargetPos();-->
<!--    },-->
<!--    onClick(event){-->
<!--      let intersects = this.getIntersects(event);-->
<!--      if(intersects.length !== 0){-->
<!--        this.handleIntersects(intersects);-->
<!--      }-->
<!--    },-->
<!--    getIntersects(event){-->
<!--      let rayCaster = new THREE.Raycaster();-->
<!--      let mouse = new THREE.Vector2();-->
<!--      let rect = this.container.getBoundingClientRect();-->

<!--      mouse.x = ((event.clientX - rect.left) / this.container.clientWidth) * 2 - 1;-->
<!--      mouse.y = -((event.clientY - rect.top) / this.container.clientHeight) * 2 + 1;-->
<!--      rayCaster.setFromCamera(mouse, this.camera);-->

<!--      return  rayCaster.intersectObjects(this.scene.children, true);-->
<!--    },-->

<!--    handleIntersects(intersects){-->
<!--      let obj = intersects[0].object;-->
<!--      if (obj.isExhibition){-->
<!--        this.exhibition = obj.item;-->
<!--        this.showExhibition = true;-->
<!--      }-->

<!--      // 如果点到了身体部位-->
<!--      let parent = obj.parent;-->
<!--      if(parent.isVisitor){-->
<!--        this.showChat = true;-->
<!--      }-->
<!--      if (parent.isNpc){-->
<!--        this.showNpc = true;-->
<!--      }-->
<!--    },-->


<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--#container{-->
<!--  height: 100vh;-->
<!--  position: relative;-->
<!--}-->
<!--</style>-->
