import { Interaction, PermissionsBitField, TextChannel, VoiceChannel } from "discord.js";
import Aphlaton from "../../classes/Aphlaton.js";
import { AphlatonEventBuilder } from "../../classes/events.js";
import { log } from "../../functions.js";
import { AphlatonComponentBuilder } from "../../classes/Components.js";
import config from "../../config.js";

export default new AphlatonEventBuilder()
    .setEvent('interactionCreate')
    .setOnce(false)
    .setRun(async (client: Aphlaton, interaction: Interaction) => {
        // return if the message is not from a guild or if the author is a bot
        if (!interaction.guild) return;

        // inistialize the co;ponent
        let component: AphlatonComponentBuilder
        let type: string

        // get the component from the buttons collection
        if (interaction.isButton()) {
            component = client.aphlaton.components.buttons[interaction.customId]
            type = `b`
        }

        // get the component from the modals collection
        if (interaction.isModalSubmit()) {
            component = client.aphlaton.components.modals[interaction.customId]
            type = `m`
        }

        // get the component from the selects collection
        if (interaction.isAnySelectMenu()) {
            component = client.aphlaton.components.selects[interaction.customId]
            type = `s`
        }

        // return if the command doesn't exist
        if (!component) return;

        // check for the cooldown
        if (component.data.cooldown > 0) {
            // the cooldown key
            const key = `${interaction.user.id}${component.data.id}${type}`
            // if the user noy under cooldown
            if (!client.aphlaton.cooldowns.has(key)) {
                client.aphlaton.cooldowns.set(key, 0);
                setTimeout(() => client.aphlaton.cooldowns.delete(key), component.data.cooldown);
                // if the user is under cooldown
            } else {
                if (interaction.isRepliable()) {
                    interaction.reply(`please wait \`${component.data.cooldown / 1000}\` seconds before using this component again.`);
                } else {
                    interaction.channel.send(`please wait \`${component.data.cooldown / 1000}\` seconds before using this component again.`);
                }
                return
            }
        }

        // check the bot perms
        for (const per of component.data.botPerms) {
            if (!interaction.guild.members.me.permissions.has(per)) {
                if (interaction.isRepliable()) {
                    interaction.reply(`i need the \`${per}\` permission to execute this component.`);
                } else {
                    interaction.channel.send(`i need the \`${per}\` permission to execute this component.`);
                }
                return
            };
        }

        // check the member perms
        for (const per of component.data.userPerms) {
            if (!(interaction.member.permissions as PermissionsBitField).has(per)) {
                if (interaction.isRepliable()) {
                    interaction.reply(`you need the \`${per}\` permission to use this component.`);
                } else {
                    interaction.channel.send(`you need the \`${per}\` permission to use this component.`);
                }
                return
            };
        }

        // check the nsfw
        if (interaction.channel instanceof TextChannel || interaction.channel instanceof VoiceChannel && component.data.nsfw && !interaction.channel.nsfw) {
            if (interaction.isRepliable()) {
                interaction.reply('this component can only be used in nsfw channels.');
            } else {
                interaction.channel.send('this component can only be used in nsfw channels.');
            }
            return
        }

        // check the developers only perms
        if (component.data.developersOnly && !config.users.developers.includes(interaction.user.id)) {
            if (interaction.isRepliable()) {
                interaction.reply('only developers can use this component.');
            } else {
                interaction.channel.send('only developers can use this component.');
            }
            return
        }

        component.data.run(client, interaction).catch(error => {
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

