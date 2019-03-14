"use strict";

const fs = require("fs");
const path = require("path");

const program = require("commander");
const { prittier } = require("../modules/prettier");

module.exports = ctx => {
    program
        .command("prettier")
        .option("-d, --dataDir <dataDir>", "", "datas")
        .option("-e, --ext <ext>", "", ".fixedbugs")
        .option("-c, --convert", "")
        .action(cmd => {
            const dirpath = path.resolve(ctx.appDir, cmd.dataDir);
            const ext = cmd.ext;
            const fileList = fs.readdirSync(dirpath);
            fileList.forEach(el => {
                const filepath = path.resolve(dirpath, el);
                if (el.endsWith(ext)) {
                    console.log(`[Prettier] ${el}`);
                    if (cmd.convert) {
                        prittier(filepath, {
                            convert: data => {
                                data.cache.forEach(el => {
                                    el.voters = JSON.parse(el.voters);
                                });
                                return data;
                            }
                        });
                    } else {
                        prittier(filepath);
                    }
                }
            });
        });
};