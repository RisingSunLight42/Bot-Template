import { Client, Collection } from "discord.js";
import { Button, Command, Menu, Modal } from "./DiscordElement";

export interface ClientExtend extends Client {
    commands?: Collection<string, Command>;
    buttons?: Collection<string, Button>;
    menus?: Collection<string, Menu>;
    modals?: Collection<string, Modal>;
}
