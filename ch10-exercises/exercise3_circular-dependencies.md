# Circular Dependencies

A circular dependency is a situation where module A depends on B, and B also,
directly or indirectly, depends on A. Many module systems simply forbid this
because whichever order you choose for loading such modules, you cannot make
sure that each module’s dependencies have been loaded before it runs.

CommonJS modules allow a limited form of cyclic dependencies. As long as the
modules do not replace their default exports object and don’t access each
other’s interface until after they finish loading, cyclic dependencies are
okay.

The require function given earlier in this chapter supports this type of
dependency cycle. Can you see how it handles cycles? What would go wrong when
a module in a cycle does replace its default exports object?

## The Function

    require.cache = Object.create(null);

    function require(name) {
        if (!(name in require.cache)) {
            let code = readFile(name);
            let module = {exports: {}};
            require.cache[name] = module;
            let wrapper = Function("require, exports, module", code);
            wrapper(require, module.exports, module);
        }
        return require.cache[name].exports;
    }

## The Answer

I wasn't able to piece this one together on my own. The answer from the answer
key in the back of the book is as follows:

> The trick is that require adds modules to its cache before it starts loading
> the module. That way, if any require call made while it is running tries to
> load it, it is already known, and the current interface will be returned,
> rather than starting to load the module once more (which would eventually
> overflow the stack).
> 
> If a module overwrites its module.exports value, any other module that has
> received its interface value before it finished loading will have gotten hold
> of the default interface object (which is likely empty), rather than the
> intended interface value.

Okay, I think I get it. Because the first time require is called with module A,
it'll insert it into the cache and call its IIFE. If that call requires module
B, then it'll get cached and its IIFE called as well.

But if module B requires module A, it's cached and the cached value is returned,
so module B gets a partially complete exports object which may or may not have
all the values it needs. But if its execution can complete with only the given
values, it does, then control flow reverts to module A which completes as well.

So long as module B doesn't need anything assigned to module A's exports object
after its require('B') call, the circular import resolves.
