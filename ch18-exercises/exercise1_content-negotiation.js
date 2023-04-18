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

const url = "https://eloquentjavascript.net/author";

let validContentTypes = ["text/plain", "text/html", "application/json"];
let contentBodies = new Map();
let requestsPrm = [];

/* 
 * This program uses global flags and setInterval() callbacks to resynchronize
 * the control flow after each dispatch of control to the resolution of a
 * promise or promises.
 *
 * The asynchronous code stores any outcomes in the global
 * data structure contentBodies, and sets a global flag when it's completed. In
 * the global scope a setInterval() call repeatedly checks for that flag until
 * it's true, whereupon the sync. code that was waiting on the async. code to
 * complete runs.
 *
 * These are booleans used to signal completion of various asynchronous tasks.
 */
let firstPassFetched = false;
let firstPassDisplayed = false;
let secondPassFetched = false;

// FIRST PASS: fetching the url with Accept of each content-type in
// validContentTypes.

// Collecting promises from the fetch() of ${url} with each Accept content-type.
for (let contentType of validContentTypes) {
    requestsPrm.push(fetch(url, {headers: {Accept: contentType}}));
}

// Promise code to collect the body text from each fetch() call and store it in
// contentBodies.
let allReqsPrms = Promise.all(requestsPrm);

allReqsPrms.then(responses => {
    // Collecting promises from each response.text() call.
    let textsPrms = [];
    for (let response of responses) {
        textsPrms.push(response.text());
    };

    // Waiting on all response.text() promises.
    let allTextsPrms = Promise.all(textsPrms);

    allTextsPrms.then(texts => {
        // Storing the response bodies in global data structure contentBodies.
        for (i = 0; i < 3; i++) {
            let contentType = validContentTypes[i];
            let reqText = texts[i];
            contentBodies.set(contentType, reqText);
        }

        // Setting global flag that setInterval() call below is looking for.
        firstPassFetched = true;
    }).catch(error => {
        console.log(error);
    });
});

// Checks for completion of above promise code 10 times a second. Runs
// displayOutcomes() for validContentTypes when it's done.
let firstPassDisplayIntervalId = setInterval(() => {
    if (firstPassFetched) {
        clearInterval(firstPassDisplayIntervalId);
        displayOutcomes(validContentTypes);
        firstPassDisplayed = true;
    };
}, 100);

// SECOND PASS: fetching the url with Accept: application/rainbows+unicorns
let secondPassFetchIntervalId = setInterval(() => {
    if (firstPassDisplayed) {
        clearInterval(secondPassFetchIntervalId);
        let ringerPrm = fetch(url, {headers: {Accept: "application/rainbows+unicorns"}});
        // Collecting the body text of the response.
        ringerPrm.then(response => {
            let ringerTextPrm = response.text();
            ringerTextPrm.then(text => {
                contentBodies.set("application/rainbows+unicorns", text);
                // Setting global flag that setInterval() below is looking for.
                secondPassFetched = true;
            }).catch(error => {
                console.log(error);
            });
        });
    }
});

// Checks for completion of above promise code 10 times a second. Runs
// displayOutcomes() for application/rainbows+unicorns when it's done.
let secondPassDisplayIntervalId = setInterval(() => {
    if (secondPassFetched) {
        clearInterval(secondPassDisplayIntervalId);
        displayOutcomes(["application/rainbows+unicorns"]);
    }
}, 100);

// Displays the body text from contentBodies for each content-type in its
// argument.
function displayOutcomes(contentTypes, error=false) {
    for (let contentType of contentTypes) {
        let replyBody = contentBodies.get(contentType);
        console.log(`REQUESTING ${url} WITH Accept: ${contentType} HEADER YIELDED THIS BODY TEXT:`);
        console.log(replyBody);
    }
}
