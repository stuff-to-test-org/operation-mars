define(["require", "exports"], function (require, exports) {
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

//# sourceMappingURL=Ship.js.map
