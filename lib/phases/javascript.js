"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const escodegen = require("escodegen");
const jst = require("../JsAstTypes");
const __VariableDeclaration_ToJavascript = (node) => {
    return {
        type: jst.VariableDeclaration,
        kind: node.kind === 'let' ? 'const' : 'var',
        declarations: node.declarations
    };
};
const __IdDeclaration_IdReference_Id_ToIdentifier = (node) => {
    node.type = jst.Identifier;
};
const Assembly_ModulesToJavascriptFiles = (node) => {
    node.files = Object.keys(node.modules).map((name) => {
        return {
            type: "File",
            language: "javascript",
            path: node.options.output + '/' + name + '.js',
            content: {
                type: jst.Program,
                body: [
                    {
                        type: jst.ExpressionStatement,
                        expression: {
                            type: jst.CallExpression,
                            arguments: [],
                            callee: {
                                type: jst.FunctionExpression,
                                params: [],
                                body: {
                                    type: jst.BlockStatement,
                                    body: [
                                        {
                                            type: jst.VariableDeclaration,
                                            kind: 'const',
                                            declarations: [
                                                {
                                                    type: jst.VariableDeclarator,
                                                    id: { type: jst.Identifier, name },
                                                    init: {
                                                        type: jst.AssignmentExpression,
                                                        left: {
                                                            type: jst.MemberExpression,
                                                            object: { type: jst.ThisExpression },
                                                            property: { type: jst.Identifier, name }
                                                        },
                                                        operator: '=',
                                                        right: node.modules[name]
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
            }
        };
    });
    delete node.modules;
};
const __Module_ToJavascript = (node, ancestors, path) => {
    let name = path[path.length - 1];
    return {
        type: jst.CallExpression,
        callee: {
            type: jst.FunctionExpression,
            params: [],
            body: {
                type: jst.BlockStatement,
                body: (function () {
                    let statements = [...node.declarations];
                    if (Array.isArray(node.exports)) {
                        for (let exportDeclaration of node.exports) {
                            statements.push(exportDeclaration);
                        }
                        statements.push({
                            type: jst.ReturnStatement,
                            argument: {
                                type: jst.ObjectExpression,
                                properties: node.exports.map((declaration) => {
                                    return declaration.declarations.map((declarator) => {
                                        return {
                                            type: jst.Property,
                                            kind: "init",
                                            shorthand: true,
                                            key: declarator.id,
                                            value: declarator.id
                                        };
                                    });
                                }).reduce(((a, b) => a.concat(b)), [])
                            }
                        });
                    }
                    else {
                        let exportDeclaration = node.exports;
                        statements.push(exportDeclaration);
                        statements.push({
                            type: jst.ReturnStatement,
                            argument: exportDeclaration.id
                        });
                    }
                    return statements;
                }())
            }
        },
        arguments: []
    };
};
const __ClassDeclaration_ToJavascript = (node) => {
    return {
        type: 'FunctionDeclaration',
        id: node.id,
        params: node.variables.map((declaration) => {
            if (declaration.kind === 'let')
                return [];
            return declaration.declarations.map((declarator) => {
                if (declarator.init != null) {
                    return {
                        type: 'AssignmentPattern',
                        left: declarator.id,
                        right: declarator.init
                    };
                }
                else {
                    return declarator.id;
                }
            });
        }).reduce(((a, b) => a.concat(b)), []),
        body: {
            type: 'BlockStatement',
            body: node.variables.map((declaration) => {
                if (declaration.kind !== 'let') {
                    return declaration.declarations.map((declarator) => {
                        return {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'AssignmentExpression',
                                left: {
                                    type: 'MemberExpression',
                                    object: { type: 'ThisExpression' },
                                    property: declarator.id
                                },
                                operator: '=',
                                right: declarator.id
                            }
                        };
                    });
                }
                return {
                    type: declaration.type,
                    kind: declaration.kind,
                    declarations: declaration.declarations.map((declarator) => {
                        declarator.init = {
                            type: 'AssignmentExpression',
                            left: {
                                type: 'MemberExpression',
                                object: { type: 'ThisExpression' },
                                property: declarator.id
                            },
                            operator: '=',
                            right: declarator.init
                        };
                        return declarator;
                    })
                };
            }).reduce(((a, b) => a.concat(b)), []),
        }
    };
};
const _ForInStatement_ToJavascript = (node) => {
    node.type = "ForOfStatement";
};
const File_CompileJavascript = (node) => {
    if (node.language == "javascript") {
        node.content = escodegen.generate(node.content);
    }
};
const __AssignmentStatement_ToJavascript = (node) => {
    return {
        type: 'ExpressionStatement',
        location: node.location,
        expression: {
            type: 'AssignmentExpression',
            left: node.left,
            operator: '=',
            right: node.right
        }
    };
};
const operatorMap = {
    and: "&&",
    or: "||",
    not: "!",
    xor: "^"
};
const BinaryExpression_UnaryExpression_ToJavascript = (node) => {
    node.operator = operatorMap[node.operator] || node.operator;
};
const __CallExpression_ToNewExpression = (node) => {
    let name = node.callee.name;
    if (name != null && name[0] === name[0].toUpperCase()) {
        node.type = 'NewExpression';
    }
    return node;
};
exports.passes = [
    [__CallExpression_ToNewExpression],
    [_ForInStatement_ToJavascript],
    [__AssignmentStatement_ToJavascript],
    [BinaryExpression_UnaryExpression_ToJavascript],
    [__ClassDeclaration_ToJavascript],
    [__Module_ToJavascript],
    [__VariableDeclaration_ToJavascript, __IdDeclaration_IdReference_Id_ToIdentifier],
    [Assembly_ModulesToJavascriptFiles],
    [File_CompileJavascript]
];
//# sourceMappingURL=javascript.js.map