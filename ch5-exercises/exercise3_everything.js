/*
 * Everything
 *
 * Analogous to the some method, arrays also have an every method. This one
 * returns true when the given function returns true for every element in the
 * array. In a way, some is a version of the || operator that acts on arrays,
 * and every is like the && operator.
 *
 * Implement every as a function that takes an array and a predicate function
 * as parameters. Write two versions, one using a loop and one using the some
 * method.
 */

function every1(array, func) {
    for (let elem of array) {
        if (! func(elem)) {
            return false;
        }
    }
    return true;
}

console.log(every1([1,2,3,4,5], elem => elem > 0))
console.log(every1([0,1,2,3,4,5], elem => elem > 0))

function every2(array, func) {
    return ! array.some(elem => !func(elem));
}

console.log(every2([1,2,3,4,5], elem => elem > 0))
console.log(every2([0,1,2,3,4,5], elem => elem > 0))

