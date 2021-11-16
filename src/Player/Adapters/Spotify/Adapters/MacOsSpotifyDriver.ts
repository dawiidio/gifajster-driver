import { execSync } from 'child_process';
import { PlayerAdapter } from '../../../PlayerAdapter';

enum OSA_COMMANDS {
    position = 'player position',
    trackDuration = 'duration of current track',
    setPlayerPosition = 'set player position to'
}

export class MacOsSpotifyDriver implements PlayerAdapter {
    getDuration(): number {
        return Number(this.runOsaScript(OSA_COMMANDS.trackDuration))
    }

    getPosition(): number {
        return Number(this.runOsaScript(OSA_COMMANDS.position))
    }

    setPosition(position: number) {
        this.runOsaScript(`${OSA_COMMANDS.setPlayerPosition} ${position}`)
    }

    private runOsaScript(command: string):string {
        return execSync(`osascript -e 'tell application "Spotify" to ${command}'`).toString();
    }
}
