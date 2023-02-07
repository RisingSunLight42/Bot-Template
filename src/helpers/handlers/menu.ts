import { SelectMenuInteraction } from "discord.js";
import { ClientExtend } from "../types/ClientExtend";
require("dotenv").config();

const gestionnaireID = process.env.GESTIONNAIRE_ID;

if (!gestionnaireID) throw new Error("L'ID du gestionnaire est manquant !");

export const handleMenu = async (
    client: ClientExtend,
    interaction: SelectMenuInteraction
) => {
    const menu = client.menus?.get(interaction.customId);

    if (!menu) return;

    try {
        menu.execute(client, interaction);
    } catch (error) {
        console.error(error);
        const gestionnaire = await client.users.fetch(gestionnaireID);
        await gestionnaire.send(
            `Une erreur a été rencontrée lors de l'utilisation du menu ${interaction.customId} par ${interaction.user.tag}.`
        );
        await interaction.reply({
            content:
                "Une erreur est survenue durant l'exécution du menu. Un rapport d'erreur a été envoyé à mon développeur !",
            ephemeral: true,
        });
    }
};
