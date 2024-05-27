import { Message, TextChannel, VoiceChannel } from "discord.js";
import Aphlaton from "../../classes/Aphlaton.js";
import { AphlatonEventBuilder } from "../../classes/events.js";
import config from "../../config.js";
import { log } from "../../functions.js";

export default new AphlatonEventBuilder()
    .setEvent('messageCreate')
    .setOnce(false)
    .setRun(async (client: Aphlaton, message: Message) => {
        // return if the message is not from a guild or if the author is a bot
        if (message.author.bot || !message.guild) return;

        // return if the prefix commands are disabled
        if (!config.commands.prefix) return

        // return if the message doesn't start with the prefix
        if (!message.content.startsWith(config.handler.prefix)) return;

        // get the args array and command input
        const args = message.content.slice(config.handler.prefix.length).trim().split(/ +/g);
        const commandInput = args.shift().toLowerCase();

        // return if the command doesn't exist
        if (!commandInput.length) return;

        // get the command
        const command =
            client.collection.commands.prefixcommands.get(commandInput) ||
            client.collection.commands.prefixcommands.get(client.collection.commands.prefixcommandsaliases.get(commandInput));

        // return if the command doesn't exist
        if (!command) return;

        // check the bot perms
        for (const per of command.botPerms) {
            if (!message.guild.members.me.permissions.has(per)) {
                message.reply(`i need the \`${per}\` permission to execute this command.`);
                return
            };
        }

        // check the member perms
        for (const per of command.userPerms) {
            if (!message.member.permissions.has(per)) {
                message.reply(`you need the \`${per}\` permission to use this command.`);
                return
            };
        }

        // check the nsfw
        if (message.channel instanceof TextChannel || message.channel instanceof VoiceChannel && command.nsfw && !message.channel.nsfw) {
            message.reply('this command can only be used in nsfw channels.');
            return
        }

        command.run(client, message, args).catch(error => {
            log("An error occured while executing the command: " + commandInput, "err");
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

