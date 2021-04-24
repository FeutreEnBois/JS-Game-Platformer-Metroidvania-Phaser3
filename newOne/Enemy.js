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
        this.setScale(0.5);
        this.body.setSize(32, 45);
        // this.body.offset.y = -10;
    }

    update()
    {
        switch(this.state)
        {
            default:
                if (this.body.velocity.x < 0){
                    this.anims.play('left',true);
                } else if (this.body.velocity.x > 0){
                    this.anims.play('right',true);
                }
                break;
        }
    }


    
    //shoot a bullet to left
    shoot2G() {
        let i = 1
        let l = this.getRandomInt(200)
        if(i == l) {
            console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
            var bullet = bullets.create(this.body.x , this.body.y+10 , 'bullet');
            bullet.setScale(0.7)
            bullet.setVelocityX(-200);
            bullet.body.allowGravity = false;
        }
    }
    
    //shoot a bullet to right
    shoot2D() {
        let i = 1
        let l = this.getRandomInt(200)
        if(i == l) {
            console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
            var bullet = bullets.create(this.body.x , this.body.y +10, 'bullet');
            bullet.setVelocityX(200);
            bullet.setScale(0.7)
            bullet.body.allowGravity = false;
        }
    
    }
    
    // get an ramdom number
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}; 

class Bat extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene,x,y,'dude');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.HP = 1;
        this.hurt = 0;
        this.flag = 0;
        this.state = "";
        this.setScale(0.5);
        this.body.setSize(32, 45);
        this.body.allowGravity = false;
    }
        update()
        {
            switch(this.state)
            {
                default:
                    if (this.body.velocity.x < 0){
                        this.anims.play('left',true);
                    } else if (this.body.velocity.x > 0){
                        this.anims.play('right',true);
                    }
                    break;
            }
        }
    
    // drop a bullet
    shoot() {
        let i = 1
        let l = this.getRandomInt(200)
        if(i == l) {
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
            var bullet = bullets.create(this.body.x , this.body.y , 'bullet');
            bullet.setVelocity(0);
            bullet.setScale(0.7)
        }
    }
        // get an ramdom number
        getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
}
