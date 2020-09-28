import { GameApp } from "../GameApp";
import { BackgroundGraphic } from "../graphics/BackgroundGraphics";
import { BirdGraphics } from "../graphics/BirdGraphics";

class Main extends Phaser.Scene {
    private background: BackgroundGraphic;
    private birds: BirdGraphics;

    constructor() {
        super("main");
    }

    create() {
        this.background = new BackgroundGraphic(this);
        this.add.existing(this.background);

        this.birds = new BirdGraphics(this);
        this.add.existing(this.birds);
    }

    update() {
        this.background.update();
        this.birds.update();
    }
}

export { Main }