import * as THREE from "three"
import {Item} from "@/js/museum/object/item/item";

export class Door extends Item
{
  constructor(config)
  {
    super();
    this.status = config;
  }

  init(callback)
  {
    const geometry = new THREE.BoxGeometry(this.status.width, this.status.height, this.status.depth);
    const material = new THREE.MeshBasicMaterial({color: 0x9370db});
    const mesh = new THREE.Mesh(geometry, material);
    this.updateModel(mesh);
    callback(mesh);
  }

  onClick()
  {
    this.status.isOpen = !this.status.isOpen;
    if (this.status.isOpen)
    {
      console.log("门开了");
    }
    else
    {
      console.log("门关了");
    }
  }

  updateModel(mesh)
  {
    if (this.status.isOpen)
    {
      mesh.position.x = this.status.openX;
      mesh.position.y = this.status.openY;
      mesh.position.z = this.status.openZ;
    }
    else
    {
      mesh.position.x = this.status.closeX;
      mesh.position.y = this.status.closeY;
      mesh.position.z = this.status.closeZ;
    }
  }
}