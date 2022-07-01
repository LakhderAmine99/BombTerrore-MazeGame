class Collision {

    constructor(){
        // empty for now
    };

    /**
     * @type {SpriteObject}
     * @param  {...any} sprites 
     * @returns {boolean} true if there's collision , false otherwise
     */
    hitTestRectangle(...sprites){

        let sprite_1 = sprites[0];
        let sprite_2 = sprites[0];

        let vx = sprite_1.centerX() - sprite_2.centerX();
        let vy = sprite_1.centerY() - sprite_2.centerY();

        let combinedHalfWidths = sprite_1.halfWidth() + sprite_2.halfWidth();
        let combinedHalfHeights = sprite_1.halfHeight() + sprite_2.halfHeight();

        if(Math.abs(vx) < combinedHalfWidths){

            if(Math.abs(vy) < combinedHalfHeights){

                return true;
            }
        }

        return false;
    }

    /**
     * 
     * @type {SpriteObject}
     * @param  {...any} sprites 
     */
    blockRectangle(...sprites){

        let sprite_1 = sprites[0];
        let sprite_2 = sprites[1];

        let xDistance = sprite_1.centerX() - sprite_2.centerX();
        let yDistance = sprite_1.centerY() - sprite_2.centerY();

        let combinedHalfWidths = sprite_1.halfWidth() + sprite_2.halfWidth();
        let combinedHalfHeights = sprite_1.halfHeight() + sprite_2.halfHeight();

        if(Math.abs(xDistance) < combinedHalfWidths){

            if(Math.abs(yDistance) < combinedHalfHeights){

                let overlapX = combinedHalfWidths - Math.abs(xDistance);
                let overlapY = combinedHalfHeights - Math.abs(yDistance);

                if(overlapX >= overlapY){

                    if(yDistance <= 0){
                        sprite_1.y -= overlapY;
                    }else{
                        sprite_1.y += overlapY;
                    }

                }else{

                    if(xDistance <= 0){
                        sprite_1.x -= overlapX;
                    }else{
                        sprite_1.x += overlapX;
                    }
                }
            }
        }
    }
};

export default new Collision();