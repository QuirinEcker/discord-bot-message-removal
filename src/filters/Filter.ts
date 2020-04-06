import {Message} from "eris";

export abstract class Filter {
    private readonly responseEnabled;
    private readonly responseDeletion;
    private readonly responseDeletionTime;

    protected constructor(
        responseEnabled: boolean = true,
        responseDeletion: boolean = true,
        responseDeletionTime: number = 5000
    ) {
        this.responseEnabled = responseEnabled;
        this.responseDeletion = responseDeletion;
        this.responseDeletionTime = responseDeletionTime;
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

    protected toResponse(msg: Message): string {
        return "Message got filtered";
    }

    private sendResponse(msg: Message): void {
        msg.channel.createMessage(this.toResponse(msg))
            .then(message => {
                if (this.responseDeletion === true) {
                    setTimeout(() => {
                        message.delete()
                            .catch(console.log)
                    }, this.responseDeletionTime)
                }
            })
    }
}