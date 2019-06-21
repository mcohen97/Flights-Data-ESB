const Parser = require('expr-eval').Parser;
const DataFields = require('../data-description/flight-data-fields');

const parser = new Parser();

function formatTriggerExpression(expression){
    let parsedExpression = parseExpression(expression);
    let expressionString = parsedExpression.toString();
    checkIfBooleanExpression(parsedExpression);
    return expressionString;
}

function checkIfBooleanExpression(parsedExpression){
    wrapVariablesInObject(parsedExpression);
    let fun = parsedExpression.toJSFunction("data"); 
    //An empty object is enough for infering the function return type.
    let typeFun = typeof fun({});
    if(typeFun != "boolean"){
        throw new Error("The function is not boolean");
    }
}

function createFunctionFromTriggerExpression(expression) {
    let parsedExpression = parseExpression(expression);
    wrapVariablesInObject(parsedExpression);
    return parsedExpression.toJSFunction("data");   
}
module.exports.formatTriggerExpression = formatTriggerExpression;
module.exports.createFunctionFromTriggerExpression= createFunctionFromTriggerExpression;

function parseExpression(expression){        
    //make sure connectives are lowercase, otherwise the parser fails.
    expression = expression.toLowerCase();
    let parsedExpression;
    try{
        parsedExpression = parser.parse(expression);
    }catch(error){
        throw new Error('Invalid expression');
    }
    validateAndSanitizeVariables(parsedExpression);
    return parsedExpression;
}

function validateAndSanitizeVariables(parsedExpression){
    let tokens = parsedExpression.tokens;

    //make all variables be members of an object named "data".
    let visitTreeNodes = function visitTreeNodes(tokens) {
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            if (token.type == 'IVAR'){ 
                //variables in expression go in uppercase.
                token.value = token.value.toUpperCase();
                tokens[i] = token;
                if(!DataFields.includes(token.value)) {
                    throw new Error(`The Field ${token.value} does not exist`);
                }                
            }
            if (token.type == 'IEXPR') {
                visitTreeNodes(token.value);
            }
        }
    }
    visitTreeNodes(tokens);
}

function wrapVariablesInObject(parsedExpression){
    let tokens = parsedExpression.tokens;

    //make all variables be members of an object named "data"
    let visitTreeNodes = function visitTreeNodes(tokens) {
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            if (token.type == 'IVAR') {
                tokens[i] = { type: 'IMEMBER', value: token.value };
                tokens.splice(i, 0, { type: 'IVAR', value: 'data' });
            }
            if (token.type == 'IEXPR') {
                visitTreeNodes(token.value);
            }
        }
    }
    visitTreeNodes(tokens);
    parsedExpression.tokens = tokens;
}