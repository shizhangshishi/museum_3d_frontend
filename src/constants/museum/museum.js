import {FLOOR} from "@/constants/museum/floor";
import {HALL} from "@/constants/museum/hall/hall";

import {PAVILION_0} from "@/constants/museum/pavilions/pavilion_0";
import {PAVILION_1} from "@/constants/museum/pavilions/pavilion_1";
import {PAVILION_2} from "@/constants/museum/pavilions/pavilion_2";

import {TABLET} from "@/constants/museum/tablet";
import {ROAD} from "@/constants/museum/road";

const PAVILIONS = [
    PAVILION_0,
    PAVILION_1,
    PAVILION_2
];

const ARCHITECTURE = {
    HALL,
    PAVILIONS
}

export const MUSEUM_CONFIG = {
    FLOOR,
    ARCHITECTURE,
    TABLET,
    ROAD
}
