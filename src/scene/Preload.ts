import { Boot } from "./Boot";

class Preload extends Phaser.Scene {

    constructor() {
        super("preload");
    }

    create() {
        this.load.atlas("bird", "assets/images/birds.png", "assets/images/birds.json");
        this.load.image("background", "assets/images/background.webp");

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

        this.scene.start("main");
    }
}

export { Preload }