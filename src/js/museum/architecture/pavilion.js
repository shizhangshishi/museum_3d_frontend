import {Room} from "@/js/museum/architecture/room";
import {Plant} from "@/js/museum/room/decoration/plant";
import {ExhibitionAssembler} from "@/js/museum/architecture/components/pavilion/exhibitionAssembler";

export class Pavilion extends Room{
    constructor(config) {
        super(config);
        this.config = config;
        this.exhibitionAssemblers = [];
        // this.setPavilion();
    }
    // setPavilion(){
    //     this.setExhibitions();
    // }
    setExhibitions(){
        // 展览品的尺寸
        let items = this.config.EXHIBITIONS;
        let size = items.EXHIBITION_SIZE;

        this.setLeftExhibitions(items.LEFT_WALL_EXHIBITIONS, size);
        this.setBehindExhibitions(items.BEHIND_WALL_EXHIBITIONS, size);
        this.setRightExhibitions(items.RIGHT_WALL_EXHIBITIONS, size);
        this.setFrontExhibitions(items.FRONT_WALL_EXHIBITIONS, size);

    }
    setLeftExhibitions(items, size){
        let assembler = new ExhibitionAssembler(this.walls.left, items, size);
        this.exhibitionAssemblers.push(assembler);

    }
    setBehindExhibitions(items, size){
        let assembler = new ExhibitionAssembler(this.walls.behind, items, size);
        this.exhibitionAssemblers.push(assembler);

    }
    setRightExhibitions(items, size){
        let assembler = new ExhibitionAssembler(this.walls.right, items, size);
        this.exhibitionAssemblers.push(assembler);

    }
    setFrontExhibitions(items, size){
        let assembler = new ExhibitionAssembler(this.walls.front, items, size);
        this.exhibitionAssemblers.push(assembler);
    }


    setPlants(){
        let path = "/models/object/plant/plant2.fbx";
        let size = {width: 100, height: 180, depth: 100};
        let rotation = {x: -0.5 * Math.PI, y: 0, z: 0};
        let plant = new Plant("plant2", path, size, rotation);
        plant.position.z -= 200;
        this.add(plant);
    }
    load() {
        super.load();
        for(let assemblers of this.exhibitionAssemblers){
            assemblers.load();
        }
    }
}
