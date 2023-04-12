/* 
 * Flattening
 *
 * Use the reduce method in combination with the concat method to “flat-
 * ten” an array of arrays into a single array that has all the elements of
 * the original arrays.
 */

function flatten(arrayOfArrays) {
    return arrayOfArrays.reduce(function func(a,b) { return a.concat(b) }, []);
}

console.log(flatten([[1,2,3],[4,5,6],[7,8,9]]));
