class Boot extends Phaser.Scene {
    constructor() {
        super("boot");
    }

    create() {
        this.game.events.on('hidden', this.onHidden, this);
        this.game.events.on('visible', this.onVisible, this);

        window.addEventListener('resize', () => {
            console.log("resize");
        });

        //data transfer example

        //uses the registry to set a value for a given key
        this.registry.set("test", "regustry test - OK");

        this.scene.start("preload");
    }

    private onHidden(): void {
        console.log("hidden");
    }

    private onVisible(): void {
        console.log("visible");
    }

    //INFO: show how data could be sent between scenes via scene reference
    public test(): string {
        return "cross talk test - OK";
    }
}

export { Boot }