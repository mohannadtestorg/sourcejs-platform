/*
 * NodeJS module, included automatically from SourceJS app.js
 * ExpressJS middleware http://expressjs.com
 * */

var deepExtend = require('deep-extend');
var Path = require('path');
var specUtils = require(Path.join(global.pathToApp,'core/lib/specUtils'));
var fs = require('fs');
var jade = require('jade');
var jsonRefs = require('json-refs');
var Promise = require('promise');
var _ = require('lodash');

// Module configuration
var globalConfig = global.opts.plugins && global.opts.plugins.pluginName ? global.opts.plugins.pluginName : {};
var config = {
    enabled: true,

    // Public object is exposed to Front-end via options API.
    public: {}
};

// Overwriting base options
deepExtend(config, globalConfig);

/*
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 * */
var processRequest = function (req, res, next) {
    if (req.path.endsWith('index.jade')) {
        let regexProduct = /^\/specs\/products\/([^\/]+).*\/index\.jade$/;
        let productMatch = regexProduct.exec(req.path);
        // set current product name for pb.render
        if (productMatch) {
            global.styleguideProductName = productMatch[1];
        } else {
            global.styleguideProductName = '';
        }
    }

    if (!config.enabled) {
        next();
        return;
    }

    var specData = {};

    function processData(data, parentItem) {
        parentItem = parentItem || specData;
        parentItem.promises = parentItem.promises || [];

        for (let key in data) {
            if (!data.hasOwnProperty(key) || key === 'promises') {
                continue;
            }

            var val = data[key];
            if (_.isObject(val)) {
                if (typeof val['$pug'] !== 'undefined') { // value is Pug template, compile template, generate HTML and add to specData
                    parentItem[key] = val;
                    var promise = new Promise(function (resolve, reject) {
                        var templateFile = Path.join(specDir, val['$pug'].template);
                        var templateCompiled = jade.compileFile(templateFile, {
                            basedir: global.app.get('user')
                        });
                        var templateOutput = '';
                        processData(val['$pug'].data, parentItem[key]['$pug'].data);
                        Promise.all(parentItem[key]['$pug'].data.promises).then(function () {
                            try {
                                templateOutput = templateCompiled(parentItem[key]['$pug'].data);
                            } catch (err) {
                                var context = JSON.parse(JSON.stringify(parentItem[key]['$pug'].data));
                                if (context.promises) {
                                    delete context.promises
                                }
                                console.error('Rendering of "', templateFile, '" failed!\n');
                                console.error('Context: ', context, '\n');
                                console.error(err);
                            }
                            parentItem[key] = templateOutput;
                            resolve('All children resolved');
                            delete(parentItem[key]['$pug'].data.promises);
                        }, function (e) {
                            console.error(e);
                        });
                    });
                    parentItem.promises.push(promise);
                } else { // is plain JS object
                    parentItem[key] = val;
                    var promise = new Promise(function (resolve, reject) {
                        processData(val, parentItem[key]);
                        Promise.all(parentItem[key].promises).then(function () {
                            resolve('All children resolved');
                            delete(parentItem[key].promises);
                        }, function (e) {
                            console.error(e);
                        });
                    });
                    parentItem.promises.push(promise);
                }
            }
        }
    }

    if (req.specData && req.specData.renderedHtml) {
        var ext = Path.extname(req.path);
        if (ext === '.jade' || ext === '.pug') {
            var specDir = specUtils.getFullPathToSpec(req.path);
            var specFilePath = specUtils.getSpecFromDir(specDir);
            var infoPath = Path.join(Path.dirname(specFilePath), 'info.json');

            try {
                // resolve JSON References before further processing
                jsonRefs.resolveRefsAt(infoPath).then(function (res) {
                    var info = res.resolved;
                    if (info.templateData) {
                        processData(info.templateData);
                        // wait for all JSON reference promises to be resolved and update Pug template with the data
                        Promise.all(specData.promises).then(function () {
                            delete(specData.promises);
                            if (req.specData.renderedHtml.indexOf('block content') > -1) {
                                req.specData.renderedHtml = req.specData.renderedHtml.replace('block content', 'block content\n' + '    - const data = ' + JSON.stringify(specData) + '\n');
                            } else {
                                req.specData.renderedHtml = '- const data = ' + JSON.stringify(specData) + '\n' + req.specData.renderedHtml;
                            }
                            next();
                        }, function (e) {
                            console.error(e);
                        });
                    } else {
                        next();
                    }
                }, function (e) {
                    console.error(e);
                });
            } catch (e) {
                console.error(e);
                next();
            }
        } else {
            next();
        }
    } else {
        next();
    }
};

exports.process = processRequest;