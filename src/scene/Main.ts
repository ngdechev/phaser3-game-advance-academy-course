import { GameApp } from "../GameApp";
import { BackgroundGraphic } from "../graphics/BackgroundGraphic";
import { BirdGraphic } from "../graphics/BirdGraphic";

class Main extends Phaser.Scene {
    private background: BackgroundGraphic;
    private bird: BirdGraphic;

    constructor() {
        super("main");
    }

    create() {
        // let hitSound = this.sound.add("hit");
        // this.sound.play("bg-music", {volume: 0.05});
        this.cameras.main.fadeIn(2000);

        this.background = new BackgroundGraphic(this);
        this.add.existing(this.background);

        this.bird = new BirdGraphic(this);
        this.add.existing(this.bird);


        this.input.setDefaultCursor('url(assets/images/target-cursor.cur), pointer');
        this.add.text(16, 16, `Score: ${this.bird.score}`, { fontSize: '32px', fill: '#fff' });
    }

    update() {
        this.background.update();
        this.bird.update();
    }
}

export { Main }