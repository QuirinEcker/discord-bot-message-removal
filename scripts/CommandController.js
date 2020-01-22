const Command = require("./Command");

class CommandController {

    constructor() {
        this.echo = {
            parameter: 1,
            command: (msg, parameter) => {
                msg.channel.send(parameter[0]);
            }
        }
    }

    convertToCommand(msg, commandString) {
        return new Command(msg, commandString);
    }

    validate(command) {
        try {
            if (this[command.baseCommand].parameter === command.parameter.length) {
                command.commandFunc = this[command.baseCommand].command;
                command.valid = true;
            } else {
                throw "invalid parameters";
            }
        } catch (e) {
            console.log(e)
        }
    }
}

CommandController.instance = new CommandController();

module.exports = CommandController;