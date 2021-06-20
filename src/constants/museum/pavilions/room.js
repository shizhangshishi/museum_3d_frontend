const INNER_SIZE = {
    width: 10_00,
    height: 5_00,
    depth: 15_00
};

const WALL_DEPTH = 20;

const EXTERNAL_SIZE = {
    width: INNER_SIZE.width + 2 * WALL_DEPTH,
    height: INNER_SIZE.height,
    depth: INNER_SIZE.depth + 2 * WALL_DEPTH
}



const DOOR = {
    width: 3_00,
    height: 3_00,
    depth: 10,
}

const FLOOR = {
    width: INNER_SIZE.width,
    height: 4,
    depth: INNER_SIZE.depth
};

export const ROOM = {
    INNER_SIZE,
    EXTERNAL_SIZE,
    FLOOR,
    WALL_DEPTH,
    DOOR
}
