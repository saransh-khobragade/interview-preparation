// mapLimit - Control concurrency of async calls
// mapLimit(arr, limit, asyncFn) returns a Promise that resolves to mapped results

function mapLimit(arr, limit, asyncFn) {
    return new Promise((resolve, reject) => {
        const results = [];
        let running = 0, index = 0, finished = 0;
        function next() {
            if (finished === arr.length) return resolve(results);
            while (running < limit && index < arr.length) {
                const currentIndex = index++;
                running++;
                Promise.resolve(asyncFn(arr[currentIndex], currentIndex, arr))
                    .then(res => {
                        results[currentIndex] = res;
                        running--;
                        finished++;
                        next();
                    })
                    .catch(reject);
            }
        }
        next();
    });
}

// Usage example:
// mapLimit([1,2,3,4,5], 2, async x => x * 2).then(console.log);

module.exports = { mapLimit }; 