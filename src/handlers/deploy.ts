import { REST, Routes } from "discord.js";
import { log, isSnowflake } from "../functions.js";
import config from "../config.js";
import Aphlaton from "../classes/Aphlaton.js";

export default async (client: Aphlaton) => {
    // create instance from the REST class
    const rest = new REST({ version: "10" }).setToken(process.env.CLIENT_TOKEN || config.client.token);

    // send a log message to the console
    log("Loading *application* commands... (it might take minutes!)", "info");

    // get the guild id
    const guildId = config.development.guild;

    // deloy application commands to the guild
    if (config.development && config.development.enabled && guildId) {
        if (!isSnowflake(guildId)) {
            log("Guild ID is missing. set it in the config file or disable development in the config", "err");
            return;
        }

        // deloy application commands to the guild
        rest.put(
            Routes.applicationGuildCommands(config.client.id, guildId),
            {
                body: client.applicationcommandsArray,
            }
        ).then(_ => {
            log(`Successfully loaded *application* commands to guild [${guildId}]`, "done");
        }).catch(e => {
            log(`Unable to load *application* commands to guild [${guildId}]`, "err");
            console.log(e);
        });

        // deloy application commands to the discord globaly
    } else {
        // deloy application commands to the discord globaly
        rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID || config.client.id),
            {
                body: client.applicationcommandsArray,
            }
        ).then(_ => {
            log(`Successfully loaded *application* commands to [Discord]`, "done");
        }).catch(e => {
            log(`Unable to load *application* commands to [Discord]`, "err");
            console.log(e);
        });

    }
};

/**
 * Project: Template
 * Author: @Aphlaton
 * Company: @quantom
 * Copyright (c) 2024. All rights reserved.
 * This code is the property of Coder and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/quantom
 */
