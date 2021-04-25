// var worldLayer;
// var belowLayer;
// var aboveLayer;
// var player;
// var cursors;
// var playerSpeed = 150;
// var jumpTimer = 0;
// var platforms;
// var keyZ;
// var keyQ;
// var keyS;
// var keyD;
// var keyP;
// var keyO;
// var keyI;
// var nbrDash = 2;
// var dash = 4;
// var delayBTWDash = 60;
// var delay = 0;
// var cooldownDash = false;
// var volume = 0.4;
// var controls;
// var boss;
// var enemy2;
// var enemy3;
// var Doors
// var endX;
// var endY;
// var bosses;

class Level4 extends Phaser.Scene {
    constructor() {
        super({ key: "Level4" });
    }

    preload(){
        this.load.image("tileset", "assets/oubliette_tileset.png");
        this.load.tilemapTiledJSON("lvl4", "assets/lvl/lvl4/arene-boss.json");
    }

    create() {

        // config music
        this.sound.stopAll();
        this.music = this.sound.add('bossMusic');
        this.music.setVolume(0.6);
        this.music.setLoop(true);
        this.music.play();
        const map = this.make.tilemap({ key: "lvl4" });

        // get map
        const tileset = map.addTilesetImage("oubliette", "tileset");
        this.worldLayer = map.createStaticLayer("Background", tileset, 0, 0)
        this.belowLayer = map.createStaticLayer("fond", tileset, 0, 0)
        this.aboveLayer = map.createStaticLayer("sol", tileset, 0, 0)

        // set collides
        this.belowLayer.setCollision([0, 5]);
        this.platforms = this.aboveLayer.setCollisionByProperty({ collides: true });

        // config keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // set doors(for cross level)
        this.Doors = this.add.group(); 
        map.findObject('Objects', function(object){
            if (object.name === "finishPoint"){
                endX = object.x
                endY = object.y
            }
        })
        this.end = this.add.rectangle(endX+8, endY, 16, 16, 0x5c5a5a, 128)
        this.physics.add.group(this.end);
        this.physics.add.collider(this.end, this.platforms);

        // create and config player
        this.player = new Player(this, 100, 210);
        this.physics.add.collider(this.player, this.platforms);
        this.player.body.setCollideWorldBounds(true);

        // set the keyboard input
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
 
        // config boss
        this.bosses = this.add.group()
        this.boss = new Boss(this,435,190)
        this.bosses.add(this.boss)
        this.physics.add.overlap(this.boss.player_attack, this.player, (object, attack) => { this.boss.attack_hit(attack, object) }, null, this);
        this.physics.add.collider(this.boss, this.platforms);
    }

    update() {

        // P for pause
        if (this.keyP.isDown) {
            this.physics.pause();
            this.music.pause();
        } 
        // O for resume
        else if (this.keyO.isDown){
            this.physics.resume();
            this.music.resume();
        }
        // I for restart current scene
        else if (this.keyI.isDown){
            // music.stop();
            this.scene.restart();
            this.music.stop();
        }
    
        // player moovements
        this.player.update()

        // boss moovements
        this.bosses.getChildren().forEach((enemy) => { 
            enemy.distance = this.player.body.x - enemy.body.x;
            enemy.direction = enemy.distance > 0 ? 1 : -1;
            enemy.update();
         });
    }
}