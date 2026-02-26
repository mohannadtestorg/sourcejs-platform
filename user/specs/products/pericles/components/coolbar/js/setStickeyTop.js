(function () {
    var $window = $(window),
        $body = $('body');

    var setStickeyTop = {
        vPort: "screen-md",
        stickybarElement: $('.coolBar'),
        topPostition: 0,
        lock: true, // define lock and set default value, this lock will be used to make sure to run certain functionality and to run on every scroll event

        init: function () {

            setStickeyTop.control();
        },
        control: function () {
            $(document).on(setStickeyTop.vPort + '-on', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                setStickeyTop.sticky.position();
            });

            $(document).on(setStickeyTop.vPort + '-off', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                setStickeyTop.sticky.position();
            });


        },
        headerHeight: function () {
            $('.pageHeader').height()
        },
        sticky: {
            position: function () {
                setStickeyTop.stickybarElement.css({"top": setStickeyTop.headerHeight()});
            }
        }
    };
    UX.setStickeyTop = setStickeyTop; // add to global namespace
})();