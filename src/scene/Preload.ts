import { Boot } from "./Boot";

class Preload extends Phaser.Scene {

    constructor() {
        super("preload");
    }

    create() {
        this.load.atlas("bird", "assets/images/birds.png", "assets/images/birds.json");
        this.load.atlas("explosion", "assets/images/explosion.png", "assets/images/explosion.json");
        
        this.load.image("bomb", "assets/images/bomb.webp");
        this.load.image("background", "assets/images/background.webp"); 

        this.load.image("playBtn", "assets/images/buttons/play_btn.png");
        this.load.image("quitBtn", "assets/images/buttons/quit_btn.png");
        this.load.image("playBtnHover", "assets/images/buttons/play_btn_hover.png");
        this.load.image("quitBtnHover", "assets/images/buttons/quit_btn_hover.png");

        this.load.audio("hit", "assets/audio/hit.wav");
        this.load.audio("bg-music", "assets/audio/bg-music.mp3")

        this.load.on("progress", this.onProgressUpdated, this);
        this.load.on("load", this.onFileLoaded, this);
        this.load.on("complete", this.onComplete, this);
        
        //data transfer
        //INFO: show how data could be sent between scenes via scene reference
        let bootScene: Phaser.Scene = this.scene.get("boot");
        console.log("Boot scene reference:", (<Boot>bootScene).test());

        //INFO: show how data could be sent between scenes via the registry
        console.log("registry data:", this.registry.get("test"));

        this.load.start();
    }

    private onProgressUpdated(value: number): void {
        console.log("progress update:", value);
    }

    private onFileLoaded(file: Phaser.Loader.File): void {
        console.log("file loaded: ", file);
    }

    private onComplete(): void {
        console.log("load complete");

        this.scene.start("mainMenu");
    }
}

export { Preload }