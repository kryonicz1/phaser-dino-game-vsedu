const WIDTH = 1024;
const HEIGHT = 768;

class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.player = null;
    }

    preload() {
        this.load.spritesheet("dino", "public/assets/dino-run.png", {frameWidth: 88, frameHeight: 94});
    }

    create() {
        this.physics.add.sprite(200, 200, "dino").setOrigin(0);
    }

    update() {
    }

}