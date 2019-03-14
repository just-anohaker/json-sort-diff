"use strict";

const fs = require("fs");
const path = require("path");

const file2json = require("../utils/file2json");
const diff = require("../utils/diff");

const _check = (file1, file2, opts = {}) => {
    let oldJsonify = file2json(file1);
    let newJsonify = file2json(file2);
    if (opts.convert) {
        oldJsonify = opts.convert(oldJsonify);
        newJsonify = opts.convert(newJsonify);
    }
    const diffResult = diff(oldJsonify, newJsonify);

    // const oldfilename = path.basename(file1);
    // const newfilename = path.basename(file2);
    const oldfilename = file1, newfilename = file2;
    if (diffResult.success) {
        /// Success
        // console.log(`(${oldfilename} <=> ${newfilename}) Success`);
        return;
    }

    /// Failure
    console.log(`(${oldfilename} <=> ${newfilename}) Failure`);
    // diffResult.added.forEach(el => {
    //     console.log("\t[ Added ]", el);
    // });
    // diffResult.removed.forEach(el => {
    //     console.log("\t[Removed]", el);
    // });
}

const checkdir = (dataDir, ext, opts = {}) => {
    const filelist = fs.readdirSync(dataDir);
    const fixedbugsFiles = [];
    filelist.forEach(el => {
        if (el.endsWith(ext)) {
            fixedbugsFiles.push(path.resolve(dataDir, el));
        }
    });

    let compFile = null;
    fixedbugsFiles.forEach(el => {
        if (compFile == null) {
            compFile = el;
            return;
        }

        _check(compFile, el, opts);
    });
};

const checkfiles = (files, opts = {}) => {
    if (files.length <= 1) {
        return;
    }

    let compFile = null;
    files.forEach(el => {
        if (compFile == null) {
            compFile = el;
            return;
        }

        _check(compFile, el, opts);
    });
};

module.exports = {
    checkdir,
    checkfiles
};