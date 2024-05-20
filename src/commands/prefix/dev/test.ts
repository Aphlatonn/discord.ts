import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import { AphlatonMessageCommandBuilder } from "../../../classes/Commands.js";

export default new AphlatonMessageCommandBuilder()
    .setName(`test`)
    .setDescription(`diha gha fkarek`)
    .setUserPerms([`SendMessages`])
    .setRun(async (_, message) => {
        message.reply({
            content: `test`,
            components: [
                new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(new ButtonBuilder()
                        .setLabel(`test`)
                        .setStyle(2)
                        .setCustomId(`test`)
                    )
            ]
        });
    });

