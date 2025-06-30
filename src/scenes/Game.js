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
        this.load.image("game-over", "public/assets/game-over.png");
        this.load.image("restart", "public/assets/restart.png");

        for(let i = 0; i < 6; i ++) {
            const cactusNum = i + 1;
            this.load.image(`obstacle-${cactusNum}`, `public/assets/cactuses_${cactusNum}.png`)
        }
    }

    create() {
        this.isGameRunning = true;
        this.player = this.physics.add.sprite(200, 200, "dino").setDepth(1).setOrigin(0, 1).setGravityY(5000).setCollideWorldBounds(true).setBodySize(44, 92);

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

        this.obstacles = this.physics.add.group({
            allowGravity: false
        });
        this.timer = 0;

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.obstacles, this.player, this.gameOver, null, this);
    
        this.gameOverText = this.add.image(0, 0, "game-over");
        this.restartText = this.add.image(0, 80, "restart").setInteractive();

        this.gameOverContainer = this.add
                .container(1024 / 2, (300 / 2) -50)
                .add([this.gameOverText, this.restartText])
                .setAlpha(0);

        this.scoreText = this.add.text(800, 70, "00000", {
            fontSize: 30,
            fontFamily: "Arial",
            color: "#535353",
            resolution: 5
        }).setOrigin(1, 0);
        
        this.score = 0;
        this.frameCounter = 0;

        this.highScore = 0;
        //display high score
        this.highScoreText = this.add.text(800, 40, "High: 00000", {
            fontSize: 30,
            fontFamily: "Arial",
            color: "#535353",
            resolution: 5
        }).setOrigin(1, 0).setAlpha(1);

        //Optional congrats message
        this.congratsText = this.add.text(0, 0, "Congratulations! A new high score!", {
            fontSize: 30,
            fontFamily: "Arial",
            color: "#535353",
            resolution: 5
        }).setOrigin(0).setAlpha(0); //alpha 0 to hide message intially
    }

    update(time, delta) {
        if(!this.isGameRunning) {return;}
        this.ground.tilePositionX += this.gameSpeed;
        this.timer += delta;
        console.log(this.timer);
        if (this.timer > 1000) {
        this.obstacleNum = Math.floor(Math.random() *6) + 1;
        this.obstacles.create(1024, 220, `obstacle-${this.obstacleNum}`).setOrigin(0);
        this.timer -= 1000;
        }

        Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);

    this.obstacles.getChildren().forEach(obstacle => {
        if (obstacle.getBounds().right < 0) {
            this.obstacles.remove(obstacle);
            obstacle.destroy();
        }
    })
    const { space, up } = this.cursors;

    if (Phaser.Input.Keyboard.JustDown(space) || Phaser.Input.Keyboard.JustDown(up) && this.player.body.onFloor()) {
        this.player.setVelocityY(-1600);
    }

    this.restartText.on("pointerdown", () => {
        this.physics.resume();
        this.player.setVelocityY(0);
        this.obstacles.clear(true, true);
        this.gameOverContainer.setAlpha(0);
        this.congratsText.setAlpha(0);
        this.frameCounter = 0;
        this.score = 0;
        const formattedScore = String(Math.floor(this.score)).padStart(5, "0");
        this.scoreText.setText(formattedScore);
        this.isGameRunning = true;
    })

    this.frameCounter++;
    if (this.frameCounter > 100) { 
        this.score += 100;
        const formattedScore = String(Math.floor(this.score)).padStart(5,   "0");
        this.scoreText.setText(formattedScore);
        this.frameCounter -= 100;
    }

    }

    gameOver() {
        //check to see if high score
        if (this.score > this.highScore) {

            //update high score variable
            this.highScore = this.score;

            //update high score text
            this.highScoreText.setText("High: " + String(this.highScore).padStart(5, "0"));

            //show Congrats
            this.congratsText.setAlpha(1);
        }

        this.physics.pause();
        this.timer = 0;
        this.isGameRunning = false;
        this.gameOverContainer.setAlpha(1);
    }

}