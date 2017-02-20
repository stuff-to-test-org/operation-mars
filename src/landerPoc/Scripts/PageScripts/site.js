var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/requirejs/require.d.ts" />
var FallingShipAppConfig;
(function (FallingShipAppConfig) {
    FallingShipAppConfig.baseAssetPath = "/Content/";
    function init(assetPath) {
        FallingShipAppConfig.baseAssetPath = assetPath;
        requirejs.config({
            //baseUrl: '../..',
            paths: {
                'jquery': '/Scripts/jquery-2.1.4.min',
                'phaser': '/Scripts/phaser.min'
            }
        });
        require(["FallingShipApp"]);
    }
    FallingShipAppConfig.init = init;
})(FallingShipAppConfig || (FallingShipAppConfig = {}));
/// <reference path="../../typings/phaser/phaser.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
define("FallingShipIntroState", ["require", "exports"], function (require, exports) {
    "use strict";
    var GameIntroState = (function (_super) {
        __extends(GameIntroState, _super);
        function GameIntroState() {
            return _super.call(this) || this;
        }
        GameIntroState.prototype.preload = function () {
            //console.log("Intro preload");
            this.game.load.baseURL = FallingShipAppConfig.baseAssetPath;
            this.game.load.spritesheet('ship', 'images/shipSpriteSheet.png', 30, 40, 11, 0, 1);
            this.game.load.image("ground", 'images/ground.png');
            this.game.load.image("groundBlank", 'images/groundBlank.png');
            this.game.load.image("starfield", 'images/starfield.png');
            this.game.load.audio('explosion', 'sounds/explosion.mp3');
            //Attribution: http://soundbible.com/1986-Bomb-Exploding.html
        };
        GameIntroState.prototype.create = function () {
            var _this = this;
            //console.log("Intro create");
            var introTitle = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "Lander Proof of Concept", { font: '50px Arial', fill: '#ff0044', align: 'center' });
            introTitle.anchor.set(0.5);
            var introText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Land the spacecraft by writing the code that controls the decent.", { font: '30px Arial', fill: '#ff0044', align: 'center' });
            introText.anchor.set(0.5);
            $('#start').click(function () { return _this.game.state.start("RunningState", true, false); });
        };
        GameIntroState.prototype.update = function () {
        };
        return GameIntroState;
    }(Phaser.State));
    exports.GameIntroState = GameIntroState;
});
define("Ship", ["require", "exports"], function (require, exports) {
    "use strict";
    var maxThrust = 300;
    var Ship = (function () {
        function Ship(shipSprite, game) {
            var _this = this;
            this.thrusting = false;
            this.speed = function () { return _this.shipSprite.body.velocity.y; };
            this.altitude = function () { return _this.worldHeight - _this.shipSprite.body.y - 26; };
            this.shipSprite = shipSprite;
            this.explosionSound = game.add.audio('explosion');
            this.shipSprite.animations.add("fireRocket", [1, 2, 3, 2], 3, true);
            this.shipSprite.animations.add("explodeShip", [4, 5, 6, 7, 8, 9, 10], 3, false);
            this.worldHeight = game.world.height;
        }
        Ship.prototype.thrust = function () {
            this.shipSprite.body.thrust(maxThrust);
            this.shipSprite.animations.play("fireRocket");
            this.thrusting = true;
        };
        Ship.prototype.stopThrust = function () {
            this.shipSprite.animations.stop("fireRocket");
            this.shipSprite.animations.frame = 0;
            this.thrusting = false;
        };
        Ship.prototype.explode = function () {
            this.shipSprite.animations.play("explodeShip");
            this.explosionSound.play();
        };
        return Ship;
    }());
    exports.Ship = Ship;
});
define("UserCode", ["require", "exports"], function (require, exports) {
    "use strict";
    var UserCode = (function () {
        function UserCode(userCodeString) {
            this.prepUserCode(userCodeString);
        }
        /**
        * Converts the editor contents to a runnable function.
        */
        UserCode.prototype.prepUserCode = function (userCodeString) {
            var localFun;
            var functionString = "localFun = function(ship) {\n            " + userCodeString + "\n        }";
            eval(functionString);
            this.userCode = localFun;
        };
        /**
         * Executes the user
         */
        UserCode.prototype.execute = function (ship) {
            this.userCode(ship);
        };
        return UserCode;
    }());
    exports.UserCode = UserCode;
});
/// <reference path="../../typings/phaser/phaser.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="usercode.ts" />
define("FallingShipRunningState", ["require", "exports", "UserCode", "Ship"], function (require, exports, uc, ship) {
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
/// <reference path="../../typings/phaser/phaser.d.ts" />
/// <reference path="../../typings/codemirror/codemirror.d.ts" />
define("FallingShipApp", ["require", "exports", "FallingShipIntroState", "FallingShipRunningState"], function (require, exports, introState, runningState) {
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

//# sourceMappingURL=site.js.map
