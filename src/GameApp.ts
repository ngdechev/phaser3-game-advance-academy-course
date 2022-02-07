import 'phaser';
import { Boot } from './scene/Boot';
import { Preload } from './scene/Preload';
import { Main } from './scene/Main';
import { MainMenu } from './scene/MainMenu';

class GameApp extends Phaser.Game {
    [x: string]: any;
    public static gameConfig: Phaser.Types.Core.GameConfig = null;

    constructor(config: Phaser.Types.Core.GameConfig) {
        GameApp.gameConfig = config;

        if (GameApp.gameConfig == null) {
            GameApp.gameConfig = {
                type: Phaser.AUTO,
                parent: "content",
                backgroundColor: '#fff',
                width: 1024,
                height: 512,
                scene: [Boot, Preload, Main, MainMenu]
            };
        }

        super(GameApp.gameConfig);
    }
}

export { GameApp }

new GameApp(null);
