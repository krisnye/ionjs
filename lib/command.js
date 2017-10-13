#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const np = require("path");
const Compiler_1 = require("./Compiler");
const HtmlLogger = require("./HtmlLogger");
var args = process.argv.slice(2);
let path = args[0];
let input = np.join(process.cwd(), path, "src");
let output = np.join(process.cwd(), path, "lib");
let logger = HtmlLogger.create(np.join(process.cwd(), path, "lib/passes.html"));
let compiler = new Compiler_1.default({ input, output, logger });
compiler.compile();
//# sourceMappingURL=command.js.map