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

    let gameWorld = null;
    let camera = null;
    
    this._config = function(){

        console.log("BombTerrore game is up and running...");
    };

    this.run = function(){

        this._config();
        
        gTileSet.addEventListener('load',loadHandler,false);
        gTileSet.src = gAssetsPath + "final_atlasset.png";
        gAssetsToLoad.push(gTileSet);

        gameWorld = {
            x:0,
            y:0,
            width:MapLayers.m_COLUMNS*MapLayers.m_TILE_SIZE,
            height:MapLayers.m_ROWS*MapLayers.m_TILE_SIZE
        }

        camera = {
            x:0,
            y:0,
            width:canvas.width,
            height:canvas.height,

            vx:0,
            vy:0,

            rightInnerBoundary: function()
            {
                return this.x + (this.width / 2) + (this.width / 4);
            },

            leftInnerBoundary: function()
            {
                return this.x + (this.width / 2) - (this.width / 4);
            },

            topInnerBoundary: function()
            {
                return this.y + (this.height / 2) - (this.height / 4);
            },

            bottomInnerBoundary: function(){  

                return this.y + (this.height / 2) + (this.height / 4);
            }
        }

        camera.x = (gameWorld.x + gameWorld.width/2) - camera.width/2;
        camera.y = (gameWorld.y + gameWorld.height/2) - camera.height/2;

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

        hero.x = Math.max(64,Math.min(hero.x + hero.vx,gameWorld.width - hero.width - 64));
        hero.y = Math.max(64,Math.min(hero.y + hero.vy,gameWorld.height - hero.height - 64));

        if(hero.x < camera.leftInnerBoundary())
        {
            camera.x = Math.floor(hero.x - (camera.width / 4));
        }
        if(hero.y < camera.topInnerBoundary())
        {
            camera.y = Math.floor(hero.y - (camera.height / 4));
        }
        if(hero.x + hero.width > camera.rightInnerBoundary())
        {
            camera.x = Math.floor(hero.x + hero.width - (camera.width / 4 * 3));
        }
        if(hero.y + hero.height > camera.bottomInnerBoundary())
        {
            camera.y = Math.floor(hero.y + hero.height - (camera.height / 4 * 3));
        }

        if(camera.x < gameWorld.x)
        {
            camera.x = gameWorld.x;
        }
        if(camera.y < gameWorld.y)
        {
            camera.y = gameWorld.y;
        }
        if(camera.x + camera.width > gameWorld.x + gameWorld.width)
        {
            camera.x = gameWorld.x + gameWorld.width - camera.width;
        }
        if(camera.y + camera.height > gameWorld.height)
        {
            camera.y = gameWorld.height - camera.height;
        }

        for(let i=0 ; i<boxes.length ; i++){

            Collision.blockRectangle(hero,boxes[i]);
        }

        for(let j=0 ; j<bombs.length ; j++){

            if(Collision.hitTestRectangle(hero,bombs[j])){

            }
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

        gDrawingSurface.save();
        gDrawingSurface.translate(-camera.x,-camera.y);

        sprites.forEach(sprite => {

            gDrawingSurface.drawImage(
                gTileSet,sprite.sourceX,sprite.sourceY,
                sprite.sourceWidth,sprite.sourceHeight,
                sprite.x,sprite.y,sprite.width,sprite.height
            );
        });

        gDrawingSurface.restore();

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