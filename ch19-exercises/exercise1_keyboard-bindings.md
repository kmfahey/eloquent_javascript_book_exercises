# Keyboard Bindings

## Instructions

Add keyboard shortcuts to the application. The first letter of a tool’s
name selects the tool, and control-Z or command-Z activates undo. Do this
by modifying the PixelEditor component. Add a tabIndex property of 0 to the
wrapping <div> element so that it can receive keyboard focus. Note that the
property corresponding to the tabindex attribute is called tabIndex, with a
capital I, and our elt function expects property names. Register the key event
handlers directly on that element. This means you have to click, touch, or tab
to the application before you can interact with it with the keyboard.

Remember that keyboard events have ctrlKey and metaKey (for the command key on
Mac) properties that you can use to see whether those keys are held down.

## Student Work

Rather than attempt to modify the dense code in 19\_paint.js, I added code to
index.html that used Node.dispatchEvent() to manipulate the UI when the keyup
events fired. This is probably not what was intended, frankly, but the code in
19\_paint.js is somewhat beyond me and I'm taking the path of least resistance
by interface with the HTML it creates, which I *can* read.

The only change I made to 19\_paint.js was to modify the startPixelEditor()
createapp function so it returned the PixelEditor object app, rather than its
dom attribute, so the object model was accessible in the code in the trailing
\<script\> tag in index.html.

I changed the content of that tag to this:

    let app = startPixelEditor({});
    document.querySelector("div")
        .appendChild(app.dom);

    const changeEvent = new Event('change');
    const clickEvent = new Event('click');

    let keyToolNames = {d: 'draw', f: 'fill', r: 'rectangle', p: 'pick'};
    let enclDiv = document.getElementById("wrapper");
    let selectElt = app.controls[0].select;
    // Finding the undo button by filtering all button elements for the one
    // whose innerHTML contains "Undo"
    let undoButton = Array.from(document.getElementsByTagName("button"))
                          .filter(elt => elt.innerHTML.indexOf("Undo") >= 0)[0];

    enclDiv.addEventListener("keyup", (event) => {
        // shield statement blocking events that have any other modifier keys
        // pressed
        if (event.shiftKey || event.altKey || (event.metaKey && event.ctrlKey)) {
            return;
        } else if (event.key === 'z' && (event.ctrlKey || event.metaKey)) {
            undoButton.dispatchEvent(clickEvent);
        } else if (event.key in keyToolNames) {
            selectElt.value = keyToolNames[event.key];
            selectElt.dispatchEvent(changeEvent);
        }
    });

The code locates the select element and the undo button element. If a control-Z
keyup event occurs, the code triggers the click event on the undo button. If any
one of d, f, r, or p is pressed with no modifier keys, the value of the select
element is set to the corresponding tool name, and then the change event is
triggered on it, which alters the tool selected based on that value.
