const Command = require("./Command");
const CommandException = require("./CommandException");
const DataBase = require("./DataBase");

class CommandController {

    constructor() {
        this.echo = {
            parameter: {
                min: 1,
                max: "n"
            },
            command: (msg, parameter) => {
                let text = "";

                parameter.forEach(parameter => {
                    text += parameter + " ";
                });

                msg.channel.send(text);
            }
        }

        this.binaryPotato = {
            parameter: {
                min: 1,
                max: 1
            },
            command: (msg, parameter) => {
                DataBase.instance.doSQL("CREATE TABLE bpMember (" +
                    "discord_id VARCHAR(20)," +
                    "whitelist_name VARCHAR(20)," +
                    "CONSTRAINT PK_bpMember PRIMARY KEY (discord_id)" +
                    ")")
            }
        }
    }

    convertToCommand(msg, commandString) {
        return new Command(msg, commandString);
    }

    validate(command) {
        let invalidParameters = false;

        try {
            if (
                this[command.baseCommand].parameter.max === 'n' &&
                command.parameter.length >= this[command.baseCommand].parameter.min
            ) {
                command.commandFunc = this[command.baseCommand].command;
                command.valid = true;
            }else if (
                command.parameter.length >= this[command.baseCommand].parameter.min &&
                command.parameter.length <= this[command.baseCommand].parameter.max
            ) {
                command.commandFunc = this[command.baseCommand].command;
                command.valid = true;
            } else {
                invalidParameters = true;
            }
        } catch (e) {
            command.valid = false;
        }

        if (invalidParameters) {
            throw new CommandException("Invalid Parameters");
        }
    }
}

CommandController.instance = new CommandController();

module.exports = CommandController;