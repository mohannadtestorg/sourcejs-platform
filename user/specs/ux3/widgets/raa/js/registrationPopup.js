$(function() {

    var $popups = $('.popup');
    var $popup = $('.registration-popup');

    var $email = $popup.find('.email');
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
    $('.show-registration').click(function(event) {
        $popups.addClass('hidden');
        $popup.removeClass('hidden');
        $popup.find('input[type="text"]').focus();
        event.preventDefault();
    });

    $popup.on('click', function (e) {
        if ($(e.target).is($popup) || $(e.target).is($close) || $(e.target).parent().is($close)) {
            e.preventDefault();
            $popup.addClass('hidden');
            $('body').removeClass('noscroll');
        }
    });

    $popup.on('keyup', function(e){
        if (e.keyCode == 27) { // Escape is pressed
            $popup.find('.close').trigger("click");
        }
        if(e.keyCode === shift){
            revers = false;
        }
    })

    var pattern = /^([\w-+]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    var change = function(event) {
        var code = event.keyCode ? event.keyCode : event.which;
        if (code == 13) {
            return;
        }
        $email.prevAll('.label').removeClass('error').find('.message').remove();
        if (!$email.val()) {
            $submit.attr('disabled', true);
        } else {
            $submit.removeAttr('disabled');
        }
    };

    $submit.click(function() {
        if (!$email.val()) {
            return false;
        } else if (!pattern.test($email.val())) {
            var $label = $email.prevAll('.label');
            $label.addClass('error');
            var $message = $label.find('.message');
            if (!$message.length) {
                $message = $('<span class="message"></span>').appendTo($label);
            }
            $message.html('<span> - </span> Is Invalid')
            return false;
        }
    });

    var blur = function() {
        if ($email.val() && !pattern.test($email.val())) {
            var $label = $email.prevAll('.label');
            $label.addClass('error');
            var $message = $label.find('.message');
            if (!$message.length) {
                $message = $('<span class="message"></span>').appendTo($label);
            }
            $message.html('<span> - </span> Is Invalid')
        }
    };

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

    $email.on('keyup input', change);
    $email.on('blur', blur);
});