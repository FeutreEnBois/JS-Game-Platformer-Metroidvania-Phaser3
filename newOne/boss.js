class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'boss');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.HP = 5;
        this.hurt = 0;
        this.flag = 0;
        this.state = "";
        this.death = false;
        this.thunder_cooldown = 0;
        this.attack_cooldown = 0;
        this.setScale(3);
        this.body.setSize(20, 27);
        this.body.offset.y = 8;

        
        this.speed_walk = 85;
        this.speed_slide = 185
        this.current_slide_speed = 0;

        this.Phase2 = false;
        this.Phase3 = false;
        this.direction;
        this.distance;
        this.player_attack = this.scene.physics.add.staticGroup();
    }

    attack_hit(attack, object) {
        this.scene.cameras.main.shake(50, 0.02);

        // this.scene.sound.play('snd_sword_hit', { rate: Phaser.Math.FloatBetween(1, 1.25) });

        // var effect = this.scene.add.sprite(attack.x, attack.y, 'fx_attack').setAngle(Math.random() * 360).setScale(0.5);
        // effect.anims.play("fx_attack").on('animationcomplete', () => { effect.destroy() });


        // var slash = this.scene.add.sprite(attack.x, attack.y, 'fx_slash', 5).setAngle(Math.random() * 360).setScale(2, 1);
        // this.scene.tweens.add({ targets: slash, 
        //     scaleY: { value: 0, ease: 'Sine.easeOut', duration: 250}, 
        //     scaleX: { value: 0, ease: 'Linear', duration: 250},
        //     onComplete: () => { slash.destroy() } });
        // attack.destroy();
        object.change_state("Death");
        

    }

    player_get_hit() {
        if (this.isVulnerable() && !this.death) {
            if (!this.HP.add(-1))
                this.change_state("Hurt");
            else
                this.change_state("Death");
        }
    }

    update() {
        // console.log(this.direction)
        // console.log(this.distance)
        if (this.hurt <= 0)
            this.alpha = 1;

        switch (this.state) {
            case "Attack":
                switch (this.flag) {
                    case -2:
                        this.setVelocityX(0);
                        this.anims.play('boss_unsealth_sword', true);
                        this.flag = -1;
                        break;

                    case -1:
                        if (!this.anims.isPlaying)
                            this.flag = 0;
                        break;

                    case 0:
                        this.combo = 0;
                        this.setVelocityX(0);
                        this.anims.play('boss_attack_1_1', true);
                        this.flag = 1;
                        break;

                    case 1:
                        if (!this.anims.isPlaying) {
                            // this.scene.sound.play('snd_sword_slash');
                            this.anims.play('boss_attack_1_2', true);
                            this.flag = 2;
                            var attack_box = this.player_attack.create(this.x + (this.flipX ? -40 : 40), this.y, "", "", false);
                            this.scene.time.addEvent({ delay: 100, callback: () => { attack_box.destroy() } });
                        }
                        break;

                    case 2:
                        if (this.Phase2)
                            this.combo = 1;
                        if (!this.anims.isPlaying) {
                            if (this.combo)
                                this.change_state("Attack2")
                            else {
                                this.change_state("");
                                this.attack_cooldown = 1;
                                this.scene.time.addEvent({ delay: 500, callback: () => { this.attack_cooldown = 0; } });
                                this.anims.play('hero_idle2', true);
                            }
                        }
                        break;
                }
                break;

            case "Attack2":
                switch (this.flag) {
                    case 0:
                        this.setVelocityX(0);
                        this.anims.play('boss_attack_2_1', true);
                        this.combo = 0;
                        this.flag = 1;
                        break;

                    case 1:
                        if (!this.anims.isPlaying) {
                            this.scene.sound.play('snd_sword_slash');
                            this.anims.play('boss_attack_2_2', true);
                            this.flag = 2;
                            var attack_box = this.player_attack.create(this.x + (this.flipX ? -20 : 20), this.y, "", "", false);
                            this.scene.time.addEvent({ delay: 100, callback: () => { attack_box.destroy() } });
                        }
                        break;

                    case 2:
                        if (this.Phase2)
                            this.combo = 1;
                        if (!this.anims.isPlaying) {
                            if (this.combo)
                                this.change_state("Attack3")
                            else {
                                this.change_state("");
                                this.attack_cooldown = 1;
                                this.scene.time.addEvent({ delay: 500, callback: () => { this.attack_cooldown = 0; } });
                                this.anims.play('hero_idle2', true);
                            }
                        }
                        break;
                }
                break;

            case "Attack3":
                switch (this.flag) {
                    case 0:
                        this.anims.play('boss_attack_3_1', true);
                        this.flag = 1;
                        this.setVelocityX((this.flipX ? -1 : 1) * 50);
                        break;

                    case 1:
                        if (!this.anims.isPlaying) {
                            // this.scene.sound.play('snd_sword_slash', { rate: 0.8 });
                            this.anims.play('boss_attack_3_2', true);
                            this.setVelocityX(0);
                            var attack_box = this.player_attack.create(this.x + (this.flipX ? -20 : 20), this.y, "", "", false);
                            this.scene.time.addEvent({ delay: 100, callback: () => { attack_box.destroy() } });
                            this.flag = 2;
                        }
                        break;

                    case 2:
                        if (!this.anims.isPlaying) {
                            this.change_state("");
                            this.attack_cooldown = 1;
                            this.scene.time.addEvent({ delay: 500, callback: () => { this.attack_cooldown = 0; } });
                            this.anims.play('hero_idle2', true);
                        }
                        break;
                }
                break;
            case "Slide":
                switch (this.flag) {
                    case 0:
                        // this.scene.sound.play('snd_slide', { rate: 1.5, volume: 0.8 });
                        this.anims.play('boss_slide', true);
                        this.current_slide_speed = !this.direction ? -200 : 200;
                        this.setVelocityX(this.current_slide_speed)
                        this.scene.tweens.add({ targets: this, current_slide_speed: 0, ease: 'Linear', duration: this.anims.duration });
                        this.flag = 1;
                        this.slide_cooldown = 1;
                        this.scene.time.addEvent({ delay: 1500, callback: () => { this.slide_cooldown = 0; } });
                        break;

                    case 1:
                        if (!this.anims.isPlaying)
                            this.change_state("")
                        if (this.body.velocity.x == 0)
                            this.current_slide_speed = 0;
                        else {
                            this.body.velocity.x = this.current_slide_speed;
                            var fade = this.scene.add.image(this.x, this.y, 'boss', this.anims.currentFrame.frame.name).setAlpha(0.5).setTint(0xff0000);
                            fade.flipX = this.flipX;
                            this.scene.tweens.add({ targets: fade, alpha: 0, ease: 'Power1', duration: 250, onComplete: () => { fade.destroy() } });
                        }
                        break;
                }
                break;
            case "Death":
                if (this.body.onFloor())
                    this.body.velocity.x *= 0.9;
                switch (this.flag) {
                    case 0:
                        this.scene.sound.play('snd_dead');
                        this.anims.play('hero_defeat', true);
                        this.setVelocityX((this.flipX ? 1 : -1) * 125);
                        this.setVelocityY(-100);
                        this.flag = 1;
                        this.death = true;
                        this.scene.cameras.main.flash(500, 255, 0, 0)
                        break;

                    case 1:
                        if (!this.anims.isPlaying) {
                            this.flag = 2;
                            this.scene.cameras.main.once("camerafadeoutcomplete", () => { this.scene.scene.restart(); });
                            this.scene.time.addEvent({ delay: 1000, callback: () => { this.scene.cameras.main.fade(1000, 0, 0, 0); } });
                        }
                        break;
                }
                break;

            default:
                
                this.flag = 0;
                if (this.body.onFloor()) {
                    this.jump = 1;
                    if (this.distance < 100 && !this.attack_cooldown) {
                        this.setVelocityX(0);
                        this.change_state("Attack");
                        // if (this.anims.getCurrentKey() != 'hero_idle2')
                        this.flag = -2;
                    }
                    else if (this.distance > 200 && this.distance < 400 && !this.slide_cooldown) {
                        this.change_state("Slide");
                    }
                    else if (this.distance < 10) {
                        this.setVelocityY(-200);
                        this.anims.play('hero_up', true);
                        // this.scene.sound.play('snd_jump', { rate: 2, volume: 0.6 });
                    }
                    else if (this.direction != 0) {
                        this.setVelocityX(this.direction * 75);
                        this.anims.play('hero_walk', true);
                        this.flipX = this.direction > 0;
                    }
                    else {
                        this.setVelocityX(0);
                        if (!this.anims.isPlaying)
                            this.anims.play('hero_idle', true);
                    }
                }
                else {
                    if (!this.attack_cooldown) {
                        this.change_state("AttackAir");
                    }
                    else if (this.distance > 200) {
                        this.setVelocityX(75);
                        this.flipX = this.direction < 0;
                    }
                    else
                        this.setVelocityX(0);
                }
                break;
        }

        if (this.state == "Slide") {
            this.body.setSize(16, 16);
            this.body.offset.y = 16;
        }
        else {
            this.body.setSize(16, 24);
            this.body.offset.y = 8;
        }

    }
}