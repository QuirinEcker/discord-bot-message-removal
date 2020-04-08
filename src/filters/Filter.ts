import {Message} from "eris";

export abstract class Filter {
    private readonly responseEnabled;
    private readonly responseDeletion;
    private readonly responseDeletionTime;
    private static messageWhiteList = new Array<Promise<Message>>();

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
            if (!this.responsesIncludeMessageID(msg.id)) {
                msg.delete()
                    .catch(console.log);
            } else {
                if (this.responseEnabled === true) {
                    this.deletePromiseWithSameMessageID(msg.id)
                }
            }
            if (this.responseEnabled === true) {
                Filter.messageWhiteList.push(this.sendResponse(msg));
            }
        }
    }

    protected toResponse(msg: Message): string {
        return "Message got filtered";
    }

    private sendResponse(msg: Message): Promise<Message> {
        return msg.channel.createMessage(this.toResponse(msg))
            .then(message => {
                if (this.responseDeletion === true) {
                    setTimeout(() => {
                        message.delete()
                            .catch(console.log)
                    }, this.responseDeletionTime)
                }

                return message;
            })
    }

    private responsesIncludeMessageID(id: string): boolean {
        const filterResult: Array<Promise<Message>> = Filter.messageWhiteList.filter(async promise => {
            const message: Message = await promise;
            return id === message.id;
        });

        return filterResult.length > 0;
    }

    private deletePromiseWithSameMessageID(id: string): void {
        const filterResult: Array<Promise<Message>> = Filter.messageWhiteList.filter(async promise => {
            const message: Message = await promise;
            return id === message.id;
        });

        Filter.messageWhiteList.splice(Filter.messageWhiteList.indexOf(filterResult[0]), 1);
    }
}