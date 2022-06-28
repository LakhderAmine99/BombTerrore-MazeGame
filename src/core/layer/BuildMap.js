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

        this.#layers.forEach(layer => {

        });
    };

    add(layer){

        this.#layers.push(layer);
    };
};

export default new BuildMap();