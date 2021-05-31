import {Exhibition} from "@/js/museum/architecture/components/pavilion/exhitbition";

export class ExhibitionAssembler {
    constructor(wall, items, size) {
        this.wall = wall;
        this.items = items;
        this.size = size;
        this.exhibitions = [];

        this.assemble();
    }
    assemble(){
        // console.log(this.wall.name);
        // console.log(this.items);

        this.exhibitions = this.getExhibitions(this.items, this.size.height, this.size.depth);

        this.addExhibitions(this.wall, this.exhibitions);
    }
    getExhibitions(items, height, depth){
        let exhibitions = [];
        for (let item of items){
            let size = {
                width: height * item.k,
                height: height,
                depth: depth
            }
            let exhibition = new Exhibition(size, item);
            exhibitions.push(exhibition);
        }
        return exhibitions;
    }


    addExhibitions(wall, exhibitions){
        if (exhibitions.length > 0){
            let width = wall.config.width;


            if(wall.holes.length !== 0){
                let half = Math.ceil(exhibitions.length / 2);
                let left = exhibitions.slice(0, half);
                let right = exhibitions.slice(half, exhibitions.length);
                let partWidth = (width - wall.holes[0].width) / 2;

                this.addPartExhibitions(wall, left, - width / 2, partWidth);
                this.addPartExhibitions(wall, right, wall.holes[0].width / 2, partWidth);
            }
            else {
                this.addPartExhibitions(wall, exhibitions, - width / 2, width);
            }
        }
    }
    addPartExhibitions(wall, exhibitions, start, width){

        let marginX = this.getMarginX(exhibitions, width);
        let offsets = this.getOffsets(exhibitions, marginX);


        for (let i = 0; i < exhibitions.length; i++){
            exhibitions[i].position.x += start + offsets[i];
            exhibitions[i].position.z += wall.config.depth / 2;
            wall.add(exhibitions[i]);
        }
    }
    getMarginX(exhibitions, width){
        let total = 0;
        for(let exhibition of exhibitions){
            total += exhibition.size.width;
        }
        let spaceLeft = width - total;

        return (spaceLeft / 2) / exhibitions.length;

    }
    getOffsets(exhibitions, marginX){
        let offsets = [];
        let offset;
        offset = exhibitions[0].size.width / 2 + marginX;
        offsets.push(offset);
        for(let i = 1; i < exhibitions.length; i++){
            let gap = exhibitions[i - 1].size.width / 2 + 2 * marginX + exhibitions[i].size.width / 2;
            offset = offsets[i - 1] + gap;
            offsets.push(offset);
        }
        return offsets;
    }

    load(){
        for (let exhibition of this.exhibitions){
            exhibition.load();
        }
    }
}
