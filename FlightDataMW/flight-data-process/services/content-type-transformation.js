const js2xmlparser = require("js2xmlparser");


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
}

function renderJSON(data) {
    console.log("conversion json");
    return JSON.stringify(data);
}

function renderXML(data) {
    console.log("conversion xml");
    return js2xmlparser.parse("flight", data)
}

function renderText(data){

}