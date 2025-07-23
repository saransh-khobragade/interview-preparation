// Retry Promises N Times

function retry(fn, n, delay = 0) {
    return new Promise((resolve, reject) => {
        function attempt(count) {
            fn()
                .then(resolve)
                .catch(err => {
                    if (count > 0) {
                        setTimeout(() => attempt(count - 1), delay);
                    } else {
                        reject(err);
                    }
                });
        }
        attempt(n);
    });
}

// Usage:
// retry(() => fetch('...'), 3, 1000)

module.exports = { retry }; 