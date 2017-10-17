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
    console.log('strip')
    return remove
}

export const passes = [
    [__ImportDeclarations_toJavascript]
]
