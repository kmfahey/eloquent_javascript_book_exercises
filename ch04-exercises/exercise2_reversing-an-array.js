/*
 * Reversing an array
 * 
 * Arrays have a reverse method that changes the array by inverting the order
 * in which its elements appear. For this exercise, write two functions,
 * reverseArray and reverseArrayInPlace. The first, reverseArray, takes an
 * array as argument and produces a new array that has the same elements in the
 * inverse order. The second, reverseArrayInPlace, does what the reverse method
 * does: it modifies the array given as argument by reversing its elements.
 * Neither may use the standard reverse method.
 *
 * Thinking back to the notes about side effects and pure functions in
 * the previous chapter, which variant do you expect to be useful in more
 * situations? Which one runs faster?
 */

function reverseArray(array) {
    let retval = [];
    for (i = array.length - 1; i >= 0; i--) {
        retval.push(array[i]);
    }
    return retval;
}

// console.log(reverseArray([1,2,3,4,5]));

function reverseArrayInPlace(array) {
    for (i = 0, j = array.length - 1; i < j; i++, j--) {
        let tempVal = array[i];
        array[i] = array[j];
        array[j] = tempVal;
    }
}

// let array = [1,2,3,4,5];
// reverseArrayInPlace(array);
// console.log(array);

/* // Quick-and-dirty benchmarking.
function getDecimalMinutes() {
    let date = new Date();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milliseconds = date.getMilliseconds();
    let decimalSeconds = seconds + milliseconds/1000;
    let decimalMinutes = minutes + decimalSeconds/60;
    return decimalMinutes;
}
let firstTimepoint = getDecimalMinutes();
for (l = 0; l < 100000000; l++) {
    reverseArray([1,2,3,4,5]);
}
let secondTimepoint = getDecimalMinutes();
console.log("time elapsed on 100000000 runs of reverseArray(): " + 60*(secondTimepoint - firstTimepoint) + " seconds");

let thirdTimepoint = getDecimalMinutes();
for (l = 0; l < 100000000; l++) {
    reverseArrayInPlace([1,2,3,4,5]);
}
let fourthTimepoint = getDecimalMinutes();
console.log("time elapsed on 100000000 runs of reverseArrayInPlace(): " + 60*(fourthTimepoint - thirdTimepoint) + " seconds"); */

// OUTPUT:
// time elapsed on 100000000 runs of reverseArray(): 4.246000000000265 seconds
// time elapsed on 100000000 runs of reverseArrayInPlace(): 2.1860000000000923 seconds

