
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    EmbedBuilder,
    ButtonInteraction,
    User,
    TextBasedChannel,
    MessageEditOptions,
} from "discord.js";

type EndBehavior = 'disable' | 'remove' | 'edit' | 'none';
type NewEditObject = MessageEditOptions;

export default class Pagination {
    private channel: TextBasedChannel;
    private embeds: EmbedBuilder[];
    private user: User;
    private currentPage: number;
    private enableFirstButton: boolean;
    private enableBackButton: boolean;
    private enableForwardButton: boolean;
    private enableLastButton: boolean;
    private isPrivate: boolean;
    private endBehavior: EndBehavior;
    private collectorTime: number;
    private editOptions: NewEditObject | null;

    constructor(channel: TextBasedChannel, embeds: EmbedBuilder[], user: User) {
        this.channel = channel;
        this.embeds = embeds;
        this.user = user;
        this.currentPage = 0;
        this.enableFirstButton = true;
        this.enableBackButton = true;
        this.enableForwardButton = true;
        this.enableLastButton = true;
        this.isPrivate = false;
        this.endBehavior = 'remove';
        this.collectorTime = 60000;
        this.editOptions = null;
    }

    setEnableFirstButton(enable: boolean) {
        this.enableFirstButton = enable;
        return this;
    }

    setEnableBackButton(enable: boolean) {
        this.enableBackButton = enable;
        return this;
    }

    setEnableForwardButton(enable: boolean) {
        this.enableForwardButton = enable;
        return this;
    }

    setEnableLastButton(enable: boolean) {
        this.enableLastButton = enable;
        return this;
    }

    setPrivate(isPrivate: boolean) {
        this.isPrivate = isPrivate;
        return this;
    }

    setEndBehavior(behavior: EndBehavior) {
        this.endBehavior = behavior;
        return this;
    }

    setCollectorTime(time: number) {
        this.collectorTime = time;
        return this;
    }

    setEditTo(options: NewEditObject) {
        this.editOptions = options;
        return this;
    }

    async paginate() {
        if (!this.embeds || this.embeds.length === 0) return;

        const firstButton = new ButtonBuilder()
            .setCustomId('first')
            .setLabel('<<')
            .setStyle(2)
            .setDisabled(!this.enableFirstButton);

        const backButton = new ButtonBuilder()
            .setCustomId('back')
            .setLabel('<')
            .setStyle(2)
            .setDisabled(!this.enableBackButton);

        const forwardButton = new ButtonBuilder()
            .setCustomId('forward')
            .setLabel('>')
            .setStyle(2)
            .setDisabled(!this.enableForwardButton);

        const lastButton = new ButtonBuilder()
            .setCustomId('last')
            .setLabel('>>')
            .setStyle(2)
            .setDisabled(!this.enableLastButton);

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(firstButton, backButton, forwardButton, lastButton);

        const message = await this.channel.send({
            embeds: [this.embeds[this.currentPage]],
            components: [row],
        });

        const collector = message.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: this.collectorTime,
        });

        collector.on('collect', async (i: ButtonInteraction) => {
            if (this.isPrivate && i.user.id !== this.user.id) {
                await i.reply({ content: `Only <@${this.user.id}> can use this button`, ephemeral: true });
                return;
            }

            switch (i.customId) {
                case 'first':
                    this.currentPage = 0;
                    break;
                case 'back':
                    this.currentPage = (this.currentPage - 1 + this.embeds.length) % this.embeds.length;
                    break;
                case 'forward':
                    this.currentPage = (this.currentPage + 1) % this.embeds.length;
                    break;
                case 'last':
                    this.currentPage = this.embeds.length - 1;
                    break;
            }

            await i.update({ embeds: [this.embeds[this.currentPage]], components: [row] });
        });

        collector.on('end', async () => {
            const disabledRow = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    firstButton.setDisabled(true),
                    backButton.setDisabled(true),
                    forwardButton.setDisabled(true),
                    lastButton.setDisabled(true)
                );

            if (this.endBehavior === 'disable') {
                await message.edit({ components: [disabledRow] });
            } else if (this.endBehavior === 'remove') {
                await message.edit({ components: [] });
            } else if (this.endBehavior === 'edit') {
                if (this.editOptions) {
                    await message.edit(this.editOptions);
                } else {
                    await message.edit({
                        embeds: [this.embeds[this.currentPage].setFooter({ text: 'Pagination ended' })],
                        components: [disabledRow]
                    });
                }
            }
        });
    }
}

