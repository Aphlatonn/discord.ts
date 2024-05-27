import { readdirSync } from 'fs';
import Aphlaton from '../classes/Aphlaton.js';
import { log } from '../functions.js';
import { AphlatonContextMenuBuilder } from '../classes/ContextMenus.js';

export default async (client: Aphlaton) => {
    for (const type of readdirSync("./dist/context_menus/")) {
        for (const dir of readdirSync("./dist/context_menus/" + type)) {
            for (const file of readdirSync("./dist/context_menus/" + type + "/" + dir,).filter((f) => f.endsWith(".js"))) {
                const module = await import(
                    "../context_menus/" + type + "/" + dir + "/" + file
                );

                if (!module) continue;
                const command = module.default;

                if (type === 'user') {
                    if (!(command instanceof AphlatonContextMenuBuilder)) {
                        log(`Unable to load the *user* context menu [${dir}/${file}] due to incorrect export type.`, 'warn');
                        continue;
                    }
                    log(`*User* context menu loaded to the client [${dir}/${file}].`, 'done');
                    command.command.setType(2)
                    client.collection.contextMenus.user.set(command.command.name, command);
                    client.applicationcommandsArray.push(command.command)
                } else if (type === 'message') {
                    if (!(command instanceof AphlatonContextMenuBuilder)) {
                        log(`Unable to load the *message* context menu [${dir}/${file}] due to incorrect export type.`, 'warn');
                        continue;
                    }
                    log(`*Message* context menu loaded to the client [${dir}/${file}].`, 'done');
                    command.command.setType(3)
                    client.collection.contextMenus.message.set(command.command.name, command);
                    client.applicationcommandsArray.push(command.command)
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

