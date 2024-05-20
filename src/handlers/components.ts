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
                    client.collection.components.buttons.set(component.id, component);

                    // if the component is a modal
                } else if (type === 'modals') {
                    log(`*modal* component loaded to the client [${dir}/${file}].`, 'done');
                    client.collection.components.modals.set(component.id, component);

                    // if the component is a select
                } else if (type === 'selects') {
                    log(`*select* component loaded to the client [${dir}/${file}].`, 'done');
                    client.collection.components.selects.set(component.id, component);
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

