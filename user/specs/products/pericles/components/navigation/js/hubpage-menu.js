$(window).on('load', function () {

    $('body').on('click', '[ data-db-target-for="hub-menu"]', function () {
        if ($(this).hasClass('js--open')) {
            $(this).find('span').css('top', (($('.pageHeader').height() - $(this).offset().top) - 20));
            $('.hubpage-menu').css('top',  $('.pageHeader').height());
            $('body, html').addClass('lock-screen');
            $('.w-slide').addClass('hubMenu-slide').css('top', $('.pageHeader').height());

        } else {
            UX.slide.on.hide();
            $('body, html').removeClass('lock-screen');
            $('.w-slide').removeClass('hubMenu-slide').css('top', 0);
        }
        $( ".w-slide__back" ).trigger( "click" );
    });

    $('.hubpage-menu').removeClass("menu--res");

    $(window).on('resize', function () {
        $('.hubpage-menu').removeClass("menu--res");
    });

    $('body').on('click', '.coolBar--res [data-db-target-for], .pages-nav .menu--res [data-db-target-for], .pages-nav--res [data-db-target-for] ,.showPublications [data-db-target-for] ,.doSearch [data-db-target-for].result__ctrl__filters', function () {

        if ($(this).hasClass('js--open')) {
            $('body, html').addClass('lock-screen');

        } else {
            $('body, html').removeClass('lock-screen');

        }

    });

});

