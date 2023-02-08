import { RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

interface DiscordElement {
    name: string;
    execute: AsyncGeneratorFunction;
}

export interface Command {
    data: RESTPostAPIApplicationCommandsJSONBody;
    execute: AsyncGeneratorFunction;
}

export interface Button extends DiscordElement {}

export interface Menu extends DiscordElement {}

export interface Modal extends DiscordElement {}
