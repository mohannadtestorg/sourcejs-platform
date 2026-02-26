(function () {
    $(document).ready(function () {
        var $buttons = $(".buttons_group button");

        $buttons.click(function () {
            $(this).parent().children("button").removeClass("button_active");
            $(this).addClass("button_active");
        });

    });
})();