/*
 * Efficient Drawing
 *
 * During drawing, the majority of work that our application does happens in
 * drawPicture. Creating a new state and updating the rest of the DOM isn’t
 * very expensive, but repainting all the pixels on the canvas is quite a bit of
 * work.
 *
 * Find a way to make the syncState method of PictureCanvas faster by redrawing
 * only the pixels that actually changed.
 *
 * Remember that drawPicture is also used by the save button, so if you change
 * it, either make sure the changes don’t break the old use or create a new
 * version with a different name.
 *
 * Also note that changing the size of a <canvas> element, by setting its width
 * or height properties, clears it, making it entirely transparent again.
 */

