// 基础房间
// 100 = 1m

// 地板尺寸
const FLOOR = {
    width: 1800,
    height: 50, // 地面厚度
    depth: 2000
};

// 房间尺寸
const ROOM_INNER_SCALE = {
    width: 900,
    height: 500,
    depth: 1500
};

// 墙壁尺寸
const WALL_DEPTH = 40;

let leftWallWidth = ROOM_INNER_SCALE.depth + WALL_DEPTH;

const WALL_LEFT = {
    width: leftWallWidth,
    height: ROOM_INNER_SCALE.height,
    depth: WALL_DEPTH
}
const WALL_RIGHT = {
    width: leftWallWidth,
    height: ROOM_INNER_SCALE.height,
    depth: WALL_DEPTH
}
const WALL_FRONT = {
    width: ROOM_INNER_SCALE.width,
    height: ROOM_INNER_SCALE.height,
    depth: WALL_DEPTH,
}
const WALL_BEHIND = {
    width: ROOM_INNER_SCALE.width,
    height: ROOM_INNER_SCALE.height,
    depth: WALL_DEPTH,
}

const WALLS = {
    left: WALL_LEFT,
    behind: WALL_BEHIND,
    right: WALL_RIGHT,
    front: WALL_FRONT
}

export const ROOM_CONFIG = {
    innerScale: ROOM_INNER_SCALE,
    floor: FLOOR,
    walls: WALLS,
}
