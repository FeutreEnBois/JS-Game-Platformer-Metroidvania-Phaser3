class Scene_Menu extends Phaser.Scene_Menu
{
    constructor()
    {
        super({ key: "MainMenu"});
        this.Controls = false;
        this.state = "";
    }

    transitioning(transition_to)
    {
        this.transition_progess = 0;
        this.tweens.add({ targets: this, transition_progess: 1, ease: 'Linear', duration: 1000, 
            onUpdate: () => {this.customPipeline.setFloat1('time', this.transition_progess)},
            onComplete: () => {this.scene.start(transition_to)},
        });
        this.cameras.main.setRenderToTexture(this.customPipeline);
    }

    button_hide()
    {
        this.help_container.visible = 0;
        this.Control = false;
        this.rectangle.y = -100;
        for(var i = 0; i < this.Button.length; i++)
        {
            this.Button[i].x = -500;
            this.Button[i].idle();
        }
    }

    button_show()
    {
        this.help_container.visible = 1;
        this.Selected_Button = 0;
        this.Button[this.Selected_Button].focus();
        for(var i = 0; i < this.Button.length; i++)
        {
            this.Button[i].x = -500;
            this.tweens.add({ targets: this.Button[i], x: this.game.config.width * 0.5, ease: 'Power1', duration: 800, delay: 150*i,})
        }
        this.time.addEvent({ delay: 1000 + 150*this.Button.length, callback: () => { 
            this.Control = true
        }})
    }

    preload(){

    }

    create(){
        this.Button = [];

        
    }
}