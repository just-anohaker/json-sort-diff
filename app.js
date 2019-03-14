"use strict";

const fs = require("fs");
const path = require("path");
const program = require("commander");

function main() {
    const context = {};
    context.appDir = path.resolve(__dirname);

    program
        .version("1.0.0")

    const commandFiles = fs.readdirSync(path.resolve(__dirname, "lib", "commands"));
    commandFiles.forEach(el => {
        if (el.endsWith(".js")) {
            const CommandFunc = require(path.resolve(__dirname, "lib", "commands", el));
            CommandFunc(context);
        }
    })

    program.parse(process.argv);
}

main();