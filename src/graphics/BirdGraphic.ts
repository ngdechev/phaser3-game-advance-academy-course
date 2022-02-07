import { NONE } from "phaser";
import { GameApp } from "../GameApp";
import { BaseActor } from "./BaseActor";

class BirdGraphic extends Phaser.GameObjects.Container {
    private readonly timeStep: number = 2000;
    private readonly birdTimeStep: number = 15000;
    private readonly spawnThreshold: number = 0.7;

    private timer: Phaser.Time.TimerEvent;
    private birdpawnTime: number = 0;

    public isAlive: boolean;

    private score: number = 0;
    
    constructor(scene: Phaser.Scene) {
        super(scene);

        this.isAlive = false;
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
        this.spawnBird();
    }

    public spawnBird(): void {
        let x: number = -100;
        let y: number = Math.floor((Math.random() * <number>GameApp.gameConfig.height / 2) + 200);
        
        let frames: string[] = ["bird1", "bird2", "bird3"];
        let hp: number[] = [100, 300];
        let framesIndex: number = Math.floor(Math.random() * frames.length);
        let hpIndex: number = Math.floor(Math.random() * hp.length);
        let hitSound = this.scene.sound.add("hit");

        let bird: BaseActor = new BaseActor(this.scene, x, y, "bird", frames[framesIndex], hp[hpIndex]).setInteractive();

        bird.movementSpeed = Math.random() * (3.5 - 1.5) + 1.5;
        bird.setScale(0.5);
        bird.on("pointerdown", () => {
            bird.setTint(0xff0000);
            hitSound.play();

            if(bird.hitPoints > 0) {
                this.isAlive = true;
                bird.hitPoints -= bird.damage;
            }        

            if(bird.hitPoints <= 0) {
                this.score += 10;
                this.isAlive = false;

                bird.destroy();
            }
        });
        
        bird.on("pointerup", () => {
            bird.clearTint();
        });
        
        this.add(bird);
    }

    public get scoreVal(): string {
        return this.score.toString();
    }
    
    public get getScore(): number {
        return this.score;
    }

    public update(): void {
        if(this.length > 0) {
            for(let obj of this.list) {
                (<BaseActor>obj).x += (<BaseActor>obj).movementSpeed;
            }
        }
    }
}

export { BirdGraphic }