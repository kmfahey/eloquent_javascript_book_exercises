let balloonSize = 100;
let balloonSpanNode = document.getElementById("balloon");
balloonSpanNode.style = document.createAttribute("style");
balloonSpanNode.style.fontSize = balloonSize+"%"

function inflateOrDeflate(event) {
    let modifierKeysUsed = [event.shiftKey, event.ctrlKey, event.altKey, event.metaKey].includes(true);
    if (modifierKeysUsed) return;
    switch (event.key) {
        case "ArrowUp":
            if (balloonSize >= 35) {
                balloonSize += 25;
                balloonSpanNode.style.fontSize = balloonSize + "%";
            }
            break;
        case "ArrowDown":
            if (balloonSize <= 375) {
                balloonSize += 25;
                balloonSpanNode.style.fontSize = balloonSize + "%";
            }
            break;
        default:
            break;
    }
}

let balloonBurstYet = false;
let timeoutObj;
let balloonSizeAdjEL = (event) => {
    clearTimeout(timeoutObj);
    timeoutObj = setTimeout(() => {
        inflateOrDeflate(event);
    }, 250);
}

document.body.addEventListener("keydown", balloonSizeAdjEL);

document.body.addEventListener("keydown", (event) => {
    if (!balloonBurstYet && balloonSize >= 400) {
        balloonSpanNode.innerHTML = "💥";
        document.body.removeEventListener("keydown", balloonSizeAdjEL);
        balloonBurstYet = true;
    }
});
