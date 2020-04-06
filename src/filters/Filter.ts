import {Message} from "eris";

export abstract class Filter {
    protected abstract check(msg: Message): boolean;

    public execute(msg: Message) {
        if (this.check(msg)) {
            msg.delete()
                .catch(console.log);
            this.sendRespond(msg)
        }
    }

    protected sendRespond(msg: Message) {
        msg.channel.createMessage("Message got filtered")
            .catch(console.log);
    }
}