import {
    ModalSubmitInteraction,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from "discord.js";
import { ClientExtend } from "../helpers/types/ClientExtend";

module.exports = {
    name: "exampleModal",
    async execute(client: ClientExtend, interaction: ModalSubmitInteraction) {
        return await interaction.reply({
            content: "Modal reçu",
            ephemeral: true,
        });
    },
};
