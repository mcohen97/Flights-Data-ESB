module.exports = function printOnScreen(job,next){
    console.log(`vuelo ${job.message.FLIGHT_NUMBER} para ${job.client.username}, NUEVO FILTROOO`);
    next(null,job);
}