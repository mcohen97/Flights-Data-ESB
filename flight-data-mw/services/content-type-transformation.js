//const convert = require('xml-js');
const js2xmlparser = require("js2xmlparser");


//module.exports = () => { return async (data, next) => {
  module.exports = function toContentType(data, next){
      console.log('conversion de tipo');
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
    //return result;
}
//}};

function renderJSON(data) {
    console.log("conversion json");
    return JSON.stringify(data);
}

function renderXML(data) {
    //return convert.js2xml(data, { compact: true });
    console.log("conversion xml");
    return js2xmlparser.parse("flight", data)
}

function renderText(data){

}