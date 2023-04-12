/* Minimum
 * 
 * Chapter 2 introduced the standard function Math.min, which returns its
 * smallest argument (see "Return Values" on page 27). We can build something
 * like that now. Write a function min that takes two arguments and returns
 * their minimum.
 */

function min(left_arg, right_arg) {
    if (typeof left_arg != "number" && typeof left_arg != "bigint")
        throw new Error("can't calculate minimum when first argument is non-numeric");
    else if (typeof right_arg != "number" && typeof right_arg != "bigint")
        throw new Error("can't calculate minimum when second argument is non-numeric");
    return left_arg < right_arg ? left_arg : right_arg;
}
