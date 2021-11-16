import * as process from 'process';

export type PlayerType = 'spotify';

export class Config {
    static getPlatform(): NodeJS.Platform {
        return process.platform;
    }

    static getPlayerStep() {
        return 8;
    }

    static getPlayerAdapter(): PlayerType {
        return 'spotify';
    }
}
