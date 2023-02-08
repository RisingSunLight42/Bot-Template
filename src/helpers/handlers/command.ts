import { ChannelType, ChatInputCommandInteraction } from "discord.js";
import { execution } from "../functions/execution";
import { ClientExtend } from "../types/ClientExtend";

export const handleCommand = async (
    client: ClientExtend,
    interaction: ChatInputCommandInteraction
) => {
    const { commandName, channel } = interaction;
    const command = client.commands?.get(commandName);

    if (!command) return;
    if (channel?.type === ChannelType.DM)
        return await interaction.reply({
            content:
                "Je ne peux pour l'instant pas réaliser de commandes en MP !",
            ephemeral: true,
        });

    execution(command, client, interaction, "de la command");
};
