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

// 初始位置
const INIT_POSITION_X = 0;
const INIT_POSITION_Y = 0;
const INIT_POSITION_Z = 0;

// 初始朝向
const INIT_ROTATION_Y = 0;

export class Environment
{
  constructor()
  {
    this.init();
    this.block = false;
  }

  init()
  {
    this.status = {
      ws: null,
      friends: {},
      items: {},
      friendObjects: {},
      itemObjects: {}
    };

    this.loadDefaultItems();
  }

  loadDefaultItems()
  {
    this.status.items = defaultItems;
  }

  addFriend(name)
  {
    this.status.friends[name] = {
      x: INIT_POSITION_X,
      y: INIT_POSITION_Y,
      z: INIT_POSITION_Z,
      rotationY: INIT_ROTATION_Y
    };
  }

  removeFriend(name)
  {
    delete this.status.friends[name];
  }

  updateFriend(name, position)
  {
    console.log(name);
    if (this.status.friends[name] !== undefined)
    {
      this.status.friends[name] = {
        x: position.x,
        y: position.y,
        z: position.z,
        rotationY: position.rotationY
      };
    }
  }
}