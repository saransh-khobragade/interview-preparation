/*
Chainable Calculator
---------------------
Implements a calculator where operations can be chained (e.g., calc.add(2).subtract(1).value()).

Approach: Return 'this' from each method and keep track of the value.
*/

function Calculator(val = 0) {
    this._val = val;
}
Calculator.prototype.add = function(n) {
    this._val += n;
    return this;
};
Calculator.prototype.subtract = function(n) {
    this._val -= n;
    return this;
};
Calculator.prototype.value = function() {
    return this._val;
};

module.exports = Calculator; 