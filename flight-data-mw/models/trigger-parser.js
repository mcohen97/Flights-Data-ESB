const Parser = require('expr-eval').Parser;

const parser = new Parser();

function formatTriggerExpression(expression,clientRequestedFields){
    let parsedExpression = parseExpression(expression, clientRequestedFields);
    return parsedExpression.toString();
}

function createFunctionFromTriggerExpression(expression, clientRequestedFields) {
    let parsedExpression = parseExpression(expression, clientRequestedFields);
    wrapVariablesInObject(parsedExpression);
    return parsedExpression.toJSFunction("data");   
}
module.exports.formatTriggerExpression = formatTriggerExpression;
module.exports.createFunctionFromTriggerExpression= createFunctionFromTriggerExpression;

function parseExpression(expression, clientRequestedFields){        
    //make sure connectives are lowercase, otherwise the parser fails.
    expression = expression.toLowerCase();

    let parsedExpression = parser.parse(expression);
    validateAndSanitizeVariables(parsedExpression, clientRequestedFields);
    return parsedExpression;
}

function validateAndSanitizeVariables(parsedExpression, clientRequestedFields){
    let tokens = parsedExpression.tokens;

    //make all variables be members of an object named "data".
    let bfs = function bfs(tokens) {
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            if (token.type == 'IVAR'){ 
                //variables in expression go in uppercase.
                token.value = token.value.toUpperCase();
                tokens[i] = token;
                if(!clientRequestedFields.includes(token.value)) {
                    throw new Error(`The Field ${token.value} was not requested`);
                }                
            }
            if (token.type == 'IEXPR') {
                bfs(token.value);
            }
        }
    }
    bfs(tokens);
}

function wrapVariablesInObject(parsedExpression){
    let tokens = parsedExpression.tokens;

    //make all variables be members of an object named "data"
    let bfs = function bfs(tokens) {
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            if (token.type == 'IVAR') {
                tokens[i] = { type: 'IMEMBER', value: token.value };
                tokens.splice(i, 0, { type: 'IVAR', value: 'data' });
            }
            if (token.type == 'IEXPR') {
                bfs(token.value);
            }
        }
    }
    bfs(tokens);
    parsedExpression.tokens = tokens;
}