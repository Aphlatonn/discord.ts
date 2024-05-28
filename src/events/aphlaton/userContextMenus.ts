import { Interaction, PermissionsBitField, TextChannel, VoiceChannel } from "discord.js";
import Aphlaton from "../../classes/Aphlaton.js";
import { AphlatonEventBuilder } from "../../classes/events.js";
import { log } from "../../functions.js";
import { AphlatonContextMenuBuilder } from "../../classes/ContextMenus.js";

export default new AphlatonEventBuilder()
    .setEvent('interactionCreate')
    .setOnce(false)
    .setRun(async (client: Aphlaton, interaction: Interaction) => {
        // return if the intraction is not in a guild
        if (!interaction.guild) return;

        // check if the instraction is a context menu
        if (!interaction.isUserContextMenuCommand()) return;

        // get the context menu from the selects collection
        const contextmenu: AphlatonContextMenuBuilder = client.aphlaton.contextMenus.user[interaction.commandName]

        // return if the command doesn't exist
        if (!contextmenu) return;

        // check for the cooldown
        if (contextmenu.cooldown > 0) {
            // the cooldown key
            const key = `u${interaction.user.id}${interaction.commandName}`
            // if the user noy under cooldown
            if (!client.aphlaton.cooldowns.has(key)) {
                client.aphlaton.cooldowns.set(key, 0);
                setTimeout(() => client.aphlaton.cooldowns.delete(key), contextmenu.cooldown);
                // if the user is under cooldown
            } else {
                interaction.reply(`please wait \`${contextmenu.cooldown / 1000}\` seconds before using this command again.`);
                return
            }
        }

        // check the bot perms
        for (const per of contextmenu.botPerms) {
            if (!interaction.guild.members.me.permissions.has(per)) {
                if (interaction.isRepliable()) {
                    interaction.reply(`i need the \`${per}\` permission to execute this command.`);
                }
                return
            };
        }

        // check the member perms
        for (const per of contextmenu.userPerms) {
            if (!(interaction.member.permissions as PermissionsBitField).has(per)) {
                if (interaction.isRepliable()) {
                    interaction.reply(`you need the \`${per}\` permission to use this command.`);
                }
                return
            };
        }

        // check the nsfw
        if (interaction.channel instanceof TextChannel || interaction.channel instanceof VoiceChannel && contextmenu.nsfw && !interaction.channel.nsfw) {
            if (interaction.isRepliable()) {
                interaction.reply('this command can only be used in nsfw channels.');
            }
            return
        }

        contextmenu.run(client, interaction).catch(error => {
            log("An error occured while executing the command: " + contextmenu.command.name, "err");
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

