// var Game = {};

// Game.Boot = function(game){

// };

// Game.Boot.prototype = {
//     init:function(){
//         this.input.maxPointers = 1;
//         this.stage.disableVisibilityChange = true;
//     },

//     preload:function(){
//         this.preload.image('preloaderBar', 'assets/preloader.png')
//     },

//     create:function(){
//         this.state.start('preloader');
//     }
// }

function getKeyState(key)
{
    key.isPressed = !key.previous_down && key.isDown;
    key.isReleased = key.previous_down && !key.isDown;
    key.previous_down = key.isDown;
}

class Boot extends Phaser.Scene{
    constructor()
    {
        super({ key: "Boot"});
    }

    preload(){
        this.load.image('preloaderBar', 'assets/preloader.jpg')
    }

    create(){
        this.scene.start('preloader')
    }
}