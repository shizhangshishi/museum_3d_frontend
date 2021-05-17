<template>
  <v-container class="museum">
    <div id="three-canvas"></div>
  </v-container>
</template>

<script>
// 测试WebSocket使用的代码，有待改写
import * as THREE from 'three'

let camera, scene, renderer;
let geometry, material, mesh, objectGeometry, objectMaterial, objectMesh, enemyGeometry, enemyMaterial, enemyMesh;

function init() {
	scene = new THREE.Scene();

  // camera
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.x = 2;
  camera.position.y = 0;
	camera.position.z = 1;
  let center = new THREE.Vector3();
  camera.up = new THREE.Vector3(0, 0, 1);
  camera.lookAt(center);

  // light
  const light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 50, 50, 50 );
  scene.add( light );
  const hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  scene.add( hemisphereLight );

  // player
	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshPhongMaterial({color: 0xff0000});

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

  // object
	objectGeometry = new THREE.BoxGeometry( 5, 5, 0.1 );
	objectMaterial = new THREE.MeshNormalMaterial();

	objectMesh = new THREE.Mesh( objectGeometry, objectMaterial );
  objectMesh.position.z = -1;
	scene.add( objectMesh );
  
  // enemy
	enemyGeometry = new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
	enemyMaterial = new THREE.MeshPhongMaterial({color: 0xff00ff});

	enemyMesh = new THREE.Mesh( enemyGeometry, enemyMaterial );
  enemyMesh.position.x = -0.6;
  enemyMesh.position.y = -0.4;
	scene.add( enemyMesh );

  // rendering
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth * 0.5, window.innerHeight * 0.5 );
	renderer.setAnimationLoop( animations['1'] );
  renderer.render( scene, camera );
  document.getElementById('three-canvas').appendChild( renderer.domElement );
	//document.body.appendChild( renderer.domElement );

}

const animations = {
  0: () => {},
  1: () => {
    enemyMesh.rotation.x += 0.005;
    enemyMesh.rotation.y += 0.01;

    renderer.render( scene, camera );
  }
}

let status = {
  distance: 0,
  allowHit: false,
  enemyHp: 1000000,
  hitCount: 0,
  alive: true
};

function comeNearEnemy (delta) {
  status.distance = Math.sqrt(Math.pow(mesh.position.x + delta.x - enemyMesh.position.x, 2) 
    + Math.pow(mesh.position.y + delta.y - enemyMesh.position.y, 2));
    
  console.log(status.distance);
  if (status.distance < 0.5)
  {
    status.allowHit = true;
    if (status.distance < 0.3)
    {
      // cannot be too near
      return false;
    }
  }
  else
  {
    status.allowHit = false;
  }

  return true;
}

const keys = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  enter: 13
}

// Museum
import WS from '@/utils/museum/ws.js';

export default {
  name: 'Museum',
  props: {
    msg: String
  },
  data () {
    return {
      status: status,
      ws: null
    }
  },
  methods: {
    move(delta)
    {
      mesh.position.x += delta.x;
      mesh.position.y += delta.y;
      renderer.render( scene, camera );

      this.ws.sendPosition({
        x: mesh.position.x,
        y: mesh.position.y
      });
    },
    hitEnemy()
    {
      if (this.status.alive && this.status.allowHit)
      {
        this.status.hitCount++;
        let damage = Math.floor(Math.random() * 100000);
        if (this.status.enemyHp > damage)
        {
          this.status.enemyHp -= damage;
        }
        else
        {
          this.status.enemyHp = 0;
          this.status.alive = false;
          enemyMaterial.color.setRGB(0.7, 0.7, 0.7);
          renderer.setAnimationLoop( animations['0'] );

          this.ws.sendChatMessageToAll(`我击杀了BOSS，攻击次数为${this.status.hitCount}`);
        }
      }
    }
  },
  mounted () {
    init();

    this.ws = new WS('wewewe'); // test name

    document.onkeydown = () => {
      let key = window.event.keyCode;
      let delta = {
        x: 0,
        y: 0
      };
      switch (key)
      {
        case (keys.left):
          delta.y = -0.05;
          break;
        case (keys.up):
          delta.x = -0.05;
          break;
        case (keys.right):
          delta.y = 0.05;
          break;
        case (keys.down):
          delta.x = 0.05;
          break;
        case (keys.enter):
          this.hitEnemy()
          break;
      }
      if (comeNearEnemy(delta))
      {
        this.move(delta);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
