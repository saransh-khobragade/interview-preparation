// React DOM Rendering Process (Simplified)

/*
1. React creates a virtual DOM (JS object tree)
2. On state/prop change, React creates a new virtual DOM
3. React diffs (reconciles) the new virtual DOM with the previous one
4. React calculates the minimal set of changes (diff)
5. React updates the real DOM in the browser efficiently
*/

// Example React component (pseudo-code)
function App(props) {
    // 1. Initial render: React creates virtual DOM for <App />
    // 2. On setState/props change, React creates new virtual DOM
    // 3. React compares old and new virtual DOM (diffing)
    // 4. React batches and applies only the necessary changes to the real DOM
    return (
        `<div>
            <h1>Hello, ${props.name}!</h1>
        </div>`
    );
}

// Usage: (in React, not real JS)
// <App name="World" />

module.exports = { App }; 