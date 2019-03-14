"use strict";

const fs = require("fs");
const path = require("path");

const _ = require("lodash");
const jsonabc = require("jsonabc");

const prittier = (filepath, opts = {}) => {
    let done = true, error = null;
    try {
        const filedata = fs.readFileSync(filepath);
        let jsonify = JSON.parse(filedata);
        if (opts.convert && _.isFunction(opts.convert)) {
            jsonify = opts.convert(jsonify);
        }
        jsonify = jsonabc.sortObj(jsonify, false)
        fs.writeFileSync(filepath);
    } catch (error) {
        done = false;
        error = error.toString();
    }
    return { done, error };
};

module.exports = {
    prittier
};