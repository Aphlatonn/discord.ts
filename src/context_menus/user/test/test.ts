import { ContextMenuCommandBuilder } from "discord.js";
import { AphlatonContextMenuBuilder } from "../../../classes/ContextMenus.js";

export default new AphlatonContextMenuBuilder()
    .setCommand(new ContextMenuCommandBuilder()
        .setName('test')
    )
    .setNSFW(false)
    .setCooldown(5000)
    .setBotPerms([`Administrator`])
    .setUserPerms([`SendMessages`, `ManageRoles`])
    .setRun(async (client, interaction) => {
        interaction.reply(`hello user`)
    })
