class BulletGroup extends Phaser.Physics.Arcade.Group
{
    constructor(scene)
    {
        super(scene,x,y);
        this.createMultiple({
            classType: Bullet,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'bullet'

        })
    }

    fireBullet(x,y) {
        const bullet = this.getFirstDead(false);
        if (bullet) {
            bullet.fire(x,y);
        }
        else if (isVulnerable() == false) {
            this.body.velocity.x = this.flipX ? 15 : -15;
            this.physics.add.collider(bullet, enemy1,enemy2,enemy3,enemy4);
        }
    }
    
}

class BulletG extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'Bullet');
	}
    fire(x,y) {
        this.body.reset(x,y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(-200)
    }
    preUpdate(time, delta) {
		super.preUpdate(time, delta);
 
		if (this.y <= 0) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}

class BulletD extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'Bullet');
	}
    fire(x,y) {
        this.body.reset(x,y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(-200)
    }
    preUpdate(time, delta) {
		super.preUpdate(time, delta);
 
		if (this.y <= 0) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}






































class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
    }

    fire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
        this.body.allowGravity = false;

        this.setVelocityX(-300);
        this.setVelocityX(300);

    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 100,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y)
    {
        let bulletss = this.getFirstDead(false);

        if (bulletss)
        {
            bulletss.fire(x, y);
        }
    }
}
