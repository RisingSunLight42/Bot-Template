import {
    ChatInputCommandInteraction,
    ButtonInteraction,
    StringSelectMenuInteraction,
    ModalSubmitInteraction,
} from "discord.js";
import { ClientExtend } from "../types/ClientExtend";
import { Button, Command, Menu, Modal } from "../types/DiscordElement";
require("dotenv").config();

const gestionnaireID = process.env.GESTIONNAIRE_ID;

if (!gestionnaireID) throw new Error("L'ID du gestionnaire est manquant !");

/**
 *  Function to execute interaction
 */
export const execution = async (
    element: Button | Modal | Command | Menu,
    client: ClientExtend,
    interaction:
        | ChatInputCommandInteraction
        | ButtonInteraction
        | StringSelectMenuInteraction
        | ModalSubmitInteraction,
    bugText: string
) => {
    try {
        element.execute(client, interaction);
    } catch (error) {
        console.error(error);
        const gestionnaire = await client.users.fetch(gestionnaireID);
        await gestionnaire.send(
            `Une erreur a été rencontrée lors de l'utilisation ${bugText} ${element.name} par ${interaction.user.tag}.`
        );
        await interaction.reply({
            content: `Une erreur est survenue durant l'exécution ${bugText}. Un rapport d'erreur a été envoyé à mon développeur !`,
            ephemeral: true,
        });
    }
};
