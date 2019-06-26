const js2xmlparser = require("js2xmlparser");


  module.exports = function toContentType(data, contentType, next){
    let result;
    switch (contentType.toUpperCase()) {
        case 'JSON': 
             result = renderJSON(data);
            break;
        case 'XML':
            result = renderXML(data);
            break;
        default: 
            result= data;
            break;
    }
    next(null,result);
}

function renderJSON(data) {
    return JSON.stringify(data);
}

function renderXML(data) {
    return js2xmlparser.parse("flight", data)
}

function renderText(data){
    return data;
}