"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const np = require("path");
function freeze(object, deep = true) {
    if (object != null && typeof object === 'object') {
        Object.freeze(object);
        if (deep) {
            for (let name in object) {
                freeze(object[name]);
            }
        }
    }
}
exports.freeze = freeze;
function read(file) {
    return fs.readFileSync(file, 'utf8');
}
exports.read = read;
function getFilesRecursive(directory, allFiles = []) {
    for (let file of fs.readdirSync(directory)) {
        let fullPath = np.join(directory, file);
        if (fs.statSync(fullPath).isFile()) {
            allFiles.push(fullPath);
        }
        else {
            getFilesRecursive(fullPath, allFiles);
        }
    }
    return allFiles;
}
exports.getFilesRecursive = getFilesRecursive;
function union(a, b) {
    let result = new Set();
    for (let e of a)
        result.add(e);
    for (let e of b)
        result.add(e);
    return result;
}
exports.union = union;
function intersection(a, b) {
    let result = new Set();
    for (let e of a) {
        if (b.has(e))
            result.add(e);
    }
    return result;
}
exports.intersection = intersection;
function difference(a, b) {
    let result = new Set();
    for (let e of a) {
        if (!b.has(e))
            result.add(e);
    }
    return result;
}
exports.difference = difference;
function exists(file) { return fs.existsSync(file); }
exports.exists = exists;
function makeDirectories(dir) {
    if (!exists(dir)) {
        makeDirectories(np.dirname(dir));
        fs.mkdirSync(dir);
    }
}
exports.makeDirectories = makeDirectories;
function write(file, content, encoding) {
    makeDirectories(np.dirname(file));
    if (content != null) {
        if (encoding === undefined && typeof content === 'string')
            encoding = 'utf8';
        fs.writeFileSync(file, content, { encoding });
    }
    else if (exists(file)) {
        fs.unlinkSync(file);
    }
}
exports.write = write;
//# sourceMappingURL=common.js.map