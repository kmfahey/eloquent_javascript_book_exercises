/*
 * Fixing scope
 *
 * Currently, the only way to assign a binding a value is define. This construct
 * acts as a way both to define new bindings and to give existing ones a new
 * value.
 *
 * This ambiguity causes a problem. When you try to give a nonlocal binding a
 * new value, you will end up defining a local one with the same name instead.
 * Some languages work like this by design, but I’ve always found it an
 * awkward way to handle scope.
 *
 * Add a special form set, similar to define, which gives a binding a new value,
 * updating the binding in an outer scope if it doesn’t already exist in the
 * inner scope. If the binding is not defined at all, throw a ReferenceError
 * (another standard error type).
 *
 * The technique of representing scopes as simple objects, which has made things
 * convenient so far, will get in your way a little at this point. You might
 * want to use the Object.getPrototypeOf function, which returns the prototype
 * of an object. Also remember that scopes do not derive from Object.prototype,
 * so if you want to call hasOwnProperty on them, you have to use this clumsy
 * expression:

Object.prototype.hasOwnProperty.call(scope, name);

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

specialForms.set = (args, scope) => {
    let name = args[0].name;
    let value = _frame_to_value(args[1], scope);
    while (!Object.prototype.hasOwnProperty.call(scope, name)
           && Object.getPrototypeOf(scope) != null) {
        scope = Object.getPrototypeOf(scope);
    }
    if (Object.getPrototypeOf(scope) == null) {
        throw new ReferenceError(`name ${name} not defined in the current scope or any enclosing scope`);
    }
    scope[name] = value;
    return value;
}

run(`
do(define(a, 1),
   define(p, fun(b, print(b))),
   set(a, 2),
   p(2))
`);
