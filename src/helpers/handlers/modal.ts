import { ModalSubmitInteraction } from "discord.js";
import { ClientExtend } from "../types/ClientExtend";
require("dotenv").config();

const gestionnaireID = process.env.GESTIONNAIRE_ID;

if (!gestionnaireID) throw new Error("L'ID du gestionnaire est manquant !");

export const handleModal = async (
    client: ClientExtend,
    interaction: ModalSubmitInteraction
) => {
    const modalName = interaction.customId.includes("&")
        ? interaction.customId.split("&")[0]
        : interaction.customId;
    const modal = client.modals?.get(modalName);

    if (!modal) return;

    try {
        modal.execute(client, interaction);
    } catch (error) {
        console.error(error);
        const gestionnaire = await client.users.fetch(gestionnaireID);
        await gestionnaire.send(
            `Une erreur a été rencontrée lors de l'utilisation du modal ${modalName} par ${interaction.user.tag}.`
        );
        await interaction.reply({
            content:
                "Une erreur est survenue durant l'exécution du modal. Un rapport d'erreur a été envoyé à mon développeur !",
            ephemeral: true,
        });
    }
};
