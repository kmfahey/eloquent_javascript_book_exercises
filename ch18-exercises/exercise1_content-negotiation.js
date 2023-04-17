/*
 * Content Negotiation
 *
 * One of the things HTTP can do is called content negotiation. The Accept
 * request header is used to tell the server what type of document the client
 * would like to get. Many servers ignore this header, but when a server knows
 * of various ways to encode a resource, it can look at this header and send the
 * one that the client prefers.
 *
 * The URL https://eloquentjavascript.net/author is configured to respond with
 * either plaintext, HTML, or JSON, depending on what the client asks for. These
 * formats are identified by the standardized media types text/plain, text/html,
 * and application/json.
 *
 * Send requests to fetch all three formats of this resource. Use the headers
 * property in the options object passed to fetch to set the header named Accept
 * to the desired media type.
 *
 * Finally, try asking for the media type application/rainbows+unicorns and see
 * which status code that produces.
 */


let contentTypes = ["text/plain", "text/html", "application/json"];
let requestsArray = [];
let allFetched = false;
let outcomesDisplayed = false;
let contentBodies = new Map();
let url = "https://eloquentjavascript.net/author";

for (let contentType of contentTypes) {
    requestsArray.push(fetch(url, {headers: {Accept: contentType}}));
}

let allReqs = Promise.all(requestsArray);

allReqs.then(responses => {
    let textsArray = [];
    for (let response of responses) {
        textsArray.push(response.text());
    };
    let allTexts = Promise.all(textsArray);
    allTexts.then(texts => {
        for (i = 0; i < 3; i++) {
            let contentType = contentTypes[i];
            let reqText = texts[i];
            contentBodies.set(contentType, reqText);
        }
        allFetched = true;
    }).catch(error => {
        console.log(error);
    });
});

let intervalId = setInterval(() => {
    if (allFetched) {
        clearInterval(intervalId);
        displayOutcomes();
    };
}, 100);

function displayResolveOutcomes() {
    for (let [contentType, reqBody] of contentBodies.entries()) {
        console.log(`requesting ${url} with Accept: ${contentType} header yielded this body text:`);
        console.log(reqBody);
    }
}
