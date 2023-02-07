import { ButtonInteraction } from "discord.js";
import { ClientExtend } from "../types/ClientExtend";
require("dotenv").config();

const gestionnaireID = process.env.GESTIONNAIRE_ID;

if (!gestionnaireID) throw new Error("L'ID du gestionnaire est manquant !");

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

    try {
        button.execute(client, interaction);
    } catch (error) {
        console.error(error);
        const gestionnaire = await client.users.fetch(gestionnaireID);
        await gestionnaire.send(
            `Une erreur a été rencontrée lors de l'utilisation du bouton ${interaction.customId} par ${interaction.user.tag}.`
        );
        await interaction.reply({
            content:
                "Une erreur est survenue durant l'exécution du bouton. Un rapport d'erreur a été envoyé à mon développeur !",
            ephemeral: true,
        });
    }
};
