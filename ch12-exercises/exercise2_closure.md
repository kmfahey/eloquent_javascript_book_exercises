# Closure

## Question

The way we have defined fun allows functions in Egg to reference the surrounding
scope, allowing the function’s body to use local values that were visible at
the time the function was defined, just like JavaScript functions do.

The following program illustrates this: function f returns a function that adds
its argument to f’s argument, meaning that it needs access to the local scope
inside f to be able to use binding a.

    run(`
    do(define(f, fun(a, fun(b, +(a, b)))),
    print(f(4)(5)))
    `);
    // → 9

Go back to the definition of the fun form and explain which mechanism causes
this to work.

## Answer

Reproducing the code of the fun form as follows:

     1 specialForms.fun = (args, scope) => {
     2   if (!args.length) {
     3     throw new SyntaxError("Functions need a body");
     4   }
     5   let body = args[args.length - 1];
     6   let params = args.slice(0, args.length - 1).map(expr => {
     7     if (expr.type != "word") {
     8       throw new SyntaxError("Parameter names must be words");
     9     }
    10     return expr.name;
    11   });
    12      
    13   return function() {
    14     if (arguments.length != params.length) {
    15       throw new TypeError("Wrong number of arguments");
    16     }
    17     let localScope = Object.create(scope);
    18     for (let i = 0; i < arguments.length; i++) {
    19       localScope[params[i]] = arguments[i];
    20     }
    21     return evaluate(body, localScope);
    22   };
    23 };

The fun form returns a function that's a closure that has access to the scope
object it was called with. That function copies the scope object for its use
then returns the results of evaluating the body it was defined around in the
context of the copied scope. The returned function is a closure in the local
scope it was called with, so when it evaluates the body that body has access to
that scope as well.

