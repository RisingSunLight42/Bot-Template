import { SelectMenuInteraction } from "discord.js";
import { ClientExtend } from "../helpers/types/ClientExtend";

module.exports = {
    name: "exempleMenu",
    async execute(client: ClientExtend, interaction: SelectMenuInteraction) {
        return await interaction.reply({
            content: "Menu sélectionné",
        });
    },
};
