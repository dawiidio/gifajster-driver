#!/usr/bin/env node

import * as process from 'process';
import * as pkg from '../package.json';
import { PlayerBuilder } from './Player/PlayerBuilder';
import { GifajsterDriver, GifajsterEvents } from './Gifajster/GifajsterDriver';
import { Command } from 'commander';
import { Config, ConfigObject, ConfigRegistry } from './Config';

function init() {
    const program = new Command();

    program
        .name(pkg.name)
        .version(pkg.version)
        .description('Driver for gifajster mini media keyboard which provides ability to song scrolling by physical knob')
        .option('-v, --version', 'output the version number')
        .option('-s, --step <number>', 'encoder step size in milliseconds', '8')
        .option('-p, --player <string>', 'player', 'spotify')
        .option('-f, --forward <string>', 'forward shortcut, keynames separated with comma', 'RIGHT META,RIGHT ALT,8')
        .option('-b, --backward <string>', 'backward shortcut, keynames separated with comma', 'RIGHT META,RIGHT ALT,9')

    program.parse();

    const configObject = program.opts<Partial<ConfigObject>>();

    ConfigRegistry.setConfig(new Config(configObject));

    main();
}

function main() {
    const player = PlayerBuilder.createPlayer();
    const gifajster = new GifajsterDriver();

    gifajster.on(GifajsterEvents.backward, () => player.moveBackward());
    gifajster.on(GifajsterEvents.forward, () => player.moveForward());

    process.on('exit', () => {
        gifajster.destroy();
    });
}

init();
