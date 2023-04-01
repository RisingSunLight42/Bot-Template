import { ActivityType } from "discord.js";
import { ClientExtend } from "../types/ClientExtend";

/**
 *  Function to change the status of the bot
 * @param client bot client to apply the status
 */
export const statusChange = (client: ClientExtend) => {
    client.user?.setPresence({
        status: "online",
        activities: [
            {
                name: "son repo GitHub",
                type: ActivityType.Watching,
                url: "https://github.com/RisingSunLight42/Bot-Template",
            },
        ],
    });
};
