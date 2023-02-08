import { SelectMenuInteraction } from "discord.js";
import { execution } from "../functions/execution";
import { ClientExtend } from "../types/ClientExtend";

export const handleMenu = async (
    client: ClientExtend,
    interaction: SelectMenuInteraction
) => {
    const menu = client.menus?.get(interaction.customId);

    if (!menu) return;

    execution(menu, client, interaction, "de la command");
};
