class BirdObject extends Phaser.GameObjects.Sprite {
    private moveSpeed: number;
    private hp: number;
    // private bigBirdHealth: number;
    // private smallBirdHealth: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string, hp: number) {
        super(scene, x, y, texture, frame);

        this.hp = hp;
        this.moveSpeed = 0;
    }

    public set movementSpeed(val: number) {
        this.moveSpeed = val;
    }

    public get movementSpeed(): number {
        return this.moveSpeed;
    }

    public set hitPoints(val: number) {
        this.hp = val;
    }

    public get hitPoints() {
        return this.hp;
    }

    // public set smallBirdHP(val: number) {
    //     this.smallBirdHealth = val;
    // }

    // public get smallBirdHP(): number {
    //     return this.smallBirdHealth;
    // }

    // public set bigBirdHP(val: number) {
    //     this.bigBirdHealth = val;
    // }

    // public get birdBirdHP(): number {
    //     return this.bigBirdHealth;
    // }
}

export { BirdObject }