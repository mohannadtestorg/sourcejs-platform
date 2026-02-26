(function () {

    var $window = $(window),
        $body = $('body');

    var profileMenu = {

        init: function () {
                var height=$body.height() -$('header').height() - $('footer').height() - $('.profile-pages__heading').height();
                $('.profile-pages .profile-menu').height(height);

        }

    };
    UX.profileMenu = profileMenu; // add to global namespace
})();