/*
React DOM Rendering Process
---------------------------
Explains how React updates the DOM efficiently using a virtual DOM and reconciliation.
*/

// 1. React creates a virtual DOM (a lightweight JS object representation of the real DOM).
// 2. When state/props change, React creates a new virtual DOM tree.
// 3. React compares the new virtual DOM with the previous one (diffing/reconciliation).
// 4. React calculates the minimal set of changes (patches).
// 5. React updates the real DOM in a batch, applying only the necessary changes.

// This process makes React fast and efficient for UI updates.

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