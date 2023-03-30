
let {roadGraph} = require('./road-graph.js');

// Equivalent to python's random.choice().
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

var VillageState = class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        // If there's no edge connecting the current node to the destination
        // node, return the current object signifying no move.
        if (!roadGraph[this.place].includes(destination)) {
            // The parcel list is iterated over. Every parcel that's not already
            // at the current location doesn't move because it hasn't been
            // picked up.
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            // Every parcel whose place now equals its [destination] address is
            // culled from the parcel list bc it has implicitly been delivered.
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }

    static random(parcelCount = 5) {
        let parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            let address = randomPick(Object.keys(roadGraph));
            let place;
            do {
                place = randomPick(Object.keys(roadGraph));
            } while (place == address);
            parcels.push({place, address});
        }
        return new VillageState("Post Office", parcels);
    }
}

function runRobot(state, robot, memory) {
    // Infinite loop until break occurs. Dangerous if robot's badly designed and
    // does not guaranteeably complete its deliveries within finite time.
    for (let turn = 0;; turn++) {
        // If the parcels list has reached zero, deliveries are complete.
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        // The robot argument is a function in 2 arguments, a VillageState
        // object and an arbitrary memory object (may be undefined), that
        // returns an action object. It must guarantee that it will reduce the
        // parcel list to 0 within finite time or the runRobot function will
        // never return.
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

exports.randomPick = randomPick;
exports.roadGraph = roadGraph;
exports.runRobot = runRobot;
exports.VillageState = VillageState;
