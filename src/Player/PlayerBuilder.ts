import { Player } from './Player';
import { PlayerImpl } from './PlayerImpl';
import { Config } from '../Config';
import { PlayerAdapterFactory } from './PlayerAdapterFactory';

export class PlayerBuilder {
    public static createPlayer(step: number = Config.getPlayerStep()): Player {
        const adapter = PlayerAdapterFactory.getPlayerAdapter();
        const player = new PlayerImpl(adapter);

        player.step = step;

        return player;
    }
}
