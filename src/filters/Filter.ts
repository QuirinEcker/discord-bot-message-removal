import {Message} from "eris";

export abstract class Filter {
    protected respond: string;

    protected constructor(respnd: string) {
        this.respond = respnd;
    }

    protected abstract check(msg: Message): boolean;

    public execute(msg: Message) {
        if (this.check(msg)) {
            msg.delete();
            this.sendRespond(msg)
        }
    }

    protected async sendRespond(msg: Message) {
        await msg.channel.createMessage(this.respond)
    }
}