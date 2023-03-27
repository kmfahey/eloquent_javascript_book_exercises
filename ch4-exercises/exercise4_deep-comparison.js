/*
 * Deep comparison
 * 
 * The == operator compares objects by identity. But sometimes you’d prefer
 * to compare the values of their actual properties. Write a function deepEqual
 * that takes two values and returns true only if they are the same value or
 * are objects with the same properties, where the values of the properties are
 * equal when compared with a recursive call to deepEqual.
 *
 * To find out whether values should be compared directly (use the === operator
 * for that) or have their properties compared, you can use the typeof operator.
 * If it produces "object" for both values, you should do a deep comparison. But
 * you have to take one silly exception into account: because of a historical
 * accident, typeof null also produces "object". The Object.keys function will
 * be useful when you need to go over the properties of objects to compare them.
 */

function deepEqual(obj1, obj2) {
    if (typeof obj1 !== 'object' || obj1 === null) {
        throw new Error("can't compare arguments because first argument is not an object");
    } else if (typeof obj2 !== 'object' || obj2 === null) {
        throw new Error("can't compare arguments because second argument is not an object");
    }
    for (let key of Object.keys(obj1)) {
        if (! obj2.hasOwnProperty(key)) {
            return false;
        } else if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}

//console.log(deepEqual([1,2,3],[4,5,6]));
//console.log(deepEqual([1,2,3],[1,2,3]));
//console.log(deepEqual({a:1, b:2, c:3},{d:4, e:5, f:6}));
//console.log(deepEqual({a:1, b:2, c:3},{a:1, b:2, c:3}));
