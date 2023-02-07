import {
    ChatInputCommandInteraction,
    ButtonInteraction,
    SelectMenuInteraction,
    ModalSubmitInteraction,
} from "discord.js";
import { handleCommand } from "../helpers/handlers/command";
import { handleButton } from "../helpers/handlers/button";
import { handleMenu } from "../helpers/handlers/menu";
import { handleModal } from "../helpers/handlers/modal";
import { ClientExtend } from "../helpers/types/ClientExtend";

module.exports = {
    name: "interactionCreate",
    async execute(
        client: ClientExtend,
        interaction:
            | ChatInputCommandInteraction
            | ButtonInteraction
            | SelectMenuInteraction
            | ModalSubmitInteraction
    ) {
        if (interaction.isCommand())
            await handleCommand(interaction.client, interaction);
        if (interaction.isButton())
            await handleButton(interaction.client, interaction);
        if (interaction.isSelectMenu())
            await handleMenu(interaction.client, interaction);
        if (interaction.isModalSubmit())
            await handleModal(interaction.client, interaction);
    },
};
