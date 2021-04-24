
//retart current scene if player get touch by an enemy
function hitEnemy(player, boss , enemy2) {
    // player.body.setTint(0xff0000);
    // player.anims.play('death');
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
var controls;
var boss;
var enemy2;
var enemy3;
var Doors
var endX;
var endY;
var bosses;

class Level4 extends Phaser.Scene {
    constructor() {
        super({ key: "Level4" });


    }

    preload(){
        this.load.image("tileset", "assets/oubliette_tileset.png");
        this.load.tilemapTiledJSON("lvl4", "assets/lvl/lvl4/arene-boss.json");
    }

    create() {
        this.sound.stopAll();
        this.music = this.sound.add('bossMusic');
        this.music.setVolume(0.4);
        this.music.setLoop(true);
        this.music.play();
        const map = this.make.tilemap({ key: "lvl4" });

        let tileset = map.addTilesetImage("oubliette", "tileset");
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
        var end = this.add.rectangle(endX+8, endY, 16, 16, 0x5c5a5a, 128)
        this.physics.add.group(end);
	    // map.createFromObjects('Objects', "finishPoint", {}).forEach((object) => 
	    // 	{ Doors.add(this.add.rectangle(object.x, object.y+16, 32, 32, 0x5c5a5a, 128)); object.destroy(); });
        // player = this.add.rectangle(32, 32, 10, 16, 0x5c5a5a);
        // this.physics.add.existing(Doors)
        player = new Player(this, 100, 100);

        // this.physics.add.overlap(this.player, this.Enemies, () => { this.player.player_get_hit() }, null, this);
        // this.physics.add.existing(player);
        this.physics.add.collider(player, platforms);
        // player = this.physics.add.sprite(25, 25, 'assets/sprite/dude').setScale(0.5)

        player.body.setCollideWorldBounds(true);

        //set the keyboard input
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
 
        bosses = this.add.group()
        //create some enemy
        this.boss = new Boss(this,435,120)
        bosses.add(this.boss)
        // boss = this.add.sprite(435, 120, 'boss');
        // boss.setScale(3)
        // boss.flipX = 1;
        // this.physics.add.group(boss);
        this.physics.add.overlap(this.boss.player_attack, player, (object, attack) => { this.boss.attack_hit(attack, object) }, null, this);
        this.physics.add.collider(bosses, platforms);
        // this.physics.add.overlap(bosses, player, () => { player.player_get_hit()}, null, this);





        this.physics.add.collider(end, platforms);
        // this.physics.add.collider(end, player, () => this.scene.start("Level4"));
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
            this.music.pause();
        } 
        // O for resume
        else if (keyO.isDown){
            this.physics.resume();
            this.music.resume();
        }
        // I for restart
        else if (keyI.isDown){
            // music.stop();
            this.scene.restart(); // restart current scene
            this.music.stop();
        }
    
        // Player moovements
        player.update()
        bosses.getChildren().forEach((enemy) => { 
            enemy.update();
            
            enemy.distance = Phaser.Math.Distance.BetweenPoints(player, enemy);
            enemy.direction = enemy.distance < 0;
            // if (distance < 200) {
            //     // enemy go left(-) or right(+) if player is left or right of the enemy
            //     if (player.x < enemy.x) {
            //         enemy.body.velocity.x = -40;
            //     }
            //     else if (player.x > enemy.x) {
            //         enemy.body.velocity.x = 40;
            //     }
            // } else {
            //     // enemy dont move
            //     enemy.body.velocity.x = 0;
            // }
         });

        // // Jump
        // if (cursors.up.isDown && player.body.touching.down) // && player.body.touching.down
        // {
        //     player.body.setVelocityY(-300);
        // }
        // if player to left of enemy AND enemy moving to right (or not moving)
    }
}