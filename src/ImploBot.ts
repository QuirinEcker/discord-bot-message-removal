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

    public run() {
        this.initializeCommands();

        return new Promise((resolve, reject) => {
            this.bot.connect().catch(reject);
            this.bot.on("ready", () => {
                console.log("connected");
                resolve();
            })
        })
    }

    private initializeCommands() {
        this.bot.registerCommand("echo", (msg, args) => {
            if (args.length === 0) {
                return "Invalid input"
            }

            return args.join(" ");
        })
    }
}