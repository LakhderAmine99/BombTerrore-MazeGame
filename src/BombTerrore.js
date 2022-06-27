import {MapLayers} from "./core/layer/MapLayers.js";

function BombTerrore(){

    const canvas = document.getElementsByTagName('canvas');
    
    this._config = function(){

        console.log("BombTerrore game is up and running...");
    };

    this.run = function(){

        this._config();
    };
};

const setup = () => {

    window.onload = () => {

        window.app = new BombTerrore();
        window.app.run();
    };
};

setup();