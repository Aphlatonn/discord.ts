import {
    ActionRowBuilder,
    ButtonBuilder,
    ComponentType,
    EmbedBuilder,
    ButtonInteraction,
    User,
    MessageEditOptions,
    TextChannel,
} from "discord.js";

type EndBehavior = 'disable' | 'remove' | 'edit' | 'none';

export default class Pagination {
    data: {
        channel: TextChannel;
        embeds: EmbedBuilder[];
        user: User;
        currentPage: number;
        isPrivate: boolean;
        endBehavior: EndBehavior;
        collectorTime: number;
        editOptions: MessageEditOptions | null;
        cycle: boolean;
    };

    constructor(channel: TextChannel, embeds: EmbedBuilder[], user: User) {
        this.data = {
            channel,
            embeds,
            user,
            currentPage: 0,
            isPrivate: false,
            endBehavior: 'remove',
            collectorTime: 60000,
            editOptions: null,
            cycle: true,
        };
    }

    setPrivate(isPrivate: boolean) {
        this.data.isPrivate = isPrivate;
        return this;
    }

    setEndBehavior(behavior: EndBehavior) {
        this.data.endBehavior = behavior;
        return this;
    }

    setCollectorTime(time: number) {
        this.data.collectorTime = time;
        return this;
    }

    setEditTo(options: MessageEditOptions) {
        this.data.editOptions = options;
        return this;
    }

    setCycle(cycle: boolean) {
        this.data.cycle = cycle;
        return this;
    }

    async paginate() {
        const { channel, embeds, isPrivate, endBehavior, collectorTime, editOptions, cycle, user } = this.data;

        if (!embeds || embeds.length === 0) return;

        if (embeds.length === 1) {
            channel.send({ embeds: embeds });
            return
        }

        const firstButton = new ButtonBuilder()
            .setCustomId('pfirst')
            .setLabel('<<')
            .setStyle(2);

        const backButton = new ButtonBuilder()
            .setCustomId('pback')
            .setLabel('<')
            .setStyle(2);

        const forwardButton = new ButtonBuilder()
            .setCustomId('pforward')
            .setLabel('>')
            .setStyle(2);

        const lastButton = new ButtonBuilder()
            .setCustomId('plast')
            .setLabel('>>')
            .setStyle(2);

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(firstButton, backButton, forwardButton, lastButton);

        const updateButtons = () => {
            const { currentPage } = this.data;
            if (cycle) {
                firstButton.setDisabled(false);
                backButton.setDisabled(false);
                forwardButton.setDisabled(false);
                lastButton.setDisabled(false);
            } else {
                firstButton.setDisabled(currentPage === 0);
                backButton.setDisabled(currentPage === 0);
                forwardButton.setDisabled(currentPage === embeds.length - 1);
                lastButton.setDisabled(currentPage === embeds.length - 1);
            }
        };

        updateButtons();

        const message = await channel.send({
            embeds: [embeds[this.data.currentPage]],
            components: [row],
        });

        const collector = message.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: collectorTime,
        });

        collector.on('collect', async (i: ButtonInteraction) => {
            if (isPrivate && i.user.id !== user.id) {
                await i.reply({ content: `Only <@${user.id}> can use this button`, ephemeral: true });
                return;
            }

            switch (i.customId) {
                case 'pfirst':
                    this.data.currentPage = 0;
                    break;
                case 'pback':
                    this.data.currentPage = cycle
                        ? (this.data.currentPage - 1 + embeds.length) % embeds.length
                        : Math.max(0, this.data.currentPage - 1);
                    break;
                case 'pforward':
                    this.data.currentPage = cycle
                        ? (this.data.currentPage + 1) % embeds.length
                        : Math.min(embeds.length - 1, this.data.currentPage + 1);
                    break;
                case 'plast':
                    this.data.currentPage = embeds.length - 1;
                    break;
            }

            updateButtons();

            await i.update({
                embeds: [embeds[this.data.currentPage]],
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

            if (endBehavior === 'disable') {
                await message.edit({ components: [disabledRow] });
            } else if (endBehavior === 'remove') {
                await message.edit({ components: [] });
            } else if (endBehavior === 'edit') {
                if (editOptions) {
                    await message.edit(editOptions);
                } else {
                    await message.edit({
                        embeds: [embeds[this.data.currentPage].setFooter({ text: 'Pagination ended' })],
                        components: [disabledRow],
                    });
                }
            }
        });
    }
}

