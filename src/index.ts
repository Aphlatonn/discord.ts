import Aphlaton from "./classes/Aphlaton.js";
import process from "process";
import * as dotenv from "dotenv";
import config from "./config.js";
import { log } from "./functions.js";

dotenv.config();

// create the aphlaton client instance
const client = new Aphlaton();
client.start(process.env.CLIENT_TOKEN || config.client.token);

// Register a handler for unhandled promise rejections
process.on("unhandledRejection", (reason) => {
    log("Unhandled Rejection: ", "err");
    console.error(reason);
});


/**
 * Project: Template
 * Author: @Aphlaton
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/quantom
 */

