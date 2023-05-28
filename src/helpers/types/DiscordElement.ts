import { RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

interface DiscordElement {
    name: string;
    execute: AsyncGeneratorFunction;
}

export interface Command extends DiscordElement {
    data: RESTPostAPIApplicationCommandsJSONBody;
}

export interface Button extends DiscordElement {}

export interface Menu extends DiscordElement {}

export interface Modal extends DiscordElement {}
