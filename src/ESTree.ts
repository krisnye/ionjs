
class Position {
    line: number
    column: number
    constructor(line:number,column:number) {
        this.line = line        // >= 1
        this.column = column    // >= 0
    }
}

class SourceLocation {
    start: Position
    end: Position
    source: string | null
    constructor(start: Position, end: Position, source: string) {
        this.start = start
        this.end = end
        this.source = source
    }
}

class Node {
    type: string
    location: SourceLocation | null = null
    constructor(type: string) {
        this.type = type
    }
}

interface Pattern {
}

export class Identifier extends Node implements Pattern {
    name: string
    constructor({name}: {name:string}) {
        super("Identifier")
        this.name = name
    }
}

export const Literal = "Literal"
export const CallExpression = "CallExpression"
export const ExpressionStatement = "ExpressionStatement"
export const Program = "Program"
export const BlockStatement = "BlockStatement"
export const MemberExpression = "MemberExpression"
export const AssignmentExpression = "AssignmentExpression"
export const VariableDeclaration = "VariableDeclaration"
export const VariableDeclarator = "VariableDeclarator"
export const FunctionExpression = "FunctionExpression"
export const ReturnStatement = "ReturnStatement"
export const ObjectExpression = "ObjectExpression"
export const Property = "Property"
export const ThisExpression = "ThisExpression"