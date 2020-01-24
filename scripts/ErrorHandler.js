class ErrorHandler {

    constructor() {
        this.TypeError = (err, msg, cmd) => {
            msg.channel.send(`Unknown command ${cmd.baseCommand}`);
        }

        this.CommandException = (err, msg, cmd) => {
            msg.channel.send(err.message);
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