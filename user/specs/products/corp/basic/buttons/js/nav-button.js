(function () {
    var $body = $('body'),
        btnSelector = '.nav-button',
        $btnEl = $(btnSelector);

    var navButton = {
        init: function () {
            $body.on('click',btnSelector, navButton.clickListener);
        },
        clickListener: function(event) {
            $btnEl.toggleClass('open');
        }
    };

    UX.navButton = navButton; // add to global namespace
})();
