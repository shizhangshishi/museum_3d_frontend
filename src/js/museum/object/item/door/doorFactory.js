import {ItemFactory} from "@/js/museum/object/item/itemFactory";
import {Door} from "@/js/museum/object/item/door/door";

import {DOOR} from "@/constants/item/door/door"

export class DoorFactory extends ItemFactory
{
    constructor(blockingObjects)
    {
        super();
        this.blockingObjects = blockingObjects;
    }

    buildAll()
    {
        let doors = {};

        for (let idx in DOOR)
        {
            let config = DOOR[idx];
            let name = config.name;
            let door = new Door(config);
            doors[name] = door;
            this.blockingObjects.push(door);
        }

        return doors;
    }
}