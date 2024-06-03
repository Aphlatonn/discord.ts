import { PermissionsString, ContextMenuCommandBuilder, ContextMenuCommandInteraction } from 'discord.js';
import Aphlaton from './Aphlaton.js';

type RunFunction = (client: Aphlaton, interaction: ContextMenuCommandInteraction) => Promise<any>;


export class AphlatonContextMenuBuilder {

    data: {
        command: ContextMenuCommandBuilder
        cooldown: number
        botPerms: PermissionsString[]
        userPerms: PermissionsString[]
        nsfw: boolean
        developersOnly: boolean
        run: RunFunction
    }

    constructor() {
        this.data = {
            command: null,
            cooldown: 0,
            botPerms: [],
            userPerms: [],
            nsfw: false,
            developersOnly: false,
            run: async () => { },
        }
    }

    setCommand(command: ContextMenuCommandBuilder): this {
        this.data.command = command;
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

    setNSFW(bool: boolean): this {
        this.data.nsfw = bool;
        return this;
    }

    setDevsOnly(bool: boolean): this {
        this.data.developersOnly = bool;
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

