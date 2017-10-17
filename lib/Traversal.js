"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function flatten(array) {
    let flattened = array.reduce((a, b) => {
        if (Array.isArray(b))
            a.splice(a.length, 0, ...b);
        else
            a.push(b);
        return a;
    }, []);
    array.splice(0, array.length, ...flattened);
}
function isObjectNode(object) {
    return object != null && typeof object.type === 'string';
}
exports.remove = Object.freeze([]);
function traverseChildren(container, visitor, isArray, ancestors, path) {
    ancestors.push(container);
    let hasArrays = false;
    for (let name in container) {
        if (name[0] !== '_') {
            path.push(name);
            let child = container[name];
            let childResult = traverse(child, visitor, ancestors, path);
            if (childResult !== child && childResult !== undefined) {
                let isChildArray = Array.isArray(childResult);
                if (isChildArray) {
                    console.log('child array');
                    if (!isArray) {
                        if (childResult.length > 0)
                            throw new Error("Cannot return array with length > 0 unless container is array");
                        else
                            console.log('childResult is undefined');
                        childResult = undefined;
                    }
                    else {
                        console.log('set hasArrays to true');
                        hasArrays = true;
                    }
                }
                container[name] = childResult;
            }
            path.pop();
        }
    }
    ancestors.pop();
    if (hasArrays)
        container = flatten(container);
}
function traverse(node, visitor, ancestors = [], path = []) {
    if (node == null)
        return node;
    let { enter, leave } = visitor;
    let isObject = typeof node === 'object';
    let isNode = isObjectNode(node);
    let isArray = Array.isArray(node);
    if (isNode && enter != null)
        enter(node, ancestors, path);
    if (isNode || isArray || isObject)
        traverseChildren(node, visitor, isArray, ancestors, path);
    let result = undefined;
    if (isNode && leave != null)
        result = leave(node, ancestors, path);
    return result != null ? result : node;
}
exports.traverse = traverse;
//# sourceMappingURL=Traversal.js.map