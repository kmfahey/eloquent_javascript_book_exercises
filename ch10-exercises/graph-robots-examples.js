
let {randomPick, roadGraph} = require('./graph-robots-base.js');

// This algorithm builds a list of possible routes through the neighborhood
// until the first time it builds a route that ends in its destination node.
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

var mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

// A robot that moves to a random adjacent node each turn. It keeps no state.
function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

// a robot that follows a predefined delivery route. its state is the delivery
// route, which is redefined to remove its element at index 0 each turn.
function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
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

exports.goalOrientedRobot = goalOrientedRobot;
exports.mailRoute = mailRoute;
exports.randomRobot = randomRobot;
exports.routeRobot = routeRobot;
