/*
 * Roads Module
 *
 * Write a CommonJS module, based on the example from Chapter 7, that contains
 * the array of roads and exports the graph data structure representing them as
 * roadGraph. It should depend on a module ./graph , which exports a function
 * buildGraph that is used to build the graph. This function expects an array of
 * two-element arrays (the start and end points of the roads).
 */

/*
 * The only way to test whether I've properly modularized buildGraph into
 * graph.js and roadGraph into road-graph.js is to build a module system around
 * them that depends on them, and try to import them. So I've recapitulated my
 * work from chpter 7 exercises 1 and 2 in module form to make sure I'm doing
 * this right.
 */

let {mailRoute, routeRobot} = require('./graph-robots-examples.js');
let {compareRobots, nearestParcelFindingRobot} = require('./robots-kmf.js');

let competitors = [routeRobot.name, nearestParcelFindingRobot.name];
let winners = [];

for (j = 0; j < 100; j++) {
    let outcome = compareRobots(routeRobot, mailRoute, nearestParcelFindingRobot, []);
    winners.push(outcome.fastest);
}

let zeroWonCount = 0, oneWonCount = 0, tieCount = 0;

for (let trit of winners) {
    if (trit === 1) oneWonCount += 1
    else if (trit === 0) zeroWonCount += 1
    // -1 signifies a tie
    else tieCount += 1;
}

if (oneWonCount >= zeroWonCount) console.log(`${competitors[1]} beat ${competitors[0]}, ${oneWonCount} to ${zeroWonCount} with ${tieCount} ties`);
else console.log(`${competitors[0]} beat ${competitors[1]}, ${zeroWonCount} to ${oneWonCount} with ${tieCount} ties`);
