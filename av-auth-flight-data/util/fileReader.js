const fs = require('fs');
const readline = require('readline');
const es = require('event-stream')

module.exports.readCVS = async function(path, limit = 0, offset = 0) {
    try {
        let result = await process(path, limit, offset);
        return result;
    } catch (err) {
        console.error(err);
        return null;
    }
};

async function process(path, limit, offset) {
    let result = [];
    let actualLine = -1
    return new Promise((resolve, reject) => {
        let stream = fs
        .createReadStream(path)
        .pipe(es.split())
        .pipe(
            es
                .mapSync((line) => {
                    actualLine++
                    if(actualLine >= offset && (result.length <= limit || limit == 0))
                        result.push(line.split(','));                        
                })
                .on('end', () => {
                    resolve(result);
                })
                .on('error', (err) => {
                    console.log("Error ", err);
                    reject(err)
                })
        );
    });
}