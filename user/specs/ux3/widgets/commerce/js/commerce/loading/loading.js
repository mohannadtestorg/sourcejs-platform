commerce.Loading = function (deferred) {
    this.start();
    this.deferred = deferred;
    $.when(deferred).then(this.done);
};

commerce.Loading.prototype.start = function () {
};

commerce.Loading.prototype.done = function () {
};