import { Config, PlayerType } from '../Config';
import { SpotifyPlayerFactory } from './Adapters/Spotify/SpotifyPlayerFactory';

export class PlayerAdapterFactory {
    public static getPlayerAdapter(playerType: PlayerType = Config.getPlayerAdapter()) {
        switch (playerType) {
            case 'spotify':
                return SpotifyPlayerFactory.getPlayer();
            default:
                throw new Error(`Unknown player: ${playerType}`);
        }
    }
}
