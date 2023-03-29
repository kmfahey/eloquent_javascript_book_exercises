/*
 * Robot efficiency
 *
 * Can you write a robot that finishes the delivery task faster than
 * goalOriented? If you observe that robot’s behavior, what obviously stupid
 * things does it do? How could those be improved?
 *
 * If you solved the previous exercise, you might want to use your compareRobots
 * function to verify whether you improved the robot.
 */

require('./eloqjs_ch7-robot_module.js');

// This function written by ChatGPT. I had no idea what algorithm I even needed
// to use so I asked ChatGPT, turns out it's Dijkstra's Algorithm, which I've
// heard of but don't know. And here we are, written to spec.
function dijkstrasAlgorithm(graph, place, destsSet) {
  // Create a map to keep track of the shortest distance to each node
  const dist = new Map();
  for (let node of Object.keys(graph)) {
    dist.set(node, Infinity);
  }
  dist.set(place, 0);

  // Create a map to keep track of the previous node on the shortest path to each node
  const prev = new Map();

  // Create a set to keep track of nodes that haven't been visited yet
  const unvisited = new Set(Object.keys(graph));

  // Loop until all nodes have been visited
  while (unvisited.size > 0) {
    // Find the unvisited node with the shortest distance
    let currNode = null;
    let currDist = Infinity;
    for (let node of unvisited) {
      if (dist.get(node) < currDist) {
        currNode = node;
        currDist = dist.get(node);
      }
    }

    // Stop searching if the shortest path to any of the destinations is found
    if (destsSet.has(currNode)) {
      // Build the shortest path by following the previous nodes backwards
      const path = [currNode];
      let prevNode = prev.get(currNode);
      while (prevNode != null) {
        path.unshift(prevNode);
        prevNode = prev.get(prevNode);
      }
      return path;
    }

    // Update the distances to neighboring nodes
    for (let neighbor of graph[currNode]) {
      const alt = currDist + 1;
      if (alt < dist.get(neighbor)) {
        dist.set(neighbor, alt);
        prev.set(neighbor, currNode);
      }
    }

    // Mark the current node as visited
    unvisited.delete(currNode);
  }

  // If no path to any of the destinations is found, return null
  return null;
}

function setOfParcelPlaces(state) {
    let places = new Set();
    //console.log("generating set of parcel places");
    for (let parcel of state.parcels) {
        if (parcel.place === state.place) {
            continue;
        }
        places.add(parcel.place);
    }
    return places;
}

function setOfParcelAddresses(state) {
    let addresses = new Set();
    //console.log("generating set of parcel addresses");
    for (let parcel of state.parcels) {
        if (parcel.address === state.address) {
            continue;
        }
        addresses.add(parcel.address);
    }
    return addresses;
}

function routeToNearestDest(state, destsFunc) {
    let destsSet = destsFunc(state);
    let retval = dijkstrasAlgorithm(roadGraph, state.place, destsSet);
    //console.log(`Dijkstra's algorithm routes from ${state.place} via ${retval}`);
    return retval;
}

function nearestParcelFindingRobot(state, memory) {
    if (memory.length === 0) {
        //console.log("memory is zero length, finding new route");
        if (state.parcels.some(p => p.place !== state.place)) {
            //console.log("robot does not have all parcels, routing to nearest parcel to pick up");
            memory = routeToNearestDest(state, setOfParcelPlaces);
        } else {
            //console.log("robot has all parcels, routing to nearest address to deliver");
            memory = routeToNearestDest(state, setOfParcelAddresses);
        }
    }
    if (memory === null) {
        throw new Error("Dijktra's algorithm couldn't find a route to any node where a parcel is located or has an address for");
    }
    return { direction: memory[0], memory: memory.slice(1) };
}

randomState = VillageState.random(10);
runRobot(randomState, nearestParcelFindingRobot, []);

/* The following code borrowed from exercise1_measuring-a-robot.js */
function epochSeconds() {
    const now = new Date();
    const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    return utcMilllisecondsSinceEpoch / 1000;
}

function compareRobots(robot0, memory0, robot1, memory1) {
    let times0 = [], times1 = [];
    for (i = 0; i < 100; i++) {
        let state = VillageState.random();
        console.log(state.parcels);
        let startTime0 = epochSeconds();
        runRobot(state, robot0, memory0);
        let endTime0 = epochSeconds();
        let startTime1 = epochSeconds();
        runRobot(state, robot1, memory1);
        let endTime1 = epochSeconds();
        times0.push(endTime0 - startTime0);
        times1.push(endTime1 - startTime1);
    }
    sum0 = times0.reduce((a,b) => a + b, 0);
    sum1 = times1.reduce((a,b) => a + b, 0);
    average0 = sum0 / 100;
    average1 = sum1 / 100;
    fastest = average0 > average1 ? 0 : average1 > average0 ? 1 : -1;
    return {times0, average0, times1, average1, fastest};
}
/* end code from exercise1_measuring-a-robot.js */

let winners = [];

for (j = 0; j < 100; j++) {
    let outcome = compareRobots(routeRobot, mailRoute, nearestParcelFindingRobot, []);
    winners.push(outcome.fastest);
}

console.log(winners);

/*
 * Over 100 trials, routeRobot won 25, nearestParcelFindingRobot won 74, and
 * there was 1 tie. nearestParcelFindingRobot could be improved if it collected
 * parcels & distributed parcels in a single pass, rather than using two passes.
 * Although, my first implementation in that style never halted, so I adopted
 * the 2-pass style which did.
 */
