import { AphlatonComponentBuilder } from "../../../classes/Components.js";

export default new AphlatonComponentBuilder()
    .setId('test')
    .setUserPerms(['Administrator'])
    .setRun(async (_, interaction) => {
        interaction.isRepliable() ? interaction.reply(`test`) : await interaction.channel.send(`test`);
    })
