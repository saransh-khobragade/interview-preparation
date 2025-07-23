// Simple Promise.all Implementation

function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;
        promises.forEach((p, i) => {
            Promise.resolve(p)
                .then(val => {
                    results[i] = val;
                    completed++;
                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
        if (promises.length === 0) resolve([]);
    });
}

module.exports = { promiseAll }; 