import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Send latency of the bot.")
        .setDescriptionLocalization("fr", "Envoie la latence du bot."),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("Pong !");

        const message = await interaction.fetchReply();
        return interaction.editReply(
            `Pong !\nLe message a mis ${
                message.createdTimestamp - interaction.createdTimestamp
            } ms pour partir et revenir.\nTon ping est de ${
                interaction.client.ws.ping
            } ms.`
        );
    },
};
