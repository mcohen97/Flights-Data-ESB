class AbstractPipeline {
    constructor() {
        this.filters = [];
    }
    use(filter) {
        this.filters.push(filter);
        return this;
    }
    run(input,callback) {
        throw new Error('Not implemented');
    }
}

module.exports = AbstractPipeline;