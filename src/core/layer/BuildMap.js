import {MapLayers} from "./MapLayers.js"

class BuildMap {

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

        this.#layers.forEach(layer => {

            for(let row=0 ; row<MapLayers.m_ROWS ; row++)
            {
                for(let column=0 ; column<=MapLayers.m_COLUMNS ; column++)
                {
                    currentTile = layer[row][column];

                    if(currentTile !== MapLayers.mapCode.EMPTY){

                        switch(currentTile){

                            case MapLayers.mapCode.WALL:
                            break;

                            case MapLayers.mapCode.FLOOR:
                            break;

                            case MapLayers.mapCode.HERO:
                            break;

                            case MapLayers.mapCode.BOMB_Y:
                            break;

                            case MapLayers.mapCode.BOX:
                            break;
                        }
                    }
                }
            }
        });
    };

    add(layer){

        this.#layers.push(layer);
    };
};

export default new BuildMap();