/// <reference path="../../typings/phaser/phaser.d.ts" />


export class GameIntroState extends Phaser.State {

    game: Phaser.Game;

    constructor()
    {
        super();
    }

    preload()
    {
        //console.log("Intro preload");
        this.game.load.spritesheet('ship', '/Content/images/shipSpriteSheet.png', 30, 40, 11, 0, 1);
        this.game.load.image("ground", '/Content/images/ground.png');
        this.game.load.image("groundBlank", '/Content/images/groundBlank.png');
        this.game.load.image("starfield", '/Content/images/starfield.png');

        this.game.load.audio('explosion', '/Content/sounds/explosion.mp3');
        //Attribution: http://soundbible.com/1986-Bomb-Exploding.html
    }

    create()
    {
        //console.log("Intro create");
        var introText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Lame Intro text!", { font: '50px Arial', fill: '#ff0044', align: 'center' });
        introText.anchor.set(0.5);
        
        $('#start').click(() => this.game.state.start("RunningState", true, false));
    }

    update()
    {
        
    }
}