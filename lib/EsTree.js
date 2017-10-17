"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Position {
    constructor(line, column) {
        this.line = line;
        this.column = column;
    }
}
exports.Position = Position;
class SourceLocation {
    constructor(start, end, source) {
        this.start = start;
        this.end = end;
        this.source = source;
    }
}
exports.SourceLocation = SourceLocation;
class Node {
    constructor(properties) {
        this.location = null;
        this.type = this.constructor.name;
        if (properties != null) {
            for (const key in properties) {
                this[key] = properties[key];
            }
        }
    }
}
exports.Node = Node;
class Identifier extends Node {
}
exports.Identifier = Identifier;
class Literal extends Node {
}
exports.Literal = Literal;
class BlockStatement extends Node {
}
exports.BlockStatement = BlockStatement;
class Program extends Node {
}
exports.Program = Program;
class FunctionBody extends BlockStatement {
}
exports.FunctionBody = FunctionBody;
class Function extends Node {
}
exports.Function = Function;
class EmptyStatement extends Node {
}
exports.EmptyStatement = EmptyStatement;
class CallExpression extends Node {
}
exports.CallExpression = CallExpression;
class ExpressionStatement extends Node {
}
exports.ExpressionStatement = ExpressionStatement;
class DebuggerStatement extends Node {
}
exports.DebuggerStatement = DebuggerStatement;
class ReturnStatement extends Node {
}
exports.ReturnStatement = ReturnStatement;
class BreakStatement extends Node {
}
exports.BreakStatement = BreakStatement;
class ContinueStatement extends Node {
}
exports.ContinueStatement = ContinueStatement;
class IfStatement extends Node {
}
exports.IfStatement = IfStatement;
class ThrowStatement extends Node {
}
exports.ThrowStatement = ThrowStatement;
class CatchClause extends Node {
}
exports.CatchClause = CatchClause;
class TryStatement extends Node {
}
exports.TryStatement = TryStatement;
class WhileStatement extends Node {
}
exports.WhileStatement = WhileStatement;
class ForStatement extends Node {
}
exports.ForStatement = ForStatement;
class ForInStatement extends Node {
}
exports.ForInStatement = ForInStatement;
class FunctionDeclaration extends Node {
}
exports.FunctionDeclaration = FunctionDeclaration;
class VariableDeclaration extends Node {
}
exports.VariableDeclaration = VariableDeclaration;
class VariableDeclarator extends Node {
}
exports.VariableDeclarator = VariableDeclarator;
class ThisExpression extends Node {
}
exports.ThisExpression = ThisExpression;
class ArrayExpression extends Node {
}
exports.ArrayExpression = ArrayExpression;
class ObjectExpression extends Node {
}
exports.ObjectExpression = ObjectExpression;
class Property extends Node {
}
exports.Property = Property;
class FunctionExpression extends Function {
}
exports.FunctionExpression = FunctionExpression;
var UnaryOperator;
(function (UnaryOperator) {
    UnaryOperator[UnaryOperator["-"] = 0] = "-";
    UnaryOperator[UnaryOperator["+"] = 1] = "+";
    UnaryOperator[UnaryOperator["!"] = 2] = "!";
    UnaryOperator[UnaryOperator["~"] = 3] = "~";
    UnaryOperator[UnaryOperator["typeof"] = 4] = "typeof";
    UnaryOperator[UnaryOperator["void"] = 5] = "void";
    UnaryOperator[UnaryOperator["delete"] = 6] = "delete";
})(UnaryOperator = exports.UnaryOperator || (exports.UnaryOperator = {}));
class UnaryExpression extends Node {
}
exports.UnaryExpression = UnaryExpression;
var UpdateOperator;
(function (UpdateOperator) {
    UpdateOperator[UpdateOperator["++"] = 0] = "++";
    UpdateOperator[UpdateOperator["--"] = 1] = "--";
})(UpdateOperator = exports.UpdateOperator || (exports.UpdateOperator = {}));
class UpdateExpression extends Node {
}
exports.UpdateExpression = UpdateExpression;
var BinaryOperator;
(function (BinaryOperator) {
    BinaryOperator[BinaryOperator["=="] = 0] = "==";
    BinaryOperator[BinaryOperator["!="] = 1] = "!=";
    BinaryOperator[BinaryOperator["==="] = 2] = "===";
    BinaryOperator[BinaryOperator["!=="] = 3] = "!==";
    BinaryOperator[BinaryOperator["<"] = 4] = "<";
    BinaryOperator[BinaryOperator["<="] = 5] = "<=";
    BinaryOperator[BinaryOperator[">"] = 6] = ">";
    BinaryOperator[BinaryOperator[">="] = 7] = ">=";
    BinaryOperator[BinaryOperator["<<"] = 8] = "<<";
    BinaryOperator[BinaryOperator[">>"] = 9] = ">>";
    BinaryOperator[BinaryOperator[">>>"] = 10] = ">>>";
    BinaryOperator[BinaryOperator["+"] = 11] = "+";
    BinaryOperator[BinaryOperator["-"] = 12] = "-";
    BinaryOperator[BinaryOperator["*"] = 13] = "*";
    BinaryOperator[BinaryOperator["/"] = 14] = "/";
    BinaryOperator[BinaryOperator["%"] = 15] = "%";
    BinaryOperator[BinaryOperator["|"] = 16] = "|";
    BinaryOperator[BinaryOperator["^"] = 17] = "^";
    BinaryOperator[BinaryOperator["&"] = 18] = "&";
    BinaryOperator[BinaryOperator["in"] = 19] = "in";
    BinaryOperator[BinaryOperator["instanceof"] = 20] = "instanceof";
    BinaryOperator[BinaryOperator["||"] = 21] = "||";
    BinaryOperator[BinaryOperator["&&"] = 22] = "&&";
})(BinaryOperator || (BinaryOperator = {}));
class BinaryExpression extends Node {
}
exports.BinaryExpression = BinaryExpression;
var AssignmentOperator;
(function (AssignmentOperator) {
    AssignmentOperator[AssignmentOperator["="] = 0] = "=";
    AssignmentOperator[AssignmentOperator["+="] = 1] = "+=";
    AssignmentOperator[AssignmentOperator["-="] = 2] = "-=";
    AssignmentOperator[AssignmentOperator["*="] = 3] = "*=";
    AssignmentOperator[AssignmentOperator["/="] = 4] = "/=";
    AssignmentOperator[AssignmentOperator["%="] = 5] = "%=";
    AssignmentOperator[AssignmentOperator["<<="] = 6] = "<<=";
    AssignmentOperator[AssignmentOperator[">>="] = 7] = ">>=";
    AssignmentOperator[AssignmentOperator[">>>="] = 8] = ">>>=";
    AssignmentOperator[AssignmentOperator["|="] = 9] = "|=";
    AssignmentOperator[AssignmentOperator["^="] = 10] = "^=";
    AssignmentOperator[AssignmentOperator["&="] = 11] = "&=";
})(AssignmentOperator || (AssignmentOperator = {}));
class AssignmentExpression extends Node {
}
exports.AssignmentExpression = AssignmentExpression;
class MemberExpression extends Node {
}
exports.MemberExpression = MemberExpression;
class ConditionalExpression extends Node {
}
exports.ConditionalExpression = ConditionalExpression;
class NewExpression extends Node {
}
exports.NewExpression = NewExpression;
class ModuleDeclaration extends Node {
}
exports.ModuleDeclaration = ModuleDeclaration;
class ModuleSpecifier extends Node {
}
exports.ModuleSpecifier = ModuleSpecifier;
class ImportDeclaration extends ModuleDeclaration {
}
exports.ImportDeclaration = ImportDeclaration;
class ImportSpecifier extends ModuleSpecifier {
}
exports.ImportSpecifier = ImportSpecifier;
class ImportDefaultSpecifier extends ModuleSpecifier {
}
exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
class ImportNamespaceSpecifier extends ModuleSpecifier {
}
exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
class ExportNamedDeclaration extends ModuleDeclaration {
}
exports.ExportNamedDeclaration = ExportNamedDeclaration;
class ExportDefaultDeclaration extends ModuleDeclaration {
}
exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
class ExportAllDeclaration extends ModuleDeclaration {
}
exports.ExportAllDeclaration = ExportAllDeclaration;
class ExportSpecifier extends ModuleSpecifier {
}
exports.ExportSpecifier = ExportSpecifier;
class Parameter extends Node {
}
exports.Parameter = Parameter;
class ImportDeclarations extends Node {
}
exports.ImportDeclarations = ImportDeclarations;
class ImportSubDeclaration extends Node {
    constructor() {
        super(...arguments);
        this.children = null;
        this.as = null;
    }
}
exports.ImportSubDeclaration = ImportSubDeclaration;
class TypeReference extends Node {
}
exports.TypeReference = TypeReference;
//# sourceMappingURL=ESTree.js.map