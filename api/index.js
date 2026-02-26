'use strict';

// Vercel serverless entry point — requires the Express app (app.listen is
// guarded by `if (!module.parent)` in app.js so it won't start a server).
var app = require('../app.js');

module.exports = app;
