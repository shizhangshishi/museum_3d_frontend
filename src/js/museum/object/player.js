import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

// 键盘映射
const keys = {
  a: 65,
  w: 87,
  d: 68,
  s: 83,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  enter: 13
};

// 模型地址映射
const models = {
  robot: "/models/object/player/robot.FBX"
}

// 初始位置
const INIT_POSITION_X = 0;
const INIT_POSITION_Y = 0;
const INIT_POSITION_Z = 0;

// 相机偏移
const INIT_CAMERA_DISTANCE = 2000;
const INIT_CAMERA_THETA = 1;
const INIT_CAMERA_PHI = 0;

// 相机偏移限制
const CAMERA_DISTANCE_MIN = 0;
const CAMERA_DISTANCE_MAX = 10000;
const CAMERA_THETA_MIN = 0;
const CAMERA_THETA_MAX = Math.PI / 2;
const CAMERA_PHI_MIN = -Infinity;
const CAMERA_PHI_MAX = Infinity;

// 名字偏移
const INIT_TEXT_DELTAX = 0;
const INIT_TEXT_DELTAY = 200;
const INIT_TEXT_DELTAZ = 0;

// 初始朝向
const INIT_ROTATION_Y = 0;

// 初始放缩
const INIT_SCALE_X = 1;
const INIT_SCALE_Y = 1;
const INIT_SCALE_Z = 1;

// 每按一次方向键移动距离
const MOVE_STEP = 30;

// 模型加载器
const loader = new FBXLoader();

export class Player
{
  constructor(scene, modelName, aspect, globalConfig)
  {
    this.init(scene, modelName, aspect, globalConfig);
  }

  init(scene, modelName, aspect, globalConfig)
  {
    this.status = 
    {
      globalConfig: globalConfig,
      scene: scene,
      x: INIT_POSITION_X,
      y: INIT_POSITION_Y,
      z: INIT_POSITION_Z,
      rotationY: INIT_ROTATION_Y,
      cameraDistance: INIT_CAMERA_DISTANCE,
      cameraTheta: INIT_CAMERA_THETA,
      cameraPhi: INIT_CAMERA_PHI,
      playerObject: null,
      cameraObject: null
    }
    this.initPlayer(modelName, () => {
      this.updateModel();
    })
    this.initCamera(aspect);
    this.initControl();
  }

  initPlayer(modelName, callback)
  {
    // 载入角色模型
    loader.load(
      models[modelName],
      root => {
          this.status.scene.add(root);
          this.status.playerObject = root;

          root.scale.set(INIT_SCALE_X, INIT_SCALE_Y, INIT_SCALE_Z);

          const div = document.createElement('div');
          div.innerHTML = this.status.globalConfig.username;
          div.style.color = '#ffffaa';
          div.style.width = '80px';
          div.style.height = '40px';
          div.style.textAlign = 'center';
          let label = new CSS2DObject(div);
          root.add(label);
          label.position.set(
            INIT_POSITION_X + INIT_TEXT_DELTAX,
            INIT_POSITION_Y + INIT_TEXT_DELTAY,
            INIT_POSITION_Z + INIT_TEXT_DELTAZ);
          
          let box3 = new THREE.Box3();
          box3.setFromObject(root);
          let boxGeometry = new THREE.BoxGeometry(box3.getSize().x, 10, box3.getSize().z);
          let boxMaterial = new THREE.MeshLambertMaterial({color: 0xffffaa, transparent: true, opacity: 0.2});
          let box = new THREE.Mesh(boxGeometry, boxMaterial);
          box.name = "玩家-碰撞箱";
          root.add(box);

          callback();
      },
      (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      (error) => {
          console.log(error);
      }
    );
  }

  initCamera(aspect)
  {
    let camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);

    camera.position.set(INIT_POSITION_X + INIT_CAMERA_DISTANCE * Math.sin(INIT_CAMERA_THETA) * Math.sin(INIT_CAMERA_PHI), 
      INIT_POSITION_Y + INIT_CAMERA_DISTANCE * Math.cos(INIT_CAMERA_THETA), 
      INIT_POSITION_Z + INIT_CAMERA_DISTANCE * Math.sin(INIT_CAMERA_THETA) * Math.cos(INIT_CAMERA_PHI));
    camera.lookAt(new THREE.Vector3(INIT_POSITION_X, INIT_POSITION_Y, INIT_POSITION_Z));

    this.status.cameraObject = camera;
  }

  getCamera()
  {
    return this.status.cameraObject;
  }

