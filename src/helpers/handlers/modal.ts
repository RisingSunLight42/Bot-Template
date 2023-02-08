import { ModalSubmitInteraction } from "discord.js";
import { execution } from "../functions/execution";
import { ClientExtend } from "../types/ClientExtend";

export const handleModal = async (
    client: ClientExtend,
    interaction: ModalSubmitInteraction
) => {
    const modalName = interaction.customId.includes("&")
        ? interaction.customId.split("&")[0]
        : interaction.customId;
    const modal = client.modals?.get(modalName);

    if (!modal) return;

    execution(modal, client, interaction, "de la command");
};
