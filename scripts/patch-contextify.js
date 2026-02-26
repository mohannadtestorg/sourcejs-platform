'use strict';
// Replaces the native contextify addon with a pure-JS vm shim.
// Handles both hoisted (node_modules/contextify) and nested
// (node_modules/jsdom/node_modules/contextify) locations.

var fs = require('fs');
var path = require('path');

var shim = [
    "'use strict';",
    "// Pure-JS vm shim replacing the native contextify addon.",
    "var vm = require('vm');",
    "function Contextify(sandbox) {",
    "    if (typeof sandbox != 'object') { sandbox = {}; }",
    "    vm.createContext(sandbox);",
    "    sandbox.run = function(code, filename) {",
    "        return vm.runInContext(code, sandbox, filename ? { filename: filename } : {});",
    "    };",
    "    sandbox.getGlobal = function() { return sandbox; };",
    "    sandbox.dispose = function() {",
    "        sandbox.run = function() { throw new Error('Called run() after dispose().'); };",
    "        sandbox.getGlobal = function() { throw new Error('Called getGlobal() after dispose().'); };",
    "        sandbox.dispose = function() { throw new Error('Called dispose() after dispose().'); };",
    "    };",
    "    return sandbox;",
    "}",
    "Contextify.createContext = function(sandbox) {",
    "    if (typeof sandbox != 'object') { sandbox = {}; }",
    "    vm.createContext(sandbox);",
    "    return sandbox;",
    "};",
    "Contextify.createScript = function(code, filename) {",
    "    if (typeof code != 'string') { throw new TypeError('Code argument is required'); }",
    "    return new vm.Script(code, filename ? { filename: filename } : {});",
    "};",
    "module.exports = Contextify;"
].join('\n');

var candidates = [
    path.join(__dirname, '../node_modules/contextify/lib/contextify.js'),
    path.join(__dirname, '../node_modules/jsdom/node_modules/contextify/lib/contextify.js')
];

var patched = 0;
candidates.forEach(function(target) {
    if (fs.existsSync(target)) {
        fs.writeFileSync(target, shim, 'utf8');
        console.log('patch-contextify: patched', target);
        patched++;
    }
});

if (patched === 0) {
    console.log('patch-contextify: no contextify installations found, skipping.');
}
