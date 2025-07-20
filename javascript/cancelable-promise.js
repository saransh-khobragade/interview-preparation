// Cancelable Promise Implementation

class CancelablePromise {
    constructor(executor) {
        this._canceled = false;
        this._promise = new Promise((resolve, reject) => {
            executor(
                value => this._canceled ? reject({ canceled: true }) : resolve(value),
                reason => this._canceled ? reject({ canceled: true }) : reject(reason)
            );
        });
    }
    then(onFulfilled, onRejected) {
        return this._promise.then(onFulfilled, onRejected);
    }
    catch(onRejected) {
        return this._promise.catch(onRejected);
    }
    finally(onFinally) {
        return this._promise.finally(onFinally);
    }
    cancel() {
        this._canceled = true;
    }
}

// Usage example:
// const p = new CancelablePromise((resolve) => setTimeout(() => resolve('done'), 1000));
// p.cancel();

module.exports = { CancelablePromise }; 