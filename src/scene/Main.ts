import { GameApp } from "../GameApp";
import { BackgroundGraphic } from "../graphics/BackgroundGraphic";
import { BirdGraphic } from "../graphics/BirdGraphic";
import { BaseActor } from "../graphics/BaseActor";
import { Bomb } from "../graphics/Bomb";

class Main extends Phaser.Scene {
    private background: BackgroundGraphic;
    private bird: BirdGraphic;
    private specialBird: BirdGraphic;
    private bomb: Bomb;
    private score: Phaser.GameObjects.Text;
    private clicked: boolean;

    constructor() {
        super("main");
    }

    create() {
        let hitSound = this.sound.add("hit");
        let explosionSound = this.sound.add("bombExplosion");
        // this.sound.play("bg-music", {volume: 0.05});
        this.cameras.main.fadeIn(2000);

        this.background = new BackgroundGraphic(this);
        this.add.existing(this.background);

        this.bird = new BirdGraphic(this);
        this.add.existing(this.bird);

        this.bomb = new Bomb(this);
        this.add.existing(this.bomb);

        if(this.bird.isAlive == false) {
            // this.score += 10;
            //hitSound.play();
        }

        this.input.setDefaultCursor('url(assets/images/target-cursor.cur), pointer');
        this.score = this.add.text(16, 16, "", { fontSize: '32px', fill: '#fff' });
        this.add.existing(this.score);
    }

    update() {
        this.background.update();
        this.bird.update();
        this.bomb.update();
        this.score.text = `Score: ${this.bird.scoreVal}`;
        this.bomb.bombClicked;

        console.log(`isBombClicked(): ${this.bomb.isBombClicked}`);

        if(this.bomb.isBombClicked) {
            var newScore: number = Number(this.bird.scoreVal);
            newScore -= 10;
            newScore.toString();

            this.score.text = `Score ${newScore}`;
            this.bomb.bombClicked = false;

            console.log(this.score.text);
        }
    }
}

export { Main }