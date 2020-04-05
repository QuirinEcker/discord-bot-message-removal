import {CommandClient} from "eris";
const Config = require("../config/config.json");

export class ImploBot {

    public bot: CommandClient;
    private commands;


    constructor() {
        this.commands = [];
        this.bot = new CommandClient(
            Config.token,
            {},
            {prefix: "§"}
        );
    }

    run() {
        this.initializeCommands();
        this.bot.connect().catch(console.log);

        return new Promise((resolve) => {
            this.bot.on("ready", () => {
                console.log("connected");
                resolve();
            })
        })
    }

    private initializeCommands() {

    }
}