/*
 * NodeJS module, included automatically from SourceJS app.js
 * ExpressJS middleware http://expressjs.com
 * */
var deepExtend = require('deep-extend');
var fs = require('fs');
var jade = require('jade');


// Module configuration
var globalConfig = global.opts.plugins && global.opts.plugins.pluginName ? global.opts.plugins.pluginName : {};
var config = {
    enabled: true,

    // Public object is exposed to Front-end via options API.
    public: {}
};

var customLogLevel = global.commander && global.commander.log ? global.commander.log : undefined;
var defaultLogLevel = global.MODE === 'production' ? global.opts.core.common.defaultProdLogLevel : global.opts.core.common.defaultLogLevel;
var logLevel = customLogLevel || defaultLogLevel;

// Overwriting base options
deepExtend(config, globalConfig);

function getLookupFolders(product) {
    var ux3Path = global.app.get('user') + '/specs/ux3';
    var productGroupPath = '';
    if (product && product.indexOf(':') > -1) {
        product = product.replace(':', '/');
        productGroupPath = global.app.get('user') + '/specs/products/' + product.split('/')[0];
    }
    var productPath = global.app.get('user') + '/specs/products/' + (product || '');

    var productGroupFolders = [];
    if (productGroupPath) {
        productGroupFolders = [
            productGroupPath + '/basic/',
            productGroupPath + '/components/',
            productGroupPath + '/widgets/',
            productGroupPath + '/widgets/commerce/widgets/',
            productGroupPath + '/widgets/raa/widgets/',
            productGroupPath + '/templates/'
        ];
    }

    var productFolders = [
        productPath + '/basic/',
        productPath + '/components/',
        productPath + '/widgets/',
        productPath + '/widgets/commerce/widgets/',
        productPath + '/widgets/raa/widgets/',
        productPath + '/templates/'
    ];

    var ux3Folders = [
        ux3Path + '/basic/',
        ux3Path + '/components/',
        ux3Path + '/widgets/',
        ux3Path + '/widgets/commerce/widgets/',
        ux3Path + '/widgets/raa/widgets/',
        ux3Path + '/templates/'
    ];

    return productFolders.concat(productGroupFolders, ux3Folders);
}

function getTemplateFile(componentName, templateName, product) {
    var lookupFolders = getLookupFolders(product);

    for (var i = 0; i < lookupFolders.length; i += 1) {
        var templatePath;
        if (templateName === componentName || !templateName) {
            templatePath = componentName + '/' + componentName;
        } else {
            if (templateName.indexOf('/') > -1) {
                templatePath = templateName;
            } else {
                templatePath = componentName + '/' + templateName;
            }
        }
        var fileName = lookupFolders[i] + componentName + '/templates/' + templatePath + '-tmpl.jade';
        if (fs.existsSync(fileName)) {
            return fileName;
        }
    }

    return null;
}

function getDataFile(componentName, dataFileName, product) {
    var lookupFolders = getLookupFolders(product);

    for (var i = 0; i < lookupFolders.length; i += 1) {
        var fileName = lookupFolders[i] + componentName + '/templates/data/' + dataFileName;
        if (fs.existsSync(fileName)) {
            return fileName;
        }
    }

    return null;
}

function renderSharedWidget(templateData) {
    var templateFile = getTemplateFile('shared-widget');

    if (templateFile) {
        var templateCompiled = jade.compileFile(fs.realpathSync(templateFile), {
            basedir: global.app.get('user')
        });

        return templateCompiled(templateData);
    }
    return '';
}

