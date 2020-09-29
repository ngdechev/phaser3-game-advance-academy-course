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
        this.background = new BackgroundGraphic(this);
        this.add.existing(this.background);

        this.bird = new BirdGraphic(this);
        this.add.existing(this.bird);

        let targetCursor: Phaser.Input.InputPlugin = this.input.setDefaultCursor('url(assets/images/target-cursor.cur), pointer');
    }

    update() {
        this.background.update();
        this.bird.update();
    }
}

export { Main }