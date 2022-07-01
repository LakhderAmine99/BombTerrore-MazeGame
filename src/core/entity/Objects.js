export const SpriteObject = {

    sourceX : 0,
    sourceY : 0,
    sourceWidth : 64,
    sourceHeight : 64,

    x : 0,
    y : 0,
    width : 64,
    height : 64,

    vx : 0,
    vy : 0,

    scrolable:true,
    visible:true,

    centerX : function(){

        return (this.x + this.width/2);
    },

    centerY : function(){

        return (this.y + this.height/2);
    },

    halfWidth : function(){

        return this.width/2;
    },

    halfHeight : function(){
        
        return this.height/2;
    }
};

export const MessageObject = {


};