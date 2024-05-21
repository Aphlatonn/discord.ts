import { SlashCommandBuilder } from "discord.js";
import { AphlatonSlashCommandBuilder } from "../../../classes/Commands.js";

export default new AphlatonSlashCommandBuilder()
    .setCommand(
        new SlashCommandBuilder()
            .setName("test")
            .setDescription("test")
    )
    .setBotPerms(["SendMessages"])
    .setUserPerms(["SendMessages"])
    .setRun(async (client, interaction) => {
        await interaction.reply("test")
    })
