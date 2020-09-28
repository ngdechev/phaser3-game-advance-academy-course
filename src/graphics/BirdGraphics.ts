import { GameApp } from "../GameApp";
import { BirdObject } from "./BirdObject";

class BirdGraphics extends Phaser.GameObjects.Container {
    private readonly timeStep: number = 2000;
    private readonly birdTimeStep: number = 15000;
    private readonly spawnThreshold: number = 0.7;

    private bigBirdHP: number = 100;
    private smallBirdHP: number = 200;

    private timer: Phaser.Time.TimerEvent;
    private birdSpawnTime: number = 0;

    private dmg: number = 50; // TODO readonly...
    
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
            if(this.scene.time.now - this.birdSpawnTime >= this.birdTimeStep) {
                this.spawnBird();
            } 
        } else this.spawnBird();
    }
    
    public spawnBird(): void {
        let x: number = <number>GameApp.gameConfig.width + 100;
        let y: number = Math.floor(Math.random() * <number>GameApp.gameConfig.height);
        let frames: string[] = ["bird1", "bird2", "bird3"];
        let hp: number[] = [100, 300];
        let framesIndex: number = Math.floor(Math.random() * frames.length);
        let hpIndex: number = Math.floor(Math.random() * hp.length);
        
        let birds: BirdObject = new BirdObject(this.scene, x, y, "birds", frames[framesIndex], hp[hpIndex]).setInteractive();
        birds.movementSpeed = Math.random() * (3.5 - 1.5) + 1.5;
        // birds.rotationSpeed = Math.random() * (1 - 1) - 1;
        // birds.angle = Math.random() * 360;
        birds.setScale(0.5);
        birds.on("pointerdown", () => {
        if(birds.hitPoints > 0) {
            birds.hitPoints -= this.dmg;
                console.log("Big bird HP: " + birds.hitPoints);
            }        
            if(birds.hitPoints <= 0) this.destroy();
        });
        
        this.add(birds);
    }

    public killBird(): void {
        // let bigBirdHP: number = 100;
        // let smallBirdHP: number = 200;
        let hp: number;
        
        console.log("destroyed");

        // if(this.hp > bigBirdHP) {
        //     this.hp -= this.dmg;
        //     console.log("Big bird HP: " + this.hp);
        // }        
        // if(this.hp <= 0) this.destroy();
    }
    
    public update(): void {
        if(this.length > 0) {
            for(let obj of this.list) {
                (<BirdObject>obj).x -= (<BirdObject>obj).movementSpeed;
            }
        }
    }
}

export { BirdGraphics }