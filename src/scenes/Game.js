const WIDTH = 1024;
const HEIGHT = 768;

class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.player = null;
    }

    preload() {
        this.load.spritesheet("dino", "public/assets/dino-run.png", {frameWidth: 88, frameHeight: 94});

        this.load.image("ground", "public/assets/ground.png");
        this.load.image("cloud", "public/assets/cloud.png");
    }

    create() {
        this.physics.add.sprite(200, 200, "dino").setOrigin(0);

        this.add.image(100, 280, "ground").setOrigin(0);

        this.add.image(200, 100, "cloud").setOrigin(0);

        this.add.image(300, 130, "cloud").setOrigin(0);
        
        this.add.image(450, 90, "cloud").setOrigin(0);
    }

    update() {
    }

}