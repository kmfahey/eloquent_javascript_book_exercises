/*
 * Numbers Again
 *
 * Write an expression that matches only JavaScript-style numbers. It must
 * support an optional minus or plus sign in front of the number, the decimal
 * dot, and exponent notation—5e-3 or 1E10—again with an optional sign in
 * front of the exponent. Also note that it is not necessary for there to be
 * digits in front of or after the dot, but the number cannot be a dot alone.
 * That is, .5 and 5. are valid JavaScript numbers, but a lone dot isn’t.
 */

JSstyleNumbers = [
    "1", "121", "0.5", ".5", "0.", "1E+2", "1e+2", "1E-2", "1e-2", "121E+2",
    "121e+2", "121E-2", "121e-2", "0.5E+2", "0.5e+2", "0.5E-2", "0.5e-2",
    ".721E+2", ".721e+2", ".721E-2", ".721e-2", "721.E+2", "721.e+2", "721.E-2",
    "721.e-2"
]
console.log(JSstyleNumbers.every(s => /[+-]?(\d+|\d+\.|\.\d+)([Ee][+-][0-9]+)?/.test(s)));
