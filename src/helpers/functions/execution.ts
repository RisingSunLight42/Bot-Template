import {
    ChatInputCommandInteraction,
    ButtonInteraction,
    SelectMenuInteraction,
    ModalSubmitInteraction,
} from "discord.js";
import { ClientExtend } from "../types/ClientExtend";
import { Button, Command, Menu, Modal } from "../types/DiscordElement";
import { isCommand } from "./isCommand";
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
        | SelectMenuInteraction
        | ModalSubmitInteraction,
    bugText: string
) => {
    try {
        isCommand(element)
            ? element.execute(interaction)
            : element.execute(client, interaction);
    } catch (error) {
        console.error(error);
        const gestionnaire = await client.users.fetch(gestionnaireID);
        await gestionnaire.send(
            `Une erreur a été rencontrée lors de l'utilisation ${bugText} ${interaction.customId} par ${interaction.user.tag}.`
        );
        await interaction.reply({
            content: `Une erreur est survenue durant l'exécution ${bugText}. Un rapport d'erreur a été envoyé à mon développeur !`,
            ephemeral: true,
        });
    }
};
