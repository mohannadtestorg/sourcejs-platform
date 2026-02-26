$(function() {
    $('.resetPasswordWidget').each(function() {
        var $form = $(this).find('form');
        var $password = $form.find('.password');
        var $submit = $form.find('.submit');

        var change = function() {
            var valid = true;
            $password.each(function() {
                if (!$password.val())
                    valid = false;
            });
            if (!valid) {
                $submit.attr('disabled', true);
            } else {
                $submit.removeAttr('disabled');
            }
        };

        $password.on('keyup input', change);
        change();

        $form.submit(function(event) {
            if ($submit.attr('disabled')) {
                event.preventDefault();
            }
        });
    });
});