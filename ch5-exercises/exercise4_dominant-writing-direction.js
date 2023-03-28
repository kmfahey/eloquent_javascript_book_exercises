/*
 * Dominant Writing Direction
 * 
 * Write a function that computes the dominant writing direction in a string of
 * text. Remember that each script object has a direction property that can be
 * "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).
 *
 * The dominant direction is the direction of a majority of the characters
 * that have a script associated with them. The characterScript and countBy
 * functions defined earlier in the chapter are probably useful here.
 */

require('./scripts.js');

/*
 * BEGIN code authored by Marijn Haverbecke under the following license.
 *
 * Copyright (C) 2008-2020 by Marijn Haverbeke <marijnh@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => { return code >= from && code < to; })) {
            return script;
        }
    }
    return null; 
}

function countBy(items, groupName) {
    let counts = []; for (let item of items) {
        let name = groupName(item); let known = counts.findIndex(c => c.name == name); if (known == -1) {
            counts.push({
                ame, count: 1
            }); 
        } else {
                    counts[known].count++; 
        } 
    } return counts; 
}

/*
 * END code authored by Marijn Haverbecke.
 */

function discernDominantWritingDir(string) {
    let dirsCounts = {ltr: 0, rtl: 0, ttb: 0};
    for (let character of string) {
        let codepointOfChar = character.codePointAt(0);
        let scriptOfChar = characterScript(codepointOfChar);
        if (scriptOfChar != undefined) {
            // characterScript only works on alphabetic characters
            dirsCounts[scriptOfChar.direction]++;
        }
    }
    if (dirsCounts.ltr > dirsCounts.rtl && dirsCounts.ltr > dirsCounts.ttb) {
        return "ltr";
    } else if (dirsCounts.rtl > dirsCounts.ltr && dirsCounts.rtl > dirsCounts.ttb) {
        return "rtl";
    } else if (dirsCounts.ttb > dirsCounts.rtl && dirsCounts.ttb > dirsCounts.ltr) {
        return "ttb";
    } else if (dirsCounts.ttb === 0 && dirsCounts.ltr > 0 && dirsCounts.ltr == dirsCounts.rtl) {
        throw new Error("string has no dominant direction; equal numbers of left-to-right and right-to-left characters found");
    } else if (dirsCounts.rtl === 0 && dirsCounts.ttb > 0 && dirsCounts.ltr == dirsCounts.ttb) {
        throw new Error("string has no dominant direction; equal numbers of left-to-right and top-to-bottom characters found");
    } else if (dirsCounts.ltr === 0 && dirsCounts.rtl > 0 && dirsCounts.rtl == dirsCounts.ttb) {
        throw new Error("string has no dominant direction; equal numbers of right-to-left and top-to-bottom characters found");
    } else {
        throw new Error("string has no dominant direction; string is zero-length");
    }
} 

console.log(discernDominantWritingDir("rowrbazzle"));
console.log(discernDominantWritingDir("my favorite number is א₀"));
console.log(discernDominantWritingDir("א₀"));
