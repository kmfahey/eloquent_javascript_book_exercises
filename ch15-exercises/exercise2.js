// The array of sparkle emoji that new sparkles are chosen from.
let sparkleEmoji = ["✨", "🌟", "💫"];

// The coordinates of the last sparkle dropped which are used to compute
// distance of the mousemove event to determine if it's been far enough for a
// new sparkle.
let lastSparkleCoords = [0, 0];

// The minimum distance in pixels that the mouse has to move before a new
// sparkle emoji can be dropped.
const sparkleMinDistance = 50;

// An array to cache the element objects so that the maximum length of trail can
// be kept to 4 sparkles.
let recentSparkleNodes = [];

// Select a random element from an array.
let randomChoice = (array) => array[Math.floor(Math.random() * array.length)];

// The algebraic distance formula that computes the distance between two
// coordinates.
function distanceFormula(firstCoords, secondCoords) {
    let [x1, y1] = firstCoords;
    let [x2, y2] = secondCoords;
    // d = √((x₂ - x₁)² + (y₂ - y₁)²)
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Attached to the mousemove event. When the mouse moves, if the distance from
// the last sparkle spawned is >= 50px, then a randomly chosen sparkle emoji
// is placed where the event occurred. The number of emoji trailing after the
// pointer is limited to 4. If there's more than 4 emoji in the trail, the extra
// one(s) are removed from the DOM.
function followMouseWithSparkles(event) {
    let thisSparkleCoords = [event.pageX, event.pageY];
    let distanceFromLastSparkle = distanceFormula(lastSparkleCoords,
                                                  thisSparkleCoords);
    // The last emoji is too close to this event, no new sparkle.
    if (distanceFromLastSparkle < sparkleMinDistance) return;
    
    // Creates and places a randomly chosen sparkle emoji.
    let newSparkleNode = document.createElement("div");
    newSparkleNode.innerHTML = randomChoice(sparkleEmoji);
    newSparkleNode.style = document.createAttribute("style");
    newSparkleNode.style.left = thisSparkleCoords[0] + "px";
    newSparkleNode.style.top = thisSparkleCoords[1] + "px";
    newSparkleNode.style.position = "absolute";
    document.body.appendChild(newSparkleNode);

    // Tracking the trail of sparkles and keeping it to at most 4 emoji in
    // length.
    recentSparkleNodes.unshift(newSparkleNode);
    while (recentSparkleNodes.length > 4) recentSparkleNodes.pop().remove();

    // Assigning this event's emoji coordinates to lastSparkleCoords so the
    // distance to it can be calculated in future listener calls.
    lastSparkleCoords = thisSparkleCoords;
}

// Technically this event can get called in a flurry and is a good candidate
// for debouncing. But since it exits fast if it's too close to the last emoji,
// and the fail-fast case only involves a few lines of algebra, in practice the
// full function only executes every 50px of mouse movement & it's effectively
// debounced.
document.body.addEventListener("mousemove", followMouseWithSparkles);
