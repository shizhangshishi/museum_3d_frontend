import * as THREE from "three"
import {Body} from "@/js/museum/person/parts/body"
import {Head} from "@/js/museum/person/parts/head"
import {Leg} from "@/js/museum/person/parts/leg";

// 头部中心点 = 人的中心点 = 视角中心点

const HEAD_RATIO = {
    width: 0.55,
    height: 0.2,
    depth: 0.55
}
const BODY_RATIO = {
    width: 1,
    height: 0.5,
    depth: 1
}
const LEG_RATIO = {
    width: 0.7,
    height: 0.3,
    depth: 0.7
}

export class Person extends THREE.Mesh{
    constructor(scale, color) {
        super();
        this.width = scale.width;
        this.height = scale.height;
        this.depth = scale.depth;
        
        this.color = color;

        this.head = null;
        this.body = null;
        this.leg = null;

        this.setPerson();
    }
    setPerson(){
        this.setHead(this.color.head);
        this.setBody(this.color.body);
        this.setLeg(this.color.leg);
        this.position.y += this.getEyeHeight();
    }
    
    setHead(color){
        let scale = this.getPartScale(HEAD_RATIO);

        this.head = new Head(scale, color);
        this.add(this.head);
    }
    setBody(color){
        let scale = this.getPartScale(BODY_RATIO);
        this.body = new Body(scale, color);
        this.body.position.y -= (this.head.height / 2 + this.body.height / 2);
        this.add(this.body);
    }
    setLeg(color){
        let scale = this.getPartScale(LEG_RATIO);
        this.leg = new Leg(scale, color);
        this.leg.position.y -= (this.head.height / 2 + this.body.height + this.leg.height / 2);
        this.add(this.leg);
    }
    getEyeHeight = function (){
        return this.head.height / 2 + this.body.height + this.leg.height;
    }
    setPosition = function (x, z){
        this.position.x = x;
        this.position.z = z;
    }
    
    getPartScale = function (ratio){
        let width = this.width * ratio.width;
        let height = this.height * ratio.height;
        let depth = this.depth * ratio.depth;
        return {
            width: width,
            height: height,
            depth: depth
        }
    }
   
}
Person.prototype.isPerson = true;


