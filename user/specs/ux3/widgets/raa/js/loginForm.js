$(function() {
    $('.login-form').each(function() {
        var $form = $(this);
        var $login = $form.find('.login');
        var $pass = $form.find('.password');
        var $submit = $form.find('.submit');

        $form.on('click', '.resend', function(event) {
            event.preventDefault();
            $.ajax({method: 'get', url: $(this).attr('href') + '&ajaxRequest=true', xhrFields: { withCredentials: true }}).then(function() {
                $form.find('.message').html('A link has been resent to your email');
            }).fail(function() {
                $form.find('.message').html('An error has occurred');
            });
        });

        var change = function() {
            if (!$login.val() || !$pass.val()) {
                $submit.attr('disabled', true);
            } else {
                $submit.removeAttr('disabled');
            }
        };

        $login.on('keyup input', change);
        $pass.on('keyup input', change);
        change();
    });
});