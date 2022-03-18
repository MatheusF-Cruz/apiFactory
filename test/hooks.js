export const mochaHooks = {
    beforeEach(done) {
        global.logger = {
            debug: () => {},
            info: () => {},
            warn: () => {},
            error: () => {}
        };
        done();
    }
};