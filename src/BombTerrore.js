import {MapLayers} from "./core/layer/MapLayers.js";
import {GameState} from "./core/state/State.js";
import MapBuilder,{sprites,boxes,hero,bombs }from "./core/layer/MapBuilder.js";

function BombTerrore(){

    const canvas = document.querySelector('canvas');
    
    const gDrawingSurface = canvas.getContext('2d');

    const gAssetsToLoad = [];
    const gAssetsPath = "../assets/atlasing/";
    const gTileSet = new Image();

    let loadedAssets = 0;
    
    this._config = function(){

        console.log("BombTerrore game is up and running...");
    };

    this.run = function(){

        this._config();
        
        gTileSet.addEventListener('load',loadHandler,false);
        gTileSet.src = gAssetsPath + "final_atlasset.png";
        gAssetsToLoad.push(gTileSet);

        update();
    };

    function handleEventListeners(){

    };

    function loadHandler(){        
        
        loadedAssets++;
                        
        if(loadedAssets == gAssetsToLoad.length){
            
            gTileSet.removeEventListener('load',loadHandler,false);

            GameState.STATE = GameState.BUILD_MAP;
        }
        
        return;
    };

    function update(){

        requestAnimationFrame(update,canvas);

        switch(GameState.STATE){

            case GameState.LOADING:
                console.log("Loading BombTerrore...");
                break;
            
            case GameState.BUILD_MAP:

                MapBuilder.build(
                    MapLayers.mapLayer,
                    MapLayers.mapObjectsLayer
                );

                GameState.STATE = GameState.PLAYING;

                break;
            
            case GameState.PLAYING:
                playGame();
                break;
            
            case GameState.PAUSE:
                pauseGame();
                break;
            
            case GameState.GAME_OVER:
                endGame();
                break;            
        };

        render();
    };

    function playGame(){
        return;
    };

    function endGame(){
        return;
    };

    function pauseGame(){
        return;
    };

    function render(){

        gDrawingSurface.clearRect(0,0,canvas.width,canvas.height);

        sprites.forEach(sprite => {

            gDrawingSurface.drawImage(
                gTileSet,sprite.sourceX,sprite.sourceY,
                sprite.sourceWidth,sprite.sourceHeight,
                sprite.x,sprite.y,sprite.width,sprite.height
            );
        });

        return;
    };
};

const setup = () => {

    window.onload = () => {

        window.app = new BombTerrore();
        window.app.run();
    };
};

setup();