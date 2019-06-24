module.exports = function printOnScreen(job,next){
    //console.log('pasa por el filtro un dato: '+ data);
    next(null,job);
}