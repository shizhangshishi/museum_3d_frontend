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
const INIT_CAMERA_DELTAX = 0;
const INIT_CAMERA_DELTAY = 800;
const INIT_CAMERA_DELTAZ = 600;

// 名字偏移
const INIT_TEXT_DELTAX = 0;
const INIT_TEXT_DELTAY = 200;
const INIT_TEXT_DELTAZ = 0;

// 初始朝向
const INIT_ROTATION_Y = 0;

// 初始放缩
const INIT_SCALE_X = 1.5;
const INIT_SCALE_Y = 1.5;
const INIT_SCALE_Z = 1.5;

// 每按一次方向键移动距离
const MOVE_STEP = 30;

// 模型加载器
const loader = new FBXLoader();

export class Player
{
  constructor(scene, modelName, aspect)
  {
    this.init(scene, modelName, aspect);
  }

  init(scene, modelName, aspect)
  {
    this.status = 
    {
      ws: null,
      scene: scene,
      x: INIT_POSITION_X,
      y: INIT_POSITION_Y,
      z: INIT_POSITION_Z,
      rotationY: INIT_ROTATION_Y,
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
          div.innerHTML = "玩家";
          div.style.color = '#ffffaa';
          let label = new CSS2DObject(div);
          root.add(label);
          label.position.set(
            INIT_POSITION_X + INIT_TEXT_DELTAX, 
            INIT_POSITION_Y + INIT_TEXT_DELTAY, 
            INIT_POSITION_Z + INIT_TEXT_DELTAZ);

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
    let camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 100000);

    camera.position.set(INIT_POSITION_X + INIT_CAMERA_DELTAX, 
      INIT_POSITION_Y + INIT_CAMERA_DELTAY, 
      INIT_POSITION_Z + INIT_CAMERA_DELTAZ);
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
      let key = window.event.keyCode;
      let delta = {
        x: 0,
        z: 0
      };
      switch (key)
      {
        case (keys.a):
        case (keys.left):
          delta.x = -MOVE_STEP;
          break;
        case (keys.w):
        case (keys.up):
          delta.z = -MOVE_STEP;
          break;
        case (keys.d):
        case (keys.right):
          delta.x = MOVE_STEP;
          break;
        case (keys.s):
        case (keys.down):
          delta.z = MOVE_STEP;
          break;
        case (keys.enter):
          console.log("hit enter")
          break;
      }

      this.rotate(delta);
      this.move(delta);
      this.updateModel();
      this.sendPosition();
    }
  }

  rotate(delta)
  {
    if (delta.z > 0)
    {
      this.status.rotationY = 0;
    }
    else if (delta.x > 0)
    {
      this.status.rotationY = Math.PI / 2;
    }
    else if (delta.z < 0)
    {
      this.status.rotationY = Math.PI;
    }
    else if (delta.x < 0)
    {
      this.status.rotationY = 3 * Math.PI / 2;
    }
  }

  move(delta)
  {
    this.status.x += delta.x;
    this.status.z += delta.z;
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
    this.status.cameraObject.position.set(this.status.x + INIT_CAMERA_DELTAX, 
      this.status.y + INIT_CAMERA_DELTAY, 
      this.status.z + INIT_CAMERA_DELTAZ);
    this.status.cameraObject.lookAt(new THREE.Vector3(this.status.x, this.status.y, this.status.z));
  }

  sendPosition()
  {
    if (this.status.ws !== null)
    {
      this.status.ws.sendMyPosition({
        x: this.status.x,
        y: this.status.y,
        z: this.status.z,
        rotationY: this.status.rotationY
      });
    }
  }
}
