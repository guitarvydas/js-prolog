// usage:
// npm install ohm-js
// npm install minimist
// node unity.js --input=top.html

const MatcherGrammar = `
Matcher {
    MatcherStatement = Statement+
    Statement = (ClearStatement | Fact | Rule | Query) "."
    
    ClearStatement = "clear"
    Fact = BinaryRelation | UnaryRelation | NonaryRelation
    Rule = Head "=" Body
    Query = "match" "(" MatchExpression ")"

    BinaryRelation = Relation "(" Subject "," Object ")"
    UnaryRelation = Relation "(" Subject ")"
    NonaryRelation = Relation
    Relation = Identifier

    Subject = Primary
    Object = Primary

    Head = BinaryHead | UnaryHead | NonaryHead
    BinaryHead = Identifier "(" Formal "," Formal ")"
    UnaryHead = Identifier "(" Formal ")"
    NonaryHead = Identifier
    Body = MatchExpression
    MatchExpression = ( MatchFactor "|" MatchFactor ) | MatchFactor
    MatchFactor = ( MatchAtom "&" MatchAtom ) | MatchAtom
    MatchAtom = Keyword | BinaryFunctor | UnaryFunctor | NonaryFunctor
    Keyword = "cut" | "true" | "false"
    BinaryFunctor = Identifier "(" Primary "," Primary ")"
    UnaryFunctor = Identifier "(" Primary ")"
    NonaryFunctor = Identifier
    Primary = identifier | logicVariable
    identifier = lowerCaseLetter identLetter*
    logicVariable = upperCaseLetter identLetter*
    lowerCaseLetter = "a" .. "z"
    upperCaseLetter = "A" .. "Z"
    identLetter = lowerCaseLetter | upperCaseLetter | "0" .. "9" | "_" | "-"
}
`;


const grammars = ohm.grammars (unityGrammar);
const grammar = grammars["Matcher"];
var args = require('minimist') (process.argv.slice (2));
var inputFilename = args['input'];
const input = fs.readFileSync("./" + inputFilename);
const parseTree = grammar.match (input);

if (parseTree.failed ()) {
    
    console.log ("Matching Failed")
    var tr = grammar.trace (input);
    console.log (tr.toString ());

} else {
    console.log ("Matching Succeeded")
};

