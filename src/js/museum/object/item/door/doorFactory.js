import {ItemFactory} from "@/js/museum/object/item/itemFactory";
import {Door} from "@/js/museum/object/item/door/door";

import {DOOR} from "@/constants/item/door/door"

export class DoorFactory extends ItemFactory
{
    constructor(globalConfig)
    {
        super();
        this.globalConfig = globalConfig;
    }

    buildAll()
    {
        let doors = {};

        for (let idx in DOOR)
        {
            let initialStatus = DOOR[idx];
            let name = initialStatus.name;
            let door = new Door(name, initialStatus, this.globalConfig);
            doors[name] = door;
            this.globalConfig.blockingObjects.push(door);
        }

        return doors;
    }
}