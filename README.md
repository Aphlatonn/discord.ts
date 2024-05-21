# discord.ts
discord.ts, is a discord js v14 template.

# Commands, events, and components objects structure
### Prefix commands:
```ts
import { AphlatonMessageCommandBuilder } from "../../../classes/Commands.js";

export default new AphlatonMessageCommandBuilder()
    .setName(`name`)
    .setDescription(`description`)
    .setAliases(["alias1", "alias2"])
    .setCooldown(integer)
    .setNSFW(boolean)
    .setUsage([`test foo`, `test bar`])
    .setExamples([`test foo`, `test bar`])
    .setUserPerms([`SendMessages`, `ManageRoles`])
    .setUserPerms(["Administrator"])
    .setCategory("commands")
    .setRun(async (client, message, args) => {
        message.reply(`hello world`);
    });
```

### non Prefix commands:
- (the same as prefix commands in structure but it need to be in src/commands/nonprefix/${folder}/commands.ts)

```ts
import { AphlatonMessageCommandBuilder } from "../../../classes/Commands.js";

export default new AphlatonMessageCommandBuilder()
    .setName(`name`)
    .setDescription(`description`)
    .setAliases(["alias1", "alias2"])
    .setCooldown(integer)
    .setNSFW(boolean)
    .setUsage([`test foo`, `test bar`])
    .setExamples([`test foo`, `test bar`])
    .setUserPerms([`SendMessages`, `ManageRoles`])
    .setUserPerms(["Administrator"])
    .setCategory("commands")
    .setRun(async (client, message, args) => {
        message.reply(`hello world`);
    });
```

### Slash commands:

```ts
import { SlashCommandBuilder } from "discord.js";
import { AphlatonSlashCommandBuilder } from "../../../classes/Commands.js";

export default new AphlatonSlashCommandBuilder()
    .setCommand(
        new SlashCommandBuilder()
            .setName("test")
            .setDescription("test")
    )
    .setNSFW(false)
    .setCategory("commands")
    .setCooldown(5000)
    .setUserPerms(["SendMessages", "ManageRoles"])
    .setBotPerms(["Administrator"])
    .setRun(async (client, interaction) => {
        interaction.reply("hello world");
    })
```
