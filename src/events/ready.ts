import { deployGlobal, deployGestion, recupFichier } from "../deployCommands";
import { ClientExtend } from "../helpers/types/ClientExtend";
import { CronJob } from "cron";
import { statusChange } from "../helpers/utils/statusChange";
require("dotenv").config();

const guildGestionId = process.env.GUILD_GESTION_ID;

if (!guildGestionId)
    throw new Error("Un des IDs dans le fichier ready est manquant !");

module.exports = {
    name: "ready",
    once: true,
    execute(client: ClientExtend) {
        console.log(`🟢 Je suis allumée !`);

        statusChange(client);
        new CronJob(
            "0 30 * * * *",
            function () {
                statusChange(client);
            },
            null,
            true,
            "Europe/Paris"
        );

        //* Push les commandes suivant si les serveurs recherchés sont présents et si c'est le bot principal
        const liste_commandes = recupFichier();
        client.guilds.fetch().then(function (result) {
            const guild_liste_snowflake = result.map((objet) => objet.id); // Récupère les ids de guild du bot dans une liste
            if (guild_liste_snowflake.includes(guildGestionId)) {
                // S'il y a le serveur de gestion, push les commandes de gestion
                deployGestion(liste_commandes[0]);
            }
        });
        deployGlobal(liste_commandes[1]);
    },
};
