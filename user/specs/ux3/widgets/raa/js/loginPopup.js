$(function() {
    var $popups = $('.popup');
    var $popup = $('.login-popup');

    var $login = $popup.find('.login');
    var $password = $popup.find('.password');
    var $eye = $popup.find('.password-eye-icon');
    var $remember = $popup.find('.remember .cmn-toggle');
    var $message = $popup.find('.message');
    var $submit = $popup.find('.submit');

    var items = $popup.find('a, button, input');
    var lastItem,
        revers = false,
        tabKey = 9,
        shift = 16,
        $close = $popup.find('.close');
    items.each(function (index) {
        if (index === items.length - 1) {
            lastItem = $(this);
        }
    });

    $popup.on('keydown', function (e) {
        if (e.keyCode === shift) {
            revers = true;
        }

        if ((e.keyCode || e.which) === tabKey) {
            if (!revers) {
                tabEvent();
            } else {
                tabRevers();
            }
        }
    });

    $('.show-login').click(function(event) {
        $popups.addClass('hidden');
        $popup.removeClass('hidden');
        $('body').addClass('noscroll');
        event.preventDefault();
        setTimeout(function () {
            $close.focus();
        }, 250);
    });

    $popup.on('click', function (e) {
        if ($(e.target).is($popup) || $(e.target).is($close) || $(e.target).parent().is($close)) {
            e.preventDefault();
            $('body').removeClass('noscroll');
            $popup.addClass('hidden');
            $eye.addClass('hidden icon-eye').removeClass('icon-eye-blocked');
            $submit.attr('disabled', true);
            $remember.attr('checked', false);
            $login.val('');
            $password.val('');
            $message.html('');
        }
    });

    $popup.on('keyup', function(e){
        if (e.keyCode == 27) { // Escape is pressed
            $popup.find('.close').trigger("click");
        }
        if (e.keyCode === shift) {
            revers = false;
        }
    });

    function tabEvent() {
        $close.off();
        lastItem.on('focusout', function () {
            $close.focus();
        });
    }

    function tabRevers() {
        lastItem.off();
        $close.on('focusout', function () {
            lastItem.focus();
        });
    }

});