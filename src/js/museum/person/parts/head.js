import {PersonPart} from "@/js/museum/person/parts/person_part";

export class Head extends PersonPart{
    constructor(scale, color) {
        super(scale, color);
    }
}
Head.prototype.isHead = true;
