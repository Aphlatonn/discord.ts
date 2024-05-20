import { readdirSync } from "fs";
import { log } from "../functions.js";
import Aphlaton from "../classes/Aphlaton.js";
import { AphlatonEventBuilder } from "../classes/events.js";

export default async (client: Aphlaton) => {
    for (const dir of readdirSync("./dist/events/")) {
        for (const file of readdirSync("./dist/events/" + dir).filter(f => f.endsWith(".js"))) {
            const { default: module } = await import("../events/" + dir + "/" + file);

            if (!module) continue;

            if (!(module instanceof AphlatonEventBuilder)) {
                log(`Unable to load the *event* [${dir}/${file}] due to incorrect export type.`, "warn");
                continue;
            }

            if (!module.event || !module.run) {
                log(`Unable to load the *event* [${dir}/${file}] due to missing event name or/and run function.`, "warn");

                continue;
            }

            log(`*Event* loaded to the client [${dir}/${file}].`, 'done');

            if (module.once) {
                client.once(module.event, (...args) => module.run(client, ...args));
            } else {
                client.on(module.event, (...args) => module.run(client, ...args));
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
