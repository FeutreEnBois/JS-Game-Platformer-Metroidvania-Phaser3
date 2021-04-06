window.onload = function() {
    var gameConfig = {
        type: Phaser.AUTO,
        scale: {
            parent: 'phaser-example',
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600
        },
        backgroundColor: 0x444444,
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 0
                }
            }
        },
       scene: [preloadGame, playGame]
    }
    game = new Phaser.Game(gameConfig);
}

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
            gravity: {
                y: 0
            }
        }
    }
  };
  const game = new Phaser.Game(config);
  let controls;
  
  function preload() {
    this.load.image("tiles", "assets/tilesets/oubliette_tileset.png");
    this.load.tilemapTiledJSON("map", "assets/tilemaps/IntroOubliette.json");
  }
  
  function create() {
    const map = this.make.tilemap({ key: "map" });
  
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("oubliette", "tiles");
  
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const worldLayer = map.createStaticLayer("Background", tileset, 0, 0)
    const belowLayer = map.createStaticLayer("fond", tileset, 0, 0)
    const aboveLayer = map.createStaticLayer("sol", tileset, 0, 0)

    aboveLayer.setCollisionByProperty({ collides : true});

//     const debugGraphics = this.add.graphics().setAlpha(0.75);
// aboveLayer.renderDebug(debugGraphics, {
//   tileColor: null, // Color of non-colliding tiles
//   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
//   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
// });
  
    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;
  
    // Set up the arrows to control the camera
    const cursors = this.input.keyboard.createCursorKeys();
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
    this.add
      .text(16, 16, "Arrow keys to scroll", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000"
      })
      .setScrollFactor(0);
  }
  
  function update(time, delta) {
    // Apply the controls to the camera each update tick of the game
    controls.update(delta);
  }