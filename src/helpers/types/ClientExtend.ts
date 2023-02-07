import {
    Client,
    Collection,
    RESTPostAPIApplicationCommandsJSONBody,
} from "discord.js";

export interface ClientExtend extends Client {
    commands?: Collection<
        string,
        {
            data: RESTPostAPIApplicationCommandsJSONBody;
            execute: AsyncGeneratorFunction;
        }
    >;
    buttons?: Collection<
        string,
        {
            name: string;
            execute: AsyncGeneratorFunction;
        }
    >;
    menus?: Collection<
        string,
        {
            name: string;
            execute: AsyncGeneratorFunction;
        }
    >;
    modals?: Collection<
        string,
        {
            name: string;
            execute: AsyncGeneratorFunction;
        }
    >;
}
