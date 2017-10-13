"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common = require("./common");
const Traversal_1 = require("./Traversal");
const PassBuilder_1 = require("./PassBuilder");
const parser = require("./parser")();
const input = require("./phases/input");
const defaultPhases = [input];
const defaultPasses = [].concat(...defaultPhases.map((x) => x.passes));
const defaultLogger = (names, ast) => {
    console.log('==================================================================');
    if (names != null) {
        console.log('// ', names);
        console.log(JSON.stringify(ast, null, 2));
    }
};
class Compiler {
    constructor(options) {
        this.passes = defaultPasses;
        this.input = options.input;
        this.output = options.output;
        this.logger = options.logger || defaultLogger;
        this.filenamesToSource = {};
    }
    compile() {
        let assembly = this.parseFiles();
        this.logger(["input"], assembly);
        try {
            for (let pass of this.passes) {
                let visitor = PassBuilder_1.createPass(pass);
                assembly = Traversal_1.traverse(assembly, visitor);
                this.logger(visitor.names, assembly);
            }
        }
        catch (e) {
            let location = e.location;
            if (location == null)
                throw e;
            let { filename } = location;
            let source = this.filenamesToSource[filename];
            let error = parser.getError(e.message, location, source, location, filename);
            console.log(error.message);
        }
        finally {
            this.logger(["output"], assembly);
            this.logger();
        }
    }
    parseFiles() {
        let filenames = common.getFilesRecursive(this.input);
        let modules = {};
        for (let file of filenames) {
            if (file.endsWith(".ion") && file.indexOf('ast') < 0) {
                let filename = file.substring(this.input.length + 1);
                let path = filename.substring(0, filename.length - ".ion".length).replace(/[\/\\]/g, '.');
                let source = common.read(file);
                this.filenamesToSource[filename] = source;
                let module = parser.parse(source, filename);
                modules[path] = module;
            }
        }
        return { type: 'Assembly', options: { input: this.input, output: this.output }, modules };
    }
}
exports.default = Compiler;
//# sourceMappingURL=Compiler.js.map