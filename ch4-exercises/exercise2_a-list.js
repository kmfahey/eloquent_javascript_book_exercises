/*
 * A List
 *
 * Objects, as generic blobs of values, can be used to build all sorts of data
 * structures. A common data structure is the [linked] list (not to be confused
 * with array). A [linked] list is a nested set of objects, with the first
 * object holding a reference to the second, the second to the third, and so on.
 *
 * let list = {
 *     value: 1,
 *     rest: {
 *         value: 2,
 *         rest: {
 *             value: 3,
 *             rest: null
 *         }
 *     }
 * };
 * 
 * The resulting objects form a chain, like this:
 *
 *     value: 1
 *     rest: ----> value: 2
 *                 rest: ----> value: 3
 *                             rest: null
 *
 * A nice thing about [linked] lists is that they can share parts of their
 * structure. For example, if I create two new values {value: 0, rest: list}
 * and {value: -1, rest: list} (with [linked] list referring to the binding
 * defined earlier), they are both independent [linked] lists, but they share
 * the structure that makes up their last three elements. The original [linked]
 * list is also still a valid three-element [linked] list.
 *
 * Write a function arrayToList that builds up a [linked] list structure like
 * the one shown when given [1, 2, 3] as argument. Also write a [linked]
 * listToArray function that produces an array from a [linked] list. Then add
 * a helper function prepend, which takes an element and a [linked] list and
 * creates a new [linked] list that adds the element to the front of the input
 * [linked] list, and nth, which takes a [linked] list and a number and returns
 * the element at the given position in the [linked] list (with zero referring
 * to the first element) or undefined when there is no such element.
 *
 * If you haven’t already, also write a recursive version of nth.
 */

/*
 * Write a function arrayToList that builds up a [linked] list structure like
 * the one shown when given [1, 2, 3] as argument.
 */
function arrayToList(array) {
    let llist = {rest: null};
    for (i = array.length - 1; i >= 0; i--) {
        llist.value = array[i];
        llist = {rest: llist};
    }
    return llist.rest;
}

// console.log(JSON.stringify(arrayToList([1,2,3])));

/*
 * Also write a [linked] listToArray function that produces an array from a
 * [linked] list.
 */
function listToArray(llist) {
    let arrayRetv = [];
    ptr = llist;
    while (ptr !== null) {
        arrayRetv.push(ptr.value);
        ptr = ptr.rest;
    }
    return arrayRetv;
}

// console.log(JSON.stringify(listToArray(arrayToList([1,2,3]))));

/*
 * Then add a helper function prepend, which takes an element and a [linked]
 * list and creates a new [linked] list that adds the element to the front of
 * the input [linked] list,
 */

function prepend(elem, llist) {
    return {
        value: elem,
        rest: llist
    }
}

/*
 * Write a function arrayToList that builds up a [linked] list structure like
 * the one shown when given [1, 2, 3] as argument.
 */
function arrayToList2(array) {
    let llist = {rest: null};
    for (i = array.length - 1; i >= 0; i--) {
        llist = prepend(array[i], llist);
    }
    return llist;
}

// console.log(JSON.stringify(arrayToList([1,2,3])));

/*
 * and nth, which takes a [linked] list and a number and returns the element at
 * the given position in the [linked] list (with zero referring to the first
 * element) or undefined when there is no such element.
 */

function nth(index, llist) {
    if (index < 0) {
        throw new Error("index can't be less than zero");
    } else if (index == 0) {
        return llist.value;
    } else {
        return nth(index - 1, llist.rest);
    }
}

// console.log(nth(2, arrayToList([1,2,3])));

/*
 * If you haven’t already, also write a recursive version of nth.
 */


