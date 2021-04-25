var bullets


class Level3 extends Phaser.Scene {
    constructor() {
        super({ key: "Level3" });
    }

    preload(){
        this.load.image("tileset", "assets/oubliette_tileset.png");
        this.load.tilemapTiledJSON("lvl1", "assets/lvl/lvl3/lvl1.json");
    }

    create() {

        // get map
        const map = this.make.tilemap({ key: "lvl3" });
        const tileset = map.addTilesetImage("oubliette", "tileset");
        this.deathLayer = map.createStaticLayer("death", tileset, 0,0)
        this.worldLayer = map.createStaticLayer("Background", tileset, 0, 0)
        this.belowLayer = map.createStaticLayer("fond", tileset, 0, 0)
        this.aboveLayer = map.createStaticLayer("sol", tileset, 0, 0)
        this.wallLayer = map.createStaticLayer("wall", tileset, 0,0)
     
        // set collides
        this.belowLayer.setCollision([0,5]);
        this.walls = this.wallLayer.setCollisionByProperty({ collides: true});
        this.flames = this.deathLayer.setCollisionByProperty({ death: true});
        this.platforms = this.aboveLayer.setCollisionByProperty({ collides: true });

        // config keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        this.Enemies = this.add.group();
        this.EnemiesF = this.add.group();

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

        // create some enemy
        map.createFromObjects('goblin', "goblin", {}).forEach((object) => 
	    	{ this.Enemies.add(new Goblin(this, object.x, object.y));
                object.destroy(); });
        map.createFromObjects('bat', "bat", {}).forEach((object) => 
	    	{ this.EnemiesF.add(new Bat(this, object.x, object.y));
                object.destroy(); });

        // create and config player
        this.player = new Player(this, 32, 150);
        this.physics.add.overlap(this.player, this.Enemies, () => { this.player.player_get_hit() }, null, this);
        this.physics.add.overlap(this.player, this.EnemiesF, () => { this.player.player_get_hit() }, null, this);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.flames, ()  =>{  this.player.player_get_hit() }, null, this);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.platforms, this.Enemies);
        this.physics.add.collider(this.platforms, this.EnemiesF);
        // player = this.physics.add.sprite(25, 25, 'assets/sprite/dude').setScale(0.5)

        //set the keyboard input
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        
        // go next level
        this.physics.add.collider(this.end, this.platforms);
        this.physics.add.collider(this.end, this.player, () => this.scene.start("Level4"));

        // config bullet
        bullets = this.physics.add.group();
        this.physics.add.overlap(this.player, bullets, () => { this.player.player_get_hit() }, null, this);

        // set a following player camera
        this.cameras.main.setBounds(0, 0, this.worldLayer.displayWidth, this.worldLayer.displayHeight);
        this.cameras.main.startFollow(this.player);
        
    }

    update() {

        // P for pause the physics
        if (this.keyP.isDown) {
            this.physics.pause();
        }

        // O for resume the physics
        else if (this.keyO.isDown) {
            this.physics.resume();
        }
        
        // I for restart current scene
        else if (this.keyI.isDown) {
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