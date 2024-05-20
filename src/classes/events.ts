import { ClientEvents } from 'discord.js';
import Aphlaton from './Aphlaton.js';

type RunFunction = (client: Aphlaton, ...args: ClientEvents[keyof ClientEvents]) => Promise<void>;

export class AphlatonEventBuilder {
    event: keyof ClientEvents;
    once: boolean = false;
    run: RunFunction = async () => { };

    setEvent(name: keyof ClientEvents): this {
        this.event = name;
        return this;
    }

    setOnce(bool: boolean): this {
        this.once = bool;
        return this;
    }

    setRun(run: RunFunction): this {
        this.run = run;
        return this;
    }
}
