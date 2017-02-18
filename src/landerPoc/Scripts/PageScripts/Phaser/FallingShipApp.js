/// <reference path="../../typings/phaser/phaser.d.ts" />
/// <reference path="../../typings/codemirror/codemirror.d.ts" />
define(["require", "exports", "FallingShipIntroState", "FallingShipRunningState"], function (require, exports, introState, runningState) {
    "use strict";
    var FallingShipApp = (function () {
        function FallingShipApp() {
            this.game = new Phaser.Game("80%", 600, Phaser.AUTO, 'content');
            this.game.state.add("IntroState", introState.GameIntroState, false);
            this.game.state.add("RunningState", runningState.GameRunningState, false);
            this.game.state.start("IntroState", true, true);
            //Create an editor an hand a reference over to the RunningState    
            var editor = CodeMirror(document.getElementById('codeArea'), {
                value: "var speed = ship.speed();\nconsole.log('speed', speed);\nif (speed > 19) {\n\tship.thrust(); \n}",
                mode: "javascript",
                theme: "base16-dark",
                lineNumbers: true
            });
            this.game.state.states.RunningState.editor = editor;
        }
        return FallingShipApp;
    }());
    exports.FallingShipApp = FallingShipApp;
    var runningGame = new FallingShipApp();
    //Debug only
    window["FallingShip"] = runningGame;
});

//# sourceMappingURL=FallingShipApp.js.map
