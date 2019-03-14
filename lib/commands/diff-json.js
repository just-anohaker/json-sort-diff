"use strict";

const fs = require("fs");
const path = require("path");

const program = require("commander");

const { checkfiles, checkdir } = require("../modules/checker");

module.exports = ctx => {
    program
        .command("diffjson <dirs>")
        .description("Diff json files")
        .option("-e, --ext <ext>", "Configure diff file ext", ".fixedbugs")
        .option("-c, --convert", "Fix begin-bonus json format in cache[k].voters")
        .action((dirs, cmd) => {
            const dirList = dirs.split(",").map(val => val.trim());
            if (dirList.length <= 1) {
                const onlyDir = path.resolve(program.baseDir, dirList[0]);
                if (cmd.convert) {
                    checkdir(onlyDir, cmd.ext, {
                        convert: data => {
                            data.cache.forEach(el => {
                                el.voters = JSON.parse(el.voters);
                            });
                        }
                    });
                } else {
                    checkdir(onlyDir, cmd.ext)
                }
                return;
            }

            // console.log("dirlist:", dirList);
            const compDir = dirList[0];
            const rootDir = path.resolve(ctx.appDir);
            const fileList = fs.readdirSync(path.join(rootDir, compDir));
            fileList.forEach(el => {
                if (el.endsWith(cmd.ext)) {
                    const filepathList = [];
                    filepathList.push(path.join(rootDir, compDir, el));
                    for (let i = 1; i < dirList.length; i++) {
                        filepathList.push(path.join(rootDir, dirList[i], el));
                    }

                    // console.log("check:", el);
                    if (cmd.convert) {
                        checkfiles(filepathList, {
                            convert: data => {
                                data.cache.forEach(el => {
                                    el.voters = JSON.parse(el.voters);
                                });
                                return data;
                            }
                        });
                    } else {
                        checkfiles(filepathList);
                    }
                }
            });
        });
};