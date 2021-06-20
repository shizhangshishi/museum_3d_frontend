import {Room} from "@/js/museum/architecture/room";
import {Reception} from "@/js/museum/architecture/components/hall/reception";

export class Hall extends Room {
    constructor(config, blockingObjects) {
        super(config, blockingObjects);
        this.config = config;
        this.reception = null;

        this.setHall();

    }

    setHall() {
        this.setReception();
    }

    setReception() {
        let config = this.config.RECEPTION;
        this.reception = new Reception(config, this.blockingObjects);

        let innerSize = this.config.ROOM.INNER_SIZE;
        this.reception.position.z -= (innerSize.depth / 2) * 0.4;
        this.add(this.reception);
    }


    load() {
        super.load();
        this.reception.load();
    }
}
