import { PlayerBuilder } from './Player/PlayerBuilder';
import { GifajsterDriver, GifajsterEvents } from './Gifajster/GifajsterDriver';
import * as process from 'process';

const player = PlayerBuilder.createPlayer();
const gifajster = new GifajsterDriver();

gifajster.on(GifajsterEvents.backward, () => player.moveBackward());
gifajster.on(GifajsterEvents.forward, () => player.moveForward());

process.on('exit', () => {
    gifajster.destroy();
});
