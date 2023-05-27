import {
    ChatInputCommandInteraction,
    ButtonInteraction,
    StringSelectMenuInteraction,
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
            | StringSelectMenuInteraction
            | ModalSubmitInteraction
    ) {
        if (interaction.isCommand()) await handleCommand(client, interaction);
        if (interaction.isButton()) await handleButton(client, interaction);
        if (interaction.isStringSelectMenu())
            await handleMenu(client, interaction);
        if (interaction.isModalSubmit()) await handleModal(client, interaction);
    },
};
