/*
 * Arrays
 *
 * Add support for arrays to Egg by adding the following three functions to the
 * top scope: array(...values) to construct an array containing the argument
 * values, length(array) to get an array’s length, and element( array, n) to
 * fetch the nth element from an array.
 */

let {run, evaluate, specialForms} = require('./12_language.js');

let _frame_to_value = (frame, scope) => {
    switch (frame.type) {
        case "value":
            return frame.value;
        case "word":
            if (frame.name in scope) return scope[frame.name];
            else throw new ReferenceError(`symbol '${frame.name}' not defined in current scope`);
        case "apply":
            return evaluate(frame, scope);
        default:
            throw new Error(`unexpected stack frame type ${frame.type}`);
    }
}

specialForms.array = (args, scope) => {
    return Array.from(args);
}

specialForms.length = (args, scope) => {
    let array = _frame_to_value(args[0], scope);
    return array.length;
}

specialForms.element = (args, scope) => {
    let array = _frame_to_value(args[0], scope);
    let index = _frame_to_value(args[1], scope);
    return _frame_to_value(array[index]);
}

run(`do(define(f, fun(a, fun(b, +(a, b)))), print(f(4)(5)))`);

run(`do(print(element(array(1,2,3),0)))`);

run(`do(define(a, array(1,2,3)), print(element(a, 0)))`);

run(`do(define(a, array(1,2,3)), print(length(a)))`);

exports.specialForms = specialForms;
