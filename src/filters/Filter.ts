import {Message} from "eris";

export abstract class Filter {
    protected responseEnabled;

    constructor(responseEnabled: boolean = true) {
        this.responseEnabled = responseEnabled;
    }

    protected abstract filterCheck(msg: Message): boolean;

    public execute(msg: Message) {
        if (this.filterCheck(msg)) {
            msg.delete()
                .catch(console.log);
            if (this.responseEnabled === true) {
                this.sendResponse(msg)
            }
        }
    }

    protected toResponse(msg: Message) {
        return "Message got filtered";
    }

    private sendResponse(msg: Message): void {
        msg.channel.createMessage(this.toResponse(msg))
            .then(message => setTimeout(() => {
                message.delete()
                    .catch(console.log)
            }, 1000))
    }
}