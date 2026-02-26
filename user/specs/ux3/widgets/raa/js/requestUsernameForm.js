$(function() {
    $('.request-username-form').each(function() {
        var $form = $(this);
        var $email = $form.find('.email');
        var $submit = $form.find('.submit');

        var change = function() {
            if (!$email.val()) {
                $submit.attr('disabled', true);
            } else {
                $submit.removeAttr('disabled');
            }
        };

        $email.on('keyup input', change);
        change();

        $form.submit(function(event) {
            if ($submit.attr('disabled')) {
                event.preventDefault();
            }
        });
    });
});
