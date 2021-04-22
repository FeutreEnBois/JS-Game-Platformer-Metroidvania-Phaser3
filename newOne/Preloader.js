Phaser.GameObjects.Sprite.prototype.change_state = function(state, flag = 0)
{
    this.state = state;
    this.flag = flag;
};

class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: "preloader" });
    }

    preload() {
        this.load.spritesheet('hero', 'assets/hero/adventurer/adventurer.png', { frameWidth: 50, frameHeight: 37 });
        this.load.spritesheet('dude', 'assets/hero/adventurer/dude.png', { frameWidth: 32, frameHeight: 48 });

        this.load.spritesheet('goblin', 'assets/Monsters_Creatures_Fantasy/Goblin/Run.png', { frameWidth: 150, frameHeight: 150 });
        // this.preloaderBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

        // this.preloaderBar.anchor.setTo(0.5,0.5);
        // this.time.advancedTiming = true;
        // this.preload.setPreloadSprite(this.preloadBar);

        // Load all assets
        this.load.image("bullet", "assets/Monsters_Creatures_Fantasy/effect/bullet.png");
        this.load.image("tileset", "assets/lvl/oubliette_tileset.png");
        this.load.tilemapTiledJSON("lvl", "assets/lvl/lvl2/lvl2.json");
        this.load.tilemapTiledJSON("lvl3", "assets/lvl/lvl3/lvl1.json");
        this.load.tilemapTiledJSON("intro", "assets/lvl/intro/IntroOubliette.json");
        this.load.tilemapTiledJSON("lvl4", "assets/lvl/lvl4/arene-boss.json");

        // AUDIO

        this.load.audio('luna', 'assets/audio/theme/TheThing8bit.mp3');
    };

    create() {
        this.anims.create({ key: 'hero_walk', frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 13 }), repeat: -1, frameRate: 10, });
        this.anims.create({ key: 'hero_idle', frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }), repeat: -1, frameRate: 7, });
        this.anims.create({ key: 'hero_idle2', frames: this.anims.generateFrameNumbers('hero', { start: 38, end: 41 }), repeat: -1, frameRate: 7, });
        this.anims.create({ key: 'hero_boost', frames: this.anims.generateFrameNumbers('hero', { start: 17, end: 21 }), frameRate: 20, repeat: 1 });
        this.anims.create({ key: 'hero_up', frames: this.anims.generateFrameNumbers('hero', { start: 77, end: 78 }), repeat: -1, frameRate: 8, });
        this.anims.create({ key: 'hero_fall', frames: this.anims.generateFrameNumbers('hero', { start: 22, end: 23 }), repeat: -1, frameRate: 8, });
        this.anims.create({ key: 'hero_unsealth_sword', frames: this.anims.generateFrameNumbers('hero', { start: 69, end: 73 }), frameRate: 20, });
        this.anims.create({ key: 'hero_attack_1_1', frames: this.anims.generateFrameNumbers('hero', { start: 42, end: 43 }), frameRate: 15, });
        this.anims.create({ key: 'hero_attack_1_2', frames: this.anims.generateFrameNumbers('hero', { start: 44, end: 47 }), frameRate: 15, });
        this.anims.create({ key: 'hero_attack_2_1', frames: this.anims.generateFrameNumbers('hero', { start: 47, end: 49 }), frameRate: 15, });
        this.anims.create({ key: 'hero_attack_2_2', frames: this.anims.generateFrameNumbers('hero', { start: 50, end: 52 }), frameRate: 15, });
        this.anims.create({ key: 'hero_attack_3_1', frames: this.anims.generateFrameNumbers('hero', { start: 53, end: 54 }), frameRate: 10, });
        this.anims.create({ key: 'hero_attack_3_2', frames: this.anims.generateFrameNumbers('hero', { start: 55, end: 58 }), frameRate: 15, });
        this.anims.create({ key: 'hero_attack_air', frames: this.anims.generateFrameNumbers('hero', { start: 96, end: 99 }), frameRate: 12, });
        this.anims.create({ key: 'hero_slide', frames: this.anims.generateFrameNumbers('hero', { start: 24, end: 28 }), duration: 800, });
        this.anims.create({ key: 'hero_hurt', frames: this.anims.generateFrameNumbers('hero', { start: 59, end: 61 }), frameRate: 5, });
        this.anims.create({ key: 'hero_defeat', frames: this.anims.generateFrameNumbers('hero', { start: 62, end: 68 }), frameRate: 8, });
        
        

        this.anims.create({ key: 'goblin_walk', frames: this.anims.generateFrameNumbers('goblin', {start:0, end: 7}), repeat: -1, frameRate: 10});
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        // this.anims.create({ key: 'goblin_hurt', frames: this.anims.generateFrameNumbers('goblin', {start:0, end: 3}), repeat: -1, frameRate: 10});
        // this.anims.create({ key: 'goblin_death', frames: this.anims.generateFrameNumbers('goblin', {start:0, end: 3}), repeat: -1, frameRate: 10});
        
        this.anims.create({ key: 'bat_fly', frames: this.anims.generateFrameNumbers('bat', {start:0, end: 7}), repeat: -1, frameRate: 10});
        this.anims.create({ key: 'bat_hurt', frames: this.anims.generateFrameNumbers('bat', {start:0, end: 3}), repeat: -1, frameRate: 10});
        this.anims.create({ key: 'bat_death', frames: this.anims.generateFrameNumbers('bat', {start:0, end: 3}), repeat: -1, frameRate: 10});

        this.anims.create({ key: 'mushroom_walk', frames: this.anims.generateFrameNumbers('mushroom', {start:0, end: 7}), repeat: -1, frameRate: 10});
        this.anims.create({ key: 'mushroom_hurt', frames: this.anims.generateFrameNumbers('mushroom', {start:0, end: 3}), repeat: -1, frameRate: 10});
        this.anims.create({ key: 'mushroom_death', frames: this.anims.generateFrameNumbers('mushroom', {start:0, end: 3}), repeat: -1, frameRate: 10});



        this.scene.start('Level4');
    };
}