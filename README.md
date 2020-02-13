This repo demonstrates the bug of nodeResolve 7.1.x when using the "only" or "resolveOnly" option.

Run `node build.js`.

This runs a build of the `input/1.js` file (which imports `input/2.js`) to `output/output.js`.

The command runs the same build with multiple configs and verifies if the build happened correctly.

The problem is that configs with nodeResolve 7.1.x fail to properly bundle the `2.js` file into the output when the 
`resolveOnly` option is used, and even straight-up fail building if a relative path is used.
