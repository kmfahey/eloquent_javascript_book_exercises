/*
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

// The graph stored as an edge list.
var roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

// Converts the edge list to an adjacency list.
function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

var roadGraph = buildGraph(roads);

/*
 * It's not defined anywhere but a parcel is an object with a place property and
 * an address property. The place property is set equal to the node the parcel
 * is currently at. The address property is the destination of the parcel. When
 * the place property equals the address property, the parcel is considered
 * delivered.
 */

var VillageState = class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        // If there's no edge connecting the current node to the destination
        // node, return the current object signifying no move.
        if (!roadGraph[this.place].includes(destination)) {
            return this;

        } else {
            // The parcel list is iterated over. Every parcel that's not already
            // at the current location doesn't move because it hasn't been
            // picked up.
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) { 
                    return p;
                }
                return {
                    place: destination,
                    address: p.address
                };
            // Every parcel whose place now equals its [destination] address is
            // culled from the parcel list bc it has implicitly been delivered.
            }).filter(p => {
                p.place != p.address;
            });
            return new VillageState(destination, parcels);
        }
    }
}

// It's not defined anywhere, but an action is an object with a direction
// property and [optionally] a memory property. The direction property's value
// is the name of the node that's being travelled to next, and the memory
// property if present is the robot's state as of that action.

function runRobot(state, robot, memory) {
    // Infinite loop until break occurs. Dangerous if robot's badly designed and
    // does not guaranteeably complete its deliveries within finite time.
    for (let turn = 0; true; turn++) {

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

// Equivalent to python's random.choice().
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

// A robot that moves to a random adjacent node each turn. It keeps no state.
function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

// Adding a method to the VillageState class that generates a new state with a
// set of randomly generated parcels (default length 5 parcels).
VillageState.random = function(parcelCount = 5) {
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
};

var mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

// A robot that follows a predefined delivery route. Its state is the delivery
// route, which is redefined to remove its element at index 0 each turn.
function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

// This algorithm builds a list of possible routes through the neighborhood
// until the first time it builds a route that ends in its destination node.
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        // Iterate over all nodes adjacent to the `at` node.
        for (let place of graph[at]) {
            // If this node equals the to node, the route can end with this
            // node. Return the route up to this point plus this node.
            if (place == to) return route.concat(place);
            // If the work list does not already contain an entry for at this
            // place, add one.
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

// This robot uses the findRoute() algorithm to find the route to the
// destination of the next parcel on its list.
function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
    module.exports = [roads, buildGraph, roadGraph, VillageState, runRobot, randomPick, randomRobot, mailRoute, routeRobot, findRoute, goalOrientedRobot];
if (typeof global != "undefined" && !global.buildGraph) {
    global.roads = roads;
    global.buildGraph = buildGraph;
    global.roadGraph = roadGraph;
    global.VillageState = VillageState;
    global.runRobot = runRobot;
    global.randomPick = randomPick;
    global.randomRobot = randomRobot;
    global.mailRoute = mailRoute;
    global.routeRobot = routeRobot;
    global.findRoute = findRoute;
    global.goalOrientedRobot = goalOrientedRobot;
}
