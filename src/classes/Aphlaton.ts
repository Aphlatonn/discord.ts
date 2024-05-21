import { Client, Partials, Collection, GatewayIntentBits, ActivityType } from "discord.js";
import config from "../config.js";
import loadEvents from "../handlers/events.js";
import deployCommands from "../handlers/deploy.js";
import loadCommand from "../handlers/commands.js";
import loadComponent from "../handlers/components.js";
import { AphlatonMessageCommandBuilder, AphlatonSlashCommandBuilder } from "./Commands.js";
import { AphlatonComponentBuilder } from "./Components.js";
import(`../database/sqlite/sqlite.js`)

export default class Aphlaton extends Client {
    collection = {
        slashcommands: new Collection<string, AphlatonSlashCommandBuilder>(),
        prefixcommands: new Collection<string, AphlatonMessageCommandBuilder>(),
        nonprefixcommands: new Collection<string, AphlatonMessageCommandBuilder>(),
        prefixcommandsaliases: new Collection<string, string>(),
        nonprefixcommandsaliases: new Collection<string, string>(),
        components: {
            buttons: new Collection<string, AphlatonComponentBuilder>(),
            selects: new Collection<string, AphlatonComponentBuilder>(),
            modals: new Collection<string, AphlatonComponentBuilder>(),
        },
    };

    applicationcommandsArray = [];

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.AutoModerationConfiguration,
                GatewayIntentBits.AutoModerationExecution,
            ],
            partials: [
                Partials.Message,
                Partials.Channel,
                Partials.Reaction,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.User,
                Partials.ThreadMember,
            ],
            presence: {
                activities: [
                    {
                        name: "something goes here",
                        type: ActivityType.Streaming,
                        state: "@Aphlaton",
                    },
                ],
            },
        });
    }

    async start(token = config.client.token) {
        loadEvents(this);
        loadCommand(this);
        loadComponent(this);
        await this.login(token);
        deployCommands(this)
        console.log(this.applicationcommandsArray)
    };
}

/**
 * Project: Template
 * Author: @Aphlaton
 * Company: @quantom
 * Copyright (c) 2024. All rights reserved.
 * This code is the property of Coder and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/quantom
 */

