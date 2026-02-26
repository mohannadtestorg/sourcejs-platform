$(function() {
    var $drawers = $('.top-drawer');
    var $drawer = $('.change-password-drawer');
    var $close = $drawer.find('.close');

    var $content = $drawer.find('.content');
    var $form = $content.find('form');

    var $old = $form.find('.old');
    var $new = $form.find('.new');
    var $message = $form.find('.message');
    var $submit = $form.find('.submit');

    var $original = $content.find('.form');
    var $success = $content.find('.success-template');
    var $indicator = $content.find('.password-strength-indicator');
    var $eye = $content.find('.password-eye-icon');

    $('.show-change-password').click(function(event) {
        $drawers.addClass('hidden');
        $drawer.removeClass('hidden');
        $success.addClass('hidden');
        $original.removeClass('hidden');
        $content.slideDown('fast');
        $content.find("input:focusable").first().focus();
        event.preventDefault();
    });

    $drawer.on('click', function(event) {
        if ($(event.target).is($drawer) || $(event.target).is($close) || $(event.target).parent().is($close)) {
            $content.slideUp('fast');
            $old.attr('type', 'password').val('');
            $new.attr('type', 'password').val('');
            $indicator.removeClass('too-short too-long weak medium strong very-strong');
            $eye.addClass('hidden icon-eye').removeClass('icon-eye-blocked');
            $message.text('');
            $submit.attr('disabled', true);
            $drawer.addClass('hidden');
            event.preventDefault();
        }
    });

    var change = function() {
        if (!$old.val() || !$new.val() || $indicator.is('.too-short, .too-long, .weak')) {
            $submit.attr('disabled', true);
        } else {
            $submit.removeAttr('disabled');
        }
    };

    $old.on('keyup input', change);
    $new.on('keyup input', change);

    $form.submit(function(event) {
        event.preventDefault();
        if (!$old.val() || !$new.val()) {
            return;
        }
        var url = $form.attr('action');
        var data = $form.serializeArray();
        data.push({name: 'ajaxRequest', value: true});
        $.ajax({method: 'post', url: url, data: data, xhrFields: { withCredentials: true }}).then(function(data) {
            if (data.result) {
                $original.removeClass('hidden');
                $success.addClass('hidden');
                $message.html(data.message);
            } else {
                $original.addClass('hidden');
                $success.removeClass('hidden');
            }
        }).fail(function() {
            $original.removeClass('hidden');
            $success.addClass('hidden');
            $message.html('Unknown error');
        });
    });

});