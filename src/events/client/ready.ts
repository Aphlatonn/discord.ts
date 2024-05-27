import { AphlatonEventBuilder } from "../../classes/events.js";
import { log } from "../../functions.js";

export default new AphlatonEventBuilder()
    .setEvent('ready')
    .setOnce(true)
    .setRun(async (client) => {
        log(`Logged in as ${client.user.tag}!`, `info`);
    })


/**
 * Project: Template
 * Author: @Aphlaton
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/quantom
 */

