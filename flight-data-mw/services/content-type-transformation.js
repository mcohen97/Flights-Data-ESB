//const convert = require('xml-js');
const js2xmlparser = require("js2xmlparser");


//module.exports = () => { return async (data, next) => {
  module.exports = function toContentType(data, contentType){
    let result;
    switch (contentType) {
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
    //next(null,data);
    return result;
}
//}};

function renderJSON(data) {
    return JSON.stringify(data);
}

function renderXML(data) {
    //return convert.js2xml(data, { compact: true });
    return js2xmlparser.parse("flight", data)
}

function renderText(data){

}