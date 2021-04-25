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
        this.load.spritesheet('boss', 'assets/Monsters_Creatures_Fantasy/boss/adventurer.png', { frameWidth: 50, frameHeight: 37 });
        this.load.spritesheet('Thunder', 'assets/Monsters_Creatures_Fantasy/boss/attack-effect/Thunder.png', { frameWidth: 32, frameHeight: 100});

        // Load all assets
        this.load.image("bullet", "assets/Monsters_Creatures_Fantasy/effect/bullet.png");
        this.load.image("tileset", "assets/lvl/oubliette_tileset.png");
        this.load.image("button_idle", "assets/Button.png");
        this.load.image("Nom", "assets/Nom.png");
        this.load.image("background", "assets/black-background.jpg");
        this.load.tilemapTiledJSON("lvl", "assets/lvl/lvl2/lvl2.json");
        this.load.tilemapTiledJSON("lvl3", "assets/lvl/lvl3/lvl1.json");
        this.load.tilemapTiledJSON("intro", "assets/lvl/intro/IntroOubliette.json");
        this.load.tilemapTiledJSON("lvl4", "assets/lvl/lvl4/arene-boss.json");

        // AUDIO
        this.load.audio('omen', 'assets/audio/theme/Omen.mp3')
        this.load.audio('bossMusic', 'assets/audio/theme/Amygdala.mp3')
        this.load.audio('luna', 'assets/audio/theme/TheThing8bit.mp3');

        // SND FX
        this.load.audio('cry-thunder', 'assets/Monsters_Creatures_Fantasy/boss/sound-fx/Explosion8.mp3')
        this.load.audio('mort', 'assets/Monsters_Creatures_Fantasy/boss/sound-fx/mort.mp3')
        this.load.audio('stab', 'assets/Monsters_Creatures_Fantasy/boss/sound-fx/sword-stab.mp3')
        this.load.audio('jump', 'assets/Monsters_Creatures_Fantasy/boss/sound-fx/jump.wav')
        this.load.audio('woosh', 'assets/Monsters_Creatures_Fantasy/boss/sound-fx/sword-woosh.wav')
        this.load.audio('pan', 'assets/Monsters_Creatures_Fantasy/boss/sound-fx/preview.mp3')
        this.load.audio('slide', 'assets/Monsters_Creatures_Fantasy/boss/sound-fx/slide.wav')
        
    };

    create() {
        this.anims.create({ key: 'hero_walk', frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 13 }), repeat: -1, frameRate: 10, });
        this.anims.create({ key: 'hero_idle', frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }), repeat: -1, frameRate: 7, });
        this.anims.create({ key: 'hero_idle2', frames: this.anims.generateFrameNumbers('hero', { start: 38, end: 41 }), repeat: -1, frameRate: 7, });
        this.anims.create({ key: 'hero_boost', frames: this.anims.generateFrameNumbers('hero', { start: 17, end: 21 }), frameRate: 20, repeat: 1 });
        this.anims.create({ key: 'hero_up', frames: this.anims.generateFrameNumbers('hero', { start: 69, end: 71 }), repeat: -1, frameRate: 8, });
        this.anims.create({ key: 'hero_fall', frames: this.anims.generateFrameNumbers('hero', { start: 22, end: 23 }), repeat: -1, frameRate: 8, });
        this.anims.create({ key: 'hero_slide', frames: this.anims.generateFrameNumbers('hero', { start: 24, end: 28 }), duration: 800, });
        this.anims.create({ key: 'hero_hurt', frames: this.anims.generateFrameNumbers('hero', { start: 59, end: 61 }), frameRate: 5, });
        this.anims.create({ key: 'hero_defeat', frames: this.anims.generateFrameNumbers('hero', { start: 62, end: 68 }), frameRate: 8, });

        this.anims.create({ key: 'boss_walk', frames: this.anims.generateFrameNumbers('boss', { start: 8, end: 13 }), repeat: -1, frameRate: 10, });
        this.anims.create({ key: 'boss_idle', frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 3 }), repeat: -1, frameRate: 7, });
        this.anims.create({ key: 'boss_idle2', frames: this.anims.generateFrameNumbers('boss', { start: 38, end: 41 }), repeat: -1, frameRate: 7, });
        this.anims.create({ key: 'boss_boost', frames: this.anims.generateFrameNumbers('boss', { start: 17, end: 21 }), frameRate: 20, repeat: 1 });
        this.anims.create({ key: 'boss_up', frames: this.anims.generateFrameNumbers('boss', { start: 69, end: 71 }), repeat: -1, frameRate: 8, });
        this.anims.create({ key: 'boss_fall', frames: this.anims.generateFrameNumbers('boss', { start: 22, end: 23 }), repeat: -1, frameRate: 8, });
        this.anims.create({ key: 'boss_unsealth_sword', frames: this.anims.generateFrameNumbers('boss', { start: 69, end: 73 }), frameRate: 20, });
        this.anims.create({ key: 'boss_attack_1_1', frames: this.anims.generateFrameNumbers('boss', { start: 42, end: 43 }), frameRate: 15, });
        this.anims.create({ key: 'boss_attack_1_2', frames: this.anims.generateFrameNumbers('boss', { start: 44, end: 47 }), frameRate: 15, });
        this.anims.create({ key: 'boss_attack_2_1', frames: this.anims.generateFrameNumbers('boss', { start: 47, end: 49 }), frameRate: 15, });
        this.anims.create({ key: 'boss_attack_2_2', frames: this.anims.generateFrameNumbers('boss', { start: 50, end: 52 }), frameRate: 15, });
        this.anims.create({ key: 'boss_attack_3_1', frames: this.anims.generateFrameNumbers('boss', { start: 53, end: 54 }), frameRate: 10, });
        this.anims.create({ key: 'boss_attack_3_2', frames: this.anims.generateFrameNumbers('boss', { start: 55, end: 58 }), frameRate: 15, });
        this.anims.create({ key: 'boss_slide', frames: this.anims.generateFrameNumbers('boss', { start: 24, end: 28 }), duration: 800, });
        this.anims.create({ key: 'boss_hurt', frames: this.anims.generateFrameNumbers('boss', { start: 59, end: 61 }), frameRate: 5, });
        this.anims.create({ key: 'boss_defeat', frames: this.anims.generateFrameNumbers('boss', { start: 62, end: 68 }), frameRate: 8, });
        this.anims.create({ key: 'pre-thunder', frames: this.anims.generateFrameNumbers('boss', { start: 62, end: 64 }), frameRate: 12, });
        this.anims.create({ key: 'post-thunder-charge', frames: this.anims.generateFrameNumbers('boss', { start: 59, end: 65 }), frameRate: 12, })

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

        // EFFECT
        this.anims.create({ key: 'thunder', frames: this.anims.generateFrameNumbers('Thunder', { start: 0, end: 6 }), repeat : 2, frameRate: 10, });

        this.scene.start('Level3');
    };
}