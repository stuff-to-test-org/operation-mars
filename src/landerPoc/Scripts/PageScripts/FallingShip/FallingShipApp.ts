/// <reference path="../../typings/phaser/phaser.d.ts" />
/// <reference path="../../typings/codemirror/codemirror.d.ts" />

import introState = require("FallingShipIntroState");
import runningState = require("FallingShipRunningState");

export class FallingShipApp {
    game: Phaser.Game;
        
    constructor()
    {
        this.game = new Phaser.Game("80%", 600, Phaser.AUTO, 'content');

        this.game.state.add("IntroState", introState.GameIntroState, false);
        this.game.state.add("RunningState", runningState.GameRunningState, false);
        this.game.state.start("IntroState", true, true);
        
        //Create an editor an hand a reference over to the RunningState    
        let editor = CodeMirror(document.getElementById('codeArea'),
        {
            value: `var speed = ship.speed();
console.log('speed', speed);
if (speed > 19) {
	ship.thrust(); 
}`,
            mode: "javascript",
            theme: "base16-dark",
            lineNumbers: true
        });

        this.game.state.states.RunningState.editor = editor;
    }
}

var runningGame = new FallingShipApp();

//Debug only
window["FallingShip"] = runningGame;

