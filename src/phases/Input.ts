import {traverse,remove,Visitor} from "../Traversal"
import toposort from "../toposort"
import * as escodegen from "escodegen"
import * as iot from "../IonAstTypes"
import * as common from "../common"

export function fail(node:any, message: string) {
    let error: any = new Error(message)
    let location = node.__location || node
    error.location = location
    throw error
}

export const passes = [
    []
]
