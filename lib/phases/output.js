"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common = require("../common");
const File_Write = (node) => {
    console.log('Writing ' + node.path);
    common.write(node.path + '.out', node.content, node.encoding);
};
exports.passes = [
    [File_Write]
];
//# sourceMappingURL=output.js.map