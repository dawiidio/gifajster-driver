import { MacOsSpotifyDriver } from './Adapters/MacOsSpotifyDriver';
import { Config } from '../../../Config';
import { PlayerAdapter } from '../../PlayerAdapter';

export class SpotifyPlayerFactory {
    public static getPlayer(platform: NodeJS.Platform = Config.getPlatform()): PlayerAdapter {
        switch (platform) {
            case 'darwin':
                return new MacOsSpotifyDriver();
            default:
                throw new Error(`Not supported platform: ${platform}`);
        }
    }
}
