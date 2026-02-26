$(function() {
    var $body= $('body');
    var $drawers = $('.top-drawer');
    var $drawer = $('.request-username-drawer');

    var $content = $drawer.find('.content');
    var $form = $content.find('form');

    var $email = $form.find('.email');
    var $submit = $form.find('.submit');

    var $original = $content.find('.form');
    var $success = $content.find('.success-template');
    var $message = $content.find('.message');
    var $recaptcha = $content.find('.g-recaptcha');

    var id;

    $('.show-request-username').click(function(event) {
        $drawers.addClass('hidden');
        $drawer.removeClass('hidden');
        $success.addClass('hidden');
        $body.removeClass('noscroll');
        if ($recaptcha.length && typeof grecaptcha !== 'undefined') {
            if (typeof id !== 'undefined') {
                grecaptcha.reset(id);
            } else {
                id = grecaptcha.render($recaptcha[0], $recaptcha.data());
            }
        }
        $original.removeClass('hidden');
        $content.slideDown('fast');
        $content.find(":focusable").first().focus();
        event.preventDefault();
    });

    $drawer.on('click', '.cancel', function(event) {
        $content.slideUp('fast');
        $message.html('');
        $email.val('');
        $submit.attr('disabled', true);
        $drawer.addClass('hidden');
        event.preventDefault();
        $('.login-popup').find(":focusable").first().focus();
    });

    $drawer.on('keyup', function(e){
        if (e.keyCode == 27) { // Escape is pressed
            $drawer.find('.cancel').trigger("click");
        }
    });
    $email.on('keyup input', function() {
        if (!$email.val()) {
            $submit.attr('disabled', true);
        } else {
            $submit.removeAttr('disabled');
        }
    });

    $form.submit(function(event) {
        event.preventDefault();
        if (!$email.val()) {
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