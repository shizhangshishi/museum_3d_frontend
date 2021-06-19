import * as THREE from "three"
import {Item} from "@/js/museum/object/item/item";

export class Door extends Item
{
  constructor(name, initialStatus, globalConfig)
  {
    super();
    this.name = name;
    this.status = initialStatus;
    this.globalConfig = globalConfig;

    this.geometry = new THREE.BoxGeometry(this.status.width, this.status.height, this.status.depth);
    this.material = new THREE.MeshBasicMaterial({color: 0x708090, transparent: true, opacity: 0.5});
    this.updateModel();
  }

  onClick()
  {
    this.status.isOpen = !this.status.isOpen;
    this.updateModel();
    if (this.status.isOpen)
    {
      console.log("门开了");
    }
    else
    {
      console.log("门关了");
    }
    this.globalConfig.ws.sendItemPosition(this.name, this.status);
  }

  hoverMessage()
  {
    let message = super.hoverMessage();
    if (this.status.isOpen)
    {
      message.innerText = "关上门";
    }
    else
    {
      message.innerText = "打开门";
    }
    return message;
  }

  onHover()
  {
    // 实现鼠标悬浮时的颜色变亮与逐渐淡出
    if (this.hoverStatus && this.hoverStatus.on)
    {
      clearInterval(this.hoverStatus.interval);
      clearTimeout(this.hoverStatus.timeout);
    }

    this.hoverStatus = {
      on: true,
      count: 40,
      interval: null,
      timeout: null
    };

    let originColor = 0x708090;
    let step = 0x010101;
    let totalTime = 2000;

    this.material.color.setHex( originColor + step * this.hoverStatus.count);

    let interval = setInterval(() => {
      this.material.color.setHex( originColor + step * (--this.hoverStatus.count));
    }, totalTime / this.hoverStatus.count);

    let timeout = setTimeout(() => {
      clearInterval(interval);
      this.material.color.setHex( originColor );
      
      this.hoverStatus = {
        on: true,
        count: 40,
        interval: null,
        timeout: null
      };
    }, totalTime);

    this.hoverStatus.interval = interval;
    this.hoverStatus.timeout = timeout;
  }

  updateModel()
  {
    if (this.status.isOpen)
    {
      this.position.x = this.status.openX;
      this.position.y = this.status.openY;
      this.position.z = this.status.openZ;
      this.rotation.y = this.status.openRotationY;
    }
    else
    {
      this.position.x = this.status.closeX;
      this.position.y = this.status.closeY;
      this.position.z = this.status.closeZ;
      this.rotation.y = this.status.closeRotationY;
    }
  }
}