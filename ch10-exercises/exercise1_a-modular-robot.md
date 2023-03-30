# A Modular Robot

These are the bindings that the project from Chapter 7 creates:

* roads
* buildGraph
* roadGraph
* VillageState
* runRobot
* randomPick
* randomRobot
* mailRoute
* routeRobot
* findRoute
* goalOrientedRobot

If you were to write that project as a modular program, what modules would
you create? Which module would depend on which other module, and what would
their interfaces look like?

Which pieces are likely to be available prewritten on NPM? Would you prefer
to use an NPM package or write them yourself?

# Answer

## graph-robots-base.js

### Private

I would create a module graph-robots-base.js with these private values:

* roads
* buildGraph

Roads isn't used by the code, it's a precursor value; and buildGraph() is
specialized to deriving the adjacency list from it. Neither needs to be public,
they have no general utility.

### Public

I would write VillageState with the static method random() included in its
original definition.

I would include these public values in graph-robots-base.js to be exported:

* roadGraph
* VillageState
* runRobot

## graph-robots-examples.js

### Private

I would create a module graph-robots-examples.js that imported
graph-robots-base.js. I'd set it up to have this private value:

* findRoute
* mailRoute
* randomPick

These are utility functions and utility data structures, each required by a
robot for it to function but not in any way meaningful to export. If the code
had been written with better encapsulation these would be internal or private
values to the definition of their respective robots.

### Public

I would include these public values in graph-robots-base.js to be exported:

* randomRobot
* routeRobot
* goalOrientedRobot

These are all example robots that can be compared against other robots to
evaluate their performance solving the routing puzzle. These are what the module
is intended to furnish and these are the only public values needed.

## Prewritten

Although I do not recognize it, I feel sure that the graph algorithm implemented
in findRoute() is a reimplementation of a previously-known, named graph
algorithm of some pedigree. It's probably findable in some generic form on NPM.
Whether adapting its generic form to this special case is worth the trouble
depends on how flexible its implementation is. It may still be simpler to use
our own implementation, given how succinct it is.
