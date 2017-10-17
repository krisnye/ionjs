import {traverse,remove,Visitor} from "../Traversal"
import toposort from "../toposort"
import * as escodegen from "escodegen"
import * as iot from "../IonAstTypes"
import * as common from "../common"
import * as est from "../ESTree"

export function fail(node:any, message: string) {
    let error: any = new Error(message)
    let location = node.__location || node
    error.location = location
    throw error
}

function __ImportDeclarations_toJavascript(node:est.ImportDeclarations) {
    let importDeclarations: est.ImportDeclaration[] = []
    function getPath(relative: number, basePath: (est.Identifier | est.Literal)[], path: (est.Identifier | est.Literal)[]) {
        let result = []
        if (relative > 0) {
            if (relative == 1) {
                result.push(new est.Literal({value:'.'}))
            }
            else {
                for (let i = 1; i < relative; i++) {
                    result.push(new est.Literal({value:'..'}))
                }
            }
        }
        result.push(...basePath)
        result.push(...path)
        return result
    }
    function mergePathToLiteral(path: (est.Identifier | est.Literal)[]) {
        return new est.Literal({value:path.map((node:any) => node.name || node.value).join('/')})
    }
    function add(path: (est.Literal | est.Identifier)[], declarations:est.ImportSubDeclaration[]) {
        for (const declaration of declarations) {
            let localPath = getPath(declaration.relative, path, declaration.path)
            if (declaration.as != null || declaration.children == null) {
                let id = declaration.as || declaration.path[declaration.path.length - 1]
                if (!(id instanceof est.Identifier))
                    fail(declaration, "'as' identifier required when importing literal module name")
                importDeclarations.push(
                    new est.ImportDeclaration(
                        {
                            specifiers: [new est.ImportDefaultSpecifier({local:id})],
                            source: mergePathToLiteral(localPath)
                        }
                    )
                )
            }
            if (Array.isArray(declaration.children)) {
                add(localPath, declaration.children)
            }
        }
    }
    add([], node.declarations)
    return importDeclarations
}

export const passes = [
    [__ImportDeclarations_toJavascript]
]
