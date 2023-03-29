/*
 * Measuring a Robot
 *
 * It’s hard to objectively compare robots by just letting them solve a few
 * scenarios. Maybe one robot just happened to get easier tasks or the kind of
 * tasks that it is good at, whereas the other didn’t.
 *
 * Write a function compareRobots that takes two robots (and their starting
 * memory). It should generate 100 tasks and let each of the robots solve each
 * of these tasks. When done, it should output the average number of steps each
 * robot took per task.
 *
 * For the sake of fairness, make sure you give each task to both robots, rather
 * than generating different tasks per robot.
 */

require('./eloqjs_ch7-robot_module.js');

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

console.log(compareRobots(randomRobot, [], routeRobot, mailRoute));

