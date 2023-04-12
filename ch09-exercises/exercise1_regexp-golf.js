/*
 * Regexp Golf
 *
 * Code golf is a term used for the game of trying to express a particular
 * program in as few characters as possible. Similarly, regexp golf is the
 * practice of writing as tiny a regular expression as possible to match a given
 * pattern, and only that pattern.
 *
 * For each of the following items, write a regular expression to test whether
 * any of the given substrings occur in a string. The regular expression should
 * match only strings containing one of the substrings described. Do not worry
 * about word boundaries unless explicitly mentioned. When your expression
 * works, see whether you can make it any smaller.
 *
 * 1. car and cat
 * 2. pop and prop
 * 3. ferret, ferry, and ferrari
 * 4. Any word ending in ious
 * 5. A whitespace character followed by a period, comma, colon, or semicolon
 * 6. A word longer than six letters
 * 7. A word without the letter e (or E)
 *
 * Refer to the table in the chapter summary for help. Test each solution with a
 * few test strings.
 */

console.log("matching car and cat");
console.log(["car", "cat"].every(s => /ca[rt]/.test(s)));
console.log("matching pop and prop");
console.log(["pop", "prop"].every(s => /pr?op/));
console.log("matching ferret, ferry, and ferrari");
console.log(["ferret", "ferry", "ferrari"].every(s => /ferr(et|y|ari)/.test(s)));
console.log("matching words ending in ious");
console.log(["egregious", "prestigious", "avaricious", "unpretentious", "contentious"].every(s => /ious\b/.test(s)));
console.log("matching a whitespace character followed by a period, comma, colon, or semicolon");
console.log([" .", " ,", " :", " ;", "\t.", "\t,", "\t:", "\t;"].every(s => /\s[.,:;]/.test(s)));
console.log("matching a word longer than six letters");
console.log(["disinters", "plenary", "happens", "learned", "adhered"].every(s => /\w{7,}/i.test(s)));
console.log("matching a word without the letter e (or E)");
console.log(["virtuoso", "crisp", "scoldings", "Hippocratic", "Prohibition"].every(s => /\b[a-df-z]+\b/i.test(s)));
