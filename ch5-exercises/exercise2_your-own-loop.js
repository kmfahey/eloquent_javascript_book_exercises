/*
 * Your Own Loop
 *
 * Write a higher-order function loop that provides something like a for loop
 * statement. It takes a value, a test function, an update function, and a body
 * function. Each iteration, it first runs the test function on the current
 * loop value and stops if that returns false. Then it calls the body function,
 * giving it the current value. Finally, it calls the update function to create
 * a new value and starts from the beginning.
 *
 * When defining the function, you can use a regular loop to do the actual
 * looping.
 */

function loop(value, testFunc, updateFunc, bodyFunc) {
    while (true) {
        if (! testFunc(value)) {
            return;
        }
        bodyFunc(value);
        value = updateFunc(value);
    }
}

loop(0,
    i => i < 10,
    i => i + 1,
    i => console.log(i))
