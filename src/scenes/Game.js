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
        this.load.image("cloud", "public/assets/cloud.png");
    }

    create() {
        this.player = this.physics.add.sprite(200, 200, "dino").setOrigin(0, 1).setGravityY(5000).setCollideWorldBounds(true).setBodySize(44, 92);

        this.ground = this.add.tileSprite(0, 300, 1000, 30, "ground").setOrigin(0, 1);
        
        this.clouds = this.add.group();
        
        this.clouds = this.clouds.addMultiple([
        this.add.image(200, 100, "cloud"),
        this.add.image(300, 130, "cloud"),
        this.add.image(450, 90, "cloud")
        ])

        this.gameSpeed = 5;

        this.groundCollider = this.physics.add.staticSprite(0, 300, "ground").setOrigin(0, 1);
        this.groundCollider.body.setSize(1000, 30);

        this.physics.add.collider(this.player, this.groundCollider);
    }

    update() {
        this.ground.tilePositionX += this.gameSpeed;
    }

}