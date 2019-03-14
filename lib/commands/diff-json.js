"use strict";

const fs = require("fs");
const path = require("path");

const program = require("commander");

const { checkfiles } = require("../modules/checker");

module.exports = () => {
    program
        .command("diffjson <dirs>")
        .option("-e, --ext <ext>", "", ".fixedbugs")
        .description("")
        .action((dirs, cmd) => {
            const dirList = dirs.split(",").map(val => val.trim());
            if (dirList.length <= 1) {
                console.log("[DiffJson] less directory input.");
                return;
            }

            // console.log("dirlist:", dirList);
            const compDir = dirList[0];
            const rootDir = path.resolve(program.baseDir);
            const fileList = fs.readdirSync(path.join(rootDir, compDir));
            fileList.forEach(el => {
                if (el.endsWith(cmd.ext)) {
                    const filepathList = [];
                    filepathList.push(path.join(rootDir, compDir, el));
                    for (let i = 1; i < dirList.length; i++) {
                        filepathList.push(path.join(rootDir, dirList[i], el));
                    }

                    // console.log("check:", el);
                    checkfiles(filepathList);
                }
            })
        });
};