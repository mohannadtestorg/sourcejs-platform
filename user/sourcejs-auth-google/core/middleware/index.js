/*
 * NodeJS module, included automatically from SourceJS app.js
 * ExpressJS middleware http://expressjs.com
 * */

var deepExtend = require('deep-extend');
var Path = require('path');
var specUtils = require(Path.join(global.pathToApp, 'core/lib/specUtils'));
let shared = {};

const authDisabled = process.env.AUTH_DISABLED === 'yes'; //check environment variable to enable/disable authentication

// Module configuration
var globalConfig = global.opts.plugins && global.opts.plugins.pluginName ? global.opts.plugins.pluginName : {};
var config = {
    enabled: true,

    // Public object is exposed to Front-end via options API.
    public: {}
};

// Overwriting base options
deepExtend(config, globalConfig);


if (!authDisabled) {
    let passport = require('passport');
    let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    let fsUtils = require("nodejs-fs-utils");
    let low = require('lowdb');

    // Initialize lowdb
    const dbDefaults = {
        users: []
    };
    const dbRoot = global.app.get('user') + '/core/db';

    const userDbFile = dbRoot + '/users.json';
    let userDb = low(userDbFile, {storage: require('lowdb/lib/storages/file-async')});
    if (!userDb.has('users').value()) {
        userDb.defaults(dbDefaults).write();
    }
    let productDb = {
        products: {}
    };
    readProductDb();

    // Read all product DB files and store them in productDb
    function readProductDb() {
        const productFileRegex = /product-(.+)\.json$/;
        let productFiles = [];

        fsUtils.walkSync(dbRoot, {
            skipErrors: true,
            logErrors: true
        }, function (err, path, stats, next, cache) {
            let fileMatch = productFileRegex.exec(path);
            if (!err && fileMatch) {
                productFiles.push({
                    product: fileMatch[1],
                    path: path
                });
            } else {
                next();
            }
        });
        productFiles.forEach((item, index) => {
            productDb[item.product] = low(item.path, {storage: require('lowdb/lib/storages/file-async')});
            if (!productDb[item.product].has('users').value()) {
                productDb[item.product].defaults(dbDefaults).write();
            }
        });
    }

    // User module
    let User = (function () {
        function getById(id) {
            return userDb.get('users').find({id: id}).value();
        }

        function create(user) {
            let userProfile = getById(user.id);
            if (!userProfile) {
                user.isAtyponEmployee = user.emails.filter((email) => (email.value.indexOf('@atypon.com') > 0)).length > 0;
                userDb.get('users').push(user).write();
                userProfile = user;
            }
            return userProfile;
        }

        function getProductFromPath(path) {
            if (path.indexOf('/products/') === -1) {
                return 'ux3';
            } else {
                let product = path.replace('/specs/products/', '');
                if (product.length > 0) {
                    return product.split('/')[0] || 'ux3';
                } else {
                    return 'products';
                }
            }
        }

        return {
            findOrCreate: function (user, callbackFn) {
                let userProfile = create(user);
                if (userProfile) {
                    callbackFn(null, userProfile);
                } else {
                    callbackFn();
                }

            },
            findById: function (id, callbackFn) {
                callbackFn(null, getById(id));
            },
            getUserProducts: function (userId) {
                let userProfile = getById(userId);
                let userProds = [];
                for (let item in productDb) {
                    if (productDb[item].has && productDb[item].has('users')) {
                        let product = productDb[item].get('users').value();
                        if (userProfile.isAtyponEmployee ||
                            userProfile.emails.filter((email) => (product.indexOf(email.value) > -1)).length > 0) {
                            userProds.push(item);
                        }
                        //console.dir(productDb[item].get('users').value());
                    }
                }
                return userProds;
            },
            canAccessProduct: function (userId, path) {
                let userProfile = getById(userId);
                var prod_name = getProductFromPath(path);
                let hasAccess = false;
                if (!userProfile.isAtyponEmployee)
                    if (prod_name !== "products") {
                        let product = productDb[prod_name].get('users').value();
                        hasAccess = userProfile.emails.filter((email) => (product.indexOf(email.value) > -1)).length > 0;
                    } else {
                        return User.getUserProducts(userId).length;
                    }
                return userProfile.isAtyponEmployee || hasAccess;
            }
        };
    })();

    // Check if the user is authenticated and has access privileges for the requested product
    function ensureAuthenticated(req, res, next) {
        var isAuthenticated = req.isAuthenticated && req.isAuthenticated();
        delete global.no_access;

        if (isAuthenticated) {

            if (!User.canAccessProduct(req.session.passport.user, req.originalUrl)) {
                if (req.specData && req.specData.info) {
                    if (req.logout) {
                        req.logout();
                    }
                    req.session.destroy();
                    global.no_access = true;
                    return res.redirect('/login');
                }
            }
            let current_user = false;
            User.findById(req.session.passport.user, function (err, user) {
                current_user = user;
            });

            let prods = User.getUserProducts(req.session.passport.user);
            shared.isAtyponEmployee = current_user.isAtyponEmployee;
            shared.userProds = prods;
            return next();
        }

        if(req.query.internal) {
            return next();
        }

        if (req.originalUrl.indexOf('/releasedAssets/') === -1) {
            req.session.returnTo = req.originalUrl;
        }
        res.redirect('/login');
    }


    // Helper functions to serialize and deserialize user instances to and from the login session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // Passport strategy configuration, Google app credentials defined in options.js
    passport.use(new GoogleStrategy({
            clientID: global.opts.core.google.CLIENT_ID,
            clientSecret: global.opts.core.google.CLIENT_SECRET,
            callbackURL: global.opts.core.google.CALLBACK_URL
        },
        function (accessToken, refreshToken, profile, done) {
            let userProfile = (({id, provider, displayName, name, emails}) => ({
                id,
                provider,
                displayName,
                name,
                emails
            }))(profile);
            User.findOrCreate(userProfile, function (err, user) {
                if (!user) {
                    return done(null, false, {message: 'Unable to find existing user or create new user.'});
                }
                return done(err, user);
            });
        }
    ));

    // Initialize passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Make sure all requests under /specs/ are authenticated
    app.use('/specs/products/*', ensureAuthenticated);

    // Google authentication endpoint
    app.get('/auth/google', passport.authenticate('google', {scope: ['email profile']}));

    // Google authentication callback
    app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), function (req, res) {
        // Authenticated successfully
        res.redirect(req.session.returnTo || '/');
        delete req.session.returnTo;
    });
}

// Logout and destroy session
app.get('/auth/logout', function (req, res) {
    if (req.logout) {
        req.logout();
    }
    req.session.destroy();
    res.redirect('/');
});

/*
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 * */
var processRequest = function (req, res, next) {
    if (req.specData && req.specData.info && req.isAuthenticated && req.isAuthenticated()) {
        req.specData.info.loggedIn = true;
        req.specData.info.authEnabled = true;
        req.specData.info.isAtyponEmployee = shared.isAtyponEmployee;
        req.specData.info.userProds = shared.userProds;
    }
    next();
};

exports.process = processRequest;