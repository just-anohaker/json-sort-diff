"use strict";

const jsonabc = require("jsonabc");
const jsdiff = require("diff");

module.exports = (oldJsonify, newJsonify) => {
    let success = true, added = [], removed = [];
    try {
        const prettierOldJsonify = jsonabc.sortObj(oldJsonify, false);
        const prettierNewJsonify = jsonabc.sortObj(newJsonify, false);
        const diffChanges = jsdiff.diffJson(prettierOldJsonify, prettierNewJsonify);
        diffChanges.forEach(el => {
            if (el.added) {
                success = false;
                added.push(el.value);
                return;
            }
            if (el.removed) {
                success = false;
                removed.push(el.value);
                return;
            }
        });
    } catch (error) {
        console.log("[Check]", error);
    }

    return { success, added, removed };
};