// Debounce with Leading and Trailing Options
// Usage: debounce(fn, wait, { leading: true, trailing: false })

function debounce(fn, wait, options = {}) {
    let timeout, lastArgs, lastThis, result, called;
    const { leading = false, trailing = true } = options;

    const invoke = () => {
        if (trailing && lastArgs) {
            result = fn.apply(lastThis, lastArgs);
            lastArgs = lastThis = null;
        }
        timeout = null;
    };

    return function(...args) {
        lastArgs = args;
        lastThis = this;
        if (!timeout) {
            if (leading) {
                result = fn.apply(this, args);
                called = true;
            }
            timeout = setTimeout(invoke, wait);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(invoke, wait);
        }
        return result;
    };
}

// Usage example:
// const debounced = debounce(fn, 300, { leading: true, trailing: false });

module.exports = { debounce }; 