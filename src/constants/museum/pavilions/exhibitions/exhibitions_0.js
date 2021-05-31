const BASIC_PATH = "/museum/room/0/image/";

let exhibitions = [];
let length = 12;

for (let i = 0; i < length; i++){
    if ((i % 2) === 1){
        exhibitions.push(
            {
                name: "pavilion_0 exhibition_" + i,
                path: BASIC_PATH + "1.png",
                k: 2,
                description: "description"
            });
    }
    else {
        exhibitions.push(
            {
                name: "pavilion_0 exhibition_" + i,
                path: BASIC_PATH + "2.png",
                k: 1,
                description: "description"
            });
    }
}

export const EXHIBITIONS_0 = exhibitions;
