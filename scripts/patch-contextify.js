'use strict';
// Replaces the native contextify addon with a pure-JS vm shim.
// Run after `npm install --ignore-scripts` to ensure Node can load jsdom
// on any architecture (e.g. arm64, serverless environments).

var fs = require('fs');
var path = require('path');

var targetPath = path.join(__dirname, '../node_modules/jsdom/node_modules/contextify/lib/contextify.js');

if (!fs.existsSync(targetPath)) {
    console.log('patch-contextify: target not found at', targetPath, '— skipping.');
    process.exit(0);
}

var shim = [
    "'use strict';",
    "// Pure-JS shim replacing the native contextify addon.",
    "// Uses Node's built-in vm module which provides equivalent functionality.",
    "var vm = require('vm');",
    "",
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

fs.writeFileSync(targetPath, shim, 'utf8');
console.log('patch-contextify: vm shim written to', targetPath);
