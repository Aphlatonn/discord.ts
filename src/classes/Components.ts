import { PermissionsString, Interaction } from 'discord.js';
import Aphlaton from './Aphlaton.js';

type RunFunction = (client: Aphlaton, interaction: Interaction) => Promise<void>;


export class AphlatonComponentBuilder {
    id: string = '';
    cooldown: number = 0;
    botPerms: PermissionsString[] = [];
    userPerms: PermissionsString[] = [];
    nsfw: boolean = false;
    run: RunFunction = async () => { };

    setId(id: string): this {
        this.id = id;
        return this;
    }

    setCooldown(cooldown: number): this {
        this.cooldown = cooldown;
        return this;
    }

    setBotPerms(botPerms: PermissionsString[]): this {
        this.botPerms = botPerms;
        return this;
    }

    setUserPerms(userPerms: PermissionsString[]): this {
        this.userPerms = userPerms;
        return this;
    }

    setRun(run: RunFunction): this {
        this.run = run;
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

