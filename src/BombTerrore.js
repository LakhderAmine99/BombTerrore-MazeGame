import {MapLayers} from "./core/layer/MapLayers.js";
import {GameState} from "./core/state/State.js";
import MapBuilder,{sprites,boxes,hero,bombs }from "./core/layer/MapBuilder.js";
import Collision from "./core/collision/Collision.js";

function BombTerrore(){

    const canvas = document.querySelector('canvas');
    
    const gDrawingSurface = canvas.getContext('2d', {alpha: false});

    const gAssetsToLoad = [];
    const gAssetsPath = "../assets/atlasing/";
    const gTileSet = new Image();

    const UP = 38;
    const DOWN = 40;
    const LEFT = 37;
    const RIGHT = 39;

    let moveUp = false;
    let moveDown = false;
    let moveLeft = false;
    let moveright = false;

    let loadedAssets = 0;
    
    this._config = function(){

        console.log("BombTerrore game is up and running...");
    };

    this.run = function(){

        this._config();
        
        gTileSet.addEventListener('load',loadHandler,false);
        gTileSet.src = gAssetsPath + "final_atlasset.png";
        gAssetsToLoad.push(gTileSet);

        handleEventListeners();

        update();
    };

    function handleEventListeners(){

        window.addEventListener('keyup',(e) => {

            switch(e.keyCode){

                case UP:
                    moveUp = false;
                break;

                case DOWN:
                    moveDown = false;
                break;

                case LEFT:
                    moveLeft = false;
                break;

                case RIGHT:
                    moveright = false;
                break;
            }

        },false);

        window.addEventListener('keydown',(e) => {

            switch(e.keyCode){

                case UP:
                    moveUp = true;
                break;

                case DOWN:
                    moveDown = true;
                break;

                case LEFT:
                    moveLeft = true;
                break;

                case RIGHT:
                    moveright = true;
                break;
            }

        },false);

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
        
        if(moveUp && !moveDown){
            hero.vy = -4;
        }

        if(moveDown && !moveUp){
            hero.vy = 4;
        }

        if(moveLeft && !moveright){
            hero.vx = -4;
        }

        if(moveright && !moveLeft){
            hero.vx = 4;
        }

        if(!moveDown && !moveUp){
            hero.vy = 0;
        }

        if(!moveright && !moveLeft){
            hero.vx = 0;
        }

        hero.x += hero.vx;
        hero.y += hero.vy;

        for(let i=0 ; i<boxes.length ; i++){

            Collision.blockRectangle(hero,boxes[i]);
        }

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