import {
    ActionRowBuilder,
    ButtonBuilder,
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
    private isPrivate: boolean;
    private endBehavior: EndBehavior;
    private collectorTime: number;
    private editOptions: NewEditObject | null;
    private cycle: boolean;

    constructor(channel: TextBasedChannel, embeds: EmbedBuilder[], user: User) {
        this.channel = channel;
        this.embeds = embeds;
        this.user = user;
        this.currentPage = 0;
        this.isPrivate = false;
        this.endBehavior = 'remove';
        this.collectorTime = 60000;
        this.editOptions = null;
        this.cycle = true;
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

    setCycle(cycle: boolean) {
        this.cycle = cycle;
        return this;
    }

    async paginate() {
        if (!this.embeds || this.embeds.length === 0) return;

        const firstButton = new ButtonBuilder()
            .setCustomId('first')
            .setLabel('<<')
            .setStyle(2)

        const backButton = new ButtonBuilder()
            .setCustomId('back')
            .setLabel('<')
            .setStyle(2)

        const forwardButton = new ButtonBuilder()
            .setCustomId('forward')
            .setLabel('>')
            .setStyle(2)

        const lastButton = new ButtonBuilder()
            .setCustomId('last')
            .setLabel('>>')
            .setStyle(2)

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(firstButton, backButton, forwardButton, lastButton);

        const updateButtons = () => {
            if (this.cycle) {
                firstButton.setDisabled(false);
                backButton.setDisabled(false);
                forwardButton.setDisabled(false);
                lastButton.setDisabled(false);
            } else {
                firstButton.setDisabled(this.currentPage === 0);
                backButton.setDisabled(this.currentPage === 0);
                forwardButton.setDisabled(this.currentPage === this.embeds.length - 1);
                lastButton.setDisabled(this.currentPage === this.embeds.length - 1);
            }
        };

        updateButtons();

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
                    this.currentPage = this.cycle
                        ? (this.currentPage - 1 + this.embeds.length) % this.embeds.length
                        : Math.max(0, this.currentPage - 1);
                    break;
                case 'forward':
                    this.currentPage = this.cycle
                        ? (this.currentPage + 1) % this.embeds.length
                        : Math.min(this.embeds.length - 1, this.currentPage + 1);
                    break;
                case 'last':
                    this.currentPage = this.embeds.length - 1;
                    break;
            }

            updateButtons();

            await i.update({
                embeds: [this.embeds[this.currentPage]],
                components: [row],
            });
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
                        components: [disabledRow],
                    });
                }
            }
        });
    }
}

