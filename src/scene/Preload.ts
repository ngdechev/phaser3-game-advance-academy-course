import { BackgroundGraphic } from "../graphics/BackgroundGraphic";
import { Boot } from "./Boot";

class Preload extends Phaser.Scene {
    private readonly BOX_WIDTH: number = 320;
    private readonly BOX_HEIGHT: number = 50;
    private readonly OFFSET: number = 10;

    private progressBox: Phaser.GameObjects.Graphics;
    private progressBar: Phaser.GameObjects.Graphics;
    private loadingText: Phaser.GameObjects.Text;
    private percentText: Phaser.GameObjects.Text;
    private titleText: Phaser.GameObjects.Text;
    private assetText: Phaser.GameObjects.Text;

    constructor() {
        super("preload");
    }

    create() {
        let width: number = this.cameras.main.width;
        let height: number = this.cameras.main.height;

        this.cameras.main.setBackgroundColor(0x000000);

        this.progressBox = new Phaser.GameObjects.Graphics(this);
        this.progressBox.fillStyle(0x000000, 0.8);
        this.progressBox.fillRect(width / 2 - this.BOX_WIDTH / 2, height * 0.65, this.BOX_WIDTH, this.BOX_HEIGHT);
        this.add.existing(this.progressBox);

        this.progressBar = new Phaser.GameObjects.Graphics(this);
        this.progressBar.fillStyle(0xff9900, 1);
        this.add.existing(this.progressBar);

        this.loadingText = this.add.text(width / 2, height * 0.6, "Loading...", { font: "30px Monaco", fill: "#ffffff" });
        this.loadingText.setOrigin(0.5, 1);
        this.add.existing(this.loadingText);

        this.percentText = this.add.text(width / 2, height * 0.65 + this.BOX_HEIGHT / 2, "0%", { font: "24px Monaco", fill: "#ffffff" });
        this.percentText.setOrigin(0.5);
        this.add.existing(this.percentText);

        this.assetText = this.add.text(width / 2, height * 0.8, "", { font: "24px Monaco", fill: "#ffffff" });
        this.assetText.setOrigin(0.5);
        this.add.existing(this.assetText);

        this.load.atlas("bird", "assets/images/birds.png", "assets/images/birds.json");
        this.load.atlas("explosion", "assets/images/explosion.png", "assets/images/explosion.json");
        
        this.load.image("bomb", "assets/images/bomb.webp");
        this.load.image("background", "assets/images/background.webp"); 

        this.load.image("playBtn", "assets/images/buttons/play_btn.png");
        this.load.image("quitBtn", "assets/images/buttons/quit_btn.png");
        this.load.image("playBtnHover", "assets/images/buttons/play_btn_hover.png");
        this.load.image("quitBtnHover", "assets/images/buttons/quit_btn_hover.png");

        this.load.audio("hit", "assets/audio/hit.wav");
        this.load.audio("bg-music", "assets/audio/bg-music.mp3");
        this.load.audio("bombExplosion", "assets/audio/bombExplosion.wav");

        this.load.on("progress", this.onProgressUpdated, this);
        this.load.on("load", this.onFileLoaded, this);
        this.load.on("complete", this.onComplete, this);

        this.load.start();
    }

    private onProgressUpdated(value: number): void {
        this.progressBar.fillRect(this.cameras.main.width / 2 - this.BOX_WIDTH / 2 + this.OFFSET, this.cameras.main.height * 0.65 + this.OFFSET, (this.BOX_WIDTH - 2 * this.OFFSET) * value, this.BOX_HEIGHT - 2 * this.OFFSET);

        this.percentText.setText(Math.trunc(value * 100) + "%");
    }

    private onFileLoaded(file: Phaser.Loader.File): void {
        this.assetText.setText("Loading asset: " + file.key);
    }

    private onComplete(): void {
        this.scene.start("mainMenu");
        this.scene.remove("preload");
    }
}

export { Preload }