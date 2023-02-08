// Import dependencies
import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import { ClientExtend } from "./helpers/types/ClientExtend";
import path from "path";
require("dotenv").config();

const clientToken = process.env.CLIENT_TOKEN;

const client: ClientExtend = new Client({
    intents: [],
});

// Fetch commands
client.commands = new Collection();
const commandFiles = readdirSync(path.join(__dirname, ".", "commands")).filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts")
);

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Fetch buttons
client.buttons = new Collection();
const buttonFiles = readdirSync(path.join(__dirname, ".", "buttons")).filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts")
);

for (const file of buttonFiles) {
    const button = require(`./buttons/${file}`);
    client.buttons.set(button.name, button);
}

// Fetch events
const eventFiles = readdirSync(path.join(__dirname, ".", "events")).filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts")
);

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// Fetch menus
client.menus = new Collection();
const menuFiles = readdirSync(path.join(__dirname, ".", "menus")).filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts")
);

for (const file of menuFiles) {
    const menu = require(`./menus/${file}`);
    client.menus.set(menu.name, menu);
}

// Fetch modals
client.modals = new Collection();
const modalFiles = readdirSync(path.join(__dirname, ".", "modals")).filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts")
);

for (const file of modalFiles) {
    const modal = require(`./modals/${file}`);
    client.modals.set(modal.name, modal);
}

client.login(clientToken);
