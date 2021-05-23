import {Person} from "@/js/museum/person/person";

export class Visitor extends Person{
    constructor(scale, color) {
        super(scale, color);
    }
    click(){
        window.alert("visitor do something");
    }
}
Visitor.prototype.isVisitor = true;
