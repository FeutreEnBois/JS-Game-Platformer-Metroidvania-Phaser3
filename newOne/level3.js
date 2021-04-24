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
var Doors
var endX;
var endY;
var Enemies;

class Level3 extends Phaser.Scene {
    constructor() {
        super({ key: "Level3" });


    }

    preload(){
        this.load.image("tileset", "assets/oubliette_tileset.png");
        this.load.tilemapTiledJSON("lvl1", "assets/lvl/lvl3/lvl1.json");
    }

    create() {

        const map = this.make.tilemap({ key: "lvl3" });

        let tileset = map.addTilesetImage("oubliette", "tileset");
        this.deathLayer = map.createStaticLayer("death", tileset, 0,0)
        worldLayer = map.createStaticLayer("Background", tileset, 0, 0)
        belowLayer = map.createStaticLayer("fond", tileset, 0, 0)
        aboveLayer = map.createStaticLayer("sol", tileset, 0, 0)
        this.wallLayer = map.createStaticLayer("wall", tileset, 0,0)

        belowLayer.setCollision([0, 5]);
        this.walls = this.wallLayer.setCollisionByProperty({ collides: true});
        this.flames = this.deathLayer.setCollisionByProperty({ death: true});
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
        map.findObject('Objects', function(object){
            if (object.name === "finishPoint"){
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

        var end = this.add.rectangle(endX+8, endY, 16, 16, 0x5c5a5a, 128)
        this.physics.add.group(end);
	    // map.createFromObjects('Objects', "finishPoint", {}).forEach((object) => 
	    // 	{ Doors.add(this.add.rectangle(object.x, object.y+16, 32, 32, 0x5c5a5a, 128)); object.destroy(); });
        // player = this.add.rectangle(32, 32, 10, 16, 0x5c5a5a);
        // this.physics.add.existing(Doors)
        player = new Player(this, 32, 32);

        // this.physics.add.overlap(this.player, this.Enemies, () => { this.player.player_get_hit() }, null, this);
        // this.physics.add.existing(player);
        this.physics.add.overlap(player, Enemies, () => { player.player_get_hit() }, null, this);
        this.physics.add.collider(player, this.walls);
        this.physics.add.collider(player, this.flames, ()  =>{  player.player_get_hit() }, null, this);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(platforms, Enemies);
        // player = this.physics.add.sprite(25, 25, 'assets/sprite/dude').setScale(0.5)

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
        
        



        this.physics.add.collider(end, platforms);
        this.physics.add.collider(end, player, () => this.scene.start("Level4"));

        bullets = this.physics.add.group();
        this.physics.add.overlap(player, bullets, () => { player.player_get_hit() }, null, this);

        // set a following player camera
        this.cameras.main.setBounds(0, 0, worldLayer.displayWidth, worldLayer.displayHeight);
        this.cameras.main.startFollow(player);
        
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
            music.pause();
        } 
        // O for resume
        else if (keyO.isDown){
            this.physics.resume();
            music.resume();
        }
        // I for restart
        else if (keyI.isDown){
            // music.stop();
            this.scene.restart(); // restart current scene
    
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
    }
}