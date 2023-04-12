# Precomputed Mirroring

## Instructions

One unfortunate thing about transformations is that they slow down
the drawing of bitmaps. The position and size of each pixel has to be
transformed, and though it is possible that browsers will get cleverer about
transformation in the future, they currently cause a measurable increase in
the time it takes to draw a bitmap.

In a game like ours, where we are drawing only a single transformed sprite,
this is a nonissue. But imagine that we need to draw hundreds of characters
or thousands of rotating particles from an explosion.

Think of a way to allow us to draw an inverted character without loading
additional image files and without having to make transformed drawImage calls
every frame.

## Student Work


