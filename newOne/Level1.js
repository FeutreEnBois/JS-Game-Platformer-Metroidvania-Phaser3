// var worldLayer;
// var belowLayer;
// var aboveLayer;
// var deathLayer;
// var player;
// var cursors;
// var playerSpeed = 150;
// var jumpTimer = 0;
// // var platforms;
// // var keyZ;
// // var keyQ;
// // var keyS;
// // var keyD;
// // var keyP;
// // var keyO;
// // var keyI;
// // var nbrDash = 2;
// // var dash = 4;
// // var delayBTWDash = 60;
// // var delay = 0;
// // var cooldownDash = false;
// // var volume = 0.4;
// // var music;
// // var controls;
// // var enemy1;
// // var enemy2;
// // var enemy3;
// // var enemy4;
// // var goblin;
// // var Doors
// // var endX;
// // var endY;
var bullets;
// var Enemies;

class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: "Level1" });
    }

    create() {

        // config music
        this.sound.stopAll();
        this.music = this.sound.add('luna');
        this.music.setVolume(0.5);
        this.music.setLoop(true);
        this.music.play();

        // get map
        const map = this.make.tilemap({ key: "intro" });
        const tileset = map.addTilesetImage("oubliette", "tileset");
        this.worldLayer = map.createStaticLayer("Background", tileset, 0, 0)
        this.deathLayer = map.createStaticLayer("death", tileset, 0, 0)
        this.belowLayer = map.createStaticLayer("fond", tileset, 0, 0)
        this.aboveLayer = map.createStaticLayer("sol", tileset, 0, 0)

        // set collides
        this.belowLayer.setCollision([0, 5]);
        this.flames = this.deathLayer.setCollisionByProperty({ death : true});
        this.platforms = this.aboveLayer.setCollisionByProperty({ collides: true });

        // config keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        this.Enemies = this.add.group();

        // set doors(for cross level)
        this.Doors = this.add.group();
        map.findObject('Objects', function (object) {
            if (object.name === "finishPoint") {
                endX = object.x
                endY = object.y
            }
        })
        this.end = this.add.rectangle(endX + 8, endY, 16, 16, 0x5c5a5a, 128)
        this.physics.add.group(this.end);

        // create some enemy
        map.createFromObjects('goblin', "goblin", {}).forEach((object) => 
        { this.Enemies.add(new Goblin(this, object.x, object.y)); object.destroy(); });

        // create and config player
        this.player = new Player(this, 32, 32);
        this.physics.add.overlap(this.player, this.Enemies, () => { this.player.player_get_hit() }, null, this);
        this.physics.add.collider(this.platforms, this.Enemies);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.flames, () => this.scene.restart())
        this.player.body.setCollideWorldBounds(true);


        // set the keyboard input
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

        // go next level
        this.physics.add.collider(this.end, this.platforms);
        this.physics.add.collider(this.end, this.player, () => this.scene.start("Level3"));

        // config bullet
        bullets = this.physics.add.group();
        this.physics.add.overlap(this.player, bullets, () => { this.player.player_get_hit() }, null, this);
    }

    update() {

        // P for pause the physics
        if (this.keyP.isDown) {
            this.physics.pause();
            this.music.pause();
        }

        // O for resume the physics
        else if (this.keyO.isDown) {
            this.physics.resume();
            this.music.resume();
        }
        
        // I for restart current scene
        else if (this.keyI.isDown) {
            this.music.stop();
            this.scene.restart(); 

        }

        // player moovements
        this.player.update()

        // enemy moovements
        this.Enemies.getChildren().forEach((enemy) => { 
            enemy.update();
            var dist = Phaser.Math.Distance.BetweenPoints(this.player, enemy);
            if (dist < 200) {
                // enemy go and shoot left(-) or right(+) if player is left or right of the enemy
                if (this.player.x < enemy.x) {
                    enemy.body.velocity.x = -40;
                    enemy.shoot2G()
                }
                else if (this.player.x > enemy.x) {
                    enemy.body.velocity.x = 40;
                    enemy.shoot2D()
                }
            } else {
                // enemy dont move
                enemy.body.velocity.x = 0;
            }
         });
    }
}