const js2xmlparser = require("js2xmlparser");


  module.exports = function toContentType(data, next){
    let result;
    switch (data.contentType.toUpperCase()) {
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
    next(null,data);
}

function renderJSON(data) {
    return JSON.stringify(data);
}

function renderXML(data) {
    return js2xmlparser.parse("flight", data)
}

function renderText(data){

}