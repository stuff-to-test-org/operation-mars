
var maxThrust = 300;

export class Ship {
    
    constructor(shipSprite: Phaser.Sprite, game: Phaser.Game)
    {
        this.shipSprite = shipSprite;
        this.explosionSound = game.add.audio('explosion');

        this.shipSprite.animations.add("fireRocket", [1, 2, 3, 2], 3, true);
        this.shipSprite.animations.add("explodeShip", [4, 5, 6, 7, 8, 9, 10], 3, false);

        this.worldHeight = game.world.height;
    }

    shipSprite: Phaser.Sprite;
    thrusting = false;
    worldHeight: number;

    explosionSound: Phaser.Sound;

    thrust() {
        this.shipSprite.body.thrust(maxThrust);
        this.shipSprite.animations.play("fireRocket");
        this.thrusting = true;
    }

    stopThrust() {
        this.shipSprite.animations.stop("fireRocket");
        this.shipSprite.animations.frame = 0;
        this.thrusting = false;
    }

    speed = () => this.shipSprite.body.velocity.y;
    altitude = () => this.worldHeight - this.shipSprite.body.y - 26;

    explode()
    {
        this.shipSprite.animations.play("explodeShip");
        this.explosionSound.play();
    }
}