  initControl()
  {
    // 设置控制
    document.onkeydown = () => {
      if (!this.status.globalConfig.blockKey)
      {
        let key = window.event.keyCode;
        let delta = {
          x: 0,
          z: 0
        };
        switch (key)
        {
          case (keys.a):
          case (keys.left):
            delta.x = -Math.cos(this.status.cameraPhi) * MOVE_STEP;
            delta.z = Math.sin(this.status.cameraPhi) * MOVE_STEP;
            break;
          case (keys.w):
          case (keys.up):
            delta.z = -Math.cos(this.status.cameraPhi) * MOVE_STEP;
            delta.x = -Math.sin(this.status.cameraPhi) * MOVE_STEP;
            break;
          case (keys.d):
          case (keys.right):
            delta.x = Math.cos(this.status.cameraPhi) * MOVE_STEP;
            delta.z = -Math.sin(this.status.cameraPhi) * MOVE_STEP;
            break;
          case (keys.s):
          case (keys.down):
            delta.z = Math.cos(this.status.cameraPhi) * MOVE_STEP;
            delta.x = Math.sin(this.status.cameraPhi) * MOVE_STEP;
            break;
          case (keys.enter):
            console.log("hit enter")
            break;
        }
  
        this.rotate(key);
        this.move(delta);
        this.updateModel();
        this.sendPosition();
      }
    }
  }

  rotate(key)
  {
    switch (key)
    {
      case (keys.s):
      case (keys.down):
        this.status.rotationY = 0 + this.status.cameraPhi;
        break;
      case (keys.d):
      case (keys.right):
        this.status.rotationY = Math.PI / 2 + this.status.cameraPhi;
        break;
        case (keys.w):
        case (keys.up):
        this.status.rotationY = Math.PI + this.status.cameraPhi;
        break;
      case (keys.a):
      case (keys.left):
        this.status.rotationY = 3 * Math.PI / 2 + this.status.cameraPhi;
        break;
      case (keys.enter):
        break;
    }
  }

  move(delta)
  {
    this.status.x += delta.x;
    this.status.z += delta.z;
    this.updateModel();

    let isCrashed = false;

    let box = new THREE.Box3().setFromObject(this.status.playerObject);

    let geometry = new THREE.BoxGeometry(box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z);
    let position = geometry.attributes.position;
    let vector = new THREE.Vector3();

    for (let idx = 0; idx < position.count; idx++)
    {
      vector.fromBufferAttribute(position, idx);
      vector.applyMatrix4(this.status.playerObject.matrix);
      let directionVector = vector.sub(this.status.playerObject.position);

      let ray = new THREE.Raycaster(this.status.playerObject.position.clone(), directionVector.clone().normalize());
      let results = ray.intersectObjects(this.status.globalConfig.blockingObjects);
      if (results.length > 0 && results[0].distance < directionVector.length())
      {
        isCrashed = true;
        break;
      }
    }

    if (isCrashed)
    {
      this.status.x -= delta.x;
      this.status.z -= delta.z;
      this.updateModel();
    }
  }

  cameraMove(delta)
  {
    let newValue = this.status.cameraDistance + delta;
    if (newValue > CAMERA_DISTANCE_MIN && newValue < CAMERA_DISTANCE_MAX)
    {
      this.status.cameraDistance = newValue;
      this.updateModel();
    }
  }

  cameraRotate(delta)
  {
    let newValueTheta = this.status.cameraTheta - delta.y / 500;
    let newValuePhi = this.status.cameraPhi - delta.x / 500;
    if (
      newValueTheta > CAMERA_THETA_MIN && 
      newValueTheta < CAMERA_THETA_MAX && 
      newValuePhi > CAMERA_PHI_MIN && 
      newValuePhi < CAMERA_PHI_MAX)
    {
      this.status.cameraTheta = newValueTheta;
      this.status.cameraPhi = newValuePhi;
      this.updateModel();
    }
  }

  updateModel()
  {
    // 更新玩家模型的位置
    this.status.playerObject.position.x = this.status.x;
    this.status.playerObject.position.y = this.status.y;
    this.status.playerObject.position.z = this.status.z;

    // 更新玩家模型的朝向
    this.status.playerObject.rotation.y = this.status.rotationY;

    // 更新相机的位置
    this.status.cameraObject.position.set(
      this.status.x + Math.sin(this.status.cameraTheta) * Math.sin(this.status.cameraPhi) * this.status.cameraDistance, 
      this.status.y + Math.cos(this.status.cameraTheta) * this.status.cameraDistance, 
      this.status.z + Math.sin(this.status.cameraTheta) * Math.cos(this.status.cameraPhi) * this.status.cameraDistance);
    this.status.cameraObject.lookAt(new THREE.Vector3(this.status.x, this.status.y, this.status.z));
  }

  sendPosition()
  {
    if (this.status.globalConfig && this.status.globalConfig.ws !== null)
    {
      this.status.globalConfig.ws.sendMyPosition({
        x: this.status.x,
        y: this.status.y,
        z: this.status.z,
        rotationY: this.status.rotationY
      });
    }
  }
}
