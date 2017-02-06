/// <reference path="../../typings/phaser/phaser.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var GameIntroState = (function (_super) {
        __extends(GameIntroState, _super);
        function GameIntroState() {
            return _super.call(this) || this;
        }
        GameIntroState.prototype.preload = function () {
            //console.log("Intro preload");
            this.game.load.spritesheet('ship', '/Content/images/shipSpriteSheet.png', 30, 40, 11, 0, 1);
            this.game.load.image("ground", '/Content/images/ground.png');
            this.game.load.image("groundBlank", '/Content/images/groundBlank.png');
            this.game.load.image("starfield", '/Content/images/starfield.png');
            this.game.load.audio('explosion', '/Content/sounds/explosion.mp3');
            //Attribution: http://soundbible.com/1986-Bomb-Exploding.html
        };
        GameIntroState.prototype.create = function () {
            var _this = this;
            //console.log("Intro create");
            var introText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Lame Intro text!", { font: '50px Arial', fill: '#ff0044', align: 'center' });
            introText.anchor.set(0.5);
            $('#start').click(function () { return _this.game.state.start("RunningState", true, false); });
        };
        GameIntroState.prototype.update = function () {
        };
        return GameIntroState;
    }(Phaser.State));
    exports.GameIntroState = GameIntroState;
});
//# sourceMappingURL=FallingShipIntroState.js.map