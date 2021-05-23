import {PersonPart} from "@/js/museum/person/parts/person_part";

export class Leg extends PersonPart{
    constructor(scale, color) {
        super(scale, color);
    }
}
Leg.prototype.isLeg = true;
