import { AphlatonEventBuilder } from "../../classes/events.js";
import { log } from "../../functions.js";

export default new AphlatonEventBuilder()
    .setEvent('ready')
    .setOnce(true)
    .setRun(async (client) => {
        log(`Logged in as ${client.user.tag}!`, `info`);
    })
