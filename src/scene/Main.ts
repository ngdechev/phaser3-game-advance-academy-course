import { GameApp } from "../GameApp";
import { BackgroundGraphic } from "../graphics/BackgroundGraphic";
import { BirdGraphic } from "../graphics/BirdGraphic";
import { BaseActor } from "../graphics/BaseActor";
import { Bomb } from "../graphics/Bomb";

class Main extends Phaser.Scene {
    private background: BackgroundGraphic;
    private bird: BirdGraphic;
    private bomb: Bomb;

    private score: number = 0;
    private scoreText: Phaser.GameObjects.Text;

    constructor() {
        super("main");
    }

    create() {
        //let hitSound = this.sound.add("hit");
        // this.sound.play("bg-music", {volume: 0.05});
        this.cameras.main.fadeIn(2000);

        this.background = new BackgroundGraphic(this);
        this.add.existing(this.background);

        this.bird = new BirdGraphic(this);
        this.add.existing(this.bird);

        this.bomb = new Bomb(this);
        this.add.existing(this.bomb);


        if(this.bird.isAlive == false) {
            this.score += 10;
            //hitSound.play();
        }

        this.input.setDefaultCursor('url(assets/images/target-cursor.cur), pointer');
        this.scoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#fff' });
        this.scoreText.setText(`Score: ${this.score}`);
    }

    update() {
        this.background.update();
        this.bird.update();
        this.bomb.update();
    }
}

export { Main }