import { readdirSync } from "fs";
import path from "path";
import { REST } from "@discordjs/rest";
import { Routes, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const clientToken = process.env.CLIENT_TOKEN;
const guildGestionId = process.env.GUILD_GESTION_ID;

if (!clientId || !clientToken || !guildGestionId)
    throw new Error("One of the env variables is undefined.");

export const recupFichier = (): [
    RESTPostAPIApplicationCommandsJSONBody[],
    RESTPostAPIApplicationCommandsJSONBody[]
] => {
    const commandsGestion = [];
    const commandsGlobal = [];
    const commandFiles = readdirSync(
        path.join(__dirname, ".", "commands")
    ).filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commandsGestion.push(command.data.toJSON());
        if (!["a_command.js"].includes(file)) {
            commandsGlobal.push(command.data.toJSON());
        }
    }
    return [commandsGestion, commandsGlobal];
};

const rest = new REST({ version: "10" }).setToken(clientToken);

export const deployGlobal = async (
    commandsGlobal: RESTPostAPIApplicationCommandsJSONBody[]
) => {
    try {
        await rest.put(Routes.applicationCommands(clientId), {
            body: commandsGlobal,
        });
        console.log("🧪 Les commandes (/) globale ont été enregistrées.");
    } catch (error) {
        console.error(error);
    }
};

export const deployGestion = async (
    commandsGestion: RESTPostAPIApplicationCommandsJSONBody[]
) => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildGestionId),
            {
                body: commandsGestion,
            }
        );
        console.log(
            "🧪 Les commandes (/) du serveur de gestion ont été enregistrées."
        );
    } catch (error) {
        console.error(error);
    }
};
