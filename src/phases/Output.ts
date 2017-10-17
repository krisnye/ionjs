import * as common from "../common"
import * as escodegen from "escodegen"
import {fail} from "./Input"

const Assembly_ModulesToJavascriptFiles = (node:any) => {
    let files: any[] = node.files = []
    for (const name in node.modules) {
        let program = node.modules[name]
        files.push({type:"File", language:"javascript", content:program})
    }
    delete node.modules
}

const File_CompileJavascript = (node:any) => {
    if (node.language == "javascript") {
        node.content = escodegen.generate(node.content)
    }
}

const File_Write = (node:any) => {
    console.log('Writing ' + node.path)
    // This was causing nodemon to run over and over; so I added the .out extension to keep it from restarting.
    common.write(node.path + '.out', node.content, node.encoding)
}

export const passes = [
    [Assembly_ModulesToJavascriptFiles, File_CompileJavascript]//, File_Write]
]
