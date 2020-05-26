import {Filter} from "./Filter";
import {Message, TextChannel} from "eris";

const filterConf = require("../../config/ServerConfigs.json");
const config = require("../../config/config.json");

export class CommandFilter extends Filter{
    constructor() {
        super(true);
    }

    protected filterCheck(msg: Message): boolean {
        if (msg.channel instanceof TextChannel) {
            const sessionConfig = filterConf[msg.channel.guild.id];
            const notInWhiteListChannel = !sessionConfig.botWhiteList.includes(
                sessionConfig.botWhiteList.filter(
                    (channel: string) => msg.channel.id === channel
                )[0]);

            const isCommand = sessionConfig.bots.includes(
                sessionConfig.bots.filter(
                    (bot: any) => bot.prefix === msg.content.charAt(0)
                )[0]);

            return isCommand && notInWhiteListChannel;
        } else {
            msg.channel.createMessage(`This should not have happened. Please report to <@${config.maintainer}>`)
                .catch(console.log);
            return true;
        }
    }

    protected toResponse(msg: Message): string {
        if (msg.channel instanceof TextChannel) {
            return `Bot Commands belong in the <#${filterConf[msg.channel.guild.id].botChannelID}>`
        } else throw new Error('not a text channel! This should not happen!')
    }
}