import { readdirSync } from 'fs';
import Aphlaton from '../classes/Aphlaton.js';
import { log } from '../functions.js';
import { AphlatonComponentBuilder } from '../classes/Components.js';

export default async (client: Aphlaton) => {
    for (const type of readdirSync("./dist/components/")) {
        for (const dir of readdirSync("./dist/components/" + type)) {
            for (const file of readdirSync("./dist/components/" + type + "/" + dir,).filter((f) => f.endsWith(".js"))) {
                const module = await import(
                    "../components/" + type + "/" + dir + "/" + file
                );

                if (!module) continue;
                const component = module.default;

                // check if the component is a instance of the correct type
                if (!(component instanceof AphlatonComponentBuilder)) {
                    log(`Unable to load the *component* [${dir}/${file}] due to incorrect export type.`, 'warn');
                    continue;
                }

                // if the component is a button
                if (type === 'buttons') {
                    log(`*Button* component loaded to the client [${dir}/${file}].`, 'done');
                    client.aphlaton.components.buttons[component.data.id] = component;

                    // if the component is a modal
                } else if (type === 'modals') {
                    log(`*modal* component loaded to the client [${dir}/${file}].`, 'done');
                    client.aphlaton.components.modals[component.data.id] = component;

                    // if the component is a select
                } else if (type === 'selects') {
                    log(`*select* component loaded to the client [${dir}/${file}].`, 'done');
                    client.aphlaton.components.selects[component.data.id] = component;
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

