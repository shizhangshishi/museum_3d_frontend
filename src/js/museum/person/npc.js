import {Person} from "@/js/museum/person/person";

export class NPC extends Person{
    constructor(scale, color) {
        super(scale, color);
    }
    click(){
        window.alert("visitor do something");
    }
}
NPC.prototype.isNpc = true;
