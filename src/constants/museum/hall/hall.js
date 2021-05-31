import {ROOM} from "@/constants/museum/pavilions/room";


const PAVILION_EXTERNAL_SIZE = ROOM.EXTERNAL_SIZE;
const PAVILION_DOOR = ROOM.DOOR;

const EXTERNAL_SIZE = {
    width: PAVILION_EXTERNAL_SIZE.width * 3,
    height: PAVILION_EXTERNAL_SIZE.height,
    depth: 20_00 + ROOM.WALL_DEPTH * 2
};

const INNER_SIZE = {
    width: EXTERNAL_SIZE.width - 2 * ROOM.WALL_DEPTH,
    height: EXTERNAL_SIZE.height,
    depth: EXTERNAL_SIZE.depth - 2 * ROOM.WALL_DEPTH
};

const FLOOR = {
    width: INNER_SIZE.width,
    height: 2,
    depth: INNER_SIZE.depth
};

const WALL_DEPTH = ROOM.WALL_DEPTH;

const FRONT_DOOR = {
    width: 5_00,
    height: 3_00,
    depth: 20,
}
const BEHIND_DOOR = PAVILION_DOOR;

const DOOR = {
    FRONT_DOOR,
    BEHIND_DOOR
}
const FRONT_TABLE = {
    width: 3_00,
    height: 1_20,
    depth: 1_00
}
const RECEPTIONIST = {
    width: 50,
    height: 170,
    depth: 30,
}
const RECEPTION = {
    FRONT_TABLE,
    RECEPTIONIST
}
export const HALL = {
    ROOM: {
        INNER_SIZE,
        EXTERNAL_SIZE,
        FLOOR,
        WALL_DEPTH,
        DOOR,
    },
    PAVILION_EXTERNAL_SIZE,
    RECEPTION,
}
