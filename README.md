# discord.ts
discord.ts, is a discord js v14 template.

# Commands, events, and components objects structure
### Prefix commands:
```ts
import { AphlatonMessageCommandBuilder } from "../../../classes/Commands.js";

export default new AphlatonMessageCommandBuilder()
    .setName(`test`)
    .setDescription(`this is a description`)
    .setUserPerms([`SendMessages`, `ManageMessages`])
    .setRun(async (client, message, args) => {
        message.reply({ content: `test` });
    });

```

### non Prefix commands:
- (the same as prefix commands in structure but it need to be in src/commands/nonprefix/${folder}/commands.ts)

```ts
import { AphlatonMessageCommandBuilder } from "../../../classes/Commands.js";

export default new AphlatonMessageCommandBuilder()
    .setName(`test`)
    .setDescription(`this is a description`)
    .setUserPerms([`SendMessages`, `ManageMessages`])
    .setRun(async (client, message, args) => {
        message.reply({ content: `test` });
    });

```
