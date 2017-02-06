/// <reference path="../../typings/phaser/phaser.d.ts" />
/// <reference path="usercode.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "UserCode", "Ship"], function (require, exports, uc, ship) {
    "use strict";
    var maxSafeVelocity = 20;
    var maxThrust = 300;
    var colors = {
        Red: '#ff0044', Green: '#069214', Yellow: '#e7f24a', White: '#ffffff'
    };
    var GameRunningState = (function (_super) {
        __extends(GameRunningState, _super);
        function GameRunningState() {
            var _this = _super.call(this) || this;
            _this.displayUpdateCount = 0;
            _this.onGround = false;
            _this.thrusting = false;
            return _this;
        }
        GameRunningState.prototype.create = function () {
            //console.log('Running state create');
            var _this = this;
            var worldWidth = this.game.world.width;
            var worldHeight = this.game.world.height;
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.gravity.y = 100;
            //this.game.add.tileSprite(0, 0, 800, 600, 'starfield');
            this.shipSprite = this.game.add.sprite(this.game.world.centerX, 30, "ship");
            this.game.physics.enable(this.shipSprite, Phaser.Physics.P2JS);
            this.game.add.tileSprite(0, worldHeight - 18, worldWidth, 18, 'ground');
            this.groundColider = this.game.add.tileSprite(worldWidth / 2, worldHeight, worldWidth, 11, 'groundBlank');
            this.game.physics.enable(this.groundColider, Phaser.Physics.P2JS);
            this.groundColider.body.static = true;
            this.shipSprite.body.onBeginContact.add(function (body, bodyB, shapeA, shapeB, equation) {
                //console.log('contact', shipSprite.body.velocity.y);
                _this.landed();
            }, this);
            this.velocityDisplay = this.game.add.text(10, 10, "Velocity: 0", {
                font: '26px Arial',
                fill: colors.Red,
                align: 'left'
            });
            this.altitudeDisplay = this.game.add.text(400, 10, "Altitude: ", {
                font: '26px Arial',
                fill: colors.White,
                align: 'left'
            });
            this.cursors = this.game.input.keyboard.createCursorKeys();
            $('#pause').click(function () {
                console.log('Pause');
                _this.game.paused = true;
                //this.pauseUpdate();
            });
            //$('#pause').click(() => this.game.physics.p2["isPaused"] = true);
            $('#resume').click(function () { return _this.game.paused = false; });
            this.prepUserCode();
            this.ship = new ship.Ship(this.shipSprite, this.game);
        };
        GameRunningState.prototype.update = function () {
            if (this.cursors.up.isDown) {
                this.ship.thrust();
            }
            else if (this.ship.thrusting) {
                this.ship.stopThrust();
            }
            this.userCode.execute(this.ship);
        };
        GameRunningState.prototype.render = function () {
            if (!this.onGround) {
                this.displayFlightData();
            }
        };
        GameRunningState.prototype.displayFlightData = function () {
            if (this.displayUpdateCount === 0) {
                this.displayUpdateCount = 3;
                //#region Velocity
                var speed = this.ship.speed();
                if (speed > maxSafeVelocity) {
                    //console.log(`greater than ${maxSafeVelocity}`);
                    this.velocityDisplay.fill = colors.Red;
                }
                else if (speed < maxSafeVelocity && speed >= 0) {
                    //console.log(`less than ${maxSafeVelocity}`);
                    this.velocityDisplay.fill = colors.Green;
                }
                else if (speed < 0) {
                    this.velocityDisplay.fill = colors.Yellow;
                }
                this.velocityDisplay.setText("Velocity: " + speed.toFixed(1));
                //#endregion
                this.altitudeDisplay.setText("Altitude: " + Math.abs(this.ship.altitude()).toFixed());
            }
            this.displayUpdateCount--;
        };
        GameRunningState.prototype.landed = function () {
            this.onGround = true;
            if (this.ship.speed() > 20) {
                this.ship.explode();
                var crashedText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "You Crashed!", { font: '50px Arial', fill: '#ff0044', align: 'center' });
                crashedText.anchor.set(0.5);
            }
        };
        GameRunningState.prototype.prepUserCode = function () {
            var userCodeString = this.editor.getDoc().getValue();
            this.userCode = new uc.UserCode(userCodeString);
        };
        return GameRunningState;
    }(Phaser.State));
    exports.GameRunningState = GameRunningState;
});
//# sourceMappingURL=FallingShipRunningState.js.map