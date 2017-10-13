"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fail(node, message) {
    let error = new Error(message);
    let location = node.__location || node;
    error.location = location;
    throw error;
}
exports.fail = fail;
exports.passes = [
    []
];
//# sourceMappingURL=input.js.map