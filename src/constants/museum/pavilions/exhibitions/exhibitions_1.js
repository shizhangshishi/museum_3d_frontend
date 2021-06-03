import * as EXHIBITIONS from "/public/museum/room/1/1.json";
import {EXHIBITION_SIZE} from "@/constants/museum/pavilions/exhibitions/exhibition_size";
const BASIC_PATH = "/museum/room/1/image/";

let exhibitions = EXHIBITIONS.default;


for (let i = 0; i < exhibitions.length; i++){
    exhibitions[i].path = BASIC_PATH + exhibitions[i].path;
}
const LEFT_WALL_EXHIBITIONS = exhibitions.slice(0, 3);
const BEHIND_WALL_EXHIBITIONS = exhibitions.slice(3, 5);
const RIGHT_WALL_EXHIBITIONS = exhibitions.slice(5, 8);
const FRONT_WALL_EXHIBITIONS = exhibitions.slice(8, 10);

export const EXHIBITIONS_1 = {
    EXHIBITION_SIZE,
    LEFT_WALL_EXHIBITIONS,
    BEHIND_WALL_EXHIBITIONS,
    RIGHT_WALL_EXHIBITIONS,
    FRONT_WALL_EXHIBITIONS
};
