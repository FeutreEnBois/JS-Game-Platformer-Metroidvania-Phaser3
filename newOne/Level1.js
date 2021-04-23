// Game.Level1 = function(game){};

// Game.Level1.prototype = {
//     create:function(){
//         this.stage.backgroundColor = '#3A5963'
//     },

//     update:function(){

//     },
// }


//restart current scene when you get touch by an enemy
function hitEnemy(player, enemy1, enemy2) { 
    // player.body.setTint(0xff0000);
    // player.anims.play('death');
    music.stop();
    this.scene.restart();
    gameOver = true;
}

//restart current scene when you get touch by an bullet
function hitBullet(player, bullets) {
    // player.body.setTint(0xff0000);
    // player.anims.play('death');
    music.stop();
    this.scene.restart();
    gameOver = true;
}


var worldLayer;
var belowLayer;
var aboveLayer;
var deathLayer;
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
var enemy4;
var goblin;
var Doors
var endX;
var endY;
var bullets;
var Enemies;

class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: "Level1" });
    }

    create() {
        this.sound.stopAll();
        music = this.sound.add('luna');
        music.setVolume(volume);
        music.setLoop(true);
        music.play();

        const map = this.make.tilemap({ key: "intro" });
        const tileset = map.addTilesetImage("oubliette", "tileset");
        worldLayer = map.createStaticLayer("Background", tileset, 0, 0)
        deathLayer = map.createStaticLayer("death", tileset, 0, 0)
        belowLayer = map.createStaticLayer("fond", tileset, 0, 0)
        aboveLayer = map.createStaticLayer("sol", tileset, 0, 0)

        belowLayer.setCollision([0, 5]);
        this.flames = deathLayer.setCollisionByProperty({ death : true});
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
        Enemies = this.add.group();
        Doors = this.add.group();
        map.findObject('Objects', function (object) {
            if (object.name === "finishPoint") {
                endX = object.x
                endY = object.y
            }
            // if (object.type === "Spawn"){
            //     if (object.name === "Enemy"){
            //         this.player = new PLayer(this, object.x, object.y)
            //     }
            // }
        })

        map.createFromObjects('goblin', "goblin", {}).forEach((object) => 
        { Enemies.add(new Goblin(this, object.x, object.y)); object.destroy(); });

        var end = this.add.rectangle(endX + 8, endY, 16, 16, 0x5c5a5a, 128)
        this.physics.add.group(end);

        // player = this.add.rectangle(32, 32, 10, 16, 0x5c5a5a);
        player = new Player(this, 32, 32);
        // goblin = new Goblin(this,250,120);

        // this.physics.add.overlap(this.player, this.Enemies, () => { this.player.player_get_hit() }, null, this);
        // this.physics.add.existing(player);
        this.physics.add.overlap(player, Enemies, () => { player.player_get_hit() }, null, this);
        this.physics.add.collider(platforms, Enemies);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, this.flames, () => this.scene.restart())
        // this.physics.add.collider(goblin, platforms);
        // player = this.physics.add.sprite(25, 25, 'assets/sprite/dude').setScale(0.5)

        player.body.setCollideWorldBounds(true);

        // !!! GOBLIN !!!

        // goblin.body.setCollideWorldBounds(true);
        // goblin.setScale(0.5)

        //set the keyboard input
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

        //create some enemy
        enemy1 = this.add.rectangle(450, 120, 10, 16, 0xff0000);
        this.physics.add.group(enemy1);
        this.physics.add.collider(enemy1, platforms);
        this.physics.add.collider(enemy1, player, hitEnemy, null, this);

        enemy2 = this.add.rectangle(700, 75, 16, 10, 0xff0000);
        this.physics.add.group(enemy2);
        this.physics.add.collider(enemy2, platforms);
        this.physics.add.collider(enemy2, player, hitEnemy, null, this);
        enemy2.body.allowGravity = false;

        enemy3 = this.add.rectangle(300, 120, 18, 20, 0xff0000);
        this.physics.add.group(enemy3);
        this.physics.add.collider(enemy3, platforms);
        this.physics.add.collider(enemy3, player, hitEnemy, null, this);

        enemy4 = this.add.rectangle(400, 120, 18, 20, 0xff0000);
        this.physics.add.group(enemy4);
        this.physics.add.collider(enemy4, platforms);
        this.physics.add.collider(enemy4, player, hitEnemy, null, this);


        enemy1.body.setCollideWorldBounds(true);
        enemy2.body.setCollideWorldBounds(true);
        enemy3.body.setCollideWorldBounds(true);
        enemy4.body.setCollideWorldBounds(true);

        this.physics.add.collider(end, platforms);
        this.physics.add.collider(end, player, () => this.scene.start("Level2"));

        bullets = this.physics.add.group();
        this.physics.add.collider(player, bullets, hitBullet, null, this);
    }

    update() {
        if (cooldownDash == true) {
            delay += 1
            if (delay == delayBTWDash) {
                cooldownDash = false
                dash = nbrDash
            }
        }

        // P for pause the physics
        if (keyP.isDown) {
            this.physics.pause();
            music.pause();
        }
        // O for resume the physics
        else if (keyO.isDown) {
            this.physics.resume();
            music.resume();
        }
        // I for restart current scene
        else if (keyI.isDown) {
            music.stop();
            this.scene.restart(); 

        }

        // Player moovements
        player.update()
        Enemies.getChildren().forEach((enemy) => { 
            enemy.update();
            var dist = Phaser.Math.Distance.BetweenPoints(player, enemy);
            if (dist < 200) {
                // enemy go left(-) or right(+) if player is left or right of the enemy
                if (player.x < enemy.x) {
                    enemy.body.velocity.x = -40;
                    enemy.shoot2G()
                }
                else if (player.x > enemy.x) {
                    enemy.body.velocity.x = 40;
                    enemy.shoot2D()
                }
            } else {
                // enemy dont move
                enemy.body.velocity.x = 0;
            }
         });

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

        // !!! GOBLIN !!!


        // if (player.x <= goblin.x) {
        //     // move enemy to left
        //     goblin.body.velocity.x = -30;
        // }
        // // if player to right of enemy AND enemy moving to left (or not moving)
        // else if (player.x >= goblin.x) {
        //     // move enemy to right
        //     goblin.body.velocity.x = 30;
        // }


        // distance (on pixel) between player and each enemy 
        
        var dist2 = Phaser.Math.Distance.BetweenPoints(player, enemy3);
        var dist3 = Phaser.Math.Distance.BetweenPoints(player, enemy4);

        
    }
}