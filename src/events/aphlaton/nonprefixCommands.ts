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
        if (!config.commands.nonprefix) return

        // get the args array and command input
        const args = message.content.trim().split(/ +/g);
        const commandInput = args.shift().toLowerCase();

        // return if the command doesn't exist
        if (!commandInput.length) return;

        // get the command
        const command =
            client.collection.nonprefixcommands.get(commandInput) ||
            client.collection.nonprefixcommands.get(client.collection.nonprefixcommandsaliases.get(commandInput));

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
