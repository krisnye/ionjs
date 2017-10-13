"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Position {
    constructor(line, column) {
        this.line = line;
        this.column = column;
    }
}
class SourceLocation {
    constructor(start, end, source) {
        this.start = start;
        this.end = end;
        this.source = source;
    }
}
class Node {
    constructor(type) {
        this.location = null;
        this.type = type;
    }
}
class Identifier extends Node {
    constructor({ name }) {
        super("Identifier");
        this.name = name;
    }
}
exports.Identifier = Identifier;
exports.Literal = "Literal";
exports.CallExpression = "CallExpression";
exports.ExpressionStatement = "ExpressionStatement";
exports.Program = "Program";
exports.BlockStatement = "BlockStatement";
exports.MemberExpression = "MemberExpression";
exports.AssignmentExpression = "AssignmentExpression";
exports.VariableDeclaration = "VariableDeclaration";
exports.VariableDeclarator = "VariableDeclarator";
exports.FunctionExpression = "FunctionExpression";
exports.ReturnStatement = "ReturnStatement";
exports.ObjectExpression = "ObjectExpression";
exports.Property = "Property";
exports.ThisExpression = "ThisExpression";
//# sourceMappingURL=ESTree.js.map