/*
 * Iterable Groups
 *
 * Make the Group class from the previous exercise iterable. Refer to the
 * section about the iterator interface earlier in the chapter if you aren’t
 * clear on the exact form of the interface anymore.
 *
 * If you used an array to represent the group’s members, don’t just return
 * the iterator created by calling the Symbol.iterator method on the array. That
 * would work, but it defeats the purpose of this exercise. It is okay if your
 * iterator behaves strangely when the group is modified during iteration.
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

    [Symbol.iterator]() {
        let _index = -1;
        return {
            next: () => {
                if (_index < this.array.length) {
                    _index++;
                }
                return {
                    // Falls off the end of the array in the done:true step but
                    // that's nbd.
                    value: this.array[_index],
                    done: _index === this.array.length
                }
            }
        }
    }
}

let group = new Group();
group.add('a');
group.add('b');
group.add('c');
console.log(group);

let group2 = Group.from(['a', 'b', 'c'])
console.log(group2);

for (let val of group2) {
    console.log(val);
    //group2.delete(val);
    //Confirmed, it acts strangely.
}
