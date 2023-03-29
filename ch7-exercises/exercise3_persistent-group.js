/*
 * Persistent group
 *
 * Most data structures provided in a standard JavaScript environment aren’t
 * very well suited for persistent use. Arrays have slice and concat methods,
 * which allow us to easily create new arrays without damaging the old one. But
 * Set, for example, has no methods for creating a new set with an item added or
 * removed.
 *
 * Write a new class PGroup, similar to the Group class from Chapter 6, which
 * stores a set of values. Like Group, it has add, delete, and has methods.
 *
 * Its add method, however, should return a new PGroup instance with the given
 * member added and leave the old one unchanged. Similarly, delete creates a new
 * instance without a given member.
 *
 * The class should work for values of any type, not just strings. It does not
 * have to be efficient when used with large amounts of values.
 *
 * The constructor shouldn’t be part of the class’s interface (though
 * you’ll definitely want to use it internally). Instead, there is an empty
 * instance, PGroup.empty, that can be used as a starting value.
 *
 * Why do you need only one PGroup.empty value, rather than having a function
 * that creates a new, empty map every time?
 */

require('./eloqjs_ch7-robot_module.js');

class PGroup {
    constructor() {
        this.obj = Object.create(null);
    }

    add(value) {
        if (value in this.obj) {
            return this;
        }
        let other = new PGroup();
        Object.assign(other.obj, this.obj);
        other.obj[value] = true;
        return other;
    }

    delete(value) {
        if (!value in this.obj) {
            return this;
        }
        let other = new PGroup();
        for (let key of Object.keys(this.obj)) {
            if (key === value) continue;
            other.obj[key] = true;
        }
        return other;
    }

    has(value) {
        return value in this.obj;
    }

    static from(iterable) {
        let group = new PGroup();
        for (let value of iterable) {
            group = group.add(value);
        }
        return group;
    }

    empty = constructor();
}

let group = new PGroup();
group = group.add('a');
group = group.add('b');
group = group.add('c');
console.log(group);

let group2 = PGroup.from(['a', 'b', 'c'])
console.log(group2);

// Only 1 empty instance is needed as a starting point bc none of the methods on
// the class mutate the object's state; if they would normally be mutators in
// this case they instance a new object and populate it the same values as the
// current object has before operating on it.
