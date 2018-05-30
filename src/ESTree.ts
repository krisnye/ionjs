
export class Position {
    line: number
    column: number
    constructor(line:number, column: number) {
        this.line = line        // >= 1
        this.column = column    // >= 0
    }
}

export class SourceLocation {
    start: Position
    end: Position
    source: string | null
    constructor(start: Position, end: Position, source: string) {
        this.start = start
        this.end = end
        this.source = source
    }
}

export class Node {
    type: string
    location: SourceLocation | null = null
    constructor(properties?: any) {
        this.type = this.constructor.name
        if (properties != null) {
            for (const key in properties) {
                (this as any)[key] = properties[key]
            }
        }
    }
}

export interface Pattern extends Node {
}

export interface Expression extends Node {
}

export interface Statement extends Node {
}

export class Identifier extends Node implements Pattern {
    name: string
}

export class Literal extends Node implements Pattern {
    value: string | number | boolean | RegExp | null
}

export class BlockStatement extends Node implements Statement {
    body: Statement[]
}

export class Program extends Node {
    body: Statement[]
}

export class FunctionBody extends BlockStatement {
}

export class Function extends Node {
    id: Identifier
    params: Pattern[]
    body: FunctionBody
}

export class EmptyStatement extends Node implements Statement {
}

export class CallExpression extends Node implements Expression {
    callee: Expression
    arguments: Expression[]
}

export class ExpressionStatement extends Node implements Expression {
    expression: Expression
}

export class DebuggerStatement extends Node implements Statement {
}

export class ReturnStatement extends Node implements Statement {
    argument: Expression | null
}

export class BreakStatement extends Node implements Statement {
}

export class ContinueStatement extends Node implements Statement {
}

export class IfStatement extends Node implements Statement {
    test: Expression
    consequent: Statement
    alternate: Statement | null
}

export class ThrowStatement extends Node implements Statement {
    argument: Expression
}

export class CatchClause extends Node {
    param: Pattern
    body: BlockStatement
}

export class TryStatement extends Node implements Statement {
    block: BlockStatement
    handler: CatchClause | null
    finalizer: BlockStatement | null
}

export class WhileStatement extends Node implements Statement {
    test: Expression
    body: Statement
}

export class ForStatement extends Node implements Statement {
    init: VariableDeclaration | Expression | null
    test: Expression | null
    update: Expression | null
    body: Statement
}

export class ForInStatement extends Node implements Statement {
    left: VariableDeclaration | Pattern
    right: Expression
    body: Statement
}

export interface Declaration extends Statement {
}

export class FunctionDeclaration extends Node implements Declaration {
    test: Expression
    body: Statement
}

export class VariableDeclaration extends Node implements Declaration {
    declarations: VariableDeclarator[]
    kind: "var" | "let" | "const"
}

export class VariableDeclarator extends Node implements Declaration {
    id: Pattern
    init: Expression | null
}

export class ThisExpression extends Node implements Expression {
}

export class ArrayExpression extends Node implements Expression {
    elements: (Expression | null)[]
}

export class ObjectExpression extends Node implements Expression {
    properties: Property[]
}

export class Property extends Node implements Expression {
    key: Literal | Identifier
    value: Expression
    kind: "init" | "get" | "set"
}

export class FunctionExpression extends Function {
}

export enum UnaryOperator{"-", "+", "!", "~", "typeof", "void", "delete"}

export class UnaryExpression extends Node implements Expression {
    operator: UnaryOperator
    prefix: boolean
    argument: Expression
}

export enum UpdateOperator{"++", "--"}

export class UpdateExpression extends Node implements Expression {
    operator: UpdateOperator
    argument: Expression
    prefix: boolean
}

enum BinaryOperator {
    "==", "!=", "===", "!==",
    "<", "<=", ">", ">=",
    "<<", ">>", ">>>",
    "+", "-", "*", "/", "%",
    "|", "^", "&",
    "in", "instanceof",
    "||", "&&"
}

export class BinaryExpression extends Node implements Expression {
    operator: BinaryOperator
    left: Expression
    right: Expression
}

enum AssignmentOperator {
    "=",
    "+=", "-=",
    "*=", "/=", "%=",
    "<<=", ">>=", ">>>=",
    "|=", "^=", "&="
}

export class AssignmentExpression extends Node implements Expression {
    operator: AssignmentOperator
    left: Pattern | Expression
    right: Expression
}

export class MemberExpression extends Node implements Expression {
    object: Expression
    property: Expression
    computed: boolean
}

export class ConditionalExpression extends Node implements Expression {
    test: Expression
    alternate: Expression
    consequent: Expression
}

export class NewExpression extends Node implements Expression {
    callee: Expression
    arguments: Expression[]
}

////////////////////////////////////////////////////////////////////////////////
//  ES2015
////////////////////////////////////////////////////////////////////////////////

export class ModuleDeclaration extends Node {
}

export class ModuleSpecifier extends Node {
    local: Identifier
}

export class ImportDeclaration extends ModuleDeclaration {
    specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[]
    source: Literal
}

export class ImportSpecifier extends ModuleSpecifier {
    imported: Identifier
}

export class ImportDefaultSpecifier extends ModuleSpecifier {
}

export class ImportNamespaceSpecifier extends ModuleSpecifier {    
}

export class ExportNamedDeclaration extends ModuleDeclaration {
    declaration: Declaration | null
    specifiers: ExportSpecifier[]
    source: Literal | null
}

export class ExportDefaultDeclaration extends ModuleDeclaration {
    declaration: Declaration | Expression
}

export class ExportAllDeclaration extends ModuleDeclaration {
    source: Literal
}

export class ExportSpecifier extends ModuleSpecifier {
    exported: Identifier
}

////////////////////////////////////////////////////////////////////////////////
//  Custom Nodes
////////////////////////////////////////////////////////////////////////////////

export class Parameter extends Node {
    pattern: Pattern
    valueType: Type
}

export class ImportDeclarations extends Node {
    declarations: ImportSubDeclaration[]
}

export class ImportSubDeclaration extends Node {
    relative: number
    path: (Identifier | Literal)[]
    children: ImportSubDeclaration[] | null
    as: Identifier | null
}

////////////////////////////////////////////////////////////////////////////////
//  Types
////////////////////////////////////////////////////////////////////////////////

export interface Type extends Node {
}

export class TypeReference extends Node {
    id: Identifier
}
