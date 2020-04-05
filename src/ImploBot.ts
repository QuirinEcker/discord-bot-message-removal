import {CommandClient} from "eris";
import {Command} from "./commands/Command";
import {Echo} from "./commands/Echo";
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
        this.initializeCommand("echo", new Echo(), 1, Number.MAX_SAFE_INTEGER);
    }

    private initializeCommand(
        name : string,
        command : Command,
        minParam : number,
        maxParam : number
    ) {
        this.bot.registerCommand(name, (msg, args) => {
            if (args.length >= minParam && args.length <= maxParam) {
                command.execute(msg, args);
            } else {
                console.log("Invalid Arguments");
            }
        })
    }
}