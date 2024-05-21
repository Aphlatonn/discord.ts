import { AphlatonMessageCommandBuilder } from "../../../classes/Commands.js";

export default new AphlatonMessageCommandBuilder()
    .setName(`test`)
    .setDescription(`this is a test command`)
    .setAliases(["t", "tests"])
    .setCooldown(5000)
    .setNSFW(false)
    .setUsage([`test`])
    .setExamples([`test`])
    .setUserPerms([`SendMessages`, `ManageRoles`])
    .setUserPerms(["Administrator"])
    .setCategory("commands")
    .setRun(async (client, message, args) => {
        message.reply(`hello world`);
    });

