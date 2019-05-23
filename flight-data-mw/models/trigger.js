module.exports = class Trigger {
    constructor(keyword, predicate, subscribersUsernames){
        this.keyword = keyword;
        this.isExecutedBy = predicate;
        this.subscribers = subscribersUsernames;
    }
}