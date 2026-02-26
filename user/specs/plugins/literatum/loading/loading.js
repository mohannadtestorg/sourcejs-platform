//const circle = require('../literatum.js');

literatum.Loading = function (deferred) {
    this.start();
    this.deferred = deferred;
    $.when(deferred).then(this.done);
};

literatum.Loading.prototype.start = function () {
};

literatum.Loading.prototype.done = function () {
};