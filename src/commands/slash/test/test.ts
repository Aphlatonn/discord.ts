import { SlashCommandBuilder } from "discord.js";
import { AphlatonSlashCommandBuilder } from "../../../classes/Commands.js";

export default new AphlatonSlashCommandBuilder()
    .setCommand(
        new SlashCommandBuilder()
            .setName("test")
            .setDescription("test")
    )
    .setNSFW(false)
    .setCategory("commands")
    .setCooldown(5000)
    .setUserPerms(["SendMessages", "ManageRoles"])
    .setBotPerms(["Administrator"])
    .setRun(async (client, interaction) => {
        interaction.reply("hello world");
    })


/**
 * Project: Template
 * Author: @Aphlaton
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/quantom
 */

