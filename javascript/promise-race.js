// Simple Promise.race Implementation

function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(p => {
            Promise.resolve(p).then(resolve, reject);
        });
        if (promises.length === 0) resolve();
    });
}

module.exports = { promiseRace }; 