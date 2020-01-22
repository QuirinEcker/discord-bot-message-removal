const Command = require("./Command");

class CommandController {

    convertToCommand(commandString) {
        return new Command(commandString);
    }

    runCommand(command) {

    }

}

CommandController.instance = new CommandController();

module.exports = CommandController;