import {CommandClient} from "eris";
import {Command} from "./commands/Command";
import {Echo} from "./commands/Echo";
import {BotChannelFilter} from "./filters/BotChannelFilter";
const Config = require("../config/config.json");

export class ImploBot {

    public bot: CommandClient;
    private commands;


    constructor() {
        this.commands = [];
        this.bot = new CommandClient(
            Config.token,
            {},
            {prefix: "."}
        );
    }

    public run() {
        this.initializeCommands();
        this.initializeFilters();

        return new Promise((resolve, reject) => {
            this.bot.connect().catch(reject);
            this.bot.on("ready", () => {
                console.log("connected");
                resolve();
            })
        })
    }

    private initializeCommands() {
        this.initializeCommand(new Echo());
    }

    private initializeCommand(command: Command) {
        this.bot.registerCommand(
            command.name,
            (msg, args) =>
                command.execute(msg, args)
        );
    }

    private initializeFilters() {
        this.initializeFilter(new BotChannelFilter())
    }

    private initializeFilter(filter: BotChannelFilter) {
        this.bot.on("messageCreate", msg => filter.filter(msg));
    }
}