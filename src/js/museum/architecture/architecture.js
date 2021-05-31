import {Mesh} from "three"
import {Hall} from "@/js/museum/architecture/hall";
import {Pavilion} from "@/js/museum/architecture/pavilion";
export class Architecture extends Mesh {
    constructor(config) {
        super();
        this.config = config;
        this.hall = null;
        this.pavilions = {};

        this.setArchitecture();
    }
    setArchitecture(){
        this.setHall();
        this.setPavilions();
    }
    setHall(){
        let config = this.config.HALL;
        this.hall = new Hall(config);
        this.add(this.hall);

        this.setHallDoor(config.ROOM.DOOR, config.PAVILION_EXTERNAL_SIZE);
    }
    setHallDoor(config, pavilionExternalSize){
        this.hall.walls.front.setDoorFrame(config.FRONT_DOOR.width, config.FRONT_DOOR.height, 0);

        this.hall.walls.behind.setDoorFrame(
            config.BEHIND_DOOR.width,
            config.BEHIND_DOOR.height,
            - pavilionExternalSize.width
        );
        this.hall.walls.behind.setDoorFrame(
            config.BEHIND_DOOR.width,
            config.BEHIND_DOOR.height,
            pavilionExternalSize.width
        );
    }
    setPavilions(){
        // let config = this.config.PAVILIONS;
        let hallExternalSize = this.config.HALL.ROOM.EXTERNAL_SIZE;
        let pavilionExternalSize = this.config.PAVILIONS[0].ROOM.EXTERNAL_SIZE;
        let offsetZ = (hallExternalSize.depth + pavilionExternalSize.depth) / 2;
        let offsetX =  - pavilionExternalSize.width;

        let pavilions = [];

        for (let config of this.config.PAVILIONS){
            let pavilion = new Pavilion(config);
            pavilion.position.z -= offsetZ;
            pavilion.position.x += offsetX;

            pavilions.push(pavilion);
            offsetX += pavilionExternalSize.width;
        }

        let doorConfig = this.config.PAVILIONS[0].ROOM.DOOR;
        this.setPavilion0(pavilions[0], doorConfig);
        this.setPavilion1(pavilions[1], doorConfig);
        this.setPavilion2(pavilions[2], doorConfig);
    }
    setPavilion0(pavilion, config){
        pavilion.walls.front.setDoorFrame(config.width, config.height , 0);
        pavilion.walls.right.setDoorFrame(config.width, config.height, 0);
        pavilion.setExhibitions();

        this.pavilions.pavilion0 = pavilion;
        this.add(this.pavilions.pavilion0);
    }
    setPavilion1(pavilion, config){
        pavilion.walls.left.setDoorFrame(config.width, config.height , 0);
        pavilion.walls.right.setDoorFrame(config.width, config.height, 0);
        pavilion.setExhibitions();

        this.pavilions.pavilion1 = pavilion;
        this.add(this.pavilions.pavilion1);
    }
    setPavilion2(pavilion, config){
        pavilion.walls.front.setDoorFrame(config.width, config.height , 0);
        pavilion.walls.left.setDoorFrame(config.width, config.height, 0);
        pavilion.setExhibitions();

        this.pavilions.pavilion2 = pavilion;
        this.add(this.pavilions.pavilion2);
    }
    load(){
        this.loadHall();
        this.loadPavilions();
    }

    loadHall(){
        this.hall.load();
    }
    loadPavilions(){
        this.pavilions.pavilion0.load();
        this.pavilions.pavilion1.load();
        this.pavilions.pavilion2.load();
    }
    loadPavilion(index){
        this.pavilions[index].load();
    }
}
