import * as process from 'process';
import { IGlobalKey } from 'node-global-key-listener';

export type PlayerType = 'spotify';

export interface GifajsterShortcuts {
    forward: IGlobalKey[]
    backward: IGlobalKey[]
}

export interface ConfigObject {
    player: PlayerType,
    step: string
    forward: string,
    backward: string,
    platform: NodeJS.Platform
}

const DEFAULT_CONFIG: ConfigObject = {
    player: 'spotify',
    step: '8',
    forward: 'RIGHT META,RIGHT ALT,8',
    backward: 'RIGHT META,RIGHT ALT,9',
    platform: process.platform
};

export class Config {
    private readonly configObject: ConfigObject;
    private readonly shortcuts: GifajsterShortcuts;

    constructor(configObject: Partial<ConfigObject> = {}) {
        this.configObject = {
            ...DEFAULT_CONFIG,
            ...configObject,
        };

        this.shortcuts = {
            backward: this.configObject.backward.split(',') as IGlobalKey[],
            forward: this.configObject.forward.split(',') as IGlobalKey[],
        }
    }

    getPlatform(): NodeJS.Platform {
        return this.configObject.platform;
    }

    getPlayerStep() {
        return Number(this.configObject.step);
    }

    getPlayerAdapter(): PlayerType {
        return this.configObject.player;
    }

    getGifajsterShortcuts(): GifajsterShortcuts {
        return { ...this.shortcuts };
    }
}

export class ConfigRegistry {
    private static instance: Config = new Config();

    static getConfig(): Config {
        return ConfigRegistry.instance;
    }

    static setConfig(instance: Config) {
        ConfigRegistry.instance = instance;
    }
}
