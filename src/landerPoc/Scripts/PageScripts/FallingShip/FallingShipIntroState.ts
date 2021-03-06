﻿/// <reference path="../../typings/phaser/phaser.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />


export class GameIntroState extends Phaser.State {

    game: Phaser.Game;

    constructor()
    {
        super();
    }

    preload()
    {
        //console.log("Intro preload");
        this.game.load.baseURL = FallingShipAppConfig.baseAssetPath;

        this.game.load.spritesheet('ship', 'images/shipSpriteSheet.png', 30, 40, 11, 0, 1);
        this.game.load.image("ground", 'images/ground.png');
        this.game.load.image("groundBlank", 'images/groundBlank.png');
        this.game.load.image("starfield", 'images/starfield.png');

        this.game.load.audio('explosion', 'sounds/explosion.mp3');
        //Attribution: http://soundbible.com/1986-Bomb-Exploding.html
    }

    create()
    {
        //console.log("Intro create");
        var introTitle = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "Lander Proof of Concept", { font: '50px Arial', fill: '#ff0044', align: 'center' });
        introTitle.anchor.set(0.5);

        var introText = this.game.add.text(this.game.world.centerX, this.game.world.centerY,
            `Land the spacecraft by writing the code that controls the decent.`, { font: '30px Arial', fill: '#ff0044', align: 'center' });
        introText.anchor.set(0.5);

        $('#start').click(() => this.game.state.start("RunningState", true, false));
    }

    update()
    {
        
    }
}