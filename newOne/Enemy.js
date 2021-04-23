class Goblin extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x ,y)
    {
        super(scene,x,y,'dude');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.HP = 1;
        this.hurt = 0;
        this.flag = 0;
        this.state = "";
        this.flipX = Phaser.Math.Between(0, 1);
        this.setScale(0.8);
        this.body.setSize(32, 45);
        // this.body.offset.y = -10;
        this.setCollideWorldBounds(true);
    }

    update()
    {
        switch(this.state)
        {
            default:
                if (!this.anims.isPlaying){
                    this.anims.play('left',true);
                }
                if (this.body.velocity.x === 0)
                {
                    this.flipX = !this.flipX;
                    this.body.velocity.x = this.flipX ? 15 : -15;
                }
                break;
        }
    }
    
}; 

class Bat extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'bat');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.HP = 1;
        this.hurt = 0;
        this.flag = 0;
        this.state = "";
        this.speed = Phaser.Math.Between(0, 1) == 0 ? 25 : -25;
        this.body.setSize(24, 24);
        this.body.setAllowGravity(false);
        this.setCollideWorldBounds(true);
        this.anims.play('bat');
        this.body.velocity.y = this.speed;
    }
    update()
    {
        if (this.body.velocity === 0)
        {
            this.speed = -this.speed;
            this.body.velocity.y = this.speed;
        }
    }
    death()
    {
        this.scene.add.sprite(this.x, this.y).anims.play('bat_death');
        this.destroy();
    }
}


class Mushroom extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x ,y)
    {
        super(scene,x,y,'mushroom');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.HP = 3;
        this.hurt = 0;
        this.flag = 0;
        this.state = "";
        this.flipX = Phaser.Math.Between(0, 1);
        this.body.setSize(20, 14);
        this.body.offset.y = 10;
        this.setCollideWorldBounds(true);
    }

    update()
    {
        switch(this.state)
        {
            case "Hurt":
                this.setVelocityX(0);
                if(this.flag == 0)
                {
                    this.anims.play('mushroom');
                    this.flag = 1;
                }
                if (!this.anims.isPlaying)
                {
                    this.state = "";
                    this.body.velocity.x = this.flipX ? 8 : -8;
                }
                break;

            default:
                this.anims.play('mushroom',true);
                if (this.body.velocity.x === 0)
                {
                    this.flipX = !this.flipX;
                    this.body.velocity.x = this.flipX ? 8 : -8;
                }
                break;
        }
    }
    death()
    {
        this.scene.add.sprite(this.x, this.y).anims.play('mushroom_death');
        this.destroy();
    }
    
}; 














// class Slime extends Phaser.Physics.Arcade.Sprite 
// {
//     constructor(scene, x, y) 
//     {
//         super(scene, x, y, 'slime');
//         scene.add.existing(this);
//         scene.physics.world.enable(this);
//         this.HP = 3;
//         this.hurt = 0;
//         this.flag = 0;
//         this.state = "";
//         this.flipX = Phaser.Math.Between(0, 1);
//         this.body.setSize(16, 10);
//         this.body.offset.y = 10;
//         this.setCollideWorldBounds(true);
//     }

//     update()
//     {
//         switch(this.state)
//         {
//             case "Hurt":
//                 this.setVelocityX(0);
//                 if(this.flag == 0)
//                 {
//                     this.scene.sound.play('snd_slime_splat', { rate: 0.8 });
//                     this.anims.play('slime_hurt');
//                     this.flag = 1;
//                 }
//                 if (!this.anims.isPlaying)
//                 {
//                     this.state = "";
//                     this.body.velocity.x = this.flipX ? 15 : -15;
//                 }
//                 break;

//             default:
//                 this.anims.play('slime_move', true);
//                 if (this.body.velocity.x === 0)
//                 {
//                     this.flipX = !this.flipX;
//                     this.body.velocity.x = this.flipX ? 15 : -15;
//                 }
//                 break;
//         }
//     }

//     death()
//     {
//         this.scene.add.sprite(this.x, this.y).anims.play('slime_death');
//         this.scene.sound.play('snd_slime_death');
//         this.destroy();
//     }
// };

// class Bee extends Phaser.Physics.Arcade.Sprite 
// {
//     constructor(scene, x, y) 
//     {
//         super(scene, x, y, 'bee');
//         scene.add.existing(this);
//         scene.physics.world.enable(this);
//         this.HP = 3;
//         this.hurt = 0;
//         this.flag = 0;
//         this.state = "";
//         this.speed = Phaser.Math.Between(0, 1) == 0 ? 25 : -25;
//         this.body.setSize(24, 24);
//         this.body.setAllowGravity(false);
//         this.setCollideWorldBounds(true);
//         this.anims.play('bee');
//         this.body.velocity.y = this.speed;
//     }

//     update()
//     {
//         if (this.body.velocity.y === 0)
//         {
//             this.speed = -this.speed;
//             this.body.velocity.y = this.speed;
//         }
//     }

//     death()
//     {
//         var dying = this.scene.add.sprite(this.x, this.y);
//         dying.anims.play('enemy_death');
//         dying.on('animationcomplete', () => {dying.destroy()});
//         this.scene.sound.play('snd_insect_death');
//         this.destroy();
//     }
// }