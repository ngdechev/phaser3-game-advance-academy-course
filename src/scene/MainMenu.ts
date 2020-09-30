import { Game } from "phaser";
import { GameApp } from "../GameApp";
import { BackgroundGraphic } from "../graphics/BackgroundGraphic";

class MainMenu extends Phaser.Scene {
    private background: BackgroundGraphic;

    constructor(){
        super("mainMenu");
    }
    create() {
        this.cameras.main.fadeIn(2000);
        
        this.background = new BackgroundGraphic(this);
        this.add.existing(this.background);

        // let hitSound = this.sound.add("hit");
        // this.sound.play("bg-music");
        
        let playBtn = this.add.image(<number>GameApp.gameConfig.width / 2, <number>GameApp.gameConfig.height / 2.5, "playBtn").setScale(0.2);
        let quitBtn = this.add.image(<number>GameApp.gameConfig.width / 2, <number>GameApp.gameConfig.height / 1.75, "quitBtn").setScale(0.2);
        
        playBtn.setInteractive();
        quitBtn.setInteractive();

        playBtn.addListener("pointerover", () => {
            this.add.image(<number>GameApp.gameConfig.width / 2, <number>GameApp.gameConfig.height / 2.5, "playBtnHover").setScale(0.2);
        });
        
        quitBtn.addListener("pointerover", () => {
            this.add.image(<number>GameApp.gameConfig.width / 2, <number>GameApp.gameConfig.height / 1.75, "quitBtnHover").setScale(0.2);
        });

        playBtn.addListener("pointerout", () => {
            this.add.image(<number>GameApp.gameConfig.width / 2, <number>GameApp.gameConfig.height / 2.5, "playBtn").setScale(0.2);
        });
        
        quitBtn.addListener("pointerout", () => {
            this.add.image(<number>GameApp.gameConfig.width / 2, <number>GameApp.gameConfig.height / 1.75, "quitBtn").setScale(0.2);
        });

        playBtn.on("pointerdown", () => {
            this.cameras.main.fadeOut(2000);
            this.scene.start("main");
        });

        quitBtn.on("pointerdown", () => {
            this.cameras.main.fadeOut(2000);
        });
    }

    update() {
        this.background.update();
    }
}

export { MainMenu }