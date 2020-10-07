class BaseActor extends Phaser.GameObjects.Sprite {
    private moveSpeed: number;
    private hp?: number;
    private dmg?: number = 50;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string, hp?: number) {
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

    public set damage(val: number) {
        this.dmg = val;
    }

    public get damage() {
        return this.dmg;
    }
}

export { BaseActor }