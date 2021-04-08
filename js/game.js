const config = {
    type: Phaser.AUTO,

    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 512,
        height: 256,
    },
    backgroundColor: 0x444444,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: {
                y: 600
            }
        }
    }
};
const game = new Phaser.Game(config);
let controls;
var player;
var cursors;
var keyZ;
var keyQ;
var keyS;
var keyD;

function preload() {
    this.load.audio('luna', 'assets/TheThing8bit.mp3');
    this.load.image("tiles", "assets/tilesets/oubliette_tileset.png");
    this.load.tilemapTiledJSON("map", "assets/tilemaps/IntroOubliette.json");
    this.load.spritesheet('dude', 'assets/sprite/dude.png', {
        frameWidth: 32,
        frameHeight: 48
    });
    // Init sounds
}

function create() {
    const map = this.make.tilemap({ key: "map" });
    //music
    var music = this.sound.add('luna');
    music.setVolume(0.4);
    music.play();

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("oubliette", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const worldLayer = map.createStaticLayer("Background", tileset, 0, 0)
    const belowLayer = map.createStaticLayer("fond", tileset, 0, 0)
    const aboveLayer = map.createStaticLayer("sol", tileset, 0, 0)

    belowLayer.setCollision([0, 5]);
    platforms = aboveLayer.setCollisionByProperty({ collides: true });

    //     const debugGraphics = this.add.graphics().setAlpha(0.75);
    // aboveLayer.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;

    // Set up the arrows to control the camera
    cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5
    });

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Help text that has a "fixed" position on the screen
    // this.add
    //   .text(16, 16, "Arrow keys to scroll", {
    //     font: "18px monospace",
    //     fill: "#ffffff",
    //     padding: { x: 20, y: 10 },
    //     backgroundColor: "#000000"
    //   })
    //   .setScrollFactor(0);


    // !!! PLAYER !!!
    player = this.add.rectangle(32, 32, 10, 16, 0x5c5a5a);
    this.physics.add.existing(player);
    this.physics.add.collider(player, platforms);
    // player = this.physics.add.sprite(25, 25, 'assets/sprite/dude').setScale(0.5)

    player.body.setCollideWorldBounds(true);
    // player.body.setGravityY(900)

    // this.anims.create({
    //   key: 'left',
    //   frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    //   frameRate: 10,
    //   repeat: -1
    // });

    // this.anims.create({
    //   key: 'turn',
    //   frames: [{ key: 'dude', frame: 4 }],
    //   frameRate: 20
    // });

    // this.anims.create({
    //   key: 'right',
    //   frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    //   frameRate: 10,
    //   repeat: -1
    // });

    // this.physics.add.collider(player, platforms);

    // !!! CURSORS !!!
    // cursors = this.input.keyboard.createCursorKeys();

    keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    keyZ.on('down', function() { //up
        if (player.body.blocked.down) {
            player.body.setVelocityY(-200);
        }
    }, this);


}



function update(time, delta) {
    // Apply the controls to the camera each update tick of the game
    controls.update(delta);
    // Player moovements
    if (keyQ.isDown && cursors.shift.isDown) {
        player.body.setVelocityX(-350)
    } else if (keyD.isDown && cursors.shift.isDown) {
        player.body.velocity.x = 350
            // Idle
    } else if (keyQ.isDown) {
        player.body.setVelocityX(-100);

        // player.anims.play('left', true);
    }
    // moove right
    else if (keyD.isDown) {
        player.body.setVelocityX(100);

        // player.anims.play('right', true);

    } else {
        player.body.setVelocityX(0);

        // player.anims.play('turn');
    }

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
}