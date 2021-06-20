import * as THREE from "three"

export class Item extends THREE.Mesh
{
  onClick()
  {
    console.log("you clicked a raw item");
  }
  
  hoverMessage()
  {
    return {
      style: {
        cursor: "pointer",
        display: "block"
      },
      innerText: "this is a raw item"
    }
  }

  onHover()
  {
    console.log("you hovered a raw item");
  }

  update()
  {
    console.log("you updated a raw item");
  }
}