/*
 * NodeJS module, included automatically from SourceJS app.js
 * ExpressJS middleware http://expressjs.com
 * */

var deepExtend = require('deep-extend');
var Path = require('path');
var specUtils = require(Path.join(global.pathToApp,'core/lib/specUtils'));

// Module configuration
var globalConfig = global.opts.plugins && global.opts.plugins.pluginName ? global.opts.plugins.pluginName : {};
var config = {
    enabled: true,

    // Public object is exposed to Front-end via options API.
    public: {}
};

// Overwriting base options
deepExtend(config, globalConfig);

function renderDropzone(thisWidget, dropZoneName) {
    return '<div class="dropzone" data-name="' + dropZoneName + '"></div>';
}

// add global vars
global.pb = global.pb || {};

if (!global.pb.renderDropzone) {
    global.pb.renderDropzone = renderDropzone;
}

/*
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 * */
var processRequest = function (req, res, next) {
    next();
};

exports.process = processRequest;