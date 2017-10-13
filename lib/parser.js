module.exports = exports = (function() {
var runtime
try { runtime = require('pegs') } catch (e) {}
if (runtime == null) { runtime = require('../runtime') }
var Context = runtime.Context
var Parser = runtime.Parser
var Grammar = runtime.Grammar
var Position = runtime.Position
var Rule = runtime.Rule
var SourceLocation = runtime.SourceLocation
var Terminal = runtime.Terminal
var CharRange = runtime.CharRange
var Regex = runtime.Regex
var Reference = runtime.Reference
var Any = runtime.Any
var Sequence = runtime.Sequence
var Choice = runtime.Choice
var Repeat = runtime.Repeat
var Optional = runtime.Optional
var NotPredicate = runtime.NotPredicate
var AndPredicate = runtime.AndPredicate
var StringValue = runtime.StringValue
var Extract = runtime.Extract
var Group = runtime.Group
var Increment = runtime.Increment
var Action = runtime.Action
var CustomPredicate = runtime.CustomPredicate

    return function(options) {
        if (options == null)
            options = {}
        var parser
        var location = function() {
            return parser.context.location()
        }
        var text = function() {
            let loc = location()
            return parser.context.source.substring(loc.start.offset, loc.end.offset)
        }



    function node(type, ...values) {
        let result = Object.assign({type, __location:location()}, ...values.reverse())
        //  we set the type both before (show it shows first in enumeration)
        //  and last so it overwrites any previous type in args
        result.type = type
        return result
    }

    function buildBinaryExpression(head, tail) {
        return tail.reduce(
            (left, [,operator,,right]) => node("BinaryExpression", {operator, left, right})
            ,head
        )
    }



       parser = new Parser(new Grammar([new Action(new Sequence(new Optional(new Reference("EOL")), new Repeat(new Reference("Statement")).setName("statements"), new Reference("EOL"), new Reference("EOF")), (
function(__context, __values) {
let statements = __values[1];
 return node("Program", {sourceType:"module", body:statements}) })).setName("Module"),

new Action(new Sequence(new Reference("Id").setName("head"), new Repeat(new Action(new Sequence(new Terminal("."), new Reference("Id").setName("value")), (
function(__context, __values) {
let value = __values[1];
return value;}))).setName("tail")), (
function(__context, __values) {
let head = __values[0];
let tail = __values[1];
 return [head, ...tail] })).setName("ModulePath"),

new Action(new Sequence(new Reference("Indent"), new Repeat(new Action(new Sequence(new Reference("Dent"), new Reference("ImportDeclaration").setName("value")), (
function(__context, __values) {
let value = __values[1];
return value;})), 1).setName("value"), new Reference("Outdent")), (
function(__context, __values) {
let value = __values[1];
return value;})).setName("SubImports"),

new Action(new Sequence(new Reference("ModulePath").setName("path"), new Optional(new Action(new Sequence(new Reference("_"), new Reference("AsToken"), new Reference("_"), new Reference("IdDeclaration").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("as"), new Choice(new Action(new Sequence(new Terminal(".*"), new Reference("EOL")), (
function(__context, __values) {
;
 return true })), new Action(new Sequence(new Reference("EOL"), new Optional(new Reference("SubImports")).setName("value")), (
function(__context, __values) {
let value = __values[1];
return value;}))).setName("children")), (
function(__context, __values) {
let path = __values[0];
let as = __values[1];
let children = __values[2];
 return node("ImportDeclaration", {path,children,id: as || path[path.length-1] }) })).setName("ImportDeclaration"),

new Action(new Sequence(new Reference("ImportToken"), new Reference("EOL"), new Reference("SubImports").setName("value")), (
function(__context, __values) {
let value = __values[2];
return value;})).setName("ImportDeclarations"),

new Choice(new Action(new Sequence(new Reference("ExportToken"), new Reference("_"), new Reference("Declaration").setName("declaration")), (
function(__context, __values) {
let declaration = __values[2];
 return declaration })), new Action(new Sequence(new Reference("ExportToken"), new Reference("EOL"), new Reference("Indent"), new Repeat(new Action(new Sequence(new Reference("Dent"), new Reference("Declaration").setName("value")), (
function(__context, __values) {
let value = __values[1];
return value;})), 1).setName("declarations"), new Reference("Outdent")), (
function(__context, __values) {
let declarations = __values[3];
 return declarations }))).setName("ExportStatement"),

new Choice(new Reference("Declaration"), new Reference("AssignmentStatement"), new Reference("ExpressionStatement"), new Reference("IfStatement"), new Reference("ForInStatement"), new Reference("ForOfStatement"), new Reference("ReturnStatement"), new Reference("WhileStatement"), new Reference("ExportStatement")).setName("Statement"),

new Choice(new Reference("ImportDeclaration"), new Reference("TypeDeclaration"), new Reference("ClassDeclaration"), new Reference("VariableDeclaration")).setName("Declaration"),

new Action(new Sequence(new Reference("OutlineExpression").setName("expression")), (
function(__context, __values) {
let expression = __values[0];
 return node("ExpressionStatement", {expression}) })).setName("ExpressionStatement"),

new Action(new Sequence(new Reference("TypeToken"), new Reference("_"), new Reference("IdDeclaration").setName("id"), new Reference("_"), new Terminal("="), new Reference("_"), new Reference("Type").setName("value"), new Reference("EOL")), (
function(__context, __values) {
let id = __values[2];
let value = __values[6];
 return node('TypeDeclaration', {id, value}) })).setName("TypeDeclaration"),

new Choice(new Reference("VarToken"), new Reference("LetToken"), new Reference("MutToken")).setName("VariableKind"),

new Action(new Sequence(new Reference("Pattern").setName("id"), new Reference("_"), new Optional(new Action(new Sequence(new Terminal(":"), new Reference("_"), new Reference("Type").setName("value")), (
function(__context, __values) {
let value = __values[2];
return value;}))).setName("valueType"), new Reference("_"), new Optional(new Action(new Sequence(new Terminal("="), new Reference("_"), new Reference("InlineExpression").setName("value")), (
function(__context, __values) {
let value = __values[2];
return value;}))).setName("init")), (
function(__context, __values) {
let id = __values[0];
let valueType = __values[2];
let init = __values[4];
 return node("VariableDeclarator", {id, valueType, init}) })).setName("InlineVariableDeclarator"),

new Action(new Sequence(new Reference("VariableKind").setName("kind"), new Reference("_"), new Reference("InlineVariableDeclarator").setName("declarator")), (
function(__context, __values) {
let kind = __values[0];
let declarator = __values[2];
 return node("VariableDeclaration", {kind, declarations:[declarator] }) })).setName("InlineVariableDeclaration"),

new Choice(new Action(new Sequence(new Reference("Pattern").setName("id"), new Reference("EOL"), new Reference("Indent"), new Optional(new Action(new Sequence(new Reference("Dent"), new Terminal(":"), new Reference("_"), new Reference("Type").setName("value"), new Reference("EOL")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("valueType"), new Optional(new Action(new Sequence(new Reference("Dent"), new Terminal("="), new Reference("_"), new Reference("OutlineExpression").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("init"), new Reference("Outdent")), (
function(__context, __values) {
let id = __values[0];
let valueType = __values[3];
let init = __values[4];
 return node('VariableDeclarator', {id, valueType, init}) })), new Action(new Sequence(new Reference("InlineVariableDeclarator").setName("value"), new Reference("EOL")), (
function(__context, __values) {
let value = __values[0];
return value;}))).setName("OutlineVariableDeclarator"),

new Choice(new Action(new Sequence(new Reference("VariableKind").setName("kind"), new Reference("EOL"), new Reference("Indent"), new Repeat(new Action(new Sequence(new Reference("Dent"), new Reference("OutlineVariableDeclarator").setName("value")), (
function(__context, __values) {
let value = __values[1];
return value;})), 1).setName("declarations"), new Reference("Outdent")), (
function(__context, __values) {
let kind = __values[0];
let declarations = __values[3];
 return node("VariableDeclaration", {kind, declarations} ) })), new Action(new Sequence(new Reference("VariableKind").setName("kind"), new Reference("_"), new Reference("Pattern").setName("id"), new Reference("_"), new Optional(new Action(new Sequence(new Terminal(":"), new Reference("_"), new Reference("Type").setName("value")), (
function(__context, __values) {
let value = __values[2];
return value;}))).setName("valueType"), new Reference("_"), new Terminal("="), new Reference("_"), new Reference("OutlineExpression").setName("init")), (
function(__context, __values) {
let kind = __values[0];
let id = __values[2];
let valueType = __values[4];
let init = __values[8];
 return node("VariableDeclaration", {kind, declarations:[node('VariableDeclarator', {id, valueType, init})]}) })), new Action(new Sequence(new Reference("InlineVariableDeclaration").setName("value"), new Reference("EOL")), (
function(__context, __values) {
let value = __values[0];
return value;}))).setName("OutlineVariableDeclaration"),

new Reference("OutlineVariableDeclaration").setName("ClassVariableDeclaration"),

new Reference("OutlineVariableDeclaration").setName("VariableDeclaration"),

new Action(new Sequence(new Reference("EOL"), new Reference("Indent"), new Repeat(new Reference("OutlineProperty"), 1).setName("value"), new Reference("Outdent")), (
function(__context, __values) {
let value = __values[2];
return value;})).setName("VariableMetaProperties"),

new Action(new Sequence(new Reference("Id").setName("key"), new Reference("_"), new Terminal(":"), new Reference("_"), new Reference("OutlineExpression").setName("value")), (
function(__context, __values) {
let key = __values[0];
let value = __values[4];
 return node("Property", {key,value}) })).setName("OutlineProperty"),

new Terminal("=").setName("AssignmentOperator"),

new Action(new Sequence(new Reference("Pattern").setName("left"), new Reference("_"), new Reference("AssignmentOperator"), new Reference("_"), new Reference("OutlineExpression").setName("right")), (
function(__context, __values) {
let left = __values[0];
let right = __values[4];
 return node("AssignmentStatement", {left, right}) })).setName("AssignmentStatement"),

new Action(new Sequence(new Reference("EOL"), new Reference("Indent"), new Repeat(new Action(new Sequence(new Reference("Dent"), new Reference("Statement").setName("value")), (
function(__context, __values) {
let value = __values[1];
return value;})), 1).setName("body"), new Reference("Outdent")), (
function(__context, __values) {
let body = __values[2];
 return node("BlockStatement", {body}) })).setName("BlockStatement"),

new Action(new Sequence(new Reference("ForToken"), new Reference("_"), new Reference("Pattern").setName("left"), new Optional(new Action(new Sequence(new Reference("_"), new Terminal(","), new Reference("_"), new Reference("Pattern").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("index"), new Reference("_"), new Reference("InToken"), new Reference("_"), new Reference("InlineExpression").setName("right"), new Reference("BlockStatement").setName("body")), (
function(__context, __values) {
let left = __values[2];
let index = __values[3];
let right = __values[7];
let body = __values[8];
 return node("ForInStatement", {left, index, right, body} ) })).setName("ForInStatement"),

new Action(new Sequence(new Reference("ForToken"), new Reference("_"), new Reference("Pattern").setName("left"), new Optional(new Action(new Sequence(new Reference("_"), new Terminal(","), new Reference("_"), new Reference("Pattern").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("value"), new Reference("_"), new Reference("OfToken"), new Reference("_"), new Reference("InlineExpression").setName("right"), new Reference("BlockStatement").setName("body")), (
function(__context, __values) {
let left = __values[2];
let value = __values[3];
let right = __values[7];
let body = __values[8];
 return node("ForOfStatement", {left, value, right, body} ) })).setName("ForOfStatement"),

new Action(new Sequence(new Reference("WhileToken"), new Reference("_"), new Reference("InlineExpression").setName("test"), new Reference("BlockStatement").setName("body")), (
function(__context, __values) {
let test = __values[2];
let body = __values[3];
 return node("WhileStatement", {test,body}) })).setName("WhileStatement"),

new Action(new Sequence(new Reference("IfToken"), new Reference("_"), new Reference("InlineExpression").setName("test"), new Reference("BlockStatement").setName("consequent"), new Optional(new Action(new Sequence(new Reference("Dent"), new Reference("ElseToken"), new Reference("_"), new Choice(new Reference("BlockStatement"), new Reference("IfStatement")).setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("alternate")), (
function(__context, __values) {
let test = __values[2];
let consequent = __values[3];
let alternate = __values[4];
 return node("IfStatement", {test, consequent, alternate}) })).setName("IfStatement"),

new Action(new Sequence(new Reference("ReturnToken"), new Reference("_"), new Optional(new Reference("InlineExpression")).setName("argument"), new Reference("EOL")), (
function(__context, __values) {
let argument = __values[2];
 return node("ReturnStatement", {argument}) })).setName("ReturnStatement"),

new Choice(new Reference("IdDeclaration"), new Reference("ArrayPattern"), new Reference("ObjectPattern")).setName("Pattern"),

new Choice(new Action(new Sequence(new Terminal("["), new Reference("_"), new Reference("RestElement").setName("element"), new Reference("_"), new Terminal("]")), (
function(__context, __values) {
let element = __values[2];
 return node("ArrayPattern", {elements:[element]}) })), new Action(new Sequence(new Terminal("["), new Reference("_"), new Optional(new Reference("Pattern")).setName("head"), new Repeat(new Action(new Sequence(new Reference("_"), new Terminal(","), new Reference("_"), new NotPredicate(new Terminal(".")), new Optional(new Reference("Pattern")).setName("value")), (
function(__context, __values) {
let value = __values[4];
return value;}))).setName("tail"), new Reference("_"), new Optional(new Action(new Sequence(new Terminal(","), new Reference("_"), new Reference("RestElement").setName("value")), (
function(__context, __values) {
let value = __values[2];
return value;}))).setName("rest"), new Reference("_"), new Terminal("]")), (
function(__context, __values) {
let head = __values[2];
let tail = __values[3];
let rest = __values[5];

        let elements = [head || null, ...tail.map((x) => x || null)]
        if (rest)
            elements.push(rest)
        return node("ArrayPattern", {elements})
    }))).setName("ArrayPattern"),

new Action(new Sequence(new Terminal("..."), new Reference("Pattern").setName("argument")), (
function(__context, __values) {
let argument = __values[1];
 return node("RestElement", {argument}) })).setName("RestElement"),

new Action(new Sequence(new Terminal("{"), new Reference("_"), new Reference("AssignmentProperty").setName("head"), new Repeat(new Action(new Sequence(new Reference("_"), new Terminal(","), new Reference("AssignmentProperty").setName("value")), (
function(__context, __values) {
let value = __values[2];
return value;}))).setName("tail"), new Reference("_"), new Terminal("}")), (
function(__context, __values) {
let head = __values[2];
let tail = __values[3];
 return node("ObjectPattern", {properties:[head, ...tail]}) })).setName("ObjectPattern"),

new Action(new Sequence(new Reference("Id").setName("key"), new Optional(new Action(new Sequence(new Reference("_"), new Terminal(":"), new Reference("_"), new Reference("Pattern").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("value")), (
function(__context, __values) {
let key = __values[0];
let value = __values[1];
 return node("Property", {key, value:value || node("IdDeclaration", key), kind:"init", shorthand:value == null} ) })).setName("AssignmentProperty"),

new Action(new Sequence(new Choice(new Reference("ClassToken"), new Reference("StructToken")).setName("kind"), new Reference("_"), new Reference("IdDeclaration").setName("id"), new Optional(new Reference("TypeParameters")).setName("typeParameters"), new Reference("_"), new Optional(new Reference("Extends")).setName("baseClasses"), new Reference("EOL"), new Reference("Indent"), new Repeat(new Action(new Sequence(new Reference("Dent"), new Reference("ClassVariableDeclaration").setName("value")), (
function(__context, __values) {
let value = __values[1];
return value;}))).setName("variables"), new Reference("Outdent")), (
function(__context, __values) {
let kind = __values[0];
let id = __values[2];
let typeParameters = __values[3];
let baseClasses = __values[5];
let variables = __values[8];
 return node("ClassDeclaration", {kind, id, typeParameters, baseClasses:baseClasses || [], variables}) })).setName("ClassDeclaration"),

new Action(new Sequence(new Terminal("<"), new Reference("_"), new Reference("Parameter").setName("head"), new Repeat(new Action(new Sequence(new Reference("_"), new Terminal(","), new Reference("_"), new Reference("Parameter").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("tail"), new Reference("_"), new Terminal(">")), (
function(__context, __values) {
let head = __values[2];
let tail = __values[3];
 return [head, ...tail] })).setName("TypeParameters"),

new Action(new Sequence(new Reference("ExtendsToken"), new Reference("_"), new Reference("TypeReference").setName("head"), new Repeat(new Action(new Sequence(new Reference("_"), new Terminal(","), new Reference("_"), new Reference("TypeReference").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("tail")), (
function(__context, __values) {
let head = __values[2];
let tail = __values[3];
 return [head, ...tail] })).setName("Extends"),

new Choice(new Reference("FunctionType"), new Reference("UnionType"), new Action(new Sequence(new Terminal("("), new Reference("_"), new Reference("Type").setName("value"), new Reference("_"), new Terminal(")")), (
function(__context, __values) {
let value = __values[2];
return value;}))).setName("Type"),

new Action(new Sequence(new Reference("IntersectionType").setName("head"), new Repeat(new Action(new Sequence(new Reference("_"), new Terminal("|"), new Reference("_"), new Reference("IntersectionType").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("tail")), (
function(__context, __values) {
let head = __values[0];
let tail = __values[1];
 return tail.length == 0 ? head : node('UnionType', {types:[head, ...tail]}) })).setName("UnionType"),

new Action(new Sequence(new Reference("ConstrainedType").setName("head"), new Repeat(new Action(new Sequence(new Reference("_"), new Terminal("&"), new Reference("_"), new Reference("ConstrainedType").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("tail")), (
function(__context, __values) {
let head = __values[0];
let tail = __values[1];
 return tail.length == 0 ? head : node('IntersectionType', {types:[head, ...tail]}) })).setName("IntersectionType"),

new Choice(new Action(new Sequence(new Reference("TypeReference").setName("baseType"), new Optional(new Action(new Sequence(new Reference("_"), new Reference("WhereToken"), new Reference("_"), new Reference("InlineExpression").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("constraint")), (
function(__context, __values) {
let baseType = __values[0];
let constraint = __values[1];
 return constraint ? node('ConstrainedType', {baseType,constraint}) : baseType })), new Reference("LiteralType")).setName("ConstrainedType"),

new Action(new Sequence(new Reference("Literal").setName("value")), (
function(__context, __values) {
let value = __values[0];
 return node('LiteralType', value) })).setName("LiteralType"),

new Action(new Sequence(new Reference("FunctionParameters").setName("params"), new Reference("_"), new Terminal("->"), new Reference("_"), new Reference("Type").setName("returnType")), (
function(__context, __values) {
let params = __values[0];
let returnType = __values[4];
 return node("FunctionType", {params, returnType}) })).setName("FunctionType"),

new Action(new Sequence(new Terminal("<"), new Reference("_"), new Reference("Type").setName("head"), new Repeat(new Action(new Sequence(new Reference("_"), new Terminal(","), new Reference("_"), new Reference("Type").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("tail"), new Reference("_"), new Terminal(">")), (
function(__context, __values) {
let head = __values[2];
let tail = __values[3];
 return [head, ...tail] })).setName("TypeArguments"),

new Choice(new Action(new Sequence(new Reference("IdReference").setName("id"), new Reference("_"), new Optional(new Reference("TypeArguments")).setName("args")), (
function(__context, __values) {
let id = __values[0];
let args = __values[2];
 return node("TypeReference", id, {arguments:args}) })), new Action(new Sequence(new Terminal("["), new Reference("_"), new Reference("Type").setName("type"), new Terminal("*"), new Reference("_"), new Terminal("]")), (
function(__context, __values) {
let type = __values[2];
 return node("TypeReference", {name:"Array", arguments:[type]}) })), new Action(new Sequence(new Terminal("["), new Reference("_"), new Reference("Type").setName("head"), new Repeat(new Action(new Sequence(new Reference("_"), new Terminal(","), new Reference("_"), new Reference("Type").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;})), 1).setName("tail"), new Reference("_"), new Terminal("]")), (
function(__context, __values) {
let head = __values[2];
let tail = __values[3];

        //  no actual pattern yet, just types
        let types = [head, ...tail]
        return node("TypeReference", {name:"Array", arguments:[node("UnionType", {types})], pattern:types})
    }))).setName("TypeReference"),

new Choice(new Terminal("+"), new Terminal("-"), new Action(new Sequence(new Terminal("not ")), (
function(__context, __values) {
;
 return "!" }))).setName("UnaryOperator"),

new Choice(new Reference("MemberExpression"), new Action(new Sequence(new Reference("UnaryOperator").setName("operator"), new Reference("_"), new Reference("MemberExpression").setName("argument")), (
function(__context, __values) {
let operator = __values[0];
let argument = __values[2];
 return node("UnaryExpression", {operator,argument})}))).setName("UnaryExpression"),

new Choice(new Terminal("^"), new Terminal("<<"), new Terminal(">>")).setLabel("operator").setName("ExponentiationOperator"),

new Action(new Sequence(new Reference("UnaryExpression").setName("left"), new Optional(new Action(new Sequence(new Reference("_"), new Reference("ExponentiationOperator").setName("operator"), new Reference("_"), new Reference("ExponentiationExpression").setName("right")), (
function(__context, __values) {
let operator = __values[1];
let right = __values[3];
return {operator,right}}))).setName("right")), (
function(__context, __values) {
let left = __values[0];
let right = __values[1];
 return right ? node("BinaryExpression", {left}, right) : left })).setName("ExponentiationExpression"),

new Choice(new Terminal("*"), new Terminal("/"), new Terminal("%")).setLabel("operator").setName("MultiplicativeOperator"),

new Action(new Sequence(new Reference("ExponentiationExpression").setName("head"), new Repeat(new Group(new Sequence(new Reference("_"), new Reference("MultiplicativeOperator"), new Reference("_"), new Reference("ExponentiationExpression")))).setName("tail")), (
function(__context, __values) {
let head = __values[0];
let tail = __values[1];
 return buildBinaryExpression(head, tail) })).setName("MultiplicativeExpression"),

new Choice(new Terminal("+"), new Terminal("-")).setLabel("operator").setName("AdditiveOperator"),

new Action(new Sequence(new Reference("MultiplicativeExpression").setName("head"), new Repeat(new Group(new Sequence(new Reference("_"), new Reference("AdditiveOperator"), new Reference("_"), new Reference("MultiplicativeExpression")))).setName("tail")), (
function(__context, __values) {
let head = __values[0];
let tail = __values[1];
 return buildBinaryExpression(head, tail) })).setName("AdditiveExpression"),

new Choice(new Terminal("<="), new Terminal(">="), new Terminal("<"), new Terminal(">"), new Terminal("is")).setLabel("operator").setName("RelationalOperator"),

new Action(new Sequence(new Reference("AdditiveExpression").setName("head"), new Repeat(new Group(new Sequence(new Reference("_"), new Reference("RelationalOperator"), new Reference("_"), new Reference("AdditiveExpression")))).setName("tail")), (
function(__context, __values) {
let head = __values[0];
let tail = __values[1];
 return buildBinaryExpression(head, tail) })).setName("RelationalExpression"),

new Choice(new Terminal("=="), new Terminal("!=")).setLabel("operator").setName("EqualityOperator"),

new Action(new Sequence(new Reference("RelationalExpression").setName("head"), new Repeat(new Group(new Sequence(new Reference("_"), new Reference("EqualityOperator"), new Reference("_"), new Reference("RelationalExpression")))).setName("tail")), (
function(__context, __values) {
let head = __values[0];
let tail = __values[1];
 return buildBinaryExpression(head, tail) })).setName("EqualityExpression"),

new Reference("AndToken").setLabel("operator").setName("LogicalAndOperator"),

new Action(new Sequence(new Reference("EqualityExpression").setName("head"), new Repeat(new Group(new Sequence(new Reference("_"), new Reference("LogicalAndOperator"), new Reference("_"), new Reference("EqualityExpression")))).setName("tail")), (
function(__context, __values) {
let head = __values[0];
let tail = __values[1];
 return buildBinaryExpression(head, tail) })).setName("LogicalAndExpression"),

new Choice(new Reference("OrToken"), new Reference("XorToken")).setLabel("operator").setName("LogicalOrOperator"),

new Action(new Sequence(new Reference("LogicalAndExpression").setName("head"), new Repeat(new Group(new Sequence(new Reference("_"), new Reference("LogicalOrOperator"), new Reference("_"), new Reference("LogicalAndExpression")))).setName("tail")), (
function(__context, __values) {
let head = __values[0];
let tail = __values[1];
 return buildBinaryExpression(head, tail) })).setName("LogicalOrExpression"),

new Terminal("?").setLabel("operator").setName("ConditionalOperator"),

new Action(new Sequence(new Reference("LogicalOrExpression").setName("test"), new Optional(new Action(new Sequence(new Reference("_"), new Reference("ConditionalOperator"), new Reference("_"), new Reference("ConditionalExpression").setName("consequent"), new Reference("_"), new Terminal(":"), new Reference("_"), new Reference("ConditionalExpression").setName("alternate")), (
function(__context, __values) {
let consequent = __values[3];
let alternate = __values[7];
 return {consequent,alternate}}))).setName("body")), (
function(__context, __values) {
let test = __values[0];
let body = __values[1];
 return body ? node('ConditionalExpression', {test}, body) : test })).setName("ConditionalExpression"),

new Action(new Sequence(new Reference("IdDeclaration").setName("id"), new Reference("_"), new Optional(new Action(new Sequence(new Repeat(new Terminal(":"), 1), new Reference("_"), new Reference("Type").setName("value")), (
function(__context, __values) {
let value = __values[2];
return value;}))).setName("valueType")), (
function(__context, __values) {
let id = __values[0];
let valueType = __values[2];
 return node("Parameter", {id, valueType})})).setName("Parameter"),

new Choice(new Action(new Sequence(new Terminal("("), new Reference("_"), new Terminal(")")), (
function(__context, __values) {
;
 return [] })), new Action(new Sequence(new Reference("Parameter").setName("bare")), (
function(__context, __values) {
let bare = __values[0];
 return [bare] })), new Action(new Sequence(new Terminal("("), new Reference("_"), new Reference("Parameter").setName("head"), new Repeat(new Action(new Sequence(new Reference("_"), new Terminal(","), new Reference("_"), new Reference("Parameter").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("tail"), new Reference("_"), new Terminal(")")), (
function(__context, __values) {
let head = __values[2];
let tail = __values[3];
 return [head, ...tail] }))).setName("FunctionParameters"),

new Action(new Sequence(new Optional(new Action(new Sequence(new Reference("Id").setName("value"), new Reference("_"), new NotPredicate(new NotPredicate(new Terminal("(")))), (
function(__context, __values) {
let value = __values[0];
return value;}))).setName("id"), new Optional(new Reference("FunctionParameters")).setName("params"), new Reference("_"), new Terminal("->")), (
function(__context, __values) {
let id = __values[0];
let params = __values[1];
 return {id, params: params || []} })).setName("FunctionHead"),

new Action(new Sequence(new Reference("FunctionHead").setName("head"), new Reference("_"), new Reference("InlineExpression").setName("body")), (
function(__context, __values) {
let head = __values[0];
let body = __values[2];
 return node("FunctionExpression", head, {body}) })).setName("InlineFunction"),

new Action(new Sequence(new Reference("FunctionHead").setName("head"), new Reference("_"), new Reference("BlockStatement").setName("body")), (
function(__context, __values) {
let head = __values[0];
let body = __values[2];
 return node("FunctionExpression", head, {body}) })).setName("OutlineFunction"),

new Choice(new Reference("OutlineFunction"), new Reference("OutlineCallExpression"), new Action(new Sequence(new Reference("InlineExpression").setName("value"), new Reference("EOL")), (
function(__context, __values) {
let value = __values[0];
return value;}))).setName("OutlineExpression"),

new Action(new Sequence(new Reference("EOL"), new Reference("Indent"), new Repeat(new Action(new Sequence(new Reference("Dent"), new Reference("OutlineExpression").setName("value")), (
function(__context, __values) {
let value = __values[1];
return value;})), 1).setName("value"), new Reference("Outdent")), (
function(__context, __values) {
let value = __values[2];
return value;})).setName("OutlineArguments"),

new Action(new Sequence(new Reference("InlineExpression").setName("callee"), new Reference("OutlineArguments").setName("arguments")), (
function(__context, __values) {
let callee = __values[0];
let arguments = __values[1];
 return node("CallExpression", {callee, arguments}) })).setName("OutlineCallExpression"),

new Choice(new Reference("InlineFunction"), new Reference("ConditionalExpression")).setName("InlineExpression"),

new Choice(new Reference("IdReference"), new Reference("Literal"), new Reference("ThisExpression"), new Reference("GroupExpression")).setName("PrimaryExpression"),

new Action(new Sequence(new Terminal("("), new Reference("_"), new Reference("InlineExpression").setName("value"), new Reference("_"), new Terminal(")")), (
function(__context, __values) {
let value = __values[2];
return value;})).setName("GroupExpression"),

new Action(new Sequence(new Reference("ThisToken")), (
function(__context, __values) {
;
 return node('ThisExpression') })).setName("ThisExpression"),

new Action(new Sequence(new Optional(new Action(new Sequence(new Reference("Id").setName("value"), new Reference("_"), new Terminal(":")), (
function(__context, __values) {
let value = __values[0];
return value;}))).setName("key"), new Reference("_"), new Reference("InlineExpression").setName("value")), (
function(__context, __values) {
let key = __values[0];
let value = __values[2];
 return key ? node("Property", {key,value,kind:'init'}) : value })).setName("Argument"),

new Action(new Sequence(new Reference("Argument").setName("head"), new Repeat(new Action(new Sequence(new Reference("_"), new Terminal(","), new Reference("_"), new Reference("Argument").setName("value")), (
function(__context, __values) {
let value = __values[3];
return value;}))).setName("tail")), (
function(__context, __values) {
let head = __values[0];
let tail = __values[1];
 return [head, ...tail] })).setName("ArgumentList"),

new Choice(new Action(new Sequence(new Terminal("()")), (
function(__context, __values) {
;
 return [] })), new Action(new Sequence(new Terminal("("), new Reference("_"), new Reference("ArgumentList").setName("value"), new Reference("_"), new Terminal(")")), (
function(__context, __values) {
let value = __values[2];
return value;})), new Action(new Sequence(new Terminal(" "), new Reference("_"), new Reference("ArgumentList").setName("value")), (
function(__context, __values) {
let value = __values[2];
return value;}))).setName("InlineArguments"),

new Action(new Sequence(new Reference("PrimaryExpression").setName("head"), new Repeat(new Choice(new Action(new Sequence(new Terminal("["), new Reference("_"), new Reference("InlineExpression").setName("property"), new Reference("_"), new Terminal("]")), (
function(__context, __values) {
let property = __values[2];
 return {property, computed:false} })), new Action(new Sequence(new Terminal("."), new Reference("Id").setName("property")), (
function(__context, __values) {
let property = __values[1];
 return {property, computed:false} })), new Reference("InlineArguments"))).setName("tail")), (
function(__context, __values) {
let head = __values[0];
let tail = __values[1];

        return tail.reduce(
            (left, right) => {
                let {property,computed} = right
                if (Array.isArray(right))
                    return node("CallExpression", {callee:left, arguments:right})
                else
                    return node("MemberExpression", {object:left, property, computed})
            }
            ,head
        )
    })).setName("MemberExpression"),

new Choice(new Reference("NumericLiteral"), new Reference("StringLiteral"), new Reference("CharLiteral"), new Reference("NullLiteral")).setName("Literal"),

new Choice(new Reference("HexIntegerLiteral"), new Reference("DecimalLiteral"), new Reference("DecimalIntegerLiteral")).setName("NumericLiteral"),

new Action(new Sequence(new Reference("NullToken")), (
function(__context, __values) {
;
 return node('Literal', {value:null}) })).setName("NullLiteral"),

new Choice(new Sequence(new Terminal("e"), new Optional(new Regex(/[\+\-]/y)), new Repeat(new Regex(/[0-9]/y), 1), new NotPredicate(new Reference("IdPart"))), new Action(new Sequence(new Terminal("E")), (
function(__context, __values) {
;
 expected('"e" (Use Lowercase e for Exponent)') }))).setName("ExponentPart"),

new Action(new Sequence(new Choice(new Sequence(new Optional(new Reference("DecimalInteger")), new Terminal("."), new Repeat(new Regex(/[0-9]/y), 1), new Optional(new Reference("ExponentPart"))), new Sequence(new Reference("DecimalInteger"), new Reference("ExponentPart"))), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
;
 return node('Literal', {value:parseFloat(text()), precision:2})})).setName("DecimalLiteral"),

new Regex(/[0-9A-F]/y).setName("HexDigit"),

new Choice(new Action(new Sequence(new Terminal("0x"), new Repeat(new Reference("HexDigit"), 1), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
;
 return node('Literal', {value:parseInt(text(), 16), base:16}) })), new Sequence(new Terminal("0x"), new Choice(new Regex(/[0-9A-F]/y), new Action(new Sequence(new Regex(/[a-f]/y)), (
function(__context, __values) {
;
 expected('"' + text().toUpperCase() + '" (Use Uppercase for Hexadecimal)')}))), new NotPredicate(new Reference("IdPart"))), new Action(new Sequence(new Terminal("0X")), (
function(__context, __values) {
;
 expected('"0x" (Use Lowercase x for Hexadecimal Prefix)') }))).setName("HexIntegerLiteral"),

new Action(new Sequence(new Reference("DecimalInteger")), (
function(__context, __values) {
;
 return node('Literal', {value:parseInt(text()), base:10}) })).setName("DecimalIntegerLiteral"),

new Choice(new Terminal("0"), new Sequence(new Regex(/[1-9]/y), new Repeat(new Regex(/[0-9]/y)), new NotPredicate(new Reference("IdPart")))).setName("DecimalInteger"),

new Action(new Sequence(new Terminal("\""), new Repeat(new Reference("DoubleStringChar")), new Terminal("\"")), (
function(__context, __values) {
;
 return node('Literal', {value:eval(text())}); })).setName("StringLiteral"),

new Choice(new Regex(/[^\r\n\t\b\f\"]/y), new Sequence(new Terminal("\\"), new Choice(new Regex(/[rn\"]/y), new Sequence(new Terminal("u"), new Repeat(new Reference("HexDigit"), 4, 4))))).setName("DoubleStringChar"),

new Action(new Sequence(new Terminal("'"), new Repeat(new Reference("DoubleStringChar")), new Terminal("'")), (
function(__context, __values) {
;
 return node('CharLiteral', {value:eval(text())}); })).setName("CharLiteral"),

new Regex(/[a-zA-Z\$_]/y).setName("IdStart"),

new Choice(new Reference("IdStart"), new Regex(/[0-9]/y)).setName("IdPart"),

new Choice(new StringValue(new Group(new Sequence(new NotPredicate(new Reference("ReservedWord")), new Reference("IdStart"), new Repeat(new Reference("IdPart"))))), new Action(new Sequence(new Terminal("`"), new StringValue(new Repeat(new Group(new Sequence(new NotPredicate(new Terminal("`")), new Any())))).setName("value"), new Terminal("`")), (
function(__context, __values) {
let value = __values[1];
return value;}))).setName("IdName"),

new Action(new Sequence(new Reference("IdName").setName("name")), (
function(__context, __values) {
let name = __values[0];
 return node('Id', {name}) })).setLabel("Id").setName("Id"),

new Action(new Sequence(new Reference("IdName").setName("name")), (
function(__context, __values) {
let name = __values[0];
 return node('IdDeclaration', {name}) })).setName("IdDeclaration"),

new Action(new Sequence(new Reference("IdName").setName("name")), (
function(__context, __values) {
let name = __values[0];
 return node('IdReference', {name}) })).setName("IdReference"),

new Action(new Sequence(new Terminal("this").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("ThisToken"),

new Action(new Sequence(new Terminal("null").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("NullToken"),

new Action(new Sequence(new Terminal("type").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("TypeToken"),

new Action(new Sequence(new Terminal("is").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("IsToken"),

new Action(new Sequence(new Terminal("as").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("AsToken"),

new Action(new Sequence(new Terminal("and").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("AndToken"),

new Action(new Sequence(new Terminal("or").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("OrToken"),

new Action(new Sequence(new Terminal("xor").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("XorToken"),

new Action(new Sequence(new Terminal("not").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("NotToken"),

new Action(new Sequence(new Terminal("where").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("WhereToken"),

new Action(new Sequence(new Terminal("import").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("ImportToken"),

new Action(new Sequence(new Terminal("export").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("ExportToken"),

new Action(new Sequence(new Terminal("class").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("ClassToken"),

new Action(new Sequence(new Terminal("struct").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("StructToken"),

new Action(new Sequence(new Terminal("const").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("ConstToken"),

new Action(new Sequence(new Terminal("var").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("VarToken"),

new Action(new Sequence(new Terminal("let").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("LetToken"),

new Action(new Sequence(new Terminal("mut").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("MutToken"),

new Action(new Sequence(new Terminal("extends").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("ExtendsToken"),

new Action(new Sequence(new Terminal("for").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("ForToken"),

new Action(new Sequence(new Terminal("while").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("WhileToken"),

new Action(new Sequence(new Terminal("in").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("InToken"),

new Action(new Sequence(new Terminal("of").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("OfToken"),

new Action(new Sequence(new Terminal("if").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("IfToken"),

new Action(new Sequence(new Terminal("else").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("ElseToken"),

new Action(new Sequence(new Terminal("return").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("ReturnToken"),

new Action(new Sequence(new Terminal("break").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("BreakToken"),

new Action(new Sequence(new Terminal("continue").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("ContinueToken"),

new Action(new Sequence(new Terminal("private").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("PrivateToken"),

new Action(new Sequence(new Terminal("static").setName("value"), new NotPredicate(new Reference("IdPart"))), (
function(__context, __values) {
let value = __values[0];
return value;})).setName("StaticToken"),

new Choice(new Reference("ThisToken"), new Reference("NullToken"), new Reference("AndToken"), new Reference("IsToken"), new Reference("AsToken"), new Reference("OrToken"), new Reference("XorToken"), new Reference("NotToken"), new Reference("WhereToken"), new Reference("ClassToken"), new Reference("StructToken"), new Reference("ConstToken"), new Reference("VarToken"), new Reference("LetToken"), new Reference("MutToken"), new Reference("ForToken"), new Reference("WhileToken"), new Reference("IfToken"), new Reference("ElseToken"), new Reference("ReturnToken"), new Reference("BreakToken"), new Reference("ContinueToken"), new Reference("ExportToken"), new Reference("ImportToken"), new Reference("PrivateToken"), new Reference("StaticToken")).setName("Keyword"),

new Reference("Keyword").setName("ReservedWord"),

new Increment("indentation", 1).setName("Indent"),

new Increment("indentation", -1).setName("Outdent"),

new Repeat(new Terminal("    "), "indentation", "indentation").setName("Dent"),

new Choice(new Terminal("\n"), new Terminal("\r\n"), new Terminal("\r")).setName("LineTerminatorSequence"),

new Sequence(new Terminal("#"), new Repeat(new Group(new Sequence(new NotPredicate(new Regex(/[\r\n]/y)), new Any())))).setLabel("").setName("Comment"),

new Repeat(new Terminal(" ")).setLabel("").setName("_"),

new Repeat(new Choice(new Terminal(" "), new Reference("LineTerminatorSequence"), new Reference("Comment"))).setLabel("").setName("__"),

new Choice(new Repeat(new Group(new Sequence(new Reference("_"), new Optional(new Reference("Comment")), new Repeat(new Reference("LineTerminatorSequence"), 1))), 1), new Reference("EOF")).setLabel("end of line").setName("EOL"),

new NotPredicate(new Any()).setLabel("").setName("EOF")]))

        return parser
    }
})()
;
exports.default = exports