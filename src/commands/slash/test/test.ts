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
