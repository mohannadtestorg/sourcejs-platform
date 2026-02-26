(function () {
    var cookiePolicyPopupWidget = {
        $element: $('.cookiePolicy-popup'),
        acceptUrl: '/action/cookiePolicy?response=accept',

        init: function () {
            cookiePolicyPopupWidget.control();
        },
        control: function () {

            cookiePolicyPopupWidget.$element.on('click', '.cookiePolicy-popup__close', function (e) {
                e.preventDefault();

                $.get(cookiePolicyPopupWidget.acceptUrl, function () {
                    console.log("Cookies Accepted!");
                });
                cookiePolicyPopupWidget.$element.slideUp('fast', function () {
                    cookiePolicyPopupWidget.$element.remove();
                    cookiePolicyPopupWidget.cookieRemoved();
                });
            })

        },
        cookieRemoved: function () {}

    };
    UX.cookiePolicyPopupWidget = cookiePolicyPopupWidget;
})();