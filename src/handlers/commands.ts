import { readdirSync } from 'fs';
import Aphlaton from '../classes/Aphlaton.js';
import { AphlatonSlashCommandBuilder, AphlatonMessageCommandBuilder } from '../classes/Commands.js';
import { log } from '../functions.js';

export default async (client: Aphlaton) => {
    for (const type of readdirSync("./dist/commands/")) {
        for (const dir of readdirSync("./dist/commands/" + type)) {
            for (const file of readdirSync("./dist/commands/" + type + "/" + dir,).filter((f) => f.endsWith(".js"))) {
                const module = await import(
                    "../commands/" + type + "/" + dir + "/" + file
                );

                if (!module) continue;
                const command = module.default;

                if (type === 'slash') {
                    if (!(command instanceof AphlatonSlashCommandBuilder)) {
                        log(`Unable to load the *slash* command [${dir}/${file}] due to incorrect export type.`, 'warn');
                        continue;
                    }
                    log(`*Slash* command loaded to the client [${dir}/${file}].`, 'done');
                    client.collection.slashcommands.set(command.command.name, command);
                    client.applicationcommandsArray.push(command.command)
                } else if (type === 'prefix') {
                    if (!(command instanceof AphlatonMessageCommandBuilder)) {
                        log(`Unable to load the *prefix* command [${dir}/${file}] due to incorrect export type.`, 'warn');
                        continue;
                    }
                    if (command.aliases && Array.isArray(command.aliases)) {
                        command.aliases.forEach(alias => {
                            client.collection.prefixcommandsaliases.set(alias, command.name);
                        });
                    }
                    log(`*Prefix* command loaded to the client [${dir}/${file}].`, 'done');
                    client.collection.prefixcommands.set(command.name, command);

                } else if (type === 'nonprefix') {
                    if (!(command instanceof AphlatonMessageCommandBuilder)) {
                        log(`Unable to load the *non prefix* command [${dir}/${file}] due to incorrect export type.`, 'warn');
                        continue;
                    }
                    if (command.aliases && Array.isArray(command.aliases)) {
                        command.aliases.forEach(alias => {
                            client.collection.nonprefixcommandsaliases.set(alias, command.name);
                        });
                    }
                    log(`*nonPrefix* command loaded to the client [${dir}/${file}].`, 'done');
                    client.collection.nonprefixcommands.set(command.name, command);
                }

            }
        }
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

