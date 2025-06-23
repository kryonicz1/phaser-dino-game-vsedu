const WIDTH = 1024;
const HEIGHT = 768;


let player;
let ground;
let clouds;
    
class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.player = null;
    }
    
    preload() {
        this.load.spritesheet("dino", "public/assets/dino-run.png", {frameWidth: 88, frameHeight: 94});
        this.load.image("ground", "public/assets/ground.png");
        this.load.image("cloud", "public/assets/cloud.png")
    }

    create() {
        this.player = this.physics.add.sprite(200, 200, "dino").setOrigin(0);

        this.ground = this.add.image(100, 280, "ground").setOrigin(0);
        
        this.clouds = this.add.group();
        
        this.clouds = this.clouds.addMultiple([
        this.add.image(200, 100, "cloud"),
        this.add.image(300, 130, "cloud"),
        this.add.image(450, 90, "cloud")
        ])

    }

    update() {
    }

}