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

        // config music
        this.sound.stopAll();
        music = this.sound.add('luna');
        music.setVolume(0.5);
        music.setLoop(true);
        music.play();

        // get map
        const map = this.make.tilemap({ key: "intro" });
        const tileset = map.addTilesetImage("oubliette", "tileset");
        worldLayer = map.createStaticLayer("Background", tileset, 0, 0)
        deathLayer = map.createStaticLayer("death", tileset, 0, 0)
        belowLayer = map.createStaticLayer("fond", tileset, 0, 0)
        aboveLayer = map.createStaticLayer("sol", tileset, 0, 0)

        // set collides
        belowLayer.setCollision([0, 5]);
        this.flames = deathLayer.setCollisionByProperty({ death : true});
        platforms = aboveLayer.setCollisionByProperty({ collides: true });

        // config keyboard input
        cursors = this.input.keyboard.createCursorKeys();

        Enemies = this.add.group();

        // set doors(for cross level)
        Doors = this.add.group();
        map.findObject('Objects', function (object) {
            if (object.name === "finishPoint") {
                endX = object.x
                endY = object.y
            }
        })
        var end = this.add.rectangle(endX + 8, endY, 16, 16, 0x5c5a5a, 128)
        this.physics.add.group(end);

        // create some enemy
        map.createFromObjects('goblin', "goblin", {}).forEach((object) => 
        { Enemies.add(new Goblin(this, object.x, object.y)); object.destroy(); });

        // create and config player
        player = new Player(this, 32, 32);
        this.physics.add.overlap(player, Enemies, () => { player.player_get_hit() }, null, this);
        this.physics.add.collider(platforms, Enemies);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, this.flames, () => this.scene.restart())
        player.body.setCollideWorldBounds(true);


        // set the keyboard input
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

        // go next level
        this.physics.add.collider(end, platforms);
        this.physics.add.collider(end, player, () => this.scene.start("Level3"));

        // config bullet
        bullets = this.physics.add.group();
        this.physics.add.overlap(player, bullets, () => { player.player_get_hit() }, null, this);
    }

    update() {

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

        // player moovements
        player.update()

        // enemy moovements
        Enemies.getChildren().forEach((enemy) => { 
            enemy.update();
            var dist = Phaser.Math.Distance.BetweenPoints(player, enemy);
            if (dist < 200) {
                // enemy go and shoot left(-) or right(+) if player is left or right of the enemy
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