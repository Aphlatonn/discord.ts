import { PermissionsString, Interaction } from 'discord.js';
import Aphlaton from './Aphlaton.js';

type RunFunction = (client: Aphlaton, interaction: Interaction) => Promise<any>;


export class AphlatonComponentBuilder {
    data: {
        id: string;
        cooldown: number;
        botPerms: PermissionsString[];
        userPerms: PermissionsString[];
        nsfw: boolean;
        run: RunFunction;
    }

    constructor() {
        this.data = {
            id: '',
            cooldown: 0,
            botPerms: [],
            userPerms: [],
            nsfw: false,
            run: async () => { },
        }

    }

    setId(id: string): this {
        this.data.id = id;
        return this;
    }

    setCooldown(cooldown: number): this {
        this.data.cooldown = cooldown;
        return this;
    }

    setBotPerms(botPerms: PermissionsString[]): this {
        this.data.botPerms = botPerms;
        return this;
    }

    setUserPerms(userPerms: PermissionsString[]): this {
        this.data.userPerms = userPerms;
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