function render(...args) {
    if (args.length < 1) {
        console.error('Not enough arguments for pb.render(): ' + args);
        return '';
    }
    var componentName = templateName = args[0];
    var templateData = {};
    var product;
    var jsonDataFile;
    var sharedData;

    if (typeof args[args.length - 1] === 'object' && !!args[args.length - 1] && args[args.length - 1].shared) { // shared widget configuration provided
        sharedData = args[args.length - 1].shared;
        args.pop();
    }

    if (args.length === 2) { // (component, template) or (component, data) or (component, dataFileName) or (component, product)
        if (typeof args[1] === 'string') { // (component, template) or (component, product) or (component, dataFileName)
            if (args[1].endsWith('.json')) { // (component, dataFileName)
                jsonDataFile = args[1];
            } else if (args[1].indexOf('/') > -1) { // (component, template)
                templateName = args[1];
            } else { // (component, product)
                product = args[1];
            }
        } else { // (component, data)
            templateData = args[1];
        }
    } else if (args.length === 3) { // (component, template, data) or (component, template, dataFileName) or (component, template, product) or (component, data, product) or (component, dataFileName, product)
        if (typeof args[1] === 'string') { // (component, template, data) or (component, template, product) or (component, dataFileName, product)
            if (args[1].endsWith('.json')) { // (component, dataFileName, product)
                jsonDataFile = args[1];
            } else { // (component, template, data) or (component, template, product)
                templateName = args[1];
            }

            if (typeof args[2] === 'string') { // (component, template, product) or (component, template, dataFileName)
                if (args[2].endsWith('.json')) { // (component, template, dataFileName)
                    jsonDataFile = args[2];
                } else { // (component, template, product)
                    product = args[2];
                }
            } else { // (component, template, data)
                templateData = args[2];
            }
        } else { // (component, data, product)
            templateData = args[1];
            product = args[2];
        }
    } else if (args.length === 4) { // (component, template, data, product) or (component, template, dataFileName, product)
        templateName = args[1];
        if (typeof args[2] === 'string' && args[2].endsWith('.json')) { // data in json file
            jsonDataFile = args[2];
        } else { // data as an inline object
            templateData = args[2];
        }

        product = args[3];
    }

    // if the product name is not set explicitly, use current product name
    if (!product && global.styleguideProductName) {
        product = global.styleguideProductName;
    }

    if (jsonDataFile) {
        var dataFile = getDataFile(componentName, jsonDataFile, product);

        if (dataFile) {
            try {
                templateData = require(dataFile);
            } catch (err) {
                templateData = {};
            }
        }
    }

    var templateFile = getTemplateFile(componentName, templateName, product);
    if (!templateFile) {
        console.error('Template "' + templateName + '" not found.');
    } else {
        try {
            var debugString = logLevel === 'DEBUG' ?
                '\n<!-- Rendered by: pb.render('+ JSON.stringify(args).substr(0, 256) + ')'
                + '\nused template file: ' + templateFile
                + (dataFile ? '\nused data file: ' + dataFile : '')
                + '-->\n'
                : '';
            var templateCompiled = jade.compileFile(fs.realpathSync(templateFile), {
                basedir: global.app.get('user')
            });

            if (sharedData) {
                sharedData.model.data = sharedData.model.data || {};
                sharedData.model.data.content = templateCompiled(templateData);
                return debugString + renderSharedWidget(sharedData);
            }

            return debugString + templateCompiled(templateData);
        } catch (e) {
            console.error('Rendering of "', templateFile, '" failed!\n');
            console.error('Context: ', templateData, '\n');
            console.error(e);
        }
    }

    return '';
}

var updateParam = function (uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
    if (value === undefined) {
        if (uri.match(re)) {
            return uri.replace(re, '$1$2');
        } else {
            return uri;
        }
    } else {
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            var hash = '';
            if (uri.indexOf('#') !== -1) {
                hash = uri.replace(/.*#/, '#');
                uri = uri.replace(/#.*/, '');
            }
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            return uri + separator + key + "=" + value + hash;
        }
    }
}

// add global vars
global.pb = global.pb || {};

if (!global.pb.render) {
    global.pb.render = render;
}

if (!global.pb.updateParam) {
    global.pb.updateParam = updateParam;
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