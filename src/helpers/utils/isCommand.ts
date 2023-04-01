import { Command } from "../types/DiscordElement";

export const isCommand = (object: any): object is Command => {
    return "data" in object;
};
