(function () {

    UX.sticko.get.height = function () {
        var childHeight = 0;
        UX.sticko.$element.children(":not(.sticko__child)").each(function () { // get elements height (except sticko child)
            childHeight = childHeight + $(this).outerHeight();
        });
        UX.sticko.newHeight = $(window).outerHeight() - (childHeight + UX.sticko.pOffset.top);

        var styles = {
            height: UX.sticko.newHeight,
            'overflow-y': "auto"
        };
        UX.sticko.apply(UX.sticko.$child, styles);
    };

})();