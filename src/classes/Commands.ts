import { PermissionsString, SlashCommandBuilder, Message, ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder, TextChannel } from 'discord.js';
import Aphlaton from './Aphlaton.js';

type MRunFunction = (client: Aphlaton, message: Message & { channel: TextChannel }, args: string[]) => Promise<any>;
type IRunFunction = (client: Aphlaton, interaction: ChatInputCommandInteraction) => Promise<any>;


export class AphlatonMessageCommandBuilder {
    data: {
        name: string;
        aliases: string[];
        cooldown: number;
        description: string;
        category: string;
        usage: string[];
        examples: string[];
        botPerms: PermissionsString[];
        userPerms: PermissionsString[];
        nsfw: boolean;
        developersOnly: boolean;
        run: MRunFunction;
    }

    constructor() {
        this.data = {
            name: '',
            aliases: [],
            cooldown: 0,
            description: '',
            category: '',
            usage: [],
            examples: [],
            botPerms: [],
            userPerms: [],
            nsfw: false,
            developersOnly: false,
            run: async () => { },
        }

    }

    setName(name: string): this {
        this.data.name = name;
        return this;
    }

    setAliases(aliases: string[]): this {
        this.data.aliases = aliases;
        return this;
    }

    setCooldown(cooldown: number): this {
        this.data.cooldown = cooldown;
        return this;
    }

    setDescription(description: string): this {
        this.data.description = description;
        return this;
    }


    setCategory(category: string): this {
        this.data.category = category;
        return this;
    }

    setUsage(usage: string[]): this {
        this.data.usage = usage;
        return this;
    }

    setExamples(examples: string[]): this {
        this.data.examples = examples;
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

    setRun(run: MRunFunction): this {
        this.data.run = run;
        return this;
    }
}

export class AphlatonSlashCommandBuilder {
    data: {
        command: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
        cooldown: number;
        category: string;
        botPerms: PermissionsString[];
        userPerms: PermissionsString[];
        nsfw: boolean;
        developersOnly: boolean;
        run: IRunFunction;
    }

    constructor() {
        this.data = {
            command: null,
            cooldown: 0,
            category: '',
            botPerms: [],
            userPerms: [],
            nsfw: false,
            developersOnly: false,
            run: async () => { },
        }
    }

    setCommand(command: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder): this {
        this.data.command = command;
        return this;
    }

    setCooldown(cooldown: number): this {
        this.data.cooldown = cooldown;
        return this;
    }

    setCategory(category: string): this {
        this.data.category = category;
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

    setRun(run: IRunFunction): this {
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

