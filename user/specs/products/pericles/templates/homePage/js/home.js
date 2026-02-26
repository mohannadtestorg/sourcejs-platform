


$(document).ready(function() {

    $('.hp-browse-by-controller').click(function(e) {
        if (window.innerWidth < 769) {
            e.preventDefault();
            $(this).find('.icon').toggleClass(" icon-chevron-down icon-chevron-up");
            $(this).siblings('.hp-browse-by-content').toggle();
        }
    });
    $('.icon-login-mobile img').click(function(e) {
        e.preventDefault();
        $(this).parent('.icon-login-mobile').siblings('.login-register-container').toggle();
    });

    // check if the user non-institution
    if ($('.institution-info-wrapper').is(':empty')){
        $('.UX3InstitutionBanner').addClass('non-institution');
    }

    $(window).on('load', function () {
        $('.subjects-container .accordion-tabbed__tab.js--open > a').click();

    });


});