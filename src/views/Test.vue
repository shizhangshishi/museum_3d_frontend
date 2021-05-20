<template>
  <div>
<!--    <img src="../../public/static/museum/room/1/image/1.png">-->
    <div id="container"></div>
  </div>
</template>
<script>
import * as THREE from 'three'
import "three/examples/js/controls/OrbitControls"
import {Exhibition} from "@/js/museum/room/exhitbition"
import * as EXHIBITIONS from "@/constants/exhibitions"

export default {
  name: 'CustomerThree',
  label:'3D模型',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls:null,
    }
  },
  methods: {
    init() {
      this.scene = new THREE.Scene();
      //创建相机
      this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
      //创建渲染器
      this.renderer = new THREE.WebGLRenderer();
      //设置背景颜色
      this.renderer.setClearColor(0xffffff);

      this.renderer.setSize(window.innerWidth,window.innerHeight);
      //将场景选然后加入到html中
      document.getElementById("container").appendChild(this.renderer.domElement);


      let light = new THREE.AmbientLight( 0xffffff, 1 ); //AmbientLight,影响整个场景的光源-->
      light.position.set(0,0,0);
      this.scene.add(light);


      this.camera.position.z = 100;//近大远小
      //旋转


      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement );

    },
    addGem(){
      // console.log(EXHIBITIONS.EXHIBITIONS);
      let exhibitionSrc = EXHIBITIONS.EXHIBITIONS[0][0];
      let exhibitionSrc2 = EXHIBITIONS.EXHIBITIONS[0][1];
      console.log(exhibitionSrc.image);
      let exhibition = new Exhibition(exhibitionSrc.image, 200,100, 4);
      exhibition.getMesh().then((mesh) => {
        exhibition.mesh = mesh;
        this.scene.add(exhibition.mesh);
      })
    },
    animate() {
      requestAnimationFrame(this.animate);


      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.addGem();
    this.animate()
  }
}
</script>
<style scoped>
#container {
  height: 100vh;
}
</style>
