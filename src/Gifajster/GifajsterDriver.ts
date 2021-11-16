import { GlobalKeyboardListener } from 'node-global-key-listener';
import { EventEmitter } from 'events';
import { IGlobalKeyEvent } from 'node-global-key-listener/build/ts/_types/IGlobalKeyEvent';
import { IGlobalKeyDownMap } from 'node-global-key-listener/build/ts/_types/IGlobalKeyDownMap';
import { IGlobalKeyResult } from 'node-global-key-listener/build/ts/_types/IGlobalKeyResult';

export enum GifajsterEvents {
    forward = 'forward',
    backward = 'backward'
}

export class GifajsterDriver extends EventEmitter {
    private globalKeyboardListener: GlobalKeyboardListener = new GlobalKeyboardListener();

    private listener = (event: IGlobalKeyEvent, down: IGlobalKeyDownMap): IGlobalKeyResult => {
        if (down['RIGHT META'] && down["RIGHT ALT"] && down['8']) {
            this.emit(GifajsterEvents.forward);
        } else if (down['RIGHT META'] && down["RIGHT ALT"] && down['9']) {
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
