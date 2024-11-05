import { ClientEvents } from 'discord.js';
import Aphlaton from './Aphlaton.js';

type RunFunction = (client: Aphlaton, ...args: any) => Promise<any>;

export class AphlatonEventBuilder {
    data: {
        event: keyof ClientEvents;
        once: boolean;
        run: RunFunction;
    }

    constructor() {
        this.data = {
            event: null,
            once: false,
            run: async () => { },
        }

    }

    setEvent(name: keyof ClientEvents): this {
        this.data.event = name;
        return this;
    }

    setOnce(bool: boolean): this {
        this.data.once = bool;
        return this;
    }

    setRun(run: RunFunction): this {
        this.data.run = run;
        return this;
    }
}

/**
 * Project: Template
 * Author: @Aphlaton
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/quantom
 */

