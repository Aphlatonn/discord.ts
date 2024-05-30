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

            if (!module.data.event || !module.data.run) {
                log(`Unable to load the *event* [${dir}/${file}] due to missing event name or/and run function.`, "warn");

                continue;
            }

            log(`*Event* loaded to the client [${dir}/${file}].`, 'done');

            if (module.data.once) {
                client.once(module.data.event, (...args) => module.data.run(client, ...args));
            } else {
                client.on(module.data.event, (...args) => module.data.run(client, ...args));
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

