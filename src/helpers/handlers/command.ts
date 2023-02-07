import { ChannelType, ChatInputCommandInteraction } from "discord.js";
SOUTSU_ID;
import { ClientExtend } from "../types/ClientExtend";
require("dotenv").config();

const gestionnaireID = process.env.GESTIONNAIRE_ID;

if (!gestionnaireID) throw new Error("L'ID du gestionnaire est manquant !");

export const handleCommand = async (
    client: ClientExtend,
    interaction: ChatInputCommandInteraction
) => {
    const { commandName, channel, user } = interaction;
    const command = client.commands?.get(commandName);

    if (!command) return;
    if (channel?.type === ChannelType.DM)
        return await interaction.reply({
            content:
                "Je ne peux pour l'instant pas réaliser de commandes en MP !",
            ephemeral: true,
        });

    //* Exécution de la commande, avec catch en cas d'erreur
    try {
        command.execute(interaction);
    } catch (error) {
        console.error(error);
        const gestionnaire = await client.users.fetch(gestionnaireID);
        await gestionnaire.send(
            `Une erreur a été rencontrée lors de l'utilisation de la commande ${commandName} par ${user.tag}.`
        );
        await interaction.reply({
            content:
                "Une erreur est survenue durant l'exécution de la commande. Un rapport d'erreur a été envoyé à mon développeur !",
            ephemeral: true,
        });
    }
};
