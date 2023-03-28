/*
 * A Vector Type
 *
 * Write a class Vec that represents a vector in two-dimensional space. It takes
 * x and y parameters (numbers), which it should save to properties of the same
 * name.
 *
 * Give the Vec prototype two methods, plus and minus, that take another
 * vector as a parameter and return a new vector that has the sum or difference
 * of the two vectors’ (this and the parameter) x and y values. Add a
 * getter property length to the prototype that computes the length of the
 * vector—that is, the distance of the point (x, y) from the origin (0, 0).
 */

class Vec {
    x = null;
    y = null;

    constructor(x, y) {
        if (!typeof x === "number" && !typeof x === "bigint") {
            throw new Error("value for x not a number or bigint");
        } else if (!typeof y === "number" && !typeof y === "bigint") {
            throw new Error("value for y not a number or bigint");
        }
        this.x = x
        this.y = y
    }

    get length() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    toString() {
        return `Vec(${this.x}, ${this.y})`;
    }
}

let vector = new Vec(3,4);

console.log(vector.toString());
console.log(vector.length);
