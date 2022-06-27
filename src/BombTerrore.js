function BombTerrore(){

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
    }
};

setup();