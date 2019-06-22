module.exports = function printOnScreen(data,next){
    //console.log('pasa por el filtro un dato: '+ data);
    next(null,data);
}