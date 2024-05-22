# discord.ts
discord.ts, is a discord js v14 template.

# Commands, events, context menus and components objects structure

## Commands:

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
- (the same as prefix commands in structure but it need to be in `src/commands/nonprefix/${folder}/commands.ts`)

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

## Context menu commands:

### User context menu commands:

```ts
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
        interaction.reply(`hello world`)
    })
```

### Message context menu commands:
- (the same as user context menu in structure but it need to be in `src/context_menus/message/${folder}/commands.ts`)

```ts
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
        interaction.reply(`hello world`)
    })
```

- `NOTE:` in the context menus you dont need to set the context menu type:
```ts
import { ContextMenuCommandBuilder } from "discord.js";
.
.
.

.setCommand(new ContextMenuCommandBuilder()
    .setName('test')
    .setType(2 or 3) // 2 for user context menu and 3 for message context menu
                     // ( the handler set the type automatically (.setType() method))
)

.
.
.
```
