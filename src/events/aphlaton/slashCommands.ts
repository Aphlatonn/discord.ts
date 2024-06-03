import { Interaction, PermissionsBitField, TextChannel, VoiceChannel } from "discord.js";
import Aphlaton from "../../classes/Aphlaton.js";
import { AphlatonEventBuilder } from "../../classes/events.js";
import { log } from "../../functions.js";
import config from "../../config.js";
import { AphlatonSlashCommandBuilder } from "../../classes/Commands.js";

export default new AphlatonEventBuilder()
    .setEvent('interactionCreate')
    .setOnce(false)
    .setRun(async (client: Aphlaton, interaction: Interaction) => {
        // return if the message is not from a guild or if the author is a bot
        if (!interaction.guild) return;

        // check if the instraction is a command
        if (!interaction.isCommand()) return;

        // check if the intraction is a slash command
        if (!interaction.isChatInputCommand() || !config.commands.slash) return;

        // get the component from the selects collection
        const command: AphlatonSlashCommandBuilder = client.aphlaton.commands.slashcommands[interaction.commandName]

        // return if the command doesn't exist
        if (!command) return;

        // check for the cooldown
        if (command.data.cooldown > 0) {
            // the cooldown key
            const key = `s${interaction.user.id}${interaction.commandName}`
            // if the user noy under cooldown
            if (!client.aphlaton.cooldowns.has(key)) {
                client.aphlaton.cooldowns.set(key, 0);
                setTimeout(() => client.aphlaton.cooldowns.delete(key), command.data.cooldown);
                // if the user is under cooldown
            } else {
                interaction.reply(`please wait \`${command.data.cooldown / 1000}\` seconds before using this command again.`);
                return
            }
        }

        // check the bot perms
        for (const per of command.data.botPerms) {
            if (!interaction.guild.members.me.permissions.has(per)) {
                if (interaction.isRepliable()) {
                    interaction.reply(`i need the \`${per}\` permission to execute this command.`);
                }
                return
            };
        }

        // check the member perms
        for (const per of command.data.userPerms) {
            if (!(interaction.member.permissions as PermissionsBitField).has(per)) {
                if (interaction.isRepliable()) {
                    interaction.reply(`you need the \`${per}\` permission to use this command.`);
                }
                return
            };
        }

        // check the nsfw
        if (interaction.channel instanceof TextChannel || interaction.channel instanceof VoiceChannel && command.data.nsfw && !interaction.channel.nsfw) {
            if (interaction.isRepliable()) {
                interaction.reply('this command can only be used in nsfw channels.');
            }
            return
        }

        // check the developers perm
        if (command.data.developersOnly && !config.users.developers.includes(interaction.user.id)) {
            if (interaction.isRepliable()) {
                interaction.reply('only developers can use this command.');
            }
            return
        }

        command.data.run(client, interaction).catch(error => {
            log("An error occured while executing the command: " + command.data.command.name, "err");
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

