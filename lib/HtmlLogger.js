"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const np = require("path");
const common = require("./common");
const jsondiffpatch = require('jsondiffpatch').create({});
const remove__prefixedProperties = (key, value) => key.startsWith("__") ? undefined : value;
function create(outputPath) {
    let outputToStyle = np.relative(np.dirname(outputPath), "node_modules/jsondiffpatch/public/formatters-styles/html.css");
    let passes = [];
    return function (names, ast) {
        if (names != null) {
            passes.push([names, JSON.parse(JSON.stringify(ast, remove__prefixedProperties))]);
        }
        else {
            let previous = null;
            let html = [
                `
<html>
    <head>
        <link rel="stylesheet" href="${outputToStyle}" />
        <style>
        :root {
            --border: solid 1px gray;
        }
        body {
            display: flex;
            flex-direction: row;
            font-size: 12px;
            font-family: Monaco;
        }
        article {
            border: var(--border);
        }
        article {
            border: var(--border);
            padding: 0px;
        }
        article:not(:last-child) {
            border-right: none;
        }
        article header {
            color: rgb(150,150,150);
            background-color: rgb(45,45,45);
            font-weight: bold;
            padding: 8px;
            margin: 0px;
            border-bottom: var(--border);
        }
        article header:hover {
            display: flex;
            flex-direction: column;
        }
        article p {
            padding: 0px 8px;
            white-space: pre;
        }
        ins {
            color: lightgreen;
            text-decoration: none;
        }
        del {
            color: red;
            text-decoration: none;
        }
        </style>
    </head>
    <body onclick="location.reload(true)">
`,
                ...passes.map(([names, ast]) => {
                    let delta = previous != null ? jsondiffpatch.diff(previous, ast) : null;
                    let html = require('jsondiffpatch/src/formatters/html').format(delta || {}, previous || ast);
                    previous = ast;
                    return `
        <article>
            <header><span>${names.join(', </span><span>')}</span></header>
            <p>${html.replace(/\\n/g, '<br>')}</p>
        </article>
    `;
                }),
                `
    </body>
</html>
`
            ].join('');
            common.write(outputPath, html);
            console.log('debug written to ', outputPath);
        }
    };
}
exports.create = create;
//# sourceMappingURL=HtmlLogger.js.map