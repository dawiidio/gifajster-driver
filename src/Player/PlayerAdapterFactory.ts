import { ConfigRegistry, PlayerType } from '../Config';
import { SpotifyPlayerFactory } from './Adapters/Spotify/SpotifyPlayerFactory';

export class PlayerAdapterFactory {
    public static getPlayerAdapter(playerType: PlayerType = ConfigRegistry.getConfig().getPlayerAdapter()) {
        switch (playerType) {
            case 'spotify':
                return SpotifyPlayerFactory.getPlayer();
            default:
                throw new Error(`Unknown player: ${playerType}`);
        }
    }
}
