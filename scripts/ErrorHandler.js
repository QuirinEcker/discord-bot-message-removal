class ErrorHandler {

    constructor() {
        this.TypeError = (err, msg, cmd) => {
            msg.channel.send(`Unknown command ${cmd.baseCommand}`)
                .then(message => {
                    setTimeout(() => {
                        message.delete()
                            .catch(console.log)
                    }, 10000)
                })
        }

        this.CommandException = (err, msg, cmd) => {
            msg.channel.send(err.message)
                .then(message => {
                    setTimeout(() => {
                        message.delete()
                            .catch(console.log)
                    }, 10000)
                })
        }

        this.Error = (err, msg, cmd) => {
            console.log(err.message);
        }
    }

    handle(err, msg, cmd) {
        this[err.name](err, msg, cmd);
    }
}

ErrorHandler.instance = new ErrorHandler();
module.exports = ErrorHandler;