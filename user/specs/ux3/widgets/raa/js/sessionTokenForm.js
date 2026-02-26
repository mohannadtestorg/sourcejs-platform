$(function() {
    $('.claim-options li').each(function() {
        var $form = $(this).find('form');
        var $token = $form.find('.token');
        var $submit = $form.find('.submit');

        var change = function() {
            if (!$token.val()) {
                $submit.attr('disabled', true);
            } else {
                $submit.removeAttr('disabled');
            }
        };

        $token.on('keyup input', change);
        change();

        $form.submit(function(event) {
            if ($submit.attr('disabled')) {
                event.preventDefault();
            }
        });
    });
});