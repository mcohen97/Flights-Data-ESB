const convert = require('xml-js');

module.exports = () => { return async (data, next) => {
    let result;
    switch (data.contentType) {
        case 'JSON': 
            result = renderJSON(data);
            break;
        case 'XML':
            result = renderXML(data);
            break;
        default: 
            result = renderText(data);
            break;
    }
    return result;
}};

function renderJSON(data) {
    /*let body = ctx.body;
    ctx.response.type = 'json';
    ctx.body = JSON.stringify(body);*/
}

function renderXML(data) {
    /*let body = ctx.body;
    ctx.response.type = 'xml';
    ctx.body = convert.js2xml(body, { compact: true });*/
}

function renderText(data){

}