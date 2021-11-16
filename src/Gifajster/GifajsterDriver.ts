import { GlobalKeyboardListener, IGlobalKey } from 'node-global-key-listener';
import { EventEmitter } from 'events';
import { IGlobalKeyEvent } from 'node-global-key-listener/build/ts/_types/IGlobalKeyEvent';
import { IGlobalKeyDownMap } from 'node-global-key-listener/build/ts/_types/IGlobalKeyDownMap';
import { IGlobalKeyResult } from 'node-global-key-listener/build/ts/_types/IGlobalKeyResult';
import { ConfigRegistry, GifajsterShortcuts } from '../Config';

export enum GifajsterEvents {
    forward = 'forward',
    backward = 'backward'
}

export class GifajsterDriver extends EventEmitter {
    private globalKeyboardListener: GlobalKeyboardListener = new GlobalKeyboardListener();
    private gifajsterShortcuts: GifajsterShortcuts = ConfigRegistry.getConfig().getGifajsterShortcuts();

    private compareKeysArrays(arr1: IGlobalKey[], arr2: IGlobalKey[]): boolean {
        if (arr2.length !== arr1.length)
            return false;

        return arr1
            .map(key => arr2.some((key2) => key2 === key))
            .reduce<boolean>((acc, val) => acc && val, true);
    }

    private parseDownObjectToKeysArray(down: IGlobalKeyDownMap): IGlobalKey[] {
        return Object.entries(down).reduce<IGlobalKey[]>((acc, [key, val]: [IGlobalKey, boolean]) => ([
            ...acc,
            ...val ? [key] : []
        ]), []);
    }

    private listener = (event: IGlobalKeyEvent, down: IGlobalKeyDownMap): IGlobalKeyResult => {
        const keysArray = this.parseDownObjectToKeysArray(down);

        if (this.compareKeysArrays(this.gifajsterShortcuts.forward, keysArray)) {
            this.emit(GifajsterEvents.forward);
        } else if (this.compareKeysArrays(this.gifajsterShortcuts.backward, keysArray)) {
            this.emit(GifajsterEvents.backward);
        }
    };

    constructor() {
        super();

        this.globalKeyboardListener.addListener(this.listener);
    }

    destroy() {
        this.globalKeyboardListener.removeListener(this.listener);
        this.globalKeyboardListener.kill();
    }
}
