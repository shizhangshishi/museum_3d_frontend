import {Room} from "@/js/museum/architecture/room";
import {Reception} from "@/js/museum/architecture/components/hall/reception";
import {Canteen} from "@/js/museum/architecture/components/hall/canteen";

export class Hall extends Room{
    constructor(config, blockingObjects) {
        super(config, blockingObjects);
        this.config = config;
        this.reception = null;
        this.canteen = null;

        this.setHall();

    }
    setHall(){
        this.setReception();
        // this.setCanteen();
    }
    setReception(){
        let config = this.config.RECEPTION;
        this.reception = new Reception(config);
        // this.reception.rotation.y += 0.5 * Math.PI;

        let innerSize = this.config.ROOM.INNER_SIZE;
        // this.reception.position.x += - (innerSize.width / 2) * 0.7;
        this.reception.position.z -= (innerSize.depth / 2) * 0.4;
        this.add(this.reception);
    }
    setCanteen(){
        let size = {
            width: 10_00,
            height: 4_00,
            depth: 6_00,
        }
        let rotation = {
            x: 0,
            y: - 0.5 * Math.PI,
            z: 0
        }
        let innerSize = this.config.ROOM.INNER_SIZE;
        this.canteen = new Canteen(size, rotation);
        this.canteen.position.x +=  (innerSize.width / 2) - size.depth / 2;

        this.add(this.canteen);
    }
    load() {
        super.load();
        this.reception.load();
        // this.canteen.load();
    }
}
