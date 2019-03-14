"use strict";

const fs = require("fs");
const path = require("path");
const program = require("commander");

function main() {
    const context = {};
    context.appDir = path.resolve(__dirname);

    program
        .version("1.0.0");

    const commandsDir = path.resolve(__dirname, "lib", "commands");
    const commandFiles = fs.readdirSync(commandsDir);
    commandFiles.forEach(el => {
        if (el.endsWith(".js")) {
            const CommandFunc = require(path.resolve(commandsDir, el));
            CommandFunc(context);
        }
    });

    program.parse(process.argv);
}

main();