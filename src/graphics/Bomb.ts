import { GameApp } from "../GameApp";
import { BaseActor } from "./BaseActor";

class Bomb extends Phaser.GameObjects.Container {
    private readonly timeStep: number = 10000;

    private timer: Phaser.Time.TimerEvent;
    
    constructor(scene: Phaser.Scene) {
        super(scene);

        this.scene.anims.create({
            key: "bombExplosion",
            frames: this.scene.anims.generateFrameNames("explosion"),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true
        } as Phaser.Types.Animations.Animation);

        this.startSpawning();
    }

    public startSpawning():void {
        if(this.timer != null) this.timer.paused = false;
        else {
            this.timer = this.scene.time.addEvent({
                delay: this.timeStep,
                loop: true,
                callback: this.spawnObject,
                callbackScope: this
            });
        }
    }

    public stopSpawning(): void {
        this.timer.paused = true;
    }

    private spawnObject():void {
        this.spawnBomb();
    }

    public spawnBomb(): void {
        let x: number = -100;
        let y: number = Math.floor((Math.random() * <number>GameApp.gameConfig.height / 2) + 2);

        let bomb: BaseActor = new BaseActor(this.scene, x, y, "bomb", null, 50).setInteractive();
        bomb.movementSpeed = Math.random() * (3.5 - 1.5) + 1.5;
        bomb.setScale(0.5);
        bomb.on('pointerdown', () => {
            bomb.anims.play('bombExplosion');

            setTimeout(() => {
                bomb.destroy();
            }, 15000);
        });   
        
        this.add(bomb);
        this.scene.sys.updateList.add(bomb);
    }
    
    public update(): void {
        if(this.length > 0) {
            for(let obj of this.list) {
                (<BaseActor>obj).x += (<BaseActor>obj).movementSpeed;
            }
        }
    }
}

export { Bomb }