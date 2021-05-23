import {PersonPart} from "@/js/museum/person/parts/person_part";

export class Body extends PersonPart{
    constructor(scale, color) {
        super(scale, color);
    }
}
Body.prototype.isBody = true;
