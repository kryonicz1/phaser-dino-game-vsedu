const WIDTH = 1024;
const HEIGHT = 768;

class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.player = null;
    }

    preload() {
        this.load.image("dino", "public/assets/dino-idle.png");
    }

    create() {
        this.add.image(200, 200, "dino").setOrigin(0);
    }

    update() {
    }

}