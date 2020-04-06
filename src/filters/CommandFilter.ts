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
            return sessionConfig.bots.includes(
                sessionConfig.bots.filter(
                    bot => bot.prefix === msg.content.charAt(0)
                )[0]);
        } else {
            msg.channel.createMessage(`This should not have happened. Please report to <@${config.maintainer}>`)
                .catch(console.log);
            return true;
        }
    }

    protected sendRespond(msg: Message) {
        if (msg.channel instanceof TextChannel) {
            msg.channel.createMessage(
                `Bot Commands belong in the <#${filterConf[msg.channel.guild.id].botChannelID}>`
            ).catch(console.log);
        }
    }
}