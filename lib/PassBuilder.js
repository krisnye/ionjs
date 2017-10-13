"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createFilter(filter) {
    if (typeof filter === 'function') {
        let name = filter.name;
        let enter = filter;
        let leave = null;
        let mutate = false;
        if (name.startsWith('_')) {
            leave = filter;
            enter = null;
            name = name.substring(1);
            if (name.startsWith('_')) {
                mutate = true;
                name = name.substring(1);
            }
        }
        let split = name.split('_');
        if (split.length <= 1)
            throw new Error("Name must have target prefix: " + name);
        let target = split.slice(0, -1);
        return { name, target, mutate, enter, leave };
    }
    else {
        if (!Array.isArray(filter.target))
            throw new Error(filter.name + " target is not an array: " + filter.target);
        return filter;
    }
}
const AllNodeTargetType = "Node";
function createPass(filters, options = {}) {
    let debug = options.debug !== false;
    filters = filters.map(f => createFilter(f));
    let mutators = filters.filter(f => f.mutate === true);
    let mutationTypes = {};
    for (let filter of mutators) {
        for (let target of filter.target) {
            if (target === AllNodeTargetType)
                throw new Error("Mutation filters cannot target all nodes: " + filter.name);
            if (mutationTypes[target] != null)
                throw new Error("Mutation filters operate on same type: " + mutationTypes[target] + " and " + filter.name);
            mutationTypes[target] = filter.name;
        }
    }
    filters = filters.filter(f => f.mutate !== true).concat(mutators);
    let targetTypeMap = {};
    for (let filter of filters) {
        for (let target of filter.target) {
            let handlers = targetTypeMap[target];
            if (handlers == null)
                handlers = targetTypeMap[target] = { enters: [], leaves: [] };
            if (filter.enter) {
                filter.enter.filter = filter;
                handlers.enters.push(filter.enter);
            }
            if (filter.leave) {
                filter.leave.filter = filter;
                handlers.leaves.push(filter.leave);
            }
        }
    }
    let allHandler = targetTypeMap[AllNodeTargetType];
    if (allHandler != null) {
        for (let type in targetTypeMap) {
            if (type !== allHandler) {
                let handler = targetTypeMap[type];
                handler.enters = handler.enters.concat(allHandler.enters);
                handler.leaves = handler.leaves.concat(allHandler.leaves);
            }
        }
    }
    function getHandler(type) {
        return targetTypeMap[type] || targetTypeMap[AllNodeTargetType];
    }
    return {
        names: filters.map(f => f.name),
        enter: (node, ancestors, path) => {
            let type = node.type;
            let handler = getHandler(node.type);
            if (handler) {
                let { enters } = handler;
                for (let enter of enters) {
                    enter(node, ancestors, path);
                    if (debug) {
                        if (node.type !== type)
                            throw new Error("Enter filter cannot modify node type: " + enter.name);
                    }
                }
            }
        },
        leave: (node, ancestors, path) => {
            let handler = getHandler(node.type);
            if (handler) {
                let { leaves } = handler;
                for (let leave of leaves) {
                    let result = leave(node, ancestors, path);
                    if (result !== undefined) {
                        if (leave.filter.mutate !== true)
                            throw new Error("Filter mutated without setting mutate true: " + leave.filter.name);
                        return result;
                    }
                }
            }
        }
    };
}
exports.createPass = createPass;
//# sourceMappingURL=PassBuilder.js.map