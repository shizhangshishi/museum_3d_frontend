import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

// 默认物品映射
const defaultItems = {
  door1: {
    open: false
  },
  door2: {
    open: false
  },
  door3: {
    open: false
  },
  door4: {
    open: false
  }
};

// 模型地址映射
const models = {
  robot: "/models/object/player/robot.fbx"
}

// 初始位置
const INIT_POSITION_X = 0;
const INIT_POSITION_Y = 0;
const INIT_POSITION_Z = 0;

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

// 模型加载器
const loader = new FBXLoader();

export class Environment
{
  constructor(scene)
  {
    this.init(scene);
    this.block = false;
  }

  init(scene)
  {
    this.status = {
      ws: null,
      scene: scene,
      friends: {},
      items: {},
      friendObjects: {},
      nameDivs: {}
    };

    this.loadDefaultItems();
  }

  loadDefaultItems()
  {
    this.status.items = defaultItems;
  }

  addFriend(username)
  {
    // 新建状态
    this.status.friends[username] = {
      x: INIT_POSITION_X,
      y: INIT_POSITION_Y,
      z: INIT_POSITION_Z,
      rotationY: INIT_ROTATION_Y
    };

    // 创建模型
    this.initFriend(username, () => {
      this.updateModel(username);
    });
  }

  removeFriend(username)
  {
    // 删除状态
    delete this.status.friends[username];

    // 删除模型
    this.status.scene.remove(this.status.friendObjects[username]);
    delete this.status.friendObjects[username];
    this.status.nameDivs[username].innerHTML = "";
    this.status.nameDivs[username].hidden = true;
  }

  updateFriend(username, position)
  {
    console.log(username);
    if (this.status.friends[username] !== undefined)
    {
      // 更新状态
      this.status.friends[username] = {
        x: position.x,
        y: position.y,
        z: position.z,
        rotationY: position.rotationY
      };

      // 更新模型
      this.updateModel(username);
    }
  }

  sync(friends, items)
  {
    // 同步其它玩家和物品信息
    this.status.friends = friends;
    this.status.items = items;
  
    this.status.friendObjects = {};
    for (let username in this.status.friends)
    {
      // 为每个其他玩家创建模型
      this.initFriend(username, () => {
        this.updateModel(username);
      });
    }
  }

  initFriend(username, callback)
  {
    // 载入角色模型
    loader.load(
      models["robot"],
      root => {
          this.status.scene.add(root);
          let friendObject = root;

          friendObject.scale.set(INIT_SCALE_X, INIT_SCALE_Y, INIT_SCALE_Z);
          this.status.friendObjects[username] = friendObject;

          const div = document.createElement('div');
          div.innerHTML = username;
          div.style.color = '#ffffff';
          let label = new CSS2DObject(div);
          root.add(label);
          label.position.set(
            INIT_POSITION_X + INIT_TEXT_DELTAX, 
            INIT_POSITION_Y + INIT_TEXT_DELTAY, 
            INIT_POSITION_Z + INIT_TEXT_DELTAZ);
          this.status.nameDivs[username] = div;

          callback();
      },
      (xhr) => {
          console.log('friend: ' + username + ' ---- ' + (xhr.loaded / xhr.total * 100) + '% loaded')
      },
      (error) => {
          console.log(error);
      }
    );
  }

  updateModel(username)
  {
    // 更新指定一名玩家模型的位置
    this.status.friendObjects[username].position.x = this.status.friends[username].x;
    this.status.friendObjects[username].position.y = this.status.friends[username].y;
    this.status.friendObjects[username].position.z = this.status.friends[username].z;

    // 更新指定一名玩家模型的朝向
    this.status.friendObjects[username].rotation.y = this.status.friends[username].rotationY;
  }
}