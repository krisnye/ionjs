"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Traversal_1 = require("../Traversal");
const idChars = new Set("_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
const validId = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
const encodeLiteralIdentifier = (name) => {
    let result = ['__id_'];
    for (let c of name) {
        if (idChars.has(c)) {
            result.push(c);
        }
        else {
            result.push('_', c.charCodeAt(0).toString());
        }
    }
    result.push('_');
    return result.join('');
};
const Identifier_EnsureValidName = (node) => {
    if (!validId.test(node.name)) {
        node.name = encodeLiteralIdentifier(node.name);
    }
};
const __UnionType_IntersectionType_ConstrainedType_LiteralType_FunctionType_Remove = (node) => {
    return Traversal_1.remove;
};
exports.passes = [
    [Identifier_EnsureValidName],
    [__UnionType_IntersectionType_ConstrainedType_LiteralType_FunctionType_Remove]
];
//# sourceMappingURL=cleanup.js.map