/*
 * Groups
 *
 * The standard JavaScript environment provides another data structure called
 * Set. Like an instance of Map, a set holds a collection of values. Unlike Map,
 * it does not associate other values with those—it just tracks which values
 * are part of the set. A value can be part of a set only once—adding it again
 * doesn’t have any effect.
 *
 * Write a class called Group (since Set is already taken). Like Set, it has
 * add, delete, and has methods. Its constructor creates an empty group, add
 * adds a value to the group (but only if it isn’t already a member), delete
 * removes its argument from the group (if it was a member), and has returns a
 * Boolean value indicating whether its argument is a member of the group.
 *
 * Use the === operator, or something equivalent such as indexOf, to determine
 * whether two values are the same.
 *
 * Give the class a static from method that takes an iterable object as argument
 * and creates a group that contains all the values produced by iterating over
 * it.
 */

class Group {
    constructor() {
        this.array = []
    }

    add(value) {
        if (this.array.indexOf(value) == -1) {
            this.array.push(value);
        }
    }

    delete(value) {
        let valueIndex = this.array.indexOf(value);
        if (valueIndex == -1) return false;
        this.array.splice(valueIndex, 1);
        return true;
    }

    has(value) {
        return this.array.indexOf(value) != -1;
    }

    static from(iterable) {
        let group = new Group();
        for (let value of iterable) {
            group.add(value);
        }
        return group;
    }
}

let group = new Group();
group.add('a');
group.add('b');
group.add('c');
console.log(group);

let group2 = Group.from(['a', 'b', 'c'])
console.log(group2);
