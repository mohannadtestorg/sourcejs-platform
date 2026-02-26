$(function () {
    var $drawers = $('.top-drawer');
    var $drawer = $('.verify-phone-drawer');

    var $content = $drawer.find('.content');
    var $form = $content.find('form');

    var $verificationCode = $form.find('.verificationCode');
    var $message = $form.find('.message');
    var $submit = $form.find('.submit');

    var $original = $content.find('.form');
    var $success = $content.find('.success-template');

    $('.show-verify-phone').click(function (event) {
        var $link = $(this);
        var link = $link.attr('href')
        $.ajax(link).then(function (data) {
            if (data.result) {
                $original.removeClass('hidden');
                $success.addClass('hidden');
                $message.html(data.message);
            } else {
                $drawer.removeClass('hidden');
                $success.addClass('hidden');
                $original.removeClass('hidden');
                $content.slideDown('fast');
            }
        });
        event.preventDefault();
    });

    $drawer.on('click', '.cancel', function (event) {
        $content.slideUp('fast');
        $verificationCode.attr('type', 'text').val('');
        $message.text('');
        $submit.attr('disabled', true);
        $drawer.addClass('hidden');
        event.preventDefault();
    });

    var change = function () {
        if (!$verificationCode.val()) {
            $submit.attr('disabled', true);
        } else {
            $submit.removeAttr('disabled');
        }
    };

    $verificationCode.on('keyup input', change);

    $form.submit(function (event) {
        var reg = new RegExp('^[0-9]{6}$');
        event.preventDefault();
        if (!reg.test($verificationCode.val())) {
            $original.removeClass('hidden');
            $success.addClass('hidden');
            $message.html('verification code must be 6 digits');
            return;
        }
        var url = $form.attr('action');
        var data = $form.serializeArray();
        data.push({name: 'ajaxRequest', value: true});
        $.ajax({method: 'post', url: url, data: data, xhrFields: {withCredentials: true}}).then(function (data) {
            if (data.result) {
                $original.removeClass('hidden');
                $success.addClass('hidden');
                $message.html(data.message);
            } else {
                $original.addClass('hidden');
                $success.removeClass('hidden');
            }
        }).fail(function () {
            $original.removeClass('hidden');
            $success.addClass('hidden');
            $message.html('Unknown error');
        });
    });

});