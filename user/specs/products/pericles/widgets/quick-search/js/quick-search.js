UX.quickSearch.additionalController = function () {

    $(document).on(UX.quickSearch.vPort + '-on', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
        UX.quickSearch.isMobile = true;

    });

    $(document).on(UX.quickSearch.vPort + '-off', function () { // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
        UX.quickSearch.isMobile = false;

    });

    $(document).on('focus', '.quick-search:not(.quick-search--citation) input.fakeQSInput', function () {
        if (!$(this).closest('.expanded--quickSearch').length) {
            UX.quickSearch.open($(this));
        }

    });
    $(document).on('focus', '.expanded--quickSearch input.actualQSInput', function () {

        $(this).siblings('.search-options-wrapper').stop().slideDown(550);
    });

    $(document).on('click touchstart', function (e) {
        if (!$(e.target).closest('.main-search-field-wrapper, .search-options-wrapper').length && !$('.header-quicksearch').hasClass('expanded--quickSearch') && !$(e.target).hasClass("qsItem")) {
            $('.quick-search input').blur();
            UX.quickSearch.close();
        }
    });

    $('#citationSearchForm').on('click', '[type="submit"]', function (e) {
        e.preventDefault();
        UX.quickSearch.submitCitationForm(('#citationSearchForm'));
    });

    $(document).on('keyup', function (e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode == 9) {
            if ($(document.activeElement).closest('.quick-search-wrapper').length == 0) {
                UX.quickSearch.close();
            }
        }
    });

    $(document).on('click', '.quickSearchAutocomplete a', function (e) {
        $('.quick-search input').blur()
    });


    $(document).on('click', '[title="Citation"]', function (e) {
        $('.quick-search').addClass('citationSearch--open')
    });

    $(document).on('click', '.citationSearch--open [data-toggle="tab"]', function (e) {
        $('.quick-search').removeClass('citationSearch--open')
    });

    $('.quick-search__item').on('click', function (e) {
        e.preventDefault();
        var $qSearch = $(this).siblings('.quick-search');
        $qSearch.toggle();

        $(this).toggleClass('active');

        if ($qSearch.is(":visible")) {
            $qSearch.find('input').focus();
        } else {
            $qSearch.find('input').blur();
        }

        UX.quickSearch.setPosition();


    });

    $('.quick-search').on('input', '.actualQSInput', function () {
        $('.quick-search .actualQSInput').val($(this).val())
    });


    $(window).resize(function () {
        UX.quickSearch.setPosition();
    });

    $(window).on('orientationchange',function (event) {
        $('.quick-search input').blur();
        UX.quickSearch.close();
    });

};

UX.quickSearch.open = function ($el) {

    if (!$el.closest('.homepage-search-wrapper').length) {

        var $qsW = $el.closest('.quick-search');
        $qsW.addClass('open');


        if ($('.pageHeader').length) {
            $('.pageHeader').addClass('searchOpen');
        }
        $('body').addClass('searchOpen-body');

        setTimeout(function () {
            if ($qsW.hasClass("open")) {
                $qsW.find('.actualQSInput').focus();
            }
        }, 120);

        setTimeout(function () {
            if ($qsW.hasClass("open")) {
                $qsW.find('.search-options-wrapper').stop().slideDown(550, function () {
                    $el.closest('.main-search-field-wrapper').css('overflow', 'visible');
                });

                $('.quickSearchAutocomplete').css('padding-top', '47px');
            }
        }, 700);
    }
};

UX.quickSearch.close = function () {
    $('.quick-search').removeClass('open');
    $('.pageHeader').removeClass('searchOpen');

    $('body').removeClass('searchOpen-body');
    if (!UX.quickSearch.isMobile) {

        if ($('.quick-search').closest('.expanded--quickSearch').length) {
            $('.search-options-wrapper').stop().slideUp(500);
        } else {
            $('.main-search-field-wrapper').css('overflow', 'hidden');
            $('.search-options-wrapper').stop().hide(500);
            $('.quickSearchAutocomplete').css('padding-top', '0');
            //if ($('.quick-search .actualQSInput').val())
            $('.quick-search .fakeQSInput').val($('.quick-search .actualQSInput').val());
        }

    }

};

UX.quickSearch.setPosition = function () {

    var $qSearch = $('.quick-search');

    if ($qSearch.closest('.homepage-search-wrapper').length == 0 && !$qSearch.hasClass('quick-search--citation') && UX.quickSearch.isMobile) {
        var $qSearchArrow = $('.quick-search__item__arrow');

        $qSearch.css({
            width: $(window).width(),
            left: ($('.container').outerWidth() - $(window).width()) / 2
        });
        $qSearchArrow.css('bottom', '0');

        var arrowP = $qSearch.offset().top - ($qSearchArrow.offset().top + 20);
        $qSearchArrow.css('bottom', '-' + arrowP + 'px');
    }


};


UX.quickSearch.submitCitationForm = function ($elem) {
    var errorMsg = '<p class="error"> Please enter a volume and page number or volume and citation number as a minimum requirement to run this search.</p>';
    $elem = $($elem);

    $elem.find('.error').remove();

    var volVal = $elem.find('[name="quickLinkVolume"]').val();

    if (volVal == '') {
        $elem.find('.fields').append(errorMsg);
    } else {
        var pageVal = $elem.find('[name="quickLinkPage"]').val();
        var citationNumberVal = $elem.find('[name="quickLinkCitation"]').val();
        var jorVal = $elem.find('[name="quickLinkJournal"]').val();

        if (pageVal == '' && citationNumberVal == '') {
            $elem.find('.fields').append(errorMsg);
            return;
        }
        if (jorVal == '') {
            $elem.find('.fields').append('<p class="error">Please enter the journal code.</p>')
        } else {
            $elem.submit()
        }
    }

};













