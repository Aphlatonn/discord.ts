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
                    client.collection.commands.slashcommands.set(command.command.name, command);
                    client.applicationcommandsArray.push(command.command)
                } else if (type === 'prefix') {
                    if (!(command instanceof AphlatonMessageCommandBuilder)) {
                        log(`Unable to load the *prefix* command [${dir}/${file}] due to incorrect export type.`, 'warn');
                        continue;
                    }
                    if (command.aliases && Array.isArray(command.aliases)) {
                        command.aliases.forEach(alias => {
                            client.collection.commands.prefixcommandsaliases.set(alias, command.name);
                        });
                    }
                    log(`*Prefix* command loaded to the client [${dir}/${file}].`, 'done');
                    client.collection.commands.prefixcommands.set(command.name, command);

                } else if (type === 'nonprefix') {
                    if (!(command instanceof AphlatonMessageCommandBuilder)) {
                        log(`Unable to load the *non prefix* command [${dir}/${file}] due to incorrect export type.`, 'warn');
                        continue;
                    }
                    if (command.aliases && Array.isArray(command.aliases)) {
                        command.aliases.forEach(alias => {
                            client.collection.commands.nonprefixcommandsaliases.set(alias, command.name);
                        });
                    }
                    log(`*nonPrefix* command loaded to the client [${dir}/${file}].`, 'done');
                    client.collection.commands.nonprefixcommands.set(command.name, command);
                }

            }
        }
    }
};


/**
 * Project: Template
 * Author: @Aphlaton
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/quantom
 */

