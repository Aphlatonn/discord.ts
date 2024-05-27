import { Interaction, PermissionsBitField, TextChannel, VoiceChannel } from "discord.js";
import Aphlaton from "../../classes/Aphlaton.js";
import { AphlatonEventBuilder } from "../../classes/events.js";
import { log } from "../../functions.js";
import { AphlatonComponentBuilder } from "../../classes/Components.js";

export default new AphlatonEventBuilder()
    .setEvent('interactionCreate')
    .setOnce(false)
    .setRun(async (client: Aphlaton, interaction: Interaction) => {
        // return if the message is not from a guild or if the author is a bot
        if (!interaction.guild) return;

        // inistialize the co;ponent
        let component: AphlatonComponentBuilder

        // get the component from the buttons collection
        if (interaction.isButton()) {
            component = client.collection.components.buttons.get(interaction.customId)
        }

        // get the component from the modals collection
        if (interaction.isModalSubmit()) {
            component = client.collection.components.modals.get(interaction.customId)
        }

        // get the component from the selects collection
        if (interaction.isAnySelectMenu()) {
            component = client.collection.components.selects.get(interaction.customId)
        }

        // return if the command doesn't exist
        if (!component) return;

        // check the bot perms
        for (const per of component.botPerms) {
            if (!interaction.guild.members.me.permissions.has(per)) {
                if (interaction.isRepliable()) {
                    interaction.reply(`i need the \`${per}\` permission to execute this command.`);
                }
                return
            };
        }

        // check the member perms
        for (const per of component.userPerms) {
            if (!(interaction.member.permissions as PermissionsBitField).has(per)) {
                if (interaction.isRepliable()) {
                    interaction.reply(`you need the \`${per}\` permission to use this command.`);
                }
                return
            };
        }

        // check the nsfw
        if (interaction.channel instanceof TextChannel || interaction.channel instanceof VoiceChannel && component.nsfw && !interaction.channel.nsfw) {
            if (interaction.isRepliable()) {
                interaction.reply('this command can only be used in nsfw channels.');
            }
            return
        }

        component.run(client, interaction).catch(error => {
            log("An error occured while executing the component: " + component, "err");
            console.log(error)
        })

    })


/**
 * Project: Template
 * Author: @Aphlaton
 * this code is under the MIT license.
 * For more information, contact us at
 * https://discord.gg/quantom
 */

