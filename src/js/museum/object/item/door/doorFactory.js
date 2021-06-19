import {ItemFactory} from "@/js/museum/object/item/itemFactory";
import {Door} from "@/js/museum/object/item/door/door";

import {DOOR} from "@/constants/item/door/door"

export class DoorFactory extends ItemFactory
{
    buildAll()
    {
        let doors = {};

        for (let idx in DOOR)
        {
            let config = DOOR[idx];
            let name = config.name;
            doors[name] = new Door(config);
        }

        return doors;
    }
}