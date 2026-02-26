(function () {

    var truncation  = UX.loader.truncation;
    truncation.linesToShow = 2;

    truncation.init = function () {
        var lineHeight= $(truncation.toTrunk8).children().height(),
            originalHeight= $(truncation.toTrunk8).height();

        truncation.trunk8Height= lineHeight * truncation.linesToShow;

        if (parseInt(originalHeight) > parseInt(truncation.trunk8Height)) {
            if (truncation.showLess) {
                truncation.showLess();
                truncation.on();
            }
        } else {
            if (truncation.clearTruncation) {
                truncation.clearTruncation();
                truncation.off();
            }
        }
    };

})();