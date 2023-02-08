import { ButtonInteraction } from "discord.js";
import { execution } from "../functions/execution";
import { ClientExtend } from "../types/ClientExtend";

export const handleButton = async (
    client: ClientExtend,
    interaction: ButtonInteraction
) => {
    //* Si jamais le nom du bouton contient un &, le retire pour avoir le vrai nom du bouton qui doit être appelé (ce qu'il y a après sont des paramètres)
    const buttonName = interaction.customId.includes("&")
        ? interaction.customId.split("&")[0]
        : interaction.customId;
    const button = client.buttons?.get(buttonName);

    if (!button) return;

    execution(button, client, interaction, "de la command");
};
