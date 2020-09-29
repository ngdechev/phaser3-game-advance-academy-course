import { GameApp } from "../GameApp";
import { BirdObject } from "./BirdObject";

class BirdGraphic extends Phaser.GameObjects.Container {
    private readonly timeStep: number = 2000;
    private readonly birdTimeStep: number = 15000;
    private readonly spawnThreshold: number = 0.7;

    private bigBirdHP: number = 100;
    private smallBirdHP: number = 200;

    private timer: Phaser.Time.TimerEvent;
    private birdpawnTime: number = 0;

    private dmg: number = 50;
    
    constructor(scene: Phaser.Scene) {
        super(scene);

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
        if(Math.random() > this.spawnThreshold) {
            if(this.scene.time.now - this.birdpawnTime >= this.birdTimeStep) {
                this.spawnBird();
            } 
        } else this.spawnBird();
    }
    
    public spawnBird(): void {
        let x: number = -100;
        let y: number = Math.floor(Math.random() * <number>GameApp.gameConfig.height);
        let frames: string[] = ["bird1", "bird2", "bird3"];
        let hp: number[] = [100, 300];
        let framesIndex: number = Math.floor(Math.random() * frames.length);
        let hpIndex: number = Math.floor(Math.random() * hp.length);
        
        let bird: BirdObject = new BirdObject(this.scene, x, y, "bird", frames[framesIndex], hp[hpIndex]).setInteractive();
        bird.movementSpeed = Math.random() * (3.5 - 1.5) + 1.5;
        bird.setScale(0.5);
        bird.on("pointerdown", () => {
            if(bird.hitPoints > 0) {
                bird.hitPoints -= this.dmg;
                console.log("Big bird HP: " + bird.hitPoints);
            }        

            if(bird.hitPoints <= 0) bird.destroy();
        });
        
        this.add(bird);
    }
    
    public update(): void {
        if(this.length > 0) {
            for(let obj of this.list) {
                (<BirdObject>obj).x += (<BirdObject>obj).movementSpeed;
            }
        }
    }
}

export { BirdGraphic }