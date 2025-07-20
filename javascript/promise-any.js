// Simple Promise.any Implementation

function promiseAny(promises) {
    return new Promise((resolve, reject) => {
        let rejections = 0;
        const errors = [];
        promises.forEach((p, i) => {
            Promise.resolve(p)
                .then(resolve)
                .catch(err => {
                    errors[i] = err;
                    rejections++;
                    if (rejections === promises.length) {
                        reject(new AggregateError(errors, 'All promises were rejected'));
                    }
                });
        });
        if (promises.length === 0) reject(new AggregateError([], 'All promises were rejected'));
    });
}

module.exports = { promiseAny }; 