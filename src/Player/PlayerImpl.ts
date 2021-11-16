import { Player } from './Player';
import { PlayerAdapter } from './PlayerAdapter';

export class PlayerImpl implements Player {
    step:number = 8;

    constructor(private adapter: PlayerAdapter) {}

    moveForward() {
        const position = this.adapter.getPosition();
        const duration = this.adapter.getDuration();

        if (position + this.step >= duration)
            return;

        this.adapter.setPosition(position + this.step);
    }

    moveBackward() {
        const position = this.adapter.getPosition();
        this.adapter.setPosition(position - this.step);
    }
}
