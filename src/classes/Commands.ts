import { PermissionsString, SlashCommandBuilder, CommandInteraction, Message } from 'discord.js';
import Aphlaton from './Aphlaton.js';

type MRunFunction = (client: Aphlaton, message: Message, args: string[]) => Promise<void>;
type IRunFunction = (client: Aphlaton, interaction: CommandInteraction) => Promise<void>;


export class AphlatonMessageCommandBuilder {
    name: string = '';
    aliases: string[] = [];
    cooldown: number = 0;
    description: string = '';
    category: string = '';
    usage: string[] = [];
    examples: string[] = [];
    botPerms: PermissionsString[] = [];
    userPerms: PermissionsString[] = [];
    nsfw: boolean = false;
    run: MRunFunction = async () => { };

    setName(name: string): this {
        this.name = name;
        return this;
    }

    setAliases(aliases: string[]): this {
        this.aliases = aliases;
        return this;
    }

    setCooldown(cooldown: number): this {
        this.cooldown = cooldown;
        return this;
    }

    setDescription(description: string): this {
        this.description = description;
        return this;
    }


    setCategory(category: string): this {
        this.category = category;
        return this;
    }

    setUsage(usage: string[]): this {
        this.usage = usage;
        return this;
    }

    setExamples(examples: string[]): this {
        this.examples = examples;
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

    setNSFW(bool: boolean): this {
        this.nsfw = bool;
        return this;
    }

    setRun(run: MRunFunction): this {
        this.run = run;
        return this;
    }
}

export class AphlatonSlashCommandBuilder {
    command: SlashCommandBuilder
    cooldown: number = 0;
    category: string = '';
    botPerms: PermissionsString[] = [];
    userPerms: PermissionsString[] = [];
    nsfw: boolean = false;
    run: IRunFunction = async () => { };

    setCommand(command: SlashCommandBuilder): this {
        this.command = command;
        return this;
    }

    setCooldown(cooldown: number): this {
        this.cooldown = cooldown;
        return this;
    }

    setCategory(category: string): this {
        this.category = category;
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

    setNSFW(bool: boolean): this {
        this.nsfw = bool;
        return this;
    }

    setRun(run: IRunFunction): this {
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

