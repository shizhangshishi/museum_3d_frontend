import {EXHIBITIONS_0} from "@/constants/museum/pavilions/exhibitions/exhibitions_0";
import {EXHIBITION_SIZE} from "@/constants/museum/pavilions/exhibitions/exhibition_size";

const LEFT_WALL_EXHIBITIONS = EXHIBITIONS_0.slice(0, 3);
const BEHIND_WALL_EXHIBITIONS = EXHIBITIONS_0.slice(3, 6);
const RIGHT_WALL_EXHIBITIONS = EXHIBITIONS_0.slice(6, 9);
const FRONT_WALL_EXHIBITIONS = EXHIBITIONS_0.slice(9, 12);

export const EXHIBITIONS = {
    EXHIBITION_SIZE,
    LEFT_WALL_EXHIBITIONS,
    BEHIND_WALL_EXHIBITIONS,
    RIGHT_WALL_EXHIBITIONS,
    FRONT_WALL_EXHIBITIONS,
}
