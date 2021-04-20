// Game.Level1 = function(game){};

// Game.Level1.prototype = {
//     create:function(){
//         this.stage.backgroundColor = '#3A5963'
//     },

//     update:function(){

//     },
// }

function hitEnemy(player, enemy1 , enemy2) {
    // player.body.setTint(0xff0000);
    // player.anims.play('death');
    // music.stop();
    this.scene.restart();
    gameOver = true;
}

var worldLayer;
var belowLayer;
var aboveLayer;
var player;
var cursors;
var playerSpeed = 150;
var jumpTimer = 0;
var platforms;
var keyZ;
var keyQ;
var keyS;
var keyD;
var keyP;
var keyO;
var keyI;
var nbrDash = 2;
var dash = 4;
var delayBTWDash = 60;
var delay = 0;
var cooldownDash = false;
var volume = 0.4;
var music;
var controls;
var enemy1;
var enemy2;
var enemy3;

class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: "Level1" });


    }

    create() {

        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("oubliette", "tileset");
        worldLayer = map.createStaticLayer("Background", tileset, 0, 0)
        belowLayer = map.createStaticLayer("fond", tileset, 0, 0)
        aboveLayer = map.createStaticLayer("sol", tileset, 0, 0)

        belowLayer.setCollision([0, 5]);
        platforms = aboveLayer.setCollisionByProperty({ collides: true });
        // Help text that has a "fixed" position on the screen
        // this.add
        //     .text(16, 16, "Arrow keys to scroll", {
        //         font: "18px monospace",
        //         fill: "#ffffff",
        //         padding: { x: 20, y: 10 },
        //         backgroundColor: "#000000"
        //     })
        //     .setScrollFactor(0);

        cursors = this.input.keyboard.createCursorKeys();
        // player = this.add.rectangle(32, 32, 10, 16, 0x5c5a5a);
        player = new Player(this, 32, 32);

        // this.physics.add.overlap(this.player, this.Enemies, () => { this.player.player_get_hit() }, null, this);
        // this.physics.add.existing(player);
        this.physics.add.collider(player, platforms);
        // player = this.physics.add.sprite(25, 25, 'assets/sprite/dude').setScale(0.5)

        player.body.setCollideWorldBounds(true);

        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyZ.on('down', function () { //up
            if (player.body.blocked.down) {
                player.body.setVelocityY(-200);
            }
        }, this);


        enemy1 = this.add.rectangle(300, 120, 10, 16, 0xff0000);
        this.physics.add.group(enemy1);
        this.physics.add.collider(enemy1, platforms);
        this.physics.add.collider(enemy1, player, hitEnemy, null, this);

        enemy2 = this.add.rectangle(700, 75, 16, 10, 0xff0000);
        this.physics.add.group(enemy2);
        this.physics.add.collider(enemy2, platforms);
        this.physics.add.collider(enemy2, player, hitEnemy, null, this);
        enemy2.body.allowGravity = false;

        enemy3 = this.add.rectangle(450, 120, 18, 16, 0xff0000);
        this.physics.add.group(enemy3);
        this.physics.add.collider(enemy3, platforms);
        this.physics.add.collider(enemy3, player, hitEnemy, null, this);

    }

    update() {
        if (cooldownDash == true){
            delay += 1
            if (delay == delayBTWDash){
                cooldownDash = false
                dash = nbrDash
            }
        }
        // Apply the controls to the camera each update tick of the game
        
        // P for pause
        if (keyP.isDown) {
            this.physics.pause();
        } 
        // O for resume
        else if (keyO.isDown){
            this.physics.resume();
        }
        // I for restart
        else if (keyI.isDown){
            // music.stop();
            this.scene.restart(); // restart current scene
    
        }
    
        // Player moovements
        player.update()
        // else if (keyQ.isDown && cursors.space.isDown && cooldownDash != true) {
        //     dash -= 1;
        //     if (dash == 0){
        //         delay = 0
        //         cooldownDash = true;
        //     }
        //     player.body.setVelocityX(-1000)
        //     // speedBoostG()
        // } else if (keyD.isDown && cursors.space.isDown && cooldownDash != true) {
        //     // speedBoostD()
        //     dash -= 1;
        //     if (dash == 0){
        //         delay = 0
        //         cooldownDash = true;
        //     }
        //     player.body.setVelocityX(1000)
        // }       // Idle
    
        // else if (keyQ.isDown) {
        //     player.body.setVelocityX(-80);
    
        //     // player.anims.play('left', true);
        // }
        // // moove right
        // else if (keyD.isDown) {
        //     player.body.setVelocityX(80);
    
        //     // player.anims.play('right', true);
    
        // } else {
        //     player.body.setVelocityX(0);
    
        //     // player.anims.play('turn');
        // }
    
        if (keyZ.isDown) {
            console.log('Z key pressed')
        } else if (keyS.isDown) {
            console.log('S key pressed')
        } else if (keyD.isDown) {
            console.log('D key pressed')
        } else if (keyQ.isDown) {
            console.log('Q key pressed')
        }
        // // Jump
        // if (cursors.up.isDown && player.body.touching.down) // && player.body.touching.down
        // {
        //     player.body.setVelocityY(-300);
        // }
        // if player to left of enemy AND enemy moving to right (or not moving)
        if (player.x <= enemy1.x && player.y == enemy1.y) {
            // move enemy to left
            enemy1.body.velocity.x = -30;
        }
        // if player to right of enemy AND enemy moving to left (or not moving)
        else if (player.x >= enemy1.x && player.y == enemy1.y) {
            // move enemy to right
            enemy1.body.velocity.x = 30;
        }
    
        if (player.x <= enemy2.x) {
            // move enemy to left
            // enemy2.body.velocity.x = -50;
            enemy2.body.velocity.x = -50;
        }
        // if player to right of enemy AND enemy moving to left (or not moving)
        else if (player.x >= enemy2.x) {
            // move enemy to right
            enemy2.body.velocity.x = 50;
        }
    
        if (player.x <= (enemy3.x+10) && player.y == enemy3.y) {
            // move enemy to left
            enemy3.body.velocity.x = 20;
        }
        // if player to right of enemy AND enemy moving to left (or not moving)
        else if (player.x == (enemy3.x+10) && player.y == enemy3.y) {
            // move enemy to right
            enemy3.body.velocity.x = -20;
        }
    }
}