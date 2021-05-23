import {ROOM_CONFIG} from "./room_config"

// 展览品
const EXHIBITION_SCALE = {
    height: 150,
    depth: 4
};

const BASIC_PATH = "/museum/room/0/image/"

// 墙体展览品
const LEFT_WALL_EXHIBITIONS = [
    {
        name: "left_1 name",
        image: BASIC_PATH + "2.png",
        k: 1,
        description: "left_2 description"
    },
    {
        name: "left_2 name",
        image: BASIC_PATH + "1.png",
        k: 2,
        description: "left_2 description"
    },
    {
        name: "left_3 name",
        image: BASIC_PATH + "2.png",
        k: 1,
        description: "left_3 description"
    }
];
const BEHIND_WALL_EXHIBITIONS = [
    {
        name: "behind_1 name",
        image: BASIC_PATH + "2.png",
        k: 1,
        description: "behind_2 description"
    },
    {
        name: "behind_2 name",
        image: BASIC_PATH + "1.png",
        k: 2,
        description: "behind_2 description"
    },
    {
        name: "behind_3 name",
        image: BASIC_PATH + "2.png",
        k: 1,
        description: "behind_3 description"
    }
];
const RIGHT_WALL_EXHIBITIONS = [
    {
        name: "right_2 name",
        image: BASIC_PATH + "1.png",
        k: 2,
        description: "right_2 description"
    },
    {
        name: "right_1 name",
        image: BASIC_PATH + "2.png",
        k: 1,
        description: "right_2 description"
    },
    {
        name: "right_3 name",
        image: BASIC_PATH + "2.png",
        k: 1,
        description: "right_3 description"
    }
];
const FRONT_WALL_EXHIBITIONS = [
    {
        name: "front_2 name",
        image: BASIC_PATH + "1.png",
        k: 2,
        description: "front_2 description"
    },
    {
        name: "front_1 name",
        image: BASIC_PATH + "2.png",
        k: 1,
        description: "front_2 description"
    },
    {
        name: "front_3 name",
        image: BASIC_PATH + "2.png",
        k: 1,
        description: "front_3 description"
    }
];

const WALL_EXHIBITIONS = {
    left: LEFT_WALL_EXHIBITIONS,
    behind: BEHIND_WALL_EXHIBITIONS,
    right: RIGHT_WALL_EXHIBITIONS,
    front: FRONT_WALL_EXHIBITIONS
}


const EXHIBITIONS = {
    exhibitionScale: EXHIBITION_SCALE,
    wallExhibitions: WALL_EXHIBITIONS
}


export const ROOM_0_CONFIG = {
    innerScale: ROOM_CONFIG.innerScale,
    floor: ROOM_CONFIG.floor,
    walls: ROOM_CONFIG.walls,
    exhibitions: EXHIBITIONS
}
