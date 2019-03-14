"use strict";

const fs = require("fs");

module.exports = filepath => {
    let jsonify = null;
    try {
        const filedata = fs.readFileSync(filepath);
        jsonify = JSON.parse(filedata);
    } catch (error) {
        console.log("[File2Json] ", error);
    }

    return jsonify;
};