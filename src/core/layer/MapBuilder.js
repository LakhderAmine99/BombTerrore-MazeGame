import {MapLayers} from "./MapLayers.js"
import {SpriteObject} from "../entity/Objects.js";

/**
 * @type {SpriteObject}
 */
export const sprites = [];

/**
 * @type {SpriteObject}
 */
export const boxes = [];

/**
 * @type {SpriteObject}
 */
export const bombs = [];

/**
 * @type {SpriteObject}
 */
export let hero = null;

class MapBuilder {

    /**
     * @type {Array}
     */
    #layers = null;

    constructor(...layers){

        if(arguments.length != 0){

            this.#layers = layers;
        }
    };

    build(...layers){

        if(this.#layers === null){
            this.#layers = layers;
        }

        let currentTile = null;
        let tileSheetX = 0;
        let tileSheetY = 0;

        this.#layers.forEach(layer => {

            for(let row=0 ; row<MapLayers.m_ROWS ; row++)
            {
                for(let column=0 ; column<=MapLayers.m_COLUMNS ; column++)
                {
                    currentTile = layer[row][column];

                    if(currentTile !== MapLayers.mapCode.EMPTY){

                        tileSheetX = Math.floor((currentTile-1) % MapLayers.m_ATLAS_SHEET_COLUMNS)*MapLayers.m_TILE_SIZE;
                        tileSheetY = Math.floor((currentTile-1) / MapLayers.m_ATLAS_SHEET_COLUMNS)*MapLayers.m_TILE_SIZE;

                        switch(currentTile){

                            case MapLayers.mapCode.WALL:

                                /**
                                 * @type {SpriteObject}
                                 */
                                let wall = Object.create(SpriteObject);

                                wall.sourceX = tileSheetX;
                                wall.sourceY = tileSheetY;
                                wall.x = column*MapLayers.m_TILE_SIZE;
                                wall.y = row*MapLayers.m_TILE_SIZE;

                                sprites.push(wall);
                            break;

                            case MapLayers.mapCode.FLOOR:

                                /**
                                 * @type {SpriteObject}
                                 */
                                let floor = Object.create(SpriteObject);

                                floor.sourceX = tileSheetX;
                                floor.sourceY = tileSheetY;
                                floor.x = column*MapLayers.m_TILE_SIZE;
                                floor.y = row*MapLayers.m_TILE_SIZE;

                                sprites.push(floor);
                            break;

                            case MapLayers.mapCode.HERO:

                                hero = Object.create(SpriteObject);

                                hero.sourceX = tileSheetX;
                                hero.sourceY = tileSheetY;
                                hero.x = column*MapLayers.m_TILE_SIZE;
                                hero.y = row*MapLayers.m_TILE_SIZE;
                            break;

                            case MapLayers.mapCode.BOMB_Y:

                                /**
                                 * @type {SpriteObject}
                                 */
                                let bomb_y = Object.create(SpriteObject);

                                bomb_y.sourceX = tileSheetX;
                                bomb_y.sourceY = tileSheetY;
                                bomb_y.width = 32;
                                bomb_y.height = 32;
                                bomb_y.x = column*MapLayers.m_TILE_SIZE + 16;
                                bomb_y.y = row*MapLayers.m_TILE_SIZE + 16;

                                sprites.push(bomb_y);
                                bombs.push(bomb_y);
                            break;

                            case MapLayers.mapCode.BOX:

                                /**
                                 * @type {SpriteObject}
                                 */
                                let box = Object.create(SpriteObject);

                                box.sourceX = tileSheetX;
                                box.sourceY = tileSheetY;
                                box.x = column*MapLayers.m_TILE_SIZE;
                                box.y = row*MapLayers.m_TILE_SIZE;

                                sprites.push(box);
                                boxes.push(box);
                            break;
                        }
                    }
                }
            }
        });

        sprites.push(hero);

        return;
    };

    buildExtraGameObjects(...extraObjects){
        
        extraObjects.forEach(object => {

            sprites.push(object);
        });
    };

    add(layer){

        this.#layers.push(layer);
    };
};

export default new MapBuilder();
