(function () {

    var  pbReviewMode = {
        init: function () {
            pbReviewMode.on.build();
        },
        on: {
            build: function () {
                $('.main-nav.menu--res').removeClass("menu--res");
            }
        }
    };

    UX.pbReviewMode = pbReviewMode; // add to global namespace
})();







