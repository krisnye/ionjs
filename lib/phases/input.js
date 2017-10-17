"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Traversal_1 = require("../Traversal");
function fail(node, message) {
    let error = new Error(message);
    let location = node.__location || node;
    error.location = location;
    throw error;
}
exports.fail = fail;
function __ImportDeclarations_toJavascript(node) {
    console.log('strip');
    return Traversal_1.remove;
}
exports.passes = [
    [__ImportDeclarations_toJavascript]
];
//# sourceMappingURL=input.js.map