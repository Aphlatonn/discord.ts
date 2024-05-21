import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import { AphlatonMessageCommandBuilder } from "../../../classes/Commands.js";

export default new AphlatonMessageCommandBuilder()
    .setName(`test`)
    .setDescription(`diha gha fkarek`)
    .setUserPerms([`SendMessages`])
    .setRun(async (_, message) => {
    });

