import { ButtonInteraction } from "discord.js";
import { ClientExtend } from "../helpers/types/ClientExtend";

module.exports = {
    name: "exampleButton",
    async execute(client: ClientExtend, interaction: ButtonInteraction) {
        return await interaction.update({
            content: "Button has been clicked",
        });
    },
};
