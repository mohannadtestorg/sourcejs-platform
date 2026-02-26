/*
 * NodeJS module, included automatically from SourceJS app.js
 * ExpressJS middleware http://expressjs.com
 * */

var deepExtend = require('deep-extend');
var Path = require('path');
var fsUtils = require("nodejs-fs-utils");

// Module configuration
var globalConfig = global.opts.plugins && global.opts.plugins.pluginName ? global.opts.plugins.pluginName : {};
var config = {
    enabled: true,

    // Public object is exposed to Front-end via options API.
    public: {}
};

// Overwriting base options
deepExtend(config, globalConfig);

function renderStylestatsTOC() {
    var stylestatsRoot = global.app.get('user') + '/specs/stats';
    var statsLinks = [];
    fsUtils.walkSync(stylestatsRoot, {
        skipErrors  : true,
        logErrors   : true
    }, function (err, path, stats, next, cache) {
        if (!err && !stats.isDirectory() && path.match(/\/stylestats\/build.html$/)) {
            statsLinks.push(path);
        } else {
            next();
        }
    });
    var markup = '<ul>';
    statsLinks.forEach(function (item, index) {
        markup += '<li><a href="' + item.substr(item.indexOf('/specs/stats')) + '" target="statsframe">' + item.substring(item.indexOf('/specs/stats/') + 13, item.indexOf('/stylestats/build.html')) + '</a></li>';
    });
    markup += '</ul>';
    markup += '<iframe width="100%" height="500" name="statsframe" style="border: 1px solid #d1d2d3; background: #f5f6f7;"></iframe>';
    return markup;
}

// add global vars
global.pb = global.pb || {};

if (!global.pb.renderStylestatsTOC) {
    global.pb.renderStylestatsTOC = renderStylestatsTOC;
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