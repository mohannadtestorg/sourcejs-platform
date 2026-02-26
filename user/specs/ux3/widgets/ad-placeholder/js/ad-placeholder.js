(function () {

    var adplaceholder = {
        init: function () {
            $(".js__toggleAdForm").on("click", function (e) {
                e.preventDefault();
                var elemToToggle = "#" + $(this).data("toggle");
                $(elemToToggle).slideToggle();
            });
        }
    };
    UX.adplaceholder = adplaceholder; // add to global namespace
})();