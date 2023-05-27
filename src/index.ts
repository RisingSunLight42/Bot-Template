import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { isClientExtend } from "./helpers/utils/isClientExtend";
require("dotenv").config();

const clientToken = process.env.CLIENT_TOKEN;

const client = new Client({
    intents: [],
});

const collectionsObject: {
    [type: string]: Collection<string, any> | undefined;
} = {
    commands: new Collection(),
    buttons: new Collection(),
    menus: new Collection(),
    modals: new Collection(),
};

for (let [type, value] of Object.entries(collectionsObject)) {
    const files = readdirSync(path.join(__dirname, ".", type)).filter(
        (file) => file.endsWith(".js") || file.endsWith(".ts")
    );
    for (const file of files) {
        const component = require(`./${type}/${file}`);
        if (type === "commands") value?.set(component.data.name, component);
        else value?.set(component.name, component);
    }
    collectionsObject[type] = value;
}
Object.assign(client, collectionsObject);

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

if (!isClientExtend(client))
    throw new Error(
        "Client object is not properly extended, one of the required property is missing."
    );
client.login(clientToken);
