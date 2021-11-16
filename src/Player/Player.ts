import { PlayerAdapter } from './PlayerAdapter';

export interface Player {
    step: number

    moveForward(): void
    moveBackward(): void
}
